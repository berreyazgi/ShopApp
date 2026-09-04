/** Authentication feature service layer. */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';
import { getAccessToken, removeAccessToken, saveAccessToken } from '../../../shared/utils/storage.js';
import { setAnonymous, setAuthenticated } from '../state/authStore.js';

function mapUser(user) {
  if (!user?.id || !user?.email) return null;
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName ?? user.ad ?? '',
    lastName: user.lastName ?? user.soyad ?? '',
    roles: Array.isArray(user.roles) ? user.roles : [],
  };
}

function establishSession(response) {
  const user = mapUser(response?.user);
  const accessToken = response?.accessToken;
  if (!accessToken || !user) {
    throw new Error('Sunucudan geçerli bir oturum yanıtı alınamadı. Lütfen tekrar deneyin.');
  }
  saveAccessToken(accessToken);
  setAuthenticated({ user, accessToken });
  return { success: true, accessToken, user };
}

/** @param {{ email: string, password: string }} credentials */
export async function login({ email, password }) {
  const response = await apiClient.post(endpoints.auth.login(), { email, sifre: password });
  return establishSession(response);
}

/** @param {{ firstName: string, lastName: string, email: string, password: string }} payload */
export async function register({ firstName, lastName, email, password }) {
  const response = await apiClient.post(endpoints.auth.register(), {
    ad: firstName,
    soyad: lastName,
    email,
    sifre: password,
  });
  return establishSession(response);
}

/** Clears the browser-side JWT session. The current API does not expose a logout endpoint. */
export async function logout() {
  removeAccessToken();
  setAnonymous();
}

export async function getCurrentUser() {
  const user = mapUser(await apiClient.get(endpoints.auth.me()));
  if (!user) throw new Error('Kullanıcı bilgileri alınamadı.');
  return user;
}

/** Refresh tokens are not implemented by the current API. */
export async function refreshToken() {
  return null;
}

/** Restores the in-memory session when one is available. */
export async function restoreSession() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    setAnonymous();
    return;
  }
  try {
    setAuthenticated({ user: await getCurrentUser(), accessToken });
  } catch {
    removeAccessToken();
    setAnonymous();
  }
}

/** @param {{ status?: number, body?: { errors?: object } }} error */
export function mapAuthError(error) {
  const validationErrors = error?.body?.errors;
  if (validationErrors && typeof validationErrors === 'object') {
    const firstMessage = Object.values(validationErrors).flat()
      .find((message) => typeof message === 'string' && message.trim());
    if (firstMessage) return firstMessage;
  }

  const statusMap = {
    400: 'Girilen bilgiler geçersiz. Lütfen alanları kontrol edin.',
    401: 'E-posta adresi veya şifre hatalı.',
    403: 'Hesabınız geçici olarak kilitlendi.',
    409: 'Bu e-posta adresi zaten kullanılıyor.',
    422: 'Girilen bilgiler geçersiz. Lütfen alanları kontrol edin.',
    429: 'Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.',
  };
  if (typeof error?.status === 'number') {
    return statusMap[error.status] ?? 'İşlem tamamlanamadı. Lütfen tekrar deneyin.';
  }
  return 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.';
}
