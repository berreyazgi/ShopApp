/**
 * CategoryFormPanel.js — Category Create & Edit Form Panel
 *
 * Implements create mode and edit mode in the same component.
 *
 * Fields:
 *  - Kategori Adı (required)
 *  - Üst Kategori (dynamically populated from supplied categories + "Ana Kategori (Yok)")
 *  - Açıklama (with char counter)
 *  - Görsel (local client-side image picker, preview, remove, validation: PNG/JPG <= 2MB)
 *  - Aktif (toggle switch)
 *
 * Actions:
 *  - İptal (resets form to create mode)
 *  - Kaydet (calls onSave with form payload — zero network calls)
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   categories?: Array,
 *   selectedCategory?: any,
 *   onSave?: (data: { id?: any, name: string, parentId: any, description: string, imageFile: File | null, isActive: boolean }) => void,
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
  let selectedFile = null;

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

  // 4. Görsel Yükleme & Önizleme
  const imageGroup = document.createElement('div');
  imageGroup.className = 'admin-form-group';
  imageGroup.innerHTML = `
    <label class="admin-form-label">Kategori Görseli</label>
    <div class="admin-image-upload">
      <input type="file" class="admin-image-upload__input" accept="image/png, image/jpeg, image/webp" aria-label="Görsel seç" />
      <div class="admin-image-upload__content">
        <span class="admin-image-upload__icon"></span>
        <span style="font-size: var(--text-xs); font-weight: var(--font-semibold);">Görsel seçin veya sürükleyin</span>
        <span class="admin-image-upload__hint">PNG, JPG, WEBP • Maks. 2MB</span>
      </div>
    </div>
    <div class="admin-image-preview" style="display: none; margin-top: var(--space-2);">
      <img src="" alt="Önizleme" />
      <button type="button" class="admin-image-preview__remove" aria-label="Görseli kaldır">✕</button>
    </div>
  `;
  imageGroup.querySelector('.admin-image-upload__icon').appendChild(createIcon('image', { size: 24 }));
  form.appendChild(imageGroup);

  const fileInput = imageGroup.querySelector('.admin-image-upload__input');
  const uploadBox = imageGroup.querySelector('.admin-image-upload');
  const previewBox = imageGroup.querySelector('.admin-image-preview');
  const previewImg = previewBox.querySelector('img');
  const removeImgBtn = previewBox.querySelector('.admin-image-preview__remove');

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Seçilen dosya boyutu 2MB üzerinde olamaz.');
      fileInput.value = '';
      return;
    }

    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      previewImg.src = loadEvt.target.result;
      previewBox.style.display = 'flex';
      uploadBox.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  removeImgBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    previewImg.src = '';
    previewBox.style.display = 'none';
    uploadBox.style.display = 'block';
  });

  // 5. Aktif Durum Toggle
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
      imageFile: selectedFile,
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

      const existingImg = cat.imageUrl || cat.gorselUrl;
      if (existingImg) {
        previewImg.src = existingImg;
        previewBox.style.display = 'flex';
        uploadBox.style.display = 'none';
      } else {
        previewBox.style.display = 'none';
        uploadBox.style.display = 'block';
      }
    } else {
      resetForm();
    }
  }

  function resetForm() {
    currentCategory = null;
    selectedFile = null;
    titleEl.textContent = 'Yeni Kategori Ekle';
    form.reset();
    nameInput.style.borderColor = '';
    charCount.textContent = '0 / 250';
    activeToggle.checked = true;
    previewBox.style.display = 'none';
    uploadBox.style.display = 'block';
    populateParentOptions();
  }

  applyCategory(selectedCategory);

  panel.setCategory = applyCategory;
  panel.reset = resetForm;

  return panel;
}
