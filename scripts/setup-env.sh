#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up environment variables for ApnaCreator...${NC}"

# Create .env file
ENV_FILE=".env"

# Check if .env file already exists
if [ -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}The $ENV_FILE file already exists. Do you want to overwrite it? (y/n)${NC}"
  read -r overwrite
  if [ "$overwrite" != "y" ]; then
    echo "Operation cancelled. Existing .env file will not be modified."
    exit 0
  fi
fi

# Prompt for Firebase project configuration
echo -e "${YELLOW}Please enter your Firebase configuration:${NC}"
echo -e "${YELLOW}(You can find these in your Firebase project settings)${NC}"
echo ""

read -p "Firebase API Key: " api_key
read -p "Firebase Project ID: " project_id
read -p "Firebase App ID: " app_id

# Create .env file
cat > "$ENV_FILE" << EOF
VITE_FIREBASE_API_KEY=$api_key
VITE_FIREBASE_PROJECT_ID=$project_id
VITE_FIREBASE_APP_ID=$app_id
EOF

echo -e "${GREEN}Environment variables have been set up successfully!${NC}"
echo "To start the application, run: npm run dev"

# Update .firebaserc with the project ID
cat > ".firebaserc" << EOF
{
  "projects": {
    "default": "$project_id"
  }
}
EOF

echo -e "${GREEN}Firebase project configuration set to: ${YELLOW}$project_id${NC}"