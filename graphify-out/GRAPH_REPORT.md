# Graph Report - ShopApp  (2026-09-04)

## Corpus Check
- 301 files · ~448,040 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2040 nodes · 3687 edges · 141 communities (126 shown, 14 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 267 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ed3f7b04`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Abstractions
- homeService.js
- ShopApp.Infrastructure.csproj
- App.js
- ShopAppFrontendAGENTS.md
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- SiparisEntity
- ShopAppDbContext
- .For
- src.Monolith.ShopApp.Domain.Sepet.Entities
- AddRoleSpecificProfiles
- orderService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- SepetController
- productData.js
- OrderConfirmationPage.js
- ShopApp.Application.Authentication
- GetSepetQueryHandler
- InitialCreate
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
- ShopApp – Vanilla JavaScript SPA Frontend
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- Urun
- SepetUrunu
- IlkMigrasyon
- ShopApp.Infrastructure.Persistence.Configurations
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
- IShopAppDbContext
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- navigate
- SepetDurum
- .BuildModel
- .BuildTargetModel
- AGENTS.md
- extraction-spec.md
- IDesignTimeDbContextFactory
- store.js
- SepetEntity
- SepetDurumLookup
- src.Monolith.ShopApp.Domain.Common
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- ResultSiparisDto
- StokHareketi
- .Create
- src/Frontend/ShopApp.Web/package.json
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json
- ICurrentCustomerContext
- IdentityRoleClaimConfiguration
- IdentityUserClaimConfiguration
- src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- Address
- IdentityUserLoginConfiguration
- IdentityUserTokenConfiguration
- IdentityRoleConfiguration
- Q: How are role-specific customer and admin profiles provisioned?
- BaseEntity
- StokUrunleri
- KategoriDbContext
- http
- PrivateNavigation.cs
- .BuildTargetModel
- authStore.js
- UrunOzelligi
- SiparisUrunleri
- KargoDbContext
- SyncIdentityModels
- SiparisDurum
- Kategori
- KayitliKullanici
- SepetMapping.cs
- orderDemoData.js
- ResultSepetDto
- IEntityTypeConfiguration
- KargoGonderisi
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- IIdentityService
- StokServis.Domain.Entities
- ValidationBehavior
- createIcon
- AbstractValidator
- AuthRequest
- TestDbContext
- OrderListPage.js
- KategoriServis.Domain.Entities
- .AddInfrastructure
- BaseEntity
- graphify reference: query, path, explain
- SiparisController.cs
- ISiparisUrunuRepository
- BaseEntity
- HareketTipi
- AuthenticationValidationException
- ShopApp.Application.Tests.csproj
- Musteri
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- Sevkiyat
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- .SeedAsync
- SepetUrunuCommandHandlerTests.cs

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Abstractions` - 42 edges
2. `ShopAppDbContext` - 40 edges
3. `SiparisEntity` - 33 edges
4. `SepetUrunu` - 31 edges
5. `SiparisUrunleri` - 31 edges
6. `SepetEntity` - 28 edges
7. `navigate()` - 25 edges
8. `ICurrentCustomerContext` - 25 edges
9. `createIcon()` - 24 edges
10. `IdentityService` - 24 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/home/components/FeatureBenefits.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `initApp()` --calls--> `initRouter()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js
- `initApp()` --calls--> `navigate()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js
- `initApp()` --calls--> `restoreSession()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/bootstrap.js → src/Frontend/ShopApp.Web/src/app/App.js

## Import Cycles
- None detected.

## Communities (141 total, 14 thin omitted)

### Community 0 - "ShopApp.Application.Abstractions"
Cohesion: 0.14
Nodes (10): ShopApp.Infrastructure.Identity, ShopApp.Application.Siparis.Commands.CreateSiparis, ShopApp.Infrastructure.Persistence, ShopApp.Application.Tests.TestSupport, ShopApp.Infrastructure, ShopApp.Application.Tests.Siparis, ShopApp.Application.Tests.SiparisUrunleri, src.Monolith.ShopApp.Domain.Siparisler (+2 more)

### Community 1 - "homeService.js"
Cohesion: 0.10
Nodes (16): benefits, createFeatureBenefits(), render(), createHeroCategoryGrid(), render(), heroCategories, secondaryCategories, HomePage() (+8 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "App.js"
Cohesion: 0.19
Nodes (13): initApp(), bootstrap(), logout(), createFooter(), TRUST_BADGES, createHeader(), bindEvents(), injectIcons() (+5 more)

### Community 4 - "ShopAppFrontendAGENTS.md"
Cohesion: 0.05
Nodes (39): 10. Cart Page Requirements, 11. Cart Client-Side Interactions, 12. Cart Empty State, 13. Orders Page Requirements, 14. Order Details Interaction, 15. Orders Empty State, 16. Demo Data, 17. Separation of Responsibilities (+31 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.24
Nodes (5): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 6 - "src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js"
Cohesion: 0.06
Nodes (49): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update() (+41 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "SiparisEntity"
Cohesion: 0.13
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.10
Nodes (20): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, SiparisUrunleri, ShopAppDbContext, AdminProfilleri (+12 more)

### Community 10 - ".For"
Cohesion: 0.15
Nodes (20): ShopApp.Application.Siparis.Commands.DeleteSiparis, Mock, Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, DeleteSiparisCommandValidator (+12 more)

### Community 11 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.15
Nodes (7): src.Monolith.ShopApp.Domain.Sepet.Enums, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Tests.Sepet, ShopApp.Application.Sepet.Queries, ShopApp.Application.Sepet.Commands.UpdateSepet, ShopApp.Application.Sepet.Commands.CreateSepet, GetSepet

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
Cohesion: 0.08
Nodes (35): ShopApp.Application.SiparisUrunleri.Queries, ShopApp.Application.SiparisUrunleri.Dtos, GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+27 more)

### Community 19 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.18
Nodes (17): Guid, CreateSiparisUrunuCommand, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler, Guid, UpdateSiparisUrunuCommand (+9 more)

### Community 20 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.10
Nodes (20): appConfig, LoginPage(), RegisterPage(), establishSession(), getCurrentUser(), login(), logout(), mapAuthError() (+12 more)

### Community 21 - "SepetController"
Cohesion: 0.08
Nodes (36): ShopApp.Application.SepetUrunleri.Queries, ShopApp.Application.SepetUrunleri.Dtos, GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+28 more)

### Community 22 - "productData.js"
Cohesion: 0.18
Nodes (14): categories, demoProducts, formatPrice(), getProductDetail(), productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts, CategoryListPage() (+6 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.18
Nodes (16): BENEFITS, createBenefitsSection(), createBreadcrumbs(), createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard() (+8 more)

### Community 24 - "ShopApp.Application.Authentication"
Cohesion: 0.16
Nodes (9): ShopApp.Application.Authentication, ShopApp.Application.Authentication.Services, src.Monolith.ShopApp.Api.Controllers, DateTime, JwtToken, IEnumerable, IJwtTokenGenerator, IEnumerable (+1 more)

### Community 25 - "GetSepetQueryHandler"
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
Cohesion: 0.11
Nodes (21): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+13 more)

### Community 32 - "Migration"
Cohesion: 0.22
Nodes (6): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, CreateMonolithTables

### Community 33 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 34 - "KargoServis.Domain.Entities"
Cohesion: 0.24
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

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
Cohesion: 0.17
Nodes (10): ControllerBase, HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController (+2 more)

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 43 - "SepetUrunu"
Cohesion: 0.08
Nodes (39): ShopApp.Application.SepetUrunleri.Commands.DeleteSepetUrunu, CancellationToken, Guid, Task, ISepetUrunuRepository, Guid, CreateSepetUrunuCommand, CancellationToken (+31 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.04
Nodes (33): KategoriServis.Migrations, KargoServis.Migrations, ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot (+25 more)

### Community 45 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.13
Nodes (11): ShopApp.Infrastructure.Persistence.Configurations, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, SepetUrunuConfiguration, EntityTypeBuilder (+3 more)

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

### Community 57 - "IShopAppDbContext"
Cohesion: 0.22
Nodes (8): CancellationToken, DbSet, Task, IShopAppDbContext, Sepetler, SepetUrunleri, Siparisler, SiparisUrunleri

### Community 60 - "navigate"
Cohesion: 0.11
Nodes (17): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, routes (+9 more)

### Community 61 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 62 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 63 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 67 - "store.js"
Cohesion: 0.31
Nodes (8): getState(), initialState, notify(), resetStore(), setState(), state, subscribe(), subscribers

### Community 68 - "SepetEntity"
Cohesion: 0.07
Nodes (41): ShopApp.Application.Sepet.Commands.DeleteSepet, IRequest, IRequestHandler, CancellationToken, Guid, Task, ISepetRepository, Guid (+33 more)

### Community 69 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 70 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.17
Nodes (7): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, Guid, AdminProfile, KullaniciId, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.16
Nodes (9): StokServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri (+1 more)

### Community 74 - "ResultSiparisDto"
Cohesion: 0.20
Nodes (12): GetMySiparislerQuery, Guid, GetByIdSiparisDto, Guid, ResultSiparisDto, CancellationToken, IMapper, List (+4 more)

### Community 75 - "StokHareketi"
Cohesion: 0.18
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - ".Create"
Cohesion: 0.20
Nodes (14): GetSiparisQuery, CancellationToken, Guid, IMapper, Task, GetSiparis, GetSiparisQuery, Id (+6 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 78 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 79 - "ICurrentCustomerContext"
Cohesion: 0.13
Nodes (15): CancellationToken, Guid, Task, CurrentCustomer, ICurrentCustomerContext, Guid, CreateSiparisCommand, CancellationToken (+7 more)

### Community 80 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 81 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 82 - "src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.14
Nodes (17): appConfig, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), setAuthenticated() (+9 more)

### Community 83 - "Address"
Cohesion: 0.17
Nodes (11): Guid, Address, AdresBilgisi, Ilce, MusteriId, PostaKodu, Sehir, TamAdres (+3 more)

### Community 84 - "IdentityUserLoginConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 85 - "IdentityUserTokenConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

### Community 86 - "IdentityRoleConfiguration"
Cohesion: 0.60
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "BaseEntity"
Cohesion: 0.17
Nodes (12): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, ICollection, Sevkiyat (+4 more)

### Community 89 - "StokUrunleri"
Cohesion: 0.17
Nodes (12): Guid, ICollection, StokUrunleri, Depo, DepoId, DepoKonumu, Hareketler, KullanilabilirMiktar (+4 more)

### Community 90 - "KategoriDbContext"
Cohesion: 0.14
Nodes (11): KategoriServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, KategoriDbContext, Kategoriler, UrunGorselleri, Urunler (+3 more)

### Community 91 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 93 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 94 - "authStore.js"
Cohesion: 0.19
Nodes (13): AUTH_STATUS, clearError(), getState(), initialState, merge(), notify(), setAnonymous(), setError() (+5 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 97 - "SiparisUrunleri"
Cohesion: 0.10
Nodes (20): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+12 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.15
Nodes (10): KargoServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri (+2 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "SiparisDurum"
Cohesion: 0.18
Nodes (9): src.Monolith.ShopApp.Domain.Siparisler.Enums, SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis (+1 more)

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 104 - "SepetMapping.cs"
Cohesion: 0.29
Nodes (5): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping, MapperFactory

### Community 110 - "ResultSepetDto"
Cohesion: 0.15
Nodes (14): ShopApp.Application.Sepet.Dtos, GetMySepetlerQuery, Guid, GetByIdSepetDto, DateTime, Guid, ResultSepetDto, CancellationToken (+6 more)

### Community 111 - "IEntityTypeConfiguration"
Cohesion: 0.21
Nodes (10): IEntityTypeConfiguration, Guid, KargoDurumGecmisi, Durum, KargoGonderisi, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration (+2 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

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
Cohesion: 0.14
Nodes (15): Guid, IdentityUserInfo, RegisterRequest, Ad, Email, Sifre, Soyad, Guid (+7 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 122 - "ValidationBehavior"
Cohesion: 0.20
Nodes (8): ShopApp.Api.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable, Task, ValidationBehavior

### Community 123 - "createIcon"
Cohesion: 0.31
Nodes (15): BENEFITS, CartPage(), createBenefitsSection(), createCartItemRow(), getGrandTotal(), getShippingCost(), getSubtotal(), removeItem() (+7 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.17
Nodes (9): AbstractValidator, ShopApp.Application.SiparisUrunleri.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Validation, UpdateSepetCommandValidator, CreateSepetUrunuCommandValidator, UpdateSiparisCommandValidator, CreateSiparisUrunuCommandValidator, Fact (+1 more)

### Community 125 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 126 - "TestDbContext"
Cohesion: 0.17
Nodes (11): DbContextOptions, DbSet, TestDbContext, Sepetler, SepetUrunleri, SiparisDurumlar, Siparisler, SiparisUrunleri (+3 more)

### Community 127 - "OrderListPage.js"
Cohesion: 0.22
Nodes (15): BENEFITS, createBenefitsSection(), createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge() (+7 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.14
Nodes (12): ShopApp.Infrastructure.Authentication, IConfiguration, IOptions, IServiceCollection, JwtSettings, Audience, ExpirationInMinutes, Issuer (+4 more)

### Community 130 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "SiparisController.cs"
Cohesion: 0.15
Nodes (5): ShopApp.Application.Siparis.Commands.UpdateSiparis, ShopApp.Application.SiparisUrunleri.Commands.UpdateSiparisUrunu, ShopApp.Application.Siparis.Dtos, ShopApp.Application.Siparis.Queries, UpdateSiparisUrunuCommandValidator

### Community 133 - "ISiparisUrunuRepository"
Cohesion: 0.13
Nodes (16): ShopApp.Application.SiparisUrunleri.Commands.DeleteSiparisUrunu, CancellationToken, Guid, Task, ISiparisUrunuRepository, Guid, DeleteSiparisUrunuCommand, CancellationToken (+8 more)

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 141 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 142 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 143 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 144 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 150 - ".SeedAsync"
Cohesion: 0.25
Nodes (6): Guid, IdentityRole, IServiceProvider, RoleManager, Task, IdentityRoleSeeder

### Community 151 - "SepetUrunuCommandHandlerTests.cs"
Cohesion: 0.18
Nodes (4): ShopApp.Application.SepetUrunleri.Commands.UpdateSepetUrunu, ShopApp.Application.Tests.SepetUrunleri, ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu, UpdateSepetUrunuCommandValidator

## Knowledge Gaps
- **498 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+493 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 911 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Application.Abstractions` to `Migration`, `IDesignTimeDbContextFactory`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `AddRoleSpecificProfiles`, `IlkMigrasyon`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `ShopApp.Application.Authentication`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `ShopApp.Application.Abstractions`, `SiparisUrunleri`, `KargoDbContext`, `SepetEntity`, `SiparisEntity`, `SepetUrunu`, `IShopAppDbContext`, `GetSepetQueryHandler`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `ShopApp.Application.Abstractions`, `.AddInfrastructure`, `IDesignTimeDbContextFactory`, `SepetEntity`, `SepetDurumLookup`, `src.Monolith.ShopApp.Domain.Common`, `KayitliKullanici`, `SiparisEntity`, `ISiparisUrunuRepository`, `Musteri`, `SepetUrunu`, `ICurrentCustomerContext`, `Address`, `InfrastructureInitializer`, `IShopAppDbContext`, `TestDbContext`, `IdentityService`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _498 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ShopApp.Application.Abstractions` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `homeService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Should `ShopAppFrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._