/**
 * cartDemoData.js — Temporary preview data for CartPage.
 *
 * TEMPORARY: this is presentation fixture data only, for previewing the cart
 * UI before the real cart is wired up. It is intentionally NOT routed through
 * cartService.js — that service already talks to the real /api/sepet backend
 * and must not be given a fake data source.
 *
 * Replace usage of `getDemoCartItems()` in CartPage.js with real cart items
 * (e.g. mapped from cartService.getCartItems()) when integrating the backend.
 * Safe to delete this file entirely once that integration exists.
 */

const DEMO_CART_ITEMS = [
  {
    id: 'item-1',
    name: 'Nike Air Zoom Alphafly',
    variant: 'Beden: 42',
    unitPrice: 1800,
    quantity: 1,
    image: '/src/assets/images/products/nike-shoes.png',
  },
  {
    id: 'item-2',
    name: 'Sarı Eşofman Takımı',
    variant: 'Beden: M',
    unitPrice: 1200,
    quantity: 1,
    image: '/src/assets/images/products/yellow-tracksuit.png',
  },
];

/** @returns {Array<{ id: string, name: string, variant: string, unitPrice: number, quantity: number, image: string }>} */
export function getDemoCartItems() {
  return DEMO_CART_ITEMS.map((item) => ({ ...item }));
}
