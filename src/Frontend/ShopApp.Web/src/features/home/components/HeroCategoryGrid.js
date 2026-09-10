/**
 * HeroCategoryGrid.js
 * Renders the homepage category grid using the real, database-backed
 * category collection (via homeService -> categoryService -> GET /api/kategori)
 * and the shared products/components/CategoryCard.js renderer — the same
 * category card used on the Category List page. Renders whatever categories
 * the API returns; nothing here assumes specific category names or ids.
 */

import { createCategoryGrid } from '../../products/components/CategoryCard.js';
import { getHomeCategories } from '../services/homeService.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';

export function createHeroCategoryGrid() {
  const element = document.createElement('section');
  element.className = 'hero-grid section';
  element.setAttribute('aria-label', 'Kategori vitrin');

  const container = document.createElement('div');
  container.className = 'container';
  element.appendChild(container);

  async function render() {
    container.innerHTML = '';
    container.appendChild(createLoadingState({ message: 'Kategoriler yükleniyor...' }));

    try {
      const categories = await getHomeCategories();
      container.innerHTML = '';

      if (!categories.length) {
        container.appendChild(createEmptyState({
          icon: 'search',
          title: 'Henüz kategori bulunamadı',
          description: 'Kategoriler eklendiğinde burada görüntülenecektir.',
        }));
        return;
      }

      container.appendChild(createCategoryGrid(categories));
    } catch (error) {
      container.innerHTML = '';
      container.appendChild(createErrorState({
        title: 'Kategoriler yüklenemedi',
        message: error?.message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        onRetry: render,
      }));
      console.error('[HeroCategoryGrid] load failed:', error);
    }
  }

  function destroy() {}

  render();

  return { element, destroy };
}
