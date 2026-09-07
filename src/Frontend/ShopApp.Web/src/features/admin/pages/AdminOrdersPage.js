/**
 * AdminOrdersPage.js — Order Management Admin Page
 *
 * Renders orders dynamically from supplied data.
 * Zero demo orders, zero hardcoded records.
 *
 * Features:
 *  - Orders table (Order No, Customer, Date, Items Count, Total Amount, Status, Actions)
 *  - Filter by order status
 *  - Search by order number or customer name
 *  - Dynamic pagination
 *  - Clean empty & loading states
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createAdminStatusBadge } from '../components/AdminStatusBadge.js';
import { createAdminPagination } from '../components/AdminPagination.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { formatPrice } from '../../../shared/utils/format.js';

/**
 * @param {{
 *   orders?: Array,
 *   pageSize?: number,
 *   onViewOrder?: (order: any) => void,
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminOrdersPage(props = {}) {
  let orders = props.orders ?? [];
  const pageSize = props.pageSize ?? 10;

  let searchQuery = '';
  let selectedFilter = 'all';
  let currentPage = 1;

  const layout = createAdminLayout({ currentPath: '/admin/siparisler' });
  const container = layout.contentArea;

  function getFilteredOrders() {
    return orders.filter((o) => {
      const orderNo = (o.orderNumber || o.siparisNo || `#${o.id || ''}`).toLowerCase();
      const customer = (o.customerName || o.musteriAdi || '').toLowerCase();
      const matches = !searchQuery || orderNo.includes(searchQuery) || customer.includes(searchQuery);
      if (!matches) return false;

      const status = (o.status || o.durum || '').toLowerCase();
      if (selectedFilter === 'hazirlaniyor') return status.includes('hazır') || status.includes('bekle');
      if (selectedFilter === 'kargoda') return status.includes('kargo');
      if (selectedFilter === 'teslim') return status.includes('teslim');
      if (selectedFilter === 'iptal') return status.includes('iptal');
      return true;
    });
  }

  function renderPage() {
    container.innerHTML = '';

    // Page Header
    const header = createAdminPageHeader({
      title: 'Siparişler',
      description: 'Müşterilerinizden gelen siparişleri listeleyin, teslimat durumunu güncelleyin ve detayları inceleyin.',
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
    searchInput.placeholder = 'Sipariş No veya Müşteri ara...';
    searchInput.value = searchQuery;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      currentPage = 1;
      renderTable();
    });
    searchWrap.appendChild(searchInput);
    toolbar.appendChild(searchWrap);

    const filterSelect = document.createElement('select');
    filterSelect.className = 'admin-table-toolbar__filter';
    filterSelect.innerHTML = `
      <option value="all">Tüm Siparişler</option>
      <option value="hazirlaniyor">Hazırlanıyor</option>
      <option value="kargoda">Kargoda</option>
      <option value="teslim">Teslim Edildi</option>
      <option value="iptal">İptal Edildi</option>
    `;
    filterSelect.value = selectedFilter;
    filterSelect.addEventListener('change', (e) => {
      selectedFilter = e.target.value;
      currentPage = 1;
      renderTable();
    });
    toolbar.appendChild(filterSelect);

    card.appendChild(toolbar);

    const tableWrap = document.createElement('div');
    tableWrap.className = 'admin-table-wrap';
    card.appendChild(tableWrap);

    const paginationWrap = document.createElement('div');
    card.appendChild(paginationWrap);

    function renderTable() {
      tableWrap.innerHTML = '';
      paginationWrap.innerHTML = '';

      const filtered = getFilteredOrders();

      if (orders.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = 'var(--space-10)';
        empty.style.textAlign = 'center';
        empty.style.color = 'var(--color-secondary)';
        empty.innerHTML = `
          <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Henüz sipariş bulunmuyor.</p>
          <p style="font-size:var(--text-xs); margin:0;">Yeni siparişler oluşturulduğunda bu listede görüntülenecektir.</p>
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
          <p style="font-weight:var(--font-semibold); margin:0 0 var(--space-1);">Aramanızla eşleşen sipariş bulunamadı.</p>
          <p style="font-size:var(--text-xs); margin:0;">Filtreleri veya arama kriterini değiştirerek tekrar deneyebilirsiniz.</p>
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
            <th scope="col">Sipariş No</th>
            <th scope="col">Müşteri</th>
            <th scope="col">Tarih</th>
            <th scope="col">Ürün Adedi</th>
            <th scope="col">Toplam Tutar</th>
            <th scope="col">Durum</th>
            <th scope="col" style="text-align: right;">İşlemler</th>
          </tr>
        </thead>
      `;

      const tbody = document.createElement('tbody');

      pageItems.forEach((o) => {
        const row = document.createElement('tr');

        const orderNo = o.orderNumber || o.siparisNo || `#${o.id || ''}`;
        const customer = o.customerName || o.musteriAdi || '—';

        // Order No
        const noTd = document.createElement('td');
        noTd.style.fontWeight = 'var(--font-semibold)';
        noTd.textContent = orderNo;
        row.appendChild(noTd);

        // Customer
        const custTd = document.createElement('td');
        custTd.textContent = customer;
        row.appendChild(custTd);

        // Date
        const dateTd = document.createElement('td');
        if (o.date || o.createdAt || o.olusturmaTarihi) {
          const d = new Date(o.date || o.createdAt || o.olusturmaTarihi);
          dateTd.textContent = !isNaN(d.getTime()) ? d.toLocaleDateString('tr-TR') : '—';
        } else {
          dateTd.textContent = '—';
        }
        row.appendChild(dateTd);

        // Items Count
        const itemsTd = document.createElement('td');
        const itemCount = o.itemCount ?? o.urunAdedi ?? (Array.isArray(o.items) ? o.items.length : null);
        itemsTd.textContent = itemCount !== null ? `${itemCount} Ürün` : '—';
        row.appendChild(itemsTd);

        // Total
        const totalTd = document.createElement('td');
        totalTd.textContent = o.total !== undefined ? formatPrice(o.total) : (o.toplamTutar !== undefined ? formatPrice(o.toplamTutar) : '—');
        row.appendChild(totalTd);

        // Status
        const statusTd = document.createElement('td');
        statusTd.appendChild(createAdminStatusBadge({ status: o.status || o.durum }));
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
        viewBtn.setAttribute('aria-label', `${orderNo} detayını görüntüle`);
        viewBtn.title = 'İncele';
        viewBtn.appendChild(createIcon('eye', { size: 14 }));
        viewBtn.addEventListener('click', () => {
          if (typeof props.onViewOrder === 'function') props.onViewOrder(o);
        });
        actionsWrap.appendChild(viewBtn);

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

  return {
    element: layout.element,
    destroy: layout.destroy,
  };
}
