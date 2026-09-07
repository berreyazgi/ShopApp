/**
 * CategoryTree.js — Dynamic Hierarchical Category Tree Component
 *
 * Recursively renders parent-child category tree from runtime supplied data.
 * Zero hardcoded names or hierarchy levels.
 *
 * Features:
 *  - Expand / collapse parent categories
 *  - Arbitrary depth support
 *  - Product / subcategory count badge when supplied
 *  - Keyboard & mouse selection highlighting
 *  - Clean empty state when categories are empty
 */

import { createIcon } from '../../../shared/components/Icon/Icon.js';

/**
 * Normalizes category items into a nested tree structure.
 * Supports both pre-nested arrays (item.children / item.subcategories)
 * and flat lists with `parentId` / `parentCategoryId`.
 *
 * @param {Array} categories
 * @returns {Array} Nested tree array
 */
export function buildCategoryTree(categories = []) {
  if (!Array.isArray(categories) || categories.length === 0) return [];

  // Check if already nested
  const hasNestedChildren = categories.some(
    (c) => (Array.isArray(c.children) && c.children.length > 0) ||
           (Array.isArray(c.subcategories) && c.subcategories.length > 0),
  );

  if (hasNestedChildren) {
    return categories.map((c) => ({
      ...c,
      children: buildCategoryTree(c.children || c.subcategories || []),
    }));
  }

  // Build tree from flat items with parentId
  const map = new Map();
  const roots = [];

  categories.forEach((cat) => {
    const id = cat.id ?? cat.kategoriId;
    map.set(id, { ...cat, id, children: [] });
  });

  categories.forEach((cat) => {
    const id = cat.id ?? cat.kategoriId;
    const parentId = cat.parentId ?? cat.parentCategoryId ?? cat.ustKategoriId ?? null;
    const node = map.get(id);

    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

/**
 * @param {{
 *   categories: Array,
 *   selectedCategoryId?: string | number | null,
 *   onSelect?: (category: any) => void,
 * }} options
 * @returns {HTMLElement}
 */
export function createCategoryTree({
  categories = [],
  selectedCategoryId = null,
  onSelect,
}) {
  const panel = document.createElement('div');
  panel.className = 'admin-card admin-category-tree-panel';

  const header = document.createElement('div');
  header.className = 'admin-card__header';
  header.innerHTML = `
    <h2 class="admin-card__title">Kategori Ağacı</h2>
    <span class="admin-card__badge">${categories.length} Kategori</span>
  `;
  panel.appendChild(header);

  const body = document.createElement('div');
  body.className = 'admin-card__body';

  const treeData = buildCategoryTree(categories);

  if (treeData.length === 0) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--color-secondary)';
    empty.style.fontSize = 'var(--text-xs)';
    empty.style.margin = '0';
    empty.textContent = 'Henüz kategori hiyerarşisi bulunmuyor.';
    body.appendChild(empty);
    panel.appendChild(body);
    return panel;
  }

  const rootUl = document.createElement('ul');
  rootUl.className = 'admin-tree';
  rootUl.setAttribute('role', 'tree');

  function renderNode(node) {
    const li = document.createElement('li');
    li.className = 'admin-tree-node';
    li.setAttribute('role', 'treeitem');

    const nodeId = node.id ?? node.kategoriId;
    const isSelected = selectedCategoryId !== null && String(selectedCategoryId) === String(nodeId);
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const nodeHeader = document.createElement('div');
    nodeHeader.className = `admin-tree-node__header${isSelected ? ' admin-tree-node__header--selected' : ''}`;
    nodeHeader.tabIndex = 0;

    // Toggle button if has children
    if (hasChildren) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'admin-tree-node__toggle';
      toggle.setAttribute('aria-label', `${node.name || node.ad} alt kategorilerini aç/kapat`);
      toggle.appendChild(createIcon('chevron-down', { size: 14 }));
      nodeHeader.appendChild(toggle);
    } else {
      const spacer = document.createElement('span');
      spacer.style.width = '14px';
      nodeHeader.appendChild(spacer);
    }

    const iconSpan = document.createElement('span');
    iconSpan.className = 'admin-tree-node__icon';
    iconSpan.appendChild(createIcon('folder', { size: 16 }));
    nodeHeader.appendChild(iconSpan);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'admin-tree-node__name';
    nameSpan.textContent = node.name || node.ad || 'İsimsiz Kategori';
    nodeHeader.appendChild(nameSpan);

    const count = node.productCount ?? node.urunSayisi;
    if (count !== undefined && count !== null) {
      const countSpan = document.createElement('span');
      countSpan.className = 'admin-tree-node__count';
      countSpan.textContent = `(${count})`;
      nodeHeader.appendChild(countSpan);
    }

    // Selection event
    nodeHeader.addEventListener('click', (e) => {
      // If clicking toggle button, expand/collapse only
      if (e.target.closest('.admin-tree-node__toggle')) {
        const toggleBtn = nodeHeader.querySelector('.admin-tree-node__toggle');
        const childrenUl = li.querySelector('.admin-tree-node__children');
        if (childrenUl) {
          childrenUl.classList.toggle('admin-tree-node__children--hidden');
          toggleBtn?.classList.toggle('admin-tree-node__toggle--collapsed');
        }
        return;
      }

      panel.querySelectorAll('.admin-tree-node__header--selected').forEach((el) => {
        el.classList.remove('admin-tree-node__header--selected');
      });
      nodeHeader.classList.add('admin-tree-node__header--selected');

      if (typeof onSelect === 'function') onSelect(node);
    });

    li.appendChild(nodeHeader);

    // Render children recursively
    if (hasChildren) {
      const childUl = document.createElement('ul');
      childUl.className = 'admin-tree-node__children';
      childUl.setAttribute('role', 'group');

      node.children.forEach((child) => {
        childUl.appendChild(renderNode(child));
      });

      li.appendChild(childUl);
    }

    return li;
  }

  treeData.forEach((node) => {
    rootUl.appendChild(renderNode(node));
  });

  body.appendChild(rootUl);
  panel.appendChild(body);
  return panel;
}
