import { AUTH_STATUS } from '../constants/authConstants.js';

const initialState = {
  status: AUTH_STATUS.UNKNOWN,
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

let state = { ...initialState };
const subscribers = new Set();

function notify() {
  const snapshot = getState();
  subscribers.forEach((fn) => fn(snapshot));
}

function merge(partial) {
  state = { ...state, ...partial };
  notify();
}

export function getState() { return { ...state }; }
export function setLoading(isLoading) { merge({ isLoading, error: null }); }

export function setAuthenticated({ user, accessToken = null }) {
  merge({ status: AUTH_STATUS.AUTHENTICATED, user, accessToken, isLoading: false, error: null });
}

export function setAnonymous() {
  merge({ status: AUTH_STATUS.ANONYMOUS, user: null, accessToken: null, isLoading: false, error: null });
}

export function setError(message) { merge({ isLoading: false, error: message }); }
export function clearError() { merge({ error: null }); }
export function subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn); }
export function isAuthenticated() { return state.status === AUTH_STATUS.AUTHENTICATED; }
export function isResolved() { return state.status !== AUTH_STATUS.UNKNOWN; }
export function hasRole(role) { return state.user?.roles?.includes(role) ?? false; }
