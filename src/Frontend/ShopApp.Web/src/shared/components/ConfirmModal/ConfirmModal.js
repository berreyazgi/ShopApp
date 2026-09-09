/**
 * ConfirmModal.js — Accessible Confirmation Dialog Component
 *
 * Provides an accessible, keyboard-friendly confirmation modal with:
 *  - role="dialog" and aria-modal="true"
 *  - Trap focus and Escape key cancellation
 *  - Backdrop click cancellation
 *  - Double-click and concurrent submission protection during async confirmation
 *  - Focus restoration to the invoking trigger element
 */

import { createIcon } from '../Icon/Icon.js';

/**
 * @param {{
 *   title?: string,
 *   message: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   confirmVariant?: 'primary' | 'danger' | 'secondary',
 *   triggerElement?: HTMLElement | null,
 *   onConfirm: () => Promise<void> | void,
 *   onCancel?: () => void,
 * }} options
 * @returns {{ element: HTMLElement, close: (cancelled?: boolean) => void }}
 */
export function createConfirmModal({
  title = 'Çıkış Yap',
  message = 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
  confirmLabel = 'Çıkış Yap',
  cancelLabel = 'İptal',
  confirmVariant = 'danger',
  triggerElement = null,
  onConfirm,
  onCancel,
} = {}) {
  const previousActiveElement = triggerElement ?? (typeof document !== 'undefined' ? document.activeElement : null);

  const overlay = document.createElement('div');
  overlay.className = 'confirm-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'confirm-modal-title');
  overlay.setAttribute('aria-describedby', 'confirm-modal-message');

  const container = document.createElement('div');
  container.className = 'confirm-modal-container';

  // ── Header ──
  const header = document.createElement('div');
  header.className = 'confirm-modal-header';

  const titleEl = document.createElement('h2');
  titleEl.id = 'confirm-modal-title';
  titleEl.className = 'confirm-modal-title';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'confirm-modal-close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', () => handleCancel());
  header.appendChild(closeBtn);

  container.appendChild(header);

  // ── Body ──
  const body = document.createElement('div');
  body.className = 'confirm-modal-body';

  const msgEl = document.createElement('p');
  msgEl.id = 'confirm-modal-message';
  msgEl.className = 'confirm-modal-message';
  msgEl.textContent = message;
  body.appendChild(msgEl);

  container.appendChild(body);

  // ── Footer ──
  const footer = document.createElement('div');
  footer.className = 'confirm-modal-footer';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'btn btn--outline btn--md confirm-modal-btn confirm-modal-btn--cancel';
  cancelBtn.textContent = cancelLabel;
  cancelBtn.addEventListener('click', () => handleCancel());
  footer.appendChild(cancelBtn);

  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  const variantClass = confirmVariant === 'danger' ? 'btn--danger' : (confirmVariant === 'secondary' ? 'btn--secondary' : 'btn--primary');
  confirmBtn.className = `btn ${variantClass} btn--md confirm-modal-btn confirm-modal-btn--confirm`;
  confirmBtn.textContent = confirmLabel;
  confirmBtn.addEventListener('click', () => handleConfirm());
  footer.appendChild(confirmBtn);

  container.appendChild(footer);
  overlay.appendChild(container);

  // ── Logic & Accessibility ──
  let isSubmitting = false;
  let isClosed = false;

  function handleCancel() {
    if (isSubmitting || isClosed) return;
    close(true);
  }

  async function handleConfirm() {
    if (isSubmitting || isClosed) return;
    isSubmitting = true;

    // Disable buttons to prevent duplicate triggers
    confirmBtn.disabled = true;
    cancelBtn.disabled = true;
    closeBtn.disabled = true;
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'İşlem yapılıyor...';

    try {
      if (typeof onConfirm === 'function') {
        await onConfirm();
      }
      close(false);
    } catch (error) {
      isSubmitting = false;
      confirmBtn.disabled = false;
      cancelBtn.disabled = false;
      closeBtn.disabled = false;
      confirmBtn.textContent = originalText;
      console.error('[ConfirmModal] Error during confirmation:', error);
    }
  }

  function handleKeydown(e) {
    if (isClosed) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  function handleBackdropClick(e) {
    if (e.target === overlay) {
      handleCancel();
    }
  }

  function close(cancelled = true) {
    if (isClosed) return;
    isClosed = true;

    document.removeEventListener('keydown', handleKeydown);
    overlay.removeEventListener('click', handleBackdropClick);

    if (overlay.parentNode) {
      overlay.remove();
    }

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch {
        // Ignore if element is unmounted
      }
    }

    if (cancelled && typeof onCancel === 'function') {
      onCancel();
    }
  }

  document.addEventListener('keydown', handleKeydown);
  overlay.addEventListener('click', handleBackdropClick);

  // Focus cancel button initially for safety (prevent accidental confirm on Enter)
  setTimeout(() => {
    if (!isClosed && cancelBtn && typeof cancelBtn.focus === 'function') {
      cancelBtn.focus();
    }
  }, 0);

  return { element: overlay, close };
}

/**
 * Convenience helper that instantiates and automatically appends the confirmation modal to document.body.
 *
 * @param {Parameters<typeof createConfirmModal>[0]} options
 * @returns {{ element: HTMLElement, close: (cancelled?: boolean) => void }}
 */
export function openConfirmModal(options = {}) {
  const modal = createConfirmModal(options);
  if (typeof document !== 'undefined' && document.body) {
    document.body.appendChild(modal.element);
  }
  return modal;
}
