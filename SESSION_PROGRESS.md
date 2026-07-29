# Training Portal — Session Progress

Last updated: 2026-07-29 (mid Phase 2 build)

## How to resume

Read this file first. Then check `git log --oneline` in `~/training-portal` for the exact commit history, and `/Users/osimeh/.claude/plans/agile-squishing-lightning.md` for the full approved Phase 2 build plan (migrations/models/services/routes/frontend spec, in detail, with every locked decision).

Containers: `docker compose up -d` from `~/training-portal` (Colima must be running: `colima status`, or `brew services start colima`). Backend on :4000, frontend on :5173, Postgres on :5432.

---

## Completed

### Phase 1 — Core Platform (done, committed, tested)
- Auth: register/login/refresh/logout, JWT access token + DB-backed refresh tokens with rotation/revocation.
- Courses/modules/lessons/enrollments: full CRUD + role-based authorization (student/instructor/admin).
- 14 passing Jest/Supertest backend tests.
- Frontend: React/Redux Toolkit/Tailwind — login/register, course browsing, enrollment, student dashboard with progress bars.
- Docker Compose (Postgres + backend + frontend), running via Colima (Docker Desktop wasn't available on this machine).
- Known limitation (by design, documented in the plan): lesson progress tracking is a naive, non-idempotent `progress_percent` increment — the real `progress_tracking` table is deferred.

### Course content — lecture scripts (done, committed, delivered to user)
32 full narration scripts (one per week) across the original 4 spec courses:
- Cyber Security Fundamentals — 12 weeks
- Social Media Management & Content — 8 weeks
- GIS and Drone Mapping — 8 weeks
- Renewable Energy Digital Systems — 8 weeks

All at `training-portal/content/<course-slug>/week-NN.md`.

### Digital Marketing — 5th course (done, committed, delivered to user)
Not in the original spec — designed an 8-week curriculum from scratch (strategy/personas, SEO, content & email, paid ads, analytics, e-commerce & automation, integrated strategy/capstone prep). Seeded into the DB (course + 1 sample module + 2 lessons, matching Phase 1's seeding density) and wrote all 8 lecture scripts at `training-portal/content/digital-marketing/week-NN.md`.

### Phase 2 — Assignments & Quizzes (IN PROGRESS — this is where we are)

Full plan approved and saved at `.claude/plans/agile-squishing-lightning.md`. Key locked decisions (see that file for the complete list): local disk file storage behind a swappable `StorageAdapter` interface, quiz engine built in full but only sample questions seeded, no capstone this phase, late submissions accepted+flagged (not blocked/penalized), resubmission blocked once graded, unlimited quiz retakes (highest score = read-time MAX aggregation, never an overwrite), `short_answer` questions deferred entirely (zero in seed data), 10MB upload limit with a specific MIME allow-list.

**Done so far:**
- ✅ All 7 migrations written and run: `create-assignments`, `create-assignment-submissions`, `create-quizzes`, `create-quiz-questions`, `create-quiz-answers`, `create-quiz-attempts`, `create-quiz-responses`. Verified via `\dt` — all 14 tables exist (7 original + 7 new).
- ✅ **All 7 models done** (`assignment.model.ts`, `assignmentSubmission.model.ts`, `quiz.model.ts`, `quizQuestion.model.ts`, `quizAnswer.model.ts`, `quizAttempt.model.ts`, `quizResponse.model.ts`) and wired into `backend/src/models/index.ts` with all associations. `tsc --noEmit` clean, backend restarts and connects to DB with no errors.

- ✅ **Assignments backend done** (task #18): `StorageAdapter`/`LocalDiskAdapter` (files stored under `backend/uploads/`, gitignored), multer upload middleware (10MB limit, MIME allow-list), full `assignment.service.ts` (submit/resubmit/grade with late-flagging + graded-lock semantics), controller, routes, validators. 8 passing integration tests (`assignment.test.ts`) + a real curl+file smoke test. Also fixed a real bug: the Phase 1 auth rate limiter (20 req/15min) was getting hit by the test suite's own volume once assignment tests were added — now skipped when `NODE_ENV=test` (production unaffected). All 22 backend tests pass.

- ✅ **Quiz backend done** (task #19): `quiz.service.ts` with idempotent attempt-start (refresh-safe), SQL-level `sequelize.random()` question selection + in-app answer shuffling, server-side auto-grading for multiple_choice/true_false with `is_correct` always stripped pre-submission, unlimited retakes with best-score as a read-time `MAX()` (never an overwrite), and the timed-out-but-still-graded policy. 8 passing tests + curl smoke test. All 30 backend tests pass.

**Not started yet (in order, per the plan's §11 sequenced build) — NEXT UP IS #1:**
1. **Seed data** (next task, #20 in tracker): 1 assignment + 1 quiz (3 questions, no short_answer) per already-seeded module across all 5 courses (§8)
2. Frontend: assignment submission UI (`AssignmentDetailPage`, slice, API module)
3. Frontend: quiz taking UI (`QuizTakingPage`, `QuizResultsPage`, timer, retake flow)
4. Frontend: instructor grading UI (`InstructorGradingQueuePage`, `GradeSubmissionPage`, first real use of the existing-but-unused `RoleRoute` component)
5. Wire assignment/quiz links into `CourseDetailPage`'s module list + final full browser walkthrough as both student and instructor

Task list IDs 16-24 in the Claude Code task tracker correspond to these stages: 16-19 are done; 20-24 are pending, in order.

## Session automation (new this session)
- `.claude/settings.json` (project-scoped) now has a **Stop hook** (logs a timestamp to `.claude/last-activity.log` after every turn) and a **PreToolUse hook** (blocks tool calls if Mac battery is below 15% and discharging — fails open if `pmset` is unavailable). Both tested and working. If a low-battery block ever fires unexpectedly or doesn't fire when expected, check `.claude/settings.json` was picked up (may need `/hooks` once since the directory was created mid-session).

---

## Not yet built (deferred, not part of Phase 2)
- Capstone project submission system
- `short_answer` quiz grading (manual instructor review)
- Progress_tracking table (real per-lesson completion, replacing the naive Phase 1 placeholder)
- Instructor/admin dashboards, analytics, email notifications
- Production deployment (S3, staging/prod infra, CI/CD, monitoring)
- Interactive video-checkpoint feature (explicitly deferred by user, tied to quiz question infrastructure once it exists)
- Full quiz question banks (only a handful of sample questions per course are planned — not the spec's full 20-questions-per-week)

## Important environment notes
- Docker Desktop is not installed; Colima is the Docker runtime (`brew services start colima` if it's not running).
- File-watching across the Docker bind mount is sometimes stale after an edit — if a change doesn't seem to take effect, `docker compose restart backend` (or `frontend`) usually fixes it; a `package.json` change requires a full `docker compose build`.
- Test DB is separate (`training_portal_test`) — created manually in Postgres, not part of migrations.
