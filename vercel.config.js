// vercel.config.js
module.exports = {
    // Ensure we deploy both the frontend and backend correctly
    framework: 'vite',
    
    // Configure the build steps
    buildCommand: 'vite build',
    
    // Where the static assets get built to
    outputDirectory: 'dist',
    
    // Configure env variables at build time
    env: {
      NODE_ENV: 'production'
    },
    
    // Configure installation command
    installCommand: 'npm install'
  }