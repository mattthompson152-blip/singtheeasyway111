# Sing The Easy Way, project handover

**Current as of 20 September 2026.**

This file replaces earlier handover documents. `AI_RULES.md` is the source of truth. `README.md` describes the repository. This file records current status, known gaps and the next planned change.

## Business summary

Matt Thompson teaches live one-to-one online singing lessons on Microsoft Teams. He has more than 25 years of experience and trained at the Academy of Contemporary Music. Students range from complete beginners to recording artists, touring performers and actors.

The website exists to turn suitable visitors into consultation bookings and ongoing students.

Current prices:

- 30-minute consultation: £25, normally £50
- Single 60-minute lesson: £85
- Block of 10 lessons: £700, or £70 per lesson, saving £150

Positioning: lessons that make a singer sound more like themselves, not less. Individuality is the differentiator.

Matt has ADHD. This is public on the site and is presented as part of why his teaching works. Never state or imply that Matt is autistic.

## Current website status

- The site is live at the non-www domain.
- Core pages, specialist pages and blog posts are listed in `sitemap.xml`.
- The standard header includes ADHD & Autism immediately after Lessons.
- ADHD & Autism appears in both the header and footer.
- The standard footer includes Film & Recording and Cookie Settings.
- The current primary call to action is **Book a consultation, £25**, linking to `/contact.html`.
- The enquiry form ID is `261603325649357`.
- The community signup form ID is `261037482331047`.
- Analytics is consent-gated.

## Documentation correction made on 20 September 2026

`README.md` was brought into line with `AI_RULES.md` by:

- Adding ADHD & Autism to the documented header order
- Removing the incorrect statement that ADHD & Autism is footer-only
- Adding Film & Recording and Cookie Settings to the documented footer
- Removing the hard-coded public-page count
- Adding the film and recording page to the repository map
- Separating the current enquiry flow from the planned direct-booking update

No live HTML, CSS or JavaScript change is represented by this documentation update.

## Planned direct-booking change

Matt intends to add one booking form that allows a visitor to choose:

1. A 30-minute consultation for £25
2. A single 60-minute lesson for £85
3. A block of 10 lessons for £700

This form is not marked as implemented in this handover. Before changing the site, confirm and record:

- The booking form URL or form ID
- The final primary CTA wording
- Whether the form opens inline, on `/contact.html`, in a modal or on an external booking page
- The payment and confirmation behaviour
- The required GA4 events
- Any privacy-policy wording required for the booking provider and payments

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

## Open items

- Blog article middles remain accurate but more generic than the openings, asides, lesson sections and bios.
- Tablet layout still requires live browser checking.
- Direct booking remains to be implemented and tested.
- After implementation, verify the first booking and conversion events in the live systems.

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

Before implementing direct booking, create a commit containing the working enquiry-first version. If the booking form, payment, confirmation or live deployment fails, revert the booking commit and restore **Book a consultation, £25** links to `/contact.html`.
