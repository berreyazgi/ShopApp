/**
 * apiClient.js
 * Centralized HTTP client.
 *
 * All network requests in the app must go through this module.
 * Components and pages never use fetch() directly.
 *
 * This abstraction means:
 *  - Auth headers can be injected in one place
 *  - Error handling is consistent
 *  - The backend URL can change without touching component code
 *  - The client can be swapped (e.g. for axios) without UI changes
 */

import { appConfig } from '../../app/appConfig.js';
import { getAccessToken } from '../utils/storage.js';

// ─── Configuration ─────────────────────────────────────────────────────────

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept':       'application/json',
};

/** Resolves a full URL from a relative path. */
function buildUrl(path) {
  const base = appConfig.api.gatewayBaseUrl;
  return base ? `${base}${path}` : path;
}


/** Returns the Authorization header if a token is present, otherwise {}. */
function getAuthHeader() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Core request ──────────────────────────────────────────────────────────

/**
 * @param {string} method
 * @param {string} path
 * @param {{ body?: object, params?: object }} [options]
 * @returns {Promise<any>}
 */
async function request(method, path, options = {}) {
  const url  = buildUrl(path);
  const auth = getAuthHeader();

  const init = {
    method,
    headers: { ...DEFAULT_HEADERS, ...auth },
  };

  if (options.body) {
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw {
      status:  response.status,
      message: errorBody.message ?? response.statusText,
      body:    errorBody,
    };
  }

  // 204 No Content
  if (response.status === 204) return null;

  return response.json();
}

// ─── Public API ────────────────────────────────────────────────────────────

export const apiClient = {
  get:    (path, options)         => request('GET',    path, options),
  post:   (path, body, options)   => request('POST',   path, { ...options, body }),
  put:    (path, body, options)   => request('PUT',    path, { ...options, body }),
  patch:  (path, body, options)   => request('PATCH',  path, { ...options, body }),
  delete: (path, options)         => request('DELETE', path, options),
};
