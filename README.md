

# TalentFlow – A Mini Hiring Platform (Front-End Only)

TalentFlow is a **React-based mini hiring platform** designed as a front-end assignment.
It simulates a real-world HR tool where jobs, candidates, and assessments can be managed  **without a backend**.
Persistence is handled locally using IndexedDB, while MirageJS/MSW simulate API endpoints with latency and error handling.

---

## 🚀 Live Demo

👉 [Deployed App Link](https://your-deployment-link.com)
👉 [GitHub Repository](https://github.com/harshitha1189/talent-flow-entnt)

---

## 📌 Features

### Jobs

* Paginated and filterable job board (search by title, status, tags).
* Create/Edit jobs with validation (title required, unique slug).
* Drag-and-drop job reordering with optimistic updates + rollback on failure.


### Candidates

* Virtualized list (25+ candidates) with client-side search (name/email).
* Filter by candidate stage (applied, screen, tech, offer, hired, rejected).
* Candidate profile: `/candidates/:id` with status timeline.
* Kanban board for moving candidates between stages (drag-and-drop).

### Assessments

* Assessment builder per job:

* Add sections & multiple question types (single-choice, multi-choice, text, numeric, file upload stub).
* Live preview of assessments as fillable forms.
* Validation (required, numeric range, max length, conditionals).

---


## 🛠 Tech Stack

* **Next.js + TypeScript** (framework & language)
* **React Router (via Next.js built-in routing)**
* **Tailwind CSS** (UI styling)
* **Framer Motion** (animations & transitions)
* **React Query / Zustand** (state management)
* **MirageJS or MSW** (mock API with latency + error simulation)
* **React Beautiful DnD** (drag-and-drop functionality)
* **React Window / Virtualized** (efficient rendering for large lists)

---



## ⚙️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/harshitha1189/talent-flow-entnt.git
   cd talent-flow-entnt
   ```

2. Install dependencies:

   ```bash
   npm install
  
   ```

3. Run the app:

   ```bash
   npm run dev
   
   ```

4. Open:

   ```
   http://localhost:3000
   ```

---

## 🏗 Architecture Overview

* **Frontend only** —  no backend server.
* **MirageJS/MSW** intercepts fetch requests, simulating REST API with:

  * Artificial latency (200–1200ms).


* **UI Components**:

  * Modular, reusable React components for jobs, candidates, assessments.
  * Drag-and-drop & virtualized rendering for performance.

---

## ⚠️ Known Issues / Challenges


* Rollback on failed drag-and-drop reorder requires careful state handling.
* Virtualized list + drag-and-drop integration is complex.
* Error simulation sometimes makes UX feel inconsistent (by design).

---

## 💡 Technical Decisions


* **MirageJS/MSW** used to simulate realistic API behavior without an actual backend.
* **Optimistic UI updates** implemented to keep UX smooth, with rollback logic for failure cases.
* **Virtualization** for candidate lists ensures performance with 1,000+ entries.
* **Tailwind CSS** adopted for faster UI development and consistent styling.
* **React Query/Zustand** for caching + state management, ensuring separation of local state and async data.

---

## 📦 Deliverables

* ✅ Deployed App Link
* ✅ GitHub Repository
* ✅ Full README (setup, architecture, issues, decisions)

---

## 📜 License

MIT License. Free to use and adapt.


