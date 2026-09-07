/**
 * AdminRegisterPage.js — Admin Registration Page
 *
 * Restricted page: Only accessible to currently authenticated administrators (roles: ['Admin']).
 * Allows an active administrator to register a new administrator account.
 * Normal customers and guests are prevented from accessing this page by the router role guard.
 *
 * Pure frontend presentation layer:
 *  - ZERO demo data
 *  - ZERO network calls (ready for developer's backend integration)
 */

import { createAdminLayout } from '../components/AdminLayout.js';
import { createAdminPageHeader } from '../components/AdminPageHeader.js';
import { createButton } from '../../../shared/components/Button/Button.js';
import { createIcon } from '../../../shared/components/Icon/Icon.js';
import { navigate } from '../../../app/router.js';

/**
 * @param {{
 *   onRegisterAdmin?: (data: { firstName: string, lastName: string, email: string, role: string }) => void,
 * }} [props]
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function AdminRegisterPage(props = {}) {
  const layout = createAdminLayout({ currentPath: '/admin/kayit' });
  const container = layout.contentArea;

  // Header
  const header = createAdminPageHeader({
    title: 'Yeni Yönetici Kaydı',
    description: 'Yalnızca yetkili sistem yöneticileri yeni bir yönetici veya yetkili hesap tanımlayabilir.',
  });
  container.appendChild(header);

  // Card container
  const card = document.createElement('div');
  card.className = 'admin-card';
  card.style.maxWidth = '640px';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'admin-card__header';
  cardHeader.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--space-2);">
      <span class="admin-topbar__brand-icon"></span>
      <h2 class="admin-card__title">Yönetici Bilgileri</h2>
    </div>
    <span class="admin-status-badge admin-status-badge--warning">Yönetici Yetkisi Gerektirir</span>
  `;
  cardHeader.querySelector('.admin-topbar__brand-icon').appendChild(createIcon('shield', { size: 18 }));
  card.appendChild(cardHeader);

  // Form body
  const form = document.createElement('form');
  form.className = 'admin-card__body';
  form.noValidate = true;

  // Success / Error notification area
  const alertArea = document.createElement('div');
  form.appendChild(alertArea);

  // Name Row (2 columns)
  const nameRow = document.createElement('div');
  nameRow.style.display = 'grid';
  nameRow.style.gridTemplateColumns = '1fr 1fr';
  nameRow.style.gap = 'var(--space-4)';

  const firstNameGroup = document.createElement('div');
  firstNameGroup.className = 'admin-form-group';
  firstNameGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-first-name">Ad *</label>
    <input type="text" id="admin-reg-first-name" class="admin-form-input" placeholder="Adınızı girin" required />
  `;
  nameRow.appendChild(firstNameGroup);

  const lastNameGroup = document.createElement('div');
  lastNameGroup.className = 'admin-form-group';
  lastNameGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-last-name">Soyad *</label>
    <input type="text" id="admin-reg-last-name" class="admin-form-input" placeholder="Soyadınızı girin" required />
  `;
  nameRow.appendChild(lastNameGroup);
  form.appendChild(nameRow);

  // Email
  const emailGroup = document.createElement('div');
  emailGroup.className = 'admin-form-group';
  emailGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-email">Yönetici E-posta Adresi *</label>
    <input type="email" id="admin-reg-email" class="admin-form-input" placeholder="yonetici@shopapp.com" required />
  `;
  form.appendChild(emailGroup);

  // Password Row (2 columns)
  const passRow = document.createElement('div');
  passRow.style.display = 'grid';
  passRow.style.gridTemplateColumns = '1fr 1fr';
  passRow.style.gap = 'var(--space-4)';

  const passGroup = document.createElement('div');
  passGroup.className = 'admin-form-group';
  passGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-password">Şifre *</label>
    <input type="password" id="admin-reg-password" class="admin-form-input" placeholder="En az 8 karakter" required />
  `;
  passRow.appendChild(passGroup);

  const confirmPassGroup = document.createElement('div');
  confirmPassGroup.className = 'admin-form-group';
  confirmPassGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-confirm-password">Şifre Tekrar *</label>
    <input type="password" id="admin-reg-confirm-password" class="admin-form-input" placeholder="Şifrenizi tekrar girin" required />
  `;
  passRow.appendChild(confirmPassGroup);
  form.appendChild(passRow);

  // Role Level
  const roleGroup = document.createElement('div');
  roleGroup.className = 'admin-form-group';
  roleGroup.innerHTML = `
    <label class="admin-form-label" for="admin-reg-role">Yönetici Yetki Seviyesi *</label>
    <select id="admin-reg-role" class="admin-form-select">
      <option value="Admin">Sistem Yöneticisi (Tam Yetki)</option>
      <option value="CatalogAdmin">Katalog / Kategori Yöneticisi</option>
      <option value="OrderAdmin">Sipariş & Kargo Yöneticisi</option>
    </select>
  `;
  form.appendChild(roleGroup);

  // Actions (İptal / Kaydet)
  const actionsWrap = document.createElement('div');
  actionsWrap.className = 'admin-form-actions';

  const { element: cancelBtn } = createButton({
    label: 'İptal',
    variant: 'secondary',
    onClick: () => {
      navigate('/admin');
    },
  });
  actionsWrap.appendChild(cancelBtn);

  const { element: submitBtn } = createButton({
    label: 'Yöneticiyi Kaydet',
    variant: 'primary',
    type: 'submit',
  });
  actionsWrap.appendChild(submitBtn);

  form.appendChild(actionsWrap);
  card.appendChild(form);
  container.appendChild(card);

  // Form inputs
  const firstNameInput = firstNameGroup.querySelector('input');
  const lastNameInput = lastNameGroup.querySelector('input');
  const emailInput = emailGroup.querySelector('input');
  const passwordInput = passGroup.querySelector('input');
  const confirmPasswordInput = confirmPassGroup.querySelector('input');
  const roleSelect = roleGroup.querySelector('select');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alertArea.innerHTML = '';

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPass = confirmPasswordInput.value;
    const role = roleSelect.value;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPass) {
      showError('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (password.length < 8) {
      showError('Şifre en az 8 karakter uzunluğunda olmalıdır.');
      return;
    }

    if (password !== confirmPass) {
      showError('Girdiğiniz şifreler birbiriyle eşleşmiyor.');
      return;
    }

    // Success notification
    const payload = { firstName, lastName, email, role };
    if (typeof props.onRegisterAdmin === 'function') {
      props.onRegisterAdmin(payload);
    }

    form.reset();
    showSuccess(`"${firstName} ${lastName}" (${role}) yöneticisi başarıyla tanımlandı. Gerçek hesap oluşturma backend entegrasyonu tamamlandığında kalıcı hale gelecektir.`);
  });

  function showError(msg) {
    alertArea.innerHTML = `
      <div class="auth-admin-notice" style="background: rgba(255, 59, 48, 0.1); border-color: rgba(255, 59, 48, 0.3); color: #dc3545;" role="alert">
        <span>${msg}</span>
      </div>
    `;
  }

  function showSuccess(msg) {
    alertArea.innerHTML = `
      <div class="auth-admin-notice" style="background: rgba(52, 199, 89, 0.1); border-color: rgba(52, 199, 89, 0.3); color: #15803d;" role="status">
        <span>${msg}</span>
      </div>
    `;
  }

  return {
    element: layout.element,
    destroy: layout.destroy,
  };
}
