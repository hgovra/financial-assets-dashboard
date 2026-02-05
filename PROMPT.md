# Financial Assets Dashboard — Development Prompt

## Project Context

This repository contains a portfolio project called **Financial Assets Dashboard**.

The goal of this project is to demonstrate strong Frontend engineering skills with
a focus on:

- Clear architectural boundaries
- Thoughtful state management
- Real-world data and UX trade-offs
- Pragmatic, defensible testing strategies
- Maintainable code and intentional refactoring

The project is intentionally scoped to avoid overengineering while still
reflecting production-grade patterns.

The repository itself is the **single source of truth** for the current state of
the implementation.

---

## Tech Stack (Final Decisions)

All choices below are **intentional and stable**:

- **React + Vite + TypeScript**
- **npm** as the package manager
- **React Router** for routing and URL state
- **TanStack Query** for server state
- **Axios** for API integration
- **Redux Toolkit** for UI state only
  - filters
  - pagination
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **CoinGecko API** as the data source

### Tooling & Config
- Environment variables via `.env.local`
- Typed environment variables in `vite-env.d.ts`
- `refetchOnWindowFocus` disabled
- Explicit `staleTime` configuration
- ESLint configured to:
  - enforce exhaustive deps by default
  - allow underscore-prefixed unused variables

---

## Folder Structure & Responsibilities

The project is organized by **feature boundaries**, not technical layers.

```txt
src/
├─ app/
│   ├─ store.ts
│   ├─ router.tsx
│   ├─ queryClient.ts
│   └─ hooks.ts
│
├─ components/
│   ├─ layout/
│   │   ├─ AppLayout.tsx
│   │   └─ Header.tsx
│   └─ ui/
│
├─ features/
│   └─ assets/
│       ├─ pages/
│       │   └─ AssetsPage.tsx
│       ├─ components/
│       ├─ hooks/
│       ├─ slices/
│       ├─ utils/
│       └─ types/
│
├─ lib/
│   └─ shadcn/
│       └─ utils.ts
│
├─ utils/
│   ├─ formatCurrency.ts
│   ├─ formatPercentage.ts
│   ├─ formatMarketCap.ts
│   └─ urlState.ts
│
├─ index.css
├─ main.tsx
└─ vite-env.d.ts
```

---

## Architectural Principles

- Server state lives **only** in TanStack Query
- Redux Toolkit is used **only for UI state**
- No server data is duplicated in Redux
- Pages orchestrate data and state
- Components are mostly presentational
- Derived state is computed with `useMemo`
- Accessibility is treated as a first-class concern
- Refactors must not change behavior

---

## useEffect Policy

- Bootstrap effects may intentionally disable exhaustive-deps
- Reactive effects must list all dependencies
- Guards must be explicit and defensive
- Only one eslint-disable is allowed by design

---

## ESLint Policy for Unused Variables

- Public APIs may include unused options
- Unused variables are prefixed with `_`
- ESLint is configured to ignore underscore-prefixed variables

---

## Testing Strategy

- Unit tests for utilities
- Unit tests for Redux UI state
- One integration test covering the main flow
- No visual or styling tests

---

## Guiding Principle

Every change must be intentional, explainable, and improve clarity
without changing behavior.
