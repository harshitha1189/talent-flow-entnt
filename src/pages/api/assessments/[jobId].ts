// src/pages/api/assessments/[jobId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/mocks/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { jobId } = req.query;
  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({ message: 'Invalid jobId' });
  }

  if (req.method === 'GET') {
    const a = db.assessments.find((x) => x.jobId === jobId);
    if (!a) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(a);
  }

  if (req.method === 'PUT') {
    const payload = req.body;
    const idx = db.assessments.findIndex((a) => a.jobId === jobId);
    if (idx === -1) db.assessments.push(payload);
    else db.assessments[idx] = payload;
    return res.status(200).json(payload);
  }

  if (req.method === 'POST') {
    // submit assessment
    const submission = {
      id: `sub-${Date.now()}`,
      payload: req.body,
      date: new Date().toISOString(),
    };
    db.submissions[jobId] ??= [];
    (db.submissions[jobId] as unknown[]).push(submission);
    return res.status(201).json({ success: true });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
