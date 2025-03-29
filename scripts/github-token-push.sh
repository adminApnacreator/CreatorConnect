#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up GitHub repository for ApnaCreator using a Personal Access Token...${NC}"

# Check if required arguments are provided
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: ./scripts/github-token-push.sh <github_username> <repository_name> <personal_access_token>"
    echo "Example: ./scripts/github-token-push.sh johndoe apnacreator ghp_xxxxxxxxxxxxxxxx"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2
TOKEN=$3

# Create the repository URL with token for authentication
GITHUB_REPO="https://${GITHUB_USERNAME}:${TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Initialize Git repository if not already done
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized${NC}"
else
    echo -e "${YELLOW}Git repository already initialized${NC}"
fi

# Configure Git user if not already set
GIT_USER=$(git config user.name)
GIT_EMAIL=$(git config user.email)

if [ -z "$GIT_USER" ]; then
    echo -e "${YELLOW}Setting up Git user name...${NC}"
    echo -e "${YELLOW}Please enter your name for Git commits:${NC}"
    read -r git_name
    git config user.name "$git_name"
fi

if [ -z "$GIT_EMAIL" ]; then
    echo -e "${YELLOW}Setting up Git email...${NC}"
    echo -e "${YELLOW}Please enter your email for Git commits:${NC}"
    read -r git_email
    git config user.email "$git_email"
fi

# Add all files to Git
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Initial commit of ApnaCreator platform"

# Add GitHub remote
echo -e "${YELLOW}Adding GitHub remote...${NC}"
# Remove origin if it already exists
git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_REPO"

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin master || git push -u origin main

echo -e "${GREEN}Successfully pushed to GitHub repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to Secrets and variables > Actions"
echo "3. Add the FIREBASE_TOKEN secret with the value: $TOKEN_PREVIEW"
echo ""
echo -e "${YELLOW}After adding the secret, the GitHub Actions workflow will automatically deploy your app when you push to the main branch.${NC}"