/**
 * ProfileModals.js — Profil ve Adres Düzenleme / Ekleme / Silme Modalları
 *
 * Erişilebilir, klavye uyumlu (Esc tuşuyla kapanan, odak tuzaklı),
 * arka plan karartmalı modal bileşenleri.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { TURKEY_CITIES } from '../utils/cityUtils.js';

function createModalOverlay(titleText, contentEl, onClose, containerModifier = '') {
  const overlay = document.createElement('div');
  overlay.className = 'profile-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'profile-modal-title');

  const container = document.createElement('div');
  container.className = `profile-modal-container${containerModifier ? ` ${containerModifier}` : ''}`;

  // Modal Header
  const header = document.createElement('div');
  header.className = 'profile-modal-header';

  const title = document.createElement('h2');
  title.className = 'profile-modal-title';
  title.id = 'profile-modal-title';
  title.textContent = titleText;
  header.appendChild(title);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'profile-modal-close';
  closeBtn.setAttribute('aria-label', 'Modalı kapat');
  closeBtn.appendChild(createIcon('close', { size: 18 }));
  closeBtn.addEventListener('click', onClose);
  header.appendChild(closeBtn);

  container.appendChild(header);

  // Modal Body
  const body = document.createElement('div');
  body.className = 'profile-modal-body';
  body.appendChild(contentEl);
  container.appendChild(body);

  overlay.appendChild(container);

  // Backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });

  // Esc key
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  document.addEventListener('keydown', handleKeydown);

  function destroy() {
    document.removeEventListener('keydown', handleKeydown);
    overlay.remove();
  }

  return { element: overlay, destroy };
}

/**
 * Profil Bilgilerini Düzenleme Modalı
 * @param {{
 *   user: import('../services/profileService.js').UserProfileDto,
 *   onSave: (data: { ad: string, soyad: string, telefon: string }) => Promise<void>,
 *   onClose: () => void,
 * }} options
 */
export function createProfileEditModal({ user, onSave, onClose }) {
  const form = document.createElement('form');
  form.className = 'profile-form';

  const errorAlert = document.createElement('div');
  errorAlert.className = 'profile-form-error';
  errorAlert.style.display = 'none';
  form.appendChild(errorAlert);

  // Ad
  const adGroup = document.createElement('div');
  adGroup.className = 'profile-form-group';
  adGroup.innerHTML = `
    <label class="profile-form-label" for="profile-edit-ad">Ad <span class="required">*</span></label>
    <input type="text" id="profile-edit-ad" class="profile-form-input" required value="${escapeHtml(user.firstName || '')}" maxlength="100" />
  `;
  form.appendChild(adGroup);

  // Soyad
  const soyadGroup = document.createElement('div');
  soyadGroup.className = 'profile-form-group';
  soyadGroup.innerHTML = `
    <label class="profile-form-label" for="profile-edit-soyad">Soyad <span class="required">*</span></label>
    <input type="text" id="profile-edit-soyad" class="profile-form-input" required value="${escapeHtml(user.lastName || '')}" maxlength="100" />
  `;
  form.appendChild(soyadGroup);

  // E-posta (Read-only)
  const emailGroup = document.createElement('div');
  emailGroup.className = 'profile-form-group';
  emailGroup.innerHTML = `
    <label class="profile-form-label" for="profile-edit-email">E-posta</label>
    <input type="email" id="profile-edit-email" class="profile-form-input profile-form-input--disabled" readonly value="${escapeHtml(user.email || '')}" />
    <span class="profile-form-hint">E-posta adresi hesap güvenliği nedeniyle buradan değiştirilemez.</span>
  `;
  form.appendChild(emailGroup);

  // Telefon
  const phoneGroup = document.createElement('div');
  phoneGroup.className = 'profile-form-group';
  phoneGroup.innerHTML = `
    <label class="profile-form-label" for="profile-edit-telefon">Telefon</label>
    <input type="tel" id="profile-edit-telefon" class="profile-form-input" placeholder="+90 5xx xxx xx xx" value="${escapeHtml(user.phone || '')}" maxlength="20" />
  `;
  form.appendChild(phoneGroup);

  // Buttons
  const footer = document.createElement('div');
  footer.className = 'profile-modal-footer';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'profile-btn profile-btn--secondary';
  cancelBtn.textContent = 'İptal';
  cancelBtn.addEventListener('click', onClose);
  footer.appendChild(cancelBtn);

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.className = 'profile-btn profile-btn--primary';
  saveBtn.textContent = 'Değişiklikleri Kaydet';
  footer.appendChild(saveBtn);

  form.appendChild(footer);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorAlert.style.display = 'none';

    const ad = form.querySelector('#profile-edit-ad').value.trim();
    const soyad = form.querySelector('#profile-edit-soyad').value.trim();
    const telefon = form.querySelector('#profile-edit-telefon').value.trim();

    if (!ad || !soyad) {
      errorAlert.textContent = 'Lütfen ad ve soyad alanlarını doldurun.';
      errorAlert.style.display = 'block';
      return;
    }

    try {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Kaydediliyor...';
      await onSave({ ad, soyad, telefon });
      onClose();
    } catch (err) {
      errorAlert.textContent = err?.message || 'Profil güncellenirken bir hata oluştu.';
      errorAlert.style.display = 'block';
      saveBtn.disabled = false;
      saveBtn.textContent = 'Değişiklikleri Kaydet';
    }
  });

  return createModalOverlay('Kişisel Bilgileri Düzenle', form, onClose);
}

/**
 * Telefon formatlayıcı (5XX) XXX XX XX
 * @param {string} raw
 * @returns {string}
 */
export function formatTurkishPhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('90')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  if (!digits.length) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length <= 8) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
}

/**
 * Adres Ekleme / Düzenleme Modalı (Modern 8-Satır Formu)
 * @param {{
 *   address?: import('../services/profileService.js').AddressDto | null,
 *   cities?: Array<{ code: number, name: string }>,
 *   districts?: Array<{ id: number|string, cityId: number|string, name: string }>,
 *   neighborhoods?: Array<{ id: number|string, districtId: number|string, name: string }>,
 *   getDistricts?: (cityId: number|string) => Promise<Array<any>>,
 *   getNeighborhoods?: (districtId: number|string) => Promise<Array<any>>,
 *   onSave: (payload: any) => Promise<void>,
 *   onClose: () => void,
 * }} options
 */
export function createAddressModal({
  address = null,
  cities = TURKEY_CITIES,
  districts = [],
  neighborhoods = [],
  getDistricts = null,
  getNeighborhoods = null,
  onSave,
  onClose,
}) {
  const isEditing = Boolean(address);
  const initialFirstName = address?.firstName || address?.ad || '';
  const initialLastName = address?.lastName || address?.soyad || '';
  const initialPostalCode = address?.postaKodu || address?.postalCode || '';
  const initialCityId = address?.sehir || address?.cityId || '';
  const initialDistrictId = address?.ilce || address?.districtId || '';
  const initialNeighborhoodId = address?.mahalle || address?.neighborhoodId || '';
  const initialAddressLine = address?.adresBilgisi || address?.addressLine || '';
  const initialAddressTitle = address?.adresBasligi || address?.addressTitle || address?.title || '';

  const form = document.createElement('form');
  form.className = 'profile-form profile-form--address';

  const errorAlert = document.createElement('div');
  errorAlert.className = 'profile-form-error';
  errorAlert.style.display = 'none';
  form.appendChild(errorAlert);

  // ── Row 1: Ad & Soyad (50% | 50%) ─────────────────────────────────────────
  const nameRow = document.createElement('div');
  nameRow.className = 'profile-form-row';

  const adGroup = document.createElement('div');
  adGroup.className = 'profile-form-group';

  const adLabel = document.createElement('label');
  adLabel.className = 'profile-form-label';
  adLabel.htmlFor = 'profile-address-ad';
  adLabel.innerHTML = 'Ad <span class="required">*</span>';
  adGroup.appendChild(adLabel);

  const adInput = document.createElement('input');
  adInput.type = 'text';
  adInput.id = 'profile-address-ad';
  adInput.className = 'profile-form-input';
  adInput.placeholder = 'Adınız';
  adInput.required = true;
  adInput.maxLength = 50;
  adInput.value = initialFirstName;
  adGroup.appendChild(adInput);

  nameRow.appendChild(adGroup);

  const soyadGroup = document.createElement('div');
  soyadGroup.className = 'profile-form-group';

  const soyadLabel = document.createElement('label');
  soyadLabel.className = 'profile-form-label';
  soyadLabel.htmlFor = 'profile-address-soyad';
  soyadLabel.innerHTML = 'Soyad <span class="required">*</span>';
  soyadGroup.appendChild(soyadLabel);

  const soyadInput = document.createElement('input');
  soyadInput.type = 'text';
  soyadInput.id = 'profile-address-soyad';
  soyadInput.className = 'profile-form-input';
  soyadInput.placeholder = 'Soyadınız';
  soyadInput.required = true;
  soyadInput.maxLength = 50;
  soyadInput.value = initialLastName;
  soyadGroup.appendChild(soyadInput);

  nameRow.appendChild(soyadGroup);

  form.appendChild(nameRow);

  // ── Row 2: İl & İlçe (50% | 50%) ─────────────────────────────────────────
  const locationRow = document.createElement('div');
  locationRow.className = 'profile-form-row';

  // İl
  const cityGroup = document.createElement('div');
  cityGroup.className = 'profile-form-group';

  const cityLabel = document.createElement('label');
  cityLabel.className = 'profile-form-label';
  cityLabel.htmlFor = 'profile-address-city';
  cityLabel.innerHTML = 'İl <span class="required">*</span>';
  cityGroup.appendChild(cityLabel);

  const citySelect = document.createElement('select');
  citySelect.id = 'profile-address-city';
  citySelect.className = 'profile-form-input profile-form-select';
  citySelect.required = true;

  const defaultCityOpt = document.createElement('option');
  defaultCityOpt.value = '';
  defaultCityOpt.textContent = 'İl Seçiniz';
  citySelect.appendChild(defaultCityOpt);

  const cityList = Array.isArray(cities) && cities.length > 0 ? cities : TURKEY_CITIES;
  cityList.forEach((city) => {
    const opt = document.createElement('option');
    const code = city.code ?? city.id;
    const name = city.name ?? city.sehirAdi;
    opt.value = String(code);
    opt.textContent = `${code} - ${name}`;
    if (initialCityId && String(initialCityId) === String(code)) {
      opt.selected = true;
    }
    citySelect.appendChild(opt);
  });
  if (initialCityId) {
    citySelect.value = String(initialCityId);
  }
  cityGroup.appendChild(citySelect);
  locationRow.appendChild(cityGroup);

  // İlçe
  const districtGroup = document.createElement('div');
  districtGroup.className = 'profile-form-group';

  const districtLabel = document.createElement('label');
  districtLabel.className = 'profile-form-label';
  districtLabel.htmlFor = 'profile-address-district';
  districtLabel.innerHTML = 'İlçe <span class="required">*</span>';
  districtGroup.appendChild(districtLabel);

  const districtSelect = document.createElement('select');
  districtSelect.id = 'profile-address-district';
  districtSelect.className = 'profile-form-input profile-form-select';
  districtSelect.required = true;
  districtSelect.disabled = true;

  const defaultDistrictOpt = document.createElement('option');
  defaultDistrictOpt.value = '';
  defaultDistrictOpt.textContent = 'İlçe Seçiniz';
  districtSelect.appendChild(defaultDistrictOpt);

  districtGroup.appendChild(districtSelect);
  locationRow.appendChild(districtGroup);

  form.appendChild(locationRow);

  // ── Row 3: Mahalle & Posta Kodu (50% | 50%) ──────────────────────────────
  const areaRow = document.createElement('div');
  areaRow.className = 'profile-form-row';

  // Mahalle
  const neighborhoodGroup = document.createElement('div');
  neighborhoodGroup.className = 'profile-form-group';

  const neighborhoodLabel = document.createElement('label');
  neighborhoodLabel.className = 'profile-form-label';
  neighborhoodLabel.htmlFor = 'profile-address-neighborhood';
  neighborhoodLabel.innerHTML = 'Mahalle <span class="required">*</span>';
  neighborhoodGroup.appendChild(neighborhoodLabel);

  const neighborhoodSelect = document.createElement('select');
  neighborhoodSelect.id = 'profile-address-neighborhood';
  neighborhoodSelect.className = 'profile-form-input profile-form-select';
  neighborhoodSelect.required = true;
  neighborhoodSelect.disabled = true;

  const defaultNeighborhoodOpt = document.createElement('option');
  defaultNeighborhoodOpt.value = '';
  defaultNeighborhoodOpt.textContent = 'Mahalle Seçiniz';
  neighborhoodSelect.appendChild(defaultNeighborhoodOpt);

  neighborhoodGroup.appendChild(neighborhoodSelect);
  areaRow.appendChild(neighborhoodGroup);

  // Posta Kodu
  const postalGroup = document.createElement('div');
  postalGroup.className = 'profile-form-group';

  const postalLabel = document.createElement('label');
  postalLabel.className = 'profile-form-label';
  postalLabel.htmlFor = 'profile-address-postal';
  postalLabel.innerHTML = 'Posta Kodu <span class="required">*</span>';
  postalGroup.appendChild(postalLabel);

  const postalInput = document.createElement('input');
  postalInput.type = 'text';
  postalInput.id = 'profile-address-postal';
  postalInput.className = 'profile-form-input';
  postalInput.placeholder = '34000';
  postalInput.maxLength = 5;
  postalInput.inputMode = 'numeric';
  postalInput.pattern = '[0-9]{5}';
  postalInput.required = true;
  postalInput.value = initialPostalCode ? String(initialPostalCode) : '';

  postalInput.addEventListener('input', () => {
    postalInput.value = postalInput.value.replace(/\D/g, '').slice(0, 5);
  });

  postalGroup.appendChild(postalInput);
  areaRow.appendChild(postalGroup);

  form.appendChild(areaRow);

  // ── Cascading State Providers & Resets ───────────────────────────────────
  async function updateDistrictOptions(cityId, preserveSelected = null) {
    districtSelect.textContent = '';
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'İlçe Seçiniz';
    districtSelect.appendChild(defaultOpt);

    neighborhoodSelect.textContent = '';
    const defaultNeighOpt = document.createElement('option');
    defaultNeighOpt.value = '';
    defaultNeighOpt.textContent = 'Mahalle Seçiniz';
    neighborhoodSelect.appendChild(defaultNeighOpt);
    neighborhoodSelect.disabled = true;

    if (!cityId) {
      districtSelect.disabled = true;
      return;
    }

    let items = [];
    if (typeof getDistricts === 'function') {
      items = await getDistricts(cityId);
    } else if (Array.isArray(districts) && districts.length > 0) {
      items = districts.filter((d) => String(d.cityId ?? d.sehirId) === String(cityId));
    }

    if (items.length > 0) {
      districtSelect.disabled = false;
      items.forEach((item) => {
        const opt = document.createElement('option');
        const id = item.id ?? item.code ?? item;
        const name = item.name ?? item.ilceAdi ?? item;
        opt.value = String(id);
        opt.textContent = String(name);
        if (preserveSelected && String(preserveSelected) === String(id)) {
          opt.selected = true;
        }
        districtSelect.appendChild(opt);
      });
      if (preserveSelected) {
        districtSelect.value = String(preserveSelected);
      }
    } else {
      districtSelect.disabled = true;
      defaultOpt.textContent = 'Önce il seçiniz';
    }
  }

  async function updateNeighborhoodOptions(districtId, preserveSelected = null) {
    neighborhoodSelect.textContent = '';
    const defaultNeighOpt = document.createElement('option');
    defaultNeighOpt.value = '';
    defaultNeighOpt.textContent = 'Mahalle Seçiniz';
    neighborhoodSelect.appendChild(defaultNeighOpt);

    if (!districtId) {
      neighborhoodSelect.disabled = true;
      return;
    }

    let items = [];
    if (typeof getNeighborhoods === 'function') {
      items = await getNeighborhoods(districtId);
    } else if (Array.isArray(neighborhoods) && neighborhoods.length > 0) {
      items = neighborhoods.filter((n) => String(n.districtId ?? n.ilceId) === String(districtId));
    }

    if (items.length > 0) {
      neighborhoodSelect.disabled = false;
      items.forEach((item) => {
        const opt = document.createElement('option');
        const id = item.id ?? item.code ?? item;
        const name = item.name ?? item.mahalleAdi ?? item;
        opt.value = String(id);
        opt.textContent = String(name);
        if (preserveSelected && String(preserveSelected) === String(id)) {
          opt.selected = true;
        }
        neighborhoodSelect.appendChild(opt);
      });
      if (preserveSelected) {
        neighborhoodSelect.value = String(preserveSelected);
      }
    } else {
      neighborhoodSelect.disabled = true;
      defaultNeighOpt.textContent = 'Önce ilçe seçiniz';
    }
  }

  citySelect.addEventListener('change', () => {
    updateDistrictOptions(citySelect.value, null);
  });

  districtSelect.addEventListener('change', () => {
    updateNeighborhoodOptions(districtSelect.value, null);
  });

  if (initialCityId) {
    updateDistrictOptions(initialCityId, initialDistrictId).then(() => {
      if (initialDistrictId) {
        updateNeighborhoodOptions(initialDistrictId, initialNeighborhoodId);
      }
    });
  }

  // ── Row 5: Delivery Warning Box ──────────────────────────────────────────
  const warningBox = document.createElement('div');
  warningBox.className = 'profile-address-warning';
  warningBox.setAttribute('role', 'note');

  const warningIcon = createIcon('alert-circle', { size: 18 });
  warningBox.appendChild(warningIcon);

  const warningContent = document.createElement('div');
  warningContent.className = 'profile-address-warning__content';
  warningContent.textContent =
    'Kargonuzun size sorunsuz bir şekilde ulaşabilmesi için mahalle, cadde, sokak, bina gibi detay bilgileri eksiksiz girdiğinizden emin olun.';
  warningBox.appendChild(warningContent);

  form.appendChild(warningBox);

  // ── Row 6: Adres (Multiline Textarea) ────────────────────────────────────
  const detailGroup = document.createElement('div');
  detailGroup.className = 'profile-form-group';

  const detailLabel = document.createElement('label');
  detailLabel.className = 'profile-form-label';
  detailLabel.htmlFor = 'profile-address-line';
  detailLabel.innerHTML = 'Adres <span class="required">*</span>';
  detailGroup.appendChild(detailLabel);

  const detailTextarea = document.createElement('textarea');
  detailTextarea.id = 'profile-address-line';
  detailTextarea.className = 'profile-form-input profile-form-textarea';
  detailTextarea.rows = 3;
  detailTextarea.placeholder = 'Mahalle, cadde, sokak, bina ve daire no...';
  detailTextarea.required = true;
  detailTextarea.maxLength = 500;
  detailTextarea.value = initialAddressLine;
  detailGroup.appendChild(detailTextarea);

  form.appendChild(detailGroup);

  // ── Row 7: Adres Başlığı ─────────────────────────────────────────────────
  const titleGroup = document.createElement('div');
  titleGroup.className = 'profile-form-group';

  const titleLabel = document.createElement('label');
  titleLabel.className = 'profile-form-label';
  titleLabel.htmlFor = 'profile-address-title';
  titleLabel.innerHTML = 'Adres Başlığı <span class="required">*</span>';
  titleGroup.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'profile-address-title';
  titleInput.className = 'profile-form-input';
  titleInput.placeholder = 'Örn: Evim, İş Yeri';
  titleInput.required = true;
  titleInput.maxLength = 60;
  titleInput.value = initialAddressTitle;
  titleGroup.appendChild(titleInput);

  form.appendChild(titleGroup);

  // ── Footer: Kaydet Butonu ────────────────────────────────────────────────
  const footer = document.createElement('div');
  footer.className = 'profile-modal-footer profile-modal-footer--full';

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.className = 'profile-btn profile-btn--primary profile-btn--full';
  saveBtn.textContent = isEditing ? 'Güncelle' : 'Kaydet';
  footer.appendChild(saveBtn);

  form.appendChild(footer);

  // ── Form Validation & Submission ─────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorAlert.style.display = 'none';

    const firstName = form.querySelector('#profile-address-ad').value.trim();
    const lastName = form.querySelector('#profile-address-soyad').value.trim();
    const cityId = citySelect.value;
    const districtId = districtSelect.disabled ? null : districtSelect.value;
    const neighborhoodId = neighborhoodSelect.disabled ? null : neighborhoodSelect.value;
    const postalCode = form.querySelector('#profile-address-postal').value.trim();
    const addressLine = form.querySelector('#profile-address-line').value.trim();
    const addressTitle = form.querySelector('#profile-address-title').value.trim();

    if (!firstName || !lastName) {
      errorAlert.textContent = 'Lütfen ad ve soyad alanlarını doldurun.';
      errorAlert.style.display = 'block';
      return;
    }

    if (!cityId) {
      errorAlert.textContent = 'Lütfen bir il seçin.';
      errorAlert.style.display = 'block';
      return;
    }

    if (!districtSelect.disabled && !districtId) {
      errorAlert.textContent = 'Lütfen bir ilçe seçin.';
      errorAlert.style.display = 'block';
      return;
    }

    if (!neighborhoodSelect.disabled && !neighborhoodId) {
      errorAlert.textContent = 'Lütfen bir mahalle seçin.';
      errorAlert.style.display = 'block';
      return;
    }

    if (!postalCode || !/^\d{5}$/.test(postalCode)) {
      errorAlert.textContent = 'Lütfen geçerli 5 haneli bir posta kodu giriniz (Örn: 34000).';
      errorAlert.style.display = 'block';
      return;
    }

    if (!addressLine) {
      errorAlert.textContent = 'Lütfen açık adres bilginizi girin.';
      errorAlert.style.display = 'block';
      return;
    }

    if (!addressTitle) {
      errorAlert.textContent = 'Lütfen adres başlığını girin (Örn: Evim, İş Yeri).';
      errorAlert.style.display = 'block';
      return;
    }

    const payload = {
      firstName,
      lastName,
      cityId: Number(cityId),
      districtId: districtId ? Number(districtId) : null,
      neighborhoodId: neighborhoodId ? Number(neighborhoodId) : null,
      postalCode,
      addressLine,
      addressTitle,

      // Backward compatibility fields for profileService and backend:
      sehir: Number(cityId),
      ilce: districtId ? Number(districtId) : 0,
      mahalle: neighborhoodId ? Number(neighborhoodId) : 0,
      postaKodu: Number(postalCode),
      adresBilgisi: addressLine,
      ad: firstName,
      soyad: lastName,
      adresBasligi: addressTitle,
      ulke: 90,
    };

    try {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Kaydediliyor...';
      await onSave(payload);
      onClose();
    } catch (err) {
      errorAlert.textContent = err?.message || 'Adres kaydedilirken bir hata oluştu.';
      errorAlert.style.display = 'block';
      saveBtn.disabled = false;
      saveBtn.textContent = isEditing ? 'Güncelle' : 'Kaydet';
    }
  });

  return createModalOverlay(
    isEditing ? 'Adresi Düzenle' : 'Yeni Adres Ekle',
    form,
    onClose,
    'profile-modal-container--address'
  );
}

/**
 * Adres Silme Onay Modalı
 * @param {{
 *   address: import('../services/profileService.js').AddressDto,
 *   onConfirm: () => Promise<void>,
 *   onClose: () => void,
 * }} options
 */
export function createDeleteConfirmModal({ address, onConfirm, onClose }) {
  const wrap = document.createElement('div');
  wrap.className = 'profile-delete-dialog';

  const message = document.createElement('p');
  message.className = 'profile-delete-dialog__message';
  message.textContent = 'Bu adresi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.';
  wrap.appendChild(message);

  const errorAlert = document.createElement('div');
  errorAlert.className = 'profile-form-error';
  errorAlert.style.display = 'none';
  wrap.appendChild(errorAlert);

  const footer = document.createElement('div');
  footer.className = 'profile-modal-footer';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'profile-btn profile-btn--secondary';
  cancelBtn.textContent = 'Vazgeç';
  cancelBtn.addEventListener('click', onClose);
  footer.appendChild(cancelBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'profile-btn profile-btn--danger';
  deleteBtn.textContent = 'Evet, Sil';

  deleteBtn.addEventListener('click', async () => {
    try {
      deleteBtn.disabled = true;
      deleteBtn.textContent = 'Siliniyor...';
      await onConfirm();
      onClose();
    } catch (err) {
      errorAlert.textContent = err?.message || 'Adres silinirken bir hata oluştu.';
      errorAlert.style.display = 'block';
      deleteBtn.disabled = false;
      deleteBtn.textContent = 'Evet, Sil';
    }
  });

  footer.appendChild(deleteBtn);
  wrap.appendChild(footer);

  return createModalOverlay('Adresi Sil', wrap, onClose);
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
