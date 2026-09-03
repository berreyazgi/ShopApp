/**
 * OrderListPage.js — Siparişlerim (My Orders) Page
 *
 * Fetches the authenticated user's orders from the backend API.
 * Handles: loading → populated list | empty state | error state.
 *
 * API: GET /api/siparis  (SiparisController)
 * Auth: JWT injected automatically by apiClient (in-memory token)
 */

import { createIcon }   from '../../../shared/components/Icon/Icon.js';
import { navigate }     from '../../../app/router.js';
import { getAllOrders }  from '../services/orderService.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const BENEFITS = [
  { icon: 'truck',      title: 'Ücretsiz Kargo',   desc: '500 TL ve üzeri siparişlerde', color: '#0071e3', bg: 'rgba(0,113,227,0.08)' },
  { icon: 'refresh',    title: 'Kolay İade',        desc: '30 gün içinde ücretsiz',       color: '#34c759', bg: 'rgba(52,199,89,0.08)' },
  { icon: 'shield',     title: 'Güvenli Ödeme',     desc: '256-bit SSL şifreleme',        color: '#ff9f0a', bg: 'rgba(255,159,10,0.08)' },
  { icon: 'headphones', title: 'Müşteri Desteği',   desc: '7/24 destek hattı',            color: '#af52de', bg: 'rgba(175,82,222,0.08)' },
];

// Maps backend "durumIsmi" strings to CSS modifier classes
const STATUS_CODE_MAP = {
  'Kargoda':          'shipping',
  'Teslim Edildi':    'delivered',
  'Hazırlanıyor':     'processing',
  'İptal Edildi':     'cancelled',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount) {
  return Number(amount).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' TL';
}

function formatDate(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('tr-TR', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });
}

function statusCode(durumIsmi) {
  return STATUS_CODE_MAP[durumIsmi] ?? 'processing';
}

// ─── Sub-builders ─────────────────────────────────────────────────────────────

function createBreadcrumbs() {
  const nav = document.createElement('nav');
  nav.className = 'orders-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML = `
    <div class="container">
      <ol class="orders-breadcrumbs__list">
        <li><a href="/" class="orders-breadcrumbs__link">ShopApp</a></li>
        <li class="orders-breadcrumbs__separator" aria-hidden="true">/</li>
        <li class="orders-breadcrumbs__current" aria-current="page">Siparişlerim</li>
      </ol>
    </div>
  `;
  return nav;
}

function createStatusBadge(durumIsmi) {
  const code  = statusCode(durumIsmi);
  const badge = document.createElement('span');
  badge.className = `order-status-badge order-status-badge--${code}`;

  const iconName = code === 'delivered' ? 'check' : code === 'shipping' ? 'truck' : 'refresh';
  badge.appendChild(createIcon(iconName, { size: 13 }));
  badge.appendChild(document.createTextNode(' ' + (durumIsmi ?? 'Bilinmiyor')));
  return badge;
}

/** Renders one order card from a ResultSiparisDto object. */
function createOrderCard(order) {
  const card = document.createElement('article');
  card.className = 'order-card';

  // ── Header ──────────────────────────────────────────────────────────────
  const header = document.createElement('header');
  header.className = 'order-card__header';

  const meta = document.createElement('div');
  meta.className = 'order-card__meta';

  const makeMetaItem = (label, value, highlight = false) => {
    const item = document.createElement('div');
    item.className = 'order-card__meta-item';
    item.innerHTML = `
      <span class="order-card__meta-label">${label}</span>
      <span class="order-card__meta-value"${highlight ? ' style="color:var(--order-accent)"' : ''}>${value}</span>
    `;
    return item;
  };

  meta.appendChild(makeMetaItem('Sipariş No',    order.siparisNumarasi ?? order.id?.slice(0, 8).toUpperCase()));
  meta.appendChild(makeMetaItem('Sipariş Tarihi', formatDate(order.olusturmaTarihi)));
  meta.appendChild(makeMetaItem('Toplam Tutar',  formatPrice(order.toplamFiyat), true));

  header.appendChild(meta);
  header.appendChild(createStatusBadge(order.durumIsmi));
  card.appendChild(header);

  // ── Body: summary line ───────────────────────────────────────────────────
  const body = document.createElement('div');
  body.className = 'order-card__body';

  const summaryRow = document.createElement('div');
  summaryRow.className = 'order-item-row';
  summaryRow.innerHTML = `
    <div class="order-item__info">
      <span class="order-item__name">Sipariş detayları için aşağıdaki butona tıklayın</span>
      <span class="order-item__variant">
        Ara Toplam: ${formatPrice(order.araToplam)} &nbsp;|&nbsp;
        Kargo: ${order.kargoFiyat === 0 ? 'Ücretsiz' : formatPrice(order.kargoFiyat)} &nbsp;|&nbsp;
        İndirim: %${order.indirimOrani ?? 0}
      </span>
    </div>
  `;
  body.appendChild(summaryRow);
  card.appendChild(body);

  // ── Footer ───────────────────────────────────────────────────────────────
  const footer = document.createElement('footer');
  footer.className = 'order-card__footer';

  const trackingWrap = document.createElement('div');
  trackingWrap.className = 'order-card__tracking';
  if (order.durumIsmi === 'Kargoda') {
    trackingWrap.appendChild(createIcon('truck', { size: 15 }));
    trackingWrap.appendChild(document.createTextNode(' Kargoya verildi'));
  }
  footer.appendChild(trackingWrap);

  const actions = document.createElement('div');
  actions.className = 'order-card__actions';

  const detailBtn = document.createElement('button');
  detailBtn.type = 'button';
  detailBtn.className = 'order-btn order-btn--primary';
  detailBtn.textContent = 'Sipariş Detayı / Onayı';
  detailBtn.addEventListener('click', () => navigate('/siparis-onay'));

  actions.appendChild(detailBtn);
  footer.appendChild(actions);
  card.appendChild(footer);

  return card;
}

function createLoadingSpinner() {
  const wrap = document.createElement('div');
  wrap.id = 'orders-loading';
  wrap.className = 'orders-empty';
  wrap.setAttribute('aria-live', 'polite');
  wrap.setAttribute('aria-label', 'Siparişler yükleniyor');
  wrap.innerHTML = `
    <div class="orders-empty__icon" style="animation:spin 1s linear infinite">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    </div>
    <p class="orders-empty__desc">Siparişleriniz yükleniyor...</p>
  `;
  return wrap;
}

function createEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'orders-empty';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'orders-empty__icon';
  iconWrap.appendChild(createIcon('cart', { size: 48 }));
  empty.appendChild(iconWrap);

  const title = document.createElement('h2');
  title.className = 'orders-empty__title';
  title.textContent = 'Henüz siparişiniz yok';
  empty.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'orders-empty__desc';
  desc.textContent = 'Vermiş olduğunuz siparişler burada listelenecektir. Alışverişe başlayarak harika ürünleri keşfedin!';
  empty.appendChild(desc);

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'order-btn order-btn--primary orders-empty__cta';
  cta.textContent = 'Alışverişe Başla';
  cta.addEventListener('click', () => navigate('/urunler'));
  empty.appendChild(cta);

  return empty;
}

function createErrorState(message) {
  const err = document.createElement('div');
  err.className = 'orders-empty';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'orders-empty__icon';
  iconWrap.style.background = 'rgba(255,59,48,0.1)';
  iconWrap.style.color = 'var(--color-error)';
  iconWrap.appendChild(createIcon('close', { size: 40 }));
  err.appendChild(iconWrap);

  const title = document.createElement('h2');
  title.className = 'orders-empty__title';
  title.textContent = 'Siparişler yüklenemedi';
  err.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'orders-empty__desc';
  desc.textContent = message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  err.appendChild(desc);

  const retryBtn = document.createElement('button');
  retryBtn.type = 'button';
  retryBtn.className = 'order-btn order-btn--secondary orders-empty__cta';
  retryBtn.textContent = 'Yeniden Dene';
  retryBtn.addEventListener('click', () => navigate('/siparisler'));
  err.appendChild(retryBtn);

  return err;
}

function createBenefitsSection() {
  const section = document.createElement('section');
  section.className = 'orders-benefits';
  section.setAttribute('aria-label', 'Alışveriş avantajları');

  const inner = document.createElement('div');
  inner.className = 'container';

  const grid = document.createElement('ul');
  grid.className = 'orders-benefits__grid';
  grid.setAttribute('role', 'list');

  BENEFITS.forEach(({ icon, title, desc, color, bg }) => {
    const li = document.createElement('li');
    li.className = 'orders-benefit';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'orders-benefit__icon-wrap';
    iconWrap.style.color = color;
    iconWrap.style.background = bg;
    iconWrap.appendChild(createIcon(icon, { size: 24 }));

    const textWrap = document.createElement('div');
    textWrap.className = 'orders-benefit__text';
    textWrap.innerHTML = `
      <span class="orders-benefit__title">${title}</span>
      <span class="orders-benefit__desc">${desc}</span>
    `;

    li.appendChild(iconWrap);
    li.appendChild(textWrap);
    grid.appendChild(li);
  });

  inner.appendChild(grid);
  section.appendChild(inner);
  return section;
}

// ─── Page Component ───────────────────────────────────────────────────────────

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function OrderListPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'orders-page';

  // ── Skeleton shell (rendered synchronously) ────────────────────────────────
  element.appendChild(createBreadcrumbs());

  const mainContainer = document.createElement('div');
  mainContainer.className = 'container';

  // Page title
  const pageHeader = document.createElement('div');
  pageHeader.className = 'orders-header';
  pageHeader.innerHTML = `
    <h1 class="orders-header__title">
      Siparişlerim
      <span class="orders-header__badge" id="orders-count-badge">Yükleniyor...</span>
    </h1>
  `;
  mainContainer.appendChild(pageHeader);

  // Content area — will be replaced after fetch
  const contentArea = document.createElement('div');
  contentArea.id = 'orders-content';
  contentArea.appendChild(createLoadingSpinner());
  mainContainer.appendChild(contentArea);

  element.appendChild(mainContainer);
  element.appendChild(createBenefitsSection());

  // ── Async data load ────────────────────────────────────────────────────────
  const badge = pageHeader.querySelector('#orders-count-badge');

  async function loadOrders() {
    try {
      /** @type {import('../services/orderService.js').ResultSiparisDto[]} */
      const orders = await getAllOrders();

      // Update count badge
      if (badge) badge.textContent = `${orders.length} Sipariş`;

      // Swap loading spinner with real content
      contentArea.innerHTML = '';

      if (orders.length === 0) {
        contentArea.appendChild(createEmptyState());
        return;
      }

      const list = document.createElement('div');
      list.className = 'orders-list';
      orders.forEach((order) => list.appendChild(createOrderCard(order)));
      contentArea.appendChild(list);

    } catch (err) {
      if (badge) badge.textContent = 'Hata';

      contentArea.innerHTML = '';

      // 401 is handled globally by apiClient (redirects to login)
      // Show a user-friendly error for everything else
      const message = err?.status === 401
        ? 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
        : (err?.message ?? 'Bağlantı hatası. Lütfen tekrar deneyin.');

      contentArea.appendChild(createErrorState(message));
      console.error('[OrderListPage] loadOrders failed:', err);
    }
  }

  loadOrders();

  return {
    element,
    destroy: () => {},
  };
}
