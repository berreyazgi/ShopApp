/**
 * OrderConfirmationPage.js — Order Confirmation Page (Sipariş Onayı)
 *
 * Displays a success banner, order details, delivery/payment info,
 * and an order summary sidebar after a successful checkout.
 *
 * The display data (order number, items, delivery/payment summary) is
 * supplied to the page — see orderConfirmationDemoData.js for the temporary
 * preview fixture used until the real cart/order summary is wired in.
 *
 * The order-creation action below (createOrder / addOrderItem) already talks
 * to the real backend and is left untouched by this refactor.
 *
 * Follows the existing { element, destroy } page lifecycle pattern.
 */

import { createIcon }               from '../../../shared/components/Icon/Icon.js';
import { navigate }                  from '../../../app/router.js';
import { createOrder, addOrderItem } from '../services/orderService.js';
import { DEMO_ORDER }                 from '../data/orderConfirmationDemoData.js';

// ─── Test Order Payload ──────────────────────────────────────────────────────
// TODO: Build these items dynamically from the real cart contents once the
//       product catalog microservice is available. MusteriId is never sent —
//       the backend derives the owner from the authenticated user (JWT).
const TEST_ORDER_ITEMS = [
  {
    urunTurId:      '00000000-0000-0000-0000-000000000101',
    urunIsmi:       'Nike Air Zoom Alphafly',
    urunMiktar:     1,
    urunBirimFiyat: 1800,
    indirimOrani:   0,
  },
  {
    urunTurId:      '00000000-0000-0000-0000-000000000102',
    urunIsmi:       'Sarı Eşofman Takımı',
    urunMiktar:     1,
    urunBirimFiyat: 1200,
    indirimOrani:   0,
  },
];


// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(amount) {
  return amount.toLocaleString('tr-TR') + ' TL';
}

// ─── SVG Icons (inline, for items not in the shared registry) ────────────────

const SVG_HOME = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>`;

const SVG_CREDIT_CARD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect width="20" height="14" x="2" y="5" rx="2"/>
  <line x1="2" x2="22" y1="10" y2="10"/>
</svg>`;

/** Creates an inline SVG icon span from raw SVG markup. */
function createRawIcon(svgMarkup, size = 22) {
  const wrap = document.createElement('span');
  wrap.setAttribute('aria-hidden', 'true');
  wrap.style.cssText = `display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;flex-shrink:0;`;
  wrap.innerHTML = svgMarkup;
  const svg = wrap.querySelector('svg');
  if (svg) {
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
  }
  return wrap;
}

// ─── Sub-builders ─────────────────────────────────────────────────────────────

function createBreadcrumbs() {
  const nav = document.createElement('nav');
  nav.className = 'oc-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML = `
    <div class="container">
      <ol class="oc-breadcrumbs__list">
        <li><a href="/" class="oc-breadcrumbs__link">ShopApp</a></li>
        <li class="oc-breadcrumbs__separator" aria-hidden="true">/</li>
        <li><a href="/sepet" class="oc-breadcrumbs__link">Alışveriş Sepetim</a></li>
        <li class="oc-breadcrumbs__separator" aria-hidden="true">/</li>
        <li><span class="oc-breadcrumbs__link" style="opacity:0.6;cursor:default">Ödeme</span></li>
        <li class="oc-breadcrumbs__separator" aria-hidden="true">/</li>
        <li class="oc-breadcrumbs__current" aria-current="page">Sipariş Onayı</li>
      </ol>
    </div>
  `;
  return nav;
}

function createSuccessBanner(orderNumber) {
  const banner = document.createElement('div');
  banner.className = 'oc-banner';

  // Green check circle
  const ring = document.createElement('div');
  ring.className = 'oc-banner__icon-ring';
  ring.setAttribute('aria-hidden', 'true');
  ring.appendChild(createIcon('check', { size: 44 }));
  banner.appendChild(ring);

  const title = document.createElement('h1');
  title.className = 'oc-banner__title';
  title.textContent = 'Tebrikler! Siparişiniz Başarıyla Alındı.';
  banner.appendChild(title);

  const sub = document.createElement('p');
  sub.className = 'oc-banner__order-number';
  sub.textContent = `Sipariş Numaranız: ${orderNumber}`;
  banner.appendChild(sub);

  return banner;
}

function createOrderDetailsCard(items) {
  const card = document.createElement('div');
  card.className = 'oc-card';

  const header = document.createElement('div');
  header.className = 'oc-card__header';
  const title = document.createElement('h2');
  title.className = 'oc-card__title';
  title.textContent = 'Sipariş Detayları';
  header.appendChild(title);
  card.appendChild(header);

  const list = document.createElement('ul');
  list.className = 'oc-product-list';
  list.setAttribute('role', 'list');

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'oc-product-item';

    // Image
    const imgWrap = document.createElement('div');
    imgWrap.className = 'oc-product-image-wrap';
    const img = document.createElement('img');
    img.className = 'oc-product-image';
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    li.appendChild(imgWrap);

    // Info (name + size)
    const info = document.createElement('div');
    info.className = 'oc-product-info';
    const name = document.createElement('span');
    name.className = 'oc-product-name';
    name.textContent = item.name;
    const size = document.createElement('span');
    size.className = 'oc-product-size';
    size.textContent = item.size;
    info.appendChild(name);
    info.appendChild(size);
    li.appendChild(info);

    // Quantity (static plain number — no +/- buttons)
    const qty = document.createElement('span');
    qty.className = 'oc-product-qty';
    qty.textContent = String(item.quantity);
    qty.setAttribute('aria-label', `Adet: ${item.quantity}`);
    li.appendChild(qty);

    // Price
    const price = document.createElement('span');
    price.className = 'oc-product-price';
    price.textContent = formatPrice(item.price);
    li.appendChild(price);

    list.appendChild(li);
  });

  card.appendChild(list);
  return card;
}

function createDeliveryCard(delivery) {
  const card = document.createElement('div');
  card.className = 'oc-card';

  const header = document.createElement('div');
  header.className = 'oc-card__header';
  const title = document.createElement('h2');
  title.className = 'oc-card__title';
  title.textContent = 'Teslimat ve Ödeme Detayları';
  header.appendChild(title);
  card.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'oc-delivery-grid';

  // Column 1: Address
  const col1 = document.createElement('div');
  col1.className = 'oc-delivery-col';
  const icon1 = document.createElement('div');
  icon1.className = 'oc-delivery-col__icon';
  icon1.appendChild(createRawIcon(SVG_HOME, 22));
  const label1 = document.createElement('span');
  label1.className = 'oc-delivery-col__label';
  label1.textContent = 'Teslimat Adresi:';
  const val1 = document.createElement('span');
  val1.className = 'oc-delivery-col__value';
  val1.textContent = delivery.address;
  col1.appendChild(icon1);
  col1.appendChild(label1);
  col1.appendChild(val1);

  // Column 2: Payment
  const col2 = document.createElement('div');
  col2.className = 'oc-delivery-col';
  const icon2 = document.createElement('div');
  icon2.className = 'oc-delivery-col__icon';
  icon2.appendChild(createRawIcon(SVG_CREDIT_CARD, 22));
  const label2 = document.createElement('span');
  label2.className = 'oc-delivery-col__label';
  label2.textContent = 'Ödeme Yöntemi:';
  const val2 = document.createElement('span');
  val2.className = 'oc-delivery-col__value';
  val2.textContent = delivery.payment;
  col2.appendChild(icon2);
  col2.appendChild(label2);
  col2.appendChild(val2);

  // Column 3: Shipping
  const col3 = document.createElement('div');
  col3.className = 'oc-delivery-col';
  const icon3 = document.createElement('div');
  icon3.className = 'oc-delivery-col__icon';
  icon3.appendChild(createIcon('truck', { size: 22 }));
  const label3 = document.createElement('span');
  label3.className = 'oc-delivery-col__label';
  label3.textContent = 'Kargo';
  const freeWrap = document.createElement('span');
  freeWrap.className = 'oc-delivery-col__free';
  freeWrap.appendChild(createIcon('check', { size: 14 }));
  freeWrap.appendChild(document.createTextNode(' ' + delivery.shipping));
  col3.appendChild(icon3);
  col3.appendChild(label3);
  col3.appendChild(freeWrap);

  grid.appendChild(col1);
  grid.appendChild(col2);
  grid.appendChild(col3);
  card.appendChild(grid);
  return card;
}

function createSummaryCard(data, onGoToOrders, onGoHome) {
  const card = document.createElement('div');
  card.className = 'oc-card oc-summary';

  // Header
  const header = document.createElement('div');
  header.className = 'oc-card__header';
  const title = document.createElement('h2');
  title.className = 'oc-card__title';
  title.textContent = 'Sipariş Özeti';
  header.appendChild(title);
  card.appendChild(header);

  // Summary rows
  const body = document.createElement('div');
  body.className = 'oc-summary__body';

  // Row 1: Subtotal
  const row1 = document.createElement('div');
  row1.className = 'oc-summary__row';
  row1.innerHTML = `<span class="oc-summary__label">Ara Toplam</span>`;
  const val1 = document.createElement('span');
  val1.className = 'oc-summary__value';
  val1.textContent = formatPrice(data.subtotal);
  row1.appendChild(val1);
  body.appendChild(row1);

  // Row 2: Shipping
  const row2 = document.createElement('div');
  row2.className = 'oc-summary__row';
  row2.innerHTML = `<span class="oc-summary__label">Kargo</span>`;
  const val2 = document.createElement('span');
  val2.className = 'oc-summary__value--free';
  val2.textContent = 'Ücretsiz';
  row2.appendChild(val2);
  body.appendChild(row2);

  card.appendChild(body);

  // Divider
  const hr = document.createElement('hr');
  hr.className = 'oc-summary__divider';
  card.appendChild(hr);

  // Total row
  const totalRow = document.createElement('div');
  totalRow.className = 'oc-summary__total-row';
  const totalLabel = document.createElement('span');
  totalLabel.className = 'oc-summary__total-label';
  totalLabel.textContent = 'Toplam Ödenen';
  const totalVal = document.createElement('span');
  totalVal.className = 'oc-summary__total-value';
  totalVal.id = 'oc-total-price';
  totalVal.textContent = formatPrice(data.total);
  totalRow.appendChild(totalLabel);
  totalRow.appendChild(totalVal);
  card.appendChild(totalRow);

  // Info text
  const info = document.createElement('p');
  info.className = 'oc-summary__info';
  info.textContent =
    "Ödeme işlemi başarıyla tamamlanmıştır. Sipariş durumunu 'Siparişlerim' sayfasından takip edebilirsiniz.";
  card.appendChild(info);

  // Error message area (shown on POST failure)
  const errorMsg = document.createElement('p');
  errorMsg.className = 'oc-summary__info';
  errorMsg.style.cssText = 'color:var(--color-error);display:none;margin-top:0';
  card.appendChild(errorMsg);

  // Action buttons
  const actions = document.createElement('div');
  actions.className = 'oc-actions';

  const primaryBtn = document.createElement('button');
  primaryBtn.type = 'button';
  primaryBtn.id = 'btn-complete-order';
  primaryBtn.className = 'oc-btn oc-btn--primary';
  primaryBtn.textContent = 'Siparişi Tamamla';

  // ── POST order on click ─────────────────────────────────────────────────
  primaryBtn.addEventListener('click', async () => {
    primaryBtn.disabled = true;
    primaryBtn.textContent = 'İşleniyor...';
    errorMsg.style.display = 'none';

    try {
      // Step 1: Create the order header (no payload — the backend derives the
      // owner from the authenticated user and generates the order number)
      const { id: siparisId } = await createOrder();

      // Step 2: Add each item to the created order
      await Promise.all(
        TEST_ORDER_ITEMS.map((item) => addOrderItem(siparisId, item)),
      );

      // Step 3: Navigate to orders list on success
      navigate('/siparisler');

    } catch (err) {
      const text = err?.message ?? 'Sipariş oluşturulurken bir hata oluştu.';
      errorMsg.textContent = text;
      errorMsg.style.display = 'block';
      primaryBtn.disabled = false;
      primaryBtn.textContent = 'Tekrar Dene';
      console.error('[OrderConfirmationPage] createOrder failed:', err);
    }
  });

  const secondaryBtn = document.createElement('button');
  secondaryBtn.type = 'button';
  secondaryBtn.id = 'btn-go-to-orders';
  secondaryBtn.className = 'oc-btn oc-btn--secondary';
  secondaryBtn.textContent = "Siparişlerim'e Git";
  secondaryBtn.addEventListener('click', onGoToOrders);

  actions.appendChild(primaryBtn);
  actions.appendChild(secondaryBtn);
  card.appendChild(actions);

  return { card, primaryBtn, secondaryBtn };
}


// ─── Page Component ───────────────────────────────────────────────────────────

/**
 * @param {{ params: object, order?: object }} options - `order` lets a future
 *   caller supply the real order summary; falls back to temporary demo data.
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function OrderConfirmationPage({ order = DEMO_ORDER } = {}) {
  const element = document.createElement('div');
  element.className = 'order-confirmation-page';

  const cleanupFns = [];

  function render() {
    element.innerHTML = '';

    // Breadcrumbs
    element.appendChild(createBreadcrumbs());

    // Success banner
    const bannerWrap = document.createElement('div');
    bannerWrap.className = 'container';
    bannerWrap.appendChild(createSuccessBanner(order.orderNumber));
    element.appendChild(bannerWrap);

    // Main layout
    const main = document.createElement('div');
    main.className = 'container';

    const layout = document.createElement('div');
    layout.className = 'oc-layout';

    // ── Left Column ──────────────────────────────────────────────────────────
    const leftCol = document.createElement('div');
    leftCol.className = 'oc-left';
    leftCol.appendChild(createOrderDetailsCard(order.items));
    leftCol.appendChild(createDeliveryCard(order.delivery));
    layout.appendChild(leftCol);

    // ── Right Column ─────────────────────────────────────────────────────────
    const { card: summaryCard, primaryBtn, secondaryBtn } = createSummaryCard(
      order,
      () => navigate('/siparisler'),
      () => navigate('/'),
    );

    // Track event listeners for cleanup
    cleanupFns.push(() => {
      primaryBtn.replaceWith(primaryBtn.cloneNode(true));
      secondaryBtn.replaceWith(secondaryBtn.cloneNode(true));
    });

    layout.appendChild(summaryCard);

    main.appendChild(layout);
    element.appendChild(main);

  }

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  render();

  return { element, destroy };
}
