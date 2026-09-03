/**
 * orderService.js — Sipariş (Order) API Service
 *
 * Wraps all order-related API calls using the shared apiClient.
 * Pages must call these functions; they must NOT call apiClient directly.
 *
 * Backend: SiparisController @ /api/siparis  (ShopApp.Api)
 *
 * DTO shapes (read-only reference — backend is source of truth):
 *
 *  ResultSiparisDto {
 *    id:               Guid (string)
 *    musteriId:        Guid (string)
 *    siparisNumarasi:  string
 *    durumIsmi:        string   — e.g. "Kargoda", "Teslim Edildi"
 *    araToplam:        number
 *    indirimOrani:     number
 *    kargoFiyat:       number
 *    toplamFiyat:      number
 *  }
 *
 *  CreateSiparisDto {
 *    musteriId:    Guid (string)
 *    indirimOrani: number       — 0 if no discount
 *  }
 *
 *  ResultSiparisUrunleriDto {
 *    id:              Guid
 *    urunTurId:       Guid
 *    urunIsmi:        string
 *    urunMiktar:      number
 *    urunBirimFiyat:  number
 *    toplamTutar:     number    — computed on the server
 *  }
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

// ── Orders ────────────────────────────────────────────────────────────────────

/**
 * Retrieves all orders.
 * Maps to: GET /api/siparis
 *
 * @returns {Promise<ResultSiparisDto[]>}
 */
export async function getAllOrders() {
  return apiClient.get(endpoints.ordering.orders());
}

/**
 * Retrieves a single order by ID.
 * Maps to: GET /api/siparis/{id}
 *
 * @param {string} id
 * @returns {Promise<ResultSiparisDto>}
 */
export async function getOrderById(id) {
  return apiClient.get(endpoints.ordering.orderById(id));
}

/**
 * Creates a new order (sipariş).
 * Maps to: POST /api/siparis
 *
 * @param {{ musteriId: string, indirimOrani: number }} payload
 * @returns {Promise<{ id: string }>}
 */
export async function createOrder(payload) {
  return apiClient.post(endpoints.ordering.orders(), payload);
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
 * Adds an item to an existing order.
 * Maps to: POST /api/siparis/{siparisId}/urunler
 *
 * @param {string} siparisId
 * @param {{ siparisId: string, urunTurId: string, siparisNumarasi: string, urunIsmi: string, urunBirimFiyat: number }} payload
 * @returns {Promise<{ id: string }>}
 */
export async function addOrderItem(siparisId, payload) {
  return apiClient.post(endpoints.ordering.orderItems(siparisId), payload);
}
