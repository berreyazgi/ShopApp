/**
 * OrderConfirmationPage.js — Order Confirmation Page (Sipariş Onayı)
 *
 * Displays a success banner, order details, delivery/payment info,
 * and an order summary sidebar when an order is supplied.
 *
 * Zero demo orders, zero fake data fixtures.
 * When no active order data exists, renders a clean, genuine empty state.
 *
 * Follows the existing { element, destroy } page lifecycle pattern.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate }   from '../../../app/router.js';

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
        <li class="oc-breadcrumbs__current" aria-current="page">Sipariş Onayı</li>
      </ol>
    </div>
  `;
  return nav;
}

function createEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'orders-empty';
  empty.style.padding = 'var(--space-16) var(--space-6)';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'orders-empty__icon';
  iconWrap.appendChild(createIcon('cart', { size: 48 }));
  empty.appendChild(iconWrap);

  const title = document.createElement('h2');
  title.className = 'orders-empty__title';
  title.textContent = 'Görüntülenecek sipariş onayı bulunamadı';
  empty.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'orders-empty__desc';
  desc.textContent = 'Henüz onaylanmış bir sipariş bulunmuyor veya sipariş detaylarına ulaşılamadı.';
  empty.appendChild(desc);

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'order-btn order-btn--primary orders-empty__cta';
  cta.textContent = "Siparişlerime Git";
  cta.addEventListener('click', () => navigate('/siparisler'));
  empty.appendChild(cta);

  return empty;
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

function createOrderDetailsCard(items = []) {
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

  if (!items || items.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.style.padding = 'var(--space-4)';
    emptyMsg.style.color = 'var(--color-secondary)';
    emptyMsg.textContent = 'Sipariş edilen ürün detayı bulunamadı.';
    list.appendChild(emptyMsg);
    card.appendChild(list);
    return card;
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'oc-product-item';

    // Image
    const imgWrap = document.createElement('div');
    imgWrap.className = 'oc-product-image-wrap';
    const imgSrc = item.image || item.imageUrl || item.gorselUrl;
    if (imgSrc) {
      const img = document.createElement('img');
      img.className = 'oc-product-image';
      img.src = imgSrc;
      img.alt = item.name || item.urunIsmi || '';
      img.loading = 'lazy';
      imgWrap.appendChild(img);
    } else {
      imgWrap.appendChild(createIcon('box', { size: 28 }));
    }
    li.appendChild(imgWrap);

    // Info (name + variant / size)
    const info = document.createElement('div');
    info.className = 'oc-product-info';
    const name = document.createElement('span');
    name.className = 'oc-product-name';
    name.textContent = item.name || item.urunIsmi || 'Ürün';
    const variantText = item.size || item.variant || item.urunAciklamasi || '';
    info.appendChild(name);
    if (variantText) {
      const variant = document.createElement('span');
      variant.className = 'oc-product-size';
      variant.textContent = variantText;
      info.appendChild(variant);
    }
    li.appendChild(info);

    // Quantity
    const qtyVal = item.quantity ?? item.urunMiktar ?? 1;
    const qty = document.createElement('span');
    qty.className = 'oc-product-qty';
    qty.textContent = String(qtyVal);
    qty.setAttribute('aria-label', `Adet: ${qtyVal}`);
    li.appendChild(qty);

    // Price
    const priceVal = item.price ?? item.urunBirimFiyat ?? item.toplamFiyat ?? 0;
    const price = document.createElement('span');
    price.className = 'oc-product-price';
    price.textContent = formatPrice(priceVal);
    li.appendChild(price);

    list.appendChild(li);
  });

  card.appendChild(list);
  return card;
}

function createDeliveryCard(delivery = {}) {
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
  val1.textContent = delivery?.address || delivery?.adres || '—';
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
  val2.textContent = delivery?.payment || delivery?.odeme || '—';
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
  const shippingText = delivery?.shipping || delivery?.kargo || 'Ücretsiz';
  freeWrap.appendChild(createIcon('check', { size: 14 }));
  freeWrap.appendChild(document.createTextNode(' ' + shippingText));
  col3.appendChild(icon3);
  col3.appendChild(label3);
  col3.appendChild(freeWrap);

  grid.appendChild(col1);
  grid.appendChild(col2);
  grid.appendChild(col3);
  card.appendChild(grid);
  return card;
}

function createSummaryCard(data = {}, onGoToOrders, onGoHome) {
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

  const subtotal = data.subtotal ?? data.araToplam ?? 0;
  const shippingCost = data.shippingCost ?? data.kargoFiyat ?? 0;
  const total = data.total ?? data.toplamFiyat ?? (subtotal + shippingCost);

  // Row 1: Subtotal
  const row1 = document.createElement('div');
  row1.className = 'oc-summary__row';
  row1.innerHTML = `<span class="oc-summary__label">Ara Toplam</span>`;
  const val1 = document.createElement('span');
  val1.className = 'oc-summary__value';
  val1.textContent = formatPrice(subtotal);
  row1.appendChild(val1);
  body.appendChild(row1);

  // Row 2: Shipping
  const row2 = document.createElement('div');
  row2.className = 'oc-summary__row';
  row2.innerHTML = `<span class="oc-summary__label">Kargo</span>`;
  const val2 = document.createElement('span');
  if (shippingCost === 0) {
    val2.className = 'oc-summary__value--free';
    val2.textContent = 'Ücretsiz';
  } else {
    val2.className = 'oc-summary__value';
    val2.textContent = formatPrice(shippingCost);
  }
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
  totalVal.textContent = formatPrice(total);
  totalRow.appendChild(totalLabel);
  totalRow.appendChild(totalVal);
  card.appendChild(totalRow);

  // Info text
  const info = document.createElement('p');
  info.className = 'oc-summary__info';
  info.textContent =
    "Ödeme işlemi başarıyla tamamlanmıştır. Sipariş durumunu 'Siparişlerim' sayfasından takip edebilirsiniz.";
  card.appendChild(info);

  // Action buttons
  const actions = document.createElement('div');
  actions.className = 'oc-actions';

  const primaryBtn = document.createElement('button');
  primaryBtn.type = 'button';
  primaryBtn.id = 'btn-go-to-orders';
  primaryBtn.className = 'oc-btn oc-btn--primary';
  primaryBtn.textContent = "Siparişlerim'e Git";
  primaryBtn.addEventListener('click', onGoToOrders);

  const secondaryBtn = document.createElement('button');
  secondaryBtn.type = 'button';
  secondaryBtn.id = 'btn-go-home';
  secondaryBtn.className = 'oc-btn oc-btn--secondary';
  secondaryBtn.textContent = 'Alışverişe Devam Et';
  secondaryBtn.addEventListener('click', onGoHome);

  actions.appendChild(primaryBtn);
  actions.appendChild(secondaryBtn);
  card.appendChild(actions);

  return { card, primaryBtn, secondaryBtn };
}


// ─── Page Component ───────────────────────────────────────────────────────────

/**
 * @param {{ params?: object, order?: object }} [options] - `order` accepts dynamic order data.
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function OrderConfirmationPage({ order = null } = {}) {
  const element = document.createElement('div');
  element.className = 'order-confirmation-page';

  const cleanupFns = [];

  function render() {
    element.innerHTML = '';

    // Breadcrumbs
    element.appendChild(createBreadcrumbs());

    // Check if valid order data exists
    if (!order || (!order.orderNumber && !order.siparisNumarasi && !order.id && (!order.items || order.items.length === 0))) {
      const emptyWrap = document.createElement('div');
      emptyWrap.className = 'container';
      emptyWrap.appendChild(createEmptyState());
      element.appendChild(emptyWrap);
      return;
    }

    // Success banner
    const bannerWrap = document.createElement('div');
    bannerWrap.className = 'container';
    const orderNo = order.orderNumber || order.siparisNumarasi || `#${order.id || ''}`;
    bannerWrap.appendChild(createSuccessBanner(orderNo));
    element.appendChild(bannerWrap);

    // Main layout
    const main = document.createElement('div');
    main.className = 'container';

    const layout = document.createElement('div');
    layout.className = 'oc-layout';

    // ── Left Column ──
    const leftCol = document.createElement('div');
    leftCol.className = 'oc-left';
    leftCol.appendChild(createOrderDetailsCard(order.items || order.urunler || []));
    leftCol.appendChild(createDeliveryCard(order.delivery || {}));
    layout.appendChild(leftCol);

    // ── Right Column ──
    const { card: summaryCard, primaryBtn, secondaryBtn } = createSummaryCard(
      order,
      () => navigate('/siparisler'),
      () => navigate('/'),
    );

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
