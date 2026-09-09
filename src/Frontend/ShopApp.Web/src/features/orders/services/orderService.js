/**
 * orderService.js — Sipariş (Order) API Service
 *
 * Wraps all order-related API calls using the shared apiClient.
 * Pages must call these functions; they must NOT call apiClient directly.
 *
 * Backend: SiparisController @ /api/siparis  (ShopApp.Api)
 * Auth: every request requires a Bearer token — the controller is [Authorize]
 * and apiClient attaches the token automatically. MusteriId is never sent by
 * the client; the backend derives it from the authenticated user.
 *
 * DTO / Command shapes (read-only reference — backend is source of truth):
 *
 *  ResultSiparisDto {
 *    id:               Guid (string)
 *    musteriId:        Guid (string)   — the owner, echoed back for display only
 *    siparisNumarasi:  string
 *    durumIsmi:        string   — e.g. "Kargoda", "Teslim Edildi"
 *    araToplam:        number
 *    indirimTutari:    number   — discount amount (currency), not a percentage
 *    kargoFiyat:       number
 *    toplamFiyat:      number
 *  }
 *
 *  CreateSiparisCommand — no request body. MusteriId and the order number are
 *  both derived/generated server-side.
 *
 *  UpdateSiparisCommand {
 *    id:            Guid (string)  — must match the route id
 *    yeniDurumId:   number
 *  }
 *
 *  ResultSiparisUrunleriDto {
 *    id:                 Guid (string)
 *    siparisId:          Guid (string)
 *    urunTurId:          Guid (string)
 *    urunIsmi:           string
 *    urunAciklamasi:     string | null
 *    stokTakipNumarasi:  string | null
 *    urunMiktar:         number
 *    urunBirimFiyat:     number
 *    indirimOrani:       number   — ratio in [0, 1], e.g. 0.1 = %10
 *    toplamFiyat:        number   — computed on the server (discount applied)
 *  }
 *
 *  CreateSiparisUrunuCommand {
 *    siparisId:          Guid (string)  — must match the route siparisId
 *    urunTurId:          Guid (string)
 *    urunIsmi:           string
 *    urunAciklamasi:     string | null
 *    stokTakipNumarasi:  string | null
 *    urunMiktar:         number
 *    urunBirimFiyat:     number
 *    indirimOrani:       number
 *  }
 *
 *  UpdateSiparisUrunuCommand {
 *    siparisId:   Guid (string)  — must match the route siparisId
 *    id:          Guid (string)  — must match the route urunId
 *    urunMiktar:  number
 *  }
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

// ── Orders ────────────────────────────────────────────────────────────────────

/**
 * Retrieves the authenticated customer's own orders.
 * Maps to: GET /api/siparis
 *
 * @returns {Promise<ResultSiparisDto[]>}
 */
export async function getAllOrders() {
  return apiClient.get(endpoints.ordering.orders());
}

/**
 * Retrieves a single order by ID. Only the owning customer's order is
 * returned; any other id resolves as not found.
 * Maps to: GET /api/siparis/{id}
 *
 * @param {string} id
 * @returns {Promise<ResultSiparisDto>}
 */
export async function getOrderById(id) {
  return apiClient.get(endpoints.ordering.orderById(id));
}

/**
 * Creates a new order (sipariş) for the authenticated customer.
 * Maps to: POST /api/siparis
 *
 * @returns {Promise<{ id: string }>}
 */
export async function createOrder() {
  return apiClient.post(endpoints.ordering.orders());
}

/**
 * Updates an order's status.
 * Maps to: PUT /api/siparis/{id}
 *
 * @param {string} id
 * @param {{ yeniDurumId: number }} payload
 * @returns {Promise<void>}
 */
export async function updateOrder(id, payload) {
  return apiClient.put(endpoints.ordering.orderById(id), { id, ...payload });
}

/**
 * Deletes an order.
 * Maps to: DELETE /api/siparis/{id}
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteOrder(id) {
  return apiClient.delete(endpoints.ordering.orderById(id));
}

// ── Order Items ───────────────────────────────────────────────────────────────

/**
 * Retrieves all items (ürünler) for a given order.
 * Maps to: GET /api/siparis/{siparisId}/urunler
 *
 * @param {string} siparisId
 * @returns {Promise<ResultSiparisUrunleriDto[]>}
 */
export async function getOrderItems(siparisId) {
  return apiClient.get(endpoints.ordering.orderItems(siparisId));
}

/**
 * Retrieves a single item within an order.
 * Maps to: GET /api/siparis/{siparisId}/urunler/{urunId}
 *
 * @param {string} siparisId
 * @param {string} urunId
 * @returns {Promise<ResultSiparisUrunleriDto>}
 */
export async function getOrderItemById(siparisId, urunId) {
  return apiClient.get(endpoints.ordering.orderItemById(siparisId, urunId));
}

/**
 * Adds an item to an existing order.
 * Maps to: POST /api/siparis/{siparisId}/urunler
 *
 * @param {string} siparisId
 * @param {{
 *   urunTurId: string,
 *   urunIsmi: string,
 *   urunAciklamasi?: string | null,
 *   stokTakipNumarasi?: string | null,
 *   urunMiktar: number,
 *   urunBirimFiyat: number,
 *   indirimOrani?: number,
 * }} payload
 * @returns {Promise<{ id: string }>}
 */
export async function addOrderItem(siparisId, payload) {
  return apiClient.post(endpoints.ordering.orderItems(siparisId), {
    siparisId,
    urunAciklamasi: null,
    stokTakipNumarasi: null,
    indirimOrani: 0,
    ...payload,
  });
}

/**
 * Updates the quantity of an item already in the order.
 * Maps to: PUT /api/siparis/{siparisId}/urunler/{urunId}
 *
 * @param {string} siparisId
 * @param {string} urunId
 * @param {{ urunMiktar: number }} payload
 * @returns {Promise<void>}
 */
export async function updateOrderItem(siparisId, urunId, payload) {
  return apiClient.put(endpoints.ordering.orderItemById(siparisId, urunId), { siparisId, id: urunId, ...payload });
}

/**
 * Removes an item from the order.
 * Maps to: DELETE /api/siparis/{siparisId}/urunler/{urunId}
 *
 * @param {string} siparisId
 * @param {string} urunId
 * @returns {Promise<void>}
 */
export async function removeOrderItem(siparisId, urunId) {
  return apiClient.delete(endpoints.ordering.orderItemById(siparisId, urunId));
}

// ── Admin Orders ─────────────────────────────────────────────────────────────

/**
 * Retrieves all orders for admin review.
 * Maps to: GET /api/admin/siparisler
 *
 * @returns {Promise<Array>}
 */
export async function getAdminOrders() {
  return apiClient.get(endpoints.adminSiparis.list());
}

/**
 * Updates an order's status as an administrator.
 * Maps to: PUT /api/admin/siparisler/{id}/durum
 *
 * The backend accepts exactly one canonical field (durumId) — no
 * yeniDurumId/statusId aliases.
 *
 * @param {string} id
 * @param {number} newStatusId
 * @returns {Promise<void>}
 */
export async function updateAdminOrderStatus(id, newStatusId) {
  return apiClient.put(endpoints.adminSiparis.updateStatus(id), { durumId: Number(newStatusId) });
}

