/**
 * customerService.js — Customer Management API Service
 *
 * Wraps customer management endpoints using the shared apiClient.
 * Backend: AdminController @ /api/admin/musteriler
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

/**
 * Retrieves all registered customers for admin management.
 * Maps to: GET /api/admin/musteriler
 *
 * @returns {Promise<Array>}
 */
export async function getAdminCustomers() {
  return apiClient.get(endpoints.adminMusteri.list());
}

/**
 * Updates customer status or details.
 * Maps to: PUT /api/admin/musteriler/{id}
 *
 * {id} is the MusteriId (not the Identity user id) — the backend resolves
 * Musteri -> Musteri.KullaniciId -> KayitliKullanici, so this can only ever
 * update a real customer account.
 *
 * The backend only accepts a boolean isActive — arbitrary "durum" strings
 * are no longer supported.
 *
 * @param {string} id
 * @param {{ isActive?: boolean, ad?: string, soyad?: string, phoneNumber?: string }} payload
 * @returns {Promise<void>}
 */
export async function updateCustomerStatus(id, payload) {
  return apiClient.put(endpoints.adminMusteri.update(id), payload);
}
