/**
 * ProfileSidebar.js — Profil Navigasyon Kenar Çubuğu
 *
 * Müşteri bilgilerini (dinamik ad, soyad, e-posta, initials avatar)
 * ve sayfa içi / uygulama içi navigasyon bağlantılarını görüntüler.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * Ad ve soyadından baş harfleri türetir (örn. "Berre Yazgı" -> "BY").
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
export function getInitials(firstName = '', lastName = '') {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return (f + l) || 'U';
}

/**
 * @param {{
 *   user: import('../services/profileService.js').UserProfileDto,
 *   onNavigateSection?: (sectionId: string) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createProfileSidebar({ user, onNavigateSection }) {
  const aside = document.createElement('aside');
  aside.className = 'profile-sidebar';
  aside.setAttribute('aria-label', 'Profil menüsü');

  // ─── Kullanıcı Bilgi Kartı ──────────────────────────────────────────────
  const userCard = document.createElement('div');
  userCard.className = 'profile-sidebar__user-card';

  const avatar = document.createElement('div');
  avatar.className = 'profile-sidebar__avatar';
  avatar.setAttribute('role', 'img');
  avatar.setAttribute('aria-label', `${user.fullName || user.firstName} profil resmi`);

  if (user.avatarUrl) {
    const img = document.createElement('img');
    img.src = user.avatarUrl;
    img.alt = user.fullName || user.firstName;
    img.className = 'profile-sidebar__avatar-img';
    avatar.appendChild(img);
  } else {
    const initials = document.createElement('span');
    initials.className = 'profile-sidebar__avatar-initials';
    initials.textContent = getInitials(user.firstName, user.lastName);
    avatar.appendChild(initials);
  }
  userCard.appendChild(avatar);

  const userInfo = document.createElement('div');
  userInfo.className = 'profile-sidebar__user-info';

  const name = document.createElement('h2');
  name.className = 'profile-sidebar__name';
  name.textContent = user.fullName || `${user.firstName} ${user.lastName}`.trim();
  userInfo.appendChild(name);

  const email = document.createElement('p');
  email.className = 'profile-sidebar__email';
  email.textContent = user.email;
  userInfo.appendChild(email);

  userCard.appendChild(userInfo);
  aside.appendChild(userCard);

  // ─── Navigasyon Menüsü ──────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'profile-sidebar__nav';

  const items = [
    { id: 'account', label: 'Hesabım', icon: 'profile', active: true, href: '#hesabim' },
    { id: 'orders', label: 'Siparişlerim', icon: 'cart', href: '/siparisler' },
    { id: 'contact', label: 'Bize Ulaşın', icon: 'mail', href: '/hakkimizda' },
  ];

  const ul = document.createElement('ul');
  ul.className = 'profile-sidebar__list';
  ul.setAttribute('role', 'list');

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'profile-sidebar__item';

    const a = document.createElement('a');
    a.className = `profile-sidebar__link${item.active ? ' profile-sidebar__link--active' : ''}`;
    a.href = item.href;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'profile-sidebar__link-icon';
    iconSpan.appendChild(createIcon(item.icon, { size: 18 }));
    a.appendChild(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'profile-sidebar__link-text';
    labelSpan.textContent = item.label;
    a.appendChild(labelSpan);

    a.addEventListener('click', (e) => {
      if (item.href.startsWith('#')) {
        e.preventDefault();
        if (onNavigateSection) {
          onNavigateSection(item.id);
        }
      }
    });

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  aside.appendChild(nav);

  return aside;
}
