/**
 * RecentOrdersCard.js — Son Siparişler Kartı
 *
 * GET /api/siparis üzerinden gelen gerçek siparişleri listeler.
 * En son 3 siparişi gösterir. Sipariş yoksa temiz bir boş durum gösterir.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate } from '../../../app/router.js';

function formatPrice(amount) {
  return Number(amount ?? 0).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' TL';
}

function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

const STATUS_MAP = {
  'Teslim Edildi': { code: 'delivered', icon: 'check' },
  'Kargoda':       { code: 'shipping',  icon: 'truck' },
  'Hazırlanıyor':  { code: 'processing',icon: 'refresh' },
  'İptal Edildi':  { code: 'cancelled', icon: 'close' },
  'Bekleyen Ödeme':{ code: 'pending',   icon: 'info' },
};

function createOrderStatusBadge(durumIsmi = '') {
  const meta = STATUS_MAP[durumIsmi] ?? { code: 'default', icon: 'info' };
  const badge = document.createElement('span');
  badge.className = `profile-status-badge profile-status-badge--${meta.code}`;

  const icon = createIcon(meta.icon, { size: 12 });
  badge.appendChild(icon);
  badge.appendChild(document.createTextNode(' ' + durumIsmi));
  return badge;
}

/**
 * @param {{
 *   orders: Array<import('../../orders/services/orderService.js').ResultSiparisDto>,
 * }} options
 * @returns {HTMLElement}
 */
export function createRecentOrdersCard({ orders = [] }) {
  const card = document.createElement('section');
  card.className = 'profile-card profile-card--recent-orders';
  card.id = 'siparislerim';
  card.setAttribute('aria-labelledby', 'recent-orders-title');

  // Header
  const header = document.createElement('div');
  header.className = 'profile-card__header';

  const title = document.createElement('h2');
  title.className = 'profile-card__title';
  title.id = 'recent-orders-title';
  title.textContent = 'Son Siparişler';
  header.appendChild(title);

  if (orders.length > 0) {
    const viewAll = document.createElement('a');
    viewAll.href = '/siparisler';
    viewAll.className = 'profile-card__action-link';
    viewAll.textContent = 'Tüm Siparişleri Gör →';
    header.appendChild(viewAll);
  }

  card.appendChild(header);

  // Body: Empty State or Orders List
  if (orders.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'profile-empty-state';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'profile-empty-state__icon';
    iconWrap.appendChild(createIcon('cart', { size: 36 }));
    empty.appendChild(iconWrap);

    const emptyTitle = document.createElement('p');
    emptyTitle.className = 'profile-empty-state__title';
    emptyTitle.textContent = 'Henüz siparişiniz bulunmuyor.';
    empty.appendChild(emptyTitle);

    const emptyDesc = document.createElement('p');
    emptyDesc.className = 'profile-empty-state__desc';
    emptyDesc.textContent = 'Verdiğiniz siparişler burada listelenecektir.';
    empty.appendChild(emptyDesc);

    const shopBtn = document.createElement('button');
    shopBtn.type = 'button';
    shopBtn.className = 'profile-btn profile-btn--primary profile-btn--sm';
    shopBtn.textContent = 'Alışverişe Başla';
    shopBtn.addEventListener('click', () => navigate('/urunler'));
    empty.appendChild(shopBtn);

    card.appendChild(empty);
    return card;
  }

  const list = document.createElement('div');
  list.className = 'profile-orders-list';

  // Sadece en son 3 sipariş
  const recentOrders = orders.slice(0, 3);

  recentOrders.forEach((order) => {
    const row = document.createElement('article');
    row.className = 'profile-order-row';

    // Sol sütun: Sipariş No & Tarih
    const colMain = document.createElement('div');
    colMain.className = 'profile-order-row__main';

    const orderNum = document.createElement('span');
    orderNum.className = 'profile-order-row__num';
    orderNum.textContent = order.siparisNumarasi || `#${order.id.slice(0, 8).toUpperCase()}`;
    colMain.appendChild(orderNum);

    const orderDate = document.createElement('span');
    orderDate.className = 'profile-order-row__date';
    orderDate.textContent = formatDate(order.olusturmaTarihi);
    colMain.appendChild(orderDate);

    row.appendChild(colMain);

    // Orta sütun: Durum rozeti
    const colStatus = document.createElement('div');
    colStatus.className = 'profile-order-row__status';
    colStatus.appendChild(createOrderStatusBadge(order.durumIsmi));
    row.appendChild(colStatus);

    // Sağ sütun: Tutar & Detay Butonu
    const colEnd = document.createElement('div');
    colEnd.className = 'profile-order-row__end';

    const price = document.createElement('span');
    price.className = 'profile-order-row__price';
    price.textContent = formatPrice(order.toplamFiyat);
    colEnd.appendChild(price);

    const detailBtn = document.createElement('a');
    detailBtn.href = '/siparisler';
    detailBtn.className = 'profile-btn profile-btn--ghost profile-btn--xs';
    detailBtn.textContent = 'Detay';
    colEnd.appendChild(detailBtn);

    row.appendChild(colEnd);
    list.appendChild(row);
  });

  card.appendChild(list);
  return card;
}
