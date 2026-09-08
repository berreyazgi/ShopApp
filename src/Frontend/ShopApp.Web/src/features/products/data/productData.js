/**
 * productData.js — Temporary demo data for product pages.
 * TODO: Replace with real API integration when backend is wired up.
 *
 * This file is a temporary fixture only. Pages must not import it directly —
 * go through productsService.js so the data source can be swapped later
 * without touching any page/component code.
 */

export const demoProducts = [
  { id: 'nike-alphafly', name: 'Nike Air Zoom Alphafly Next% 2', price: 1800, imageUrl: '/src/assets/images/products/nike-alphafly/main.webp', featured: true },
  { id: 'nike-pegasus', name: 'Nike Pegasus 39', price: 1600, imageUrl: '/src/assets/images/products/nike-pegasus-39.webp' },
  { id: 'adidas-ultraboost', name: 'Adidas Ultraboost 22', price: 1450, imageUrl: '/src/assets/images/products/adidas-ultraboost-22.webp' },
  { id: 'puma-velocity', name: 'Puma Velocity Nitro 2', price: 1350, imageUrl: '/src/assets/images/products/puma-velocity-nitro-2.webp' },
  { id: 'nb-fuelcell', name: 'New Balance FuelCell RC Elite', price: 1700, imageUrl: '/src/assets/images/products/new-balance-fuelcell.webp' },
  { id: 'asics-novablast', name: 'Asics Novablast 3', price: 1250, imageUrl: '/src/assets/images/products/asics-novablast-3.webp' },
];

export const productDetailMap = {
  'nike-alphafly': {
    id: 'nike-alphafly',
    name: 'Nike Air Zoom Alphafly',
    model: 'Air Zoom Alphafly Next% 2',
    price: 1800,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    defaultSize: 42,
    colors: [
      { name: 'Kırmızı/Sarı', bg: '#e53935', secondary: '#fdd835' },
      { name: 'Siyah', bg: '#212121' },
      { name: 'Mavi', bg: '#1565c0' },
      { name: 'Pembe', bg: '#e91e63' },
    ],
    description: 'Nike Air Zoom Alphafly NEXT% 2, yarış günü performansınızı en üst seviyeye çıkarmak için tasarlanmış profesyonel koşu ayakkabısıdır. ZoomX köpük teknolojisi ve tam boy karbon fiber plaka ile benzersiz enerji geri dönüşümü sağlar. Atomknit 2.0 üst malzemesi, nefes alabilirlik ve destek arasında mükemmel bir denge kurar.',
    specs: [
      'Ağırlık: 215g (Erkek 42 numara)',
      'Taban yüksekliği: 40mm topuk / 36mm ön kısım',
      'Taban farkı: 4mm',
      'Malzeme: ZoomX köpük + karbon fiber plaka',
      'Üst kısım: Atomknit 2.0',
    ],
    imageUrl: '/src/assets/images/products/nike-alphafly/main.webp',
    imageUrls: [
      '/src/assets/images/products/nike-alphafly/main.webp',
      '/src/assets/images/products/nike-alphafly/angle-1.webp',
      '/src/assets/images/products/nike-alphafly/angle-2.webp',
      '/src/assets/images/products/nike-alphafly/angle-3.webp',
    ],
  },
};

/** Get detail for any product, with fallback generation */
export function getProductDetail(productId) {
  if (productDetailMap[productId]) return productDetailMap[productId];

  const product = demoProducts.find((p) => p.id === productId);
  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    model: product.name,
    price: product.price,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    defaultSize: 42,
    colors: [
      { name: 'Varsayılan', bg: '#212121' },
      { name: 'Siyah', bg: '#212121' },
    ],
    description: `${product.name}, yüksek performans ve konfor sunan modern bir spor ayakkabıdır. Günlük kullanım ve spor aktiviteleri için idealdir.`,
    specs: ['Ağırlık: ~250g', 'Taban: Kauçuk dış taban', 'Üst kısım: Tekstil + sentetik'],
    imageUrl: product.imageUrl,
    imageUrls: [
      product.imageUrl,
      product.imageUrl,
      product.imageUrl,
    ],
  };
}

export const relatedProducts = [
  { name: 'Sarı Eşofman Takımı', variant: 'Beden: M', price: 1200, imageUrl: '/src/assets/images/categories/esofman-forma.webp' },
  { name: 'Nike Apparel Ayakkabı', variant: 'Beden: M', price: 1800, imageUrl: '/src/assets/images/products/nike-pegasus-39.webp' },
];


export function formatPrice(amount) {
  return amount.toLocaleString('tr-TR') + ' TL';
}
