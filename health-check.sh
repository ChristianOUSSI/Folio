#!/bin/bash
# health-check.sh - Vérification de la santé du projet

echo "🏥 HEALTH CHECK - Portfolio Project"
echo "===================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

checks_passed=0
checks_failed=0

echo ""
echo "📦 Checking files..."

# Check required files
required_files=(
  "lib/csrf.ts"
  "lib/rateLimit.ts"
  "lib/contactValidation.ts"
  "components/ErrorBoundary.tsx"
  "components/LoadingSpinner.tsx"
  "app/not-found.tsx"
  "app/offline.tsx"
  "app/sitemap.ts"
  "public/robots.txt"
  ".env.example"
  "DOCUMENTATION.md"
  "QUICK_START.md"
  "vitest.config.ts"
  ".github/workflows/ci.yml"
  "__tests__/contactValidation.test.ts"
  "lib/articles.ts"
  "app/blog/[slug]/page.tsx"
)

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
    ((checks_passed++))
  else
    echo -e "${RED}✗${NC} MISSING: $file"
    ((checks_failed++))
  fi
done

echo ""
echo "🔧 Checking configurations..."

# Check tsconfig.json for strict mode
if grep -q '"strict": true' tsconfig.json; then
  echo -e "${GREEN}✓${NC} Root tsconfig: strict mode enabled"
  ((checks_passed++))
else
  echo -e "${YELLOW}⚠${NC} tsconfig: strict mode check"
  ((checks_failed++))
fi

# Check next.config.js for headers
if grep -q "X-Content-Type-Options" next.config.js; then
  echo -e "${GREEN}✓${NC} next.config.js: Security headers configured"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} Security headers missing in next.config.js"
  ((checks_failed++))
fi

# No external validation dependencies required (escape-html, zod removed)
# The project uses internal validation and escaping functions.


echo ""
echo "🔒 Checking security..."

# Check contact route for escapeHtml usage
if grep -q "escapeHtml" app/api/contact/route.ts; then
  echo -e "${GREEN}✓${NC} Contact API: XSS protection active"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} XSS protection missing"
  ((checks_failed++))
fi

# Check CSRF protection
if grep -q "validateCSRFToken" app/api/contact/route.ts; then
  echo -e "${GREEN}✓${NC} Contact API: CSRF protection active"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} CSRF protection missing"
  ((checks_failed++))
fi

# Check rate limiting
if grep -q "checkRateLimit" app/api/contact/route.ts; then
  echo -e "${GREEN}✓${NC} Contact API: Rate limiting active"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} Rate limiting missing"
  ((checks_failed++))
fi

echo ""
echo "🎨 Checking UI components..."

# Check ErrorBoundary integration
if grep -q "ErrorBoundary" app/page.tsx; then
  echo -e "${GREEN}✓${NC} page.tsx: ErrorBoundary integrated"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} ErrorBoundary not integrated"
  ((checks_failed++))
fi

# Check a11y in Contact
if grep -q "aria-required" components/Contact.tsx; then
  echo -e "${GREEN}✓${NC} Contact.tsx: ARIA attributes present"
  ((checks_passed++))
else
  echo -e "${YELLOW}⚠${NC} ARIA attributes check"
  ((checks_failed++))
fi

# Check theme sync
if grep -q "StorageEvent" components/Navbar.tsx; then
  echo -e "${GREEN}✓${NC} Navbar.tsx: Dark mode sync (cross-tab)"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} Dark mode sync missing"
  ((checks_failed++))
fi

echo ""
echo "📝 Checking tests..."

# Check test files exist
if [ -f "__tests__/contactValidation.test.ts" ]; then
  echo -e "${GREEN}✓${NC} __tests__/ directory with test files"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} Test files missing"
  ((checks_failed++))
fi

echo ""
echo "🚀 Checking CI/CD..."

if [ -f ".github/workflows/ci.yml" ]; then
  echo -e "${GREEN}✓${NC} GitHub Actions workflow configured"
  ((checks_passed++))
else
  echo -e "${RED}✗${NC} GitHub Actions workflow missing"
  ((checks_failed++))
fi

echo ""
echo "===================================="
echo -e "Results: ${GREEN}$checks_passed passed${NC}, ${RED}$checks_failed failed${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
  echo -e "${GREEN}✨ All checks passed! Project is healthy.${NC}"
  exit 0
else
  echo -e "${RED}⚠ Some checks failed. Please review.${NC}"
  exit 1
fi
