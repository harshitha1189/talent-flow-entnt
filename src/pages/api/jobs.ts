import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/mocks/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ items: db.jobs, total: db.jobs.length });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
