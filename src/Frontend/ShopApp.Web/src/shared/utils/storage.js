/**
 * Shared token and session storage utility.
 *
 * The access token is cached in module memory for fast, synchronous reads,
 * and mirrored to sessionStorage so it survives a page reload or a second
 * tab/window opened from the same browser session (e.g. a product link
 * opened in a new tab) — without either of those looking like an unexpected
 * logout, even though the JWT itself is still valid.
 *
 * sessionStorage (not localStorage) is used deliberately: it is cleared the
 * moment the tab/browser session ends, and the JWT still carries its own
 * short, server-issued expiry (see JwtSettings:ExpirationInMinutes) — this
 * is not a long-lived token stashed in localStorage. It is a narrower XSS
 * surface than localStorage while fixing the "authenticated user treated as
 * anonymous by a routine reload" gap that a memory-only token has.
 */

const ACCESS_TOKEN_STORAGE_KEY = 'shopapp_access_token';

function readStoredAccessToken() {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing, restricted environments,
    // or non-browser contexts (tests) — fall back to memory-only for this tab.
    return null;
  }
}

let inMemoryToken = readStoredAccessToken();

/** @param {string} token */
export function saveAccessToken(token) {
  inMemoryToken = token || null;
  try {
    if (inMemoryToken) {
      sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, inMemoryToken);
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  } catch {
    // The in-memory copy above still keeps the current tab working.
  }
}

/** @returns {string|null} */
export function getAccessToken() {
  return inMemoryToken;
}

export function removeAccessToken() {
  inMemoryToken = null;
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch {
    // Nothing further to clean up if storage is unavailable.
  }
}

export function saveRememberMe(value) {
  try {
    localStorage.setItem('shopapp_remember_me', value ? '1' : '0');
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}

/** @returns {boolean} */
export function getRememberMe() {
  try {
    return localStorage.getItem('shopapp_remember_me') === '1';
  } catch {
    return false;
  }
}

export function clearPreferences() {
  try {
    localStorage.removeItem('shopapp_remember_me');
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}
