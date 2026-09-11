/**
 * SavedAddressesCard.js — Kayıtlı Adresler Kartı
 *
 * GET /api/profile/addresses üzerinden gelen gerçek adresleri listeler.
 * "Yeni Adres Ekle", "Düzenle" ve "Sil" butonlarını barındırır.
 * Boş ise temiz bir boş durum gösterir.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { getCityName } from '../utils/cityUtils.js';

/**
 * @param {{
 *   addresses: Array<import('../services/profileService.js').AddressDto>,
 *   onAddAddress: () => void,
 *   onEditAddress: (address: import('../services/profileService.js').AddressDto) => void,
 *   onDeleteAddress: (address: import('../services/profileService.js').AddressDto) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createSavedAddressesCard({
  addresses = [],
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
}) {
  const card = document.createElement('section');
  card.className = 'profile-card profile-card--addresses';
  card.id = 'adreslerim';
  card.setAttribute('aria-labelledby', 'saved-addresses-title');

  // Header
  const header = document.createElement('div');
  header.className = 'profile-card__header';

  const title = document.createElement('h2');
  title.className = 'profile-card__title';
  title.id = 'saved-addresses-title';
  title.textContent = 'Kayıtlı Adreslerim';
  header.appendChild(title);

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'profile-btn profile-btn--outline profile-btn--sm';
  addBtn.setAttribute('aria-label', 'Yeni adres ekle');
  addBtn.appendChild(createIcon('plus', { size: 14 }));
  addBtn.appendChild(document.createTextNode(' Yeni Adres Ekle'));
  addBtn.addEventListener('click', onAddAddress);
  header.appendChild(addBtn);

  card.appendChild(header);

  // Body: Empty State or Addresses Grid
  if (addresses.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'profile-empty-state';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'profile-empty-state__icon';
    iconWrap.appendChild(createIcon('location', { size: 36 }));
    empty.appendChild(iconWrap);

    const emptyTitle = document.createElement('p');
    emptyTitle.className = 'profile-empty-state__title';
    emptyTitle.textContent = 'Henüz kayıtlı adresiniz bulunmuyor.';
    empty.appendChild(emptyTitle);

    const emptyDesc = document.createElement('p');
    emptyDesc.className = 'profile-empty-state__desc';
    emptyDesc.textContent = 'Siparişlerinizin teslimatı için yeni bir adres ekleyebilirsiniz.';
    empty.appendChild(emptyDesc);

    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.className = 'profile-btn profile-btn--primary profile-btn--sm';
    newBtn.textContent = 'Yeni Adres Ekle';
    newBtn.addEventListener('click', onAddAddress);
    empty.appendChild(newBtn);

    card.appendChild(empty);
    return card;
  }

  const grid = document.createElement('div');
  grid.className = 'profile-address-grid';

  addresses.forEach((address, index) => {
    const item = document.createElement('article');
    item.className = 'profile-address-card';

    // Üst satır: Konum ikonu & Şehir / Posta Kodu
    const topRow = document.createElement('div');
    topRow.className = 'profile-address-card__top';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'profile-address-card__title-wrap';

    const pinIcon = createIcon('location', { size: 16 });
    titleWrap.appendChild(pinIcon);

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'profile-address-card__title';
    cardTitle.textContent = `${getCityName(address.sehir)} (${address.postaKodu})`;
    titleWrap.appendChild(cardTitle);

    topRow.appendChild(titleWrap);
    item.appendChild(topRow);

    // Açık adres metni
    const detailText = document.createElement('p');
    detailText.className = 'profile-address-card__details';
    detailText.textContent = address.adresBilgisi || 'Adres detayı belirtilmemiş.';
    item.appendChild(detailText);

    // Alt satır: Düzenle / Sil butonları
    const actions = document.createElement('div');
    actions.className = 'profile-address-card__actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'profile-btn profile-btn--ghost profile-btn--xs';
    editBtn.appendChild(createIcon('edit', { size: 12 }));
    editBtn.appendChild(document.createTextNode(' Düzenle'));
    editBtn.addEventListener('click', () => onEditAddress(address));
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'profile-btn profile-btn--ghost-danger profile-btn--xs';
    deleteBtn.appendChild(createIcon('trash', { size: 12 }));
    deleteBtn.appendChild(document.createTextNode(' Sil'));
    deleteBtn.addEventListener('click', () => onDeleteAddress(address));
    actions.appendChild(deleteBtn);

    item.appendChild(actions);
    grid.appendChild(item);
  });

  card.appendChild(grid);
  return card;
}
