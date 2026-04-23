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

## For Your Telegram Bot — Authentication & Automation

### GitHub Token Setup

Your bot needs a GitHub token to commit changes. Store this securely as an environment variable — **never** hardcode the token in script files.

### Setting Up the Token

On your server, create an environment variable file that your bot can read:

```bash
# Create a .env file in your bot's directory
echo "GITHUB_TOKEN=your_token_here" > /path/to/bot/.env

# Secure the file so only you can read it
chmod 600 /path/to/bot/.env
```

In your bot script, read it from the environment:
```python
import os
from dotenv import load_dotenv

load_dotenv()  # Loads variables from .env file
token = os.environ.get('GITHUB_TOKEN')
```

### Repository Details

| Setting | Value |
|---|---|
| Repository | `mattthompson152-blip/singtheeasyway111` |
| Branch | `main` |
| Token | Stored in `.env` file (provided separately) |

### Daily Automation — 7:00 AM Every Day

To run the blog post creation automatically at 7:00 AM daily, set up a cron job:

```bash
# Edit your crontab
crontab -e

# Add this line for 7:00 AM daily:
0 7 * * * cd /path/to/singtheeasyway111 && python3 /path/to/your/bot-script.py >> /var/log/blog-bot.log 2>&1
```

This will:
- Run every day at 7:00 AM
- Execute your bot script
- Log output to `/var/log/blog-bot.log`

### Bot Script Structure

Your Python bot script should follow this order:

```python
#!/usr/bin/env python3
"""
Daily Blog Post Bot for Sing The Easy Way
Runs at 7:00 AM every day
"""

import os
import subprocess
from datetime import datetime

REPO_PATH = "/path/to/singtheeasyway111"
BLOG_DIR = os.path.join(REPO_PATH, "assets/blog")
WAITING_DIR = os.path.join(REPO_PATH, "assets/images/imageswaitingtobeposted")
POSTED_DIR = os.path.join(REPO_PATH, "assets/images/imagesalreadyposted")
TEMPLATE_PATH = os.path.join(BLOG_DIR, "BLOG_POST_TEMPLATE.html")
BLOG_HTML_PATH = os.path.join(REPO_PATH, "blog.html")
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')

def create_blog_post():
    # 1. Check if images are available
    images = [f for f in os.listdir(WAITING_DIR) if f.endswith('.jpg')]
    if not images:
        print("No images available in imageswaitingtobeposted/")
        return False
    
    # 2. Pick the first image
    image = images[0]
    
    # 3. Generate date (today)
    today = datetime.now()
    date_code = today.strftime("%d%m")  # DDMM format
    date_display = today.strftime("%B %d, %Y")  # e.g., "April 24, 2026"
    
    # 4. Generate topic and filename (customise this logic)
    # Your bot should generate or select a topic
    topic = "your-topic-here"  # Replace with actual topic generation
    filename = f"blog-post-{topic}-{date_code}.html"
    
    # 5. Read template and replace placeholders
    with open(TEMPLATE_PATH, 'r') as f:
        content = f.read()
    
    # Replace all placeholders (customise content generation)
    content = content.replace('[POST TITLE]', 'Your Generated Title')
    content = content.replace('[DATE, 2026]', date_display)
    content = content.replace('[CATEGORY]', 'Singing Tips')
    content = content.replace('[IMAGE-NAME]', image.replace('.jpg', ''))
    # ... replace other placeholders
    
    # 6. Save blog post
    post_path = os.path.join(BLOG_DIR, filename)
    with open(post_path, 'w') as f:
        f.write(content)
    
    # 7. Move image to posted folder
    os.rename(
        os.path.join(WAITING_DIR, image),
        os.path.join(POSTED_DIR, image)
    )
    
    # 8. Add card to blog.html
    # Read current blog.html and insert new card at top
    with open(BLOG_HTML_PATH, 'r') as f:
        blog_content = f.read()
    
    # Insert card HTML (before first existing card)
    card_html = f'''    <article class="blog-card">
        <a href="assets/blog/{filename}" class="image-link">
            <img src="assets/images/imagesalreadyposted/{image}" alt="Blog post image" loading="lazy">
        </a>
        <div class="blog-card-content">
            <span class="blog-date">{date_display}</span>
            <h2><a href="assets/blog/{filename}">Your Post Title</a></h2>
            <p>Your post description.</p>
            <a href="assets/blog/{filename}" class="read-more">Read more →</a>
        </div>
    </article>

'''
    # Find insertion point (after <section class="blog-grid">)
    blog_content = blog_content.replace(
        '<section class="blog-grid">\n',
        '<section class="blog-grid">\n' + card_html
    )
    
    with open(BLOG_HTML_PATH, 'w') as f:
        f.write(blog_content)
    
    # 9. Git commit and push
    os.chdir(REPO_PATH)
    subprocess.run(['git', 'add', '-A'], check=True)
    subprocess.run(['git', 'commit', '-m', f'Add blog post for {date_display}'], check=False)
    subprocess.run(['git', 'push', 'origin', 'main'], check=True)
    
    print(f"Blog post created: {filename}")
    print(f"Image used: {image}")
    return True

if __name__ == "__main__":
    create_blog_post()
```

### Daily Checklist for the Bot

Before running each day:
- [ ] Check `imageswaitingtobeposted/` has at least 1 image
- [ ] Check `imageswaitingtobeposted/` is not empty (stop if it is)
- [ ] Generate or select a topic for the blog post
- [ ] Generate the blog content using the template
- [ ] Use today's date in DDMM format
- [ ] Move the used image to `imagesalreadyposted/`
- [ ] Add card to top of `blog.html`
- [ ] Commit with message: "Add blog post for [Date]"
- [ ] Push to `main` branch

---

## Important Rules

1. **Always use the template** — never copy an existing blog post
2. **One image per post** — every post gets exactly one unique image
3. **Move images, don't copy** — images must leave `imageswaitingtobeposted/`
4. **Date format is DDMM** — always 4 digits at the end of the filename
5. **New cards go at the top** of blog.html
6. **No visible template text** — remove all placeholder comments before publishing
7. **Every post must have** a tip box and a CTA consultation button
8. **Never hardcode tokens** — always use environment variables
