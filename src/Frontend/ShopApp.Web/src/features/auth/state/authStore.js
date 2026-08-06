/**
 * authStore.js
 * Minimal reactive authentication state.
 *
 * Responsibilities:
 *  - Hold the current authentication status
 *  - Expose typed public methods for state transitions
 *  - Notify subscribed components on change
 *  - Never directly manipulate DOM elements
 *
 * SECURITY NOTE:
 *  The auth store holds frontend state only.
 *  It does NOT validate JWT signatures or enforce authorisation.
 *  Backend authorization remains mandatory for every protected resource.
 *
 * FUTURE INTEGRATION:
 *  When backend integration is implemented:
 *  1. authService.login() will call the API and receive a token response.
 *  2. authService will call authStore.setAuthenticated(user) with the mapped user object.
 *  3. The access token will be stored via src/shared/utils/storage.js (strategy TBD).
 *  4. The router guard (src/app/router.js) will read authStore.getState() to
 *     redirect unauthenticated users.
 */

import { AUTH_STATUS } from '../constants/authConstants.js';

// ─── Initial State ─────────────────────────────────────────────────────────

/**
 * @typedef {{
 *   status:      'unknown' | 'anonymous' | 'authenticated',
 *   user:        object|null,
 *   accessToken: string|null,
 *   isLoading:   boolean,
 *   error:       string|null,
 * }} AuthState
 */

/** @type {AuthState} */
const initialState = {
  status:      AUTH_STATUS.UNKNOWN,
  user:        null,
  accessToken: null,
  isLoading:   false,
  error:       null,
};

/** @type {AuthState} */
let state = { ...initialState };

/** @type {Set<(state: AuthState) => void>} */
const subscribers = new Set();

// ─── Internal Helpers ──────────────────────────────────────────────────────

function notify() {
  const snapshot = getState();
  subscribers.forEach((fn) => fn(snapshot));
}

function merge(partial) {
  state = { ...state, ...partial };
  notify();
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Returns a shallow copy of the current auth state.
 * @returns {AuthState}
 */
export function getState() {
  return { ...state };
}

/**
 * Sets the loading flag.
 * Call before initiating an auth request.
 *
 * @param {boolean} isLoading
 */
export function setLoading(isLoading) {
  merge({ isLoading, error: null });
}

/**
 * Transitions the store to the authenticated state.
 * Called by authService after a successful login or session restore.
 *
 * FUTURE: accessToken will be passed here from the backend response.
 * The token should NOT be stored in this object long-term — use storage.js.
 *
 * @param {{ user: object, accessToken?: string }} payload
 */
export function setAuthenticated({ user, accessToken = null }) {
  merge({
    status: AUTH_STATUS.AUTHENTICATED,
    user,
    accessToken,
    isLoading: false,
    error:     null,
  });
}

/**
 * Transitions the store to the anonymous state.
 * Call on logout or when no active session is found.
 */
export function setAnonymous() {
  merge({
    status:      AUTH_STATUS.ANONYMOUS,
    user:        null,
    accessToken: null,
    isLoading:   false,
    error:       null,
  });
}

/**
 * Sets a user-visible error message and clears loading state.
 *
 * @param {string} message
 */
export function setError(message) {
  merge({ isLoading: false, error: message });
}

/**
 * Clears any active error message.
 */
export function clearError() {
  merge({ error: null });
}

/**
 * Registers a subscriber that is called on every state change.
 * Returns an unsubscribe function.
 *
 * @param {(state: AuthState) => void} fn
 * @returns {() => void} unsubscribe
 */
export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

/**
 * Returns true if the current user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return state.status === AUTH_STATUS.AUTHENTICATED;
}

/**
 * Returns true if the auth status has been resolved (not 'unknown').
 * Useful for showing content only once auth state is determined.
 * @returns {boolean}
 */
export function isResolved() {
  return state.status !== AUTH_STATUS.UNKNOWN;
}
