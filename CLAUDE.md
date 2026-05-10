# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + production build
npm run lint       # ESLint check
npm run preview    # Preview production build
npm run test       # Run Vitest (unit + UI + service + integration)
```

## Testing

Stack: **Vitest** + **Testing Library** for unit/UI/service/integration tests; **Playwright** for E2E.

Shared test infrastructure lives in `src/test/`:
- `setup.ts` — global setup (jest-dom matchers)
- `test-utils.tsx` — custom `render` that wraps with all app `Providers`
- `factories/` — typed factory functions for test data (e.g. `gameFactory`)

### Test types and file placement

| Type | What it covers | Where the file lives |
|---|---|---|
| Unit | Pure functions, utilities, helpers | Co-located with the module (`foo.test.ts`) |
| UI | Component rendering, interactions | Co-located with the component (`Foo.test.tsx`) |
| Service | API service class methods | Co-located in the feature's `api/` folder |
| Integration | Hook + slice + service wired together | Co-located in the feature folder (`games.integration.test.ts`) |
| E2E | Full user flows against the live app | `e2e/` at repo root (Playwright) |

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

Services follow the singleton pattern (`getInstance()`). API calls are made in thunks for shared state, or directly in hooks for local state (see State section).

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

Three slices: `auth` (tokens), `user` (current user), `games` (games list). Slices expose async thunks (via `createAsyncThunk`) for operations that update shared state; hooks dispatch these thunks.

**When to use a thunk vs. a direct service call:**
- **Thunk in slice** — the result is shared across multiple components, persists across navigation, or other parts of the app depend on it (e.g. fetching the games list, logging in to set auth tokens).
- **Direct service call in hook** — the operation is self-contained: a single component owns the state, it's a form submission with no shared side effects, or the result doesn't need to live in the store (e.g. changing a password, registering a new user).

### UI Components

- **Atoms** — primitive components (Button, Avatar, ErrorMessage)
- **Organisms** — composed components
- **shadcn wrappers** in `shared/ui/chadcn/` built on Radix UI
- Styling: Tailwind v4 + `clsx` + `tailwind-merge` + `class-variance-authority`
- Animations: Framer Motion (`motion` package)

### Error Handling

In catch blocks inside hooks, always use `getErrorMessage(e)` from `@shared/lib/error-messages` — never `e.message` directly.

### Environment

`VITE_API_URL` sets the API base URL. Deployment target is Vercel (`vercel.json` present).
