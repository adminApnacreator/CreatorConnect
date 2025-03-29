# Deployment Guide for ApnaCreator

This document provides detailed instructions for deploying the ApnaCreator platform to Firebase Hosting, setting up continuous integration/continuous deployment (CI/CD) with GitHub Actions, and configuring a custom domain.

## Table of Contents

- [Firebase Deployment](#firebase-deployment)
- [GitHub Actions CI/CD Setup](#github-actions-cicd-setup)
- [Custom Domain Configuration](#custom-domain-configuration)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Firebase Deployment

### Prerequisites

1. Firebase account
2. Firebase CLI installed (`npm install -g firebase-tools`)
3. Firebase project created in the [Firebase Console](https://console.firebase.google.com/)

### Manual Deployment Steps

1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Initialize Firebase in your project** (if not already done):
   ```bash
   firebase init
   ```
   - Select "Hosting" when prompted
   - Select your Firebase project
   - Specify "dist" as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys with GitHub: No (we'll set this up separately)

3. **Build your project**:
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

5. **Verify deployment**:
   Visit the URL shown in the deployment output (typically `https://<your-project-id>.web.app`)

## GitHub Actions CI/CD Setup

We've provided a GitHub Actions workflow file (`.github/workflows/firebase-deploy.yml`) that automatically builds and deploys your application to Firebase when you push to the main branch.

### Setting Up GitHub Repository

Follow the instructions in [GITHUB_SETUP.md](GITHUB_SETUP.md) to:
1. Create a GitHub repository
2. Connect your local project to GitHub
3. Push your code to GitHub

### Setting Up GitHub Secrets

For the CI/CD workflow to function properly, you need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

2. Add the following secrets:
   - `FIREBASE_TOKEN`: Your Firebase CI token (get it by running `firebase login:ci`)
   - `VITE_FIREBASE_API_KEY`: Your Firebase project API key
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID

### Testing the Workflow

1. Make a small change to your code
2. Commit and push to the main branch
3. Go to the "Actions" tab in your GitHub repository to monitor the workflow
4. Once completed, verify the changes on your Firebase Hosting URL

## Custom Domain Configuration

### Prerequisites

1. Ownership of a domain (e.g., apnacreator.com)
2. Access to your domain's DNS settings

### Using the Automation Script

We've provided a script to simplify the custom domain configuration process:

```bash
./scripts/add-custom-domain.sh apnacreator.com your-firebase-project-id
```

### Manual Configuration Steps

1. **Add your domain to Firebase Hosting**:
   ```bash
   firebase hosting:sites:create apnacreator.com --project your-firebase-project-id
   ```

2. **Update firebase.json** to reference your custom domain:
   ```json
   {
     "hosting": {
       "site": "apnacreator.com",
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

3. **Deploy to the custom site**:
   ```bash
   firebase deploy --only hosting:apnacreator.com
   ```

4. **Configure DNS** at your domain registrar:
   - Add an A record pointing to Firebase's IP addresses: 151.101.1.195, 151.101.65.195
   - Add a CNAME record for 'www' pointing to your main domain

5. **Verify domain ownership** in the Firebase Console

## Environment Variables

The following environment variables are required for the application to function properly:

- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID

For local development, create a `.env.local` file in the root directory with these variables. For production deployment, these variables are set as GitHub Secrets and used in the CI/CD workflow.

## Troubleshooting

### Common Issues

1. **Deployment fails with authentication errors**:
   - Ensure your Firebase token is correct and not expired
   - Run `firebase login:ci` to generate a new token

2. **Custom domain not working**:
   - Verify DNS configuration at your domain registrar
   - Check that you've completed domain verification in Firebase Console
   - DNS changes can take up to 48 hours to propagate

3. **Build fails in GitHub Actions**:
   - Check that all required environment variables are set as secrets
   - Review the build logs in the GitHub Actions tab for specific errors

4. **Social login not working after deployment**:
   - Ensure you've added your production URL to the authorized domains in Firebase Authentication settings
   - Check for CORS errors in the browser console

### Getting Help

If you encounter issues not covered here, please:
1. Check the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting)
2. Review GitHub Actions logs for detailed error messages
3. Search for specific error messages in the Firebase community forums