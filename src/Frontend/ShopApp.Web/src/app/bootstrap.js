import { initApp } from './App.js';

async function bootstrap() {
  try {
    document.getElementById('app-loader')?.remove();
    await initApp();
  } catch (error) {
    console.error('[Bootstrap] Critical initialisation error:', error);
    const app = document.getElementById('app');
    if (app) app.innerHTML = '<div class="not-found-page"><h2>Uygulama başlatılamadı</h2><p>Lütfen sayfayı yenileyin.</p></div>';
  }
}

bootstrap();
