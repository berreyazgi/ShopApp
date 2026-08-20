import { hasRole, isAuthenticated } from '../features/auth/state/authStore.js';
import { routes, notFoundRoute } from './routes.js';

let outlet = null;
let currentPageDestroy = null;

function compileRoute(pattern) {
  const keys = [];
  const regexStr = pattern
    .replace(/:([^/]+)/g, (_, key) => { keys.push(key); return '([^/]+)'; })
    .replace(/\//g, '\\/');
  return { regex: new RegExp('^' + regexStr + '$'), keys };
}

function matchRoute(pathname) {
  for (const route of routes) {
    const { regex, keys } = compileRoute(route.path);
    const match = pathname.match(regex);
    if (match) return { route, params: Object.fromEntries(keys.map((key, i) => [key, match[i + 1]])) };
  }
  return null;
}

function guardedPath(route, pathname) {
  if (route.guestOnly && isAuthenticated()) return '/';
  if (route.requiresAuth && !isAuthenticated()) return '/giris?returnTo=' + encodeURIComponent(pathname);
  if (route.roles?.length && !route.roles.some(hasRole)) return '/erisim-engellendi';
  return null;
}

async function render(pathname) {
  if (!outlet) return;
  if (typeof currentPageDestroy === 'function') currentPageDestroy();
  currentPageDestroy = null;

  const matched = matchRoute(pathname);
  const { route, params } = matched ?? { route: notFoundRoute, params: {} };
  const redirect = guardedPath(route, pathname);
  if (redirect) {
    window.history.replaceState(null, '', redirect);
    return render(new URL(redirect, window.location.origin).pathname);
  }

  document.title = route.title ? route.title + ' – ShopApp' : 'ShopApp';
  outlet.setAttribute('aria-busy', 'true');
  try {
    const module = await route.page();
    const PageComponent = module.default ?? module[Object.keys(module)[0]];
    if (typeof PageComponent !== 'function') throw new Error('Page module for "' + pathname + '" does not export a function.');
    outlet.innerHTML = '';
    const page = PageComponent({ params });
    if (page?.element) {
      page.element.classList.add('page-enter');
      outlet.appendChild(page.element);
      currentPageDestroy = page.destroy ?? null;
    }
  } catch (error) {
    console.error('[Router] Failed to load page:', error);
    outlet.innerHTML = '<div class="not-found-page"><p class="not-found-code">500</p><h2>Sayfa yüklenemedi</h2><p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p></div>';
  } finally {
    outlet.setAttribute('aria-busy', 'false');
  }
}

export function navigate(path) {
  if (path === window.location.pathname + window.location.search) return;
  window.history.pushState(null, '', path);
  render(new URL(path, window.location.origin).pathname);
}

export function initRouter(routerOutlet) {
  outlet = routerOutlet;
  window.addEventListener('popstate', () => render(window.location.pathname));
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:') || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  });
  render(window.location.pathname);
}
