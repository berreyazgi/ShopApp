/**
 * productsService.js
 * Products feature service module.
 *
 * All data access for the Products feature goes through here.
 * Pages/components never import demo data directly.
 *
 * Backed by the real ShopApp.Api endpoints:
 *  - GET    /api/urun                  (UrunController, optional ?kategoriId=) — active products only
 *  - GET    /api/urun/{id}             (UrunController) — 404s for a passive product
 *  - GET    /api/admin/urun            (AdminUrunController, Admin only) — active + passive
 *  - GET    /api/admin/urun/{id}       (AdminUrunController, Admin only) — active + passive
 *  - POST   /api/admin/urun            (AdminUrunController, Admin only)
 *  - PUT    /api/admin/urun/{id}       (AdminUrunController, Admin only)
 *  - DELETE /api/admin/urun/{id}       (AdminUrunController, Admin only)
 *  - POST   /api/admin/urun/{urunId}/tur          (AdminUrunController, Admin only)
 *  - PUT    /api/admin/urun/{urunId}/tur/{id}     (AdminUrunController, Admin only)
 *
 * Frontend <-> Backend field mapping (list — ResultUrunDto):
 *
 *   Frontend      Backend (ResultUrunDto)
 *   ------------------------------------------
 *   id            Id
 *   categoryId    KategoriId
 *   name          UrunAd
 *   description   Detay
 *   price         Fiyat
 *   brand         MarkaAd
 *   previousPrice GecmisFiyat
 *   imageUrl      GorselUrl
 *   isActive      AktifMi
 *
 * Detail (GetByIdUrunDto) additionally carries:
 *   gorseller:    [{ id, gorselUrl }]
 *   urunTurleri:  [{ id, urunId, ad, stokAded, stokKod, fiyatFarki, aktifMi,
 *                    ozellikler: [{ id, urunTurId, ozellikAd, ozellikDeger }] }]
 *
 * NOTE: getRelatedProducts() has no backend equivalent yet (no CQRS query
 * for "related products" exists) — it returns an empty list rather than
 * fixture data, per the no-dummy-data rule; ProductDetailPage hides that
 * section when empty.
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';
import { getCategories as getCategoriesFromService, getCategoryById as getCategoryByIdFromService } from '../../categories/services/categoryService.js';

/** Maps a backend ResultUrunDto to the frontend product shape. */
function mapFromBackend(dto) {
  return {
    id: dto.id,
    urunId: dto.id,
    categoryId: dto.kategoriId,
    kategoriId: dto.kategoriId,
    name: dto.urunAd,
    ad: dto.urunAd,
    description: dto.detay ?? '',
    aciklama: dto.detay ?? '',
    price: dto.fiyat,
    fiyat: dto.fiyat,
    previousPrice: dto.gecmisFiyat,
    gecmisFiyat: dto.gecmisFiyat,
    brand: dto.markaAd,
    marka: dto.markaAd,
    imageUrl: dto.gorselUrl ?? null,
    gorselUrl: dto.gorselUrl ?? null,
    isActive: dto.aktifMi ?? true,
    aktiflik: dto.aktifMi ?? true,
  };
}

/** Maps a backend UrunOzellik-shaped object to the frontend property shape. */
function mapOzellik(o) {
  return {
    id: o.id,
    urunTurId: o.urunTurId,
    name: o.ozellikAd,
    value: o.ozellikDeger,
  };
}

/** Maps a backend GetByIdUrunTurDto (variant) to the frontend variant shape. */
function mapVariant(dto) {
  return {
    id: dto.id,
    productId: dto.urunId,
    name: dto.ad,
    stock: dto.stokAded,
    stockCode: dto.stokKod,
    priceDelta: dto.fiyatFarki,
    isActive: dto.aktifMi,
    properties: (dto.ozellikler ?? []).map(mapOzellik),
  };
}

/**
 * Maps a backend GetByIdUrunDto (product detail) to the frontend product-detail shape.
 *
 * SKU / stock live on UrunTur (a product can have several variants), not on Urun
 * itself. The current admin form is a single-variant UX with no concept of
 * choosing between variants, so it edits the *first* variant returned by the
 * backend — that variant's real, persisted id/stockCode/stock are surfaced here
 * as `urunTurId`/`sku`/`stock` so the edit form loads and preserves them instead
 * of showing blank/fake values. `variants` (the full list) is also kept on the
 * object so a future multi-variant UI can iterate over it without changing this
 * mapping.
 */
function mapDetailFromBackend(dto) {
  const images = (dto.gorseller ?? []).map((g) => g.gorselUrl).filter(Boolean);
  if (images.length === 0 && dto.gorselUrl) images.push(dto.gorselUrl);

  const variants = (dto.urunTurleri ?? []).map(mapVariant);
  const primaryVariant = variants[0] ?? null;

  return {
    id: dto.id,
    categoryId: dto.kategoriId,
    categoryName: dto.kategoriAd,
    name: dto.urunAd,
    description: dto.detay ?? '',
    price: dto.fiyat,
    previousPrice: dto.gecmisFiyat,
    brand: dto.markaAd,
    imageUrl: dto.gorselUrl ?? null,
    images,
    isActive: dto.aktifMi ?? true,
    variants,
    // Primary-variant convenience fields consumed by AdminProductFormModal.
    urunTurId: primaryVariant?.id ?? null,
    sku: primaryVariant?.stockCode ?? '',
    stock: primaryVariant?.stock ?? 0,
    variantAd: primaryVariant?.name ?? null,
    variantFiyatFarki: primaryVariant?.priceDelta ?? 0,
    variantIsActive: primaryVariant?.isActive ?? true,
  };
}

/**
 * Returns the category catalogue for the category index page.
 * Uses the dynamic categoryService single source of truth.
 * @returns {Promise<any[]>}
 */
export async function getCategories() {
  return getCategoriesFromService();
}

/**
 * Returns a single category by its real Kategori.Id (cache-first).
 * Used to show the real category name/breadcrumb for a filtered product
 * listing — never a name derived from the id itself.
 * @param {string} kategoriId
 * @returns {Promise<import('../../categories/services/categoryService.js').CategoryItem | null>}
 */
export async function getCategoryById(kategoriId) {
  return getCategoryByIdFromService(kategoriId);
}

/**
 * Returns the product collection for a listing page.
 * @param {string | null} [kategoriId] Optional category filter (GET /api/urun?kategoriId=).
 * @returns {Promise<any[]>}
 */
export async function getProducts(kategoriId = null) {
  const dtos = await apiClient.get(endpoints.urun.list(kategoriId));
  return (dtos ?? []).map(mapFromBackend);
}

/**
 * Returns the given category id plus every descendant category id, using
 * the already-fetched Kategori.UstKategoriId hierarchy.
 * @param {string} kategoriId
 * @returns {Promise<string[]>}
 */
async function resolveCategoryIdsWithDescendants(kategoriId) {
  const categories = await getCategoriesFromService();
  const ids = [String(kategoriId)];
  let frontier = ids;

  while (frontier.length > 0) {
    const childIds = categories
      .filter((c) => c.parentId != null && frontier.includes(String(c.parentId)))
      .map((c) => String(c.id));
    ids.push(...childIds);
    frontier = childIds;
  }

  return ids;
}

/**
 * Returns products for a category — including its descendant categories'
 * products when it has any. Products are normally assigned to a specific
 * (often child) category, so without this a parent category page would look
 * incorrectly empty even though it has real products underneath it.
 * @param {string} kategoriId
 * @returns {Promise<any[]>}
 */
export async function getProductsByCategory(kategoriId) {
  const categoryIds = await resolveCategoryIdsWithDescendants(kategoriId);
  if (categoryIds.length === 1) return getProducts(kategoriId);

  const perCategory = await Promise.all(categoryIds.map((id) => getProducts(id)));
  const merged = new Map();
  perCategory.flat().forEach((product) => merged.set(product.id, product));
  return Array.from(merged.values());
}

/**
 * Returns the full detail record for a single product, including its
 * UrunTur variants and each variant's UrunOzellik properties.
 * Maps to: GET /api/urun/{id}
 *
 * @param {string} productId
 * @returns {Promise<any | null>}
 */
export async function getProductById(productId) {
  try {
    const dto = await apiClient.get(endpoints.urun.byId(productId));
    return dto ? mapDetailFromBackend(dto) : null;
  } catch (err) {
    if (err?.status === 404) return null;
    throw err;
  }
}

/**
 * Returns the admin product collection (Admin only) — active AND passive
 * products, via GET /api/admin/urun. Used by AdminProductsPage so a product
 * made passive stays visible/manageable in the admin catalogue instead of
 * disappearing along with the public listing.
 * @param {string | null} [kategoriId]
 * @returns {Promise<any[]>}
 */
export async function getAdminProducts(kategoriId = null) {
  const dtos = await apiClient.get(endpoints.adminUrun.list(kategoriId));
  return (dtos ?? []).map(mapFromBackend);
}

/**
 * Returns the full detail record for a single product (Admin only), including
 * active AND passive products — unlike getProductById() this never 404s for a
 * passive product, so an admin can open one to reactivate it.
 * Maps to: GET /api/admin/urun/{id}
 * @param {string} productId
 * @returns {Promise<any | null>}
 */
export async function getAdminProductById(productId) {
  try {
    const dto = await apiClient.get(endpoints.adminUrun.byId(productId));
    return dto ? mapDetailFromBackend(dto) : null;
  } catch (err) {
    if (err?.status === 404) return null;
    throw err;
  }
}

/**
 * Returns products related to the currently viewed product.
 * No backend "related products" query exists yet — returns an empty list
 * rather than fixture data.
 * @returns {Promise<any[]>}
 */
export async function getRelatedProducts() {
  return [];
}

/**
 * Creates or updates the UrunTur (variant) that holds a product's SKU/stock,
 * called right after the root Urun is saved. The admin form is single-variant,
 * so:
 *  - `payload.urunTurId` present  -> UpdateUrunTurCommand on that exact variant
 *    (preserves its Ad/FiyatFarki/AktifMi, which the form doesn't expose).
 *  - `payload.urunTurId` absent   -> CreateUrunTurCommand — only reached when
 *    the product genuinely has no variant yet (a brand-new product, or a
 *    legacy product saved before SKU/stock existed on it).
 * Never creates a second variant for a product that already has one.
 * @param {string} urunId
 * @param {any} payload
 * @returns {Promise<{ id: string, stokKod: string, stokAded: number } | null>}
 */
async function persistVariant(urunId, payload) {
  const stockValue = payload.stock ?? payload.stok;
  if (stockValue === undefined || stockValue === null) return null;

  const variantBody = {
    urunId,
    ad: payload.variantAd || 'Standart',
    stokAded: Number(stockValue),
    stokKod: String(payload.sku ?? '').trim(),
    fiyatFarki: Number(payload.variantFiyatFarki ?? 0),
    aktifMi: payload.variantIsActive !== undefined ? !!payload.variantIsActive : true,
  };

  if (payload.urunTurId) {
    await apiClient.put(endpoints.adminUrun.updateTur(urunId, payload.urunTurId), { ...variantBody, id: payload.urunTurId });
    return { id: payload.urunTurId, stokKod: variantBody.stokKod, stokAded: variantBody.stokAded };
  }

  const { id } = await apiClient.post(endpoints.adminUrun.createTur(urunId), variantBody);
  return { id, stokKod: variantBody.stokKod, stokAded: variantBody.stokAded };
}

/**
 * Creates a new product via POST /api/admin/urun (Admin only), then persists
 * its SKU/stock as a UrunTur via persistVariant().
 * @param {{ categoryId: string, name: string, description?: string, price: number, brand: string, previousPrice?: number, imageUrl?: string, isActive?: boolean, sku?: string, stock?: number }} payload
 * @returns {Promise<any>}
 */
export async function createProduct(payload) {
  const body = {
    kategoriId: payload.categoryId ?? payload.kategoriId,
    urunAd: payload.name ?? payload.ad,
    detay: payload.description ?? payload.aciklama ?? null,
    fiyat: Number(payload.price ?? payload.fiyat ?? 0),
    markaAd: payload.brand ?? payload.marka,
    gecmisFiyat: Number(payload.previousPrice ?? payload.gecmisFiyat ?? 0),
    gorselUrl: payload.imageUrl ?? payload.gorselUrl ?? null,
    aktifMi: payload.isActive !== undefined ? payload.isActive : (payload.aktiflik ?? true),
  };

  const { id } = await apiClient.post(endpoints.adminUrun.create(), body);
  const variant = await persistVariant(id, payload);
  const mapped = mapFromBackend({ id, ...body });
  return variant ? { ...mapped, urunTurId: variant.id, sku: variant.stokKod, stock: variant.stokAded } : mapped;
}

/**
 * Updates an existing product via PUT /api/admin/urun/{id} (Admin only), then
 * persists its SKU/stock as a UrunTur via persistVariant() — updating the
 * existing variant identified by payload.urunTurId rather than creating a new
 * one, so unrelated variant data (Ad/FiyatFarki/AktifMi) survives untouched.
 * @param {string} id
 * @param {{ categoryId?: string, name?: string, description?: string, price?: number, brand?: string, previousPrice?: number, imageUrl?: string, isActive?: boolean, sku?: string, stock?: number, urunTurId?: string }} payload
 * @returns {Promise<any>}
 */
export async function updateProduct(id, payload) {
  const body = {
    id,
    kategoriId: payload.categoryId ?? payload.kategoriId,
    urunAd: payload.name ?? payload.ad,
    detay: payload.description ?? payload.aciklama ?? null,
    fiyat: Number(payload.price ?? payload.fiyat ?? 0),
    markaAd: payload.brand ?? payload.marka ?? 'Genel',
    gecmisFiyat: Number(payload.previousPrice ?? payload.gecmisFiyat ?? 0),
    gorselUrl: payload.imageUrl ?? payload.gorselUrl ?? null,
    aktifMi: payload.isActive !== undefined ? payload.isActive : (payload.aktiflik ?? true),
  };

  await apiClient.put(endpoints.adminUrun.update(id), body);
  const variant = await persistVariant(id, payload);
  const mapped = mapFromBackend({ ...body });
  return variant ? { ...mapped, urunTurId: variant.id, sku: variant.stokKod, stock: variant.stokAded } : mapped;
}

/**
 * Deletes a product via DELETE /api/admin/urun/{id} (Admin only).
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
  await apiClient.delete(endpoints.adminUrun.delete(id));
}
