/**
 * adminService.js — Admin Dashboard API Service
 *
 * Wraps the real Admin Dashboard endpoint using the shared apiClient.
 * Backend: GET /api/admin/dashboard (AdminDashboardController, Admin only),
 * backed by the GetAdminDashboard CQRS query — real persisted Urun/Kategori/
 * Siparis/UrunVaryant data. NO demo data, NO fake business data, NO hardcoded
 * records.
 *
 * summary/recentOrders/lowStockProducts all come from the same single
 * response — call getAdminDashboard() directly when a caller needs more
 * than one of them, rather than hitting the endpoint multiple times.
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

/** Maps a backend AdminDashboardOrderDto to the shape AdminDashboardPage renders. */
function mapOrder(dto) {
  return {
    id: dto.id,
    orderNumber: dto.orderNumber,
    customerName: dto.customerName,
    total: dto.total,
    status: dto.durum,
    durum: dto.durum,
    createdAt: dto.createdAt,
  };
}

/** Maps a backend AdminLowStockItemDto to the shape AdminDashboardPage renders. */
function mapLowStockItem(dto) {
  return {
    urunId: dto.urunId,
    urunVaryantId: dto.urunVaryantId,
    name: dto.urunAd,
    ad: dto.urunAd,
    variantName: dto.urunVaryantAd,
    stock: dto.stokAdet,
    stok: dto.stokAdet,
  };
}

/**
 * Fetches the full dashboard payload in a single request.
 * Maps to: GET /api/admin/dashboard
 * @returns {Promise<{
 *   summary: { totalProducts: number, totalCategories: number, pendingOrders: number, lowStockCount: number },
 *   recentOrders: Array,
 *   lowStockProducts: Array,
 * }>}
 */
export async function getAdminDashboard() {
  const dto = await apiClient.get(endpoints.adminDashboard.get());
  return {
    summary: {
      totalProducts: dto.totalProducts,
      totalCategories: dto.totalCategories,
      pendingOrders: dto.pendingOrders,
      lowStockCount: dto.lowStockCount,
    },
    recentOrders: (dto.recentOrders ?? []).map(mapOrder),
    lowStockProducts: (dto.lowStockProducts ?? []).map(mapLowStockItem),
  };
}

/**
 * Returns dashboard summary metrics.
 * @returns {Promise<{ totalProducts: number, totalCategories: number, pendingOrders: number, lowStockCount: number }>}
 */
export async function getDashboardSummary() {
  const { summary } = await getAdminDashboard();
  return summary;
}

/**
 * Returns the most recent orders (OlusturmaTarihi descending) for admin overview.
 * @returns {Promise<Array>}
 */
export async function getRecentOrders() {
  const { recentOrders } = await getAdminDashboard();
  return recentOrders;
}

/**
 * Returns UrunVaryant records currently at or below the low-stock threshold.
 * @returns {Promise<Array>}
 */
export async function getLowStockProducts() {
  const { lowStockProducts } = await getAdminDashboard();
  return lowStockProducts;
}
