/**
 * AdminCategoriesPage.js — Category Management Admin Page
 *
 * Implements the 3-column layout (Option A):
 *  - Top: Page Header + Category Statistics
 *  - 3-Column Grid: Category Tree (Left) | Category Table (Center) | Category Form Panel (Right)
 *  - Bottom: Recent Categories
 *
 * Data Contract:
 *  - Receives `initialData` or defaults to safe dynamic state.
 *  - ZERO hardcoded or demo records.
 *  - ZERO API/fetch calls — ready for developer's API integration.
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createCategoryStatistics } from '../components/CategoryStatistics.js';
import { createCategoryTree } from '../components/CategoryTree.js';
import { createCategoryTable } from '../components/CategoryTable.js';
import { createCategoryFormPanel } from '../components/CategoryFormPanel.js';
import { createRecentCategoriesCard } from '../components/RecentCategoriesCard.js';
import { createAdminConfirmModal } from '../components/AdminConfirmModal.js';
import {
  getCategoriesSync,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../categories/services/categoryService.js';

/**
 * @param {{
 *   categories?: Array,
 *   statistics?: any,
 *   recentCategories?: Array,
 *   onSaveCategory?: (data: any) => void,
 *   onDeleteCategory?: (categoryId: any) => void,
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminCategoriesPage(props = {}) {
  // Business data supplied via props or dynamic single source of truth (defaults to empty array)
  let categories = props.categories ?? getCategoriesSync();
  let statistics = props.statistics ?? null;
  let recentCategories = props.recentCategories ?? [...categories].slice(0, 5);

  const layout = createAdminLayout({ currentPath: '/admin/kategoriler' });
  const container = layout.contentArea;

  let activeConfirmModal = null;
  let formPanel = null;
  let treeComponent = null;
  let tableComponent = null;
  let statsComponent = null;
  let recentComponent = null;

  function renderPage() {
    container.innerHTML = '';

    // 1. Page Header
    const pageHeader = createAdminPageHeader({
      title: 'Kategoriler',
      description: 'Ürün kategorilerinizi yönetin, yeni kategoriler ekleyin veya mevcut kategorileri düzenleyin.',
      primaryAction: {
        label: 'Yeni Kategori Ekle',
        icon: 'plus',
        onClick: () => {
          formPanel?.reset();
          formPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
      },
    });
    container.appendChild(pageHeader);

    // 2. Statistics Row
    statsComponent = createCategoryStatistics({ categories, statistics });
    container.appendChild(statsComponent);

    // 3. 3-Column Category Grid (Tree | Table | Form)
    const grid = document.createElement('div');
    grid.className = 'admin-category-grid';

    // Left: Category Tree
    treeComponent = createCategoryTree({
      categories,
      onSelect: (cat) => {
        formPanel?.setCategory(cat);
      },
    });
    grid.appendChild(treeComponent);

    // Center: Category Table
    tableComponent = createCategoryTable({
      categories,
      onEdit: (cat) => {
        formPanel?.setCategory(cat);
        formPanel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      onDelete: (cat) => {
        const catId = cat.id ?? cat.kategoriId;
        const catName = cat.name || cat.ad || 'Bu kategoriyi';

        activeConfirmModal = createAdminConfirmModal({
          title: 'Kategoriyi Sil',
          message: `"${catName}" kategorisini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
          confirmLabel: 'Sil',
          onConfirm: async () => {
            try {
              // Persist to the real backend (DELETE /api/admin/kategori/{id})
              await deleteCategory(catId);
              categories = getCategoriesSync();
              recentCategories = recentCategories.filter((c) => (c.id ?? c.kategoriId) !== catId);
              if (typeof props.onDeleteCategory === 'function') {
                props.onDeleteCategory(catId);
              }
              renderPage();
            } catch (err) {
              // e.g. 409 Conflict: category still has child categories or products
              alert(err?.message || 'Kategori silinemedi.');
            }
          },
        });
        document.body.appendChild(activeConfirmModal.element);
      },
    });
    grid.appendChild(tableComponent);

    // Right: Category Form Panel (Create / Edit)
    formPanel = createCategoryFormPanel({
      categories,
      onSave: async (payload) => {
        try {
          let savedCategory;
          if (payload.id) {
            savedCategory = await updateCategory(payload);
          } else {
            // Persist to the real backend (POST /api/admin/kategori)
            savedCategory = await addCategory(payload);
            recentCategories = [savedCategory, ...recentCategories].slice(0, 5);
          }
          categories = getCategoriesSync();

          if (typeof props.onSaveCategory === 'function') {
            props.onSaveCategory(savedCategory || payload);
          }

          renderPage();
        } catch (err) {
          alert(err?.message || 'Kategori kaydedilemedi.');
        }
      },
      onCancel: () => {
        formPanel?.reset();
      },
    });
    grid.appendChild(formPanel);

    container.appendChild(grid);

    // 4. Recent Categories
    recentComponent = createRecentCategoriesCard({
      recentCategories,
      onSelect: (cat) => {
        formPanel?.setCategory(cat);
        formPanel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
    });
    container.appendChild(recentComponent);
  }

  renderPage();

  let destroyed = false;
  if (!props.categories) {
    // Refresh from the real backend (GET /api/kategori) after the initial render.
    getCategories()
      .then((fetched) => {
        if (destroyed) return;
        categories = fetched;
        recentCategories = [...categories].slice(0, 5);
        renderPage();
      })
      .catch((err) => console.error('[AdminCategoriesPage] failed to load categories:', err));
  }

  function destroy() {
    destroyed = true;
    activeConfirmModal?.close();
    layout.destroy();
  }

  return {
    element: layout.element,
    destroy,
  };
}
