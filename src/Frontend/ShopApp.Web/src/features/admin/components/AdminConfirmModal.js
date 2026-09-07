/**
 * AdminConfirmModal.js — Accessible Confirmation Dialog
 *
 * Used for confirming deletions (e.g. "Bu kategoriyi silmek istediğinize emin misiniz?").
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   title?: string,
 *   message: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   onConfirm: () => void,
 *   onCancel?: () => void,
 * }} options
 * @returns {{ element: HTMLElement, close: () => void }}
 */
export function createAdminConfirmModal({
  title = 'İşlemi Onayla',
  message,
  confirmLabel = 'Sil',
  cancelLabel = 'İptal',
  onConfirm,
  onCancel,
}) {
  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);

  const modal = document.createElement('div');
  modal.className = 'admin-modal';

  // Header
  const header = document.createElement('div');
  header.className = 'admin-modal__header';

  const titleEl = document.createElement('h3');
  titleEl.className = 'admin-modal__title';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'admin-modal__close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

  modal.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'admin-modal__body';
  const msgEl = document.createElement('p');
  msgEl.style.margin = '0';
  msgEl.textContent = message;
  body.appendChild(msgEl);
  modal.appendChild(body);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'admin-modal__footer';

  const { element: cancelBtn } = createButton({
    label: cancelLabel,
    variant: 'secondary',
    onClick: close,
  });
  footer.appendChild(cancelBtn);

  const { element: confirmBtn } = createButton({
    label: confirmLabel,
    variant: 'primary',
    onClick: () => {
      close();
      if (typeof onConfirm === 'function') onConfirm();
    },
  });
  confirmBtn.style.backgroundColor = 'var(--color-danger, #dc3545)';
  confirmBtn.style.borderColor = 'var(--color-danger, #dc3545)';
  footer.appendChild(confirmBtn);

  modal.appendChild(footer);
  overlay.appendChild(modal);

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', handleKeydown);
    if (typeof onCancel === 'function') onCancel();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  document.addEventListener('keydown', handleKeydown);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return { element: overlay, close };
}
