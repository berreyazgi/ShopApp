/**
 * store.js
 * Minimal reactive global state store.
 *
 * Usage:
 *   import { getState, setState, subscribe } from '../state/store.js';
 *
 *   // Read
 *   const { cartCount } = getState();
 *
 *   // Write
 *   setState({ cartCount: 3 });
 *
 *   // Subscribe
 *   const unsubscribe = subscribe((state) => {
 *     console.log('State changed:', state);
 *   });
 *
 *   // Cleanup
 *   unsubscribe();
 */

/** @type {Set<Function>} */
const subscribers = new Set();

/**
 * Initial application state.
 * Add new state slices here as features grow.
 */
const initialState = {
  user:            null,
  isAuthenticated: false,
  cartCount:       0,
  favoriteCount:   0,
  isLoading:       false,
  notification:    null,
};

let state = { ...initialState };

// ─── Public API ────────────────────────────────────────────────────────────

/** Returns a shallow copy of the current state. */
export function getState() {
  return { ...state };
}

/**
 * Merges the given partial state and notifies all subscribers.
 *
 * @param {Partial<typeof initialState>} partialState
 */
export function setState(partialState) {
  state = { ...state, ...partialState };
  notify();
}

/**
 * Registers a subscriber function that is called on every state change.
 * Returns an unsubscribe function.
 *
 * @param {(state: typeof initialState) => void} fn
 * @returns {() => void} unsubscribe
 */
export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

/** Resets the store to its initial state. */
export function resetStore() {
  state = { ...initialState };
  notify();
}

/** @internal Notifies all subscribers with the current state. */
function notify() {
  const snapshot = getState();
  subscribers.forEach((fn) => fn(snapshot));
}

/** Initialises the store. Call once on app startup. */
export function initStore() {
  // Future: hydrate from localStorage or server-side session here.
}
