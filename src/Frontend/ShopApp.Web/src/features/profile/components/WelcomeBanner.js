/**
 * WelcomeBanner.js — Karşılama Banner Bileşeni
 *
 * Müşteriyi gerçek adıyla karşılar ("Hoş Geldiniz, {FirstName}").
 */

/**
 * @param {{ firstName: string }} options
 * @returns {HTMLElement}
 */
export function createWelcomeBanner({ firstName }) {
  const banner = document.createElement('section');
  banner.className = 'profile-welcome-banner';
  banner.setAttribute('aria-label', 'Karşılama bannerı');

  const content = document.createElement('div');
  content.className = 'profile-welcome-banner__content';

  const heading = document.createElement('h1');
  heading.className = 'profile-welcome-banner__title';
  heading.textContent = `Hoş Geldiniz, ${firstName || 'Değerli Müşterimiz'}`;
  content.appendChild(heading);

  const desc = document.createElement('p');
  desc.className = 'profile-welcome-banner__desc';
  desc.textContent = 'Profiliniz üzerinden kişisel bilgilerinizi, adreslerinizi ve sipariş geçmişinizi görüntüleyebilirsiniz.';
  content.appendChild(desc);

  banner.appendChild(content);
  return banner;
}
