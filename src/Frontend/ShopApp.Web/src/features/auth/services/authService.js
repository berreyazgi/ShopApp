import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';
import { getAccessToken, removeAccessToken, saveAccessToken } from '../../../shared/utils/storage.js';
import { setAnonymous, setAuthenticated } from '../state/authStore.js';

function mapUser(user) {
  if (!user?.id || !user?.email) throw new Error('Geçersiz kimlik doğrulama yanıtı.');
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles ?? [],
  };
}

function mapAuthResponse(response) {
  if (!response?.accessToken || !response?.user) throw new Error('Geçersiz kimlik doğrulama yanıtı.');
  return { accessToken: response.accessToken, expiresAt: response.expiresAt, user: mapUser(response.user) };
}

function establishSession(response) {
  const session = mapAuthResponse(response);
  saveAccessToken(session.accessToken);
  setAuthenticated({ user: session.user, accessToken: session.accessToken });
  return session;
}

export async function login({ email, password }) {
  const response = await apiClient.post(endpoints.auth.login(), { email, sifre: password }, { skipUnauthorizedHandler: true });
  return { success: true, ...establishSession(response) };
}

export async function register({ firstName, lastName, email, password }) {
  const response = await apiClient.post(endpoints.auth.register(), { ad: firstName, soyad: lastName, email, sifre: password }, { skipUnauthorizedHandler: true });
  return { success: true, ...establishSession(response) };
}

export async function getCurrentUser() {
  const user = mapUser(await apiClient.get(endpoints.auth.me()));
  setAuthenticated({ user, accessToken: getAccessToken() });
  return user;
}

export async function restoreSession() {
  if (!getAccessToken()) {
    setAnonymous();
    return null;
  }
  try {
    return await getCurrentUser();
  } catch {
    removeAccessToken();
    setAnonymous();
    return null;
  }
}

export async function logout() {
  removeAccessToken();
  setAnonymous();
}

export function mapAuthError(error) {
  if (error?.validationErrors) {
    const messages = Object.values(error.validationErrors).flat();
    if (messages.length > 0) return messages.join(' ');
  }
  const statusMap = {
    0: 'Ağ bağlantısı kurulamadı. Lütfen tekrar deneyin.',
    401: 'E-posta adresi veya şifre hatalı.',
    403: 'Bu işlem için yetkiniz bulunmuyor.',
    409: 'Bu e-posta adresi zaten kullanılıyor.',
    400: error?.message ?? 'Girilen bilgiler geçersiz. Lütfen kontrol edin.',
    429: 'Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.',
  };
  return statusMap[error?.status] ?? 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
}
