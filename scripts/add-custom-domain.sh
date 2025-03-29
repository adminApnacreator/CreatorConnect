#!/bin/bash
set -e

# Check if domain is provided
if [ -z "$1" ]; then
  echo "Error: No domain provided"
  echo "Usage: ./scripts/add-custom-domain.sh yourdomain.com"
  exit 1
fi

DOMAIN=$1

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo "Error: Firebase CLI is not installed"
  echo "Please install it using: npm install -g firebase-tools"
  exit 1
fi

# Check if user is logged in
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
  echo "Error: You are not logged in to Firebase"
  echo "Please login using: firebase login"
  exit 1
fi

# Add custom domain to Firebase
echo "Adding custom domain $DOMAIN to Firebase Hosting..."
firebase hosting:sites:create $DOMAIN

# Adding the domain to the default site
echo "Adding $DOMAIN to the default site..."
firebase hosting:sites:update default --set-domain=$DOMAIN

echo "Domain $DOMAIN has been added to Firebase Hosting"
echo "Please follow the instructions in the Firebase Console to verify domain ownership and configure DNS settings."