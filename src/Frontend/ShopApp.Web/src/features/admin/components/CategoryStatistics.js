/**
 * CategoryStatistics.js — Category Management Metrics Row
 *
 * Derives safe statistics dynamically from supplied category data:
 *  - Ana Kategori (count of root categories)
 *  - Toplam Kategori (total categories)
 *  - Toplam Ürün (sum of supplied productCount, or '—' if unavailable)
 *  - Aktif Kategori Oranı (% active, or '—')
 *
 * Strictly zero fake/hardcoded numbers.
 */

import { createAdminMetricCard } from './AdminMetricCard.js';

/**
 * @param {{
 *   categories?: Array,
 *   statistics?: { totalCategories?: number, rootCategories?: number, totalProducts?: number, activeRatio?: string } | null,
 * }} options
 * @returns {HTMLElement}
 */
export function createCategoryStatistics({ categories = [], statistics = null } = {}) {
  const grid = document.createElement('div');
  grid.className = 'admin-metrics-grid';

  let totalCategories = statistics?.totalCategories ?? null;
  let rootCategories = statistics?.rootCategories ?? null;
  let totalProducts = statistics?.totalProducts ?? null;
  let activeRatio = statistics?.activeRatio ?? null;

  // Derive frontend-safe metrics if raw categories collection is supplied
  if (Array.isArray(categories) && categories.length > 0) {
    if (totalCategories === null) totalCategories = categories.length;

    if (rootCategories === null) {
      rootCategories = categories.filter((c) => {
        const parentId = c.parentId ?? c.parentCategoryId ?? c.ustKategoriId ?? null;
        return !parentId;
      }).length;
    }

    if (activeRatio === null) {
      const activeCount = categories.filter((c) => {
        return c.isActive !== undefined ? c.isActive : (c.aktiflik ?? true);
      }).length;
      activeRatio = `%${Math.round((activeCount / categories.length) * 100)}`;
    }

    if (totalProducts === null) {
      const hasCounts = categories.some((c) => (c.productCount ?? c.urunSayisi) !== undefined && (c.productCount ?? c.urunSayisi) !== null);
      if (hasCounts) {
        totalProducts = categories.reduce((sum, c) => sum + (Number(c.productCount ?? c.urunSayisi) || 0), 0);
      }
    }
  } else if (Array.isArray(categories) && categories.length === 0 && !statistics) {
    totalCategories = 0;
    rootCategories = 0;
    activeRatio = '—';
    totalProducts = '—';
  }

  // 1. Ana Kategori
  grid.appendChild(createAdminMetricCard({
    icon: 'folder',
    label: 'Ana Kategori',
    value: rootCategories,
    tone: 'default',
  }));

  // 2. Toplam Kategori
  grid.appendChild(createAdminMetricCard({
    icon: 'layers',
    label: 'Toplam Kategori',
    value: totalCategories,
    tone: 'purple',
  }));

  // 3. Toplam Ürün (render '—' if missing)
  grid.appendChild(createAdminMetricCard({
    icon: 'box',
    label: 'Toplam Ürün',
    value: totalProducts,
    tone: 'success',
  }));

  // 4. Aktif Kategori Oranı
  grid.appendChild(createAdminMetricCard({
    icon: 'check',
    label: 'Aktif Kategori Oranı',
    value: activeRatio,
    tone: 'warning',
  }));

  return grid;
}
