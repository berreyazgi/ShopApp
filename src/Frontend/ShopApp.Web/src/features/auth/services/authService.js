/**
 * authService.js — Auth Feature Service Stub
 * Implements login/register/logout by calling the Identity API.
 */

// import { apiClient } from '../../../shared/services/apiClient.js';
// import { endpoints } from '../../../shared/services/endpoints.js';

export async function login(credentials) {
  // TODO: return apiClient.post(endpoints.auth.login(), credentials);
  return null;
}

export async function register(data) {
  // TODO: return apiClient.post(endpoints.auth.register(), data);
  return null;
}

export async function logout() {
  // TODO: return apiClient.post(endpoints.auth.logout());
}

export async function getCurrentUser() {
  // TODO: return apiClient.get(endpoints.auth.me());
  return null;
}
