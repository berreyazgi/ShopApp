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
 */

export const routes = [
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
  {
    path: '/sepet',
    title: 'Sepetim',
    page: () => import('../features/cart/pages/CartPage.js'),
  },
  {
    path: '/siparisler',
    title: 'Siparişlerim',
    page: () => import('../features/orders/pages/OrderListPage.js'),
  },
  {
    path: '/profil',
    title: 'Profilim',
    page: () => import('../features/profile/pages/ProfilePage.js'),
  },
  {
    path: '/giris',
    title: 'Giriş Yap',
    page: () => import('../features/auth/pages/LoginPage.js'),
  },
  {
    path: '/kayit',
    title: 'Kayıt Ol',
    page: () => import('../features/auth/pages/RegisterPage.js'),
  },
  {
    path: '/admin',
    title: 'Yönetim Paneli',
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
