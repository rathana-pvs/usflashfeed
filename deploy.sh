#!/bin/bash
# deploy.sh — usflashfeed VPS Production Deployment Script (PM2 + Nginx + Docker DB 5440)
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BRANCH="${1:-main}"

echo -e "${BLUE}======================================================${NC}"
echo -e "${GREEN}🚀 Deploying US Flash Feed (Branch: ${BRANCH})...${NC}"
echo -e "${BLUE}======================================================${NC}"

# 1. Verify PostgreSQL container status
echo -e "${YELLOW}🐘 Checking database container...${NC}"
if ! docker compose ps --services --filter "status=running" | grep -q "db"; then
    echo -e "Starting PostgreSQL container..."
    docker compose up -d db
    sleep 3
fi

# 2. Pull latest code
echo -e "${YELLOW}📥 Pulling latest code from origin/${BRANCH}...${NC}"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

# 3. Install dependencies
echo -e "${YELLOW}📦 Checking dependencies (npm ci)...${NC}"
npm ci --prefer-offline --no-audit

# 4. Generate Payload types if necessary
echo -e "${YELLOW}🧬 Generating schema types...${NC}"
npm run generate:types || true

# 5. Build Next.js & Payload application
echo -e "${YELLOW}🔨 Building Next.js production bundle...${NC}"
NODE_OPTIONS="--max-old-space-size=1536" npm run build
cp -rn public .next/standalone/ 2>/dev/null || true
cp -rn .next/static .next/standalone/.next/ 2>/dev/null || true

# 6. Reload PM2 process
echo -e "${YELLOW}♻️  Reloading PM2 application...${NC}"
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs
pm2 save

# 7. Health Check
echo -e "${YELLOW}🔥 Performing health check on port 3004...${NC}"
HEALTHY=false
for i in {1..10}; do
    sleep 2
    if curl -s -f -H "Host: usflashfeed.com" http://127.0.0.1:3004 > /dev/null; then
        HEALTHY=true
        break
    fi
    echo "Waiting for app to respond (attempt $i/10)..."
done

if [ "$HEALTHY" = true ]; then
    echo -e "${GREEN}✓ Application is healthy and serving traffic!${NC}"
else
    echo -e "${RED}⚠️  Warning: Health check did not return HTTP 200. Inspect logs: pm2 logs usflashfeed --lines 50${NC}"
fi

echo -e "${BLUE}======================================================${NC}"
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}======================================================${NC}"
pm2 status usflashfeed


