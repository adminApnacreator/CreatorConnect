# GitHub Setup Guide for ApnaCreator

This guide will help you create a GitHub repository and upload your code with the proper CI/CD configuration for automatic deployment.

## Prerequisites

- GitHub account
- Git installed on your machine
- Firebase token (already provided)

## Creating a GitHub Repository

1. **Log in to GitHub**:
   Go to [GitHub](https://github.com) and log in to your account.

2. **Create a new repository**:
   - Click the "+" icon in the top-right corner
   - Select "New repository"
   - Name your repository (e.g., "apnacreator")
   - Add a description (optional): "A creator economy platform connecting content creators with brands"
   - Choose "Public" or "Private" visibility
   - Do NOT initialize the repository with a README, .gitignore, or license
   - Click "Create repository"

## Uploading Your Code to GitHub

After creating the repository, you'll see instructions for pushing an existing repository. We've simplified this process with our script.

### Using the Automated Script (Recommended)

Run our setup script with your GitHub username and repository name:

```bash
./scripts/github-setup.sh <your_github_username> <repository_name>
```

For example:

```bash
./scripts/github-setup.sh johndoe apnacreator
```

This script will:
- Initialize a Git repository (if needed)
- Create a proper .gitignore file
- Commit all your code
- Push it to your GitHub repository

### Manual Method (Alternative)

If you prefer to do it manually or the script doesn't work:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Create a .gitignore file**:
   ```bash
   echo "node_modules
   dist
   .env
   .env.local
   *.log
   .DS_Store
   .cache
   .firebase" > .gitignore
   ```

3. **Add your files**:
   ```bash
   git add .
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "Initial commit of ApnaCreator platform"
   ```

5. **Add the GitHub remote**:
   ```bash
   git remote add origin https://github.com/<your_github_username>/<repository_name>.git
   ```

6. **Push to GitHub**:
   ```bash
   git push -u origin master
   ```
   (or `git push -u origin main` if your default branch is 'main')

## Setting Up GitHub Actions for CI/CD

We've already created the necessary workflow file at `.github/workflows/firebase-deploy.yml`, but you need to add your Firebase token as a secret:

1. **Go to your GitHub repository**
2. **Navigate to "Settings" → "Secrets and variables" → "Actions"**
3. **Click "New repository secret"**
4. **Add the secret**:
   - Name: `FIREBASE_TOKEN`
   - Value: Paste the Firebase token you've already provided
5. **Click "Add secret"**

## Verifying the Setup

1. **Check Actions tab in GitHub**:
   - Go to the "Actions" tab in your GitHub repository
   - You should see a workflow run triggered by your push
   - If everything is configured correctly, it will deploy your app to Firebase

2. **Check repository files**:
   - Go to the "Code" tab
   - You should see all your files, including the `.github/workflows/firebase-deploy.yml` file
   - This workflow file handles the automatic deployment

## Troubleshooting

- **Push fails**: Make sure you have the correct GitHub credentials
- **Workflow fails**: Check the error message in the Actions tab. The most common issue is an incorrect Firebase token
- **Permission errors**: Make sure you're the owner of the repository or have write access