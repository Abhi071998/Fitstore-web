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
# Local backend
VITE_BASE_URL=http://localhost:8080/api

# Deployed backend
VITE_BASE_URL=https://fitstore-engine.onrender.com/api
```

`VITE_BASE_URL` must be prefixed with `VITE_` so Vite exposes it to the client; it points to your Go Echo backend.

## Backend

The server-side (Go Echo + GORM + PostgreSQL) code for this project lives at
[Fitstore-engine](https://github.com/Abhi071998/Fitstore-engine).
