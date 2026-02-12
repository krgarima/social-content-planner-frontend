# Social Content Planner Frontend

Next.js frontend for the Social Content Planner demo task.

## Live Links

- Frontend App: `https://social-content-planner-frontend.vercel.app/`
- Backend API: `https://social-content-planner-backend.onrender.com`
- Backend API Docs: `https://social-content-planner-backend.onrender.com/docs`
- Note: Render free tier may be slow on first load (cold start).
- Demo: https://www.loom.com/share/8333b28c58ea45d692e2d0f2aa414b75

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Recharts

## Features Covered

- Full CRUD UI for post ideas
- Dashboard/reporting UI based on database data
- Third-party hashtag assistant integrated in create/edit flow

## Local Setup

1. Install dependencies.

```bash
npm install
```

2. Create `.env.local` from `.env.example`.

```bash
copy .env.example .env.local
```

3. Set API base URL in `.env.local`.

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

4. Start development server.

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Environment Variables

Use `./.env.example` as the template.

- `NEXT_PUBLIC_API_BASE_URL`

## App Routes

- `/` - Post ideas list and filters
- `/new` - Create post idea
- `/post-ideas/{id}` - View/edit/delete post idea
- `/dashboard` - Reporting and charts

## Deployment Notes

- Hosting: Vercel
- Required env var on Vercel:
  - `NEXT_PUBLIC_API_BASE_URL=https://social-content-planner-backend.onrender.com/api`
- Ensure backend CORS includes frontend domain.

## How to Test

1. Open `/new` and create a post idea.
2. Verify the record appears on `/`.
3. Open `/post-ideas/{id}` and update details.
4. Use Hashtag Assistant on `/new` or `/post-ideas/{id}`.
5. Open `/dashboard` and verify chart/summary updates.
6. Delete the record on `/post-ideas/{id}` and confirm it is removed from `/` and reflected in `/dashboard`.

## Build for Production

```bash
npm run build
npm run start
```
