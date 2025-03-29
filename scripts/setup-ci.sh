#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up CI/CD for Firebase deployment...${NC}"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}Error: Firebase CLI is not installed${NC}"
  echo "Please install it using: npm install -g firebase-tools"
  exit 1
fi

# Check if user is logged in
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: You are not logged in to Firebase${NC}"
  echo "Please login using: firebase login"
  exit 1
fi

# Generate CI token
echo -e "${YELLOW}Generating Firebase CI token...${NC}"
echo -e "${YELLOW}This token will be used for CI/CD pipelines. Keep it secret!${NC}"
echo ""

firebase login:ci

echo ""
echo -e "${GREEN}Add this token to your GitHub repository secrets${NC}"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Secrets and variables > Actions"
echo "3. Create a new repository secret named FIREBASE_TOKEN"
echo "4. Paste the token above"
echo ""
echo -e "${YELLOW}After setting up the token, push to main branch to trigger deployment${NC}"