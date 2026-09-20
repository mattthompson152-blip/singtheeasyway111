# Sing The Easy Way, Website

Live one-to-one online singing lessons with Matt Thompson.

Site: https://singtheeasyway.com

`AI_RULES.md` is the source of truth for structure, layout, links and conversion rules. `HANDOVER.md` carries current status and history. This README describes the repository. If they disagree, `AI_RULES.md` wins and this file must be corrected.

## Repository structure

```text
/
├── AI_RULES.md
├── README.md
├── HANDOVER.md
├── index.html
├── about.html
├── lessons.html
├── pricing.html
├── testimonials.html
├── faq.html
├── blog.html
├── contact.html
├── singing-lessons-for-adhd-and-autism.html
├── vocal-coach-film-recording-pronunciation.html
├── privacy-policy.html
├── terms.html
├── environmental-policy.html
├── sitemap.xml
├── robots.txt
├── site.webmanifest
├── CNAME
├── googlef8e9acb5c788aa99.html
├── 404.html
├── blog/
├── templates/
│   ├── page-template.html
│   └── blog-post-template.html
└── assets/
    ├── css/
    │   ├── styles.css
    │   ├── responsive.css
    │   ├── blog.css
    │   └── cookie-consent.css
    ├── js/
    │   ├── main.js
    │   └── cookie-consent.js
    ├── images/
    │   ├── global/
    │   ├── pages/
    │   ├── matt/
    │   ├── blog/
    │   └── testimonials/
    ├── media/
    └── scripts/
        ├── prepare-image.py
        └── check-site.py
```

Do not use a hard-coded public-page count here. `sitemap.xml` is the current inventory of live canonical pages.

## Templates

Every new page and blog post must be copied from the correct template. Never build a page from scratch and never copy a live page.

- `/templates/page-template.html` for commercial and informational pages
- `/templates/blog-post-template.html` for blog posts

After creating a page, replace every square-bracket placeholder, change `noindex, nofollow` to `index, follow`, update metadata and canonical URLs, add the page to `sitemap.xml`, link to it from a live page, and run the site checker.

## Publishing a blog post

A blog post requires four coordinated items:

1. An image created with `assets/scripts/prepare-image.py`
2. The article in `/blog/`
3. A card on `/blog.html`, newest first
4. A canonical entry in `/sitemap.xml`

Then run:

```bash
python3 assets/scripts/check-site.py
```

Publish only after it reports `PASSED`.

## Navigation

The standard header order is:

1. Logo
2. Home
3. Lessons
4. ADHD & Autism
5. About
6. Results
7. Pricing
8. Blog
9. Book a Consultation

`Results` links to `/testimonials.html`. `ADHD & Autism` links to `/singing-lessons-for-adhd-and-autism.html` and appears in both the header and footer. Desktop and mobile navigation must contain the same destinations.

The standard footer includes:

- FAQ
- ADHD & Autism
- Film & Recording
- Contact
- Privacy Policy
- Terms
- Environmental Policy
- Cookie Settings

It also includes the business name, copyright notice, primary contact method and valid social links.

## Calls to action and current enquiry flow

Until the direct-booking form is implemented, the site uses one primary call to action:

**Book a consultation, £25**

It links to `/contact.html`. The enquiry form uses Jotform form ID `261603325649357`. The community email signup is a separate form using ID `261037482331047`; do not confuse the two.

## Planned direct-booking update

Direct booking is planned but is not documented as live yet.

The intended single booking form will offer:

- 30-minute consultation, £25
- Single 60-minute lesson, £85
- Block of 10 lessons, £700

Before implementation, record the final booking URL or form ID and approved site-wide button wording in `AI_RULES.md`. Then update the header, both templates, relevant page calls to action, tracking hooks, privacy wording if required, and this README in one coordinated change.

Do not remove the contact route unless Matt explicitly approves that change. Keep a clear message option for visitors with questions.

## Lesson platform

Lessons are taught live on Microsoft Teams. After booking, the student receives an email containing the Teams link and the information needed for the lesson.

## Current pricing

- 30-minute consultation: £25, normally £50
- Single 60-minute lesson: £85
- Block of 10 lessons: £700, or £70 per lesson, saving £150

Prices appear on the homepage, pricing page, FAQ and terms. If a price changes, update all four in one task, including the worked refund example in the terms.

## What students receive

After every lesson, the student is sent a link to their own lesson folder containing:

- The lesson recording
- A written summary of what was covered
- A clear path setting out what to practise next

Do not describe this as an app, portal or course.

## Analytics and consent

Google Analytics must not load before consent. Consent defaults to denied and analytics is loaded only by `/assets/js/cookie-consent.js` after acceptance.

The footer must retain the `Cookie Settings` link to `#cookie-settings` so visitors can change their choice.

## Required maintenance scripts

Prepare an image:

```bash
python3 assets/scripts/prepare-image.py <image> <blog|matt|page> <name> [DDMM]
```

Check the site:

```bash
python3 assets/scripts/check-site.py
```

Do not publish after a failed check.

## Local checks before publishing

- Internal links use root-relative paths
- The homepage is linked as `/`, never `/index.html`
- Every public page has exactly one H1
- Titles and meta descriptions are unique
- No square-bracket placeholders remain
- No placeholder links remain
- Header and footer match the templates
- Consultation or booking destinations are correct
- Images, CSS and JavaScript paths resolve
- Desktop, tablet and mobile layouts are checked
- Keyboard focus and form labels are usable
- Analytics remains consent-gated

## Protected files

Do not delete:

- `/CNAME`
- `/googlef8e9acb5c788aa99.html`

Neither is a public page. Do not add either to the sitemap.

## Contact

matt@singtheeasyway.com
