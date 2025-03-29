# ApnaCreator - Creator Economy Platform

ApnaCreator is a comprehensive platform that connects content creators across multiple social media platforms (YouTube, Facebook, Instagram, LinkedIn) with brands for collaboration opportunities and monetization through 1:1 services.

## Features

- **Social Authentication**: Sign in with Google, Facebook, Instagram, and LinkedIn.
- **Creator Profiles**: Detailed creator profiles showcasing their services, earnings, and analytics.
- **Service Marketplace**: Creators can offer their services with detailed pricing and deliverables.
- **Earnings Dashboard**: Track earnings and upcoming tasks on a comprehensive dashboard.
- **Brand Discovery**: Brands can discover and connect with creators for collaboration.
- **Responsive Design**: Beautiful and responsive UI with gradient style colors.

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, shadcn UI components
- **State Management**: TanStack React Query for data fetching
- **Authentication**: Firebase Authentication
- **Backend**: Express.js
- **Database**: In-memory storage (can be connected to PostgreSQL)
- **Hosting**: Firebase Hosting
- **Functions**: Firebase Cloud Functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project

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

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Deployment

See the detailed [Deployment Guide](DEPLOYMENT.md) for instructions on deploying to Firebase Hosting with a custom domain.

### Deploying to apnacreator.com

This project is configured to be deployed to the custom domain apnacreator.com. Here are the steps to set this up:

1. Run the environment setup script to configure your Firebase project:
   ```bash
   ./scripts/setup-env.sh
   ```

2. Set up your custom domain in Firebase Hosting:
   ```bash
   ./scripts/add-custom-domain.sh apnacreator.com
   ```

3. Follow the instructions in the Firebase Console to verify domain ownership and configure DNS settings.

4. Deploy the application:
   ```bash
   ./scripts/deploy.sh
   ```

### Continuous Integration/Continuous Deployment

This project includes GitHub Actions workflows for automatic deployment. To set up CI/CD:

1. Run the CI setup script to generate a Firebase token:
   ```bash
   ./scripts/setup-ci.sh
   ```

2. Add the token to your GitHub repository secrets (follow the instructions provided by the script).

3. Push changes to the main branch to trigger automatic deployment.

## Project Structure

- `/client` - React frontend code
  - `/src/components` - UI components
  - `/src/pages` - Page components
  - `/src/lib` - Utility functions and Firebase setup
  - `/src/hooks` - Custom React hooks
- `/server` - Express backend code
  - `routes.ts` - API routes
  - `storage.ts` - Data storage interface
- `/functions` - Firebase Cloud Functions
- `/shared` - Shared types and schemas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the amazing creators who inspired this platform
- The open source community for the incredible tools and libraries