/**
 * bootstrap.js
 * Application entry point — loaded by index.html as a module.
 *
 * Responsibilities:
 *  - Remove the initial loading indicator
 *  - Restore auth session if a token exists (silent refresh on page reload)
 *  - Initialise the application once the DOM is ready
 *  - Catch and display top-level initialisation errors
 */

import { initApp } from './App.js';
import { getAccessToken } from '../shared/utils/storage.js';
import { getCurrentUser } from '../features/auth/services/authService.js';
import { setAuthenticated, setAnonymous } from '../features/auth/state/authStore.js';

/**
 * Attempts to restore the user session on page load.
 * Since tokens are in-memory, they are lost on refresh — we call /api/auth/me
 * which works only if the backend has a refresh-token cookie strategy.
 * For now this is a no-op (token is gone after refresh), but the hook is in place.
 */
async function restoreSession() {
  const token = getAccessToken();
  if (!token) {
    // No token in memory (page was refreshed or first visit)
    setAnonymous();
    return;
  }

  // Token exists (SPA navigation, not a refresh) — verify it's still valid
  try {
    const user = await getCurrentUser();
    if (user) {
      setAuthenticated({ user, accessToken: token });
    } else {
      setAnonymous();
    }
  } catch {
    setAnonymous();
  }
}

async function bootstrap() {
  // Remove the app loader spinner if present
  const loader = document.getElementById('app-loader');
  if (loader) loader.remove();

  try {
    // Restore auth session before rendering the first route
    await restoreSession();

    initApp();
  } catch (error) {
    console.error('[Bootstrap] Critical initialisation error:', error);

    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;text-align:center;padding:2rem;">
          <div>
            <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Uygulama başlatılamadı</h1>
            <p style="color:#666;">Lütfen sayfayı yenileyin.</p>
          </div>
        </div>`;
    }
  }
}

// Bootstrap immediately — <script type="module"> defers by default,
// so the DOM is ready when this runs.
bootstrap();
