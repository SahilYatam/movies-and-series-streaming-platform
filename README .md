# Live Project
[Movie-Tv-Streaming-Website](https://movies-and-series-streaming-platfor-six.vercel.app/)

# Sora

Sora is a full-stack movie and TV series streaming platform built with **Next.js, TypeScript, Express, Prisma, PostgreSQL, Redux Toolkit, and Better Auth**.

It supports movie/TV discovery, search, authentication, watchlists, watch history, episode navigation, playback progress tracking, and Redis caching.

## Features

- Browse trending, popular, and top-rated movies and TV series
- Search movies and TV series
- Movie and TV series details
- TV seasons and episode navigation
- User authentication with Better Auth
- Watchlist with `Planning`, `Watching`, and `Completed` statuses
- Watch history with playback progress
- Resume playback support
- Redis caching for home-page data
- Responsive UI
- Dockerized backend

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- RTK Query

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Better Auth
- Upstash Redis

### External Services

- TMDB — movie and TV metadata
- Vidking — video player
- Neon — PostgreSQL hosting
- Upstash — Redis
- Vercel — frontend deployment
- Render — backend deployment

## Architecture

```text
Next.js Frontend
       │
       ▼
   REST API
       │
       ▼
Express Backend
       │
   ┌───┼───────────────┐
   ▼   ▼               ▼
Prisma TMDB        Upstash Redis
   │
   ▼
PostgreSQL
```

The backend follows a simple:

```text
Routes → Controllers → Services → Repositories → Prisma
```

architecture.

## Project Structure

```text
movie-streaming-platform/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── home/
│   │   │   ├── title/
│   │   │   ├── tmdb/
│   │   │   ├── watchlist/
│   │   │   └── watchHistory/
│   │   ├── shared/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── watch/
│   │   ├── watchlist/
│   │   ├── history/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── betterAuth/
│   │   ├── services/
│   │   └── videoPlayer/
│   ├── store/
│   │   └── store.ts
│   └── package.json
│
└── README.md
```

### Important folders

**Backend**

- `src/modules/home` — homepage and search logic
- `src/modules/title` — movie/TV title details
- `src/modules/tmdb` — TMDB API integration
- `src/modules/watchlist` — watchlist APIs and logic
- `src/modules/watchHistory` — watch history and playback progress
- `src/lib` — Better Auth, Redis, and shared integrations
- `prisma/schema.prisma` — database models

**Frontend**

- `app/` — Next.js routes/pages
- `components/` — reusable UI components
- `lib/services/` — RTK Query API slices
- `lib/betterAuth/` — authentication client
- `lib/videoPlayer/` — Vidking player utilities
- `store/` — Redux store configuration

## Database

The main application models are:

```text
Title
 ├── Season
 │    └── Episode
 │
 ├── Watchlist
 │
 └── WatchHistory
```

`Title` is shared by both movies and TV series.

`WatchHistory` stores the user's playback position and duration. For TV series, it can also reference the exact episode.

## API

Base API:

```text
/api/v1
```

Main endpoints:

```text
GET    /api/v1/home
GET    /api/v1/home/search?q=...
GET    /api/v1/title/:titleId

GET    /api/v1/watchlist
PUT    /api/v1/watchlist/:titleId
DELETE /api/v1/watchlist/:titleId

GET    /api/v1/watchHistory/all
GET    /api/v1/watchHistory/:titleId
PUT    /api/v1/watchHistory/:titleId
DELETE /api/v1/watchHistory
```

Authentication routes are handled by Better Auth under:

```text
/api/auth/*
```

## Local Setup

### 1. Clone

```bash
git clone <repository-url>
cd movie-streaming-platform
```

### 2. Backend

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Configure your PostgreSQL, TMDB, Better Auth, and Redis variables.

Then run the Prisma commands required by your database setup and start the backend using the script in `package.json`.

Backend:

```text
http://localhost:8015
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL="http://localhost:8015/api/v1"
NEXT_PUBLIC_AUTH_API_URL="http://localhost:8015"
```

Start the Next.js application.

Frontend:

```text
http://localhost:3000
```

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL="https://your-backend-url/api/v1"
NEXT_PUBLIC_AUTH_API_URL="https://your-backend-url"
```

### Backend

Use your actual values for:

```env
NODE_ENV=production

DATABASE_URL="your-postgresql-url"

TMDB_API_KEY="your-tmdb-api-key"

BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="https://your-backend-url"
CLIENT_URL="https://your-frontend-url"

UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
```

Never commit real secrets to Git.

## Docker

Build the backend:

```bash
docker build -t sora-backend ./backend
```

Run it:

```bash
docker run --name sora-backend \
  -p 8015:8015 \
  --env-file ./backend/.env \
  sora-backend
```

## Deployment

Current deployment setup:

```text
Frontend → Vercel
Backend  → Render
Database → Neon PostgreSQL
Redis    → Upstash Redis
```

The frontend uses the deployed backend URL through `NEXT_PUBLIC_API_URL`.

The backend uses the Neon `DATABASE_URL` and Upstash Redis credentials.

## Search Flow

```text
User searches
     ↓
Frontend RTK Query
     ↓
/home/search
     ↓
Database search + TMDB search
     ↓
Normalize/save TMDB results
     ↓
Remove duplicates
     ↓
Return results
```

## Watch History Flow

Vidking sends playback events to the frontend using `window.postMessage`.

Sora saves playback position and duration to the backend:

```text
Vidking
  ↓
PLAYER_EVENT
  ↓
VideoPlayer
  ↓
RTK Query
  ↓
WatchHistory API
  ↓
PostgreSQL
```

## Notes

This project uses TMDB for metadata and a third-party video player for playback. Review the terms and licensing requirements of external services before using the project commercially.
