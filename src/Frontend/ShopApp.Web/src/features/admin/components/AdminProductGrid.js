/**
 * AdminProductGrid.js — Responsive Product Grid Container
 *
 * Renders a collection of products as responsive cards.
 * Zero demo products, zero hardcoded records, zero API calls.
 */

import { createAdminProductCard } from './AdminProductCard.js';

/**
 * @param {{
 *   products: any[],
 *   onEdit?: (product: any) => void,
 *   onDelete?: (product: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createAdminProductGrid({ products = [], onEdit, onDelete }) {
  const grid = document.createElement('div');
  grid.className = 'admin-products-grid';

  products.forEach((product) => {
    const card = createAdminProductCard({ product, onEdit, onDelete });
    grid.appendChild(card);
  });

  return grid;
}
