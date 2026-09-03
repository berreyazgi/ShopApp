/**
 * Footer.js
 * Global footer component with trust badges.
 * Rendered once in App.js and persists across routes.
 */

import { createIcon } from '../Icon/Icon.js';

const TRUST_BADGES = [
  { icon: 'truck',      title: 'Ücretsiz Kargo',   desc: '500 TL ve Üzeri siparişlerde', color: '#0071e3', bg: 'rgba(0,113,227,0.08)' },
  { icon: 'refresh',    title: 'Kolay İade',        desc: '30 gün içinde Ücretsiz',       color: '#34c759', bg: 'rgba(52,199,89,0.08)' },
  { icon: 'shield',     title: 'Güvenli Ödeme',     desc: '256-bit SSL şifreleme',        color: '#ff9f0a', bg: 'rgba(255,159,10,0.08)' },
  { icon: 'headphones', title: 'Müşteri Desteği',   desc: '7/24 destek hattı',            color: '#af52de', bg: 'rgba(175,82,222,0.08)' },
];

export function createFooter() {
  const element = document.createElement('div');
  element.className = 'site-footer';
  element.setAttribute('role', 'contentinfo');

  const inner = document.createElement('div');
  inner.className = 'container';

  const grid = document.createElement('ul');
  grid.className = 'footer-trust__grid';
  grid.setAttribute('role', 'list');

  TRUST_BADGES.forEach(({ icon, title, desc, color, bg }) => {
    const li = document.createElement('li');
    li.className = 'footer-trust__item';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'footer-trust__icon';
    iconWrap.style.color = color;
    iconWrap.style.background = bg;
    iconWrap.appendChild(createIcon(icon, { size: 24 }));

    const textWrap = document.createElement('div');
    textWrap.className = 'footer-trust__text';

    const titleEl = document.createElement('span');
    titleEl.className = 'footer-trust__title';
    titleEl.textContent = title;

    const descEl = document.createElement('span');
    descEl.className = 'footer-trust__desc';
    descEl.textContent = desc;

    textWrap.appendChild(titleEl);
    textWrap.appendChild(descEl);
    li.appendChild(iconWrap);
    li.appendChild(textWrap);
    grid.appendChild(li);
  });

  inner.appendChild(grid);
  element.appendChild(inner);

  return { element, destroy: () => {} };
}
