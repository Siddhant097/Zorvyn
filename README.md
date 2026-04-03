# Finance Dashboard

A professional-grade personal finance dashboard built with React + TypeScript, featuring role-based access, chart-driven analytics, persistent state, and responsive transaction management.

## Tech Stack

- React + Vite + TypeScript (strict mode)
- Tailwind CSS
- Zustand + persist middleware (LocalStorage persistence)
- Recharts for data visualization
- Lucide React for icons

## Features

- Dashboard overview with:
  - Total Balance
  - Total Income
  - Total Expenses
  - Area chart for running balance trend
  - Pie chart for expense breakdown by category
- Transaction management:
  - Add, edit, delete (Admin only)
  - Search by description
  - Category filtering
  - Desktop table + mobile card layout
- RBAC simulation:
  - Admin: full CRUD
  - Viewer: read-only UI (no mutating actions)
- Insights section:
  - Highest spending category this month
  - Food spending delta vs last month
- UX polish:
  - Dark mode toggle
  - Empty state messaging
  - Form validation (Save disabled until valid)
  - CSV export of filtered transactions
  - Loading spinner simulation
- Persistence:
  - Transactions, role, and filters survive page refresh via Zustand `persist`

## Project Structure

```plaintext
src/
  ├── components/
  ├── features/
  │    ├── dashboard/
  │    ├── transactions/
  │    └── insights/
  ├── store/
  ├── types/
  └── utils/
```

## Setup

1. Install dependencies:
   - `npm install`
2. Run dev server:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Preview production build:
   - `npm run preview`

## Screenshots

Add screenshots before submission:

- `Dashboard-Desktop.png`
- `Dashboard-Mobile.png`
- `Role-Viewer-Mode.png`
- `Dark-Mode.png`

## Technical Decisions and Trade-offs

I chose Zustand for minimal boilerplate and fast state updates while keeping state logic easy to reason about. The `persist` middleware simulates backend persistence by storing role, filters, and transactions in LocalStorage.

TypeScript strict mode was enabled to improve data integrity and catch edge cases during chart aggregation, form handling, and filtering logic.

For responsive UX, transactions are rendered as a table on desktop and as cards on mobile. This preserves readability and touch usability on smaller devices.

RBAC is modeled globally in state. UI-level enforcement ensures Viewer mode cannot trigger mutating actions, providing a clean simulation of permission boundaries.

Additional polish includes dark mode, empty states, loading feedback, and CSV export for practical utility beyond core assignment requirements.

## Final Review Checklist

- [ ] Works at 375px mobile width
- [ ] Admin/Viewer toggle hides mutating actions correctly
- [ ] Data persists after refresh
- [ ] Clear no-data / no-results states
- [ ] README includes setup and screenshots
