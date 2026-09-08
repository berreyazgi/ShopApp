import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { normalizeCategories, createCategoryMegaMenu } from '../src/Frontend/ShopApp.Web/src/shared/components/Header/CategoryMegaMenu.js';
import { resetCategories, addCategory, getCategories } from '../src/Frontend/ShopApp.Web/src/features/categories/services/categoryService.js';

// Minimal DOM mock for CategoryMegaMenu tests
function setupMockDom() {
  class MockElement {
    constructor(tagName) {
      this.tagName = tagName.toUpperCase();
      this.className = '';
      this.attributes = {};
      this.children = [];
      this.childNodes = this.children;
      this.textContentString = '';
      this.style = {
        setProperty(prop, val) { this[prop] = val; },
      };
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

    set innerHTML(val) {
      if (val === '') this.children = [];
    }
  }

  global.document = {
    createElement(tag) {
      return new MockElement(tag);
    },
  };
}

test('Header navbar structure: Kategoriler is the sole category nav item (no Kadın/Erkek in top navbar)', () => {
  const headerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/Frontend/ShopApp.Web/src/shared/components/Header/Header.js'),
    'utf-8'
  );

  // navItems definition
  assert.match(headerSource, /const navItems = \[/);
  assert.match(headerSource, /label:\s*['"]Kategoriler['"]/);
  assert.match(headerSource, /hasDropdown:\s*true/);
  assert.match(headerSource, /label:\s*['"]Hakkımızda['"]/);

  // Must NOT define Kadın, Erkek, Çocuk directly inside navItems
  const navItemsBlock = headerSource.match(/const navItems = \[[^\]]*\]/s)?.[0] || '';
  assert.doesNotMatch(navItemsBlock, /Kadın/, 'Kadın must NOT be in top navItems');
  assert.doesNotMatch(navItemsBlock, /Erkek/, 'Erkek must NOT be in top navItems');
  assert.doesNotMatch(navItemsBlock, /Çocuk/, 'Çocuk must NOT be in top navItems');
});

test('Header interaction: Hover (mouseenter/mouseleave debounce) and click listeners are wired', () => {
  const headerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/Frontend/ShopApp.Web/src/shared/components/Header/Header.js'),
    'utf-8'
  );

  // Hover handlers
  assert.match(headerSource, /dropdownItem\.addEventListener\(['"]mouseenter['"]/, 'Should have mouseenter listener');
  assert.match(headerSource, /dropdownItem\.addEventListener\(['"]mouseleave['"]/, 'Should have mouseleave listener');
  assert.match(headerSource, /hoverCloseTimer\s*=\s*setTimeout\(/, 'Should have debounce timer on mouseleave');

  // Click toggle
  assert.match(headerSource, /trigger\.addEventListener\(['"]click['"]/, 'Should have click listener for toggle');

  // Escape key and click outside
  assert.match(headerSource, /event\.key === ['"]Escape['"]/, 'Should close on Escape key');
  assert.match(headerSource, /document\.addEventListener\(['"]click['"]/, 'Should close on outside click');
  assert.match(headerSource, /returnFocus:\s*true/, 'Should return focus on Escape');

  // Popstate
  assert.match(headerSource, /window\.addEventListener\(['"]popstate['"]/, 'Should handle popstate');
  assert.match(headerSource, /if \(categoryDropdownOpen\) setCategoryDropdownOpen\(false\)/, 'Should close dropdown on SPA popstate');
});

test('Header.css includes hover hit-bridge to prevent gap flickering', () => {
  const cssSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/Frontend/ShopApp.Web/src/shared/components/Header/Header.css'),
    'utf-8'
  );

  assert.match(cssSource, /\.header-category-dropdown::before/, 'Should have ::before hit-bridge');
  assert.match(cssSource, /\.header-category-dropdown--mega/, 'Should have mega dropdown class');
});

test('normalizeCategories correctly transforms flat category collection with parentId / ustKategoriId', () => {
  const flatData = [
    { id: '1', name: 'Kadın', parentId: null },
    { id: '2', name: 'Erkek', ustKategoriId: null },
    { id: '3', name: 'Çocuk', parentId: null },
    { id: '11', name: 'Giyim', parentId: '1' },
    { id: '12', name: 'Ayakkabı', parentId: '1' },
    { id: '21', name: 'Spor', ustKategoriId: '2' },
    { id: '31', name: 'Aksesuar', parentId: '3' },
  ];

  const result = normalizeCategories(flatData);
  assert.equal(result.length, 3, 'Should group into 3 parent categories');

  const kadin = result.find((c) => c.name === 'Kadın');
  assert.ok(kadin);
  assert.equal(kadin.href, '/urunler/kadin');
  assert.equal(kadin.children.length, 2);
  assert.equal(kadin.children[0].name, 'Giyim');
  assert.equal(kadin.children[0].href, '/urunler/kadin/giyim');
  assert.equal(kadin.children[1].name, 'Ayakkabı');
  assert.equal(kadin.children[1].href, '/urunler/kadin/ayakkabi');

  const erkek = result.find((c) => c.name === 'Erkek');
  assert.ok(erkek);
  assert.equal(erkek.children.length, 1);
  assert.equal(erkek.children[0].name, 'Spor');

  const cocuk = result.find((c) => c.name === 'Çocuk');
  assert.ok(cocuk);
  assert.equal(cocuk.children.length, 1);
  assert.equal(cocuk.children[0].name, 'Aksesuar');
});

test('normalizeCategories supports arbitrary, dynamic children without hardcoding', () => {
  const customData = [
    {
      id: 'kadin',
      name: 'Kadın',
      children: [
        { name: 'Elbise', slug: 'elbise' },
        { name: 'Çanta', slug: 'canta' },
      ],
    },
    {
      id: 'erkek',
      name: 'Erkek',
      children: [
        { name: 'Gömlek', slug: 'gomlek' },
        { name: 'Pantolon', slug: 'pantolon' },
      ],
    },
    {
      id: 'cocuk',
      name: 'Çocuk',
      children: [
        { name: 'Kız Çocuk', slug: 'kiz-cocuk' },
        { name: 'Erkek Çocuk', slug: 'erkek-cocuk' },
      ],
    },
  ];

  const result = normalizeCategories(customData);
  assert.equal(result.length, 3);
  assert.deepEqual(result[0].children.map((c) => c.name), ['Elbise', 'Çanta']);
  assert.deepEqual(result[1].children.map((c) => c.name), ['Gömlek', 'Pantolon']);
  assert.deepEqual(result[2].children.map((c) => c.name), ['Kız Çocuk', 'Erkek Çocuk']);
});

test('CategoryMegaMenu renders parent columns, child items, and Tümünü Gör links', () => {
  setupMockDom();

  const testCategories = [
    {
      id: 'kadin',
      name: 'Kadın',
      children: [
        { id: '1', name: 'Giyim', href: '/urunler/kadin/giyim' },
        { id: '2', name: 'Spor', href: '/urunler/kadin/spor' },
      ],
    },
    {
      id: 'erkek',
      name: 'Erkek',
      children: [
        { id: '3', name: 'Giyim', href: '/urunler/erkek/giyim' },
      ],
    },
  ];

  const menu = createCategoryMegaMenu(testCategories);
  assert.ok(menu.element);

  const columns = menu.element.querySelectorAll('.category-mega-menu__column');
  assert.equal(columns.length, 2, 'Should render 2 columns');

  const viewAllLinks = menu.element.querySelectorAll('.category-mega-menu__view-all');
  assert.equal(viewAllLinks.length, 2, 'Each parent must have a Tümünü Gör link');
  assert.equal(viewAllLinks[0].href, '/urunler/kadin');
  assert.equal(viewAllLinks[1].href, '/urunler/erkek');
  assert.match(viewAllLinks[0].textContent, /Tümünü Gör/);

  menu.destroy();
});

test('CategoryMegaMenu renders truthful empty state when categories are empty', () => {
  setupMockDom();

  const menu = createCategoryMegaMenu([]);
  assert.ok(menu.element);

  const emptyNotice = menu.element.querySelector('.category-mega-menu__empty');
  assert.ok(emptyNotice, 'Should display empty state when categories are empty');
  assert.match(emptyNotice.textContent, /Henüz kategori bulunamadı/);

  menu.destroy();
});

test('Audit: Zero unauthorized fetch, axios, or XMLHttpRequest calls in Header or CategoryMegaMenu', () => {
  const headerCode = fs.readFileSync(
    path.resolve(process.cwd(), 'src/Frontend/ShopApp.Web/src/shared/components/Header/Header.js'),
    'utf-8'
  );
  const megaMenuCode = fs.readFileSync(
    path.resolve(process.cwd(), 'src/Frontend/ShopApp.Web/src/shared/components/Header/CategoryMegaMenu.js'),
    'utf-8'
  );

  assert.doesNotMatch(headerCode, /\bfetch\s*\(/);
  assert.doesNotMatch(headerCode, /\baxios\b/);
  assert.doesNotMatch(headerCode, /\bXMLHttpRequest\b/);

  assert.doesNotMatch(megaMenuCode, /\bfetch\s*\(/);
  assert.doesNotMatch(megaMenuCode, /\baxios\b/);
  assert.doesNotMatch(megaMenuCode, /\bXMLHttpRequest\b/);
});
