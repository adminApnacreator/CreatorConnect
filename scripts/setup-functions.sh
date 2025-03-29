#!/bin/bash
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Firebase Cloud Functions...${NC}"

# Check if we're in the right directory
if [ ! -d "functions" ]; then
  echo -e "${RED}Error: functions directory not found${NC}"
  echo "Please run this script from the root directory of the project"
  exit 1
fi

# Install dependencies for functions
echo -e "${YELLOW}Installing dependencies for Firebase functions...${NC}"
cd functions

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found in functions directory${NC}"
  exit 1
fi

# Install dependencies
npm install
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install dependencies${NC}"
  exit 1
fi

# Install firebase-functions and firebase-admin if not already installed
echo -e "${YELLOW}Ensuring firebase-functions and firebase-admin are installed...${NC}"
npm install --save firebase-functions firebase-admin
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install firebase packages${NC}"
  exit 1
fi

# Install express and cors if not already installed
echo -e "${YELLOW}Ensuring express and cors are installed...${NC}"
npm install --save express cors
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install express packages${NC}"
  exit 1
fi

# Install types for typescript
echo -e "${YELLOW}Installing TypeScript type definitions...${NC}"
npm install --save-dev @types/express @types/cors
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install type definitions${NC}"
  exit 1
fi

# Build the functions
echo -e "${YELLOW}Building functions...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to build functions${NC}"
  exit 1
fi

cd ..

echo -e "${GREEN}Firebase Cloud Functions setup completed successfully!${NC}"
echo "You can now deploy your functions using: firebase deploy --only functions"