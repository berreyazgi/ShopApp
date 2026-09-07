/**
 * profileService.js — Profil ve Adres API Servisi
 *
 * Backend:
 *  - ProfilController: GET /api/profil, PUT /api/profil
 *  - AdresController:  GET /api/adres, POST /api/adres, PUT /api/adres/{id}, DELETE /api/adres/{id}
 *
 * Auth: Tüm istekler Authorization: Bearer {token} gerektirir.
 * apiClient token'ı otomatik olarak ekler.
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

// ── Profile ──────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} UserProfileDto
 * @property {string} id
 * @property {string} musteriId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 * @property {string} email
 * @property {string|null} phone
 * @property {string} createdAt
 * @property {string|null} avatarUrl
 */

/**
 * Oturum açmış kullanıcının profil bilgilerini getirir.
 * @returns {Promise<UserProfileDto>}
 */
export async function getProfile() {
  return apiClient.get(endpoints.profile.get());
}

/**
 * Oturum açmış kullanıcının ad, soyad ve telefon bilgilerini günceller.
 * @param {{ ad: string, soyad: string, telefon?: string|null }} payload
 * @returns {Promise<UserProfileDto>}
 */
export async function updateProfile(payload) {
  return apiClient.put(endpoints.profile.update(), payload);
}

// ── Addresses ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} AddressDto
 * @property {string} id
 * @property {string} musteriId
 * @property {string|null} adresBilgisi
 * @property {number} ulke
 * @property {number} sehir
 * @property {number} ilce
 * @property {string} postaKodu
 * @property {string} olusturmaTarihi
 * @property {string|null} guncellemeTarihi
 */

/**
 * Oturum açmış kullanıcının kayıtlı adreslerini getirir.
 * @returns {Promise<AddressDto[]>}
 */
export async function getAddresses() {
  return apiClient.get(endpoints.address.list());
}

/**
 * Yeni adres ekler.
 * @param {{
 *   adresBilgisi?: string|null,
 *   ulke?: number,
 *   sehir: number,
 *   ilce?: number,
 *   postaKodu: string,
 * }} payload
 * @returns {Promise<AddressDto>}
 */
export async function createAddress(payload) {
  return apiClient.post(endpoints.address.create(), {
    ulke: payload.ulke ?? 90,
    sehir: Number(payload.sehir),
    ilce: Number(payload.ilce ?? 0),
    postaKodu: payload.postaKodu,
    adresBilgisi: payload.adresBilgisi ?? '',
  });
}

/**
 * Mevcut adresi günceller.
 * @param {string} id
 * @param {{
 *   adresBilgisi?: string|null,
 *   ulke?: number,
 *   sehir: number,
 *   ilce?: number,
 *   postaKodu: string,
 * }} payload
 * @returns {Promise<AddressDto>}
 */
export async function updateAddress(id, payload) {
  return apiClient.put(endpoints.address.update(id), {
    id,
    ulke: payload.ulke ?? 90,
    sehir: Number(payload.sehir),
    ilce: Number(payload.ilce ?? 0),
    postaKodu: payload.postaKodu,
    adresBilgisi: payload.adresBilgisi ?? '',
  });
}

/**
 * Adresi siler.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteAddress(id) {
  return apiClient.delete(endpoints.address.delete(id));
}
