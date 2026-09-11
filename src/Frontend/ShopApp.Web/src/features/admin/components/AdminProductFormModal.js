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

  let imageList = [];
  if (Array.isArray(product?.images) && product.images.length > 0) {
    imageList = product.images.map((img, i) => {
      const url = typeof img === 'string' ? img : (img.imageUrl || img.gorselUrl || img.url || '');
      const isMain = typeof img === 'object' ? !!(img.isMain || img.anaGorselMi) : i === 0;
      return { url, isMain };
    });
  } else if (Array.isArray(product?.imageUrls) && product.imageUrls.length > 0) {
    imageList = product.imageUrls.map((url, i) => ({ url, isMain: i === 0 }));
  } else {
    const singleUrl = product?.imageUrl || product?.gorselUrl || null;
    if (singleUrl) {
      imageList = [{ url: singleUrl, isMain: true }];
    }
  }

  if (imageList.length > 0 && !imageList.some((img) => img.isMain)) {
    imageList[0].isMain = true;
  }
  if (imageList.length === 0) {
    imageList = [{ url: '', isMain: true }];
  }

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

  // SKU — maps 1:1 to UrunVaryant.StokKod, which the backend requires (non-empty).
  const skuGroup = document.createElement('div');
  skuGroup.className = 'admin-form-group';
  skuGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-sku">SKU / Stok Kodu <span class="required">*</span></label>
    <input type="text" id="prod-modal-sku" class="admin-form-input" placeholder="Örn: GML-001" required />
    <span class="admin-form-error" id="prod-modal-sku-error"></span>
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

  const variantOptionsRow = document.createElement('div');
  variantOptionsRow.className = 'admin-form-row';
  variantOptionsRow.innerHTML = `
    <div class="admin-form-group">
      <label class="admin-form-label" for="prod-modal-beden">Beden</label>
      <input type="text" id="prod-modal-beden" class="admin-form-input" maxlength="50" placeholder="Örn: M" />
    </div>
    <div class="admin-form-group">
      <label class="admin-form-label" for="prod-modal-renk">Renk</label>
      <input type="text" id="prod-modal-renk" class="admin-form-input" maxlength="100" placeholder="Örn: Siyah" />
    </div>
  `;
  const bedenInput = variantOptionsRow.querySelector('#prod-modal-beden');
  const renkInput = variantOptionsRow.querySelector('#prod-modal-renk');
  bedenInput.value = product?.variantBeden ?? '';
  renkInput.value = product?.variantRenk ?? '';
  leftCol.appendChild(variantOptionsRow);

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

  const attributesGroup = document.createElement('div');
  attributesGroup.className = 'admin-form-group';
  attributesGroup.innerHTML = `
    <label class="admin-form-label" for="prod-modal-attributes">Ürün Özellikleri</label>
    <textarea id="prod-modal-attributes" class="admin-form-input admin-form-textarea" rows="4" placeholder="Her satır: Özellik Adı: Değer\nÖrn: Kumaş: %100 Pamuk"></textarea>
  `;
  const attributesInput = attributesGroup.querySelector('#prod-modal-attributes');
  attributesInput.value = (product?.attributes ?? [])
    .map((attribute) => `${attribute.name}: ${attribute.value}`)
    .join('\n');
  leftCol.appendChild(attributesGroup);

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

  // ── RIGHT COLUMN: Multi-Image Picker & Manager ──
  const rightCol = document.createElement('div');
  rightCol.className = 'admin-product-modal__col-side';

  const imgLabel = document.createElement('label');
  imgLabel.className = 'admin-form-label';
  imgLabel.textContent = 'Ürün Görselleri';
  rightCol.appendChild(imgLabel);

  const imagesContainer = document.createElement('div');
  imagesContainer.className = 'admin-product-images-container';

  const imagesListEl = document.createElement('div');
  imagesListEl.className = 'admin-product-images-list';
  imagesContainer.appendChild(imagesListEl);

  function renderImageList() {
    imagesListEl.innerHTML = '';
    imageList.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'admin-product-image-row';

      const thumb = document.createElement('div');
      thumb.className = 'admin-product-image-thumb';
      if (item.url) {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = 'Görsel';
        img.onerror = () => {
          thumb.innerHTML = '';
          thumb.appendChild(createIcon('image', { size: 18 }));
        };
        thumb.appendChild(img);
      } else {
        thumb.appendChild(createIcon('image', { size: 18 }));
      }
      row.appendChild(thumb);

      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.className = 'admin-form-input admin-product-image-input';
      urlInput.placeholder = 'Görsel URL veya dosya yükleyin';
      urlInput.value = item.url || '';
      urlInput.addEventListener('input', () => {
        item.url = urlInput.value.trim();
        thumb.innerHTML = '';
        if (item.url) {
          const img = document.createElement('img');
          img.src = item.url;
          img.alt = 'Görsel';
          img.onerror = () => {
            thumb.innerHTML = '';
            thumb.appendChild(createIcon('image', { size: 18 }));
          };
          thumb.appendChild(img);
        } else {
          thumb.appendChild(createIcon('image', { size: 18 }));
        }
      });
      row.appendChild(urlInput);

      const mainBtn = document.createElement('button');
      mainBtn.type = 'button';
      mainBtn.className = `admin-img-main-btn ${item.isMain ? 'admin-img-main-btn--active' : ''}`;
      mainBtn.textContent = item.isMain ? '★ Ana Görsel' : '☆ Ana Yap';
      mainBtn.title = item.isMain ? 'Varsayılan kapak görseli' : 'Bu görseli ana görsel yap';
      mainBtn.addEventListener('click', (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        imageList.forEach((img, idx) => {
          img.isMain = idx === index;
        });
        renderImageList();
      });
      row.appendChild(mainBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'admin-img-delete-btn';
      deleteBtn.title = 'Kaldır';
      deleteBtn.setAttribute('aria-label', 'Görseli kaldır');
      deleteBtn.appendChild(createIcon('close', { size: 14 }));
      deleteBtn.addEventListener('click', (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        if (imageList.length > 1) {
          const wasMain = item.isMain;
          imageList.splice(index, 1);
          if (wasMain && imageList.length > 0) {
            imageList[0].isMain = true;
          }
        } else {
          imageList[0] = { url: '', isMain: true };
        }
        renderImageList();
      });
      row.appendChild(deleteBtn);

      imagesListEl.appendChild(row);
    });
  }

  const addImageBtn = document.createElement('button');
  addImageBtn.type = 'button';
  addImageBtn.id = 'prod-modal-add-image';
  addImageBtn.className = 'admin-btn-add-image';
  addImageBtn.textContent = '+ Yeni Görsel Ekle';
  addImageBtn.addEventListener('click', (e) => {
    e?.preventDefault?.();
    imageList.push({ url: '', isMain: imageList.length === 0 });
    renderImageList();
    const inputs = imagesListEl.querySelectorAll('.admin-product-image-input');
    if (inputs.length > 0) {
      inputs[inputs.length - 1].focus();
    }
  });
  imagesContainer.appendChild(addImageBtn);
  rightCol.appendChild(imagesContainer);

  // Compact dropzone for local file upload
  const dropzone = document.createElement('div');
  dropzone.className = 'admin-image-dropzone admin-image-dropzone--compact';

  const previewBox = document.createElement('div');
  previewBox.className = 'admin-image-dropzone__prompt';
  previewBox.innerHTML = `
    <span style="font-weight:var(--font-medium); font-size:var(--text-xs);">Bilgisayardan dosya seçmek için tıklayın</span>
    <span style="font-size:10px; color:var(--color-secondary);">PNG, JPG, WEBP (Max 5MB)</span>
  `;
  dropzone.appendChild(previewBox);

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.id = 'prod-modal-file';
  fileInput.style.display = 'none';

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
      const applyUrl = (dataUrl) => {
        const emptyIdx = imageList.findIndex((item) => !item.url);
        if (emptyIdx >= 0) {
          imageList[emptyIdx].url = dataUrl;
        } else {
          imageList.push({
            url: dataUrl,
            isMain: imageList.length === 0 || !imageList.some((img) => img.url),
          });
        }
        renderImageList();
      };

      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (re) => {
          applyUrl(re.target?.result);
        };
        reader.readAsDataURL(file);
      } else {
        const blobUrl = URL.createObjectURL ? URL.createObjectURL(file) : file.name;
        applyUrl(blobUrl);
      }
    }
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

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
    const variantBeden = String(bedenInput.value ?? '').trim() || null;
    const variantRenk = String(renkInput.value ?? '').trim() || null;
    const description = String(descInput.value ?? '').trim();
    const attributes = String(attributesInput.value ?? '').split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, order) => {
        const separator = line.indexOf(':');
        return separator > 0
          ? { name: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim(), order }
          : { name: line, value: '', order };
      });
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

    if (!sku) {
      document.querySelector('#prod-modal-sku-error') && (document.querySelector('#prod-modal-sku-error').textContent = 'SKU / Stok Kodu zorunludur.');
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

    const validImages = imageList.filter((item) => item.url && item.url.trim() !== '');
    const mainItem = imageList.find((img) => img.isMain && img.url && img.url.trim()) ||
                     validImages[0] ||
                     null;
    const mainUrl = mainItem ? mainItem.url.trim() : null;
    const imageUrls = validImages.map((img) => img.url.trim());
    const images = validImages.map((img, idx) => ({
      url: img.url.trim(),
      isMain: mainItem ? img.url.trim() === mainItem.url.trim() : idx === 0,
      displayOrder: idx,
    }));

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
      // Persisted on UrunVaryant (SKU/stock live on the product's variant, not on
      // Urun itself) — see productsService.js persistVariant(). urunVaryantId,
      // variantAd, variantFiyatFarki and variantIsActive above (spread from
      // `product`) identify which existing variant to update, if any.
      stock: parseInt(stockRaw, 10),
      stok: parseInt(stockRaw, 10),
      variantBeden,
      variantRenk,
      attributes,
      existingAttributes: product?.attributes ?? [],
      description,
      aciklama: description,
      isActive,
      aktiflik: isActive,
      imageUrl: mainUrl,
      gorselUrl: mainUrl,
      imageUrls,
      images,
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

  renderImageList();

  return { element: overlay, close };
}
