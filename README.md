# FITstore Admin

FITstore is an admin dashboard for managing a fitness apparel store's categories and products, built with React, Vite, and Redux Toolkit Query.

## Installation

```bash
git clone https://github.com/Abhi071998/Fitstore-web.git
cd fit-store
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Environment Variables

Copy `.env.example` to `.env` and set the base URL of your backend API:

```bash
VITE_BASE_URL=http://localhost:8080/api
```

`VITE_BASE_URL` must be prefixed with `VITE_` so Vite exposes it to the client; it points to your Go Echo backend.
