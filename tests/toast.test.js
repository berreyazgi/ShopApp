import test from 'node:test';
import assert from 'node:assert/strict';

// Minimal DOM mock — just enough for Toast.js (createElement/appendChild/
// classList/getElementById/setTimeout-driven dismiss), independent of the
// larger mock in adminPages.test.js so this file can run standalone.
function setupMockDom() {
  class MockElement {
    constructor(tag) {
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.attributes = {};
      this.eventListeners = {};
      this.style = {};
      this.className = '';
      this.textContentValue = '';
      this.hidden = false;
      this.parentNode = null;
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
        contains: (c) => this.className.split(/\s+/).filter(Boolean).includes(c),
      };
    }
    set textContent(v) { this.textContentValue = String(v); this.children = []; }
    get textContent() {
      return this.textContentValue || this.children.map((c) => c.textContent || '').join('');
    }
    set innerHTML(v) { this.textContentValue = ''; this.children = []; if (v === '') return; }
    appendChild(child) { this.children.push(child); child.parentNode = this; return child; }
    removeChild(child) {
      const i = this.children.indexOf(child);
      if (i !== -1) { this.children.splice(i, 1); child.parentNode = null; }
      return child;
    }
    remove() { if (this.parentNode) this.parentNode.removeChild(this); }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    addEventListener(event, fn) {
      (this.eventListeners[event] ??= []).push(fn);
    }
    removeEventListener(event, fn) {
      if (this.eventListeners[event]) this.eventListeners[event] = this.eventListeners[event].filter((f) => f !== fn);
    }
    dispatchEvent(event) {
      (this.eventListeners[event.type] || []).forEach((fn) => fn(event));
    }
    querySelector(selector) {
      const cls = selector.startsWith('.') ? selector.slice(1) : null;
      const stack = [...this.children];
      while (stack.length) {
        const el = stack.shift();
        if (cls && el.classList?.contains(cls)) return el;
        stack.push(...(el.children || []));
      }
      return null;
    }
  }

  global.document = {
    createElement: (tag) => new MockElement(tag),
    getElementById: (id) => global.document.body.children.find((c) => c.id === id) ?? null,
    body: new MockElement('body'),
  };
}

setupMockDom();

const { showToast } = await import('../src/Frontend/ShopApp.Web/src/shared/components/Toast/Toast.js');

test('showToast renders a success message into a toast host appended to document.body', () => {
  showToast({ type: 'success', message: 'Ürün başarıyla eklendi.', duration: 20 });

  const host = document.body.children.find((c) => c.id === 'shared-toast-host' || c.className === 'toast-host');
  assert.ok(host, 'A toast host must be appended to document.body');
  assert.ok(host.textContent.includes('Ürün başarıyla eklendi.'), 'The toast must render the given message');
});

test('showToast reuses the same host for multiple toasts instead of creating duplicates', () => {
  const hostsBefore = document.body.children.filter((c) => c.className === 'toast-host').length;
  showToast({ type: 'success', message: 'Ürün başarıyla güncellendi.', duration: 20 });
  showToast({ type: 'warning', message: 'Ürün oluşturuldu ancak özellik bilgileri kaydedilemedi.', duration: 20 });
  const hostsAfter = document.body.children.filter((c) => c.className === 'toast-host').length;
  assert.equal(hostsAfter, Math.max(hostsBefore, 1), 'Repeated calls must not create a second host element');
});

test('showToast does nothing (and does not throw) when called without a message', () => {
  assert.doesNotThrow(() => showToast({ type: 'success', message: '' }));
});
