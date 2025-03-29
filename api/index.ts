import express from 'express';
import { registerRoutes } from '../server/routes';
import { storage } from '../server/storage';
import { json, urlencoded } from 'express';
import { createServer } from 'http';

// Create Express app
const app = express();
const server = createServer(app);

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Register API routes
registerRoutes(app)
  .then(() => console.log('API routes registered'))
  .catch(err => console.error('Failed to register API routes', err));

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

export default app;