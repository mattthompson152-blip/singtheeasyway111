# Memory - Regular Information

## GitHub Credentials
- Token: [REDACTED - see local file]
- Username: mattthompson152-blip
- Repository: singtheeasyway111
- Full repo: mattthompson152-blip/singtheeasyway111
- Website: singtheeasyway.com

## Google Analytics
- GA ID: G-72QBZSZZBP

## Blog Requirements
- Daily blog posts at 7am
- Never reuse pictures
- Never repeat blog subjects
- **NO HYPHENS in any post title, content, or summary**
- Focus keywords: "online singing lessons"
- Alt tags must include "online singing lessons"
- Picture names should help SEO
- Include GA in each post
- Topics: Online singing lessons, singing technique, vocal coaching

## Blog History (to avoid repetition)
- April 10: Mastering Vocal Runs and Riffs
- April 9: Vocal Resonance: Finding Your Best Tone
- April 8: How to Sing High Notes Without Straining
- April 7: How to Belt Without Damaging Your Voice
- April 6: How to Develop Natural Vibrato
- April 5: What to Expect From Your First Online Singing Lesson
- April 4: 7 Essential Questions to Ask Before Hiring an Online Singing Teacher
- April 3: Preparing for Online Singing Lessons - Tech Setup
- April 2: Vocal Registers Explained
- April 1: Sing with Emotion
- March 31: Vocal Exercise Muscle Memory
- March 30: Vocal Health
- March 29: Best Microphones for Home Recording
- March 28: How to Find Your Vocal Range
- March 27: Online vs In-Person Lessons
- March 26: Overcoming Stage Fright
- March 25: Breathing Techniques
- March 24: 30-Day Singing Improvement
- March 23: 5 Vocal Warm-Ups

## Reddit Strategy
- Summarize blog posts for Reddit
- Pose discussion questions
- Build followers (currently 0)

## Images Used (Never Repeat)
- April 16: photo-1499364615650 (unique singer finding authentic voice)
- April 15: photo-1506157786151 (vocal dynamics soft to powerful)
- April 14: photo-1514320291840 (vocal agility - DUPLICATE WITH MARCH 28 - NEEDS FIXING)
- April 13: photo-1511671782779 (vocal power - DUPLICATE WITH MARCH 25 - NEEDS FIXING)
- April 12: photo-1470225620780 (nasal voice fix - DUPLICATE WITH MARCH 23 - NEEDS FIXING)
- April 11: photo-1507838153414 (vocal phrasing - DUPLICATE WITH MARCH 24 - NEEDS FIXING)
- April 10: photo-1501386761578-eac5c94b800a (singer at outdoor concert - vocal runs)
- April 9: photo-1493225457124-a3eb161ffa5f (singer performing on stage - resonance - DUPLICATE WITH MARCH 26)
- April 8: photo-1510915361894-db8b60106cb1 (acoustic guitar singer - high notes)
- April 7: photo-1460723237483-7a6dc9d0b212 (male singer performing with guitar)
- April 6: photo-1526218626217-dc65a29bb444 (singer performing with microphone - vibrato)
- April 5: photo-1593642632559-0c6d3fc62b89 (student preparing for first online singing lesson)
- April 4: photo-1598387993441-a364f854c3e1 (woman taking virtual singing lesson)
- April 3: photo-1598488035139-bdbb2231ce04 (microphone setup for online lessons)
- April 2: photo-1511379938547-c1f69419868d (vocal registers diagram)
- April 1: photo-1525201548942-d8732f6617a0 (singer performing with emotion)
- March 31: photo-1571019613454-1cb2f99b2d8b (vocal exercise muscle memory)
- March 30: photo-1544367567-0f2fcb009e0b (vocal health hydration)
- March 29: photo-1590602847861-f357a9332bbc (microphone for home recording)
- March 28: photo-1514320291840-2e0a9bf2a9ae (vocal range test - DUPLICATE WITH APRIL 14)
- March 27: photo-1587825140708-dfaf72ae4b04 (online vs in-person lessons)
- March 26: photo-1493225457124-a3eb161ffa5f (overcoming stage fright - DUPLICATE WITH APRIL 9)
- March 25: photo-1511671782779-c97d3d27a1d4 (diaphragmatic breathing techniques - DUPLICATE WITH APRIL 13)
- March 24: photo-1507838153414-b4b713384a76 (30 day singing improvement plan - DUPLICATE WITH APRIL 11)
- March 23: photo-1470225620780-dba8ba36b745 (vocal warm-ups - DUPLICATE WITH APRIL 12)

## DUPLICATE IMAGES TO FIX
The following images are used on TWO dates each and need to be replaced:
1. photo-1493225457124 - Used on April 9 AND March 26
2. photo-1511671782779 - Used on April 13 AND March 25
3. photo-1507838153414 - Used on April 11 AND March 24
4. photo-1514320291840 - Used on April 14 AND March 28
5. photo-1470225620780 - Used on April 12 AND March 23

## April 6 Image Issue
- Original intended image: photo-1516280440614 (broken/Unsplash 404)
- Current image: photo-1526218626217 (singer with microphone - works but may need replacement)
- All files (blog.html, index.html, blog-post-vibrato-mastery.html) use the SAME image ✓

## Link Checking Protocol
- When fixing broken images: verify the photo ID exists on Unsplash BEFORE updating
- Check both blog.html and any individual post pages
- Do not assume the link format - verify actual working URLs
- Schedule: Daily at 7:00 AM
- Task: Create blog post + Reddit summary
- Status: Needs setup via openclaw config

### WHERE TO STORE THE AUTOMATION CODE:
1. Save the cron command in: `/root/.openclaw/workspace/CRON_SETUP.txt`
2. Or run it directly in terminal
3. I will check MEMORY.md every morning for: credentials, blog history, images used

### COMMAND TO RUN (copy and paste):
```
openclaw cron create \
  --name "daily-blog-7am" \
  --schedule "0 7 * * *" \
  --task "Create daily blog post for singtheeasyway.com. Check /root/.openclaw/workspace/MEMORY.md for blog history, images used, GA code G-72QBZSZZBP, and repo details. Write unique blog post, update blog.html, push to mattthompson152-blip/singtheeasyway111" \
  --channel kimi-claw
```

---

## DROPLET CONSOLE CHECKLIST
**Location to check:** `/root/.openclaw/workspace/DROPLET_CONSOLE.md`

### Daily Tasks:
- [ ] Check blog post created at 7am
- [ ] Verify image is unique (not in Images Used list)
- [ ] Verify no hyphens in post titles
- [ ] Check GA code included
- [ ] Verify alt tags include "online singing lessons"

### Fix List:
- [ ] Fix duplicate image: photo-1493225457124 (Apr 9 & Mar 26)
- [ ] Fix duplicate image: photo-1511671782779 (Apr 13 & Mar 25)
- [ ] Fix duplicate image: photo-1507838153414 (Apr 11 & Mar 24)
- [ ] Fix duplicate image: photo-1514320291840 (Apr 14 & Mar 28)
- [ ] Fix duplicate image: photo-1470225620780 (Apr 12 & Mar 23)
- [ ] Fix April 6 image if needed (currently photo-1526218626217)

### Commands:
```bash
# Check all files use same image for a date:
grep -r "photo-1526218626217" /root/.openclaw/workspace --include="*.html"

# Find duplicate images in blog.html:
grep -oE "photo-[0-9]+" /root/.openclaw/workspace/blog.html | sort | uniq -c | sort -rn

# Push changes to git:
cd /root/.openclaw/workspace/singtheeasyway111 && git add . && git commit -m "Fix images" && git push
```
