/**
 * CartPage.js — Shopping Cart Page
 *
 * Full-featured cart page with:
 *  - Breadcrumb navigation
 *  - Cart items with quantity controls
 *  - Order summary with coupon input
 *  - Dynamic price recalculation
 *  - Item deletion with animation
 *  - Benefits footer
 *
 * Exported as default so the router can import it dynamically.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate }   from '../../../app/router.js';

// ─── Static Cart Data ──────────────────────────────────────────────────────

const INITIAL_CART_ITEMS = [
  {
    id: 'item-1',
    name: 'Nike Air Zoom Alphafly',
    variant: 'Beden: 42',
    unitPrice: 1800,
    quantity: 1,
    image: 'src/assets/images/products/nike-shoes.png',
  },
  {
    id: 'item-2',
    name: 'Sarı Eşofman Takımı',
    variant: 'Beden: M',
    unitPrice: 1200,
    quantity: 1,
    image: 'src/assets/images/products/yellow-tracksuit.png',
  },
];

const FREE_SHIPPING_THRESHOLD = 500;

const BENEFITS = [
  { icon: 'truck',      title: 'Ücretsiz Kargo',   desc: '500 TL ve üzeri siparişlerde', color: '#0071e3', bg: 'rgba(0,113,227,0.08)' },
  { icon: 'refresh',    title: 'Kolay İade',        desc: '30 gün içinde ücretsiz',       color: '#34c759', bg: 'rgba(52,199,89,0.08)' },
  { icon: 'shield',     title: 'Güvenli Ödeme',     desc: '256-bit SSL şifreleme',        color: '#ff9f0a', bg: 'rgba(255,159,10,0.08)' },
  { icon: 'headphones', title: 'Müşteri Desteği',   desc: '7/24 destek hattı',            color: '#af52de', bg: 'rgba(175,82,222,0.08)' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatPrice(amount) {
  return amount.toLocaleString('tr-TR') + ' TL';
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function CartPage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'cart-page';

  // Mutable cart state
  let cartItems = INITIAL_CART_ITEMS.map((item) => ({ ...item }));
  const cleanupFns = [];

  // ── DOM References ─────────────────────────────────────────────────────

  let itemsContainer = null;
  let cartTitleEl = null;
  let subtotalEl = null;
  let grandTotalEl = null;
  let shippingEl = null;

  // ── Calculations ───────────────────────────────────────────────────────

  function getSubtotal() {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  function getShippingCost() {
    return getSubtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : 29.90;
  }

  function getGrandTotal() {
    return getSubtotal() + getShippingCost();
  }

  // ── Update Summary ─────────────────────────────────────────────────────

  function updateSummary() {
    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const grand = getGrandTotal();
    const count = cartItems.reduce((s, i) => s + i.quantity, 0);

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(grand);
    if (cartTitleEl) {
      cartTitleEl.innerHTML = `Alışveriş Sepetim <span class="cart-card__count">(${count} Ürün)</span>`;
    }

    if (shippingEl) {
      if (shipping === 0) {
        shippingEl.innerHTML = '';
        const freeWrap = document.createElement('span');
        freeWrap.className = 'cart-summary__shipping-free';
        freeWrap.appendChild(createIcon('check', { size: 14 }));
        const textNode = document.createElement('span');
        textNode.textContent = 'Ücretsiz';
        freeWrap.appendChild(textNode);
        const note = document.createElement('span');
        note.className = 'cart-summary__shipping-note';
        note.textContent = `(${FREE_SHIPPING_THRESHOLD} TL üzeri)`;
        freeWrap.appendChild(note);
        shippingEl.appendChild(freeWrap);
      } else {
        shippingEl.textContent = formatPrice(shipping);
      }
    }

    // Show empty state if cart is empty
    if (cartItems.length === 0 && itemsContainer) {
      renderEmptyState();
    }
  }

  // ── Update Item Row Total ──────────────────────────────────────────────

  function updateItemRow(itemId) {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    const row = itemsContainer?.querySelector(`[data-item-id="${itemId}"]`);
    if (!row) return;

    const totalEl = row.querySelector('.cart-item__total');
    if (totalEl) totalEl.textContent = formatPrice(item.unitPrice * item.quantity);

    const input = row.querySelector('.cart-qty__input');
    if (input) input.value = item.quantity;

    const minusBtn = row.querySelector('.cart-qty__btn--minus');
    if (minusBtn) minusBtn.disabled = item.quantity <= 1;

    updateSummary();
  }

  // ── Remove Item ────────────────────────────────────────────────────────

  function removeItem(itemId) {
    const row = itemsContainer?.querySelector(`[data-item-id="${itemId}"]`);
    if (!row) return;

    row.classList.add('cart-item--removing');
    row.addEventListener('animationend', () => {
      cartItems = cartItems.filter((i) => i.id !== itemId);
      row.remove();
      updateSummary();
    }, { once: true });
  }

  // ── Empty State ────────────────────────────────────────────────────────

  function renderEmptyState() {
    if (!itemsContainer) return;
    itemsContainer.innerHTML = '';

    const empty = document.createElement('div');
    empty.className = 'cart-empty';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'cart-empty__icon';
    iconWrap.appendChild(createIcon('cart', { size: 64 }));
    empty.appendChild(iconWrap);

    const title = document.createElement('h2');
    title.className = 'cart-empty__title';
    title.textContent = 'Sepetiniz boş';
    empty.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'cart-empty__desc';
    desc.textContent = 'Alışverişe başlayın ve beğendiğiniz ürünleri sepete ekleyin.';
    empty.appendChild(desc);

    const cta = document.createElement('a');
    cta.href = '/urunler';
    cta.className = 'cart-checkout-btn cart-empty__cta';
    cta.style.maxWidth = '240px';
    cta.textContent = 'Alışverişe Başla';
    empty.appendChild(cta);

    itemsContainer.appendChild(empty);
  }

  // ── Render Cart Item ───────────────────────────────────────────────────

  function createCartItemRow(item) {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.setAttribute('data-item-id', item.id);

    // Image
    const imageWrap = document.createElement('div');
    imageWrap.className = 'cart-item__image-wrap';
    const img = document.createElement('img');
    img.className = 'cart-item__image';
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    imageWrap.appendChild(img);
    row.appendChild(imageWrap);

    // Body
    const body = document.createElement('div');
    body.className = 'cart-item__body';

    // Info
    const info = document.createElement('div');
    info.className = 'cart-item__info';
    info.innerHTML = `
      <span class="cart-item__name">${item.name}</span>
      <span class="cart-item__variant">${item.variant}</span>
      <span class="cart-item__unit-price">Birim Fiyat: <strong>${formatPrice(item.unitPrice)}</strong></span>
    `;
    body.appendChild(info);

    // Quantity
    const qty = document.createElement('div');
    qty.className = 'cart-qty';

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'cart-qty__btn cart-qty__btn--minus';
    minusBtn.setAttribute('aria-label', 'Adet azalt');
    minusBtn.disabled = item.quantity <= 1;
    minusBtn.appendChild(createIcon('minus', { size: 16 }));

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'cart-qty__input';
    input.value = item.quantity;
    input.min = 1;
    input.max = 99;
    input.setAttribute('aria-label', `${item.name} adedi`);

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'cart-qty__btn cart-qty__btn--plus';
    plusBtn.setAttribute('aria-label', 'Adet artır');
    plusBtn.appendChild(createIcon('plus', { size: 16 }));

    qty.appendChild(minusBtn);
    qty.appendChild(input);
    qty.appendChild(plusBtn);
    body.appendChild(qty);

    // Total
    const total = document.createElement('div');
    total.className = 'cart-item__total';
    total.textContent = formatPrice(item.unitPrice * item.quantity);
    body.appendChild(total);

    // Delete
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'cart-item__delete';
    deleteBtn.setAttribute('aria-label', `${item.name} ürününü sil`);
    deleteBtn.appendChild(createIcon('trash', { size: 18 }));
    body.appendChild(deleteBtn);

    row.appendChild(body);

    // ── Event Listeners ──────────────────────────────────────────────────

    minusBtn.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateItemRow(item.id);
      }
    });

    plusBtn.addEventListener('click', () => {
      if (item.quantity < 99) {
        item.quantity++;
        updateItemRow(item.id);
      }
    });

    input.addEventListener('change', () => {
      let val = parseInt(input.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 99) val = 99;
      item.quantity = val;
      updateItemRow(item.id);
    });

    deleteBtn.addEventListener('click', () => {
      removeItem(item.id);
    });

    return row;
  }

  // ── Render Benefits ────────────────────────────────────────────────────

  function createBenefitsSection() {
    const section = document.createElement('section');
    section.className = 'cart-benefits';
    section.setAttribute('aria-label', 'Alışveriş avantajları');

    const inner = document.createElement('div');
    inner.className = 'container';

    const grid = document.createElement('ul');
    grid.className = 'cart-benefits__grid';
    grid.setAttribute('role', 'list');

    BENEFITS.forEach(({ icon, title, desc, color, bg }) => {
      const li = document.createElement('li');
      li.className = 'cart-benefit';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'cart-benefit__icon-wrap';
      iconWrap.style.color = color;
      iconWrap.style.background = bg;
      iconWrap.appendChild(createIcon(icon, { size: 24 }));

      const textWrap = document.createElement('div');
      textWrap.className = 'cart-benefit__text';
      textWrap.innerHTML = `
        <span class="cart-benefit__title">${title}</span>
        <span class="cart-benefit__desc">${desc}</span>
      `;

      li.appendChild(iconWrap);
      li.appendChild(textWrap);
      grid.appendChild(li);
    });

    inner.appendChild(grid);
    section.appendChild(inner);
    return section;
  }

  // ── Main Render ────────────────────────────────────────────────────────

  function render() {
    element.innerHTML = '';

    // Breadcrumbs
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'cart-breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
    breadcrumbs.innerHTML = `
      <div class="container">
        <ol class="cart-breadcrumbs__list">
          <li><a href="/" class="cart-breadcrumbs__link">ShopApp</a></li>
          <li class="cart-breadcrumbs__separator" aria-hidden="true">/</li>
          <li class="cart-breadcrumbs__current" aria-current="page">Alışveriş Sepetim</li>
        </ol>
      </div>
    `;
    element.appendChild(breadcrumbs);

    // Main layout wrapper
    const main = document.createElement('div');
    main.className = 'container';

    const layout = document.createElement('div');
    layout.className = 'cart-layout';

    // ── Left Column: Cart Items ──────────────────────────────────────────

    const leftCard = document.createElement('div');
    leftCard.className = 'cart-card';

    const header = document.createElement('div');
    header.className = 'cart-card__header';

    const titleEl = document.createElement('h1');
    titleEl.className = 'cart-card__title';
    titleEl.id = 'cart-title';
    const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
    titleEl.innerHTML = `Alışveriş Sepetim <span class="cart-card__count">(${totalItemCount} Ürün)</span>`;
    cartTitleEl = titleEl;
    header.appendChild(titleEl);
    leftCard.appendChild(header);

    const itemsWrap = document.createElement('div');
    itemsWrap.id = 'cart-items';
    itemsContainer = itemsWrap;

    if (cartItems.length === 0) {
      renderEmptyState();
    } else {
      cartItems.forEach((item) => {
        itemsWrap.appendChild(createCartItemRow(item));
      });
    }

    leftCard.appendChild(itemsWrap);
    layout.appendChild(leftCard);

    // ── Right Column: Order Summary ──────────────────────────────────────

    const rightCard = document.createElement('div');
    rightCard.className = 'cart-card cart-summary';

    // Summary header
    const summaryHeader = document.createElement('div');
    summaryHeader.className = 'cart-card__header';
    const summaryTitle = document.createElement('h2');
    summaryTitle.className = 'cart-card__title';
    summaryTitle.textContent = 'Sipariş Özeti';
    summaryHeader.appendChild(summaryTitle);
    rightCard.appendChild(summaryHeader);

    // Summary rows
    const summaryBody = document.createElement('div');
    summaryBody.className = 'cart-summary__body';

    // Subtotal row
    const subtotalRow = document.createElement('div');
    subtotalRow.className = 'cart-summary__row';
    subtotalRow.innerHTML = `<span class="cart-summary__label">Ara Toplam</span>`;
    const subtotalVal = document.createElement('span');
    subtotalVal.className = 'cart-summary__value';
    subtotalVal.id = 'summary-subtotal';
    subtotalVal.textContent = formatPrice(getSubtotal());
    subtotalEl = subtotalVal;
    subtotalRow.appendChild(subtotalVal);
    summaryBody.appendChild(subtotalRow);

    // Shipping row
    const shippingRow = document.createElement('div');
    shippingRow.className = 'cart-summary__row';
    shippingRow.innerHTML = `<span class="cart-summary__label">Kargo</span>`;
    const shippingVal = document.createElement('span');
    shippingVal.className = 'cart-summary__value';
    shippingVal.id = 'summary-shipping';
    shippingEl = shippingVal;
    shippingRow.appendChild(shippingVal);
    summaryBody.appendChild(shippingRow);

    rightCard.appendChild(summaryBody);

    // Coupon section
    const coupon = document.createElement('div');
    coupon.className = 'cart-coupon';
    coupon.innerHTML = `
      <div class="cart-coupon__label">
        <span class="cart-coupon__label-icon"></span>
        Kupon Kodu
      </div>
      <div class="cart-coupon__row">
        <input
          type="text"
          class="cart-coupon__input"
          id="coupon-input"
          placeholder="Kupon kodunuzu girin"
          aria-label="Kupon kodu"
          autocomplete="off"
        />
        <button type="button" class="cart-coupon__apply" id="btn-apply-coupon">Uygula</button>
      </div>
    `;
    rightCard.appendChild(coupon);

    // Inject tag icon into coupon label
    const couponIconSlot = coupon.querySelector('.cart-coupon__label-icon');
    if (couponIconSlot) couponIconSlot.appendChild(createIcon('tag', { size: 16 }));

    // Grand total section
    const totalSection = document.createElement('div');
    totalSection.className = 'cart-summary__total-section';

    const grandTotalRow = document.createElement('div');
    grandTotalRow.className = 'cart-summary__grand-total';
    grandTotalRow.innerHTML = `<span class="cart-summary__grand-label">Genel Toplam</span>`;
    const grandTotalVal = document.createElement('span');
    grandTotalVal.className = 'cart-summary__grand-value';
    grandTotalVal.id = 'summary-grand-total';
    grandTotalVal.textContent = formatPrice(getGrandTotal());
    grandTotalEl = grandTotalVal;
    grandTotalRow.appendChild(grandTotalVal);
    totalSection.appendChild(grandTotalRow);

    // Checkout button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.type = 'button';
    checkoutBtn.className = 'cart-checkout-btn';
    checkoutBtn.id = 'btn-checkout';
    const btnText = document.createElement('span');
    btnText.textContent = 'Ödeme Adımına Geç';
    const btnArrow = document.createElement('span');
    btnArrow.className = 'cart-checkout-btn__arrow';
    btnArrow.appendChild(createIcon('arrow-right', { size: 18 }));
    checkoutBtn.appendChild(btnText);
    checkoutBtn.appendChild(btnArrow);
    checkoutBtn.addEventListener('click', () => navigate('/siparis-onay'));
    totalSection.appendChild(checkoutBtn);

    // Secure note
    const secureNote = document.createElement('div');
    secureNote.className = 'cart-summary__secure-note';
    secureNote.appendChild(createIcon('lock', { size: 14 }));
    const secureText = document.createElement('span');
    secureText.textContent = 'Güvenli ödeme altyapısı';
    secureNote.appendChild(secureText);
    totalSection.appendChild(secureNote);

    rightCard.appendChild(totalSection);
    layout.appendChild(rightCard);

    main.appendChild(layout);
    element.appendChild(main);

    // Benefits footer
    element.appendChild(createBenefitsSection());

    // Initial summary update
    updateSummary();
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
    itemsContainer = null;
    cartTitleEl = null;
    subtotalEl = null;
    grandTotalEl = null;
    shippingEl = null;
  }

  render();

  return { element, destroy };
}
