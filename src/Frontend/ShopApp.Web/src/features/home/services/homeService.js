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

import { getCategories } from '../../categories/services/categoryService.js';

/**
 * Returns the real, database-backed category collection for the homepage
 * grid — the same categories/category shape used by the Products/Category
 * pages (GET /api/kategori via categoryService). No static/demo fallback.
 *
 * @returns {Promise<import('../../categories/services/categoryService.js').CategoryItem[]>}
 */
export async function getHomeCategories() {
  return getCategories();
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
