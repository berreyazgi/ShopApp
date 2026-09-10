/**
 * AdminProductList.js — Product Data Table View Component
 *
 * Renders a collection of products in tabular list format.
 * Reuses the same product data and callbacks as the grid view.
 * Zero demo products, zero hardcoded records, zero API calls.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createAdminStatusBadge } from './AdminStatusBadge.js';
import { createProductStockBadge } from './AdminProductCard.js';

/**
 * @param {{
 *   products: any[],
 *   onEdit?: (product: any) => void,
 *   onDelete?: (product: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminProductList({ products = [], onEdit, onDelete }) {
  const tableWrap = document.createElement('div');
  tableWrap.className = 'admin-table-wrap';

  const table = document.createElement('table');
  table.className = 'admin-table admin-products-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Ürün</th>
        <th scope="col">SKU</th>
        <th scope="col">Kategori</th>
        <th scope="col">Fiyat</th>
        <th scope="col">Stok</th>
        <th scope="col">Durum</th>
        <th scope="col" style="text-align: right;">İşlemler</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement('tbody');

  products.forEach((p) => {
    const row = document.createElement('tr');
    row.setAttribute('data-product-id', String(p.id ?? p.urunId ?? ''));

    const name = p.name || p.ad || 'İsimsiz Ürün';
    const sku = p.sku || p.barkod || p.kod || '—';
    const category = p.category || p.kategori || '—';
    const price = p.price ?? p.fiyat;
    const isActive = p.isActive !== undefined ? p.isActive : (p.aktiflik ?? true);
    const imgUrl = p.imageUrl || p.gorselUrl || (Array.isArray(p.images) ? p.images[0] : null);

    // 1. Ürün (Thumb + Name)
    const nameTd = document.createElement('td');
    const cell = document.createElement('div');
    cell.className = 'admin-table-cell--name';

    const thumb = document.createElement('div');
    thumb.className = 'admin-table-thumb';
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = name;
      img.loading = 'lazy';
      img.onerror = () => {
        thumb.innerHTML = '';
        thumb.appendChild(createIcon('box', { size: 16 }));
      };
      thumb.appendChild(img);
    } else {
      thumb.appendChild(createIcon('box', { size: 16 }));
    }
    cell.appendChild(thumb);

    const nameSpan = document.createElement('span');
    nameSpan.style.fontWeight = 'var(--font-medium)';
    nameSpan.textContent = name;
    cell.appendChild(nameSpan);

    nameTd.appendChild(cell);
    row.appendChild(nameTd);

    // 2. SKU
    const skuTd = document.createElement('td');
    skuTd.className = 'admin-products-table__sku-col';
    skuTd.textContent = sku;
    row.appendChild(skuTd);

    // 3. Kategori
    const catTd = document.createElement('td');
    catTd.textContent = category;
    row.appendChild(catTd);

    // 4. Fiyat
    const priceTd = document.createElement('td');
    priceTd.textContent = price !== undefined && price !== null ? formatPrice(price) : '—';
    row.appendChild(priceTd);

    // 5. Stok (Hybrid Badge)
    const stockTd = document.createElement('td');
    stockTd.appendChild(createProductStockBadge(p));
    row.appendChild(stockTd);

    // 6. Durum (Status Badge)
    const statusTd = document.createElement('td');
    statusTd.appendChild(createAdminStatusBadge({ isActive }));
    row.appendChild(statusTd);

    // 7. İşlemler
    const actionsTd = document.createElement('td');
    actionsTd.style.textAlign = 'right';

    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'admin-table-actions';
    actionsWrap.style.justifyContent = 'flex-end';

    // Edit
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'admin-table-btn admin-table-btn--edit';
    editBtn.setAttribute('aria-label', `${name} düzenle`);
    editBtn.title = 'Düzenle';
    editBtn.appendChild(createIcon('edit', { size: 14 }));
    editBtn.addEventListener('click', () => {
      if (typeof onEdit === 'function') onEdit(p);
    });
    actionsWrap.appendChild(editBtn);

    // Delete
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'admin-table-btn admin-table-btn--delete';
    deleteBtn.setAttribute('aria-label', `${name} sil`);
    deleteBtn.title = 'Sil';
    deleteBtn.appendChild(createIcon('trash', { size: 14 }));
    deleteBtn.addEventListener('click', () => {
      if (typeof onDelete === 'function') onDelete(p);
    });
    actionsWrap.appendChild(deleteBtn);

    actionsTd.appendChild(actionsWrap);
    row.appendChild(actionsTd);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableWrap.appendChild(table);

  return tableWrap;
}
