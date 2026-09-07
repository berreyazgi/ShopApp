/**
 * StateView.js
 * Reusable presentation helpers for the common data-driven page states:
 * loading, empty, and error.
 *
 * These are pure UI helpers — they never fetch data themselves. A page/service
 * decides *when* to show which state; these components only render it.
 *
 * Usage:
 *   import { createLoadingState, createEmptyState, createErrorState } from '.../StateView.js';
 *   container.appendChild(createLoadingState({ message: 'Ürünler yükleniyor...' }));
 */

import { createIcon } from '../Icon/Icon.js';
import { createButton } from '../Button/Button.js';

/**
 * @param {{ message?: string }} [options]
 * @returns {HTMLElement}
 */
export function createLoadingState({ message = 'Yükleniyor...' } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'state-view state-view--loading';
  wrap.setAttribute('role', 'status');
  wrap.setAttribute('aria-live', 'polite');

  const spinner = document.createElement('div');
  spinner.className = 'state-view__spinner';
  spinner.setAttribute('aria-hidden', 'true');
  wrap.appendChild(spinner);

  const text = document.createElement('p');
  text.className = 'state-view__desc';
  text.textContent = message;
  wrap.appendChild(text);

  return wrap;
}

/**
 * @param {{
 *   icon?: string,
 *   title?: string,
 *   description?: string,
 *   actionLabel?: string,
 *   onAction?: () => void,
 * }} [options]
 * @returns {HTMLElement}
 */
export function createEmptyState({
  icon = 'cart',
  title = 'Henüz kayıt bulunamadı',
  description = '',
  actionLabel,
  onAction,
} = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'state-view state-view--empty';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'state-view__icon';
  iconWrap.appendChild(createIcon(icon, { size: 48 }));
  wrap.appendChild(iconWrap);

  const titleEl = document.createElement('h2');
  titleEl.className = 'state-view__title';
  titleEl.textContent = title;
  wrap.appendChild(titleEl);

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'state-view__desc';
    descEl.textContent = description;
    wrap.appendChild(descEl);
  }

  if (actionLabel && onAction) {
    const { element: btn } = createButton({ label: actionLabel, variant: 'primary', onClick: onAction });
    wrap.appendChild(btn);
  }

  return wrap;
}

/**
 * @param {{
 *   title?: string,
 *   message?: string,
 *   retryLabel?: string,
 *   onRetry?: () => void,
 * }} [options]
 * @returns {HTMLElement}
 */
export function createErrorState({
  title = 'Bir hata oluştu',
  message = 'Lütfen daha sonra tekrar deneyin.',
  retryLabel = 'Tekrar Dene',
  onRetry,
} = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'state-view state-view--error';
  wrap.setAttribute('role', 'alert');

  const iconWrap = document.createElement('div');
  iconWrap.className = 'state-view__icon state-view__icon--error';
  iconWrap.appendChild(createIcon('close', { size: 40 }));
  wrap.appendChild(iconWrap);

  const titleEl = document.createElement('h2');
  titleEl.className = 'state-view__title';
  titleEl.textContent = title;
  wrap.appendChild(titleEl);

  const descEl = document.createElement('p');
  descEl.className = 'state-view__desc';
  descEl.textContent = message;
  wrap.appendChild(descEl);

  if (onRetry) {
    const { element: btn } = createButton({ label: retryLabel, variant: 'secondary', onClick: onRetry });
    wrap.appendChild(btn);
  }

  return wrap;
}
