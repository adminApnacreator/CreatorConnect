// vercel-build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in a production environment
process.env.NODE_ENV = 'production';

// Run the frontend build
console.log('Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

// Create the api directory if it doesn't exist
const apiDir = path.join(__dirname, '.vercel/output/functions/api');
fs.mkdirSync(apiDir, { recursive: true });

// Build the API server
console.log('Building API server...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=.vercel/output/functions/api', 
  { stdio: 'inherit' }
);

console.log('Build completed successfully.');