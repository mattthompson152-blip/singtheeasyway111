#!/bin/bash
# Blog Verification Script - Forces rechecking until 100% perfect
# Run this before ANY blog changes are committed

set -e

cd /root/.openclaw/workspace/singtheeasyway111

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo "=========================================="
echo "  BLOG VERIFICATION - ZERO ERRORS POLICY"
echo "=========================================="
echo ""

# Check 1: Verify blog.html exists and has content
if [ ! -f "blog.html" ]; then
    echo -e "${RED}✗ FATAL: blog.html not found${NC}"
    exit 1
fi

BLOG_POST_COUNT=$(grep -c "blog-post-" blog.html || true)
echo "Found $BLOG_POST_COUNT blog posts in blog.html"
echo ""

# Check 2: Every blog-post-* file must be in blog.html (except excluded)
echo "=== CHECK 2: All posts linked in blog.html ==="
EXCLUDED_POSTS="blog-post-first-online-lesson.html"  # April 5 post - future dated
for post in blog-post-*.html; do
    if echo "$EXCLUDED_POSTS" | grep -q "$post"; then
        continue  # Skip excluded posts
    fi
    if ! grep -q "href=\"$post\"" blog.html; then
        echo -e "${RED}✗ $post exists but NOT in blog.html${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All posts linked in blog.html${NC}"
fi
echo ""

# Check 3: Every link in blog.html must have an image
echo "=== CHECK 3: All posts have images in blog.html ==="
grep -o 'href="blog-post-[^"]*"' blog.html | while read link; do
    post=$(echo $link | sed 's/href="//;s/"$//')
    if ! grep -q "$post.*img src" blog.html; then
        echo -e "${RED}✗ $post missing image in blog.html${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All posts have images${NC}"
fi
echo ""

# Check 4: Images must match between blog.html and post pages
echo "=== CHECK 4: Image consistency (blog vs post) ==="
for post in blog-post-*.html; do
    if grep -q "${post}" blog.html; then
        blog_img=$(grep "${post}" blog.html | grep -o 'photo-[a-z0-9]*' | head -1)
        post_img=$(grep -o 'photo-[a-z0-9]*' "$post" | head -1)
        
        if [ "$blog_img" != "$post_img" ]; then
            echo -e "${RED}✗ $post: IMAGE MISMATCH${NC}"
            echo "  blog.html: $blog_img"
            echo "  $post: $post_img"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All images match${NC}"
fi
echo ""

# Check 5: Alt tags must contain SEO keywords
echo "=== CHECK 5: SEO-optimized alt tags ==="
REQUIRED_KEYWORDS="online singing lesson|virtual singing|online singing teacher|online vocal coach|remote singing"
grep -oP 'alt="[^"]*"' blog.html | grep -v "logo\|Sing The Easy Way" | while read alt; do
    clean_alt=$(echo $alt | sed 's/alt="//;s/"$//')
    if ! echo "$clean_alt" | grep -qE "$REQUIRED_KEYWORDS"; then
        echo -e "${RED}✗ Missing SEO keywords: $alt${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All alt tags SEO-optimized${NC}"
fi
echo ""

# Check 6: Alt tags must match between blog.html and post pages
echo "=== CHECK 6: Alt tag consistency ==="
for post in blog-post-*.html; do
    if grep -q "${post}" blog.html; then
        blog_alt=$(grep "${post}" blog.html | grep -oP 'alt="[^"]*"' | head -1)
        post_alt=$(grep -oP 'alt="[^"]*"' "$post" | grep -v "logo\|Sing The Easy Way" | head -1)
        
        if [ "$blog_alt" != "$post_alt" ]; then
            echo -e "${RED}✗ $post: ALT MISMATCH${NC}"
            echo "  blog.html: $blog_alt"
            echo "  $post: $post_alt"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All alt tags match${NC}"
fi
echo ""

# Check 7: No duplicate images across posts
echo "=== CHECK 7: No duplicate images ==="
declare -A IMG_COUNT
for post in blog-post-*.html; do
    img=$(grep -o 'photo-[a-z0-9]*' "$post" | head -1)
    if [ -n "$img" ]; then
        IMG_COUNT[$img]=$((${IMG_COUNT[$img]:-0} + 1))
    fi
done

for img in "${!IMG_COUNT[@]}"; do
    if [ ${IMG_COUNT[$img]} -gt 1 ]; then
        echo -e "${YELLOW}⚠ Image $img used ${IMG_COUNT[$img]} times${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
done
if [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ No duplicate images${NC}"
fi
echo ""

# Check 8: Blog post must have proper date
echo "=== CHECK 8: All posts have dates ==="
for post in blog-post-*.html; do
    if ! grep -q "blog-date" "$post" && ! grep -qE "[A-Z][a-z]+ [0-9]{1,2}, 202[0-9]" "$post"; then
        echo -e "${RED}✗ $post missing date${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All posts have dates${NC}"
fi
echo ""

# Final Result
echo "=========================================="
if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ VERIFICATION FAILED: $ERRORS ERRORS${NC}"
    echo "Fix all errors before committing!"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠ VERIFICATION PASSED WITH $WARNINGS WARNINGS${NC}"
    echo "Review warnings but can proceed"
    exit 0
else
    echo -e "${GREEN}✅ VERIFICATION PASSED - 100% PERFECT${NC}"
    exit 0
fi
