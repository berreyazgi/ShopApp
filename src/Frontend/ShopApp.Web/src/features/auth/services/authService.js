/**
 * authService.js
 * Authentication feature service layer.
 *
 * This module is the single integration point between the auth UI
 * and the backend Identity API. Pages and components must never
 * call apiClient or fetch() directly.
 *
 * ARCHITECTURE BOUNDARY:
 *  auth pages → authService → apiClient → backend
 *
 * BACKEND COMPATIBILITY:
 *  Targets: ShopApp.Api (Modular Monolith) — POST /api/auth/login & /api/auth/register
 *  Future targets: Identity Microservice / API Gateway / BFF
 *  The only file that must change during that transition is this one,
 *  plus appConfig.js and endpoints.js. UI components remain unchanged.
 *
 * BACKEND RESPONSE CONTRACT (ShopApp.Api — AuthResponse):
 *  {
 *    "token":   "eyJ...",
 *    "email":   "user@example.com",
 *    "ad":      "Ahmet",
 *    "soyad":   "Yılmaz",
 *    "role":    ["User"]
 *  }
 *
 * SECURITY NOTE:
 *  This service must never:
 *   - Generate JWT tokens
 *   - Validate JWT signatures
 *   - Store passwords
 *   - Log credentials or access tokens
 *   - Contain the JWT secret key
 */

import { apiClient }                               from '../../../shared/services/apiClient.js';
import { endpoints }                               from '../../../shared/services/endpoints.js';
import { saveAccessToken, removeAccessToken }      from '../../../shared/utils/storage.js';
import { setAuthenticated, setAnonymous }          from '../state/authStore.js';

// ─── Response Mapping ──────────────────────────────────────────────────────

/**
 * Maps the raw backend login/register response (AuthResponse DTO) to a
 * frontend-friendly shape that is consistent across UI components.
 *
 * Backend field → Frontend field:
 *   token  → accessToken
 *   ad     → firstName
 *   soyad  → lastName
 *   role   → roles
 *
 * @param {object} response - Raw backend AuthResponse.
 * @returns {{ accessToken: string, user: object }}
 */
function mapAuthResponse(response) {
  return {
    accessToken: response.token,
    user: {
      email:     response.email,
      firstName: response.ad,
      lastName:  response.soyad,
      roles:     response.role ?? [],
    },
  };
}

// ─── Public Service API ────────────────────────────────────────────────────

/**
 * Authenticates the user with email and password credentials.
 *
 * Sends: { email, sifre } — matches backend LoginRequest DTO.
 *
 * SECURITY NOTE:
 *  Backend validates credentials. Never trust client-side success only.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, accessToken: string|null, user: object|null }>}
 */
export async function login(credentials) {
  // Map frontend field names to backend DTO field names.
  const payload = {
    email: credentials.email,
    sifre: credentials.password,
  };

  const raw = await apiClient.post(endpoints.auth.login(), payload);
  const { accessToken, user } = mapAuthResponse(raw);

  saveAccessToken(accessToken);
  setAuthenticated({ user, accessToken });

  return { success: true, accessToken, user };
}

/**
 * Registers a new user account.
 *
 * Sends: { ad, soyad, email, sifre } — matches backend RegisterRequest DTO.
 *
 * @param {{
 *   firstName:  string,
 *   lastName:   string,
 *   email:      string,
 *   password:   string,
 * }} payload
 * @returns {Promise<{ success: boolean, user: object|null }>}
 */
export async function register(payload) {
  // Map frontend field names to backend DTO field names.
  const body = {
    ad:    payload.firstName,
    soyad: payload.lastName,
    email: payload.email,
    sifre: payload.password,
  };

  const raw = await apiClient.post(endpoints.auth.register(), body);
  const { accessToken, user } = mapAuthResponse(raw);

  saveAccessToken(accessToken);
  setAuthenticated({ user, accessToken });

  return { success: true, user };
}

/**
 * Logs out the current user and clears the local session.
 *
 * NOTE: The backend does not yet expose a logout endpoint.
 * Token removal is client-side only for now.
 *
 * SECURITY NOTE:
 *  When the backend implements refresh-token invalidation,
 *  add: await apiClient.post(endpoints.auth.logout());
 */
export async function logout() {
  removeAccessToken();
  setAnonymous();
}

/**
 * Retrieves the currently authenticated user's profile.
 *
 * NOTE: Backend does not yet expose a /me endpoint.
 * Returns null until implemented.
 *
 * @returns {Promise<object|null>}
 */
export async function getCurrentUser() {
  // Future: return apiClient.get(endpoints.auth.me());
  return null;
}

/**
 * Refreshes the access token using a stored refresh token (HttpOnly cookie).
 *
 * NOTE: Backend does not yet expose a refresh endpoint.
 * Returns null until implemented.
 *
 * @returns {Promise<string|null>} New access token or null.
 */
export async function refreshToken() {
  // Future: return apiClient.post(endpoints.auth.refreshToken());
  return null;
}

/**
 * Maps a backend error response to a user-friendly Turkish message.
 * Pages should call this instead of displaying raw server errors.
 *
 * @param {object} error - Error thrown by apiClient (has .status and .message).
 * @returns {string}
 */
export function mapAuthError(error) {
  const statusMap = {
    401: 'E-posta adresi veya şifre hatalı.',
    403: 'Hesabınız geçici olarak kilitlendi.',
    409: 'Bu e-posta adresi zaten kullanılıyor.',
    422: 'Girilen bilgiler geçersiz. Lütfen kontrol edin.',
    429: 'Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.',
  };

  return statusMap[error?.status] ?? 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
}
