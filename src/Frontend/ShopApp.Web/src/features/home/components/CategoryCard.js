/**
 * CategoryCard.js
 * Reusable editorial category card component.
 *
 * Renders a visually rich card with:
 *   - Background image with overlay gradient
 *   - Category eyebrow label
 *   - Headline text
 *   - Description text
 *   - CTA button (white variant for contrast)
 *   - Hover scale effect on image
 *   - SPA navigation via the router
 *
 * @param {import('../data/homeCategories.js').CategoryCardData} data
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */

import { navigate }    from '../../../app/router.js';
import { createButton } from '../../../shared/components/Button/Button.js';

export function createCategoryCard(data) {
  const {
    id,
    title,
    headline,
    description,
    buttonLabel,
    image,
    imageAlt,
    route,
    size = 'medium',
  } = data;

  const element = document.createElement('article');
  element.className = `category-card category-card--${size}`;
  element.setAttribute('data-category-id', id);

  const cleanupFns = [];

  // ── Render ──────────────────────────────────────────────────────────────

  function render() {
    element.innerHTML = `
      <a class="category-card__link" href="${route}" aria-label="${title}: ${headline}">
        <div class="category-card__image-wrap">
          <img
            class="category-card__image"
            src="${image}"
            alt="${imageAlt}"
            loading="lazy"
            decoding="async"
          >
          <div class="category-card__overlay" aria-hidden="true"></div>
        </div>

        <div class="category-card__content">
          <span class="category-card__eyebrow eyebrow">${title}</span>
          <h3 class="category-card__headline">${headline}</h3>
          <p class="category-card__description">${description}</p>
          <div class="category-card__cta"></div>
        </div>
      </a>
    `;

    // Inject the CTA button
    const ctaSlot = element.querySelector('.category-card__cta');
    const { element: btn, destroy: destroyBtn } = createButton({
      label:   buttonLabel,
      variant: 'white',
      size:    size === 'large' ? 'md' : 'sm',
    });
    ctaSlot.appendChild(btn);
    cleanupFns.push(destroyBtn);

    // Graceful image error fallback
    const img = element.querySelector('.category-card__image');
    img?.addEventListener('error', () => {
      img.style.display = 'none';
      element.style.background = `linear-gradient(135deg, #2a2a2a, #444)`;
    });
  }

  // ── Events ──────────────────────────────────────────────────────────────

  function bindEvents() {
    const link = element.querySelector('.category-card__link');

    const handleClick = (e) => {
      e.preventDefault();
      navigate(route);
    };

    link?.addEventListener('click', handleClick);
    cleanupFns.push(() => link?.removeEventListener('click', handleClick));
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
  }

  render();
  bindEvents();

  return { element, destroy };
}
