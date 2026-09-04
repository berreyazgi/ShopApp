# ShopApp — Cart & Orders Frontend Agent Instructions

## 1. Purpose

This `AGENTS.md` defines the exact scope for implementing the **Sepet (Cart)** and **Siparişler (Orders)** frontend pages of the ShopApp project.

Repository:

```text
berreyazgi/ShopApp
```

Frontend location:

```text
src/Frontend/ShopApp.Web/
```

The goal of this task is intentionally limited.

The agent must implement the visual frontend and client-side UI behavior for:

```text
/sepet
/siparisler
```

using only:

```text
Vanilla JavaScript ES6+
HTML5
CSS3
```

The user is learning frontend-to-backend API integration and wants to implement that part manually.

Therefore, **API integration is explicitly outside the agent's responsibility.**

---

# 2. Primary Task

Implement the existing frontend stubs:

```text
src/Frontend/ShopApp.Web/src/features/cart/pages/CartPage.js

src/Frontend/ShopApp.Web/src/features/orders/pages/OrderListPage.js
```

Create supporting frontend files when necessary under:

```text
src/Frontend/ShopApp.Web/src/features/cart/

src/Frontend/ShopApp.Web/src/features/orders/
```

The result should provide complete, responsive, accessible UI pages for:

```text
Sepetim
Siparişlerim
```

The agent may implement presentation logic and browser-side UI interactions.

The agent must NOT implement backend communication.

---

# 3. Critical Learning Constraint

The user intentionally wants to implement the frontend API integration personally for learning purposes.

This rule has the highest priority for this task.

## The agent MUST NOT implement:

```text
fetch(...)
XMLHttpRequest
Axios
apiClient calls
REST requests
HTTP requests
API endpoints
API service implementations
backend integration
JWT request handling
Authorization headers
API response mapping
API error handling
API DTO mapping
```

Do not "helpfully" implement these pieces even if doing so would make the pages functional end-to-end.

Do not complete unfinished API integration that already exists elsewhere in the project.

Leave this work for the user.

---

# 4. Backend Is Strictly Read-Only

Everything under:

```text
src/Monolith/
src/Services/
```

is READ-ONLY for this task.

The agent may inspect backend code if necessary to understand concepts such as:

```text
Sepet
SepetUrunleri
Siparis
SiparisUrunleri
```

but MUST NOT modify backend code.

This includes, but is not limited to:

```text
Controllers
Endpoints
Minimal APIs
Commands
Queries
Handlers
MediatR code
DTOs
Entities
Repositories
DbContext
EF Core configuration
Migrations
Identity
JWT
Authentication
Authorization
Application services
Domain services
Infrastructure services
Program.cs
appsettings files
Docker files
database configuration
```

Even if the agent discovers a backend bug while implementing the frontend:

**DO NOT FIX IT.**

Instead, mention the issue in the final report.

---

# 5. Frontend API Layer Is Also Read-Only

The user wants to write the frontend API layer personally.

Therefore, the following areas must NOT be implemented or modified for this task:

```text
src/Frontend/ShopApp.Web/src/shared/services/

src/Frontend/ShopApp.Web/src/features/cart/services/

src/Frontend/ShopApp.Web/src/features/orders/services/

src/Frontend/ShopApp.Web/src/app/appConfig.js
```

Do not modify files such as:

```text
apiClient.js
endpoints.js
serviceRegistry.js
cartService.js
orderService.js
```

if they exist.

Do not create them if they do not exist.

Do not add endpoint constants.

Do not configure API URLs.

Do not connect the pages to backend endpoints.

---

# 6. Allowed Files

The main allowed area is:

```text
src/Frontend/ShopApp.Web/src/features/cart/
src/Frontend/ShopApp.Web/src/features/orders/
```

The agent may create or modify frontend presentation files such as:

```text
cart/
├── pages/
│   └── CartPage.js
├── components/
│   └── ...
├── styles/
│   └── cart.css
└── data/
    └── ...

orders/
├── pages/
│   └── OrderListPage.js
├── components/
│   └── ...
├── styles/
│   └── orders.css
└── data/
    └── ...
```

`data/` may contain static demonstration data if necessary for developing and displaying the UI.

Static data must clearly be presentation/demo data and must not pretend to be a real API implementation.

---

# 7. index.html Exception

The agent may make a **minimal** change to:

```text
src/Frontend/ShopApp.Web/index.html
```

only when necessary to register newly created stylesheets.

For example:

```html
<link rel="stylesheet" href="src/features/cart/styles/cart.css">
<link rel="stylesheet" href="src/features/orders/styles/orders.css">
```

Do not restructure `index.html`.

Do not change application bootstrap logic.

Do not add external frameworks or libraries.

---

# 8. Do Not Modify Routing

The routes already exist.

Cart:

```text
/sepet
```

Orders:

```text
/siparisler
```

Do not unnecessarily modify:

```text
src/Frontend/ShopApp.Web/src/app/routes.js
src/Frontend/ShopApp.Web/src/app/router.js
src/Frontend/ShopApp.Web/src/app/App.js
src/Frontend/ShopApp.Web/src/app/bootstrap.js
```

Use the existing SPA architecture.

Do not create standalone:

```text
cart.html
orders.html
sepet.html
siparis.html
```

The project is a Single Page Application.

HTML for these pages should therefore be generated through the existing Vanilla JavaScript page/component architecture.

---

# 9. Existing Architecture Must Be Preserved

ShopApp frontend uses a feature-based structure:

```text
src/
├── app/
├── features/
├── shared/
└── styles/
```

Follow this architecture.

Do not introduce:

```text
React
Vue
Angular
Svelte
jQuery
Bootstrap
Tailwind
TypeScript
npm build systems
Webpack
Vite
Parcel
new frontend frameworks
```

unless the user explicitly asks for them in another task.

This implementation must remain:

```text
Vanilla JavaScript + HTML + CSS
```

with native ES modules.

---

# 10. Cart Page Requirements

Implement a polished **Sepetim** page.

The page should be capable of visually representing:

```text
Product image
Product name
Product variant/details
Unit price
Quantity
Line total
Remove action
Cart subtotal
Cart total
Checkout action
```

Recommended layout:

```text
Sepetim

┌────────────────────────────────────┐
│ Product image                      │
│ Product name                       │
│ Variant                            │
│ Price                              │
│                                    │
│  [-]  2  [+]           Remove     │
└────────────────────────────────────┘

┌─────────────────────┐
│ Sipariş Özeti       │
│                     │
│ Ara toplam          │
│ Kargo               │
│ Toplam              │
│                     │
│ Siparişi Tamamla    │
└─────────────────────┘
```

Exact design may be adapted to the existing ShopApp design system.

---

# 11. Cart Client-Side Interactions

The agent MAY implement pure frontend interactions such as:

```text
increase quantity
decrease quantity
remove an item from the displayed UI
calculate displayed subtotal
calculate displayed total
render empty-cart state
enable/disable buttons
update DOM elements
responsive interactions
```

These interactions must remain entirely local.

They must NOT send requests to the backend.

For example, this is acceptable:

```js
quantity += 1;
render();
```

This is NOT acceptable:

```js
await apiClient.put(...);
```

This is NOT acceptable:

```js
fetch('/api/sepet/...');
```

---

# 12. Cart Empty State

Implement a proper empty-cart state.

Example information:

```text
Sepetiniz boş

Henüz sepetinize ürün eklemediniz.

Alışverişe Devam Et
```

Use the existing SPA navigation pattern when linking to another existing page.

Do not add backend behavior.

---

# 13. Orders Page Requirements

Implement a polished **Siparişlerim** page.

Each order representation should be capable of displaying:

```text
Order number
Order date
Order status
Order total
Number of products
Product preview
Order details action
```

Possible layout:

```text
Siparişlerim

┌──────────────────────────────────────────┐
│ Sipariş #10042                          │
│ 18 Ağustos 2026                         │
│                                          │
│ Durum: Hazırlanıyor                      │
│                                          │
│ 3 ürün                      ₺4.299,90    │
│                                          │
│ Sipariş Detaylarını Gör                  │
└──────────────────────────────────────────┘
```

Use Turkish user-facing labels consistent with the rest of ShopApp.

---

# 14. Order Details Interaction

The orders page may provide frontend-only UI behavior such as:

```text
expand/collapse order details
show product rows
display status badges
display totals
show empty state
toggle detail sections
```

This must use local/demo data only.

Do not implement:

```text
GET /orders
GET /orders/{id}
POST /orders
PUT /orders
DELETE /orders
```

or any equivalent API calls.

---

# 15. Orders Empty State

Provide a suitable empty state such as:

```text
Henüz siparişiniz yok

Vermiş olduğunuz siparişler burada görüntülenecek.

Alışverişe Başla
```

The button may navigate to an already existing frontend route.

---

# 16. Demo Data

Because backend integration is intentionally excluded, the agent may use small static demo datasets to verify the UI.

For example:

```js
const demoCartItems = [
  {
    id: 1,
    name: 'Demo Ürün',
    price: 999.90,
    quantity: 2
  }
];
```

and:

```js
const demoOrders = [
  {
    id: '10042',
    status: 'Hazırlanıyor',
    total: 4299.90
  }
];
```

Keep demo data easy to remove later.

Prefer placing substantial demo datasets under:

```text
features/cart/data/
features/orders/data/
```

rather than mixing large datasets into UI components.

Add a short comment indicating that the data is temporary and will later be replaced by the user's API integration.

Do NOT create a fake HTTP service layer.

---

# 17. Separation of Responsibilities

Prefer:

```text
Page
   ↓
Components
   ↓
Local/static presentation data
```

For this task, deliberately stop before:

```text
Page
   ↓
Service
   ↓
apiClient
   ↓
Backend
```

That integration will be implemented by the user later.

---

# 18. Components

Create reusable components where doing so improves readability.

Possible cart components:

```text
CartItem
CartSummary
EmptyCart
QuantityControl
```

Possible order components:

```text
OrderCard
OrderItem
OrderStatusBadge
EmptyOrders
```

Do not over-engineer.

Simple components should remain simple Vanilla JavaScript modules.

Follow the existing component lifecycle pattern when applicable:

```js
return {
  element,
  destroy
};
```

Clean up event listeners in `destroy()` when listeners are registered by the component/page.

---

# 19. HTML Requirements

Use semantic HTML.

Prefer elements such as:

```html
<section>
<article>
<header>
<footer>
<button>
<img>
<h1>
<h2>
<ul>
<li>
```

instead of creating the entire interface from meaningless nested `<div>` elements.

Buttons must use `<button>`.

Navigation must use appropriate links or the existing SPA navigation mechanism.

Images must have meaningful `alt` attributes.

---

# 20. CSS Requirements

Follow the existing ShopApp design system.

Reuse variables from:

```text
src/styles/tokens.css
```

instead of unnecessarily hardcoding:

```text
colors
spacing
font sizes
border radii
shadows
```

Prefer feature-specific styles:

```text
src/features/cart/styles/cart.css
src/features/orders/styles/orders.css
```

Avoid placing large amounts of inline CSS inside JavaScript templates.

Do not redesign global styles unless absolutely necessary.

Do not modify:

```text
reset.css
tokens.css
typography.css
utilities.css
global.css
```

just to make these two pages work.

---

# 21. Responsive Design

Both pages must work reasonably on:

```text
desktop
tablet
mobile
```

The cart layout should gracefully change from a multi-column desktop layout into a stacked mobile layout.

Order cards should remain readable on narrow screens.

Avoid horizontal scrolling caused by the page implementation.

---

# 22. Accessibility

Maintain the accessibility standards already used by the frontend.

At minimum:

- use semantic elements;
- provide `alt` text for images;
- use real buttons for actions;
- provide accessible labels for icon-only buttons;
- preserve visible keyboard focus;
- make controls keyboard accessible;
- use useful headings;
- avoid using color as the only indicator of order status;
- use `aria-live` only when it provides meaningful feedback;
- respect reduced-motion preferences.

---

# 23. User-Facing Language

The application's visible UI should remain primarily Turkish.

Prefer:

```text
Sepetim
Siparişlerim
Ara Toplam
Toplam
Adet
Ürünü Kaldır
Siparişi Tamamla
Sipariş Detayları
Sipariş Tarihi
Sipariş Durumu
Alışverişe Devam Et
```

Internal JavaScript identifiers may remain English where that matches the existing frontend conventions:

```js
cartItems
orderItems
quantity
subtotal
renderCart
renderOrders
```

---

# 24. Existing Shared Components

Before creating duplicate components, inspect:

```text
src/Frontend/ShopApp.Web/src/shared/components/
```

Reuse existing generic components when doing so is simple and appropriate.

For example:

```text
Button
Icon
Header
Alert
```

Do not rewrite shared components solely for this task.

Do not perform unrelated refactoring.

---

# 25. Authentication

The routes already require authentication.

Do NOT modify the authentication system as part of this task.

Do not modify:

```text
LoginPage
RegisterPage
authService
JWT handling
token storage
route guards
Identity integration
```

If authenticated routing does not work correctly, report that separately.

Do not fix it unless specifically asked in another task.

---

# 26. Checkout Boundary

The cart page may visually contain a button such as:

```text
Siparişi Tamamla
```

but the agent must NOT implement the real checkout workflow.

The button may:

```text
show a local informational message
remain prepared for future integration
perform a simple frontend-only interaction
```

It must NOT:

```text
create a Siparis in the backend
call an order endpoint
process payment
modify inventory
clear a server-side cart
```

---

# 27. No Payment Implementation

Do not implement:

```text
payment provider integration
credit card processing
payment API
Stripe
PayPal
iyzico
checkout backend
payment DTOs
payment endpoints
```

This task ends at frontend presentation.

---

# 28. No Database Changes

Never create or modify:

```text
database tables
migrations
DbContext
entity configurations
seed data
PostgreSQL configuration
```

for this frontend task.

---

# 29. No Architecture Refactoring

Do not use this task as an opportunity to:

```text
restructure Clean Architecture
move Domain entities
change CQRS
replace MediatR
refactor authentication
change repositories
modify microservices
change Docker
rename projects
change database architecture
```

These topics are unrelated to the requested frontend pages.

---

# 30. Do Not Fix Unrelated Problems

If you encounter:

```text
backend compilation error
authentication bug
database problem
Docker problem
API endpoint problem
JWT problem
unrelated frontend bug
```

do not modify unrelated files to fix it.

Report the problem instead.

The scope of this task is deliberately narrow.

---

# 31. Verification

After implementation, verify the frontend using the project's existing local-server approach.

For example:

```bash
cd src/Frontend/ShopApp.Web
python3 -m http.server 5500
```

Then verify:

```text
http://localhost:5500/sepet
http://localhost:5500/siparisler
```

or navigate to those routes through the SPA.

Verify at minimum:

```text
page renders without JavaScript errors
cart layout works
order layout works
empty states render
local interactions work
mobile layout works
buttons are keyboard accessible
existing pages remain usable
no backend request is made by the new code
```

Do not add a new build system merely for verification.

---

# 32. Network Verification

Before completing the task, ensure the new Cart and Orders implementation itself does not contain:

```js
fetch(
apiClient.
XMLHttpRequest
axios
```

and does not modify endpoint configuration.

The browser UI should be functional as a frontend prototype without requiring backend data.

---

# 33. Required Final Report

When finished, provide a concise report containing:

```text
Files created
Files modified
Cart UI implemented
Orders UI implemented
Local UI interactions implemented
Responsive/accessibility work
Verification performed
```

Then explicitly state:

```text
Backend code was not modified.
Frontend API integration was not implemented.
API/service integration remains for the user to implement.
```

If backend/API problems were discovered, list them separately without fixing them.

---

# 34. Hard Scope Summary

## YOU MAY

```text
✓ Implement CartPage.js
✓ Implement OrderListPage.js
✓ Create cart UI components
✓ Create order UI components
✓ Create cart CSS
✓ Create orders CSS
✓ Create temporary static demo data
✓ Implement local DOM interactions
✓ Implement quantity controls
✓ Implement empty states
✓ Implement responsive layouts
✓ Implement accessible UI
✓ Add necessary feature CSS links to index.html
```

## YOU MAY NOT

```text
✗ Write backend code
✗ Modify backend code
✗ Write controllers
✗ Write endpoints
✗ Write CQRS handlers
✗ Write DTOs
✗ Write repository code
✗ Modify entities
✗ Modify DbContext
✗ Add migrations
✗ Modify JWT
✗ Modify Identity
✗ Modify authentication
✗ Write frontend API calls
✗ Use fetch()
✗ Use apiClient
✗ Modify endpoints.js
✗ Modify appConfig API configuration
✗ Implement cartService API logic
✗ Implement orderService API logic
✗ Implement checkout backend
✗ Implement payments
✗ Introduce a frontend framework
✗ Refactor unrelated code
```

---

# 35. Final Priority

When there is any uncertainty about whether a change belongs to this task, apply this rule:

> If the change is not required to visually implement or locally interact with the Sepet and Siparişler pages using Vanilla JavaScript, HTML, and CSS, do not make the change.

The purpose is to let the AI agent build the presentation layer while preserving the frontend API integration and backend work as learning exercises for the user.