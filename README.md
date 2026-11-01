# Sing The Easy Way, Website

Sing The Easy Way is an elite, diagnosis-led, owner-delivered vocal-coaching practice providing live, private, one-to-one online coaching through Microsoft Teams for contemporary and popular singers.

The governing commercial standard is elite, not merely premium.

## Authority

Resolve conflicts in this order:

1. Matt Thompson's newest explicit instruction.
2. `Project_Master_Context_v1.md`.
3. `AI_RULES.md`.
4. Current content in the owner-supplied repository.
5. `README.md`.
6. `HANDOVER.md`.
7. `student lesson transcription system.docx` when transcription, recording, lesson notes, privacy or retention is relevant.

## Primary routes

- Website: `https://singtheeasyway.com`
- Repository: `https://github.com/mattthompson152-blip/singtheeasyway111`
- Paid Consultation, Private Vocal Coaching and Development Programme: `https://pci.jotform.com/form/262622799830063`
- General Enquiry: `https://form.jotform.com/263014255269052`
- Professional Artist and Industry Enquiry: `https://form.jotform.com/263013855697062`
- Privacy Policy: `https://singtheeasyway.com/privacy-policy.html`
- Thank-you page: `https://singtheeasyway.com/thank-you.html`
- Contact: `mailto:matt@singtheeasyway.com`

Use the non-www domain. Do not alter, shorten or substitute approved destinations.

## Positioning

The website must demonstrate:

- diagnosis before exercises;
- root-cause analysis;
- specialist individual judgement;
- direct owner delivery;
- work applied inside real music;
- protection of the singer's recognisable identity;
- disciplined evidence;
- confidential professional handling;
- deliberate hierarchy;
- restrained presentation;
- selective, high-trust conversion routes.

Avoid low-ticket framing, casual retail language, price-first selling, generic exercise-led messaging, mass-market lesson language, empty luxury claims and unsupported prestige.

## Services

### Consultation

- £25
- 30 minutes
- initial vocal assessment and recommendation
- not credited against another service

Frame the Consultation as controlled diagnostic access, not a trial, taster, starter lesson, discount or free assessment.

### Private Vocal Coaching

- £150
- one private 60-minute online session
- no discounted block-booking rate

### Development Programme

- £1,400 paid upfront
- ten completely individual sessions
- sessions 1-9 are 60 minutes
- session 10 is 75 minutes with a 15-minute progress review and next-step plan
- valid for six months from the originally booked first-lesson date
- weekly sessions strongly recommended
- approximately two hours of independent practice each week expected
- personal and non-transferable
- no generic curriculum
- no guaranteed result

### Professional Artist Coaching

- online
- from £250 per hour
- one-hour minimum
- separate confidential enquiry
- scope agreed before delivery
- no immediate payment through ordinary consumer-coaching routes

Coaching is online through Microsoft Teams, available from age 16 and limited to contemporary and popular singing.

## Customer routing

### Request a Consultation

Use `https://pci.jotform.com/form/262622799830063`.

### Private Vocal Coaching

Use `https://pci.jotform.com/form/262622799830063`.

### Apply for the Development Programme

Use `https://pci.jotform.com/form/262622799830063`.

### General Enquiry

Use `https://form.jotform.com/263014255269052` only for general information, operational questions, theoretical questions and clarification of service suitability.

Never present General Enquiry as free coaching, a free lesson, free diagnosis, free assessment, recording analysis, personalised advice or a substitute for a paid service.

### Confidential Professional Enquiry

Use `https://form.jotform.com/263013855697062` for professional artists, recordings, performance preparation, production, pronunciation, diction, label, West End and confidential industry enquiries.

Never route professional work through the consumer payment form.

## Jotform

Approved paid products:

- Consultation: £25
- Private Vocal Coaching: £150
- Development Programme: £1,400

Owner-verified Booking Options unique field name:

`bookingOptions`

Community-signup form ID:

`261037482331047`

The community signup is separate from paid booking and enquiry routes.

Jotform configuration is external to the repository. Do not claim repository code proves the current external configuration.

## Repository structure

```text
/
├── Project_Master_Context_v1.md
├── AI_RULES.md
├── README.md
├── HANDOVER.md
├── public HTML pages
├── blog/
├── docs/
│   └── booking-conversion-tracking.md
├── templates/
│   ├── page-template.html
│   └── blog-post-template.html
├── app/
├── worker/
└── assets/
    ├── css/
    ├── js/
    ├── images/
    ├── media/
    └── scripts/
        ├── prepare-image.py
        └── check-site.py
```

Core pages remain in the repository root. Blog articles remain in `/blog/`. Templates remain in `/templates/`. Assets remain in their established directories. `sitemap.xml` is the canonical live-page inventory.

## Templates

Use:

- `/templates/page-template.html`
- `/templates/blog-post-template.html`

Do not build new pages from scratch or copy a live page.

Templates remain `noindex, nofollow`, outside `sitemap.xml`, blocked in `robots.txt` and outside navigation.

## Protected systems

Do not alter without Matt's explicit instruction:

- `app/`
- `worker/`
- Jotform configuration
- Stripe
- payment and booking logic
- email automation
- Microsoft Teams configuration
- Power Automate
- transcription and recording
- lesson-data storage
- analytics and consent
- secrets and credentials
- DNS
- `CNAME`
- GitHub Pages and deployment settings
- repository settings

Never delete `/CNAME` or `/googlef8e9acb5c788aa99.html`.

## Approved assets

- Primary logo: `assets/images/Logo/sing-the-easy-way-logo-transparent.png`
- Preserved source logo: `assets/images/Logo/Logo No Background.png`
- Preserved source logo: `assets/images/Logo/Logo black backgroud.png`
- Approved owner image: `assets/images/matt/matt-thompson-studio-headshot.webp`
- Rejected image: `assets/images/matt/matt-thompson-online-vocal-coaching.webp`

Do not restore the rejected image or alter approved binaries.

## Reviews and evidence

Never invent or embellish reviews, results, students, statistics, credentials, clients, productions, guarantees or outcomes.

Preserve owner-approved review wording exactly.

Do not name the former review platform or add unsupported replacement attribution.

Ali's review remains an incomplete, source-limited extract. Do not reconstruct the ending.

## Analytics and consent

Google Analytics must remain consent-gated and must not load before analytics consent.

Consent is controlled through `assets/js/cookie-consent.js`.

Cookie Settings must remain available at `#cookie-settings`.

The documented primary conversion is `booking_complete`. It is intended to be recorded server-side from a verified paid Jotform submission with product and payment verification, submission-ID deduplication, analytics consent, the correct service, value and GBP currency.

Conversion documentation: `docs/booking-conversion-tracking.md`.

A thank-you page load, booking click, form view or product-selection event is not proof of a completed booking.

Do not invent or expose analytics identifiers, secrets or credentials.

## Thank-you page

`/thank-you.html` remains `noindex, nofollow`, outside `sitemap.xml`, outside navigation, free of personal data and limited to acknowledging receipt of a submission.

It is not proof of payment or appointment confirmation and is not the source of `booking_complete`.

## Blog publishing

Every new post requires:

1. An image prepared with `assets/scripts/prepare-image.py`.
2. The article in `/blog/`.
3. A newest-first card on `/blog.html`.
4. A canonical entry in `/sitemap.xml`.
5. A passing site checker.
6. Desktop, tablet and mobile validation.

Blog content must strengthen diagnosis-led authority and avoid generic search filler, mass-market tips, fabricated examples and unsupported claims.

## Required validation

```bash
git diff --check
python3 assets/scripts/check-site.py
git status --short -- app/ worker/
git status --short
git diff --stat
git diff --name-only
```

Review the complete diff and confirm:

- elite positioning is preserved or strengthened;
- merely premium framing is absent;
- prices and routes remain exact;
- General Enquiry is not free-coaching framed;
- professional enquiries remain separate;
- `bookingOptions` remains unchanged;
- analytics and consent remain unchanged unless explicitly authorised;
- no former review-platform reference returns;
- links and assets resolve;
- each changed public page has one H1;
- accessibility and responsive behaviour remain sound;
- protected areas remain untouched;
- only authorised files changed.

The only accepted filename-policy exceptions are:

- `assets/images/Logo/Logo No Background.png`
- `assets/images/Logo/Logo black backgroud.png`

## Bounded autonomous execution

One explicit bounded instruction authorises inspection, authorised editing, validation, diff review, staging, the specified commit, push to the authorised branch and one authorised pull-request action.

Do not ask for conversational approval between authorised stages.

Combine independent checks. Combine staging, commit and push where practical. Do not request approval for temporary-file cleanup. Do not repeat successful or denied commands. Do not restart completed discovery or blocked browser testing.

Matt may select `Tool permissions: Unconditional approval / Allow All` to remove repeated platform prompts. This does not authorise anything outside the declared scope and does not independently authorise merging, deployment, publication, branch deletion, destructive Git actions, settings changes or protected-system changes.

## Current next workstream

The next material task is one bounded elite-positioning implementation that must:

1. Make diagnosis-led judgement the dominant homepage signal.
2. Reframe the Consultation as controlled diagnostic access.
3. Reduce retail language and price-led selling.
4. Use fewer, deliberate conversion routes.
5. Keep consumer and confidential professional work separate.
6. Protect General Enquiry from free-coaching framing.
7. Preserve all approved routes.
8. Review testimonial claims against approved evidence.
9. Curate the visible blog index around diagnosis-led authority.
10. Preserve accessibility, prices and responsive behaviour.
11. Avoid empty luxury wording and unsupported prestige.
12. Leave analytics, consent, Jotform, payment, Worker and booking-conversion systems unchanged.

Expected implementation area:

- `index.html`
- `pricing.html`
- `book-online.html`
- `development-programme.html`
- `professional-services.html`
- `testimonials.html`
- `blog.html`
- `templates/page-template.html`
- `templates/blog-post-template.html`
- `assets/css/styles.css`
- `assets/css/responsive.css` only if required

Confirm the exact scope from the current repository. Do not assume every listed file must change.

## Contact

`matt@singtheeasyway.com`
