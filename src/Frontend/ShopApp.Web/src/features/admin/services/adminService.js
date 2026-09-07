/**
 * adminService.js — Admin Feature Service Stubs
 *
 * Provides typed contract boundaries for admin pages.
 * NO demo data, NO fake business data, NO hardcoded records.
 * NO network calls (fetch/apiClient) are introduced here — real backend/API
 * integration will be implemented by the developer.
 */

/**
 * Returns dashboard summary metrics.
 * @returns {Promise<{ totalProducts: number|null, totalCategories: number|null, pendingOrders: number|null, lowStockCount: number|null }>}
 */
export async function getDashboardSummary() {
  // Integration point for future admin dashboard API.
  // Defaults to neutral state until API is wired.
  return {
    totalProducts: null,
    totalCategories: null,
    pendingOrders: null,
    lowStockCount: null,
  };
}

/**
 * Returns the most recent orders for admin overview.
 * @returns {Promise<Array>}
 */
export async function getRecentOrders() {
  // Integration point for future admin orders API.
  return [];
}

/**
 * Returns products currently below low-stock threshold.
 * @returns {Promise<Array>}
 */
export async function getLowStockProducts() {
  // Integration point for future admin stock API.
  return [];
}
