/**
 * CartPage.js — Shopping Cart Page
 *
 * Loads the authenticated customer's active basket from the real backend
 * (cartService.js -> SepetController) and keeps it in sync with every
 * quantity change / removal — this is not a frontend-only cart.
 *
 * Full-featured cart page with:
 *  - Breadcrumb navigation
 *  - Cart items with quantity controls (persisted server-side)
 *  - Order summary with coupon input (frontend-only)
 *  - Dynamic price recalculation
 *  - Item deletion with animation
 *  - Empty-state transition
 *
 * Exported as default so the router can import it dynamically.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate }   from '../../../app/router.js';
import { createCartItemRow } from '../components/CartItem.js';
import { createCartSummary } from '../components/CartSummary.js';
import { createLoadingState, createErrorState } from '../../../shared/components/StateView/StateView.js';
import { getOrCreateActiveCart, getCartItems, updateCartItem, removeCartItem } from '../services/cartService.js';
// TEMPORARY PAYMENT BYPASS — see handleTemporaryCheckout() below. createOrder()
// itself is the real, permanent order-creation service call and is not going
// away; only *how/when* it gets invoked from the cart changes once a Payment
// Microservice exists.
import { createOrder } from '../../orders/services/orderService.js';
// Address requirement is a permanent checkout rule (independent of payment):
// a customer may add products to the basket without an address, but may not
// proceed past "Ödeme Adımına Geç" without at least one saved one.
import { getAddresses } from '../../profile/services/profileService.js';
import { openConfirmModal } from '../../../shared/components/ConfirmModal/ConfirmModal.js';

const FREE_SHIPPING_THRESHOLD = 500;

/** Maps a backend ResultSepetUrunDto to the shape CartItem.js renders. */
function mapCartLine(dto) {
  const variant = (dto.ozellikler ?? [])
    .map((o) => `${o.ozellikAd}: ${o.deger}`)
    .join(', ');

  return {
    id: dto.id,
    name: dto.urunAd,
    variant,
    unitPrice: dto.fiyatGecmis,
    quantity: dto.urunMiktar,
    image: dto.gorselUrl || '',
  };
}

function createEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'cart-empty';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'cart-empty__icon';
  iconWrap.appendChild(createIcon('cart', { size: 64 }));
  empty.appendChild(iconWrap);

  const title = document.createElement('h2');
  title.className = 'cart-empty__title';
  title.textContent = 'Sepetiniz boş.';
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
 * @param {{ params?: object, items?: Array }} [options] - `items` accepts pre-supplied cart items (used by tests); otherwise the page loads the real active cart itself.
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function CartPage({ items } = {}) {
  const element = document.createElement('div');
  element.className = 'cart-page';

  let cartId = null;
  let cartItems = (items ?? []).map((item) => ({ ...item }));
  const itemRows = new Map();
  let destroyed = false;

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
    onCheckout: () => handleCheckout(),
  });
  layout.appendChild(summary.element);

  main.appendChild(layout);
  element.appendChild(main);

  // ── Calculations ──────────────────────────────────────────────────────

  function getSubtotal() {
    return cartItems.reduce((sum, item) => sum + (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0), 0);
  }

  function getShippingCost() {
    if (cartItems.length === 0) return 0;
    return getSubtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : 29.90;
  }

  function updateSummary() {
    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    summary.update({ subtotal, shipping, grandTotal: subtotal + shipping });

    const count = cartItems.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
    titleEl.innerHTML = '';
    titleEl.append('Alışveriş Sepetim ');
    const countSpan = document.createElement('span');
    countSpan.className = 'cart-card__count';
    countSpan.textContent = `(${count} Ürün)`;
    titleEl.appendChild(countSpan);
  }

  function renderItems() {
    itemsContainer.innerHTML = '';
    itemRows.clear();

    if (cartItems.length === 0) {
      summary.element.style.display = 'none';
      layout.style.gridTemplateColumns = '1fr';
      header.style.display = 'none';
      itemsContainer.appendChild(createEmptyState());
      return;
    }

    summary.element.style.display = '';
    layout.style.gridTemplateColumns = '';
    header.style.display = '';

    cartItems.forEach((item) => {
      const row = createCartItemRow(item, {
        onQuantityChange: async (id, quantity) => {
          const target = cartItems.find((i) => i.id === id);
          if (!target) return;
          const previousQuantity = target.quantity;
          target.quantity = quantity;
          itemRows.get(id)?.updateQuantity(quantity);
          updateSummary();

          try {
            await updateCartItem(cartId, id, { urunMiktar: quantity });
          } catch (error) {
            target.quantity = previousQuantity;
            itemRows.get(id)?.updateQuantity(previousQuantity);
            updateSummary();
            alert(error?.message || 'Adet güncellenemedi.');
          }
        },
        onRemove: async (id) => {
          try {
            await removeCartItem(cartId, id);
          } catch (error) {
            alert(error?.message || 'Ürün sepetten kaldırılamadı.');
            return;
          }

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

  let checkoutInProgress = false;

  function showAddressRequiredModal() {
    openConfirmModal({
      title: 'Teslimat Adresi Gerekli',
      message: 'Sipariş oluşturabilmek için önce bir teslimat adresi eklemelisiniz. Profil sayfanızdan adres bilgilerinizi ekledikten sonra alışverişinize devam edebilirsiniz.',
      confirmLabel: 'Adres Ekle',
      cancelLabel: 'İptal',
      confirmVariant: 'primary',
      onConfirm: () => navigate('/profil#adreslerim'),
    });
  }

  /**
   * Checkout entry point. Permanent business rule, independent of payment:
   * a customer may add products to the basket without an address, but may
   * not proceed past this point without at least one saved delivery address
   * — checked here, once, right as checkout starts. Only once that passes
   * does the (temporary) order-creation step below run.
   */
  async function handleCheckout() {
    // Guards against a double-click (or double Enter) firing two orders —
    // the button is also disabled below, this is the source-of-truth guard.
    if (checkoutInProgress || cartItems.length === 0) return;

    checkoutInProgress = true;
    summary.setCheckoutProcessing(true);

    try {
      const addresses = await getAddresses();
      if (!addresses || addresses.length === 0) {
        checkoutInProgress = false;
        summary.setCheckoutProcessing(false);
        showAddressRequiredModal();
        return;
      }

      await handleTemporaryCheckout();
    } catch (error) {
      checkoutInProgress = false;
      summary.setCheckoutProcessing(false);
      console.error('[CartPage] checkout failed:', error);
      alert(error?.message || 'Sipariş oluşturulamadı. Lütfen tekrar deneyin.');
    }
  }

  // ============================================================
  // TEMPORARY PAYMENT BYPASS - START
  // TODO(PaymentMicroservice): Remove/replace this block when Payment
  // Microservice integration is implemented.
  //
  // Current temporary behavior:
  //   address verified -> create Siparis (createOrder()) -> confirmation
  // NO REAL PAYMENT IS PROCESSED HERE. This only exists so checkout is
  // usable end-to-end (cart -> order -> "Siparişlerim") before a Payment
  // Microservice exists. createOrder() itself (orderService.js) and the
  // backend CreateSiparisCommand are permanent — they stay after payment
  // is added; only this trigger function is temporary. The address check
  // in handleCheckout() above is also permanent and stays as-is.
  //
  // Replacing this later means swapping the body of this one function
  // (conceptually renaming it to handlePaymentCheckout()) for a real
  // payment step — CartSummary, handleCheckout()'s address guard,
  // OrderConfirmationPage, OrderListPage and orderService.js do not need
  // to change. Errors still surface through handleCheckout()'s try/catch.
  // ============================================================
  async function handleTemporaryCheckout() {
    // FUTURE PAYMENT MICROSERVICE FLOW:
    //
    // const paymentResult = await paymentService.startPayment({
    //   cartId,
    //   amount: getSubtotal() + getShippingCost(),
    // });
    // if (!paymentResult.success) {
    //   throw new Error(paymentResult.message);
    // }
    // const order = await createOrder(paymentResult.paymentReference);

    const order = await createOrder();
    // Navigate with the real created-order id so OrderConfirmationPage can
    // load the persisted Siparis/SiparisUrunleri — never fabricated data,
    // and reload-safe since the id lives in the URL, not in memory/state.
    navigate(`/siparis-onay?orderId=${order.id}`);
  }
  // ============================================================
  // TEMPORARY PAYMENT BYPASS - END
  // ============================================================

  // ── Load real cart data from the backend ────────────────────────────────

  async function load() {
    itemsContainer.innerHTML = '';
    itemsContainer.appendChild(createLoadingState({ message: 'Sepetiniz yükleniyor...' }));
    header.style.display = 'none';
    summary.element.style.display = 'none';

    try {
      const cart = await getOrCreateActiveCart();
      if (destroyed) return;
      cartId = cart.id;

      const dtos = await getCartItems(cartId);
      if (destroyed) return;

      cartItems = (dtos ?? []).map(mapCartLine);
      renderItems();
      updateSummary();
    } catch (error) {
      if (destroyed) return;
      itemsContainer.innerHTML = '';
      itemsContainer.appendChild(createErrorState({
        title: 'Sepetiniz yüklenemedi',
        message: error?.message ?? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        onRetry: load,
      }));
      console.error('[CartPage] load failed:', error);
    }
  }

  if (items) {
    // Pre-supplied items (tests / previews) — render as-is, no network call.
    renderItems();
    updateSummary();
  } else {
    load();
  }

  return {
    element,
    destroy: () => {
      destroyed = true;
    },
  };
}
