/**
 * AdminDashboardPage.js — Yönetim Paneli (Admin Dashboard)
 *
 * Renders overview summary metrics, recent orders, and inventory warnings
 * dynamically from supplied data.
 * Zero demo data, zero hardcoded records.
 *
 * Reachable only via the existing /admin route, gated by role check.
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createAdminMetricCard } from '../components/AdminMetricCard.js';
import { createAdminStatusBadge } from '../components/AdminStatusBadge.js';
import { getDashboardSummary, getRecentOrders, getLowStockProducts } from '../services/adminService.js';
import { createLoadingState, createEmptyState, createErrorState } from '../../../shared/components/StateView/StateView.js';
import { formatPrice } from '../../../shared/utils/format.js';

function createMetricsRow(summary = {}) {
  const grid = document.createElement('div');
  grid.className = 'admin-metrics-grid';

  grid.appendChild(createAdminMetricCard({
    icon: 'box',
    label: 'Toplam Ürün',
    value: summary?.totalProducts,
    tone: 'default',
  }));

  grid.appendChild(createAdminMetricCard({
    icon: 'folder',
    label: 'Toplam Kategori',
    value: summary?.totalCategories,
    tone: 'purple',
  }));

  grid.appendChild(createAdminMetricCard({
    icon: 'truck',
    label: 'Bekleyen Sipariş',
    value: summary?.pendingOrders,
    tone: 'success',
  }));

  const lowStock = summary?.lowStockCount;
  grid.appendChild(createAdminMetricCard({
    icon: 'alert-circle',
    label: 'Stok Uyarısı',
    value: lowStock,
    tone: lowStock && lowStock > 0 ? 'warning' : 'default',
  }));

  return grid;
}

function createOrdersTable(orders = []) {
  const wrap = document.createElement('div');
  wrap.className = 'admin-table-wrap';

  const table = document.createElement('table');
  table.className = 'admin-table';

  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Sipariş No</th>
        <th scope="col">Müşteri</th>
        <th scope="col">Tutar</th>
        <th scope="col">Durum</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement('tbody');
  orders.forEach((order) => {
    const row = document.createElement('tr');

    const noTd = document.createElement('td');
    noTd.textContent = order.orderNumber || order.siparisNo || `#${order.id || ''}`;
    row.appendChild(noTd);

    const custTd = document.createElement('td');
    custTd.textContent = order.customerName || order.musteriAdi || '—';
    row.appendChild(custTd);

    const totalTd = document.createElement('td');
    totalTd.textContent = order.total !== undefined ? formatPrice(order.total) : '—';
    row.appendChild(totalTd);

    const statusTd = document.createElement('td');
    statusTd.appendChild(createAdminStatusBadge({ status: order.status || order.durum }));
    row.appendChild(statusTd);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  wrap.appendChild(table);
  return wrap;
}

function createLowStockList(products = []) {
  const list = document.createElement('ul');
  list.className = 'admin-recent-list';
  list.setAttribute('role', 'list');

  products.forEach((product) => {
    const item = document.createElement('li');
    item.className = 'admin-recent-item';
    item.innerHTML = `
      <span class="admin-recent-item__name">${product.name || product.ad || 'Ürün'}</span>
      <span class="admin-status-badge admin-status-badge--warning" aria-label="Stok: ${product.stock || 0} adet">${product.stock || 0} adet kaldı</span>
    `;
    list.appendChild(item);
  });

  return list;
}

/**
 * @param {{
 *   summary?: any,
 *   recentOrders?: any[],
 *   lowStockProducts?: any[],
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminDashboardPage(props = {}) {
  const layout = createAdminLayout({ currentPath: '/admin' });
  const container = layout.contentArea;

  const header = createAdminPageHeader({
    title: 'Yönetim Paneli',
    description: 'Mağazanızın genel durumunu, siparişlerini ve stok bildirimlerini buradan takip edebilirsiniz.',
  });
  container.appendChild(header);

  const contentWrap = document.createElement('div');
  contentWrap.style.display = 'flex';
  contentWrap.style.flexDirection = 'column';
  contentWrap.style.gap = 'var(--space-6)';
  container.appendChild(contentWrap);

  async function load() {
    contentWrap.innerHTML = '';
    contentWrap.appendChild(createLoadingState({ message: 'Panel verileri yükleniyor...' }));

    try {
      // Use supplied props if provided; otherwise query adminService stubs
      const summary = props.summary ?? await getDashboardSummary();
      const recentOrders = props.recentOrders ?? await getRecentOrders();
      const lowStockProducts = props.lowStockProducts ?? await getLowStockProducts();

      contentWrap.innerHTML = '';
      contentWrap.appendChild(createMetricsRow(summary));

      // 1. Son Siparişler Bölümü
      const ordersCard = document.createElement('div');
      ordersCard.className = 'admin-card';
      ordersCard.innerHTML = `
        <div class="admin-card__header">
          <h2 class="admin-card__title">Son Siparişler</h2>
          <span class="admin-card__badge">${recentOrders.length} Sipariş</span>
        </div>
      `;
      const ordersBody = document.createElement('div');
      ordersBody.className = 'admin-card__body';
      ordersBody.style.padding = '0';

      if (recentOrders.length > 0) {
        ordersBody.appendChild(createOrdersTable(recentOrders));
      } else {
        ordersBody.appendChild(
          createEmptyState({
            icon: 'cart',
            title: 'Henüz sipariş yok',
            description: 'Yeni siparişler alındığında burada listelenecektir.',
          }),
        );
      }
      ordersCard.appendChild(ordersBody);
      contentWrap.appendChild(ordersCard);

      // 2. Stoğu Azalan Ürünler Bölümü
      const stockCard = document.createElement('div');
      stockCard.className = 'admin-card';
      stockCard.innerHTML = `
        <div class="admin-card__header">
          <h2 class="admin-card__title">Stoğu Azalan Ürünler</h2>
          <span class="admin-card__badge">${lowStockProducts.length} Ürün</span>
        </div>
      `;
      const stockBody = document.createElement('div');
      stockBody.className = 'admin-card__body';

      if (lowStockProducts.length > 0) {
        stockBody.appendChild(createLowStockList(lowStockProducts));
      } else {
        stockBody.appendChild(
          createEmptyState({
            icon: 'check',
            title: 'Stok uyarısı yok',
            description: 'Tüm ürünlerin stok seviyesi yeterli düzeyde.',
          }),
        );
      }
      stockCard.appendChild(stockBody);
      contentWrap.appendChild(stockCard);

    } catch (error) {
      contentWrap.innerHTML = '';
      contentWrap.appendChild(createErrorState({
        title: 'Panel verileri görüntülenemedi',
        message: error?.message ?? 'Veriler yüklenirken bir sorun oluştu.',
        onRetry: load,
      }));
    }
  }

  load();

  return {
    element: layout.element,
    destroy: layout.destroy,
  };
}
