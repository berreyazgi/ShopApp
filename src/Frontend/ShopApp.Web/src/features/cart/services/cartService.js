/**
 * cartService.js — Cart Feature Service Stub
 */

// import { apiClient }  from '../../../shared/services/apiClient.js';
// import { endpoints }  from '../../../shared/services/endpoints.js';
// import { setState }   from '../../../shared/state/store.js';
// import { eventBus }   from '../../../shared/state/eventBus.js';

export async function getCartSummary() {
  // TODO: return apiClient.get(endpoints.cart.summary());
  return { itemCount: 0, items: [], total: 0 };
}

export async function addToCart(item) {
  // TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);
  // setState({ cartCount: result.itemCount });
  // eventBus.emit('cart:updated', { count: result.itemCount });
  return null;
}

export async function removeFromCart(itemId) {
  // TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));
  return null;
}

export async function clearCart() {
  // TODO: await apiClient.post(endpoints.cart.clear());
  return null;
}
