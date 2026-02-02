# Financial Assets Dashboard — Development Prompt

## Project Context

This repository contains a portfolio project called **Financial Assets Dashboard**.

The goal of this project is to demonstrate strong Frontend engineering skills with a clear focus on:
- Clean architecture
- Thoughtful state management
- Real-world tradeoffs
- Recruiter-friendly best practices

This project is intentionally scoped to avoid overengineering while still reflecting production-level decision making.

The repository itself is the **single source of truth** for the current implementation and progress.

---

## Tech Stack & Decisions (Already Made)

The following decisions are **final** and should be respected in any future development:

- **React + Vite + TypeScript**
- **npm** as the package manager (always)
- **React Router** for routing
- **TanStack Query** for server state
- **Axios** for API integration
- **Redux Toolkit** used **only for UI state**
  - Filters
  - Pagination
- **shadcn/ui** for UI components
- **CoinGecko API** as the data source
- Environment variables via `.env.local`
- Typed environment variables in `vite-env.d.ts`
- `refetchOnWindowFocus` disabled
- `staleTime` explicitly configured (e.g. `60_000`)

### Important Architectural Constraints

- **Server state must NOT be duplicated in Redux**
- Redux is reserved exclusively for **UI concerns**
- TanStack Query is the single source of truth for fetched data
- Components should be mostly **presentational**
- Pages (e.g. `AssetsPage`) are responsible for orchestration
- Overengineering has been consciously avoided

---

## Implemented Features

### Data & Fetching
- `useAssetsQuery` encapsulates all fetching logic
- `assetsApi.ts` contains:
  - API calls
  - A mapper converting CoinGecko responses into internal `Asset` models

### UI
- `AssetsTable` and `AssetRow`
- Correctly formatted columns:
  - **Price** → `formatCurrency`
  - **24h Change** → `formatPercentage` with color and sign
  - **Market Cap** → `formatMarketCap` using compact notation
- Cryptocurrency logos using CoinGecko image URLs

### State Management
- Redux Toolkit configured with a dedicated **filters slice**
- `FiltersBar` implemented as a presentational component
- Current filters:
  - Search
  - Price Change (All / Gainers / Losers)
  - Market Cap Category (Large / Mid / Small)
- Filtered assets list derived in `AssetsPage` using `useMemo`

---

## Current Architecture Summary

- TanStack Query handles **server state**
- Redux Toolkit handles **UI state only**
- `AssetsPage` orchestrates:
  - Data fetching
  - Filter application
  - Derived state
- Components remain mostly dumb/presentational
- No unnecessary abstractions were introduced

---

## Next Steps (Non-Exhaustive)

Future development may include, but is not limited to:

- Client-side pagination
- Persisting filters and pagination in the URL
- UX improvements for filters and table
- Unit tests (reducers and utility functions)
- Small visual refinements
- Final project review and polish for portfolio presentation

---

## Guiding Principle

Any proposed change or feature must:
- Respect existing architectural decisions
- Maintain clarity and simplicity
- Be defensible in a technical interview
- Improve the project as a **portfolio artifact**, not just as a demo

Always consult the existing codebase before suggesting changes.
