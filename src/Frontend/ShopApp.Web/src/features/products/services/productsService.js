/**
 * productsService.js
 * Products feature service module.
 *
 * All data access for the Products feature goes through here.
 * Pages/components never import demo data directly.
 *
 * Backed by the real ShopApp.Api endpoints:
 *  - GET    /api/urun                  (UrunController, optional ?kategoriId=)
 *  - GET    /api/urun/{id}             (UrunController)
 *  - POST   /api/admin/urun            (AdminUrunController, Admin only)
 *  - PUT    /api/admin/urun/{id}       (AdminUrunController, Admin only)
 *  - DELETE /api/admin/urun/{id}       (AdminUrunController, Admin only)
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
import { getCategories as getCategoriesFromService } from '../../categories/services/categoryService.js';

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

/** Maps a backend GetByIdUrunDto (product detail) to the frontend product-detail shape. */
function mapDetailFromBackend(dto) {
  const images = (dto.gorseller ?? []).map((g) => g.gorselUrl).filter(Boolean);
  if (images.length === 0 && dto.gorselUrl) images.push(dto.gorselUrl);

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
    variants: (dto.urunTurleri ?? []).map(mapVariant),
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
 * Returns the product collection for a listing page.
 * @param {string | null} [kategoriId] Optional category filter (GET /api/urun?kategoriId=).
 * @returns {Promise<any[]>}
 */
export async function getProducts(kategoriId = null) {
  const dtos = await apiClient.get(endpoints.urun.list(kategoriId));
  return (dtos ?? []).map(mapFromBackend);
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
 * Returns products related to the currently viewed product.
 * No backend "related products" query exists yet — returns an empty list
 * rather than fixture data.
 * @returns {Promise<any[]>}
 */
export async function getRelatedProducts() {
  return [];
}

/**
 * Creates a new product via POST /api/admin/urun (Admin only).
 * @param {{ categoryId: string, name: string, description?: string, price: number, brand: string, previousPrice?: number, imageUrl?: string, isActive?: boolean }} payload
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
  return mapFromBackend({ id, ...body });
}

/**
 * Updates an existing product via PUT /api/admin/urun/{id} (Admin only).
 * @param {string} id
 * @param {{ categoryId?: string, name?: string, description?: string, price?: number, brand?: string, previousPrice?: number, imageUrl?: string, isActive?: boolean }} payload
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
  return mapFromBackend({ ...body });
}

/**
 * Deletes a product via DELETE /api/admin/urun/{id} (Admin only).
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
  await apiClient.delete(endpoints.adminUrun.delete(id));
}
