# Graph Report - ShopApp  (2026-09-07)

## Corpus Check
- 359 files · ~364,333 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2338 nodes · 4666 edges · 155 communities (144 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 346 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe12b717`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Abstractions
- routes.js
- ShopApp.Infrastructure.csproj
- src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- FrontendAGENTS.md
- IdentityUserRoleConfiguration
- src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- SiparisEntity
- ShopAppDbContext
- .For
- ShopApp.Application.Tests.TestSupport
- AddRoleSpecificProfiles
- orderService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- SiparisUrunleri
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- SepetController
- productsService.js
- OrderConfirmationPage.js
- ShopApp.Application.Authentication
- .Create
- InitialCreate
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
- SepetUrunu
- BaseEntity
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- Urun
- IShopAppDbContext
- IlkMigrasyon
- src.Monolith.ShopApp.Domain.Kullanici
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
- navigate
- createIcon
- .BuildModel
- .BuildTargetModel
- AGENTS.md
- extraction-spec.md
- registerValidation.js
- store.js
- SepetEntity
- SepetDurumLookup
- AdminProfile
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- StokHareketi
- .Create
- src/Frontend/ShopApp.Web/package.json
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json
- ICurrentCustomerContext
- IdentityRoleClaimConfiguration
- IdentityUserClaimConfiguration
- router.js
- Address
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- SiparisUrunuCommandHandlerTests.cs
- adminPages.test.js
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
- SiparisDurum
- Kategori
- KayitliKullanici
- ResultSiparisDto
- InitialCreate
- formatPrice
- ApplicationUser
- createAuthForm
- ResultSepetDto
- authConstants.js
- SepetController.cs
- IEntityTypeConfiguration
- ProfileModals.js
- KargoGonderisi
- src/Frontend/ShopApp.Web/src/shared/services/apiClient.js
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- IIdentityService
- StokServis.Domain.Entities
- .GetProfile
- ValidationBehavior
- CartPage.js
- AbstractValidator
- AuthRequest
- TestDbContext
- OrderListPage.js
- KategoriServis.Domain.Entities
- .AddInfrastructure
- BaseEntity
- graphify reference: query, path, explain
- SiparisController.cs
- profilePage.test.js
- BaseEntity
- HareketTipi
- .Handle
- ShopApp.Application.Tests.csproj
- Musteri
- .SeedAsync
- .BuildModel
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- IdentityUserTokenConfiguration
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- RecentOrdersCard.js
- SepetUrunuCommandHandlerTests.cs
- .BuildModel
- ShopApp Development Notes
- AuthenticationValidationException

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 82 edges
2. `ShopApp.Application.Abstractions` - 50 edges
3. `ShopAppDbContext` - 40 edges
4. `SiparisEntity` - 33 edges
5. `navigate()` - 31 edges
6. `ICurrentCustomerContext` - 31 edges
7. `SepetUrunu` - 31 edges
8. `SiparisUrunleri` - 31 edges
9. `IShopAppDbContext` - 30 edges
10. `SepetEntity` - 28 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `createPlaceholderIcon()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductCard.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `createBoxPlaceholder()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductDetailModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `renderNode()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js

## Import Cycles
- None detected.

## Communities (155 total, 10 thin omitted)

### Community 0 - "ShopApp.Application.Abstractions"
Cohesion: 0.20
Nodes (6): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure, src.Monolith.ShopApp.Domain.Siparisler, ShopApp.Application.Abstractions

### Community 1 - "routes.js"
Cohesion: 0.16
Nodes (6): routes, AboutPage(), render(), createHeroCategoryGrid(), HomePage(), render()

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.20
Nodes (14): initApp(), bootstrap(), establishSession(), getCurrentUser(), logout(), mapUser(), register(), restoreSession() (+6 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.06
Nodes (34): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+26 more)

### Community 5 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 6 - "src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js"
Cohesion: 0.11
Nodes (12): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, FIELD_IDS, LoginPage() (+4 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "SiparisEntity"
Cohesion: 0.13
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.09
Nodes (21): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, SiparisUrunleri, ShopAppDbContext, AdminProfilleri (+13 more)

### Community 10 - ".For"
Cohesion: 0.21
Nodes (16): Mock, Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, CancellationToken, Task (+8 more)

### Community 11 - "ShopApp.Application.Tests.TestSupport"
Cohesion: 0.10
Nodes (11): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Tests.Sepet, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Sepet.Commands.UpdateSepet, CustomerContextFactory, PrivateNavigation, SepetDurum, Aktif (+3 more)

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "orderService.js"
Cohesion: 0.10
Nodes (3): getAllOrders(), apiClient, endpoints

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "SiparisController"
Cohesion: 0.08
Nodes (35): ShopApp.Application.SiparisUrunleri.Queries, ShopApp.Application.SiparisUrunleri.Dtos, GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+27 more)

### Community 19 - "SiparisUrunleri"
Cohesion: 0.10
Nodes (25): CancellationToken, Guid, Task, ISiparisUrunuRepository, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler (+17 more)

### Community 20 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.10
Nodes (20): appConfig, LoginPage(), RegisterPage(), establishSession(), getCurrentUser(), login(), logout(), mapAuthError() (+12 more)

### Community 21 - "SepetController"
Cohesion: 0.08
Nodes (36): ShopApp.Application.SepetUrunleri.Queries, ShopApp.Application.SepetUrunleri.Dtos, GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+28 more)

### Community 22 - "productsService.js"
Cohesion: 0.10
Nodes (34): render(), getHeroCategories(), getSecondaryCategories(), createProductCard(), createProductImage(), createProductListLayout(), categories, demoProducts (+26 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.20
Nodes (14): DEMO_ORDER, createBreadcrumbs(), createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+6 more)

### Community 24 - "ShopApp.Application.Authentication"
Cohesion: 0.19
Nodes (7): ShopApp.Application.Profil.Dtos, ShopApp.Application.Profil.Commands.UpdateMyProfile, ShopApp.Application.Tests.Profil, ShopApp.Application.Authentication, ShopApp.Application.Authentication.Services, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Profil.Queries.GetMyProfile

### Community 25 - ".Create"
Cohesion: 0.23
Nodes (12): GetSepetQuery, CancellationToken, Guid, IMapper, Task, GetSepetQuery, Id, GetSepetQueryHandler (+4 more)

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
Cohesion: 0.19
Nodes (10): IdentityError, IdentityResult, Guid, IdentityRole, IHttpContextAccessor, IReadOnlyCollection, RoleManager, Task (+2 more)

### Community 31 - "AuthResponse"
Cohesion: 0.08
Nodes (26): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+18 more)

### Community 32 - "Migration"
Cohesion: 0.22
Nodes (6): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, CreateMonolithTables

### Community 33 - "SepetUrunu"
Cohesion: 0.07
Nodes (41): ShopApp.Application.SepetUrunleri.Commands.UpdateSepetUrunu, ShopApp.Application.SepetUrunleri.Commands.DeleteSepetUrunu, CancellationToken, Guid, Task, ISepetUrunuRepository, Guid, CreateSepetUrunuCommand (+33 more)

### Community 34 - "BaseEntity"
Cohesion: 0.11
Nodes (16): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, DateTime, Guid, BaseEntity, GuncellemeTarihi (+8 more)

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.17
Nodes (11): FluentValidation.DependencyInjectionExtensions (12.1.1), Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

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

### Community 43 - "IShopAppDbContext"
Cohesion: 0.05
Nodes (58): ShopApp.Application.Adres.Commands.CreateAddress, ShopApp.Application.Tests.Adres, ShopApp.Application.Adres.Commands.UpdateAddress, ShopApp.Application.Adres.Commands.DeleteAddress, ShopApp.Application.Adres.Dtos, ShopApp.Application.Adres.Queries.GetMyAddresses, GetMyAddressesQuery, ActionResult (+50 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.09
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations, src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.20
Nodes (9): AutoMapper (16.2.0), FluentValidation (12.1.1), Microsoft.EntityFrameworkCore (10.0.11), net10.0, MediatR (14.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

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
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

### Community 57 - "AdminDashboardPage.js"
Cohesion: 0.33
Nodes (9): createAdminMetricCard(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary(), getLowStockProducts() (+1 more)

### Community 60 - "navigate"
Cohesion: 0.18
Nodes (11): navigate(), createAdminConfirmModal(), close(), handleKeydown(), createCategoryCard(), bindEvents(), render(), NotFoundPage() (+3 more)

### Community 61 - "createIcon"
Cohesion: 0.13
Nodes (22): createAdminHeader(), createAdminLayout(), createAdminPageHeader(), createAdminPagination(), createAdminSidebar(), NAV_SECTIONS, AdminCustomersPage(), getFilteredCustomers() (+14 more)

### Community 62 - ".BuildModel"
Cohesion: 0.14
Nodes (10): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 63 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - "registerValidation.js"
Cohesion: 0.21
Nodes (25): RFC-5322, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only., validateConfirmPassword() (+17 more)

### Community 67 - "store.js"
Cohesion: 0.31
Nodes (8): getState(), initialState, notify(), resetStore(), setState(), state, subscribe(), subscribers

### Community 68 - "SepetEntity"
Cohesion: 0.08
Nodes (39): ShopApp.Application.Sepet.Commands.DeleteSepet, CancellationToken, Guid, Task, ISepetRepository, Guid, CreateSepetCommand, CancellationToken (+31 more)

### Community 69 - "SepetDurumLookup"
Cohesion: 0.29
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

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

### Community 74 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.19
Nodes (16): Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, Guid, UpdateSiparisUrunuCommand, CancellationToken (+8 more)

### Community 75 - "StokHareketi"
Cohesion: 0.18
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - ".Create"
Cohesion: 0.17
Nodes (17): GetSiparisQuery, Profile, SepetMapping, SiparisMapping, CancellationToken, Guid, IMapper, Task (+9 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 79 - "ICurrentCustomerContext"
Cohesion: 0.09
Nodes (30): GetMyProfileQuery, IRequest, IRequestHandler, CancellationToken, Guid, Task, CurrentCustomer, ICurrentCustomerContext (+22 more)

### Community 80 - "IdentityRoleClaimConfiguration"
Cohesion: 0.60
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 81 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 82 - "router.js"
Cohesion: 0.15
Nodes (19): compileRoute(), guardedPath(), initRouter(), matchRoute(), render(), notFoundRoute, clearError(), hasRole() (+11 more)

### Community 83 - "Address"
Cohesion: 0.16
Nodes (11): Guid, Address, AdresBilgisi, Ilce, MusteriId, PostaKodu, Sehir, TamAdres (+3 more)

### Community 84 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.19
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserLogin, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration, EntityTypeBuilder, Guid (+1 more)

### Community 85 - "SiparisUrunuCommandHandlerTests.cs"
Cohesion: 0.25
Nodes (3): ShopApp.Application.SiparisUrunleri.Commands.UpdateSiparisUrunu, ShopApp.Application.SiparisUrunleri.Commands.DeleteSiparisUrunu, ShopApp.Application.Tests.SiparisUrunleri

### Community 86 - "adminPages.test.js"
Cohesion: 0.20
Nodes (14): createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), createCategoryStatistics(), createCategoryTable(), getFilteredData(), render() (+6 more)

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
Cohesion: 0.12
Nodes (19): createCategoryCard(), createCategoryGrid(), createCategoryMegaMenu(), render(), update(), normalizeCategories(), createHeader(), bindCategoryDropdown() (+11 more)

### Community 93 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 94 - "ProfilePage.js"
Cohesion: 0.23
Nodes (15): createPersonalInfoCard(), formatDate(), createWelcomeBanner(), createBreadcrumbs(), ProfilePage(), closeModal(), loadData(), renderDashboard() (+7 more)

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

### Community 100 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "KayitliKullanici"
Cohesion: 0.14
Nodes (12): DateTime, Guid, KayitliKullanici, Ad, Durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+4 more)

### Community 103 - "ResultSiparisDto"
Cohesion: 0.18
Nodes (13): GetMySiparislerQuery, Guid, GetByIdSiparisDto, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper (+5 more)

### Community 104 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 105 - "formatPrice"
Cohesion: 0.24
Nodes (13): createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductDetailModal(), close(), createBoxPlaceholder(), handleKeydown(), createAdminProductGrid() (+5 more)

### Community 106 - "ApplicationUser"
Cohesion: 0.22
Nodes (8): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad

### Community 107 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 108 - "ResultSepetDto"
Cohesion: 0.24
Nodes (11): GetMySepetlerQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 109 - "authConstants.js"
Cohesion: 0.21
Nodes (9): createPasswordStrength(), reset(), update(), AUTH_STATUS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH, NOTE: These are frontend-only quality hints. (+1 more)

### Community 110 - "SepetController.cs"
Cohesion: 0.12
Nodes (8): ShopApp.Application.Sepet.Dtos, ShopApp.Application.Mapping, ShopApp.Application.Sepet.Queries, ShopApp.Application.Sepet.Commands.CreateSepet, Guid, GetByIdSepetDto, GetSepet, MapperFactory

### Community 111 - "IEntityTypeConfiguration"
Cohesion: 0.21
Nodes (10): IEntityTypeConfiguration, Guid, KargoDurumGecmisi, Durum, KargoGonderisi, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration (+2 more)

### Community 112 - "ProfileModals.js"
Cohesion: 0.24
Nodes (7): createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml(), formatTurkishPhone(), TURKEY_CITIES

### Community 113 - "KargoGonderisi"
Cohesion: 0.13
Nodes (15): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, Sevkiyat (+7 more)

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

### Community 119 - "IIdentityService"
Cohesion: 0.17
Nodes (11): DateTime, Guid, IdentityUserInfo, Guid, IReadOnlyCollection, Task, AuthService, Guid (+3 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - ".GetProfile"
Cohesion: 0.27
Nodes (8): ControllerBase, ActionResult, CancellationToken, HttpGet, HttpPut, IMediator, Task, ProfilController

### Community 122 - "ValidationBehavior"
Cohesion: 0.20
Nodes (8): ShopApp.Api.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable, Task, ValidationBehavior

### Community 123 - "CartPage.js"
Cohesion: 0.27
Nodes (11): createCartSummary(), formatPrice(), update(), DEMO_CART_ITEMS, getDemoCartItems(), CartPage(), getShippingCost(), getSubtotal() (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.14
Nodes (14): AbstractValidator, UpdateSepetCommandValidator, CreateSepetUrunuCommandValidator, DeleteSiparisCommandValidator, Guid, UpdateSiparisCommand, UpdateSiparisCommandValidator, Guid (+6 more)

### Community 125 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 126 - "TestDbContext"
Cohesion: 0.14
Nodes (13): DbContextOptions, DbSet, TestDbContext, Adresler, Musteriler, Sepetler, SepetUrunleri, SiparisDurumlar (+5 more)

### Community 127 - "OrderListPage.js"
Cohesion: 0.27
Nodes (12): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+4 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (18): ShopApp.Infrastructure.Authentication, IConfiguration, IOptions, IServiceCollection, DateTime, JwtToken, IEnumerable, IJwtTokenGenerator (+10 more)

### Community 130 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "SiparisController.cs"
Cohesion: 0.12
Nodes (7): ShopApp.Application.Siparis.Commands.UpdateSiparis, ShopApp.Application.Siparis.Commands.DeleteSiparis, ShopApp.Application.Siparis.Commands.CreateSiparis, ShopApp.Application.Siparis.Dtos, ShopApp.Application.Siparis.Queries, ShopApp.Application.Tests.Siparis, src.Monolith.ShopApp.Domain.Siparisler.Enums

### Community 133 - "profilePage.test.js"
Cohesion: 0.38
Nodes (5): createProfileSidebar(), getInitials(), createSavedAddressesCard(), cityMap, getCityName()

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - ".Handle"
Cohesion: 0.32
Nodes (6): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "Musteri"
Cohesion: 0.67
Nodes (3): Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 139 - ".SeedAsync"
Cohesion: 0.25
Nodes (6): Guid, IdentityRole, IServiceProvider, RoleManager, Task, IdentityRoleSeeder

### Community 140 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

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

### Community 150 - "RecentOrdersCard.js"
Cohesion: 0.53
Nodes (5): createOrderStatusBadge(), createRecentOrdersCard(), formatDate(), formatPrice(), STATUS_MAP

### Community 151 - "SepetUrunuCommandHandlerTests.cs"
Cohesion: 0.18
Nodes (4): ShopApp.Application.SiparisUrunleri.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.SepetUrunleri, ShopApp.Application.Tests.Validation, ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu

### Community 152 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, KategoriDbContextModelSnapshot

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.33
Nodes (5): Admin Architecture & Dynamic Data Rules, Modern Address Modal UI Refactor (`createAddressModal`), Product Management Architecture (`AdminProductsPage.js`), Profile and Address Architecture, ShopApp Development Notes

### Community 154 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

## Knowledge Gaps
- **494 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+489 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 954 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864)
- `ShopAppDbContext` (2× useful, score=1.166756402)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Application.Abstractions` to `Migration`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddRoleSpecificProfiles`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `ShopApp.Application.Authentication`, `.BuildModel`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `ShopApp.Application.Abstractions`, `SepetUrunu`, `KargoDbContext`, `SepetEntity`, `SiparisEntity`, `Musteri`, `IShopAppDbContext`, `Address`, `SiparisUrunleri`, `.Create`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `ShopApp.Application.Abstractions`, `SepetUrunu`, `.AddInfrastructure`, `SepetEntity`, `ResultSiparisDto`, `SiparisEntity`, `ShopAppDbContext`, `Musteri`, `ResultSepetDto`, `.Create`, `SiparisController`, `Address`, `SiparisUrunleri`, `SepetController`, `.Create`, `TestDbContext`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _494 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10756302521008404 - nodes in this community are weakly interconnected._
- **Should `SiparisEntity` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._