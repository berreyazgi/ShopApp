/**
 * AdminProductsPage.js — Complete Dynamic Admin Product Management Page
 *
 * Implements the Admin → Ürünler page based on the reference design.
 * Features:
 *  - Responsive AdminLayout shell with active '/admin/urunler' route
 *  - Header with title, description & "+ Yeni Ürün Ekle" primary button
 *  - Advanced Filter Toolbar:
 *      * Search by Product Name, SKU, Category
 *      * Dynamic Category filter dropdown (from supplied categories)
 *      * Status filter (Tüm Durumlar, Aktif, Pasif)
 *      * Stock status filter (Stok Durumu, Stokta, Düşük Stok, Stokta Yok)
 *      * "Temizle" (clear filters) button
 *      * Dynamic Result Count ("X ürün bulundu")
 *      * Sorting dropdown (8 options)
 *      * Grid / List view mode toggle buttons
 *  - Product Grid View (AdminProductGrid / AdminProductCard)
 *  - Product Table / List View (AdminProductList)
 *  - Interactive Modals:
 *      * AdminProductFormModal (Create & Edit modes with image picker & validation)
 *      * AdminProductDetailModal (Read-only full product details)
 *      * AdminConfirmModal (Delete confirmation dialog)
 *  - Comprehensive data states: Loading, Error, Empty, Filtered-Empty, Loaded
 *  - Dynamic Pagination (createAdminPagination)
 *
 * ZERO demo products, ZERO mock records, ZERO API/network calls.
 * Pure frontend presentation layer ready for backend integration.
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createAdminPagination } from '../components/AdminPagination.js';
import { createAdminConfirmModal } from '../components/AdminConfirmModal.js';
import { createAdminProductGrid } from '../components/AdminProductGrid.js';
import { createAdminProductList } from '../components/AdminProductList.js';
import { createAdminProductFormModal } from '../components/AdminProductFormModal.js';
import { createAdminProductDetailModal } from '../components/AdminProductDetailModal.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { getCategoriesSync } from '../../categories/services/categoryService.js';

/**
 * @param {{
 *   products?: any[],
 *   categories?: any[],
 *   pageSize?: number,
 *   loading?: boolean,
 *   error?: any,
 *   onRetry?: () => void,
 *   onCreateProduct?: () => void,
 *   onEditProduct?: (product: any) => void,
 *   onDeleteProduct?: (productId: any) => void,
 *   onSaveProduct?: (productData: any) => void,
 *   onPageChange?: (page: number) => void,
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminProductsPage(props = {}) {
  // Dynamic business data inputs (strictly defaults to empty array / null)
  let products = props.products ? [...props.products] : [];
  let categories = props.categories ? [...props.categories] : getCategoriesSync();
  const pageSize = props.pageSize ?? 12;
  const isLoading = !!props.loading;
  const hasError = !!props.error;

  // Local UI State
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedStatus = 'all';
  let selectedStock = 'all';
  let sortOption = 'created-desc';
  let viewMode = 'grid'; // 'grid' | 'list'
  let currentPage = 1;

  // Active Modals tracker
  let activeModalInstance = null;

  const layout = createAdminLayout({ currentPath: '/admin/urunler' });
  const container = layout.contentArea;

  // ─── Filter & Sort Logic (Client-side against supplied collection) ───────────

  function getFilteredAndSortedProducts() {
    let result = products.filter((p) => {
      // 1. Search Query Filter
      if (searchQuery) {
        const name = (p.name || p.ad || '').toLowerCase();
        const sku = (p.sku || p.barkod || p.kod || '').toLowerCase();
        const cat = (p.category || p.kategori || '').toLowerCase();
        const matches = name.includes(searchQuery) || sku.includes(searchQuery) || cat.includes(searchQuery);
        if (!matches) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        const catName = (p.category || p.kategori || '').toLowerCase();
        const catId = String(p.categoryId || p.kategoriId || '');
        const target = selectedCategory.toLowerCase();
        if (catName !== target && catId !== target) return false;
      }

      // 3. Status Filter (Active / Passive)
      const isActive = p.isActive !== undefined ? p.isActive : (p.aktiflik ?? true);
      if (selectedStatus === 'active' && !isActive) return false;
      if (selectedStatus === 'passive' && isActive) return false;

      // 4. Stock Filter
      const stockVal = p.stock ?? p.stok;
      const stockNum = stockVal !== undefined && stockVal !== null ? Number(stockVal) : null;
      const stockStatus = String(p.stockStatus || p.stokDurumu || '').toLowerCase();

      if (selectedStock === 'out-of-stock') {
        if (stockStatus.includes('out') || stockStatus.includes('tüken') || stockStatus.includes('yok')) return true;
        if (stockNum === 0) return true;
        return false;
      }
      if (selectedStock === 'low-stock') {
        if (stockStatus.includes('low') || stockStatus.includes('düşük') || stockStatus.includes('kritik')) return true;
        if (stockNum !== null && stockNum > 0 && stockNum <= 5) return true;
        return false;
      }
      if (selectedStock === 'in-stock') {
        if (stockStatus.includes('in') || stockStatus.includes('stokta') || stockStatus.includes('var')) return true;
        if (stockNum !== null && stockNum > 5) return true;
        return false;
      }

      return true;
    });

    // 5. Sorting
    result.sort((a, b) => {
      const priceA = Number(a.price ?? a.fiyat ?? 0);
      const priceB = Number(b.price ?? b.fiyat ?? 0);
      const stockA = Number(a.stock ?? a.stok ?? 0);
      const stockB = Number(b.stock ?? b.stok ?? 0);
      const nameA = String(a.name || a.ad || '');
      const nameB = String(b.name || b.ad || '');
      const dateA = new Date(a.createdAt || a.olusturmaTarihi || 0).getTime();
      const dateB = new Date(b.createdAt || b.olusturmaTarihi || 0).getTime();

      switch (sortOption) {
        case 'created-asc':
          return dateA - dateB;
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return nameA.localeCompare(nameB, 'tr');
        case 'name-desc':
          return nameB.localeCompare(nameA, 'tr');
        case 'stock-asc':
          return stockA - stockB;
        case 'stock-desc':
          return stockB - stockA;
        case 'created-desc':
        default:
          return dateB - dateA;
      }
    });

    return result;
  }

  // ─── Modal Actions ──────────────────────────────────────────────────────────

  function openCreateModal() {
    closeActiveModal();
    if (typeof props.onCreateProduct === 'function') {
      props.onCreateProduct();
    }
    activeModalInstance = createAdminProductFormModal({
      product: null,
      categories,
      onSave: handleSaveProduct,
      onClose: () => { activeModalInstance = null; },
    });
    document.body.appendChild(activeModalInstance.element);
  }

  function openEditModal(product) {
    closeActiveModal();
    if (typeof props.onEditProduct === 'function') {
      props.onEditProduct(product);
    }
    activeModalInstance = createAdminProductFormModal({
      product,
      categories,
      onSave: handleSaveProduct,
      onClose: () => { activeModalInstance = null; },
    });
    document.body.appendChild(activeModalInstance.element);
  }

  function openDetailModal(product) {
    closeActiveModal();
    activeModalInstance = createAdminProductDetailModal({
      product,
      onEdit: (p) => openEditModal(p),
      onClose: () => { activeModalInstance = null; },
    });
    document.body.appendChild(activeModalInstance.element);
  }

  function openDeleteModal(product) {
    closeActiveModal();
    const pid = product.id ?? product.urunId;
    const name = product.name || product.ad || 'Bu ürünü';

    activeModalInstance = createAdminConfirmModal({
      title: 'Ürünü Sil',
      message: `"${name}" ürününü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      confirmLabel: 'Sil',
      onConfirm: () => {
        if (typeof props.onDeleteProduct === 'function') {
          props.onDeleteProduct(pid);
        }
        // Local removal for responsive UI feedback
        products = products.filter((p) => (p.id ?? p.urunId) !== pid);
        renderPage();
      },
      onCancel: () => { activeModalInstance = null; },
    });
    document.body.appendChild(activeModalInstance.element);
  }

  function handleSaveProduct(savedProduct) {
    if (typeof props.onSaveProduct === 'function') {
      props.onSaveProduct(savedProduct);
    }
    const pid = savedProduct.id ?? savedProduct.urunId;
    const existingIndex = products.findIndex((p) => (p.id ?? p.urunId) === pid);
    if (existingIndex !== -1) {
      products[existingIndex] = savedProduct;
    } else {
      products.unshift(savedProduct);
    }
    renderPage();
  }

  function closeActiveModal() {
    if (activeModalInstance && typeof activeModalInstance.close === 'function') {
      activeModalInstance.close();
      activeModalInstance = null;
    }
  }

  // ─── Main Render Function ───────────────────────────────────────────────────

  function renderPage() {
    container.innerHTML = '';

    // 1. Page Header
    const pageHeader = createAdminPageHeader({
      title: 'Ürünler',
      description: 'Ürünlerinizi yönetin, yeni ürünler ekleyin veya mevcut ürünleri düzenleyin.',
      primaryAction: {
        label: 'Yeni Ürün Ekle',
        icon: 'plus',
        onClick: openCreateModal,
      },
    });
    container.appendChild(pageHeader);

    // 2. Loading State Check
    if (isLoading) {
      const loadingEl = createLoadingState({ message: 'Ürünler yükleniyor...' });
      loadingEl.style.padding = 'var(--space-12) 0';
      container.appendChild(loadingEl);
      return;
    }

    // 3. Error State Check
    if (hasError) {
      const errorEl = createErrorState({
        title: 'Ürünler görüntülenemedi.',
        message: 'Ürün kataloğu yüklenirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.',
        retryLabel: 'Tekrar Dene',
        onRetry: () => {
          if (typeof props.onRetry === 'function') props.onRetry();
        },
      });
      container.appendChild(errorEl);
      return;
    }

    // 4. Initial Empty State Check (no products supplied at all)
    if (products.length === 0) {
      const emptyEl = createEmptyState({
        icon: 'box',
        title: 'Henüz ürün bulunamadı.',
        description: 'Kataloğunuzda kayıtlı ürün bulunmuyor. İlk ürününüzü eklemek için aşağıdaki butonu kullanabilirsiniz.',
        actionLabel: 'Yeni Ürün Ekle',
        onAction: openCreateModal,
      });
      container.appendChild(emptyEl);
      return;
    }

    // 5. Main Card with Filter Toolbar & Product Display Area
    const mainCard = document.createElement('div');
    mainCard.className = 'admin-card admin-products-card';

    // ── Toolbar ──
    const toolbar = document.createElement('div');
    toolbar.className = 'admin-products-toolbar';

    // Top row of toolbar: Search + Filters
    const toolbarFilters = document.createElement('div');
    toolbarFilters.className = 'admin-products-toolbar__filters';

    // Declarations for controls referenced in clearBtn
    let sortSelect;

    // Search Input Wrap
    const searchWrap = document.createElement('div');
    searchWrap.className = 'admin-products-toolbar__search';
    searchWrap.innerHTML = '<span class="admin-products-toolbar__search-icon"></span>';
    searchWrap.querySelector('.admin-products-toolbar__search-icon').appendChild(createIcon('search', { size: 16 }));

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'admin-products-toolbar__search-input';
    searchInput.placeholder = 'Ürün adı, SKU veya kategori ara...';
    searchInput.value = searchQuery;
    searchInput.setAttribute('aria-label', 'Ürün adı, SKU veya kategori ara');
    searchInput.addEventListener('input', (e) => {
      searchQuery = String(e?.target?.value ?? searchInput.value ?? '').trim().toLowerCase();
      currentPage = 1;
      updateDisplayArea();
    });
    searchWrap.appendChild(searchInput);
    toolbarFilters.appendChild(searchWrap);

    // Category Filter Dropdown
    const catSelect = document.createElement('select');
    catSelect.className = 'admin-select admin-products-toolbar__select';
    catSelect.setAttribute('aria-label', 'Kategoriye göre filtrele');

    const catAllOpt = document.createElement('option');
    catAllOpt.value = 'all';
    catAllOpt.textContent = 'Tüm Kategoriler';
    catSelect.appendChild(catAllOpt);

    categories.forEach((c) => {
      const opt = document.createElement('option');
      const val = typeof c === 'string' ? c : (c.name || c.ad || c.id);
      const label = typeof c === 'string' ? c : (c.name || c.ad || `Kategori ${c.id}`);
      opt.value = val;
      opt.textContent = label;
      if (selectedCategory === val) opt.selected = true;
      catSelect.appendChild(opt);
    });

    catSelect.addEventListener('change', (e) => {
      selectedCategory = e?.target?.value ?? catSelect.value;
      currentPage = 1;
      updateDisplayArea();
    });
    toolbarFilters.appendChild(catSelect);

    // Status Filter Dropdown
    const statusSelect = document.createElement('select');
    statusSelect.className = 'admin-select admin-products-toolbar__select';
    statusSelect.setAttribute('aria-label', 'Duruma göre filtrele');
    statusSelect.innerHTML = `
      <option value="all">Tüm Durumlar</option>
      <option value="active">Aktif</option>
      <option value="passive">Pasif</option>
    `;
    statusSelect.value = selectedStatus;
    statusSelect.addEventListener('change', (e) => {
      selectedStatus = e?.target?.value ?? statusSelect.value;
      currentPage = 1;
      updateDisplayArea();
    });
    toolbarFilters.appendChild(statusSelect);

    // Stock Filter Dropdown
    const stockSelect = document.createElement('select');
    stockSelect.className = 'admin-select admin-products-toolbar__select';
    stockSelect.setAttribute('aria-label', 'Stok durumuna göre filtrele');
    stockSelect.innerHTML = `
      <option value="all">Stok Durumu</option>
      <option value="in-stock">Stokta</option>
      <option value="low-stock">Düşük Stok</option>
      <option value="out-of-stock">Stokta Yok</option>
    `;
    stockSelect.value = selectedStock;
    stockSelect.addEventListener('change', (e) => {
      selectedStock = e?.target?.value ?? stockSelect.value;
      currentPage = 1;
      updateDisplayArea();
    });
    toolbarFilters.appendChild(stockSelect);

    function handleClearFilters() {
      searchQuery = '';
      selectedCategory = 'all';
      selectedStatus = 'all';
      selectedStock = 'all';
      sortOption = 'created-desc';
      currentPage = 1;

      searchInput.value = '';
      catSelect.value = 'all';
      statusSelect.value = 'all';
      stockSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'created-desc';

      updateDisplayArea();
    }

    // Clear Filters Button
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'admin-btn-clear';
    clearBtn.textContent = 'Temizle';
    clearBtn.setAttribute('aria-label', 'Filtreleri temizle');
    clearBtn.addEventListener('click', handleClearFilters);
    toolbarFilters.appendChild(clearBtn);

    toolbar.appendChild(toolbarFilters);

    // Bottom row of toolbar: Result Count + Sort + View Switch
    const toolbarMeta = document.createElement('div');
    toolbarMeta.className = 'admin-products-toolbar__meta';

    // Result Count
    const countEl = document.createElement('div');
    countEl.className = 'admin-products-toolbar__count';
    toolbarMeta.appendChild(countEl);

    // Right Controls Wrap (Sort + View Switch)
    const rightControls = document.createElement('div');
    rightControls.className = 'admin-products-toolbar__controls';

    // Sorting Dropdown
    const sortWrap = document.createElement('div');
    sortWrap.className = 'admin-products-toolbar__sort-wrap';

    const sortLabel = document.createElement('label');
    sortLabel.className = 'admin-products-toolbar__sort-label';
    sortLabel.htmlFor = 'admin-products-sort';
    sortLabel.textContent = 'Sıralama:';
    sortWrap.appendChild(sortLabel);

    sortSelect = document.createElement('select');
    sortSelect.id = 'admin-products-sort';
    sortSelect.className = 'admin-select admin-products-toolbar__sort-select';
    sortSelect.setAttribute('aria-label', 'Ürünleri sırala');
    sortSelect.innerHTML = `
      <option value="created-desc">Eklenme Tarihi (Yeni → Eski)</option>
      <option value="created-asc">Eklenme Tarihi (Eski → Yeni)</option>
      <option value="price-asc">Fiyat (Artan)</option>
      <option value="price-desc">Fiyat (Azalan)</option>
      <option value="name-asc">Ürün Adı (A → Z)</option>
      <option value="name-desc">Ürün Adı (Z → A)</option>
      <option value="stock-asc">Stok (Artan)</option>
      <option value="stock-desc">Stok (Azalan)</option>
    `;
    sortSelect.value = sortOption;
    sortSelect.addEventListener('change', (e) => {
      sortOption = e?.target?.value ?? sortSelect.value;
      currentPage = 1;
      updateDisplayArea();
    });
    sortWrap.appendChild(sortSelect);
    rightControls.appendChild(sortWrap);

    // Grid / List Toggle Switch
    const viewSwitch = document.createElement('div');
    viewSwitch.className = 'admin-view-switch';
    viewSwitch.setAttribute('role', 'group');
    viewSwitch.setAttribute('aria-label', 'Görünüm Seçimi');

    const gridBtn = document.createElement('button');
    gridBtn.type = 'button';
    gridBtn.className = `admin-view-switch__btn${viewMode === 'grid' ? ' is-active' : ''}`;
    gridBtn.setAttribute('aria-label', 'Grid Görünümü');
    gridBtn.setAttribute('title', 'Grid Görünümü');
    gridBtn.appendChild(createIcon('grid', { size: 16 }));
    gridBtn.addEventListener('click', () => {
      if (viewMode !== 'grid') {
        viewMode = 'grid';
        gridBtn.classList.add('is-active');
        listBtn.classList.remove('is-active');
        updateDisplayArea();
      }
    });
    viewSwitch.appendChild(gridBtn);

    const listBtn = document.createElement('button');
    listBtn.type = 'button';
    listBtn.className = `admin-view-switch__btn${viewMode === 'list' ? ' is-active' : ''}`;
    listBtn.setAttribute('aria-label', 'Liste Görünümü');
    listBtn.setAttribute('title', 'Liste Görünümü');
    listBtn.appendChild(createIcon('list', { size: 16 }));
    listBtn.addEventListener('click', () => {
      if (viewMode !== 'list') {
        viewMode = 'list';
        listBtn.classList.add('is-active');
        gridBtn.classList.remove('is-active');
        updateDisplayArea();
      }
    });
    viewSwitch.appendChild(listBtn);

    rightControls.appendChild(viewSwitch);
    toolbarMeta.appendChild(rightControls);
    toolbar.appendChild(toolbarMeta);

    mainCard.appendChild(toolbar);

    // Product Content Container (holds Grid or List)
    const displayContainer = document.createElement('div');
    displayContainer.className = 'admin-products-display';
    mainCard.appendChild(displayContainer);

    // Pagination Container
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'admin-products-pagination';
    mainCard.appendChild(paginationContainer);

    container.appendChild(mainCard);

    // ── Update Display Function ──
    function updateDisplayArea() {
      displayContainer.innerHTML = '';
      paginationContainer.innerHTML = '';

      const filtered = getFilteredAndSortedProducts();
      countEl.textContent = `${filtered.length} ürün bulundu`;

      // Filtered Empty State
      if (filtered.length === 0) {
        const filteredEmpty = document.createElement('div');
        filteredEmpty.className = 'admin-filtered-empty';
        filteredEmpty.innerHTML = `
          <div class="admin-filtered-empty__icon"></div>
          <h3 class="admin-filtered-empty__title">Aramanızla eşleşen ürün bulunamadı.</h3>
          <p class="admin-filtered-empty__desc">Filtreleri veya arama kriterini değiştirip tekrar deneyebilirsiniz.</p>
        `;
        filteredEmpty.querySelector('.admin-filtered-empty__icon').appendChild(createIcon('search', { size: 36 }));

        const resetFilterBtn = document.createElement('button');
        resetFilterBtn.type = 'button';
        resetFilterBtn.className = 'btn btn--secondary';
        resetFilterBtn.textContent = 'Filtreleri Temizle';
        resetFilterBtn.addEventListener('click', handleClearFilters);
        filteredEmpty.appendChild(resetFilterBtn);

        displayContainer.appendChild(filteredEmpty);
        return;
      }

      // Pagination Slicing
      const totalPages = Math.ceil(filtered.length / pageSize);
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIndex = (currentPage - 1) * pageSize;
      const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

      // Render Grid or List
      if (viewMode === 'grid') {
        const gridView = createAdminProductGrid({
          products: paginatedItems,
          onView: openDetailModal,
          onEdit: openEditModal,
          onDelete: openDeleteModal,
        });
        displayContainer.appendChild(gridView);
      } else {
        const listView = createAdminProductList({
          products: paginatedItems,
          onView: openDetailModal,
          onEdit: openEditModal,
          onDelete: openDeleteModal,
        });
        displayContainer.appendChild(listView);
      }

      // Render Pagination
      const paginationEl = createAdminPagination({
        currentPage,
        totalPages,
        totalItems: filtered.length,
        pageSize,
        onPageChange: (newPage) => {
          currentPage = newPage;
          if (typeof props.onPageChange === 'function') {
            props.onPageChange(newPage);
          }
          updateDisplayArea();
          mainCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
      });
      paginationContainer.appendChild(paginationEl);
    }

    // Initial display render
    updateDisplayArea();
  }

  renderPage();

  return {
    element: layout.element,
    destroy: () => {
      closeActiveModal();
      layout.destroy();
    },
  };
}
