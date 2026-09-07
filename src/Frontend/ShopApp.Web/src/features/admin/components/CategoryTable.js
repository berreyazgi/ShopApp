/**
 * CategoryTable.js — Admin Category Table Component
 *
 * Renders categories dynamically into an accessible data table.
 * Zero hardcoded rows or demo records.
 *
 * Features:
 *  - Local search by category name / description
 *  - Filter by category type (Tüm, Ana, Alt, Aktif, Pasif)
 *  - Dynamic pagination
 *  - Edit & Delete action buttons
 *  - Context-aware empty states
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { createAdminStatusBadge } from './AdminStatusBadge.js';
import { createAdminPagination } from './AdminPagination.js';

/**
 * @param {{
 *   categories: Array,
 *   pageSize?: number,
 *   onEdit?: (category: any) => void,
 *   onDelete?: (category: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createCategoryTable({
  categories = [],
  pageSize = 8,
  onEdit,
  onDelete,
}) {
  const panel = document.createElement('div');
  panel.className = 'admin-card admin-category-table-panel';

  // Local Presentation State
  let searchQuery = '';
  let selectedFilter = 'all'; // all, root, sub, active, passive
  let currentPage = 1;

  // ── Header Toolbar ──
  const toolbar = document.createElement('div');
  toolbar.className = 'admin-table-toolbar';

  // Search input
  const searchWrap = document.createElement('div');
  searchWrap.className = 'admin-table-toolbar__search';
  searchWrap.innerHTML = '<span class="admin-table-toolbar__search-icon"></span>';
  searchWrap.querySelector('.admin-table-toolbar__search-icon').appendChild(createIcon('search', { size: 14 }));

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'admin-table-toolbar__search-input';
  searchInput.placeholder = 'Kategori ara...';
  searchInput.setAttribute('aria-label', 'Kategori ara');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    currentPage = 1;
    render();
  });
  searchWrap.appendChild(searchInput);
  toolbar.appendChild(searchWrap);

  // Filter dropdown
  const filterSelect = document.createElement('select');
  filterSelect.className = 'admin-table-toolbar__filter';
  filterSelect.setAttribute('aria-label', 'Kategori filtresi');
  filterSelect.innerHTML = `
    <option value="all">Tüm Kategoriler</option>
    <option value="root">Ana Kategoriler</option>
    <option value="sub">Alt Kategoriler</option>
    <option value="active">Aktif</option>
    <option value="passive">Pasif</option>
  `;
  filterSelect.addEventListener('change', (e) => {
    selectedFilter = e.target.value;
    currentPage = 1;
    render();
  });
  toolbar.appendChild(filterSelect);

  panel.appendChild(toolbar);

  // ── Table Container ──
  const tableWrap = document.createElement('div');
  tableWrap.className = 'admin-table-wrap';
  panel.appendChild(tableWrap);

  // ── Pagination Container ──
  const paginationWrap = document.createElement('div');
  panel.appendChild(paginationWrap);

  function getFilteredData() {
    return categories.filter((cat) => {
      const name = (cat.name || cat.ad || '').toLowerCase();
      const desc = (cat.description || cat.aciklama || '').toLowerCase();
      const matchesSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);
      if (!matchesSearch) return false;

      const parentId = cat.parentId ?? cat.parentCategoryId ?? cat.ustKategoriId ?? null;
      const isActive = cat.isActive !== undefined ? cat.isActive : (cat.aktiflik ?? true);

      if (selectedFilter === 'root') return !parentId;
      if (selectedFilter === 'sub') return !!parentId;
      if (selectedFilter === 'active') return !!isActive;
      if (selectedFilter === 'passive') return !isActive;
      return true;
    });
  }

  function render() {
    tableWrap.innerHTML = '';
    paginationWrap.innerHTML = '';

    const filtered = getFilteredData();

    if (categories.length === 0) {
      const empty = document.createElement('div');
      empty.style.padding = 'var(--space-8)';
      empty.style.textAlign = 'center';
      empty.style.color = 'var(--color-secondary)';
      empty.innerHTML = `
        <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Henüz kategori oluşturulmamış.</p>
        <p style="font-size:var(--text-xs); margin:0;">Yeni bir kategori eklemek için sağdaki formu kullanabilirsiniz.</p>
      `;
      tableWrap.appendChild(empty);
      return;
    }

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.style.padding = 'var(--space-8)';
      empty.style.textAlign = 'center';
      empty.style.color = 'var(--color-secondary)';
      empty.innerHTML = `
        <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Aramanızla eşleşen kategori bulunamadı.</p>
        <p style="font-size:var(--text-xs); margin:0;">Arama terimini veya filtreyi değiştirerek tekrar deneyebilirsiniz.</p>
      `;
      tableWrap.appendChild(empty);
      return;
    }

    // Pagination slice
    const totalPages = Math.ceil(filtered.length / pageSize);
    if (currentPage > totalPages) currentPage = totalPages;
    const startIdx = (currentPage - 1) * pageSize;
    const paginatedItems = filtered.slice(startIdx, startIdx + pageSize);

    const table = document.createElement('table');
    table.className = 'admin-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th scope="col" style="width: 36px;">
            <input type="checkbox" aria-label="Tümünü seç" />
          </th>
          <th scope="col">Ad</th>
          <th scope="col">Üst Kategori</th>
          <th scope="col">Ürün Sayısı</th>
          <th scope="col">Durum</th>
          <th scope="col" style="text-align: right;">İşlemler</th>
        </tr>
      </thead>
    `;

    const tbody = document.createElement('tbody');

    paginatedItems.forEach((cat) => {
      const row = document.createElement('tr');

      const name = cat.name || cat.ad || 'İsimsiz Kategori';
      const parentName = cat.parentName || cat.ustKategoriAdi || (cat.parentId ? 'Alt Kategori' : 'Ana Kategori');
      const productCount = cat.productCount ?? cat.urunSayisi;
      const isActive = cat.isActive !== undefined ? cat.isActive : (cat.aktiflik ?? true);
      const imageUrl = cat.imageUrl || cat.gorselUrl || null;

      // 1. Checkbox
      const checkTd = document.createElement('td');
      const checkInput = document.createElement('input');
      checkInput.type = 'checkbox';
      checkInput.setAttribute('aria-label', `${name} seç`);
      checkTd.appendChild(checkInput);
      row.appendChild(checkTd);

      // 2. Name & Thumbnail
      const nameTd = document.createElement('td');
      const nameCell = document.createElement('div');
      nameCell.className = 'admin-table-cell--name';

      const thumb = document.createElement('div');
      thumb.className = 'admin-table-thumb';
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;
        thumb.appendChild(img);
      } else {
        thumb.appendChild(createIcon('image', { size: 16 }));
      }
      nameCell.appendChild(thumb);

      const nameText = document.createElement('span');
      nameText.style.fontWeight = 'var(--font-medium)';
      nameText.textContent = name;
      nameCell.appendChild(nameText);

      nameTd.appendChild(nameCell);
      row.appendChild(nameTd);

      // 3. Parent Category
      const parentTd = document.createElement('td');
      parentTd.textContent = parentName;
      row.appendChild(parentTd);

      // 4. Product Count (Render '—' if unavailable)
      const countTd = document.createElement('td');
      countTd.textContent = productCount !== undefined && productCount !== null ? String(productCount) : '—';
      row.appendChild(countTd);

      // 5. Status
      const statusTd = document.createElement('td');
      statusTd.appendChild(createAdminStatusBadge({ isActive }));
      row.appendChild(statusTd);

      // 6. Actions (Düzenle & Sil)
      const actionsTd = document.createElement('td');
      actionsTd.style.textAlign = 'right';

      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'admin-table-actions';
      actionsWrap.style.justifyContent = 'flex-end';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'admin-table-btn';
      editBtn.setAttribute('aria-label', `${name} düzenle`);
      editBtn.title = 'Düzenle';
      editBtn.appendChild(createIcon('edit', { size: 14 }));
      editBtn.addEventListener('click', () => {
        if (typeof onEdit === 'function') onEdit(cat);
      });
      actionsWrap.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'admin-table-btn admin-table-btn--delete';
      deleteBtn.setAttribute('aria-label', `${name} sil`);
      deleteBtn.title = 'Sil';
      deleteBtn.appendChild(createIcon('trash', { size: 14 }));
      deleteBtn.addEventListener('click', () => {
        if (typeof onDelete === 'function') onDelete(cat);
      });
      actionsWrap.appendChild(deleteBtn);

      actionsTd.appendChild(actionsWrap);
      row.appendChild(actionsTd);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableWrap.appendChild(table);

    // Pagination
    const pagination = createAdminPagination({
      currentPage,
      totalPages,
      totalItems: filtered.length,
      pageSize,
      onPageChange: (newPage) => {
        currentPage = newPage;
        render();
      },
    });
    paginationWrap.appendChild(pagination);
  }

  render();
  return panel;
}
