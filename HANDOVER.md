# Sing The Easy Way, project handover

**Current as of 29 October 2026.**

`AI_RULES.md` is the source of truth for approved service facts and project
rules. `README.md` describes the repository. Dated implementation records
below are historical snapshots; use the current facts in this opening section
instead of stale prices, routes, status or technical details in those records.

## Business summary

Sing The Easy Way provides live, private, one-to-one online vocal coaching
through the Microsoft Teams app, focused on contemporary and popular singing.
The distinction is diagnosis-led judgement applied inside real music while
protecting what makes the singer's voice recognisably their own. Avoid
unsupported prestige, qualifications, outcomes or guarantees.

Current services:

- Consultation: £25 for 30 minutes; initial vocal assessment and
  recommendation; not credited against another service.
- Private Vocal Coaching: £150 for one 60-minute session; no discounted
  block-booking rate.
- Development Programme: £1,400 paid upfront for one ten-session commitment.
  Sessions 1–9 are 60 minutes; session 10 is 75 minutes with a 15-minute
  progress review and next-step plan. Valid six months from the originally
  booked first-lesson date; personal and non-transferable; no guaranteed
  result. Weekly sessions are strongly recommended, fortnightly may work
  where necessary, and approximately two hours of independent practice each
  week is expected.
- Professional Artist Coaching: from £250 per hour, one-hour minimum,
  confidential enquiry, scope agreed before delivery, and no immediate
  payment through ordinary coaching routes.

Coaching is available from age 16. For a 16- or 17-year-old, a parent or
legal guardian purchases the service and accepts its terms.

Terms need narrow UK consumer-contract review. Privacy wording needs exact
approved-copy follow-up; neither is represented as finally legally approved.

## Current website status

- Implementation commits are on `review/private-vocal-coaching-pricing`:
  - Logo: `339f1630467bacfefd0351d48dde2fdfa0d9c79a`
  - Website implementation: `9cb5d75a4bde4981bea0b959cddc5a49cd4d7d79`
- Pull request #11 targets `main`. It is open and has not been merged,
  deployed or published.
- `app/` and `worker/` were not changed.
- The site checker reports only the two approved capital-letter exceptions in
  preserved source-logo filenames.
- The current sitemap contains 51 canonical public pages. Utility pages and
  templates are excluded.
- Paid coaching form:
  `https://pci.jotform.com/form/262622799830063`
- General Enquiry:
  `https://form.jotform.com/263014255269052`
- Professional Artist and Industry Enquiry:
  `https://form.jotform.com/263013855697062`
- Community signup form `261037482331047` remains separate.
- GA4 loads only after analytics consent. Only clicks to the three approved
  forms are measured; form completion and payment are not measured. Advertising
  and marketing consent remain denied.
- Browser screenshots are unavailable because the local MCP browser
  repeatedly malformed or rejected the local URL; responsive browser testing
  was not completed.
- The shared public and template photo placements use the approved
  `assets/images/matt/matt-thompson-studio-headshot.webp`.

## Historical implementation records

The dated sections below document earlier repository states. Any historical
price, service name, conversion flow, consent behaviour, unresolved item or
deployment status in those entries is superseded by the current status above
and `AI_RULES.md`.

## Documentation correction made on 20 September 2026

`README.md` was brought into line with `AI_RULES.md` by:

- Adding ADHD & Autism to the documented header order
- Removing the incorrect statement that ADHD & Autism is footer-only
- Adding Film & Recording and Cookie Settings to the documented footer
- Removing the hard-coded public-page count
- Adding the film and recording page to the repository map
- Separating the current enquiry flow from the planned direct-booking update

No live HTML, CSS or JavaScript change is represented by this documentation update.

## Direct-booking change

The site now uses one booking form that allows a visitor to choose:

1. A 30-minute consultation for £25
2. A single 60-minute lesson for £85
3. The Development Programme (10 lessons) for £700

- Booking URL: `https://pci.jotform.com/form/262622799830063`
- Primary CTA wording: `Book Online`
- Primary destination: `/book-online.html`
- Product options:
  1. 30-minute consultation, £25
  2. Single 60-minute lesson, £85
  3. Development Programme (10 lessons), £700
- Contact page remains the support/questions route and is not a competing booking page.

## Files expected to change when booking is implemented

At minimum, inspect and coordinate:

- `AI_RULES.md`
- `README.md`
- `HANDOVER.md`
- `index.html`
- `about.html`
- `lessons.html`
- `pricing.html`
- `testimonials.html`
- `faq.html`
- `blog.html`
- `contact.html`
- `singing-lessons-for-adhd-and-autism.html`
- `vocal-coach-film-recording-pronunciation.html`
- `privacy-policy.html`, if the provider or payment flow requires it
- `terms.html`, if booking, cancellation or payment wording changes
- Both files in `/templates/`
- `/assets/js/main.js`
- Analytics or consent scripts only if the integration requires them

Do not make unrelated changes.

## Booking implementation safeguards

- Use one booking form, not separate competing forms for each product.
- Keep one clear site-wide primary action.
- Product-specific buttons may be used on the pricing page, while still opening the same booking form with the relevant option selected where supported.
- Keep a clear message route for prospective students who have questions.
- Do not confuse the booking form with the community signup.
- Preserve consent-gated analytics.
- Do not invent prices, availability, guarantees, scarcity or booking terms.
- Update both templates whenever the header, footer, stylesheet list or primary destination changes.

## Launch blockers: decisions needed from Matt

1. **Refunds (decided by Matt).** There is no money-back guarantee. Terms are the authoritative policy. The FAQ states this and directs unhappy customers to contact Matt directly. Do not add any refund promise that is not in Terms. Terms section 4 still needs a legal check.
2. **Star ratings.** `ratingValue: 5` was removed from every Review in the testimonials schema because the ratings were not confirmed. Reinstate only with real ratings. Reviews by Vivienne Dargan, Sarah K., James R. and Emma L. appear only in schema, not as visible copy. Confirm they are genuine and consented, or remove them.
3. **Jane Morris.** Confirm consent for her full name and the description "Professional vocalist and experienced coach with 25+ years in the industry" (home, contact, results, schema).
4. **Wording to soften if unverifiable:** "they all improved", "hundreds of times", "countless students" (FAQ and blog index), "One change you can hear" (`blog/confidence-is-not-a-personality-trait.html`), and the operational promises (priority booking, email support, response times).

## Consistency pass: items Matt must verify

A site-wide consistency pass standardised offers (Consultation £25, Single Lesson £85, Development Programme £700), removed legacy discount wording, unified navigation and footer, and separated lesson CTAs (Book Online) from professional CTAs (Professional Services). The following statements were left as they were and need factual confirmation from Matt. None have been strengthened or invented.

- "More than 25 years" of experience, and trained at the Academy of Contemporary Music.
- Results page: "Three notes to three and a half octaves" case study, including "well known in India". Unattributed and unverified.
- Results page: Jane Morris and other named testimonials. Confirm consent for names and descriptions.
- Film & Recording page: "there are very few people doing it properly", "I currently work with a film director", "Tour and stadium preparation", and the Spain, India and UK client claim.
- Film & Recording page: "Remote or on location" and "On location work can be discussed". This is the only possible exception to Microsoft Teams as the sole delivery platform.
- Contact page: "recording artists, actors, TV personalities" and "25+ years of professional vocal coaching experience".
- Terms section 4: the Development Programme refund wording was reworded to remove discount framing. The sums are unchanged (completed lessons charged at £85). Have this checked before relying on it legally.
- Consultation wording "at least one change you can hear" remains on some blog posts and works as a guarantee.
- Blog posts `tech-setup` and `choosing-singing-teacher` mention Zoom, Skype and Google Meet as general advice. Lessons themselves are Microsoft Teams only. Decide whether to reword.
- Professional enquiries currently go to Matt's email. A separate enquiry form has not been created.

## Open items

- Blog article middles remain accurate but more generic than the openings, asides, lesson sections and bios.
- Tablet layout still requires live browser checking.
- Validate first live booking and conversion events after deployment.

## Things that will trip you up

- The real site uses the non-www domain.
- `/CNAME` and `/googlef8e9acb5c788aa99.html` must not be deleted.
- The enquiry form and community signup are different forms.
- `/app/` is a separate booking application and is outside the website rules unless Matt explicitly includes it in a task.
- Never add a raw Google Analytics tag to a page. Analytics loads only after consent.
- Do not claim a booking workflow is live until it has been published and tested.

## Required checks before publication

Run:

```bash
python3 assets/scripts/check-site.py
```

A task is not complete unless the checker passes and its output is reported.

Also verify manually:

- Header and mobile navigation
- Footer links and Cookie Settings
- Booking destination and all product choices
- Confirmation and payment behaviour
- Contact fallback
- Keyboard operation and visible focus
- Desktop, tablet and mobile layouts
- Consent behaviour
- GA4 events after consent
- No broken links, missing images or placeholder content


## Protection update made on 20 September 2026

The three governing files were strengthened as one coordinated documentation update.

`AI_RULES.md` now adds:

- Matt-only authority for explicit, task-specific exceptions
- A mandatory pre-edit inspection process
- Scope locking and destructive-change protection
- Preservation rules for approved content, design and technical hooks
- A stricter blog-production quality gate
- Security, privacy and third-party code safeguards
- Clear separation between editing, committing, pushing, merging, deployment and live verification
- Failure and stop conditions

`README.md` now summarises the safe contribution workflow and blog quality gate.

This handover records the change so a future AI does not mistake the safeguards for optional guidance.

These rules do not make AI work risk-free and do not authenticate the identity of a person sending instructions. They require the active request to contain Matt's explicit approval and require changes to remain reviewable and reversible.

No HTML, CSS, JavaScript, sitemap, legal page or live deployment was changed by this documentation-only update.

## Rollback

If the booking form, payment, confirmation or live deployment fails, revert the booking commit and restore the prior enquiry-first CTA state.

## Book Online implementation record (20 September 2026)

- Booking URL: `https://pci.jotform.com/form/262622799830063`
- Booking form ID: `262622799830063`
- Site-wide primary CTA: `Book Online`
- Primary destination: `/book-online.html`
- Booking options:
  - 30-minute consultation, £25
  - One-to-one singing lesson, £85
  - Development Programme (10 lessons), £700
- Contact fallback: `/contact.html` for support and questions only
- Files changed:
  - All public root HTML pages and all live blog posts for primary CTA destination/label consistency
  - `/book-online.html` (new canonical booking page)
  - `/templates/page-template.html` and `/templates/blog-post-template.html`
  - `/pricing.html` for the three booking-option buttons and direct booking URL
  - `/contact.html` to keep it lightweight support/questions, not a competing booking page
  - `/assets/js/main.js` for consent-gated booking CTA tracking updates
  - `/sitemap.xml` to include `/book-online.html` once
  - `AI_RULES.md`, `README.md`, `HANDOVER.md` for live booking documentation
- Checks run:
  - `python3 assets/scripts/check-site.py` → `PASSED. No broken links, no missing images, no placeholders.`
- Deployment result: `Pending merge into main and publishing pipeline completion`
- Live verification: `Pending post-deployment manual check on non-www production URL`
- Manual/Jotform verification still required:
  - Jotform-side booking confirmation/payment behaviour on live form
  - Live deployment confirmation from published non-www site

## Stale Jotform logic repair (11 October 2026)

- Retired enquiry form `261603325649357` removed from the codebase. It must not control any button, popup or handler.
- Approved booking form remains `262622799830063`. Community signup form `261037482331047` is unchanged and remains separate.
- Files changed:
  - `assets/js/main.js`: removed the "JOTFORM MODAL HANDLER" block (retired popup plus `[data-booking]`/`[data-enquiry]` listeners)
  - `terms.html`, `testimonials.html`: removed the `feedback2.js` widget and button click handler scripts (including the undefined `widget.open()` call); repaired malformed trailing content in `terms.html`
  - `blog/choir-singing.html`: removed the stale `[data-booking]` handler
  - 22 blog posts (`blog/comparing-your-voice-to-other-singers.html`, `confidence-is-not-a-personality-trait.html`, `perfectionism-is-hurting-your-singing.html`, `singing-lessons-autistic-adults.html`, `stage-fright.html`, `the-fear-arrives-before-the-note.html`, `told-you-could-not-sing-as-a-child.html`, `vibrato-mastery.html`, `vocal-agility.html`, `vocal-dynamics.html`, `vocal-health.html`, `vocal-muscle-memory.html`, `vocal-power.html`, `vocal-range.html`, `vocal-stamina.html`, `vocal-twang.html`, `vocal-warmups.html`, `voice-in-your-head-says-you-cannot-sing.html`, `why-singing-lessons-fail-adhd.html`, `why-you-freeze-when-someone-watches.html`, `why-you-sound-better-alone.html`): removed corrupted fragments after the closing `</html>`
  - `singing-lessons-for-adhd-and-autism.html`: moved the community signup section (form `261037482331047`, unchanged) from after `</html>` to just before the footer
  - `book-online.html`: removed the hero "Book Online" button that linked to the page itself
  - `assets/scripts/check-site.py`: new checks for retired form, stale widget code, bare `data-booking`/`data-enquiry`, wrong Jotform form IDs and trailing content after `</html>`
  - `README.md`, `HANDOVER.md`: retired-form wording corrected. `AI_RULES.md` needed no change.
- Check result: `python3 assets/scripts/check-site.py` → `PASSED`
- Deployment result: `Pending merge into main and publishing pipeline completion`
- Live verification: `Pending post-deployment manual check on non-www production URL`

## Thank-you page, plain email links and About/FAQ updates (12 October 2026)

- Purpose: `/thank-you.html` is the private page shown after a successful booking. It confirms only that the booking has been received.
- Intended public URL: `https://singtheeasyway.com/thank-you.html`
- Booking form ID: `262622799830063` (unchanged). Community form `261037482331047` unchanged. Retired ID `261603325649357` remains absent.
- Required Jotform redirect (to be set by Matt in Jotform, successful submission only, no personal data or field variables in the URL): `https://singtheeasyway.com/thank-you.html`
- SUPERSEDED (see the verified conversion tracking section below): the page-load `booking_complete` (`trackBookingComplete`, `sessionStorage` key `ste_booking_complete_sent`) was removed because it counted manual visits. `thank-you.html` sends no event.
- Consent: the event never fires before analytics consent, and fires if consent is granted later on the page. No second GA install, measurement ID or Google Ads code was added.
- No personal data (names, emails, phone numbers, dates, products, answers, notes, health information, payment details, booking references or query strings) is sent by the event. GA collects the page URL automatically, so the Jotform redirect URL must stay free of parameters.
- Existing behaviour not changed: older events in `main.js` check `typeof window.gtag === 'function'`, but the page head defines a Consent Mode stub, so that check is true before consent. Consider tightening it in a future approved task.
- Exclusions: `noindex, nofollow`; not in `sitemap.xml`; not in header or footer navigation; no page links to it. `check-site.py` enforces this.
- Site-wide email rule: all Matt email links are exactly `mailto:matt@singtheeasyway.com`. Changed: `professional-services.html` (2 links) and `vocal-coach-film-recording-pronunciation.html` (3 links), each had `?subject=Professional%20Services%20Enquiry` removed.
- Files created: `thank-you.html`
- Files modified: `AI_RULES.md`, `README.md`, `HANDOVER.md`, `about.html`, `contact.html`, `faq.html`, `privacy-policy.html` (Cookiebot wording only), `professional-services.html`, `vocal-coach-film-recording-pronunciation.html`, `assets/js/main.js`, `assets/js/cookie-consent.js`, `assets/scripts/check-site.py`
- Checker result: `python3 assets/scripts/check-site.py` → `Checked 53 pages. PASSED. No broken links, no missing images, no placeholders.`
- Branch: `copilot/review-and-inspect-files`. Commit ID: see `git log` on that branch and the pull request description.
- Items for Matt (not changed): privacy policy cookie table does not match the implementation (cookies are `SingTheEasyWay_Consent`, `SingTheEasyWay_Analytics`, `SingTheEasyWay_Marketing`, 365 days; no `CookieConsent` or `PHPSESSID` set by this code); payment providers (Stripe, PayPal) unverified; the booking form is described as an "enquiry form"; planned thank-you page and `booking_complete` event are not described; terms need legal review (section 1, section 4, refund timing, no mention of the confirmation process).

### Status of each stage

| Stage | Status |
| --- | --- |
| Edited locally | Done |
| Committed | Done on the working branch (see branch and commit above) |
| Pushed | Pending, depends on the pull request tooling |
| Merged | Not done |
| Deployed | Not done |
| Verified live | Not done |
| Configured in Jotform | Not done. The repository cannot prove or activate it |
| Verified in analytics (GA4) | Not done |
| Google Ads | Not configured or verified. No Google Ads conversion is claimed |

## Verified server-side booking conversion (booking_complete)

- Purpose: `booking_complete` is the only primary conversion and is recorded only server-side from a verified, PAID Jotform submission (form `262622799830063`), once per submission ID, and only with analytics consent. Page loads never count. `pricing_viewed`, `book_online_click`, `consultation_selection`, `single_lesson_selection` and `development_programme_selection` are secondary funnel events, not conversions.
- Platform: standalone Cloudflare Worker + SQLite Durable Object in `worker/` on `*.workers.dev` (site is static GitHub Pages, so Pages Functions are not compatible). Full design, Jotform/GA4 setup, env vars, deploy, rollback and owner test script: `docs/booking-conversion-tracking.md`.
- Client changes (`assets/js/main.js`): removed `trackBookingComplete()` and the Jotform postMessage listener; booking links get consented GA identifiers at click time; the retired ten-lesson option id renamed to `development_programme`; events renamed `consultation_selection`, `single_lesson_selection`, `development_programme_selection`.
- Consent change (needs owner sign-off): `cookie-consent.js` analytics toggle grants `analytics_storage` only; marketing toggle alone grants ad storage/user data/personalization.
- `check-site.py`: `worker` added to SKIP_DIRS; fails on the retired ten-lesson option id, `booking_complete` or `Date.now()` in `assets/js/*.js`.
- NOT verified live: no real Jotform payment, GA4 receipt or deployment has been tested. Pending owner actions: create hidden Jotform fields, deploy Worker and set secrets, add webhook, confirm payment-status field and product field unique name, run three paid tests. `privacy-policy.html` section 15 now describes the identifiers, webhook and server-side measurement (owner to review wording). `PRODUCT_FIELD_NAME` is `bookingOptions` (owner-confirmed, in `worker/wrangler.toml`); it has no default in code.
