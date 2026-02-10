# PROMPT.md --- Financial Assets Dashboard

This document is intended to provide **full project context** for
continuing development or review of the **Financial Assets Dashboard**
in a new chat or environment.

It describes the current state of the project, architectural decisions,
and constraints.\
The GitHub repository is the **single source of truth** for the
codebase.

Repository: https://github.com/hgovra/financial-assets-dashboard

------------------------------------------------------------------------

## Project Status

-   ✅ Functionally complete
-   ✅ Live demo deployed
-   ✅ Architecture stabilized
-   ✅ Testing strategy finalized

**Current phase:** refinement, polish, and documentation\
No new features are planned.

Live Demo: https://financial-assets-dashboard.netlify.app/

------------------------------------------------------------------------

## Project Purpose

This is a **portfolio-focused frontend project** designed to
demonstrate:

-   Clean, readable architecture
-   Clear separation of concerns
-   Pragmatic state management
-   Real-world UX and data trade-offs
-   Maintainable patterns suitable for production

The project prioritizes **engineering judgment and clarity** over
feature volume.

------------------------------------------------------------------------

## Tech Stack (Final)

-   React + TypeScript + Vite
-   npm (always)
-   React Router (including URL-synchronized UI state)
-   TanStack Query for server state
-   Redux Toolkit **only for UI state**
    -   filters
    -   pagination
-   Axios for API integration
-   Tailwind CSS + shadcn/ui
-   CoinGecko API as the data source

------------------------------------------------------------------------

## Core Architectural Principles

These rules are intentional and must be preserved:

-   Server state lives **only** in TanStack Query
-   Redux **never** duplicates server data
-   Redux stores **UI state only**
-   Pages orchestrate data and state
-   Components are mostly presentational
-   Derived data uses `useMemo`
-   `useEffect` is used for coordination, not derivation
-   Accessibility is treated as a first-class concern
-   Overengineering is intentionally avoided
-   Refactors must **not** change behavior

------------------------------------------------------------------------

## Folder Structure (Current Direction)

    src/
     ├─ app/                    # app bootstrap (store, router, providers)
     ├─ components/
     │   ├─ layout/             # global layout components
     │   └─ ui/                 # shadcn/ui components
     ├─ features/
     │   └─ assets/             # feature-oriented domain
     │       ├─ pages/
     │       ├─ components/
     │       ├─ hooks/
     │       ├─ slices/
     │       ├─ utils/
     │       └─ types.ts
     ├─ lib/                    # third-party helpers (e.g. shadcn utils)
     ├─ utils/                  # global, domain-agnostic utilities
     └─ index.css               # Tailwind entry point

------------------------------------------------------------------------

## AssetsPage Responsibilities

`AssetsPage` acts as an **orchestration layer**.

It is responsible for:

-   Coordinating server state (TanStack Query) and UI state (Redux)
-   Synchronizing Redux state with the URL
-   Deriving filtered and paginated asset lists
-   Applying defensive guards (e.g. invalid page index)

It does **not**: - contain API logic - define reusable domain rules -
perform side-effect-free derivations in effects

------------------------------------------------------------------------

## useEffect Policy

-   `useEffect` is used for **coordination**, not derivation
-   Bootstrap effects (URL → Redux hydration) may intentionally disable
    `react-hooks/exhaustive-deps` with explicit comments
-   Reactive effects must list all dependencies, including `dispatch`
-   Only **one** exhaustive-deps disable exists by design

------------------------------------------------------------------------

## ESLint Policy

-   ESLint is configured to ignore unused variables prefixed with `_`
-   This supports future-proofed public APIs
-   Local `eslint-disable` comments are avoided unless strictly
    necessary

------------------------------------------------------------------------

## URL State Synchronization

-   Filters and pagination are synchronized with the URL
-   The URL is treated as an **external persistence layer**
-   On initial load:
    -   URL → Redux hydration
-   After hydration:
    -   Redux becomes the source of truth

Bidirectional infinite loops are intentionally avoided.

------------------------------------------------------------------------

## Market Cap Classification

Market cap categories are treated as **UI-level classifications**, not
strict financial definitions.

This is intentional due to limitations of the CoinGecko API.

Current thresholds: - Large Cap: ≥ \$50B - Mid Cap: ≥ \$5B and \<
\$50B - Small Cap: \< \$5B

This logic is centralized and unit tested.

------------------------------------------------------------------------

## Testing Strategy (Final)

Testing prioritizes **confidence with minimal maintenance cost**:

-   Unit tests for:
    -   utilities (formatting, filtering, URL helpers)
    -   Redux slices (UI state)
-   One integration test covering the main user flow: data fetch →
    filters → rendered output
-   No visual snapshot tests
-   No testing of TanStack Query internals

------------------------------------------------------------------------

## Environment Variables

The CoinGecko API base URL is provided via environment variables.

-   `.env` files are ignored
-   `.env.example` is committed as documentation

Required variable:

    VITE_COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3

------------------------------------------------------------------------

## Intentional Non-Goals

The following are explicitly out of scope:

-   Backend services or persistence
-   Real-time updates (WebSockets, polling beyond React Query defaults)
-   Financial domain modeling beyond UI classification
-   Over-abstraction via custom hooks
-   Large-scale design system work

------------------------------------------------------------------------

## Use of AI Assistance

AI-assisted tooling (ChatGPT) was used as a **review and reasoning
partner**.

It supported: - architectural discussions - refactoring for clarity and
maintainability - documentation wording and structure

All final decisions and code were **manually reviewed and curated**.

------------------------------------------------------------------------

## How to Use This Prompt

When continuing work in a new chat:

-   Assume the repository is the source of truth
-   Do not propose new features
-   Do not change behavior
-   Prioritize clarity, justification, and maintainability
-   Prefer small, defensible refactors
-   Respect all architectural constraints listed above
