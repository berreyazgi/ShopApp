# Graph Report - src  (2026-09-09)

## Corpus Check
- 394 files · ~335,815 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2560 nodes · 5176 edges · 160 communities (144 shown, 15 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 394 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aff2c9eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SepetDurumLookup
- ShopApp.Application.Common.Interfaces
- KategoriDbContext
- SepetController
- MakeApplicationUserUpdatedAtRequired
- StokServis.Domain.Entities
- KargoDbContext
- LoginPage.js
- ShopApp.Application.csproj
- InitialCreate
- IlkMigrasyon
- homeService.js
- IdentityService
- SiparisController
- AddRoleSpecificProfiles
- IRequest
- .BuildModel
- authService.js
- ShopAppDbContext
- ICurrentCustomerContext
- ShopApp.Domain.Urun.Entities
- FrontendAGENTS.md
- orderService.js
- .For
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- .Olustur
- eventBus.js
- AdminDashboardPage.js
- navigate
- OrderListPage.js
- productsService.js
- .Olustur
- AuthResponse
- ProfilePage.js
- KargoDurumGecmisi
- src.Monolith.ShopApp.Domain.Siparis.Entities
- authStore.js
- Urun
- AbstractValidator
- Migration
- .BuildModel
- ShopApp.Infrastructure.Persistence.Migrations
- DatabaseChanges
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- AdminCategoriesPage.js
- UserProfileDto
- SepetUrunu
- createIcon
- IIdentityService
- AdminProductsPage.js
- KayitliKullanici
- .AddInfrastructure
- ShopApp.Application.Mapping
- AuthenticationValidationException
- package.json
- .Create
- CurrentCustomer
- BaseEntityConfiguration
- TestDbContext
- InfrastructureInitializer
- KargoServis.Domain.Entities
- IdentityUserClaimConfiguration
- IShopAppDbContext
- GetSiparisQueryHandler
- SiparisUrunleri
- src.Monolith.ShopApp.Domain.Kullanici
- Kategori
- BaseEntity
- KategoriServis.Domain.Entities
- SepetEntity
- Urun
- UrunTur
- IdentityUserTokenConfiguration
- UrunGorseli
- UrunOzelligi
- IdentityRoleClaimConfiguration
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- IdentityUserRoleConfiguration
- IdentityRoleConfiguration
- ShopApp.Application.Features.Authentication.DTOs
- BaseEntity
- SiparisEntity
- createAdminProductFormModal
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- ValidationBehavior
- ShopApp.Application.Features.Urun.Dtos
- .GetMyAddresses
- http
- Kategori
- ShopApp.Infrastructure.Persistence.Context
- StokDbContext
- CreateUrunOzellikCommandHandler
- createHeader
- GetByIdKategoriDto
- GetUrunGorselleriQueryHandler
- GetUrunOzellikleriQueryHandler
- GetByIdUrunDto
- GetUrunTurleriQueryHandler
- GetByIdUrunTurDto
- DeleteUrunOzellikCommandHandler
- InitialCreate
- CreateUrunTurCommandHandler
- .Handle
- GetKategorilerQueryHandler
- ResultSepetDto
- ResultSiparisDto
- GetUrunlerQueryHandler
- GetUrunOzellikQueryHandler
- ISiparisRepository
- RebuildAllEntitySchema
- createAdminLayout
- OrderConfirmationPage.js
- AddressDto
- .AssertCrudAsync
- KargoGonderisi
- StokUrunleri
- DeleteSiparisUrunuCommand
- StokHareketi
- CreateAddressCommand
- SyncIdentityModels
- StandardizeSepetUrunuQuantityField
- AddMahalleAndConvertPostaKoduToInteger
- ShopApp.Application.Features.Siparis.Dtos
- AddressHandlerTests.cs
- Address
- Musteri
- UrunGorsel
- Sevkiyat
- KargoDurumu
- Depo
- createCategoryMegaMenu
- IEntityTypeConfiguration
- AuthRequest
- SiparisDurum
- createHeroCategoryGrid
- RecentOrdersCard.js
- RegisterRequest
- .BuildModel
- BaseEntity
- HareketTipi
- .BuildModel
- UpdateUrunTurCommandHandler.cs
- UpdateUrunGorselCommandHandler.cs
- ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu
- UpdateUrunOzellikCommandHandler.cs
- DeleteUrunGorselCommandHandler.cs
- CreateUrunCommandHandler.cs
- CreateUrunGorselCommandHandler.cs
- UpdateKategoriCommandHandler.cs
- DeleteKategoriCommandHandler.cs
- DeleteUrunTurCommandHandler.cs
- UpdateUrunCommandHandler.cs
- CartPage
- IDesignTimeDbContextFactory
- Sevkiyat

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 84 edges
2. `ShopApp.Application.Common.Interfaces` - 78 edges
3. `IShopAppDbContext` - 50 edges
4. `ShopAppDbContext` - 50 edges
5. `ICurrentCustomerContext` - 41 edges
6. `Urun` - 41 edges
7. `SiparisEntity` - 39 edges
8. `SepetEntity` - 34 edges
9. `navigate()` - 31 edges
10. `TestDbContext` - 30 edges

## Surprising Connections (you probably didn't know these)
- `bindEvents()` --calls--> `navigate()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → Frontend/ShopApp.Web/src/app/router.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `renderNode()` --calls--> `createIcon()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js → Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `render()` --calls--> `createButton()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → Frontend/ShopApp.Web/src/shared/components/Button/Button.js
- `initApp()` --calls--> `logout()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/App.js → Frontend/ShopApp.Web/src/features/auth/services/authService.js

## Import Cycles
- None detected.

## Communities (160 total, 15 thin omitted)

### Community 0 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 1 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.06
Nodes (23): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet (+15 more)

### Community 2 - "KategoriDbContext"
Cohesion: 0.14
Nodes (11): KategoriServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, KategoriDbContext, Kategoriler, UrunGorselleri, Urunler (+3 more)

### Community 3 - "SepetController"
Cohesion: 0.10
Nodes (32): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+24 more)

### Community 4 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 5 - "StokServis.Domain.Entities"
Cohesion: 0.23
Nodes (4): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common

### Community 6 - "KargoDbContext"
Cohesion: 0.18
Nodes (9): DbContext, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri, Sevkiyatlar (+1 more)

### Community 7 - "LoginPage.js"
Cohesion: 0.06
Nodes (49): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update() (+41 more)

### Community 8 - "ShopApp.Application.csproj"
Cohesion: 0.05
Nodes (42): net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+34 more)

### Community 9 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 10 - "IlkMigrasyon"
Cohesion: 0.12
Nodes (11): KargoServis.Infrastructure.Persistence, KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime (+3 more)

### Community 11 - "homeService.js"
Cohesion: 0.24
Nodes (6): heroCategories, secondaryCategories, TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API., TODO: Integrate with Catalog/CMS API.

### Community 12 - "IdentityService"
Cohesion: 0.19
Nodes (10): IdentityError, IdentityResult, Guid, IdentityRole, IHttpContextAccessor, IReadOnlyCollection, RoleManager, Task (+2 more)

### Community 13 - "SiparisController"
Cohesion: 0.10
Nodes (29): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+21 more)

### Community 14 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 15 - "IRequest"
Cohesion: 0.06
Nodes (43): IRequest, IRequestHandler, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, CreateUrunCommand (+35 more)

### Community 16 - ".BuildModel"
Cohesion: 0.29
Nodes (6): ModelSnapshot, DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

### Community 17 - "authService.js"
Cohesion: 0.13
Nodes (19): appConfig, establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession() (+11 more)

### Community 18 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (30): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+22 more)

### Community 19 - "ICurrentCustomerContext"
Cohesion: 0.07
Nodes (34): CancellationToken, Task, ICurrentCustomerContext, Guid, UpdateKategoriCommand, CancellationToken, Kategori, Task (+26 more)

### Community 20 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.06
Nodes (29): ShopApp.Domain.Urun.Entities, ShopApp.Application.Tests.Features.Urun, src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId (+21 more)

### Community 21 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 23 - ".For"
Cohesion: 0.15
Nodes (23): Mock, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, Guid (+15 more)

### Community 24 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 26 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 27 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 28 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 29 - ".Olustur"
Cohesion: 0.14
Nodes (22): Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler, Guid, DeleteSepetCommand (+14 more)

### Community 31 - "AdminDashboardPage.js"
Cohesion: 0.29
Nodes (10): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary() (+2 more)

### Community 32 - "navigate"
Cohesion: 0.19
Nodes (16): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+8 more)

### Community 33 - "OrderListPage.js"
Cohesion: 0.27
Nodes (12): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+4 more)

### Community 34 - "productsService.js"
Cohesion: 0.08
Nodes (38): createCategoryCard(), bindEvents(), render(), render(), getHeroCategories(), getSecondaryCategories(), createCategoryCard(), createCategoryGrid() (+30 more)

### Community 35 - ".Olustur"
Cohesion: 0.14
Nodes (22): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, DeleteSiparisCommand (+14 more)

### Community 36 - "AuthResponse"
Cohesion: 0.11
Nodes (21): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+13 more)

### Community 37 - "ProfilePage.js"
Cohesion: 0.11
Nodes (27): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+19 more)

### Community 38 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 39 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.10
Nodes (12): ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Tests.Features.Siparis, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis (+4 more)

### Community 40 - "authStore.js"
Cohesion: 0.12
Nodes (20): clearError(), getState(), initialState, merge(), notify(), setError(), setLoading(), state (+12 more)

### Community 41 - "Urun"
Cohesion: 0.08
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Application.Features.Urun.Commands.DeleteUrun, DeleteUrunCommandValidator, Guid, ICollection, Urun, AktifMi, Detay (+14 more)

### Community 42 - "AbstractValidator"
Cohesion: 0.13
Nodes (13): AbstractValidator, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, UpdateSepetUrunuCommandValidator, Guid, CreateSiparisUrunuCommand (+5 more)

### Community 43 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 44 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 45 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Persistence.Migrations, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, UpdateMonolithTables

### Community 46 - "DatabaseChanges"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, DatabaseChanges

### Community 47 - "AddMonolithDomainChanges"
Cohesion: 0.20
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMonolithDomainChanges

### Community 48 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 49 - "AdminCategoriesPage.js"
Cohesion: 0.16
Nodes (20): createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), buildCategoryTree(), createCategoryTree(), renderNode(), createRecentCategoriesCard() (+12 more)

### Community 50 - "UserProfileDto"
Cohesion: 0.08
Nodes (31): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, GetMyProfileQuery, ActionResult, CancellationToken (+23 more)

### Community 51 - "SepetUrunu"
Cohesion: 0.22
Nodes (7): Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

### Community 52 - "createIcon"
Cohesion: 0.11
Nodes (32): AboutPage(), render(), createAdminPagination(), createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductDetailModal(), close() (+24 more)

### Community 53 - "IIdentityService"
Cohesion: 0.17
Nodes (11): Guid, IReadOnlyCollection, Task, IIdentityService, DateTime, Guid, IdentityUserInfo, Guid (+3 more)

### Community 54 - "AdminProductsPage.js"
Cohesion: 0.16
Nodes (9): createAdminConfirmModal(), close(), handleKeydown(), createAdminPageHeader(), AdminRegisterPage(), NotFoundPage(), createButton(), destroy() (+1 more)

### Community 55 - "KayitliKullanici"
Cohesion: 0.09
Nodes (21): ShopApp.Infrastructure.Identity.Models, IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi (+13 more)

### Community 56 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (18): ShopApp.Infrastructure.Identity.Settings, IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid (+10 more)

### Community 57 - "ShopApp.Application.Mapping"
Cohesion: 0.24
Nodes (6): ShopApp.Application.Mapping, SepetMapping, SiparisMapping, UrunMapping, MapperFactory, Profile

### Community 58 - "AuthenticationValidationException"
Cohesion: 0.33
Nodes (5): ShopApp.Application.Features.Authentication, Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 59 - "package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 60 - ".Create"
Cohesion: 0.20
Nodes (14): GetSepetQuery, CancellationToken, Guid, IMapper, Task, GetSepet, GetSepetQuery, Id (+6 more)

### Community 61 - "CurrentCustomer"
Cohesion: 0.16
Nodes (15): Guid, CurrentCustomer, CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, CancellationToken (+7 more)

### Community 62 - "BaseEntityConfiguration"
Cohesion: 0.13
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 63 - "TestDbContext"
Cohesion: 0.10
Nodes (22): UrunEntity, Fact, DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik (+14 more)

### Community 64 - "InfrastructureInitializer"
Cohesion: 0.13
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 65 - "KargoServis.Domain.Entities"
Cohesion: 0.24
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

### Community 66 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 67 - "IShopAppDbContext"
Cohesion: 0.09
Nodes (21): CancellationToken, DbSet, Kategori, SiparisUrunleri, Task, Urun, UrunGorsel, UrunOzellik (+13 more)

### Community 68 - "GetSiparisQueryHandler"
Cohesion: 0.17
Nodes (15): GetSiparisQuery, CancellationToken, Guid, IMapper, Task, GetSiparisQuery, Id, GetSiparisQueryHandler (+7 more)

### Community 69 - "SiparisUrunleri"
Cohesion: 0.11
Nodes (14): Guid, Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat (+6 more)

### Community 70 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.18
Nodes (7): src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, Guid, AdminProfile, KullaniciId, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 72 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 74 - "SepetEntity"
Cohesion: 0.16
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 75 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 76 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 77 - "IdentityUserTokenConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

### Community 78 - "UrunGorseli"
Cohesion: 0.22
Nodes (8): Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorseliConfiguration

### Community 79 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 80 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 81 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.24
Nodes (5): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 82 - "IdentityUserRoleConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 83 - "IdentityRoleConfiguration"
Cohesion: 0.60
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 84 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.13
Nodes (11): ShopApp.Application.Features.Authentication.DTOs, ShopApp.Application.Features.Authentication.Services, HashSet, Guid, HttpGet, HttpPost, IActionResult, Task (+3 more)

### Community 85 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 86 - "SiparisEntity"
Cohesion: 0.16
Nodes (15): ICollection, SiparisEntity, AraToplam, Durum, DurumId, IndirimTutari, KargoFiyat, MusteriId (+7 more)

### Community 87 - "createAdminProductFormModal"
Cohesion: 0.24
Nodes (18): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview(), AdminProductsPage() (+10 more)

### Community 88 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.29
Nodes (10): Guid, UpdateSiparisUrunuCommand, CancellationToken, Task, UpdateSiparisUrunuCommandHandler, CancellationToken, Fact, KeyNotFoundException (+2 more)

### Community 89 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, CancellationToken, IEnumerable, Task (+4 more)

### Community 90 - "ShopApp.Application.Features.Urun.Dtos"
Cohesion: 0.17
Nodes (12): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Features.Urun.Queries, GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, CancellationToken, Guid, IMapper (+4 more)

### Community 91 - ".GetMyAddresses"
Cohesion: 0.20
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 92 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 93 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 94 - "ShopApp.Infrastructure.Persistence.Context"
Cohesion: 0.20
Nodes (7): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Infrastructure.Persistence.Repositories, CancellationToken, IHttpContextAccessor, Task, CurrentCustomerContext

### Community 95 - "StokDbContext"
Cohesion: 0.16
Nodes (9): StokServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri (+1 more)

### Community 96 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.20
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur (+2 more)

### Community 97 - "createHeader"
Cohesion: 0.29
Nodes (13): createHeader(), bindCategoryDropdown(), bindEvents(), bindMobileCategories(), destroy(), injectIcons(), populateCategoryDropdown(), populateMobileCategories() (+5 more)

### Community 98 - "GetByIdKategoriDto"
Cohesion: 0.18
Nodes (11): GetKategoriQuery, Guid, List, GetByIdKategoriDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 99 - "GetUrunGorselleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 100 - "GetUrunOzellikleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunOzellikleriQuery, Guid, ResultUrunOzellikDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 101 - "GetByIdUrunDto"
Cohesion: 0.18
Nodes (11): GetUrunQuery, Guid, List, GetByIdUrunDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 102 - "GetUrunTurleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunTurleriQuery, Guid, ResultUrunTurDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 103 - "GetByIdUrunTurDto"
Cohesion: 0.18
Nodes (11): GetUrunTurQuery, Guid, List, GetByIdUrunTurDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 104 - "DeleteUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 105 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 106 - "CreateUrunTurCommandHandler"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunTur, Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler (+1 more)

### Community 107 - ".Handle"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateKategori, Guid, CreateKategoriCommand, CancellationToken, Guid, Kategori, Task, CreateKategoriCommandHandler (+1 more)

### Community 108 - "GetKategorilerQueryHandler"
Cohesion: 0.22
Nodes (10): GetKategorilerQuery, Guid, ResultKategoriDto, CancellationToken, IMapper, List, Task, GetKategoriler (+2 more)

### Community 109 - "ResultSepetDto"
Cohesion: 0.22
Nodes (11): GetMySepetlerQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 110 - "ResultSiparisDto"
Cohesion: 0.22
Nodes (11): GetMySiparislerQuery, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 111 - "GetUrunlerQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunlerQuery, Guid, ResultUrunDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 112 - "GetUrunOzellikQueryHandler"
Cohesion: 0.19
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 113 - "ISiparisRepository"
Cohesion: 0.27
Nodes (8): CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler

### Community 114 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 115 - "createAdminLayout"
Cohesion: 0.24
Nodes (8): createAdminHeader(), createAdminLayout(), createAdminSidebar(), NAV_SECTIONS, AdminCustomersPage(), getFilteredCustomers(), renderPage(), renderTable()

### Community 116 - "OrderConfirmationPage.js"
Cohesion: 0.30
Nodes (10): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+2 more)

### Community 117 - "AddressDto"
Cohesion: 0.27
Nodes (10): GetMyAddressesQuery, DateTime, Guid, AddressDto, CancellationToken, List, Task, GetMyAddresses (+2 more)

### Community 118 - ".AssertCrudAsync"
Cohesion: 0.33
Nodes (6): Task, GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 119 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 120 - "StokUrunleri"
Cohesion: 0.17
Nodes (12): Guid, ICollection, StokUrunleri, Depo, DepoId, DepoKonumu, Hareketler, KullanilabilirMiktar (+4 more)

### Community 121 - "DeleteSiparisUrunuCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, DeleteSiparisUrunuCommandValidator

### Community 122 - "StokHareketi"
Cohesion: 0.20
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 123 - "CreateAddressCommand"
Cohesion: 0.33
Nodes (7): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, Fact, AddressHandlerTests

### Community 124 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 125 - "StandardizeSepetUrunuQuantityField"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, StandardizeSepetUrunuQuantityField

### Community 126 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 127 - "ShopApp.Application.Features.Siparis.Dtos"
Cohesion: 0.20
Nodes (6): ShopApp.Application.Features.Siparis.Dtos, Guid, GetByIdSiparisDto, Guid, GetByIdSiparisUrunleriDto, GetSiparis

### Community 128 - "AddressHandlerTests.cs"
Cohesion: 0.29
Nodes (6): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos

### Community 129 - "Address"
Cohesion: 0.22
Nodes (9): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+1 more)

### Community 130 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 131 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 132 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 133 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 134 - "Depo"
Cohesion: 0.22
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 135 - "createCategoryMegaMenu"
Cohesion: 0.33
Nodes (5): createCategoryMegaMenu(), render(), update(), normalizeCategories(), slugify()

### Community 136 - "IEntityTypeConfiguration"
Cohesion: 0.29
Nodes (6): IEntityTypeConfiguration, EntityTypeBuilder, AddressConfiguration, StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 137 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 138 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 139 - "createHeroCategoryGrid"
Cohesion: 0.40
Nodes (3): createHeroCategoryGrid(), HomePage(), render()

### Community 140 - "RecentOrdersCard.js"
Cohesion: 0.53
Nodes (5): createOrderStatusBadge(), createRecentOrdersCard(), formatDate(), formatPrice(), STATUS_MAP

### Community 141 - "RegisterRequest"
Cohesion: 0.33
Nodes (5): RegisterRequest, Ad, Email, Sifre, Soyad

### Community 142 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, KategoriDbContextModelSnapshot

### Community 143 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 144 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 145 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 157 - "CartPage"
Cohesion: 0.80
Nodes (5): CartPage(), getShippingCost(), getSubtotal(), renderItems(), updateSummary()

### Community 159 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

## Knowledge Gaps
- **406 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+401 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 971 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `Address`, `Musteri`, `SepetController`, `SiparisController`, `ShopAppDbContext`, `SepetUrunu`, `.AddInfrastructure`, `.Create`, `CurrentCustomer`, `TestDbContext`, `GetSiparisQueryHandler`, `src.Monolith.ShopApp.Domain.Kullanici`, `SepetEntity`, `SiparisEntity`, `ShopApp.Application.Features.Urun.Dtos`, `GetByIdKategoriDto`, `GetUrunGorselleriQueryHandler`, `GetUrunOzellikleriQueryHandler`, `GetByIdUrunDto`, `GetUrunTurleriQueryHandler`, `GetByIdUrunTurDto`, `GetKategorilerQueryHandler`, `ResultSepetDto`, `ResultSiparisDto`, `GetUrunlerQueryHandler`, `GetUrunOzellikQueryHandler`, `AddressDto`, `CreateAddressCommand`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `Address`, `Musteri`, `IShopAppDbContext`, `GetSiparisQueryHandler`, `SiparisUrunleri`, `KargoDbContext`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `SepetEntity`, `SepetUrunu`, `SiparisEntity`, `CurrentCustomer`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `AddressHandlerTests.cs`, `UpdateUrunTurCommandHandler.cs`, `UpdateUrunGorselCommandHandler.cs`, `ShopApp.Domain.Urun.Entities`, `ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu`, `DeleteUrunGorselCommandHandler.cs`, `CreateUrunCommandHandler.cs`, `CreateUrunGorselCommandHandler.cs`, `UpdateKategoriCommandHandler.cs`, `DeleteKategoriCommandHandler.cs`, `DeleteUrunTurCommandHandler.cs`, `UpdateUrunCommandHandler.cs`, `UpdateUrunOzellikCommandHandler.cs`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `Urun`, `AbstractValidator`, `UserProfileDto`, `.AddInfrastructure`, `CurrentCustomer`, `src.Monolith.ShopApp.Domain.Kullanici`, `ShopApp.Application.Features.Authentication.DTOs`, `ShopApp.Application.Features.Urun.Dtos`, `ShopApp.Infrastructure.Persistence.Context`, `CreateUrunOzellikCommandHandler`, `GetByIdKategoriDto`, `GetUrunGorselleriQueryHandler`, `GetUrunOzellikleriQueryHandler`, `GetByIdUrunDto`, `GetUrunTurleriQueryHandler`, `GetByIdUrunTurDto`, `DeleteUrunOzellikCommandHandler`, `CreateUrunTurCommandHandler`, `.Handle`, `GetKategorilerQueryHandler`, `ResultSiparisDto`, `GetUrunOzellikQueryHandler`, `DeleteSiparisUrunuCommand`, `CreateAddressCommand`, `ShopApp.Application.Features.Siparis.Dtos`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _406 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ShopApp.Application.Common.Interfaces` be split into smaller, more focused modules?**
  _Cohesion score 0.05858585858585859 - nodes in this community are weakly interconnected._
- **Should `KategoriDbContext` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._
- **Should `SepetController` be split into smaller, more focused modules?**
  _Cohesion score 0.09595959595959595 - nodes in this community are weakly interconnected._