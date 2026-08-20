import { createHeader } from '../shared/components/Header/Header.js';
import { setUnauthorizedHandler } from '../shared/services/apiClient.js';
import { logout, restoreSession } from '../features/auth/services/authService.js';
import { initRouter, navigate } from './router.js';
import { initStore } from '../shared/state/store.js';

export async function initApp() {
  initStore();
  setUnauthorizedHandler(async () => {
    await logout();
    if (!['/giris', '/kayit'].includes(window.location.pathname)) navigate('/giris');
  });
  await restoreSession();

  const headerEl = document.getElementById('app-header');
  if (headerEl) headerEl.appendChild(createHeader().element);

  const outlet = document.getElementById('router-outlet');
  if (outlet) initRouter(outlet);
}
