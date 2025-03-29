# ApnaCreator Platform

A comprehensive creator economy platform that seamlessly connects content creators with brands and peers, enabling monetization and professional networking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [GitHub Integration](#github-integration)
- [Custom Domain Setup](#custom-domain-setup)
- [Firebase Configuration](#firebase-configuration)

## Overview

ApnaCreator is a platform designed for content creators across multiple platforms (YouTube, Facebook, Instagram, LinkedIn). It facilitates brand collaborations, monetization through 1:1 services, and cross-promotion between creators.

## Features

- **Authentication**: Social login with Google, Facebook, Instagram, and LinkedIn
- **Creator Profiles**: Showcase your content, followers, and engagement metrics
- **Service Marketplace**: Offer and purchase creator services with secure payment processing
- **Analytics Dashboard**: Track earnings, growth, and engagement over time
- **Task Management**: Manage client requests and ongoing projects
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account
- GitHub account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/apnacreator.git
   cd apnacreator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Set up your Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with social providers
   - Copy the configuration values to your environment (.env) file:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The project structure follows a client-server architecture:

- `client/`: React frontend with TypeScript
- `server/`: Express backend API
- `shared/`: Shared types and utilities
- `functions/`: Firebase Cloud Functions

### Key Technologies

- **Frontend**: React, TypeScript, TanStack Query, Tailwind CSS, shadcn/ui
- **Backend**: Express, Drizzle ORM
- **Authentication**: Firebase Authentication
- **Deployment**: Firebase Hosting, GitHub Actions

## Deployment

### Automatic Deployment with GitHub Actions

Once set up with GitHub, the project will automatically deploy to Firebase Hosting when you push to the main branch. See the [GitHub Integration](#github-integration) section for details.

### Manual Deployment

To deploy manually:

```bash
npm run build
firebase deploy
```

## GitHub Integration

We've provided scripts to help you set up GitHub integration with continuous deployment.

### Option 1: Using Username/Password

```bash
./scripts/github-setup.sh <github_username> <repository_name>
```

### Option 2: Using Personal Access Token (Recommended)

```bash
./scripts/github-token-push.sh <github_username> <repository_name> <personal_access_token>
```

After running either script, follow the instructions in the [GITHUB_SETUP.md](GITHUB_SETUP.md) file to complete the setup.

## Custom Domain Setup

To connect your custom domain (e.g., apnacreator.com) to your Firebase hosting:

```bash
./scripts/add-custom-domain.sh <domain> <firebase_project_id>
```

For example:
```bash
./scripts/add-custom-domain.sh apnacreator.com my-firebase-project
```

The script will guide you through the DNS configuration process.

## Firebase Configuration

For detailed instructions on setting up Firebase for this project, see the following resources:

- [Firebase Authentication Setup](https://firebase.google.com/docs/auth)
- [Firebase Hosting Configuration](https://firebase.google.com/docs/hosting)
- [Firebase Custom Domain Setup](https://firebase.google.com/docs/hosting/custom-domain)