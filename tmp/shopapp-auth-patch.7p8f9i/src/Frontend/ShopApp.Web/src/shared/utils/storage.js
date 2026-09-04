/**
 * Shared token and session storage utility.
 *
 * Access tokens are held only in module memory. They are never persisted to
 * browser storage, so they cannot be read after an XSS or a later refresh.
 */

let inMemoryToken = null;

/** @param {string} token */
export function saveAccessToken(token) {
  inMemoryToken = token || null;
}

/** @returns {string|null} */
export function getAccessToken() {
  return inMemoryToken;
}

export function removeAccessToken() {
  inMemoryToken = null;
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
