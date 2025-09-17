// src/pages/api/candidates.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/mocks/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search = '', stage = '', page = '1', pageSize = '10' } = req.query;

    let list = [...db.candidates];

    if (search) {
      const searchStr = String(search).toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(searchStr) ||
          c.email.toLowerCase().includes(searchStr)
      );
    }

    if (stage) {
      list = list.filter((c) => c.stage === stage);
    }

    const pageNum = Number(page);
    const size = Number(pageSize);
    const start = (pageNum - 1) * size;
    const items = list.slice(start, start + size);

    return res.status(200).json({
      items,
      total: list.length,
      page: pageNum,
      pageSize: size,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    const id = `cand-${db.candidates.length + 1}-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const newCand = {
      id,
      name: body.name ?? 'Unnamed',
      email: body.email ?? 'unknown@email.com',
      jobId: body.jobId ?? null,
      stage: body.stage ?? 'applied',
      appliedDate: today,
      timeline: [
        { id: `${id}-t-1`, label: 'Application Received', date: today },
      ],
    };

    db.candidates.push(newCand);
    return res.status(201).json(newCand);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
