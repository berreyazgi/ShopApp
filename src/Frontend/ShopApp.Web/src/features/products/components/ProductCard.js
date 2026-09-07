/**
 * ProductCard.js
 * Renders a single product card, in either the large "featured" layout
 * or the compact "grid" layout used on ProductListPage.
 */

import { formatPrice } from '../../../shared/utils/format.js';

function createProductImage(imageUrl, alt) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = imageUrl;
  image.alt = alt;
  image.loading = 'lazy';
  return image;
}

/**
 * @param {{ id: string, name: string, price: number, imageUrl: string }} product
 * @param {{ variant?: 'featured' | 'grid' }} [options]
 * @returns {HTMLElement}
 */
export function createProductCard(product, { variant = 'grid' } = {}) {
  const { id, name, price, imageUrl } = product;
  const isFeatured = variant === 'featured';

  const card = document.createElement('article');
  card.className = isFeatured ? 'plp-featured' : 'plp-card';

  const imgWrap = document.createElement('div');
  imgWrap.className = isFeatured ? 'plp-featured__image' : 'plp-card__image';
  imgWrap.appendChild(createProductImage(imageUrl, name));
  card.appendChild(imgWrap);

  const body = document.createElement('div');
  body.className = isFeatured ? 'plp-featured__body' : 'plp-card__body';

  const title = document.createElement(isFeatured ? 'h2' : 'h3');
  title.className = isFeatured ? 'plp-featured__title' : 'plp-card__title';
  title.textContent = name;
  body.appendChild(title);

  if (isFeatured) {
    const price_ = document.createElement('span');
    price_.className = 'plp-featured__price';
    price_.textContent = formatPrice(price);
    body.appendChild(price_);

    const btn = document.createElement('a');
    btn.className = 'plp-btn';
    btn.href = `/urunler/${id}`;
    btn.textContent = 'İncele';
    body.appendChild(btn);
  } else {
    const footer = document.createElement('div');
    footer.className = 'plp-card__footer';

    const price_ = document.createElement('span');
    price_.className = 'plp-card__price';
    price_.textContent = formatPrice(price);
    footer.appendChild(price_);

    const btn = document.createElement('a');
    btn.className = 'plp-btn plp-btn--sm';
    btn.href = `/urunler/${id}`;
    btn.textContent = 'İncele';
    footer.appendChild(btn);

    body.appendChild(footer);
  }

  card.appendChild(body);
  return card;
}

/**
 * Renders a product listing layout: one featured card + a grid of the rest.
 * @param {import('../data/productData.js').ProductSummary[]} products
 * @returns {HTMLElement}
 */
export function createProductListLayout(products) {
  const layout = document.createElement('div');
  layout.className = 'plp-layout';

  const featured = products.find((p) => p.featured) ?? products[0];
  const rest = products.filter((p) => p.id !== featured.id);

  layout.appendChild(createProductCard(featured, { variant: 'featured' }));

  const grid = document.createElement('div');
  grid.className = 'plp-grid';
  rest.forEach((product) => grid.appendChild(createProductCard(product, { variant: 'grid' })));
  layout.appendChild(grid);

  return layout;
}
