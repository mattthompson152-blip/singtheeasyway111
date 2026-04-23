# Blog Post Creation Guide
## How to Create a New Blog Post for Sing The Easy Way

This guide explains the complete process for creating a new blog post. Follow these steps in order every time.

---

## Step 1: Pick an Image

1. Open the folder: `assets/images/imageswaitingtobeposted/`
2. Pick **one** image from this folder (any image, there is no specific order)
3. Make a note of the exact image filename — you will need it for the blog post
4. **Do not use an image that is already in** `assets/images/imagesalreadyposted/` — every blog post must have a unique image

---

## Step 2: Choose a Date

Every blog post must have a date. Use this format in the filename:

- **Day** = two digits (01, 02, 03 ... 31)
- **Month** = two digits (01=January, 02=February, 03=March, 04=April, 05=May, 06=June, 07=July, 08=August, 09=September, 10=October, 11=November, 12=December)
- Combined as **DDMM** at the end of the filename

### Examples:
- April 23rd = `2304`
- May 1st = `0105`
- December 15th = `1512`

If you are creating multiple posts, use consecutive dates (e.g., 2304, 2404, 2504).

---

## Step 3: Create the Blog Post Filename

The filename must follow this exact pattern:

```
blog-post-[topic]-[DDMM].html
```

### Examples:
- `blog-post-thirty-day-singing-2304.html` (23rd April)
- `blog-post-authentic-voice-2204.html` (22nd April)
- `blog-post-breathing-techniques-2004.html` (20th April)
- `blog-post-vocal-warmups-0105.html` (1st May)

### Rules for the filename:
- Must start with `blog-post-`
- Topic should be short, descriptive, and use hyphens between words
- Must end with `-DDMM.html` (the date code)
- Use only lowercase letters, numbers, and hyphens
- No spaces, no underscores, no special characters

---

## Step 4: Use the Template

1. Open the file: `assets/blog/BLOG_POST_TEMPLATE.html`
2. Make a copy of this file
3. Rename your copy using the filename from Step 3
4. The copy goes in: `assets/blog/` folder

### Important:
- **Every new blog post must start from this template**
- Do not copy an existing blog post — always use the template
- The template has all the correct styling, navigation, footer, and structure built in

---

## Step 5: Fill in the Template

Replace all placeholder text marked with `[SQUARE BRACKETS]` with real content.

### Page-Specific Elements (you must update these):

| Placeholder | What to Put | Example |
|---|---|---|
| `[POST TITLE]` | The blog post title (include keywords) | How to Warm Up Your Voice Before Singing |
| `[DATE, 2026]` | The full date | April 23, 2026 |
| `[CATEGORY]` | Topic category | Singing Tips, Vocal Health, Performance, etc. |
| `[IMAGE-NAME].jpg` | The exact filename of the image from Step 1 | singing-lessons-warm-up.jpg |
| `[Descriptive alt text]` | Alt text for the image (describe it with keywords) | Singer warming up voice before online singing lessons |
| `[Opening hook...]` | First paragraph — grab the reader's attention | Struggling with high notes? You're probably not warming up properly... |
| `[Section Heading - H2]` | Subheadings (H2) for each section | Why Warming Up Matters |
| `[Content paragraph]` | The body text | Write helpful, engaging content here... |
| `[Tip Title]` | Title for the tip box | Pro Tip: Hum First |
| `[Tip content...]` | Advice inside the tip box | Always start with gentle humming... |
| `[CTA Headline]` | Call-to-action heading | Ready to Transform Your Voice? |
| `[CTA text...]` | Text encouraging booking | Book an online singing lesson with Matt... |

### Content Writing Rules:
- Write naturally about the topic
- Mention "online singing lessons" or "virtual singing lessons" where it fits naturally
- Include Matt Thompson's name and 25+ years experience where relevant
- Write at least 4-5 sections with useful information
- Include a tip box with actionable advice
- Every post must have a CTA box with the consultation button (already in template)

---

## Step 6: Update the Image

In the blog post, find this line:

```html
<img src="../../assets/images/imagesalreadyposted/[IMAGE-NAME].jpg" alt="[Descriptive alt text with keywords]" class="blog-hero-image">
```

Replace:
- `[IMAGE-NAME].jpg` with the **exact filename** of the image you picked in Step 1
- `[Descriptive alt text with keywords]` with a description of the image

### Example:
```html
<img src="../../assets/images/imagesalreadyposted/singing-lessons-warm-up.jpg" alt="Singer warming up voice before online singing lessons with Matt Thompson" class="blog-hero-image">
```

**Important:** The image path must be `../../assets/images/imagesalreadyposted/` — this is the correct folder for images that have been assigned to a blog post.

---

## Step 7: Move the Image to "Posted"

After you have assigned the image to the blog post (Step 6), **move the image file** from:

```
assets/images/imageswaitingtobeposted/[IMAGE-NAME].jpg
```

to:

```
assets/images/imagesalreadyposted/[IMAGE-NAME].jpg
```

### Rules:
- The image must be **moved** (not copied) — it should no longer exist in `imageswaitingtobeposted/`
- Every image in `imagesalreadyposted/` must be used by exactly one blog post
- `imageswaitingtobeposted/` should only contain images that haven't been used yet

---

## Step 8: Add a Card to blog.html

Open `blog.html` and add a new card for this blog post.

### Card template:
```html
<article class="blog-card">
    <a href="assets/blog/blog-post-[topic]-[DDMM].html" class="image-link">
        <img src="assets/images/imagesalreadyposted/[IMAGE-NAME].jpg" alt="[Alt text]" loading="lazy">
    </a>
    <div class="blog-card-content">
        <span class="blog-date">[Month Day], 2026</span>
        <h2><a href="assets/blog/blog-post-[topic]-[DDMM].html">[Post Title]</a></h2>
        <p>[Short description for the card]</p>
        <a href="assets/blog/blog-post-[topic]-[DDMM].html" class="read-more">Read more →</a>
    </div>
</article>
```

### Card placement:
- New cards go **at the top** of the blog grid (before existing cards)
- The newest post should always be first
- Keep the same card structure as existing cards

### Example completed card:
```html
<article class="blog-card">
    <a href="assets/blog/blog-post-vocal-warmups-2304.html" class="image-link">
        <img src="assets/images/imagesalreadyposted/singing-lessons-warm-up.jpg" alt="Singer warming up voice before online singing lessons" loading="lazy">
    </a>
    <div class="blog-card-content">
        <span class="blog-date">April 23, 2026</span>
        <h2><a href="assets/blog/blog-post-vocal-warmups-2304.html">How to Warm Up Your Voice Before Singing</a></h2>
        <p>Learn the essential warm-up techniques used by professional singers to prepare their voice for practice and performance.</p>
        <a href="assets/blog/blog-post-vocal-warmups-2304.html" class="read-more">Read more →</a>
    </div>
</article>
```

---

## Step 9: Final Checks

Before finishing, verify:

- [ ] Image was picked from `imageswaitingtobeposted/`
- [ ] Image filename is correctly written in the blog post
- [ ] Blog post filename follows the pattern: `blog-post-[topic]-[DDMM].html`
- [ ] Blog post is saved in `assets/blog/` folder
- [ ] All `[SQUARE BRACKET]` placeholders have been replaced with real content
- [ ] Image has been **moved** from `imageswaitingtobeposted/` to `imagesalreadyposted/`
- [ ] Card has been added to `blog.html` at the top of the grid
- [ ] Card uses the same image as the blog post
- [ ] Card date matches the blog post date
- [ ] Navigation links work correctly

---

## Quick Reference Summary

```
1. Pick image from imageswaitingtobeposted/
2. Choose date → DDMM format
3. Create filename: blog-post-[topic]-[DDMM].html
4. Copy BLOG_POST_TEMPLATE.html to assets/blog/ with new filename
5. Fill in all [placeholders] with real content
6. Set the image src to ../../assets/images/imagesalreadyposted/[IMAGE-NAME].jpg
7. Move image from imageswaitingtobeposted/ to imagesalreadyposted/
8. Add card to top of blog.html
9. Verify everything works
```

---

## Folder Structure Reference

```
repo/
├── assets/
│   ├── blog/
│   │   ├── BLOG_POST_TEMPLATE.html    ← Start every post from here
│   │   └── blog-post-[topic]-DDMM.html ← Your new blog posts go here
│   └── images/
│       ├── imageswaitingtobeposted/    ← Pick images from here
│       └── imagesalreadyposted/        ← Move used images here
├── blog.html                           ← Add your card here
└── index.html                          ← Main website
```

---

## Important Rules

1. **Always use the template** — never copy an existing blog post
2. **One image per post** — every post gets exactly one unique image
3. **Move images, don't copy** — images must leave `imageswaitingtobeposted/`
4. **Date format is DDMM** — always 4 digits at the end of the filename
5. **New cards go at the top** of blog.html
6. **No visible template text** — remove all placeholder comments before publishing
7. **Every post must have** a tip box and a CTA consultation button
