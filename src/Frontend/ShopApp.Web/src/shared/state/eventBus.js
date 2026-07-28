/**
 * eventBus.js
 * Simple typed event bus for cross-module communication.
 *
 * Modules communicate through events rather than direct imports,
 * keeping features decoupled.
 *
 * Usage:
 *   import { eventBus } from '../state/eventBus.js';
 *
 *   // Publish
 *   eventBus.emit('cart:updated', { count: 3 });
 *
 *   // Subscribe
 *   const off = eventBus.on('cart:updated', ({ count }) => { ... });
 *
 *   // Cleanup
 *   off();
 *
 * Suggested event names:
 *   'cart:updated'          — cart item count changed
 *   'user:authenticated'    — user logged in
 *   'user:signed-out'       — user logged out
 *   'notification:show'     — show a toast notification
 *   'search:query'          — search term submitted
 */

/** @type {Map<string, Set<Function>>} */
const listeners = new Map();

export const eventBus = {
  /**
   * Registers an event listener.
   * Returns an unsubscribe function.
   *
   * @template T
   * @param {string} event
   * @param {(data: T) => void} handler
   * @returns {() => void}
   */
  on(event, handler) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event).add(handler);
    return () => this.off(event, handler);
  },

  /**
   * Removes a specific event listener.
   *
   * @param {string} event
   * @param {Function} handler
   */
  off(event, handler) {
    listeners.get(event)?.delete(handler);
  },

  /**
   * Emits an event, calling all registered handlers with the given data.
   *
   * @template T
   * @param {string} event
   * @param {T} [data]
   */
  emit(event, data) {
    listeners.get(event)?.forEach((handler) => {
      try {
        handler(data);
      } catch (err) {
        console.error(`[EventBus] Error in handler for "${event}":`, err);
      }
    });
  },

  /** Removes all listeners for the given event (or all events). */
  clear(event) {
    if (event) {
      listeners.delete(event);
    } else {
      listeners.clear();
    }
  },
};
