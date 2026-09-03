/**
 * CategoryListPage.js — Category Index Page
 * Visual grid of all product categories for navigation.
 *
 * Exported as default so the router can import it dynamically.
 */

import { categories } from '../data/productData.js';

// ─── Helpers ───────────────────────────────────────────────────────────────

function createImage(imageUrl, alt) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function CategoryListPage() {
  const element = document.createElement('div');
  element.className = 'category-list-page';

  // ── Header
  const header = document.createElement('div');
  header.className = 'container cat-header';

  const title = document.createElement('h1');
  title.className = 'cat-header__title';
  title.textContent = 'Kategoriler';

  const desc = document.createElement('p');
  desc.className = 'cat-header__desc';
  desc.textContent = 'Aradığınız ürünü bulmak için kategorilere göz atın.';

  header.appendChild(title);
  header.appendChild(desc);
  element.appendChild(header);

  // ── Grid
  const container = document.createElement('div');
  container.className = 'container';

  const grid = document.createElement('div');
  grid.className = 'cat-grid';

  categories.forEach((cat) => {
    const card = document.createElement('a');
    card.className = 'cat-card';
    card.href = cat.href;

    const bg = document.createElement('div');
    bg.className = 'cat-card__bg';
    bg.appendChild(createImage(cat.imageUrl, cat.name));

    const overlay = document.createElement('div');
    overlay.className = 'cat-card__overlay';

    const content = document.createElement('div');
    content.className = 'cat-card__content';

    const name = document.createElement('h2');
    name.className = 'cat-card__name';
    name.textContent = cat.name;

    const count = document.createElement('span');
    count.className = 'cat-card__count';
    count.textContent = `${cat.count} ürün`;

    content.appendChild(name);
    content.appendChild(count);
    card.appendChild(bg);
    card.appendChild(overlay);
    card.appendChild(content);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  element.appendChild(container);

  return { element, destroy: () => {} };
}
