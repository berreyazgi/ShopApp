# Graph Report - ShopApp  (2026-09-09)

## Corpus Check
- 460 files · ~391,198 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3049 nodes · 6425 edges · 188 communities (176 shown, 11 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 586 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `930830b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- createButton
- .Handle
- ShopApp.Infrastructure.csproj
- ResultSepetDto
- FrontendAGENTS.md
- IdentityRoleClaimConfiguration
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- UpdateSepetCommand
- ShopAppDbContext
- ProductDetailPage.js
- ShopApp.Domain.Urun.Entities
- ShopApp.Infrastructure.Persistence.Migrations
- authService.js
- appConstants.js
- What You Must Do When Invoked
- ResultSiparisUrunleriDto
- eventBus.js
- SiparisEntity
- .AddAsync
- ResultSepetUrunDto
- createLoadingState
- CartPage.js
- UpdateUrunGorselCommandHandler
- .Create
- .For
- SepetEntity
- What You Must Do When Invoked
- Depo
- IdentityService
- AuthResponse
- Migration
- GetSiparisQueryHandler
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
- registerValidation.js
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .Handle
- IRequest
- SiparisController
- src.Monolith.ShopApp.Domain.Sepet.Entities
- IRequestHandler
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
- SepetUrunuCommandHandlerTests.cs
- IIdentityService
- MakeIdValueGeneratedNever
- Q: How are role-specific customer and admin profiles provisioned?
- productsService.js
- StokUrunleri
- KategoriDbContext
- http
- navigate
- ControllerBase
- AdminCategoriesPage.js
- UrunOzelligi
- InitialCreate
- BaseEntity
- KargoDbContext
- SyncIdentityModels
- App.js
- Kategori
- GetAdminOrdersQueryHandler
- GetUrunGorselleriQueryHandler
- createIcon
- RemoveAdminProfileTable
- SiparisUrunleri
- ShopApp.Application.Features.Authentication.DTOs
- AdminDashboardPage.js
- createHeader
- UrunGorsel
- KargoDurumGecmisi
- ResultUrunOzellikDto
- KargoGonderisi
- createCategoryMegaMenu
- UrunTur
- KargoDurumu
- IEntityTypeConfiguration
- graphify reference: extra exports and benchmark
- .Handle
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- routes.js
- ResultSiparisDto
- AbstractValidator
- Sevkiyat
- TestDbContext
- OrderConfirmationPage.js
- GetByIdUrunTurDto
- .AddInfrastructure
- AuthRequest
- graphify reference: query, path, explain
- DeleteUrunCommand
- KategoriServis.Domain.Entities
- BaseEntity
- HareketTipi
- GetMySepetlerQueryHandler
- ShopApp.Application.Tests.csproj
- InitialCreate
- ShopApp.Infrastructure.Persistence.Configurations.Urun
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
- createAdminProductFormModal
- .BuildModel
- BaseEntity
- ShopApp Development Notes
- BaseEntity
- DeleteUrunTurCommandHandler
- productData.js
- GetUrunGorselQueryHandler
- Sevkiyat
- Musteri
- src.Monolith.ShopApp.Domain.Kullanici
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Common.Interfaces
- StokUrunleri
- KayitliKullanici
- IdentityUserLoginConfiguration
- .Create
- GenericUrunRepository
- UrunTur
- AddMahalleAndConvertPostaKoduToInteger
- CreateUrunTurCommandHandler
- RegisterRequest
- InfrastructureInitializer
- DeleteUrunOzellikCommandHandler
- IdentityUserClaimConfiguration
- CreateUrunOzellikCommandHandler
- UpdateUrunOzellikCommandHandler
- IdentityRoleConfiguration
- createConfirmModal
- IGenericUrunRepository
- ShopAppDbContextFactory
- SepetUrunu
- .OnModelCreating
- .BuildTargetModel
- AuthenticationValidationException
- SepetDurumLookup
- ShopApp.Infrastructure.Persistence.Configurations.Identity

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

## Communities (188 total, 11 thin omitted)

### Community 0 - "createButton"
Cohesion: 0.13
Nodes (16): createAdminConfirmModal(), close(), handleKeydown(), createAdminPageHeader(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm() (+8 more)

### Community 1 - ".Handle"
Cohesion: 0.08
Nodes (24): ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut, IActionResult (+16 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "ResultSepetDto"
Cohesion: 0.17
Nodes (16): GetSepetQuery, DateTime, Guid, ResultSepetDto, CancellationToken, Guid, IMapper, Task (+8 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 6 - "LoginPage.js"
Cohesion: 0.07
Nodes (25): createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), reset(), update(), createSocialLoginButtons() (+17 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "UpdateSepetCommand"
Cohesion: 0.20
Nodes (16): Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, Guid, UpdateSepetCommand, CancellationToken (+8 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.07
Nodes (28): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, SiparisUrunleri, Urun, UrunGorsel (+20 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.15
Nodes (22): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+14 more)

### Community 11 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.14
Nodes (8): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Domain.Urun.Entities, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Tests.Features.Urun, src.Monolith.ShopApp.Domain.Common, ShopApp.Infrastructure.Persistence.Repositories, ShopApp.Application.Features.Urun.Commands.UpdateUrun

### Community 12 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (5): ShopApp.Infrastructure.Persistence.Migrations, DateTime, Guid, MigrationBuilder, AddRoleSpecificProfiles

### Community 13 - "authService.js"
Cohesion: 0.09
Nodes (21): appConfig, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), setAuthenticated() (+13 more)

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "ResultSiparisUrunleriDto"
Cohesion: 0.13
Nodes (19): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, Guid, ResultSiparisUrunleriDto, CancellationToken, Guid, IMapper, List (+11 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.08
Nodes (39): CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler (+31 more)

### Community 20 - ".AddAsync"
Cohesion: 0.17
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrun, Guid, CreateUrunCommand, CancellationToken, Guid, Kategori, Task, UrunEntity (+2 more)

### Community 21 - "ResultSepetUrunDto"
Cohesion: 0.13
Nodes (19): GetSepetUrunleriQuery, GetSepetUrunuQuery, Guid, List, ResultSepetUrunDto, ToplamTutar, CancellationToken, Guid (+11 more)

### Community 22 - "createLoadingState"
Cohesion: 0.09
Nodes (27): createHeroCategoryGrid(), render(), heroCategories, secondaryCategories, HomePage(), render(), getHeroCategories(), getSecondaryCategories() (+19 more)

### Community 23 - "CartPage.js"
Cohesion: 0.17
Nodes (16): createCartItemRow(), updateQuantity(), CartPage(), getShippingCost(), getSubtotal(), load(), renderItems(), updateSummary() (+8 more)

### Community 24 - "UpdateUrunGorselCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, Guid, UpdateUrunGorselCommand, CancellationToken, Task, UrunGorsel, UpdateUrunGorselCommandHandler, UpdateUrunGorselCommandValidator

### Community 25 - ".Create"
Cohesion: 0.09
Nodes (35): ShopApp.Application.Features.Adres.Dtos, GetMyAddressesQuery, Guid, CurrentCustomer, CancellationToken, Task, CancellationToken, Task (+27 more)

### Community 26 - ".For"
Cohesion: 0.27
Nodes (16): Mock, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken (+8 more)

### Community 27 - "SepetEntity"
Cohesion: 0.14
Nodes (19): CancellationToken, Guid, Task, ISepetRepository, Guid, UpdateSepetUrunuCommand, CancellationToken, Task (+11 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.20
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.14
Nodes (16): IdentityError, IdentityResult, DateTime, Guid, IdentityUserInfo, CancellationToken, Guid, IdentityRole (+8 more)

### Community 31 - "AuthResponse"
Cohesion: 0.09
Nodes (25): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+17 more)

### Community 32 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 33 - "GetSiparisQueryHandler"
Cohesion: 0.22
Nodes (13): GetSiparisQuery, CancellationToken, Guid, IMapper, Task, GetSiparis, GetSiparisQuery, Id (+5 more)

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
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "UpdateAdminOrderStatusCommand"
Cohesion: 0.08
Nodes (28): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken (+20 more)

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
Cohesion: 0.12
Nodes (28): createAdminLayout(), createAdminPagination(), createAdminProductCard(), createProductStockBadge(), createAdminProductDetailModal(), close(), handleKeydown(), createAdminProductGrid() (+20 more)

### Community 60 - "BaseEntityConfiguration"
Cohesion: 0.13
Nodes (11): ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, SepetUrunuConfiguration, EntityTypeBuilder (+3 more)

### Community 61 - "registerValidation.js"
Cohesion: 0.27
Nodes (20): RFC-5322, NOTE: This is a UX helper only., validateConfirmPassword(), validateEmail(), validateFirstName(), validateLastName(), validatePassword(), validateRegisterField() (+12 more)

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.09
Nodes (29): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, GetMyProfileQuery, ActionResult, CancellationToken, HttpGet, HttpPut (+21 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Handle"
Cohesion: 0.14
Nodes (23): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, DeleteSiparisCommand (+15 more)

### Community 67 - "IRequest"
Cohesion: 0.15
Nodes (9): IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid, GetByIdSiparisDto, Guid (+1 more)

### Community 68 - "SiparisController"
Cohesion: 0.26
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.08
Nodes (16): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet (+8 more)

### Community 70 - "IRequestHandler"
Cohesion: 0.11
Nodes (17): IRequestHandler, CancellationToken, Task, ICurrentCustomerContext, Guid, CreateSepetCommand, CancellationToken, Guid (+9 more)

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.20
Nodes (8): DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri, StokDbContextFactory

### Community 74 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.07
Nodes (18): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Features.Siparis, ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu (+10 more)

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
Cohesion: 0.10
Nodes (20): DbSet, Kategori, SiparisUrunleri, Urun, UrunGorsel, UrunOzellik, UrunTur, IShopAppDbContext (+12 more)

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
Cohesion: 0.14
Nodes (12): ShopApp.Infrastructure.Persistence.Configurations.Kullanici, Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu (+4 more)

### Community 84 - "SepetUrunuCommandHandlerTests.cs"
Cohesion: 0.10
Nodes (7): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, DeleteSepetUrunuCommandValidator, UpdateSepetUrunuCommandValidator

### Community 85 - "IIdentityService"
Cohesion: 0.21
Nodes (9): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+1 more)

### Community 86 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "productsService.js"
Cohesion: 0.14
Nodes (27): AdminProductsPage(), closeActiveModal(), enrichWithCategoryNames(), getFilteredAndSortedProducts(), handleSaveProduct(), loadData(), openCreateModal(), openDeleteModal() (+19 more)

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
Cohesion: 0.13
Nodes (26): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, createAdminHeader() (+18 more)

### Community 93 - "ControllerBase"
Cohesion: 0.06
Nodes (42): ControllerBase, GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet (+34 more)

### Community 94 - "AdminCategoriesPage.js"
Cohesion: 0.17
Nodes (21): buildCategoryTree(), createCategoryTree(), renderNode(), createRecentCategoriesCard(), AdminCategoriesPage(), renderPage(), addCategory(), attachParentNames() (+13 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.18
Nodes (10): Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder, UrunOzelligiConfiguration (+2 more)

### Community 96 - "InitialCreate"
Cohesion: 0.07
Nodes (22): KategoriServis.Migrations, ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime (+14 more)

### Community 97 - "BaseEntity"
Cohesion: 0.22
Nodes (8): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi

### Community 98 - "KargoDbContext"
Cohesion: 0.14
Nodes (11): KargoServis.Infrastructure.Persistence, DbContext, IDesignTimeDbContextFactory, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri (+3 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "App.js"
Cohesion: 0.18
Nodes (14): initApp(), bootstrap(), createFooter(), TRUST_BADGES, setUnauthorizedHandler(), getState(), initialState, initStore() (+6 more)

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "GetAdminOrdersQueryHandler"
Cohesion: 0.10
Nodes (23): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, GetAdminOrdersQuery, GetUrunTurleriQuery, DateTime, Guid, AdminOrderDto, CancellationToken (+15 more)

### Community 103 - "GetUrunGorselleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 104 - "createIcon"
Cohesion: 0.13
Nodes (23): createPlaceholderIcon(), createBoxPlaceholder(), createCartSummary(), formatPrice(), update(), benefits, createFeatureBenefits(), render() (+15 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - "SiparisUrunleri"
Cohesion: 0.13
Nodes (13): Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat, UrunAciklamasi (+5 more)

### Community 107 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.13
Nodes (7): ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Tests.Features.Profil, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Authentication.DTOs, ShopApp.Application.Features.Authentication.Services, AssignRoleRequest, Role

### Community 108 - "AdminDashboardPage.js"
Cohesion: 0.29
Nodes (10): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary() (+2 more)

### Community 109 - "createHeader"
Cohesion: 0.26
Nodes (13): subscribeCategories(), createHeader(), bindCategoryDropdown(), bindEvents(), bindMobileCategories(), destroy(), injectIcons(), populateCategoryDropdown() (+5 more)

### Community 110 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 112 - "ResultUrunOzellikDto"
Cohesion: 0.22
Nodes (11): GetUrunOzellikleriQuery, Guid, ResultUrunOzellikDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "createCategoryMegaMenu"
Cohesion: 0.26
Nodes (6): createCategoryMegaMenu(), render(), update(), normalizeCategories(), slugify(), mockCategories

### Community 115 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 117 - "IEntityTypeConfiguration"
Cohesion: 0.22
Nodes (9): IEntityTypeConfiguration, Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId, EntityTypeBuilder (+1 more)

### Community 118 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 119 - ".Handle"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateKategori, Guid, CreateKategoriCommand, CancellationToken, Guid, Kategori, Task, CreateKategoriCommandHandler (+1 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.32
Nodes (3): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common

### Community 121 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 122 - "routes.js"
Cohesion: 0.27
Nodes (3): routes, AboutPage(), render()

### Community 123 - "ResultSiparisDto"
Cohesion: 0.22
Nodes (11): GetMySiparislerQuery, DateTime, Guid, ResultSiparisDto, CancellationToken, IMapper, List, Task (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.13
Nodes (13): AbstractValidator, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, DeleteSiparisCommandValidator, DeleteSiparisUrunuCommandValidator (+5 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "TestDbContext"
Cohesion: 0.08
Nodes (26): tur, urun, UrunEntity, UrunTur, Fact, Task, DbContextOptions, DbSet (+18 more)

### Community 127 - "OrderConfirmationPage.js"
Cohesion: 0.16
Nodes (16): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+8 more)

### Community 128 - "GetByIdUrunTurDto"
Cohesion: 0.19
Nodes (11): GetUrunTurQuery, Guid, List, GetByIdUrunTurDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 129 - ".AddInfrastructure"
Cohesion: 0.10
Nodes (19): IConfiguration, IOptions, IEnumerable, IJwtTokenGenerator, DateTime, JwtToken, Guid, IdentityRole (+11 more)

### Community 130 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "DeleteUrunCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Urun.Commands.DeleteUrun, Guid, DeleteUrunCommand, CancellationToken, Task, DeleteUrunCommandHandler, DeleteUrunCommandValidator

### Community 133 - "KategoriServis.Domain.Entities"
Cohesion: 0.31
Nodes (3): KategoriServis.Domain.Entities, KategoriServis.Domain.Common, KategoriServis.Infrastructure.Persistence.Configurations

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "GetMySepetlerQueryHandler"
Cohesion: 0.31
Nodes (8): GetMySepetlerQuery, CancellationToken, IMapper, List, Task, GetMySepetler, GetMySepetlerQuery, GetMySepetlerQueryHandler

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.14
Nodes (9): StokServis.Infrastructure.Persistence, StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder (+1 more)

### Community 139 - "ShopApp.Infrastructure.Persistence.Configurations.Urun"
Cohesion: 0.33
Nodes (4): ShopApp.Infrastructure.Persistence.Configurations.Urun, UrunTur, EntityTypeBuilder, UrunTurConfiguration

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

### Community 150 - "createAdminProductFormModal"
Cohesion: 0.48
Nodes (7): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview()

### Community 151 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

### Community 152 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

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

### Community 158 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 159 - "Musteri"
Cohesion: 0.24
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 160 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.19
Nodes (8): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Infrastructure.Identity.Models, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Application.Features.Authentication

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.09
Nodes (34): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+26 more)

### Community 163 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.26
Nodes (4): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers

### Community 164 - "StokUrunleri"
Cohesion: 0.40
Nodes (4): StokServis.Infrastructure.Persistence.Configurations, StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 167 - ".Create"
Cohesion: 0.06
Nodes (52): active, GetUrunlerQuery, GetUrunQuery, passive, ActionResult, CancellationToken, Guid, HttpDelete (+44 more)

### Community 168 - "GenericUrunRepository"
Cohesion: 0.38
Nodes (5): GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 169 - "UrunTur"
Cohesion: 0.11
Nodes (18): Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTurId, Guid, ICollection, UrunTur (+10 more)

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "CreateUrunTurCommandHandler"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunTur, Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler (+1 more)

### Community 172 - "RegisterRequest"
Cohesion: 0.33
Nodes (5): RegisterRequest, Ad, Email, Sifre, Soyad

### Community 173 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

### Community 174 - "DeleteUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 175 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.20
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur (+2 more)

### Community 177 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, UpdateUrunOzellikCommandHandler (+1 more)

### Community 178 - "IdentityRoleConfiguration"
Cohesion: 0.47
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 179 - "createConfirmModal"
Cohesion: 0.73
Nodes (6): createConfirmModal(), close(), handleBackdropClick(), handleCancel(), handleConfirm(), handleKeydown()

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.16
Nodes (12): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, DeleteUrunGorselCommand, CancellationToken (+4 more)

### Community 182 - "SepetUrunu"
Cohesion: 0.17
Nodes (8): Guid, Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

### Community 184 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

### Community 185 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 191 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.21
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserRole, IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration, EntityTypeBuilder, Guid (+1 more)

## Knowledge Gaps
- **523 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+518 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1181 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `GetByIdUrunTurDto`, `.Handle`, `.AddInfrastructure`, `ResultSepetDto`, `GetMySepetlerQueryHandler`, `ShopAppDbContext`, `ResultSiparisUrunleriDto`, `SiparisEntity`, `ResultSepetUrunDto`, `.Create`, `.For`, `SepetEntity`, `GetUrunGorselQueryHandler`, `Musteri`, `src.Monolith.ShopApp.Domain.Kullanici`, `GetSiparisQueryHandler`, `GetUrunOzellikQueryHandler`, `.Create`, `UpdateAdminOrderStatusCommand`, `SepetUrunu`, `.Handle`, `UpdateAdminCustomerCommand`, `Address`, `ControllerBase`, `GetAdminOrdersQueryHandler`, `GetUrunGorselleriQueryHandler`, `ResultUrunOzellikDto`, `ResultSiparisDto`, `TestDbContext`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `KargoDbContext`, `.Create`, `SiparisUrunleri`, `ShopApp.Application.Features.Authentication.DTOs`, `UpdateAdminOrderStatusCommand`, `IShopAppDbContext`, `Address`, `SiparisEntity`, `SepetUrunu`, `.Create`, `.For`, `SepetEntity`, `Musteri`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Domain.Urun.Entities` to `src.Monolith.ShopApp.Domain.Kullanici`, `Migration`, `InitialCreate`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `RemoveAdminProfileTable`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Infrastructure.Persistence.Migrations`, `RebuildAllEntitySchema`, `UpdateMonolithTables`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `ShopAppDbContextFactory`, `MakeIdValueGeneratedNever`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _523 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `createButton` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._
- **Should `FrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._