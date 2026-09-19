# SINGTHEEASYWAY_WEBSITE_REDESIGN_MASTER_PLAN.md

This is the permanent project master file for the SingTheEasyWay website redesign. It records decisions, strategy, content and implementation notes so the redesign can be resumed later without losing context.

---

HOMEPAGE STRATEGY

Lead with student results and outcomes. Position the service as a complete learning system rather than a single lesson. Make Microsoft Teams the primary lesson environment. Use existing photography and static assets for launch. Keep current pricing as-is and avoid rolling back any pricing files.

CORE BRAND MESSAGE

Traditional singing lessons rely on memory. SingTheEasyWay does not.

PRIMARY MESSAGE
Online singing lessons that help you progress faster.

WEBSITE POSITIONING

Most singing teachers provide a lesson. SingTheEasyWay provides a complete learning system that helps students remember more, practise better and make faster progress.

Target audience
Beginners, experienced singers, recording artists, film and television actors, songwriters, public speakers, busy professionals, neurodivergent learners (including people with ADHD and autism).

MICROSOFT TEAMS STRATEGY

- Teams is the recommended and promoted lesson platform. Remove other platform mentions from client facing copy.  
- Booking integration should create Teams appointments automatically when possible.  
- Recording and transcription features are explained and require explicit consent.  
- Include clear pre lesson join instructions and a setup guide.

STUDENT PROGRESS MESSAGING

Core messages to appear throughout the site and emails:  
- Lessons become repeatable practice systems.  
- Replayable corrections accelerate muscle memory and retention.  
- Searchable transcripts reduce guesswork and wasted practise.  
- Clear action points make practise effective.  
- Progress tracking sustains motivation and reveals measurable improvement.

LESSON RECORDING STRATEGY

Principles
- Record only with explicit consent.  
- Position recordings as study aids, not marketing tools.  

Implementation
- Confirm recording consent at booking.  
- Store recordings securely and link them only to the student.  
- Document retention and deletion processes in the privacy notice.

LESSON TRANSCRIPT STRATEGY

Principles
- Provide searchable transcripts when transcription is available and consented to.  
- Use transcripts to help students locate corrections and exercises.  

Implementation
- Deliver transcripts alongside recordings when available.  
- Provide guidance on using transcripts in lesson summaries.

LESSON SUMMARY STRATEGY

Principles
- Every lesson summary should be short, prioritised and actionable.  
- Focus on 3 to 5 clear action points.

Implementation
- Send a one page summary after each lesson with: what was corrected, three action points, suggested exercises with tempo and scheduling notes, and deep links to the recording timestamp where relevant.

BOOKING FUNNEL STRATEGY

Top of funnel conversion
- Primary offer: Free 30 minute Microsoft Teams consultation (prominent hero CTA).  
- Use an embedded scheduler with minimal required fields.  

Booking flow
1. CTA click opens booking modal / embedded scheduler.  
2. Student chooses time; system creates Microsoft Teams appointment automatically.  
3. Booking confirmation page shows pre lesson checklist and asks for recording/transcription consent.  
4. Reminder emails 24 hours and 1 hour before lesson.  
5. Post lesson: deliver recording, transcript and lesson summary, plus a follow up CTA to buy lessons.

Conversion levers
- Starter 3 lesson pack and 10 lesson block.  
- Post consult email with a sample lesson summary to convert to paid lessons.

SEO STRATEGY

On page
- Use the target phrases naturally: online singing lessons, online vocal coaching, online vocal coach, voice lessons online, online singing teacher UK, singing lessons on Microsoft Teams.  
- Add FAQ JSON LD and video schema for the hero video.  

Content
- Publish pillar content and cluster posts about practical practise, how recordings speed progress and neurodivergent learning.  

Technical
- WebP images, lazy load, minify assets, CDN where possible.  
- Mobile first design and target LCP < 2.5s.

Backlinks and outreach
- Guest posts, collaborations, references from music education and neurodiversity organisations.

CONVERSION STRATEGY

- Lead magnet: Free 30 minute Microsoft Teams consultation in hero.  
- Reduce friction: embedded scheduler, automatic Teams invites and explicit consent in booking flow.  
- Proof: hero video (future), sample lesson summary, outcome led testimonials.  
- Pricing: show a pricing snapshot and recommended package badge.  
- Measurement: GA4 + GTM, track CTA clicks, bookings and conversions.

FAQ STRATEGY

- Publish clear honest answers to common user queries.  
- Add structured FAQ JSON LD for search visibility.  
- Include privacy and consent details for recordings and transcripts.

HOMEPAGE LAYOUT DECISIONS

Top to bottom order
- Sticky header with primary Book CTA.  
- Hero (left copy, right visual).  
- Brand message: memory vs learning system.  
- Why Students Progress Faster (outcomes).  
- Your Personal Singing Studio (features with benefits).  
- Missed Something section with demo screenshot.  
- Why Microsoft Teams (concise).  
- Trust and Experience with images of Matt.  
- Student Outcomes cards.  
- How Lessons Work (5 steps).  
- Testimonials (placeholders for videos).  
- Pricing snapshot and CTA.  
- FAQ accordion.  
- Footer with contact and Teams mention.

DESIGN DECISIONS

- Keep current colour palette and CSS structure.  
- Use orange accent (#ff6b35) for primary CTAs.  
- Use large readable headings and short paragraphs for scanning.  
- Provide high contrast and accessible fonts for neurodivergent users.

PRICING DECISIONS

- Preserve the current pricing structure and pages.  
- Do not roll back or replace recent pricing updates.  
- Use a pricing snapshot on the homepage that links to the existing pricing.html without altering it.

FUTURE TASKS

These tasks are recorded so work can continue after launch.

- Produce a 45 to 60 second hero video and 15 second trailer.  
- Collect three 30 to 60 second student testimonial videos.  
- Collect six short written testimonial quotes with photos.  
- Create sample lesson summary screenshots and an anonymised PDF.  
- Create sample transcript screenshots showing search and timestamps.  
- Integrate an embedded scheduler with Microsoft Teams appointment creation.  
- Add FAQ JSON LD and Video schema to the live site.  
- Implement GA4 + GTM and event tracking for booking funnel.  
- Replace static booking/enquiry navigation with the embedded scheduler.  

PENDING CONTENT

These items are intentionally postponed and are NOT required for the current website launch. They should be added after launch when available.

- Hero video still required  
- Student testimonial videos still required  
- Student testimonial quotes still required  
- Sample lesson summary screenshots still required  
- Sample transcript screenshots still required

All pending items are documented and linked to in the homepage code using placeholders so they can be completed later.

LAUNCH CHECKLIST

Before launch
- [ ] Update index.html with the final homepage copy and structure.  
- [ ] Remove references to FaceTime and WhatsApp in all public pages.  
- [ ] Add hero image and static placeholders for future video content.  
- [ ] Add explicit consent checkbox to booking flow or enquiry page.  
- [ ] Add link to master plan in hero and testimonial placeholders.  
- [ ] Verify pricing pages are unchanged.  
- [ ] Add FAQ accordion and link to FAQ JSON LD.  
- [ ] Verify all CTAs point to the booking flow and the enquiry fallback.  

Launch day
- [ ] Swap in new homepage files.  
- [ ] Smoke test the booking flow end to end.  
- [ ] Monitor analytics for errors and check page load performance.  

Post launch
- [ ] Swap in hero video and testimonials when available.  
- [ ] Start A B tests for hero copy and visuals.  
- [ ] Implement embedded scheduler and Teams integration if not done before launch.

REPOSITORY REVIEW SUMMARY

Files and pages inspected
- index.html (current homepage)  
- beginner-singing-lessons.html  
- online-singing-lessons.html  
- live-1-to-1-singing-lessons.html  
- pricing.html (preserved)  
- testimonials.html  
- about.html  
- faq.html  
- assets/ (images, css, js)

Images identified for reuse
- assets/images/matt-teaching.jpg  
- assets/images/matt-portrait-online-singing-lessons.jpg  
- assets/images/matt-headshot–online–singing-lessons.jpg  
- assets/images/matt-motorhome.jpg  
- assets/images/lesson-setup.jpg  
- assets/images/hero-waveform.jpg  
- assets/images/film-audition-poster.jpg  
- assets/images/logo.png

Removed content
- No clear historical deletions were restored during this pass.  
- The repository contains current images and content that are suitable to restore on the homepage.  
- Any earlier deletions would require an expanded commit history review which is available but not acted on in this step.

NOTES

- Pricing pages and pricing content were left unchanged as requested.  
- This master file will remain in the repository root as the single source of truth for the redesign project.  
- All placeholders in the homepage HTML will link back to this master plan document for future content updates.

Project file created by: repository automation (Copilot)
Date: 2026-09-03

