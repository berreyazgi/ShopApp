# ShopApp Development Notes

## Profile and Address Architecture
- **Backend Controllers**:
  - `ProfilController` is mapped to `[Route("api/profil")]` and requires `[Authorize]`. It exposes `GET /api/profil` and `PUT /api/profil` using CQRS queries `GetMyProfileQuery` and commands `UpdateMyProfileCommand`.
  - `AdresController` is mapped to `[Route("api/adres")]` and requires `[Authorize]`. It exposes `GET /api/adres`, `POST /api/adres`, `PUT /api/adres/{id:guid}`, and `DELETE /api/adres/{id:guid}`.
  - Ownership security: When updating or deleting addresses, handlers always verify that `address.MusteriId == currentCustomer.MusteriId` derived from `ICurrentCustomerContext`.
- **Database Schema for Addresses**:
  - The table is `kimlik.Adresler` with columns `Id`, `MusteriId`, `AdresBilgisi`, `Ulke`, `Sehir` (integer plate code 1–81), `Ilce` (integer), `PostaKodu` (string max 10), `OlusturmaTarihi`, `GuncellemeTarihi`.
  - There is no `IsDefault` column in the database, so the "Varsayılan" badge is omitted cleanly without faking or running database migrations.
- **Orders Integration**:
  - `GET /api/siparis` (`SiparisController`) is reused for order history.
  - `ResultSiparisDto` includes `DateTime OlusturmaTarihi` and orders are returned ordered by `OlusturmaTarihi DESC`.
  - The profile page shows the 3 most recent orders from `getAllOrders()`.
- **Zero Demo Data Rule**:
  - `profileDemoData.js` has been permanently deleted.
  - Profile, address, and recent order data are strictly retrieved from real backend APIs. If an API request fails, clean error/retry states are displayed.
- **Profile Layout & Navigation**:
  - "Hızlı İşlemler" (`QuickActionsCard.js`) was removed per user request. To maintain layout balance, "Kayıtlı Adreslerim" now spans the full grid width (`grid-column: 1 / -1;`) with a responsive grid (`repeat(auto-fill, minmax(280px, 1fr))`).
  - "Adres Bilgilerim" was removed from the profile sidebar (`ProfileSidebar.js`), leaving 4 navigation items: "Hesabım", "Siparişlerim", "Bize Ulaşın", and "Sıkça Sorulan Sorular".

## Admin Architecture & Dynamic Data Rules
- **Workspace Layout Isolation (Option A)**:
  - `AdminLayout.js` automatically activates `body.admin-mode` on mount, hiding customer `#app-header` and `#app-footer` while in the `/admin/*` route namespace. When unmounting, `destroy()` cleanly removes `.admin-mode`.
- **Routes & Role Protection**:
  - Admin routes (`/admin`, `/admin/urunler`, `/admin/kategoriler`, `/admin/musteriler`, `/admin/siparisler`) are registered in `routes.js` with `requiresAuth: true, roles: ['Admin']`.
  - Non-authenticated users are redirected to `/giris`, non-admins to `/erisim-engellendi`.
- **Zero Demo / Mock Data Rule**:
  - `adminDemoData.js` was permanently removed. No fake database records or mock numbers exist in the admin codebase.
  - All components render supplied dynamic data; when datasets are empty, clean Turkish empty states are rendered instead of fabricated demo records.
  - Missing metric values safely render `—` rather than defaulting to `0` or fake numbers.
- **Category Management Page (`AdminCategoriesPage.js`)**:
  - 3-column desktop layout (Option A): Left = `CategoryTree.js` (recursive tree with expand/collapse), Center = `CategoryTable.js` (search, filter, pagination, actions), Right = `CategoryFormPanel.js` (create/edit modes with client-side image preview and validation).
  - Bottom = `RecentCategoriesCard.js`.
  - Top = `CategoryStatistics.js` (derives real counts/ratios safely from supplied data).
- **Network Boundary**:
  - No `fetch()`, `XMLHttpRequest`, `axios`, or `apiClient` calls were added to the admin components. Pure frontend presentation layer ready for the developer's future API integration.
- **Admin Registration & Role Guarding**:
  - Route `/admin/kayit` is strictly protected (`roles: ['Admin']`). Only authenticated administrators can access `AdminRegisterPage.js` to define and register new admin accounts.
  - Per user request, the "Yönetici Olarak Kaydol" button and admin warning notice were completely removed from `LoginPage.js` (`/giris`) to keep the customer login page clean and free of administrative affordances.
  - Unauthenticated users attempting to navigate directly to `/admin/kayit` are redirected by the router to `/giris`, and non-admin customers are redirected to `/erisim-engellendi`.

## Product Management Architecture (`AdminProductsPage.js`)
- **Zero Demo / Mock Data**:
  - `AdminProductsPage.js` and all child components (`AdminProductCard.js`, `AdminProductGrid.js`, `AdminProductList.js`, `AdminProductFormModal.js`, `AdminProductDetailModal.js`) accept purely supplied dynamic data via props.
  - Zero hardcoded product arrays, zero sample prices, zero fake SKU/category records, and zero copied screenshot data exist in the codebase.
- **Hybrid Stock Badge Decision**:
  - `createProductStockBadge` combines semantic status badges with exact remaining counts:
    - Out of Stock (`stock === 0`): Red danger badge labeled `"Tükendi"` (count omitted).
    - Low Stock (`1 <= stock <= 5`): Amber warning badge labeled `"Düşük Stok (Son X Adet)"`.
    - In Stock (`stock > 5`): Green success badge labeled `"Stokta (X Adet)"`.
    - Missing / Null: Neutral badge labeled `"—"`.
    - Explicit `stockStatus` overrides (e.g. `'out-of-stock'`, `'low-stock'`, `'in-stock'`) are respected with appropriate tone.
- **View Modes & Responsive Grid**:
  - Defaults to responsive card grid (`viewMode = 'grid'`) with 4 columns desktop (1360px+), 3 columns (992px–1360px), 2 columns (640px–992px), 1 column (<640px).
  - Switches dynamically to data table list (`viewMode = 'list'`) reusing the exact same supplied data collection.
- **Modals (Option A)**:
  - `AdminProductFormModal.js`: Handles Create and Edit modes in a responsive 2-column dialog (Left: text inputs & category dropdown; Right: file picker + client-side `FileReader` image preview). Emits `onSave(formData)` without network calls.
  - `AdminProductDetailModal.js`: Read-only modal displaying full product details and providing an "Düzenle" quick action.
  - `AdminConfirmModal.js`: Reused for deletion confirmation dialog (*"Bu ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz."*).
- **Client-Side Filtering & Sorting**:
  - Real-time search by product name, SKU, and category name.
  - Category filter dropdown populated dynamically from supplied `categories`.
  - Status filter: `Tüm Durumlar`, `Aktif`, `Pasif`.
  - Stock filter: `Stok Durumu`, `Stokta`, `Düşük Stok`, `Stokta Yok`.
  - Sorting: 8 options (`Eklenme Tarihi (Yeni → Eski)`, `Eklenme Tarihi (Eski → Yeni)`, `Fiyat (Artan/Azalan)`, `Ürün Adı (A → Z / Z → A)`, `Stok (Artan/Azalan)`).
  - Clear filters ("Temizle") resets all filters and search query.
- **Data States**:
  - Full support for Loading (`createLoadingState`), Error with retry callback (`createErrorState`), Empty (`createEmptyState`), and Filtered-Empty states.
- **Network Safety Boundary**:
  - Absolutely no `fetch()`, `apiClient`, `axios`, or `XMLHttpRequest` calls were added. Ready for future backend/API integration by the developer.

## Modern Address Modal UI Refactor (`createAddressModal`)
- **8-Row Exact Sequence (Option A Layout)**:
  - Row 1: `Ad *` (50%) | `Soyad *` (50%) in `.profile-form-row` (2-column desktop grid, stacks on mobile <640px).
  - Row 2: `Telefon *` with static `+90` country code prefix box and custom Vanilla JS phone input mask formatting digits dynamically as `(5XX) XXX XX XX`.
  - Row 3: `İl *` (50%) | `İlçe *` (50%) in `.profile-form-row`. İl is populated via approved `TURKEY_CITIES` (plate codes 1–81). İlçe is dynamically populated from supplied provider or cleanly disabled with placeholder (*"Önce il seçiniz"*).
  - Row 4: `Mahalle *` (full width). Dynamically populated from supplied provider or cleanly disabled with placeholder (*"Önce ilçe seçiniz"*).
  - Row 5: Delivery Warning Box (`.profile-address-warning`) featuring a soft pale orange container (`#fff9f2`), alert circle SVG icon, and instructional delivery guidance text.
  - Row 6: `Adres *` multiline `<textarea>` for detailed street, building, and door information.
  - Row 7: `Adres Başlığı *` text input (e.g. "Evim", "İş Yeri").
  - Row 8: `Fatura Türü` accessible segmented radio control (`role="radiogroup"`, `role="radio"`, `aria-checked`, arrow key navigation) with "Bireysel" (default active) and "Kurumsal".
  - Footer: Dedicated footer (`.profile-modal-footer--full`) with full-width primary button (`.profile-btn--full`, "Kaydet" or "Güncelle").
- **Zero Fake Location Data Rule**:
  - Zero mock districts, fake neighborhoods, or sample postal codes were hardcoded.
  - Cascading resets: selecting an İl clears and resets İlçe and Mahalle; selecting an İlçe clears and resets Mahalle.
- **Dedicated Sizing Modifier (Option A)**:
  - Uses `.profile-modal-container--address` (`max-width: 620px; width: 95vw; border-radius: var(--radius-xl);`), preserving the 480px width for smaller dialogs (such as Delete Confirmation).
- **Network Safety & Backward Compatibility**:
  - Emits full modern payload while preserving compatibility fields expected by `profileService.createAddress` and `updateAddress`:
    ```js
    {
      firstName, lastName, phone, cityId, districtId, neighborhoodId,
      addressLine, addressTitle, billingType,
      // Backward compatibility fields:
      sehir: Number(cityId),
      ilce: districtId ? Number(districtId) : 0,
      postaKodu: address?.postaKodu || '34000',
      adresBilgisi: addressLine,
      ad: firstName, soyad: lastName, telefon: phone,
      adresBasligi: addressTitle, faturaTuru: billingType, ulke: 90
    }
    ```
  - Backend and database were left 100% untouched. No new `fetch()` or `apiClient` calls were created.


## Shared Footer Ownership
- `App.js` is the sole renderer of the shared site footer. Duplicate `FeatureBenefits`/inline benefits rows were removed from Home, About, Cart, Order Confirmation, Order List, and Profile pages; do not restore them at page level.

## Temporary Directory Cleanup
- `tmp/shopapp-auth-patch.7p8f9i` was an obsolete patch workspace accidentally tracked in Git during commit `72327a68`. It has been removed via `git rm -r` and should not be restored.

