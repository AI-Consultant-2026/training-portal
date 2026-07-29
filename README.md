# Training Portal

LMS platform for Care Consulting's beginner courses (Cybersecurity, Social Media Management, GIS & Drone Mapping, Renewable Energy Digital Systems).

This repo currently implements **Phase 1: Core Platform** — authentication, course listing, and enrollment. See `docs/training_portal_spec.md`-style phases for the full roadmap (assignments, quizzes, capstone projects, analytics/admin, and the interactive-video addendum come later).

## Stack

- **Backend**: Node.js + Express + TypeScript, PostgreSQL via Sequelize, JWT auth (access token + DB-backed refresh tokens)
- **Frontend**: React 18 + Vite + TypeScript, Redux Toolkit, Tailwind CSS
- **Local dev**: Docker Compose

## Getting started

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker compose up --build
```

Then, in a separate terminal, run migrations and seed demo data:

```bash
docker compose exec backend npx sequelize-cli db:migrate
docker compose exec backend npx sequelize-cli db:seed:all
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api
- Health check: http://localhost:4000/api/health

### Seeded accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@trainingportal.local | ChangeMe123! |
| Instructor | instructor@trainingportal.local | ChangeMe123! |

## Running tests

```bash
docker compose exec backend npm test
```

## Project structure

```
backend/    Express + TypeScript API, Sequelize models/migrations/seeders
frontend/   React + Vite + TypeScript SPA
```
