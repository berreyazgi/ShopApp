# ShopApp – Vanilla JavaScript SPA Frontend

A modular, feature-based Single Page Application for the ShopApp e-commerce platform.
Built with Vanilla JavaScript ES6+, HTML5, and CSS3 — no frameworks, no build tools required.

---

## 🚀 Quick Start

A local HTTP server is **required** because ES modules use `import` statements which browsers block on `file://` URLs.

```bash
# Option 1 — Python (no install needed)
cd src/Frontend/ShopApp.Web
python3 -m http.server 5500

# Option 2 — Node.js serve
npx serve src/Frontend/ShopApp.Web

# Option 3 — VS Code Live Server
# Right-click index.html → Open with Live Server
```

Then open: **http://localhost:5500**

---

## 📁 Project Structure

```
ShopApp.Web/
├── index.html                          # App shell
├── README.md
│
└── src/
    ├── app/                            # SPA core
    │   ├── App.js                      # Wires header + router
    │   ├── bootstrap.js                # Entry point
    │   ├── router.js                   # History API router
    │   ├── routes.js                   # ← Register new routes here
    │   └── appConfig.js                # ← Set API URLs here
    │
    ├── features/                       # One folder per domain feature
    │   ├── home/                       # ✅ Implemented
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── services/               # ← API integration points
    │   │   ├── data/
    │   │   └── styles/
    │   ├── auth/                       # 🔲 Stub
    │   ├── products/                   # 🔲 Stub
    │   ├── cart/                       # 🔲 Stub
    │   ├── orders/                     # 🔲 Stub
    │   ├── profile/                    # 🔲 Stub
    │   └── admin/                      # 🔲 Stub
    │
    ├── shared/
    │   ├── components/
    │   │   ├── Header/                 # Sticky header with cart badge
    │   │   ├── Button/                 # Reusable button (5 variants)
    │   │   └── Icon/                   # Inline SVG icon system
    │   ├── services/
    │   │   ├── apiClient.js            # All HTTP goes through here
    │   │   ├── endpoints.js            # All API paths in one place
    │   │   └── serviceRegistry.js      # Service URL resolution
    │   ├── state/
    │   │   ├── store.js                # Reactive global state
    │   │   └── eventBus.js             # Cross-module events
    │   ├── utils/
    │   │   └── dom.js                  # DOM helper functions
    │   └── constants/
    │       └── appConstants.js         # Events, storage keys, breakpoints
    │
    └── styles/
        ├── reset.css
        ├── tokens.css                  # ← Design system tokens
        ├── typography.css
        ├── utilities.css
        └── global.css
```

---

## ➕ How to Add a New Feature Module

**Example: adding a `wishlist` feature**

1. **Create the folder structure:**
   ```
   src/features/wishlist/
   ├── pages/WishlistPage.js
   ├── components/WishlistCard.js
   ├── services/wishlistService.js
   └── styles/wishlist.css
   ```

2. **Add the route in `src/app/routes.js`:**
   ```js
   {
     path: '/favorilerim',
     title: 'Favorilerim',
     page: () => import('../features/wishlist/pages/WishlistPage.js'),
   },
   ```

3. **Link the stylesheet in `index.html`:**
   ```html
   <link rel="stylesheet" href="src/features/wishlist/styles/wishlist.css">
   ```

That's it. No other file needs to change.

---

## 🔌 How to Connect the Backend API

All API integration happens **only in service files** — never in components.

**Step 1 — Set the base URL in `src/app/appConfig.js`:**
```js
api: {
  gatewayBaseUrl: 'https://api.shopapp.com',  // Monolith API
  // or per-service for Microservices:
  services: {
    catalog: 'https://catalog.shopapp.com',
    cart:    'https://cart.shopapp.com',
  },
},
```

**Step 2 — Uncomment the apiClient call in the feature service:**
```js
// src/features/home/services/homeService.js
export async function getHeroCategories() {
  // Remove the static return and uncomment:
  return apiClient.get(endpoints.catalog.categories());
}
```

Components never need to change — they always call the service, not the API directly.

---

## 🏗️ Monolith → Microservice Migration

The frontend is already prepared. When a backend service is extracted:

1. Update `appConfig.api.services.<serviceName>` with the new URL.
2. `serviceRegistry.resolveServiceUrl()` automatically routes to the correct service.
3. No page, component, or router code changes are required.

---

## 🔄 Migration to React / Vue / Angular

The architecture maps cleanly:

| Current (Vanilla JS)          | React equivalent           |
|-------------------------------|---------------------------|
| `createComponent({ options })` | `function Component(props)` |
| `element, destroy`            | `useEffect` cleanup        |
| `store.js`                    | Zustand / Redux store      |
| `eventBus.js`                 | Custom events / Context    |
| `routes.js`                   | React Router config        |
| Feature folders               | Feature-based modules      |

Each feature's `pages/`, `components/`, `services/` structure maps 1:1 to a React feature module.

---

## 🔧 How the Router Works

The router uses the **History API** (`pushState` + `popstate`).

- All `<a href="...">` clicks are intercepted — no full-page reloads.
- Pages are **lazy-loaded** via `import()` — only the current page downloads.
- Route params are extracted from path patterns: `/products/:id` → `params.productId`.
- To navigate programmatically: `import { navigate } from './app/router.js'; navigate('/sepet');`

---

## 🎨 Design System

All design decisions live in `src/styles/tokens.css` as CSS custom properties.

To change the accent color site-wide: update `--color-accent` in `tokens.css`.

---

## ♿ Accessibility

- Semantic HTML5 elements throughout
- ARIA labels on all interactive elements
- Keyboard navigation supported
- Visible focus rings on all focusable elements
- `prefers-reduced-motion` respected — animations disabled when requested
- Cart badge updates announced via `aria-live`
