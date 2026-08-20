/**
 * storage.js
 * Shared token and session storage utility.
 *
 * IMPORTANT – TOKEN STORAGE STRATEGY (TBD):
 *  The choice of token storage has significant security implications.
 *  This decision must be made during backend integration.
 *
 *  Options under consideration:
 *
 *  Option A – In-memory only (most secure against XSS):
 *    - Access token stored in a JavaScript variable
 *    - Lost on page refresh (requires silent refresh via HttpOnly cookie)
 *    - Requires refresh-token cookie (HttpOnly, Secure, SameSite=Strict)
 *    - Recommended approach
 *
 *  Option B – sessionStorage:
 *    - Survives page reload, cleared on tab close
 *    - Vulnerable to XSS if the application has any injection vectors
 *
 *  Option C – localStorage:
 *    - Persists across sessions
 *    - NOT recommended: vulnerable to XSS token theft
 *    - Only acceptable if the application has no third-party scripts
 *      and strict CSP is enforced
 *
 *  The final strategy will be implemented here without changing any
 *  calling code in authService.js or components.
 *
 * SECURITY NOTE:
 *  - Passwords must never be stored anywhere on the client.
 *  - Access tokens must never be logged.
 *  - The JWT secret key must never exist in frontend code.
 *  - The refresh token must be managed by the backend as an HttpOnly cookie.
 */

// ─── Access Token ──────────────────────────────────────────────────────────

/**
 * Persists the access token using the configured storage strategy.
 *
 * @param {string} _token - The JWT access token received from the backend.
 */
export function saveAccessToken(_token) {
  // TODO: Implement token storage strategy during backend integration.
  //
  // Recommended (Option A — in-memory):
  //   inMemoryToken = token;
  //
  // Alternative (Option B — sessionStorage):
  //   sessionStorage.setItem('access_token', token);
  //
  // NOT RECOMMENDED (Option C — localStorage):
  //   localStorage.setItem('access_token', token);
  //   ⚠ Vulnerable to XSS token theft.
}

/**
 * Retrieves the stored access token.
 * Returns null until a storage strategy is configured.
 *
 * @returns {string|null}
 */
export function getAccessToken() {
  // TODO: Read from the configured storage strategy.
  // Recommended: return inMemoryToken;
    return null;
  }

/**
 * Removes the stored access token.
 * Call on logout.
 */
export function removeAccessToken() {
  // TODO: Clear the configured token storage.
  // Recommended: inMemoryToken = null;
}

// ─── Preferences (non-sensitive) ──────────────────────────────────────────

/**
 * Saves the "remember me" preference.
 * This is a UI preference only — not a security mechanism.
 * Backend session lifetime is controlled server-side.
 *
 * @param {boolean} value
 */
export function saveRememberMe(value) {
  try {
    localStorage.setItem('shopapp_remember_me', value ? '1' : '0');
  } catch {
    // Storage not available in private browsing or restricted environments.
  }
}

/**
 * Reads the "remember me" preference.
 * @returns {boolean}
 */
export function getRememberMe() {
  try {
    return localStorage.getItem('shopapp_remember_me') === '1';
  } catch {
    return false;
  }
}

/**
 * Clears all non-sensitive stored preferences.
 * Call on logout.
 */
export function clearPreferences() {
  try {
    localStorage.removeItem('shopapp_remember_me');
  } catch {
    // Silently ignore storage errors.
  }
}
