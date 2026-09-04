/**
 * NotFoundPage.js
 * 404 Not Found page — rendered when no route matches.
 */

import { navigate } from '../../../app/router.js';
import { createButton } from '../../../shared/components/Button/Button.js';

export default function NotFoundPage() {
  const element = document.createElement('div');
  element.className = 'not-found-page';

  const { element: btn } = createButton({
    label:   'Ana Sayfaya Dön',
    variant: 'primary',
    onClick: () => navigate('/'),
  });

  element.innerHTML = `
    <h2>Sayfa Bulunamadı</h2>
    <p>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
  `;
  element.appendChild(btn);

  return { element, destroy: () => {} };
}
