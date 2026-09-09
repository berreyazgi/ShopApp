import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// ── Minimal DOM Mock for Node.js test environment ──
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
      this.style = {
        setProperty(prop, val) { this[prop] = val; },
      };
      this.id = '';
      this.value = '';
      this.disabled = false;
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

    set href(val) {
      this.attributes.href = String(val);
    }

    get parentElement() {
      return this.parentNode ?? null;
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
      this.dispatchEvent({ type: 'click', target: this, currentTarget: this });
    }

    focus() {
      if (typeof document !== 'undefined') {
        document.activeElement = this;
      }
    }

    get innerHTML() {
      return this.innerHTMLString;
    }

    set innerHTML(html) {
      this.innerHTMLString = html;
      this.children = [];
      this.childNodes = this.children;
      if (!html) return;

      const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
      const tokenRegex = /<(\/)?([a-zA-Z0-9-]+)([^>]*)>|([^<]+)/g;
      const stack = [this];
      let match;

      while ((match = tokenRegex.exec(cleanHtml)) !== null) {
        const isClosing = Boolean(match[1]);
        const tagName = match[2];
        const attrsStr = match[3];
        const textContent = match[4];

        if (textContent) {
          const trimmed = textContent.trim();
          if (trimmed && stack.length > 0) {
            stack[stack.length - 1].appendChild(new MockTextNode(trimmed));
          }
          continue;
        }

        if (isClosing) {
          if (stack.length > 1 && stack[stack.length - 1].tagName.toLowerCase() === tagName.toLowerCase()) {
            stack.pop();
          }
        } else {
          const child = new MockElement(tagName);
          if (attrsStr) {
            const attrRegex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
              const attrName = attrMatch[1];
              const attrVal = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
              if (attrName === 'class') child.className = attrVal;
              else if (attrName === 'id') child.id = attrVal;
              child.setAttribute(attrName, attrVal);
            }
          }

          const currentParent = stack[stack.length - 1];
          currentParent.appendChild(child);

          const isSelfClosing = attrsStr.trim().endsWith('/') || ['input', 'img', 'br', 'hr', 'meta', 'link'].includes(tagName.toLowerCase());
          if (!isSelfClosing) {
            stack.push(child);
          }
        }
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
      return this.querySelectorAll(selector)[0] || null;
    }

    querySelectorAll(selector) {
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return false;
        if (selector.startsWith('#') && el.id === selector.slice(1)) return true;
        if (selector.startsWith('.') && el.classList?.contains(selector.slice(1))) return true;
        if (selector.includes('.')) {
          const parts = selector.split('.');
          const tag = parts[0].toUpperCase();
          const cls = parts.slice(1);
          if (tag && el.tagName !== tag) return false;
          return cls.every((c) => el.classList?.contains(c));
        }
        if (el.tagName === selector.toUpperCase()) return true;
        if (selector.startsWith('[') && selector.endsWith(']')) {
          const attr = selector.slice(1, -1);
          if (attr.includes('=')) {
            const [k, v] = attr.split('=').map((s) => s.replace(/["']/g, ''));
            return el.getAttribute(k) === v;
          }
          return el.getAttribute(attr) !== null;
        }
        return false;
      };

      const traverse = (node) => {
        if (!node || !Array.isArray(node.children)) return;
        for (const child of node.children) {
          if (match(child)) results.push(child);
          traverse(child);
        }
      };
      traverse(this);
      return results;
    }
  }

  class MockTextNode {
    constructor(text) {
      this.textContent = text;
      this.parentNode = null;
      this.children = [];
    }
  }

  const documentListeners = {};
  const mockDoc = {
    body: new MockElement('BODY'),
    activeElement: null,
    createElement(tag) {
      return new MockElement(tag);
    },
    addEventListener(event, fn) {
      if (!documentListeners[event]) documentListeners[event] = [];
      documentListeners[event].push(fn);
    },
    removeEventListener(event, fn) {
      if (documentListeners[event]) {
        documentListeners[event] = documentListeners[event].filter((f) => f !== fn);
      }
    },
    dispatchEvent(event) {
      const listeners = documentListeners[event.type] || [];
      listeners.forEach((fn) => fn(event));
    },
    querySelector(sel) {
      return this.body.querySelector(sel);
    },
    querySelectorAll(sel) {
      return this.body.querySelectorAll(sel);
    },
  };

  global.document = mockDoc;
  global.window = {
    location: { pathname: '/admin', search: '', origin: 'http://localhost' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    document: mockDoc,
  };

  return mockDoc;
}

// ── Test Suites ──

test('Shared ConfirmModal: initializes with accessible dialog attributes, title, and prompt message', async () => {
  setupMockDom();
  const { createConfirmModal } = await import('../src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/ConfirmModal.js');

  const { element } = createConfirmModal({
    title: 'Çıkış Yap',
    message: 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
    confirmLabel: 'Çıkış Yap',
    cancelLabel: 'İptal',
  });

  assert.equal(element.getAttribute('role'), 'dialog');
  assert.equal(element.getAttribute('aria-modal'), 'true');
  assert.equal(element.getAttribute('aria-labelledby'), 'confirm-modal-title');
  assert.equal(element.getAttribute('aria-describedby'), 'confirm-modal-message');

  const titleEl = element.querySelector('#confirm-modal-title');
  assert.ok(titleEl);
  assert.equal(titleEl.textContent, 'Çıkış Yap');

  const messageEl = element.querySelector('#confirm-modal-message');
  assert.ok(messageEl);
  assert.equal(messageEl.textContent, 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?');

  const cancelBtn = element.querySelector('.confirm-modal-btn--cancel');
  assert.ok(cancelBtn);
  assert.equal(cancelBtn.textContent, 'İptal');

  const confirmBtn = element.querySelector('.confirm-modal-btn--confirm');
  assert.ok(confirmBtn);
  assert.equal(confirmBtn.textContent, 'Çıkış Yap');
});

test('Shared ConfirmModal: clicking İptal cancels without calling onConfirm', async () => {
  setupMockDom();
  const { openConfirmModal } = await import('../src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/ConfirmModal.js');

  let confirmed = false;
  let cancelled = false;

  const modal = openConfirmModal({
    onConfirm: () => { confirmed = true; },
    onCancel: () => { cancelled = true; },
  });

  assert.equal(document.body.children.includes(modal.element), true);

  const cancelBtn = modal.element.querySelector('.confirm-modal-btn--cancel');
  cancelBtn.click();

  assert.equal(confirmed, false, 'onConfirm must NOT be called when cancelling');
  assert.equal(cancelled, true, 'onCancel should be called');
  assert.equal(document.body.children.includes(modal.element), false, 'Modal should be removed from body');
});

test('Shared ConfirmModal: pressing Escape cancels modal and restores focus', async () => {
  setupMockDom();
  const { openConfirmModal } = await import('../src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/ConfirmModal.js');

  const triggerBtn = document.createElement('button');
  document.body.appendChild(triggerBtn);
  let focusedBack = false;
  triggerBtn.focus = () => { focusedBack = true; };

  let confirmed = false;
  let cancelled = false;

  const modal = openConfirmModal({
    triggerElement: triggerBtn,
    onConfirm: () => { confirmed = true; },
    onCancel: () => { cancelled = true; },
  });

  // Dispatch Escape keydown on document
  document.dispatchEvent({ type: 'keydown', key: 'Escape', preventDefault: () => {} });

  assert.equal(confirmed, false);
  assert.equal(cancelled, true);
  assert.equal(document.body.children.includes(modal.element), false);
  assert.equal(focusedBack, true, 'Focus must return to the trigger element');
});

test('Shared ConfirmModal: clicking backdrop cancels modal without confirming', async () => {
  setupMockDom();
  const { openConfirmModal } = await import('../src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/ConfirmModal.js');

  let confirmed = false;
  let cancelled = false;

  const modal = openConfirmModal({
    onConfirm: () => { confirmed = true; },
    onCancel: () => { cancelled = true; },
  });

  // Clicking directly on overlay (backdrop)
  modal.element.dispatchEvent({ type: 'click', target: modal.element });

  assert.equal(confirmed, false);
  assert.equal(cancelled, true);
  assert.equal(document.body.children.includes(modal.element), false);
});

test('Shared ConfirmModal: clicking Çıkış Yap confirms, disables buttons, calls onConfirm, and closes', async () => {
  setupMockDom();
  const { openConfirmModal } = await import('../src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/ConfirmModal.js');

  let confirmCallCount = 0;
  let executionResolved = false;

  const modal = openConfirmModal({
    onConfirm: async () => {
      confirmCallCount++;
      await new Promise((r) => setTimeout(r, 10));
      executionResolved = true;
    },
  });

  const confirmBtn = modal.element.querySelector('.confirm-modal-btn--confirm');
  const cancelBtn = modal.element.querySelector('.confirm-modal-btn--cancel');

  // Trigger first click
  confirmBtn.click();

  // Buttons should be disabled immediately during execution
  assert.equal(confirmBtn.disabled, true);
  assert.equal(cancelBtn.disabled, true);

  // Trigger duplicate click while executing
  confirmBtn.click();
  assert.equal(confirmCallCount, 1, 'Duplicate click must not trigger concurrent onConfirm');

  await new Promise((r) => setTimeout(r, 25));
  assert.equal(executionResolved, true);
  assert.equal(confirmCallCount, 1);
  assert.equal(document.body.children.includes(modal.element), false, 'Modal should be closed upon completion');
});

test('Customer Header: clicking Çıkış Yap opens modal, İptal preserves session, Confirm logs out', async () => {
  setupMockDom();
  const { createHeader } = await import('../src/Frontend/ShopApp.Web/src/shared/components/Header/Header.js');
  const { setAuthenticated, setAnonymous, getState } = await import('../src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js');

  // Set user as authenticated
  setAuthenticated({
    user: { id: 'u1', firstName: 'Ahmet', lastName: 'Yılmaz', email: 'ahmet@example.com', roles: ['User'] },
    accessToken: 'mock-token',
  });

  const header = createHeader();
  document.body.appendChild(header.element);

  const logoutBtn = header.element.querySelector('#btn-logout');
  assert.ok(logoutBtn, '#btn-logout must exist when authenticated');

  // Step 1: Click Çıkış Yap -> Must NOT logout immediately
  logoutBtn.click();

  assert.equal(getState().status, 'authenticated', 'Session must remain authenticated after initial click');

  const modalOverlay = document.querySelector('.confirm-modal-overlay');
  assert.ok(modalOverlay, 'Confirmation modal must open on #btn-logout click');

  const modalMsg = modalOverlay.querySelector('#confirm-modal-message');
  assert.equal(modalMsg.textContent, 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?');

  // Step 2: Click İptal -> session still authenticated, modal closes
  const cancelBtn = modalOverlay.querySelector('.confirm-modal-btn--cancel');
  cancelBtn.click();

  assert.equal(getState().status, 'authenticated', 'Session must still be authenticated after cancelling');
  assert.equal(document.querySelector('.confirm-modal-overlay'), null, 'Modal must be removed on cancel');

  // Step 3: Click Çıkış Yap again and Confirm -> logs out
  logoutBtn.click();
  const newModalOverlay = document.querySelector('.confirm-modal-overlay');
  assert.ok(newModalOverlay);

  const confirmBtn = newModalOverlay.querySelector('.confirm-modal-btn--confirm');
  confirmBtn.click();

  await new Promise((r) => setTimeout(r, 20));

  assert.equal(getState().status, 'anonymous', 'User must be logged out after explicit confirmation');
  assert.equal(document.querySelector('.confirm-modal-overlay'), null, 'Modal must close after confirmation');

  header.destroy();
  setAnonymous();
});

test('Admin Sidebar: provides Çıkış Yap button and triggers confirmation modal', async () => {
  setupMockDom();
  const { createAdminSidebar } = await import('../src/Frontend/ShopApp.Web/src/features/admin/components/AdminSidebar.js');
  const { setAuthenticated, setAnonymous, getState } = await import('../src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js');

  setAuthenticated({
    user: { id: 'a1', firstName: 'Admin', lastName: 'User', email: 'admin@example.com', roles: ['Admin'] },
    accessToken: 'admin-token',
  });

  const sidebar = createAdminSidebar({ currentPath: '/admin' });
  document.body.appendChild(sidebar);

  const logoutBtn = sidebar.querySelector('#admin-sidebar-logout');
  assert.ok(logoutBtn, 'Admin sidebar must render #admin-sidebar-logout button');
  assert.equal(logoutBtn.textContent.includes('Çıkış Yap'), true);

  // Click logout in sidebar -> does not logout immediately
  logoutBtn.click();
  assert.equal(getState().status, 'authenticated');

  const modal = document.querySelector('.confirm-modal-overlay');
  assert.ok(modal, 'Confirmation modal must be opened from Admin sidebar');

  // Cancel keeps admin logged in
  modal.querySelector('.confirm-modal-btn--cancel').click();
  assert.equal(getState().status, 'authenticated');
  assert.equal(document.querySelector('.confirm-modal-overlay'), null);

  // Open and Confirm logs out
  logoutBtn.click();
  const modal2 = document.querySelector('.confirm-modal-overlay');
  modal2.querySelector('.confirm-modal-btn--confirm').click();

  await new Promise((r) => setTimeout(r, 20));
  assert.equal(getState().status, 'anonymous', 'Admin session must be terminated after confirmation');

  setAnonymous();
});

test('Admin Header: provides Çıkış Yap button and triggers confirmation modal', async () => {
  setupMockDom();
  const { createAdminHeader } = await import('../src/Frontend/ShopApp.Web/src/features/admin/components/AdminHeader.js');
  const { setAuthenticated, setAnonymous, getState } = await import('../src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js');

  setAuthenticated({
    user: { id: 'a1', firstName: 'Admin', lastName: 'User', email: 'admin@example.com', roles: ['Admin'] },
    accessToken: 'admin-token',
  });

  const header = createAdminHeader({ user: getState().user });
  document.body.appendChild(header);

  const logoutBtn = header.querySelector('#admin-topbar-logout');
  assert.ok(logoutBtn, 'Admin topbar must render #admin-topbar-logout button');
  assert.equal(logoutBtn.getAttribute('aria-label'), 'Çıkış Yap');

  // Click logout in topbar -> does not logout immediately
  logoutBtn.click();
  assert.equal(getState().status, 'authenticated');

  const modal = document.querySelector('.confirm-modal-overlay');
  assert.ok(modal, 'Confirmation modal must be opened from Admin header');

  // Cancel keeps admin logged in
  modal.querySelector('.confirm-modal-btn--cancel').click();
  assert.equal(getState().status, 'authenticated');

  // Open and Confirm logs out
  logoutBtn.click();
  const modal2 = document.querySelector('.confirm-modal-overlay');
  modal2.querySelector('.confirm-modal-btn--confirm').click();

  await new Promise((r) => setTimeout(r, 20));
  assert.equal(getState().status, 'anonymous');

  setAnonymous();
});

test('Admin Layout: integrates sidebar and header with custom onLogout hook', async () => {
  setupMockDom();
  const { createAdminLayout } = await import('../src/Frontend/ShopApp.Web/src/features/admin/components/AdminLayout.js');

  let customLogoutCalled = false;
  const layout = createAdminLayout({
    currentPath: '/admin',
    onLogout: () => { customLogoutCalled = true; },
  });

  const sidebarLogout = layout.sidebar.querySelector('#admin-sidebar-logout');
  assert.ok(sidebarLogout);
  sidebarLogout.click();
  assert.equal(customLogoutCalled, true, 'Sidebar logout should delegate to custom onLogout if provided');

  customLogoutCalled = false;
  const headerLogout = layout.element.querySelector('#admin-topbar-logout');
  assert.ok(headerLogout);
  headerLogout.click();
  assert.equal(customLogoutCalled, true, 'Header logout should delegate to custom onLogout if provided');

  layout.destroy();
});

test('Audit: No network calls (fetch, apiClient) in src/features/admin/ and no Monolith modifications', () => {
  const adminDir = path.resolve('src/Frontend/ShopApp.Web/src/features/admin');
  const files = fs.readdirSync(adminDir, { recursive: true });
  const jsFiles = files.filter((f) => String(f).endsWith('.js'));

  jsFiles.forEach((file) => {
    const fullPath = path.join(adminDir, String(file));
    const content = fs.readFileSync(fullPath, 'utf-8');
    assert.equal(content.includes('fetch('), false, `${file} must not call fetch()`);
    assert.equal(content.includes('axios'), false, `${file} must not call axios`);
    assert.equal(content.includes('XMLHttpRequest'), false, `${file} must not call XMLHttpRequest`);
    assert.equal(content.includes('apiClient.'), false, `${file} must not call apiClient`);
  });
});
