# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

No test framework is configured.

## Architecture Overview

This is a React 19 + TypeScript + Vite frontend for a game tracker dashboard. The app uses Redux Toolkit for state, React Router v7 for routing, Tailwind CSS v4 for styling, and a custom `apiClient` with automatic token refresh.

### Directory Layout

```
src/
├── app/
│   ├── providers/      # Redux, toast, skeleton theme wrappers
│   ├── routes/         # Router setup, PrivateRoute, PublicRoute, route constants
│   └── store/          # Redux store (auth, user, games slices)
├── features/           # Domain modules (see Feature Module Pattern below)
├── pages/              # Route-level page containers
└── shared/
    ├── api/            # apiClient, TokenProvider, ApiError
    ├── ui/             # Shared components (Atoms, Organisms, shadcn wrappers)
    └── hooks/          # Cross-feature hooks
```

### Path Aliases

```
@app/*      → src/app/*
@features/* → src/features/*
@shared/*   → src/shared/*
@routes/*   → src/app/routes/*
@assets/*   → src/assets/*
@pages/*    → src/pages/*
```

### Feature Module Pattern

Each feature under `src/features/` is self-contained:

```
feature/
├── api/     # Singleton service class
├── state/   # Redux slice (createSlice)
├── hooks/   # Custom hooks encapsulating logic + dispatch
├── model/   # TypeScript interfaces
└── ui/      # Feature components
```

API calls are made inside hooks (not thunks). Services follow the singleton pattern (`getInstance()`).

### API Layer

`src/shared/api/apiClient.ts` is a fetch wrapper that:
- Injects the access token from `TokenProvider` (localStorage)
- On 401: exchanges refresh token for new tokens, deduplicates concurrent refresh attempts, retries the original request
- On refresh failure: clears tokens and redirects to `/signup`

`TokenProvider` manages `"authToken"` and `"refreshToken"` keys in localStorage.

### Auth Flow

1. `AppInitializer.ts` runs on mount: restores theme from localStorage, fetches `/me` if a token is present, dispatches `setUser`
2. `PrivateRoute` checks `useAuth().isAuthenticated` (token presence), redirects to `/signup` if absent
3. `PublicRoute` redirects authenticated users to `/dashboard`

### State (Redux)

Three slices: `auth` (tokens), `user` (current user), `games` (games list). All slices are minimal — reducers expose simple set/clear actions; async logic lives in hooks.

### UI Components

- **Atoms** — primitive components (Button, Avatar, ErrorMessage)
- **Organisms** — composed components
- **shadcn wrappers** in `shared/ui/chadcn/` built on Radix UI
- Styling: Tailwind v4 + `clsx` + `tailwind-merge` + `class-variance-authority`
- Animations: Framer Motion (`motion` package)

### Environment

`VITE_API_URL` sets the API base URL. Deployment target is Vercel (`vercel.json` present).
