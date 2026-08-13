/**
 * Centralized HTTP client. Feature services are the only callers of this module.
 */
import { appConfig } from '../../app/appConfig.js';
import { getAccessToken, removeAccessToken } from '../utils/storage.js';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

function buildUrl(path, params) {
  const base = appConfig.api.gatewayBaseUrl.replace(/\/$/, '');
  const url = new URL(base + path, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  return url.toString();
}

function getAuthHeader() {
  const token = getAccessToken();
  return token ? { Authorization: 'Bearer ' + token } : {};
}

async function readBody(response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;
  return response.json().catch(() => null);
}

async function request(method, path, options = {}) {
  let response;
  try {
    response = await fetch(buildUrl(path, options.params), {
      method,
      headers: { ...DEFAULT_HEADERS, ...getAuthHeader(), ...options.headers },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw { status: 0, message: 'Ağ bağlantısı kurulamadı. Lütfen tekrar deneyin.' };
  }

  const body = await readBody(response);
  if (!response.ok) {
    const error = {
      status: response.status,
      message: body?.message ?? body?.title ?? response.statusText,
      validationErrors: body?.errors ?? null,
      body,
    };

    if (response.status === 401 && !options.skipUnauthorizedHandler) {
      removeAccessToken();
      unauthorizedHandler?.(error);
    }

    throw error;
  }

  return response.status === 204 ? null : body;
}

export const apiClient = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options) => request('POST', path, { ...options, body }),
  put: (path, body, options) => request('PUT', path, { ...options, body }),
  patch: (path, body, options) => request('PATCH', path, { ...options, body }),
  delete: (path, options) => request('DELETE', path, options),
};
