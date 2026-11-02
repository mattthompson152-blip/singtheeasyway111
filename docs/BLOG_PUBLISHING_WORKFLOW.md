# Blog Publishing Workflow

## 1. Purpose and authority

This is the operational workflow for proposing, reviewing, updating and publishing blog content for Sing The Easy Way. Follow `Project_Master_Context_v1.md`, `AI_RULES.md`, the current owner instruction and this document in the repository's authority order. The owner’s newest explicit instruction takes precedence. Do not treat this guide as permission to alter protected systems or publish without authority.

The blog should demonstrate an elite, diagnosis-led, owner-delivered, high-trust vocal-coaching practice. It is not a high-volume content programme.

## 2. Brand, commercial and protected-area guardrails

Every article should reflect diagnosis before exercises, individual judgement by Matt Thompson, direct owner delivery, testing changes inside real music, protection of the singer’s recognisable identity, contemporary and popular singing, restrained evidence-led authority and confidential handling of professional work.

Use the approved commercial facts in `Project_Master_Context_v1.md`. The standard consumer Consultation is £25 for 30 minutes, live through Microsoft Teams, and provides controlled diagnostic access. It is not free, a trial, taster or discounted first lesson. Private Vocal Coaching is £150 for one 60-minute online session, with no discounted block-booking rate. The Development Programme is £1,400 paid upfront for ten individual sessions, with sessions 1–9 at 60 minutes and session 10 at 75 minutes including a 15-minute progress review; it is for age 16+, valid for six months from the originally booked first lesson, and has no generic curriculum or guaranteed result. Professional Artist Coaching is online, from £250 per hour with a one-hour minimum, through a separate confidential enquiry whose scope is agreed before delivery.

Approved routes:

- Paid Consultation, Private Vocal Coaching and Development Programme: `https://pci.jotform.com/form/262622799830063`
- General Enquiry: `https://form.jotform.com/263014255269052`
- Professional Artist and Industry Enquiry: `https://form.jotform.com/263013855697062`

Keep the paid consumer route, General Enquiry and confidential professional route separate. General Enquiry must not be described as free assessment, diagnosis, personalised advice or coaching. Coaching is online through Microsoft Teams, for contemporary and popular singing, and available from age 16; a parent or legal guardian purchases for a 16- or 17-year-old. Do not position the service as classical or operatic coaching.

Never edit protected systems as part of blog work: `app/`, `worker/`, `CNAME`, Google site-verification files, analytics or consent implementation, `assets/js/cookie-consent.js`, Jotform integration or form configuration, Stripe/payment/booking logic, email automation, Teams or Power Automate configuration, transcription or recording systems, lesson-data storage, secrets, credentials, environment files, DNS, GitHub Pages settings, deployment workflows or repository settings.

## 3. Article proposal and reader/search intent

Before drafting, record:

- the specific reader and situation;
- the question the article will answer;
- the likely search intent and why a page on this site is useful;
- the diagnosis-led distinction the article will explain;
- the practical next step the reader can test in a song;
- the appropriate existing service or authority page, if a link will help;
- the evidence and sources needed for any factual claims;
- the proposed URL and relevant existing articles.

Define intent as a real reader problem, not a keyword phrase. Do not target a broad term merely because it has apparent search demand.

## 4. Duplication and evidence review

Search `blog/`, `blog.html`, relevant public authority pages and the sitemap before drafting. Compare audience, problem, question, explanation and proposed CTA—not only title words. If another article already serves the same need, improve that article or make a defensible distinction before proposing another URL.

Separate documented external evidence from practical coaching judgement and from a possible interpretation. Cite verifiable external evidence where needed; never fabricate a citation, case, client, credential, statistic, outcome or mechanism. If authoritative verification is unavailable, remove or carefully qualify the claim. Do not diagnose readers or treat ADHD or autism as one universal experience.

Medical, psychological, neurological, hearing, injury, vocal-health and performance-anxiety content must remain within coaching scope. Do not promise safety, injury prevention or guaranteed results; do not advise singing through pain. Where relevant, direct someone with pain, persistent voice change or suspected injury to an appropriately qualified healthcare professional. Coaching is not medical, psychological, or speech-and-language treatment.

## 5. Content decisions

Record exactly one decision for each reviewed article:

- **KEEP** — the page already represents the current position and needs only technical or minor editorial corrections.
- **UPDATE** — its URL and intent remain useful, but material editorial, evidence, linking, metadata or CTA work is needed.
- **CONSOLIDATE** — at least two pages serve substantially the same reader problem and intent; one existing URL will become the strongest complete resource.
- **REPLACE** — the URL or topic has a defensible purpose, but its body does not represent the brand; replace the body in place.
- **REMOVE** — the page has no defensible reader, search, authority or commercial purpose and no unique useful material.

Do not delete a page because it is old, generic or absent from the blog index. The repository has no reliable article-level performance, Search Console or backlink evidence. Preserve useful URLs by default. Consolidation, redirect or 410 requires preserved unique value, a genuinely equivalent replacement and a verified repository-supported safe implementation; never redirect an unrelated URL to the homepage or index. Do not invent a redirect method. When uncertain, keep and improve the URL.

## 6. URL and filename rules

Use a descriptive lowercase, hyphen-separated filename under `/blog/`, without dates or a `blog-post-` prefix. Prefer preserving a current article URL. Do not change a canonical URL unless there is a specific, verified reason and the change is safely supported.

The working template is `templates/blog-post-template.html`. It must remain `noindex, nofollow`, absent from `sitemap.xml`, blocked by `robots.txt` and outside public navigation. Never add a placeholder canonical element. Copy the template into the final article path and replace every placeholder before linking or publishing.

## 7. Required article structure

Each canonical, indexable article must have:

1. A precise title, useful introduction and one meaningful H1.
2. Logical H2/H3 headings that answer the reader’s question without padding.
3. A diagnosis-led thesis and practical distinctions relevant to the topic.
4. An explanation of what is observed, what is coaching judgement and what is uncertain, where that distinction matters.
5. A useful next step tested in real contemporary or popular music.
6. No invented client story, unsupported universal mechanism, guaranteed outcome or unnecessary repetition.
7. One restrained, context-relevant primary CTA.
8. Editorially useful internal links and accessible image alternative text.
9. Existing shared navigation, footer, consent implementation and scripts preserved.

Use immaculate British English: *personalised*, *programme*, *recognise*, *practise* as a verb and *practice* as a noun. Avoid American sales language, keyword stuffing, generic search filler, empty luxury claims and quick-result promises.

## 8. Metadata and canonical

Provide a unique, accurate `<title>` and meta description. Set `robots` to `index, follow` for a canonical public article. Include Open Graph title, description, canonical URL and image; include Twitter card, title, description and image. Keep the canonical URL identical to the existing article URL unless an approved, verified URL change is required. Do not create a canonical for the template or a duplicate.

Use one canonical link element only. The Open Graph URL must match it. Do not add a placeholder URL, query string or fragment.

## 9. BlogPosting structured data, author and dates

Use valid JSON-LD `BlogPosting` schema with headline, description, `mainEntityOfPage`, author, publisher, `dateModified`, image and canonical URL where repository evidence supports each value. Preserve valid shared Organization and WebSite nodes when present.

Use Matt Thompson as the author only where the article is owner-delivered. Do not invent an author or credentials. A visible date must match structured data. Set `datePublished` only when explicit article content or reliable repository evidence establishes the original publication date. A commit timestamp alone is not proof of publication. If the original date is unknown, omit `datePublished` and do not display a fabricated publication date. Set `dateModified` to the actual date of a material change, and display it visibly.

## 10. Internal links and CTAs

Link to genuinely relevant articles and authority pages with descriptive, natural anchor text. Avoid self-links, broken fragments, repeated cross-link blocks, unnatural exact-match anchors and noncanonical URL forms. Where an editorially defensible placement exists, each indexable article should receive a contextual inbound link. Do not edit unrelated pages merely to reach a link count.

Use one primary CTA per article. Normal consumer articles may direct to the paid Consultation or a more relevant paid consumer route. Informational technical articles should use a restrained next step. Professional-artist content uses only the separate confidential professional enquiry. Never route readers seeking free advice to General Enquiry or merge professional and consumer routes.

## 11. Image art direction and generation

Use a coherent premium contemporary vocal-coaching environment with believable professional equipment, natural skin and anatomy, restrained cinematic contrast, charcoal and warm-neutral tones, and restrained warm orange compatible with the site. Give every article a distinct visual thesis. Prefer candid, credible environments over generic stock-photo coaching poses.

Do not generate text, logos, unreadable interfaces, private student information, medical imagery presented as fact, classical/operatic or theatrical styling, distorted hands or faces, implausible studio equipment or invented vocal anatomy. Keep essential details away from crop edges.

Before processing, review each full-resolution master for anatomy, hands and faces, equipment plausibility, text/logos, composition, crop safety and repetition against the rest of the library. Reject and regenerate a failed image; do not claim a visual review that did not occur.

Use a landscape 3:2 master composition, recommended 2400 × 1600 pixels. Keep the focal subject near the centre with essential details in the central crop-safe area; the shared article hero uses responsive 16:9, 4:3 and 3:2 crops, while cards use a wide crop. Use one image for article hero, card and Open Graph unless an actual need justifies a second asset. Add a diagram only when it materially clarifies a process or distinction.

## 12. Image processing and accessible alternatives

Use the repository script and its supported syntax:

```text
python3 assets/scripts/prepare-image.py <input-file> blog <lowercase-hyphenated-name> <DDMM>
```

Example derived from the script:

```text
python3 assets/scripts/prepare-image.py ~/Desktop/approved-master.png blog online-singing-lessons-vocal-practice 1004
```

The source must be a file readable by an available image converter. The script supports `blog`, `matt` and `page`; for a blog image it requires four-digit `DDMM`, cleans names to lowercase alphanumeric hyphens, writes JPEG to `assets/images/blog/`, limits width to 1200 pixels and uses quality 82. It does not editorially crop. It uses Pillow when importable; only an `ImportError` triggers fallback to `sips` and then ImageMagick. Do not install dependencies as part of ordinary publishing. It prints `FAILED` and exits nonzero for invalid type, missing input, invalid/missing blog date, missing output folder, unavailable conversion tools, conversion failure, missing output or an empty output; an empty output is deleted before failure. A same-named output can be overwritten, so check the output path before running it and never overwrite an approved image silently. Check actual dimensions and file size after processing. The script warns above 150 KB but does not fail solely for that warning. It does not apply a consistent metadata-stripping policy across its converter backends; inspect output metadata and remove private or location metadata before publication. Resolve its date convention from verified publication details; never use a filename date to imply a fabricated article publication date.

Use descriptive alt text for informative images, describing the visible subject and relevant context rather than repeating the title or keyword. Use empty alt text only for purely decorative imagery. Preserve the actual image dimensions in HTML width/height attributes; do not invent dimensions. Record each processed output and alt text in the image manifest or publishing record.

## 13. Blog index and hierarchy

Update `blog.html` with a concise explanation of the library, a clear start point or featured entry, and topic groups that make the final content architecture understandable. Keep the current deterministic section and card order:

1. Neurodivergent lesson access: `why-singing-lessons-fail-adhd.html`, `singing-lessons-autistic-adults.html`.
2. Performance context and anticipation: `why-you-sound-better-alone.html`, `why-you-freeze-when-someone-watches.html`, `the-fear-arrives-before-the-note.html`, `stage-fright.html`, `perfectionism-is-hurting-your-singing.html`, `confidence-is-not-a-personality-trait.html`, `building-confidence.html`.
3. Learned beliefs and vocal identity: `told-you-could-not-sing-as-a-child.html`, `voice-in-your-head-says-you-cannot-sing.html`, `comparing-your-voice-to-other-singers.html`, `authentic-voice.html`.
4. Vocal function in contemporary music: `pitch-accuracy.html`, `vocal-range.html`, `belt-safely.html`, `vocal-power.html`, `vocal-stamina.html`, `vocal-agility.html`, `vocal-dynamics.html`, `vocal-twang.html`, `vibrato-mastery.html`, `sing-with-emotion.html`, `breathing-techniques.html`, `vocal-warmups.html`, `vocal-muscle-memory.html`, `vocal-health.html`.
5. Online coaching and practical setup: `first-online-lesson.html`, `choosing-singing-teacher.html`, `online-vs-inperson.html`, `tech-setup.html`, `microphones.html`.
6. Participation and practice: `30-day-singing.html`, `choir-singing.html`.

Include one card for every retained indexable article and no card for a removed, redirected or noindexed duplicate. Each card needs a working canonical destination, concise distinct description, appropriate visible publication/modified date, descriptive alt text, accurate intrinsic image dimensions and natural link wording. Avoid making all posts equally prominent. Preserve responsive layout, keyboard access and existing site design.

## 14. Sitemap, robots and template boundaries

Add `blog.html` and every retained canonical indexable article to `sitemap.xml`, preserving unrelated valid entries. Exclude templates, noindexed/removed/redirected duplicates and noncanonical URLs. Use `lastmod` only when it reflects a real material modification. Do not edit `robots.txt` unless a specific implemented status change requires a demonstrably correct adjustment; it is not the primary mechanism for removing an indexable page. Keep the template disallowed and noindex.

## 15. Review and validation

Before a separately authorised commit or publication, inspect the complete diff and verify:

- exactly one H1, unique title and description, canonical/robots/social metadata and valid JSON-LD on every retained article;
- visible and schema dates agree and unsupported historical dates are omitted;
- every CTA uses the correct approved destination and each article has one primary CTA;
- internal links, fragments, cards, article URLs, sitemap entries and images resolve;
- card order and topic grouping are deterministic, image dimensions are accurate and alt text is meaningful;
- template remains noindex/nofollow, blocked, outside the sitemap/navigation and has no placeholder canonical element;
- protected systems, consent, analytics, booking, forms, payments and unrelated files are unchanged.

Run:

```text
git diff --check
python3 assets/scripts/check-site.py
```

The checker skips `app/`, `templates/`, `worker/`, `.git` and `node_modules`; checks HTML, CSS, XML, web manifests and JavaScript for broken local references and its documented stale-code, route, email, tracking, H1, page-ending and placeholder rules; and returns nonzero if any problem is found. The two documented source-logo filename exceptions in `AI_RULES.md` are known repository baseline findings; any other failure is a blocker. Review any failure and do not dismiss it as harmless without evidence.

## 16. Publication control

Writing or committing is not publishing. A pull request is not a merge, deployment or publication. Obtain the exact owner authority required for each step, report what was actually completed, and stop at the authorised boundary. Never alter deployment, GitHub Pages, DNS or repository settings as an implicit part of blog work.
