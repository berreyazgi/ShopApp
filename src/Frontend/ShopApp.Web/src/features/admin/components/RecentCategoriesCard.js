/**
 * RecentCategoriesCard.js — Recent Categories Component
 *
 * Displays the most recently added categories from supplied data.
 * Zero hardcoded names, products, or dates.
 * Displays clean Turkish empty state if empty.
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * @param {{
 *   recentCategories?: Array,
 *   onSelect?: (category: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createRecentCategoriesCard({ recentCategories = [], onSelect } = {}) {
  const card = document.createElement('div');
  card.className = 'admin-card';

  const header = document.createElement('div');
  header.className = 'admin-card__header';
  header.innerHTML = `
    <h2 class="admin-card__title">Son Eklenen Kategoriler</h2>
    <span class="admin-card__badge">${recentCategories.length} Kayıt</span>
  `;
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'admin-card__body';

  if (!Array.isArray(recentCategories) || recentCategories.length === 0) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--color-secondary)';
    empty.style.fontSize = 'var(--text-xs)';
    empty.style.margin = '0';
    empty.textContent = 'Henüz yeni kategori bulunmuyor.';
    body.appendChild(empty);
    card.appendChild(body);
    return card;
  }

  const list = document.createElement('div');
  list.className = 'admin-recent-list';

  recentCategories.forEach((cat) => {
    const item = document.createElement('div');
    item.className = 'admin-recent-item';
    item.tabIndex = 0;

    const left = document.createElement('div');
    left.className = 'admin-recent-item__left';

    const thumb = document.createElement('div');
    thumb.className = 'admin-table-thumb';
    const imgUrl = cat.imageUrl || cat.gorselUrl;
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = cat.name || cat.ad || '';
      thumb.appendChild(img);
    } else {
      thumb.appendChild(createIcon('folder', { size: 16 }));
    }
    left.appendChild(thumb);

    const info = document.createElement('div');
    const nameEl = document.createElement('div');
    nameEl.className = 'admin-recent-item__name';
    nameEl.textContent = cat.name || cat.ad || 'İsimsiz Kategori';
    info.appendChild(nameEl);

    const parentName = cat.parentName || cat.ustKategoriAdi || (cat.parentId ? 'Alt Kategori' : 'Ana Kategori');
    const metaEl = document.createElement('div');
    metaEl.className = 'admin-recent-item__meta';
    metaEl.textContent = parentName;
    info.appendChild(metaEl);

    left.appendChild(info);
    item.appendChild(left);

    const count = cat.productCount ?? cat.urunSayisi;
    if (count !== undefined && count !== null) {
      const badge = document.createElement('span');
      badge.className = 'admin-card__badge';
      badge.textContent = `${count} Ürün`;
      item.appendChild(badge);
    }

    if (typeof onSelect === 'function') {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => onSelect(cat));
    }

    list.appendChild(item);
  });

  body.appendChild(list);
  card.appendChild(body);
  return card;
}
