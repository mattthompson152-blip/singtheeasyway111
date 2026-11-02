# Sing The Easy Way Project Handover

**Owner:** Matt Thompson  
**Current as of:** 2 November 2026  
**Status:** Final checkpoint for the completed elite-positioning website work

## 1. Start here

Before material work, read:

1. `Project_Master_Context_v1.md`
2. `AI_RULES.md`
3. `README.md`
4. `HANDOVER.md`
5. `student lesson transcription system.docx` only when transcription, recording, automated notes, privacy, retention or storage is relevant

Do not restart completed discovery or the elite-positioning implementation.

## 2. Owner-confirmed current state

Matt Thompson has confirmed that:

- the elite-positioning website implementation is complete;
- it was merged into `main`;
- the website was deployed;
- the resulting website is live and working;
- no further speculative redesign or copy rewrite is currently required.

Final elite-positioning merge and live deployment were confirmed by Matt Thompson. Exact final pull-request, merge-commit, deployment-run and deployed-SHA identifiers require repository verification.

## 3. Known implementation evidence

- Publishing branch: `main`
- Starting `origin/main`: `8cbca80cffb4a7c62086af4ab883188be2497389`
- Elite-positioning branch: `feat/elite-positioning`
- Implementation commit: `f85fada7a068e0c2e731b591483b1d8c81311234`
- Commit message: `Complete the elite website positioning`

Earlier reported history includes PR #20 merged into the starting commit, PRs #17–#19 merged, commits `255df47` and `95258c6` present in `main`, and the later `fix/cards-spacing-logo-prominence` pull request merged at `7ee8ca640385486dedf8d8126ef3dac0c1a9cbc9`.

Do not use these records to invent the final elite-positioning merge or deployment identifiers.

## 4. Completed outcomes

The completed implementation was reported to have:

- made diagnosis-led judgement the dominant homepage signal;
- explained that similar vocal symptoms may have different causes;
- shown how adjustments are tested inside real music;
- protected the singer's recognisable identity in the core message;
- removed price-first, equal-weight retail service menus and crowded sales cards;
- reduced repeated booking and pricing prompts;
- removed generic route-shopping and mass-market exercise-first copy;
- reframed the Consultation as controlled diagnostic access;
- preserved Private Vocal Coaching at £150 without discounted blocks;
- preserved the Development Programme as a £1,400 ten-session commitment;
- kept General Enquiry separate from free coaching and personalised analysis;
- kept professional work separate, confidential and outside the consumer payment journey;
- retained the approved ten complete reviews and incomplete source-limited Ali extract;
- removed unsupported legacy testimonial or transformation material;
- curated the visible blog index around diagnosis, pressure and individual work;
- preserved approved assets and protected systems.

Reported changed files on the implementation branch:

- `assets/css/responsive.css`
- `blog.html`
- `book-online.html`
- `development-programme.html`
- `index.html`
- `pricing.html`
- `professional-services.html`
- `templates/blog-post-template.html`
- `templates/page-template.html`
- `testimonials.html`

## 5. Reported validation

- `git diff --check` passed.
- The site checker reported only the two accepted source-logo filename exceptions.
- Seven changed public pages were checked at approximately 1440px, 768px and 390px.
- No horizontal overflow was found.
- Each changed public page had one H1.
- Local links resolved and keyboard focus was visible.
- Approved image hashes were unchanged.
- `app/`, `worker/`, analytics, consent, payment, booking logic, Jotform configuration and protected files were untouched.

The pre-merge browser environment blocked the external Manrope stylesheet and Jotform embed handler, so external font rendering and the blog signup embed were not visually verified there. Matt later confirmed that the website is live and working. Recheck those external assets only if they become relevant to a future task.

## 6. Settled commercial facts

### Consultation

£25 for 30 minutes through Microsoft Teams, providing an initial vocal assessment and recommendation. It is not credited against another service and is controlled diagnostic access, not a cheap trial or introductory lesson.

### Private Vocal Coaching

£150 for one private 60-minute online session involving individual work on a particular problem, song or goal. No discounted block-booking rate.

### Development Programme

£1,400 paid upfront for one ten-session individual commitment. Sessions 1–9 are 60 minutes; session 10 is 75 minutes and includes a 15-minute progress review and next-step plan. The Programme is valid for six months from the originally booked first-lesson date, personal and non-transferable. Weekly sessions are strongly recommended, fortnightly scheduling may work where necessary, and approximately two hours of independent practice each week is expected. There is no generic curriculum or guaranteed result.

### Professional Artist Coaching

Online, from £250 per hour, with a one-hour minimum, a separate confidential enquiry and scope agreed before delivery. It remains outside the ordinary consumer payment journey.

### Delivery and eligibility

Online through Microsoft Teams, contemporary and popular singing, available from age 16, with parent or legal guardian purchase for a 16- or 17-year-old. Do not imply classical, operatic or ordinary in-person coaching.

## 7. Exact routes

- Website: https://singtheeasyway.com
- Repository: https://github.com/mattthompson152-blip/singtheeasyway111
- Paid Consultation, Private Vocal Coaching and Development Programme: https://pci.jotform.com/form/262622799830063
- General Enquiry: https://form.jotform.com/263014255269052
- Professional Artist and Industry Enquiry: https://form.jotform.com/263013855697062
- Privacy Policy: https://singtheeasyway.com/privacy-policy.html
- Thank-you page: https://singtheeasyway.com/thank-you.html
- Contact: mailto:matt@singtheeasyway.com

General Enquiry is not free coaching, diagnosis, assessment, recording analysis or personalised advice. Professional work remains separate, confidential and outside the consumer payment journey.

## 8. Confidential professional-work boundary

Do not name, identify, hint at or record any confidential client, public figure, artist, relationship, lesson, booking, result or private conversation without exact written permission for the proposed use.

Do not record private friendship rates, legacy individual pricing arrangements, personal relationships or client-specific commercial discussions.

Friendships, legacy arrangements and exceptional private agreements do not alter the published or standard professional-service position.

## 9. Protected systems

Do not alter without Matt's exact current instruction:

- `app/` and `worker/`
- Jotform, Stripe, payment and booking logic
- email automation
- Microsoft Teams and Power Automate configuration
- transcription, recording and lesson-data storage
- analytics and consent
- secrets and credentials
- DNS, CNAME, GitHub Pages and deployment settings
- repository settings

Never delete `/CNAME` or `/googlef8e9acb5c788aa99.html`. Preserve `bookingOptions`, community-signup form ID `261037482331047`, documented `booking_complete` logic, consent-gated analytics and the thank-you page's limited role.

## 10. Transcription and privacy

Use `student lesson transcription system.docx` as the specialist authority.

- Automated evidence-based notes require a transcript.
- MP4 recording is a separate and optional branch.
- The verified lesson-date process may still depend on a matching recording.
- The exact AI model or subprocessor remains unverified unless newer evidence proves it.
- Do not claim UK-only processing, fixed complete deletion, exact retention, exact folder permissions or immediate complete erasure without verification.
- Matt must personally check every final ten-session review before it is shared.

## 11. Current marketing direction

> Market Sing The Easy Way as the diagnosis-led choice for singers whom generic exercises and advice have failed.

Use problem-specific short-form diagnostic video, problem-specific organic search content, professional referrals and restrained email follow-up. Consider Google Search only after conversion measurement is verified, and retargeting only when consent, tracking and audience volume are suitable.

Measure qualified enquiries, Consultation requests and attendance, suitable paying clients, Development Programme applications and enrolments, professional enquiries, acquisition cost and source quality. Do not prioritise views or followers.

## 12. What not to restart

Do not restart or recreate:

- the elite-positioning implementation;
- typography, logo, favicon, owner-image, service-card or CTA work;
- approved review curation;
- former-platform-reference removal;
- blog-index curation;
- settled Development Programme pricing or structure;
- settled Terms or Privacy wording;
- old branches or historical checkpoints.

Do not add aggressive premium, effortless-voice, permanent-result, crisis-management or pressure-led upsell copy.

## 13. Next sensible workstreams

Each requires a separate bounded instruction:

1. Marketing execution using diagnosis-led authority content.
2. Measurement verification before paid advertising or retargeting.
3. A controlled Google Search test after measurement is verified.
4. Transcription/privacy remediation supported by current-state evidence and rollback.
5. Evidence-led website maintenance only, not another speculative redesign.

## 14. Next-session instruction

A new AI or GitHub Copilot session must:

1. Read the four canonical governance files in full.
2. Treat Matt's newest explicit instruction as controlling authority.
3. Use current owner-supplied repository evidence for website facts.
4. Verify current `origin/main`, branch, working tree and relevant pull-request state once before repository work.
5. Confirm exact final elite-positioning merge and deployment identifiers only if material.
6. Not restart completed elite-positioning work.
7. Declare a bounded scope, protected areas, validation, branch, commit message, pull-request target and stop condition before implementation.
8. Preserve exact prices, routes, evidence rules and confidentiality.
9. Run required validation and review the complete diff before any authorised commit.
10. Not merge, deploy, publish, delete branches or alter settings without Matt's explicit authority.

## 15. Blog publishing reference

Use `docs/BLOG_PUBLISHING_WORKFLOW.md` for future blog proposals, editorial decisions, evidence, article metadata and schema, internal links, CTAs, image production, index hierarchy, sitemap and validation. The 34-page renewal decisions are recorded in `docs/BLOG_RENEWAL_DECISION_REGISTER.md`; new image production was not completed and is specified in `docs/BLOG_IMAGE_GENERATION_MANIFEST.md`. Do not assume the temporary existing article images have been replaced or visually approved.
