#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up GitHub repository for ApnaCreator...${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed${NC}"
    exit 1
fi

# Check if GitHub username and repository name are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}Error: GitHub username and repository name are required${NC}"
    echo "Usage: ./scripts/github-setup.sh <github_username> <repository_name>"
    echo "Example: ./scripts/github-setup.sh johndoe apnacreator"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2
GITHUB_REPO="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Initialize Git repository if not already done
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized${NC}"
else
    echo -e "${YELLOW}Git repository already initialized${NC}"
fi

# Add all files to Git
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Create gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}Creating .gitignore file...${NC}"
    cat > .gitignore << EOF
node_modules
dist
.env
.env.local
*.log
.DS_Store
.cache
.firebase
EOF
    git add .gitignore
    echo -e "${GREEN}.gitignore file created${NC}"
fi

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Initial commit of ApnaCreator platform"

# Add GitHub remote
echo -e "${YELLOW}Adding GitHub remote...${NC}"
git remote add origin $GITHUB_REPO

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo -e "${YELLOW}You may be prompted to enter your GitHub credentials${NC}"
git push -u origin master || git push -u origin main

echo -e "${GREEN}Successfully pushed to GitHub repository: ${GITHUB_REPO}${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to Secrets and variables > Actions"
echo "3. Add the FIREBASE_TOKEN secret with the value provided"
echo ""
echo -e "${YELLOW}After adding the secret, the GitHub Actions workflow will automatically deploy your app when you push to the main branch.${NC}"