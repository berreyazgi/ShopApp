/** Central application configuration. */
export const appConfig = {
  name: 'ShopApp',
  version: '1.0.0',
  locale: 'tr-TR',
  currency: 'TRY',

  // Production hosting can inject window.__SHOPAPP_CONFIG__.apiBaseUrl without
  // changing source code. Development defaults to the monolith API.
  api: {
    gatewayBaseUrl: globalThis.__SHOPAPP_CONFIG__?.apiBaseUrl ?? 'http://localhost:5048',
    services: {
      identity: '', catalog: '', cart: '', ordering: '', payment: '', notification: '',
    },
  },

  features: {
    darkMode: false, searchSuggestions: false, wishlist: true,
    notifications: true, liveChat: false,
  },

  router: { mode: 'history' },
};
