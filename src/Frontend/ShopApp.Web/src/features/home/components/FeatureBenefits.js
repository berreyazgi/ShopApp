/**
 * FeatureBenefits.js
 * "Why shop with us" benefits banner.
 * Four benefit items: Free Shipping, Easy Returns, Secure Payment, 24/7 Support.

*/
import { createIcon } from '../../../shared/components/Icon/Icon.js';

const benefits = [

  {
    icon:        'truck',
    title:       'Ücretsiz Kargo',
    description: '500 TL ve üzeri',
    iconColor:   '#0071e3',
  },
  {
    icon:        'refresh',
    title:       'Kolay İade',
    description: '30 gün içinde',
    iconColor:   '#34c759',
  },
  {
    icon:        'shield',
    title:       'Güvenli Ödeme',
    description: '%100 güvenli',
    iconColor:   '#ff9f0a',
  },
  {
    icon:        'headphones',
    title:       'Müşteri Desteği',
    description: '7/24 yanınızda',
    iconColor:   '#af52de',
  },
];

export function createFeatureBenefits() {
  const element = document.createElement('section');
  element.className = 'benefits-banner';
  element.setAttribute('aria-label', 'Alışveriş avantajları');

  function render() {
    const inner = document.createElement('div');
    inner.className = 'container';

    const grid = document.createElement('ul');
    grid.className = 'benefits-banner__grid';
    grid.setAttribute('role', 'list');

    benefits.forEach(({ icon, title, description, iconColor }) => {
      const item = document.createElement('li');
      item.className = 'benefit-item';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'benefit-item__icon-wrap';
      iconWrap.style.color = iconColor;
      iconWrap.appendChild(createIcon(icon, { size: 26 }));

      const textWrap = document.createElement('div');
      textWrap.className = 'benefit-item__text';
      textWrap.innerHTML = `
        <span class="benefit-item__title">${title}</span>
        <span class="benefit-item__desc">${description}</span>
      `;

      item.appendChild(iconWrap);
      item.appendChild(textWrap);
      grid.appendChild(item);
    });

    inner.appendChild(grid);
    element.appendChild(inner);
  }

  render();

  return { element, destroy: () => {} };
}
