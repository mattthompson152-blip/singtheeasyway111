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

A blog post is four pieces of work, not one. All four are required.

**1. The image**

Never convert or rename an image by hand. Run this from the repository folder:

```bash
python3 assets/scripts/prepare-image.py <your-image> blog <keyword-phrase> <DDMM>
```

Example:

```bash
python3 assets/scripts/prepare-image.py ~/Desktop/photo.PNG blog online-singing-lessons-vocal-practice 1004
```

Give it a PNG, a JPEG, anything. It converts to JPEG, resizes to 1200px, forces lowercase, saves to `/assets/images/blog/`, checks the file exists and prints the `<img>` tag to paste. If it says FAILED, nothing was written, so fix it and run it again.

Keyword phrase options: online-singing-lessons, live-online-singing-lessons, digital-singing-lessons, remote-singing-lessons, virtual-singing-lessons, professional-singing-lessons, singing-technique, vocal-coach.

**2. The article page**

- Copy `/templates/blog-post-template.html` to `/blog/[article-name].html`
- Lowercase with hyphens, no date and no `blog-post-` prefix. The date lives on the image, not the article
- Replace every `[SQUARE BRACKET]`, switch `noindex, nofollow` to `index, follow`, set the title, description, canonical and Open Graph values

**3. The blog index**

- Add a card to `blog.html`, newest first. The exact snippet is inside the blog template and in AI_RULES.md
- A post missing from the index is invisible

**4. The sitemap**

- Add the post URL to `sitemap.xml` with priority 0.6

**Then run the checker**

```bash
python3 assets/scripts/check-site.py
```

PASSED means publish. FAILED means do not publish, fix what it lists, run it again.

It catches broken links, missing images, relative paths, placeholder links, unfinished `[PLACEHOLDERS]`, wrong H1 counts and capital letters in image filenames.

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

## The two scripts

```bash
# Convert any image into the right format, size, name and folder
python3 assets/scripts/prepare-image.py <image> <blog|matt|page> <name> [DDMM]

# Verify the whole site before publishing
python3 assets/scripts/check-site.py
```

`prepare-image.py` needs Pillow. If it is missing, install it once with `python3 -m pip install Pillow`. On a Mac it will fall back to the built in `sips` tool if Pillow is unavailable.

## Local checks before publishing

- Every internal link must be root relative, for example `/about.html`, not `../about.html`
- The homepage is linked as `/`, never `/index.html`
- Every page has exactly one `<h1>`, a unique title and a unique meta description
- No placeholder links such as `#`
- Check the pages at desktop, tablet and mobile widths

## Contact

matt@singtheeasyway.com
