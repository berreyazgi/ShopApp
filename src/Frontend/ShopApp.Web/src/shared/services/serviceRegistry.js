/**
 * serviceRegistry.js
 * Service registry — maps feature names to their service modules.
 *
 * This registry allows features to discover services without coupling
 * directly to each other's internal modules.
 *
 * Initially all services point to the same Monolith API.
 * When Microservices are extracted, override the base URL per service
 * in appConfig.api.services without touching this registry.
 */

import { appConfig } from '../../app/appConfig.js';

/**
 * Resolves the effective base URL for a given service.
 * Falls back to the gateway base URL if no dedicated service URL is set.
 *
 * @param {keyof typeof appConfig.api.services} serviceName
 * @returns {string}
 */
export function resolveServiceUrl(serviceName) {
  const serviceUrl = appConfig.api.services[serviceName];
  return serviceUrl || appConfig.api.gatewayBaseUrl || '';
}

/**
 * Registry of all available backend services.
 * Extend this as new services are added.
 */
export const serviceRegistry = {
  identity:     { baseUrl: () => resolveServiceUrl('identity') },
  catalog:      { baseUrl: () => resolveServiceUrl('catalog') },
  cart:         { baseUrl: () => resolveServiceUrl('cart') },
  ordering:     { baseUrl: () => resolveServiceUrl('ordering') },
  payment:      { baseUrl: () => resolveServiceUrl('payment') },
  notification: { baseUrl: () => resolveServiceUrl('notification') },
};
