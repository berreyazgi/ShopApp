/**
 * homeService.js
 * Home feature service module.
 *
 * All data fetching for the Home feature goes through here.
 * Components and pages never call apiClient directly.
 *
 * Monolith phase:   uncomment the apiClient lines and set the gateway URL.
 * Microservice phase: update the endpoint base URL in appConfig.api.services.catalog.
 */

// import { apiClient } from '../../../shared/services/apiClient.js';
// import { endpoints } from '../../../shared/services/endpoints.js';

import { heroCategories, secondaryCategories } from '../data/homeCategories.js';

/**
 * Returns featured hero categories for the homepage grid.
 *
 * @returns {Promise<import('../data/homeCategories.js').CategoryCardData[]>}
 */
export async function getHeroCategories() {
  // TODO: Integrate with Catalog API or Catalog Microservice.
  // return apiClient.get(endpoints.catalog.categories());

  return heroCategories;
}

/**
 * Returns secondary category cards for the homepage.
 *
 * @returns {Promise<import('../data/homeCategories.js').CategoryCardData[]>}
 */
export async function getSecondaryCategories() {
  // TODO: Integrate with Catalog API or Catalog Microservice.
  // return apiClient.get(endpoints.catalog.categories() + '?featured=secondary');

  return secondaryCategories;
}

/**
 * Returns featured product highlights (for a future "Öne Çıkanlar" section).
 *
 * @returns {Promise<any[]>}
 */
export async function getFeaturedProducts() {
  // TODO: Integrate with Catalog API.
  // return apiClient.get(endpoints.catalog.featured());

  return [];
}

/**
 * Returns promotional banner data.
 *
 * @returns {Promise<any[]>}
 */
export async function getPromoBanners() {
  // TODO: Integrate with Catalog/CMS API.
  return [];
}
