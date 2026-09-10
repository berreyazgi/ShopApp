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
      this.dataset = {};
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
        toggle: (c, force) => {
          if (typeof force === 'boolean') {
            if (force) {
              this.classList.add(c);
              return true;
            } else {
              this.classList.remove(c);
              return false;
            }
          }
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

    get innerHTML() {
      return this.innerHTMLString || this.children.map((c) => c.outerHTML || c.textContent).join('');
    }

    set innerHTML(html) {
      this.innerHTMLString = html;
      this.children = [];
    }

    get textContent() {
      if (this.children.length > 0) {
        return this.children.map((c) => c.textContent).join('');
      }
      return this.textContentString;
    }

    set textContent(text) {
      this.textContentString = String(text);
      this.children = [];
    }

    querySelector(selector) {
      return this.querySelectorAll(selector)[0] ?? null;
    }

    querySelectorAll(selector) {
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;

        if (selector.startsWith('.')) {
          const cls = selector.slice(1);
          if (el.className && el.className.split(/\s+/).includes(cls)) {
            results.push(el);
          }
        } else if (selector.startsWith('#')) {
          const id = selector.slice(1);
          if (el.id === id) {
            results.push(el);
          }
        } else if (selector.startsWith('[') && selector.endsWith(']')) {
          const inner = selector.slice(1, -1);
          const [attr, val] = inner.split('=');
          const cleanVal = val ? val.replace(/['"]/g, '') : null;
          if (attr.startsWith('data-')) {
            const dataKey = attr.slice(5);
            if (cleanVal !== null ? el.dataset[dataKey] === cleanVal : el.dataset[dataKey] !== undefined) {
              results.push(el);
            }
          } else if (cleanVal !== null ? el.getAttribute(attr) === cleanVal : el.getAttribute(attr) !== null) {
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

    scrollIntoView() {}
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
    addEventListener: () => {},
    removeEventListener: () => {},
    body: new MockElement('body'),
  };

  global.window = {
    location: { pathname: '/profil', origin: 'http://localhost:3000' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
  };
}

setupMockDom();

import { getInitials } from '../src/Frontend/ShopApp.Web/src/features/profile/components/ProfileSidebar.js';
import { getCityName } from '../src/Frontend/ShopApp.Web/src/features/profile/utils/cityUtils.js';
import { createProfileSidebar } from '../src/Frontend/ShopApp.Web/src/features/profile/components/ProfileSidebar.js';
import { createWelcomeBanner } from '../src/Frontend/ShopApp.Web/src/features/profile/components/WelcomeBanner.js';
import { createPersonalInfoCard } from '../src/Frontend/ShopApp.Web/src/features/profile/components/PersonalInfoCard.js';
import { createRecentOrdersCard } from '../src/Frontend/ShopApp.Web/src/features/profile/components/RecentOrdersCard.js';
import { createSavedAddressesCard } from '../src/Frontend/ShopApp.Web/src/features/profile/components/SavedAddressesCard.js';
import {
  createAddressModal,
  formatTurkishPhone,
} from '../src/Frontend/ShopApp.Web/src/features/profile/components/ProfileModals.js';

test('getInitials extracts uppercase initials or fallback', () => {
  assert.equal(getInitials('Berre', 'Yazgı'), 'BY');
  assert.equal(getInitials('Can', 'Demir'), 'CD');
  assert.equal(getInitials('Ahmet', ''), 'A');
  assert.equal(getInitials('', ''), 'U');
});

test('getCityName maps Turkish plate codes to city names', () => {
  assert.equal(getCityName(34), 'İstanbul');
  assert.equal(getCityName(6), 'Ankara');
  assert.equal(getCityName(35), 'İzmir');
  assert.equal(getCityName(16), 'Bursa');
  assert.equal(getCityName(999), 'Şehir #999');
});

test('createProfileSidebar renders dynamic initials avatar, customer name, and email', () => {
  const user = {
    id: 'user-1',
    musteriId: 'cust-1',
    firstName: 'Berre',
    lastName: 'Yazgı',
    fullName: 'Berre Yazgı',
    email: 'berre@example.com',
    phone: '+90 555 123 45 67',
    createdAt: '2025-01-10T12:00:00Z',
    avatarUrl: null,
  };

  const sidebar = createProfileSidebar({ user });
  assert.ok(sidebar);

  const nameEl = sidebar.querySelector('.profile-sidebar__name');
  assert.equal(nameEl.textContent, 'Berre Yazgı');

  const emailEl = sidebar.querySelector('.profile-sidebar__email');
  assert.equal(emailEl.textContent, 'berre@example.com');

  const initialsEl = sidebar.querySelector('.profile-sidebar__avatar-initials');
  assert.equal(initialsEl.textContent, 'BY');

  // Verify sidebar links: "Adres Bilgilerim" and "Sıkça Sorulan Sorular" should not exist
  const sidebarText = sidebar.textContent;
  assert.equal(sidebarText.includes('Adres Bilgilerim'), false, 'Adres Bilgilerim must be removed from sidebar');
  assert.equal(sidebarText.includes('Sıkça Sorulan Sorular'), false, 'Sıkça Sorulan Sorular must be removed from sidebar');
  assert.ok(sidebarText.includes('Hesabım'));
  assert.ok(sidebarText.includes('Siparişlerim'));
  assert.ok(sidebarText.includes('Bize Ulaşın'));
});

test('createWelcomeBanner greets customer by real first name', () => {
  const banner = createWelcomeBanner({ firstName: 'Berre' });
  const title = banner.querySelector('.profile-welcome-banner__title');
  assert.equal(title.textContent, 'Hoş Geldiniz, Berre');
});

test('createPersonalInfoCard renders personal info fields and triggers onEdit', () => {
  let editTriggered = false;
  const user = {
    id: 'user-1',
    musteriId: 'cust-1',
    firstName: 'Berre',
    lastName: 'Yazgı',
    fullName: 'Berre Yazgı',
    email: 'berre@example.com',
    phone: '+90 555 123 45 67',
    createdAt: '2025-01-15T00:00:00Z',
    avatarUrl: null,
  };

  const card = createPersonalInfoCard({
    user,
    onEdit: () => {
      editTriggered = true;
    },
  });

  const title = card.querySelector('.profile-card__title');
  assert.equal(title.textContent, 'Kişisel Bilgilerim');

  const editBtn = card.querySelector('.profile-btn--outline');
  editBtn.dispatchEvent({ type: 'click' });
  assert.equal(editTriggered, true);
});

test('createRecentOrdersCard renders up to 3 orders or clean empty state', () => {
  // 1. With orders
  const orders = [
    {
      id: 'ord-1',
      musteriId: 'cust-1',
      siparisNumarasi: '#SP1001',
      durumIsmi: 'Kargoda',
      araToplam: 500,
      indirimTutari: 0,
      kargoFiyat: 0,
      toplamFiyat: 500,
      olusturmaTarihi: '2026-09-01T10:00:00Z',
    },
    {
      id: 'ord-2',
      musteriId: 'cust-1',
      siparisNumarasi: '#SP1002',
      durumIsmi: 'Teslim Edildi',
      araToplam: 850,
      indirimTutari: 50,
      kargoFiyat: 0,
      toplamFiyat: 800,
      olusturmaTarihi: '2026-08-25T14:30:00Z',
    },
  ];

  const card = createRecentOrdersCard({ orders });
  const rows = card.querySelectorAll('.profile-order-row');
  assert.equal(rows.length, 2);

  // 2. Empty orders
  const emptyCard = createRecentOrdersCard({ orders: [] });
  const emptyTitle = emptyCard.querySelector('.profile-empty-state__title');
  assert.equal(emptyTitle.textContent, 'Henüz siparişiniz bulunmuyor.');
});

test('createSavedAddressesCard renders real address cards or clean empty state', () => {
  // 1. With addresses
  const addresses = [
    {
      id: 'addr-1',
      musteriId: 'cust-1',
      adresBilgisi: 'Atatürk Cad. No: 15 Kadıköy',
      ulke: 90,
      sehir: 34,
      ilce: 1,
      postaKodu: '34710',
      olusturmaTarihi: '2026-01-01T00:00:00Z',
      guncellemeTarihi: null,
    },
  ];

  const card = createSavedAddressesCard({
    addresses,
    onAddAddress: () => {},
    onEditAddress: () => {},
    onDeleteAddress: () => {},
  });

  const cards = card.querySelectorAll('.profile-address-card');
  assert.equal(cards.length, 1);
  const cardTitle = card.querySelector('.profile-address-card__title');
  assert.ok(cardTitle.textContent.includes('İstanbul (34710)'));

  // 2. Empty addresses
  const emptyCard = createSavedAddressesCard({
    addresses: [],
    onAddAddress: () => {},
    onEditAddress: () => {},
    onDeleteAddress: () => {},
  });
  const emptyTitle = emptyCard.querySelector('.profile-empty-state__title');
  assert.equal(emptyTitle.textContent, 'Henüz kayıtlı adresiniz bulunmuyor.');
});

test('Audit: QuickActionsCard.js has been removed and no orphaned references exist', () => {
  const profileDir = path.resolve('src/Frontend/ShopApp.Web/src/features/profile');
  const files = fs.readdirSync(profileDir, { recursive: true });

  const quickActionsExists = files.some((f) => String(f).includes('QuickActionsCard'));
  assert.equal(quickActionsExists, false, 'QuickActionsCard.js must not exist in profile directory');
});

test('Audit: No demo data files or demo fixtures exist in profile feature', () => {
  const profileDir = path.resolve('src/Frontend/ShopApp.Web/src/features/profile');
  const files = fs.readdirSync(profileDir, { recursive: true });

  const demoDataExists = files.some((f) => String(f).includes('profileDemoData'));
  assert.equal(demoDataExists, false, 'profileDemoData.js must not exist in profile directory');

  // Check no profile source files import demo data or reference hardcoded DEMO_
  const jsFiles = files.filter((f) => String(f).endsWith('.js'));
  jsFiles.forEach((file) => {
    const fullPath = path.join(profileDir, String(file));
    const content = fs.readFileSync(fullPath, 'utf-8');
    assert.equal(content.includes('profileDemoData'), false, `${file} must not reference profileDemoData`);
    assert.equal(content.includes('DEMO_'), false, `${file} must not reference DEMO_ constants`);
  });
});

test('formatTurkishPhone formats domestic 10 digits as (5XX) XXX XX XX', () => {
  assert.equal(formatTurkishPhone('5321234567'), '(532) 123 45 67');
  assert.equal(formatTurkishPhone('05321234567'), '(532) 123 45 67');
  assert.equal(formatTurkishPhone('+905321234567'), '(532) 123 45 67');
  assert.equal(formatTurkishPhone('532'), '(532');
  assert.equal(formatTurkishPhone('5321'), '(532) 1');
  assert.equal(formatTurkishPhone(''), '');
  assert.equal(formatTurkishPhone(null), '');
});

test('createAddressModal renders target rows with required phone input and without billing type', () => {
  const modal = createAddressModal({
    onSave: async () => {},
    onClose: () => {},
  });

  const overlay = modal.element;
  const container = overlay.querySelector('.profile-modal-container--address');
  assert.ok(container, 'Modal container must have .profile-modal-container--address modifier');

  const title = overlay.querySelector('.profile-modal-title');
  assert.equal(title.textContent, 'Yeni Adres Ekle');

  const closeBtn = overlay.querySelector('.profile-modal-close');
  assert.equal(closeBtn.getAttribute('aria-label'), 'Modalı kapat');

  const form = overlay.querySelector('.profile-form');
  assert.ok(form, 'Form should be rendered');

  // Row 1: Ad and Soyad in 2-col row
  const nameRow = form.querySelectorAll('.profile-form-row')[0];
  assert.ok(nameRow, 'Row 1 should use .profile-form-row');
  assert.ok(nameRow.querySelector('#profile-address-ad'), 'Ad input exists');
  assert.ok(nameRow.querySelector('#profile-address-soyad'), 'Soyad input exists');

  const phoneInput = form.querySelector('#profile-address-phone');
  assert.ok(phoneInput, 'Phone input exists');
  assert.equal(phoneInput.placeholder, '(5XX) XXX XX XX');
  assert.equal(phoneInput.required, true);
  assert.equal(form.querySelector('.profile-phone-prefix').textContent, '+90');
  assert.ok(form.querySelector('.profile-phone-group'), 'Phone input group exists');

  // Row 2: İl and İlçe in 2-col row
  const locationRow = form.querySelectorAll('.profile-form-row')[1];
  assert.ok(locationRow, 'Row 2 should use .profile-form-row');
  const citySelect = locationRow.querySelector('#citySelect');
  const districtSelect = locationRow.querySelector('#districtSelect');
  assert.ok(citySelect, 'City select exists');
  assert.ok(districtSelect, 'District select exists');
  assert.equal(districtSelect.disabled, true, 'District select starts disabled');

  // Row 3: Mahalle & Posta Kodu in 2-col row
  const areaRow = form.querySelectorAll('.profile-form-row')[2];
  assert.ok(areaRow, 'Row 3 should use .profile-form-row');
  const neighborhoodSelect = areaRow.querySelector('#neighborhoodSelect');
  assert.ok(neighborhoodSelect, 'Neighborhood select exists');
  assert.equal(neighborhoodSelect.disabled, true, 'Neighborhood select starts disabled');

  const postalInput = areaRow.querySelector('#profile-address-postal');
  assert.ok(postalInput, 'Postal code input exists');
  assert.equal(postalInput.placeholder, '34000');
  assert.equal(postalInput.maxLength, 5);

  // Row 4: Delivery Warning Box
  const warningBox = form.querySelector('.profile-address-warning');
  assert.ok(warningBox, 'Warning box exists');
  assert.ok(
    warningBox.textContent.includes('Kargonuzun size sorunsuz bir şekilde ulaşabilmesi için'),
    'Warning message content present'
  );

  // Row 5: Adres Textarea
  const addressTextarea = form.querySelector('#profile-address-line');
  assert.ok(addressTextarea, 'Address line textarea exists');
  assert.equal(addressTextarea.tagName, 'TEXTAREA');

  // Row 6: Adres Başlığı
  const titleInput = form.querySelector('#profile-address-title');
  assert.ok(titleInput, 'Address title input exists');

  // Fatura Türü must be removed
  assert.equal(form.querySelector('.profile-segmented-control'), null, 'Segmented billing control must not exist');
  assert.equal(form.querySelector('#profile-address-billing-label'), null, 'Billing label must not exist');

  // Footer: Full-width Kaydet button
  const saveBtn = form.querySelector('.profile-btn--full');
  assert.ok(saveBtn, 'Full-width save button exists');
  assert.equal(saveBtn.textContent, 'Kaydet');

  modal.destroy();
});

test('createAddressModal postal code input filters non-digits and restricts to 5 digits', () => {
  const modal = createAddressModal({
    onSave: async () => {},
    onClose: () => {},
  });

  const form = modal.element.querySelector('.profile-form');
  const postalInput = form.querySelector('#profile-address-postal');
  assert.ok(postalInput, 'Postal input exists');

  postalInput.value = '34abc00099';
  postalInput.dispatchEvent({ type: 'input' });
  assert.equal(postalInput.value, '34000');

  modal.destroy();
});

test('createAddressModal cascades and resets district and neighborhood upon city change', async () => {
  const sampleDistricts = [
    { id: 101, cityId: 34, name: 'Kadıköy' },
    { id: 102, cityId: 34, name: 'Beşiktaş' },
    { id: 201, cityId: 6, name: 'Çankaya' },
  ];
  const sampleNeighborhoods = [
    { id: 1001, districtId: 101, name: 'Moda' },
    { id: 1002, districtId: 101, name: 'Fenerbahçe' },
  ];

  const modal = createAddressModal({
    districts: sampleDistricts,
    neighborhoods: sampleNeighborhoods,
    onSave: async () => {},
    onClose: () => {},
  });

  const form = modal.element.querySelector('.profile-form');
  const citySelect = form.querySelector('#citySelect');
  const districtSelect = form.querySelector('#districtSelect');
  const neighborhoodSelect = form.querySelector('#neighborhoodSelect');

  // Select Istanbul (34)
  citySelect.value = '34';
  citySelect.dispatchEvent({ type: 'change' });

  assert.equal(districtSelect.disabled, false);
  const districtOptions = districtSelect.querySelectorAll('option');
  assert.equal(districtOptions.length, 3); // Default + Kadıköy + Beşiktaş

  // Select Kadıköy (101)
  districtSelect.value = '101';
  districtSelect.dispatchEvent({ type: 'change' });

  assert.equal(neighborhoodSelect.disabled, false);
  const neighborhoodOptions = neighborhoodSelect.querySelectorAll('option');
  assert.equal(neighborhoodOptions.length, 3); // Default + Moda + Fenerbahçe

  // Change city to Ankara (6) -> resets district and neighborhood
  citySelect.value = '6';
  citySelect.dispatchEvent({ type: 'change' });

  assert.equal(districtSelect.disabled, false);
  const ankaraDistricts = districtSelect.querySelectorAll('option');
  assert.equal(ankaraDistricts.length, 2); // Default + Çankaya
  assert.equal(neighborhoodSelect.disabled, true, 'Neighborhood should be reset & disabled');

  modal.destroy();
});

test('createAddressModal validates required fields and emits updated payload', async () => {
  let submittedPayload = null;
  let modalClosed = false;

  const modal = createAddressModal({
    cities: [{ id: 34, name: 'İstanbul' }],
    districts: [{ id: 101, cityId: 34, name: 'Kadıköy' }],
    neighborhoods: [{ id: 1001, districtId: 101, name: 'Moda' }],
    onSave: async (payload) => {
      submittedPayload = payload;
    },
    onClose: () => {
      modalClosed = true;
    },
  });

  const form = modal.element.querySelector('.profile-form');
  const errorAlert = form.querySelector('.profile-form-error');

  // 1. Submit empty -> validation error
  form.dispatchEvent({ type: 'submit', preventDefault: () => {} });
  assert.equal(errorAlert.style.display, 'block');
  assert.equal(submittedPayload, null);

  // 2. Fill fields with invalid postal code (< 5 digits)
  form.querySelector('#profile-address-ad').value = 'Berre';
  form.querySelector('#profile-address-soyad').value = 'Yazgı';
  form.querySelector('#citySelect').value = '34';
  form.querySelector('#citySelect').dispatchEvent({ type: 'change' });
  form.querySelector('#districtSelect').value = '101';
  form.querySelector('#districtSelect').dispatchEvent({ type: 'change' });
  form.querySelector('#neighborhoodSelect').value = '1001';
  form.querySelector('#profile-address-phone').value = '5321234567';
  form.querySelector('#profile-address-postal').value = '340';
  form.querySelector('#profile-address-line').value = 'Bağdat Cad. No: 42 D: 8';
  form.querySelector('#profile-address-title').value = 'Evim';

  await form.dispatchEvent({ type: 'submit', preventDefault: () => {} });
  assert.equal(errorAlert.style.display, 'block');
  assert.ok(errorAlert.textContent.includes('posta kodu'));
  assert.equal(submittedPayload, null);

  // 3. Fix postal code and submit
  form.querySelector('#profile-address-postal').value = '34710';
  await form.dispatchEvent({ type: 'submit', preventDefault: () => {} });

  assert.ok(submittedPayload, 'Payload should be emitted');
  assert.equal(submittedPayload.firstName, 'Berre');
  assert.equal(submittedPayload.lastName, 'Yazgı');
  assert.equal(submittedPayload.cityId, 34);
  assert.equal(submittedPayload.postalCode, '34710');
  assert.equal(submittedPayload.addressLine, 'Bağdat Cad. No: 42 D: 8');
  assert.equal(submittedPayload.addressTitle, 'Evim');

  // Phone is normalized while billing type remains absent.
  assert.equal(submittedPayload.phone, undefined);
  assert.equal(submittedPayload.phoneRaw, undefined);
  assert.equal(submittedPayload.telefon, '+905321234567');
  assert.equal(submittedPayload.billingType, undefined);
  assert.equal(submittedPayload.faturaTuru, undefined);

  // Compatibility fields for profileService & backend
  assert.equal(submittedPayload.sehir, 34);
  assert.equal(submittedPayload.postaKodu, 34710);
  assert.equal(submittedPayload.adresBilgisi, 'Bağdat Cad. No: 42 D: 8');
  assert.equal(submittedPayload.ad, 'Berre');
  assert.equal(submittedPayload.soyad, 'Yazgı');
  assert.equal(submittedPayload.adresBasligi, 'Evim');
  assert.equal(submittedPayload.ulke, 90);

  assert.equal(modalClosed, true, 'Modal should close on success');
  modal.destroy();
});

test('createAddressModal pre-populates in edit mode and shows Adresi Düzenle', () => {
  const existingAddress = {
    id: 'addr-42',
    firstName: 'Can',
    lastName: 'Demir',
    sehir: 35,
    telefon: '+905321234567',
    postaKodu: 35200,
    adresBilgisi: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No: 10',
    adresBasligi: 'İş Yeri',
  };

  const modal = createAddressModal({
    address: existingAddress,
    cities: [{ id: 35, name: 'İzmir' }],
    onSave: async () => {},
    onClose: () => {},
  });

  const overlay = modal.element;
  const title = overlay.querySelector('.profile-modal-title');
  assert.equal(title.textContent, 'Adresi Düzenle');

  const form = overlay.querySelector('.profile-form');
  assert.equal(form.querySelector('#profile-address-ad').value, 'Can');
  assert.equal(form.querySelector('#profile-address-soyad').value, 'Demir');
  assert.equal(form.querySelector('#citySelect').value, '35');
  assert.equal(form.querySelector('#profile-address-postal').value, '35200');
  assert.equal(form.querySelector('#profile-address-line').value, 'Alsancak Mah. Kıbrıs Şehitleri Cad. No: 10');
  assert.equal(form.querySelector('#profile-address-title').value, 'İş Yeri');

  assert.equal(form.querySelector('#profile-address-phone').value, '(532) 123 45 67');
  assert.equal(form.querySelector('.profile-segmented-control'), null);

  const saveBtn = form.querySelector('.profile-btn--full');
  assert.equal(saveBtn.textContent, 'Güncelle');

  modal.destroy();
});

test('Audit: No network calls (fetch, apiClient) or hardcoded fake districts exist in ProfileModals.js', () => {
  const modalPath = path.resolve('src/Frontend/ShopApp.Web/src/features/profile/components/ProfileModals.js');
  const content = fs.readFileSync(modalPath, 'utf-8');

  assert.equal(content.includes('fetch('), false, 'fetch() forbidden');
  assert.equal(content.includes('apiClient'), false, 'apiClient forbidden');
  assert.equal(content.includes('XMLHttpRequest'), false, 'XHR forbidden');
  assert.equal(content.includes('axios'), false, 'axios forbidden');
  assert.equal(content.includes('Kadıköy'), false, 'Hardcoded district forbidden');
  assert.equal(content.includes('Çankaya'), false, 'Hardcoded district forbidden');
});
