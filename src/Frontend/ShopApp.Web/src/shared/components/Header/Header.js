/**
 * Header.js
 * Shared Header component — rendered once in App.js and persists across routes.
 *
 * Layout (left → right): brand, centered search, primary nav
 * (Kategoriler dropdown + Hakkımızda), account cluster + cart.
 *
 * Features:
 *  - Brand logo + name
 *  - Centered, accessible search bar
 *  - "Kategoriler" dropdown populated from the products feature's category
 *    data (lazy-loaded on first open — see loadDropdownCategories below)
 *  - User actions: profile, orders, sign-out, cart with badge
 *  - Mobile hamburger menu
 *  - Scroll-aware frosted glass effect
 *  - Subscribes to cart count from global store and to auth state
 */

import { createIcon }  from '../Icon/Icon.js';
import { openConfirmModal } from '../ConfirmModal/ConfirmModal.js';
import { subscribe }   from '../../state/store.js';
import { navigate }    from '../../../app/router.js';
import { logout }      from '../../../features/auth/services/authService.js';
import { getState as getAuthState, subscribe as subscribeAuth } from '../../../features/auth/state/authStore.js';
import { createCategoryMegaMenu, normalizeCategories } from './CategoryMegaMenu.js';
import { subscribeCategories } from '../../../features/categories/services/categoryService.js';

// ─── Navigation Items ──────────────────────────────────────────────────────

const navItems = [
  { label: 'Kategoriler', href: '/kategoriler', hasDropdown: true },
  { label: 'Hakkımızda',  href: '/hakkimizda' },
];

// ─── Category dropdown data (lazy) ─────────────────────────────────────────

async function loadDropdownCategories() {
  const mod = await import('../../../features/products/services/productsService.js');
  const raw = await mod.getCategories();
  return normalizeCategories(raw);
}

// ─── Component ─────────────────────────────────────────────────────────────

export function createHeader() {
  const element = document.createElement('header');
  element.className = 'site-header';
  element.setAttribute('role', 'banner');

  let cartBadgeEl = null;
  let mobileMenuOpen = false;
  let categoryDropdownOpen = false;
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

        <!-- Primary Navigation -->
        <nav class="header-nav" aria-label="Ana navigasyon">
          <ul class="header-nav__list" role="list">
            ${navItems.map((item) => item.hasDropdown ? `
              <li class="header-nav__item header-nav__item--dropdown">
                <button
                  type="button"
                  class="header-nav__link header-nav__dropdown-trigger"
                  id="category-dropdown-trigger"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="category-dropdown"
                >
                  ${item.label}
                  <span class="header-nav__dropdown-icon"></span>
                </button>
                <div class="header-category-dropdown header-category-dropdown--mega" id="category-dropdown" hidden>
                  <div class="category-mega-menu__status">Yükleniyor...</div>
                </div>
              </li>
            ` : `
              <li class="header-nav__item">
                <a class="header-nav__link" href="${item.href}">${item.label}</a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <div class="header-auth-actions" id="header-auth-actions"></div>
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
            <li class="mobile-nav__item mobile-nav__item--expandable">
              <button
                type="button"
                class="mobile-nav__link mobile-nav__toggle-btn"
                id="mobile-categories-toggle"
                aria-expanded="false"
                aria-controls="mobile-categories-panel"
              >
                <span>Kategoriler</span>
                <span class="mobile-nav__toggle-icon" aria-hidden="true">›</span>
              </button>
              <div class="mobile-nav__categories" id="mobile-categories-panel" hidden>
                <div class="category-mega-menu__status">Yükleniyor...</div>
              </div>
            </li>
            <li class="mobile-nav__item">
              <a class="mobile-nav__link" href="/hakkimizda">Hakkımızda</a>
            </li>
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
    renderAuthActions();

    cartBadgeEl = element.querySelector('.cart-badge');
  }

  function renderAuthActions() {
    const actions = element.querySelector('#header-auth-actions');
    if (!actions) return;

    const authState = getAuthState();
    if (authState.status !== 'authenticated') {
      actions.innerHTML = '<a class="header-auth-link" href="/giris">Giriş Yap</a><a class="header-auth-link header-auth-link--primary" href="/kayit">Kayıt Ol</a>';
      return;
    }

    actions.innerHTML =
      '<a class="header-auth-link" href="/profil">Profil</a>' +
      '<a class="header-auth-link" href="/siparisler">Siparişler</a>' +
      '<button class="header-auth-link" type="button" id="btn-logout">Çıkış Yap</button>';

    actions.querySelector('#btn-logout')?.addEventListener('click', (e) => {
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
    });
  }

  function injectIcons() {
    const inject = (selector, name, size = 20) => {
      const slot = element.querySelector(selector);
      if (slot) slot.appendChild(createIcon(name, { size }));
    };

    inject('.header-brand__icon', 'logo', 28);
    inject('.header-nav__dropdown-icon', 'chevron-down', 14);
    inject('#btn-cart .action-icon', 'cart', 20);
    inject('#btn-mobile-menu .action-icon', 'menu', 22);
    inject('.header-search__icon', 'search', 16);
    inject('.mobile-search-icon', 'search', 16);
  }

  // ── Category mega menu (desktop) ──────────────────────────────────────────

  let megaMenuInstance = null;

  function setCategoryDropdownOpen(open, { returnFocus = false } = {}) {
    const trigger = element.querySelector('#category-dropdown-trigger');
    const panel = element.querySelector('#category-dropdown');
    if (!trigger || !panel) return;

    if (categoryDropdownOpen === open) return;

    categoryDropdownOpen = open;
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;

    if (open) {
      populateCategoryDropdown(panel);
    } else {
      if (returnFocus || (panel && panel.contains(document.activeElement))) {
        trigger.focus();
      }
    }
  }

  async function populateCategoryDropdown(panel) {
    if (panel.dataset.loaded === 'true') return;

    panel.innerHTML = '<div class="category-mega-menu__status">Kategoriler yükleniyor...</div>';

    try {
      const categories = await loadDropdownCategories();
      if (!categories || !categories.length) {
        panel.innerHTML = '<div class="category-mega-menu__status">Henüz kategori bulunamadı</div>';
        return;
      }

      panel.innerHTML = '';
      megaMenuInstance = createCategoryMegaMenu(categories, {
        onNavigate: () => setCategoryDropdownOpen(false),
        onClose: () => setCategoryDropdownOpen(false, { returnFocus: true }),
      });
      panel.appendChild(megaMenuInstance.element);
      cleanupFns.push(() => megaMenuInstance?.destroy());
      panel.dataset.loaded = 'true';
    } catch (error) {
      panel.innerHTML = '<div class="category-mega-menu__status">Kategoriler yüklenemedi</div>';
      console.error('[Header] Failed to load category mega menu:', error);
    }
  }

  function bindCategoryDropdown() {
    const trigger = element.querySelector('#category-dropdown-trigger');
    const panel = element.querySelector('#category-dropdown');
    const dropdownItem = element.querySelector('.header-nav__item--dropdown');
    if (!trigger || !panel || !dropdownItem) return;

    let hoverCloseTimer = null;

    // Hover interaction: open on enter, grace-period close on leave
    const onMouseEnter = () => {
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
      setCategoryDropdownOpen(true);
    };

    const onMouseLeave = () => {
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(() => {
        setCategoryDropdownOpen(false);
        hoverCloseTimer = null;
      }, 180);
    };

    dropdownItem.addEventListener('mouseenter', onMouseEnter);
    dropdownItem.addEventListener('mouseleave', onMouseLeave);
    cleanupFns.push(() => {
      if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
      dropdownItem.removeEventListener('mouseenter', onMouseEnter);
      dropdownItem.removeEventListener('mouseleave', onMouseLeave);
    });

    // Click toggle for touch devices & accessibility
    const onTriggerClick = (event) => {
      event.stopPropagation();
      if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
      }
      setCategoryDropdownOpen(!categoryDropdownOpen);
    };
    trigger.addEventListener('click', onTriggerClick);
    cleanupFns.push(() => trigger.removeEventListener('click', onTriggerClick));

    // Close on click outside
    const onDocumentClick = (event) => {
      if (!categoryDropdownOpen) return;
      if (dropdownItem.contains(event.target)) return;
      setCategoryDropdownOpen(false);
    };
    document.addEventListener('click', onDocumentClick);
    cleanupFns.push(() => document.removeEventListener('click', onDocumentClick));

    // Close on Escape key and return focus
    const onKeydown = (event) => {
      if (event.key === 'Escape' && categoryDropdownOpen) {
        setCategoryDropdownOpen(false, { returnFocus: true });
      }
    };
    document.addEventListener('keydown', onKeydown);
    cleanupFns.push(() => document.removeEventListener('keydown', onKeydown));

    // Accessible focusout: close when focus leaves the dropdown entirely
    const onFocusOut = (event) => {
      if (!categoryDropdownOpen) return;
      if (dropdownItem && !dropdownItem.contains(event.relatedTarget)) {
        setCategoryDropdownOpen(false);
      }
    };
    dropdownItem.addEventListener('focusout', onFocusOut);
    cleanupFns.push(() => dropdownItem.removeEventListener('focusout', onFocusOut));

    // Close on navigation triggered from within the dropdown
    const onPanelClick = (event) => {
      if (event.target.closest('a[href]')) {
        setCategoryDropdownOpen(false);
      }
    };
    panel.addEventListener('click', onPanelClick);
    cleanupFns.push(() => panel.removeEventListener('click', onPanelClick));

    // Subscribe to dynamic category single source of truth
    const unsubscribeCategories = subscribeCategories(() => {
      panel.dataset.loaded = 'false';
      if (categoryDropdownOpen) {
        populateCategoryDropdown(panel);
      }
      const mobilePanel = element.querySelector('#mobile-categories-panel');
      if (mobilePanel) {
        mobilePanel.dataset.loaded = 'false';
        if (mobileCategoriesOpen) {
          populateMobileCategories(mobilePanel);
        }
      }
    });
    cleanupFns.push(unsubscribeCategories);
  }

  // ── Category accordion (mobile) ───────────────────────────────────────────

  let mobileCategoriesOpen = false;

  async function populateMobileCategories(panel) {
    if (panel.dataset.loaded === 'true') return;

    panel.innerHTML = '<div class="category-mega-menu__status">Kategoriler yükleniyor...</div>';

    try {
      const categories = await loadDropdownCategories();
      if (!categories || !categories.length) {
        panel.innerHTML = '<div class="category-mega-menu__status">Henüz kategori bulunamadı</div>';
        return;
      }

      panel.innerHTML = '';
      const tree = document.createElement('div');
      tree.className = 'mobile-cat-tree';

      categories.forEach((parent) => {
        const group = document.createElement('div');
        group.className = 'mobile-cat-group';

        const parentLink = document.createElement('a');
        parentLink.className = 'mobile-cat-parent';
        parentLink.href = parent.href;
        parentLink.innerHTML = `<span>${parent.name}</span><span class="mobile-cat-parent-arrow" aria-hidden="true">›</span>`;
        group.appendChild(parentLink);

        const childList = document.createElement('ul');
        childList.className = 'mobile-cat-children';
        childList.setAttribute('role', 'list');

        const children = parent.children ?? parent.subcategories ?? [];
        children.forEach((child) => {
          const item = document.createElement('li');
          const childLink = document.createElement('a');
          childLink.className = 'mobile-cat-child';
          childLink.href = child.href;
          childLink.textContent = child.name;
          item.appendChild(childLink);
          childList.appendChild(item);
        });

        // "Tümünü Gör" link for parent
        const viewAllItem = document.createElement('li');
        const viewAllLink = document.createElement('a');
        viewAllLink.className = 'mobile-cat-all';
        viewAllLink.href = parent.href;
        viewAllLink.textContent = `${parent.name} - Tümünü Gör →`;
        viewAllItem.appendChild(viewAllLink);
        childList.appendChild(viewAllItem);

        group.appendChild(childList);
        tree.appendChild(group);
      });

      // General category index link
      const indexDiv = document.createElement('div');
      indexDiv.className = 'mobile-cat-index';
      const indexLink = document.createElement('a');
      indexLink.className = 'mobile-cat-all-index';
      indexLink.href = '/kategoriler';
      indexLink.textContent = 'Tüm Kategoriler Sayfası →';
      indexDiv.appendChild(indexLink);
      tree.appendChild(indexDiv);

      panel.appendChild(tree);
      panel.dataset.loaded = 'true';
    } catch (error) {
      panel.innerHTML = '<div class="category-mega-menu__status">Kategoriler yüklenemedi</div>';
      console.error('[Header] Failed to load mobile categories:', error);
    }
  }

  function bindMobileCategories() {
    const toggleBtn = element.querySelector('#mobile-categories-toggle');
    const panel = element.querySelector('#mobile-categories-panel');
    if (!toggleBtn || !panel) return;

    const onToggle = () => {
      mobileCategoriesOpen = !mobileCategoriesOpen;
      toggleBtn.setAttribute('aria-expanded', String(mobileCategoriesOpen));
      toggleBtn.classList.toggle('mobile-nav__toggle-btn--open', mobileCategoriesOpen);
      panel.hidden = !mobileCategoriesOpen;
      if (mobileCategoriesOpen) {
        populateMobileCategories(panel);
      }
    };
    toggleBtn.addEventListener('click', onToggle);
    cleanupFns.push(() => toggleBtn.removeEventListener('click', onToggle));

    // Close mobile drawer when clicking a link inside categories panel
    const onCategoryLinkClick = (event) => {
      if (event.target.closest('a[href]')) {
        const mobileNav = element.querySelector('#mobile-nav');
        const mobileBtn = element.querySelector('#btn-mobile-menu');
        if (mobileNav && mobileBtn && mobileMenuOpen) {
          mobileMenuOpen = false;
          mobileNav.setAttribute('aria-hidden', 'true');
          mobileBtn.setAttribute('aria-expanded', 'false');
          element.classList.remove('header--menu-open');
          const iconSlot = mobileBtn.querySelector('.action-icon');
          if (iconSlot) {
            iconSlot.innerHTML = '';
            iconSlot.appendChild(createIcon('menu', { size: 22 }));
          }
        }
      }
    };
    panel.addEventListener('click', onCategoryLinkClick);
    cleanupFns.push(() => panel.removeEventListener('click', onCategoryLinkClick));
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

    // Close mobile menu & category dropdown on SPA navigation
    const closeOnNav = () => {
      if (mobileMenuOpen) toggleMobileMenu();
      if (categoryDropdownOpen) setCategoryDropdownOpen(false);
    };
    window.addEventListener('popstate', closeOnNav);
    cleanupFns.push(() => window.removeEventListener('popstate', closeOnNav));

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

    bindCategoryDropdown();
    bindMobileCategories();
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

  function subscribeToAuth() {
    cleanupFns.push(subscribeAuth(renderAuthActions));
  }

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  render();
  bindEvents();
  subscribeToStore();
  subscribeToAuth();

  return { element, destroy };
}
