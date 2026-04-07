# BLOG POST IMAGE CHECKLIST

**CRITICAL: Every blog post MUST have an image. No exceptions.**

## Pre-Publish Checklist (MANDATORY)

Before publishing ANY blog post, verify:

- [ ] **Image is present** - Every post must have at least one featured image
- [ ] **Image is from Unsplash** - Use only Unsplash URLs (images.unsplash.com)
- [ ] **Image is unique** - Never reuse a photo ID that's been used before
- [ ] **Alt text includes "online singing lessons"** - SEO requirement
- [ ] **Image width is 1200px** - Use `?w=1200&q=80` in URL
- [ ] **Image loads correctly** - Test the URL in browser before publishing

## Where to Add the Image

In the blog post HTML, add the image AFTER the breadcrumb navigation and BEFORE the article content:

```html
<section class="page-header">
    <div class="container">
        <div class="breadcrumb">
            <a href="../index.html">Home</a> / <a href="../blog.html">Blog</a>
        </div>
    </div>
</section>

<article class="blog-post">
    <div class="container">
        <!-- IMAGE GOES HERE -->
        <img src="https://images.unsplash.com/photo-XXXXXXXXXXXX-XXXXXXXXXXXX?w=1200&q=80" 
             alt="[Descriptive text including online singing lessons]" 
             class="article-image">
        
        <p>Article content starts here...</p>
    </div>
</article>
```

## Used Image Inventory (NEVER REUSE)

| Date | Post | Unsplash Photo ID |
|------|------|-------------------|
| Apr 7 | How to Belt Without Damaging Your Voice | photo-1493225255756-d9584f8606e9 |
| Apr 6 | How to Develop Natural Vibrato | photo-1516280440614-6697288d5d38 |
| Apr 5 | What to Expect From Your First Online Singing Lesson | photo-1593642632559-0c6d3fc62b89 |
| Apr 4 | 7 Essential Questions to Ask Before Hiring an Online Singing Teacher | photo-1598387993441-a364f854c3e1 |
| Apr 3 | Preparing for Online Singing Lessons - Tech Setup | photo-1598488035139-bdbb2231ce04 |
| Apr 2 | Vocal Registers Explained | photo-1511379938547-c1f69419868d |
| Apr 1 | How to Sing with Emotion | photo-1525201548942-d8732f6617a0 |
| Mar 31 | How Vocal Exercise Builds Muscle Memory | photo-1571019613454-1cb2f99b2d8b |
| Mar 30 | Vocal Health | photo-1544367567-0f2fcb009e0b |
| Mar 29 | Best Microphones for Home Vocal Recording | photo-1590602847861-f357a9332bbc |
| Mar 28 | How to Find Your Vocal Range | photo-1514320291840-2e0a9bf2a9ae |
| Mar 27 | Online vs In-Person Lessons | photo-1587825140708-dfaf72ae4b04 |
| Mar 26 | Overcoming Stage Fright | photo-1493225457124-a3eb161ffa5f |
| Mar 25 | Breathing Techniques | photo-1511671782779-c97d3d27a1d4 |
| Mar 24 | 30-Day Singing Improvement | photo-1507838153414-b4b713384a76 |
| Mar 23 | 5 Vocal Warm-Ups | photo-1470225620780-dba8ba36b745 |

## How to Find New Images

1. Go to https://unsplash.com
2. Search for relevant keywords (e.g., "singer", "microphone", "vocal", "performance")
3. Select an image
4. Copy the photo ID from the URL (the part after /photo-)
5. Format: `https://images.unsplash.com/photo-[ID]?w=1200&q=80`

## Image Verification Command

To verify all posts have images, run:
```bash
cd blog && for f in *.html; do
  if grep -q 'images.unsplash.com' "$f"; then
    echo "✓ $f has image"
  else
    echo "❌ NO IMAGE: $f"
  fi
done
```

## ⚠️ DO NOT FORGET

**The #1 mistake is forgetting to include an image.**

Every. Single. Post. Must. Have. An. Image.

Check this BEFORE committing to GitHub.
Check this BEFORE updating blog.html.
Check this BEFORE telling the user the post is ready.

**When in doubt, add an image.**
