#!/bin/bash
set -e

# Build the frontend
echo "Building frontend..."
npm run build

# Build the functions
echo "Building functions..."
cd functions
npm run build
cd ..

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy

echo "Deployment completed successfully!"