/**
 * CartItem.js
 * Renders a single cart line item row with local quantity controls and a
 * remove button. All interactions are frontend-only — the caller decides
 * what to do with quantity/remove events (e.g. update a local total).
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';

/**
 * @param {{ id: string, name: string, variant: string, unitPrice: number, quantity: number, image: string }} item
 * @param {{ onQuantityChange: (id: string, quantity: number) => void, onRemove: (id: string) => void }} handlers
 * @returns {{ element: HTMLElement, updateQuantity: (quantity: number) => void }}
 */
export function createCartItemRow(item, { onQuantityChange, onRemove }) {
  const row = document.createElement('div');
  row.className = 'cart-item';
  row.setAttribute('data-item-id', item.id);

  const imageWrap = document.createElement('div');
  imageWrap.className = 'cart-item__image-wrap';
  const img = document.createElement('img');
  img.className = 'cart-item__image';
  img.src = item.image;
  img.alt = item.name;
  img.loading = 'lazy';
  imageWrap.appendChild(img);
  row.appendChild(imageWrap);

  const body = document.createElement('div');
  body.className = 'cart-item__body';

  const info = document.createElement('div');
  info.className = 'cart-item__info';

  const nameEl = document.createElement('span');
  nameEl.className = 'cart-item__name';
  nameEl.textContent = item.name;
  info.appendChild(nameEl);

  const variantEl = document.createElement('span');
  variantEl.className = 'cart-item__variant';
  variantEl.textContent = item.variant;
  info.appendChild(variantEl);

  const unitPriceEl = document.createElement('span');
  unitPriceEl.className = 'cart-item__unit-price';
  unitPriceEl.append('Birim Fiyat: ');
  const unitPriceStrong = document.createElement('strong');
  unitPriceStrong.textContent = formatPrice(item.unitPrice);
  unitPriceEl.appendChild(unitPriceStrong);
  info.appendChild(unitPriceEl);

  body.appendChild(info);

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

  const total = document.createElement('div');
  total.className = 'cart-item__total';
  total.textContent = formatPrice(item.unitPrice * item.quantity);
  body.appendChild(total);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'cart-item__delete';
  deleteBtn.setAttribute('aria-label', `${item.name} ürününü sil`);
  deleteBtn.appendChild(createIcon('trash', { size: 18 }));
  body.appendChild(deleteBtn);

  row.appendChild(body);

  function updateQuantity(quantity) {
    total.textContent = formatPrice(item.unitPrice * quantity);
    input.value = quantity;
    minusBtn.disabled = quantity <= 1;
  }

  minusBtn.addEventListener('click', () => {
    if (item.quantity > 1) onQuantityChange(item.id, item.quantity - 1);
  });

  plusBtn.addEventListener('click', () => {
    if (item.quantity < 99) onQuantityChange(item.id, item.quantity + 1);
  });

  input.addEventListener('change', () => {
    let value = parseInt(input.value, 10);
    if (Number.isNaN(value) || value < 1) value = 1;
    if (value > 99) value = 99;
    onQuantityChange(item.id, value);
  });

  deleteBtn.addEventListener('click', () => onRemove(item.id));

  return { element: row, updateQuantity };
}
