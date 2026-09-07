/**
 * HeroCategoryGrid.js
 * Renders the hero grid:
 *   Row 1 — 3 large editorial cards (Ayakkabı, Giyim, Spor)
 *   Row 2 — 4 medium editorial cards (Aksesuar, Erkek, Kadın, Çocuk)
 *
 * Category data is supplied by homeService.js (currently temporary demo
 * data — see homeCategories.js) and rendered here via createCategoryCard.
 */

import { createCategoryCard } from './CategoryCard.js';
import {
  getHeroCategories,
  getSecondaryCategories,
} from '../services/homeService.js';
import { createLoadingState, createEmptyState } from '../../../shared/components/StateView/StateView.js';

export function createHeroCategoryGrid() {
  const element = document.createElement('section');
  element.className = 'hero-grid section';
  element.setAttribute('aria-label', 'Kategori vitrin');

  const destroyFns = [];

  async function render() {
    element.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'container';
    container.appendChild(createLoadingState({ message: 'Kategoriler yükleniyor...' }));
    element.appendChild(container);

    const [heroData, secondaryData] = await Promise.all([
      getHeroCategories(),
      getSecondaryCategories(),
    ]);

    container.innerHTML = '';

    if (!heroData.length && !secondaryData.length) {
      container.appendChild(createEmptyState({
        icon: 'search',
        title: 'Henüz kategori bulunamadı',
        description: 'Kategoriler eklendiğinde burada görüntülenecektir.',
      }));
      return;
    }

    const heroRow = document.createElement('div');
    heroRow.className = 'hero-grid__hero-row';
    heroRow.setAttribute('aria-label', 'Öne çıkan kategoriler');
    heroData.forEach((cat) => {
      const { element: card, destroy } = createCategoryCard(cat);
      heroRow.appendChild(card);
      destroyFns.push(destroy);
    });
    container.appendChild(heroRow);

    const secondaryRow = document.createElement('div');
    secondaryRow.className = 'hero-grid__secondary-row';
    secondaryRow.setAttribute('aria-label', 'Diğer kategoriler');
    secondaryData.forEach((cat) => {
      const { element: card, destroy } = createCategoryCard(cat);
      secondaryRow.appendChild(card);
      destroyFns.push(destroy);
    });
    container.appendChild(secondaryRow);
  }

  function destroy() {
    destroyFns.forEach((fn) => fn());
    destroyFns.length = 0;
  }

  render();

  return { element, destroy };
}
