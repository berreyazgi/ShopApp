/**
 * CartPage.js — Shopping Cart Page
 *
 * Renders whatever cart items are supplied to it. No permanent cart data is
 * owned by this page — see cartDemoData.js for the temporary preview fixture
 * used until real cart items are wired in.
 *
 * Full-featured cart page with:
 *  - Breadcrumb navigation
 *  - Cart items with quantity controls (frontend-only)
 *  - Order summary with coupon input (frontend-only)
 *  - Dynamic price recalculation
 *  - Item deletion with animation
 *  - Empty-state transition
 *
 * Exported as default so the router can import it dynamically.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate }   from '../../../app/router.js';
import { getDemoCartItems } from '../data/cartDemoData.js';
import { createCartItemRow } from '../components/CartItem.js';
import { createCartSummary } from '../components/CartSummary.js';

const FREE_SHIPPING_THRESHOLD = 500;


function createEmptyState() {
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

  return empty;
}


/**
 * @param {{ params: object, items?: Array }} _options - `items` lets a future
 *   caller supply real cart items; falls back to temporary demo data.
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function CartPage({ items } = {}) {
  const element = document.createElement('div');
  element.className = 'cart-page';

  let cartItems = (items ?? getDemoCartItems()).map((item) => ({ ...item }));
  const itemRows = new Map();

  // ── Breadcrumbs
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

  const main = document.createElement('div');
  main.className = 'container';
  const layout = document.createElement('div');
  layout.className = 'cart-layout';

  // ── Left Column: Cart Items
  const leftCard = document.createElement('div');
  leftCard.className = 'cart-card';

  const header = document.createElement('div');
  header.className = 'cart-card__header';
  const titleEl = document.createElement('h1');
  titleEl.className = 'cart-card__title';
  header.appendChild(titleEl);
  leftCard.appendChild(header);

  const itemsContainer = document.createElement('div');
  leftCard.appendChild(itemsContainer);
  layout.appendChild(leftCard);

  // ── Right Column: Order Summary
  const summary = createCartSummary({
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    onCheckout: () => navigate('/siparis-onay'),
  });
  layout.appendChild(summary.element);

  main.appendChild(layout);
  element.appendChild(main);

  // ── Calculations ──────────────────────────────────────────────────────

  function getSubtotal() {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  function getShippingCost() {
    return getSubtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : 29.90;
  }

  function updateSummary() {
    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    summary.update({ subtotal, shipping, grandTotal: subtotal + shipping });

    const count = cartItems.reduce((s, i) => s + i.quantity, 0);
    titleEl.innerHTML = `Alışveriş Sepetim <span class="cart-card__count">(${count} Ürün)</span>`;
  }

  function renderItems() {
    itemsContainer.innerHTML = '';
    itemRows.clear();

    if (cartItems.length === 0) {
      itemsContainer.appendChild(createEmptyState());
      return;
    }

    cartItems.forEach((item) => {
      const row = createCartItemRow(item, {
        onQuantityChange: (id, quantity) => {
          const target = cartItems.find((i) => i.id === id);
          if (!target) return;
          target.quantity = quantity;
          itemRows.get(id)?.updateQuantity(quantity);
          updateSummary();
        },
        onRemove: (id) => {
          const rowEntry = itemRows.get(id);
          if (!rowEntry) return;
          rowEntry.element.classList.add('cart-item--removing');
          rowEntry.element.addEventListener('animationend', () => {
            cartItems = cartItems.filter((i) => i.id !== id);
            itemRows.delete(id);
            if (cartItems.length === 0) {
              renderItems();
            } else {
              rowEntry.element.remove();
            }
            updateSummary();
          }, { once: true });
        },
      });

      itemRows.set(item.id, row);
      itemsContainer.appendChild(row.element);
    });
  }

  renderItems();
  updateSummary();

  return { element, destroy: () => {} };
}
