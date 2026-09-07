/**
 * AdminStatusBadge.js — Semantic Status Badges
 *
 * Renders status indicators with dot and appropriate tone.
 * Supports:
 *  - Boolean: isActive ? 'Aktif' : 'Pasif'
 *  - Order Statuses: 'Hazırlanıyor', 'Kargoda', 'Teslim Edildi', 'İptal Edildi'
 */

/**
 * @param {{
 *   status?: string,
 *   isActive?: boolean,
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminStatusBadge({ status, isActive } = {}) {
  const badge = document.createElement('span');
  badge.className = 'admin-status-badge';

  let text = status;
  let tone = 'neutral';

  if (isActive !== undefined) {
    text = isActive ? 'Aktif' : 'Pasif';
    tone = isActive ? 'success' : 'neutral';
  } else if (status) {
    const s = String(status).toLowerCase();
    if (s.includes('aktif') || s.includes('teslim') || s.includes('onay')) {
      tone = 'success';
    } else if (s.includes('kargo') || s.includes('hazır') || s.includes('bekle')) {
      tone = 'warning';
    } else if (s.includes('iptal') || s.includes('iade')) {
      tone = 'danger';
    } else {
      tone = 'neutral';
    }
  } else {
    text = '—';
  }

  badge.classList.add(`admin-status-badge--${tone}`);

  const dot = document.createElement('span');
  dot.className = 'admin-status-badge__dot';
  dot.setAttribute('aria-hidden', 'true');
  badge.appendChild(dot);

  const textEl = document.createElement('span');
  textEl.textContent = text;
  badge.appendChild(textEl);

  return badge;
}
