/**
 * format.js
 * Shared frontend-only formatting helpers (no network/data access).
 */

/** @param {number} amount */
export function formatPrice(amount) {
  return Number(amount ?? 0).toLocaleString('tr-TR') + ' TL';
}
