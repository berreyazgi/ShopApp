# Graph Report - ShopApp  (2026-09-09)

## Corpus Check
- 466 files · ~392,973 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3100 nodes · 6528 edges · 199 communities (187 shown, 11 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 598 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `930830b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AddressLookupItemDto
- .Handle
- ShopApp.Infrastructure.csproj
- GetSepetQueryHandler
- FrontendAGENTS.md
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- Mock
- ShopAppDbContext
- ProductDetailPage.js
- ShopApp.Infrastructure.Persistence.Context
- AddRoleSpecificProfiles
- authService.js
- appConstants.js
- What You Must Do When Invoked
- ResultSiparisUrunleriDto
- eventBus.js
- SiparisEntity
- CreateUrunCommandHandler
- ResultSepetUrunDto
- AdminDashboardPage.js
- CartPage.js
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- CurrentCustomer
- .Create
- SepetEntity
- What You Must Do When Invoked
- Depo
- IdentityService
- RegisterRequest
- Migration
- .Olustur
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- .SeedProductWithVariant
- KategoriServis.csproj
- StokServis.csproj
- Urun
- SepetController
- IlkMigrasyon
- TestDbContext
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
- .SeedAsync
- createIcon
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- SiparisUrunleri
- registerValidation.js
- .Handle
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .For
- IRequest
- SiparisController
- src.Monolith.ShopApp.Domain.Siparis.Entities
- IRequestHandler
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- ShopApp.Application.Features.Siparis.Dtos
- StokHareketi
- ShopApp.Application.Mapping
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- UpdateAdminCustomerCommand
- Kategori
- Address
- ShopApp.Application.Features.Sepet.Dtos
- IIdentityService
- MakeIdValueGeneratedNever
- Q: How are role-specific customer and admin profiles provisioned?
- productsService.js
- StokUrunleri
- KategoriDbContext
- http
- navigate
- .GetAll
- AdminCategoriesPage.js
- UrunOzelligi
- InitialCreate
- AuthResponse
- KargoDbContext
- SyncIdentityModels
- store.js
- Kategori
- GetAdminOrdersQueryHandler
- GetUrunGorselleriQueryHandler
- OrderListPage.js
- RemoveAdminProfileTable
- .Create
- ShopApp.Application.Features.Authentication.DTOs
- ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu
- .Delete_Throws_WhenItemBelongsToAnotherCustomersCart
- UrunGorsel
- KargoDurumGecmisi
- ResultUrunOzellikDto
- KargoGonderisi
- createCategoryMegaMenu
- UrunTur
- KargoDurumu
- KategoriServis.Domain.Entities
- graphify reference: extra exports and benchmark
- .GetMyAddresses
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- routes.js
- GetByIdUrunDto
- AbstractValidator
- Sevkiyat
- GetUrunTurleriQueryHandler
- OrderConfirmationPage.js
- GetByIdUrunTurDto
- .AddInfrastructure
- createAuthForm
- graphify reference: query, path, explain
- DeleteUrunCommand
- GetUrunlerQueryHandler
- BaseEntity
- HareketTipi
- ResultSepetDto
- ShopApp.Application.Tests.csproj
- InitialCreate
- UpdateSiparisUrunuCommand
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
- DeleteSiparisCommand
- .BuildModel
- AddressDto
- ShopApp Development Notes
- BaseEntity
- DeleteUrunTurCommandHandler
- productData.js
- GetUrunGorselQueryHandler
- apiClient.js
- Musteri
- AddressHandlerTests.cs
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Common.Interfaces
- authConstants.js
- KayitliKullanici
- IdentityUserLoginConfiguration
- AdminUrunController
- GenericUrunRepository
- UrunTur
- AddMahalleAndConvertPostaKoduToInteger
- CreateUrunTurCommandHandler
- UpdateAddressCommand
- InfrastructureInitializer
- DeleteUrunOzellikCommandHandler
- IdentityUserClaimConfiguration
- CreateUrunOzellikCommandHandler
- UpdateUrunOzellikCommandHandler
- IEntityTypeConfiguration
- createConfirmModal
- IGenericUrunRepository
- IDesignTimeDbContextFactory
- SepetUrunu
- AddAddressPhone
- homeService.js
- AuthenticationValidationException
- .GetAll
- SepetDurumLookup
- UpdateKategoriCommand
- CreateAddressCommand
- ProfileHandlerTests.cs
- IdentityUserRoleConfiguration
- ApplicationUser
- SiparisDurum
- .BuildModel
- ShopApp.Infrastructure.Identity.Models
- SepetDurum
- .BuildModel
- IdentityUserTokenConfiguration

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 86 edges
2. `ShopApp.Application.Common.Interfaces` - 86 edges
3. `IShopAppDbContext` - 59 edges
4. `ShopAppDbContext` - 50 edges
5. `Urun` - 48 edges
6. `ICurrentCustomerContext` - 41 edges
7. `SiparisEntity` - 40 edges
8. `navigate()` - 39 edges
9. `TestDbContext` - 34 edges
10. `SepetEntity` - 34 edges

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

## Communities (199 total, 11 thin omitted)

### Community 0 - "AddressLookupItemDto"
Cohesion: 0.07
Nodes (29): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator (+21 more)

### Community 1 - ".Handle"
Cohesion: 0.08
Nodes (25): ShopApp.Application.Features.Urun.Commands.CreateKategori, ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult (+17 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "GetSepetQueryHandler"
Cohesion: 0.22
Nodes (13): GetSepetQuery, CancellationToken, Guid, IMapper, Task, GetSepet, GetSepetQuery, Id (+5 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.24
Nodes (5): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 6 - "LoginPage.js"
Cohesion: 0.11
Nodes (11): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, FIELD_IDS, LoginPage() (+3 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "Mock"
Cohesion: 0.16
Nodes (19): ShopApp.Application.Features.Sepet.Commands.DeleteSepet, Mock, Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, DeleteSepetCommandValidator (+11 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.07
Nodes (29): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+21 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.18
Nodes (20): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+12 more)

### Community 11 - "ShopApp.Infrastructure.Persistence.Context"
Cohesion: 0.19
Nodes (6): ShopApp.Infrastructure.Identity.Services, ShopApp.Application.Features.Urun.Commands.UpdateUrunTur, ShopApp.Infrastructure.Persistence.Context, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Tests.Features.Urun, ShopApp.Infrastructure.Persistence.Repositories

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "authService.js"
Cohesion: 0.15
Nodes (20): AUTH_STATUS, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), clearError() (+12 more)

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "ResultSiparisUrunleriDto"
Cohesion: 0.24
Nodes (11): GetSiparisUrunleriQuery, Guid, ResultSiparisUrunleriDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.12
Nodes (20): CancellationToken, Guid, Task, ISiparisRepository, Guid, ICollection, SiparisEntity, AraToplam (+12 more)

### Community 20 - "CreateUrunCommandHandler"
Cohesion: 0.24
Nodes (9): Guid, CreateUrunCommand, CancellationToken, Guid, Kategori, Task, UrunEntity, CreateUrunCommandHandler (+1 more)

### Community 21 - "ResultSepetUrunDto"
Cohesion: 0.16
Nodes (16): GetSepetUrunleriQuery, GetSepetUrunuQuery, Guid, List, ResultSepetUrunDto, ToplamTutar, CancellationToken, Guid (+8 more)

### Community 22 - "AdminDashboardPage.js"
Cohesion: 0.09
Nodes (31): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary() (+23 more)

### Community 23 - "CartPage.js"
Cohesion: 0.09
Nodes (23): createCartItemRow(), updateQuantity(), createCartSummary(), formatPrice(), update(), CartPage(), getShippingCost(), getSubtotal() (+15 more)

### Community 24 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.19
Nodes (16): Guid, CreateSiparisUrunuCommand, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler, Guid, DeleteSiparisUrunuCommand (+8 more)

### Community 25 - "CurrentCustomer"
Cohesion: 0.23
Nodes (11): Guid, CurrentCustomer, CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Fact (+3 more)

### Community 26 - ".Create"
Cohesion: 0.32
Nodes (13): Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken, Fact (+5 more)

### Community 27 - "SepetEntity"
Cohesion: 0.18
Nodes (14): CancellationToken, Guid, Task, ISepetRepository, ICollection, SepetEntity, Durum, DurumId (+6 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.14
Nodes (13): StokServis.Infrastructure.Persistence.Configurations, ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri (+5 more)

### Community 30 - "IdentityService"
Cohesion: 0.14
Nodes (16): IdentityError, IdentityResult, DateTime, Guid, IdentityUserInfo, CancellationToken, Guid, IdentityRole (+8 more)

### Community 31 - "RegisterRequest"
Cohesion: 0.11
Nodes (18): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, LoginRequest (+10 more)

### Community 32 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 33 - ".Olustur"
Cohesion: 0.13
Nodes (23): GetMySiparislerQuery, GetSiparisQuery, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper, List (+15 more)

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

### Community 39 - ".SeedProductWithVariant"
Cohesion: 0.22
Nodes (13): Guid, UpdateUrunCommand, CancellationToken, Kategori, Task, UpdateUrunCommandHandler, Fact, Task (+5 more)

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 43 - "SepetController"
Cohesion: 0.26
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.12
Nodes (11): KargoServis.Infrastructure.Persistence, KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime (+3 more)

### Community 45 - "TestDbContext"
Cohesion: 0.07
Nodes (37): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact (+29 more)

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

### Community 56 - ".SeedAsync"
Cohesion: 0.22
Nodes (7): ShopApp.Infrastructure.Identity.Seed, Guid, IdentityRole, IServiceProvider, RoleManager, Task, IdentityRoleSeeder

### Community 57 - "createIcon"
Cohesion: 0.09
Nodes (40): createAdminLayout(), createAdminPageHeader(), createAdminPagination(), createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductDetailModal(), close() (+32 more)

### Community 60 - "SiparisUrunleri"
Cohesion: 0.07
Nodes (26): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId (+18 more)

### Community 61 - "registerValidation.js"
Cohesion: 0.21
Nodes (25): RFC-5322, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only., validateConfirmPassword() (+17 more)

### Community 62 - ".Handle"
Cohesion: 0.16
Nodes (17): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, CancellationToken, Task, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator (+9 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.10
Nodes (27): ControllerBase, GetMyProfileQuery, ActionResult, CancellationToken, HttpGet, HttpPut, IMediator, Task (+19 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".For"
Cohesion: 0.14
Nodes (24): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, UpdateSiparisCommand (+16 more)

### Community 67 - "IRequest"
Cohesion: 0.12
Nodes (13): IRequest, Guid, CreateSepetCommand, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid (+5 more)

### Community 68 - "SiparisController"
Cohesion: 0.26
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.13
Nodes (9): src.Monolith.ShopApp.Domain.Sepet.Enums, src.Monolith.ShopApp.Domain.Siparis.Entities, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Tests.Features.Siparis, src.Monolith.ShopApp.Domain.Kullanici (+1 more)

### Community 70 - "IRequestHandler"
Cohesion: 0.09
Nodes (23): GetSiparisUrunuQuery, IRequestHandler, CancellationToken, Task, ICurrentCustomerContext, CancellationToken, Guid, Task (+15 more)

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.16
Nodes (9): StokServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri (+1 more)

### Community 74 - "ShopApp.Application.Features.Siparis.Dtos"
Cohesion: 0.19
Nodes (5): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, GetMySiparisler, GetSiparisUrunu

### Community 75 - "StokHareketi"
Cohesion: 0.18
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "ShopApp.Application.Mapping"
Cohesion: 0.24
Nodes (6): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping, UrunMapping, MapperFactory

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "IShopAppDbContext"
Cohesion: 0.10
Nodes (20): DbSet, Kategori, SiparisUrunleri, Urun, UrunGorsel, UrunOzellik, UrunTur, IShopAppDbContext (+12 more)

### Community 79 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 80 - "Urun"
Cohesion: 0.07
Nodes (22): ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, ShopApp.Application.Features.Urun.Commands.CreateUrun, ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, ShopApp.Domain.Urun.Entities, src.Monolith.ShopApp.Domain.Common, ShopApp.Application.Features.Urun.Commands.UpdateUrun, Guid, ICollection (+14 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.11
Nodes (25): ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, GetAdminCustomersQuery, Guid, UpdateAdminCustomerCommand, CancellationToken, Task, UpdateAdminCustomerCommandHandler (+17 more)

### Community 82 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.20
Nodes (10): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+2 more)

### Community 84 - "ShopApp.Application.Features.Sepet.Dtos"
Cohesion: 0.11
Nodes (9): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, ShopApp.Application.Features.Sepet.Dtos, Guid, GetSepetUrunu (+1 more)

### Community 85 - "IIdentityService"
Cohesion: 0.32
Nodes (6): CancellationToken, Guid, IEnumerable, IReadOnlyDictionary, Task, IIdentityService

### Community 86 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "productsService.js"
Cohesion: 0.11
Nodes (33): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview(), AdminProductsPage() (+25 more)

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
Cohesion: 0.11
Nodes (34): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+26 more)

### Community 93 - ".GetAll"
Cohesion: 0.08
Nodes (29): GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+21 more)

### Community 94 - "AdminCategoriesPage.js"
Cohesion: 0.13
Nodes (28): createAdminConfirmModal(), close(), handleKeydown(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), buildCategoryTree() (+20 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - "InitialCreate"
Cohesion: 0.16
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - "AuthResponse"
Cohesion: 0.15
Nodes (13): IReadOnlyCollection, DateTime, AuthResponse, AccessToken, ExpiresAt, User, Guid, IReadOnlyCollection (+5 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.18
Nodes (9): DbContext, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri, Sevkiyatlar (+1 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "store.js"
Cohesion: 0.31
Nodes (8): getState(), initialState, notify(), resetStore(), setState(), state, subscribe(), subscribers

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "GetAdminOrdersQueryHandler"
Cohesion: 0.19
Nodes (12): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List (+4 more)

### Community 103 - "GetUrunGorselleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 104 - "OrderListPage.js"
Cohesion: 0.16
Nodes (15): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+7 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - ".Create"
Cohesion: 0.28
Nodes (9): active, passive, Fact, Kategori, KeyNotFoundException, Task, UrunEntity, UrunListingVisibilityTests (+1 more)

### Community 107 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.11
Nodes (12): ShopApp.Application.Features.Authentication.DTOs, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, AssignRoleRequest, Role, List, AuthRequest, Ad (+4 more)

### Community 108 - "ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu"
Cohesion: 0.12
Nodes (5): src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 109 - ".Delete_Throws_WhenItemBelongsToAnotherCustomersCart"
Cohesion: 0.21
Nodes (10): Guid, DeleteSepetUrunuCommand, CancellationToken, Task, DeleteSepetUrunuCommandHandler, Guid, UpdateSepetUrunuCommand, CancellationToken (+2 more)

### Community 110 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.17
Nodes (12): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, Guid, KargoDurumGecmisi (+4 more)

### Community 112 - "ResultUrunOzellikDto"
Cohesion: 0.22
Nodes (11): GetUrunOzellikleriQuery, Guid, ResultUrunOzellikDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.13
Nodes (15): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, Sevkiyat (+7 more)

### Community 114 - "createCategoryMegaMenu"
Cohesion: 0.21
Nodes (8): createCategoryCard(), createCategoryGrid(), createCategoryMegaMenu(), render(), update(), normalizeCategories(), slugify(), mockCategories

### Community 115 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 117 - "KategoriServis.Domain.Entities"
Cohesion: 0.16
Nodes (10): KategoriServis.Domain.Entities, KategoriServis.Domain.Common, Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId (+2 more)

### Community 118 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 119 - ".GetMyAddresses"
Cohesion: 0.20
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 122 - "routes.js"
Cohesion: 0.24
Nodes (4): notFoundRoute, routes, AboutPage(), render()

### Community 123 - "GetByIdUrunDto"
Cohesion: 0.19
Nodes (11): GetUrunQuery, Guid, List, GetByIdUrunDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.13
Nodes (12): AbstractValidator, CreateSepetUrunuCommandValidator, DeleteSepetUrunuCommandValidator, UpdateSepetCommandValidator, UpdateSepetUrunuCommandValidator, CreateSiparisUrunuCommandValidator, DeleteSiparisUrunuCommandValidator, UpdateSiparisCommandValidator (+4 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "GetUrunTurleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunTurleriQuery, Guid, ResultUrunTurDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 127 - "OrderConfirmationPage.js"
Cohesion: 0.16
Nodes (16): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+8 more)

### Community 128 - "GetByIdUrunTurDto"
Cohesion: 0.19
Nodes (11): GetUrunTurQuery, Guid, List, GetByIdUrunTurDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (17): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+9 more)

### Community 130 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "DeleteUrunCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Urun.Commands.DeleteUrun, Guid, DeleteUrunCommand, CancellationToken, Task, DeleteUrunCommandHandler, DeleteUrunCommandValidator

### Community 133 - "GetUrunlerQueryHandler"
Cohesion: 0.24
Nodes (11): GetUrunlerQuery, Guid, ResultUrunDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "ResultSepetDto"
Cohesion: 0.20
Nodes (11): GetMySepetlerQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 139 - "UpdateSiparisUrunuCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, Guid, UpdateSiparisUrunuCommand, CancellationToken, Task, UpdateSiparisUrunuCommandHandler, UpdateSiparisUrunuCommandValidator

### Community 140 - "UpdateUrunTurCommandHandler"
Cohesion: 0.25
Nodes (7): Guid, UpdateUrunTurCommand, CancellationToken, Task, UrunTur, UpdateUrunTurCommandHandler, UpdateUrunTurCommandValidator

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
Cohesion: 0.24
Nodes (8): Guid, CreateUrunGorselCommand, CancellationToken, Guid, Task, UrunGorsel, CreateUrunGorselCommandHandler, CreateUrunGorselCommandValidator

### Community 150 - "DeleteSiparisCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.DeleteSiparis, Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, DeleteSiparisCommandValidator

### Community 151 - ".BuildModel"
Cohesion: 0.17
Nodes (10): ModelSnapshot, DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 152 - "AddressDto"
Cohesion: 0.27
Nodes (10): GetMyAddressesQuery, DateTime, Guid, AddressDto, CancellationToken, List, Task, GetMyAddresses (+2 more)

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.12
Nodes (15): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+7 more)

### Community 154 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 155 - "DeleteUrunTurCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, Guid, DeleteUrunTurCommand, CancellationToken, Task, UrunTur, DeleteUrunTurCommandHandler, DeleteUrunTurCommandValidator

### Community 156 - "productData.js"
Cohesion: 0.29
Nodes (4): demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 157 - "GetUrunGorselQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, CancellationToken, Guid, IMapper, Task, GetUrunGorsel (+2 more)

### Community 158 - "apiClient.js"
Cohesion: 0.27
Nodes (7): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 159 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 160 - "AddressHandlerTests.cs"
Cohesion: 0.33
Nodes (5): ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.09
Nodes (36): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+28 more)

### Community 163 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.15
Nodes (7): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Urun.Commands.CreateUrunTur, ShopApp.Application.Features.Admin.Customers.Queries, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers

### Community 164 - "authConstants.js"
Cohesion: 0.24
Nodes (8): createPasswordStrength(), reset(), update(), PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH, NOTE: These are frontend-only quality hints., VALIDATION_MESSAGES

### Community 165 - "KayitliKullanici"
Cohesion: 0.15
Nodes (12): DateTime, Guid, KayitliKullanici, Ad, Durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+4 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 167 - "AdminUrunController"
Cohesion: 0.25
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 168 - "GenericUrunRepository"
Cohesion: 0.38
Nodes (5): GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 169 - "UrunTur"
Cohesion: 0.09
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur, UrunTurId, Guid (+14 more)

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "CreateUrunTurCommandHandler"
Cohesion: 0.27
Nodes (8): Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler, CreateUrunTurCommandValidator

### Community 172 - "UpdateAddressCommand"
Cohesion: 0.24
Nodes (8): CancellationToken, Task, CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator

### Community 173 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

### Community 174 - "DeleteUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 175 - "IdentityUserClaimConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.20
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur (+2 more)

### Community 177 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, UpdateUrunOzellikCommandHandler (+1 more)

### Community 178 - "IEntityTypeConfiguration"
Cohesion: 0.28
Nodes (7): IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration, EntityTypeBuilder, AddressConfiguration

### Community 179 - "createConfirmModal"
Cohesion: 0.73
Nodes (6): createConfirmModal(), close(), handleBackdropClick(), handleCancel(), handleConfirm(), handleKeydown()

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.13
Nodes (14): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, DeleteUrunGorselCommand, CancellationToken (+6 more)

### Community 182 - "SepetUrunu"
Cohesion: 0.11
Nodes (16): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+8 more)

### Community 183 - "AddAddressPhone"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddAddressPhone

### Community 184 - "homeService.js"
Cohesion: 0.24
Nodes (6): heroCategories, secondaryCategories, TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API., TODO: Integrate with Catalog/CMS API.

### Community 185 - "AuthenticationValidationException"
Cohesion: 0.50
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 186 - ".GetAll"
Cohesion: 0.31
Nodes (8): ActionResult, CancellationToken, Guid, HttpGet, IMediator, List, Task, UrunController

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 188 - "UpdateKategoriCommand"
Cohesion: 0.28
Nodes (6): ShopApp.Application.Features.Urun.Commands.UpdateKategori, Guid, UpdateKategoriCommand, Kategori, UpdateKategoriCommandHandler, UpdateKategoriCommandValidator

### Community 189 - "CreateAddressCommand"
Cohesion: 0.39
Nodes (5): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator

### Community 190 - "ProfileHandlerTests.cs"
Cohesion: 0.36
Nodes (4): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil

### Community 191 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 192 - "ApplicationUser"
Cohesion: 0.25
Nodes (8): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad

### Community 193 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 194 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 196 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 197 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 198 - "IdentityUserTokenConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

## Knowledge Gaps
- **525 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+520 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Infrastructure.Persistence.Context` to `TurkcheIdentityVeMusteriGuncellemesi`, `AddRoleSpecificProfiles`, `Migration`, `StandardizeSepetUrunuQuantityField`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `IDesignTimeDbContextFactory`, `AddAddressPhone`, `.BuildModel`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `RebuildAllEntitySchema`, `MakeIdValueGeneratedNever`, `SyncIdentityModels`, `RemoveAdminProfileTable`, `ShopApp.Application.Features.Authentication.DTOs`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `.AddInfrastructure`, `.Handle`, `DeleteUrunCommand`, `Mock`, `ResultSepetDto`, `UpdateSiparisUrunuCommand`, `ShopApp.Infrastructure.Persistence.Context`, `DeleteSiparisCommand`, `CurrentCustomer`, `SepetEntity`, `DeleteUrunTurCommandHandler`, `AddressHandlerTests.cs`, `UpdateAddressCommand`, `TestDbContext`, `DeleteUrunOzellikCommandHandler`, `CreateUrunOzellikCommandHandler`, `UpdateUrunOzellikCommandHandler`, `IGenericUrunRepository`, `UpdateKategoriCommand`, `CreateAddressCommand`, `ProfileHandlerTests.cs`, `.Handle`, `UserProfileDto`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `ShopApp.Application.Features.Siparis.Dtos`, `Urun`, `UpdateAdminCustomerCommand`, `ShopApp.Application.Features.Sepet.Dtos`, `GetAdminOrdersQueryHandler`, `ShopApp.Application.Features.Authentication.DTOs`, `ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `.For`, `KargoDbContext`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `.Create`, `IShopAppDbContext`, `Address`, `SiparisEntity`, `SepetUrunu`, `.Create`, `SepetEntity`, `SiparisUrunleri`, `Musteri`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _525 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AddressLookupItemDto` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.07957957957957958 - nodes in this community are weakly interconnected._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._