/**
 * authService.js
 * Authentication feature service layer.
 *
 * ARCHITECTURE BOUNDARY:
 *  auth pages → authService → apiClient → backend
 *
 * BACKEND COMPATIBILITY:
 *  Initially targets:   ShopApp.Api (Modular Monolith) — http://localhost:5048
 *  Future targets:      Identity Microservice / API Gateway / BFF
 *  The only file that must change during that transition is this one,
 *  plus appConfig.js and endpoints.js. UI components remain unchanged.
 *
 * SECURITY NOTE:
 *  This service must never:
 *   - Generate JWT tokens
 *   - Validate JWT signatures
 *   - Store passwords
 *   - Log credentials or access tokens
 *   - Contain the JWT secret key
 */

import { apiClient }        from '../../../shared/services/apiClient.js';
import { endpoints }        from '../../../shared/services/endpoints.js';
import { saveAccessToken, removeAccessToken } from '../../../shared/utils/storage.js';
import { setAuthenticated, setAnonymous }     from '../state/authStore.js';

// ─── Response Mapping ──────────────────────────────────────────────────────

/**
 * Maps the raw backend login/register response to a frontend-friendly shape.
 *
 * Backend response shape (ShopApp.Api):
 * {
 *   "token":  "eyJ...",
 *   "email":  "user@example.com",
 *   "ad":     "Ali",
 *   "soyad":  "Yılmaz",
 *   "role":   ["User"]
 * }
 *
 * @param {object} response - Raw backend response.
 * @returns {{ accessToken: string, user: object }}
 */
function mapAuthResponse(response) {
  return {
    accessToken: response.token,
    user: {
      email:  response.email,
      ad:     response.ad,
      soyad:  response.soyad,
      roles:  response.role ?? [],
    },
  };
}

// ─── Public Service API ────────────────────────────────────────────────────

/**
 * Authenticates the user with email and password credentials.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, accessToken: string|null, user: object|null }>}
 */
export async function login(credentials) {
  // Backend field is "Sifre", not "password" — map here so UI stays generic
  const payload = {
    email: credentials.email,
    sifre: credentials.password,
  };

  const response = await apiClient.post(endpoints.auth.login(), payload);
  const { accessToken, user } = mapAuthResponse(response);

  saveAccessToken(accessToken);
  setAuthenticated({ user, accessToken });

  return { success: true, accessToken, user };
}

/**
 * Registers a new user account.
 *
 * @param {{
 *   firstName:      string,
 *   lastName:       string,
 *   email:          string,
 *   password:       string,
 * }} payload
 * @returns {Promise<{ success: boolean, user: object|null }>}
 */
export async function register(payload) {
  // Map frontend field names → backend field names
  const backendPayload = {
    ad:    payload.firstName,
    soyad: payload.lastName,
    email: payload.email,
    sifre: payload.password,
  };

  const response = await apiClient.post(endpoints.auth.register(), backendPayload);
  const { accessToken, user } = mapAuthResponse(response);

  saveAccessToken(accessToken);
  setAuthenticated({ user, accessToken });

  return { success: true, user };
}

/**
 * Logs out the current user and clears the local session.
 */
export async function logout() {
  // Best-effort server-side logout (ignore errors — local cleanup always happens)
  try {
    await apiClient.post(endpoints.auth.logout());
  } catch {
    // Server may return 401 if token already expired — that's fine
  } finally {
    removeAccessToken();
    setAnonymous();
  }
}

/**
 * Retrieves the currently authenticated user's profile.
 * Used on app startup to restore session after a page refresh.
 *
 * @returns {Promise<object|null>} User object or null if not authenticated.
 */
export async function getCurrentUser() {
  try {
    const response = await apiClient.get(endpoints.auth.me());
    return response;
  } catch {
    return null;
  }
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
