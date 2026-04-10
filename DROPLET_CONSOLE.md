# DROPLET CONSOLE CHECKLIST
## singtheeasyway.com Website Maintenance

Last Updated: April 11, 2026

---

## Quick Commands

### Check Image Consistency for a Date
```bash
grep -r "photo-1526218626217" /root/.openclaw/workspace --include="*.html"
```

### Find Duplicate Images
```bash
grep -oE "photo-[0-9]+" /root/.openclaw/workspace/blog.html | sort | uniq -c | sort -rn
```

### Push Changes to Git
```bash
cd /root/.openclaw/workspace/singtheeasyway111 && git add . && git commit -m "Fix images" && git push
```

---

## Daily Tasks Checklist

- [ ] Blog post created at 7am
- [ ] Image is unique (check against MEMORY.md Images Used list)
- [ ] No hyphens in post titles
- [ ] GA code (G-72QBZSZZBP) included in post
- [ ] Alt tags include "online singing lessons"
- [ ] Picture filename helps SEO

---

## URGENT: Fix Duplicate Images

These images are used on TWO dates each:

| Image ID | Date 1 | Date 2 | Status |
|----------|--------|--------|--------|
| photo-1493225457124 | April 9 | March 26 | NEEDS FIX |
| photo-1511671782779 | April 13 | March 25 | NEEDS FIX |
| photo-1507838153414 | April 11 | March 24 | NEEDS FIX |
| photo-1514320291840 | April 14 | March 28 | NEEDS FIX |
| photo-1470225620780 | April 12 | March 23 | NEEDS FIX |

### How to Fix:
1. Download NEW unique image from Unsplash
2. Update the later date's blog post
3. Update blog.html
4. Update index.html
5. Add new image to MEMORY.md Images Used list
6. Push to git

---

## April 6 Image Issue

**Current Status:**
- Image: photo-1526218626217 (singer with microphone)
- All files match: ✓ (blog.html, index.html, blog-post-vibrato-mastery.html)
- Original intended image: photo-1516280440614 (BROKEN - 404)

**Action Required:** 
- May need replacement if photo-1526218626217 is deemed duplicate/wrong
- Unsplash blocking new downloads - need alternative source

---

## Blog History (Do Not Repeat)

**April 2026:**
- April 16: Finding Your Authentic Voice
- April 15: Vocal Dynamics
- April 14: Vocal Agility
- April 13: Vocal Power
- April 12: Fixing Nasal Voice
- April 11: Vocal Phrasing
- April 10: Mastering Vocal Runs and Riffs
- April 9: Vocal Resonance
- April 8: High Notes Without Straining
- April 7: Belting Safely
- April 6: Natural Vibrato
- April 5: First Online Lesson
- April 4: Choosing a Teacher
- April 3: Tech Setup
- April 2: Vocal Registers
- April 1: Sing with Emotion

**March 2026:**
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

## Important Reminders

1. **NEVER reuse pictures** - Check Images Used list before downloading
2. **NEVER use hyphens** in post titles, content, or summaries
3. **Always include GA code:** G-72QBZSZZBP
4. **Alt tags must include:** "online singing lessons"
5. **Verify Unsplash URLs work** before committing

---

## Credentials Reference

- **GitHub Repo:** mattthompson152-blip/singtheeasyway111
- **Website:** singtheeasyway.com
- **GA ID:** G-72QBZSZZBP

Full details in: `/root/.openclaw/workspace/MEMORY.md`
