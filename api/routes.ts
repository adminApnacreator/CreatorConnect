import { IncomingMessage, ServerResponse } from 'http';
import app from './index';

// This is the serverless function handler for Vercel
export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Forward the request to our Express app
  return app(req, res);
}