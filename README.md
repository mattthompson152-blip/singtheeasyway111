# Sing The Easy Way Website

Sing The Easy Way is an elite, diagnosis-led, owner-delivered vocal-coaching practice providing live, private, one-to-one online coaching through Microsoft Teams for contemporary and popular singers.

## Current live state

Matt Thompson has confirmed that the elite-positioning implementation was merged into `main`, deployed and is live and working. No further speculative redesign or copy rewrite is currently required.

Final elite-positioning merge and live deployment were confirmed by Matt Thompson. Exact final pull-request, merge-commit, deployment-run and deployed-SHA identifiers require repository verification.

Known implementation evidence before final merge:

- starting `origin/main`: `8cbca80cffb4a7c62086af4ab883188be2497389`
- branch: `feat/elite-positioning`
- implementation commit: `f85fada7a068e0c2e731b591483b1d8c81311234`
- commit message: `Complete the elite website positioning`

## Canonical governance files

Read before material work:

1. `Project_Master_Context_v1.md` — concise active master authority.
2. `AI_RULES.md` — durable operational rules.
3. `README.md` — practical repository guide.
4. `HANDOVER.md` — current execution checkpoint.
5. `student lesson transcription system.docx` — specialist authority only for transcription, recording, automated notes, privacy, retention and storage.

Matt's newest explicit instruction takes precedence. Current owner-supplied repository evidence is authoritative for website facts. Historical snapshots and copied conversations are background only.

## Commercial position

The website must demonstrate diagnosis before exercises, root-cause analysis, Matt's individual judgement, direct owner delivery, work inside real music, protection of vocal identity, disciplined evidence, confidential professional handling, deliberate hierarchy, restrained presentation and selective conversion routes.

Avoid low-ticket framing, casual retail language, price-first selling, generic exercise-led messaging, mass-market lesson language, empty luxury claims, artificial scarcity and unsupported prestige.

## Services

### Consultation

£25 for 30 minutes through Microsoft Teams, providing an initial vocal assessment and recommendation. It is not credited against another service. Frame it as controlled diagnostic access, not a trial, taster, starter lesson, discount or free assessment.

### Private Vocal Coaching

£150 for one private 60-minute online session involving individual work on a particular problem, song or goal. No discounted block-booking rate.

### Development Programme

£1,400 paid upfront for one ten-session individual commitment. Sessions 1–9 are 60 minutes; session 10 is 75 minutes and includes a 15-minute progress review and next-step plan. Valid for six months from the originally booked first-lesson date, personal and non-transferable. Weekly sessions are strongly recommended, fortnightly scheduling may work where necessary, and approximately two hours of independent practice each week is expected. No generic curriculum or guaranteed result.

### Professional Artist Coaching

Online, from £250 per hour, with a one-hour minimum, a separate confidential enquiry and scope agreed before delivery. Outside the ordinary consumer payment journey.

Friendships, legacy arrangements and exceptional private agreements do not alter the published or standard professional-service position. Do not disclose client names, relationships, bookings, results or endorsements without exact written permission.

### Eligibility and delivery

Online through Microsoft Teams; contemporary and popular singing; available from age 16; parent or legal guardian purchase for a 16- or 17-year-old. Do not imply classical, operatic or ordinary in-person coaching.

## Primary routes

- Website: https://singtheeasyway.com
- Repository: https://github.com/mattthompson152-blip/singtheeasyway111
- Paid Consultation, Private Vocal Coaching and Development Programme: https://pci.jotform.com/form/262622799830063
- General Enquiry: https://form.jotform.com/263014255269052
- Professional Artist and Industry Enquiry: https://form.jotform.com/263013855697062
- Privacy Policy: https://singtheeasyway.com/privacy-policy.html
- Thank-you page: https://singtheeasyway.com/thank-you.html
- Contact: mailto:matt@singtheeasyway.com

General Enquiry is not free coaching, diagnosis, assessment, recording analysis or personalised advice. Professional work remains separate, confidential and outside the consumer payment journey.

## Jotform and conversion constants

Preserve:

- approved prices above;
- Booking Options field name `bookingOptions`;
- community-signup form ID `261037482331047`;
- documented primary conversion `booking_complete`;
- consent-gated analytics;
- the thank-you page's limited role.

Jotform configuration is external to the repository. A thank-you page load, booking click, form view or product selection is not proof of completed booking.

## Repository layout

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

Core public pages remain in the repository root. Blog articles remain in `/blog/`. Templates remain in `/templates/`. Assets remain in established directories. `sitemap.xml` is the canonical live-page inventory.

## Templates

Use `/templates/page-template.html` and `/templates/blog-post-template.html`. Do not build a new page from scratch or copy a live page. Templates remain `noindex, nofollow`, outside `sitemap.xml`, blocked in `robots.txt` and outside public navigation.

Update both templates when a shared header, footer, stylesheet list, form route or booking destination changes.

## Approved assets

- Primary logo: `assets/images/Logo/sing-the-easy-way-logo-transparent.png`
- Preserved source logo: `assets/images/Logo/Logo No Background.png`
- Preserved source logo: `assets/images/Logo/Logo black backgroud.png`
- Approved owner image: `assets/images/matt/matt-thompson-studio-headshot.webp`
- Rejected image: `assets/images/matt/matt-thompson-online-vocal-coaching.webp`

Do not restore the rejected image or alter approved binaries without authority.

## Reviews and evidence

Never invent or embellish reviews, results, students, statistics, credentials, clients, productions, guarantees, relationships or outcomes. Preserve approved review wording. Do not name the former review platform or add replacement attribution. Ali's review remains an incomplete source-limited extract; do not reconstruct the ending.

## Blog publishing

Every new post requires:

1. An image prepared with `assets/scripts/prepare-image.py`.
2. The article in `/blog/`.
3. A newest-first card on `/blog.html`.
4. A canonical entry in `/sitemap.xml`.
5. A passing site checker.
6. Desktop, tablet and mobile validation.

Blog content must strengthen diagnosis-led authority and avoid generic search filler, mass-market tips, arbitrary listicles, fabricated examples, quick-result promises and unsupported claims.

## Protected areas

Do not alter without Matt's explicit instruction:

- `app/` and `worker/`
- Jotform, Stripe, payment and booking logic
- email automation
- Microsoft Teams and Power Automate configuration
- transcription, recording and lesson-data storage
- analytics and cookie consent
- secrets and credentials
- DNS and CNAME
- GitHub Pages, deployment and repository settings

Never delete `/CNAME` or `/googlef8e9acb5c788aa99.html`.

## Transcription and privacy

Use `student lesson transcription system.docx` for technical facts. Automated evidence-based notes require a transcript; MP4 recording is separate and optional; the verified lesson-date process may still depend on a matching recording. Do not claim UK-only processing, fixed complete deletion, exact retention, exact model or subprocessor, exact folder permissions or immediate complete erasure without verification. Matt must personally check every final ten-session review before sharing.

## Required validation

```text
git diff --check
python3 assets/scripts/check-site.py
git status --short -- app/ worker/
git status --short
git diff --stat
git diff --name-only
```

Review the full diff. Confirm positioning, exact prices and routes, enquiry separation, `bookingOptions`, community-signup form ID `261037482331047`, analytics and consent, evidence rules, links, assets, H1 structure, accessibility, responsive behaviour, approved binaries, protected areas and authorised file scope.

The only accepted filename-policy exceptions are:

- `assets/images/Logo/Logo No Background.png`
- `assets/images/Logo/Logo black backgroud.png`

## Bounded branch-to-pull-request practice

1. Read the four canonical governance files.
2. Verify current `origin/main`, active branch and working-tree state.
3. Use one new bounded branch authorised by Matt.
4. Declare exact scope, protected areas, validation, commit message, pull-request target and stop condition.
5. Edit only authorised files.
6. Run validation and review the full diff.
7. Stage only authorised files.
8. Push only the authorised branch.
9. Open or update no more than one authorised pull request into `main`.
10. Report exact files, validation, commit, pull request, merge and publication state.

Do not force-push, use destructive reset, rebase shared work, delete branches, alter settings, merge, deploy or publish unless Matt explicitly authorises the exact action.

## Current priority

Do not reopen the completed elite-positioning implementation. The current commercial priority is evidence-led acquisition using diagnosis-led authority content, qualified Consultation requests, professional referrals, measured search testing and restrained follow-up.

Measure qualified enquiries, attended Consultations, suitable paying clients and professional enquiries rather than follower or view counts alone.
