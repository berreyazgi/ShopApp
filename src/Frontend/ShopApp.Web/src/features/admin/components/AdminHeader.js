/**
 * AdminHeader.js — Admin Portal Top Header
 *
 * Displays:
 *  - Brand logo & Admin Paneli badge
 *  - Sidebar toggle button (mobile/tablet)
 *  - Global admin search input (fires local event)
 *  - Notification alert button
 *  - Current admin user profile chip (dynamically populated from auth state)
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { getState } from '../../auth/state/authStore.js';
import { openConfirmModal } from '../../../shared/components/ConfirmModal/ConfirmModal.js';
import { logout } from '../../auth/services/authService.js';
import { navigate } from '../../../app/router.js';

/**
 * @param {{
 *   user?: { fullName?: string, firstName?: string, lastName?: string, email?: string, avatarUrl?: string, roles?: string[] } | null,
 *   onToggleSidebar?: () => void,
 *   onSearch?: (query: string) => void,
 *   onLogout?: (triggerEl?: HTMLElement) => void,
 * }} [options]
 * @returns {HTMLElement}
 */
export function createAdminHeader({ user = null, onToggleSidebar, onSearch, onLogout } = {}) {
  const currentUser = user ?? getState().user;

  const header = document.createElement('header');
  header.className = 'admin-topbar';
  header.setAttribute('role', 'banner');

  // ── Left: Toggle + Brand ──
  const left = document.createElement('div');
  left.className = 'admin-topbar__left';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'admin-topbar__toggle';
  toggleBtn.setAttribute('aria-label', 'Menüyü aç/kapat');
  toggleBtn.appendChild(createIcon('menu', { size: 20 }));
  toggleBtn.addEventListener('click', () => {
    if (typeof onToggleSidebar === 'function') onToggleSidebar();
  });
  left.appendChild(toggleBtn);

  const brand = document.createElement('a');
  brand.href = '/admin';
  brand.className = 'admin-topbar__brand';
  brand.innerHTML = `
    <span class="admin-topbar__brand-icon"></span>
    <span class="admin-topbar__title">ShopApp</span>
    <span class="admin-topbar__brand-badge">Admin Paneli</span>
  `;
  brand.querySelector('.admin-topbar__brand-icon').appendChild(createIcon('logo', { size: 26 }));
  left.appendChild(brand);

  header.appendChild(left);

  // ── Center: Search ──
  const searchWrap = document.createElement('div');
  searchWrap.className = 'admin-topbar__search';

  const searchIcon = document.createElement('span');
  searchIcon.className = 'admin-topbar__search-icon';
  searchIcon.appendChild(createIcon('search', { size: 16 }));
  searchWrap.appendChild(searchIcon);

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'admin-topbar__search-input';
  searchInput.placeholder = 'Panelde ara...';
  searchInput.setAttribute('aria-label', 'Panel genelinde ara');
  searchInput.addEventListener('input', (e) => {
    if (typeof onSearch === 'function') onSearch(e.target.value.trim());
  });
  searchWrap.appendChild(searchInput);

  header.appendChild(searchWrap);

  // ── Right: Notifications + User ──
  const right = document.createElement('div');
  right.className = 'admin-topbar__right';

  const notifyBtn = document.createElement('button');
  notifyBtn.type = 'button';
  notifyBtn.className = 'admin-topbar__notify-btn';
  notifyBtn.setAttribute('aria-label', 'Bildirimler');
  notifyBtn.appendChild(createIcon('bell', { size: 18 }));
  const notifyDot = document.createElement('span');
  notifyDot.className = 'admin-topbar__notify-dot';
  notifyBtn.appendChild(notifyDot);
  right.appendChild(notifyBtn);

  // Admin User Profile
  const userCard = document.createElement('div');
  userCard.className = 'admin-topbar__user';

  const avatar = document.createElement('div');
  avatar.className = 'admin-topbar__avatar';

  const displayName = currentUser?.fullName ||
    (currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : null) ||
    currentUser?.email ||
    'Yönetici';

  const roleName = currentUser?.roles?.includes('Admin') ? 'Sistem Yöneticisi' : 'Yönetici';

  if (currentUser?.avatarUrl) {
    const img = document.createElement('img');
    img.src = currentUser.avatarUrl;
    img.alt = displayName;
    avatar.appendChild(img);
  } else {
    const initials = (currentUser?.firstName && currentUser?.lastName)
      ? `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase()
      : (displayName[0] || 'Y').toUpperCase();
    avatar.textContent = initials;
  }
  userCard.appendChild(avatar);

  const userMeta = document.createElement('div');
  userMeta.className = 'admin-topbar__user-meta';

  const nameEl = document.createElement('span');
  nameEl.className = 'admin-topbar__user-name';
  nameEl.textContent = displayName;
  userMeta.appendChild(nameEl);

  const roleEl = document.createElement('span');
  roleEl.className = 'admin-topbar__user-role';
  roleEl.textContent = roleName;
  userMeta.appendChild(roleEl);

  userCard.appendChild(userMeta);
  right.appendChild(userCard);

  // Logout action button
  const logoutBtn = document.createElement('button');
  logoutBtn.type = 'button';
  logoutBtn.className = 'admin-topbar__logout-btn';
  logoutBtn.id = 'admin-topbar-logout';
  logoutBtn.setAttribute('aria-label', 'Çıkış Yap');
  logoutBtn.setAttribute('title', 'Çıkış Yap');
  logoutBtn.appendChild(createIcon('log-out', { size: 18 }));
  logoutBtn.addEventListener('click', (e) => {
    if (typeof onLogout === 'function') {
      onLogout(e.currentTarget);
    } else {
      openConfirmModal({
        title: 'Çıkış Yap',
        message: 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
        confirmLabel: 'Çıkış Yap',
        cancelLabel: 'İptal',
        confirmVariant: 'danger',
        triggerElement: e.currentTarget,
        onConfirm: async () => {
          await logout();
          navigate('/');
        },
      });
    }
  });
  right.appendChild(logoutBtn);

  header.appendChild(right);
  return header;
}
