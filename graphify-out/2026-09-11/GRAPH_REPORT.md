# Graph Report - ShopApp  (2026-09-10)

## Corpus Check
- 486 files · ~403,702 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3380 nodes · 7216 edges · 195 communities (185 shown, 9 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 654 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dac01347`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AddressLookupItemDto
- .Delete
- ShopApp.Infrastructure.csproj
- CartPage.js
- FrontendAGENTS.md
- .Olustur
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- UpdateSepetCommand
- ShopAppDbContext
- ProductDetailPage.js
- ShopApp.Application.Features.Authentication.DTOs
- AddRoleSpecificProfiles
- authService.js
- appConstants.js
- What You Must Do When Invoked
- TestDbContext
- eventBus.js
- ProfileController
- .Handle
- .Handle
- productsService.js
- SepetEntity
- SiparisEntity
- registerValidation.js
- .Create
- ISepetRepository
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
- SiparisController
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- UpdateUrunCommand
- KategoriServis.csproj
- StokServis.csproj
- Urun
- ResultSepetUrunDto
- IlkMigrasyon
- SiparisDurumLookup
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- ShopApp.Infrastructure.Persistence.Migrations
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- ShopApp.sln
- AddMonolithDomainChanges
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- InfrastructureInitializer
- createIcon
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- BaseEntityConfiguration
- ShopApp.Infrastructure.Persistence.Context
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- SiparisCommandHandlerTests
- .For
- UrunTur
- src.Monolith.ShopApp.Domain.Siparis.Entities
- DeleteSepetCommand
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- .GetRequiredAsync
- StokHareketi
- orderService.js
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- UpdateAdminCustomerCommand
- Kategori
- BaseEntity
- src.Monolith.ShopApp.Domain.Sepet.Entities
- IIdentityService
- MakeIdValueGeneratedNever
- Q: How are role-specific customer and admin profiles provisioned?
- .GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection
- StokUrunleri
- KategoriDbContext
- http
- navigate
- .GetAll
- categoryService.js
- UrunOzelligi
- InitialCreate
- ResultSiparisDto
- KargoDbContext
- SyncIdentityModels
- OrderListPage.js
- Kategori
- GetAdminOrdersQueryHandler
- .GetBySiparisIdAsync
- ResultUrunGorselDto
- RemoveAdminProfileTable
- .SeedActiveAndPassiveProduct
- AuthRequest
- IRequest
- createAuthForm
- .GetAll
- GetByIdUrunDto
- ShopApp.Application.Features.Siparis.Commands.UpdateSiparis
- KargoGonderisi
- ResultUrunDto
- UrunTur
- KargoDurumu
- KategoriServis.Domain.Entities
- graphify reference: extra exports and benchmark
- DeleteKategoriCommand
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- .Handle
- .GetCurrentKullaniciIdAsync
- AbstractValidator
- Sevkiyat
- GetUrunTurleriQueryHandler
- OrderConfirmationPage.js
- createConfirmModal
- .AddInfrastructure
- IEntityTypeConfiguration
- graphify reference: query, path, explain
- AddressDto
- ControllerBase
- BaseEntity
- HareketTipi
- authConstants.js
- ShopApp.Application.Tests.csproj
- InitialCreate
- IdentityUserClaimConfiguration
- UpdateUrunTurCommandHandler
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- CreateUrunGorselCommandHandler
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- apiClient.js
- AdminDashboardDto
- AddressHandlerTests
- ShopApp Development Notes
- store.js
- IRequestHandler
- productData.js
- GetByIdUrunGorselDto
- AddProductMultiImageSupport
- Musteri
- .Handle
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Common.Interfaces
- KargoDurumGecmisi
- KayitliKullanici
- IdentityUserLoginConfiguration
- AdminUrunController
- GenericUrunRepository
- UrunGorsel
- AddMahalleAndConvertPostaKoduToInteger
- GetUrunlerQueryHandler
- CreateUrunTurCommandHandler
- createAdminProductFormModal
- DeleteUrunOzellikCommand
- .GetAll
- CreateUrunOzellikCommandHandler
- ProfileController.cs
- IdentityRoleConfiguration
- .Create
- IGenericUrunRepository
- .BuildModel
- IdentityUserRoleConfiguration
- AddAddressPhone
- BaseEntity
- createCategoryFormPanel
- ProductDto
- SepetDurumLookup
- AuthenticationValidationException
- .GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses
- StokUrunleri
- Sevkiyat
- SiparisDurum
- .BuildModel
- .BuildModel

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 96 edges
2. `createIcon()` - 86 edges
3. `IShopAppDbContext` - 64 edges
4. `Urun` - 53 edges
5. `ShopAppDbContext` - 51 edges
6. `ICurrentCustomerContext` - 43 edges
7. `SiparisEntity` - 41 edges
8. `navigate()` - 39 edges
9. `TestDbContext` - 38 edges
10. `SepetEntity` - 34 edges

## Surprising Connections (you probably didn't know these)
- `renderImageList()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `initApp()` --calls--> `restoreSession()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/bootstrap.js → src/Frontend/ShopApp.Web/src/app/App.js
- `guardedPath()` --indirect_call--> `hasRole()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/app/router.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `guardedPath()` --calls--> `isAuthenticated()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/router.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js

## Import Cycles
- None detected.

## Communities (195 total, 9 thin omitted)

### Community 0 - "AddressLookupItemDto"
Cohesion: 0.07
Nodes (32): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator (+24 more)

### Community 1 - ".Delete"
Cohesion: 0.16
Nodes (13): ShopApp.Application.Features.Urun.Commands.UpdateKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult, IMediator (+5 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.17
Nodes (11): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.Extensions.Http (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

### Community 3 - "CartPage.js"
Cohesion: 0.13
Nodes (20): createCartSummary(), formatPrice(), update(), CartPage(), getShippingCost(), getSubtotal(), handleCheckout(), handleTemporaryCheckout() (+12 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - ".Olustur"
Cohesion: 0.19
Nodes (13): Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, Guid, UpdateSiparisCommand, CancellationToken (+5 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.10
Nodes (11): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, LoginPage(), RegisterPage() (+3 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "UpdateSepetCommand"
Cohesion: 0.29
Nodes (11): Guid, UpdateSepetCommand, CancellationToken, Task, UpdateSepetCommandHandler, CancellationToken, Fact, Guid (+3 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (30): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+22 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.13
Nodes (25): createOrdersTable(), isAuthenticated(), createCartItemRow(), updateQuantity(), addCartItem(), createProductCard(), createProductImage(), createProductListLayout() (+17 more)

### Community 11 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.11
Nodes (11): ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Tests.Features.Profil, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Authentication.DTOs, ShopApp.Infrastructure.Identity.Models, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, ShopApp.Application.Features.Authentication.Services (+3 more)

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "authService.js"
Cohesion: 0.14
Nodes (21): AUTH_STATUS, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), clearError() (+13 more)

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "TestDbContext"
Cohesion: 0.12
Nodes (16): DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik, UrunTur, TestDbContext (+8 more)

### Community 19 - "ProfileController"
Cohesion: 0.23
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 20 - ".Handle"
Cohesion: 0.18
Nodes (12): UrunGorsel, CancellationToken, Guid, Kategori, Task, UrunEntity, CreateUrunCommandHandler, Fact (+4 more)

### Community 21 - ".Handle"
Cohesion: 0.23
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateKategori, Guid, CreateKategoriCommand, CancellationToken, Guid, Kategori, Task, CreateKategoriCommandHandler (+1 more)

### Community 22 - "productsService.js"
Cohesion: 0.09
Nodes (36): load(), createLowStockList(), createHeroCategoryGrid(), render(), HomePage(), render(), getHomeCategories(), createCategoryCard() (+28 more)

### Community 23 - "SepetEntity"
Cohesion: 0.15
Nodes (14): Guid, ICollection, SepetEntity, Durum, DurumId, MusteriId, Urunler, Guid (+6 more)

### Community 24 - "SiparisEntity"
Cohesion: 0.05
Nodes (54): CancellationToken, Guid, Task, ISiparisRepository, Guid, CreateSiparisUrunuCommand, CancellationToken, Guid (+46 more)

### Community 25 - "registerValidation.js"
Cohesion: 0.20
Nodes (26): RFC-5322, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only. (+18 more)

### Community 26 - ".Create"
Cohesion: 0.32
Nodes (13): Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken, Fact (+5 more)

### Community 27 - "ISepetRepository"
Cohesion: 0.26
Nodes (8): CancellationToken, Guid, Task, ISepetRepository, CancellationToken, Guid, Task, SepetRepository

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.22
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.14
Nodes (16): IdentityError, IdentityResult, DateTime, Guid, IdentityUserInfo, CancellationToken, Guid, IdentityRole (+8 more)

### Community 31 - "AuthResponse"
Cohesion: 0.08
Nodes (30): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+22 more)

### Community 32 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 33 - "SiparisController"
Cohesion: 0.10
Nodes (31): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 34 - "KargoServis.Domain.Entities"
Cohesion: 0.24
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.15
Nodes (12): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), TurkiyeCitiesPackage (2.0.0), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10) (+4 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - "StandardizeSepetUrunuQuantityField"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, StandardizeSepetUrunuQuantityField

### Community 38 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 39 - "UpdateUrunCommand"
Cohesion: 0.11
Nodes (23): Guid, List, UpdateProductCommand, UpdateUrunCommand, Brand, CategoryId, CoverImageUrl, Description (+15 more)

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 43 - "ResultSepetUrunDto"
Cohesion: 0.10
Nodes (31): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "SiparisDurumLookup"
Cohesion: 0.16
Nodes (16): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact (+8 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.18
Nodes (10): AutoMapper (16.2.0), FluentValidation (12.1.1), Microsoft.EntityFrameworkCore (10.0.11), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 48 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Persistence.Migrations, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, UpdateMonolithTables

### Community 49 - "DatabaseChanges"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, DatabaseChanges

### Community 50 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 51 - "ShopApp.sln"
Cohesion: 0.22
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

### Community 52 - "AddMonolithDomainChanges"
Cohesion: 0.20
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMonolithDomainChanges

### Community 53 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 54 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 55 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 56 - "InfrastructureInitializer"
Cohesion: 0.13
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, CancellationToken, ILogger, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 57 - "createIcon"
Cohesion: 0.06
Nodes (59): routes, AboutPage(), render(), createAdminConfirmModal(), close(), handleKeydown(), createAdminLayout(), createAdminMetricCard() (+51 more)

### Community 60 - "BaseEntityConfiguration"
Cohesion: 0.12
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 61 - "ShopApp.Infrastructure.Persistence.Context"
Cohesion: 0.15
Nodes (6): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Infrastructure.Kargo, ShopApp.Infrastructure.Identity.Settings, src.Monolith.ShopApp.Domain.Common, ShopApp.Infrastructure.Persistence.Repositories

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.12
Nodes (22): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, GetMyProfileQuery, CancellationToken, IMediator, Task, UpdateMyProfileCommand (+14 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - "SiparisCommandHandlerTests"
Cohesion: 0.24
Nodes (14): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Fact, InvalidOperationException (+6 more)

### Community 67 - ".For"
Cohesion: 0.15
Nodes (15): CurrentCustomer, ICurrentCustomerContext, Guid, DeleteSepetUrunuCommand, CancellationToken, Task, DeleteSepetUrunuCommandHandler, Guid (+7 more)

### Community 68 - "UrunTur"
Cohesion: 0.08
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur, UrunTurId, Guid (+14 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.12
Nodes (8): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Features.Siparis, ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu

### Community 70 - "DeleteSepetCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Sepet.Commands.DeleteSepet, Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, DeleteSepetCommandValidator

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.15
Nodes (10): StokServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri (+2 more)

### Community 74 - ".GetRequiredAsync"
Cohesion: 0.09
Nodes (29): GetMySepetlerQuery, GetSepetQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List (+21 more)

### Community 75 - "StokHareketi"
Cohesion: 0.20
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "orderService.js"
Cohesion: 0.09
Nodes (22): createAdminOrderDetailModal(), close(), handleKeydown(), AdminOrdersPage(), closeActiveModal(), destroy(), getFilteredOrders(), getStatusId() (+14 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "IShopAppDbContext"
Cohesion: 0.09
Nodes (21): CancellationToken, DbSet, Kategori, SiparisUrunleri, Task, Urun, UrunGorsel, UrunOzellik (+13 more)

### Community 79 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 80 - "Urun"
Cohesion: 0.06
Nodes (29): ShopApp.Application.Features.Urun.Commands.UpdateUrunTur, ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, ShopApp.Application.Features.Urun.Commands.CreateUrunTur, ShopApp.Application.Features.Urun.Commands.CreateUrun, ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, ShopApp.Domain.Urun.Entities, ShopApp.Application.Tests.Features.Urun (+21 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.07
Nodes (37): ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, ShopApp.Application.Features.Admin.Customers.Queries, GetAdminCustomersQuery, ActionResult, CancellationToken, Guid, HttpGet (+29 more)

### Community 82 - "Kategori"
Cohesion: 0.13
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "BaseEntity"
Cohesion: 0.10
Nodes (18): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+10 more)

### Community 84 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.06
Nodes (19): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu (+11 more)

### Community 85 - "IIdentityService"
Cohesion: 0.21
Nodes (9): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+1 more)

### Community 86 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - ".GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection"
Cohesion: 0.22
Nodes (15): GetAdminDashboardQuery, CancellationToken, IMediator, Task, GetAdminDashboard, GetAdminDashboardQuery, GetAdminDashboardQueryHandler, CancellationToken (+7 more)

### Community 89 - "StokUrunleri"
Cohesion: 0.17
Nodes (12): Guid, ICollection, StokUrunleri, Depo, DepoId, DepoKonumu, Hareketler, KullanilabilirMiktar (+4 more)

### Community 90 - "KategoriDbContext"
Cohesion: 0.14
Nodes (11): KategoriServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, KategoriDbContext, Kategoriler, UrunGorselleri, Urunler (+3 more)

### Community 91 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 92 - "navigate"
Cohesion: 0.10
Nodes (36): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+28 more)

### Community 93 - ".GetAll"
Cohesion: 0.08
Nodes (29): GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+21 more)

### Community 94 - "categoryService.js"
Cohesion: 0.09
Nodes (22): addCategory(), attachParentNames(), categories, deleteCategory(), fileToDataUrl(), getCategories(), getCategoryById(), mapFromBackend() (+14 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - "ResultSiparisDto"
Cohesion: 0.12
Nodes (24): GetMySiparislerQuery, GetSiparisQuery, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper, List (+16 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.15
Nodes (10): KargoServis.Infrastructure.Persistence, IDesignTimeDbContextFactory, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri (+2 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "OrderListPage.js"
Cohesion: 0.16
Nodes (14): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+6 more)

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "GetAdminOrdersQueryHandler"
Cohesion: 0.16
Nodes (13): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, GetAdminOrdersQuery, UpdateAdminOrderStatusRequest, DateTime, Guid, AdminOrderDto, CancellationToken (+5 more)

### Community 103 - ".GetBySiparisIdAsync"
Cohesion: 0.13
Nodes (15): HttpClient, KargoGonderisiResponse, CancellationToken, DateOnly, Guid, Task, IKargoReadService, ShipmentInfoDto (+7 more)

### Community 104 - "ResultUrunGorselDto"
Cohesion: 0.15
Nodes (15): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, DisplayOrder, ImageUrl, IsMain, ProductId, CancellationToken (+7 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - ".SeedActiveAndPassiveProduct"
Cohesion: 0.18
Nodes (16): active, GetUrunQuery, passive, CancellationToken, Guid, IMapper, Task, GetUrun (+8 more)

### Community 107 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 108 - "IRequest"
Cohesion: 0.08
Nodes (22): IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid, GetByIdSiparisDto, Guid (+14 more)

### Community 109 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 110 - ".GetAll"
Cohesion: 0.24
Nodes (10): ActionResult, CancellationToken, Guid, HttpGet, HttpPut, IActionResult, IMediator, List (+2 more)

### Community 111 - "GetByIdUrunDto"
Cohesion: 0.13
Nodes (14): Guid, List, GetByIdUrunDto, Brand, CategoryId, CategoryName, CoverImageUrl, Description (+6 more)

### Community 112 - "ShopApp.Application.Features.Siparis.Commands.UpdateSiparis"
Cohesion: 0.20
Nodes (4): src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Features.Admin.Dashboard.Dtos, ShopApp.Application.Features.Admin.Dashboard.Queries, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "ResultUrunDto"
Cohesion: 0.14
Nodes (13): Guid, List, ResultUrunDto, Brand, CategoryId, CoverImageUrl, Description, Images (+5 more)

### Community 115 - "UrunTur"
Cohesion: 0.11
Nodes (17): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, Guid, ICollection (+9 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 117 - "KategoriServis.Domain.Entities"
Cohesion: 0.16
Nodes (10): KategoriServis.Domain.Entities, KategoriServis.Domain.Common, Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId (+2 more)

### Community 118 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 119 - "DeleteKategoriCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Urun.Commands.DeleteKategori, Guid, DeleteKategoriCommand, CancellationToken, Task, DeleteKategoriCommandHandler, DeleteKategoriCommandValidator

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.23
Nodes (4): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common

### Community 121 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 122 - ".Handle"
Cohesion: 0.16
Nodes (19): GetAdminOrderQuery, DateTime, Guid, List, AdminOrderCustomerDto, AdminOrderDetailDto, AdminOrderItemDto, CancellationToken (+11 more)

### Community 123 - ".GetCurrentKullaniciIdAsync"
Cohesion: 0.10
Nodes (16): CancellationToken, Guid, Task, Guid, UpdateUrunGorselCommand, CancellationToken, Task, UrunGorsel (+8 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.07
Nodes (18): AbstractValidator, ShopApp.Application.Features.Siparis.Commands.DeleteSiparis, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, CreateSiparisUrunuCommandValidator, DeleteSiparisCommandValidator, DeleteSiparisUrunuCommandValidator, UpdateSiparisCommandValidator (+10 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "GetUrunTurleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunTurleriQuery, Guid, ResultUrunTurDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 127 - "OrderConfirmationPage.js"
Cohesion: 0.15
Nodes (17): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+9 more)

### Community 128 - "createConfirmModal"
Cohesion: 0.73
Nodes (6): createConfirmModal(), close(), handleBackdropClick(), handleCancel(), handleConfirm(), handleKeydown()

### Community 129 - ".AddInfrastructure"
Cohesion: 0.09
Nodes (19): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+11 more)

### Community 130 - "IEntityTypeConfiguration"
Cohesion: 0.12
Nodes (14): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration, EntityTypeBuilder (+6 more)

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "AddressDto"
Cohesion: 0.16
Nodes (15): GetMyAddressQuery, CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, DateTime, Guid (+7 more)

### Community 133 - "ControllerBase"
Cohesion: 0.15
Nodes (12): ControllerBase, KargoServis.Controllers, IMediator, AdminDashboardController, ActionResult, CancellationToken, DateOnly, Guid (+4 more)

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "authConstants.js"
Cohesion: 0.24
Nodes (8): createPasswordStrength(), reset(), update(), FIELD_IDS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH, NOTE: These are frontend-only quality hints.

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 139 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 140 - "UpdateUrunTurCommandHandler"
Cohesion: 0.29
Nodes (6): Guid, UpdateUrunTurCommand, CancellationToken, Task, UrunTur, UpdateUrunTurCommandHandler

### Community 141 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 142 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 143 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 144 - "CreateUrunGorselCommandHandler"
Cohesion: 0.31
Nodes (7): Guid, CreateUrunGorselCommand, CancellationToken, Guid, Task, UrunGorsel, CreateUrunGorselCommandHandler

### Community 150 - "apiClient.js"
Cohesion: 0.29
Nodes (6): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry

### Community 151 - "AdminDashboardDto"
Cohesion: 0.21
Nodes (10): ActionResult, CancellationToken, HttpGet, Task, DateTime, Guid, List, AdminDashboardDto (+2 more)

### Community 152 - "AddressHandlerTests"
Cohesion: 0.15
Nodes (17): CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, CancellationToken, Guid, Task (+9 more)

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.11
Nodes (17): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+9 more)

### Community 154 - "store.js"
Cohesion: 0.31
Nodes (8): getState(), initialState, notify(), resetStore(), setState(), state, subscribe(), subscribers

### Community 155 - "IRequestHandler"
Cohesion: 0.20
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, IRequestHandler, Guid, DeleteUrunTurCommand, CancellationToken, Task, UrunTur, DeleteUrunTurCommandHandler (+1 more)

### Community 156 - "productData.js"
Cohesion: 0.29
Nodes (4): demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 157 - "GetByIdUrunGorselDto"
Cohesion: 0.15
Nodes (14): GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, DisplayOrder, ImageUrl, IsMain, ProductId, CancellationToken (+6 more)

### Community 158 - "AddProductMultiImageSupport"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddProductMultiImageSupport

### Community 159 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 160 - ".Handle"
Cohesion: 0.33
Nodes (6): Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.09
Nodes (37): loadData(), getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal() (+29 more)

### Community 163 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.14
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, ShopApp.Application.Features.Urun.Commands.DeleteUrun, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers (+1 more)

### Community 164 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 165 - "KayitliKullanici"
Cohesion: 0.10
Nodes (18): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+10 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 167 - "AdminUrunController"
Cohesion: 0.07
Nodes (48): GetAdminUrunlerQuery, GetUrunOzellikleriQuery, GetUrunTurQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet (+40 more)

### Community 168 - "GenericUrunRepository"
Cohesion: 0.23
Nodes (9): Fact, Task, GenericUrunRepositoryTests, UrunOzellik, UrunTur, CancellationToken, Guid, Task (+1 more)

### Community 169 - "UrunGorsel"
Cohesion: 0.13
Nodes (13): Guid, UrunGorsel, AnaGorselMi, DisplayOrder, GorselSira, GorselUrl, ImageUrl, IsMain (+5 more)

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "GetUrunlerQueryHandler"
Cohesion: 0.27
Nodes (9): GetUrunlerQuery, CancellationToken, Guid, IMapper, List, Task, GetUrunler, GetUrunlerQuery (+1 more)

### Community 172 - "CreateUrunTurCommandHandler"
Cohesion: 0.31
Nodes (7): Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler

### Community 173 - "createAdminProductFormModal"
Cohesion: 0.48
Nodes (7): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), renderImageList(), showError()

### Community 174 - "DeleteUrunOzellikCommand"
Cohesion: 0.25
Nodes (7): Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler

### Community 175 - ".GetAll"
Cohesion: 0.31
Nodes (8): ActionResult, CancellationToken, Guid, HttpGet, IMediator, List, Task, UrunController

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.27
Nodes (8): Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur, CreateUrunOzellikCommandHandler

### Community 177 - "ProfileController.cs"
Cohesion: 0.26
Nodes (7): ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos, ShopApp.Application.Features.Adres.Queries.GetMyAddress, UpdateAddressCommandValidator

### Community 178 - "IdentityRoleConfiguration"
Cohesion: 0.47
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 179 - ".Create"
Cohesion: 0.38
Nodes (6): Profile, SepetMapping, SiparisMapping, UrunMapping, IMapper, MapperFactory

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.11
Nodes (19): CancellationToken, Guid, Task, IGenericUrunRepository, Guid, DeleteUrunCommand, CancellationToken, Task (+11 more)

### Community 181 - ".BuildModel"
Cohesion: 0.14
Nodes (10): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 182 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 183 - "AddAddressPhone"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddAddressPhone

### Community 184 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 185 - "createCategoryFormPanel"
Cohesion: 0.90
Nodes (5): createCategoryFormPanel(), applyCategory(), populateParentOptions(), renderImagePreview(), resetForm()

### Community 186 - "ProductDto"
Cohesion: 0.60
Nodes (4): Guid, List, ProductDto, ProductImageDto

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 188 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 189 - ".GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses"
Cohesion: 0.36
Nodes (7): GetMyAddressesQuery, CancellationToken, List, Task, GetMyAddresses, GetMyAddressesQuery, GetMyAddressesQueryHandler

### Community 190 - "StokUrunleri"
Cohesion: 0.67
Nodes (3): StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 191 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 193 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 194 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

### Community 197 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

## Knowledge Gaps
- **582 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+577 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1301 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Infrastructure.Persistence.Context` to `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `ShopApp.Application.Features.Authentication.DTOs`, `AddRoleSpecificProfiles`, `AddProductMultiImageSupport`, `Migration`, `StandardizeSepetUrunuQuantityField`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `.BuildModel`, `AddAddressPhone`, `RebuildAllEntitySchema`, `Urun`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `MakeIdValueGeneratedNever`, `SyncIdentityModels`, `RemoveAdminProfileTable`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `SiparisCommandHandlerTests`, `.Create`, `AdminUrunController`, `GenericUrunRepository`, `StokDbContext`, `.SeedActiveAndPassiveProduct`, `SiparisDurumLookup`, `IShopAppDbContext`, `BaseEntity`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `.Handle`, `SepetEntity`, `.GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection`, `SiparisEntity`, `.Handle`, `Musteri`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `AddressDto`, `ShopApp.Application.Features.Authentication.DTOs`, `AddressHandlerTests`, `SiparisDurumLookup`, `ProfileController.cs`, `ShopApp.Infrastructure.Persistence.Context`, `ChangeUserRoleCommand`, `UserProfileDto`, `.For`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `DeleteSepetCommand`, `Urun`, `UpdateAdminCustomerCommand`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `GetAdminOrdersQueryHandler`, `.GetBySiparisIdAsync`, `ShopApp.Application.Features.Siparis.Commands.UpdateSiparis`, `DeleteKategoriCommand`, `.Handle`, `AbstractValidator`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _582 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AddressLookupItemDto` be split into smaller, more focused modules?**
  _Cohesion score 0.06836055656382335 - nodes in this community are weakly interconnected._
- **Should `CartPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13227513227513227 - nodes in this community are weakly interconnected._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._