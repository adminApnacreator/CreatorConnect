import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const creators = await storage.getAllCreators();
    return res.json(creators);
  }
  // Handle other methods...
}