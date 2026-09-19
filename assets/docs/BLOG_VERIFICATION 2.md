# Blog Verification System

## Overview
This verification system ensures the blog is ALWAYS perfect before committing.
It forces rechecking and rechecking until everything is 100% right.

## Commands

### Quick Check (1 pass)
```bash
./verify-blog.sh
```
Runs 8 verification checks:
1. blog.html exists
2. All posts linked in blog.html
3. All posts have images
4. Images match between blog.html and posts
5. Alt tags contain SEO keywords
6. Alt tags match between blog.html and posts
7. No duplicate images (warning)
8. All posts have dates

**Exit codes:**
- 0 = Passed (can commit)
- 1 = Failed (fix errors first)

### Super Verification (5 passes)
```bash
./super-verify.sh
```
Runs the verification script 5 times in a row.
If ANY pass fails, it stops and forces you to fix.
Only succeeds when all 5 passes complete.

## Git Hook (Auto-Enforced)
A pre-commit hook runs `verify-blog.sh` automatically before EVERY commit.
If verification fails, the commit is BLOCKED until you fix the issues.

## SEO Keywords Required in Alt Tags
All images must contain at least one of:
- online singing lesson
- virtual singing
- online singing teacher
- online vocal coach
- remote singing

## Files
- `verify-blog.sh` - Main verification script
- `super-verify.sh` - 5-pass super verification
- `.git/hooks/pre-commit` - Git hook (runs automatically)

## Usage Workflow

### Before Creating New Blog Post
1. Run `./super-verify.sh` to ensure current state is perfect
2. Create your blog post
3. Add to blog.html with proper image and SEO alt tag
4. Run `./verify-blog.sh` to check
5. Fix any errors
6. Commit (pre-commit hook will verify again)

### If Verification Fails
The script tells you exactly what's wrong:
- Missing image? Add it
- Image mismatch? Fix the URL
- Missing SEO keywords? Update alt tag
- Alt mismatch? Make blog.html and post page match

Fix the error, then run verification again.
Repeat until it passes.

## Never Bypass
Do not use `git commit --no-verify` - this defeats the purpose.
The verification is there to catch mistakes BEFORE they go live.
