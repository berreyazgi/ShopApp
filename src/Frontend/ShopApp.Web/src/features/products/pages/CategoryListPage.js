/**
 * CategoryListPage.js — Category Index Page
 * Visual grid of all product categories for navigation.
 *
 * Renders whatever category collection productsService supplies — the page
 * owns no permanent category data itself.
 *
 * Exported as default so the router can import it dynamically.
 */

import { getCategories } from '../services/productsService.js';
import { createCategoryGrid } from '../components/CategoryCard.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';

/**
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function CategoryListPage() {
  const element = document.createElement('div');
  element.className = 'category-list-page';

  const header = document.createElement('div');
  header.className = 'container cat-header';
  header.innerHTML = `
    <h1 class="cat-header__title">Kategoriler</h1>
    <p class="cat-header__desc">Aradığınız ürünü bulmak için kategorilere göz atın.</p>
  `;
  element.appendChild(header);

  const container = document.createElement('div');
  container.className = 'container';
  container.id = 'category-list-content';
  container.appendChild(createLoadingState({ message: 'Kategoriler yükleniyor...' }));
  element.appendChild(container);

  async function load() {
    try {
      const categories = await getCategories();
      container.innerHTML = '';

      if (!categories.length) {
        container.appendChild(createEmptyState({
          icon: 'search',
          title: 'Henüz kategori bulunamadı',
          description: 'Kategoriler eklendiğinde burada listelenecektir.',
        }));
        return;
      }

      container.appendChild(createCategoryGrid(categories));
    } catch (error) {
      container.innerHTML = '';
      container.appendChild(createErrorState({
        title: 'Kategoriler yüklenemedi',
        message: error?.message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        onRetry: load,
      }));
      console.error('[CategoryListPage] load failed:', error);
    }
  }

  load();

  return { element, destroy: () => {} };
}
