# ShopApp — Frontend-Only Agent Instructions

## 1. Purpose

This `AGENTS.md` defines the scope and working rules for AI agents contributing to the ShopApp project.

The project is being used as a learning project. The user wants to rebuild and implement the backend personally.

Therefore, the agent's responsibility is limited to the **frontend presentation layer and browser-side UI behavior**.

The agent may create polished, responsive, accessible, and dynamic-looking interfaces, but it must not take ownership of backend, database, API, authentication integration, or frontend-to-backend communication.

---

# 2. Highest-Priority Rule

The agent is a **frontend design and UI implementation assistant only**.

The user will personally implement:

- backend application code;
- database access;
- API endpoints;
- CQRS/MediatR flows;
- repositories;
- authentication and authorization integration;
- frontend-to-backend API communication;
- request/response mapping;
- service-layer integration.

Do not complete these areas even when doing so would make a page work end-to-end.

If a page needs backend data, create the frontend in a way that is ready to receive that data later, but leave the actual integration to the user.

---

# 3. Frontend Technology

Keep the existing frontend approach unless the user explicitly requests a different technology in another task.

Use:

```text
Vanilla JavaScript ES6+
HTML5
CSS3
Native ES modules
```

Do not introduce a new frontend framework or build system only to complete a UI task.

Do not introduce technologies such as:

```text
React
Vue
Angular
Svelte
jQuery
Bootstrap
Tailwind
TypeScript
Webpack
Vite
Parcel
```

unless the user explicitly asks for them.

---

# 4. Unified Customer and Admin Application

ShopApp uses **one unified frontend application** for both customer-facing and admin-facing pages.

Do NOT create, maintain, or assume a separate localhost/admin frontend application.

Admin pages must remain inside the same application and use the project's existing routing system with an admin route namespace, such as:

```text
/admin
/admin/...
```

Do not create a second SPA, second frontend entry point, second build, or separate admin application shell.

The admin section may have its own management-oriented layout, navigation, sidebar, tables, dashboards, and page composition, but it must still belong to the same ShopApp frontend and reuse shared components/design tokens when appropriate.

Use **role-based frontend routing/route protection** for admin pages. Follow the existing router/auth patterns instead of inventing a parallel routing system.

Allowed frontend responsibilities include:

- defining or adjusting admin route entries inside the existing frontend router;
- grouping admin pages under the `/admin` route namespace;
- using an admin-specific nested/layout structure inside the same application;
- redirecting or rendering an access-denied state when the existing frontend auth state indicates that the user is not an admin;
- reusing an existing role/claim value that is already exposed to the frontend;
- creating admin navigation, dashboards, forms, tables, filters, modals, and other presentation components.

The agent must NOT implement the security source of truth. In particular, do not add or change:

- backend role/claim definitions;
- ASP.NET authorization policies;
- Identity role configuration;
- JWT creation or role-claim issuance;
- authorization endpoints;
- database role assignments;
- new token parsing/authentication infrastructure solely to make admin routing work.

Frontend route protection is a UX/navigation layer only. Real authorization must continue to be enforced by the backend code written by the user.

---

# 5. Dynamic Website Requirement

The frontend should be designed as a **dynamic, data-driven website**.

Except for the **Hakkımızda** page, business/content data shown by the application must be treated as data that ultimately comes from the database.

Examples include, when applicable:

```text
products
product details
categories
prices
stock information
cart contents
orders
shipping information
customer/account information
admin lists
admin dashboard values
status information
```

The agent must therefore avoid permanently hardcoding real application content directly into page markup or UI components.

Prefer UI structures that receive data and render it, for example:

```js
export function ProductCard(product) {
  // Render the supplied product data.
}
```

or:

```js
function renderProducts(products) {
  // Render the supplied collection.
}
```

The important rule is:

> Build the UI so that database-backed data can be supplied later by the user's own API integration.

---

# 6. Hakkımızda Is the Static Exception

The **Hakkımızda** page may contain static frontend content.

It does not need to be structured as database-backed content unless the user explicitly changes this requirement later.

Do not use the Hakkımızda exception as a reason to hardcode content on other pages.

---

# 7. Demo Data Rules and Restrictions

Temporary local/demo data may be used only when strictly necessary to design, preview, or verify a dynamic UI before real integration exists, EXCEPT for protected commerce domains.

> [!CAUTION]
> The general permission to use temporary/demo business data does **NOT** apply to:
> - **Sepet (Shopping Cart)**
> - **Siparişler (Orders)**
> - **Sipariş Onayı (Order Confirmation)**
> - **Admin Siparişler (Admin Orders)**
> - **Kategoriler (Categories & Category Management)**
>
> For these areas, dummy/demo business records are **strictly forbidden**.

---

# 8. Dynamic Commerce Data — No Dummy Data

This is a high-priority, permanent frontend architecture rule:

> **Missing backend integration is NOT permission to create fake business data.**
>
> **If real data is unavailable, render a loading, empty, error, or data-ready state instead of inventing records.**
>
> **Never reintroduce `cartDemoData`, `orderConfirmationDemoData`, or equivalent replacement mock datasets.**

### Permanent Rules:

1. **Sepet production UI must never use dummy/demo/mock products.**
   An empty cart must render an actual empty-cart state (*"Sepetiniz boş"*). Changing quantities or removing items must recalculate totals dynamically from current state. Never populate the cart automatically with sample products because backend data is missing.
2. **Sipariş/Sipariş confirmation production UI must never use dummy/demo/mock orders.**
   Neither customer `Siparişlerim` nor `/siparis-onay` may use fake order numbers, hardcoded product lines, fake dates, or fake totals.
3. **Admin orders must never use fake order records.**
   The admin orders page (`/admin/siparisler`) must render supplied dynamic orders; if empty, show a genuine empty state (*"Henüz sipariş bulunmuyor"*). Do not fabricate dashboard metrics.
4. **Categories must not be duplicated as hardcoded business-data arrays.**
   Do not maintain separate category arrays across pages or components. The frontend must have a single category collection/data source.
5. **Empty backend/frontend data must produce an empty state, never demo fallback.**
   No fallback such as `items = response?.items?.length ? response.items : cartDemoData;` is allowed.
6. **Dynamic render functions/components are preferred.**
   Components receive data and render it. No hardcoded domain entities inside presentation templates.
7. **API integration remains reserved for the user.**
   Do NOT implement network calls (`fetch`, `axios`, `XMLHttpRequest`, `apiClient`). Leave the API layer for the user.
8. **Backend implementation remains reserved for the user.**
   Do NOT touch controllers, CQRS, entities, DbContext, migrations, or database seeds.
9. **Admin remains inside the same unified frontend application.**
   Do not create a separate admin application or separate build.
10. **Category UI must be ready for future backend integration.**
    Structure category consumption (`AdminCategoriesPage`, `AdminProductsPage`, `CategoryListPage`, `Header.js`) so that a future backend API can be wired without rewriting the UI.
11. **Removing demo data must include removing obsolete imports/files/fallbacks.**
    Delete demo files, remove unused imports, remove fake test item payloads (`TEST_ORDER_ITEMS`), and remove dead variables.
12. **Future AI agents must not reintroduce deleted demo data.**
    Deleted fixtures like `cartDemoData.js` and `orderConfirmationDemoData.js` must never be recreated or restored under different names.

---

# 9. Frontend API Integration Is Reserved for the User

The agent must NOT implement or complete frontend-to-backend communication.

Do not add or modify integration code such as:

```text
fetch(...)
XMLHttpRequest
Axios
apiClient calls
REST requests
HTTP requests
endpoint calls
API service implementations
Authorization headers
JWT request handling
API response mapping
API DTO mapping
API-specific error handling
```

Do not "helpfully" connect a finished UI to an existing endpoint.

Do not complete unfinished API integration that already exists elsewhere in the project.

Leave those pieces for the user.

---

# 9. Backend Is Strictly Read-Only

The agent may inspect backend code when necessary to understand the data shape or domain terminology required by the frontend.

However, backend code is read-only unless the user explicitly gives a different instruction in a later task.

Do NOT create or modify:

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
Docker/backend infrastructure
database configuration
```

If a backend problem is discovered while working on the frontend, report it instead of fixing it.

---

# 10. No Database Changes

The agent must not create, modify, migrate, seed, or directly access the database.

Do not modify:

```text
database tables
migrations
DbContext
entity configurations
seed data
PostgreSQL configuration
connection settings
```

The frontend may visually represent database-backed information, but the actual database and persistence implementation belongs to the user.

---

# 11. Frontend Responsibility

The agent MAY implement frontend presentation concerns such as:

```text
page layouts
reusable UI components
cards
tables
forms
modals
drawers
menus
navigation UI
filters
search UI
sorting controls
pagination UI
empty states
loading states
error-state presentation
status badges
dashboard widgets
charts already supported by the project
responsive behavior
DOM interactions
client-side visual state
accessibility improvements
CSS styling
```

The agent may also implement browser-side interactions that do not require backend communication.

Examples:

```text
open/close modal
expand/collapse section
change tabs
update a local quantity value
preview a selected image
filter already-loaded local data
sort already-loaded local data
show validation messages for frontend-only form rules
render an empty state
```

---

# 12. Dynamic Components Instead of Hardcoded Pages

When building pages that will later receive database data, prefer reusable render functions/components over large static templates.

For example, prefer:

```text
ProductList
ProductCard
CategoryCard
CartItem
OrderCard
OrderStatusBadge
AdminTable
AdminForm
Pagination
EmptyState
```

when those abstractions improve readability.

Do not over-engineer the frontend.

A simple UI element should remain a simple Vanilla JavaScript module.

---

# 13. Existing Architecture Must Be Preserved

Before adding new files or patterns, inspect the existing frontend structure and follow its conventions.

Reuse existing:

```text
components
styles
design tokens
utilities
navigation helpers
state patterns
existing project libraries
```

when appropriate.

Do not perform unrelated refactoring.

Do not restructure the entire application to implement one page.

Do not rename or move unrelated files.

---

# 14. Graphify

**Graphify already exists inside the project.**

Treat it as an existing project capability and preserve the current integration unless the user explicitly asks for Graphify-related changes.

The agent does **not** need to document, list, or explain the individual page paths/routes in this instruction file.

Do not hardcode or duplicate a full inventory of page paths merely for the agent's convenience.

The `/admin` namespace is an intentional architectural convention for the unified application and may be referenced when necessary.

Use the project's existing navigation/routing conventions instead of inventing a parallel routing approach.

---

# 15. User-Facing Language

The application's visible UI should remain **primarily Turkish**.

Prefer Turkish labels such as:

```text
Ana Sayfa
Ürünler
Kategoriler
Sepetim
Siparişlerim
Hakkımızda
Hesabım
Ara Toplam
Toplam
Adet
Ürünü Kaldır
Siparişi Tamamla
Sipariş Detayları
Sipariş Tarihi
Sipariş Durumu
Alışverişe Devam Et
Kaydet
Güncelle
Sil
İptal
Ara
Filtrele
```

Admin UI labels should also remain primarily Turkish.

Internal JavaScript identifiers may remain English when that matches the existing codebase, for example:

```js
products
cartItems
orderItems
quantity
subtotal
renderProducts
renderOrders
```

Do not translate code identifiers only for visual consistency.

---

# 16. Forms

The agent may design and implement frontend forms.

Allowed frontend concerns include:

```text
labels
inputs
select boxes
checkboxes
radio buttons
text areas
file-input UI
required-field indicators
frontend-only validation messages
error/success visual states
loading/disabled button states
```

However, submitting those forms to the backend is reserved for the user.

Do not create API calls, database operations, commands, handlers, or endpoints for a form.

---

# 17. Authentication and Role-Based Routing Boundary

The agent may design login, register, account, access-denied, and admin-facing screens when requested.

The agent may also implement or adjust **frontend route gating** for the unified `/admin` section when it can rely on authentication/role information that the existing frontend already exposes.

For example, it may:

```text
mark admin routes as admin-only
use the existing router guard mechanism
redirect a non-admin user away from /admin
render the existing access-denied page/state
select an admin layout for /admin routes
```

However, it must not implement or modify the underlying authentication/authorization infrastructure such as:

```text
JWT creation
JWT refresh logic
Identity configuration
backend login/register endpoints
new Authorization-header handling
backend role/claim definitions
ASP.NET authorization policies
route authorization backend
password persistence
role assignment persistence
```

Do not weaken security by treating the frontend route guard as real authorization. The backend remains the security boundary.

If the frontend currently has no usable role information, prepare the route/layout structure for role-based guarding and report the missing integration instead of inventing backend/JWT behavior.

If existing authentication integration is broken, report the problem instead of redesigning the backend.

The global site navbar is not required to expose a visible admin entry point. A visual navbar redesign may omit an admin-only nav link (e.g. "Yönetim") without that being treated as removing admin functionality — `/admin` remains part of the router and stays protected by the existing role guard; admins reach it by direct URL or a dedicated admin-area affordance instead of the customer-facing navbar.

---

# 18. Checkout and Payment Boundary

The agent may design checkout and payment-related screens as frontend presentation when requested.

It must NOT implement:

```text
payment provider integration
credit-card processing
payment API calls
payment endpoints
payment DTOs
server-side checkout
order creation backend
inventory mutation
server-side cart clearing
```

Buttons may visually exist and may use frontend-only placeholder behavior while the user builds the real workflow.

---

# 19. HTML Requirements

Use semantic HTML where practical.

Prefer elements such as:

```html
<section>
<article>
<header>
<footer>
<nav>
<main>
<button>
<form>
<label>
<input>
<img>
<h1>
<h2>
<ul>
<li>
<table>
```

Avoid building the entire interface from meaningless nested `<div>` elements.

Use real `<button>` elements for actions.

Use meaningful `alt` text for informative images.

---

# 20. CSS and Visual Design

Follow the existing ShopApp visual language and reuse existing design tokens/styles when available.

Prefer reusable classes and feature-specific styles rather than large amounts of inline CSS inside JavaScript templates.

Avoid unnecessary global CSS changes.

Do not introduce a new visual framework just to style one page.

The unified frontend should feel consistent across customer and admin sections while still allowing `/admin` routes to use an appropriately management-oriented layout.

---

# 21. Responsive Design

Frontend work must behave reasonably on:

```text
desktop
tablet
mobile
```

Avoid unnecessary horizontal scrolling.

Layouts should adapt instead of relying on fixed desktop-only dimensions.

Tables used in admin pages should have an intentional small-screen strategy when relevant.

---

# 22. Accessibility

At minimum:

- use semantic elements;
- provide meaningful image `alt` text;
- use real buttons for actions;
- associate labels with form controls;
- provide accessible names for icon-only controls;
- preserve visible keyboard focus;
- support keyboard interaction;
- use logical heading order;
- do not use color as the only status indicator;
- use `aria-live` only when useful;
- respect reduced-motion preferences where animation is used.

---

# 23. Loading, Empty, and Error Presentation

Because most pages are data-driven, the frontend should be able to represent common data states where appropriate:

```text
loading
loaded
empty
error
no search results
no filtered results
```

These are presentation states only.

The agent may design and render them, but it must not implement the network request that produces them.

---

# 24. Existing Shared Components

Before creating a new generic component, check whether the project already contains a reusable equivalent.

Reuse existing shared components where doing so is simple and appropriate.

Do not rewrite a shared component solely because a slightly different implementation would be easier for one page.

If a change to a shared component could affect many existing pages, keep the change minimal and directly related to the requested UI.

---

# 25. No Unrelated Architecture Refactoring

Do not use a frontend task as an opportunity to:

```text
restructure Clean Architecture
change CQRS
replace MediatR
move Domain entities
change repositories
change microservices
change Docker configuration
redesign database architecture
refactor authentication backend
rename projects
```

These areas belong to the user unless specifically requested otherwise.

---

# 26. Do Not Fix Unrelated Problems

If the agent encounters an unrelated problem such as:

```text
backend compilation error
authentication bug
database problem
Docker problem
API endpoint problem
JWT problem
unrelated frontend bug
```

it should not expand the scope automatically.

Report the issue clearly and continue with the requested frontend work when possible.

---

# 27. Verification

After implementing frontend changes, verify the affected UI using the project's existing local-development approach.

Verify at minimum, when relevant:

```text
page renders without JavaScript errors
layout is usable
responsive behavior works
empty/loading/error presentation works
frontend-only interactions work
buttons and forms are keyboard accessible
existing pages remain usable
new code does not perform backend requests
```

Do not add a new build system merely for verification.

---

# 28. Network-Safety Verification

Before finishing a frontend task, inspect the new code and confirm that the agent did not introduce backend communication such as:

```js
fetch(
XMLHttpRequest
axios
apiClient.
```

Also confirm that the agent did not create or modify endpoint configuration as part of the task.

The UI may be dynamic in how it renders supplied data, but the user owns the actual data retrieval.

---

# 29. Required Final Report

When finishing a task, provide a concise report containing only relevant items such as:

```text
Files created
Files modified
UI/pages implemented
Reusable components created
Responsive/accessibility work
Frontend-only interactions implemented
Verification performed
Issues discovered but intentionally not fixed
```

When applicable, explicitly state:

```text
Backend code was not modified.
Database code was not modified.
Frontend API integration was not implemented.
API/service integration remains for the user to implement.
```

---

# 30. Hard Scope Summary

## YOU MAY

```text
✓ Design and implement customer-facing frontend pages
✓ Design and implement admin pages inside the same unified frontend under the admin route namespace
✓ Create reusable Vanilla JavaScript UI components
✓ Create responsive CSS
✓ Create forms and tables as presentation UI
✓ Create loading, empty, and error states
✓ Create frontend-only interactions
✓ Render supplied/demonstration data dynamically
✓ Use temporary isolated demo data for non-commerce UI development (never for Cart, Orders, or Categories)
✓ Reuse existing project components and libraries
✓ Preserve and work with the project's existing Graphify setup
✓ Adjust existing frontend routing/layouts for role-gated `/admin` pages
✓ Keep all visible UI primarily Turkish
```

## YOU MAY NOT

```text
✗ Use dummy/demo/mock products in Sepet
✗ Use dummy/demo/mock orders in Siparişler or Sipariş Onayı
✗ Use fake order records in Admin Siparişler
✗ Hardcode or duplicate category business data arrays
✗ Fall back to sample/demo data when real data is empty
✗ Reintroduce deleted demo datasets (cartDemoData, orderConfirmationDemoData)
✗ Write backend application code
✗ Modify backend application code
✗ Write controllers or endpoints
✗ Write CQRS handlers
✗ Write repositories
✗ Modify entities
✗ Modify DbContext
✗ Add migrations
✗ Change database configuration
✗ Implement JWT or Identity backend logic
✗ Implement authentication backend
✗ Create a separate localhost admin frontend/application
✗ Implement backend role/claim or authorization-policy logic
✗ Write frontend API calls
✗ Use fetch() for application integration
✗ Implement apiClient/service integration
✗ Add endpoint configuration
✗ Implement checkout backend
✗ Implement payment processing
✗ Introduce a frontend framework without explicit permission
✗ Create a second/separate admin application or replace the existing routing/navigation approach
✗ Add unnecessary page-path documentation
✗ Refactor unrelated architecture
```

---

# 31. Final Priority

When there is uncertainty about whether a change belongs to the agent, apply this rule:

> If the change is required to design, render, style, locally interact with the frontend, or organize role-gated admin routes inside the existing SPA, the agent may do it. If the change retrieves, persists, authenticates, authorizes, processes, or mutates real application data through the backend, leave it for the user.

For every page except **Hakkımızda**, assume that displayed application data will ultimately come from the database through integration written by the user.

Admin pages must remain part of the same unified application. Frontend role-based routing may control navigation and presentation, but backend authorization remains the real security boundary.

The purpose of the agent is to create a clean, dynamic, database-ready frontend while preserving backend and API implementation as the user's learning work.
