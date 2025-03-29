#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Checking Firebase configuration...${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo -e "${RED}Error: .env file not found${NC}"
  echo "Please run ./scripts/setup-env.sh to create the .env file"
  exit 1
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}Error: Firebase CLI is not installed${NC}"
  echo "Please install it using: npm install -g firebase-tools"
  exit 1
fi

# Check if user is logged in to Firebase
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: You are not logged in to Firebase${NC}"
  echo "Please login using: firebase login"
  exit 1
fi

# Check if .firebaserc exists
if [ ! -f ".firebaserc" ]; then
  echo -e "${RED}Error: .firebaserc file not found${NC}"
  echo "Please make sure your Firebase project is configured"
  exit 1
fi

# Get the Firebase project ID from .env
PROJECT_ID=$(grep VITE_FIREBASE_PROJECT_ID .env | cut -d '=' -f2)
if [ -z "$PROJECT_ID" ]; then
  echo -e "${RED}Error: VITE_FIREBASE_PROJECT_ID not found in .env file${NC}"
  exit 1
fi

# Check if the project ID in .firebaserc matches the one in .env
FIREBASERC_PROJECT=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
if [ "$FIREBASERC_PROJECT" != "$PROJECT_ID" ] && [ "$FIREBASERC_PROJECT" != "\${VITE_FIREBASE_PROJECT_ID}" ]; then
  echo -e "${RED}Error: Project ID mismatch${NC}"
  echo "Project ID in .env: $PROJECT_ID"
  echo "Project ID in .firebaserc: $FIREBASERC_PROJECT"
  echo "Please run ./scripts/setup-env.sh to update the configuration"
  exit 1
fi

# Check if all required environment variables are set
if [ -z "$(grep VITE_FIREBASE_API_KEY .env | cut -d '=' -f2)" ]; then
  echo -e "${RED}Error: VITE_FIREBASE_API_KEY not found in .env file${NC}"
  exit 1
fi

if [ -z "$(grep VITE_FIREBASE_APP_ID .env | cut -d '=' -f2)" ]; then
  echo -e "${RED}Error: VITE_FIREBASE_APP_ID not found in .env file${NC}"
  exit 1
fi

# Check if the project exists on Firebase
PROJECT_EXISTS=$(firebase projects:list | grep "$PROJECT_ID")
if [ -z "$PROJECT_EXISTS" ]; then
  echo -e "${RED}Warning: Project $PROJECT_ID was not found in your Firebase account${NC}"
  echo "Please make sure you have access to this project"
  exit 1
fi

echo -e "${GREEN}Firebase configuration is valid!${NC}"
echo "Project ID: $PROJECT_ID"
echo ""
echo -e "${YELLOW}Ready to deploy to Firebase!${NC}"
echo "Run './scripts/deploy.sh' to deploy the application"