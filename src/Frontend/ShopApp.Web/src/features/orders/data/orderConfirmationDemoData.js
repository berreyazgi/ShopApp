/**
 * orderConfirmationDemoData.js — Temporary preview data for the
 * OrderConfirmationPage display (order number, item list, delivery/payment
 * summary shown above the "Siparişi Tamamla" action).
 *
 * TEMPORARY: this is presentation fixture data only. The actual order
 * creation on this page (createOrder / addOrderItem in orderService.js) is
 * real and already talks to the backend — this file only feeds the summary
 * shown before that action runs. Replace `DEMO_ORDER` usage in
 * OrderConfirmationPage.js with the real cart/order summary once available,
 * then delete this file.
 */

export const DEMO_ORDER = {
  orderNumber: '#SA-456789',
  items: [
    {
      id: 'item-1',
      name: 'Nike Air Zoom Alphafly',
      size: 'Beden: 42',
      quantity: 1,
      price: 1800,
      image: '/src/assets/images/products/nike-shoes.png',
    },
    {
      id: 'item-2',
      name: 'Sarı Eşofman Takımı',
      size: 'Beden: M',
      quantity: 1,
      price: 1200,
      image: '/src/assets/images/products/yellow-tracksuit.png',
    },
  ],
  delivery: {
    address: 'Atatürk Mah. Cumhuriyet Cad.\nNo: 42, Daire: 5\n34000 İstanbul, Türkiye',
    payment: 'Visa **** 1234 (Garanti BBVA)',
    shipping: 'Ücretsiz',
  },
  subtotal: 3000,
  shippingCost: 0,
  total: 3000,
};
