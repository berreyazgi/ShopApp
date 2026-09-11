/**
 * CategoryCard.js
 * Renders a single category tile for the category index page.
 *
 * @param {{ id?: string, name: string, count?: number, imageUrl: string, href: string }} category
 * @returns {HTMLElement}
 */
export function createCategoryCard(category) {
  const { id, name, count, imageUrl, href } = category;

  const card = document.createElement('a');
  card.className = 'cat-card';
  card.href = href;
  if (id) card.setAttribute('data-category-id', id);
  card.setAttribute('aria-label', count != null ? `${name}: ${count} ürün` : name);

  const bg = document.createElement('div');
  bg.className = 'cat-card__bg';

  const image = document.createElement('img');
  image.className = 'cat-card__image';
  image.src = imageUrl;
  image.alt = name;
  image.loading = 'lazy';
  bg.appendChild(image);

  const overlay = document.createElement('div');
  overlay.className = 'cat-card__overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const content = document.createElement('div');
  content.className = 'cat-card__content';

  const nameEl = document.createElement('h2');
  nameEl.className = 'cat-card__name';
  nameEl.textContent = name;
  content.appendChild(nameEl);

  if (count != null) {
    const countEl = document.createElement('span');
    countEl.className = 'cat-card__count';
    countEl.textContent = `${count} ürün`;
    content.appendChild(countEl);
  }

  card.appendChild(bg);
  card.appendChild(overlay);
  card.appendChild(content);

  return card;
}

/**
 * Renders a grid of category cards into a container element.
 * @param {import('./CategoryCard.js').CategorySummary[]} categories
 * @returns {HTMLElement}
 */
export function createCategoryGrid(categories) {
  const grid = document.createElement('div');
  grid.className = 'cat-grid';
  categories.forEach((category) => grid.appendChild(createCategoryCard(category)));
  return grid;
}
