/**
 * AdminProductFormModal.js — Accessible Product Create/Edit Modal Component
 *
 * Implements interactive product form in a modal dialog (Option A).
 * Supports client-side image preview, field validation, and clean event emission.
 * Zero demo data, zero API/network calls.
 */

import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   product?: any,
 *   categories?: Array<{ id?: any, name?: string, ad?: string } | string>,
 *   onSave?: (data: any) => void,
 *   onClose?: () => void,
 * }} options
 * @returns {{ element: HTMLElement, close: () => void }}
 */
export function createAdminProductFormModal({
  product = null,
  categories = [],
  onSave,
  onClose,
} = {}) {
  const isEdit = !!product;
  const modalTitle = isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle';
  const saveLabel = isEdit ? 'Güncelle' : 'Kaydet';

  let previewUrl = product?.imageUrl || product?.gorselUrl || (Array.isArray(product?.images) ? product.images[0] : null) || null;
  let selectedFile = null;

  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', modalTitle);

  const modal = document.createElement('div');
  modal.className = 'admin-modal admin-product-modal';

  // 1. Header
  const header = document.createElement('div');
  header.className = 'admin-modal__header';

  const titleEl = document.createElement('h3');
  titleEl.className = 'admin-modal__title';
  titleEl.textContent = modalTitle;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'admin-modal__close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

  modal.appendChild(header);

  // 2. Body / Form
  const body = document.createElement('div');
  body.className = 'admin-modal__body admin-product-modal__body';

  const form = document.createElement('form');
  form.className = 'admin-product-modal__form';
  form.noValidate = true;

  // Error Summary Box
  const errorBox = document.createElement('div');
  errorBox.className = 'admin-form-error-box';
  errorBox.style.display = 'none';
  form.appendChild(errorBox);

  // Two-column container
  const formColumns = document.createElement('div');
  formColumns.className = 'admin-product-modal__columns';

  // ── LEFT COLUMN: Text inputs ──
  const leftCol = document.createElement('div');
  leftCol.className = 'admin-product-modal__col-main';

  // Name
  const nameGroup = document.createElement('div');
  nameGroup.className = 'admin-form-group';
  nameGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-name">Ürün Adı <span class="required">*</span></label>
    <input type="text" id="prod-modal-name" class="admin-form-input" placeholder="Örn: Pamuklu Gömlek" required />
    <span class="admin-form-error" id="prod-modal-name-error"></span>
  `;
  const nameInput = nameGroup.querySelector('#prod-modal-name');
  if (product) nameInput.value = product.name || product.ad || '';
  leftCol.appendChild(nameGroup);

  // SKU & Category Row
  const skuCatRow = document.createElement('div');
  skuCatRow.className = 'admin-form-row';

  // SKU
  const skuGroup = document.createElement('div');
  skuGroup.className = 'admin-form-group';
  skuGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-sku">SKU / Stok Kodu</label>
    <input type="text" id="prod-modal-sku" class="admin-form-input" placeholder="Örn: GML-001" />
  `;
  const skuInput = skuGroup.querySelector('#prod-modal-sku');
  if (product) skuInput.value = product.sku || product.barkod || product.kod || '';
  skuCatRow.appendChild(skuGroup);

  // Category — value MUST be the category's real Guid (Urun.KategoriId is a
  // foreign key; category names are never sent to the backend).
  const catGroup = document.createElement('div');
  catGroup.className = 'admin-form-group';
  catGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-cat">Kategori <span class="required">*</span></label>
    <select id="prod-modal-cat" class="admin-form-input" required>
      <option value="">Kategori Seçin</option>
    </select>
    <span class="admin-form-error" id="prod-modal-cat-error"></span>
  `;
  const catSelect = catGroup.querySelector('#prod-modal-cat');

  if (categories && categories.length > 0) {
    categories.forEach((cat) => {
      if (typeof cat === 'string') return;
      const id = cat.id ?? cat.kategoriId;
      if (!id) return;

      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = cat.name || cat.ad || `Kategori ${id}`;

      const currentCategory = product?.categoryId ?? product?.kategoriId ?? product?.category ?? product?.kategori;
      if (currentCategory && (String(currentCategory) === String(id) || String(currentCategory) === String(cat.name || cat.ad))) {
        opt.selected = true;
        catSelect.value = id;
      }
      catSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option');
    opt.value = '';
    opt.disabled = true;
    opt.textContent = 'Kayıtlı kategori bulunamadı';
    catSelect.appendChild(opt);
  }
  skuCatRow.appendChild(catGroup);
  leftCol.appendChild(skuCatRow);

  // Brand — required by CreateUrunCommand.MarkaAd
  const brandGroup = document.createElement('div');
  brandGroup.className = 'admin-form-group';
  brandGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-brand">Marka <span class="required">*</span></label>
    <input type="text" id="prod-modal-brand" class="admin-form-input" placeholder="Örn: Nike" required />
    <span class="admin-form-error" id="prod-modal-brand-error"></span>
  `;
  const brandInput = brandGroup.querySelector('#prod-modal-brand');
  brandInput.value = product?.brand || product?.marka || 'Genel';
  leftCol.appendChild(brandGroup);

  // Price & Stock Row
  const priceStockRow = document.createElement('div');
  priceStockRow.className = 'admin-form-row';

  // Price
  const priceGroup = document.createElement('div');
  priceGroup.className = 'admin-form-group';
  priceGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-price">Fiyat (TL) <span class="required">*</span></label>
    <input type="number" id="prod-modal-price" class="admin-form-input" placeholder="0.00" step="0.01" min="0" required />
    <span class="admin-form-error" id="prod-modal-price-error"></span>
  `;
  const priceInput = priceGroup.querySelector('#prod-modal-price');
  if (product && (product.price !== undefined || product.fiyat !== undefined)) {
    priceInput.value = product.price ?? product.fiyat;
  }
  priceStockRow.appendChild(priceGroup);

  // Stock
  const stockGroup = document.createElement('div');
  stockGroup.className = 'admin-form-group';
  stockGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-stock">Stok Miktarı <span class="required">*</span></label>
    <input type="number" id="prod-modal-stock" class="admin-form-input" placeholder="0" step="1" min="0" required />
    <span class="admin-form-error" id="prod-modal-stock-error"></span>
  `;
  const stockInput = stockGroup.querySelector('#prod-modal-stock');
  if (product && (product.stock !== undefined || product.stok !== undefined)) {
    stockInput.value = product.stock ?? product.stok;
  }
  priceStockRow.appendChild(stockGroup);

  leftCol.appendChild(priceStockRow);

  // Description
  const descGroup = document.createElement('div');
  descGroup.className = 'admin-form-group';
  descGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-desc">Ürün Açıklaması</label>
    <textarea id="prod-modal-desc" class="admin-form-input admin-form-textarea" rows="3" placeholder="Ürün detaylarını girin..."></textarea>
  `;
  const descInput = descGroup.querySelector('#prod-modal-desc');
  if (product) descInput.value = product.description || product.aciklama || '';
  leftCol.appendChild(descGroup);

  // Status (Active toggle)
  const statusGroup = document.createElement('div');
  statusGroup.className = 'admin-form-group admin-form-group--inline';
  statusGroup.innerHTML = `
    <label class="admin-form-checkbox-label">
      <input type="checkbox" id="prod-modal-active" class="admin-form-checkbox" />
      <span class="admin-form-checkbox-custom"></span>
      <span class="admin-form-label" style="margin:0; cursor:pointer;">Aktif (Satışa Açık)</span>
    </label>
  `;
  const activeInput = statusGroup.querySelector('#prod-modal-active');
  const currentActive = product ? (product.isActive !== undefined ? product.isActive : (product.aktiflik ?? true)) : true;
  activeInput.checked = !!currentActive;
  leftCol.appendChild(statusGroup);

  formColumns.appendChild(leftCol);

  // ── RIGHT COLUMN: Image Picker & Preview ──
  const rightCol = document.createElement('div');
  rightCol.className = 'admin-product-modal__col-side';

  const imgLabel = document.createElement('label');
  imgLabel.className = 'admin-form-label';
  imgLabel.textContent = 'Ürün Görseli';
  rightCol.appendChild(imgLabel);

  const dropzone = document.createElement('div');
  dropzone.className = 'admin-image-dropzone';

  const previewBox = document.createElement('div');
  previewBox.className = 'admin-image-dropzone__preview';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.id = 'prod-modal-file';
  fileInput.style.display = 'none';

  function updateImagePreview() {
    previewBox.innerHTML = '';
    if (previewUrl) {
      const img = document.createElement('img');
      img.src = previewUrl;
      img.alt = 'Görsel Önizleme';
      img.className = 'admin-image-dropzone__img';
      previewBox.appendChild(img);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'admin-image-dropzone__remove-btn';
      removeBtn.title = 'Görseli Kaldır';
      removeBtn.setAttribute('aria-label', 'Görseli kaldır');
      removeBtn.appendChild(createIcon('close', { size: 14 }));
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        previewUrl = null;
        selectedFile = null;
        fileInput.value = '';
        updateImagePreview();
      });
      previewBox.appendChild(removeBtn);
    } else {
      const icon = createIcon('image', { size: 36 });
      const prompt = document.createElement('div');
      prompt.className = 'admin-image-dropzone__prompt';
      prompt.innerHTML = `
        <span style="font-weight:var(--font-medium); font-size:var(--text-sm);">Görsel seçmek için tıklayın</span>
        <span style="font-size:var(--text-xs); color:var(--color-secondary);">PNG, JPG, WEBP (Max 5MB)</span>
      `;
      previewBox.appendChild(icon);
      previewBox.appendChild(prompt);
    }
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError('Lütfen geçerli bir görsel dosyası seçin.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showError('Görsel boyutu 5 MB\'dan küçük olmalıdır.');
        return;
      }
      selectedFile = file;
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (re) => {
          previewUrl = re.target?.result;
          updateImagePreview();
        };
        reader.readAsDataURL(file);
      } else {
        previewUrl = URL.createObjectURL ? URL.createObjectURL(file) : file.name;
        updateImagePreview();
      }
    }
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  dropzone.appendChild(previewBox);
  dropzone.appendChild(fileInput);
  rightCol.appendChild(dropzone);
  formColumns.appendChild(rightCol);

  form.appendChild(formColumns);
  body.appendChild(form);
  modal.appendChild(body);

  // 3. Footer
  const footer = document.createElement('div');
  footer.className = 'admin-modal__footer';

  const { element: cancelBtn } = createButton({
    label: 'İptal',
    variant: 'secondary',
    onClick: close,
  });
  footer.appendChild(cancelBtn);

  const { element: submitBtn } = createButton({
    label: saveLabel,
    variant: 'primary',
    onClick: handleSubmit,
  });
  footer.appendChild(submitBtn);

  modal.appendChild(footer);
  overlay.appendChild(modal);

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }

  function clearErrors() {
    errorBox.textContent = '';
    errorBox.style.display = 'none';
    const errorSpans = form.querySelectorAll('.admin-form-error');
    errorSpans.forEach((s) => { s.textContent = ''; });
  }

  function handleSubmit() {
    clearErrors();
    let hasError = false;

    const name = String(nameInput.value ?? '').trim();
    const sku = String(skuInput.value ?? '').trim();
    const categoryId = catSelect.value;
    const brand = String(brandInput.value ?? '').trim();
    const priceRaw = String(priceInput.value ?? '').trim();
    const stockRaw = String(stockInput.value ?? '').trim();
    const description = String(descInput.value ?? '').trim();
    const isActive = activeInput.checked;

    if (!name) {
      document.querySelector('#prod-modal-name-error') && (document.querySelector('#prod-modal-name-error').textContent = 'Ürün adı zorunludur.');
      hasError = true;
    }

    if (!categoryId) {
      document.querySelector('#prod-modal-cat-error') && (document.querySelector('#prod-modal-cat-error').textContent = 'Kategori seçimi zorunludur.');
      hasError = true;
    }

    if (!brand) {
      document.querySelector('#prod-modal-brand-error') && (document.querySelector('#prod-modal-brand-error').textContent = 'Marka zorunludur.');
      hasError = true;
    }

    if (!priceRaw || isNaN(Number(priceRaw)) || Number(priceRaw) < 0) {
      document.querySelector('#prod-modal-price-error') && (document.querySelector('#prod-modal-price-error').textContent = 'Geçerli bir fiyat giriniz (0 veya daha büyük).');
      hasError = true;
    }

    if (!stockRaw || isNaN(Number(stockRaw)) || Number(stockRaw) < 0) {
      document.querySelector('#prod-modal-stock-error') && (document.querySelector('#prod-modal-stock-error').textContent = 'Geçerli bir stok miktarı giriniz.');
      hasError = true;
    }

    if (hasError) {
      showError('Lütfen formdaki zorunlu alanları eksiksiz ve doğru doldurunuz.');
      return;
    }

    const selectedCategory = (categories || []).find((c) => {
      if (typeof c === 'string') return c === categoryId;
      return String(c.id ?? c.kategoriId) === String(categoryId) || (c.name || c.ad) === categoryId;
    });

    const categoryName = (typeof selectedCategory === 'string' ? selectedCategory : (selectedCategory?.name || selectedCategory?.ad)) || categoryId || null;

    const payload = {
      ...(product || {}),
      name,
      ad: name,
      sku: sku || null,
      categoryId,
      kategoriId: categoryId,
      category: categoryName,
      kategori: categoryName,
      brand,
      marka: brand,
      price: Number(priceRaw),
      fiyat: Number(priceRaw),
      // Stok takibi backend Urun modelinde henüz yok; yalnızca UI'da tutulur.
      stock: parseInt(stockRaw, 10),
      stok: parseInt(stockRaw, 10),
      description,
      aciklama: description,
      isActive,
      aktiflik: isActive,
      imageUrl: previewUrl,
      selectedImageFile: selectedFile,
    };

    if (typeof onSave === 'function') {
      onSave(payload);
    }
    close();
  }

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', handleKeydown);
    if (typeof onClose === 'function') onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  document.addEventListener('keydown', handleKeydown);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  updateImagePreview();

  return { element: overlay, close };
}
