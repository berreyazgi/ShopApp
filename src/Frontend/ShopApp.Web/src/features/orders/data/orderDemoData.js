/**
 * orderDemoData.js
 * Static demonstration data for the Siparişlerim (Orders) page.
 *
 * NOTE: This data is temporary presentation data for UI development.
 * Replace with actual API service calls (e.g. orderService.getOrders())
 * when backend integration is implemented.
 */

export const INITIAL_ORDERS = [
  {
    id: 'ord-1',
    orderNumber: '#SA-456789',
    date: '2 Eylül 2026',
    status: 'Kargoda',
    statusCode: 'shipping',
    totalPrice: 3000,
    itemCount: 2,
    cargoTrackingNo: 'TR-987654321',
    items: [
      {
        id: 'item-1',
        name: 'Nike Air Zoom Alphafly',
        variant: 'Beden: 42',
        quantity: 1,
        unitPrice: 1800,
        image: 'src/assets/images/products/nike-shoes.png',
      },
      {
        id: 'item-2',
        name: 'Sarı Eşofman Takımı',
        variant: 'Beden: M',
        quantity: 1,
        unitPrice: 1200,
        image: 'src/assets/images/products/yellow-tracksuit.png',
      },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: '#SA-10042',
    date: '18 Ağustos 2026',
    status: 'Teslim Edildi',
    statusCode: 'delivered',
    totalPrice: 4299.90,
    itemCount: 3,
    cargoTrackingNo: 'TR-123456789',
    items: [
      {
        id: 'item-3',
        name: 'Adidas Ultraboost Light',
        variant: 'Beden: 41',
        quantity: 1,
        unitPrice: 2499.90,
        image: 'src/assets/images/products/nike-shoes.png',
      },
      {
        id: 'item-4',
        name: 'Puma Spor Çantası',
        variant: 'Renk: Siyah',
        quantity: 2,
        unitPrice: 900,
        image: 'src/assets/images/products/yellow-tracksuit.png',
      },
    ],
  },
];
