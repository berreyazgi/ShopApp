/**
 * HomePage.js
 * Home feature page component.
 * Composes: HeroCategoryGrid + FeatureBenefits
 *
 * Exported as default so the router can import it dynamically.
 */

import { createHeroCategoryGrid } from '../components/HeroCategoryGrid.js';
import { createFeatureBenefits }  from '../components/FeatureBenefits.js';

/**
 * @param {{ params: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function HomePage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'home-page';

  const destroyFns = [];

  function render() {
    // Hero Category Grid
    const { element: grid, destroy: destroyGrid } = createHeroCategoryGrid();
    element.appendChild(grid);
    destroyFns.push(destroyGrid);

    // Benefits Banner
    const { element: benefits, destroy: destroyBenefits } = createFeatureBenefits();
    element.appendChild(benefits);
    destroyFns.push(destroyBenefits);
  }

  function destroy() {
    destroyFns.forEach((fn) => fn());
    destroyFns.length = 0;
  }

  render();

  return { element, destroy };
}
