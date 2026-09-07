/**
 * AdminLayout.js — Shared Admin Workspace Shell
 *
 * Implements Option A: Full-height isolated admin layout.
 * Automatically activates `body.admin-mode` on mount to hide customer header/footer,
 * and cleans it up when unmounting / navigating away.
 *
 * Structure:
 *  - Topbar: AdminHeader
 *  - Body: AdminSidebar + AdminMain (contentArea)
 */

import { createAdminHeader } from './AdminHeader.js';
import { createAdminSidebar } from './AdminSidebar.js';

/**
 * @param {{
 *   currentPath?: string,
 *   onSearch?: (query: string) => void,
 * }} [options]
 * @returns {{
 *   element: HTMLElement,
 *   contentArea: HTMLElement,
 *   sidebar: HTMLElement,
 *   destroy: () => void,
 * }}
 */
export function createAdminLayout({ currentPath = window.location.pathname, onSearch } = {}) {
  // Activate admin workspace isolation
  document.body.classList.add('admin-mode');

  const layout = document.createElement('div');
  layout.className = 'admin-layout';

  const sidebar = createAdminSidebar({ currentPath });

  const header = createAdminHeader({
    onToggleSidebar: () => sidebar.toggle(),
    onSearch,
  });
  layout.appendChild(header);

  const body = document.createElement('div');
  body.className = 'admin-layout__body';

  body.appendChild(sidebar);

  const contentArea = document.createElement('main');
  contentArea.className = 'admin-main';
  contentArea.setAttribute('role', 'main');
  body.appendChild(contentArea);

  layout.appendChild(body);

  function destroy() {
    document.body.classList.remove('admin-mode');
  }

  return {
    element: layout,
    contentArea,
    sidebar,
    destroy,
  };
}
