/**
 * CategoryMegaMenu.js
 * Reusable Hierarchical Category Mega Menu component.
 *
 * Renders a supplied collection of parent categories and their child categories:
 *   Parent (e.g. Kadın >)
 *     ├── Giyim
 *     ├── Spor
 *     ├── Aksesuar
 *     └── Ayakkabı
 *     └── Tümünü Gör →
 *
 * This is a pure presentation component with zero hardcoded business data.
 * Database/API results can be passed directly as the `categories` argument.
 */

/**
 * Normalizes category data to handle various API or fixture property names
 * (.children or .subcategories, optional href, slug, id).
 *
 * @param {Array<object>} rawCategories
 * @returns {Array<object>}
 */
export function normalizeCategories(rawCategories = []) {
  if (!Array.isArray(rawCategories)) return [];

  return rawCategories.map((parent) => {
    const parentId = parent.id ?? parent.slug ?? String(parent.name || '').toLowerCase();
    const parentName = parent.name ?? '';
    const parentSlug = parent.slug ?? parentId;
    const parentHref = parent.href ?? (parentSlug ? `/urunler/${parentSlug}` : '/kategoriler');
    const rawChildren = parent.children ?? parent.subcategories ?? [];

    const children = Array.isArray(rawChildren)
      ? rawChildren.map((child) => {
          const childId = child.id ?? `${parentId}-${child.slug ?? String(child.name || '').toLowerCase()}`;
          const childName = child.name ?? '';
          const childSlug = child.slug ?? childId;
          const childHref = child.href ?? (parentSlug && childSlug ? `/urunler/${parentSlug}/${childSlug}` : '/urunler');
          return {
            id: childId,
            name: childName,
            slug: childSlug,
            href: childHref,
            count: child.count,
          };
        })
      : [];

    return {
      id: parentId,
      name: parentName,
      slug: parentSlug,
      href: parentHref,
      count: parent.count,
      children,
    };
  });
}

/**
 * @param {Array<object>} initialCategories
 * @param {{
 *   onNavigate?: (href: string, event: MouseEvent) => void,
 *   onClose?: () => void,
 *   className?: string
 * }} options
 * @returns {{
 *   element: HTMLElement,
 *   update: (categories: Array<object>) => void,
 *   destroy: () => void
 * }}
 */
export function createCategoryMegaMenu(initialCategories = [], options = {}) {
  const { onNavigate, onClose, className = '' } = options;

  const container = document.createElement('div');
  container.className = `category-mega-menu${className ? ` ${className}` : ''}`;
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Kategoriler Menüsü');

  let currentCategories = normalizeCategories(initialCategories);
  const cleanupFns = [];

  function render() {
    container.innerHTML = '';

    if (!currentCategories.length) {
      const emptyNotice = document.createElement('div');
      emptyNotice.className = 'category-mega-menu__empty';
      emptyNotice.textContent = 'Henüz kategori bulunamadı.';
      container.appendChild(emptyNotice);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'category-mega-menu__grid';

    currentCategories.forEach((parent) => {
      const column = document.createElement('div');
      column.className = 'category-mega-menu__column';
      column.setAttribute('data-category-id', parent.id);

      // ── Parent Category Header ──
      const header = document.createElement('div');
      header.className = 'category-mega-menu__parent-header';

      const parentLink = document.createElement('a');
      parentLink.className = 'category-mega-menu__parent-link';
      parentLink.href = parent.href;
      parentLink.setAttribute('aria-label', `${parent.name} kategorisi`);

      const parentName = document.createElement('span');
      parentName.className = 'category-mega-menu__parent-name';
      parentName.textContent = parent.name;

      const parentArrow = document.createElement('span');
      parentArrow.className = 'category-mega-menu__parent-arrow';
      parentArrow.setAttribute('aria-hidden', 'true');
      parentArrow.textContent = '›';

      parentLink.appendChild(parentName);
      parentLink.appendChild(parentArrow);
      header.appendChild(parentLink);
      column.appendChild(header);

      // ── Child Categories List ──
      const list = document.createElement('ul');
      list.className = 'category-mega-menu__child-list';
      list.setAttribute('role', 'list');

      parent.children.forEach((child) => {
        const item = document.createElement('li');
        item.className = 'category-mega-menu__child-item';

        const link = document.createElement('a');
        link.className = 'category-mega-menu__child-link';
        link.href = child.href;
        link.textContent = child.name;
        link.setAttribute('data-child-id', child.id);

        item.appendChild(link);
        list.appendChild(item);
      });

      column.appendChild(list);

      // ── Column Footer: Tümünü Gör ──
      const footer = document.createElement('div');
      footer.className = 'category-mega-menu__footer';

      const viewAllLink = document.createElement('a');
      viewAllLink.className = 'category-mega-menu__view-all';
      viewAllLink.href = parent.href;
      viewAllLink.setAttribute('aria-label', `${parent.name} - Tümünü Gör`);

      const viewAllText = document.createElement('span');
      viewAllText.textContent = 'Tümünü Gör';

      const viewAllArrow = document.createElement('span');
      viewAllArrow.className = 'category-mega-menu__view-all-arrow';
      viewAllArrow.setAttribute('aria-hidden', 'true');
      viewAllArrow.textContent = '→';

      viewAllLink.appendChild(viewAllText);
      viewAllLink.appendChild(viewAllArrow);
      footer.appendChild(viewAllLink);
      column.appendChild(footer);

      grid.appendChild(column);
    });

    container.appendChild(grid);
  }

  // ── Events ────────────────────────────────────────────────────────────────
  function handleContainerClick(event) {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;

    if (typeof onNavigate === 'function') {
      onNavigate(anchor.getAttribute('href'), event);
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  container.addEventListener('click', handleContainerClick);
  cleanupFns.push(() => container.removeEventListener('click', handleContainerClick));

  container.addEventListener('keydown', handleKeydown);
  cleanupFns.push(() => container.removeEventListener('keydown', handleKeydown));

  function update(newCategories = []) {
    currentCategories = normalizeCategories(newCategories);
    render();
  }

  function destroy() {
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;
    container.innerHTML = '';
  }

  render();

  return { element: container, update, destroy };
}
