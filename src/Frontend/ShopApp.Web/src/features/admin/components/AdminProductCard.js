/**
 * AdminProductCard.js — Reusable Admin Product Card Component
 *
 * Renders an individual product in grid view based purely on supplied data.
 * Zero demo products, zero hardcoded records, zero API calls.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createAdminStatusBadge } from './AdminStatusBadge.js';

/**
 * Creates the hybrid stock status badge per admin specifications:
 * - stock === 0: Danger badge labeled "Tükendi"
 * - 1 <= stock <= 5: Warning badge labeled "Düşük Stok (Son X Adet)"
 * - stock > 5: Success badge labeled "Stokta (X Adet)"
 * - missing/null: Neutral badge labeled "—"
 *
 * @param {any} product
 * @returns {HTMLElement}
 */
export function createProductStockBadge(product) {
  const badge = document.createElement('span');
  badge.className = 'admin-status-badge';

  const stockVal = product?.stock ?? product?.stok;
  const stockStatus = product?.stockStatus || product?.stokDurumu;

  let text = '—';
  let tone = 'neutral';

  if (stockStatus) {
    const s = String(stockStatus).toLowerCase();
    if (s.includes('out') || s.includes('tüken') || s.includes('yok')) {
      tone = 'danger';
      text = 'Tükendi';
    } else if (s.includes('low') || s.includes('düşük') || s.includes('kritik')) {
      tone = 'warning';
      text = stockVal !== undefined && stockVal !== null ? `Düşük Stok (Son ${stockVal} Adet)` : 'Düşük Stok';
    } else if (s.includes('in') || s.includes('stokta') || s.includes('var')) {
      tone = 'success';
      text = stockVal !== undefined && stockVal !== null ? `Stokta (${stockVal} Adet)` : 'Stokta';
    }
  } else if (stockVal !== undefined && stockVal !== null) {
    const num = Number(stockVal);
    if (num === 0) {
      tone = 'danger';
      text = 'Tükendi';
    } else if (num <= 5) {
      tone = 'warning';
      text = `Düşük Stok (Son ${num} Adet)`;
    } else {
      tone = 'success';
      text = `Stokta (${num} Adet)`;
    }
  } else {
    tone = 'neutral';
    text = '—';
  }

  badge.classList.add(`admin-status-badge--${tone}`);

  const dot = document.createElement('span');
  dot.className = 'admin-status-badge__dot';
  dot.setAttribute('aria-hidden', 'true');
  badge.appendChild(dot);

  const textEl = document.createElement('span');
  textEl.textContent = text;
  badge.appendChild(textEl);

  return badge;
}

/**
 * @param {{
 *   product: any,
 *   onView?: (product: any) => void,
 *   onEdit?: (product: any) => void,
 *   onDelete?: (product: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminProductCard({ product, onView, onEdit, onDelete }) {
  const card = document.createElement('article');
  card.className = 'admin-product-card';
  card.setAttribute('data-product-id', String(product.id ?? product.urunId ?? ''));

  const name = product.name || product.ad || 'İsimsiz Ürün';
  const category = product.category || product.kategori || 'Kategori belirtilmemiş';
  const sku = product.sku || product.barkod || product.kod || null;
  const price = product.price ?? product.fiyat;
  const isActive = product.isActive !== undefined ? product.isActive : (product.aktiflik ?? true);
  const imageUrl = product.imageUrl || product.gorselUrl || (Array.isArray(product.images) ? product.images[0] : null);

  // 1. Image Header
  const imageWrap = document.createElement('div');
  imageWrap.className = 'admin-product-card__image-wrap';

  if (imageUrl) {
    const img = document.createElement('img');
    img.className = 'admin-product-card__img';
    img.src = imageUrl;
    img.alt = name;
    img.loading = 'lazy';
    img.onerror = () => {
      imageWrap.innerHTML = '';
      imageWrap.appendChild(createPlaceholderIcon());
    };
    imageWrap.appendChild(img);
  } else {
    imageWrap.appendChild(createPlaceholderIcon());
  }

  function createPlaceholderIcon() {
    const placeholder = document.createElement('div');
    placeholder.className = 'admin-product-card__placeholder';
    placeholder.appendChild(createIcon('box', { size: 36 }));
    return placeholder;
  }

  // Top badges overlay
  const badgeOverlay = document.createElement('div');
  badgeOverlay.className = 'admin-product-card__badges';
  badgeOverlay.appendChild(createAdminStatusBadge({ isActive }));
  imageWrap.appendChild(badgeOverlay);

  card.appendChild(imageWrap);

  // 2. Content Body
  const body = document.createElement('div');
  body.className = 'admin-product-card__body';

  // Category & SKU row
  const metaRow = document.createElement('div');
  metaRow.className = 'admin-product-card__meta-row';

  const catSpan = document.createElement('span');
  catSpan.className = 'admin-product-card__category';
  catSpan.textContent = category;
  metaRow.appendChild(catSpan);

  if (sku) {
    const skuSpan = document.createElement('span');
    skuSpan.className = 'admin-product-card__sku';
    skuSpan.textContent = `SKU: ${sku}`;
    metaRow.appendChild(skuSpan);
  }
  body.appendChild(metaRow);

  // Title
  const title = document.createElement('h4');
  title.className = 'admin-product-card__title';
  title.title = name;
  title.textContent = name;
  body.appendChild(title);

  // Price & Stock Row
  const priceStockRow = document.createElement('div');
  priceStockRow.className = 'admin-product-card__price-row';

  const priceEl = document.createElement('span');
  priceEl.className = 'admin-product-card__price';
  priceEl.textContent = price !== undefined && price !== null ? formatPrice(price) : '—';
  priceStockRow.appendChild(priceEl);

  const stockBadge = createProductStockBadge(product);
  priceStockRow.appendChild(stockBadge);

  body.appendChild(priceStockRow);
  card.appendChild(body);

  // 3. Actions Footer
  const footer = document.createElement('div');
  footer.className = 'admin-product-card__footer';

  // View Button
  const viewBtn = document.createElement('button');
  viewBtn.type = 'button';
  viewBtn.className = 'admin-product-card__action-btn';
  viewBtn.setAttribute('aria-label', `${name} detaylarını görüntüle`);
  viewBtn.title = 'Görüntüle';
  viewBtn.appendChild(createIcon('eye', { size: 15 }));
  viewBtn.addEventListener('click', () => {
    if (typeof onView === 'function') onView(product);
  });
  footer.appendChild(viewBtn);

  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'admin-product-card__action-btn';
  editBtn.setAttribute('aria-label', `${name} düzenle`);
  editBtn.title = 'Düzenle';
  editBtn.appendChild(createIcon('edit', { size: 15 }));
  editBtn.addEventListener('click', () => {
    if (typeof onEdit === 'function') onEdit(product);
  });
  footer.appendChild(editBtn);

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'admin-product-card__action-btn admin-product-card__action-btn--delete';
  deleteBtn.setAttribute('aria-label', `${name} sil`);
  deleteBtn.title = 'Sil';
  deleteBtn.appendChild(createIcon('trash', { size: 15 }));
  deleteBtn.addEventListener('click', () => {
    if (typeof onDelete === 'function') onDelete(product);
  });
  footer.appendChild(deleteBtn);

  card.appendChild(footer);

  return card;
}
