# Go Business Referral Dashboard

A modern, fully responsive, production-ready SaaS Referral Dashboard application built with React, Vite, Tailwind CSS v4, and Axios.

---

## Features

- **Authentication System**:
  - Secure login integrated with AWS Cognito/API gateway endpoints.
  - JWT token stored securely using `js-cookie` (stored as `jwt_token`).
  - Seamless route protection (preventing unauthenticated users from visiting `/` and `/referral/:id`).
  - Automatic redirect for signed-in users trying to access `/login`.

- **Responsive SaaS Dashboard Layout**:
  - Floating responsive glassmorphic navbar with logout functionality.
  - Footer with About/Privacy links and copyright notice.
  - Responsive grids for metrics overview cards with modern micro-animations on hover.

- **Service Summary**:
  - Dynamic service cards displaying active referral metrics, total earnings, and counts.
  - Normalizes multiple response structures (supporting flat and nested layouts).

- **Share Referral System**:
  - Read-only referral link and referral code display.
  - Double copy buttons powered by the native Web Clipboard API.
  - Interactive toast notifications with fade animations on copy success.

- **Referral Table**:
  - Interactive table displaying name, service, date, and profit.
  - Client-side pagination (10 entries per page) with disabled controls on bounds and dynamic footer info.
  - Sorting of entries by Date (Newest First / Oldest First) sending API queries.
  - Debounced search filtration by referral name or service.
  - Clickable row navigation linking to `/referral/:id`.

- **Referral Details**:
  - Fetches specific referral information using `?id=<id>` query parameter.
  - Responsive layout displaying details with full fallback support for "Referral not found" states.

- **Global 404 Route**:
  - Public route displaying a custom "Page Not Found" page with redirection back to the dashboard.

- **Premium UX Loading/Error States**:
  - Skeleton load placeholders for tables, cards, and page details.
  - Accessible error alerts with `role="alert"` and manual retry functionality.

---

## Tech Stack

- **Framework**: React.js (Vite template)
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS v4 (built-in Vite integration with zero config files)
- **State Management / Side-Effects**: React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **HTTP Client**: Axios (configured with interceptors for header token injection)
- **Storage**: `js-cookie` for cookie management

---

## Directory Structure

```text
src/
├── components/
│   ├── ErrorMessage.jsx     # Reusable accessible error state alerts
│   ├── Footer.jsx           # Global responsive branding footer
│   ├── Loader.jsx           # Pulse skeleton loader & spinners
│   ├── MetricCard.jsx       # Individual Overview stats card
│   ├── Navbar.jsx           # Sticky glassmorphic navbar with logout
│   ├── Pagination.jsx       # Client-side 10-row page pagination control
│   ├── ProtectedRoute.jsx   # Auth guard checks jwt_token cookie
│   ├── ReferralTable.jsx    # Clickable entries lists with formatting
│   ├── SearchBar.jsx        # Debounced search & sorting selects
│   └── ServiceSummary.jsx   # Normalizes and groups service summaries
├── hooks/
│   ├── useAuth.jsx          # Auth calls, state storage, and logout
│   └── useReferrals.jsx     # Dashboard lists, filters, details fetching
├── pages/
│   ├── Dashboard.jsx        # Core metrics, share cards, and list pages
│   ├── Login.jsx            # Sign-in views with labels and notifications
│   ├── NotFound.jsx         # Custom 404 handler page
│   └── ReferralDetails.jsx  # Single partner details or 404 state
├── services/
│   └── api.js               # Axios instance, request interceptor
├── utils/
│   ├── formatCurrency.js    # USD currency formating (no decimals)
│   └── formatDate.js        # Convert YYYY-MM-DD to YYYY/MM/DD
├── App.css                  # Empty custom styles override file
├── App.jsx                  # Main application router setup
├── index.css                # Tailwind imports and theme overrides
└── main.jsx                 # StrictMode react DOM root mounting
```

---

## API Endpoints Integration

- **Login API**:
  `POST https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin`
  - Body: `{ "email": "<email>", "password": "<password>" }`
  
- **Referrals API**:
  `GET https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals`
  - Authorization: `Bearer <jwt_token>`
  - Optional Query Params:
    - Search: `?search=<value>&q=<value>`
    - Sort: `?sort=desc` or `?sort=asc`
    - Id: `?id=<id>`

---

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Deployment (Vercel)

The project includes `vercel.json` configured to support SPA routing. When deploying to Vercel:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: `Vite`
- Environment Variables: None required (uses HTTPS endpoints directly)
