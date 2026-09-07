/**
 * AdminMetricCard.js
 * Renders a single dashboard / summary metric tile (label + value + icon).
 * If value is missing/null, renders '—' safely without inventing data.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   icon: string,
 *   label: string,
 *   value?: string | number | null,
 *   tone?: 'default' | 'warning' | 'success' | 'purple',
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminMetricCard({ icon, label, value, tone = 'default' }) {
  const card = document.createElement('article');
  card.className = `admin-metric-card admin-metric-card--${tone}`;

  const iconWrap = document.createElement('div');
  iconWrap.className = 'admin-metric-card__icon';
  iconWrap.appendChild(createIcon(icon, { size: 22 }));
  card.appendChild(iconWrap);

  const body = document.createElement('div');
  body.className = 'admin-metric-card__body';

  const valueEl = document.createElement('span');
  valueEl.className = 'admin-metric-card__value';
  valueEl.textContent = value !== undefined && value !== null && value !== '' ? String(value) : '—';
  body.appendChild(valueEl);

  const labelEl = document.createElement('span');
  labelEl.className = 'admin-metric-card__label';
  labelEl.textContent = label;
  body.appendChild(labelEl);

  card.appendChild(body);
  return card;
}
