/**
 * router.js
 * Lightweight SPA router using the History API.
 *
 * Features:
 *  - No full-page reloads for internal navigation
 *  - Browser back/forward support (popstate)
 *  - Route parameter extraction  (e.g. /products/:id)
 *  - Dynamic page imports (lazy loading)
 *  - Not-found fallback
 *  - Page title updates
 */

import { routes, notFoundRoute } from './routes.js';
import { isAuthenticated } from '../features/auth/state/authStore.js';

/** @type {HTMLElement} The router outlet where pages are rendered. */
let outlet = null;

/** @type {Function|null} Cleanup function for the currently active page. */
let currentPageDestroy = null;

// ─── Route Matching ────────────────────────────────────────────────────────

/**
 * Converts a route path pattern (e.g. "/products/:id") into a RegExp
 * and returns the named param keys found.
 *
 * @param {string} pattern
 * @returns {{ regex: RegExp, keys: string[] }}
 */
function compileRoute(pattern) {
  const keys = [];
  const regexStr = pattern
    .replace(/:([^/]+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');

  return { regex: new RegExp(`^${regexStr}$`), keys };
}

/**
 * Finds the matching route and extracts URL params.
 *
 * @param {string} pathname
 * @returns {{ route: object, params: object } | null}
 */
function matchRoute(pathname) {
  for (const route of routes) {
    const { regex, keys } = compileRoute(route.path);
    const match = pathname.match(regex);
    if (match) {
      const params = {};
      keys.forEach((key, i) => { params[key] = match[i + 1]; });
      return { route, params };
    }
  }
  return null;
}

// ─── Page Rendering ────────────────────────────────────────────────────────

/**
 * Renders the page that corresponds to the current URL.
 *
 * @param {string} pathname
 */
async function render(pathname) {
  if (!outlet) return;

  // Destroy the previous page's listeners/subscriptions
  if (typeof currentPageDestroy === 'function') {
    currentPageDestroy();
    currentPageDestroy = null;
  }

  const matched = matchRoute(pathname);
  const { route, params } = matched ?? { route: notFoundRoute, params: {} };

  // ── Auth guard ──────────────────────────────────────────────────────────
  // guestOnly: redirect logged-in users away (e.g. /giris → home)
  if (route.guestOnly && isAuthenticated()) {
    navigate('/');
    return;
  }
  // requiresAuth: redirect anonymous users to login
  if (route.requiresAuth && !isAuthenticated()) {
    navigate('/giris');
    return;
  }
  // ────────────────────────────────────────────────────────────────────────

  // Update the browser tab title
  document.title = route.title
    ? `${route.title} – ShopApp`
    : 'ShopApp';

  // Show a brief loading state
  outlet.setAttribute('aria-busy', 'true');

  try {
    const module = await route.page();
    const PageComponent = module.default ?? module[Object.keys(module)[0]];

    if (typeof PageComponent !== 'function') {
      throw new Error(`Page module for "${pathname}" does not export a function.`);
    }

    // Clear the outlet and render the new page
    outlet.innerHTML = '';
    const page = PageComponent({ params });

    if (page?.element) {
      page.element.classList.add('page-enter');
      outlet.appendChild(page.element);
      currentPageDestroy = page.destroy ?? null;
    }
  } catch (err) {
    console.error('[Router] Failed to load page:', err);
    outlet.innerHTML = `
      <div class="not-found-page">
        <p class="not-found-code">500</p>
        <h2>Sayfa yüklenemedi</h2>
        <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
      </div>`;
  } finally {
    outlet.setAttribute('aria-busy', 'false');
  }
}

// ─── Navigation ────────────────────────────────────────────────────────────

/**
 * Navigates to the given path without a full page reload.
 * Adds the URL to the browser history stack.
 *
 * @param {string} path
 */
export function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState(null, '', path);
  render(path);
}

// ─── Initialisation ────────────────────────────────────────────────────────

/**
 * Initialises the router.
 * Call once on app startup.
 *
 * @param {HTMLElement} routerOutlet - The DOM element to render pages into.
 */
export function initRouter(routerOutlet) {
  outlet = routerOutlet;

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    render(window.location.pathname);
  });

  // Intercept all clicks on <a href="..."> elements
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');

    // Skip external links, hash-only links, and links with modifiers
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      anchor.target === '_blank'
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  });

  // Render the initial route
  render(window.location.pathname);
}
