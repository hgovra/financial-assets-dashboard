# Financial Assets Dashboard — Development Prompt

## Project Context

This repository contains a portfolio project called **Financial Assets Dashboard**.

The goal of this project is to demonstrate strong Frontend engineering skills
with a focus on:
- Clean and explicit architecture
- Thoughtful state management
- Real-world UX and data tradeoffs
- Pragmatic testing strategies
- Recruiter-friendly, defensible decisions

This project intentionally avoids overengineering while still reflecting
production-level patterns and concerns.

The repository itself is the **single source of truth** for the current
implementation and progress.

---

## Tech Stack (Final Decisions)

The following decisions are **intentional and final**:

- **React + Vite + TypeScript**
- **npm** as the package manager
- **React Router** for routing and URL state
- **TanStack Query** for server state management
- **Axios** for API integration
- **Redux Toolkit** used **only for UI state**
  - Filters
  - Pagination
- **shadcn/ui** for UI components
- **CoinGecko API** as the data source
- Environment variables via `.env.local`
- Typed environment variables in `vite-env.d.ts`
- `refetchOnWindowFocus` disabled
- Explicit `staleTime` configuration (e.g. `60_000`)

---

## Architectural Principles

These principles guide all implementation decisions:

- **Server state must never be duplicated in Redux**
- TanStack Query is the single source of truth for fetched data
- Redux Toolkit is reserved exclusively for **UI concerns**
- Pages (e.g. `AssetsPage`) orchestrate data and UI state
- Components are mostly **presentational**
- Derived data is calculated explicitly using `useMemo`
- UI state is deterministic and explainable
- Accessibility is treated as a first-class concern
- No unnecessary abstractions are introduced

---

## Implemented Features (Current State)

### Data Fetching
- `useAssetsQuery` encapsulates all fetching logic
- `assetsApi.ts` contains:
  - CoinGecko API calls
  - A mapper converting API responses into internal `Asset` models

### Table & Data Presentation
- `AssetsTable` and `AssetRow`
- Stable column widths using fixed table layout
- Cryptocurrency logos via CoinGecko image URLs
- Data formatting utilities:
  - `formatCurrency` (price)
  - `formatPercentage` (24h change with sign and color)
  - `formatMarketCap` (compact notation)

### Filters
Implemented filters:
- Search by name or symbol
- Price Change (All / Gainers / Losers)
- Market Cap Category (Large / Mid / Small)

Filters are fully combinable and applied deterministically.

---

## Pagination

- Client-side pagination derived from already fetched data
- Pagination state stored in Redux (UI-only)
- Page resets automatically when filters change
- Guards prevent invalid page states
- Pagination controls are rendered outside the table
- Pagination metadata (“Showing X to Y of Z assets”) is derived UI state

Pagination is treated as **derived UI state**, not server state.

---

## URL State Synchronization

Filters and pagination are synchronized with the URL to support:
- Deep linking
- Refresh persistence
- Shareable dashboard state

### Strategy
- The URL **hydrates Redux once** on initial load
- Redux remains the active source of truth
- The URL is updated as a serialized snapshot of UI state
- Infinite sync loops are explicitly avoided

URL parameters include:
- `search`
- `priceChange`
- `marketCap`
- `page` (and optionally `pageSize`)

---

## Empty, Loading and Error States

### Empty State
- Dedicated empty state component rendered when filters return no results
- Clear, neutral messaging guiding the user to adjust filters or search
- Component is purely presentational

### Loading State
- Skeleton UI displayed while data is being fetched
- Prevents layout shifts and improves perceived performance

### Error State
- Dedicated API error state
- Clear feedback when data fetching fails

These states are handled explicitly and consistently.

---

## Market Cap Classification (Important Design Decision)

The CoinGecko API does not provide native filters for market cap ranges.
Additionally, returned datasets are heavily skewed toward high market cap assets.

For this reason, market cap categories are treated as a **UI-level
classification**, not as strict financial definitions.

Goals:
- Avoid empty filter states
- Improve UX and data exploration
- Keep filtering deterministic and explainable

Example ranges (subject to adjustment):
- **Large Cap**: ≥ $50B
- **Mid Cap**: $5B – $50B
- **Small Cap**: < $5B

This logic is centralized in a utility function to ensure:
- Single source of truth
- Easy adjustment
- Unit testability
- No coupling with data fetching

The API provides raw data only.
All semantic interpretation is handled client-side.

---

## State Derivation Model

The data flow follows a clear derivation chain:

assets (server state)
↓
filteredAssets (derived via useMemo)
↓
paginatedAssets (derived via useMemo)


Each layer reacts only to its true inputs and remains reference-stable across
unrelated renders.

---

## Testing Strategy (Final)

Testing focuses on **high-confidence, low-maintenance coverage**.

### What is Tested
- **Utility functions**
  - Formatting
  - Market cap classification
  - URL state helpers
- **Redux slices (UI state)**
  - Initial state
  - Reducers
  - Reset and hydration logic
- **One integration test**
  - Validates the main user flow:
    data fetching → filters → rendered output

### What Is Explicitly Not Tested
- Visual components (tables, pagination, skeletons)
- TanStack Query internals
- API fetching behavior

### Integration Test Details
- `useAssetsQuery` is mocked with a minimal, casted `UseQueryResult`
- `MemoryRouter` is used to provide routing context without relying on the browser
- Elements are queried using `getByRole` and accessible names
- Inputs include `aria-label` to ensure accessibility and robust testing

This approach balances confidence, clarity, and maintainability.

---

## Guiding Principle

Any change or feature must:
- Respect existing architectural decisions
- Keep responsibilities clearly separated
- Remain easy to explain in a technical interview
- Improve the project as a **portfolio artifact**, not just as a demo

Always consult the existing codebase before proposing changes.