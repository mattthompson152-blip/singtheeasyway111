# DROPLET CONSOLE CHECKLIST
## singtheeasyway.com Website Maintenance

Last Updated: April 11, 2026

---

## 🚀 COPY-PASTE COMMANDS

### Push All Changes to GitHub
```bash
cd /root/.openclaw/workspace/singtheeasyway111 && git add -A && git commit -m "Update: $(date '+%Y-%m-%d')" && git push
```

### Check All Pages Have Terms & FAQ
```bash
echo "=== Checking navigation ==="
grep -l "terms.html" /root/.openclaw/workspace/*.html | wc -l
grep -l "faq.html" /root/.openclaw/workspace/*.html | wc -l
echo "Should be: all HTML files"
```

### Check Image Consistency
```bash
echo "=== April 6 image check ==="
grep "photo-1526218626217" /root/.openclaw/workspace/blog.html /root/.openclaw/workspace/index.html /root/.openclaw/workspace/blog/blog-post-vibrato-mastery.html
```

### Find Duplicate Images
```bash
grep -oE "photo-[0-9]+" /root/.openclaw/workspace/blog.html | sort | uniq -c | sort -rn | grep -v "^ *1 "
```

---

## 📋 DAILY BLOG POST CHECKLIST

Copy this before creating each post:

```
□ Blog post created at 7am
□ Image is unique (check MEMORY.md Images Used list)
□ NO hyphens in post title
□ NO hyphens in post content
□ NO hyphens in summary
□ GA code G-72QBZSZZBP included
□ Alt tags include "online singing lessons"
□ Picture filename helps SEO
□ Terms & Conditions link in navigation
□ FAQ link in navigation
□ Pushed to git
```

---

## 🚨 URGENT: FIX DUPLICATE IMAGES

| Image ID | Date 1 | Date 2 | Action |
|----------|--------|--------|--------|
| photo-1493225457124 | April 9 | March 26 | REPLACE ONE |
| photo-1511671782779 | April 13 | March 25 | REPLACE ONE |
| photo-1507838153414 | April 11 | March 24 | REPLACE ONE |
| photo-1514320291840 | April 14 | March 28 | REPLACE ONE |
| photo-1470225620780 | April 12 | March 23 | REPLACE ONE |

### How to Fix (Manual - Unsplash blocking downloads):
1. Go to unsplash.com manually
2. Download NEW unique singer/vocal image
3. Save to `/root/.openclaw/workspace/assets/images/blog/`
4. Update the LATER date's blog post HTML
5. Update blog.html
6. Update index.html  
7. Add to MEMORY.md Images Used list
8. Run git push command above

---

## 📁 FILE LOCATIONS

| File | Location |
|------|----------|
| Main pages | `/root/.openclaw/workspace/*.html` |
| Blog posts | `/root/.openclaw/workspace/blog/*.html` |
| Images | `/root/.openclaw/workspace/assets/images/blog/` |
| Sitemap | `/root/.openclaw/workspace/sitemap.xml` |
| This checklist | `/root/.openclaw/workspace/DROPLET_CONSOLE.md` |
| Memory/History | `/root/.openclaw/workspace/MEMORY.md` |
| Git repo | `/root/.openclaw/workspace/singtheeasyway111/` |

---

## 📝 BLOG HISTORY (DO NOT REPEAT)

### April 2026:
- April 16: Finding Your Authentic Voice
- April 15: Vocal Dynamics  
- April 14: Vocal Agility
- April 13: Vocal Power
- April 12: Fixing Nasal Voice
- April 11: Vocal Phrasing
- April 10: Mastering Vocal Runs
- April 9: Vocal Resonance
- April 8: High Notes Without Straining
- April 7: Belting Safely
- April 6: Natural Vibrato
- April 5: First Online Lesson
- April 4: Choosing a Teacher
- April 3: Tech Setup
- April 2: Vocal Registers
- April 1: Sing with Emotion

### March 2026:
- March 31: Vocal Exercise Muscle Memory
- March 30: Vocal Health
- March 29: Best Microphones
- March 28: Vocal Range
- March 27: Online vs In-Person
- March 26: Overcoming Stage Fright
- March 25: Breathing Techniques
- March 24: 30-Day Improvement
- March 23: Vocal Warm-Ups

---

## ⚠️ CRITICAL RULES

1. **NEVER reuse pictures** - Check Images Used list
2. **NEVER use hyphens** in titles/content/summaries  
3. **Always include GA code:** G-72QBZSZZBP
4. **Alt tags must include:** "online singing lessons"
5. **Terms & FAQ must be in** header nav and footer
6. **Sitemap.xml must include** all pages for Google

---

## 🔧 GOOGLE SEO REQUIREMENTS

### Pages that MUST exist for indexing:
- [x] index.html (Home)
- [x] about.html (About Matt)
- [x] lessons.html (Lessons)
- [x] pricing.html (Pricing)
- [x] testimonials.html (Testimonials)
- [x] contact.html (Contact)
- [x] blog.html (Blog)
- [x] terms.html (Terms & Conditions) ← FOR GOOGLE
- [x] faq.html (FAQ) ← FOR GOOGLE
- [x] privacy-policy.html (Privacy)
- [x] environmental-policy.html (Environmental)
- [x] sitemap.xml ← SUBMIT TO GOOGLE SEARCH CONSOLE

### Navigation Check:
All pages must link to Terms & Conditions and FAQ in:
1. Header navigation (desktop)
2. Burger menu (mobile)
3. Footer navigation
4. Sitemap.xml

---

## 📊 CREDENTIALS

- **GitHub:** mattthompson152-blip/singtheeasyway111
- **Website:** singtheeasyway.com
- **GA ID:** G-72QBZSZZBP

---

## ✅ TERMS & FAQ STATUS

**FIXED:** Navigation typos removed from:
- [x] index.html
- [x] blog.html
- [x] Footer on all main pages
- [x] Sitemap.xml exists with all pages

**INCLUDED IN:**
- [x] Header navigation
- [x] Footer Quick Links
- [x] Sitemap.xml
- [x] Mobile burger menu

---

*Last updated by Kimi Claw - April 11, 2026* ❤️‍🔥
