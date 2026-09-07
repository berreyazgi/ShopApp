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
  //
  // ARCHITECTURE NOTE:
  //  Initially points to the Modular Monolith API (ShopApp.Api).
  //  When identity is extracted to a microservice, only the base URL in
  //  appConfig.js changes. These path strings remain the same.
  //  The frontend components must never be changed during that transition.
  //
  auth: {
    login:          () => '/api/auth/login',
    register:       () => '/api/auth/register',
    logout:         () => '/api/auth/logout',
    refreshToken:   () => '/api/auth/refresh',
    me:             () => '/api/auth/me',
    forgotPassword: () => '/api/auth/forgot-password',
    resetPassword:  () => '/api/auth/reset-password',
    verifyEmail:    () => '/api/auth/verify-email',
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
  //
  // ARCHITECTURE NOTE:
  //  These paths match SepetController in ShopApp.Api which uses
  //  [Route("api/sepet")]. If the controller route ever changes, update here.
  //
  cart: {
    carts:        () => '/api/sepet',
    cartById:     (id) => `/api/sepet/${id}`,
    cartItems:    (sepetId) => `/api/sepet/${sepetId}/urunler`,
    cartItemById: (sepetId, urunId) => `/api/sepet/${sepetId}/urunler/${urunId}`,
  },

  // ── Ordering ─────────────────────────────────────────────────────────────
  //
  // ARCHITECTURE NOTE:
  //  These paths match SiparisController in ShopApp.Api which uses
  //  [Route("api/siparis")]. If the controller route ever changes, update here.
  //
  ordering: {
    orders:       () => '/api/siparis',
    orderById:    (id) => `/api/siparis/${id}`,
    orderItems:   (siparisId) => `/api/siparis/${siparisId}/urunler`,
    orderItemById:(siparisId, urunId) => `/api/siparis/${siparisId}/urunler/${urunId}`,
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

  // ── Profile ──────────────────────────────────────────────────────────────
  profile: {
    get:            () => '/api/profil',
    update:         () => '/api/profil',
  },

  // ── Address ──────────────────────────────────────────────────────────────
  address: {
    list:           () => '/api/adres',
    create:         () => '/api/adres',
    update:         (id) => `/api/adres/${id}`,
    delete:         (id) => `/api/adres/${id}`,
  },
};
