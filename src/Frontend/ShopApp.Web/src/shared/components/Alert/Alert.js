/**
 * Alert.js
 * Reusable alert/feedback component.
 *
 * Supports:
 *  - error, success, info, warning variants
 *  - Optional dismissible behavior
 *  - aria-live region for screen reader announcements
 *
 * Usage:
 *   import { createAlert } from '../Alert/Alert.js';
 *   const alert = createAlert({ type: 'error', message: 'Bir hata oluştu.' });
 *   container.appendChild(alert.element);
 *   // Later:
 *   alert.setMessage('Yeni mesaj.');
 *   alert.destroy();
 */

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{
 *   type?:        'error' | 'success' | 'info' | 'warning',
 *   message?:     string,
 *   dismissible?: boolean,
 *   className?:   string,
 * }} options
 * @returns {{ element: HTMLElement, setMessage: (msg: string) => void, clear: () => void, destroy: () => void }}
 */
export function createAlert(options = {}) {
  const {
    type        = 'error',
    message     = '',
    dismissible = false,
    className   = '',
  } = options;

  const element = document.createElement('div');
  element.className = `alert alert--${type}${className ? ` ${className}` : ''}`;

  // aria-live makes the message announced by screen readers when it changes.
  // 'assertive' is used for errors, 'polite' for success/info.
  element.setAttribute('role', type === 'error' ? 'alert' : 'status');
  element.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  element.setAttribute('aria-atomic', 'true');

  // Hidden by default until a message is set.
  element.hidden = !message;

  let dismissBtn = null;
  const cleanupFns = [];

  function render(msg) {
    element.innerHTML = '';

    const iconMap = {
      error:   '⚠',
      success: '✓',
      info:    'ℹ',
      warning: '⚠',
    };

    const iconEl = document.createElement('span');
    iconEl.className = 'alert__icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = iconMap[type] ?? '';

    const msgEl = document.createElement('span');
    msgEl.className = 'alert__message';
    msgEl.textContent = msg;

    element.appendChild(iconEl);
    element.appendChild(msgEl);

    if (dismissible) {
      dismissBtn = document.createElement('button');
      dismissBtn.type = 'button';
      dismissBtn.className = 'alert__dismiss';
      dismissBtn.setAttribute('aria-label', 'Uyarıyı kapat');
      dismissBtn.textContent = '×';

      const onDismiss = () => {
        element.hidden = true;
        element.innerHTML = '';
      };
      dismissBtn.addEventListener('click', onDismiss);
      cleanupFns.push(() => dismissBtn?.removeEventListener('click', onDismiss));

      element.appendChild(dismissBtn);
    }
  }

  if (message) render(message);

  // ── Public API ─────────────────────────────────────────────────────────

  /**
   * Updates the alert with a new message and makes it visible.
   * @param {string} msg
   */
  function setMessage(msg) {
    if (!msg) {
      clear();
      return;
    }
    render(msg);
    element.hidden = false;
  }

  /**
   * Hides the alert and clears its content.
   */
  function clear() {
    element.hidden = true;
    element.innerHTML = '';
  }

  /**
   * Removes event listeners and cleans up.
   */
  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  return { element, setMessage, clear, destroy };
}
