import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Minimal DOM mock for Node.js environment
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

    get href() {
      return this.attributes.href ?? '';
    }

    get parentElement() {
      return this.parentNode ?? null;
    }

    set href(val) {
      this.attributes.href = String(val);
    }

    setAttribute(name, value) {
      this.attributes[name] = String(value);
    }

    getAttribute(name) {
      return this.attributes[name] ?? null;
    }

    removeAttribute(name) {
      delete this.attributes[name];
    }

    appendChild(child) {
      if (typeof child === 'string') {
        child = new MockTextNode(child);
      }
      this.children.push(child);
      child.parentNode = this;
      return child;
    }

    prepend(child) {
      if (typeof child === 'string') {
        child = new MockTextNode(child);
      }
      this.children.unshift(child);
      child.parentNode = this;
      return child;
    }

    insertBefore(newChild, refChild) {
      if (typeof newChild === 'string') {
        newChild = new MockTextNode(newChild);
      }
      const idx = this.children.indexOf(refChild);
      if (idx !== -1) {
        this.children.splice(idx, 0, newChild);
      } else {
        this.children.push(newChild);
      }
      newChild.parentNode = this;
      return newChild;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        this.children.splice(idx, 1);
        child.parentNode = null;
      }
      return child;
    }

    remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }

    addEventListener(event, fn) {
      if (!this.eventListeners[event]) {
        this.eventListeners[event] = [];
      }
      this.eventListeners[event].push(fn);
    }

    removeEventListener(event, fn) {
      if (this.eventListeners[event]) {
        this.eventListeners[event] = this.eventListeners[event].filter((f) => f !== fn);
      }
    }

    dispatchEvent(event) {
      const listeners = this.eventListeners[event.type] || [];
      listeners.forEach((fn) => fn(event));
    }

    click() {
      this.dispatchEvent({ type: 'click' });
    }

    get innerHTML() {
      return this.innerHTMLString;
    }

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

        if (inner && !inner.includes('<')) {
          child.textContentString = inner.trim();
        } else if (inner) {
          child.innerHTML = inner;
        }

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
          for (const el of currentResults) {
            nextResults.push(...el.querySelectorAll(part));
          }
          currentResults = nextResults;
        }
        return currentResults;
      }

      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;

        if (selector.startsWith('.')) {
          const cls = selector.slice(1);
          if (el.classList.contains(cls)) {
            results.push(el);
          }
        } else if (selector.startsWith('#')) {
          const id = selector.slice(1);
          if (el.id === id) {
            results.push(el);
          }
        } else if (el.tagName.toLowerCase() === selector.toLowerCase()) {
          results.push(el);
        }

        if (el.children) {
          el.children.forEach(match);
        }
      };

      this.children.forEach(match);
      return results;
    }

    closest(selector) {
      let current = this;
      while (current) {
        if (selector.startsWith('.') && current.classList?.contains(selector.slice(1))) {
          return current;
        }
        if (selector.startsWith('#') && current.id === selector.slice(1)) {
          return current;
        }
        if (current.tagName && current.tagName.toLowerCase() === selector.toLowerCase()) {
          return current;
        }
        current = current.parentNode;
      }
      return null;
    }

    scrollIntoView() {}
    focus() {}
    reset() {
      this.querySelectorAll('input').forEach((inp) => {
        if (inp.type === 'checkbox') inp.checked = false;
        else inp.value = '';
      });
      this.querySelectorAll('textarea').forEach((t) => (t.value = ''));
      this.querySelectorAll('select').forEach((s) => (s.value = ''));
    }
  }

  class MockTextNode {
    constructor(text) {
      this.textContent = String(text);
      this.nodeType = 3;
    }
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
    location: { pathname: '/admin', origin: 'http://localhost:3000' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
  };
}

setupMockDom();

import { routes } from '../src/Frontend/ShopApp.Web/src/app/routes.js';
import { buildCategoryTree, createCategoryTree } from '../src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js';
import { createCategoryTable } from '../src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTable.js';
import { createCategoryFormPanel } from '../src/Frontend/ShopApp.Web/src/features/admin/components/CategoryFormPanel.js';
import { createCategoryStatistics } from '../src/Frontend/ShopApp.Web/src/features/admin/components/CategoryStatistics.js';
import { createRecentCategoriesCard } from '../src/Frontend/ShopApp.Web/src/features/admin/components/RecentCategoriesCard.js';
import { createAdminStatusBadge } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminStatusBadge.js';
import { createAdminPagination } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminPagination.js';
import { createAdminLayout } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminLayout.js';
import AdminCategoriesPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminCategoriesPage.js';
import AdminDashboardPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminDashboardPage.js';
import AdminProductsPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminProductsPage.js';
import AdminCustomersPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminCustomersPage.js';
import AdminOrdersPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminOrdersPage.js';
import AdminRegisterPage from '../src/Frontend/ShopApp.Web/src/features/admin/pages/AdminRegisterPage.js';
import LoginPage from '../src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js';
import { createProductStockBadge, createAdminProductCard } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductCard.js';
import { createAdminProductGrid } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductGrid.js';
import { createAdminProductList } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductList.js';
import { createAdminProductFormModal } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js';
import { createAdminProductDetailModal } from '../src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductDetailModal.js';

// ── 1. Routes Verification ──
test('Admin routes are properly registered with role guard', () => {
  const adminRoutes = [
    '/admin',
    '/admin/urunler',
    '/admin/kategoriler',
    '/admin/musteriler',
    '/admin/siparisler',
    '/admin/kayit',
    '/admin/categories',
    '/admin/add-category',
  ];

  adminRoutes.forEach((path) => {
    const route = routes.find((r) => r.path === path);
    assert.ok(route, `Route ${path} must be registered in routes.js`);
    assert.equal(route.requiresAuth, true, `${path} must require authentication`);
    assert.deepEqual(route.roles, ['Admin'], `${path} must require Admin role`);
    assert.equal(typeof route.page, 'function', `${path} must have dynamic page importer`);
  });
});

// ── 2. CategoryTree Unit & DOM Tests ──
test('buildCategoryTree correctly maps flat parent-child categories', () => {
  const flatData = [
    { id: 1, name: 'Root A', parentId: null },
    { id: 2, name: 'Child A1', parentId: 1 },
    { id: 3, name: 'Child A2', parentId: 1 },
    { id: 4, name: 'Root B', parentId: null },
    { id: 5, name: 'Child B1', parentId: 4 },
  ];

  const tree = buildCategoryTree(flatData);
  assert.equal(tree.length, 2);
  assert.equal(tree[0].name, 'Root A');
  assert.equal(tree[0].children.length, 2);
  assert.equal(tree[0].children[0].name, 'Child A1');
  assert.equal(tree[1].name, 'Root B');
  assert.equal(tree[1].children.length, 1);
});

test('createCategoryTree renders tree and triggers onSelect', () => {
  const categories = [
    { id: 10, name: 'Elektronik', parentId: null, productCount: 45 },
    { id: 11, name: 'Telefon', parentId: 10, productCount: 20 },
  ];

  let selected = null;
  const panel = createCategoryTree({
    categories,
    onSelect: (cat) => { selected = cat; },
  });

  assert.ok(panel.classList.contains('admin-card'));
  const nodes = panel.querySelectorAll('.admin-tree-node');
  assert.equal(nodes.length, 2);

  const header = panel.querySelector('.admin-tree-node__header');
  assert.ok(header.textContent.includes('Elektronik'));
  assert.ok(header.textContent.includes('(45)'));

  header.dispatchEvent({ type: 'click', target: header });
  assert.ok(selected);
  assert.equal(selected.id, 10);
});

test('createCategoryTree handles empty categories collection cleanly', () => {
  const panel = createCategoryTree({ categories: [] });
  assert.ok(panel.textContent.includes('Henüz kategori hiyerarşisi bulunmuyor.'));
});

// ── 3. CategoryTable Unit & DOM Tests ──
test('createCategoryTable renders rows, status badges, and empty states', () => {
  const categories = [
    { id: 1, name: 'Giyim', parentId: null, productCount: 100, isActive: true },
    { id: 2, name: 'Pantolon', parentId: 1, parentName: 'Giyim', productCount: 30, isActive: false },
  ];

  let edited = null;
  let deleted = null;

  const tablePanel = createCategoryTable({
    categories,
    onEdit: (cat) => { edited = cat; },
    onDelete: (cat) => { deleted = cat; },
  });

  const rows = tablePanel.querySelectorAll('tbody tr');
  assert.equal(rows.length, 2);
  assert.ok(rows[0].textContent.includes('Giyim'));
  assert.ok(rows[0].textContent.includes('100'));
  assert.ok(rows[0].textContent.includes('Aktif'));

  assert.ok(rows[1].textContent.includes('Pantolon'));
  assert.ok(rows[1].textContent.includes('Pasif'));

  // Test empty on zero categories
  const emptyPanel = createCategoryTable({ categories: [] });
  assert.ok(emptyPanel.textContent.includes('Henüz kategori oluşturulmamış.'));
});

// ── 4. CategoryFormPanel Unit & DOM Tests ──
test('createCategoryFormPanel populates fields in edit mode and fires onSave', () => {
  const categories = [
    { id: 1, name: 'Ayakkabı', parentId: null },
    { id: 2, name: 'Spor Ayakkabı', parentId: 1 },
  ];

  let savedData = null;
  const panel = createCategoryFormPanel({
    categories,
    selectedCategory: categories[1],
    onSave: (data) => { savedData = data; },
  });

  assert.ok(panel.querySelector('.admin-card__title').textContent.includes('Kategori Düzenle'));

  const nameInput = panel.querySelector('#category-name-input');
  assert.equal(nameInput.value, 'Spor Ayakkabı');

  // Submit form
  const form = panel.querySelector('form');
  nameInput.value = 'Koşu Ayakkabısı';
  form.dispatchEvent({ type: 'submit', preventDefault: () => {} });

  assert.ok(savedData);
  assert.equal(savedData.name, 'Koşu Ayakkabısı');
  assert.equal(savedData.id, 2);
});

// ── 5. CategoryStatistics Unit & DOM Tests ──
test('createCategoryStatistics derives metrics safely without fake numbers', () => {
  const categories = [
    { id: 1, parentId: null, productCount: 10, isActive: true },
    { id: 2, parentId: 1, productCount: 20, isActive: true },
    { id: 3, parentId: 1, productCount: 30, isActive: false },
  ];

  const stats = createCategoryStatistics({ categories });
  const values = stats.querySelectorAll('.admin-metric-card__value');

  // Root categories = 1
  assert.equal(values[0].textContent, '1');
  // Total categories = 3
  assert.equal(values[1].textContent, '3');
  // Total products = 60
  assert.equal(values[2].textContent, '60');
  // Active ratio = %67
  assert.equal(values[3].textContent, '%67');

  // When 0 categories supplied
  const emptyStats = createCategoryStatistics({ categories: [] });
  const emptyValues = emptyStats.querySelectorAll('.admin-metric-card__value');
  assert.equal(emptyValues[0].textContent, '0');
  assert.equal(emptyValues[1].textContent, '0');
  assert.equal(emptyValues[2].textContent, '—');
  assert.equal(emptyValues[3].textContent, '—');
});

// ── 6. Status Badges & Pagination ──
test('createAdminStatusBadge renders semantic classes and dots', () => {
  const activeBadge = createAdminStatusBadge({ isActive: true });
  assert.ok(activeBadge.classList.contains('admin-status-badge--success'));
  assert.ok(activeBadge.textContent.includes('Aktif'));

  const passiveBadge = createAdminStatusBadge({ isActive: false });
  assert.ok(passiveBadge.classList.contains('admin-status-badge--neutral'));
  assert.ok(passiveBadge.textContent.includes('Pasif'));

  const deliveryBadge = createAdminStatusBadge({ status: 'Teslim Edildi' });
  assert.ok(deliveryBadge.classList.contains('admin-status-badge--success'));

  const prepBadge = createAdminStatusBadge({ status: 'Hazırlanıyor' });
  assert.ok(prepBadge.classList.contains('admin-status-badge--warning'));
});

test('createAdminPagination renders correct page buttons and handles callback', () => {
  let targetPage = null;
  const pagination = createAdminPagination({
    currentPage: 2,
    totalPages: 5,
    totalItems: 48,
    pageSize: 10,
    onPageChange: (p) => { targetPage = p; },
  });

  assert.ok(pagination.textContent.includes('Toplam 48 kayıttan 11 - 20 gösteriliyor'));
  const activeBtn = pagination.querySelector('.admin-pagination__btn--active');
  assert.equal(activeBtn.textContent, '2');
});

// ── 7. AdminLayout Workspace Mode ──
test('createAdminLayout toggles body.admin-mode and destroys cleanly', () => {
  const layout = createAdminLayout({ currentPath: '/admin' });
  assert.equal(document.body.classList.contains('admin-mode'), true);

  layout.destroy();
  assert.equal(document.body.classList.contains('admin-mode'), false);
});

// ── 8. Page Components Instantiation ──
test('Admin pages instantiate and destroy cleanly without exceptions', () => {
  const catPage = AdminCategoriesPage({ categories: [] });
  assert.ok(catPage.element);
  catPage.destroy();

  const dashPage = AdminDashboardPage({ summary: {}, recentOrders: [], lowStockProducts: [] });
  assert.ok(dashPage.element);
  dashPage.destroy();

  const prodPage = AdminProductsPage({ products: [] });
  assert.ok(prodPage.element);
  prodPage.destroy();

  const custPage = AdminCustomersPage({ customers: [] });
  assert.ok(custPage.element);
  custPage.destroy();

  const ordPage = AdminOrdersPage({ orders: [] });
  assert.ok(ordPage.element);
  ordPage.destroy();

  const regPage = AdminRegisterPage();
  assert.ok(regPage.element);
  regPage.destroy();
});

// ── 9. Login Page Verification ──
test('LoginPage does not render admin registration button', () => {
  const login = LoginPage();
  const adminBtn = login.element.querySelector('.auth-admin-register-btn');
  assert.equal(adminBtn, null, 'LoginPage must not contain .auth-admin-register-btn');
  login.destroy();
});

test('AdminRegisterPage renders fields and validates password match before firing onRegisterAdmin', () => {
  let registeredPayload = null;
  const page = AdminRegisterPage({
    onRegisterAdmin: (data) => { registeredPayload = data; },
  });

  const firstNameInp = page.element.querySelector('#admin-reg-first-name');
  const lastNameInp = page.element.querySelector('#admin-reg-last-name');
  const emailInp = page.element.querySelector('#admin-reg-email');
  const passInp = page.element.querySelector('#admin-reg-password');
  const confirmInp = page.element.querySelector('#admin-reg-confirm-password');
  const roleSelect = page.element.querySelector('#admin-reg-role');
  const form = page.element.querySelector('form');

  assert.ok(firstNameInp);
  assert.ok(lastNameInp);
  assert.ok(emailInp);
  assert.ok(passInp);
  assert.ok(confirmInp);
  assert.ok(roleSelect);

  // 1. Password mismatch fails
  firstNameInp.value = 'Ali';
  lastNameInp.value = 'Yılmaz';
  emailInp.value = 'ali@shopapp.com';
  passInp.value = 'Password123!';
  confirmInp.value = 'DifferentPass';
  form.dispatchEvent({ type: 'submit', preventDefault: () => {} });

  assert.equal(registeredPayload, null, 'Must not register on password mismatch');
  assert.ok(page.element.textContent.includes('Girdiğiniz şifreler birbiriyle eşleşmiyor.'));

  // 2. Matching passwords succeed
  confirmInp.value = 'Password123!';
  form.dispatchEvent({ type: 'submit', preventDefault: () => {} });

  assert.ok(registeredPayload, 'Must call onRegisterAdmin callback on success');
  assert.equal(registeredPayload.firstName, 'Ali');
  assert.equal(registeredPayload.email, 'ali@shopapp.com');

  page.destroy();
});

// ── 10. Product Stock Badge Tests (Hybrid Decision) ──
test('createProductStockBadge renders exact hybrid badges based on stock urgency', () => {
  // 1. Out of stock (stock === 0) -> red danger badge "Tükendi" without count
  const outOfStockEl = createProductStockBadge({ stock: 0 });
  assert.ok(outOfStockEl.classList.contains('admin-status-badge--danger'));
  assert.equal(outOfStockEl.textContent.trim(), 'Tükendi');

  // 2. Low stock (1 <= stock <= 5) -> warning badge with count
  const lowStockEl = createProductStockBadge({ stock: 3 });
  assert.ok(lowStockEl.classList.contains('admin-status-badge--warning'));
  assert.equal(lowStockEl.textContent.trim(), 'Düşük Stok (Son 3 Adet)');

  // 3. In stock (stock > 5) -> success badge with count for admin
  const inStockEl = createProductStockBadge({ stock: 18 });
  assert.ok(inStockEl.classList.contains('admin-status-badge--success'));
  assert.equal(inStockEl.textContent.trim(), 'Stokta (18 Adet)');

  // 4. Missing/Null stock -> neutral badge with "—"
  const missingStockEl = createProductStockBadge({});
  assert.ok(missingStockEl.classList.contains('admin-status-badge--neutral'));
  assert.equal(missingStockEl.textContent.trim(), '—');

  // 5. Explicit stockStatus string precedence
  const explicitOutOfStock = createProductStockBadge({ stockStatus: 'out-of-stock' });
  assert.ok(explicitOutOfStock.classList.contains('admin-status-badge--danger'));
  assert.equal(explicitOutOfStock.textContent.trim(), 'Tükendi');
});

// ── 11. AdminProductCard Unit & Action Tests ──
test('createAdminProductCard renders supplied product and triggers callbacks', () => {
  const dummyProduct = {
    id: 'prod-101',
    name: 'Klasik Pamuklu Gömlek',
    sku: 'GML-101',
    category: 'Giyim',
    price: 499.9,
    stock: 12,
    isActive: true,
    imageUrl: '/images/products/shirt.jpg',
  };

  let viewedProduct = null;
  let editedProduct = null;
  let deletedProduct = null;

  const card = createAdminProductCard({
    product: dummyProduct,
    onView: (p) => { viewedProduct = p; },
    onEdit: (p) => { editedProduct = p; },
    onDelete: (p) => { deletedProduct = p; },
  });

  assert.equal(card.getAttribute('data-product-id'), 'prod-101');
  assert.ok(card.textContent.includes('Klasik Pamuklu Gömlek'));
  assert.ok(card.textContent.includes('GML-101'));
  assert.ok(card.textContent.includes('Giyim'));
  assert.ok(card.textContent.includes('Stokta (12 Adet)'));
  assert.ok(card.textContent.includes('Aktif'));

  // Test Action Buttons
  const buttons = card.querySelectorAll('button');
  assert.equal(buttons.length, 3, 'Card must have 3 action buttons (View, Edit, Delete)');

  buttons[0].dispatchEvent({ type: 'click' });
  assert.equal(viewedProduct?.id, 'prod-101', 'View button must fire onView');

  buttons[1].dispatchEvent({ type: 'click' });
  assert.equal(editedProduct?.id, 'prod-101', 'Edit button must fire onEdit');

  buttons[2].dispatchEvent({ type: 'click' });
  assert.equal(deletedProduct?.id, 'prod-101', 'Delete button must fire onDelete');
});

// ── 12. AdminProductList Unit & Table Tests ──
test('createAdminProductList renders table rows and handles actions', () => {
  const products = [
    { id: 'p1', name: 'Ayakkabı A', sku: 'AYK-01', category: 'Ayakkabı', price: 1200, stock: 4, isActive: true },
    { id: 'p2', name: 'Çanta B', sku: 'CNT-02', category: 'Aksesuar', price: 850, stock: 0, isActive: false },
  ];

  let edited = null;
  const listEl = createAdminProductList({
    products,
    onEdit: (p) => { edited = p; },
  });

  const rows = listEl.querySelectorAll('tbody tr');
  assert.equal(rows.length, 2, 'Must render 2 table rows for 2 products');
  assert.ok(listEl.textContent.includes('Ayakkabı A'));
  assert.ok(listEl.textContent.includes('Çanta B'));
  assert.ok(listEl.textContent.includes('Düşük Stok (Son 4 Adet)'));
  assert.ok(listEl.textContent.includes('Tükendi'));

  // Click edit on first row
  const editBtn = rows[0].querySelector('.admin-table-btn--edit');
  editBtn.dispatchEvent({ type: 'click' });
  assert.equal(edited?.id, 'p1');
});

// ── 13. AdminProductFormModal Validation & Submission Tests ──
test('createAdminProductFormModal validates inputs and emits onSave in create & edit modes', () => {
  const categories = [
    { id: 'cat-1', name: 'Giyim' },
    { id: 'cat-2', name: 'Ayakkabı' },
  ];

  let savedData = null;

  // 1. Create Mode: Validation Fails on empty fields
  const createModal = createAdminProductFormModal({
    categories,
    onSave: (data) => { savedData = data; },
  });

  const submitBtn = createModal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });
  assert.equal(savedData, null, 'Must not submit with empty name');

  // Fill valid create data
  const nameInp = createModal.element.querySelector('#prod-modal-name');
  const skuInp = createModal.element.querySelector('#prod-modal-sku');
  const priceInp = createModal.element.querySelector('#prod-modal-price');
  const stockInp = createModal.element.querySelector('#prod-modal-stock');
  const catSelect = createModal.element.querySelector('#prod-modal-cat');

  nameInp.value = 'Yeni Tişört';
  priceInp.value = '299.90';
  stockInp.value = '25';
  catSelect.value = 'Giyim';

  // SKU is required (UrunVaryant.StokKod is a non-empty backend field) — submit
  // must still fail without it.
  submitBtn.dispatchEvent({ type: 'click' });
  assert.equal(savedData, null, 'Must not submit with empty SKU');

  skuInp.value = 'TSH-NEW-01';
  submitBtn.dispatchEvent({ type: 'click' });
  assert.ok(savedData, 'Must submit valid create data');
  assert.equal(savedData.name, 'Yeni Tişört');
  assert.equal(savedData.price, 299.9);
  assert.equal(savedData.stock, 25);
  assert.equal(savedData.sku, 'TSH-NEW-01');
  assert.equal(savedData.category, 'Giyim');

  createModal.close();

  // 2. Edit Mode: Pre-populates existing product from full detail (as
  // productsService.getAdminProductById()/getProductById() would supply it —
  // urunVaryantId/sku/stock come from the product's UrunVaryant variant).
  const existingProduct = {
    id: 'p-edit',
    urunVaryantId: 'tur-99',
    name: 'Deri Ceket',
    sku: 'CKT-99',
    category: 'Giyim',
    price: 1500,
    stock: 5,
    isActive: true,
  };

  let editSaved = null;
  const editModal = createAdminProductFormModal({
    product: existingProduct,
    categories,
    onSave: (data) => { editSaved = data; },
  });

  const editNameInp = editModal.element.querySelector('#prod-modal-name');
  const editSkuInp = editModal.element.querySelector('#prod-modal-sku');
  const editStockInp = editModal.element.querySelector('#prod-modal-stock');
  assert.equal(editNameInp.value, 'Deri Ceket');
  assert.equal(editSkuInp.value, 'CKT-99', 'Existing SKU must be pre-populated, not blank');
  assert.equal(editStockInp.value, 5, 'Existing stock must be pre-populated, not blank');

  // Change only the price — SKU/stock must survive unchanged.
  const editSubmitBtn = editModal.element.querySelectorAll('.admin-modal__footer button')[1];
  const editPriceInp = editModal.element.querySelector('#prod-modal-price');
  editPriceInp.value = '1600';
  editSubmitBtn.dispatchEvent({ type: 'click' });

  assert.ok(editSaved, 'Must emit updated data');
  assert.equal(editSaved.id, 'p-edit');
  assert.equal(editSaved.price, 1600);
  assert.equal(editSaved.sku, 'CKT-99', 'Changing price must preserve existing SKU');
  assert.equal(editSaved.stock, 5, 'Changing price must preserve existing stock');
  assert.equal(editSaved.urunVaryantId, 'tur-99', 'Must keep editing the same UrunVaryant, not create a new one');

  editModal.close();
});

test('createAdminProductFormModal preserves isActive:false (passive) instead of defaulting to active', () => {
  const passiveProduct = {
    id: 'p-passive',
    urunVaryantId: 'tur-passive',
    name: 'Pasif Ürün',
    sku: 'PSV-01',
    stock: 3,
    price: 100,
    isActive: false,
  };

  let saved = null;
  const modal = createAdminProductFormModal({
    product: passiveProduct,
    categories: [],
    onSave: (data) => { saved = data; },
  });

  const activeCheckbox = modal.element.querySelector('#prod-modal-active');
  assert.equal(activeCheckbox.checked, false, 'Checkbox must load unchecked for a passive product');

  // Category isn't required by this modal's own validation once already set
  // via the constructor path used above; force a category through the input
  // for a clean submit.
  const catSelect = modal.element.querySelector('#prod-modal-cat');
  catSelect.value = '';
  const opt = document.createElement('option');
  opt.value = 'cat-x';
  catSelect.appendChild(opt);
  catSelect.value = 'cat-x';

  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  assert.ok(saved, 'Must emit saved data');
  assert.equal(saved.isActive, false, 'Saving without touching the checkbox must not flip false to true');

  modal.close();
});

// ── 14. AdminProductDetailModal Read-Only Inspection Tests ──
test('createAdminProductDetailModal displays full product details and fires onEdit', () => {
  const product = {
    id: 'p-detail',
    name: 'Spor Koşu Ayakkabısı',
    sku: 'AYK-777',
    category: 'Spor',
    price: 2400,
    stock: 2,
    isActive: true,
    description: 'Yüksek yastıklama sunan profesyonel koşu ayakkabısı.',
  };

  let editTriggered = false;
  const detailModal = createAdminProductDetailModal({
    product,
    onEdit: () => { editTriggered = true; },
  });

  assert.ok(detailModal.element.textContent.includes('Spor Koşu Ayakkabısı'));
  assert.ok(detailModal.element.textContent.includes('AYK-777'));
  assert.ok(detailModal.element.textContent.includes('Spor'));
  assert.ok(detailModal.element.textContent.includes('Düşük Stok (Son 2 Adet)'));
  assert.ok(detailModal.element.textContent.includes('Yüksek yastıklama'));

  const editBtn = detailModal.element.querySelectorAll('.admin-modal__footer button')[1];
  editBtn.dispatchEvent({ type: 'click' });
  assert.equal(editTriggered, true, 'Clicking edit button in details modal must fire onEdit');

  detailModal.close();
});

// ── 15. AdminProductsPage Integration: Grid/List, Filtering, Sorting, States ──
test('AdminProductsPage renders empty, loading, and error states dynamically', () => {
  // 1. Loading State
  const loadingPage = AdminProductsPage({ loading: true });
  assert.ok(loadingPage.element.textContent.includes('Ürünler yükleniyor...'));
  loadingPage.destroy();

  // 2. Error State with Retry
  let retried = false;
  const errorPage = AdminProductsPage({
    error: new Error('Network error'),
    onRetry: () => { retried = true; },
  });
  assert.ok(errorPage.element.textContent.includes('Ürünler görüntülenemedi.'));
  const retryBtn = errorPage.element.querySelector('.state-view--error button');
  assert.ok(retryBtn);
  retryBtn.dispatchEvent({ type: 'click' });
  assert.equal(retried, true);
  errorPage.destroy();

  // 3. Initial Empty State
  const emptyPage = AdminProductsPage({ products: [] });
  assert.ok(emptyPage.element.textContent.includes('Henüz ürün bulunamadı.'));
  assert.ok(emptyPage.element.textContent.includes('Yeni Ürün Ekle'));
  emptyPage.destroy();
});

test('AdminProductsPage supports Grid/List view toggle, dynamic search, multi-filtering, sorting, and clear', () => {
  const testProducts = [
    { id: '1', name: 'Zebra Çanta', sku: 'ZBR-01', category: 'Aksesuar', price: 900, stock: 20, isActive: true, createdAt: '2026-01-01' },
    { id: '2', name: 'Alpha Spor Ayakkabı', sku: 'ALP-02', category: 'Spor', price: 2500, stock: 2, isActive: true, createdAt: '2026-01-02' },
    { id: '3', name: 'Beta Koşu Şortu', sku: 'BET-03', category: 'Spor', price: 400, stock: 0, isActive: false, createdAt: '2026-01-03' },
    { id: '4', name: 'Basic Tişört', sku: 'TSH-04', category: 'Giyim', price: 250, stock: 15, isActive: true, createdAt: '2026-01-04' },
  ];

  const testCategories = ['Giyim', 'Spor', 'Aksesuar'];

  const page = AdminProductsPage({
    products: testProducts,
    categories: testCategories,
    pageSize: 10,
  });

  // 1. Initial State: Grid View with 4 items
  const gridEl = page.element.querySelector('.admin-products-grid');
  assert.ok(gridEl, 'Must render admin-products-grid by default');
  assert.equal(gridEl.querySelectorAll('.admin-product-card').length, 4);

  // Result count verification
  const countEl = page.element.querySelector('.admin-products-toolbar__count');
  assert.equal(countEl.textContent.trim(), '4 ürün bulundu');

  // 2. View Switcher to List View
  const listBtn = page.element.querySelectorAll('.admin-view-switch__btn')[1];
  listBtn.dispatchEvent({ type: 'click' });

  const tableEl = page.element.querySelector('.admin-products-table');
  assert.ok(tableEl, 'Must switch to admin-products-table');
  assert.equal(tableEl.querySelectorAll('tbody tr').length, 4);

  // Switch back to Grid
  const gridBtn = page.element.querySelectorAll('.admin-view-switch__btn')[0];
  gridBtn.dispatchEvent({ type: 'click' });
  assert.ok(page.element.querySelector('.admin-products-grid'));

  // 3. Search Filter: Search for "Alpha"
  const searchInput = page.element.querySelector('.admin-products-toolbar__search-input');
  searchInput.value = 'alpha';
  searchInput.dispatchEvent({ type: 'input' });

  assert.equal(page.element.querySelector('.admin-products-toolbar__count').textContent.trim(), '1 ürün bulundu');
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 1);
  assert.ok(page.element.textContent.includes('Alpha Spor Ayakkabı'));

  // Search by SKU: "ZBR"
  searchInput.value = 'ZBR';
  searchInput.dispatchEvent({ type: 'input' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 1);
  assert.ok(page.element.textContent.includes('Zebra Çanta'));

  // 4. Clear Filters
  const clearBtn = page.element.querySelector('.admin-btn-clear');
  clearBtn.dispatchEvent({ type: 'click' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 4);

  // 5. Category Filter: Select "Spor"
  const catSelect = page.element.querySelectorAll('.admin-products-toolbar__select')[0];
  catSelect.value = 'Spor';
  catSelect.dispatchEvent({ type: 'change' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 2);

  // 6. Status Filter: Select "Pasif" while category is "Spor" -> only "Beta Koşu Şortu"
  const statusSelect = page.element.querySelectorAll('.admin-products-toolbar__select')[1];
  statusSelect.value = 'passive';
  statusSelect.dispatchEvent({ type: 'change' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 1);
  assert.ok(page.element.textContent.includes('Beta Koşu Şortu'));

  // 7. Stock Filter: Select "low-stock" after clearing
  clearBtn.dispatchEvent({ type: 'click' });
  const stockSelect = page.element.querySelectorAll('.admin-products-toolbar__select')[2];
  stockSelect.value = 'low-stock';
  stockSelect.dispatchEvent({ type: 'change' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 1);
  assert.ok(page.element.textContent.includes('Alpha Spor Ayakkabı'));

  // 8. Sorting: Price Artan (Ascending)
  clearBtn.dispatchEvent({ type: 'click' });
  const sortSelect = page.element.querySelector('#admin-products-sort');
  sortSelect.value = 'price-asc';
  sortSelect.dispatchEvent({ type: 'change' });

  const cards = page.element.querySelectorAll('.admin-product-card');
  assert.ok(cards[0].textContent.includes('Basic Tişört'), 'First item must be cheapest (250 TL)');

  // 9. Filtered Empty State: Search for nonexistent product
  searchInput.value = 'NonexistentItem999';
  searchInput.dispatchEvent({ type: 'input' });

  assert.ok(page.element.querySelector('.admin-filtered-empty'));
  assert.ok(page.element.textContent.includes('Aramanızla eşleşen ürün bulunamadı.'));

  // Reset from filtered empty state
  const resetBtn = page.element.querySelector('.admin-filtered-empty button');
  resetBtn.dispatchEvent({ type: 'click' });
  assert.equal(page.element.querySelectorAll('.admin-product-card').length, 4);

  page.destroy();
});

// ── 16. Critical Audit: No Demo Data & No Network Calls ──
test('Audit: No admin demo data files exist in codebase', () => {
  const adminDir = path.resolve('src/Frontend/ShopApp.Web/src/features/admin');
  const files = fs.readdirSync(adminDir, { recursive: true });

  const demoDataExists = files.some((f) => String(f).includes('adminDemoData'));
  assert.equal(demoDataExists, false, 'adminDemoData.js must not exist in admin directory');

  // Check no admin files import or reference demo data
  const jsFiles = files.filter((f) => String(f).endsWith('.js'));
  jsFiles.forEach((file) => {
    const fullPath = path.join(adminDir, String(file));
    const content = fs.readFileSync(fullPath, 'utf-8');
    assert.equal(content.includes('adminDemoData'), false, `${file} must not reference adminDemoData`);
    assert.equal(content.includes('DEMO_'), false, `${file} must not reference DEMO_ constants`);
  });
});

test('Audit: No new fetch or apiClient network calls in admin components/pages', () => {
  const adminDir = path.resolve('src/Frontend/ShopApp.Web/src/features/admin');
  const files = fs.readdirSync(adminDir, { recursive: true });
  const jsFiles = files.filter((f) => String(f).endsWith('.js'));

  jsFiles.forEach((file) => {
    const fullPath = path.join(adminDir, String(file));
    const content = fs.readFileSync(fullPath, 'utf-8');
    // Ensure no fetch(), axios, XMLHttpRequest or apiClient calls
    assert.equal(content.includes('fetch('), false, `${file} must not call fetch()`);
    assert.equal(content.includes('axios'), false, `${file} must not call axios`);
    assert.equal(content.includes('XMLHttpRequest'), false, `${file} must not call XMLHttpRequest`);
    assert.equal(content.includes('apiClient.'), false, `${file} must not call apiClient`);
  });
});

// ── 17. Admin Customer Management Tests ──
test('AdminCustomersPage renders customer records, filters by search, and triggers status toggle', () => {
  const mockCustomers = [
    { id: 'c-1', fullName: 'Ayşe Demir', email: 'ayse@example.com', createdAt: '2026-01-15', orderCount: 3, isActive: true },
    { id: 'c-2', fullName: 'Mehmet Kaya', email: 'mehmet@example.com', createdAt: '2026-02-20', orderCount: 0, isActive: false },
  ];

  let toggledId = null;
  let toggledStatus = null;
  let viewedCustomer = null;

  const page = AdminCustomersPage({
    customers: mockCustomers,
    pageSize: 10,
    onViewCustomer: (c) => { viewedCustomer = c; },
    onUpdateCustomerStatus: (id, status) => {
      toggledId = id;
      toggledStatus = status;
    },
  });

  // Verify rows rendered
  const rows = page.element.querySelectorAll('tbody tr');
  assert.equal(rows.length, 2);
  assert.ok(page.element.textContent.includes('Ayşe Demir'));
  assert.ok(page.element.textContent.includes('Mehmet Kaya'));

  // Test Search
  const searchInput = page.element.querySelector('.admin-table-toolbar__search-input');
  searchInput.value = 'mehmet';
  searchInput.dispatchEvent({ type: 'input' });
  assert.equal(page.element.querySelectorAll('tbody tr').length, 1);
  assert.ok(page.element.textContent.includes('Mehmet Kaya'));

  // Reset Search
  searchInput.value = '';
  searchInput.dispatchEvent({ type: 'input' });
  assert.equal(page.element.querySelectorAll('tbody tr').length, 2);

  // Test View Action
  const viewBtns = page.element.querySelectorAll('.admin-table-btn').filter((b) => b.title === 'İncele');
  assert.ok(viewBtns.length > 0);
  viewBtns[0].dispatchEvent({ type: 'click' });
  assert.ok(viewedCustomer);
  assert.equal(viewedCustomer.id, 'c-1');

  // Test Status Toggle Action
  const toggleBtns = page.element.querySelectorAll('.admin-table-btn');
  // First row has viewBtn (index 0) and toggleBtn (index 1)
  assert.ok(toggleBtns.length >= 2);
  const toggleBtn1 = toggleBtns[1];
  assert.equal(toggleBtn1.title, 'Hesabı Pasife Al');

  page.destroy();
});

// ── 18. Admin Order Management Tests ──
test('AdminOrdersPage renders order records, filters by status, and handles status update', () => {
  const mockOrders = [
    { id: 'ord-1', orderNumber: 'SIP-1001', customerName: 'Ayşe Demir', createdAt: '2026-03-01', itemCount: 2, total: 450, status: 'Hazırlanıyor', durumId: 3 },
    { id: 'ord-2', orderNumber: 'SIP-1002', customerName: 'Mehmet Kaya', createdAt: '2026-03-02', itemCount: 1, total: 1200, status: 'Teslim Edildi', durumId: 5 },
  ];

  let updatedOrderId = null;
  let updatedStatusId = null;

  const page = AdminOrdersPage({
    orders: mockOrders,
    pageSize: 10,
    onUpdateOrderStatus: (orderId, statusId) => {
      updatedOrderId = orderId;
      updatedStatusId = statusId;
    },
  });

  // Verify rows rendered
  const rows = page.element.querySelectorAll('tbody tr');
  assert.equal(rows.length, 2);
  assert.ok(page.element.textContent.includes('SIP-1001'));
  assert.ok(page.element.textContent.includes('SIP-1002'));

  // Verify inline status selectors
  const statusSelectors = page.element.querySelectorAll('.admin-order-status-select');
  assert.equal(statusSelectors.length, 2);
  assert.equal(statusSelectors[0].value, '3');
  assert.equal(statusSelectors[1].value, '5');

  // Test Status Filter
  const filterSelect = page.element.querySelector('.admin-table-toolbar__filter');
  filterSelect.value = 'hazirlaniyor';
  filterSelect.dispatchEvent({ type: 'change' });
  assert.equal(page.element.querySelectorAll('tbody tr').length, 1);
  assert.ok(page.element.textContent.includes('SIP-1001'));

  page.destroy();
});

// ── 19. Endpoints Configuration Verification ──
test('endpoints.js contains update routes for adminKategori, adminUrun, adminMusteri, and adminSiparis', async () => {
  const { endpoints } = await import('../src/Frontend/ShopApp.Web/src/shared/services/endpoints.js');

  assert.equal(typeof endpoints.adminKategori.update, 'function');
  assert.equal(endpoints.adminKategori.update('cat-xyz'), '/api/admin/kategori/cat-xyz');

  assert.equal(typeof endpoints.adminUrun.update, 'function');
  assert.equal(endpoints.adminUrun.update('prod-123'), '/api/admin/urun/prod-123');

  assert.equal(typeof endpoints.adminMusteri.list, 'function');
  assert.equal(endpoints.adminMusteri.list(), '/api/admin/musteriler');
  assert.equal(typeof endpoints.adminMusteri.update, 'function');
  assert.equal(endpoints.adminMusteri.update('cust-456'), '/api/admin/musteriler/cust-456');

  assert.equal(typeof endpoints.adminSiparis.list, 'function');
  assert.equal(endpoints.adminSiparis.list(), '/api/admin/siparisler');
  assert.equal(typeof endpoints.adminSiparis.updateStatus, 'function');
  assert.equal(endpoints.adminSiparis.updateStatus('ord-789'), '/api/admin/siparisler/ord-789/durum');
});

// ── 20. Multi-Image Product Form & Detail Tests ──
test('createAdminProductFormModal supports multi-image addition, removal, and main image toggling', () => {
  let savedData = null;
  const modal = createAdminProductFormModal({
    categories: [{ id: 'cat-1', name: 'Giyim' }],
    onSave: (data) => { savedData = data; },
  });

  // Modal initializes with 1 empty image slot
  let rows = modal.element.querySelectorAll('.admin-product-image-row');
  assert.equal(rows.length, 1);

  // Set the first image
  const firstInp = rows[0].querySelector('.admin-product-image-input');
  firstInp.value = 'https://example.com/cover.jpg';
  firstInp.dispatchEvent({ type: 'input' });

  // Add a second image
  const addBtn = modal.element.querySelector('#prod-modal-add-image');
  assert.ok(addBtn);
  addBtn.dispatchEvent({ type: 'click' });

  rows = modal.element.querySelectorAll('.admin-product-image-row');
  assert.equal(rows.length, 2);

  const secondInp = rows[1].querySelector('.admin-product-image-input');
  secondInp.value = 'https://example.com/gallery.jpg';
  secondInp.dispatchEvent({ type: 'input' });

  // Toggle second image as main
  let mainBtns = modal.element.querySelectorAll('.admin-img-main-btn');
  assert.equal(mainBtns.length, 2);
  mainBtns[1].dispatchEvent({ type: 'click' });

  // Re-query rows after renderImageList
  rows = modal.element.querySelectorAll('.admin-product-image-row');
  const activeBtn = rows[1].querySelector('.admin-img-main-btn--active');
  assert.ok(activeBtn, 'Second row must have active main button');

  // Fill in required fields
  modal.element.querySelector('#prod-modal-name').value = 'Çoklu Görsel Tişört';
  modal.element.querySelector('#prod-modal-sku').value = 'MLT-001';
  modal.element.querySelector('#prod-modal-price').value = '199';
  modal.element.querySelector('#prod-modal-stock').value = '15';
  modal.element.querySelector('#prod-modal-cat').value = 'Giyim';

  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  assert.ok(savedData);
  assert.equal(savedData.imageUrl, 'https://example.com/gallery.jpg', 'Main image must be the chosen main image');
  assert.deepEqual(savedData.imageUrls, ['https://example.com/cover.jpg', 'https://example.com/gallery.jpg']);
  assert.equal(savedData.images.length, 2);
  assert.equal(savedData.images[1].isMain, true);

  modal.close();
});

function fillValidProductForm(modal) {
  modal.element.querySelector('#prod-modal-name').value = 'Async Ürün';
  modal.element.querySelector('#prod-modal-sku').value = 'ASYNC-01';
  modal.element.querySelector('#prod-modal-price').value = '50';
  modal.element.querySelector('#prod-modal-stock').value = '3';
  modal.element.querySelector('#prod-modal-cat').value = 'Giyim';
}

test('createAdminProductFormModal awaits async onSave, shows a saving state, blocks duplicate submits, and closes only once it resolves', async () => {
  let resolveSave;
  let saveCallCount = 0;
  const savePromise = new Promise((resolve) => { resolveSave = resolve; });

  let closed = false;
  const modal = createAdminProductFormModal({
    categories: [{ id: 'cat-1', name: 'Giyim' }],
    onSave: () => { saveCallCount += 1; return savePromise; },
    onClose: () => { closed = true; },
  });

  fillValidProductForm(modal);

  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  const cancelBtn = modal.element.querySelectorAll('.admin-modal__footer button')[0];
  submitBtn.dispatchEvent({ type: 'click' });

  assert.equal(saveCallCount, 1, 'onSave must be invoked once for the click');
  assert.equal(submitBtn.disabled, true, 'Kaydet must be disabled while the save is in flight');
  assert.equal(submitBtn.textContent, 'Kaydediliyor...', 'Kaydet must switch to a saving label');
  assert.equal(cancelBtn.disabled, true, 'İptal must be disabled while saving so the modal cannot be dismissed mid-request');
  assert.equal(closed, false, 'Modal must not close before the save resolves');

  // A duplicate click while the request is in flight must not fire a second save.
  submitBtn.dispatchEvent({ type: 'click' });
  assert.equal(saveCallCount, 1, 'Repeated clicks while saving must not send a duplicate request');

  resolveSave({ id: 'new-1' });
  await savePromise;
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(closed, true, 'Modal must close once the save succeeds');
  assert.equal(submitBtn.disabled, false, 'Kaydet must be re-enabled after settling');
  assert.equal(submitBtn.textContent, 'Kaydet', 'Kaydet must restore its original label after settling');
});

test('createAdminProductFormModal keeps the modal open, preserves entered values, and shows a friendly Turkish message when async onSave rejects', async () => {
  let closed = false;
  const modal = createAdminProductFormModal({
    categories: [{ id: 'cat-1', name: 'Giyim' }],
    onSave: () => Promise.reject({
      status: 500,
      message: 'Internal Server Error',
      body: { message: 'System.InvalidOperationException: Npgsql connection failed' },
    }),
    onClose: () => { closed = true; },
  });

  fillValidProductForm(modal);

  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  // Let the rejected promise's catch/finally run.
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(closed, false, 'Modal must not close when the save fails');

  const errorBox = modal.element.querySelector('.admin-form-error-box');
  assert.equal(errorBox.style.display, 'block', 'Error box must be visible after a failed save');
  assert.equal(
    errorBox.textContent,
    'Ürün kaydedilirken bir sorun oluştu.\nLütfen biraz sonra tekrar deneyin.',
    'A 500 error must show the generic Turkish message, never the raw exception text',
  );
  assert.ok(!errorBox.textContent.includes('InvalidOperationException'), 'Technical exception details must never reach the UI');
  assert.ok(!errorBox.textContent.includes('Npgsql'), 'Technical exception details must never reach the UI');

  assert.equal(modal.element.querySelector('#prod-modal-name').value, 'Async Ürün', 'Entered values must survive a failed save');
  assert.equal(modal.element.querySelector('#prod-modal-sku').value, 'ASYNC-01', 'Entered values must survive a failed save');

  assert.equal(submitBtn.disabled, false, 'Kaydet must be re-enabled so the user can retry');
  assert.equal(submitBtn.textContent, 'Kaydet', 'Kaydet must restore its original label after a failed save');

  modal.close();
});

test('createAdminProductFormModal maps backend error shapes to friendly Turkish messages without leaking technical details', async () => {
  const cases = [
    {
      error: { status: 0, code: 'NETWORK_ERROR', message: 'Failed to fetch' },
      expected: 'Ürün kaydedilirken bir sorun oluştu.\nLütfen biraz sonra tekrar deneyin.',
    },
    {
      error: {
        status: 400,
        body: { errors: [{ field: 'UrunAd', message: 'Ürün adı boş bırakılamaz.' }, { field: 'Fiyat', message: "Fiyat 0'dan küçük olamaz." }] },
      },
      expected: "Ürün eklenemedi:\n\n• Ürün adı boş bırakılamaz.\n• Fiyat 0'dan küçük olamaz.",
    },
    {
      error: { status: 403, body: {} },
      expected: 'Bu işlemi gerçekleştirmek için yönetici yetkiniz bulunmuyor.',
    },
    {
      error: { status: 409, body: { message: 'Bu stok kodu başka bir ürün tarafından kullanılıyor.' } },
      expected: 'Bu stok kodu başka bir ürün tarafından kullanılıyor.',
    },
  ];

  for (const { error, expected } of cases) {
    const modal = createAdminProductFormModal({
      categories: [{ id: 'cat-1', name: 'Giyim' }],
      onSave: () => Promise.reject(error),
    });

    fillValidProductForm(modal);
    const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
    submitBtn.dispatchEvent({ type: 'click' });

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    const errorBox = modal.element.querySelector('.admin-form-error-box');
    assert.equal(errorBox.textContent, expected, `Unexpected message for status ${error.status}`);

    modal.close();
  }
});

test('createAdminProductFormModal red-border-highlights the specific empty required field on client-side validation', () => {
  const modal = createAdminProductFormModal({ categories: [{ id: 'cat-1', name: 'Giyim' }] });

  const nameInput = modal.element.querySelector('#prod-modal-name');
  const brandInput = modal.element.querySelector('#prod-modal-brand');
  const skuInput = modal.element.querySelector('#prod-modal-sku');
  // Marka defaults to 'Genel' on a new product, so it starts valid; blank it
  // to check that only fields that are actually invalid get highlighted.
  brandInput.value = '';

  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  assert.ok(nameInput.classList.contains('admin-form-input--invalid'), 'Empty Ürün Adı must be highlighted');
  assert.equal(modal.element.querySelector('#prod-modal-name-error').textContent, 'Ürün adı zorunludur.');
  assert.ok(brandInput.classList.contains('admin-form-input--invalid'), 'Emptied Marka must be highlighted');
  assert.ok(skuInput.classList.contains('admin-form-input--invalid'), 'Empty SKU must be highlighted');

  // Fixing just the name must clear only that field's highlight, not the others.
  nameInput.value = 'Yeni Ürün';
  nameInput.dispatchEvent({ type: 'input' });
  assert.ok(!nameInput.classList.contains('admin-form-input--invalid'), 'Corrected Ürün Adı must drop its highlight immediately');
  assert.equal(modal.element.querySelector('#prod-modal-name-error').textContent, '');
  assert.ok(brandInput.classList.contains('admin-form-input--invalid'), 'Untouched Marka must remain highlighted');

  modal.close();
});

test('createAdminProductFormModal red-border-highlights the exact field named in a 400 backend validation error', async () => {
  const modal = createAdminProductFormModal({
    categories: [{ id: 'cat-1', name: 'Giyim' }],
    onSave: () => Promise.reject({
      status: 400,
      body: { errors: [{ field: 'StokKod', message: 'Bu stok kodu zaten kayıtlı.' }] },
    }),
  });

  fillValidProductForm(modal);
  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();

  const skuInput = modal.element.querySelector('#prod-modal-sku');
  const nameInput = modal.element.querySelector('#prod-modal-name');
  assert.ok(skuInput.classList.contains('admin-form-input--invalid'), 'SKU must be highlighted for a StokKod backend error');
  assert.equal(modal.element.querySelector('#prod-modal-sku-error').textContent, 'Bu stok kodu zaten kayıtlı.');
  assert.ok(!nameInput.classList.contains('admin-form-input--invalid'), 'Unrelated fields must not be marked invalid for a field-specific backend error');

  modal.close();
});

test('createAdminProductFormModal never marks fields invalid for a network/server error', async () => {
  const modal = createAdminProductFormModal({
    categories: [{ id: 'cat-1', name: 'Giyim' }],
    onSave: () => Promise.reject({ status: 500, message: 'Internal Server Error' }),
  });

  fillValidProductForm(modal);
  const submitBtn = modal.element.querySelectorAll('.admin-modal__footer button')[1];
  submitBtn.dispatchEvent({ type: 'click' });

  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();

  const anyFieldInvalid = [...modal.element.querySelectorAll('.admin-form-input')]
    .some((el) => el.classList.contains('admin-form-input--invalid'));
  assert.equal(anyFieldInvalid, false, 'A 500/network failure must only show the general error box, never highlight random fields');

  modal.close();
});

test('createAdminProductDetailModal renders multi-image gallery thumbnails and handles clicks', () => {
  const product = {
    id: 'p-multi',
    name: 'Multi Gallery Ceket',
    price: 950,
    imageUrl: 'https://example.com/img1.jpg',
    images: [
      { imageUrl: 'https://example.com/img1.jpg', isMain: true },
      { imageUrl: 'https://example.com/img2.jpg', isMain: false },
    ],
  };

  const modal = createAdminProductDetailModal({ product });
  const thumbs = modal.element.querySelectorAll('.admin-product-detail-modal__thumb-btn');
  assert.equal(thumbs.length, 2, 'Should render 2 thumbnail buttons');

  const mainImg = modal.element.querySelector('.admin-product-detail-modal__img');
  assert.equal(mainImg.src, 'https://example.com/img1.jpg');

  // Click on the second thumbnail to preview
  thumbs[1].dispatchEvent({ type: 'click' });
  assert.equal(mainImg.src, 'https://example.com/img2.jpg');

  modal.close();
});

test('AdminProductsPage auto-refreshes category list from categoryService when opening create modal', async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => [{ id: 'cat-fresh-99', kategoriAd: 'Taze Kategori', aktifMi: true }],
  });

  try {
    const { getCategories } = await import('../src/Frontend/ShopApp.Web/src/features/categories/services/categoryService.js');
    await getCategories();

    const page = AdminProductsPage({ products: [{ id: 'p1', name: 'Existing', price: 10 }] });
    const addBtn = page.element.querySelector('.admin-page-header__actions button');
    assert.ok(addBtn, 'Must find add product button in page header');
    addBtn.dispatchEvent({ type: 'click' });

    const modalOverlay = document.querySelector('.admin-modal-overlay');
    assert.ok(modalOverlay);
    const catSelect = modalOverlay.querySelector('#prod-modal-cat');
    assert.ok(catSelect);

    const options = Array.from(catSelect.options || catSelect.children).map((o) => o.textContent || o.value);
    assert.ok(options.some((txt) => txt.includes('Taze Kategori')), 'Newly added category must appear in modal category select');

    const closeBtn = modalOverlay.querySelector('.admin-modal__close');
    closeBtn && closeBtn.dispatchEvent({ type: 'click' });
    page.destroy();
  } finally {
    globalThis.fetch = oldFetch;
  }
});

