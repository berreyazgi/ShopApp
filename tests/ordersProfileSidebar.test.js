import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Covers reusing the profile sidebar (createProfileSidebar) on the
 * Siparişlerim page: the configurable `activeItem` API, and OrderListPage
 * loading real profile + order data and rendering them together.
 * Uses the same minimal DOM mock pattern as tests/checkout.test.js.
 */

// ─── Minimal DOM mock (same shape as tests/checkout.test.js) ──────────────────
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
    location: { pathname: '/siparisler', search: '', origin: 'http://localhost:3000' },
    history: { pushState: (_s, _t, url) => { global.window.__lastPush = url; }, replaceState: () => {} },
    addEventListener: () => {},
  };

  global.alert = (msg) => { global.__lastAlert = msg; };
}

setupMockDom();

const { createProfileSidebar } = await import('../src/Frontend/ShopApp.Web/src/features/profile/components/ProfileSidebar.js');
const { default: OrderListPage } = await import('../src/Frontend/ShopApp.Web/src/features/orders/pages/OrderListPage.js');

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

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

const sampleUser = {
  id: 'user-1', musteriId: 'cust-1', firstName: 'Berre', lastName: 'Yazgı',
  fullName: 'Berre Yazgı', email: 'berre@example.com', phone: null,
  createdAt: '2026-01-01T00:00:00Z', avatarUrl: null,
};

// ─── ProfileSidebar: configurable active item ──────────────────────────────

test('createProfileSidebar defaults to "account" active when activeItem is omitted', () => {
  const sidebar = createProfileSidebar({ user: sampleUser });
  const links = sidebar.querySelectorAll('.profile-sidebar__link');
  const activeLabels = links.filter((l) => l.classList.contains('profile-sidebar__link--active')).map((l) => l.textContent.trim());
  assert.deepEqual(activeLabels, ['Hesabım']);
});

test('createProfileSidebar activates exactly "Siparişlerim" when activeItem is "orders"', () => {
  const sidebar = createProfileSidebar({ user: sampleUser, activeItem: 'orders' });
  const links = sidebar.querySelectorAll('.profile-sidebar__link');
  const active = links.filter((l) => l.classList.contains('profile-sidebar__link--active'));
  assert.equal(active.length, 1);
  assert.ok(active[0].textContent.includes('Siparişlerim'));

  const accountLink = links.find((l) => l.textContent.includes('Hesabım'));
  assert.equal(accountLink.classList.contains('profile-sidebar__link--active'), false, 'Hesabım must not be active on /siparisler');
});

// ─── OrderListPage: reuses the profile sidebar with real data ─────────────

test('OrderListPage loads real profile + orders and shows the sidebar with Siparişlerim active', async () => {
  stubFetch({
    'GET /api/profile': () => ({ body: sampleUser }),
    'GET /api/siparis': () => ({
      body: [
        { id: 'ord-1', siparisNumarasi: 'SIP-1', durumIsmi: 'Hazırlanıyor', araToplam: 100, indirimTutari: 0, kargoFiyat: 0, toplamFiyat: 100 },
      ],
    }),
  });

  const page = OrderListPage();
  await flush();
  await flush();

  const text = page.element.textContent;
  assert.ok(text.includes('Berre Yazgı'), 'must show the real profile name, not dummy data');
  assert.ok(text.includes('berre@example.com'), 'must show the real profile email');
  assert.ok(text.includes('SIP-1'), 'must show the real order');

  const sidebar = page.element.querySelector('.profile-sidebar');
  assert.ok(sidebar, 'must render the shared ProfileSidebar component');

  const links = sidebar.querySelectorAll('.profile-sidebar__link');
  const active = links.filter((l) => l.classList.contains('profile-sidebar__link--active'));
  assert.equal(active.length, 1);
  assert.ok(active[0].textContent.includes('Siparişlerim'), 'Siparişlerim must be the active sidebar item on /siparisler');
});

test('OrderListPage: clicking "Hesabım" in the sidebar navigates to /profil', async () => {
  stubFetch({
    'GET /api/profile': () => ({ body: sampleUser }),
    'GET /api/siparis': () => ({ body: [] }),
  });
  global.window.__lastPush = null;

  const page = OrderListPage();
  await flush();
  await flush();

  const accountLink = page.element.querySelectorAll('.profile-sidebar__link').find((l) => l.textContent.includes('Hesabım'));
  assert.ok(accountLink);
  accountLink.dispatchEvent({ type: 'click', preventDefault: () => {} });

  assert.equal(global.window.__lastPush, '/profil');
});

test('OrderListPage preserves the existing empty-orders state when the customer has no orders', async () => {
  stubFetch({
    'GET /api/profile': () => ({ body: sampleUser }),
    'GET /api/siparis': () => ({ body: [] }),
  });

  const page = OrderListPage();
  await flush();
  await flush();

  assert.ok(page.element.textContent.includes('Henüz siparişiniz yok'));
});

test('OrderListPage preserves the existing orders error state when getAllOrders fails, without breaking the sidebar', async () => {
  stubFetch({
    'GET /api/profile': () => ({ body: sampleUser }),
    'GET /api/siparis': () => ({ ok: false, status: 500, body: { message: 'Sunucu hatası' } }),
  });

  const page = OrderListPage();
  await flush();
  await flush();

  const text = page.element.textContent;
  assert.ok(text.includes('Siparişler yüklenemedi'), 'existing orders error state must still render');
  assert.ok(text.includes('Berre Yazgı'), 'a failed orders fetch must not take down the sidebar');
});

test('OrderListPage shows a real error/retry state (not fake profile data) when getProfile fails', async () => {
  stubFetch({
    'GET /api/profile': () => ({ ok: false, status: 500, body: { message: 'Profil alınamadı' } }),
  });

  const page = OrderListPage();
  await flush();
  await flush();

  const text = page.element.textContent;
  assert.equal(page.element.querySelector('.profile-sidebar'), null, 'must not render a sidebar without real profile data');
  assert.ok(text.includes('Profil bilgileri yüklenemedi'));
  assert.equal(text.includes('User Test'), false);
});

// ─── No duplicate sidebar component ────────────────────────────────────────

test('Audit: OrderListPage reuses ProfileSidebar.js instead of a second sidebar implementation', () => {
  const src = fs.readFileSync(
    path.resolve('src/Frontend/ShopApp.Web/src/features/orders/pages/OrderListPage.js'),
    'utf-8',
  );
  assert.ok(src.includes("from '../../profile/components/ProfileSidebar.js'"), 'must import the existing ProfileSidebar component');

  const ordersDir = path.resolve('src/Frontend/ShopApp.Web/src/features/orders');
  const files = fs.readdirSync(ordersDir, { recursive: true }).filter((f) => String(f).toLowerCase().includes('sidebar'));
  assert.equal(files.length, 0, 'no duplicate sidebar component may live under features/orders');
});

test('Audit: ProfilePage passes activeItem to createProfileSidebar (component API, not DOM patching)', () => {
  const src = fs.readFileSync(
    path.resolve('src/Frontend/ShopApp.Web/src/features/profile/pages/ProfilePage.js'),
    'utf-8',
  );
  assert.ok(/activeItem:\s*['"]account['"]/.test(src));
});
