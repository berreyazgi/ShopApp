/**
 * ProductListPage.js — Product Listing Page
 * Shows a featured product + grid of products for the current listing.
 *
 * Renders whatever product collection productsService supplies — the page
 * owns no permanent product catalogue itself.
 *
 * Exported as default so the router can import it dynamically.
 */

import { getProducts, getProductsByCategory, getCategoryById } from '../services/productsService.js';
import { createProductListLayout } from '../components/ProductCard.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';

/** @param {string | null} categoryName Real category name, or null for the unfiltered listing. */
function createBreadcrumbs(categoryName) {
  const nav = document.createElement('nav');
  nav.className = 'product-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');

  const currentLabel = categoryName ?? 'Ürünler';
  nav.innerHTML = `
    <div class="container">
      <ol class="product-breadcrumbs__list">
        <li><a href="/" class="product-breadcrumbs__link">ShopApp</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li><a href="/kategoriler" class="product-breadcrumbs__link">Kategoriler</a></li>
        <li class="product-breadcrumbs__sep" aria-hidden="true">/</li>
        <li class="product-breadcrumbs__current" aria-current="page"></li>
      </ol>
    </div>
  `;
  nav.querySelector('.product-breadcrumbs__current').textContent = currentLabel;
  return nav;
}

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function ProductListPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'product-list-page';

  const breadcrumbSlot = document.createElement('div');
  breadcrumbSlot.appendChild(createBreadcrumbs(null));
  element.appendChild(breadcrumbSlot);

  const main = document.createElement('section');
  main.className = 'container';
  main.id = 'product-list-content';
  main.appendChild(createLoadingState({ message: 'Ürünler yükleniyor...' }));
  element.appendChild(main);

  function setBreadcrumb(categoryName) {
    breadcrumbSlot.innerHTML = '';
    breadcrumbSlot.appendChild(createBreadcrumbs(categoryName));
  }

  async function load() {
    // Category filtering is a query param on this same route, keyed by the
    // real Kategori.Id — never a name/slug, and never a second route that
    // could collide with /urunler/:productId (product detail).
    const kategoriId = new URLSearchParams(window.location.search).get('kategoriId');

    try {
      let category = null;
      if (kategoriId) {
        category = await getCategoryById(kategoriId);
        if (!category) {
          setBreadcrumb(null);
          main.innerHTML = '';
          main.appendChild(createEmptyState({
            icon: 'search',
            title: 'Kategori bulunamadı',
            description: 'Aradığınız kategori mevcut değil veya kaldırılmış olabilir.',
          }));
          return;
        }
      }

      setBreadcrumb(category?.name ?? null);

      // A parent category's products may live entirely under its child
      // categories — getProductsByCategory includes those automatically.
      const products = kategoriId ? await getProductsByCategory(kategoriId) : await getProducts();
      main.innerHTML = '';

      if (!products.length) {
        main.appendChild(createEmptyState({
          icon: 'search',
          title: 'Ürün bulunamadı',
          description: category
            ? `"${category.name}" kategorisinde şu anda listelenecek ürün yok.`
            : 'Şu anda listelenecek ürün yok.',
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
