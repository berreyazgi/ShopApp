/**
 * CategoryFormPanel.js — Category Create & Edit Form Panel
 *
 * Implements create mode and edit mode in the same component.
 *
 * Fields:
 *  - Kategori Adı (required)
 *  - Üst Kategori (dynamically populated from supplied categories + "Ana Kategori (Yok)")
 *  - Açıklama (with char counter)
 *  - Aktif (toggle switch)
 *
 * Actions:
 *  - İptal (resets form to create mode)
 *  - Kaydet (calls onSave with form payload — zero network calls)
 */

import { createButton } from '../../../shared/components/Button/Button.js';

/**
 * @param {{
 *   categories?: Array,
 *   selectedCategory?: any,
 *   onSave?: (data: { id?: any, name: string, parentId: any, description: string, isActive: boolean }) => void,
 *   onCancel?: () => void,
 * }} options
 * @returns {HTMLElement & { setCategory: (category: any) => void, reset: () => void }}
 */
export function createCategoryFormPanel({
  categories = [],
  selectedCategory = null,
  onSave,
  onCancel,
}) {
  const panel = document.createElement('div');
  panel.className = 'admin-card admin-category-form-panel';

  let currentCategory = selectedCategory;

  // Header
  const header = document.createElement('div');
  header.className = 'admin-card__header';
  const titleEl = document.createElement('h2');
  titleEl.className = 'admin-card__title';
  header.appendChild(titleEl);
  panel.appendChild(header);

  // Form Body
  const form = document.createElement('form');
  form.className = 'admin-card__body';
  form.noValidate = true;

  // 1. Kategori Adı
  const nameGroup = document.createElement('div');
  nameGroup.className = 'admin-form-group';
  nameGroup.innerHTML = `
    <label class="admin-form-label" for="category-name-input">Kategori Adı *</label>
    <input type="text" id="category-name-input" class="admin-form-input" placeholder="Örn. Giyim, Ayakkabı..." required />
  `;
  form.appendChild(nameGroup);
  const nameInput = nameGroup.querySelector('input');

  // 2. Üst Kategori
  const parentGroup = document.createElement('div');
  parentGroup.className = 'admin-form-group';
  parentGroup.innerHTML = `
    <label class="admin-form-label" for="category-parent-select">Üst Kategori</label>
    <select id="category-parent-select" class="admin-form-select">
      <option value="">Ana Kategori (Yok)</option>
    </select>
  `;
  form.appendChild(parentGroup);
  const parentSelect = parentGroup.querySelector('select');

  // 3. Açıklama
  const descGroup = document.createElement('div');
  descGroup.className = 'admin-form-group';
  descGroup.innerHTML = `
    <label class="admin-form-label" for="category-desc-textarea">Açıklama</label>
    <textarea id="category-desc-textarea" class="admin-form-textarea" placeholder="Kategori hakkında kısa bir açıklama..." maxlength="250"></textarea>
    <span class="admin-form-char-count">0 / 250</span>
  `;
  form.appendChild(descGroup);
  const descTextarea = descGroup.querySelector('textarea');
  const charCount = descGroup.querySelector('.admin-form-char-count');
  descTextarea.addEventListener('input', () => {
    charCount.textContent = `${descTextarea.value.length} / 250`;
  });

  // 4. Aktif Durum Toggle
  const toggleGroup = document.createElement('div');
  toggleGroup.className = 'admin-form-group';
  toggleGroup.innerHTML = `
    <div class="admin-toggle-wrap">
      <div>
        <div class="admin-form-label" style="margin-bottom: 2px;">Aktif Kategori</div>
        <div style="font-size: 11px; color: var(--color-secondary);">Bu kategori mağazada görünür olsun mu?</div>
      </div>
      <label class="admin-toggle-switch">
        <input type="checkbox" id="category-active-toggle" checked />
        <span class="admin-toggle-slider"></span>
      </label>
    </div>
  `;
  form.appendChild(toggleGroup);
  const activeToggle = toggleGroup.querySelector('input');

  // Form Actions (İptal / Kaydet)
  const actionsWrap = document.createElement('div');
  actionsWrap.className = 'admin-form-actions';

  const { element: cancelBtn } = createButton({
    label: 'İptal',
    variant: 'secondary',
    onClick: () => {
      resetForm();
      if (typeof onCancel === 'function') onCancel();
    },
  });
  actionsWrap.appendChild(cancelBtn);

  const { element: saveBtn } = createButton({
    label: 'Kaydet',
    variant: 'primary',
    type: 'submit',
  });
  actionsWrap.appendChild(saveBtn);

  form.appendChild(actionsWrap);
  panel.appendChild(form);

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      nameInput.style.borderColor = 'var(--color-danger)';
      return;
    }

    const payload = {
      id: currentCategory?.id ?? currentCategory?.kategoriId ?? null,
      name,
      parentId: parentSelect.value || null,
      description: descTextarea.value.trim(),
      isActive: activeToggle.checked,
    };

    if (typeof onSave === 'function') {
      onSave(payload);
    }
  });

  function populateParentOptions() {
    parentSelect.innerHTML = '<option value="">Ana Kategori (Yok)</option>';
    const currentId = currentCategory?.id ?? currentCategory?.kategoriId;

    categories.forEach((cat) => {
      const id = cat.id ?? cat.kategoriId;
      // Do not allow picking itself as parent
      if (currentId && String(id) === String(currentId)) return;

      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = cat.name || cat.ad || `Kategori #${id}`;
      parentSelect.appendChild(opt);
    });
  }

  function applyCategory(cat) {
    currentCategory = cat;
    populateParentOptions();

    if (cat) {
      titleEl.textContent = 'Kategori Düzenle';
      nameInput.value = cat.name || cat.ad || '';
      const parentId = cat.parentId ?? cat.parentCategoryId ?? cat.ustKategoriId ?? '';
      parentSelect.value = parentId ? String(parentId) : '';
      descTextarea.value = cat.description || cat.aciklama || '';
      charCount.textContent = `${descTextarea.value.length} / 250`;
      activeToggle.checked = cat.isActive !== undefined ? cat.isActive : (cat.aktiflik ?? true);
    } else {
      resetForm();
    }
  }

  function resetForm() {
    currentCategory = null;
    titleEl.textContent = 'Yeni Kategori Ekle';
    form.reset();
    nameInput.style.borderColor = '';
    charCount.textContent = '0 / 250';
    activeToggle.checked = true;
    populateParentOptions();
  }

  applyCategory(selectedCategory);

  panel.setCategory = applyCategory;
  panel.reset = resetForm;

  return panel;
}
