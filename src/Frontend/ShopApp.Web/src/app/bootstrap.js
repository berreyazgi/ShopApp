/**
 * bootstrap.js
 * Application entry point — loaded by index.html as a module.
 *
 * Responsibilities:
 *  - Remove the initial loading indicator
 *  - Initialise the application once the DOM is ready
 *  - Catch and display top-level initialisation errors
 */

import { initApp } from './App.js';

function bootstrap() {
  try {
    // Remove the app loader spinner if present
    const loader = document.getElementById('app-loader');
    if (loader) loader.remove();

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
