/**
 * AdminProductDetailModal.js — Accessible Product Details Modal Component
 *
 * Renders full details of a supplied product in a read-only modal dialog (Option A).
 * Zero demo products, zero hardcoded records, zero API calls.
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createAdminStatusBadge } from './AdminStatusBadge.js';
import { createProductStockBadge } from './AdminProductCard.js';

/**
 * @param {{
 *   product: any,
 *   onEdit?: (product: any) => void,
 *   onClose?: () => void,
 * }} options
 * @returns {{ element: HTMLElement, close: () => void }}
 */
export function createAdminProductDetailModal({ product, onEdit, onClose } = {}) {
  const name = product?.name || product?.ad || 'İsimsiz Ürün';
  const category = product?.category || product?.kategori || 'Kategori belirtilmemiş';
  const sku = product?.sku || product?.barkod || product?.kod || null;
  const price = product?.price ?? product?.fiyat;
  const description = product?.description || product?.aciklama || 'Ürün açıklaması belirtilmemiş.';
  const isActive = product?.isActive !== undefined ? product.isActive : (product?.aktiflik ?? true);
  const imageUrl = product?.imageUrl || product?.gorselUrl || (Array.isArray(product?.images) ? product.images[0] : null);

  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${name} Detayları`);

  const modal = document.createElement('div');
  modal.className = 'admin-modal admin-product-detail-modal';

  // 1. Header
  const header = document.createElement('div');
  header.className = 'admin-modal__header';

  const titleEl = document.createElement('h3');
  titleEl.className = 'admin-modal__title';
  titleEl.textContent = 'Ürün Detayları';
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'admin-modal__close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

  modal.appendChild(header);

  // 2. Body
  const body = document.createElement('div');
  body.className = 'admin-modal__body admin-product-detail-modal__body';

  // Two columns: Left = image, Right = attributes
  const detailsGrid = document.createElement('div');
  detailsGrid.className = 'admin-product-detail-modal__grid';

  // Left: Image preview
  const imageWrap = document.createElement('div');
  imageWrap.className = 'admin-product-detail-modal__image-wrap';

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    img.className = 'admin-product-detail-modal__img';
    img.onerror = () => {
      imageWrap.innerHTML = '';
      imageWrap.appendChild(createBoxPlaceholder());
    };
    imageWrap.appendChild(img);
  } else {
    imageWrap.appendChild(createBoxPlaceholder());
  }

  function createBoxPlaceholder() {
    const box = document.createElement('div');
    box.className = 'admin-product-detail-modal__placeholder';
    box.appendChild(createIcon('box', { size: 48 }));
    return box;
  }
  detailsGrid.appendChild(imageWrap);

  // Right: Content attributes
  const infoCol = document.createElement('div');
  infoCol.className = 'admin-product-detail-modal__info';

  // Category & SKU badges
  const metaRow = document.createElement('div');
  metaRow.className = 'admin-product-detail-modal__meta-row';

  const catTag = document.createElement('span');
  catTag.className = 'admin-product-card__category';
  catTag.textContent = category;
  metaRow.appendChild(catTag);

  if (sku) {
    const skuTag = document.createElement('span');
    skuTag.className = 'admin-product-card__sku';
    skuTag.textContent = `SKU: ${sku}`;
    metaRow.appendChild(skuTag);
  }
  infoCol.appendChild(metaRow);

  // Title
  const title = document.createElement('h2');
  title.className = 'admin-product-detail-modal__title';
  title.textContent = name;
  infoCol.appendChild(title);

  // Price & Statuses
  const statusRow = document.createElement('div');
  statusRow.className = 'admin-product-detail-modal__status-row';

  const priceEl = document.createElement('span');
  priceEl.className = 'admin-product-detail-modal__price';
  priceEl.textContent = price !== undefined && price !== null ? formatPrice(price) : '—';
  statusRow.appendChild(priceEl);

  statusRow.appendChild(createProductStockBadge(product));
  statusRow.appendChild(createAdminStatusBadge({ isActive }));

  infoCol.appendChild(statusRow);

  // Description Section
  const descSection = document.createElement('div');
  descSection.className = 'admin-product-detail-modal__desc-section';

  const descTitle = document.createElement('h5');
  descTitle.className = 'admin-product-detail-modal__section-title';
  descTitle.textContent = 'Açıklama';
  descSection.appendChild(descTitle);

  const descText = document.createElement('p');
  descText.className = 'admin-product-detail-modal__desc-text';
  descText.textContent = description;
  descSection.appendChild(descText);

  infoCol.appendChild(descSection);

  // Dates / Metadata if present
  if (product?.createdAt || product?.olusturmaTarihi) {
    const dateText = document.createElement('p');
    dateText.className = 'admin-product-detail-modal__date';
    const dateVal = product.createdAt || product.olusturmaTarihi;
    dateText.textContent = `Eklenme Tarihi: ${new Date(dateVal).toLocaleDateString('tr-TR')}`;
    infoCol.appendChild(dateText);
  }

  detailsGrid.appendChild(infoCol);
  body.appendChild(detailsGrid);
  modal.appendChild(body);

  // 3. Footer
  const footer = document.createElement('div');
  footer.className = 'admin-modal__footer';

  const { element: closeFooterBtn } = createButton({
    label: 'Kapat',
    variant: 'secondary',
    onClick: close,
  });
  footer.appendChild(closeFooterBtn);

  if (typeof onEdit === 'function') {
    const { element: editBtn } = createButton({
      label: 'Düzenle',
      variant: 'primary',
      icon: 'edit',
      onClick: () => {
        close();
        onEdit(product);
      },
    });
    footer.appendChild(editBtn);
  }

  modal.appendChild(footer);
  overlay.appendChild(modal);

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', handleKeydown);
    if (typeof onClose === 'function') onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  document.addEventListener('keydown', handleKeydown);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return { element: overlay, close };
}
