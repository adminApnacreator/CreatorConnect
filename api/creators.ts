import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const creators = await storage.getCreator({}); // Added empty object argument
    return res.json(creators);
  }
  // Handle other methods...
}