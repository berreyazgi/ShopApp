import test from 'node:test';
import assert from 'node:assert/strict';

import { categories } from '../src/Frontend/ShopApp.Web/src/features/products/data/productData.js';
import { normalizeCategories, createCategoryMegaMenu } from '../src/Frontend/ShopApp.Web/src/shared/components/Header/CategoryMegaMenu.js';
import { createCategoryGrid } from '../src/Frontend/ShopApp.Web/src/features/products/components/CategoryCard.js';

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
      this.hidden = false;
      this.eventListeners = {};
    }

    get href() {
      return this.attributes.href ?? '';
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
      this.children.push(child);
      return child;
    }

    addEventListener(event, handler) {
      if (!this.eventListeners[event]) this.eventListeners[event] = [];
      this.eventListeners[event].push(handler);
    }

    removeEventListener(event, handler) {
      if (!this.eventListeners[event]) return;
      this.eventListeners[event] = this.eventListeners[event].filter((h) => h !== handler);
    }

    dispatchEvent(event) {
      const handlers = this.eventListeners[event.type] || [];
      handlers.forEach((h) => h(event));
    }

    querySelector(selector) {
      return this.querySelectorAll(selector)[0] ?? null;
    }

    querySelectorAll(selector) {
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;
        if (selector.startsWith('.') && el.className.split(' ').includes(selector.slice(1))) {
          results.push(el);
        } else if (selector.startsWith('#') && el.attributes.id === selector.slice(1)) {
          results.push(el);
        } else if (selector.toUpperCase() === el.tagName) {
          results.push(el);
        } else if (selector.includes('[href]')) {
          if (el.attributes.href != null) results.push(el);
        }
        (el.children || []).forEach(match);
      };
      (this.children || []).forEach(match);
      return results;
    }

    closest(selector) {
      if (selector.includes('a[href]') && this.attributes.href != null) return this;
      return null;
    }

    get textContent() {
      if (this.children.length === 0) return this.textContentString;
      return this.children.map((c) => c.textContent).join('');
    }

    set textContent(val) {
      this.children = [];
      this.textContentString = String(val);
    }

    get innerHTML() {
      return this.innerHTMLString;
    }

    set innerHTML(val) {
      this.innerHTMLString = val;
      if (val === '') this.children = [];
    }
  }

  global.document = {
    createElement(tag) {
      return new MockElement(tag);
    },
  };
}

test('Category fixture data matches expected hierarchy', () => {
  assert.equal(categories.length, 3, 'Should have exactly 3 parent categories');

  const parentNames = categories.map((c) => c.name);
  assert.deepEqual(parentNames, ['Kadın', 'Erkek', 'Çocuk'], 'Parents should be Kadın, Erkek, Çocuk');

  const expectedChildren = ['Giyim', 'Spor', 'Aksesuar', 'Ayakkabı'];

  for (const parent of categories) {
    const childNames = (parent.children || []).map((c) => c.name);
    assert.deepEqual(
      childNames,
      expectedChildren,
      `Parent "${parent.name}" should contain Giyim, Spor, Aksesuar, Ayakkabı in order`
    );
    assert.ok(parent.href, `Parent "${parent.name}" should have href`);
    assert.ok(Array.isArray(parent.subcategories), 'Should provide backwards-compatible subcategories alias');
  }
});

test('normalizeCategories correctly handles both children and subcategories', () => {
  const rawWithChildren = [
    {
      name: 'Kadın',
      slug: 'kadin',
      children: [
        { name: 'Giyim', slug: 'giyim' },
        { name: 'Spor', slug: 'spor' },
      ],
    },
  ];

  const normalized1 = normalizeCategories(rawWithChildren);
  assert.equal(normalized1[0].name, 'Kadın');
  assert.equal(normalized1[0].href, '/urunler/kadin');
  assert.equal(normalized1[0].children.length, 2);
  assert.equal(normalized1[0].children[0].name, 'Giyim');
  assert.equal(normalized1[0].children[0].href, '/urunler/kadin/giyim');

  const rawWithSubcategories = [
    {
      name: 'Erkek',
      slug: 'erkek',
      subcategories: [
        { name: 'Ayakkabı', slug: 'ayakkabi' },
      ],
    },
  ];

  const normalized2 = normalizeCategories(rawWithSubcategories);
  assert.equal(normalized2[0].name, 'Erkek');
  assert.equal(normalized2[0].children.length, 1);
  assert.equal(normalized2[0].children[0].name, 'Ayakkabı');
  assert.equal(normalized2[0].children[0].href, '/urunler/erkek/ayakkabi');
});

test('createCategoryMegaMenu builds proper presentation DOM', () => {
  setupMockDom();

  const megaMenu = createCategoryMegaMenu(categories);
  assert.ok(megaMenu.element);
  assert.equal(megaMenu.element.className, 'category-mega-menu');
  assert.equal(megaMenu.element.getAttribute('role'), 'region');

  // Check columns
  const columns = megaMenu.element.querySelectorAll('.category-mega-menu__column');
  assert.equal(columns.length, 3, 'Should render 3 columns for Kadın, Erkek, Çocuk');

  // Check parent titles
  const parentLinks = megaMenu.element.querySelectorAll('.category-mega-menu__parent-link');
  assert.equal(parentLinks.length, 3);
  assert.match(parentLinks[0].textContent, /Kadın/);
  assert.match(parentLinks[1].textContent, /Erkek/);
  assert.match(parentLinks[2].textContent, /Çocuk/);

  // Check child links (3 parents * 4 children = 12 child links)
  const childLinks = megaMenu.element.querySelectorAll('.category-mega-menu__child-link');
  assert.equal(childLinks.length, 12, 'Should have 12 child category links');

  // Check "Tümünü Gör" links (3 footer links)
  const viewAllLinks = megaMenu.element.querySelectorAll('.category-mega-menu__view-all');
  assert.equal(viewAllLinks.length, 3, 'Each parent should have a "Tümünü Gör" link');
  assert.match(viewAllLinks[0].textContent, /Tümünü Gör/);

  // Test update()
  megaMenu.update([
    {
      name: 'Özel Koleksiyon',
      slug: 'ozel',
      children: [{ name: 'Yeni', slug: 'yeni' }],
    },
  ]);
  const updatedCols = megaMenu.element.querySelectorAll('.category-mega-menu__column');
  assert.equal(updatedCols.length, 1);

  // Test destroy()
  megaMenu.destroy();
  assert.equal(megaMenu.element.children.length, 0);
});

test('createCategoryMegaMenu navigates via callback', () => {
  setupMockDom();

  let navigatedHref = null;
  const megaMenu = createCategoryMegaMenu(categories, {
    onNavigate: (href) => {
      navigatedHref = href;
    },
  });

  const childLinks = megaMenu.element.querySelectorAll('.category-mega-menu__child-link');
  assert.ok(childLinks.length > 0);

  // Simulate click on child link
  megaMenu.element.dispatchEvent({
    type: 'click',
    target: childLinks[0],
  });

  assert.equal(navigatedHref, '/urunler/kadin/giyim');
  megaMenu.destroy();
});

test('Non-regression: createCategoryGrid still renders with updated categories', () => {
  setupMockDom();

  const grid = createCategoryGrid(categories);
  assert.ok(grid);
  assert.equal(grid.className, 'cat-grid');
  assert.equal(grid.children.length, 3);

  const cardNames = grid.querySelectorAll('.cat-card__name');
  assert.equal(cardNames.length, 3);
  assert.equal(cardNames[0].textContent, 'Kadın');
  assert.equal(cardNames[1].textContent, 'Erkek');
  assert.equal(cardNames[2].textContent, 'Çocuk');
});

