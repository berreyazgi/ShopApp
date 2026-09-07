/**
 * AdminPageHeader.js — Reusable header for admin pages
 *
 * Displays:
 *  - Page Title (h1)
 *  - Descriptive Turkish text
 *  - Optional Primary Action Button (e.g. "+ Yeni Kategori Ekle")
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   title: string,
 *   description?: string,
 *   primaryAction?: { label: string, icon?: string, onClick: () => void },
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminPageHeader({ title, description, primaryAction }) {
  const header = document.createElement('div');
  header.className = 'admin-page-header';

  const left = document.createElement('div');
  left.className = 'admin-page-header__left';

  const titleEl = document.createElement('h1');
  titleEl.className = 'admin-page-header__title';
  titleEl.textContent = title;
  left.appendChild(titleEl);

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'admin-page-header__desc';
    descEl.textContent = description;
    left.appendChild(descEl);
  }

  header.appendChild(left);

  if (primaryAction) {
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'admin-page-header__actions';

    const { element: btn } = createButton({
      label: primaryAction.label,
      variant: 'primary',
      onClick: primaryAction.onClick,
    });

    if (primaryAction.icon) {
      const icon = createIcon(primaryAction.icon, { size: 16 });
      icon.style.marginRight = '6px';
      btn.prepend(icon);
    }

    actionsWrap.appendChild(btn);
    header.appendChild(actionsWrap);
  }

  return header;
}
