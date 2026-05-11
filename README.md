# GameTracker

A web app for gamers to manage their gaming backlog, track what they're playing, and follow what their friends are up to. Built with a social layer in mind — users can add friends and browse each other's libraries.

This repository is the frontend. The backend is a separate NestJS API.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| State | Redux Toolkit |
| Routing | React Router v7 |
| UI Components | shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Auth | JWT (access + refresh tokens, auto-refresh) |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/              # Store, routing, providers, app initialization
├── features/         # Domain modules: auth, games, user, friends, settings
├── pages/            # Route-level page containers
└── shared/           # API client, token management, shared UI and hooks
```

Each feature module follows the same structure: `api/` → `state/` → `hooks/` → `model/` → `ui/`.

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` file with:

```
VITE_API_URL=
```

## Available Scripts

```bash
npm run dev       # Development server
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
npm run test      # Run tests
```

## Testing

Unit, UI, service, and integration tests use **Vitest** + **Testing Library**. E2E tests use **Playwright** and live in `e2e/`.

## Features

- **Backlog management** — add, organize, and track games across platforms
- **Game search** — look up games by title to add to your library
- **Friends** — send and manage friend requests, browse friends' game libraries, and copy games into your own library
- **Dark / light theme** — persisted across sessions
- **Authentication** — JWT-based with automatic token refresh

[![React Doctor](https://www.react.doctor/share/badge?p=gamer-dashboard&s=82&e=6&w=90&f=48)](https://www.react.doctor/share?p=gamer-dashboard&s=82&e=6&w=90&f=48)
