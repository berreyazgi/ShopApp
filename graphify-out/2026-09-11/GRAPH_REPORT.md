# Graph Report - ShopApp  (2026-09-11)

## Corpus Check
- 488 files · ~407,819 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3403 nodes · 7309 edges · 197 communities (187 shown, 9 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 669 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `11734eb4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- createIcon
- AdminUrunController
- ResultSepetUrunDto
- .Handle
- UpdateAdminCustomerCommand
- navigate
- SiparisController
- src.Monolith.ShopApp.Domain.Sepet.Entities
- ProfilePage.js
- SiparisCommandHandlerTests
- .GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection
- .Update_Throws_WhenItemBelongsToAnotherCustomersCart
- productsService.js
- AddressLookupItemDto
- SiparisDurumLookup
- .For
- FrontendAGENTS.md
- CartPage.js
- AuthResponse
- .Olustur
- ShopApp.Domain.Urun.Entities
- .GetAll
- createLoadingState
- orderService.js
- LoginPage.js
- ShopApp.Application.Common.Interfaces
- categoryService.js
- ShopAppDbContext
- IIdentityService
- OrderConfirmationPage.js
- IdentityService
- src.Monolith.ShopApp.Domain.Siparis.Entities
- Urun
- registerValidation.js
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- ChangeUserRoleCommand
- .Create
- What You Must Do When Invoked
- What You Must Do When Invoked
- GetAdminUrunlerQueryHandler
- UserProfileDto
- .AddInfrastructure
- authService.js
- SepetEntity
- .DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- AdminSiparisController.cs
- ShopApp.Application.Features.Authentication.DTOs
- BaseEntityConfiguration
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- KayitliKullanici
- CreateUrunCommand
- AbstractValidator
- SiparisEntity
- IGenericUrunRepository
- Address
- OrderListPage.js
- InitialCreate
- createAdminProductFormModal
- ProfileController
- IShopAppDbContext
- SiparisUrunleri
- ProfileController.cs
- GetByIdUrunDto
- UpdateUrunCommandHandler
- UrunVaryant
- Urun
- ShopApp Development Notes
- KategoriServis.Domain.Entities
- InfrastructureInitializer
- .Olustur
- KategoriDbContext
- .GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses
- GetByIdUrunGorselDto
- http
- ControllerBase
- GenericUrunRepository
- TestDbContext
- UrunGorsel
- .GetAll
- StokDbContext
- UrunOzelligi
- IRequest
- Migration
- Kategori
- Kategori
- .GetBySiparisId
- ResultUrunDto
- UrunOzellik
- ShopApp.Infrastructure.Persistence.Migrations
- InitialCreate
- ResultUrunOzellikDto
- .Delete_Throws_WhenItemBelongsToAnotherCustomersCart
- createAuthForm
- UpdateUrunCommand
- AddRoleSpecificProfiles
- RebuildAllEntitySchema
- RemoveAdminProfileTable
- IlkMigrasyon
- KargoServis.Domain.Entities
- UrunVaryant
- StokServis.Domain.Entities
- IRequestHandler
- GetUrunOzellikQueryHandler
- ResultUrunVaryantDto
- KargoDbContext
- ShopApp.Application.csproj
- .Delete
- AddressHandlerTests
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- RenameUrunTurToUrunVaryantAndMoveAttributes
- KargoGonderisi
- StokUrunleri
- .GetAll
- AddressDto
- .GetMyAddress_ReturnsOnlyAnAddressOwnedByTheCurrentCustomer
- StokHareketi
- ShopApp.Api.csproj
- package.json
- authConstants.js
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- SyncIdentityModels
- StandardizeSepetUrunuQuantityField
- AddMahalleAndConvertPostaKoduToInteger
- MakeIdValueGeneratedNever
- SeedSiparisDurumLookup
- AddAddressPhone
- AddProductMultiImageSupport
- ShopApp.Infrastructure.csproj
- apiClient.js
- KargoServis.csproj
- CreateUrunGorselCommandHandler
- GetAdminOrdersQueryHandler
- CreateUrunVaryantCommandHandler
- DeleteUrunGorselCommand
- DeleteUrunOzellikCommand
- AdminKategoriController.cs
- Musteri
- SepetUrunu
- Sevkiyat
- KargoDurumu
- Depo
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- ShopApp.sln
- App.js
- .Handle
- .BuildModel
- appConstants.js
- SepetDurumLookup
- ICurrentCustomerContext
- AGENTS.md
- ShopApp.Application.Tests.csproj
- productData.js
- KargoDurumGecmisi
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- IEntityTypeConfiguration
- IdentityUserRoleConfiguration
- BaseEntity
- AuthRequest
- StokServis.csproj
- createConfirmModal
- BaseEntity
- BaseEntity
- HareketTipi
- .BuildModel
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- Q: How are role-specific customer and admin profiles provisioned?
- .Handle
- UpdateUrunOzellikCommandHandler
- ProductDto
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- Sevkiyat
- SiparisDurum
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- eventBus.js
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- .codex/skills/graphify/references/extraction-spec.md
- IdentityUserInfo
- IdentityUserClaimConfiguration
- KategoriServis.csproj
- AuthenticationValidationException
- createCategoryFormPanel

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 96 edges
2. `createIcon()` - 86 edges
3. `IShopAppDbContext` - 64 edges
4. `Urun` - 60 edges
5. `ShopAppDbContext` - 51 edges
6. `ICurrentCustomerContext` - 43 edges
7. `SiparisEntity` - 41 edges
8. `navigate()` - 39 edges
9. `TestDbContext` - 38 edges
10. `ShopApp.Infrastructure.Persistence.Migrations` - 35 edges

## Surprising Connections (you probably didn't know these)
- `renderImageList()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `initApp()` --calls--> `navigate()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js
- `initApp()` --calls--> `logout()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- `initApp()` --calls--> `restoreSession()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- `initApp()` --calls--> `createHeader()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/shared/components/Header/Header.js

## Import Cycles
- None detected.

## Communities (197 total, 9 thin omitted)

### Community 0 - "createIcon"
Cohesion: 0.06
Nodes (55): routes, AboutPage(), render(), createAdminConfirmModal(), close(), handleKeydown(), createAdminLayout(), createAdminMetricCard() (+47 more)

### Community 1 - "AdminUrunController"
Cohesion: 0.12
Nodes (27): GetUrunGorselleriQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut (+19 more)

### Community 2 - "ResultSepetUrunDto"
Cohesion: 0.06
Nodes (55): GetMySepetlerQuery, GetSepetQuery, GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+47 more)

### Community 3 - ".Handle"
Cohesion: 0.08
Nodes (34): GetAdminOrderQuery, HttpClient, KargoGonderisiResponse, CancellationToken, DateOnly, Guid, Task, IKargoReadService (+26 more)

### Community 4 - "UpdateAdminCustomerCommand"
Cohesion: 0.07
Nodes (37): ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, ShopApp.Application.Features.Admin.Customers.Queries, GetAdminCustomersQuery, ActionResult, CancellationToken, Guid, HttpGet (+29 more)

### Community 5 - "navigate"
Cohesion: 0.12
Nodes (29): compileRoute(), guardedPath(), matchRoute(), navigate(), render(), notFoundRoute, createAdminHeader(), createAdminSidebar() (+21 more)

### Community 6 - "SiparisController"
Cohesion: 0.05
Nodes (57): GetMySiparislerQuery, GetSiparisQuery, GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+49 more)

### Community 7 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.07
Nodes (14): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Mapping, ShopApp.Application.Features.Sepet.Dtos (+6 more)

### Community 8 - "ProfilePage.js"
Cohesion: 0.09
Nodes (36): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+28 more)

### Community 9 - "SiparisCommandHandlerTests"
Cohesion: 0.24
Nodes (14): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Fact, InvalidOperationException (+6 more)

### Community 10 - ".GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection"
Cohesion: 0.22
Nodes (15): GetAdminDashboardQuery, CancellationToken, IMediator, Task, GetAdminDashboard, GetAdminDashboardQuery, GetAdminDashboardQueryHandler, CancellationToken (+7 more)

### Community 11 - ".Update_Throws_WhenItemBelongsToAnotherCustomersCart"
Cohesion: 0.22
Nodes (8): ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, Guid, UpdateSepetUrunuCommand, CancellationToken, Task, UpdateSepetUrunuCommandHandler, UpdateSepetUrunuCommandValidator, KeyNotFoundException

### Community 12 - "productsService.js"
Cohesion: 0.10
Nodes (33): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+25 more)

### Community 13 - "AddressLookupItemDto"
Cohesion: 0.07
Nodes (32): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator (+24 more)

### Community 14 - "SiparisDurumLookup"
Cohesion: 0.19
Nodes (15): Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact, KeyNotFoundException (+7 more)

### Community 15 - ".For"
Cohesion: 0.13
Nodes (21): ShopApp.Application.Features.Sepet.Commands.DeleteSepet, Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, DeleteSepetCommandValidator, Guid (+13 more)

### Community 16 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 17 - "CartPage.js"
Cohesion: 0.17
Nodes (17): CartPage(), getShippingCost(), getSubtotal(), handleCheckout(), handleTemporaryCheckout(), load(), renderItems(), updateSummary() (+9 more)

### Community 18 - "AuthResponse"
Cohesion: 0.08
Nodes (30): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+22 more)

### Community 19 - ".Olustur"
Cohesion: 0.34
Nodes (12): Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken, Fact (+4 more)

### Community 20 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.10
Nodes (12): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Infrastructure.Kargo, ShopApp.Application.Features.Urun.Commands.CreateUrun, ShopApp.Domain.Urun.Entities, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Features.Urun.Commands.UpdateUrunVaryant (+4 more)

### Community 21 - ".GetAll"
Cohesion: 0.08
Nodes (29): GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+21 more)

### Community 22 - "createLoadingState"
Cohesion: 0.12
Nodes (22): load(), createHeroCategoryGrid(), render(), HomePage(), render(), getHomeCategories(), createCategoryCard(), createCategoryGrid() (+14 more)

### Community 23 - "orderService.js"
Cohesion: 0.11
Nodes (18): AdminOrdersPage(), closeActiveModal(), destroy(), getFilteredOrders(), getStatusId(), openDetailModal(), renderPage(), renderTable() (+10 more)

### Community 24 - "LoginPage.js"
Cohesion: 0.11
Nodes (14): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, LoginPage(), RegisterPage() (+6 more)

### Community 25 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.16
Nodes (8): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers, UpdateUrunGorselCommandValidator

### Community 26 - "categoryService.js"
Cohesion: 0.11
Nodes (22): addCategory(), attachParentNames(), categories, deleteCategory(), fileToDataUrl(), getCategories(), getCategoryById(), mapFromBackend() (+14 more)

### Community 27 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (30): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+22 more)

### Community 28 - "IIdentityService"
Cohesion: 0.21
Nodes (9): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+1 more)

### Community 29 - "OrderConfirmationPage.js"
Cohesion: 0.15
Nodes (17): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+9 more)

### Community 30 - "IdentityService"
Cohesion: 0.17
Nodes (13): IdentityError, IdentityResult, CancellationToken, Guid, IdentityRole, IEnumerable, IHttpContextAccessor, IReadOnlyCollection (+5 more)

### Community 31 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.09
Nodes (11): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Tests.Features.Siparis (+3 more)

### Community 32 - "Urun"
Cohesion: 0.06
Nodes (30): ShopApp.Application.Features.Urun.Commands.DeleteUrunVaryant, ShopApp.Application.Features.Urun.Commands.DeleteUrun, Guid, DeleteUrunCommand, DeleteUrunCommandHandler, DeleteUrunCommandValidator, Guid, DeleteUrunVaryantCommand (+22 more)

### Community 33 - "registerValidation.js"
Cohesion: 0.26
Nodes (21): RFC-5322, validateEmail(), NOTE: This is a UX helper only., validateConfirmPassword(), validateEmail(), validateFirstName(), validateLastName(), validatePassword() (+13 more)

### Community 34 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.16
Nodes (17): ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, DeleteSiparisUrunuCommandValidator, Guid (+9 more)

### Community 35 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 36 - ".Create"
Cohesion: 0.14
Nodes (24): active, GetUrunlerQuery, passive, Profile, CancellationToken, Guid, IMapper, List (+16 more)

### Community 37 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 38 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 39 - "GetAdminUrunlerQueryHandler"
Cohesion: 0.22
Nodes (14): GetAdminUrunlerQuery, Guid, AdminUrunListDto, CancellationToken, Guid, List, Task, GetAdminUrunler (+6 more)

### Community 40 - "UserProfileDto"
Cohesion: 0.14
Nodes (19): GetMyProfileQuery, CancellationToken, IMediator, Task, UpdateMyProfileCommand, UpdateMyProfileCommandHandler, UpdateMyProfileCommandValidator, DateTime (+11 more)

### Community 41 - ".AddInfrastructure"
Cohesion: 0.09
Nodes (19): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+11 more)

### Community 42 - "authService.js"
Cohesion: 0.12
Nodes (21): establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), clearError(), initialState (+13 more)

### Community 43 - "SepetEntity"
Cohesion: 0.17
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 44 - ".DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.36
Nodes (6): CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Task

### Community 45 - "AdminSiparisController.cs"
Cohesion: 0.22
Nodes (4): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, UpdateAdminOrderStatusRequest

### Community 46 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.12
Nodes (9): ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Features.Authentication.DTOs, ShopApp.Infrastructure.Identity.Models, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, AssignRoleRequest (+1 more)

### Community 47 - "BaseEntityConfiguration"
Cohesion: 0.12
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 48 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.17
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration, EntityTypeBuilder, Guid, IdentityRole (+1 more)

### Community 49 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 50 - "CreateUrunCommand"
Cohesion: 0.15
Nodes (13): Guid, List, CreateProductCommand, CreateUrunCommand, Brand, CategoryId, CoverImageUrl, Description (+5 more)

### Community 51 - "AbstractValidator"
Cohesion: 0.06
Nodes (24): AbstractValidator, ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid (+16 more)

### Community 52 - "SiparisEntity"
Cohesion: 0.12
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 53 - "IGenericUrunRepository"
Cohesion: 0.09
Nodes (23): CancellationToken, Guid, Task, IGenericUrunRepository, CancellationToken, Guid, Task, UrunOzellik (+15 more)

### Community 54 - "Address"
Cohesion: 0.17
Nodes (10): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+2 more)

### Community 55 - "OrderListPage.js"
Cohesion: 0.16
Nodes (15): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+7 more)

### Community 56 - "InitialCreate"
Cohesion: 0.12
Nodes (12): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate (+4 more)

### Community 57 - "createAdminProductFormModal"
Cohesion: 0.16
Nodes (26): createAdminProductFormModal(), clearErrors(), close(), getFriendlyErrorMessage(), handleKeydown(), handleSubmit(), renderImageList(), setSavingState() (+18 more)

### Community 58 - "ProfileController"
Cohesion: 0.23
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 59 - "IShopAppDbContext"
Cohesion: 0.09
Nodes (21): CancellationToken, DbSet, Kategori, SiparisUrunleri, Task, Urun, UrunGorsel, UrunOzellik (+13 more)

### Community 60 - "SiparisUrunleri"
Cohesion: 0.12
Nodes (15): Guid, SiparisUrunleri, Beden, IndirimOrani, Renk, SiparisEntity, SiparisId, StokTakipNumarasi (+7 more)

### Community 61 - "ProfileController.cs"
Cohesion: 0.17
Nodes (11): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress (+3 more)

### Community 62 - "GetByIdUrunDto"
Cohesion: 0.09
Nodes (22): GetUrunQuery, Guid, List, GetByIdUrunDto, Brand, CategoryId, CategoryName, CoverImageUrl (+14 more)

### Community 63 - "UpdateUrunCommandHandler"
Cohesion: 0.24
Nodes (11): CancellationToken, Kategori, Task, UpdateUrunCommandHandler, Fact, Task, tur, urun (+3 more)

### Community 64 - "UrunVaryant"
Cohesion: 0.11
Nodes (17): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, Guid, ICollection (+9 more)

### Community 65 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 66 - "ShopApp Development Notes"
Cohesion: 0.10
Nodes (19): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+11 more)

### Community 67 - "KategoriServis.Domain.Entities"
Cohesion: 0.16
Nodes (10): KategoriServis.Domain.Entities, KategoriServis.Domain.Common, Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId (+2 more)

### Community 68 - "InfrastructureInitializer"
Cohesion: 0.13
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, CancellationToken, ILogger, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 69 - ".Olustur"
Cohesion: 0.19
Nodes (13): Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, Guid, UpdateSiparisCommand, CancellationToken (+5 more)

### Community 70 - "KategoriDbContext"
Cohesion: 0.13
Nodes (12): KategoriServis.Infrastructure.Persistence, IDesignTimeDbContextFactory, DbContextOptions, DbSet, ModelBuilder, KategoriDbContext, Kategoriler, UrunGorselleri (+4 more)

### Community 71 - ".GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses"
Cohesion: 0.36
Nodes (7): GetMyAddressesQuery, CancellationToken, List, Task, GetMyAddresses, GetMyAddressesQuery, GetMyAddressesQueryHandler

### Community 72 - "GetByIdUrunGorselDto"
Cohesion: 0.15
Nodes (14): GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, DisplayOrder, ImageUrl, IsMain, ProductId, CancellationToken (+6 more)

### Community 73 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 74 - "ControllerBase"
Cohesion: 0.13
Nodes (15): ControllerBase, ShopApp.Application.Features.Admin.Dashboard.Dtos, ShopApp.Application.Features.Admin.Dashboard.Queries, ActionResult, CancellationToken, HttpGet, IMediator, Task (+7 more)

### Community 75 - "GenericUrunRepository"
Cohesion: 0.29
Nodes (7): Fact, Task, GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 76 - "TestDbContext"
Cohesion: 0.12
Nodes (16): DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik, UrunVaryant, TestDbContext (+8 more)

### Community 77 - "UrunGorsel"
Cohesion: 0.14
Nodes (13): Guid, UrunGorsel, AnaGorselMi, DisplayOrder, GorselSira, GorselUrl, ImageUrl, IsMain (+5 more)

### Community 78 - ".GetAll"
Cohesion: 0.42
Nodes (8): ActionResult, CancellationToken, Guid, HttpGet, IMediator, List, Task, UrunController

### Community 79 - "StokDbContext"
Cohesion: 0.15
Nodes (10): StokServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri (+2 more)

### Community 80 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, Degeri, OzellikAdi, UrunVaryant, UrunVaryantId, EntityTypeBuilder (+3 more)

### Community 81 - "IRequest"
Cohesion: 0.13
Nodes (14): IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid, GetByIdSiparisUrunleriDto, Guid (+6 more)

### Community 82 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 83 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 84 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 85 - ".GetBySiparisId"
Cohesion: 0.20
Nodes (9): KargoServis.Controllers, ActionResult, CancellationToken, DateOnly, Guid, HttpGet, Task, KargoController (+1 more)

### Community 86 - "ResultUrunDto"
Cohesion: 0.14
Nodes (13): Guid, List, ResultUrunDto, Brand, CategoryId, CoverImageUrl, Description, Images (+5 more)

### Community 87 - "UrunOzellik"
Cohesion: 0.20
Nodes (9): Guid, UrunOzellik, Deger, OzellikAd, Siralama, Urun, UrunId, EntityTypeBuilder (+1 more)

### Community 88 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Persistence.Migrations, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, UpdateMonolithTables

### Community 89 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 90 - "ResultUrunOzellikDto"
Cohesion: 0.20
Nodes (12): GetUrunOzellikleriQuery, Guid, ResultUrunOzellikDto, CancellationToken, Guid, IMapper, List, Task (+4 more)

### Community 91 - ".Delete_Throws_WhenItemBelongsToAnotherCustomersCart"
Cohesion: 0.23
Nodes (7): ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, Guid, DeleteSepetUrunuCommand, CancellationToken, Task, DeleteSepetUrunuCommandHandler, DeleteSepetUrunuCommandValidator

### Community 92 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 93 - "UpdateUrunCommand"
Cohesion: 0.18
Nodes (12): Guid, List, UpdateProductCommand, UpdateUrunCommand, Brand, CategoryId, CoverImageUrl, Description (+4 more)

### Community 94 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 95 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 96 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 97 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 98 - "KargoServis.Domain.Entities"
Cohesion: 0.24
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

### Community 99 - "UrunVaryant"
Cohesion: 0.15
Nodes (12): Guid, UrunVaryant, AktifMi, Beden, FiyatFarki, Renk, StokAdet, StokKod (+4 more)

### Community 100 - "StokServis.Domain.Entities"
Cohesion: 0.23
Nodes (4): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common

### Community 101 - "IRequestHandler"
Cohesion: 0.16
Nodes (11): IRequestHandler, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler, Guid, UpdateKategoriCommand, CancellationToken (+3 more)

### Community 102 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 103 - "ResultUrunVaryantDto"
Cohesion: 0.13
Nodes (19): GetUrunVaryantlarQuery, GetUrunVaryantQuery, Guid, ResultUrunVaryantDto, CancellationToken, Guid, IMapper, Task (+11 more)

### Community 104 - "KargoDbContext"
Cohesion: 0.16
Nodes (9): KargoServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri, Sevkiyatlar (+1 more)

### Community 105 - "ShopApp.Application.csproj"
Cohesion: 0.18
Nodes (10): AutoMapper (16.2.0), FluentValidation (12.1.1), Microsoft.EntityFrameworkCore (10.0.11), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 106 - ".Delete"
Cohesion: 0.13
Nodes (16): ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult, IMediator (+8 more)

### Community 107 - "AddressHandlerTests"
Cohesion: 0.23
Nodes (10): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, CancellationToken, Fact, List (+2 more)

### Community 108 - "AddMonolithDomainChanges"
Cohesion: 0.20
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMonolithDomainChanges

### Community 109 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 110 - "RenameUrunTurToUrunVaryantAndMoveAttributes"
Cohesion: 0.18
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RenameUrunTurToUrunVaryantAndMoveAttributes

### Community 111 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 112 - "StokUrunleri"
Cohesion: 0.17
Nodes (12): Guid, ICollection, StokUrunleri, Depo, DepoId, DepoKonumu, Hareketler, KullanilabilirMiktar (+4 more)

### Community 113 - ".GetAll"
Cohesion: 0.24
Nodes (10): ActionResult, CancellationToken, Guid, HttpGet, HttpPut, IActionResult, IMediator, List (+2 more)

### Community 114 - "AddressDto"
Cohesion: 0.27
Nodes (8): CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, DateTime, Guid, AddressDto

### Community 115 - ".GetMyAddress_ReturnsOnlyAnAddressOwnedByTheCurrentCustomer"
Cohesion: 0.27
Nodes (8): GetMyAddressQuery, CancellationToken, Guid, Task, GetMyAddress, GetMyAddressQuery, GetMyAddressQueryHandler, KeyNotFoundException

### Community 116 - "StokHareketi"
Cohesion: 0.20
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 117 - "ShopApp.Api.csproj"
Cohesion: 0.15
Nodes (12): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), TurkiyeCitiesPackage (2.0.0), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10) (+4 more)

### Community 118 - "package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 119 - "authConstants.js"
Cohesion: 0.19
Nodes (10): createPasswordStrength(), reset(), update(), AUTH_STATUS, FIELD_IDS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH (+2 more)

### Community 120 - "DatabaseChanges"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, DatabaseChanges

### Community 121 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 122 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 123 - "StandardizeSepetUrunuQuantityField"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, StandardizeSepetUrunuQuantityField

### Community 124 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 125 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 126 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 127 - "AddAddressPhone"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddAddressPhone

### Community 128 - "AddProductMultiImageSupport"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddProductMultiImageSupport

### Community 129 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.17
Nodes (11): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.Extensions.Http (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

### Community 130 - "apiClient.js"
Cohesion: 0.24
Nodes (7): appConfig, apiClient, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry

### Community 131 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 132 - "CreateUrunGorselCommandHandler"
Cohesion: 0.31
Nodes (7): Guid, CreateUrunGorselCommand, CancellationToken, Guid, Task, UrunGorsel, CreateUrunGorselCommandHandler

### Community 133 - "GetAdminOrdersQueryHandler"
Cohesion: 0.27
Nodes (10): GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List, Task, GetAdminOrders (+2 more)

### Community 134 - "CreateUrunVaryantCommandHandler"
Cohesion: 0.47
Nodes (5): CancellationToken, Guid, Task, UrunVaryant, CreateUrunVaryantCommandHandler

### Community 135 - "DeleteUrunGorselCommand"
Cohesion: 0.28
Nodes (6): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, Guid, DeleteUrunGorselCommand, UrunGorsel, DeleteUrunGorselCommandHandler, DeleteUrunGorselCommandValidator

### Community 136 - "DeleteUrunOzellikCommand"
Cohesion: 0.28
Nodes (6): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, UrunOzellik, DeleteUrunOzellikCommandHandler, DeleteUrunOzellikCommandValidator

### Community 137 - "AdminKategoriController.cs"
Cohesion: 0.20
Nodes (4): ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.CreateKategori, CreateKategoriCommandValidator, UpdateKategoriCommandValidator

### Community 138 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 139 - "SepetUrunu"
Cohesion: 0.24
Nodes (7): Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunVaryantId

### Community 140 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 141 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 142 - "Depo"
Cohesion: 0.16
Nodes (12): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, StokUrunleri (+4 more)

### Community 143 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 144 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 145 - "ShopApp.sln"
Cohesion: 0.22
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

### Community 146 - "App.js"
Cohesion: 0.17
Nodes (15): initApp(), bootstrap(), initRouter(), createFooter(), TRUST_BADGES, setUnauthorizedHandler(), getState(), initialState (+7 more)

### Community 147 - ".Handle"
Cohesion: 0.18
Nodes (12): UrunGorsel, CancellationToken, Guid, Kategori, Task, UrunEntity, CreateUrunCommandHandler, Fact (+4 more)

### Community 148 - ".BuildModel"
Cohesion: 0.13
Nodes (11): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateOnly, DateTime (+3 more)

### Community 149 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 150 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 151 - "ICurrentCustomerContext"
Cohesion: 0.13
Nodes (16): CancellationToken, Guid, Task, CurrentCustomer, ICurrentCustomerContext, Guid, UpdateUrunGorselCommand, CancellationToken (+8 more)

### Community 152 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 153 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 154 - "productData.js"
Cohesion: 0.29
Nodes (4): demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 156 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 157 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 158 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 159 - "IEntityTypeConfiguration"
Cohesion: 0.19
Nodes (11): IdentityUserLogin, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration, EntityTypeBuilder, Guid (+3 more)

### Community 160 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 161 - "BaseEntity"
Cohesion: 0.22
Nodes (8): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi

### Community 162 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 163 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 164 - "createConfirmModal"
Cohesion: 0.73
Nodes (6): createConfirmModal(), close(), handleBackdropClick(), handleCancel(), handleConfirm(), handleKeydown()

### Community 165 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 166 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 167 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 168 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 169 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 170 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 171 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 172 - ".Handle"
Cohesion: 0.32
Nodes (6): Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler

### Community 173 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.29
Nodes (6): Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UpdateUrunOzellikCommandHandler

### Community 174 - "ProductDto"
Cohesion: 0.60
Nodes (4): Guid, List, ProductDto, ProductImageDto

### Community 175 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 176 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 177 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 178 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 179 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 180 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 181 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 182 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 192 - "IdentityUserInfo"
Cohesion: 0.38
Nodes (3): DateTime, Guid, IdentityUserInfo

### Community 193 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 194 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 195 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 196 - "createCategoryFormPanel"
Cohesion: 0.90
Nodes (5): createCategoryFormPanel(), applyCategory(), populateParentOptions(), renderImagePreview(), resetForm()

## Knowledge Gaps
- **589 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+584 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1306 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Domain.Urun.Entities` to `AddProductMultiImageSupport`, `.BuildModel`, `ShopAppDbContext`, `ShopApp.Application.Features.Authentication.DTOs`, `Migration`, `ShopApp.Infrastructure.Persistence.Migrations`, `AddRoleSpecificProfiles`, `RebuildAllEntitySchema`, `RemoveAdminProfileTable`, `AddMonolithDomainChanges`, `TurkcheIdentityVeMusteriGuncellemesi`, `RenameUrunTurToUrunVaryantAndMoveAttributes`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `AddMahalleAndConvertPostaKoduToInteger`, `MakeIdValueGeneratedNever`, `SeedSiparisDurumLookup`, `AddAddressPhone`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `.Handle`, `.Create`, `GetAdminUrunlerQueryHandler`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `SiparisCommandHandlerTests`, `.GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection`, `Musteri`, `SepetEntity`, `SepetUrunu`, `SiparisDurumLookup`, `StokDbContext`, `.Olustur`, `.Handle`, `SiparisEntity`, `Address`, `ResultUrunOzellikDto`, `IShopAppDbContext`, `SiparisUrunleri`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `.Handle`, `UpdateAdminCustomerCommand`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `DeleteUrunGorselCommand`, `AdminKategoriController.cs`, `DeleteUrunOzellikCommand`, `.Update_Throws_WhenItemBelongsToAnotherCustomersCart`, `.For`, `ShopApp.Domain.Urun.Entities`, `ICurrentCustomerContext`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `Urun`, `.Create_Throws_WhenParentOrderBelongsToAnotherCustomer`, `ChangeUserRoleCommand`, `AdminSiparisController.cs`, `ShopApp.Application.Features.Authentication.DTOs`, `AbstractValidator`, `ProfileController.cs`, `ControllerBase`, `.Delete_Throws_WhenItemBelongsToAnotherCustomersCart`, `.Delete`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _589 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `createIcon` be split into smaller, more focused modules?**
  _Cohesion score 0.06072720350276033 - nodes in this community are weakly interconnected._
- **Should `AdminUrunController` be split into smaller, more focused modules?**
  _Cohesion score 0.12323232323232323 - nodes in this community are weakly interconnected._
- **Should `ResultSepetUrunDto` be split into smaller, more focused modules?**
  _Cohesion score 0.056576576576576575 - nodes in this community are weakly interconnected._