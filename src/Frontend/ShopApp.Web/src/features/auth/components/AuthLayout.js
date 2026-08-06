/**
 * AuthLayout.js
 * Shared two-column authentication page shell.
 *
 * Used by both LoginPage and RegisterPage to avoid duplicating
 * the page shell (header, side panel, brand, navigation back).
 *
 * Configuration:
 * {
 *   title,           — Form heading (left area on desktop)
 *   subtitle,        — Supporting text below heading
 *   formElement,     — The <form> element to embed
 *   sideTitle,       — Promotional headline (right area)
 *   sideDescription, — Promotional body text
 *   sideImage,       — Optional image path for the panel background
 *   footerText,      — e.g. "Hesabınız yok mu?"
 *   footerLinkLabel, — e.g. "Hesap Oluştur"
 *   footerLinkPath,  — e.g. "/kayit"
 * }
 */

import { AUTH_ROUTES } from '../constants/authConstants.js';


// ─── ShopApp Logo SVG (inline — no external dependency) ────────────────────

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"
  width="28" height="28" aria-hidden="true">
  <rect width="32" height="32" rx="8"/>
  <path d="M8 22V12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10"
    stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="12" cy="22" r="2" fill="white"/>
  <circle cx="20" cy="22" r="2" fill="white"/>
</svg>`;

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * @param {{
 *   title:            string,
 *   subtitle?:        string,
 *   formElement:      HTMLElement,
 *   sideTitle?:       string,
 *   sideDescription?: string,
 *   sideImage?:       string,
 *   footerText?:      string,
 *   footerLinkLabel?: string,
 *   footerLinkPath?:  string,
 * }} config
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export function createAuthLayout(config = {}) {
  const {
    title,
    subtitle,
    formElement,
    sideTitle,
    sideDescription,
    sideImage,
    footerText,
    footerLinkLabel,
    footerLinkPath,
  } = config;

  const cleanupFns = [];

  // ── Hide site header for auth pages ──────────────────────────────────────
  // Auth pages render their own simplified header bar.
  // The site-wide header is hidden while on auth pages and restored on destroy.
  const siteHeader = document.getElementById('app-header');
  if (siteHeader) siteHeader.style.display = 'none';
  cleanupFns.push(() => {
    if (siteHeader) siteHeader.style.display = '';
  });

  // ── Root element ─────────────────────────────────────────────────────────

  const root = document.createElement('div');
  root.className = 'auth-layout';

  // ── Auth Header bar ──────────────────────────────────────────────────────

  const authHeader = document.createElement('div');
  authHeader.className = 'auth-header';
  authHeader.setAttribute('role', 'banner');

  // Brand mark
  const brand = document.createElement('a');
  brand.href      = AUTH_ROUTES.HOME;
  brand.className = 'auth-header__brand';
  brand.setAttribute('aria-label', 'ShopApp Ana Sayfaya Git');

  const brandIcon = document.createElement('span');
  brandIcon.className = 'auth-header__brand-icon';
  brandIcon.innerHTML = LOGO_SVG;

  const brandName = document.createElement('span');
  brandName.className   = 'auth-header__brand-name';
  brandName.textContent = 'ShopApp';

  brand.appendChild(brandIcon);
  brand.appendChild(brandName);

  // Back to home link
  const backLink = document.createElement('a');
  backLink.href      = AUTH_ROUTES.HOME;
  backLink.className = 'auth-header__back';
  backLink.setAttribute('aria-label', 'Ana Sayfaya Dön');
  backLink.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
      <path d="m15 18-6-6 6-6"/>
    </svg>
    <span>Ana Sayfaya Dön</span>
  `;

  authHeader.appendChild(brand);
  authHeader.appendChild(backLink);

  // ── Main two-column area ─────────────────────────────────────────────────

  const main = document.createElement('main');
  main.className = 'auth-main';
  main.id        = 'auth-main-content';

  // Left — Promotional side panel
  const sidePanel = document.createElement('aside');
  sidePanel.className  = 'auth-side';
  sidePanel.setAttribute('aria-hidden', 'true'); // Decorative on desktop

  if (sideImage) {
    const img = document.createElement('img');
    img.src     = sideImage;
    img.alt     = '';
    img.className = 'auth-side__image';
    img.setAttribute('aria-hidden', 'true');
    img.addEventListener('error', () => img.classList.add('auth-side__image--fallback'));
    sidePanel.appendChild(img);
  }

  const sideContent = document.createElement('div');
  sideContent.className = 'auth-side__content';

  if (sideTitle) {
    const sideTitleEl = document.createElement('h2');
    sideTitleEl.className   = 'auth-side__title';
    sideTitleEl.textContent = sideTitle;
    sideContent.appendChild(sideTitleEl);
  }

  if (sideDescription) {
    const sideDescEl = document.createElement('p');
    sideDescEl.className   = 'auth-side__description';
    sideDescEl.textContent = sideDescription;
    sideContent.appendChild(sideDescEl);
  }

  // Decorative floating shapes
  const shapes = document.createElement('div');
  shapes.className    = 'auth-side__shapes';
  shapes.setAttribute('aria-hidden', 'true');
  shapes.innerHTML = `
    <span class="auth-side__shape auth-side__shape--1"></span>
    <span class="auth-side__shape auth-side__shape--2"></span>
    <span class="auth-side__shape auth-side__shape--3"></span>
  `;

  sidePanel.appendChild(shapes);
  sidePanel.appendChild(sideContent);

  // Right — Form panel
  const formPanel = document.createElement('section');
  formPanel.className = 'auth-form-panel';

  const formWrapper = document.createElement('div');
  formWrapper.className = 'auth-form-panel__inner';

  // Page heading inside form panel
  const headingGroup = document.createElement('div');
  headingGroup.className = 'auth-form-panel__heading-group';

  const headingEl = document.createElement('h1');
  headingEl.className   = 'auth-form-panel__title';
  headingEl.textContent = title;

  headingGroup.appendChild(headingEl);

  if (subtitle) {
    const subtitleEl = document.createElement('p');
    subtitleEl.className   = 'auth-form-panel__subtitle';
    subtitleEl.textContent = subtitle;
    headingGroup.appendChild(subtitleEl);
  }

  formWrapper.appendChild(headingGroup);

  // The actual form
  if (formElement) {
    formWrapper.appendChild(formElement);
  }

  // Footer navigation (link to other auth page)
  if (footerText || footerLinkLabel) {
    const footer = document.createElement('div');
    footer.className = 'auth-form-panel__footer';

    if (footerText) {
      const footerTextEl = document.createElement('span');
      footerTextEl.textContent = footerText;
      footer.appendChild(footerTextEl);
    }

    if (footerLinkLabel && footerLinkPath) {
      const footerLink = document.createElement('a');
      footerLink.href      = footerLinkPath;
      footerLink.className = 'auth-form-panel__footer-link';
      footerLink.textContent = footerLinkLabel;
      footer.appendChild(footerLink);
    }

    formWrapper.appendChild(footer);
  }

  formPanel.appendChild(formWrapper);

  main.appendChild(sidePanel);
  main.appendChild(formPanel);

  root.appendChild(authHeader);
  root.appendChild(main);

  // ── Destroy ──────────────────────────────────────────────────────────────

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  return { element: root, destroy };
}
