/**
 * PersonalInfoCard.js — Kişisel Bilgiler Kartı
 *
 * Gerçek veritabanı verilerini görüntüler:
 * Ad Soyad, E-posta, Telefon, Üyelik Tarihi
 * ve "Bilgileri Düzenle" butonunu içerir.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

/**
 * @param {{
 *   user: import('../services/profileService.js').UserProfileDto,
 *   onEdit: () => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createPersonalInfoCard({ user, onEdit }) {
  const card = document.createElement('section');
  card.className = 'profile-card profile-card--personal-info';
  card.id = 'hesabim';
  card.setAttribute('aria-labelledby', 'personal-info-title');

  // Header
  const header = document.createElement('div');
  header.className = 'profile-card__header';

  const title = document.createElement('h2');
  title.className = 'profile-card__title';
  title.id = 'personal-info-title';
  title.textContent = 'Kişisel Bilgilerim';
  header.appendChild(title);

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'profile-btn profile-btn--outline profile-btn--sm';
  editBtn.setAttribute('aria-label', 'Kişisel bilgileri düzenle');
  editBtn.appendChild(createIcon('edit', { size: 14 }));
  editBtn.appendChild(document.createTextNode(' Bilgileri Düzenle'));
  editBtn.addEventListener('click', onEdit);
  header.appendChild(editBtn);

  card.appendChild(header);

  // Body: Key-Value list
  const list = document.createElement('dl');
  list.className = 'profile-info-grid';

  const items = [
    { label: 'Ad Soyad', value: user.fullName || `${user.firstName} ${user.lastName}`.trim() },
    { label: 'E-posta', value: user.email },
    { label: 'Telefon', value: user.phone || 'Belirtilmemiş' },
    { label: 'Üyelik Tarihi', value: formatDate(user.createdAt) },
  ];

  items.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'profile-info-row';

    const dt = document.createElement('dt');
    dt.className = 'profile-info-row__label';
    dt.textContent = label;
    row.appendChild(dt);

    const dd = document.createElement('dd');
    dd.className = 'profile-info-row__value';
    dd.textContent = value;
    row.appendChild(dd);

    list.appendChild(row);
  });

  card.appendChild(list);
  return card;
}
