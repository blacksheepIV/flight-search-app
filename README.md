# ✈️ Flight Search App

A modern web application for searching and viewing flights—developed as a technical assignment. Inspired by platforms like **Booking.com** and **Alibaba Travel**, users can search flights, view detailed results, and filter/sort based on various criteria.

---

## 📌 Project Goals

- Search flights between two airports (IATA codes).
- View available flight options with airline, schedule, pricing, and images.
- Filter and sort results by price, duration, or departure time.
- Authenticate users with login/logout flow (NextAuth).
- Persist session data and bookmarked searches (Drizzle ORM + PostgreSQL).
- Ensure a clean, modular architecture and handle edge cases.

---

## ⚙️ Tech Stack & Services

| Area               | Stack / Service                                              |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js (SSR where applicable)                               |
| Styling            | Tailwind CSS (custom theme configured)                       |
| Database           | PostgreSQL (Supabase) + Drizzle ORM                          |
| Authentication     | NextAuth.js                                                  |
| Flight API         | Amadeus Flight API                                           |
| Airport Logos      | `https://airhex.com/api/logos/`                              |
| Forms & Validation | React Hook Form                                              |
| State Management   | React Query                                                  |
| Date Utilities     | date-fns                                                     |
| Charting & UI      | (Optional dependencies as needed)                            |
| Testing            | **Planned:** Jest, React Testing Library, Cypress/Playwright |
| Deployment         | **Planned:** Docker (with provided `Dockerfile`)             |

---

## 🧩 Features

### Search & Results

- **Search Form**: Origin & destination IATA codes, departure date, optional return date, passenger count.

  - Validation prevents past-date searches.

- **Results Page**: Displays airline name & logo, departure/arrival times, duration, price, and airport images.
- **Filters & Sorting**: Price range slider, departure time window; sort by price, duration, departure time.

### Authentication & Persistence

- **NextAuth.js** flow for sign-up/login/logout.
- Drizzle ORM + PostgreSQL for session storage, saved searches, bookmarked flights.

### API and Data Handling

- **APIs** located in `src/apis/`: server-side endpoints proxying Amadeus API, keeping keys secure.
- **Database logic** in `src/db/`: Drizzle schema, migrations, and queries.
- **API types**: Request/response TypeScript types placed alongside route handlers.

### Architecture & Utilities

- **Components**: Shared UI components in `src/components/`.
- **Features**: Domain features under `src/features/`, each with its own components and context provider.
- **Context Providers**: Global state in `src/contexts/`.
- **Utilities**: Pure functions (e.g., sorting) in `src/lib/`.
- **Types**: Common TypeScript definitions in `src/types/`.

---

## 📂 Folder Structure

```
flight-search-app/
├── public/                  # Static assets & root HTML
├── src/
│   ├── apis/                # Next.js API routes proxying Amadeus
│   ├── db/                  # Drizzle ORM schemas & database utils
│   ├── components/          # Common UI components
│   ├── contexts/            # React context providers
│   ├── features/            # Domain feature modules (with components & contexts)
│   ├── lib/                 # Utility functions (sorting, formatting)
│   ├── types/               # Shared TypeScript types
│   ├
│   ├── layout.tsx           # main page layout
│   └── pages/               # Next.js pages (including index.tsx)
├── .gitignore
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS custom theme
├── drizzle.config.ts        # Drizzle ORM config
├
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- yarn (or pnpm/npm)
- Docker (optional)

### Local Setup

```bash
yarn
yarn dev
```

## 🧪 Testing & Next Steps

- **Tests**: Integration tests for fetching IATA codes and flight data are pending.
- Add unit tests (Jest + React Testing Library) for API clients and components.
- Implement end-to-end tests (Cypress/Playwright) for search workflow.

---

## 📜 License

MIT
