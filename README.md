# Sing The Easy Way, Website

Live one-to-one online singing lessons with Matt Thompson.

Site: https://singtheeasyway.com

`AI_RULES.md` is the source of truth for structure, layout and links. This README describes what is actually in the repository right now. If the two ever disagree, AI_RULES.md wins and this file should be corrected.

## Repository structure

```text
/
├── AI_RULES.md                  # Source of truth. Read before changing anything
├── README.md                    # This file
├── index.html                   # Homepage
├── about.html                   # About Matt
├── lessons.html                 # Lessons
├── pricing.html                 # Pricing
├── testimonials.html            # Results, client testimonials
├── faq.html                     # Frequently asked questions
├── blog.html                    # Blog index
├── contact.html                 # Contact and consultation booking
├── privacy-policy.html          # Privacy policy
├── terms.html                   # Terms and conditions
├── environmental-policy.html    # Environmental policy
├── sitemap.xml                  # Live canonical pages only
├── robots.txt
├── site.webmanifest
├── CNAME                        # Custom domain, do not delete
├── blog/                        # 24 blog posts, one file per article
├── templates/                   # Build every new page from these
└── assets/
    ├── css/
    │   ├── styles.css           # Main stylesheet
    │   ├── responsive.css       # Breakpoints
    │   ├── blog.css             # Blog article styles
    │   └── cookie-consent.css   # Cookie banner styles
    ├── js/
    │   ├── main.js              # Navigation, enquiry buttons, scroll behaviour
    │   └── cookie-consent.js    # Cookie banner
    ├── images/
    │   ├── global/              # Logo and favicons
    │   ├── pages/               # Page graphics that are not photos of Matt
    │   ├── matt/                # Every photograph of Matt
    │   ├── blog/                # Blog article images
    │   └── testimonials/        # Reserved for client images
    ├── media/                   # Video and audio
    ├── docs/                    # Internal notes, not published content
    └── scripts/                 # Maintenance shell scripts
```

## Templates, read this before adding anything

Every new page and every new blog post must be copied from a template. Never build a page from scratch, and never copy a live page.

```text
/templates/page-template.html          New commercial or informational pages
/templates/blog-post-template.html     New blog posts
```

### Adding a new page

1. Copy `/templates/page-template.html` to the root, named in lowercase with hyphens, for example `online-singing-lessons.html`
2. Replace every `[SQUARE BRACKET]` placeholder
3. Change `noindex, nofollow` to `index, follow`
4. Set the title, meta description, canonical URL and Open Graph URL to the new filename
5. Add the page to `sitemap.xml`
6. Link to it from a real page. Do not add it to the header without deciding that deliberately

### Adding a new blog post

1. Copy `/templates/blog-post-template.html` to `/blog/`, named in lowercase with hyphens, no dates, no `blog-post-` prefix
2. Replace every `[SQUARE BRACKET]` placeholder
3. Change `noindex, nofollow` to `index, follow`
4. Put the article image in `/assets/images/blog/`
5. Add the post to `blog.html` and to `sitemap.xml`
6. Check it links back to `/blog.html` and to one commercial page

### Keeping the templates honest

The templates carry the live header, footer, stylesheet list and consultation destination. If any of those change on the site, both templates must be updated in the same piece of work, or new pages will drift away from the rest of the site.

The templates are blocked in `robots.txt`, marked `noindex, nofollow`, and kept out of `sitemap.xml`, so they will never appear in search results.

## Pages

11 core pages in the root, 24 blog posts in `/blog/`, 35 public pages in total.

Every page carries the same header and the same footer.

## Photographs of Matt

All live in `/assets/images/matt/`.

| File | Where it is used |
|---|---|
| matt-thompson-headshot-primary.webp | Homepage hero, consultation section on the contact page |
| matt-thompson-headshot-secondary.webp | About Matt |
| matt-teaching-online-singing-lesson.webp | Homepage lesson section, Lessons page |
| matt-portrait-online-singing-lessons.jpg | Not currently used |
| matt-teaching.jpg | Not currently used |
| matt-motorhome-studio.jpg | Not currently used |

Use WebP for new photographs. Keep headshots at roughly 900px and wider images at roughly 1000 to 1600px. Always give images descriptive alt text.

## Navigation

Header, in this order: logo, Home, Lessons, About, Results, Pricing, Blog, Book a Consultation.

`Results` goes to `/testimonials.html`. `Book a Consultation` is the primary button and goes to `/contact.html`.

Footer carries FAQ, Contact, Privacy Policy, Terms and Environmental Policy, plus phone, email and social links. Those five are footer-only pages and must not be added to the header.

## Buttons and forms

- `[data-enquiry]` and `[data-booking]` buttons open the Jotform enquiry modal, form ID 261603325649357
- If the modal fails to load, the script falls back to `/contact.html`
- The same form is embedded directly on the contact page

## Current pricing

| Item | Price |
|---|---|
| 30 minute consultation | £25, normally £50 |
| Single 60 minute lesson | £85 |
| Block of 10 lessons | £700, which is £70 per lesson and saves £150 |

These figures appear on the homepage, pricing page, FAQ and terms. If any price changes, all four must be updated together, along with the refund example in the terms.

## Tracking

Google Analytics, G-72QBZSZZBP, is installed on every page.

To verify in Google Search Console, add the property `https://singtheeasyway.com`, choose Google Analytics as the verification method, and it will detect the existing tag.

## Local checks before publishing

- Every internal link must be root relative, for example `/about.html`, not `../about.html`
- The homepage is linked as `/`, never `/index.html`
- Every page has exactly one `<h1>`, a unique title and a unique meta description
- No placeholder links such as `#`
- Check the pages at desktop, tablet and mobile widths

## Contact

matt@singtheeasyway.com
