/**
 * Header.js
 * Shared Header component — rendered once in App.js and persists across routes.
 *
 * Features:
 *  - Brand logo + name
 *  - Primary navigation with dropdown indicator
 *  - Accessible search bar
 *  - User actions: profile, favorites, cart with badge
 *  - Mobile hamburger menu
 *  - Scroll-aware frosted glass effect
 *  - Subscribes to cart count from global store
 */

import { createIcon }  from '../Icon/Icon.js';
import { subscribe }   from '../../state/store.js';
import { navigate }    from '../../../app/router.js';

// ─── Navigation Items ──────────────────────────────────────────────────────

const navItems = [
  { label: 'Ana Sayfa',    href: '/' },
  { label: 'Kategoriler',  href: '/kategoriler', hasDropdown: true },
  { label: 'Yeni Gelenler', href: '/urunler?sort=new' },
  { label: 'Fırsatlar',   href: '/urunler?sort=sale' },
  { label: 'Hakkımızda',  href: '/hakkimizda' },
];

// ─── Component ─────────────────────────────────────────────────────────────

export function createHeader() {
  const element = document.createElement('header');
  element.className = 'site-header';
  element.setAttribute('role', 'banner');

  let cartBadgeEl = null;
  let mobileMenuOpen = false;
  const cleanupFns = [];

  // ── Render ──────────────────────────────────────────────────────────────

  function render() {
    element.innerHTML = `
      <div class="header-inner container">

        <!-- Brand -->
        <a class="header-brand" href="/" aria-label="ShopApp Ana Sayfa">
          <span class="header-brand__icon"></span>
          <span class="header-brand__name">ShopApp</span>
        </a>

        <!-- Primary Navigation -->
        <nav class="header-nav" aria-label="Ana navigasyon">
          <ul class="header-nav__list" role="list">
            ${navItems.map((item) => `
              <li class="header-nav__item">
                <a class="header-nav__link" href="${item.href}">
                  ${item.label}
                  ${item.hasDropdown ? `<span class="header-nav__dropdown-icon"></span>` : ''}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <!-- Search -->
        <div class="header-search">
          <label for="site-search" class="sr-only">Ürün, kategori veya marka ara</label>
          <div class="header-search__inner">
            <span class="header-search__icon"></span>
            <input
              id="site-search"
              class="header-search__input"
              type="search"
              placeholder="Ürün, kategori veya marka ara..."
              autocomplete="off"
              aria-label="Ürün, kategori veya marka ara"
            >
          </div>
        </div>

        <!-- Actions -->
        <div class="header-actions">
          <button class="header-action-btn" aria-label="Profil" id="btn-profile">
            <span class="action-icon"></span>
          </button>
          <button class="header-action-btn" aria-label="Favoriler" id="btn-favorites">
            <span class="action-icon"></span>
          </button>
          <button class="header-action-btn header-action-btn--cart" aria-label="Sepet" id="btn-cart">
            <span class="action-icon"></span>
            <span class="cart-badge" aria-live="polite" aria-label="Sepet: 0 ürün">0</span>
          </button>
        </div>

        <!-- Mobile menu toggle -->
        <button class="header-mobile-toggle" aria-label="Menüyü aç" aria-expanded="false" id="btn-mobile-menu">
          <span class="action-icon"></span>
        </button>

      </div>

      <!-- Mobile nav drawer -->
      <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <nav aria-label="Mobil navigasyon">
          <ul class="mobile-nav__list" role="list">
            ${navItems.map((item) => `
              <li><a class="mobile-nav__link" href="${item.href}">${item.label}</a></li>
            `).join('')}
          </ul>
        </nav>
        <div class="mobile-nav__search">
          <label for="mobile-search" class="sr-only">Ara</label>
          <div class="header-search__inner">
            <span class="mobile-search-icon"></span>
            <input id="mobile-search" class="header-search__input" type="search" placeholder="Ürün ara..." autocomplete="off">
          </div>
        </div>
      </div>
    `;

    // Inject icons after rendering
    injectIcons();

    cartBadgeEl = element.querySelector('.cart-badge');
  }

  function injectIcons() {
    const inject = (selector, name, size = 20) => {
      const slot = element.querySelector(selector);
      if (slot) slot.appendChild(createIcon(name, { size }));
    };

    inject('.header-brand__icon', 'logo', 28);
    inject('.header-nav__dropdown-icon', 'chevron-down', 14);
    inject('#btn-profile .action-icon', 'user', 20);
    inject('#btn-favorites .action-icon', 'heart', 20);
    inject('#btn-cart .action-icon', 'cart', 20);
    inject('#btn-mobile-menu .action-icon', 'menu', 22);
    inject('.header-search__icon', 'search', 16);
    inject('.mobile-search-icon', 'search', 16);
  }

  // ── Events ──────────────────────────────────────────────────────────────

  function bindEvents() {
    // Scroll → frosted glass
    const onScroll = () => {
      element.classList.toggle('header--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener('scroll', onScroll));

    // Mobile menu toggle
    const mobileBtn = element.querySelector('#btn-mobile-menu');
    const mobileNav = element.querySelector('#mobile-nav');

    const toggleMobileMenu = () => {
      mobileMenuOpen = !mobileMenuOpen;
      mobileNav.setAttribute('aria-hidden', String(!mobileMenuOpen));
      mobileBtn.setAttribute('aria-expanded', String(mobileMenuOpen));
      element.classList.toggle('header--menu-open', mobileMenuOpen);

      const iconSlot = mobileBtn.querySelector('.action-icon');
      iconSlot.innerHTML = '';
      iconSlot.appendChild(createIcon(mobileMenuOpen ? 'close' : 'menu', { size: 22 }));
    };

    mobileBtn?.addEventListener('click', toggleMobileMenu);
    cleanupFns.push(() => mobileBtn?.removeEventListener('click', toggleMobileMenu));

    // Close mobile menu on SPA navigation
    const closeMobileOnNav = () => {
      if (mobileMenuOpen) toggleMobileMenu();
    };
    window.addEventListener('popstate', closeMobileOnNav);
    cleanupFns.push(() => window.removeEventListener('popstate', closeMobileOnNav));

    // Search — stub: future API integration point
    const searchInput = element.querySelector('#site-search');
    const mobileSearch = element.querySelector('#mobile-search');

    const onSearch = (event) => {
      if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
          navigate(`/urunler?q=${encodeURIComponent(query)}`);
        }
      }
    };

    searchInput?.addEventListener('keydown', onSearch);
    mobileSearch?.addEventListener('keydown', onSearch);
    cleanupFns.push(() => {
      searchInput?.removeEventListener('keydown', onSearch);
      mobileSearch?.removeEventListener('keydown', onSearch);
    });

    // Cart button → navigate to cart
    const cartBtn = element.querySelector('#btn-cart');
    const onCartClick = () => navigate('/sepet');
    cartBtn?.addEventListener('click', onCartClick);
    cleanupFns.push(() => cartBtn?.removeEventListener('click', onCartClick));

    // Profile button
    const profileBtn = element.querySelector('#btn-profile');
    const onProfileClick = () => navigate('/giris');
    profileBtn?.addEventListener('click', onProfileClick);
    cleanupFns.push(() => profileBtn?.removeEventListener('click', onProfileClick));
  }

  // ── Store subscription ───────────────────────────────────────────────────

  function subscribeToStore() {
    const unsubscribe = subscribe((state) => {
      if (!cartBadgeEl) return;
      const count = state.cartCount ?? 0;
      cartBadgeEl.textContent = count > 99 ? '99+' : String(count);
      cartBadgeEl.setAttribute('aria-label', `Sepet: ${count} ürün`);
      cartBadgeEl.classList.toggle('cart-badge--has-items', count > 0);
    });
    cleanupFns.push(unsubscribe);
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  render();
  bindEvents();
  subscribeToStore();

  return { element, destroy };
}
