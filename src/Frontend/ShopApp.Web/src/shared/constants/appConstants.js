/**
 * appConstants.js
 * Application-wide constants.
 */

export const APP_NAME    = 'ShopApp';
export const APP_VERSION = '1.0.0';
export const APP_LOCALE  = 'tr-TR';
export const APP_CURRENCY = 'TRY';

export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  xxl: 1440,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN:    'shopapp_token',
  CART_ID:       'shopapp_cart_id',
  USER_PREFS:    'shopapp_prefs',
  RECENT_SEARCH: 'shopapp_recent_search',
};

export const EVENTS = {
  CART_UPDATED:       'cart:updated',
  USER_AUTHENTICATED: 'user:authenticated',
  USER_SIGNED_OUT:    'user:signed-out',
  NOTIFICATION_SHOW:  'notification:show',
  SEARCH_QUERY:       'search:query',
};
