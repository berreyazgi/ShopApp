/**
 * categoryService.js — Category Single Source of Truth
 *
 * Frontend service managing the category collection across all consumers:
 *  - AdminCategoriesPage (/admin/kategoriler)
 *  - AdminProductsPage (/admin/urunler)
 *  - CategoryListPage (/kategoriler)
 *  - Header.js Category Mega Menu & Mobile Accordion
 *
 * Backed by the real ShopApp.Api endpoints:
 *  - GET    /api/kategori          (KategoriController)
 *  - GET    /api/kategori/{id}     (KategoriController)
 *  - POST   /api/admin/kategori    (AdminKategoriController, Admin only)
 *  - DELETE /api/admin/kategori/{id} (AdminKategoriController, Admin only)
 *
 * ZERO demo categories, ZERO hardcoded arrays, ZERO automatic seeds.
 * Starts strictly empty ([]) until the first successful fetch from the API.
 *
 * Frontend <-> Backend field mapping (kept local to this module so other
 * components never have to deal with more than one property-name variant):
 *
 *   Frontend    Backend
 *   -----------------------------
 *   id          Id
 *   name        KategoriAd
 *   parentId    UstKategoriId
 *   description Detay
 *   imageUrl    GorselUrl
 *   isActive    AktifMi
 */

import { apiClient } from '../../../shared/services/apiClient.js';
import { endpoints } from '../../../shared/services/endpoints.js';

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   slug?: string,
 *   description?: string,
 *   parentId?: string | null,
 *   parentName?: string | null,
 *   imageUrl?: string | null,
 *   isActive?: boolean,
 *   productCount?: number | null,
 *   children?: Array<any>,
 * }} CategoryItem
 */

/** @type {CategoryItem[]} */
let categories = [];

/** @type {Set<(categories: CategoryItem[]) => void>} */
const subscribers = new Set();

function notify() {
  const snapshot = getCategoriesSync();
  subscribers.forEach((fn) => {
    try {
      fn(snapshot);
    } catch (err) {
      console.error('[categoryService] subscriber notification error:', err);
    }
  });
}

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Maps a backend ResultKategoriDto / GetByIdKategoriDto to the frontend CategoryItem shape. */
function mapFromBackend(dto) {
  const name = dto.kategoriAd ?? dto.name ?? '';
  const parentId = dto.ustKategoriId ?? null;
  return {
    id: dto.id,
    kategoriId: dto.id,
    name,
    ad: name,
    slug: slugify(name),
    // Category filtering is a query param on the product list route, keyed
    // by the real Kategori.Id — never a name/slug. /urunler/:productId is a
    // *product detail* route on the same router, so a slug/name here would
    // be misread as a product id (e.g. /urunler/kadin -> productId="kadin").
    href: `/urunler?kategoriId=${encodeURIComponent(dto.id)}`,
    description: dto.detay ?? '',
    aciklama: dto.detay ?? '',
    parentId,
    ustKategoriId: parentId,
    parentName: null,
    ustKategoriAdi: null,
    imageUrl: dto.gorselUrl ?? null,
    gorselUrl: dto.gorselUrl ?? null,
    isActive: dto.aktifMi ?? true,
    aktiflik: dto.aktifMi ?? true,
    productCount: null,
    urunSayisi: null,
    children: [],
  };
}

/** Maps a frontend save payload (CategoryFormPanel output) to the backend CreateKategoriCommand shape. */
function mapToBackend(item, imageUrl) {
  const name = item.name || item.ad || '';
  const parentId = item.parentId || item.ustKategoriId || null;
  return {
    kategoriAd: name,
    ustKategoriId: parentId || null,
    detay: item.description ?? item.aciklama ?? null,
    gorselUrl: imageUrl ?? item.imageUrl ?? item.gorselUrl ?? null,
    aktifMi: item.isActive !== undefined ? item.isActive : (item.aktiflik ?? true),
  };
}

/** Converts a browser File to a data URL (used since no dedicated image-upload endpoint exists yet). */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function attachParentNames(list) {
  const byId = new Map(list.map((c) => [String(c.id), c]));
  return list.map((c) => {
    const parent = c.parentId ? byId.get(String(c.parentId)) : null;
    return {
      ...c,
      parentName: parent ? parent.name : null,
      ustKategoriAdi: parent ? parent.name : null,
    };
  });
}

/**
 * Synchronous read of the last-fetched category collection.
 * @returns {CategoryItem[]}
 */
export function getCategoriesSync() {
  return categories.map((c) => ({ ...c }));
}

/**
 * Fetches the category collection from GET /api/kategori.
 * @returns {Promise<CategoryItem[]>}
 */
export async function getCategories() {
  const dtos = await apiClient.get(endpoints.kategori.list());
  categories = attachParentNames((dtos ?? []).map(mapFromBackend));
  notify();
  return getCategoriesSync();
}

/**
 * Retrieves a single category by ID (cache first, falls back to GET /api/kategori/{id}).
 * @param {string} id
 * @returns {Promise<CategoryItem | null>}
 */
export async function getCategoryById(id) {
  const cached = categories.find((c) => String(c.id) === String(id));
  if (cached) return { ...cached };

  try {
    const dto = await apiClient.get(endpoints.kategori.byId(id));
    return dto ? mapFromBackend(dto) : null;
  } catch {
    return null;
  }
}

/**
 * Creates a new category via POST /api/admin/kategori (Admin only), then
 * refreshes the local collection from the persisted backend state.
 * @param {Omit<CategoryItem, 'id'> & { id?: string, imageFile?: File | null }} item
 * @returns {Promise<CategoryItem>}
 */
export async function addCategory(item) {
  const imageUrl = item.imageFile ? await fileToDataUrl(item.imageFile) : (item.imageUrl || item.gorselUrl || null);
  const body = mapToBackend(item, imageUrl);

  const createUrl = endpoints.categories?.create ? endpoints.categories.create() : endpoints.adminKategori.create();
  const { id } = await apiClient.post(createUrl, body);
  await getCategories();

  const created = categories.find((c) => String(c.id) === String(id));
  return created ? { ...created } : mapFromBackend({ id, kategoriAd: body.kategoriAd, ustKategoriId: body.ustKategoriId, detay: body.detay, gorselUrl: body.gorselUrl, aktifMi: body.aktifMi });
}

/**
 * Updates an existing category via PUT /api/admin/kategori/{id} (Admin only),
 * then refreshes the local collection from the persisted backend state.
 * @param {CategoryItem & { imageFile?: File | null }} item
 * @returns {Promise<CategoryItem>}
 */
export async function updateCategory(item) {
  const targetId = String(item.id ?? item.kategoriId);
  const imageUrl = item.imageFile ? await fileToDataUrl(item.imageFile) : (item.imageUrl || item.gorselUrl || null);
  const body = {
    id: targetId,
    ...mapToBackend(item, imageUrl),
  };

  await apiClient.put(endpoints.adminKategori.update(targetId), body);
  await getCategories();

  const updated = categories.find((c) => String(c.id ?? c.kategoriId) === targetId);
  return updated ? { ...updated } : mapFromBackend(body);
}

/**
 * Deletes a category via DELETE /api/admin/kategori/{id} (Admin only).
 * The backend rejects deletion (409 Conflict) when the category still has
 * child categories or products referencing it.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteCategory(id) {
  await apiClient.delete(endpoints.adminKategori.delete(id));
  await getCategories();
}

/**
 * Subscribes a listener function to category updates.
 * @param {(categories: CategoryItem[]) => void} fn
 * @returns {() => void} unsubscribe function
 */
export function subscribeCategories(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

/**
 * Resets the in-memory categories cache to empty (does not affect the backend).
 */
export function resetCategories() {
  categories = [];
  notify();
}
