/**
 * CartSummary.js
 * Renders the order-summary card (subtotal, shipping, coupon, grand total,
 * checkout action) for a supplied set of totals. Pure presentation — the
 * caller computes totals and re-invokes `update()` when the cart changes.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{ freeShippingThreshold: number, onCheckout: () => void }} options
 * @returns {{ element: HTMLElement, update: (totals: { subtotal: number, shipping: number, grandTotal: number }) => void }}
 */
export function createCartSummary({ freeShippingThreshold, onCheckout }) {
  const card = document.createElement('div');
  card.className = 'cart-card cart-summary';

  const header = document.createElement('div');
  header.className = 'cart-card__header';
  header.innerHTML = '<h2 class="cart-card__title">Sipariş Özeti</h2>';
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'cart-summary__body';

  const subtotalRow = document.createElement('div');
  subtotalRow.className = 'cart-summary__row';
  subtotalRow.innerHTML = '<span class="cart-summary__label">Ara Toplam</span>';
  const subtotalVal = document.createElement('span');
  subtotalVal.className = 'cart-summary__value';
  subtotalRow.appendChild(subtotalVal);
  body.appendChild(subtotalRow);

  const shippingRow = document.createElement('div');
  shippingRow.className = 'cart-summary__row';
  shippingRow.innerHTML = '<span class="cart-summary__label">Kargo</span>';
  const shippingVal = document.createElement('span');
  shippingVal.className = 'cart-summary__value';
  shippingRow.appendChild(shippingVal);
  body.appendChild(shippingRow);

  card.appendChild(body);

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
  card.appendChild(coupon);
  coupon.querySelector('.cart-coupon__label-icon')?.appendChild(createIcon('tag', { size: 16 }));

  const totalSection = document.createElement('div');
  totalSection.className = 'cart-summary__total-section';

  const grandTotalRow = document.createElement('div');
  grandTotalRow.className = 'cart-summary__grand-total';
  grandTotalRow.innerHTML = '<span class="cart-summary__grand-label">Genel Toplam</span>';
  const grandTotalVal = document.createElement('span');
  grandTotalVal.className = 'cart-summary__grand-value';
  grandTotalRow.appendChild(grandTotalVal);
  totalSection.appendChild(grandTotalRow);

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
  checkoutBtn.addEventListener('click', onCheckout);
  totalSection.appendChild(checkoutBtn);

  const secureNote = document.createElement('div');
  secureNote.className = 'cart-summary__secure-note';
  secureNote.appendChild(createIcon('lock', { size: 14 }));
  const secureText = document.createElement('span');
  secureText.textContent = 'Güvenli ödeme altyapısı';
  secureNote.appendChild(secureText);
  totalSection.appendChild(secureNote);

  card.appendChild(totalSection);

  function formatPrice(amount) {
    return amount.toLocaleString('tr-TR') + ' TL';
  }

  function update({ subtotal, shipping, grandTotal }) {
    subtotalVal.textContent = formatPrice(subtotal);
    grandTotalVal.textContent = formatPrice(grandTotal);

    if (shipping === 0) {
      shippingVal.innerHTML = '';
      const freeWrap = document.createElement('span');
      freeWrap.className = 'cart-summary__shipping-free';
      freeWrap.appendChild(createIcon('check', { size: 14 }));
      freeWrap.appendChild(document.createTextNode('Ücretsiz'));
      const note = document.createElement('span');
      note.className = 'cart-summary__shipping-note';
      note.textContent = `(${freeShippingThreshold} TL üzeri)`;
      freeWrap.appendChild(note);
      shippingVal.appendChild(freeWrap);
    } else {
      shippingVal.textContent = formatPrice(shipping);
    }
  }

  return { element: card, update };
}
