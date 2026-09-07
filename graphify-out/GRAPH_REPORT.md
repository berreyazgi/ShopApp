# Graph Report - ShopApp  (2026-09-07)

## Corpus Check
- 347 files · ~363,856 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2259 nodes · 4500 edges · 160 communities (145 shown, 14 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 338 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe12b717`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Domain.Sepet.Entities
- routes.js
- ShopApp.Infrastructure.csproj
- authService.js
- FrontendAGENTS.md
- IdentityUserRoleConfiguration
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- CurrentCustomer
- ShopAppDbContext
- .For
- SepetDurumLookup
- AddRoleSpecificProfiles
- orderService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- SiparisEntity
- ICurrentCustomerContext
- SepetController
- productsService.js
- OrderConfirmationPage.js
- ShopApp.Application.Common.Interfaces
- .Create
- InitialCreate
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
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
- .GetMyAddresses
- IlkMigrasyon
- BaseEntityConfiguration
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
- AdminDashboardPage.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Icon.js
- createAdminLayout
- .BuildModel
- .BuildTargetModel
- AGENTS.md
- extraction-spec.md
- .Olustur
- store.js
- SepetEntity
- ShopApp.Application.Features.Sepet.Dtos
- AdminProfile
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- src.Monolith.ShopApp.Domain.Siparis.Entities
- StokHareketi
- ResultSiparisDto
- src/Frontend/ShopApp.Web/package.json
- ShopApp.Infrastructure.Persistence.Context
- IRequest
- IdentityRoleClaimConfiguration
- SiparisUrunleri
- authStore.js
- IEntityTypeConfiguration
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- ShopApp.Application.Features.Authentication.DTOs
- AdminCategoriesPage.js
- Q: How are role-specific customer and admin profiles provisioned?
- createAdminProductFormModal
- StokUrunleri
- KategoriDbContext
- http
- createHeader
- .BuildTargetModel
- ProfilePage.js
- UrunOzelligi
- homeService.js
- BaseEntity
- KargoDbContext
- SyncIdentityModels
- HeroCategoryGrid.js
- Kategori
- KayitliKullanici
- createCategoryMegaMenu
- AddressDto
- adminPages.test.js
- ApplicationUser
- navigate
- createEmptyState
- IShopAppDbContext
- SepetMapping.cs
- KargoDurumGecmisi
- AuthService
- KargoGonderisi
- src/Frontend/ShopApp.Web/src/shared/services/apiClient.js
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- .UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- StokServis.Domain.Entities
- UserProfileDto
- ValidationBehavior
- createIcon
- AbstractValidator
- Sevkiyat
- TestDbContext
- OrderListPage.js
- KategoriServis.Domain.Entities
- .AddInfrastructure
- BaseEntity
- graphify reference: query, path, explain
- GetMyAddressesQueryHandler
- App.js
- BaseEntity
- HareketTipi
- ProductDetailPage.js
- ShopApp.Application.Tests.csproj
- AuthRequest
- SiparisDurum
- AddressHandlerTests.cs
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- IdentityUserTokenConfiguration
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- IdentityUserLoginConfiguration
- ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu
- BaseEntity
- ShopApp Development Notes
- AuthenticationValidationException
- ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu
- ShopApp.Application.Features.Siparis.Commands.DeleteSiparis
- ProductCard.js
- Sevkiyat
- .MapIdentityError

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 82 edges
2. `ShopApp.Application.Common.Interfaces` - 51 edges
3. `SiparisEntity` - 39 edges
4. `ShopAppDbContext` - 38 edges
5. `SepetEntity` - 34 edges
6. `navigate()` - 31 edges
7. `ICurrentCustomerContext` - 31 edges
8. `IShopAppDbContext` - 30 edges
9. `IdentityService` - 25 edges
10. `SiparisUrunleri` - 24 edges

## Surprising Connections (you probably didn't know these)
- `bindEvents()` --calls--> `navigate()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → src/Frontend/ShopApp.Web/src/app/router.js
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `renderNode()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateQuantity()` --calls--> `formatPrice()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/cart/components/CartItem.js → src/Frontend/ShopApp.Web/src/shared/utils/format.js

## Import Cycles
- None detected.

## Communities (160 total, 14 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.15
Nodes (7): ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Tests.TestSupport, UpdateSepetUrunuCommandValidator, CustomerContextFactory

### Community 1 - "routes.js"
Cohesion: 0.27
Nodes (3): routes, AboutPage(), render()

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "authService.js"
Cohesion: 0.22
Nodes (12): establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession(), setAnonymous() (+4 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.06
Nodes (34): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+26 more)

### Community 5 - "IdentityUserRoleConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 6 - "LoginPage.js"
Cohesion: 0.06
Nodes (49): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update() (+41 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "CurrentCustomer"
Cohesion: 0.14
Nodes (23): Guid, CurrentCustomer, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler (+15 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.09
Nodes (21): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, SiparisUrunleri, ShopAppDbContext, AdminProfilleri (+13 more)

### Community 10 - ".For"
Cohesion: 0.20
Nodes (17): Mock, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, Guid, UpdateSiparisUrunuCommand (+9 more)

### Community 11 - "SepetDurumLookup"
Cohesion: 0.13
Nodes (11): src.Monolith.ShopApp.Domain.Sepet.Enums, SepetDurumLookup, DurumIsmi, Id, SepetDurum, Aktif, AktifDegil, IptalEdilmis (+3 more)

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
Nodes (31): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.12
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 20 - "ICurrentCustomerContext"
Cohesion: 0.12
Nodes (18): IRequestHandler, CancellationToken, Task, ICurrentCustomerContext, Guid, CreateSiparisCommand, CancellationToken, Guid (+10 more)

### Community 21 - "SepetController"
Cohesion: 0.10
Nodes (31): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 22 - "productsService.js"
Cohesion: 0.21
Nodes (10): demoProducts, getProductDetail(), productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts, getProductById(), TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice. (+2 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.20
Nodes (14): DEMO_ORDER, createBreadcrumbs(), createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+6 more)

### Community 24 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.12
Nodes (10): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Features.Siparis, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu (+2 more)

### Community 25 - ".Create"
Cohesion: 0.28
Nodes (8): CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Fact, Task, AddressHandlerTests

### Community 26 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.14
Nodes (13): StokServis.Infrastructure.Persistence.Configurations, ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri (+5 more)

### Community 30 - "IdentityService"
Cohesion: 0.15
Nodes (14): Guid, Task, IIdentityService, DateTime, Guid, IdentityUserInfo, Guid, IdentityRole (+6 more)

### Community 31 - "AuthResponse"
Cohesion: 0.11
Nodes (21): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+13 more)

### Community 32 - "Migration"
Cohesion: 0.22
Nodes (6): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, CreateMonolithTables

### Community 33 - "SepetUrunu"
Cohesion: 0.24
Nodes (7): Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

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

### Community 43 - ".GetMyAddresses"
Cohesion: 0.20
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.04
Nodes (33): KategoriServis.Migrations, KargoServis.Migrations, ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot (+25 more)

### Community 45 - "BaseEntityConfiguration"
Cohesion: 0.12
Nodes (10): EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, SepetUrunuConfiguration, EntityTypeBuilder, SiparisConfiguration (+2 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.18
Nodes (10): AutoMapper (16.2.0), FluentValidation (12.1.1), Microsoft.EntityFrameworkCore (10.0.11), net10.0, FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 48 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.32
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, Guid, MigrationBuilder, UpdateMonolithTables

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
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 57 - "AdminDashboardPage.js"
Cohesion: 0.31
Nodes (9): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), getDashboardSummary(), getLowStockProducts() (+1 more)

### Community 60 - "Icon.js"
Cohesion: 0.23
Nodes (6): createAdminPageHeader(), AdminRegisterPage(), createButton(), destroy(), handleClick(), icons

### Community 61 - "createAdminLayout"
Cohesion: 0.24
Nodes (8): createAdminHeader(), createAdminLayout(), createAdminSidebar(), NAV_SECTIONS, AdminCustomersPage(), getFilteredCustomers(), renderPage(), renderTable()

### Community 62 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 63 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Olustur"
Cohesion: 0.20
Nodes (16): Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, Guid, UpdateSiparisCommand, CancellationToken (+8 more)

### Community 67 - "store.js"
Cohesion: 0.36
Nodes (7): getState(), initialState, notify(), resetStore(), setState(), state, subscribers

### Community 68 - "SepetEntity"
Cohesion: 0.16
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 69 - "ShopApp.Application.Features.Sepet.Dtos"
Cohesion: 0.12
Nodes (9): ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Application.Features.Sepet.Dtos, DeleteSepetCommandValidator, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto (+1 more)

### Community 70 - "AdminProfile"
Cohesion: 0.32
Nodes (5): Guid, AdminProfile, KullaniciId, EntityTypeBuilder, AdminProfileConfiguration

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
Cohesion: 0.14
Nodes (5): src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, src.Monolith.ShopApp.Domain.Common, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis

### Community 75 - "StokHareketi"
Cohesion: 0.18
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "ResultSiparisDto"
Cohesion: 0.05
Nodes (54): GetMySepetlerQuery, GetMySiparislerQuery, GetSepetQuery, GetSiparisQuery, DateTime, Guid, ResultSepetDto, CancellationToken (+46 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "ShopApp.Infrastructure.Persistence.Context"
Cohesion: 0.21
Nodes (7): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Infrastructure.Persistence.Configurations, ShopApp.Infrastructure.Identity.Models, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Identity.Settings, ShopApp.Infrastructure.Persistence.Repositories

### Community 79 - "IRequest"
Cohesion: 0.14
Nodes (23): IRequest, Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler, Guid (+15 more)

### Community 80 - "IdentityRoleClaimConfiguration"
Cohesion: 0.60
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 81 - "SiparisUrunleri"
Cohesion: 0.14
Nodes (12): Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat, UrunAciklamasi (+4 more)

### Community 82 - "authStore.js"
Cohesion: 0.20
Nodes (12): clearError(), getState(), initialState, merge(), notify(), setError(), setLoading(), state (+4 more)

### Community 83 - "IEntityTypeConfiguration"
Cohesion: 0.14
Nodes (15): IEntityTypeConfiguration, Guid, Address, AdresBilgisi, Ilce, Musteri, MusteriId, PostaKodu (+7 more)

### Community 84 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.17
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserClaim, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration, EntityTypeBuilder, Guid (+1 more)

### Community 85 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.15
Nodes (8): ShopApp.Application.Features.Authentication.DTOs, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, RegisterRequest, Ad, Email, Sifre, Soyad

### Community 86 - "AdminCategoriesPage.js"
Cohesion: 0.17
Nodes (16): createAdminConfirmModal(), close(), handleKeydown(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), createCategoryTable() (+8 more)

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
Cohesion: 0.10
Nodes (33): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+25 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - "homeService.js"
Cohesion: 0.24
Nodes (6): heroCategories, secondaryCategories, TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API., TODO: Integrate with Catalog/CMS API.

### Community 97 - "BaseEntity"
Cohesion: 0.15
Nodes (12): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+4 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.14
Nodes (11): KargoServis.Infrastructure.Persistence, DbContext, IDesignTimeDbContextFactory, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri (+3 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "HeroCategoryGrid.js"
Cohesion: 0.20
Nodes (9): createCategoryCard(), bindEvents(), render(), createHeroCategoryGrid(), render(), HomePage(), render(), getHeroCategories() (+1 more)

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "KayitliKullanici"
Cohesion: 0.14
Nodes (12): DateTime, Guid, KayitliKullanici, Ad, Durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+4 more)

### Community 103 - "createCategoryMegaMenu"
Cohesion: 0.22
Nodes (7): createCategoryCard(), createCategoryGrid(), categories, createCategoryMegaMenu(), render(), update(), normalizeCategories()

### Community 104 - "AddressDto"
Cohesion: 0.26
Nodes (9): ShopApp.Application.Features.Adres.Dtos, CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, DateTime, Guid (+1 more)

### Community 105 - "adminPages.test.js"
Cohesion: 0.24
Nodes (15): createAdminPagination(), createAdminProductCard(), createProductStockBadge(), createAdminProductDetailModal(), close(), handleKeydown(), createAdminProductGrid(), createAdminProductList() (+7 more)

### Community 106 - "ApplicationUser"
Cohesion: 0.22
Nodes (8): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad

### Community 107 - "navigate"
Cohesion: 0.29
Nodes (10): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, hasRole() (+2 more)

### Community 108 - "createEmptyState"
Cohesion: 0.35
Nodes (10): CategoryListPage(), load(), createBreadcrumbs(), ProductListPage(), load(), getCategories(), getProducts(), createEmptyState() (+2 more)

### Community 109 - "IShopAppDbContext"
Cohesion: 0.17
Nodes (10): CancellationToken, DbSet, Task, IShopAppDbContext, Adresler, Musteriler, Sepetler, SepetUrunleri (+2 more)

### Community 110 - "SepetMapping.cs"
Cohesion: 0.29
Nodes (5): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping, MapperFactory

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 112 - "AuthService"
Cohesion: 0.35
Nodes (5): IReadOnlyCollection, Guid, IReadOnlyCollection, Task, AuthService

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "src/Frontend/ShopApp.Web/src/shared/services/apiClient.js"
Cohesion: 0.27
Nodes (7): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

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

### Community 119 - ".UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.31
Nodes (7): CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator, KeyNotFoundException

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - "UserProfileDto"
Cohesion: 0.08
Nodes (31): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, GetMyProfileQuery, ActionResult, CancellationToken (+23 more)

### Community 122 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable (+4 more)

### Community 123 - "createIcon"
Cohesion: 0.15
Nodes (19): createPlaceholderIcon(), createBoxPlaceholder(), createCartItemRow(), updateQuantity(), createCartSummary(), formatPrice(), update(), DEMO_CART_ITEMS (+11 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.17
Nodes (11): AbstractValidator, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, DeleteSiparisUrunuCommandValidator, UpdateSiparisCommandValidator (+3 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "TestDbContext"
Cohesion: 0.20
Nodes (10): DbContextOptions, DbSet, TestDbContext, Adresler, Musteriler, Sepetler, SepetUrunleri, SiparisDurumlar (+2 more)

### Community 127 - "OrderListPage.js"
Cohesion: 0.27
Nodes (12): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+4 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (17): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+9 more)

### Community 130 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "GetMyAddressesQueryHandler"
Cohesion: 0.31
Nodes (7): GetMyAddressesQuery, CancellationToken, List, Task, GetMyAddresses, GetMyAddressesQuery, GetMyAddressesQueryHandler

### Community 133 - "App.js"
Cohesion: 0.39
Nodes (6): initApp(), bootstrap(), createFooter(), TRUST_BADGES, setUnauthorizedHandler(), initStore()

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "ProductDetailPage.js"
Cohesion: 0.36
Nodes (7): createBreadcrumbs(), createImage(), ProductDetailPage(), destroy(), load(), renderProductDetail(), getRelatedProducts()

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 139 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 140 - "AddressHandlerTests.cs"
Cohesion: 0.43
Nodes (5): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress

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

### Community 150 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 151 - "ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu"
Cohesion: 0.20
Nodes (3): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 152 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.25
Nodes (7): Admin Architecture & Dynamic Data Rules, Modern Address Modal UI Refactor (`createAddressModal`), Product Management Architecture (`AdminProductsPage.js`), Profile and Address Architecture, Shared Footer Ownership, ShopApp Development Notes, Temporary Directory Cleanup

### Community 154 - "AuthenticationValidationException"
Cohesion: 0.29
Nodes (5): Exception, IdentityResult, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 157 - "ProductCard.js"
Cohesion: 0.83
Nodes (3): createProductCard(), createProductImage(), createProductListLayout()

### Community 158 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

## Knowledge Gaps
- **487 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+482 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 931 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `.AddInfrastructure`, `UserProfileDto`, `GetMyAddressesQueryHandler`, `ShopApp.Application.Features.Sepet.Dtos`, `AddressDto`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `AddressHandlerTests.cs`, `IShopAppDbContext`, `ShopApp.Infrastructure.Persistence.Context`, `ICurrentCustomerContext`, `ShopApp.Application.Features.Authentication.DTOs`, `SepetController`, `.UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer`, `ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu`, `.Create`, `ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu`, `ShopApp.Application.Features.Siparis.Commands.DeleteSiparis`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Infrastructure.Persistence.Context` to `Migration`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddRoleSpecificProfiles`, `IlkMigrasyon`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `SepetUrunu`, `KargoDbContext`, `SepetEntity`, `ResultSiparisDto`, `IShopAppDbContext`, `SiparisUrunleri`, `IEntityTypeConfiguration`, `SiparisEntity`, `.Create`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _487 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `LoginPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05877167205406994 - nodes in this community are weakly interconnected._
- **Should `CurrentCustomer` be split into smaller, more focused modules?**
  _Cohesion score 0.13825757575757575 - nodes in this community are weakly interconnected._