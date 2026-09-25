# Sattvora Enterprises — Ecommerce Website

A modern Ayurvedic health and wellness storefront built with React 19, Vite, Tailwind CSS v4, and TypeScript.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Type check
pnpm typecheck

# Production build
pnpm build
```

The development server runs at [http://localhost:5173/](http://localhost:5173/).

## Architecture & Features

- **Storefront:** Hero section, trust marquee, category filtering, search, and responsive product cards.
- **Cart System:** Interactive drawer with real-time total, quantity steppers, and free delivery threshold progress (free above ₹999).
- **Persistent State:** Cart items and catalog changes persist across page reloads via `localStorage`.
- **Checkout Flow:** 4-step checkout with address validation, payment options (COD, UPI, Card, NetBanking), and order confirmation receipts.
- **Distributor Portal:** Wholesale pricing, live margin calculator, and inventory management.

## Tech Stack

- **Runtime & Framework:** React 19, Vite 8, TypeScript 5.9
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **State Management:** React Context (`CartContext`, `ProductContext`)
