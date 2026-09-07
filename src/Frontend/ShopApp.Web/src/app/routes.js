export const routes = [
  { path: '/', title: 'Ana Sayfa', page: () => import('../features/home/pages/HomePage.js') },
  { path: '/kategoriler', title: 'Kategoriler', page: () => import('../features/products/pages/CategoryListPage.js') },
  { path: '/urunler', title: 'Ürünler', page: () => import('../features/products/pages/ProductListPage.js') },
  { path: '/urunler/:productId', title: 'Ürün Detayı', page: () => import('../features/products/pages/ProductDetailPage.js') },
  { path: '/giris', title: 'Giriş Yap', guestOnly: true, page: () => import('../features/auth/pages/LoginPage.js') },
  { path: '/kayit', title: 'Hesap Oluştur', guestOnly: true, page: () => import('../features/auth/pages/RegisterPage.js') },
  { path: '/sepet', title: 'Sepetim', requiresAuth: true, page: () => import('../features/cart/pages/CartPage.js') },
  { path: '/siparisler', title: 'Siparişlerim', requiresAuth: true, page: () => import('../features/orders/pages/OrderListPage.js') },
  { path: '/siparis-onay', title: 'Sipariş Onayı', requiresAuth: true, page: () => import('../features/orders/pages/OrderConfirmationPage.js') },
  { path: '/profil', title: 'Profilim', requiresAuth: true, page: () => import('../features/profile/pages/ProfilePage.js') },
  { path: '/admin', title: 'Yönetim Paneli', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminDashboardPage.js') },
  { path: '/admin/urunler', title: 'Ürün Yönetimi', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminProductsPage.js') },
  { path: '/admin/kategoriler', title: 'Kategori Yönetimi', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminCategoriesPage.js') },
  { path: '/admin/musteriler', title: 'Müşteri Yönetimi', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminCustomersPage.js') },
  { path: '/admin/siparisler', title: 'Sipariş Yönetimi', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminOrdersPage.js') },
  { path: '/admin/kayit', title: 'Yönetici Kaydı', requiresAuth: true, roles: ['Admin'], page: () => import('../features/admin/pages/AdminRegisterPage.js') },
  { path: '/hakkimizda', title: 'Hakkımızda', page: () => import('../features/about/pages/AboutPage.js') },
  { path: '/erisim-engellendi', title: 'Erişim Engellendi', page: () => import('../features/auth/pages/AccessDeniedPage.js') },
];

export const notFoundRoute = {
  title: 'Sayfa Bulunamadı',
  page: () => import('../features/home/pages/NotFoundPage.js'),
};
