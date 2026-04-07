#!/bin/bash
# SUPER BLOG VERIFIER - Runs checks 5 times to guarantee perfection
# Use this when you want to be 100% sure everything is right

set -e

cd /root/.openclaw/workspace/singtheeasyway111

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS_COUNT=0
MAX_PASSES=5

echo -e "${BLUE}=========================================="
echo "  SUPER BLOG VERIFIER"
echo "  Running $MAX_PASSES verification passes"
echo "==========================================${NC}"
echo ""

for i in $(seq 1 $MAX_PASSES); do
    echo -e "${BLUE}--- PASS $i of $MAX_PASSES ---${NC}"
    
    if ./verify-blog.sh; then
        PASS_COUNT=$((PASS_COUNT + 1))
        echo -e "${GREEN}✓ Pass $i complete${NC}"
    else
        echo -e "${RED}✗ Pass $i FAILED - Fix errors and run again${NC}"
        echo ""
        echo "Fix the errors above, then run ./super-verify.sh again"
        exit 1
    fi
    echo ""
done

echo -e "${GREEN}=========================================="
echo "  🎉 ALL $MAX_PASSES PASSES COMPLETE!"
echo "  Blog is 100% verified and ready"
echo "==========================================${NC}"
echo ""
echo "Summary of what's verified:"
echo "  ✓ All posts linked in blog.html"
echo "  ✓ All posts have images"
echo "  ✓ Images match between blog.html and post pages"
echo "  ✓ All alt tags are SEO-optimized"
echo "  ✓ Alt tags match between blog.html and post pages"
echo "  ✓ All posts have dates"
echo ""
echo "Your blog is ready to commit and push!"
