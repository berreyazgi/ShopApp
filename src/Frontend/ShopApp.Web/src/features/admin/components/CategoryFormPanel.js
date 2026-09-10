/**
 * CategoryFormPanel.js — Category Create & Edit Form Panel
 *
 * Implements create mode and edit mode in the same component.
 *
 * Fields:
 *  - Kategori Adı (required)
 *  - Kategori Görseli (image dropzone — preview, replace, remove)
 *  - Üst Kategori (dynamically populated from supplied categories + "Ana Kategori (Yok)")
 *  - Açıklama (with char counter)
 *  - Aktif (toggle switch)
 *
 * Actions:
 *  - İptal (resets form to create mode)
 *  - Kaydet (calls onSave with form payload — zero network calls; the actual
 *    persistence, including File -> data URL conversion, happens in
 *    categoryService.addCategory()/updateCategory())
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * @param {{
 *   categories?: Array,
 *   selectedCategory?: any,
 *   onSave?: (data: { id?: any, name: string, parentId: any, description: string, isActive: boolean, imageFile: File|null, imageUrl: string|null }) => void,
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
  // The image actually selected to upload (null unless the admin just chose
  // a new file). currentImageUrl is what the preview shows right now — the
  // existing persisted image while editing, a live preview of a newly chosen
  // file, or null once explicitly removed. Both travel in the onSave payload
  // so categoryService never has to guess whether "no new file" means "keep
  // the existing image" or "clear it".
  let selectedImageFile = null;
  let currentImageUrl = null;

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

  // 2. Kategori Görseli
  const imageGroup = document.createElement('div');
  imageGroup.className = 'admin-form-group';
  imageGroup.innerHTML = `<label class="admin-form-label">Kategori Görseli</label>`;

  const imageError = document.createElement('span');
  imageError.className = 'admin-form-error';
  imageGroup.appendChild(imageError);

  const dropzone = document.createElement('div');
  dropzone.className = 'admin-image-dropzone';

  const imageFileInput = document.createElement('input');
  imageFileInput.type = 'file';
  imageFileInput.accept = 'image/*';
  imageFileInput.style.display = 'none';

  function renderImagePreview() {
    dropzone.innerHTML = '';
    imageError.textContent = '';

    if (currentImageUrl) {
      const preview = document.createElement('div');
      preview.className = 'admin-image-dropzone__preview';

      const img = document.createElement('img');
      img.className = 'admin-image-dropzone__img';
      img.src = currentImageUrl;
      img.alt = 'Kategori görseli önizlemesi';
      img.onerror = () => {
        currentImageUrl = null;
        selectedImageFile = null;
        renderImagePreview();
      };
      preview.appendChild(img);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'admin-image-dropzone__remove-btn';
      removeBtn.setAttribute('aria-label', 'Kategori görselini kaldır');
      removeBtn.title = 'Kaldır';
      removeBtn.appendChild(createIcon('close', { size: 14 }));
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedImageFile = null;
        currentImageUrl = null;
        imageFileInput.value = '';
        renderImagePreview();
      });
      preview.appendChild(removeBtn);

      dropzone.appendChild(preview);
    } else {
      const prompt = document.createElement('div');
      prompt.className = 'admin-image-dropzone__prompt';
      prompt.appendChild(createIcon('image', { size: 28 }));
      prompt.innerHTML += `
        <span style="font-weight:var(--font-medium); font-size:var(--text-sm);">Bilgisayardan görsel seçmek için tıklayın</span>
        <span style="font-size:11px; color:var(--color-secondary);">PNG, JPG, WEBP (Maks. 5MB)</span>
      `;
      dropzone.appendChild(prompt);
    }
  }

  imageFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      imageError.textContent = 'Lütfen geçerli bir görsel dosyası seçin.';
      imageFileInput.value = '';
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      imageError.textContent = "Görsel boyutu 5 MB'dan küçük olmalıdır.";
      imageFileInput.value = '';
      return;
    }

    selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = (re) => {
      currentImageUrl = re.target?.result;
      renderImagePreview();
    };
    reader.readAsDataURL(file);
  });

  dropzone.addEventListener('click', () => imageFileInput.click());

  renderImagePreview();
  imageGroup.appendChild(dropzone);
  imageGroup.appendChild(imageFileInput);
  form.appendChild(imageGroup);

  // 3. Üst Kategori
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

  // 4. Açıklama
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
      isActive: activeToggle.checked,
      // imageUrl always travels alongside imageFile, even when nothing
      // changed — otherwise an untouched image field would be indistinguishable
      // from an explicit removal once it reaches categoryService.
      imageFile: selectedImageFile,
      imageUrl: currentImageUrl,
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
      selectedImageFile = null;
      currentImageUrl = cat.imageUrl || cat.gorselUrl || null;
      imageFileInput.value = '';
      renderImagePreview();
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
    selectedImageFile = null;
    currentImageUrl = null;
    imageFileInput.value = '';
    renderImagePreview();
    populateParentOptions();
  }

  applyCategory(selectedCategory);

  panel.setCategory = applyCategory;
  panel.reset = resetForm;

  return panel;
}
