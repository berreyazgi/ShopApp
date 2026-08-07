/**
 * routes.js
 * Central route registry.
 *
 * To add a new route:
 *   1. Create a new feature page in src/features/<feature>/pages/
 *   2. Add a single entry to the `routes` array below.
 *   3. No other file needs to change.
 *
 * Pages are lazy-loaded via dynamic import() — only the current page's
 * module is downloaded by the browser.
 *
 * Route metadata:
 *
 *   guestOnly:    true  → Redirect authenticated users away (e.g. /giris, /kayit).
 *                         FUTURE: Router guard reads authStore.isAuthenticated().
 *
 *   requiresAuth: true  → Redirect anonymous users to /giris.
 *                         FUTURE: Router guard reads authStore.isAuthenticated().
 *
 *   roles:        []    → Restrict to specific user roles (e.g. ['Admin']).
 *                         FUTURE: Router guard reads authStore.getState().user.roles.
 *
 * SECURITY NOTE:
 *   Frontend route guards are a UX convenience only.
 *   Backend authorization must always be enforced server-side.
 *   Never rely on client-side role checks as a security boundary.
 */

export const routes = [
  // ── Public ────────────────────────────────────────────────────────────
  {
    path: '/',
    title: 'Ana Sayfa',
    page: () => import('../features/home/pages/HomePage.js'),
  },
  {
    path: '/kategoriler',
    title: 'Kategoriler',
    page: () => import('../features/products/pages/CategoryListPage.js'),
  },
  {
    path: '/urunler',
    title: 'Ürünler',
    page: () => import('../features/products/pages/ProductListPage.js'),
  },
  {
    path: '/urunler/:productId',
    title: 'Ürün Detayı',
    page: () => import('../features/products/pages/ProductDetailPage.js'),
  },

  // ── Authentication (guest-only) ────────────────────────────────────────
  // guestOnly: true → Once auth is implemented, authenticated users will
  // be redirected away from these pages to the homepage.
  {
    path: '/giris',
    title: 'Giriş Yap',
    guestOnly: true,
    page: () => import('../features/auth/pages/LoginPage.js'),
  },
  {
    path: '/kayit',
    title: 'Hesap Oluştur',
    guestOnly: true,
    page: () => import('../features/auth/pages/RegisterPage.js'),
  },

  // ── Authentication (future pages — not yet implemented) ────────────────
  // Uncomment and implement the page modules when needed.
  // {
  //   path: '/sifremi-unuttum',
  //   title: 'Şifremi Unuttum',
  //   guestOnly: true,
  //   page: () => import('../features/auth/pages/ForgotPasswordPage.js'),
  // },
  // {
  //   path: '/sifre-sifirla',
  //   title: 'Şifre Sıfırla',
  //   guestOnly: true,
  //   page: () => import('../features/auth/pages/ResetPasswordPage.js'),
  // },
  // {
  //   path: '/email-dogrula',
  //   title: 'E-posta Doğrula',
  //   guestOnly: true,
  //   page: () => import('../features/auth/pages/VerifyEmailPage.js'),
  // },

  // ── Protected (requires authentication) ───────────────────────────────
  // requiresAuth: true → Anonymous users will be redirected to /giris.
  {
    path: '/sepet',
    title: 'Sepetim',
    page: () => import('../features/cart/pages/CartPage.js'),
  },
  {
    path: '/siparisler',
    title: 'Siparişlerim',
    // requiresAuth: true,   ← Uncomment when auth is implemented.
    page: () => import('../features/orders/pages/OrderListPage.js'),
  },
  {
    path: '/profil',
    title: 'Profilim',
    // requiresAuth: true,   ← Uncomment when auth is implemented.
    page: () => import('../features/profile/pages/ProfilePage.js'),
  },

  // ── Admin (requires Admin role) ────────────────────────────────────────
  {
    path: '/admin',
    title: 'Yönetim Paneli',
    // requiresAuth: true,   ← Uncomment when auth is implemented.
    // roles: ['Admin'],     ← Uncomment when role-based guards are implemented.
    page: () => import('../features/admin/pages/AdminDashboardPage.js'),
  },
];

/**
 * Not-found fallback — rendered when no route matches.
 */
export const notFoundRoute = {
  title: 'Sayfa Bulunamadı',
  page: () => import('../features/home/pages/NotFoundPage.js'),
};
