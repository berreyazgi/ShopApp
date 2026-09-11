/**
 * Toast.js
 * Lightweight, reusable success/error/info notification that appears in a
 * fixed corner of the viewport and disappears on its own — for confirming
 * an action completed (e.g. "Ürün başarıyla eklendi.") without blocking the
 * UI the way a native alert() does.
 *
 * Built on top of the shared Alert component (../Alert/Alert.js) for its
 * visual language (icon + message per type) rather than reimplementing it;
 * this module only adds the toast-specific behavior: fixed positioning, a
 * stacking host appended once to document.body (so it survives a page
 * re-rendering its own container), and auto-dismiss.
 *
 * Usage:
 *   import { showToast } from '.../shared/components/Toast/Toast.js';
 *   showToast({ type: 'success', message: 'Ürün başarıyla eklendi.' });
 */

import { createAlert } from '../Alert/Alert.js';

const HOST_ID = 'shared-toast-host';

function getOrCreateHost() {
  let host = document.getElementById(HOST_ID);
  if (!host) {
    host = document.createElement('div');
    host.id = HOST_ID;
    host.className = 'toast-host';
    document.body.appendChild(host);
  }
  return host;
}

/**
 * @param {{ type?: 'success' | 'error' | 'info' | 'warning', message: string, duration?: number }} options
 * @returns {{ dismiss: () => void }}
 */
export function showToast({ type = 'success', message, duration = 3000 } = {}) {
  if (!message) return { dismiss: () => {} };

  const host = getOrCreateHost();

  const wrapper = document.createElement('div');
  wrapper.className = 'toast-item';

  const alert = createAlert({ type, message, dismissible: true });
  wrapper.appendChild(alert.element);
  host.appendChild(wrapper);

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    wrapper.classList.add('toast-item--leaving');
    wrapper.addEventListener('transitionend', () => wrapper.remove(), { once: true });
    // Safety net in case the transitionend event never fires (e.g. reduced-motion).
    setTimeout(() => wrapper.remove(), 400);
  }

  const dismissBtn = wrapper.querySelector('.alert__dismiss');
  if (dismissBtn) dismissBtn.addEventListener('click', dismiss);

  const timer = setTimeout(dismiss, duration);
  wrapper.addEventListener('mouseenter', () => clearTimeout(timer));

  return { dismiss };
}
