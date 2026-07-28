/**
 * App.js
 * Application shell — composes the Header and the router outlet.
 * Responsible for the top-level DOM structure.
 */

import { createHeader } from '../shared/components/Header/Header.js';
import { initRouter }   from './router.js';
import { initStore }    from '../shared/state/store.js';

/**
 * Initialises the entire application.
 * Call once from bootstrap.js.
 */
export function initApp() {
  // 1. Initialise the global reactive store
  initStore();

  // 2. Render the Header into its placeholder element
  const headerEl = document.getElementById('app-header');
  if (headerEl) {
    const { element } = createHeader();
    headerEl.appendChild(element);
  }

  // 3. Boot the SPA router — all page rendering happens through it
  const outlet = document.getElementById('router-outlet');
  if (outlet) {
    initRouter(outlet);
  }
}
