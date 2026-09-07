/**
 * ProductListPage.js — Product Listing Page
 * Shows a featured product + grid of products for the current listing.
 *
 * Renders whatever product collection productsService supplies — the page
 * owns no permanent product catalogue itself.
 *
 * Exported as default so the router can import it dynamically.
 */

import { getProducts } from '../services/productsService.js';
import { createProductListLayout } from '../components/ProductCard.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';

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
        <li class="product-breadcrumbs__current" aria-current="page">Ürünler</li>
      </ol>
    </div>
  `;
  return nav;
}

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function ProductListPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'product-list-page';

  element.appendChild(createBreadcrumbs());

  const main = document.createElement('section');
  main.className = 'container';
  main.id = 'product-list-content';
  main.appendChild(createLoadingState({ message: 'Ürünler yükleniyor...' }));
  element.appendChild(main);

  async function load() {
    try {
      const products = await getProducts();
      main.innerHTML = '';

      if (!products.length) {
        main.appendChild(createEmptyState({
          icon: 'search',
          title: 'Ürün bulunamadı',
          description: 'Bu kategoride şu anda listelenecek ürün yok.',
        }));
        return;
      }

      main.appendChild(createProductListLayout(products));
    } catch (error) {
      main.innerHTML = '';
      main.appendChild(createErrorState({
        title: 'Ürünler yüklenemedi',
        message: error?.message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        onRetry: load,
      }));
      console.error('[ProductListPage] load failed:', error);
    }
  }

  load();

  return { element, destroy: () => {} };
}
