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
 *    durumId:          number          — 1 = Aktif (the usable/open cart)
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
 *    urunVaryantId:     Guid (string)
 *    urunId:        Guid (string)
 *    urunAd:        string
 *    gorselUrl:     string | null
 *    ozellikler:    [{ id, urunVaryantId, ozellikAd, deger }]
 *    urunMiktar:    number
 *    fiyatGecmis:   number  — resolved server-side (Urun.Fiyat + UrunVaryant.FiyatFarki), never client-supplied
 *    toplamTutar:   number  — computed on the server
 *  }
 *
 *  CreateSepetUrunuCommand {
 *    sepetId:       Guid (string)  — must match the route sepetId
 *    urunVaryantId:     Guid (string)
 *    urunMiktar:    number
 *  }
 *  NOTE: price is never part of this payload — the backend resolves it from
 *  the UrunVaryant's parent Urun. Sending a price here would be ignored even if
 *  present.
 *
 *  UpdateSepetUrunuCommand {
 *    sepetId:     Guid (string)  — must match the route sepetId
 *    id:          Guid (string)  — must match the route urunId
 *    urunMiktar:  number
 *  }
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

/** DurumId for a usable/open cart — see SepetDurum.Aktif in the backend. */
const ACTIVE_CART_DURUM_ID = 1;

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
 * Finds the customer's currently active (DurumId === Aktif) cart, or creates
 * a new one if none exists. Never creates a second active cart if one is
 * already usable.
 * Maps to: GET /api/sepet (+ POST /api/sepet only if no active cart is found)
 *
 * @returns {Promise<{ id: string, durumId: number }>}
 */
export async function getOrCreateActiveCart() {
  const carts = await getMyCarts();
  const active = (carts ?? []).find((c) => c.durumId === ACTIVE_CART_DURUM_ID);
  if (active) return active;

  const { id } = await createCart();
  return { id, durumId: ACTIVE_CART_DURUM_ID };
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
 * Adds a variant to a cart. Price is always resolved server-side from the
 * variant's parent product — the client only ever supplies the variant and
 * the quantity.
 * Maps to: POST /api/sepet/{sepetId}/urunler
 *
 * @param {string} sepetId
 * @param {{ urunVaryantId: string, urunMiktar: number }} payload
 * @returns {Promise<{ id: string }>}
 */
export async function addCartItem(sepetId, payload) {
  return apiClient.post(endpoints.cart.cartItems(sepetId), {
    sepetId,
    urunVaryantId: payload.urunVaryantId,
    urunMiktar: payload.urunMiktar,
  });
}

/**
 * Updates the quantity of an item already in the cart.
 * Maps to: PUT /api/sepet/{sepetId}/urunler/{urunId}
 *
 * @param {string} sepetId
 * @param {string} urunId
 * @param {{ urunMiktar: number }} payload
 * @returns {Promise<void>}
 */
export async function updateCartItem(sepetId, urunId, payload) {
  return apiClient.put(endpoints.cart.cartItemById(sepetId, urunId), {
    sepetId,
    id: urunId,
    urunMiktar: payload.urunMiktar,
  });
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
