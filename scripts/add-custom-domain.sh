#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Adding custom domain to Firebase Hosting...${NC}"

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Firebase CLI is not installed. Installing...${NC}"
    npm install -g firebase-tools
fi

# Check if required arguments are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: ./scripts/add-custom-domain.sh <domain> <firebase_project_id>"
    echo "Example: ./scripts/add-custom-domain.sh apnacreator.com my-firebase-project"
    exit 1
fi

DOMAIN=$1
PROJECT_ID=$2

# Login to Firebase
echo -e "${YELLOW}Logging in to Firebase (you may need to open a browser)...${NC}"
firebase login

# Add custom domain to Firebase Hosting
echo -e "${YELLOW}Adding custom domain ${DOMAIN} to Firebase Hosting...${NC}"
firebase hosting:sites:create $DOMAIN --project $PROJECT_ID

# Update firebase.json to include the custom domain
if grep -q "\"site\":" firebase.json; then
    # Site is already defined, update it
    sed -i "s/\"site\": \"[^\"]*\"/\"site\": \"$DOMAIN\"/" firebase.json
else
    # Site is not defined, add it
    sed -i "s/\"hosting\": {/\"hosting\": {\n    \"site\": \"$DOMAIN\",/" firebase.json
fi

echo -e "${GREEN}Custom domain added to Firebase Hosting configuration${NC}"
echo ""
echo -e "${YELLOW}DNS Configuration Instructions:${NC}"
echo "1. Go to your domain registrar (e.g., GoDaddy, Namecheap)"
echo "2. Add the following DNS records:"
echo "   - Type: A, Name: @, Value: 151.101.1.195, 151.101.65.195"
echo "   - Type: CNAME, Name: www, Value: $DOMAIN"
echo ""
echo -e "${YELLOW}To verify your domain ownership, you need to:${NC}"
echo "1. Run: firebase hosting:sites:list --project $PROJECT_ID"
echo "2. Verify domain ownership at Firebase Console -> Hosting"
echo "3. After DNS propagation, deploy with: firebase deploy --only hosting:$DOMAIN --project $PROJECT_ID"
echo ""
echo -e "${GREEN}Once DNS is configured and verification is complete, your site will be available at https://$DOMAIN${NC}"