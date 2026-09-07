/**
 * ProfilePage.js — Profilim (My Profile) Sayfası
 *
 * %100 gerçek veritabanı verileriyle çalışır:
 *  - Profil bilgileri: GET /api/profil
 *  - Son siparişler:   GET /api/siparis
 *  - Kayıtlı adresler: GET /api/adres
 *
 * Hiçbir şekilde demo, mock veya statik müşteri verisi kullanılmaz.
 * API hatasında demo veri yerine temiz hata / tekrar dene durumu gösterilir.
 */

import { isAuthenticated } from '../../auth/state/authStore.js';
import { navigate } from '../../../app/router.js';
import { createLoadingState, createErrorState } from '../../../shared/components/StateView/StateView.js';
import {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../services/profileService.js';
import { getAllOrders } from '../../orders/services/orderService.js';
import { createProfileSidebar } from '../components/ProfileSidebar.js';
import { createWelcomeBanner } from '../components/WelcomeBanner.js';
import { createPersonalInfoCard } from '../components/PersonalInfoCard.js';
import { createRecentOrdersCard } from '../components/RecentOrdersCard.js';
import { createSavedAddressesCard } from '../components/SavedAddressesCard.js';
import {
  createProfileEditModal,
  createAddressModal,
  createDeleteConfirmModal,
} from '../components/ProfileModals.js';


function createBreadcrumbs() {
  const nav = document.createElement('nav');
  nav.className = 'profile-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML = `
    <div class="container">
      <ol class="profile-breadcrumbs__list">
        <li><a href="/" class="profile-breadcrumbs__link">ShopApp</a></li>
        <li class="profile-breadcrumbs__separator" aria-hidden="true">/</li>
        <li class="profile-breadcrumbs__current" aria-current="page">Hesabım</li>
      </ol>
    </div>
  `;
  return nav;
}


/**
 * @param {{ params?: object }} _options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export default function ProfilePage(_options = {}) {
  const element = document.createElement('div');
  element.className = 'profile-page';

  let activeModal = null;

  function closeModal() {
    if (activeModal) {
      activeModal.destroy();
      activeModal = null;
    }
  }

  // Yetkilendirme kontrolü
  if (!isAuthenticated()) {
    const returnUrl = encodeURIComponent(window.location.pathname);
    navigate(`/giris?returnTo=${returnUrl}`);
    return { element, destroy: () => {} };
  }

  // Breadcrumbs
  element.appendChild(createBreadcrumbs());

  const mainContainer = document.createElement('div');
  mainContainer.className = 'container profile-main-container';
  element.appendChild(mainContainer);

  const contentArea = document.createElement('div');
  contentArea.className = 'profile-content-area';
  mainContainer.appendChild(contentArea);


  let profileData = null;
  let ordersData = [];
  let addressesData = [];

  function scrollToSection(sectionId) {
    const target = contentArea.querySelector(`#${sectionId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderDashboard() {
    contentArea.innerHTML = '';

    const layout = document.createElement('div');
    layout.className = 'profile-layout';

    // 1. Sol Kolon: Kenar Çubuğu
    const sidebar = createProfileSidebar({
      user: profileData,
      onNavigateSection: (id) => scrollToSection(id),
    });
    layout.appendChild(sidebar);

    // 2. Sağ Kolon: Ana Profil Dashboard
    const mainSection = document.createElement('main');
    mainSection.className = 'profile-dashboard';

    // Karşılama Bannerı
    const welcome = createWelcomeBanner({
      firstName: profileData.firstName,
    });
    mainSection.appendChild(welcome);

    // Dashboard Grid: 3 Kart
    const grid = document.createElement('div');
    grid.className = 'profile-dashboard__grid';

    // Kart 1: Kişisel Bilgilerim
    const personalInfoCard = createPersonalInfoCard({
      user: profileData,
      onEdit: () => {
        closeModal();
        activeModal = createProfileEditModal({
          user: profileData,
          onSave: async ({ ad, soyad, telefon }) => {
            const updated = await updateProfile({ ad, soyad, telefon });
            profileData = updated;
            renderDashboard();
          },
          onClose: closeModal,
        });
        document.body.appendChild(activeModal.element);
      },
    });
    grid.appendChild(personalInfoCard);

    // Kart 2: Son Siparişler
    const recentOrdersCard = createRecentOrdersCard({
      orders: ordersData,
    });
    grid.appendChild(recentOrdersCard);

    // Kart 3: Kayıtlı Adreslerim
    const addressesCard = createSavedAddressesCard({
      addresses: addressesData,
      onAddAddress: () => {
        closeModal();
        activeModal = createAddressModal({
          address: null,
          onSave: async (addressPayload) => {
            const created = await createAddress(addressPayload);
            addressesData = [created, ...addressesData];
            renderDashboard();
          },
          onClose: closeModal,
        });
        document.body.appendChild(activeModal.element);
      },
      onEditAddress: (address) => {
        closeModal();
        activeModal = createAddressModal({
          address,
          onSave: async (addressPayload) => {
            const updated = await updateAddress(address.id, addressPayload);
            addressesData = addressesData.map((a) => (a.id === address.id ? updated : a));
            renderDashboard();
          },
          onClose: closeModal,
        });
        document.body.appendChild(activeModal.element);
      },
      onDeleteAddress: (address) => {
        closeModal();
        activeModal = createDeleteConfirmModal({
          address,
          onConfirm: async () => {
            await deleteAddress(address.id);
            addressesData = addressesData.filter((a) => a.id !== address.id);
            renderDashboard();
          },
          onClose: closeModal,
        });
        document.body.appendChild(activeModal.element);
      },
    });
    grid.appendChild(addressesCard);

    mainSection.appendChild(grid);
    layout.appendChild(mainSection);
    contentArea.appendChild(layout);
  }

  async function loadData() {
    contentArea.innerHTML = '';
    contentArea.appendChild(createLoadingState({ message: 'Profil bilgileriniz yükleniyor...' }));

    try {
      const [profileRes, ordersRes, addressesRes] = await Promise.all([
        getProfile(),
        getAllOrders().catch((err) => {
          console.warn('[ProfilePage] Siparişler yüklenemedi:', err);
          return [];
        }),
        getAddresses().catch((err) => {
          console.warn('[ProfilePage] Adresler yüklenemedi:', err);
          return [];
        }),
      ]);

      profileData = profileRes;
      ordersData = ordersRes || [];
      addressesData = addressesRes || [];

      renderDashboard();
    } catch (err) {
      console.error('[ProfilePage] Veri yükleme hatası:', err);
      contentArea.innerHTML = '';
      contentArea.appendChild(
        createErrorState({
          title: 'Profil bilgileri yüklenemedi',
          message: err?.message || 'Bir ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.',
          retryLabel: 'Tekrar Dene',
          onRetry: () => loadData(),
        })
      );
    }
  }

  loadData();

  return {
    element,
    destroy: () => {
      closeModal();
    },
  };
}
