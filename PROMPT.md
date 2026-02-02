# Financial Assets Dashboard — Development Prompt

## Project Context

This repository contains a portfolio project called **Financial Assets Dashboard**.

The goal of this project is to demonstrate strong Frontend engineering skills,
with an emphasis on:
- Clean and explicit architecture
- Thoughtful state management
- Real-world tradeoffs
- Recruiter-friendly best practices

This project is intentionally scoped to avoid overengineering while still
reflecting production-level decision making.

The repository itself is the **single source of truth** for the current
implementation and progress.

---

## Tech Stack & Final Decisions

The following decisions are **intentional and final** and should be respected
in any future development:

- **React + Vite + TypeScript**
- **npm** as the package manager (always)
- **React Router** for routing
- **TanStack Query** for server state management
- **Axios** for API integration
- **Redux Toolkit** used **only for UI state**
  - Filters
  - Pagination
- **shadcn/ui** for UI components
- **CoinGecko API** as the data source
- Environment variables via `.env.
