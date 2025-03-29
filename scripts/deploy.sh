#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying ApnaCreator to Firebase...${NC}"

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Firebase CLI is not installed. Installing...${NC}"
    npm install -g firebase-tools
fi

# Check if project is specified
if [ -z "$1" ]; then
    echo -e "${RED}Error: Firebase project ID is required${NC}"
    echo "Usage: ./scripts/deploy.sh <firebase_project_id>"
    echo "Example: ./scripts/deploy.sh my-firebase-project"
    exit 1
fi

PROJECT_ID=$1

# Login to Firebase
echo -e "${YELLOW}Logging in to Firebase (you may need to open a browser)...${NC}"
firebase login

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

# Initialize Firebase if firebase.json doesn't exist
if [ ! -f "firebase.json" ]; then
    echo -e "${YELLOW}Initializing Firebase...${NC}"
    echo -e "${YELLOW}Please select Hosting when prompted${NC}"
    echo -e "${YELLOW}Set 'dist' as your public directory${NC}"
    echo -e "${YELLOW}Configure as a single-page app: Yes${NC}"
    firebase init --project $PROJECT_ID
fi

# Deploy to Firebase
echo -e "${YELLOW}Deploying to Firebase...${NC}"
firebase deploy --project $PROJECT_ID

# Check if deploy was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Deployment successful!${NC}"
    echo -e "${GREEN}Your app is now live at:${NC}"
    echo -e "${GREEN}https://$PROJECT_ID.web.app${NC}"
    echo ""
    echo -e "${YELLOW}To set up a custom domain, run:${NC}"
    echo "./scripts/add-custom-domain.sh your-domain.com $PROJECT_ID"
else
    echo -e "${RED}Deployment failed. Please check the error message above.${NC}"
fi