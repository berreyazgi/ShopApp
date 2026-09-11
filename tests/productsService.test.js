import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Exercises productsService.js against a stubbed fetch, covering the
 * SKU/stock (UrunVaryant) wiring: detail mapping surfaces the primary variant's
 * stockCode/stock as top-level urunVaryantId/sku/stock, product creation persists
 * an initial variant, and editing an existing product updates that same
 * variant instead of creating a second one.
 */

function stubFetch(handlers) {
  globalThis.fetch = async (url, init) => {
    const method = init?.method ?? 'GET';
    const key = `${method} ${new URL(url, 'http://x').pathname}`;
    const handler = handlers[key];
    if (!handler) {
      throw new Error(`Unexpected fetch call: ${key}`);
    }
    const body = init?.body ? JSON.parse(init.body) : undefined;
    const result = handler(body);
    return {
      ok: true,
      status: result.status ?? 200,
      json: async () => result.body,
    };
  };
}

test('getAdminProductById maps the primary UrunVaryant variant to urunVaryantId/sku/stock', async () => {
  stubFetch({
    'GET /api/admin/urun/prod-1': () => ({
      body: {
        id: 'prod-1',
        kategoriId: 'cat-1',
        kategoriAd: 'Ayakkabı',
        urunAd: 'Nike Air Max',
        detay: null,
        fiyat: 1000,
        markaAd: 'Nike',
        gecmisFiyat: 1000,
        gorselUrl: null,
        aktifMi: true,
        gorseller: [],
        varyantlar: [
          {
            id: 'varyant-1',
            urunId: 'prod-1',
            beden: '42',
            renk: null,
            stokAdet: 15,
            stokKod: 'NIKE-AM-42',
            fiyatFarki: 0,
            aktifMi: true,
            ozellikler: [],
          },
        ],
      },
    }),
  });

  const { getAdminProductById } = await import('../src/Frontend/ShopApp.Web/src/features/products/services/productsService.js');
  const detail = await getAdminProductById('prod-1');

  assert.equal(detail.urunVaryantId, 'varyant-1');
  assert.equal(detail.sku, 'NIKE-AM-42');
  assert.equal(detail.stock, 15);
});

test('getProductById uses the single detail response for persisted attributes and active variants', async () => {
  stubFetch({
    'GET /api/urun/prod-1': () => ({
      body: {
        id: 'prod-1',
        kategoriId: 'cat-1',
        kategoriAd: 'Kadın Giyim',
        urunAd: 'Oversize Basic T-Shirt',
        fiyat: 799.9,
        markaAd: 'ShopApp',
        gorseller: [{ id: 'image-1', gorselUrl: 'https://example.test/tshirt.jpg' }],
        ozellikler: [
          { id: 'attribute-2', urunId: 'prod-1', ozellikAd: 'Kalıp', deger: 'Oversize', siralama: 2 },
          { id: 'attribute-1', urunId: 'prod-1', ozellikAd: 'Kumaş', deger: '%100 Pamuk', siralama: 1 },
        ],
        varyantlar: [{
          id: 'varyant-1',
          urunId: 'prod-1',
          beden: 'M',
          renk: 'Siyah',
          stokKod: 'TSHIRT-BLK-M',
          stokAdet: 5,
          fiyatFarki: 0,
          aktifMi: true,
        }],
      },
    }),
  });

  const { getProductById } = await import('../src/Frontend/ShopApp.Web/src/features/products/services/productsService.js');
  const detail = await getProductById('prod-1');

  assert.equal(detail.images[0], 'https://example.test/tshirt.jpg');
  assert.deepEqual(
    detail.attributes.map((attribute) => [attribute.name, attribute.value]),
    [['Kumaş', '%100 Pamuk'], ['Kalıp', 'Oversize']]);
  assert.equal(detail.variants[0].id, 'varyant-1');
  assert.equal(detail.variants[0].beden, 'M');
  assert.equal(detail.variants[0].renk, 'Siyah');
});

test('createProduct sends the initial SKU/stock in the same POST as the product (atomic create, no separate UrunVaryant call)', async () => {
  const calls = [];
  stubFetch({
    // No 'POST /api/admin/urun/new-prod/varyantlar' handler is registered —
    // if createProduct() still called it (the old two-step flow), stubFetch
    // would throw "Unexpected fetch call" and fail this test. The backend
    // (CreateUrunCommandHandler) now attaches the initial UrunVaryant to the
    // same SaveChanges call as the product itself, so the frontend only needs
    // to send everything in the one POST /api/admin/urun request.
    'POST /api/admin/urun': (body) => { calls.push(['create', body]); return { body: { id: 'new-prod' } }; },
    'GET /api/admin/urun': () => ({ body: [{ id: 'new-prod', kategoriId: 'cat-1', urunAd: 'Yeni Ürün', fiyat: 100, markaAd: 'Marka', toplamStok: 10 }] }),
  });

  const { createProduct } = await import('../src/Frontend/ShopApp.Web/src/features/products/services/productsService.js');
  const saved = await createProduct({
    categoryId: 'cat-1',
    name: 'Yeni Ürün',
    price: 100,
    brand: 'Marka',
    sku: 'SKU-NEW',
    stock: 10,
    isActive: true,
  });

  assert.equal(calls.length, 1, 'Only the single create request must fire');
  assert.equal(calls[0][0], 'create');
  assert.equal(calls[0][1].initialStokKod, 'SKU-NEW');
  assert.equal(calls[0][1].initialStokAdet, 10);
  assert.equal(saved.sku, 'SKU-NEW');
  assert.equal(saved.stock, 10);
});

test('createProduct without a SKU does not send initial variant fields, and creates no variant', async () => {
  const calls = [];
  stubFetch({
    'POST /api/admin/urun': (body) => { calls.push(body); return { body: { id: 'new-prod-2' } }; },
    'GET /api/admin/urun': () => ({ body: [{ id: 'new-prod-2', kategoriId: 'cat-1', urunAd: 'SKU\'suz Ürün', fiyat: 50, markaAd: 'Marka' }] }),
  });

  const { createProduct } = await import('../src/Frontend/ShopApp.Web/src/features/products/services/productsService.js');
  await createProduct({
    categoryId: 'cat-1',
    name: 'SKU\'suz Ürün',
    price: 50,
    brand: 'Marka',
    isActive: true,
  });

  assert.equal(calls.length, 1);
  assert.equal('initialStokKod' in calls[0], false, 'No SKU means no initial variant fields should be sent at all');
});

test('updateProduct with an existing urunVaryantId updates that variant instead of creating a duplicate', async () => {
  const calls = [];
  stubFetch({
    'PUT /api/admin/urun/prod-1': (body) => { calls.push(['updateRoot', body]); return { body: null, status: 204 }; },
    'PUT /api/admin/urun/prod-1/varyantlar/varyant-1': (body) => { calls.push(['updateVaryant', body]); return { body: null, status: 204 }; },
    'POST /api/admin/urun/prod-1/varyantlar': (body) => { calls.push(['createVaryant', body]); return { body: { id: 'should-not-happen' } }; },
    'GET /api/admin/urun': () => ({ body: [{ id: 'prod-1', kategoriId: 'cat-1', urunAd: 'Deri Ceket', fiyat: 1600, markaAd: 'Marka' }] }),
  });

  const { updateProduct } = await import('../src/Frontend/ShopApp.Web/src/features/products/services/productsService.js');
  const saved = await updateProduct('prod-1', {
    categoryId: 'cat-1',
    name: 'Deri Ceket',
    price: 1600,
    brand: 'Marka',
    urunVaryantId: 'varyant-1',
    sku: 'ABC-100',
    stock: 32,
    variantBeden: null,
    variantRenk: null,
    variantFiyatFarki: 0,
    variantIsActive: true,
    isActive: true,
  });

  const kinds = calls.map((c) => c[0]);
  assert.ok(kinds.includes('updateVaryant'), 'Must call UpdateUrunVaryant for the existing variant');
  assert.ok(!kinds.includes('createVaryant'), 'Must not create a second UrunVaryant when one already exists');
  assert.equal(saved.sku, 'ABC-100');
  assert.equal(saved.stock, 32);
  assert.equal(saved.urunVaryantId, 'varyant-1');
});
