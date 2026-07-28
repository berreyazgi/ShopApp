/**
 * homeCategories.js
 * Static category data for the homepage.
 *
 * Replace image URLs with local paths (e.g. /src/assets/images/categories/shoes.webp)
 * when the asset pipeline is ready.
 *
 * Each object maps directly to the CategoryCard component's prop interface.
 */

/**
 * Top hero row — 3 large editorial cards.
 * @type {Array<CategoryCardData>}
 */
export const heroCategories = [
  {
    id:          'ayakkabi',
    title:       'Ayakkabı',
    headline:    'Şıklık ve Konforun Buluşması',
    description: 'Her adımınızda fark yaratan, özenle tasarlanmış koleksiyonlar.',
    buttonLabel: 'Keşfet',
    image:       'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    imageAlt:    'Kırmızı spor ayakkabı',
    theme:       'warm',
    accentColor: '#c8956c',
    route:       '/kategoriler/ayakkabi',
    size:        'large',
  },
  {
    id:          'giyim',
    title:       'Giyim',
    headline:    'Tarzınızı Tamamlayan Parçalar',
    description: 'Minimalist tasarımdan cesur renklere, sezonun en seçkin parçaları.',
    buttonLabel: 'Koleksiyonu Gör',
    image:       'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    imageAlt:    'Askılı elbiseler ve kıyafetler',
    theme:       'light-blue',
    accentColor: '#4fc3f7',
    route:       '/kategoriler/giyim',
    size:        'large',
  },
  {
    id:          'spor',
    title:       'Spor',
    headline:    'Performans ve Stil Bir Arada',
    description: 'Sınırlarınızı zorlayan ekipmanlar, her antrenman için tasarlandı.',
    buttonLabel: 'Detaylı Bilgi',
    image:       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    imageAlt:    'Spor salonu ve fitness ekipmanları',
    theme:       'sport',
    accentColor: '#4caf7d',
    route:       '/kategoriler/spor',
    size:        'large',
  },
];

/**
 * Secondary row — 4 medium editorial cards.
 * @type {Array<CategoryCardData>}
 */
export const secondaryCategories = [
  {
    id:          'gunluk-giyim',
    title:       'Günlük Giyim',
    headline:    'Rahat ve Şık Kombinler',
    description: 'Her güne uyum sağlayan rahat ve şık kombinler.',
    buttonLabel: 'Modelleri İncele',
    image:       'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Günlük kıyafetler',
    theme:       'sand',
    accentColor: '#d4a96a',
    route:       '/kategoriler/gunluk-giyim',
    size:        'medium',
  },
  {
    id:          'aksesuarlar',
    title:       'Aksesuarlar',
    headline:    'Aksesuarlarla Tarzınızı Öne Çıkarın',
    description: 'Detaylar fark yaratır — doğru aksesuar her şeyi tamamlar.',
    buttonLabel: 'Hemen Keşfet',
    image:       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Saat ve aksesuarlar',
    theme:       'gold',
    accentColor: '#c9a227',
    route:       '/kategoriler/aksesuarlar',
    size:        'medium',
  },
  {
    id:          'doga-sporlari',
    title:       'Doğa Sporları',
    headline:    'Yeni Maceralar Sizi Bekliyor',
    description: 'Dağlardan ovalara, doğanın her köşesine hazır olun.',
    buttonLabel: 'Satın Al',
    image:       'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Doğa yürüyüşü ve outdoor sporlar',
    theme:       'nature',
    accentColor: '#2e7d52',
    route:       '/kategoriler/doga-sporlari',
    size:        'medium',
  },
  {
    id:          'kislik-urunler',
    title:       'Kışlık Ürünler',
    headline:    'Zarif ve Sıcak Tutan Seçenekler',
    description: 'Soğuk kış günlerine özel, sıcak tutan şık tasarımlar.',
    buttonLabel: 'Şimdi Al',
    image:       'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Kışlık kıyafetler ve mont',
    theme:       'slate',
    accentColor: '#607d8b',
    route:       '/kategoriler/kislik-urunler',
    size:        'medium',
  },
];

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   headline: string,
 *   description: string,
 *   buttonLabel: string,
 *   image: string,
 *   imageAlt: string,
 *   theme: string,
 *   accentColor: string,
 *   route: string,
 *   size: 'large' | 'medium',
 * }} CategoryCardData
 */
