# Graph Report - ShopApp  (2026-09-10)

## Corpus Check
- 488 files · ~403,918 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3376 nodes · 7170 edges · 195 communities (182 shown, 12 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 647 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8e9cc874`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Api.Controllers
- .Handle
- ShopApp.Infrastructure.csproj
- CartPage.js
- FrontendAGENTS.md
- IdentityRoleClaimConfiguration
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
- SiparisEntity
- .Handle
- SiparisUrunleri
- productsService.js
- SepetUrunu
- CurrentCustomer
- registerValidation.js
- .For
- SepetEntity
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
- UpdateUrunCommandHandler
- KategoriServis.csproj
- StokServis.csproj
- Urun
- ResultSepetUrunDto
- IlkMigrasyon
- UpdateAdminOrderStatusCommand
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
- BaseEntityConfiguration
- ShopApp.Domain.Urun.Entities
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .Create
- IRequest
- UrunTur
- src.Monolith.ShopApp.Domain.Siparis.Entities
- CurrentCustomerContext
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- ResultSepetDto
- StokHareketi
- orderService.js
- src/Frontend/ShopApp.Web/package.json
- IShopAppDbContext
- RebuildAllEntitySchema
- Urun
- UpdateAdminCustomerCommand
- Kategori
- Address
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
- BaseEntity
- InitialCreate
- .Olustur
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
- CreateUrunCommand
- createAuthForm
- .GetAll
- GetByIdUrunDto
- UpdateUrunCommand
- KargoGonderisi
- ResultUrunDto
- UrunTur
- KargoDurumu
- KategoriServis.Domain.Entities
- graphify reference: extra exports and benchmark
- UserAddressesController
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- .Handle
- .GetCurrentKullaniciIdAsync
- AbstractValidator
- BaseEntity
- GetUrunTurleriQueryHandler
- OrderConfirmationPage.js
- createConfirmModal
- .AddInfrastructure
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- graphify reference: query, path, explain
- CreateAddressCommand
- .GetBySiparisId
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
- serviceRegistry.js
- AdminDashboardDto
- .DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- ShopApp Development Notes
- .UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- DeleteUrunTurCommandHandler
- productData.js
- GetByIdUrunGorselDto
- AddProductMultiImageSupport
- Musteri
- UpdateUrunOzellikCommandHandler
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
- IEntityTypeConfiguration
- SiparisDurumLookup
- DeleteUrunOzellikCommand
- .GetAll
- CreateUrunOzellikCommandHandler
- AddressHandlerTests.cs
- InfrastructureInitializer
- .Create
- IGenericUrunRepository
- .BuildModel
- IdentityUserRoleConfiguration
- AddAddressPhone
- SepetDurum
- createCategoryFormPanel
- ProductDto
- SepetDurumLookup
- IDesignTimeDbContextFactory
- AddressDto
- StokUrunleri
- .OnModelCreating
- SiparisDurum
- .BuildModel
- .BuildModel

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 95 edges
2. `createIcon()` - 86 edges
3. `IShopAppDbContext` - 63 edges
4. `Urun` - 53 edges
5. `ShopAppDbContext` - 51 edges
6. `ICurrentCustomerContext` - 42 edges
7. `SiparisEntity` - 41 edges
8. `navigate()` - 39 edges
9. `TestDbContext` - 38 edges
10. `SepetEntity` - 34 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
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

## Communities (195 total, 12 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Api.Controllers"
Cohesion: 0.07
Nodes (31): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior (+23 more)

### Community 1 - ".Handle"
Cohesion: 0.07
Nodes (29): ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.CreateKategori, ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut (+21 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.17
Nodes (11): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.Extensions.Http (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

### Community 3 - "CartPage.js"
Cohesion: 0.13
Nodes (21): createCartSummary(), formatPrice(), update(), CartPage(), getShippingCost(), getSubtotal(), handleCheckout(), handleTemporaryCheckout() (+13 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 6 - "LoginPage.js"
Cohesion: 0.13
Nodes (9): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, LoginPage(), RegisterPage() (+1 more)

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
Cohesion: 0.17
Nodes (21): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+13 more)

### Community 11 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.08
Nodes (15): ShopApp.Infrastructure.Identity.Services, ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Tests.Features.Profil, ShopApp.Infrastructure.Kargo, ShopApp.Application.Features.Authentication.DTOs, src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Features.Authentication.Services (+7 more)

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "authService.js"
Cohesion: 0.15
Nodes (17): establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), setAnonymous(), setAuthenticated() (+9 more)

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 17 - "TestDbContext"
Cohesion: 0.12
Nodes (16): DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik, UrunTur, TestDbContext (+8 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.13
Nodes (16): Guid, ICollection, SiparisEntity, AraToplam, Durum, DurumId, IndirimTutari, KargoFiyat (+8 more)

### Community 20 - ".Handle"
Cohesion: 0.18
Nodes (12): UrunGorsel, CancellationToken, Guid, Kategori, Task, UrunEntity, CreateUrunCommandHandler, Fact (+4 more)

### Community 21 - "SiparisUrunleri"
Cohesion: 0.14
Nodes (13): Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat, UrunAciklamasi (+5 more)

### Community 22 - "productsService.js"
Cohesion: 0.08
Nodes (38): load(), enrichWithCategoryNames(), handleSaveProduct(), loadData(), createHeroCategoryGrid(), render(), HomePage(), render() (+30 more)

### Community 23 - "SepetUrunu"
Cohesion: 0.11
Nodes (15): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+7 more)

### Community 24 - "CurrentCustomer"
Cohesion: 0.13
Nodes (24): CurrentCustomer, CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task (+16 more)

### Community 25 - "registerValidation.js"
Cohesion: 0.20
Nodes (26): RFC-5322, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only. (+18 more)

### Community 26 - ".For"
Cohesion: 0.19
Nodes (21): Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, Guid, DeleteSepetUrunuCommand (+13 more)

### Community 27 - "SepetEntity"
Cohesion: 0.17
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.22
Nodes (9): ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.16
Nodes (13): IdentityError, IdentityResult, CancellationToken, Guid, IdentityRole, IEnumerable, IHttpContextAccessor, IReadOnlyCollection (+5 more)

### Community 31 - "AuthResponse"
Cohesion: 0.08
Nodes (26): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+18 more)

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

### Community 39 - "UpdateUrunCommandHandler"
Cohesion: 0.24
Nodes (11): CancellationToken, Kategori, Task, UpdateUrunCommandHandler, Fact, Task, tur, urun (+3 more)

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
Cohesion: 0.17
Nodes (9): DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid, ModelBuilder (+1 more)

### Community 45 - "UpdateAdminOrderStatusCommand"
Cohesion: 0.19
Nodes (13): ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus, Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact (+5 more)

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
Cohesion: 0.06
Nodes (67): createAdminConfirmModal(), close(), handleKeydown(), createAdminLayout(), createAdminMetricCard(), createAdminOrderDetailModal(), close(), handleKeydown() (+59 more)

### Community 60 - "BaseEntityConfiguration"
Cohesion: 0.18
Nodes (8): EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, EntityTypeBuilder, SiparisConfiguration, EntityTypeBuilder

### Community 61 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.09
Nodes (12): ShopApp.Application.Features.Urun.Commands.UpdateUrunTur, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Urun.Commands.CreateUrun, ShopApp.Application.Mapping, ShopApp.Domain.Urun.Entities, ShopApp.Application.Tests.Features.Urun, src.Monolith.ShopApp.Domain.Common (+4 more)

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.09
Nodes (29): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, GetMyProfileQuery, ActionResult, CancellationToken, HttpGet, HttpPut (+21 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Create"
Cohesion: 0.12
Nodes (27): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Guid, DeleteSiparisCommand (+19 more)

### Community 67 - "IRequest"
Cohesion: 0.08
Nodes (27): GetMySiparislerQuery, IRequest, IRequestHandler, ICurrentCustomerContext, Guid, CreateSepetCommand, CancellationToken, Guid (+19 more)

### Community 68 - "UrunTur"
Cohesion: 0.08
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur, UrunTurId, Guid (+14 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.07
Nodes (15): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Features.Siparis, ShopApp.Infrastructure.Persistence.Configurations.Common (+7 more)

### Community 70 - "CurrentCustomerContext"
Cohesion: 0.43
Nodes (5): CancellationToken, Guid, IHttpContextAccessor, Task, CurrentCustomerContext

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.15
Nodes (10): StokServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri (+2 more)

### Community 74 - "ResultSepetDto"
Cohesion: 0.12
Nodes (24): GetMySepetlerQuery, GetSepetQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List (+16 more)

### Community 75 - "StokHareketi"
Cohesion: 0.20
Nodes (10): HareketTipi, Guid, StokHareketi, Aciklama, HareketTipi, Miktar, ReferansId, StokKalemiId (+2 more)

### Community 76 - "orderService.js"
Cohesion: 0.11
Nodes (19): AdminOrdersPage(), closeActiveModal(), destroy(), getFilteredOrders(), getStatusId(), openDetailModal(), renderPage(), renderTable() (+11 more)

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
Cohesion: 0.07
Nodes (26): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, ShopApp.Application.Features.Urun.Commands.CreateUrunTur, CreateUrunTurCommandValidator, Guid, DeleteUrunGorselCommand, UrunGorsel, DeleteUrunGorselCommandHandler, DeleteUrunGorselCommandValidator (+18 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.07
Nodes (38): ControllerBase, ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, ShopApp.Application.Features.Admin.Customers.Queries, GetAdminCustomersQuery, ActionResult, CancellationToken, Guid (+30 more)

### Community 82 - "Kategori"
Cohesion: 0.13
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.18
Nodes (10): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+2 more)

### Community 84 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.06
Nodes (18): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu (+10 more)

### Community 85 - "IIdentityService"
Cohesion: 0.13
Nodes (16): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+8 more)

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
Cohesion: 0.05
Nodes (56): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+48 more)

### Community 93 - ".GetAll"
Cohesion: 0.08
Nodes (29): GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+21 more)

### Community 94 - "categoryService.js"
Cohesion: 0.11
Nodes (22): addCategory(), attachParentNames(), categories, deleteCategory(), fileToDataUrl(), getCategories(), getCategoryById(), mapFromBackend() (+14 more)

### Community 95 - "BaseEntity"
Cohesion: 0.14
Nodes (13): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, Guid, UrunOzelligi (+5 more)

### Community 96 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - ".Olustur"
Cohesion: 0.21
Nodes (13): GetSiparisQuery, CancellationToken, Guid, IMapper, Task, GetSiparis, GetSiparisQuery, Id (+5 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.14
Nodes (10): KargoServis.Infrastructure.Persistence, KargoServis.Migrations, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri (+2 more)

### Community 99 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 100 - "OrderListPage.js"
Cohesion: 0.16
Nodes (15): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+7 more)

### Community 101 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 102 - "GetAdminOrdersQueryHandler"
Cohesion: 0.21
Nodes (11): ShopApp.Application.Features.Admin.Orders.Dtos, GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List, Task (+3 more)

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

### Community 108 - "CreateUrunCommand"
Cohesion: 0.15
Nodes (13): Guid, List, CreateProductCommand, CreateUrunCommand, Brand, CategoryId, CoverImageUrl, Description (+5 more)

### Community 109 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 110 - ".GetAll"
Cohesion: 0.21
Nodes (11): ActionResult, CancellationToken, Guid, HttpGet, HttpPut, IActionResult, IMediator, List (+3 more)

### Community 111 - "GetByIdUrunDto"
Cohesion: 0.13
Nodes (14): Guid, List, GetByIdUrunDto, Brand, CategoryId, CategoryName, CoverImageUrl, Description (+6 more)

### Community 112 - "UpdateUrunCommand"
Cohesion: 0.18
Nodes (12): Guid, List, UpdateProductCommand, UpdateUrunCommand, Brand, CategoryId, CoverImageUrl, Description (+4 more)

### Community 113 - "KargoGonderisi"
Cohesion: 0.13
Nodes (15): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, Sevkiyat (+7 more)

### Community 114 - "ResultUrunDto"
Cohesion: 0.14
Nodes (13): Guid, List, ResultUrunDto, Brand, CategoryId, CoverImageUrl, Description, Images (+5 more)

### Community 115 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.20
Nodes (10): KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor, IadeEdildi, IptalEdildi, KargoyaVerildi, TeslimEdildi (+2 more)

### Community 117 - "KategoriServis.Domain.Entities"
Cohesion: 0.14
Nodes (11): KategoriServis.Domain.Entities, KategoriServis.Domain.Common, KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun (+3 more)

### Community 118 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 119 - "UserAddressesController"
Cohesion: 0.16
Nodes (14): IMediator, AdresController, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+6 more)

### Community 120 - "StokServis.Domain.Entities"
Cohesion: 0.23
Nodes (4): StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common

### Community 121 - "SeedSiparisDurumLookup"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SeedSiparisDurumLookup

### Community 122 - ".Handle"
Cohesion: 0.15
Nodes (19): GetAdminOrderQuery, DateTime, Guid, List, AdminOrderCustomerDto, AdminOrderDetailDto, AdminOrderItemDto, CancellationToken (+11 more)

### Community 123 - ".GetCurrentKullaniciIdAsync"
Cohesion: 0.18
Nodes (9): CancellationToken, Guid, Task, Guid, UpdateUrunGorselCommand, CancellationToken, Task, UrunGorsel (+1 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.07
Nodes (20): AbstractValidator, ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, UpdateSepetUrunuCommandValidator, Guid (+12 more)

### Community 125 - "BaseEntity"
Cohesion: 0.17
Nodes (12): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, ICollection, Sevkiyat (+4 more)

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

### Community 130 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.17
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserToken, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration, EntityTypeBuilder, Guid (+1 more)

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - "CreateAddressCommand"
Cohesion: 0.33
Nodes (7): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, Fact, AddressHandlerTests

### Community 133 - ".GetBySiparisId"
Cohesion: 0.20
Nodes (9): KargoServis.Controllers, ActionResult, CancellationToken, DateOnly, Guid, HttpGet, Task, KargoController (+1 more)

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "authConstants.js"
Cohesion: 0.21
Nodes (9): createPasswordStrength(), reset(), update(), AUTH_STATUS, FIELD_IDS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH (+1 more)

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 139 - "IdentityUserClaimConfiguration"
Cohesion: 0.60
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

### Community 151 - "AdminDashboardDto"
Cohesion: 0.13
Nodes (15): ShopApp.Application.Features.Admin.Dashboard.Dtos, ShopApp.Application.Features.Admin.Dashboard.Queries, ShopApp.Application.Features.Admin.Orders.Queries, ActionResult, CancellationToken, HttpGet, IMediator, Task (+7 more)

### Community 152 - ".DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.33
Nodes (6): CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Task

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.11
Nodes (17): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+9 more)

### Community 154 - ".UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.31
Nodes (7): CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator, KeyNotFoundException

### Community 155 - "DeleteUrunTurCommandHandler"
Cohesion: 0.22
Nodes (8): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, Guid, DeleteUrunTurCommand, CancellationToken, Task, UrunTur, DeleteUrunTurCommandHandler, DeleteUrunTurCommandValidator

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
Cohesion: 0.40
Nodes (4): Guid, Musteri, Cinsiyet, KullaniciId

### Community 160 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.25
Nodes (7): Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, UpdateUrunOzellikCommandHandler

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.09
Nodes (36): getAllOrders(), createPersonalInfoCard(), formatDate(), createAddressModal(), createDeleteConfirmModal(), createModalOverlay(), createProfileEditModal(), escapeHtml() (+28 more)

### Community 163 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.12
Nodes (9): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, ShopApp.Application.Features.Urun.Commands.DeleteUrun, ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, ShopApp.Application.Features.Urun.Queries (+1 more)

### Community 164 - "KargoDurumGecmisi"
Cohesion: 0.22
Nodes (9): Guid, KargoDurumGecmisi, Durum, KargoGonderisi, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration, EntityTypeBuilder (+1 more)

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (21): ShopApp.Infrastructure.Identity.Models, IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi (+13 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.60
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

### Community 172 - "IEntityTypeConfiguration"
Cohesion: 0.16
Nodes (10): ShopApp.Infrastructure.Persistence.Configurations.Kullanici, IEntityTypeConfiguration, Musteri, EntityTypeBuilder, AddressConfiguration, EntityTypeBuilder, MusteriConfiguration, UrunTur (+2 more)

### Community 173 - "SiparisDurumLookup"
Cohesion: 0.50
Nodes (3): SiparisDurumLookup, DurumIsmi, Id

### Community 174 - "DeleteUrunOzellikCommand"
Cohesion: 0.20
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 175 - ".GetAll"
Cohesion: 0.31
Nodes (8): ActionResult, CancellationToken, Guid, HttpGet, IMediator, List, Task, UrunController

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.27
Nodes (8): Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur, CreateUrunOzellikCommandHandler

### Community 177 - "AddressHandlerTests.cs"
Cohesion: 0.43
Nodes (5): ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos

### Community 178 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, CancellationToken, ILogger, IServiceProvider, Task, InfrastructureInitializer

### Community 179 - ".Create"
Cohesion: 0.38
Nodes (6): Profile, SepetMapping, SiparisMapping, UrunMapping, IMapper, MapperFactory

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.10
Nodes (22): CancellationToken, Guid, Task, IGenericUrunRepository, Guid, CreateUrunTurCommand, CancellationToken, Guid (+14 more)

### Community 181 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 182 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 183 - "AddAddressPhone"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddAddressPhone

### Community 184 - "SepetDurum"
Cohesion: 0.33
Nodes (5): SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 185 - "createCategoryFormPanel"
Cohesion: 0.90
Nodes (5): createCategoryFormPanel(), applyCategory(), populateParentOptions(), renderImagePreview(), resetForm()

### Community 186 - "ProductDto"
Cohesion: 0.60
Nodes (4): Guid, List, ProductDto, ProductImageDto

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 189 - "AddressDto"
Cohesion: 0.18
Nodes (13): GetMyAddressesQuery, OkObjectResult, DateTime, Guid, AddressDto, CancellationToken, List, Task (+5 more)

### Community 190 - "StokUrunleri"
Cohesion: 0.67
Nodes (3): StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 193 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 194 - ".BuildModel"
Cohesion: 0.15
Nodes (10): ModelSnapshot, DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 197 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

## Knowledge Gaps
- **582 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+577 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1303 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Domain.Urun.Entities` to `TurkcheIdentityVeMusteriGuncellemesi`, `ShopApp.Application.Features.Authentication.DTOs`, `AddRoleSpecificProfiles`, `AddProductMultiImageSupport`, `Migration`, `StandardizeSepetUrunuQuantityField`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `.BuildModel`, `AddAddressPhone`, `IDesignTimeDbContextFactory`, `RebuildAllEntitySchema`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `MakeIdValueGeneratedNever`, `SyncIdentityModels`, `RemoveAdminProfileTable`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `SiparisEntity`, `.Handle`, `SiparisUrunleri`, `SepetUrunu`, `.For`, `SepetEntity`, `AdminUrunController`, `GenericUrunRepository`, `IEntityTypeConfiguration`, `UpdateAdminOrderStatusCommand`, `SiparisDurumLookup`, `.Create`, `StokDbContext`, `IShopAppDbContext`, `Address`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `.GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection`, `.SeedActiveAndPassiveProduct`, `.Handle`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `.Handle`, `CreateAddressCommand`, `ShopApp.Application.Features.Authentication.DTOs`, `AdminDashboardDto`, `.DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer`, `.UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer`, `UpdateAdminOrderStatusCommand`, `AddressHandlerTests.cs`, `ShopApp.Domain.Urun.Entities`, `ChangeUserRoleCommand`, `UserProfileDto`, `IRequest`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `Urun`, `UpdateAdminCustomerCommand`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `GetAdminOrdersQueryHandler`, `.GetBySiparisIdAsync`, `.Handle`, `AbstractValidator`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _582 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `src.Monolith.ShopApp.Api.Controllers` be split into smaller, more focused modules?**
  _Cohesion score 0.06623376623376623 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.06852497096399536 - nodes in this community are weakly interconnected._
- **Should `CartPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._