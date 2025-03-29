#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for ApnaCreator...${NC}"

# Check if environment variables are set
if [ -z "$VITE_FIREBASE_API_KEY" ] || [ -z "$VITE_FIREBASE_PROJECT_ID" ] || [ -z "$VITE_FIREBASE_APP_ID" ]; then
  echo -e "${RED}Error: Required environment variables are not set${NC}"
  echo "Please make sure the following environment variables are set:"
  echo "- VITE_FIREBASE_API_KEY"
  echo "- VITE_FIREBASE_PROJECT_ID"
  echo "- VITE_FIREBASE_APP_ID"
  exit 1
fi

# Build frontend
echo -e "${YELLOW}Building frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Frontend build failed!${NC}"
  exit 1
fi
echo -e "${GREEN}Frontend build successful${NC}"

# Build functions
echo -e "${YELLOW}Building functions...${NC}"
cd functions
npm install
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Functions build failed!${NC}"
  exit 1
fi
cd ..
echo -e "${GREEN}Functions build successful${NC}"

# Deploy to Firebase
echo -e "${YELLOW}Deploying to Firebase...${NC}"
firebase deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed!${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"
echo -e "${YELLOW}Your application is now live at:${NC} https://${VITE_FIREBASE_PROJECT_ID}.web.app"

# Check if custom domain is configured
CUSTOM_DOMAIN=$(grep -o '"site": "[^"]*"' firebase.json | cut -d'"' -f4)
if [ ! -z "$CUSTOM_DOMAIN" ]; then
  echo -e "Custom domain: https://$CUSTOM_DOMAIN"
fi

echo ""
echo -e "${YELLOW}To add a custom domain, run:${NC}"
echo "./scripts/add-custom-domain.sh your-domain.com"