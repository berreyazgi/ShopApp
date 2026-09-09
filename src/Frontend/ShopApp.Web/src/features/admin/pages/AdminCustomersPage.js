/**
 * AdminCustomersPage.js — Customer Management Admin Page
 *
 * Renders customer records dynamically from supplied data.
 * Zero demo customers, zero fabricated identities.
 *
 * Features:
 *  - Customer table (Avatar, Name, Email, Phone, Registration Date, Order Count, Status, Actions)
 *  - Local search by name or email
 *  - Dynamic pagination
 *  - Clean empty & loading states
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createAdminStatusBadge } from '../components/AdminStatusBadge.js';
import { createAdminPagination } from '../components/AdminPagination.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { getAdminCustomers, updateCustomerStatus } from '../../customers/services/customerService.js';

/**
 * @param {{
 *   customers?: Array,
 *   pageSize?: number,
 *   onViewCustomer?: (customer: any) => void,
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminCustomersPage(props = {}) {
  let customers = props.customers ?? [];
  const pageSize = props.pageSize ?? 10;

  let searchQuery = '';
  let currentPage = 1;

  const layout = createAdminLayout({ currentPath: '/admin/musteriler' });
  const container = layout.contentArea;

  function getFilteredCustomers() {
    return customers.filter((c) => {
      const name = (c.fullName || `${c.firstName || ''} ${c.lastName || ''}` || c.adSoyad || '').toLowerCase();
      const email = (c.email || '').toLowerCase();
      return !searchQuery || name.includes(searchQuery) || email.includes(searchQuery);
    });
  }

  function renderPage() {
    container.innerHTML = '';

    // Page Header
    const header = createAdminPageHeader({
      title: 'Müşteriler',
      description: 'Kayıtlı müşterilerinizi görüntüleyin, hesap durumlarını ve sipariş özetlerini inceleyin.',
    });
    container.appendChild(header);

    const card = document.createElement('div');
    card.className = 'admin-card';

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'admin-table-toolbar';

    const searchWrap = document.createElement('div');
    searchWrap.className = 'admin-table-toolbar__search';
    searchWrap.innerHTML = '<span class="admin-table-toolbar__search-icon"></span>';
    searchWrap.querySelector('.admin-table-toolbar__search-icon').appendChild(createIcon('search', { size: 14 }));

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'admin-table-toolbar__search-input';
    searchInput.placeholder = 'Müşteri adı veya e-posta ara...';
    searchInput.value = searchQuery;
    searchInput.addEventListener('input', (e) => {
      searchQuery = String(e?.target?.value ?? searchInput.value ?? '').trim().toLowerCase();
      currentPage = 1;
      renderTable();
    });
    searchWrap.appendChild(searchInput);
    toolbar.appendChild(searchWrap);

    card.appendChild(toolbar);

    const tableWrap = document.createElement('div');
    tableWrap.className = 'admin-table-wrap';
    card.appendChild(tableWrap);

    const paginationWrap = document.createElement('div');
    card.appendChild(paginationWrap);

    function renderTable() {
      tableWrap.innerHTML = '';
      paginationWrap.innerHTML = '';

      const filtered = getFilteredCustomers();

      if (customers.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = 'var(--space-10)';
        empty.style.textAlign = 'center';
        empty.style.color = 'var(--color-secondary)';
        empty.innerHTML = `
          <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Henüz kayıtlı müşteri bulunmuyor.</p>
          <p style="font-size:var(--text-xs); margin:0;">Yeni müşteriler kaydoldukça veya sipariş verdikçe burada listelenecektir.</p>
        `;
        tableWrap.appendChild(empty);
        return;
      }

      if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = 'var(--space-10)';
        empty.style.textAlign = 'center';
        empty.style.color = 'var(--color-secondary)';
        empty.innerHTML = `
          <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Aramanızla eşleşen müşteri bulunamadı.</p>
          <p style="font-size:var(--text-xs); margin:0;">Arama terimini değiştirerek tekrar deneyebilirsiniz.</p>
        `;
        tableWrap.appendChild(empty);
        return;
      }

      const totalPages = Math.ceil(filtered.length / pageSize);
      if (currentPage > totalPages) currentPage = totalPages;
      const start = (currentPage - 1) * pageSize;
      const pageItems = filtered.slice(start, start + pageSize);

      const table = document.createElement('table');
      table.className = 'admin-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th scope="col">Müşteri</th>
            <th scope="col">E-posta</th>
            <th scope="col">Kayıt Tarihi</th>
            <th scope="col">Sipariş Sayısı</th>
            <th scope="col">Durum</th>
            <th scope="col" style="text-align: right;">İşlemler</th>
          </tr>
        </thead>
      `;

      const tbody = document.createElement('tbody');

      pageItems.forEach((c) => {
        const row = document.createElement('tr');

        const name = c.fullName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.adSoyad || 'Müşteri';
        const initials = (name.split(' ').map((n) => n[0]).join('') || 'M').slice(0, 2).toUpperCase();

        // Customer & Avatar
        const custTd = document.createElement('td');
        const custCell = document.createElement('div');
        custCell.className = 'admin-table-cell--name';

        const avatar = document.createElement('div');
        avatar.className = 'admin-topbar__avatar';
        avatar.style.width = '32px';
        avatar.style.height = '32px';
        avatar.textContent = initials;
        custCell.appendChild(avatar);

        const nameSpan = document.createElement('span');
        nameSpan.style.fontWeight = 'var(--font-medium)';
        nameSpan.textContent = name;
        custCell.appendChild(nameSpan);

        custTd.appendChild(custCell);
        row.appendChild(custTd);

        // Email
        const emailTd = document.createElement('td');
        emailTd.textContent = c.email || '—';
        row.appendChild(emailTd);

        // Created At
        const dateTd = document.createElement('td');
        if (c.createdAt || c.olusturmaTarihi) {
          const d = new Date(c.createdAt || c.olusturmaTarihi);
          dateTd.textContent = !isNaN(d.getTime()) ? d.toLocaleDateString('tr-TR') : '—';
        } else {
          dateTd.textContent = '—';
        }
        row.appendChild(dateTd);

        // Order Count
        const countTd = document.createElement('td');
        const count = c.orderCount ?? c.siparisSayisi;
        countTd.textContent = count !== undefined && count !== null ? `${count} Sipariş` : '—';
        row.appendChild(countTd);

        // Status
        const statusTd = document.createElement('td');
        const isActive = c.isActive !== undefined ? c.isActive : true;
        statusTd.appendChild(createAdminStatusBadge({ isActive }));
        row.appendChild(statusTd);

        // Actions
        const actionsTd = document.createElement('td');
        actionsTd.style.textAlign = 'right';

        const actionsWrap = document.createElement('div');
        actionsWrap.className = 'admin-table-actions';
        actionsWrap.style.justifyContent = 'flex-end';

        const viewBtn = document.createElement('button');
        viewBtn.type = 'button';
        viewBtn.className = 'admin-table-btn';
        viewBtn.setAttribute('aria-label', `${name} detayını görüntüle`);
        viewBtn.title = 'İncele';
        viewBtn.appendChild(createIcon('eye', { size: 14 }));
        viewBtn.addEventListener('click', () => {
          if (typeof props.onViewCustomer === 'function') props.onViewCustomer(c);
        });
        actionsWrap.appendChild(viewBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'admin-table-btn';
        const targetStatus = !isActive;
        toggleBtn.setAttribute('aria-label', `${name} hesabını ${targetStatus ? 'aktif' : 'pasif'} yap`);
        toggleBtn.title = isActive ? 'Hesabı Pasife Al' : 'Hesabı Aktifleştir';
        toggleBtn.appendChild(createIcon(isActive ? 'close' : 'check', { size: 14 }));
        toggleBtn.addEventListener('click', async () => {
          const custId = c.id ?? c.musteriId;
          try {
            toggleBtn.disabled = true;
            await updateCustomerStatus(custId, { isActive: targetStatus });
            c.isActive = targetStatus;
            c.durum = targetStatus ? 'Aktif' : 'Pasif';
            if (typeof props.onUpdateCustomerStatus === 'function') {
              props.onUpdateCustomerStatus(custId, targetStatus);
            }
            renderTable();
          } catch (err) {
            alert(err?.message || 'Müşteri durumu güncellenemedi.');
            toggleBtn.disabled = false;
          }
        });
        actionsWrap.appendChild(toggleBtn);

        actionsTd.appendChild(actionsWrap);
        row.appendChild(actionsTd);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      tableWrap.appendChild(table);

      const pagination = createAdminPagination({
        currentPage,
        totalPages,
        totalItems: filtered.length,
        pageSize,
        onPageChange: (newPage) => {
          currentPage = newPage;
          renderTable();
        },
      });
      paginationWrap.appendChild(pagination);
    }

    renderTable();
    container.appendChild(card);
  }

  renderPage();

  let destroyed = false;
  if (!props.customers) {
    getAdminCustomers()
      .then((fetched) => {
        if (destroyed) return;
        customers = fetched ?? [];
        renderPage();
      })
      .catch((err) => console.error('[AdminCustomersPage] failed to load customers:', err));
  }

  function destroy() {
    destroyed = true;
    layout.destroy();
  }

  return {
    element: layout.element,
    destroy,
  };
}
