# Production image only. Local dev keeps using backend/Dockerfile + frontend/Dockerfile
# via docker-compose.yml, unchanged.

FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Frontend and API are served from the same origin in production (see backend/src/app.ts),
# so this is a fixed relative path, not an environment-specific URL baked in at build time.
ENV VITE_API_BASE_URL=/api
RUN npm run build

FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app/backend
# The whole backend-build output is copied (not just dist/), because .sequelizerc loads
# migrations via ts-node/register at runtime rather than from compiled dist/migrations,
# so src/, tsconfig.json, and the full node_modules (including devDependencies) are all
# needed at runtime, not just build time.
COPY --from=backend-build /app/backend ./
COPY --from=frontend-build /app/frontend/dist ./public
EXPOSE 4000
CMD ["sh", "-c", "npm run migrate && npm start"]
