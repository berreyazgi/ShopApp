# Graph Report - ShopApp  (2026-09-08)

## Corpus Check
- 363 files · ~363,287 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2404 nodes · 4762 edges · 160 communities (145 shown, 14 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 354 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5a4edf3b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Domain.Sepet.Entities
- routes.js
- ShopApp.Infrastructure.csproj
- authService.js
- FrontendAGENTS.md
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- IRequest
- ShopAppDbContext
- .For
- ShopApp.Application.Common.Interfaces
- AddRoleSpecificProfiles
- orderService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- SiparisEntity
- SiparisController.cs
- SepetController
- productsService.js
- createIcon
- ShopApp.Application.Features.Siparis.Dtos
- AddressDto
- CurrentCustomer
- registerValidation.js
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- ShopApp.Infrastructure.Persistence.Migrations
- AdminCategoriesPage.js
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- Urun
- .Create
- IlkMigrasyon
- UrunTur
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- UpdateMonolithTables
- DatabaseChanges
- Migration
- ShopApp.sln
- AddMonolithDomainChanges
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- InfrastructureInitializer
- adminPages.test.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- SiparisUrunleri
- AdminDashboardPage.js
- SepetEntity
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .Olustur
- navigate
- .Create
- ShopApp.Application.Features.Sepet.Dtos
- src.Monolith.ShopApp.Domain.Kullanici
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- src.Monolith.ShopApp.Domain.Siparis.Entities
- StokHareketi
- SepetMapping.cs
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- IRequestHandler
- Kategori
- BaseEntity
- ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu
- ShopApp.Application.Features.Authentication.DTOs
- createAdminLayout
- Q: How are role-specific customer and admin profiles provisioned?
- createAdminProductFormModal
- StokUrunleri
- KategoriDbContext
- http
- createHeader
- .BuildTargetModel
- ProfilePage.js
- UrunOzelligi
- InitialCreate
- Musteri
- KargoDbContext
- SyncIdentityModels
- homeService.js
- Kategori
- ResultSiparisDto
- createCategoryMegaMenu
- createAuthForm
- createButton
- ResultSepetDto
- AuthRequest
- authStore.js
- IdentityUserLoginConfiguration
- UrunGorsel
- KargoDurumGecmisi
- IIdentityService
- KargoGonderisi
- RecentOrdersCard.js
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- IEntityTypeConfiguration
- StokServis.Domain.Entities
- IdentityRoleConfiguration
- ValidationBehavior
- ShopApp.Application.Features.Siparis.Commands.DeleteSiparis
- AbstractValidator
- Sevkiyat
- TestDbContext
- OrderListPage.js
- KategoriServis.Domain.Entities
- .AddInfrastructure
- BaseEntity
- graphify reference: query, path, explain
- GetByIdUrunDto
- createPasswordStrength
- BaseEntity
- HareketTipi
- RegisterRequest
- ShopApp.Application.Tests.csproj
- SiparisDurum
- src.Monolith.ShopApp.Domain.Common
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- StokUrunleri
- SepetDurum
- BaseEntity
- ShopApp Development Notes
- .BuildModel
- SepetUrunuCommandHandlerTests.cs
- IdentityUserClaimConfiguration
- Sevkiyat
- ProfileModals.js
- ICurrentCustomerContext
- profilePage.test.js
- KayitliKullanici

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 84 edges
2. `ShopApp.Application.Common.Interfaces` - 54 edges
3. `ShopAppDbContext` - 50 edges
4. `IShopAppDbContext` - 40 edges
5. `SiparisEntity` - 39 edges
6. `SepetEntity` - 34 edges
7. `ICurrentCustomerContext` - 32 edges
8. `navigate()` - 31 edges
9. `TestDbContext` - 30 edges
10. `Urun` - 25 edges

## Surprising Connections (you probably didn't know these)
- `bindEvents()` --calls--> `navigate()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → src/Frontend/ShopApp.Web/src/app/router.js
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `createPlaceholderIcon()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductCard.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `createBoxPlaceholder()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductDetailModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js

## Import Cycles
- None detected.

## Communities (160 total, 14 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.14
Nodes (6): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 1 - "routes.js"
Cohesion: 0.27
Nodes (3): routes, AboutPage(), render()

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "authService.js"
Cohesion: 0.15
Nodes (16): appConfig, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), setAuthenticated() (+8 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.19
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserRole, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration, EntityTypeBuilder, Guid (+1 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.12
Nodes (11): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, FIELD_IDS, LoginPage() (+3 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "IRequest"
Cohesion: 0.14
Nodes (23): IRequest, Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler, Guid (+15 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (31): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+23 more)

### Community 10 - ".For"
Cohesion: 0.20
Nodes (17): Mock, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, Guid, UpdateSiparisUrunuCommand (+9 more)

### Community 11 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.29
Nodes (6): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Common.Interfaces, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Tests.Features.Urun, ShopApp.Infrastructure.Persistence.Repositories

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "SiparisController"
Cohesion: 0.10
Nodes (29): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+21 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.12
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 20 - "SiparisController.cs"
Cohesion: 0.13
Nodes (5): ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis, UpdateSiparisUrunuCommandValidator

### Community 21 - "SepetController"
Cohesion: 0.10
Nodes (31): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 22 - "productsService.js"
Cohesion: 0.11
Nodes (24): createProductCard(), createProductImage(), createProductListLayout(), demoProducts, getProductDetail(), productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts (+16 more)

### Community 23 - "createIcon"
Cohesion: 0.13
Nodes (25): createCartItemRow(), createCartSummary(), formatPrice(), update(), CartPage(), getShippingCost(), getSubtotal(), renderItems() (+17 more)

### Community 24 - "ShopApp.Application.Features.Siparis.Dtos"
Cohesion: 0.19
Nodes (7): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, Guid, GetByIdSiparisUrunleriDto, GetMySiparisler, GetSiparisUrunleri, GetSiparisUrunu

### Community 25 - "AddressDto"
Cohesion: 0.07
Nodes (38): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos, GetMyAddressesQuery, CancellationToken (+30 more)

### Community 26 - "CurrentCustomer"
Cohesion: 0.14
Nodes (23): Guid, CurrentCustomer, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler (+15 more)

### Community 27 - "registerValidation.js"
Cohesion: 0.21
Nodes (25): RFC-5322, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only., validateConfirmPassword() (+17 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.22
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.21
Nodes (10): IdentityError, IdentityResult, Guid, IdentityRole, IHttpContextAccessor, IReadOnlyCollection, RoleManager, Task (+2 more)

### Community 31 - "AuthResponse"
Cohesion: 0.11
Nodes (21): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+13 more)

### Community 32 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.24
Nodes (6): ShopApp.Infrastructure.Persistence.Migrations, DateTime, DateTimeOffset, Guid, MigrationBuilder, CreateMonolithTables

### Community 33 - "AdminCategoriesPage.js"
Cohesion: 0.16
Nodes (18): createAdminMetricCard(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), createCategoryStatistics(), AdminCategoriesPage(), renderPage() (+10 more)

### Community 34 - "KargoServis.Domain.Entities"
Cohesion: 0.24
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.17
Nodes (11): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - "StandardizeSepetUrunuQuantityField"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, StandardizeSepetUrunuQuantityField

### Community 38 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 39 - ".AssignRole"
Cohesion: 0.18
Nodes (9): HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController, AssignRoleRequest (+1 more)

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 43 - ".Create"
Cohesion: 0.17
Nodes (16): GetSiparisQuery, CancellationToken, Guid, IMapper, Task, GetSiparis, GetSiparisQuery, Id (+8 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.04
Nodes (33): StokServis.Migrations, KargoServis.Migrations, ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot (+25 more)

### Community 45 - "UrunTur"
Cohesion: 0.09
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur, UrunTurId, Guid (+14 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.18
Nodes (10): AutoMapper (16.2.0), FluentValidation (12.1.1), Microsoft.EntityFrameworkCore (10.0.11), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 48 - "UpdateMonolithTables"
Cohesion: 0.18
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, UpdateMonolithTables

### Community 49 - "DatabaseChanges"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, DatabaseChanges

### Community 50 - "Migration"
Cohesion: 0.18
Nodes (7): Migration, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeApplicationUserUpdatedAtRequired

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
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 57 - "adminPages.test.js"
Cohesion: 0.14
Nodes (25): createAdminPagination(), createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductDetailModal(), close(), createBoxPlaceholder(), handleKeydown() (+17 more)

### Community 60 - "SiparisUrunleri"
Cohesion: 0.05
Nodes (33): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId (+25 more)

### Community 61 - "AdminDashboardPage.js"
Cohesion: 0.14
Nodes (21): AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), getDashboardSummary(), getLowStockProducts(), getRecentOrders(), createHeroCategoryGrid() (+13 more)

### Community 62 - "SepetEntity"
Cohesion: 0.16
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.07
Nodes (33): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, ActionResult, CancellationToken, Guid (+25 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Olustur"
Cohesion: 0.14
Nodes (22): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, DeleteSiparisCommand (+14 more)

### Community 67 - "navigate"
Cohesion: 0.12
Nodes (26): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+18 more)

### Community 68 - ".Create"
Cohesion: 0.21
Nodes (13): GetSepetQuery, CancellationToken, Guid, IMapper, Task, GetSepetQuery, Id, GetSepetQueryHandler (+5 more)

### Community 69 - "ShopApp.Application.Features.Sepet.Dtos"
Cohesion: 0.15
Nodes (8): ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Features.Sepet.Dtos, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, GetSepet, GetSepetUrunu

### Community 70 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.18
Nodes (7): src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, Guid, AdminProfile, KullaniciId, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.16
Nodes (9): StokServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri (+1 more)

### Community 74 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.20
Nodes (6): src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Tests.Features.Siparis, CustomerContextFactory

### Community 75 - "StokHareketi"
Cohesion: 0.20
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "SepetMapping.cs"
Cohesion: 0.29
Nodes (5): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping, MapperFactory

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "IShopAppDbContext"
Cohesion: 0.11
Nodes (19): DbSet, Kategori, SiparisUrunleri, Urun, UrunGorsel, UrunOzellik, UrunTur, IShopAppDbContext (+11 more)

### Community 79 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 80 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Detay, Fiyat, GecmisFiyat, Gorseller (+8 more)

### Community 81 - "IRequestHandler"
Cohesion: 0.23
Nodes (11): GetMyProfileQuery, IRequestHandler, CancellationToken, Task, GetMyProfile, GetMyProfileQuery, GetMyProfileQueryHandler, Fact (+3 more)

### Community 82 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "BaseEntity"
Cohesion: 0.10
Nodes (19): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+11 more)

### Community 85 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.16
Nodes (8): ShopApp.Application.Features.Authentication.DTOs, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 86 - "createAdminLayout"
Cohesion: 0.24
Nodes (8): createAdminHeader(), createAdminLayout(), createAdminSidebar(), NAV_SECTIONS, AdminCustomersPage(), getFilteredCustomers(), renderPage(), renderTable()

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "createAdminProductFormModal"
Cohesion: 0.24
Nodes (18): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview(), AdminProductsPage() (+10 more)

### Community 89 - "StokUrunleri"
Cohesion: 0.17
Nodes (12): Guid, ICollection, StokUrunleri, Depo, DepoId, DepoKonumu, Hareketler, KullanilabilirMiktar (+4 more)

### Community 90 - "KategoriDbContext"
Cohesion: 0.14
Nodes (11): KategoriServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, KategoriDbContext, Kategoriler, UrunGorselleri, Urunler (+3 more)

### Community 91 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 92 - "createHeader"
Cohesion: 0.25
Nodes (13): createHeader(), bindCategoryDropdown(), bindEvents(), bindMobileCategories(), destroy(), injectIcons(), populateCategoryDropdown(), populateMobileCategories() (+5 more)

### Community 93 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 94 - "ProfilePage.js"
Cohesion: 0.26
Nodes (14): createPersonalInfoCard(), formatDate(), createBreadcrumbs(), ProfilePage(), closeModal(), loadData(), renderDashboard(), scrollToSection() (+6 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - "Musteri"
Cohesion: 0.28
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 98 - "KargoDbContext"
Cohesion: 0.14
Nodes (11): KargoServis.Infrastructure.Persistence, DbContext, IDesignTimeDbContextFactory, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri (+3 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "homeService.js"
Cohesion: 0.24
Nodes (6): heroCategories, secondaryCategories, TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API., TODO: Integrate with Catalog/CMS API.

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "ResultSiparisDto"
Cohesion: 0.19
Nodes (12): GetMySiparislerQuery, Guid, GetByIdSiparisDto, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper (+4 more)

### Community 103 - "createCategoryMegaMenu"
Cohesion: 0.31
Nodes (4): createCategoryMegaMenu(), render(), update(), normalizeCategories()

### Community 104 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 105 - "createButton"
Cohesion: 0.14
Nodes (12): createAdminConfirmModal(), close(), handleKeydown(), createAdminPageHeader(), AdminRegisterPage(), createCategoryCard(), bindEvents(), render() (+4 more)

### Community 106 - "ResultSepetDto"
Cohesion: 0.24
Nodes (11): GetMySepetlerQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 107 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 108 - "authStore.js"
Cohesion: 0.15
Nodes (16): AUTH_STATUS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH, NOTE: These are frontend-only quality hints., VALIDATION_MESSAGES, clearError(), getState() (+8 more)

### Community 109 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 110 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 112 - "IIdentityService"
Cohesion: 0.17
Nodes (11): Guid, IReadOnlyCollection, Task, IIdentityService, DateTime, Guid, IdentityUserInfo, Guid (+3 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "RecentOrdersCard.js"
Cohesion: 0.53
Nodes (5): createOrderStatusBadge(), createRecentOrdersCard(), formatDate(), formatPrice(), STATUS_MAP

### Community 115 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 117 - "UrunGorseli"
Cohesion: 0.22
Nodes (8): Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorseliConfiguration

### Community 118 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 119 - "IEntityTypeConfiguration"
Cohesion: 0.19
Nodes (10): IdentityUserToken, IEntityTypeConfiguration, SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration (+2 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.23
Nodes (4): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common

### Community 121 - "IdentityRoleConfiguration"
Cohesion: 0.47
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 122 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable (+4 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.20
Nodes (10): AbstractValidator, CreateSepetUrunuCommandValidator, DeleteSepetCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, UpdateSiparisCommandValidator (+2 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "TestDbContext"
Cohesion: 0.06
Nodes (39): ShopApp.Application.Features.Urun.Commands.CreateUrun, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, CreateUrunCommand, CancellationToken (+31 more)

### Community 127 - "OrderListPage.js"
Cohesion: 0.25
Nodes (13): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+5 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (17): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+9 more)

### Community 130 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "GetByIdUrunDto"
Cohesion: 0.50
Nodes (3): ShopApp.Application.Features.Urun.Dtos, Guid, GetByIdUrunDto

### Community 133 - "createPasswordStrength"
Cohesion: 0.67
Nodes (3): createPasswordStrength(), reset(), update()

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "RegisterRequest"
Cohesion: 0.33
Nodes (5): RegisterRequest, Ad, Email, Sifre, Soyad

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 139 - "SiparisDurum"
Cohesion: 0.22
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 141 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 142 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 143 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 150 - "StokUrunleri"
Cohesion: 0.67
Nodes (3): StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 151 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 152 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.20
Nodes (9): Admin Architecture & Dynamic Data Rules, Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Modern Address Modal UI Refactor (`createAddressModal`), Product Management Architecture (`AdminProductsPage.js`), Profile and Address Architecture, Shared Footer Ownership, ShopApp Development Notes (+1 more)

### Community 154 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, KategoriDbContextModelSnapshot

### Community 155 - "SepetUrunuCommandHandlerTests.cs"
Cohesion: 0.13
Nodes (5): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, DeleteSepetUrunuCommandValidator, UpdateSepetUrunuCommandValidator

### Community 156 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 158 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 159 - "ProfileModals.js"
Cohesion: 0.24
Nodes (7): createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml(), formatTurkishPhone(), TURKEY_CITIES

### Community 160 - "ICurrentCustomerContext"
Cohesion: 0.16
Nodes (11): CancellationToken, Task, ICurrentCustomerContext, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler, CancellationToken (+3 more)

### Community 162 - "profilePage.test.js"
Cohesion: 0.30
Nodes (6): createProfileSidebar(), getInitials(), createSavedAddressesCard(), createWelcomeBanner(), cityMap, getCityName()

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (21): ShopApp.Infrastructure.Identity.Models, IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi (+13 more)

## Knowledge Gaps
- **514 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+509 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1003 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `ICurrentCustomerContext`, `.AddInfrastructure`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ShopApp.Application.Features.Sepet.Dtos`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `ShopApp.Application.Features.Siparis.Commands.DeleteSiparis`, `src.Monolith.ShopApp.Domain.Common`, `SiparisController.cs`, `ShopApp.Application.Features.Authentication.DTOs`, `SepetController`, `ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu`, `ShopApp.Application.Features.Siparis.Dtos`, `AddressDto`, `SepetUrunuCommandHandlerTests.cs`, `TestDbContext`, `UserProfileDto`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `Musteri`, `.AddInfrastructure`, `.Create`, `ResultSiparisDto`, `ShopAppDbContext`, `ResultSepetDto`, `.Create`, `src.Monolith.ShopApp.Domain.Common`, `SiparisController`, `BaseEntity`, `SiparisEntity`, `SepetController`, `AddressDto`, `TestDbContext`, `SiparisUrunleri`, `SepetEntity`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Application.Common.Interfaces` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ShopApp.Infrastructure.Persistence.Migrations`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddRoleSpecificProfiles`, `IlkMigrasyon`, `RebuildAllEntitySchema`, `UpdateMonolithTables`, `DatabaseChanges`, `Migration`, `AddMonolithDomainChanges`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _514 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `src.Monolith.ShopApp.Domain.Sepet.Entities` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._
- **Should `authService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14666666666666667 - nodes in this community are weakly interconnected._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._