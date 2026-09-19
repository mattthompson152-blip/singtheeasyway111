# Sing The Easy Way, project handover

**Current as of 19 September 2026.** This file replaces every earlier handover document. If you find a `.docx` handover, a master plan, a repository audit or a brand pack anywhere else, it is out of date. Do not act on it.

This file lives in the repository on purpose. Every earlier handover went stale because it sat in OneDrive while the website moved on. This one ships with the code, so it cannot drift.

---

## If you are an AI reading this

Read these three files and nothing else:

```text
AI_RULES.md    The rules. Non-negotiable. Read before any change.
README.md      What is in the repository and how to work on it.
HANDOVER.md    This file. Status and history.
```

Do not search OneDrive or SharePoint for project documents. Do not reinstate deleted ones. If Matt supplies a document from elsewhere, ask before using it.

Brand voice, copy and positioning are decided with Matt directly, in conversation, and recorded in `AI_RULES.md` once agreed.

---

## The business, in short

Matt Thompson teaches live one-to-one online singing lessons on Microsoft Teams. More than 25 years of experience, trained at the Academy of Contemporary Music. Students range from complete beginners to recording artists, touring performers and actors.

The website exists to turn visitors into consultation bookings, and consultations into ongoing students.

**Prices:** consultation £25 (normally £50), single lesson £85, ten-lesson block £700.

**Positioning:** lessons that make a singer sound more like themselves, not less. Individuality is the differentiator, not a footnote.

**Matt has ADHD.** It is public on the site and it is framed as the reason the teaching works. Never state or imply he is autistic.

---

## Current status

The site is live, verified in Google Search Console, and the sitemap is submitted.

| Area | State |
|---|---|
| Structure and links | Complete. 38 pages, zero broken links. |
| Copy | Rewritten in Matt's voice across every page and all 24 blog posts. |
| Calls to action | One primary wording site-wide, pointing at `/contact.html`. |
| Legal | Cookie consent, consent-gated analytics, privacy policy covering recordings, AI summaries and both forms. |
| SEO | Structured data on every page, all validated. |
| Tracking | GA4 conversion events, consent aware. |

---

## What was done on 19 September 2026

Reorganised the repository, fixed every internal link, standardised the header and footer across all pages, corrected prices everywhere, moved to Microsoft Teams only, removed all celebrity framing, added Matt's photographs, built the page and blog templates, added the image and site-check scripts, rewrote the homepage, About, Lessons, Pricing, Results and FAQ, created the ADHD page and the film and pronunciation page, added three real transformation stories, rewrote all 24 blog posts in Matt's voice, added structured data throughout, gated analytics behind consent, rebuilt the privacy policy, added the community email signup, added a 404 page, and added GA4 conversion tracking.

Deleted on purpose: a duplicate homepage, an orphaned enquiry page merged into contact, a stray page file, five internal note files, three obsolete shell scripts, two junk image folders, duplicate images, an unused video, and every legacy strategy and handover document.

---

## What is still open

1. **Blog article middles.** Openings, asides, lesson sections and bios are in Matt's voice. The technical explanations between them are the original writing. Accurate, but generic.
2. **Tablet layout.** Checked on desktop and mobile, not on tablet.
3. **Results.** In about a week, check Search Console for coverage errors and GA4 for the first conversion events.

---

## Things that will trip you up

- The site is `https://singtheeasyway.com`, **no www**. Search Console has a www property too. The non-www one is the real one.
- `CNAME` and `googlef8e9acb5c788aa99.html` are not pages. Deleting either breaks the domain or the Search Console verification.
- There are two Jotform forms and they are different. `261603325649357` is the enquiry form on the contact page. `261037482331047` is the community signup on 29 pages.
- Never paste a raw Google Analytics tag into a page. Analytics loads only after consent.
- The `/app/` folder is a separate booking application. It is not part of the website and is not covered by the rules.

---

## Before you publish anything

```bash
python3 assets/scripts/check-site.py
```

`PASSED` means publish. `FAILED` means fix what it lists and run it again. Report the output; do not claim checks you did not run.
