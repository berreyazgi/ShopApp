/**
 * cartService.js — Sepet (Cart) API Service
 *
 * Wraps all cart-related API calls using the shared apiClient.
 * Pages must call these functions; they must NOT call apiClient directly.
 *
 * Backend: SepetController @ /api/sepet  (ShopApp.Api)
 * Auth: every request requires a Bearer token — the controller is [Authorize]
 * and apiClient attaches the token automatically. MusteriId is never sent by
 * the client; the backend derives it from the authenticated user.
 *
 * DTO / Command shapes (read-only reference — backend is source of truth):
 *
 *  ResultSepetDto {
 *    id:               Guid (string)
 *    musteriId:        Guid (string)   — the owner, echoed back for display only
 *    durumId:          number
 *    olusturmaTarihi:  string (ISO date)
 *  }
 *
 *  CreateSepetCommand — no request body. MusteriId is derived server-side.
 *
 *  UpdateSepetCommand {
 *    id:       Guid (string)  — must match the route id
 *    durumId:  number
 *  }
 *
 *  ResultSepetUrunDto {
 *    id:            Guid (string)
 *    sepetId:       Guid (string)
 *    urunTurId:     Guid (string)
 *    urunMiktar:    number
 *    urunAdet:      number
 *    fiyatGecmis:   number
 *    toplamTutar:   number   — computed on the server
 *  }
 *
 *  CreateSepetUrunuCommand {
 *    sepetId:       Guid (string)  — must match the route sepetId
 *    urunTurId:     Guid (string)
 *    urunMiktar:    number
 *    urunAdet:      number
 *    fiyatGecmis:   number
 *  }
 *
 *  UpdateSepetUrunuCommand {
 *    sepetId:     Guid (string)  — must match the route sepetId
 *    id:          Guid (string)  — must match the route urunId
 *    urunMiktar:  number
 *    urunAdet:    number
 *  }
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

// ── Carts ────────────────────────────────────────────────────────────────────

/**
 * Retrieves the authenticated customer's own carts.
 * Maps to: GET /api/sepet
 *
 * @returns {Promise<ResultSepetDto[]>}
 */
export async function getMyCarts() {
  return apiClient.get(endpoints.cart.carts());
}

/**
 * Retrieves a single cart by ID. Only the owning customer's cart is returned;
 * any other id resolves as not found.
 * Maps to: GET /api/sepet/{id}
 *
 * @param {string} id
 * @returns {Promise<ResultSepetDto>}
 */
export async function getCartById(id) {
  return apiClient.get(endpoints.cart.cartById(id));
}

/**
 * Creates a new cart for the authenticated customer.
 * Maps to: POST /api/sepet
 *
 * @returns {Promise<{ id: string }>}
 */
export async function createCart() {
  return apiClient.post(endpoints.cart.carts());
}

/**
 * Updates a cart's status.
 * Maps to: PUT /api/sepet/{id}
 *
 * @param {string} id
 * @param {{ durumId: number }} payload
 * @returns {Promise<void>}
 */
export async function updateCart(id, payload) {
  return apiClient.put(endpoints.cart.cartById(id), { id, ...payload });
}

/**
 * Deletes a cart.
 * Maps to: DELETE /api/sepet/{id}
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteCart(id) {
  return apiClient.delete(endpoints.cart.cartById(id));
}

// ── Cart Items ───────────────────────────────────────────────────────────────

/**
 * Retrieves all items (ürünler) for a given cart.
 * Maps to: GET /api/sepet/{sepetId}/urunler
 *
 * @param {string} sepetId
 * @returns {Promise<ResultSepetUrunDto[]>}
 */
export async function getCartItems(sepetId) {
  return apiClient.get(endpoints.cart.cartItems(sepetId));
}

/**
 * Retrieves a single item within a cart.
 * Maps to: GET /api/sepet/{sepetId}/urunler/{urunId}
 *
 * @param {string} sepetId
 * @param {string} urunId
 * @returns {Promise<ResultSepetUrunDto>}
 */
export async function getCartItemById(sepetId, urunId) {
  return apiClient.get(endpoints.cart.cartItemById(sepetId, urunId));
}

/**
 * Adds an item to an existing cart.
 * Maps to: POST /api/sepet/{sepetId}/urunler
 *
 * @param {string} sepetId
 * @param {{ urunTurId: string, urunMiktar: number, urunAdet: number, fiyatGecmis: number }} payload
 * @returns {Promise<{ id: string }>}
 */
export async function addCartItem(sepetId, payload) {
  return apiClient.post(endpoints.cart.cartItems(sepetId), { sepetId, ...payload });
}

/**
 * Updates the quantity of an item already in the cart.
 * Maps to: PUT /api/sepet/{sepetId}/urunler/{urunId}
 *
 * @param {string} sepetId
 * @param {string} urunId
 * @param {{ urunMiktar: number, urunAdet: number }} payload
 * @returns {Promise<void>}
 */
export async function updateCartItem(sepetId, urunId, payload) {
  return apiClient.put(endpoints.cart.cartItemById(sepetId, urunId), { sepetId, id: urunId, ...payload });
}

/**
 * Removes an item from the cart.
 * Maps to: DELETE /api/sepet/{sepetId}/urunler/{urunId}
 *
 * @param {string} sepetId
 * @param {string} urunId
 * @returns {Promise<void>}
 */
export async function removeCartItem(sepetId, urunId) {
  return apiClient.delete(endpoints.cart.cartItemById(sepetId, urunId));
}
