# Graph Report - ShopApp  (2026-09-08)

## Corpus Check
- 363 files · ~364,312 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2407 nodes · 4717 edges · 169 communities (153 shown, 15 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 340 edges (avg confidence: 0.84)
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
- IEntityTypeConfiguration
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- .For
- ShopAppDbContext
- .Olustur
- ShopApp.Application.Common.Interfaces
- AddRoleSpecificProfiles
- cartService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- SiparisEntity
- SiparisController.cs
- SepetController
- productsService.js
- OrderConfirmationPage.js
- src.Monolith.ShopApp.Domain.Siparis.Entities
- CurrentCustomer
- InitialCreate
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- ShopApp.Infrastructure.Persistence.Migrations
- SepetUrunu
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- Urun
- ResultSiparisDto
- IlkMigrasyon
- src.Monolith.ShopApp.Domain.Common
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
- .SeedAsync
- adminPages.test.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- BaseEntityConfiguration
- AdminDashboardPage.js
- .BuildModel
- .GetRequiredAsync
- AGENTS.md
- extraction-spec.md
- IRequestHandler
- App.js
- .Login
- ShopApp.Application.Features.Sepet.Dtos
- BaseEntity
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- SiparisCommandHandlerTests.cs
- StokHareketi
- SepetMapping.cs
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- SiparisUrunleri
- Kategori
- Address
- ICurrentCustomerContext
- ShopApp.Application.Features.Authentication.DTOs
- createIcon
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
- ApplicationUser
- createCategoryMegaMenu
- .Handle
- AdminProductsPage.js
- apiClient.js
- router.js
- authStore.js
- UrunTur
- UrunGorsel
- KargoDurumGecmisi
- IIdentityService
- KargoGonderisi
- InfrastructureInitializer
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- SepetDurumLookup
- StokServis.Domain.Entities
- .GetMyAddresses
- ValidationBehavior
- CartPage.js
- AbstractValidator
- Sevkiyat
- TestDbContext
- navigate
- KategoriServis.Domain.Entities
- .AddInfrastructure
- BaseEntity
- graphify reference: query, path, explain
- .BuildModel
- orderService.js
- BaseEntity
- HareketTipi
- RegisterRequest
- ShopApp.Application.Tests.csproj
- UpdateAddressCommand
- SiparisDurum
- src.Monolith.ShopApp.Domain.Kullanici
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- IdentityUserTokenConfiguration
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
- ShopApp.Application.Features.Sepet.Commands.DeleteSepet
- Sevkiyat
- ProfileModals.js
- .Handle
- CurrentCustomerContext
- profilePage.test.js
- CreateUrunCommandHandler
- KayitliKullanici
- AddressDto
- IdentityRoleClaimConfiguration
- ShopAppDbContextFactory
- .OnModelCreating

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 82 edges
2. `ShopApp.Application.Common.Interfaces` - 53 edges
3. `ShopAppDbContext` - 48 edges
4. `IShopAppDbContext` - 40 edges
5. `SiparisEntity` - 39 edges
6. `SepetEntity` - 34 edges
7. `ICurrentCustomerContext` - 32 edges
8. `navigate()` - 31 edges
9. `TestDbContext` - 30 edges
10. `IdentityService` - 25 edges

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

## Communities (169 total, 15 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.15
Nodes (7): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Sepet.Commands.UpdateSepet, CustomerContextFactory

### Community 1 - "routes.js"
Cohesion: 0.27
Nodes (3): routes, AboutPage(), render()

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "authService.js"
Cohesion: 0.26
Nodes (9): establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), setAuthenticated(), removeAccessToken() (+1 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.06
Nodes (34): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+26 more)

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.12
Nodes (16): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserLogin, IdentityUserRole, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration (+8 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.06
Nodes (50): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update() (+42 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - ".For"
Cohesion: 0.06
Nodes (64): ShopApp.Application.Features.Urun.Dtos, IRequest, Mock, CancellationToken, Guid, Task, ISepetRepository, Guid (+56 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.07
Nodes (29): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, SiparisUrunleri, Urun, UrunGorsel (+21 more)

### Community 10 - ".Olustur"
Cohesion: 0.20
Nodes (12): ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, Guid, UpdateSiparisUrunuCommand, CancellationToken, Task, UpdateSiparisUrunuCommandHandler, UpdateSiparisUrunuCommandValidator, CancellationToken (+4 more)

### Community 11 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.26
Nodes (6): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Common.Interfaces, ShopApp.Infrastructure.Identity.Models, ShopApp.Infrastructure.Identity.Settings, ShopApp.Infrastructure.Persistence.Repositories

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
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.CreateSiparis, Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler

### Community 21 - "SepetController"
Cohesion: 0.10
Nodes (32): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+24 more)

### Community 22 - "productsService.js"
Cohesion: 0.09
Nodes (34): createHeroCategoryGrid(), render(), HomePage(), render(), getHeroCategories(), getSecondaryCategories(), categories, demoProducts (+26 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.20
Nodes (14): DEMO_ORDER, createBreadcrumbs(), createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+6 more)

### Community 24 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.15
Nodes (9): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, Guid, GetByIdSiparisDto, Guid, GetByIdSiparisUrunleriDto, GetSiparisUrunleri (+1 more)

### Community 25 - "CurrentCustomer"
Cohesion: 0.26
Nodes (11): Guid, CurrentCustomer, CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Fact (+3 more)

### Community 26 - "InitialCreate"
Cohesion: 0.14
Nodes (9): StokServis.Infrastructure.Persistence, StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder (+1 more)

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.20
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.21
Nodes (10): IdentityError, IdentityResult, Guid, IdentityRole, IHttpContextAccessor, IReadOnlyCollection, RoleManager, Task (+2 more)

### Community 31 - "AuthResponse"
Cohesion: 0.15
Nodes (15): DateTime, AuthResponse, AccessToken, ExpiresAt, User, Guid, IReadOnlyCollection, CurrentUserResponse (+7 more)

### Community 32 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.24
Nodes (6): ShopApp.Infrastructure.Persistence.Migrations, DateTime, DateTimeOffset, Guid, MigrationBuilder, CreateMonolithTables

### Community 33 - "SepetUrunu"
Cohesion: 0.24
Nodes (7): Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

### Community 34 - "KargoServis.Domain.Entities"
Cohesion: 0.29
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

### Community 43 - "ResultSiparisDto"
Cohesion: 0.06
Nodes (52): GetMySepetlerQuery, GetMySiparislerQuery, GetSepetQuery, GetSiparisQuery, DateTime, Guid, ResultSepetDto, CancellationToken (+44 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.11
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Domain.Urun.Entities, src.Monolith.ShopApp.Domain.Common, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur (+5 more)

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

### Community 56 - ".SeedAsync"
Cohesion: 0.22
Nodes (7): ShopApp.Infrastructure.Identity.Seed, Guid, IdentityRole, IServiceProvider, RoleManager, Task, IdentityRoleSeeder

### Community 57 - "adminPages.test.js"
Cohesion: 0.17
Nodes (16): createAdminMetricCard(), createAdminPagination(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), createCategoryStatistics(), createCategoryTable() (+8 more)

### Community 60 - "BaseEntityConfiguration"
Cohesion: 0.12
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 61 - "AdminDashboardPage.js"
Cohesion: 0.16
Nodes (19): createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductGrid(), createAdminProductList(), createAdminStatusBadge(), load(), createLowStockList() (+11 more)

### Community 62 - ".BuildModel"
Cohesion: 0.15
Nodes (10): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 63 - ".GetRequiredAsync"
Cohesion: 0.08
Nodes (33): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, GetMyProfileQuery, ActionResult, CancellationToken (+25 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - "IRequestHandler"
Cohesion: 0.17
Nodes (16): ShopApp.Application.Features.Siparis.Commands.UpdateSiparis, IRequestHandler, Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, CancellationToken (+8 more)

### Community 67 - "App.js"
Cohesion: 0.19
Nodes (14): initApp(), bootstrap(), logout(), createFooter(), setUnauthorizedHandler(), getState(), initialState, initStore() (+6 more)

### Community 68 - ".Login"
Cohesion: 0.21
Nodes (10): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, LoginRequest (+2 more)

### Community 69 - "ShopApp.Application.Features.Sepet.Dtos"
Cohesion: 0.16
Nodes (7): ShopApp.Application.Features.Sepet.Queries, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Sepet.Dtos, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto

### Community 70 - "BaseEntity"
Cohesion: 0.11
Nodes (14): ShopApp.Infrastructure.Persistence.Configurations.Kullanici, DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId (+6 more)

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.20
Nodes (8): DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri, StokDbContextFactory

### Community 74 - "SiparisCommandHandlerTests.cs"
Cohesion: 0.17
Nodes (4): src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Features.Siparis, ShopApp.Application.Features.Siparis.Commands.DeleteSiparis, DeleteSiparisCommandValidator

### Community 75 - "StokHareketi"
Cohesion: 0.18
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

### Community 81 - "SiparisUrunleri"
Cohesion: 0.13
Nodes (13): Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat, UrunAciklamasi (+5 more)

### Community 82 - "Kategori"
Cohesion: 0.15
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.18
Nodes (11): Guid, Address, AdresBilgisi, Ilce, MusteriId, PostaKodu, Sehir, TamAdres (+3 more)

### Community 84 - "ICurrentCustomerContext"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, ICurrentCustomerContext, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, DeleteSiparisUrunuCommandValidator

### Community 85 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.10
Nodes (14): ShopApp.Application.Features.Authentication.DTOs, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, Exception, IReadOnlyCollection, AuthenticationValidationException, Errors, List (+6 more)

### Community 86 - "createIcon"
Cohesion: 0.13
Nodes (21): createAdminHeader(), createAdminLayout(), createAdminPageHeader(), createAdminSidebar(), NAV_SECTIONS, AdminCustomersPage(), getFilteredCustomers(), renderPage() (+13 more)

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
Cohesion: 0.24
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

### Community 102 - "ApplicationUser"
Cohesion: 0.22
Nodes (8): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad

### Community 103 - "createCategoryMegaMenu"
Cohesion: 0.24
Nodes (6): createCategoryCard(), createCategoryGrid(), createCategoryMegaMenu(), render(), update(), normalizeCategories()

### Community 104 - ".Handle"
Cohesion: 0.27
Nodes (7): CancellationToken, Task, CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator

### Community 105 - "AdminProductsPage.js"
Cohesion: 0.14
Nodes (14): createAdminConfirmModal(), close(), handleKeydown(), createAdminProductDetailModal(), close(), createBoxPlaceholder(), handleKeydown(), createCategoryCard() (+6 more)

### Community 106 - "apiClient.js"
Cohesion: 0.24
Nodes (8): appConfig, apiClient, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 107 - "router.js"
Cohesion: 0.39
Nodes (8): compileRoute(), guardedPath(), initRouter(), matchRoute(), render(), notFoundRoute, hasRole(), isAuthenticated()

### Community 108 - "authStore.js"
Cohesion: 0.21
Nodes (12): clearError(), getState(), initialState, merge(), notify(), setAnonymous(), setError(), setLoading() (+4 more)

### Community 109 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAded (+3 more)

### Community 110 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 112 - "IIdentityService"
Cohesion: 0.21
Nodes (7): Guid, IReadOnlyCollection, Task, IIdentityService, DateTime, Guid, IdentityUserInfo

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

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

### Community 119 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - ".GetMyAddresses"
Cohesion: 0.20
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 122 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable (+4 more)

### Community 123 - "CartPage.js"
Cohesion: 0.27
Nodes (11): createCartSummary(), formatPrice(), update(), DEMO_CART_ITEMS, getDemoCartItems(), CartPage(), getShippingCost(), getSubtotal() (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.15
Nodes (13): AbstractValidator, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator (+5 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.20
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "TestDbContext"
Cohesion: 0.10
Nodes (20): DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik, UrunTur, TestDbContext (+12 more)

### Community 127 - "navigate"
Cohesion: 0.18
Nodes (18): navigate(), createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate() (+10 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (17): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+9 more)

### Community 130 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

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

### Community 138 - "UpdateAddressCommand"
Cohesion: 0.36
Nodes (6): CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator

### Community 139 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 140 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.21
Nodes (7): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Application.Features.Adres.Dtos

### Community 141 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 142 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 143 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 144 - "IdentityUserTokenConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

### Community 150 - "StokUrunleri"
Cohesion: 0.40
Nodes (4): StokServis.Infrastructure.Persistence.Configurations, StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 151 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 152 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.22
Nodes (8): Admin Architecture & Dynamic Data Rules, Database Reset and Entity Migration (2026-09-08), Modern Address Modal UI Refactor (`createAddressModal`), Product Management Architecture (`AdminProductsPage.js`), Profile and Address Architecture, Shared Footer Ownership, ShopApp Development Notes, Temporary Directory Cleanup

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
Cohesion: 0.27
Nodes (6): createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml(), formatTurkishPhone()

### Community 160 - ".Handle"
Cohesion: 0.50
Nodes (4): CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler

### Community 161 - "CurrentCustomerContext"
Cohesion: 0.40
Nodes (4): CancellationToken, IHttpContextAccessor, Task, CurrentCustomerContext

### Community 162 - "profilePage.test.js"
Cohesion: 0.27
Nodes (7): createProfileSidebar(), getInitials(), createSavedAddressesCard(), createWelcomeBanner(), cityMap, getCityName(), TURKEY_CITIES

### Community 163 - "CreateUrunCommandHandler"
Cohesion: 0.17
Nodes (12): ShopApp.Application.Features.Urun.Commands.CreateUrun, CancellationToken, Guid, Task, Urun, IGenericUrunRepository, Guid, CreateUrunCommand (+4 more)

### Community 165 - "KayitliKullanici"
Cohesion: 0.20
Nodes (10): DateTime, Guid, KayitliKullanici, Ad, Durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+2 more)

### Community 166 - "AddressDto"
Cohesion: 0.27
Nodes (10): GetMyAddressesQuery, DateTime, Guid, AddressDto, CancellationToken, List, Task, GetMyAddresses (+2 more)

### Community 174 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

## Knowledge Gaps
- **539 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+534 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1023 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `.AddInfrastructure`, `IRequestHandler`, `CreateUrunCommandHandler`, `ShopApp.Application.Features.Sepet.Dtos`, `.Handle`, `UpdateAddressCommand`, `SiparisCommandHandlerTests.cs`, `src.Monolith.ShopApp.Domain.Kullanici`, `.Olustur`, `SiparisController.cs`, `ShopApp.Application.Features.Authentication.DTOs`, `ICurrentCustomerContext`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `SepetUrunuCommandHandlerTests.cs`, `AbstractValidator`, `ShopApp.Application.Features.Sepet.Commands.DeleteSepet`, `.GetRequiredAsync`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Application.Common.Interfaces` to `ShopApp.Infrastructure.Persistence.Migrations`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `AddRoleSpecificProfiles`, `RebuildAllEntitySchema`, `UpdateMonolithTables`, `ShopAppDbContextFactory`, `Migration`, `DatabaseChanges`, `AddMonolithDomainChanges`, `.BuildModel`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `Musteri`, `SepetUrunu`, `.AddInfrastructure`, `AddressDto`, `.Handle`, `.For`, `UpdateAddressCommand`, `ResultSiparisDto`, `src.Monolith.ShopApp.Domain.Kullanici`, `ShopAppDbContext`, `SiparisController`, `Address`, `SiparisEntity`, `SepetController`, `CurrentCustomer`, `TestDbContext`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _539 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._
- **Should `LoginPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.057946069994262765 - nodes in this community are weakly interconnected._