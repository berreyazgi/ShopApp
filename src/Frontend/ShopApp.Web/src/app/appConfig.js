/**
 * appConfig.js
 * Central application configuration.
 *
 * The service URLs are intentionally left empty.
 * Initially all requests go through a single Monolith API gateway.
 * When individual Microservices are extracted, only this file needs updating —
 * no component or page code changes are required.
 */

export const appConfig = {
  name: 'ShopApp',
  version: '1.0.0',
  locale: 'tr-TR',
  currency: 'TRY',

  /**
   * API Gateway and Microservice base URLs.
   * Leave empty until backend integration begins.
   *
   * Monolith phase:  set gatewayBaseUrl to the monolith API base URL.
   * Microservice phase: fill individual service URLs or keep using gateway.
   */
  api: {
    gatewayBaseUrl: '',
    services: {
      identity:     '',
      catalog:      '',
      cart:         '',
      ordering:     '',
      payment:      '',
      notification: '',
    },
  },

  /**
   * Feature flags — toggle experimental or upcoming features.
   */
  features: {
    darkMode:           false,
    searchSuggestions:  false,
    wishlist:           true,
    notifications:      true,
    liveChat:           false,
  },

  /**
   * Routing configuration.
   */
  router: {
    mode: 'history', // 'history' | 'hash'
  },
};
