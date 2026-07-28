/**
 * endpoints.js
 * All API endpoint paths in one place.
 *
 * Rules:
 *  - Never hardcode endpoint paths inside components or pages.
 *  - Each path is a function so it can accept dynamic segments cleanly.
 *  - When a service moves to a Microservice, only the base URL in appConfig
 *    changes — the path keys here stay the same.
 */

export const endpoints = {
  // ── Identity / Auth ──────────────────────────────────────────────────────
  auth: {
    login:          () => '/api/identity/auth/login',
    register:       () => '/api/identity/auth/register',
    logout:         () => '/api/identity/auth/logout',
    refreshToken:   () => '/api/identity/auth/refresh',
    me:             () => '/api/identity/users/me',
  },

  // ── Catalog / Products ───────────────────────────────────────────────────
  catalog: {
    categories:     () => '/api/catalog/categories',
    categoryById:   (id) => `/api/catalog/categories/${id}`,
    products:       () => '/api/catalog/products',
    productById:    (id) => `/api/catalog/products/${id}`,
    featured:       () => '/api/catalog/products/featured',
    search:         () => '/api/catalog/products/search',
  },

  // ── Cart ─────────────────────────────────────────────────────────────────
  cart: {
    summary:        () => '/api/cart',
    addItem:        () => '/api/cart/items',
    updateItem:     (id) => `/api/cart/items/${id}`,
    removeItem:     (id) => `/api/cart/items/${id}`,
    clear:          () => '/api/cart/clear',
  },

  // ── Ordering ─────────────────────────────────────────────────────────────
  ordering: {
    orders:         () => '/api/ordering/orders',
    orderById:      (id) => `/api/ordering/orders/${id}`,
    checkout:       () => '/api/ordering/checkout',
  },

  // ── Payment ──────────────────────────────────────────────────────────────
  payment: {
    initiate:       () => '/api/payment/initiate',
    verify:         () => '/api/payment/verify',
  },

  // ── Notification ─────────────────────────────────────────────────────────
  notification: {
    list:           () => '/api/notifications',
    markRead:       (id) => `/api/notifications/${id}/read`,
  },
};
