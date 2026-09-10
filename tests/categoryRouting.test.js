import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Covers the Kategori -> Urun routing/filtering fix:
 *  - categoryService.js no longer builds /urunler/{slug} hrefs (which the
 *    router would misread as a product id on /urunler/:productId)
 *  - ProductListPage reads ?kategoriId= and filters via the real backend
 *    query instead of showing everything
 *  - parent categories include their descendant categories' products
 *  - product cards still link to /urunler/{productId}, untouched
 * Uses the same minimal DOM mock + fetch-stub pattern as checkout.test.js.
 */

function setupMockDom() {
  class MockElement {
    constructor(tagName) {
      this.tagName = tagName.toUpperCase();
      this.className = '';
      this.attributes = {};
      this.children = [];
      this.childNodes = this.children;
      this.innerHTMLString = '';
      this.textContentString = '';
      this.eventListeners = {};
      this.style = {};
      this.id = '';
      this.value = '';
      this.disabled = false;
      this.classList = {
        add: (...cls) => {
          const set = new Set(this.className.split(/\s+/).filter(Boolean));
          cls.forEach((c) => set.add(c));
          this.className = [...set].join(' ');
        },
        remove: (...cls) => {
          const set = new Set(this.className.split(/\s+/).filter(Boolean));
          cls.forEach((c) => set.delete(c));
          this.className = [...set].join(' ');
        },
        contains: (c) => this.className.split(/\s+/).includes(c),
        toggle: (c) => {
          if (this.classList.contains(c)) { this.classList.remove(c); return false; }
          this.classList.add(c); return true;
        },
      };
    }

    get href() { return this.attributes.href ?? ''; }
    get parentElement() { return this.parentNode ?? null; }
    set href(val) { this.attributes.href = String(val); }

    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    removeAttribute(name) { delete this.attributes[name]; }

    appendChild(child) {
      if (typeof child === 'string') child = new MockTextNode(child);
      this.children.push(child);
      child.parentNode = this;
      return child;
    }
    prepend(child) {
      if (typeof child === 'string') child = new MockTextNode(child);
      this.children.unshift(child);
      child.parentNode = this;
      return child;
    }
    append(...nodes) { nodes.forEach((child) => this.appendChild(child)); }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) { this.children.splice(idx, 1); child.parentNode = null; }
      return child;
    }
    remove() { if (this.parentNode) this.parentNode.removeChild(this); }

    addEventListener(event, fn) {
      if (!this.eventListeners[event]) this.eventListeners[event] = [];
      this.eventListeners[event].push(fn);
    }
    removeEventListener(event, fn) {
      if (this.eventListeners[event]) this.eventListeners[event] = this.eventListeners[event].filter((f) => f !== fn);
    }
    dispatchEvent(event) {
      (this.eventListeners[event.type] || []).forEach((fn) => fn(event));
    }
    click() { this.dispatchEvent({ type: 'click' }); }

    get innerHTML() { return this.innerHTMLString; }
    set innerHTML(html) {
      this.innerHTMLString = html;
      this.children = [];
      this.childNodes = this.children;
      if (!html) return;

      const tagRegex = /<([a-zA-Z0-9-]+)([^>]*)>(.*?)<\/\1>|<([a-zA-Z0-9-]+)([^>]*)\/>/gs;
      let match;
      while ((match = tagRegex.exec(html)) !== null) {
        const tagName = match[1] || match[4];
        const attrs = match[2] || match[5] || '';
        const inner = match[3] || '';
        const child = new MockElement(tagName);
        const classMatch = attrs.match(/class=["']([^"']*)["']/);
        if (classMatch) child.className = classMatch[1];
        const idMatch = attrs.match(/id=["']([^"']*)["']/);
        if (idMatch) child.id = idMatch[1];
        if (inner && !inner.includes('<')) child.textContentString = inner.trim();
        else if (inner) child.innerHTML = inner;
        this.appendChild(child);
      }
    }

    get textContent() {
      if (this.children.length === 0) return this.textContentString;
      return this.children.map((c) => c.textContent).join(' ');
    }
    set textContent(text) {
      this.textContentString = String(text);
      this.children = [];
      this.childNodes = this.children;
    }

    querySelector(selector) {
      const all = this.querySelectorAll(selector);
      return all.length > 0 ? all[0] : null;
    }
    querySelectorAll(selector) {
      const parts = selector.trim().split(/\s+/);
      if (parts.length > 1) {
        let currentResults = [this];
        for (const part of parts) {
          const nextResults = [];
          for (const el of currentResults) nextResults.push(...el.querySelectorAll(part));
          currentResults = nextResults;
        }
        return currentResults;
      }
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;
        if (selector.startsWith('.')) {
          if (el.classList.contains(selector.slice(1))) results.push(el);
        } else if (selector.startsWith('#')) {
          if (el.id === selector.slice(1)) results.push(el);
        } else if (el.tagName.toLowerCase() === selector.toLowerCase()) {
          results.push(el);
        }
        if (el.children) el.children.forEach(match);
      };
      this.children.forEach(match);
      return results;
    }

    closest(selector) {
      let current = this;
      while (current) {
        if (selector.startsWith('.') && current.classList?.contains(selector.slice(1))) return current;
        if (current.tagName && current.tagName.toLowerCase() === selector.toLowerCase()) return current;
        current = current.parentNode;
      }
      return null;
    }

    scrollIntoView() {}
    focus() {}
  }

  class MockTextNode {
    constructor(text) { this.textContent = String(text); this.nodeType = 3; }
  }

  global.document = {
    createElement: (tag) => new MockElement(tag),
    createTextNode: (text) => new MockTextNode(text),
    getElementById: () => null,
    querySelector: (sel) => global.document.body.querySelector(sel),
    querySelectorAll: (sel) => global.document.body.querySelectorAll(sel),
    addEventListener: () => {},
    removeEventListener: () => {},
    body: new MockElement('body'),
  };

  global.window = {
    location: { pathname: '/urunler', search: '', origin: 'http://localhost:3000' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
  };
}

setupMockDom();

const { getCategories } = await import('../src/Frontend/ShopApp.Web/src/features/categories/services/categoryService.js');
const { default: ProductListPage } = await import('../src/Frontend/ShopApp.Web/src/features/products/pages/ProductListPage.js');
const { createProductCard } = await import('../src/Frontend/ShopApp.Web/src/features/products/components/ProductCard.js');

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function stubFetch(handlers) {
  const calls = [];
  globalThis.fetch = async (url) => {
    const key = new URL(url).pathname + new URL(url).search;
    calls.push(key);
    const handler = handlers[key];
    if (!handler) throw new Error(`Unexpected fetch call: ${key}`);
    const result = handler();
    return { ok: result.ok ?? true, status: result.status ?? 200, json: async () => result.body };
  };
  return calls;
}

// ─── categoryService: fixed href shape ─────────────────────────────────────

test('categoryService maps categories to /urunler?kategoriId= hrefs, never /urunler/{slug}', async () => {
  stubFetch({
    '/api/kategori': () => ({
      body: [{ id: 'cat-ayakkabi', kategoriAd: 'Ayakkabı', ustKategoriId: null, aktifMi: true }],
    }),
  });

  const categories = await getCategories();
  assert.equal(categories.length, 1);
  assert.equal(categories[0].href, `/urunler?kategoriId=${encodeURIComponent('cat-ayakkabi')}`);
  assert.ok(!categories[0].href.startsWith('/urunler/'), 'must not build a /urunler/{slug} link that a product-detail route would misread as a product id');
});

// ─── ProductListPage: reads kategoriId, filters via the backend ────────────

test('ProductListPage with no ?kategoriId= shows all products via plain getProducts()', async () => {
  window.location.search = '';
  const calls = stubFetch({
    '/api/urun': () => ({ body: [
      { id: 'p1', kategoriId: 'cat-a', urunAd: 'Ürün 1', fiyat: 100, markaAd: 'M', gecmisFiyat: 100, aktifMi: true },
      { id: 'p2', kategoriId: 'cat-b', urunAd: 'Ürün 2', fiyat: 200, markaAd: 'M', gecmisFiyat: 200, aktifMi: true },
    ] }),
  });

  const page = ProductListPage({ params: {} });
  await flush();

  assert.deepEqual(calls, ['/api/urun']);
  const text = page.element.textContent;
  assert.ok(text.includes('Ürün 1') && text.includes('Ürün 2'));
});

test('ProductListPage with ?kategoriId= reads it and calls getProducts(kategoriId), showing only that category\'s products', async () => {
  window.location.search = '?kategoriId=cat-a';
  const calls = stubFetch({
    '/api/kategori/cat-a': () => ({ body: { id: 'cat-a', kategoriAd: 'Ayakkabı', ustKategoriId: null, aktifMi: true } }),
    '/api/kategori': () => ({ body: [{ id: 'cat-a', kategoriAd: 'Ayakkabı', ustKategoriId: null, aktifMi: true }] }),
    '/api/urun?kategoriId=cat-a': () => ({ body: [
      { id: 'p1', kategoriId: 'cat-a', urunAd: 'Nike Air Max', fiyat: 1000, markaAd: 'Nike', gecmisFiyat: 1000, aktifMi: true },
    ] }),
  });

  const page = ProductListPage({ params: {} });
  await flush();

  assert.ok(calls.includes('/api/urun?kategoriId=cat-a'), 'must call getProducts(kategoriId), not the unfiltered endpoint');
  assert.ok(!calls.includes('/api/urun'), 'must not also fetch the unfiltered product list');
  assert.ok(!calls.some((c) => c.startsWith('/api/urun/ayakkabi')), 'must never treat a category slug/id as a product id path');

  const text = page.element.textContent;
  assert.ok(text.includes('Nike Air Max'), 'must show the category\'s product');
  assert.ok(text.includes('Ayakkabı'), 'breadcrumb/heading must reflect the real category name');
});

test('ProductListPage shows a clean empty state (not unrelated products) when the category id does not exist', async () => {
  window.location.search = '?kategoriId=cat-missing';
  stubFetch({
    '/api/kategori/cat-missing': () => ({ ok: false, status: 404, body: { message: 'not found' } }),
    '/api/kategori': () => ({ body: [] }),
  });

  const page = ProductListPage({ params: {} });
  await flush();

  const text = page.element.textContent;
  assert.ok(text.includes('Kategori bulunamadı'));
});

test('ProductListPage: a parent category page includes its child categories\' products', async () => {
  window.location.search = '?kategoriId=cat-kadin';
  const calls = stubFetch({
    '/api/kategori/cat-kadin': () => ({ body: { id: 'cat-kadin', kategoriAd: 'Kadın', ustKategoriId: null, aktifMi: true } }),
    '/api/kategori': () => ({ body: [
      { id: 'cat-kadin', kategoriAd: 'Kadın', ustKategoriId: null, aktifMi: true },
      { id: 'cat-kadin-ayakkabi', kategoriAd: 'Kadın Ayakkabı', ustKategoriId: 'cat-kadin', aktifMi: true },
    ] }),
    // Products are only ever assigned to the child category in this scenario.
    '/api/urun?kategoriId=cat-kadin': () => ({ body: [] }),
    '/api/urun?kategoriId=cat-kadin-ayakkabi': () => ({ body: [
      { id: 'p1', kategoriId: 'cat-kadin-ayakkabi', urunAd: 'New Balance 530', fiyat: 1200, markaAd: 'NB', gecmisFiyat: 1200, aktifMi: true },
    ] }),
  });

  const page = ProductListPage({ params: {} });
  await flush();

  assert.ok(calls.includes('/api/urun?kategoriId=cat-kadin'));
  assert.ok(calls.includes('/api/urun?kategoriId=cat-kadin-ayakkabi'), 'must also fetch the child category\'s products');

  const text = page.element.textContent;
  assert.ok(text.includes('New Balance 530'), 'parent category page must not look empty when products live under its child category');
});

// ─── Product cards: untouched, still open product detail ──────────────────

test('Product card links still open /urunler/{productId} — unaffected by category routing changes', () => {
  const card = createProductCard({ id: 'prod-123', name: 'Test Ürün', price: 100, imageUrl: '' }, { variant: 'grid' });
  const link = card.querySelector('a');
  assert.equal(link.href, '/urunler/prod-123');
});
