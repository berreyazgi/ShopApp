import test from 'node:test';
import assert from 'node:assert/strict';

import { routes } from '../src/Frontend/ShopApp.Web/src/app/routes.js';
import AboutPage from '../src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js';

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
      this.style = {};
    }

    get href() {
      return this.attributes.href ?? '';
    }

    set href(val) {
      this.attributes.href = String(val);
    }

    get src() {
      return this.attributes.src ?? '';
    }

    set src(val) {
      this.attributes.src = String(val);
    }

    get title() {
      return this.attributes.title ?? '';
    }

    set title(val) {
      this.attributes.title = String(val);
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
      const parts = selector.trim().split(/\s+/);
      if (parts.length > 1) {
        let current = [this];
        for (const part of parts) {
          const next = [];
          for (const el of current) {
            next.push(...el.querySelectorAll(part));
          }
          current = next;
        }
        return current;
      }

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
      return this.children.map((c) => c.textContent).join(' ').trim();
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
      this.children = [];
      if (val === '') {
        this.textContentString = '';
        return;
      }
      if (!/<[a-zA-Z0-9]+/.test(val)) {
        this.textContentString = val.trim();
        return;
      }
      this.parseMockHtml(val);
    }

    parseMockHtml(html) {
      const tokenRegex = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9-]+)([^>]*)>|([^<]+)/g;
      const stack = [this];
      const voidTags = new Set(['IMG', 'INPUT', 'BR', 'HR', 'META', 'LINK']);

      let match;
      while ((match = tokenRegex.exec(html)) !== null) {
        if (match[0].startsWith('<!--')) continue;

        if (match[4]) {
          const text = match[4].trim();
          if (text) {
            const current = stack[stack.length - 1];
            if (current.children.length === 0 && !current.textContentString) {
              current.textContentString = text;
            } else {
              const textNode = new MockElement('span');
              textNode.textContent = text;
              current.appendChild(textNode);
            }
          }
        } else if (match[2]) {
          const isClosing = Boolean(match[1]);
          const tagName = match[2].toUpperCase();
          const attrString = match[3] || '';

          if (isClosing) {
            for (let i = stack.length - 1; i > 0; i--) {
              if (stack[i].tagName === tagName) {
                stack.length = i;
                break;
              }
            }
          } else {
            const el = new MockElement(tagName);
            const classMatch = attrString.match(/class="([^"]*)"/);
            if (classMatch) el.className = classMatch[1];
            const hrefMatch = attrString.match(/href="([^"]*)"/);
            if (hrefMatch) el.href = hrefMatch[1];
            const srcMatch = attrString.match(/src="([^"]*)"/);
            if (srcMatch) el.src = srcMatch[1];
            const titleMatch = attrString.match(/title="([^"]*)"/);
            if (titleMatch) el.title = titleMatch[1];
            const altMatch = attrString.match(/alt="([^"]*)"/);
            if (altMatch) el.setAttribute('alt', altMatch[1]);
            const idMatch = attrString.match(/id="([^"]*)"/);
            if (idMatch) el.setAttribute('id', idMatch[1]);
            const loadingMatch = attrString.match(/loading="([^"]*)"/);
            if (loadingMatch) el.setAttribute('loading', loadingMatch[1]);
            const refMatch = attrString.match(/referrerpolicy="([^"]*)"/);
            if (refMatch) el.setAttribute('referrerpolicy', refMatch[1]);

            const current = stack[stack.length - 1];
            current.appendChild(el);

            const isSelfClosing = attrString.trim().endsWith('/') || voidTags.has(tagName);
            if (!isSelfClosing) {
              stack.push(el);
            }
          }
        }
      }
    }
  }

  global.document = {
    createElement(tag) {
      return new MockElement(tag);
    },
  };
}

test('Route /hakkimizda is registered in routes.js', async () => {
  const route = routes.find((r) => r.path === '/hakkimizda');
  assert.ok(route, 'Should have /hakkimizda route');
  assert.equal(route.title, 'Hakkımızda');

  const module = await route.page();
  assert.equal(typeof module.default, 'function', 'Should export a page component function');
});

test('AboutPage renders all required sections semantically', () => {
  setupMockDom();

  const page = AboutPage();
  assert.ok(page.element);
  assert.equal(page.element.className, 'about-page');

  // 1. Hero Section
  const heroHeading = page.element.querySelector('.about-hero__title');
  assert.ok(heroHeading, 'Hero heading must be present');
  assert.equal(heroHeading.textContent, 'Hakkımızda');

  const heroDesc = page.element.querySelector('.about-hero__desc');
  assert.ok(heroDesc, 'Hero description must be present');
  assert.match(heroDesc.textContent, /Modayı daha fazla insana ulaştırmak/);

  const heroCta = page.element.querySelector('.about-hero__cta');
  assert.ok(heroCta, 'Hero CTA must be present');
  assert.equal(heroCta.href, '/urunler');
  assert.match(heroCta.textContent, /Alışverişe Başla/);

  // 2. Boutique Story Section
  const storyTitle = page.element.querySelector('.about-section-title');
  assert.ok(storyTitle);
  assert.equal(storyTitle.textContent, 'Butiğimizin Hikâyesi');

  const storyImg = page.element.querySelector('.about-story__img');
  assert.ok(storyImg, 'Story image should be rendered');
  assert.ok(storyImg.getAttribute('alt'), 'Story image must have descriptive alt attribute');
  assert.equal(storyImg.getAttribute('loading'), 'lazy');

  // 3. Mission & Location Cards
  const missionTitle = page.element.querySelector('.about-card--mission .about-card__title');
  assert.ok(missionTitle, 'Mission card title must be present');
  assert.equal(missionTitle.textContent, 'Misyonumuz');

  const locationTitle = page.element.querySelector('.about-card--location .about-card__title');
  assert.ok(locationTitle, 'Location card title must be present');
  assert.equal(locationTitle.textContent, 'Konumumuz');

  const locationMeta = page.element.querySelector('.about-location-meta');
  assert.ok(locationMeta);
  assert.match(locationMeta.textContent, /Ankara, Türkiye/);

  // Google Maps iframe verification
  const mapIframe = page.element.querySelector('.about-map-iframe');
  assert.ok(mapIframe, 'Google Maps iframe must be rendered');
  assert.ok(mapIframe.title, 'iframe must have an accessible title');
  assert.match(mapIframe.title, /Ankara, Türkiye/);
  assert.match(mapIframe.src, /maps\.google\.com/);
  assert.match(mapIframe.src, /Ankara/);
  assert.equal(mapIframe.getAttribute('loading'), 'lazy');
  assert.equal(mapIframe.getAttribute('referrerpolicy'), 'no-referrer-when-downgrade');

  // 4. Boutique Features (3 cards)
  const featureCards = page.element.querySelectorAll('.about-feature-card');
  assert.equal(featureCards.length, 3, 'Should render exactly 3 boutique feature cards');

  const featureTitles = page.element.querySelectorAll('.about-feature-card__title').map((el) => el.textContent);
  assert.deepEqual(featureTitles, [
    'Özel Butik Ürünleri',
    'Türkiye Geneline Erişim',
    'Modern Alışveriş Deneyimi',
  ]);

  // 5. Reused Feature Benefits Banner
  const benefitsBanner = page.element.querySelector('.benefits-banner');
  assert.ok(benefitsBanner, 'Should mount the reused feature benefits banner');

  const benefitItems = page.element.querySelectorAll('.benefit-item');
  assert.equal(benefitItems.length, 4, 'Should contain 4 benefit items');

  // Destroy cleanup test
  page.destroy();
  assert.equal(page.element.children.length, 0);
});
