# AI RULES

This file is the source of truth for this website.

All AI agents must follow these rules.

Do not invent new folders, layouts, button styles, page types, or URL structures.

If a requested change conflicts with this file, stop and report the conflict.

## REPOSITORY DESTINATIONS

### Core pages

Core HTML pages must live in the repository root.

```text
/index.html
/about.html
/lessons.html
/pricing.html
/testimonials.html
/faq.html
/blog.html
/contact.html
/privacy-policy.html
/terms.html
/environmental-policy.html
```

Do not place core pages inside `/assets/`.

### Blog posts

All blog post HTML files must live inside:

```text
/blog/
```

Correct:

```text
/blog/vocal-health.html
/blog/vocal-range.html
/blog/breathing-techniques.html
```

Wrong:

```text
/assets/blog/vocal-health.html
/assets/blog/blog-post-vocal-health.html
/blog-post-vocal-health.html
```

Do not include `blog-post-` in blog filenames.

Blog filenames must be lowercase, short, descriptive, and separated with hyphens.

### Images

All image files must live inside:

```text
/assets/images/
```

Approved image folders:

```text
/assets/images/global/
/assets/images/pages/
/assets/images/blog/
/assets/images/testimonials/
/assets/images/matt/
```

Do not place HTML files inside any asset folder.

### Stylesheets

All CSS files must live inside:

```text
/assets/css/
```

The main stylesheet must be:

```text
/assets/css/styles.css
```

Reuse existing styles. Do not add page specific CSS unless necessary.

### JavaScript

All JavaScript files must live inside:

```text
/assets/js/
```

The main JavaScript file must be:

```text
/assets/js/main.js
```

### Fonts and media

Fonts must live inside:

```text
/assets/fonts/
```

Video, audio, and downloadable media must live inside:

```text
/assets/media/
```

### Sitemap

The sitemap must remain at:

```text
/sitemap.xml
```

It must contain only live canonical pages.

Do not include broken pages, redirects, duplicate URLs, drafts, asset files, or `/index.html`.

Use `/` as the homepage URL.

## REQUIRED REPOSITORY STRUCTURE

```text
/
├── AI_RULES.md
├── index.html
├── about.html
├── lessons.html
├── pricing.html
├── testimonials.html
├── faq.html
├── blog.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── environmental-policy.html
├── sitemap.xml
├── robots.txt
├── blog/
│   └── article-name.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    ├── fonts/
    ├── media/
    └── images/
        ├── global/
        ├── pages/
        ├── blog/
        ├── matt/
        └── testimonials/
```

Do not create alternative folder structures.

## FILE NAMING RULES

Use lowercase filenames with hyphens between words.

Correct:

```text
online-singing-lessons.html
vocal-health.webp
```

Wrong:

```text
OnlineSingingLessons.html
online_singing_lessons.html
online singing lessons.html
```

Do not rename a file without updating every reference to it.

## STANDARD HEADER

Every public page must use the same header.

Required order:

```text
Logo
Home
Lessons
About
Results
Pricing
Blog
Book a Consultation
```

`Results` must link to the testimonials page.

`Book a Consultation` must be the main header button.

Desktop and mobile navigation must contain the same destinations.

Do not add navigation items without explicit instruction.

## STANDARD FOOTER

Every public page must use the same footer.

Required links:

```text
FAQ
Contact
Privacy Policy
Terms
Environmental Policy
```

Also include the business name, copyright notice, primary contact method, and valid social links.

Do not place footer only pages in the main navigation.

## STANDARD COMMERCIAL PAGE TEMPLATE

Use this order:

```text
Site header
Hero section
One clear H1 heading
Short supporting statement
Primary consultation button
Who the page is for
Problems or needs addressed
Service details
How it works
Client evidence
Pricing or next step
Frequently asked questions
Final consultation section
Site footer
```

Use one clear primary action per section.

## STANDARD BLOG PAGE TEMPLATE

Use this order:

```text
Site header
Article category
Article title
Short introduction
Main article content
Relevant lesson recommendation
Author information
Related articles
Consultation call to action
Site footer
```

Every blog post must link to `/blog.html` and one relevant commercial page.

Every new blog post must be added to the blog index.

## BUTTON RULES

Reuse the existing global button classes.

Only use:

```text
Primary button
Secondary button
Text link
```

Primary buttons are for consultation or booking actions.

All buttons must use clear wording, existing brand styles, visible hover styles, visible keyboard focus styles, accessible contrast, and responsive sizing.

Do not use vague wording such as `Click Here`, `Learn More`, `Submit`, or `Go`.

Use specific wording such as `Book a Consultation`, `View Lesson Options`, or `See Client Results`.

Use anchor elements for navigation. Use button elements for actions.

## HEADING RULES

Every page must contain exactly one `<h1>`.

Heading levels must follow a logical order.

Do not use headings only to make text larger.

## LINK RULES

Internal links must use root relative paths.

Correct:

```text
/about.html
/blog/vocal-health.html
/assets/images/blog/vocal-health.webp
```

Do not publicly link to `/index.html`. Use `/`.

Do not use placeholder links such as `#`, `javascript:void(0)`, or `example.com`.

## MANDATORY LINK AND BUTTON VALIDATION

Before completing any task, check every changed page.

Verify that:

* Every anchor has a valid destination.
* Every internal link points to an existing page or file.
* Every button performs the intended action.
* Header and footer links work.
* Consultation links use the correct destination.
* Image, CSS, and JavaScript paths point to existing files.
* Blog posts link back to the blog index.
* Renamed files have updated incoming links.
* No placeholder links remain.
* No broken relative paths remain.
* No duplicate homepage URL is introduced.
* Desktop and mobile navigation work.

The task is not complete until these checks pass.

Do not claim validation was completed unless it was actually performed.

If a destination cannot be verified, report it clearly.

## RESPONSIVE LAYOUT RULES

Check every changed page at desktop, tablet, and mobile widths.

Verify that text and images remain inside their containers, buttons remain readable, navigation remains usable, spacing stays consistent, and no horizontal scrolling is introduced.

Do not approve a layout after checking desktop only.

## SEO AND ACCESSIBILITY RULES

Every public page must have a unique title, unique meta description, one H1, canonical URL, descriptive image alt text, and valid internal links.

Use `/` as the canonical homepage URL.

Create a permanent redirect whenever a live page is moved or renamed.

All meaningful images require descriptive alt text. Decorative images require empty alt text.

All form fields require visible labels.

All interactive elements must work with a keyboard and display a visible focus state.

## CHANGE CONTROL

Inspect the existing repository and styles before making changes.

Reuse existing components wherever possible.

Do not create duplicate pages, duplicate components, duplicate CSS rules, unnecessary folders, invented URLs, invented booking destinations, or invented contact details.

Do not change unrelated files.

Do not claim testing that was not performed.

## DEFINITION OF DONE

A task is complete only when:

* Files are in the correct folders.
* The correct page template has been followed.
* The header and footer match the website.
* Buttons use approved styles.
* Changed links and asset paths have been validated.
* Desktop, tablet, and mobile layouts have been checked.
* Metadata is correct.
* No duplicate page has been created.
* No placeholder content remains.
* Only relevant files have been changed.

If any item fails, the task is not complete.
