import { type Express } from 'express';
import { setupAuthRoutes } from './auth.js';
import { setupCreatorRoutes } from './creators.js';
import { setupUserRoutes } from './users.js';

export async function registerRoutes(app: Express): Promise<void> {
  setupAuthRoutes(app);
  setupCreatorRoutes(app);
  setupUserRoutes(app);
} 