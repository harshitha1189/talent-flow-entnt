// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

import { db, seedDB, Job, Candidate, Assessment } from "./db";

const API = "/api"; // prefix for all routes

// utility: random latency + possible error on write
async function delay() {
  await new Promise((res) => setTimeout(res, 200 + Math.random() * 1000));
}
function maybeFail(rate = 0.08) {
  return Math.random() < rate;
}

export const handlers = [
  // ---------------- Jobs ----------------
  http.get("*/api/jobs", async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const status = url.searchParams.get("status") ?? "";
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");
    const sort = url.searchParams.get("sort") ?? "order";

    let jobs = [...db.jobs];
    if (search) {
      jobs = jobs.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      jobs = jobs.filter((j) => j.status === status); // expects "active"|"archived"
    }

    if (sort === "title") jobs.sort((a, b) => a.title.localeCompare(b.title));
    else jobs.sort((a, b) => a.order - b.order);

    const total = jobs.length;
    const start = (page - 1) * pageSize;
    const items = jobs.slice(start, start + pageSize);

    return HttpResponse.json({ items, total, page, pageSize });
  }),

  http.post(`${API}/jobs`, async ({ request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to create job" },
        { status: 500 }
      );
    }
    const body = (await request.json()) as Partial<Job>;
    const id = `job-${db.jobs.length + 1}-${Date.now()}`;
    const newJob: Job = {
      id,
      title: body.title ?? "Untitled",
      slug: (body.slug ?? body.title ?? "untitled")
        .toLowerCase()
        .replace(/\s+/g, "-"),
      status: body.status ?? "Open",
      tags: body.tags ?? [],
      order: db.jobs.length + 1,
      archived: false
    };
    db.jobs.push(newJob);
    return HttpResponse.json(newJob, { status: 201 });
  }),

  http.patch(`${API}/jobs/:id`, async ({ params, request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to update job" },
        { status: 500 }
      );
    }
    const { id } = params as { id: string };
    const body = (await request.json()) as Partial<Job>;
    const job = db.jobs.find((j) => j.id === id);
    if (!job) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    Object.assign(job, body);
    return HttpResponse.json(job);
  }),

  http.patch(`${API}/jobs/:id/reorder`, async ({ params, request }) => {
    await delay();
    if (maybeFail(0.1)) {
      return HttpResponse.json(
        { message: "Simulated reorder error" },
        { status: 500 }
      );
    }
    const { id } = params as { id: string };
    const body = (await request.json()) as {
      fromOrder: number;
      toOrder: number;
    };
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    db.jobs.sort((a, b) => a.order - b.order);
    const removedIndex = db.jobs.findIndex((j) => j.id === id);
    if (removedIndex === -1)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });

    const [removed] = db.jobs.splice(removedIndex, 1);
    const insertIndex = Math.max(0, Math.min(db.jobs.length, body.toOrder - 1));
    db.jobs.splice(insertIndex, 0, removed);

    db.jobs.forEach((j, idx) => (j.order = idx + 1));

    return HttpResponse.json({ success: true, jobs: db.jobs });
  }),

  // ---------------- Candidates ----------------
http.get(`${API}/candidates`, async ({ request }) => {
  await delay();
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";
  const stage = url.searchParams.get("stage") ?? "";
  const page = Number(url.searchParams.get("page") ?? "1");
  const pageSize = Number(url.searchParams.get("pageSize") ?? "10");

  let list = [...db.candidates];
  if (search) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (stage) {
    list = list.filter((c) => c.stage.toLowerCase() === stage.toLowerCase());
  }

  const total = list.length;
  const start = (page - 1) * pageSize;
  const items = list.slice(start, start + pageSize);

  return HttpResponse.json({ items, total, page, pageSize });
}),

  http.post(`${API}/candidates`, async ({ request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to create candidate" },
        { status: 500 }
      );
    }
    const body = (await request.json()) as Partial<Candidate>;
    const id = `cand-${db.candidates.length + 1}-${Date.now()}`;
    const today = new Date().toISOString().split("T")[0];
    const newCand: Candidate = {
      id,
      name: body.name ?? "Unnamed",
      email: body.email ?? "unknown@email.com",
      jobId: body.jobId ?? null,
      stage: body.stage ?? "applied",
      appliedDate: today,
      timeline: [{ id: `${id}-t-1`, label: "Application Received", date: today }],
    };
    db.candidates.push(newCand);
    return HttpResponse.json(newCand, { status: 201 });
  }),

  http.patch(`${API}/candidates/:id`, async ({ params, request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to update candidate" },
        { status: 500 }
      );
    }
    const { id } = params as { id: string };
    const body = (await request.json()) as Partial<Candidate> & {
      timelineLabel?: string;
    };
    const cand = db.candidates.find((c) => c.id === id);
    if (!cand) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    Object.assign(cand, body);
    if (body.stage) {
      cand.timeline.push({
        id: `${cand.id}-t-${cand.timeline.length + 1}`,
        label: body.timelineLabel ?? body.stage,
        date: new Date().toISOString().split("T")[0],
      });
    }
    return HttpResponse.json(cand);
  }),

  http.get(`${API}/candidates/:id/timeline`, async ({ params }) => {
    await delay();
    const { id } = params as { id: string };
    const cand = db.candidates.find((c) => c.id === id);
    if (!cand) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(cand.timeline);
  }),

  // ---------------- Assessments ----------------
  http.get(`${API}/assessments/:jobId`, async ({ params }) => {
    await delay();
    const { jobId } = params as { jobId: string };
    const a = db.assessments.find((x) => x.jobId === jobId);
    if (!a) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(a);
  }),

  http.put(`${API}/assessments/:jobId`, async ({ params, request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to save assessment" },
        { status: 500 }
      );
    }
    const { jobId } = params as { jobId: string };
    const payload = (await request.json()) as Assessment;
    const idx = db.assessments.findIndex((a) => a.jobId === jobId);
    if (idx === -1) db.assessments.push(payload);
    else db.assessments[idx] = payload;
    return HttpResponse.json(payload);
  }),

  http.post(`${API}/assessments/:jobId/submit`, async ({ params, request }) => {
    await delay();
    if (maybeFail()) {
      return HttpResponse.json(
        { message: "Failed to submit" },
        { status: 500 }
      );
    }
    const { jobId } = params as { jobId: string };
    const body = await request.json();
    db.submissions[jobId] ??= [];
    (db.submissions[jobId] as unknown[]).push({
      id: `sub-${Date.now()}`,
      payload: body,
      date: new Date().toISOString(),
    });
    return HttpResponse.json({ success: true }, { status: 201 });
  }),

  // ---------------- Reset ----------------
  http.post(`${API}/__seed`, async () => {
    seedDB();
    return HttpResponse.json({ ok: true });
  }),
];
