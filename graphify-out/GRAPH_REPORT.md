# Graph Report - ShopApp  (2026-09-09)

## Corpus Check
- 453 files · ~381,083 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2979 nodes · 6153 edges · 191 communities (178 shown, 12 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 541 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `db6fb14b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Domain.Sepet.Entities
- .Delete
- ShopApp.Infrastructure.csproj
- authService.js
- FrontendAGENTS.md
- IEntityTypeConfiguration
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- UpdateSepetCommand
- ShopAppDbContext
- ProductDetailPage.js
- ShopApp.Application.Common.Interfaces
- ShopApp.Infrastructure.Persistence.Migrations
- orderService.js
- appConstants.js
- What You Must Do When Invoked
- SiparisController
- eventBus.js
- .GetRequiredAsync
- CreateUrunCommandHandler
- ResultSepetUrunDto
- productsService.js
- CartPage.js
- UpdateUrunGorselCommandHandler
- CurrentCustomer
- .For
- SepetEntity
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
- ResultSiparisDto
- KargoServis.Domain.Entities
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- StandardizeSepetUrunuQuantityField
- KargoServis.csproj
- UpdateUrunCommandHandler
- KategoriServis.csproj
- StokServis.csproj
- Urun
- AddressDto
- IlkMigrasyon
- UpdateAdminOrderStatusCommand
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- UpdateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
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
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .Olustur
- App.js
- IdentityUserInfo
- ShopApp.Application.Features.Sepet.Dtos
- IRequest
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- src.Monolith.ShopApp.Domain.Siparis.Entities
- StokHareketi
- ShopApp.Application.Mapping
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- UpdateAdminCustomerCommand
- Kategori
- Address
- ShopApp.Application.Features.Siparis.Commands.DeleteSiparis
- IIdentityService
- MakeIdValueGeneratedNever
- Q: How are role-specific customer and admin profiles provisioned?
- AdminProductsPage
- StokUrunleri
- KategoriDbContext
- http
- createHeader
- GetByIdKategoriDto
- AdminCategoriesPage.js
- UrunOzelligi
- .BuildModel
- BaseEntity
- KargoDbContext
- SyncIdentityModels
- homeService.js
- Kategori
- GetAdminOrdersQueryHandler
- GetUrunGorselleriQueryHandler
- createIcon
- RemoveAdminProfileTable
- GetUrunlerQueryHandler
- ShopApp.Application.Features.Authentication.DTOs
- authStore.js
- IdentityUserLoginConfiguration
- ShopApp.Domain.Urun.Entities
- KargoDurumGecmisi
- GetUrunOzellikleriQueryHandler
- KargoGonderisi
- createCategoryMegaMenu
- UrunTur
- KargoDurumu
- KategoriServis.Domain.Entities
- graphify reference: extra exports and benchmark
- .GetMyAddresses
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- ValidationBehavior
- GetUrunTurleriQueryHandler
- AbstractValidator
- Sevkiyat
- TestDbContext
- navigate
- .GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses
- .AddInfrastructure
- .Delete_Throws_WhenItemBelongsToAnotherCustomersCart
- graphify reference: query, path, explain
- GetByIdUrunDto
- CreateAddressCommand
- BaseEntity
- HareketTipi
- GetByIdUrunTurDto
- ShopApp.Application.Tests.csproj
- InitialCreate
- SiparisDurum
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
- InitialCreate
- GetKategorilerQueryHandler
- BaseEntity
- ShopApp Development Notes
- .BuildModel
- ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu
- productData.js
- ShopApp.Application.Features.Urun.Dtos
- Sevkiyat
- Musteri
- AddressHandlerTests.cs
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Features.Urun.Queries
- .GetAll
- KayitliKullanici
- apiClient.js
- .Delete
- .AssertCrudAsync
- UrunTur
- AddMahalleAndConvertPostaKoduToInteger
- CreateUrunTurCommandHandler
- IdentityUserTokenConfiguration
- InfrastructureInitializer
- DeleteUrunOzellikCommandHandler
- RegisterRequest
- CreateUrunOzellikCommandHandler
- UpdateUrunOzellikCommandHandler
- IRequestHandler
- SepetDurum
- IGenericUrunRepository
- CurrentCustomerContext
- SepetUrunu
- UrunOzellik
- .BuildTargetModel
- AuthenticationValidationException
- Header.js
- SepetDurumLookup
- Musteri
- IdentityUserRoleConfiguration
- IDesignTimeDbContextFactory

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 85 edges
2. `createIcon()` - 84 edges
3. `IShopAppDbContext` - 59 edges
4. `ShopAppDbContext` - 48 edges
5. `Urun` - 44 edges
6. `ICurrentCustomerContext` - 41 edges
7. `SiparisEntity` - 40 edges
8. `navigate()` - 34 edges
9. `SepetEntity` - 34 edges
10. `TestDbContext` - 33 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `renderNode()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateQuantity()` --calls--> `formatPrice()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/cart/components/CartItem.js → src/Frontend/ShopApp.Web/src/shared/utils/format.js
- `render()` --calls--> `createButton()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → src/Frontend/ShopApp.Web/src/shared/components/Button/Button.js

## Import Cycles
- None detected.

## Communities (191 total, 12 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.18
Nodes (6): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 1 - ".Delete"
Cohesion: 0.12
Nodes (16): ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult, IMediator (+8 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "authService.js"
Cohesion: 0.31
Nodes (11): establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession(), setAnonymous() (+3 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.12
Nodes (16): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration, EntityTypeBuilder (+8 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.07
Nodes (45): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update() (+37 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "UpdateSepetCommand"
Cohesion: 0.20
Nodes (16): Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, Guid, UpdateSepetCommand, CancellationToken (+8 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.07
Nodes (29): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+21 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.15
Nodes (22): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+14 more)

### Community 11 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.17
Nodes (9): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Common.Interfaces, ShopApp.Infrastructure.Identity.Models, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, ShopApp.Infrastructure.Identity.Settings (+1 more)

### Community 12 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (5): ShopApp.Infrastructure.Persistence.Migrations, DateTime, Guid, MigrationBuilder, AddRoleSpecificProfiles

### Community 13 - "orderService.js"
Cohesion: 0.12
Nodes (8): AdminCustomersPage(), getFilteredCustomers(), renderPage(), renderTable(), getAdminCustomers(), updateCustomerStatus(), apiClient, endpoints

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "SiparisController"
Cohesion: 0.10
Nodes (31): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 19 - ".GetRequiredAsync"
Cohesion: 0.05
Nodes (54): CancellationToken, Task, CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid (+46 more)

### Community 20 - "CreateUrunCommandHandler"
Cohesion: 0.19
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrun, Guid, CreateUrunCommand, CancellationToken, Guid, Kategori, Task, UrunEntity (+2 more)

### Community 21 - "ResultSepetUrunDto"
Cohesion: 0.09
Nodes (34): GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+26 more)

### Community 22 - "productsService.js"
Cohesion: 0.10
Nodes (30): createHeroCategoryGrid(), render(), HomePage(), render(), getHeroCategories(), getSecondaryCategories(), createProductCard(), createProductImage() (+22 more)

### Community 23 - "CartPage.js"
Cohesion: 0.17
Nodes (16): createCartItemRow(), updateQuantity(), CartPage(), getShippingCost(), getSubtotal(), load(), renderItems(), updateSummary() (+8 more)

### Community 24 - "UpdateUrunGorselCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, Guid, UpdateUrunGorselCommand, CancellationToken, Task, UrunGorsel, UpdateUrunGorselCommandHandler, UpdateUrunGorselCommandValidator

### Community 25 - "CurrentCustomer"
Cohesion: 0.24
Nodes (8): Guid, CurrentCustomer, CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Task

### Community 26 - ".For"
Cohesion: 0.28
Nodes (16): Mock, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken (+8 more)

### Community 27 - "SepetEntity"
Cohesion: 0.14
Nodes (19): CancellationToken, Guid, Task, ISepetRepository, Guid, UpdateSepetUrunuCommand, CancellationToken, Task (+11 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.14
Nodes (13): StokServis.Infrastructure.Persistence.Configurations, ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri (+5 more)

### Community 30 - "IdentityService"
Cohesion: 0.16
Nodes (13): IdentityError, IdentityResult, CancellationToken, Guid, IdentityRole, IEnumerable, IHttpContextAccessor, IReadOnlyCollection (+5 more)

### Community 31 - "AuthResponse"
Cohesion: 0.11
Nodes (21): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+13 more)

### Community 32 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 33 - "ResultSiparisDto"
Cohesion: 0.05
Nodes (55): GetMySepetlerQuery, GetMySiparislerQuery, GetSepetQuery, GetSiparisQuery, DateTime, Guid, ResultSepetDto, CancellationToken (+47 more)

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

### Community 39 - "UpdateUrunCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.UpdateUrun, Guid, UpdateUrunCommand, CancellationToken, Kategori, Task, UpdateUrunCommandHandler, UpdateUrunCommandValidator

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 43 - "AddressDto"
Cohesion: 0.21
Nodes (11): ShopApp.Application.Features.Adres.Dtos, CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator, DateTime (+3 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "UpdateAdminOrderStatusCommand"
Cohesion: 0.19
Nodes (13): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact (+5 more)

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

### Community 57 - "adminPages.test.js"
Cohesion: 0.10
Nodes (29): createAdminHeader(), createAdminLayout(), createAdminPageHeader(), createAdminPagination(), createAdminProductCard(), createProductStockBadge(), createAdminProductDetailModal(), close() (+21 more)

### Community 60 - "BaseEntityConfiguration"
Cohesion: 0.12
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+5 more)

### Community 61 - "AdminDashboardPage.js"
Cohesion: 0.29
Nodes (10): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary() (+2 more)

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.09
Nodes (29): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, GetMyProfileQuery, ActionResult, CancellationToken, HttpGet, HttpPut (+21 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Olustur"
Cohesion: 0.11
Nodes (28): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, DeleteSiparisCommand (+20 more)

### Community 67 - "App.js"
Cohesion: 0.39
Nodes (6): initApp(), bootstrap(), createFooter(), TRUST_BADGES, setUnauthorizedHandler(), initStore()

### Community 68 - "IdentityUserInfo"
Cohesion: 0.26
Nodes (7): DateTime, Guid, IdentityUserInfo, Guid, IReadOnlyCollection, Task, AuthService

### Community 69 - "ShopApp.Application.Features.Sepet.Dtos"
Cohesion: 0.09
Nodes (11): ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, ShopApp.Application.Features.Sepet.Dtos, DeleteSepetCommandValidator, DeleteSepetUrunuCommandValidator, Guid (+3 more)

### Community 70 - "IRequest"
Cohesion: 0.09
Nodes (21): IRequest, ICurrentCustomerContext, Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler (+13 more)

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
Cohesion: 0.12
Nodes (9): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Features.Siparis, ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, Guid (+1 more)

### Community 75 - "StokHareketi"
Cohesion: 0.18
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "ShopApp.Application.Mapping"
Cohesion: 0.29
Nodes (5): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping, UrunMapping

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, dev, serve (+2 more)

### Community 78 - "IShopAppDbContext"
Cohesion: 0.09
Nodes (22): CancellationToken, DbSet, Kategori, SiparisUrunleri, Task, Urun, UrunGorsel, UrunOzellik (+14 more)

### Community 79 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 80 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Detay, Fiyat, GecmisFiyat, Gorseller (+8 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.10
Nodes (26): ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, ShopApp.Application.Features.Admin.Customers.Queries, GetAdminCustomersQuery, Guid, UpdateAdminCustomerCommand, CancellationToken, Task (+18 more)

### Community 82 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.20
Nodes (9): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+1 more)

### Community 85 - "IIdentityService"
Cohesion: 0.20
Nodes (9): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+1 more)

### Community 86 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "AdminProductsPage"
Cohesion: 0.22
Nodes (20): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview(), AdminProductsPage() (+12 more)

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
Cohesion: 0.29
Nodes (13): createHeader(), bindCategoryDropdown(), bindEvents(), bindMobileCategories(), destroy(), injectIcons(), populateCategoryDropdown(), populateMobileCategories() (+5 more)

### Community 93 - "GetByIdKategoriDto"
Cohesion: 0.18
Nodes (11): GetKategoriQuery, Guid, List, GetByIdKategoriDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 94 - "AdminCategoriesPage.js"
Cohesion: 0.13
Nodes (28): createAdminConfirmModal(), close(), handleKeydown(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), buildCategoryTree() (+20 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - ".BuildModel"
Cohesion: 0.13
Nodes (11): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateOnly, DateTime (+3 more)

### Community 97 - "BaseEntity"
Cohesion: 0.22
Nodes (8): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi

### Community 98 - "KargoDbContext"
Cohesion: 0.15
Nodes (10): KargoServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri (+2 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "homeService.js"
Cohesion: 0.24
Nodes (6): heroCategories, secondaryCategories, TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API., TODO: Integrate with Catalog/CMS API.

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "GetAdminOrdersQueryHandler"
Cohesion: 0.19
Nodes (12): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List (+4 more)

### Community 103 - "GetUrunGorselleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 104 - "createIcon"
Cohesion: 0.12
Nodes (25): createPlaceholderIcon(), createBoxPlaceholder(), createCategoryTable(), getFilteredData(), render(), createCartSummary(), formatPrice(), update() (+17 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - "GetUrunlerQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunlerQuery, Guid, ResultUrunDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 107 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.10
Nodes (14): ShopApp.Application.Tests.Features.Profil, ShopApp.Application.Features.Authentication.DTOs, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication, AssignRoleRequest, Role, List (+6 more)

### Community 108 - "authStore.js"
Cohesion: 0.25
Nodes (9): AUTH_STATUS, clearError(), initialState, merge(), notify(), setError(), setLoading(), state (+1 more)

### Community 109 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 110 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.08
Nodes (15): ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, ShopApp.Domain.Urun.Entities, ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.CreateKategori, ShopApp.Application.Tests.Features.Urun, src.Monolith.ShopApp.Domain.Common, Guid (+7 more)

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 112 - "GetUrunOzellikleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunOzellikleriQuery, Guid, ResultUrunOzellikDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "createCategoryMegaMenu"
Cohesion: 0.21
Nodes (8): createCategoryCard(), createCategoryGrid(), createCategoryMegaMenu(), render(), update(), normalizeCategories(), slugify(), mockCategories

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

### Community 119 - ".GetMyAddresses"
Cohesion: 0.20
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 122 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable (+4 more)

### Community 123 - "GetUrunTurleriQueryHandler"
Cohesion: 0.20
Nodes (11): GetUrunTurleriQuery, Guid, ResultUrunTurDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.17
Nodes (11): AbstractValidator, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, DeleteSiparisUrunuCommandValidator, UpdateSiparisCommandValidator (+3 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "TestDbContext"
Cohesion: 0.10
Nodes (21): Fact, Task, DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik (+13 more)

### Community 127 - "navigate"
Cohesion: 0.10
Nodes (24): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, routes (+16 more)

### Community 128 - ".GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses"
Cohesion: 0.36
Nodes (7): GetMyAddressesQuery, CancellationToken, List, Task, GetMyAddresses, GetMyAddressesQuery, GetMyAddressesQueryHandler

### Community 129 - ".AddInfrastructure"
Cohesion: 0.11
Nodes (17): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+9 more)

### Community 130 - ".Delete_Throws_WhenItemBelongsToAnotherCustomersCart"
Cohesion: 0.39
Nodes (5): Guid, DeleteSepetUrunuCommand, CancellationToken, Task, DeleteSepetUrunuCommandHandler

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "GetByIdUrunDto"
Cohesion: 0.18
Nodes (11): GetUrunQuery, Guid, List, GetByIdUrunDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 133 - "CreateAddressCommand"
Cohesion: 0.33
Nodes (7): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, Fact, AddressHandlerTests

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "GetByIdUrunTurDto"
Cohesion: 0.18
Nodes (11): GetUrunTurQuery, Guid, List, GetByIdUrunTurDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 139 - "SiparisDurum"
Cohesion: 0.10
Nodes (12): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis, SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor (+4 more)

### Community 140 - "UpdateUrunTurCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.UpdateUrunTur, Guid, UpdateUrunTurCommand, CancellationToken, Task, UrunTur, UpdateUrunTurCommandHandler, UpdateUrunTurCommandValidator

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
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, Guid, CreateUrunGorselCommand, CancellationToken, Guid, Task, UrunGorsel, CreateUrunGorselCommandHandler (+1 more)

### Community 150 - "InitialCreate"
Cohesion: 0.12
Nodes (12): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate (+4 more)

### Community 151 - "GetKategorilerQueryHandler"
Cohesion: 0.22
Nodes (10): GetKategorilerQuery, Guid, ResultKategoriDto, CancellationToken, IMapper, List, Task, GetKategoriler (+2 more)

### Community 152 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.13
Nodes (14): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+6 more)

### Community 154 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

### Community 156 - "productData.js"
Cohesion: 0.29
Nodes (4): demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 157 - "ShopApp.Application.Features.Urun.Dtos"
Cohesion: 0.19
Nodes (11): ShopApp.Application.Features.Urun.Dtos, GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 158 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 159 - "Musteri"
Cohesion: 0.40
Nodes (4): Guid, Musteri, Cinsiyet, KullaniciId

### Community 160 - "AddressHandlerTests.cs"
Cohesion: 0.43
Nodes (5): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.19
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.11
Nodes (32): createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml(), formatTurkishPhone() (+24 more)

### Community 163 - "ShopApp.Application.Features.Urun.Queries"
Cohesion: 0.17
Nodes (12): ControllerBase, ShopApp.Application.Features.Urun.Queries, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+4 more)

### Community 164 - ".GetAll"
Cohesion: 0.39
Nodes (6): ActionResult, CancellationToken, Guid, HttpGet, List, Task

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 166 - "apiClient.js"
Cohesion: 0.21
Nodes (7): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 167 - ".Delete"
Cohesion: 0.12
Nodes (16): ShopApp.Application.Features.Urun.Commands.DeleteUrun, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult, IMediator (+8 more)

### Community 168 - ".AssertCrudAsync"
Cohesion: 0.38
Nodes (5): GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 169 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAded (+3 more)

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "CreateUrunTurCommandHandler"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunTur, Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler (+1 more)

### Community 172 - "IdentityUserTokenConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

### Community 173 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

### Community 174 - "DeleteUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 175 - "RegisterRequest"
Cohesion: 0.33
Nodes (5): RegisterRequest, Ad, Email, Sifre, Soyad

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.24
Nodes (9): Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur, CreateUrunOzellikCommandHandler (+1 more)

### Community 177 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, UpdateUrunOzellikCommandHandler (+1 more)

### Community 178 - "IRequestHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, IRequestHandler, Guid, DeleteUrunGorselCommand, CancellationToken, Task, UrunGorsel, DeleteUrunGorselCommandHandler (+1 more)

### Community 179 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.13
Nodes (14): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, DeleteUrunTurCommand, CancellationToken (+6 more)

### Community 181 - "CurrentCustomerContext"
Cohesion: 0.40
Nodes (4): CancellationToken, IHttpContextAccessor, Task, CurrentCustomerContext

### Community 182 - "SepetUrunu"
Cohesion: 0.17
Nodes (8): Guid, Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

### Community 183 - "UrunOzellik"
Cohesion: 0.29
Nodes (7): Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTurId, EntityTypeBuilder, UrunOzellikConfiguration

### Community 184 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 185 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 186 - "Header.js"
Cohesion: 0.21
Nodes (11): subscribe(), subscribeCategories(), navItems, getState(), initialState, notify(), resetStore(), setState() (+3 more)

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 188 - "Musteri"
Cohesion: 0.67
Nodes (3): Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 191 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

## Knowledge Gaps
- **521 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+516 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1166 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `.GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses`, `.Delete`, `.AddInfrastructure`, `GetByIdUrunDto`, `CreateAddressCommand`, `GetByIdUrunTurDto`, `ShopAppDbContext`, `ShopApp.Application.Common.Interfaces`, `SiparisController`, `.GetRequiredAsync`, `ResultSepetUrunDto`, `GetKategorilerQueryHandler`, `CurrentCustomer`, `.For`, `SepetEntity`, `ShopApp.Application.Features.Urun.Dtos`, `ResultSiparisDto`, `GetUrunOzellikQueryHandler`, `AddressDto`, `UpdateAdminOrderStatusCommand`, `SepetUrunu`, `Musteri`, `.Olustur`, `UpdateAdminCustomerCommand`, `Address`, `GetByIdKategoriDto`, `GetAdminOrdersQueryHandler`, `GetUrunGorselleriQueryHandler`, `GetUrunlerQueryHandler`, `GetUrunOzellikleriQueryHandler`, `GetUrunTurleriQueryHandler`, `TestDbContext`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ResultSiparisDto`, `.Olustur`, `KargoDbContext`, `UpdateAdminOrderStatusCommand`, `IShopAppDbContext`, `Address`, `.GetRequiredAsync`, `SepetUrunu`, `.For`, `SepetEntity`, `Musteri`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Application.Common.Interfaces` to `IDesignTimeDbContextFactory`, `Migration`, `.BuildModel`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `RemoveAdminProfileTable`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Infrastructure.Persistence.Migrations`, `ShopApp.Domain.Urun.Entities`, `RebuildAllEntitySchema`, `UpdateMonolithTables`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `MakeIdValueGeneratedNever`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _521 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `.Delete` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.11857707509881422 - nodes in this community are weakly interconnected._