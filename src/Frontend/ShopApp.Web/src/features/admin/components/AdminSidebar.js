/**
 * AdminSidebar.js — Admin Portal Sidebar Navigation
 *
 * Provides structured navigation across admin sections:
 *  - Dashboard (/admin)
 *  - YÖNETİM: Ürünler (/admin/urunler), Kategoriler (/admin/kategoriler), Müşteriler (/admin/musteriler), Siparişler (/admin/siparisler)
 *  - SİTE: Anasayfaya Dön (/)
 *
 * Supports active route highlighting and mobile drawer toggling.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

const NAV_SECTIONS = [
  {
    heading: null,
    items: [
      { path: '/admin', label: 'Genel Bakış', icon: 'layers' },
    ],
  },
  {
    heading: 'YÖNETİM',
    items: [
      { path: '/admin/urunler', label: 'Ürünler', icon: 'box' },
      { path: '/admin/kategoriler', label: 'Kategoriler', icon: 'folder' },
      { path: '/admin/musteriler', label: 'Müşteriler', icon: 'users' },
      { path: '/admin/siparisler', label: 'Siparişler', icon: 'truck' },
    ],
  },
  {
    heading: 'SİTE',
    items: [
      { path: '/', label: 'Anasayfaya Dön', icon: 'home' },
    ],
  },
];

/**
 * @param {{
 *   currentPath?: string,
 *   isOpen?: boolean,
 *   onNavigate?: (path: string) => void,
 * }} [options]
 * @returns {HTMLElement & { toggle: (open?: boolean) => void }}
 */
export function createAdminSidebar({ currentPath = window.location.pathname, isOpen = false, onNavigate } = {}) {
  const aside = document.createElement('aside');
  aside.className = `admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`;
  aside.setAttribute('aria-label', 'Yönetim Menüsü');

  const nav = document.createElement('nav');
  nav.className = 'admin-sidebar__nav';

  NAV_SECTIONS.forEach((section) => {
    const group = document.createElement('div');
    group.className = 'admin-sidebar__group';

    if (section.heading) {
      const heading = document.createElement('div');
      heading.className = 'admin-sidebar__heading';
      heading.textContent = section.heading;
      group.appendChild(heading);
    }

    section.items.forEach((item) => {
      const link = document.createElement('a');
      link.href = item.path;
      link.className = 'admin-sidebar__link';

      const isActive = item.path === '/admin'
        ? currentPath === '/admin'
        : currentPath.startsWith(item.path);

      if (isActive) {
        link.classList.add('admin-sidebar__link--active');
        link.setAttribute('aria-current', 'page');
      }

      const iconSpan = document.createElement('span');
      iconSpan.className = 'admin-sidebar__link-icon';
      iconSpan.appendChild(createIcon(item.icon, { size: 18 }));
      link.appendChild(iconSpan);

      const textSpan = document.createElement('span');
      textSpan.textContent = item.label;
      link.appendChild(textSpan);

      link.addEventListener('click', (e) => {
        aside.classList.remove('admin-sidebar--open');
        if (typeof onNavigate === 'function') onNavigate(item.path);
      });

      group.appendChild(link);
    });

    nav.appendChild(group);
  });

  aside.appendChild(nav);

  aside.toggle = (open) => {
    if (open === undefined) {
      aside.classList.toggle('admin-sidebar--open');
    } else if (open) {
      aside.classList.add('admin-sidebar--open');
    } else {
      aside.classList.remove('admin-sidebar--open');
    }
  };

  return aside;
}
