/**
 * HeroCategoryGrid.js
 * Renders the hero grid:
 *   Row 1 — 3 large editorial cards (Ayakkabı, Giyim, Spor)
 *   Row 2 — 4 medium editorial cards (Günlük, Aksesuarlar, Doğa, Kışlık)
 */

import { createCategoryCard } from './CategoryCard.js';
import {
  getHeroCategories,
  getSecondaryCategories,
} from '../services/homeService.js';

export function createHeroCategoryGrid() {
  const element = document.createElement('section');
  element.className = 'hero-grid section';
  element.setAttribute('aria-label', 'Kategori vitrin');

  const destroyFns = [];

  async function render() {
    element.innerHTML = `
      <div class="container">
        <div class="hero-grid__hero-row" aria-label="Öne çıkan kategoriler"></div>
        <div class="hero-grid__secondary-row" aria-label="Diğer kategoriler"></div>
      </div>
    `;

    const heroRow      = element.querySelector('.hero-grid__hero-row');
    const secondaryRow = element.querySelector('.hero-grid__secondary-row');

    // Load both rows in parallel
    const [heroData, secondaryData] = await Promise.all([
      getHeroCategories(),
      getSecondaryCategories(),
    ]);

    heroData.forEach((cat) => {
      const { element: card, destroy } = createCategoryCard(cat);
      heroRow.appendChild(card);
      destroyFns.push(destroy);
    });

    secondaryData.forEach((cat) => {
      const { element: card, destroy } = createCategoryCard(cat);
      secondaryRow.appendChild(card);
      destroyFns.push(destroy);
    });
  }

  function destroy() {
    destroyFns.forEach((fn) => fn());
    destroyFns.length = 0;
  }

  render();

  return { element, destroy };
}
