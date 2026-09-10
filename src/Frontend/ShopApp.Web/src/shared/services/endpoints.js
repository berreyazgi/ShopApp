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

  // ── Kategori (public reads) ──────────────────────────────────────────────
  //
  // ARCHITECTURE NOTE:
  //  These paths match KategoriController ([Route("api/kategori")], read-only)
  //  and AdminKategoriController ([Route("api/admin/kategori")], Admin-only
  //  create/delete) in ShopApp.Api.
  //
  kategori: {
    list:           () => '/api/kategori',
    byId:           (id) => `/api/kategori/${id}`,
  },
  adminKategori: {
    create:         () => '/api/admin/kategori',
    update:         (id) => `/api/admin/kategori/${id}`,
    delete:         (id) => `/api/admin/kategori/${id}`,
  },

  // ── Ürün (public reads) ──────────────────────────────────────────────────
  //
  // ARCHITECTURE NOTE:
  //  These paths match UrunController ([Route("api/urun")], read-only) and
  //  AdminUrunController ([Route("api/admin/urun")], Admin-only create/update/delete)
  //  in ShopApp.Api.
  //
  urun: {
    list:           (kategoriId) => kategoriId ? `/api/urun?kategoriId=${kategoriId}` : '/api/urun',
    byId:           (id) => `/api/urun/${id}`,
  },
  // Admin-only reads (AdminUrunController GET) return active AND passive
  // products/details — the public `urun` endpoints above hide passive ones.
  adminUrun: {
    list:           (kategoriId) => kategoriId ? `/api/admin/urun?kategoriId=${kategoriId}` : '/api/admin/urun',
    byId:           (id) => `/api/admin/urun/${id}`,
    create:         () => '/api/admin/urun',
    update:         (id) => `/api/admin/urun/${id}`,
    delete:         (id) => `/api/admin/urun/${id}`,
    createTur:      (urunId) => `/api/admin/urun/${urunId}/tur`,
    updateTur:      (urunId, turId) => `/api/admin/urun/${urunId}/tur/${turId}`,
  },

  // ── Admin Müşteri & Sipariş ──────────────────────────────────────────────
  adminMusteri: {
    list:           () => '/api/admin/musteriler',
    update:         (id) => `/api/admin/musteriler/${id}`,
  },
  adminSiparis: {
    list:           () => '/api/admin/siparisler',
    updateStatus:   (id) => `/api/admin/siparisler/${id}/durum`,
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
    provinces:      () => '/api/address/provinces',
    districts:      (provinceId) => `/api/address/districts/${provinceId}`,
    neighborhoods:  (provinceId, districtId) => `/api/address/neighborhoods/${districtId}?provinceId=${provinceId}`,
  },
};
