/**
 * ProductListPage.js — Category Product Listing
 * Shows a featured product + grid of products for "Spor Ayakkabı" category.
 *
 * Exported as default so the router can import it dynamically.
 */

import { demoProducts, formatPrice } from '../data/productData.js';

// ─── Helpers ───────────────────────────────────────────────────────────────

function createImage(imageUrl, alt) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

function createBreadcrumbs() {
  const nav = document.createElement('nav');
  nav.className = 'product-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML = `
    <div class="container">
      <ol class="product-breadcrumbs__list">
        <li><a href="/" class="product-breadcrumbs__link">ShopApp</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li><a href="/kategoriler" class="product-breadcrumbs__link">Kategoriler</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li class="product-breadcrumbs__current" aria-current="page">Spor Ayakkabı</li>
      </ol>
    </div>
  `;
  return nav;
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function ProductListPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'product-list-page';

  const featured = demoProducts.find((p) => p.featured) || demoProducts[0];
  const gridProducts = demoProducts.filter((p) => p.id !== featured.id);

  // ── Breadcrumbs
  element.appendChild(createBreadcrumbs());

  // ── Main Layout
  const main = document.createElement('section');
  main.className = 'container';

  const layout = document.createElement('div');
  layout.className = 'plp-layout';

  // ── Featured Card (left)
  const featuredCard = document.createElement('article');
  featuredCard.className = 'plp-featured';

  const featuredImg = document.createElement('div');
  featuredImg.className = 'plp-featured__image';
  featuredImg.appendChild(createImage(featured.imageUrl, featured.name));

  const featuredBody = document.createElement('div');
  featuredBody.className = 'plp-featured__body';

  const featuredTitle = document.createElement('h2');
  featuredTitle.className = 'plp-featured__title';
  featuredTitle.textContent = featured.name;

  const featuredPrice = document.createElement('span');
  featuredPrice.className = 'plp-featured__price';
  featuredPrice.textContent = formatPrice(featured.price);

  const featuredBtn = document.createElement('a');
  featuredBtn.className = 'plp-btn';
  featuredBtn.href = `/urunler/${featured.id}`;
  featuredBtn.textContent = 'İncele';

  featuredBody.appendChild(featuredTitle);
  featuredBody.appendChild(featuredPrice);
  featuredBody.appendChild(featuredBtn);
  featuredCard.appendChild(featuredImg);
  featuredCard.appendChild(featuredBody);
  layout.appendChild(featuredCard);

  // ── Product Grid (right)
  const grid = document.createElement('div');
  grid.className = 'plp-grid';

  gridProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'plp-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'plp-card__image';
    imgWrap.appendChild(createImage(product.imageUrl, product.name));

    const body = document.createElement('div');
    body.className = 'plp-card__body';

    const title = document.createElement('h3');
    title.className = 'plp-card__title';
    title.textContent = product.name;

    const footer = document.createElement('div');
    footer.className = 'plp-card__footer';

    const price = document.createElement('span');
    price.className = 'plp-card__price';
    price.textContent = formatPrice(product.price);

    const btn = document.createElement('a');
    btn.className = 'plp-btn plp-btn--sm';
    btn.href = `/urunler/${product.id}`;
    btn.textContent = 'İncele';

    footer.appendChild(price);
    footer.appendChild(btn);
    body.appendChild(title);
    body.appendChild(footer);
    card.appendChild(imgWrap);
    card.appendChild(body);
    grid.appendChild(card);
  });

  layout.appendChild(grid);
  main.appendChild(layout);
  element.appendChild(main);

  return { element, destroy: () => {} };
}
