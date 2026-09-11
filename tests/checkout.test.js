import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Covers the temporary checkout bypass (CartPage.js handleTemporaryCheckout())
 * and the order-confirmation page's real-data loading. Uses the same minimal
 * DOM mock pattern as tests/adminPages.test.js, plus a stubbed global.fetch
 * so apiClient.js (and therefore orderService.js) hits fake but realistic
 * backend responses instead of the network.
 */

// ─── Minimal DOM mock (same shape as tests/adminPages.test.js) ────────────────
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
      this.checked = false;
      this.type = '';
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
          if (this.classList.contains(c)) {
            this.classList.remove(c);
            return false;
          } else {
            this.classList.add(c);
            return true;
          }
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

    append(...nodes) {
      nodes.forEach((child) => this.appendChild(child));
    }

    cloneNode() {
      const clone = new MockElement(this.tagName);
      clone.className = this.className;
      clone.attributes = { ...this.attributes };
      clone.id = this.id;
      clone.innerHTMLString = this.innerHTMLString;
      clone.textContentString = this.textContentString;
      clone.children = this.children;
      return clone;
    }

    replaceWith(node) {
      if (this.parentNode) {
        const idx = this.parentNode.children.indexOf(this);
        if (idx !== -1) this.parentNode.children[idx] = node;
        node.parentNode = this.parentNode;
      }
      this.parentNode = null;
    }

    insertBefore(newChild, refChild) {
      if (typeof newChild === 'string') newChild = new MockTextNode(newChild);
      const idx = this.children.indexOf(refChild);
      if (idx !== -1) this.children.splice(idx, 0, newChild);
      else this.children.push(newChild);
      newChild.parentNode = this;
      return newChild;
    }

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
      const listeners = this.eventListeners[event.type] || [];
      listeners.forEach((fn) => fn(event));
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
          const cls = selector.slice(1);
          if (el.classList.contains(cls)) results.push(el);
        } else if (selector.startsWith('#')) {
          const id = selector.slice(1);
          if (el.id === id) results.push(el);
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
        if (selector.startsWith('#') && current.id === selector.slice(1)) return current;
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
    getElementById: (id) => null,
    querySelector: (sel) => global.document.body.querySelector(sel),
    querySelectorAll: (sel) => global.document.body.querySelectorAll(sel),
    addEventListener: () => {},
    removeEventListener: () => {},
    body: new MockElement('body'),
  };

  global.window = {
    location: { pathname: '/sepet', search: '', origin: 'http://localhost:3000' },
    history: { pushState: (_s, _t, url) => { global.window.__lastPush = url; }, replaceState: () => {} },
    addEventListener: () => {},
  };

  global.alert = (msg) => { global.__lastAlert = msg; };
}

setupMockDom();

const { default: CartPage } = await import('../src/Frontend/ShopApp.Web/src/features/cart/pages/CartPage.js');
const { default: OrderConfirmationPage } = await import('../src/Frontend/ShopApp.Web/src/features/orders/pages/OrderConfirmationPage.js');

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

/** Installs a fetch stub keyed by "METHOD /path"; unmatched calls throw. */
function stubFetch(handlers) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const method = init?.method ?? 'GET';
    const key = `${method} ${new URL(url).pathname}`;
    calls.push(key);
    const handler = handlers[key];
    if (!handler) throw new Error(`Unexpected fetch call: ${key}`);
    const result = handler();
    return {
      ok: result.ok ?? true,
      status: result.status ?? 200,
      json: async () => result.body,
    };
  };
  return calls;
}

const sampleCartItems = [
  { id: 'line-1', name: 'Ürün A', variant: '', unitPrice: 100, quantity: 2, image: '' },
  { id: 'line-2', name: 'Ürün B', variant: '', unitPrice: 50, quantity: 1, image: '' },
];

const oneSavedAddress = [{ id: 'addr-1', musteriId: 'cust-1', adresBilgisi: 'Test Mah.', ulke: 1, sehir: 34, ilce: 1, mahalle: 1, postaKodu: 34000 }];

// ─── Checkout: success path (customer already has a saved address) ─────────

test('Checkout: clicking "Ödeme Adımına Geç" checks addresses, then calls createOrder (POST /api/siparis) exactly once', async () => {
  const calls = stubFetch({
    'GET /api/profile/addresses': () => ({ body: oneSavedAddress }),
    'POST /api/siparis': () => ({ body: { id: 'order-1' } }),
  });

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');
  assert.ok(btn, 'checkout button must exist');

  btn.dispatchEvent({ type: 'click' });
  await flush();

  assert.deepEqual(calls, ['GET /api/profile/addresses', 'POST /api/siparis']);
});

test('Checkout: button is disabled and shows a processing label while the request is in flight', async () => {
  let resolveFetch;
  globalThis.fetch = () => new Promise((resolve) => { resolveFetch = resolve; });

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');

  btn.dispatchEvent({ type: 'click' });
  await Promise.resolve(); // let the handler run up to the awaited fetch

  assert.equal(btn.disabled, true, 'button must be disabled while checkout is processing');
  assert.ok(btn.textContent.includes('Siparişiniz oluşturuluyor'), 'button must show the processing label');

  resolveFetch({ ok: true, status: 200, json: async () => oneSavedAddress });
  await flush();
});

test('Checkout: a rapid double-click only checks addresses/creates an order once', async () => {
  const calls = stubFetch({
    'GET /api/profile/addresses': () => ({ body: oneSavedAddress }),
    'POST /api/siparis': () => ({ body: { id: 'order-3' } }),
  });

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');

  btn.dispatchEvent({ type: 'click' });
  btn.dispatchEvent({ type: 'click' }); // fired before the first request settles
  await flush();

  assert.equal(calls.filter((c) => c === 'GET /api/profile/addresses').length, 1, 'must not check addresses twice from a double-click');
  assert.equal(calls.filter((c) => c === 'POST /api/siparis').length, 1, 'must not create a second order from a double-click');
});

test('Checkout: success navigates to /siparis-onay with the created order id preserved', async () => {
  stubFetch({
    'GET /api/profile/addresses': () => ({ body: oneSavedAddress }),
    'POST /api/siparis': () => ({ body: { id: 'order-abc-123' } }),
  });
  global.window.__lastPush = null;

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');
  btn.dispatchEvent({ type: 'click' });
  await flush();

  assert.equal(global.window.__lastPush, '/siparis-onay?orderId=order-abc-123');
});

// ─── Checkout: failure path ─────────────────────────────────────────────────

test('Checkout: a failed createOrder (e.g. insufficient stock) does not navigate, re-enables the button, and shows the backend message', async () => {
  const calls = stubFetch({
    'GET /api/profile/addresses': () => ({ body: oneSavedAddress }),
    'POST /api/siparis': () => ({ ok: false, status: 409, body: { message: "'Ürün X' için yeterli stok bulunmuyor." } }),
  });
  global.window.__lastPush = null;
  global.__lastAlert = null;

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');
  btn.dispatchEvent({ type: 'click' });
  await flush();

  assert.deepEqual(calls, ['GET /api/profile/addresses', 'POST /api/siparis'], 'must call getAddresses then createOrder exactly once each, no retry loop');
  assert.equal(global.window.__lastPush, null, 'must not navigate to confirmation on failure');
  assert.equal(btn.disabled, false, 'button must be re-enabled after a failed checkout');
  assert.ok(btn.textContent.includes('Ödeme Adımına Geç'), 'button label must revert to idle text');
  assert.ok(global.__lastAlert && global.__lastAlert.includes('yeterli stok bulunmuyor'), 'must surface the real backend error message');
});

// ─── Checkout: address requirement ──────────────────────────────────────────

test('Checkout: zero saved addresses opens the warning modal instead of creating an order', async () => {
  const calls = stubFetch({
    'GET /api/profile/addresses': () => ({ body: [] }),
  });
  global.window.__lastPush = null;

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');
  btn.dispatchEvent({ type: 'click' });
  await flush();

  assert.deepEqual(calls, ['GET /api/profile/addresses'], 'must not call createOrder when there is no saved address');
  assert.equal(global.window.__lastPush, null, 'must not navigate to confirmation');

  const modalTitle = document.body.querySelector('.confirm-modal-title');
  assert.ok(modalTitle, 'address-required modal must be shown');
  assert.equal(modalTitle.textContent, 'Teslimat Adresi Gerekli');
  assert.ok(document.body.textContent.includes('teslimat adresi'), 'modal must explain the address requirement');

  // Button must be usable again (not stuck in "processing") after the warning.
  assert.equal(btn.disabled, false);
});

test('Checkout: "Adres Ekle" in the address-required modal navigates to /profil#adreslerim', async () => {
  stubFetch({
    'GET /api/profile/addresses': () => ({ body: [] }),
  });
  global.window.__lastPush = null;

  const page = CartPage({ items: sampleCartItems });
  const btn = page.element.querySelector('#btn-checkout');
  btn.dispatchEvent({ type: 'click' });
  await flush();

  const confirmBtn = document.body.querySelector('.confirm-modal-btn--confirm');
  assert.ok(confirmBtn);
  assert.equal(confirmBtn.textContent, 'Adres Ekle');
  confirmBtn.dispatchEvent({ type: 'click' });
  await flush();

  assert.equal(global.window.__lastPush, '/profil#adreslerim');
});

test('Checkout: a basket may exist with zero addresses — the address check only blocks checkout, not adding to cart', async () => {
  // Same shape as the other zero-address test: CartPage renders and accepts
  // pre-supplied items with no address-related gate on mount/render at all.
  stubFetch({ 'GET /api/profile/addresses': () => ({ body: [] }) });
  const page = CartPage({ items: sampleCartItems });
  assert.equal(page.element.querySelectorAll('.cart-item').length, sampleCartItems.length, 'basket must render items regardless of address state');
});

// ─── Order Confirmation: real order/order-item loading ─────────────────────

test('OrderConfirmationPage loads the real order + items named by ?orderId= and shows the success message', async () => {
  global.window.location.search = '?orderId=order-xyz';
  stubFetch({
    'GET /api/siparis/order-xyz': () => ({
      body: {
        id: 'order-xyz',
        siparisNumarasi: 'SIP-2026-0001',
        durumIsmi: 'Hazırlanıyor',
        araToplam: 250,
        indirimTutari: 0,
        kargoFiyat: 0,
        toplamFiyat: 250,
      },
    }),
    'GET /api/siparis/order-xyz/urunler': () => ({
      body: [
        { id: 'su-1', siparisId: 'order-xyz', urunVaryantId: 'ut-1', urunIsmi: 'Ürün A', urunAciklamasi: null, stokTakipNumarasi: null, urunMiktar: 2, urunBirimFiyat: 100, indirimOrani: 0, toplamFiyat: 200 },
        { id: 'su-2', siparisId: 'order-xyz', urunVaryantId: 'ut-2', urunIsmi: 'Ürün B', urunAciklamasi: null, stokTakipNumarasi: null, urunMiktar: 1, urunBirimFiyat: 50, indirimOrani: 0, toplamFiyat: 50 },
      ],
    }),
  });

  const page = OrderConfirmationPage();
  await flush();

  const text = page.element.textContent;
  assert.ok(text.includes('Tebrikler! Siparişiniz Başarıyla Alındı.'));
  assert.ok(text.includes('SIP-2026-0001'), 'must show the persisted SiparisNumarasi, not a fabricated one');
  assert.ok(text.includes('Ürün A') && text.includes('Ürün B'), 'must show the real order items');

  // Temporary-flow wording: never claim a real payment happened.
  assert.ok(!text.includes('Ödeme işlemi başarıyla tamamlanmıştır'), 'must not claim a real payment was processed');
  assert.ok(text.includes('Siparişiniz başarıyla oluşturulmuştur'));

  page.destroy();
  global.window.location.search = '';
});

test('OrderConfirmationPage "Siparişlerim\'e Git" navigates to /siparisler', async () => {
  global.window.location.search = '?orderId=order-nav';
  stubFetch({
    'GET /api/siparis/order-nav': () => ({ body: { id: 'order-nav', siparisNumarasi: 'SIP-9', araToplam: 100, indirimTutari: 0, kargoFiyat: 0, toplamFiyat: 100 } }),
    'GET /api/siparis/order-nav/urunler': () => ({ body: [] }),
  });
  global.window.__lastPush = null;

  const page = OrderConfirmationPage();
  await flush();

  const goToOrdersBtn = page.element.querySelector('#btn-go-to-orders');
  assert.ok(goToOrdersBtn);
  goToOrdersBtn.dispatchEvent({ type: 'click' });

  assert.equal(global.window.__lastPush, '/siparisler');

  page.destroy();
  global.window.location.search = '';
});

test('OrderConfirmationPage falls back to the empty state when no orderId is present', async () => {
  global.window.location.search = '';
  const page = OrderConfirmationPage();
  await flush();

  assert.ok(page.element.textContent.includes('Görüntülenecek sipariş onayı bulunamadı'));
  page.destroy();
});
