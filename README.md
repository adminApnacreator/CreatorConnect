# ApnaCreator - Creator Economy Platform

ApnaCreator is a platform connecting content creators with brands and other creators for monetization opportunities.

## Features

- Creator profiles showcasing social media presence, follower counts, and services
- Monetization through 1:1 services and brand collaborations
- Social authentication (Google, Facebook, Instagram, LinkedIn)
- Responsive design for all devices

## Tech Stack

- React.js with Vite for frontend
- Express.js for backend API
- Firebase for authentication and hosting
- Tailwind CSS and Shadcn UI for styling

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/apnacreator.git
   cd apnacreator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Deployment

This app is configured for deployment to Firebase hosting:

1. Build the application
   ```bash
   npm run build
   ```

2. Deploy to Firebase
   ```bash
   firebase deploy
   ```

## License

[MIT](LICENSE)