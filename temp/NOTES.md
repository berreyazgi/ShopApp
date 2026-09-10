# ShopApp Development Notes

## Profile and Address Architecture
- **Backend Controllers**:
  - `ProfilController` is mapped to `[Route("api/profil")]` and requires `[Authorize]`. It exposes `GET /api/profil` and `PUT /api/profil` using CQRS queries `GetMyProfileQuery` and commands `UpdateMyProfileCommand`.
  - `AdresController` is mapped to `[Route("api/adres")]` and requires `[Authorize]`. It exposes `GET /api/adres`, `POST /api/adres`, `PUT /api/adres/{id:guid}`, and `DELETE /api/adres/{id:guid}`.
  - Ownership security: When updating or deleting addresses, handlers always verify that `address.MusteriId == currentCustomer.MusteriId` derived from `ICurrentCustomerContext`.
- **Database Schema for Addresses**:
  - The table is `kimlik.Adresler` with columns `Id`, `MusteriId`, `AdresBilgisi`, `Ulke`, `Sehir` (integer plate code 1–81), `Ilce` (integer), `Mahalle` (integer), `PostaKodu` (integer), `OlusturmaTarihi`, `GuncellemeTarihi`.
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
  - "Adres Bilgilerim" and "Sıkça Sorulan Sorular" were removed from the profile sidebar (`ProfileSidebar.js`), leaving 3 navigation items: "Hesabım", "Siparişlerim", and "Bize Ulaşın".

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
- **6-Row Exact Sequence (Option A Layout)**:
  - Row 1: `Ad *` (50%) | `Soyad *` (50%) in `.profile-form-row` (2-column desktop grid, stacks on mobile <640px).
  - Row 2: `İl *` (50%) | `İlçe *` (50%) in `.profile-form-row`. İl is populated via approved `TURKEY_CITIES` (plate codes 1–81). İlçe is dynamically populated from supplied provider or cleanly disabled with placeholder (*"Önce il seçiniz"*).
  - Row 3: `Mahalle *` (50%) | `Posta Kodu *` (50%) in `.profile-form-row`. Mahalle is dynamically populated from supplied provider or cleanly disabled with placeholder (*"Önce ilçe seçiniz"*). Posta Kodu has 5-digit numeric input filtering and validation.
  - Row 4: Delivery Warning Box (`.profile-address-warning`) featuring a soft pale orange container (`#fff9f2`), alert circle SVG icon, and instructional delivery guidance text.
  - Row 5: `Adres *` multiline `<textarea>` for detailed street, building, and door information.
  - Row 6: `Adres Başlığı *` text input (e.g. "Evim", "İş Yeri").
  - Footer: Dedicated footer (`.profile-modal-footer--full`) with full-width primary button (`.profile-btn--full`, "Kaydet" or "Güncelle").
- **Removed Elements**:
  - `Telefon *` input field, prefix box (`+90`), and phone input mask have been removed.
  - `Fatura Türü` segmented toggle control ("Bireysel" / "Kurumsal") has been removed.
- **Zero Fake Location Data Rule**:
  - Zero mock districts, fake neighborhoods, or sample postal codes were hardcoded.
  - Cascading resets: selecting an İl clears and resets İlçe and Mahalle; selecting an İlçe clears and resets Mahalle.
- **Dedicated Sizing Modifier (Option A)**:
  - Uses `.profile-modal-container--address` (`max-width: 620px; width: 95vw; border-radius: var(--radius-xl);`), preserving the 480px width for smaller dialogs (such as Delete Confirmation).
- **Network Safety & Backward Compatibility**:
  - Emits modern payload omitting phone and billing type while sending `postalCode` / `postaKodu`:
    ```js
    {
      firstName, lastName, cityId, districtId, neighborhoodId,
      postalCode, addressLine, addressTitle,
      // Backward compatibility fields:
      sehir: Number(cityId),
      ilce: districtId ? Number(districtId) : 0,
      mahalle: neighborhoodId ? Number(neighborhoodId) : 0,
      postaKodu: Number(postalCode),
      adresBilgisi: addressLine,
      ad: firstName, soyad: lastName,
      adresBasligi: addressTitle, ulke: 90
    }
    ```
  - Backend and database were left 100% untouched. No new `fetch()` or `apiClient` calls were created.


## Shared Footer Ownership
- `App.js` is the sole renderer of the shared site footer. Duplicate `FeatureBenefits`/inline benefits rows were removed from Home, About, Cart, Order Confirmation, Order List, and Profile pages; do not restore them at page level.

## Temporary Directory Cleanup
- `tmp/shopapp-auth-patch.7p8f9i` was an obsolete patch workspace accidentally tracked in Git during commit `72327a68`. It has been removed via `git rm -r` and should not be restored.

## Database Reset and Entity Migration (2026-09-08)
- Local PostgreSQL database `ShopAppDb` was intentionally dropped and recreated. Migration `20260908080022_RebuildAllEntitySchema` is applied; it adds product tables under `Urunler`, moves cart/order tables to `Satis`, and uses the corrected `UrunTur` identifier.

## Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08)
- **Zero Dummy Data in Cart & Order Confirmation**:
  - `cartDemoData.js` and `orderConfirmationDemoData.js` have been permanently deleted along with their empty parent `data/` folders.
  - `CartPage.js`: Strictly uses `(items ?? []).map(...)`. Renders centered full-width empty-cart state ("Sepetiniz boş.") and hides the order summary panel entirely when items are empty. Shipping cost returns `0 TL` instead of fake static amounts when empty.
  - `OrderConfirmationPage.js`: Removed `DEMO_ORDER` and fake payload `TEST_ORDER_ITEMS`. If accessed directly without an active completed order payload, renders an accessible empty state with "Siparişlerim'e Git" and "Alışverişe Devam Et" navigation buttons.
- **Dynamic Category Architecture (Option A)**:
  - `categoryService.js` under `src/features/categories/services/` is the single source of truth for categories across customer and admin views. It starts strictly empty (`[]`) with zero mock categories.
  - Hardcoded categories array in `productData.js` was removed. `productsService.getCategories()` delegates to `categoryService.getCategories()`.
  - `AdminCategoriesPage.js` reads from `categoryService` and its `onSave` / `onDelete` handlers persist to `addCategory`, `updateCategory`, and `deleteCategory`.
  - `AdminProductsPage.js` category filter and product create/edit modals read from `getCategoriesSync()`.
  - `Header.js` (mega menu & mobile accordion) and `CategoryListPage.js` dynamically fetch from this source of truth and display truthful empty states ("Henüz kategori bulunamadı") without crashing or fabricating mock items.
- **Rules Permanently Encoded in `FrontendAGENTS.md`**:
  - Section 7 updated to restrict demo datasets.
  - Section 8 added: `Dynamic Commerce Data — No Dummy Data` with 12 permanent instructions prohibiting fake cart items, mock orders, demo confirmation payloads, and fake seeded categories.
  - Section 30 ("Hard Scope Summary") updated with `YOU MAY` / `YOU MAY NOT` guidelines.
- **Strict Network Boundary**:
  - No backend code was touched.
  - No frontend API calls (`fetch`, `axios`, `XMLHttpRequest`, `apiClient`) were added. Pure presentation layer ready for the developer to integrate backend endpoints.

## Generic Product Repository (2026-09-08)
- IGenericUrunRepository<TEntity> and GenericUrunRepository<TEntity> provide CRUD for Urun, Kategori, UrunGorsel, UrunOzellik, and UrunTur through DbContext.Set<TEntity>(). It deliberately does not eager-load navigation properties; product-specific read shapes belong in dedicated query services or repositories.

## Hierarchical Category Mega Menu Under Kategoriler (2026-09-08)
- **Top Navbar Integrity**:
  - `Kategoriler` remains the single primary dropdown navigation item in the top desktop navbar.
  - Parent categories (`Kadın`, `Erkek`, `Çocuk`, etc.) are never moved directly onto the top navbar; they reside strictly inside the `CategoryMegaMenu` dropdown.
- **Hierarchy Normalization (`normalizeCategories`)**:
  - Located in `src/Frontend/ShopApp.Web/src/shared/components/Header/CategoryMegaMenu.js`.
  - Seamlessly handles flat collections with `parentId` / `ustKategoriId` / `parentCategoryId` (where `parentId == null` is parent, `parentId == parent.id` is child) as well as pre-nested collections (`children` or `subcategories`).
  - Normalizes Turkish property aliases (`name`/`ad`, `count`/`productCount`/`urunSayisi`).
  - Dynamically computes parent columns (`--mega-cols` CSS variable) to accommodate any number of parents without hardcoding.
- **Desktop Hover & Click Interaction**:
  - Hover opens the mega-menu; mouse leaving the dropdown item triggers a 180ms debounce timer before closing to eliminate accidental closures.
  - A transparent CSS hit-bridge (`.header-category-dropdown::before`, height `calc(var(--space-2) + 6px)`) bridges the physical gap between `#category-dropdown-trigger` and `.header-category-dropdown`.
  - Accessible keyboard navigation: `Escape` key closes the dropdown and returns focus to the trigger button; mouseleave focus-shift is suppressed to avoid stealing focus from active inputs.
  - Closed immediately on outside click, item click, or SPA `popstate` navigation.
- **Dynamic Mobile Harmony**:
  - Mobile accordion in `Header.js` consumes the same normalized hierarchy via `loadDropdownCategories()`, rendering each parent with its children and a `Tümünü Gör →` link.

## Address Integer Location Migration (2026-09-09)
- `Mahalle` and `PostaKodu` are required integer fields throughout the domain, API contracts, and profile payloads.
- Migration `20260909071129_AddMahalleAndConvertPostaKoduToInteger` uses PostgreSQL's explicit `"PostaKodu"::integer` cast. Existing non-numeric postal-code values must be corrected before it is applied; the migration intentionally fails rather than silently altering them.

## Admin Management & Backend Endpoints Integration (2026-09-09)
- **Admin Customer Management**:
  - `AdminController.cs`:
    - `GET /api/admin/musteriler`: Returns all registered customers by joining `IdentityDbContext.Users` with `kimlik.Musteriler` and counting orders in `satis.Siparisler`. Returns `id`, `musteriId`, `fullName`, `ad`, `soyad`, `email`, `phone`, `durum`, `isActive`, `olusturmaTarihi`, `siparisSayisi`.
    - `PUT /api/admin/musteriler/{id}`: Supports updating customer status (`isActive` / `durum`) and personal details (`ad`, `soyad`, `phoneNumber`).
  - Frontend:
    - Service `customerService.js` under `src/features/customers/services/` provides `getAdminCustomers()` and `updateCustomerStatus()`.
    - `AdminCustomersPage.js`: Dynamically fetches real customer data on mount when `props.customers` is omitted. Provides an inline status toggle button ("Hesabı Pasife Al" / "Hesabı Aktifleştir") in the actions column.
- **Admin Order Management**:
  - `AdminController.cs`:
    - `GET /api/admin/siparisler`: Returns all orders across all customers with order number, customer name, date, item count, total price, and status.
    - `PUT /api/admin/siparisler/{id}/durum`: Accepts `{ yeniDurumId }` and updates the order status using `siparis.DurumGuncelle(newStatusId, adminUserId)` without requiring the caller to be the customer who placed the order.
  - Frontend:
    - `orderService.js`: Exposes `getAdminOrders()` and `updateAdminOrderStatus()`.
    - `AdminOrdersPage.js`: Dynamically fetches real orders on mount when `props.orders` is omitted. Provides an inline interactive status dropdown (`.admin-order-status-select`) allowing quick one-click status transitions (Hazırlanıyor, Kargoda, Teslim Edildi, İptal).
- **Admin Category & Product Update Persistence**:
  - `categoryService.js`: `updateCategory()` now dispatches `PUT /api/admin/kategori/{id}` (`UpdateKategoriCommand`) to `AdminKategoriController.cs` and refreshes the category store.
  - `productsService.js`: Added `updateProduct()` dispatching `PUT /api/admin/urun/{id}` (`UpdateUrunCommand`) to `AdminUrunController.cs`.
  - `AdminProductsPage.js`: `handleSaveProduct` dispatches `updateProduct(pid, payload)` when editing an existing product.
  - `endpoints.js`: Added `adminKategori.update(id)`, `adminUrun.update(id)`, `adminMusteri.list()`, `adminMusteri.update(id)`, `adminSiparis.list()`, and `adminSiparis.updateStatus(id)`.
- **Architectural Boundary Integrity**:
  - Admin presentation components (`src/features/admin/`) remain clean with zero direct `apiClient` or `fetch()` invocations, consuming dedicated feature domain services (`categoryService.js`, `productsService.js`, `orderService.js`, `customerService.js`).

## AdminController Security/Validation Hardening & CQRS Migration (2026-09-09)
The two bullets above are now **superseded** by this pass — kept above for history, corrected here:
- `AdminController` is now a thin controller: `GET/PUT musteriler`, `GET/PUT siparisler/{id}/durum`, and `POST users/{id}/roles` all delegate to MediatR commands/queries under `ShopApp.Application/Features/Admin/*` instead of querying `ShopAppDbContext`/`UserManager` directly.
- `PUT /api/admin/musteriler/{id}`: `{id}` is now **only** interpreted as `MusteriId` (never as an Identity user id) — resolved via `Musteri.Id → Musteri.KullaniciId → KayitliKullanici`. `Durum` free-text is no longer accepted; only `{ ad?, soyad?, phoneNumber?, isActive? }`, with an empty update (`{}`) rejected as 400. `orderService.js`'s admin update payload was already `{ isActive }`-only, so no frontend change was needed there.
- `PUT /api/admin/siparisler/{id}/durum` now accepts **one** canonical field: `{ durumId }` — the `{ yeniDurumId }` alias described above is gone. `orderService.js.updateAdminOrderStatus` was updated to send `durumId`. The requested status id is validated against `SiparisDurumlar` before the order is touched (400 if it doesn't exist), instead of relying on the FK constraint.
- `POST /api/admin/users/{userId}/roles` now **replaces** the user's managed role (Admin/User/Musteri) instead of adding to it — old managed roles are removed first. Demoting the last Admin is rejected (409), and an admin can never change their own role via this endpoint (409).
- The audit actor on order-status updates can never be `Guid.Empty` — if the authenticated admin's id can't be resolved, the request fails (401) instead of writing a blank actor.
- `AdminProfile` entity/table removed entirely (see the change below) — Admin authorization is derived purely from the Identity role membership.

## Logout Confirmation Modal Architecture (2026-09-09)
- **Shared Modal Component (`ConfirmModal.js` & `ConfirmModal.css`)**:
  - Created reusable, fully accessible confirmation modal under `src/Frontend/ShopApp.Web/src/shared/components/ConfirmModal/`.
  - Supports `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, focus trapping, initial focus placement, and focus restoration to trigger element on cancel.
  - Double-click prevention: Disables confirm, cancel, and close buttons and displays loading status while async `onConfirm` executes.
  - Cancellation: `Escape` key, backdrop click, or `İptal` button closes modal and cleanly preserves the current active session without calling `logout()` or clearing tokens.
- **Customer Header Integration (`Header.js`)**:
  - Customer `#btn-logout` no longer terminates session immediately. Instead, invokes `openConfirmModal(...)`.
  - Upon explicit confirmation, invokes `await logout()` via `authService.js` and navigates to `/`.
- **Admin Dashboard Integration (`AdminSidebar.js`, `AdminHeader.js`, `AdminLayout.js`)**:
  - Admin layout supports `Çıkış Yap` in two natural touchpoints:
    - In `AdminSidebar.js` under the `SİTE` section alongside "Anasayfaya Dön" with an accessible `log-out` SVG icon.
    - In `AdminHeader.js` in the topbar right action area alongside the admin user card (`#admin-topbar-logout`).
  - Both triggers open the confirmation modal with the same dialog prompt (*"Hesabınızdan çıkış yapmak istediğinize emin misiniz?"*).
  - Optional `onLogout` prop can be passed to `createAdminLayout`, `createAdminSidebar`, and `createAdminHeader` for testability, falling back to default `openConfirmModal` + `logout()` + `navigate('/')`.
- **Architectural Boundary & Audit Integrity**:
  - Strictly zero `apiClient`, `fetch`, `axios`, or `XMLHttpRequest` calls added to `src/features/admin/`.
  - Backend `src/Monolith/` remained 100% untouched.
  - Unit and integration tests added in `tests/logoutConfirmation.test.js` (10/10 passing).

## Turkey Address Lookup & Address Phone (2026-09-09)
- `TurkiyeCitiesPackage` 2.0.0 is registered as the singleton `ITurkeyAddressService`; it ships 81 provinces, districts, and 31,000+ neighborhoods locally.
- Lookup endpoints are public: `/api/address/provinces`, `/api/address/districts/{provinceId}`, and `/api/address/neighborhoods/{districtId}?provinceId={provinceId}`. The province query parameter is required for neighborhood lookup because the package resolves districts within their province.
- Address phone is stored as nullable `kimlik.Adresler.Telefon` for legacy rows (migration `20260909203234_AddAddressPhone`); create/update validation requires `+905XXXXXXXXX`.

## Multi-Image Support, Admin Category Navigation, and Address Controller Refactoring (2026-09-10)
- **Multi-Image Support (Domain & Persistence)**:
  - `UrunGorsel` entity includes `bool AnaGorselMi` (aliased as `IsMain`) with EF Core default `false`. Migration `20260910080147_AddProductMultiImageSupport` applies the column under the `Urunler` schema.
  - `Urun.GorselUrl` is retained as a fallback / cover image (`CoverImageUrl`) and synchronized with the image marked `AnaGorselMi = true` (or the first image).
  - Global alias `global using ProductImage = ShopApp.Domain.Urun.Entities.UrunGorsel;` and DTO aliases `ProductDto` / `ProductImageDto` provide English naming compatibility without breaking existing Turkish CQRS contracts.
- **Multi-Image Application Layer & CQRS**:
  - `CreateUrunCommand` and `UpdateUrunCommand` accept optional `List<string>? ImageUrls`.
  - Handlers synchronize multiple images: in `CreateUrunCommandHandler`, child `UrunGorsel` records are created and added to `urun.Gorseller`. In `UpdateUrunCommandHandler`, `IShopAppDbContext` is optionally injected to synchronize existing images (inserting new, updating order/main status, and removing deleted images) while preserving backward compatibility for test mocks.
  - Queries (`GetUrunler`, `GetUrunById`) include `Gorseller` navigation collection.
- **Frontend Multi-Image UI**:
  - `AdminProductFormModal.js` supports an interactive multi-image list: URL text inputs, "+ Yeni Görsel Ekle" button, "★ Ana Görsel" toggle, "Kaldır" delete button, and a compact dropzone for local file upload via `FileReader`.
  - `AdminProductDetailModal.js` renders a horizontal thumbnail gallery below the main image when multiple images are present, allowing administrators to click thumbnails and preview images dynamically.
- **Admin Category Navigation & Routing**:
  - Exposes `/admin/categories` and `/admin/add-category` as aliases in `routes.js` (both guarded by `roles: ['Admin']`).
  - `AdminSidebar.js` highlights the "Kategoriler" menu item when visiting either Turkish or English category routes (`/admin/kategoriler`, `/admin/categories`, `/admin/add-category`).
  - `AdminProductsPage.js` auto-refreshes category choices dynamically on modal open via `getCategoriesSync()`, ensuring newly added categories immediately appear in product category dropdowns.
  - `categoryService.js` routes `POST` requests to `endpoints.categories.create()` (`/api/categories` or `/api/admin/kategori`).
- **Address Controller Separation & Architecture**:
  - Turkish administrative address lookup endpoints (provinces, districts, neighborhoods) are housed in `TurkeyAddressLookupController.cs` mapped to `/api/locations`, `/api/lookup/turkey-address`, and `/api/address`.
  - Authenticated user personal address CRUD endpoints are isolated in `UserAddressesController.cs` mapped to `/api/users/addresses` and `/api/adres` with `[Authorize]`.
  - Subclasses `AddressController` and `AdresController` are decorated with `[NonController]` to provide backward compatibility without causing route collision `AmbiguousMatchException` in ASP.NET Core routing.

