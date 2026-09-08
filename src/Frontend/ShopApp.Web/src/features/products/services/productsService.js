/**
 * productsService.js
 * Products feature service module.
 *
 * All data access for the Products feature goes through here.
 * Pages/components never import demo data directly.
 *
 * Monolith phase:   uncomment the apiClient lines and set the gateway URL.
 * Microservice phase: update the endpoint base URL in appConfig.api.services.catalog.
 */

// import { apiClient } from '../../../shared/services/apiClient.js';
// import { endpoints } from '../../../shared/services/endpoints.js';

import { demoProducts, relatedProducts, getProductDetail } from '../data/productData.js';
import { getCategories as getCategoriesFromService } from '../../categories/services/categoryService.js';

/**
 * Returns the category catalogue for the category index page.
 * Uses the dynamic categoryService single source of truth.
 * @returns {Promise<any[]>}
 */
export async function getCategories() {
  // TODO: Integrate with Catalog API or Catalog Microservice.
  // return apiClient.get(endpoints.catalog.categories());

  return getCategoriesFromService();
}

/**
 * Returns the product collection for a listing page.
 * @returns {Promise<import('../data/productData.js').ProductSummary[]>}
 */
export async function getProducts() {
  // TODO: Integrate with Catalog API or Catalog Microservice.
  // return apiClient.get(endpoints.catalog.products());

  return demoProducts;
}

/**
 * Returns the full detail record for a single product.
 * @param {string} productId
 * @returns {Promise<import('../data/productData.js').ProductDetail | null>}
 */
export async function getProductById(productId) {
  // TODO: Integrate with Catalog API or Catalog Microservice.
  // return apiClient.get(endpoints.catalog.productById(productId));

  return getProductDetail(productId);
}

/**
 * Returns products related to the currently viewed product.
 * @returns {Promise<import('../data/productData.js').RelatedProduct[]>}
 */
export async function getRelatedProducts() {
  // TODO: Integrate with Catalog API once related-product logic exists server-side.
  return relatedProducts;
}
