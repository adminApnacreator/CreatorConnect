# Deployment Guide for ApnaCreator

This guide provides instructions for deploying the ApnaCreator platform to Firebase Hosting and configuring the custom domain apnacreator.com.

## Prerequisites

- Firebase CLI installed and authenticated
- Firebase project already created
- Domain name registered (apnacreator.com)

## Initial Setup

1. **Install Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**

   ```bash
   firebase login
   ```

3. **Set up environment variables:**

   ```bash
   ./scripts/setup-env.sh
   ```

   This script will prompt you for your Firebase project details and create the necessary configuration files.

4. **Set up Firebase Functions:**

   ```bash
   ./scripts/setup-functions.sh
   ```

   This will install dependencies for Firebase Cloud Functions.

5. **Verify your Firebase configuration:**

   ```bash
   ./scripts/check-firebase-config.sh
   ```

## Deployment Steps

### Manual Deployment

1. **Deploy to Firebase:**

   Using our deployment script (recommended):

   ```bash
   ./scripts/deploy.sh
   ```

   Or manually:

   ```bash
   # Build the application
   npm run build
   
   # Build the Firebase functions
   cd functions
   npm run build
   cd ..
   
   # Deploy to Firebase
   firebase deploy
   ```

### Automated Deployment with GitHub Actions

1. **Generate a Firebase CI token:**

   ```bash
   ./scripts/setup-ci.sh
   ```

   This script will generate a Firebase token for CI/CD and provide instructions for adding it to GitHub.

2. **Add the token to GitHub repository secrets:**

   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Create a new repository secret named `FIREBASE_TOKEN` and paste your token

3. **Push to the main branch to trigger deployment**

## Custom Domain Setup

### Add apnacreator.com to Firebase

1. **Use our custom domain script:**

   ```bash
   ./scripts/add-custom-domain.sh apnacreator.com
   ```

2. **Verify domain ownership:**

   - Follow the instructions in the Firebase Console to verify ownership of apnacreator.com
   - This typically involves adding a TXT record to your domain's DNS settings

3. **Configure DNS Settings:**

   Add the following DNS records to your domain provider:

   - For the root domain (apnacreator.com):
     - Type: A
     - Value: The IP addresses provided by Firebase

   - For www subdomain (www.apnacreator.com):
     - Type: CNAME
     - Value: The Firebase hosting URL provided

4. **Wait for DNS Propagation:**

   - DNS changes can take up to 24-48 hours to propagate worldwide
   - You can check propagation using tools like [dnschecker.org](https://dnschecker.org)

## SSL Certificate

Firebase Hosting automatically provisions and manages SSL certificates for your custom domains. No additional setup is required.

## Troubleshooting

- **Deployment fails with authentication errors:**
  Run `firebase login` again to refresh your authentication.

- **Custom domain not working:**
  Verify your DNS settings and ensure enough time has passed for DNS propagation.

- **Environment variable issues:**
  Run `./scripts/setup-env.sh` to reconfigure your environment variables.

- **Firebase Functions errors:**
  Run `./scripts/setup-functions.sh` to ensure all dependencies are installed correctly.

## Updating the Deployment

To update your deployed application:

1. Make your changes to the codebase
2. Commit and push to the main branch (if using GitHub Actions)
3. Or run `./scripts/deploy.sh` to deploy manually