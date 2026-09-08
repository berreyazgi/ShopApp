/**
 * categoryService.js — Category Single Source of Truth
 *
 * Frontend service managing the dynamic category collection across all consumers:
 *  - AdminCategoriesPage (/admin/kategoriler)
 *  - AdminProductsPage (/admin/urunler)
 *  - CategoryListPage (/kategoriler)
 *  - Header.js Category Mega Menu & Mobile Accordion
 *
 * ZERO demo categories, ZERO hardcoded arrays, ZERO automatic seeds.
 * Starts strictly empty ([]).
 * Pure frontend presentation/state layer ready for developer's backend API integration.
 */

/**
 * @typedef {{
 *   id: string | number,
 *   name: string,
 *   slug?: string,
 *   description?: string,
 *   parentId?: string | number | null,
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

/**
 * Synchronous read of current category collection.
 * @returns {CategoryItem[]}
 */
export function getCategoriesSync() {
  return categories.map((c) => ({ ...c }));
}

/**
 * Retrieves the category collection. Returns a Promise for API compatibility.
 * @returns {Promise<CategoryItem[]>}
 */
export async function getCategories() {
  // Integration point for future Catalog API:
  // return apiClient.get(endpoints.catalog.categories());
  return getCategoriesSync();
}

/**
 * Retrieves a single category by ID.
 * @param {string | number} id
 * @returns {Promise<CategoryItem | null>}
 */
export async function getCategoryById(id) {
  const match = categories.find((c) => String(c.id) === String(id));
  return match ? { ...match } : null;
}

/**
 * Adds a new category to the collection.
 * @param {Omit<CategoryItem, 'id'> & { id?: string | number }} item
 * @returns {Promise<CategoryItem>}
 */
export async function addCategory(item) {
  const id = item.id ?? Date.now();
  const name = item.name || item.ad || 'Yeni Kategori';
  const slug = item.slug || slugify(name);
  const parentId = item.parentId || item.ustKategoriId || null;

  let parentName = null;
  if (parentId) {
    const parent = categories.find((c) => String(c.id) === String(parentId));
    parentName = parent ? (parent.name || parent.ad) : null;
  }

  const newCategory = {
    id,
    kategoriId: id,
    name,
    ad: name,
    slug,
    href: `/urunler/${slug}`,
    description: item.description || item.aciklama || '',
    aciklama: item.description || item.aciklama || '',
    parentId,
    ustKategoriId: parentId,
    parentName,
    ustKategoriAdi: parentName,
    imageUrl: item.imageUrl || item.gorselUrl || null,
    gorselUrl: item.imageUrl || item.gorselUrl || null,
    isActive: item.isActive !== undefined ? item.isActive : true,
    aktiflik: item.isActive !== undefined ? item.isActive : true,
    productCount: item.productCount ?? null,
    urunSayisi: item.productCount ?? null,
    children: [],
  };

  categories = [newCategory, ...categories];
  notify();
  return { ...newCategory };
}

/**
 * Updates an existing category in the collection.
 * @param {CategoryItem} item
 * @returns {Promise<CategoryItem>}
 */
export async function updateCategory(item) {
  const targetId = String(item.id ?? item.kategoriId);
  const name = item.name || item.ad || '';
  const parentId = item.parentId || item.ustKategoriId || null;

  let parentName = null;
  if (parentId) {
    const parent = categories.find((c) => String(c.id) === String(parentId));
    parentName = parent ? (parent.name || parent.ad) : null;
  }

  categories = categories.map((c) => {
    if (String(c.id ?? c.kategoriId) === targetId) {
      return {
        ...c,
        ...item,
        name: name || c.name,
        ad: name || c.ad,
        slug: item.slug || slugify(name || c.name),
        parentId,
        ustKategoriId: parentId,
        parentName,
        ustKategoriAdi: parentName,
        description: item.description !== undefined ? item.description : c.description,
        aciklama: item.aciklama !== undefined ? item.aciklama : c.aciklama,
        isActive: item.isActive !== undefined ? item.isActive : c.isActive,
        aktiflik: item.aktiflik !== undefined ? item.aktiflik : c.aktiflik,
        imageUrl: item.imageUrl !== undefined ? item.imageUrl : c.imageUrl,
        gorselUrl: item.gorselUrl !== undefined ? item.gorselUrl : c.gorselUrl,
      };
    }
    return c;
  });

  notify();
  const updated = categories.find((c) => String(c.id ?? c.kategoriId) === targetId);
  return updated ? { ...updated } : { ...item };
}

/**
 * Deletes a category by ID.
 * @param {string | number} id
 * @returns {Promise<void>}
 */
export async function deleteCategory(id) {
  const targetId = String(id);
  categories = categories.filter((c) => String(c.id ?? c.kategoriId) !== targetId);
  notify();
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
 * Resets the in-memory categories collection to empty.
 */
export function resetCategories() {
  categories = [];
  notify();
}
