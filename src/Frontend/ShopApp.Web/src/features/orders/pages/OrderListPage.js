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
import { getProfile }    from '../../profile/services/profileService.js';
import { createProfileSidebar } from '../../profile/components/ProfileSidebar.js';
import { createLoadingState, createErrorState as createStateViewError } from '../../../shared/components/StateView/StateView.js';


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
        İndirim: ${order.indirimTutari ? formatPrice(order.indirimTutari) : 'Yok'}
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
  detailBtn.addEventListener('click', () => navigate(`/siparis-onay?orderId=${order.id}`));

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


// ─── Page Component ───────────────────────────────────────────────────────────

/**
 * Reuses the same customer profile sidebar as ProfilePage (createProfileSidebar)
 * so the two pages share one navigation component instead of duplicating it.
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function OrderListPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'orders-page';

  element.appendChild(createBreadcrumbs());

  const mainContainer = document.createElement('div');
  mainContainer.className = 'container profile-main-container';
  element.appendChild(mainContainer);

  // profile-content-area / profile-layout / profile-sidebar are the exact
  // classes ProfilePage.js uses — reusing them (rather than copy/pasting the
  // profile layout CSS into orders.css) is what gives this page the same
  // "sidebar | content" desktop layout and responsive stacking for free.
  const contentWrap = document.createElement('div');
  contentWrap.className = 'profile-content-area';
  mainContainer.appendChild(contentWrap);

  let destroyed = false;

  function buildOrdersContent() {
    const wrap = document.createElement('div');
    wrap.className = 'orders-profile-content';

    const pageHeader = document.createElement('div');
    pageHeader.className = 'orders-header';
    pageHeader.innerHTML = `
      <h1 class="orders-header__title">
        Siparişlerim
        <span class="orders-header__badge" id="orders-count-badge">Yükleniyor...</span>
      </h1>
    `;
    wrap.appendChild(pageHeader);

    const contentArea = document.createElement('div');
    contentArea.id = 'orders-content';
    contentArea.appendChild(createLoadingSpinner());
    wrap.appendChild(contentArea);

    const badge = pageHeader.querySelector('#orders-count-badge');
    return { wrap, contentArea, badge };
  }

  /** Renders the outcome of getAllOrders() into contentArea/badge — unchanged
   *  from the page's pre-sidebar behavior: loading/empty/error states, order
   *  count badge, order cards. `result` is `{ ok: true, orders }` or
   *  `{ ok: false, error }` (apiClient rejects with a plain object, not an
   *  Error instance, so the outcome is tagged explicitly instead of relying
   *  on `instanceof Error`), so a failed orders fetch never fails the whole
   *  page load. */
  function renderOrders(contentArea, badge, result) {
    if (destroyed) return;

    if (!result.ok) {
      const error = result.error;
      if (badge) badge.textContent = 'Hata';
      contentArea.innerHTML = '';
      // 401 is handled globally by apiClient (redirects to login)
      const message = error?.status === 401
        ? 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
        : (error?.message ?? 'Bağlantı hatası. Lütfen tekrar deneyin.');
      contentArea.appendChild(createErrorState(message));
      console.error('[OrderListPage] loadOrders failed:', error);
      return;
    }

    const orders = result.orders;
    if (badge) badge.textContent = `${orders.length} Sipariş`;
    contentArea.innerHTML = '';

    if (orders.length === 0) {
      contentArea.appendChild(createEmptyState());
      return;
    }

    const list = document.createElement('div');
    list.className = 'orders-list';
    orders.forEach((order) => list.appendChild(createOrderCard(order)));
    contentArea.appendChild(list);
  }

  // ── Sidebar (left column) + orders content (right column) ──────────────
  // The sidebar needs real profile fields (name/email/initials), so the
  // layout only mounts once getProfile() resolves — no broken/empty sidebar
  // is ever shown. getAllOrders() is still fired at the same time as
  // getProfile() (true concurrency, not a profile -> orders waterfall), but
  // its result/error is handled independently: an orders failure only
  // affects the orders content area, never the sidebar/profile state.
  async function loadData() {
    contentWrap.innerHTML = '';
    contentWrap.appendChild(createLoadingState({ message: 'Profil bilgileriniz yükleniyor...' }));

    const ordersPromise = getAllOrders()
      .then((orders) => ({ ok: true, orders }))
      .catch((error) => ({ ok: false, error }));
    let profile;
    try {
      profile = await getProfile();
    } catch (err) {
      if (destroyed) return;
      console.error('[OrderListPage] getProfile failed:', err);
      contentWrap.innerHTML = '';
      contentWrap.appendChild(
        createStateViewError({
          title: 'Profil bilgileri yüklenemedi',
          message: err?.message || 'Bir ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.',
          retryLabel: 'Tekrar Dene',
          onRetry: () => loadData(),
        })
      );
      return;
    }
    if (destroyed) return;

    const layout = document.createElement('div');
    layout.className = 'profile-layout';

    const sidebar = createProfileSidebar({
      user: profile,
      activeItem: 'orders',
      // The sidebar's "Hesabım" link is an in-page "#hesabim" anchor on
      // ProfilePage; here there is no such section, so it's a real navigation.
      onNavigateSection: (id) => { if (id === 'account') navigate('/profil'); },
    });
    layout.appendChild(sidebar);

    const { wrap: ordersWrap, contentArea, badge } = buildOrdersContent();
    layout.appendChild(ordersWrap);

    contentWrap.innerHTML = '';
    contentWrap.appendChild(layout);

    const ordersResult = await ordersPromise;
    renderOrders(contentArea, badge, ordersResult);
  }

  loadData();

  return {
    element,
    destroy: () => { destroyed = true; },
  };
}
