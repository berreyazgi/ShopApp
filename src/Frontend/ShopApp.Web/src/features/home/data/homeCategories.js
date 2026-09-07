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
    id:          'aksesuar',
    title:       'Aksesuar',
    headline:    'Aksesuarlarla Tarzınızı Öne Çıkarın',
    description: 'Detaylar fark yaratır — doğru aksesuar her şeyi tamamlar.',
    buttonLabel: 'Hemen Keşfet',
    image:       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Saat ve aksesuarlar',
    theme:       'gold',
    accentColor: '#c9a227',
    route:       '/kategoriler/aksesuar',
    size:        'medium',
  },
  {
    id:          'erkek',
    title:       'Erkek',
    headline:    'Erkek Koleksiyonunu Keşfedin',
    description: 'Günlük şıklıktan spor tarza, erkekler için seçkin parçalar.',
    buttonLabel: 'Göz At',
    image:       'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Erkek giyim koleksiyonu',
    theme:       'slate',
    accentColor: '#607d8b',
    route:       '/kategoriler/erkek',
    size:        'medium',
  },
  {
    id:          'kadin',
    title:       'Kadın',
    headline:    'Kadın Koleksiyonunu Keşfedin',
    description: 'Sezonun öne çıkan parçalarıyla tarzınızı tamamlayın.',
    buttonLabel: 'Koleksiyonu Gör',
    image:       'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Kadın giyim koleksiyonu',
    theme:       'sand',
    accentColor: '#d4a96a',
    route:       '/kategoriler/kadin',
    size:        'medium',
  },
  {
    id:          'cocuk',
    title:       'Çocuk',
    headline:    'Çocuklar İçin Rahat ve Renkli Seçenekler',
    description: 'Oyun dolu günlere uygun, dayanıklı ve rahat kıyafetler.',
    buttonLabel: 'Tümünü Gör',
    image:       'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
    imageAlt:    'Çocuk giyim koleksiyonu',
    theme:       'nature',
    accentColor: '#2e7d52',
    route:       '/kategoriler/cocuk',
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
