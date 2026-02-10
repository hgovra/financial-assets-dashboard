# Financial Assets Dashboard

**Live demo:** https://financial-assets-dashboard.netlify.app/

A portfolio-focused frontend project built to demonstrate **clean
architecture**, **pragmatic state management**, and **real-world UI
trade-offs** using a modern React stack.

The project is functionally complete and intentionally scoped.\
The focus is not feature volume, but **clarity, maintainability, and
defensible architectural decisions**.

------------------------------------------------------------------------

## Project Objectives

This project aims to demonstrate:

-   Clean and readable frontend architecture
-   Clear separation between server state and UI state
-   Pragmatic use of modern React tooling
-   Thoughtful handling of real-world data limitations
-   Maintainable patterns suitable for production environments
-   Engineering decisions made with long-term code health in mind

This is not a showcase of animations or visual effects, but of
**engineering judgment**.

------------------------------------------------------------------------

## Tech Stack

-   **React + TypeScript + Vite**
-   **React Router** (including URL-synchronized UI state)
-   **TanStack Query** for server state
-   **Redux Toolkit** (UI state only: filters, pagination)
-   **Axios** for API integration
-   **Tailwind CSS + shadcn/ui**
-   **CoinGecko API** as the data source

------------------------------------------------------------------------

## Architectural Overview

### Server State

-   All remote data is managed exclusively by **TanStack Query**
-   No server data is duplicated in Redux
-   Caching, loading, and error states are handled declaratively

### UI State

-   **Redux Toolkit** is used only for UI concerns:
    -   filters
    -   pagination
-   Redux does not store or transform server data

### Pages vs Components

-   Pages (e.g. `AssetsPage`) act as orchestration layers
-   They coordinate:
    -   server state
    -   UI state
    -   URL synchronization
    -   derived data
-   Most components are presentational and stateless

### Derived Data

-   Filtering and pagination are treated as **UI-level derivations**
-   Derived data is memoized using `useMemo`
-   No financial or business rules are embedded in components

------------------------------------------------------------------------

## URL State Synchronization

Filters and pagination are synchronized with the URL to support:

-   refresh persistence
-   shareable links
-   predictable navigation behavior

The URL is treated as an external persistence layer: - it hydrates Redux
state on initial load - Redux becomes the source of truth afterward

------------------------------------------------------------------------

## Market Cap Classification

Market cap categories are handled as **UI-level classifications**, not
strict financial definitions.

This is intentional, as the CoinGecko API does not provide reliable
categorical filtering.

Example thresholds: - Large Cap: ≥ \$50B - Mid Cap: ≥ \$5B and \<
\$50B - Small Cap: \< \$5B

This logic is centralized and unit tested.

------------------------------------------------------------------------

## Testing Strategy

The testing approach prioritizes **confidence with minimal maintenance
cost**:

-   Unit tests for:
    -   utilities (formatters, filters, URL helpers)
    -   Redux slices (UI state)
-   One integration test covering the main user flow: data fetch →
    filters → rendered output
-   No visual snapshot tests
-   No testing of TanStack Query internals

------------------------------------------------------------------------

## Running Locally

This project consumes data from the **CoinGecko API**.\
To avoid committing API-related configuration, the API base URL is
provided via environment variables.

### Prerequisites

-   Node.js (LTS recommended)
-   npm

### Setup

1.  Clone the repository:

``` bash
git clone https://github.com/hgovra/financial-assets-dashboard.git
cd financial-assets-dashboard
```

2.  Install dependencies:

``` bash
npm install
```

3.  Create a `.env` file at the project root.

A `.env.example` file is provided as a reference.

``` env
VITE_COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
```

> The project uses Vite, so all public environment variables must be
> prefixed with `VITE_`.

4.  Start the development server:

``` bash
npm run dev
```

The application will be available at:

    http://localhost:5173

### Notes

-   No API key is required for the public CoinGecko endpoints used
-   Environment variables are intentionally excluded from version
    control
-   The application fails fast if required configuration is missing

------------------------------------------------------------------------

## Intentional Non-Goals

To keep the project focused and maintainable, the following were
intentionally excluded:

-   Backend or persistence layer
-   WebSockets or real-time updates
-   Visual regression tests
-   Over-abstraction via custom hooks
-   Domain-heavy financial modeling

------------------------------------------------------------------------

## Use of AI Assistance

This project was developed with the support of AI-assisted tooling
(ChatGPT) used as a **review and reasoning partner**.

AI assistance was leveraged for: - architectural discussions and
trade-off analysis - refactoring suggestions focused on readability and
maintainability - documentation clarity and wording

All design decisions, implementation choices, and final code were
**reviewed, validated, and curated manually**.

------------------------------------------------------------------------

## Why This Project Exists

This project exists to show how I approach frontend engineering in
real-world scenarios: balancing correctness, simplicity, UX, and
long-term maintainability.

It is designed to be **read, reasoned about, and discussed** --- not
just run.
