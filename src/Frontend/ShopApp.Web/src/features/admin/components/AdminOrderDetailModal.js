/**
 * AdminOrderDetailModal.js — Accessible Order Details Modal Component
 *
 * Renders full details of one order (customer, persisted order-item
 * snapshots, price totals, status, shipment) supplied by the caller — a
 * read-only modal dialog.
 * Zero demo orders, zero hardcoded records, zero API calls of its own.
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';
import { createAdminStatusBadge } from './AdminStatusBadge.js';

/**
 * @param {{ order: Object, onClose?: () => void }} options
 * @returns {{ element: HTMLElement, close: () => void }}
 */
export function createAdminOrderDetailModal({ order, onClose } = {}) {
  const orderNumber = order?.orderNumber || `#${order?.id ?? ''}`;
  const createdAt = order?.createdAt ? new Date(order.createdAt) : null;
  const customer = order?.customer || {};
  const items = Array.isArray(order?.items) ? order.items : [];
  const shipment = order?.shipment || null;

  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${orderNumber} Detayları`);

  const modal = document.createElement('div');
  modal.className = 'admin-modal admin-order-detail-modal';

  // Header
  const header = document.createElement('div');
  header.className = 'admin-modal__header';

  const titleEl = document.createElement('h3');
  titleEl.className = 'admin-modal__title';
  titleEl.textContent = `Sipariş ${orderNumber}`;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'admin-modal__close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

  modal.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'admin-modal__body admin-order-detail-modal__body';

  if (createdAt && !isNaN(createdAt.getTime())) {
    const dateEl = document.createElement('p');
    dateEl.className = 'admin-order-detail-modal__date';
    dateEl.textContent = `Sipariş Tarihi: ${createdAt.toLocaleDateString('tr-TR')}`;
    body.appendChild(dateEl);
  }

  body.appendChild(createAdminStatusBadge({ status: order?.durum }));

  // Customer section
  body.appendChild(createSection('Müşteri', () => {
    const list = document.createElement('div');
    list.className = 'admin-order-detail-modal__info-grid';
    list.appendChild(infoRow('Ad Soyad', customer.fullName || '—'));
    list.appendChild(infoRow('E-posta', customer.email || '—'));
    if (customer.phoneNumber) list.appendChild(infoRow('Telefon', customer.phoneNumber));
    return list;
  }));

  // Products section
  body.appendChild(createSection('Ürünler', () => {
    if (items.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'admin-order-detail-modal__empty';
      empty.textContent = 'Bu siparişte ürün bulunmuyor.';
      return empty;
    }

    const table = document.createElement('table');
    table.className = 'admin-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Ürün</th>
          <th scope="col">Adet</th>
          <th scope="col">Birim Fiyat</th>
          <th scope="col">Toplam</th>
        </tr>
      </thead>
    `;
    const tbody = document.createElement('tbody');
    items.forEach((item) => {
      const row = document.createElement('tr');

      const nameTd = document.createElement('td');
      const nameEl = document.createElement('div');
      nameEl.textContent = item.urunIsmi || 'Ürün';
      nameTd.appendChild(nameEl);
      if (item.stokTakipNumarasi) {
        const sku = document.createElement('div');
        sku.className = 'admin-order-detail-modal__sku';
        sku.textContent = `Stok No: ${item.stokTakipNumarasi}`;
        nameTd.appendChild(sku);
      }
      row.appendChild(nameTd);

      const qtyTd = document.createElement('td');
      qtyTd.textContent = item.urunMiktar ?? '—';
      row.appendChild(qtyTd);

      const unitTd = document.createElement('td');
      unitTd.textContent = item.urunBirimFiyat !== undefined ? formatPrice(item.urunBirimFiyat) : '—';
      row.appendChild(unitTd);

      const totalTd = document.createElement('td');
      totalTd.textContent = item.toplamFiyat !== undefined ? formatPrice(item.toplamFiyat) : '—';
      row.appendChild(totalTd);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
  }));

  // Price summary section
  body.appendChild(createSection('Fiyat', () => {
    const list = document.createElement('div');
    list.className = 'admin-order-detail-modal__info-grid';
    list.appendChild(infoRow('Ara Toplam', formatPrice(order?.araToplam)));
    list.appendChild(infoRow('İndirim', formatPrice(order?.indirimTutari)));
    list.appendChild(infoRow('Kargo', formatPrice(order?.kargoFiyat)));
    list.appendChild(infoRow('Toplam', formatPrice(order?.toplamFiyat), true));
    return list;
  }));

  // Shipment section
  body.appendChild(createSection('Kargo', () => {
    if (!shipment) {
      const empty = document.createElement('p');
      empty.className = 'admin-order-detail-modal__empty';
      empty.textContent = 'Henüz kargo kaydı oluşturulmadı.';
      return empty;
    }

    const list = document.createElement('div');
    list.className = 'admin-order-detail-modal__info-grid';
    list.appendChild(infoRow('Kargo Firması', shipment.carrierName || '—'));
    list.appendChild(infoRow('Takip Numarası', shipment.trackingNumber || '—'));
    list.appendChild(infoRow('Kargo Durumu', shipment.status || '—'));
    if (shipment.estimatedDeliveryDate) {
      const d = new Date(shipment.estimatedDeliveryDate);
      list.appendChild(infoRow('Tahmini Teslim Tarihi', !isNaN(d.getTime()) ? d.toLocaleDateString('tr-TR') : '—'));
    }
    return list;
  }));

  modal.appendChild(body);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'admin-modal__footer';
  const { element: closeFooterBtn } = createButton({ label: 'Kapat', variant: 'secondary', onClick: close });
  footer.appendChild(closeFooterBtn);
  modal.appendChild(footer);

  overlay.appendChild(modal);

  function createSection(title, buildContent) {
    const section = document.createElement('div');
    section.className = 'admin-order-detail-modal__section';

    const titleEl = document.createElement('h5');
    titleEl.className = 'admin-order-detail-modal__section-title';
    titleEl.textContent = title;
    section.appendChild(titleEl);

    section.appendChild(buildContent());
    return section;
  }

  function infoRow(label, value, emphasize = false) {
    const row = document.createElement('div');
    row.className = 'admin-order-detail-modal__info-row';
    const labelEl = document.createElement('span');
    labelEl.className = 'admin-order-detail-modal__info-label';
    labelEl.textContent = label;
    const valueEl = document.createElement('span');
    valueEl.className = emphasize ? 'admin-order-detail-modal__info-value--emphasis' : 'admin-order-detail-modal__info-value';
    valueEl.textContent = value;
    row.appendChild(labelEl);
    row.appendChild(valueEl);
    return row;
  }

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
