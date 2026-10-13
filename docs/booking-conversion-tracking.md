# Booking conversion tracking (`booking_complete`)

**Status: implemented in code, NOT verified live.** No real Jotform payment, GA4 receipt or deployment has been tested by the author of this change. The owner must run the paid tests in "Owner test script" before relying on any number.

`booking_complete` is the only primary conversion. It is recorded **only** server-side, from a verified, PAID Jotform submission (form `262622799830063`), once per Jotform submission ID, and only when the visitor consented to analytics. Page loads (including `/thank-you.html`) never count. `pricing_viewed`, `book_online_click`, `consultation_selection`, `single_lesson_selection` and `development_programme_selection` are secondary funnel events, not conversions.

## Hosting finding

The repo root has a `CNAME` (`singtheeasyway.com`) and no `wrangler.toml`, `netlify.toml`, `vercel.json` or `.github/workflows` at the root, so the site is a static GitHub Pages site. Cloudflare Pages Functions need Cloudflare Pages hosting and therefore are not compatible. The solution is a **standalone Cloudflare Worker** in `worker/`, on a `*.workers.dev` URL. No DNS, domain or website hosting change. (Inferred from the repository only; confirm in GitHub Pages settings.)

## Data flow

1. Visitor clicks a booking link to `https://pci.jotform.com/form/262622799830063`. `assets/js/main.js` rewrites the link's `href` at `mousedown`/`touchstart`/`keydown`/`contextmenu`/`click` (capture) so new-tab and middle-click carry the parameters too.
   - No analytics consent (cookie `SingTheEasyWay_Consent` `analytics:true` and gtag loaded): the link is left exactly as written.
   - Analytics consent: `analytics_consent=1`, `ga_client_id`, `ga_session_id`, `ga_session_number` (official `gtag('get', 'G-72QBZSZZBP', ...)` API when available, else parsed from the `_ga` and `_ga_72QBZSZZBP` cookies, both `GS1.1.<sid>.<n>` and `GS2.1.s<sid>$o<n>` formats). Strict regexes (client id `^\d{5,12}\.\d{5,12}$`, others digits only); invalid values are dropped. Links are always built synchronously from a cache plus the cookies; the async `gtag` callbacks only refresh the cache, so navigation is never blocked.
   - Advertising (marketing) consent additionally: `ads_consent=1`, and `gclid` / `gbraid` / `wbraid` only if valid. gclid comes from Google's own `_gcl_aw` cookie (`GCL.<ts>.<gclid>`) or the landing URL; gbraid from `_gcl_gb` or the URL; wbraid from the URL. Our code stores nothing of its own.
   - Never any name, email, phone, appointment, singing information or IP.
2. Jotform pre-fills hidden fields from the URL parameters. The visible form, payment flow and the parameter-free redirect to `/thank-you.html` are unchanged.
3. Jotform webhook -> `POST https://<worker-name>.<ACCOUNT_SUBDOMAIN>.workers.dev/jotform?token=<WEBHOOK_SECRET>`.
4. Worker: constant-time token check (401), POST only, takes only `submissionID` and `formID` from the payload, rejects a wrong form ID, never logs the payload.
5. Worker re-fetches the submission from the Jotform API and verifies: form ID, submission ID, status `ACTIVE`, and `isPaymentVerified()` (`worker/src/payment.js`). **Fail closed**: if payment cannot be positively confirmed the outcome is `unpaid_or_unverified`, nothing is sent and the dedupe slot is **not** consumed, so a later redelivery after payment still works. To retrigger, use Jotform's webhook resend for that submission (Submissions > select > "Resend webhook"/Integrations log).
6. Product is read from the **verified submission** (the product field and/or payment block product names), never from client data, via the config map (`worker/src/config.js`, override with `PRODUCT_MAP_JSON`). The paid amount must equal the mapped value in GBP, otherwise `needs_review` and nothing is sent.

   | Booking Option | booking_type | value |
   | --- | --- | --- |
   | Consultation | `consultation` | 25 |
   | Single Lesson | `single_lesson` | 85 |
   | Development Programme | `development_programme` | 700 |

   Currency is `GBP`. `PRODUCT_MAP_JSON` shape: `{"consultation":{"labels":["Consultation"],"booking_type":"consultation","value":25}, ...}`. An invalid override is ignored (defaults apply).
7. Consent, decided server-side from the verified record's hidden fields:
   - `analytics_consent` != `1`: no GA4 event; outcome `no_consent` stored permanently.
   - `1` with valid `ga_client_id` and `ga_session_id` (and `ga_session_number` if present): `booking_complete` and `generate_lead` are sent via Measurement Protocol with the genuine `client_id`, and in event params `session_id`, `session_number`, `engagement_time_msec: 1`, `transaction_id` (submission ID), `booking_type`, `value`, `currency`, `form_id`, `conversion_location: "jotform_webhook"`. The MP `consent` object has `ad_user_data` / `ad_personalization` = `GRANTED` only if `ads_consent` = `1`, else `DENIED`.
   - `1` but identifiers missing/invalid: outcome `consented_missing_identifiers`, nothing sent. **No identifier is ever invented** (no client id hashed from the submission ID). The owner decides what to do with these; they appear in Worker logs as that outcome word.
   - No `user_id`, `user_data`, user properties, IP, user agent or geo override are sent.
8. Permanent dedupe: a SQLite-backed Durable Object (`SubmissionDedupe`, one object per key) gives an atomic claim. KV is not used because it has no atomic put-if-absent. States: `pending` -> `sent` | `no_consent` | `needs_review` | `consented_missing_identifiers`. `generate_lead` has its own key `<submissionID>:lead`. Concurrent duplicates yield exactly one GA4 send. If GA4 returns non-2xx the `pending` claim is released so a retry can succeed. Stored data: key, outcome, booking type, timestamp only.
   - Remaining small window: a `pending` claim older than 2 minutes (Worker died mid-send) is treated as abandoned. If GA4 had accepted the hit just before the crash, a retry after that window could send it a second time.
   - Terminal outcomes (`no_consent`, `needs_review`, `consented_missing_identifiers`) are permanent by design. To reprocess one after fixing a mapping you must delete that Durable Object's data (Cloudflare dashboard) or ask for an admin endpoint to be added.
9. The Worker replies with `{"status":"..."}` only: `sent`, `duplicate`, `in_progress`, `no_consent`, `needs_review`, `consented_missing_identifiers`, `unpaid_or_unverified`, `ga4_error` (502), plus 4xx errors. Logs contain only the outcome word and submission ID.

## Assumptions the owner must confirm (not guessed silently)

1. **Payment status field.** Jotform's public docs do not guarantee one payment-status vocabulary across gateways. `isPaymentVerified()` assumes a payment control answer (type containing e.g. `stripe`, `paypal`, `square`) whose `answer` (or its `paymentArray` JSON) carries `status` / `paymentStatus` equal to one of `PAID`, `COMPLETED`, `COMPLETE`, `SUCCEEDED`, `SUCCESS`, `SUCCESSFUL`, `CAPTURED`, `SETTLED`. Any other value, a refund flag or a missing block is treated as unpaid. If your gateway reports something else, **every real booking will be recorded as `unpaid_or_unverified` and no conversion will be sent**; look at one real paid submission (`GET /submission/{id}` with your API key) and adjust `worker/src/payment.js`.
2. **Product field unique name.** Placeholder `bookingOption` (`PRODUCT_FIELD_NAME`). Confirm the real unique name (Jotform builder > field > Properties > Advanced > Unique Name). If not found, product names in the payment block are used. If both exist they must agree.
3. **Amount format.** Total is read from the payment block (`total`, e.g. `25.00 GBP`). If it can't be read the result is `needs_review`.
4. **API host.** `JOTFORM_API_BASE`: `https://api.jotform.com` (default), `https://eu-api.jotform.com` for EU-safe accounts, or your enterprise/PCI/HIPAA host if the account requires it (the form is on `pci.jotform.com`; use whichever host accepts your read-only key for this form).

## Google Ads attribution (investigation)

Sources I could consult were limited (the sandbox could not open developers.google.com directly), so **the points below marked "unverified" must be checked against the live docs before relying on them**:

- Google Measurement Protocol reference: <https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference> and "Send events": <https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events>.
- Supported and used here: `client_id`, `consent.ad_user_data`, `consent.ad_personalization`, event params `session_id`, `session_number`, `engagement_time_msec`, `value`, `currency`, `transaction_id`. Sending the genuine `client_id` + `session_id` is what ties the event to the originating GA4 session (and therefore to the source/medium and gclid-derived attribution GA4 already captured via gtag in that session).
- **gclid / gbraid / wbraid in Measurement Protocol: not sent.** I could not confirm from official documentation that MP accepts them as event parameters, and the task rule is to send only what is officially supported. They are collected on the link and stored in Jotform only for the optional offline route below; the Worker ignores them and stores nothing extra.
- Ads therefore relies on: GA4 linked to Google Ads, the `booking_complete` event marked as a **key event** in GA4, and importing that key event into Google Ads (Ads > Goals > Conversions > Import > Google Analytics 4). Imports depend on Ads/GA4 linking and consent signals; ad-attribution of MP events is not guaranteed.
- **Optional alternative, not implemented:** Google Ads offline click conversion import (gclid + conversion time + value + currency), done manually from Jotform's hidden `gclid` field. It is a separate, non-GA4 route and needs the visitor's advertising consent, which is why `gclid` is only appended with marketing consent.
- **Timing limits:** MP `timestamp_micros` can backdate up to 72 hours (this Worker omits it, so events are stamped on receipt). MP events whose `session_id` is not in an active session window may not attribute to that session. Sending promptly on webhook receipt keeps the event as close to the session as possible. Hits for the real session may not appear in Realtime if the session has expired.

## Consent behaviour change (needs owner sign-off)

`assets/js/cookie-consent.js` previously granted `ad_storage`, `ad_user_data` and `ad_personalization` whenever **analytics** was accepted. Now: analytics toggle -> `analytics_storage` only; marketing toggle -> `ad_storage`, `ad_user_data`, `ad_personalization` granted only when marketing is true, and denied otherwise including on withdrawal. Consent Mode default stays `denied`, there is no raw gtag loader, banner UI/copy and cookie names are unchanged, and `analytics-consent-granted` is still dispatched. `/privacy-policy.html` was **not** edited: these are pseudonymous identifiers stored in Jotform only when the visitor consented, so the owner should review its wording.

## Jotform setup

1. In the form builder add **hidden** fields (default empty) with these exact **Unique Names**: `analytics_consent`, `ads_consent`, `ga_client_id`, `ga_session_id`, `ga_session_number`, `gclid`, `gbraid`, `wbraid`. Jotform pre-fills a field from a URL parameter of the same name.
2. Settings > Integrations > Webhooks > add `https://<worker-name>.<ACCOUNT_SUBDOMAIN>.workers.dev/jotform?token=<WEBHOOK_SECRET>`.
3. Keep Thank You redirect `https://singtheeasyway.com/thank-you.html` with no parameters.
4. Confirm the payment gateway's status semantics and the product field's unique name (see assumptions).
5. Create a **read-only** API key (Account Settings > API) and confirm the API host.
6. Make sure the webhook fires for the submission only when payment completes, if the gateway allows. The Worker also verifies payment itself.

## GA4 setup

1. Admin > Data streams > the web stream > Measurement Protocol API secrets > create; use as `GA4_API_SECRET`.
2. Mark `booking_complete` as a **key event** (and optionally `generate_lead`). Do not use any page-view or thank-you event as a conversion.
3. Validate payloads against `https://www.google-analytics.com/debug/mp/collect?measurement_id=G-72QBZSZZBP&api_secret=...` (the production endpoint returns 2xx even for bad payloads).
4. Verify in DebugView / Realtime.

## Environment variables

| Name | Kind | Notes |
| --- | --- | --- |
| `WEBHOOK_SECRET` | secret | long random string |
| `JOTFORM_API_KEY` | secret | read-only |
| `GA4_API_SECRET` | secret | MP API secret |
| `JOTFORM_API_BASE` | var | default `https://api.jotform.com` |
| `GA4_MEASUREMENT_ID` | var | default `G-72QBZSZZBP` |
| `JOTFORM_FORM_ID` | var | default `262622799830063` |
| `PRODUCT_FIELD_NAME` | var | default placeholder `bookingOption` |
| `PRODUCT_MAP_JSON` | var, optional | see above |

Secrets are set with `wrangler secret put` and never committed. `.dev.vars` is git-ignored.

## Deploy

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put WEBHOOK_SECRET
npx wrangler secret put JOTFORM_API_KEY
npx wrangler secret put GA4_API_SECRET
npx wrangler deploy        # applies the Durable Object migration (new_sqlite_classes) and workers.dev route
```

## Rollback

Remove the webhook in Jotform; `npx wrangler rollback` or delete the Worker; revert the PR. Booking and payment are unaffected because the Worker is outside the booking path.

## Tests

`cd worker && npm install && npm test` (Node `node:test`; real SQLite via `node:sqlite` behind the production Durable Object class; jsdom for the client link tests). Plus `python3 assets/scripts/check-site.py`.

## Owner test script (three real paid bookings)

Use a browser with analytics consent accepted. Check GA4 DebugView/Realtime after each.

| Booking | Expected `booking_complete` | transaction_id |
| --- | --- | --- |
| Consultation (£25) | `booking_type=consultation`, `value=25`, `currency=GBP` | a unique Jotform submission ID |
| Single Lesson (£85) | `single_lesson`, `85`, `GBP` | a different unique ID |
| Development Programme (£700) | `development_programme`, `700`, `GBP` | a different unique ID |

Each should also produce exactly one `generate_lead` with the same ID. Then check: refresh `/thank-you.html` -> no new event; revisit -> none; open `/thank-you.html` manually -> none; Resend the webhook -> no second event (`duplicate`); decline analytics, book and pay -> booking works, no GA4 event (`no_consent`); an abandoned/unpaid checkout -> no event (`unpaid_or_unverified`).
