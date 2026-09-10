# Graph Report - ShopApp  (2026-09-10)

## Corpus Check
- 467 files · ~395,938 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3118 nodes · 6599 edges · 188 communities (175 shown, 12 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 606 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `930830b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AddressLookupItemDto
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
- ShopApp.Infrastructure.Persistence.Context
- AddRoleSpecificProfiles
- authService.js
- appConstants.js
- What You Must Do When Invoked
- TestDbContext
- eventBus.js
- SiparisEntity
- CreateUrunCommandHandler
- SiparisUrunleri
- CartPage.js
- ISiparisRepository
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
- .DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- Mock
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
- .SeedProductWithVariant
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
- InfrastructureInitializer
- adminPages.test.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- SepetUrunu
- registerValidation.js
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .For
- IRequest
- authStore.js
- src.Monolith.ShopApp.Domain.Siparis.Entities
- IRequestHandler
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- DeleteSiparisUrunuCommand
- StokHareketi
- ShopApp.Application.Mapping
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
- productsService.js
- StokUrunleri
- KategoriDbContext
- http
- navigate
- .GetAll
- AdminCategoriesPage.js
- UrunOzelligi
- InitialCreate
- UpdateUrunGorselCommand
- KargoDbContext
- SyncIdentityModels
- App.js
- Kategori
- GetAdminOrdersQueryHandler
- GetUrunGorselleriQueryHandler
- createIcon
- RemoveAdminProfileTable
- .Create
- AuthRequest
- ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu
- createAdminProductFormModal
- BaseEntity
- KargoDurumGecmisi
- ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus
- KargoGonderisi
- createHeader
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
- Sevkiyat
- ShopApp.Application.Tests.csproj
- InitialCreate
- ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu
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
- .Olustur
- .BuildModel
- AddressDto
- ShopApp Development Notes
- DeleteUrunTurCommandHandler
- productData.js
- GetUrunGorselQueryHandler
- serviceRegistry.js
- Musteri
- AddressHandlerTests.cs
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Common.Interfaces
- createPasswordStrength
- KayitliKullanici
- IdentityUserLoginConfiguration
- AdminUrunController
- GenericUrunRepository
- ShopApp.Domain.Urun.Entities
- AddMahalleAndConvertPostaKoduToInteger
- CreateUrunTurCommandHandler
- .UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer
- DeleteUrunOzellikCommandHandler
- CreateUrunOzellikCommandHandler
- UpdateUrunOzellikCommandHandler
- IEntityTypeConfiguration
- IGenericUrunRepository
- BaseEntity
- AddAddressPhone
- homeService.js
- AuthenticationValidationException
- .GetAll
- SepetDurumLookup
- CreateAddressCommand
- IdentityUserRoleConfiguration
- SiparisDurum
- .BuildModel
- .BuildModel

## God Nodes (most connected - your core abstractions)
1. `createIcon()` - 86 edges
2. `ShopApp.Application.Common.Interfaces` - 86 edges
3. `IShopAppDbContext` - 59 edges
4. `ShopAppDbContext` - 50 edges
5. `Urun` - 48 edges
6. `navigate()` - 41 edges
7. `ICurrentCustomerContext` - 41 edges
8. `SiparisEntity` - 40 edges
9. `TestDbContext` - 35 edges
10. `SepetEntity` - 34 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `renderNode()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/CategoryTree.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `render()` --calls--> `createButton()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/home/components/CategoryCard.js → src/Frontend/ShopApp.Web/src/shared/components/Button/Button.js
- `initApp()` --calls--> `initRouter()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js

## Import Cycles
- None detected.

## Communities (188 total, 12 thin omitted)

### Community 0 - "AddressLookupItemDto"
Cohesion: 0.07
Nodes (29): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator (+21 more)

### Community 1 - ".Handle"
Cohesion: 0.06
Nodes (33): ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.CreateKategori, ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut (+25 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "ResultSepetDto"
Cohesion: 0.12
Nodes (24): GetMySepetlerQuery, GetSepetQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List (+16 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "IdentityRoleClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 6 - "LoginPage.js"
Cohesion: 0.11
Nodes (13): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, FIELD_IDS, PASSWORD_RULE_LABELS (+5 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "UpdateSepetCommand"
Cohesion: 0.20
Nodes (16): Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, Guid, UpdateSepetCommand, CancellationToken (+8 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (30): IdentityDbContext, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri, Urun (+22 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.09
Nodes (23): isAuthenticated(), addCartItem(), createCart(), getMyCarts(), getOrCreateActiveCart(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder() (+15 more)

### Community 11 - "ShopApp.Infrastructure.Persistence.Context"
Cohesion: 0.11
Nodes (11): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Features.Authentication.DTOs, ShopApp.Infrastructure.Identity.Models, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Tests.Features.Urun, ShopApp.Application.Features.Authentication.Services, ShopApp.Infrastructure.Persistence.Repositories (+3 more)

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
Cohesion: 0.10
Nodes (22): Fact, Task, DbContextOptions, DbSet, Kategori, Urun, UrunGorsel, UrunOzellik (+14 more)

### Community 19 - "SiparisEntity"
Cohesion: 0.15
Nodes (15): ICollection, SiparisEntity, AraToplam, Durum, DurumId, IndirimTutari, KargoFiyat, MusteriId (+7 more)

### Community 20 - "CreateUrunCommandHandler"
Cohesion: 0.19
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrun, Guid, CreateUrunCommand, CancellationToken, Guid, Kategori, Task, UrunEntity (+2 more)

### Community 21 - "SiparisUrunleri"
Cohesion: 0.11
Nodes (15): Guid, Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat (+7 more)

### Community 22 - "CartPage.js"
Cohesion: 0.08
Nodes (37): CartPage(), getShippingCost(), getSubtotal(), handleCheckout(), handleTemporaryCheckout(), load(), renderItems(), showAddressRequiredModal() (+29 more)

### Community 23 - "ISiparisRepository"
Cohesion: 0.27
Nodes (8): CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler

### Community 24 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.29
Nodes (10): Guid, UpdateSiparisUrunuCommand, CancellationToken, Task, UpdateSiparisUrunuCommandHandler, CancellationToken, Fact, KeyNotFoundException (+2 more)

### Community 25 - ".DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.33
Nodes (6): CancellationToken, Guid, Task, DeleteAddressCommand, DeleteAddressCommandHandler, Task

### Community 26 - "Mock"
Cohesion: 0.22
Nodes (19): Mock, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, Guid (+11 more)

### Community 27 - "SepetEntity"
Cohesion: 0.17
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "Depo"
Cohesion: 0.14
Nodes (13): StokServis.Infrastructure.Persistence.Configurations, ICollection, Depo, AktifMi, DepoAdresi, DepoIsmi, Sehir, StokKalemleri (+5 more)

### Community 30 - "IdentityService"
Cohesion: 0.17
Nodes (13): IdentityError, IdentityResult, CancellationToken, Guid, IdentityRole, IEnumerable, IHttpContextAccessor, IReadOnlyCollection (+5 more)

### Community 31 - "AuthResponse"
Cohesion: 0.08
Nodes (30): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+22 more)

### Community 32 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 33 - "SiparisController"
Cohesion: 0.05
Nodes (55): GetMySiparislerQuery, GetSiparisQuery, GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+47 more)

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

### Community 43 - "ResultSepetUrunDto"
Cohesion: 0.07
Nodes (41): GetSepetUrunleriQuery, GetSepetUrunuQuery, GetUrunOzellikleriQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet (+33 more)

### Community 44 - "IlkMigrasyon"
Cohesion: 0.15
Nodes (10): KargoServis.Migrations, DateOnly, DateTime, Guid, MigrationBuilder, DateOnly, DateTime, Guid (+2 more)

### Community 45 - "UpdateAdminOrderStatusCommand"
Cohesion: 0.19
Nodes (15): Guid, UpdateAdminOrderStatusCommand, CancellationToken, Task, UpdateAdminOrderStatusCommandHandler, UpdateAdminOrderStatusCommandValidator, Fact, KeyNotFoundException (+7 more)

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
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 57 - "adminPages.test.js"
Cohesion: 0.09
Nodes (36): createAdminLayout(), createAdminPageHeader(), createAdminPagination(), createAdminProductCard(), createProductStockBadge(), createAdminProductDetailModal(), close(), handleKeydown() (+28 more)

### Community 60 - "SepetUrunu"
Cohesion: 0.09
Nodes (19): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId (+11 more)

### Community 61 - "registerValidation.js"
Cohesion: 0.19
Nodes (27): RFC-5322, PASSWORD_RULES, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword() (+19 more)

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.08
Nodes (31): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, GetMyProfileQuery, ActionResult, CancellationToken (+23 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".For"
Cohesion: 0.22
Nodes (17): Guid, CurrentCustomer, Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler (+9 more)

### Community 67 - "IRequest"
Cohesion: 0.20
Nodes (7): IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid, GetByIdSiparisUrunleriDto

### Community 68 - "authStore.js"
Cohesion: 0.23
Nodes (10): AUTH_STATUS, clearError(), initialState, merge(), notify(), setError(), setLoading(), state (+2 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.08
Nodes (17): ShopApp.Application.Features.Siparis.Dtos, src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Features.Siparis, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis (+9 more)

### Community 70 - "IRequestHandler"
Cohesion: 0.10
Nodes (21): IRequestHandler, CancellationToken, Task, ICurrentCustomerContext, Guid, CreateSepetCommand, CancellationToken, Guid (+13 more)

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.16
Nodes (9): StokServis.Infrastructure.Persistence, DbContextOptions, DbSet, ModelBuilder, StokDbContext, Depolar, StokHareketleri, StokKalemleri (+1 more)

### Community 74 - "DeleteSiparisUrunuCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, Guid, DeleteSiparisUrunuCommand, CancellationToken, Task, DeleteSiparisUrunuCommandHandler, DeleteSiparisUrunuCommandValidator

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
Cohesion: 0.09
Nodes (22): CancellationToken, DbSet, Kategori, SiparisUrunleri, Task, Urun, UrunGorsel, UrunOzellik (+14 more)

### Community 79 - "RebuildAllEntitySchema"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RebuildAllEntitySchema

### Community 80 - "Urun"
Cohesion: 0.11
Nodes (16): ShopApp.Application.Features.Urun.Commands.UpdateUrun, UpdateUrunCommandValidator, Guid, ICollection, Urun, AktifMi, Detay, Fiyat (+8 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.11
Nodes (25): ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, GetAdminCustomersQuery, Guid, UpdateAdminCustomerCommand, CancellationToken, Task, UpdateAdminCustomerCommandHandler (+17 more)

### Community 82 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.13
Nodes (13): ShopApp.Infrastructure.Persistence.Configurations.Kullanici, Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu (+5 more)

### Community 84 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.08
Nodes (14): ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, ShopApp.Application.Tests.TestSupport (+6 more)

### Community 85 - "IIdentityService"
Cohesion: 0.16
Nodes (12): CancellationToken, Guid, IEnumerable, IReadOnlyCollection, IReadOnlyDictionary, Task, IIdentityService, CancellationToken (+4 more)

### Community 86 - "MakeIdValueGeneratedNever"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeIdValueGeneratedNever

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "productsService.js"
Cohesion: 0.14
Nodes (28): AdminProductsPage(), closeActiveModal(), enrichWithCategoryNames(), getFilteredAndSortedProducts(), handleSaveProduct(), loadData(), openCreateModal(), openDeleteModal() (+20 more)

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
Cohesion: 0.14
Nodes (23): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), createAdminHeader(), createAdminSidebar() (+15 more)

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
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - "UpdateUrunGorselCommand"
Cohesion: 0.33
Nodes (4): ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, Guid, UpdateUrunGorselCommand, UpdateUrunGorselCommandValidator

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
Cohesion: 0.19
Nodes (12): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List (+4 more)

### Community 103 - "GetUrunGorselleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunGorselleriQuery, Guid, ResultUrunGorselDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 104 - "createIcon"
Cohesion: 0.10
Nodes (24): createPlaceholderIcon(), createBoxPlaceholder(), createCartSummary(), formatPrice(), update(), benefits, createFeatureBenefits(), render() (+16 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - ".Create"
Cohesion: 0.28
Nodes (9): active, passive, Fact, Kategori, KeyNotFoundException, Task, UrunEntity, UrunListingVisibilityTests (+1 more)

### Community 107 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 108 - "ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu"
Cohesion: 0.14
Nodes (4): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 109 - "createAdminProductFormModal"
Cohesion: 0.48
Nodes (7): createAdminProductFormModal(), clearErrors(), close(), handleKeydown(), handleSubmit(), showError(), updateImagePreview()

### Community 110 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 111 - "KargoDurumGecmisi"
Cohesion: 0.33
Nodes (6): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, EntityTypeBuilder, KargoDurumGecmisiConfiguration

### Community 113 - "KargoGonderisi"
Cohesion: 0.17
Nodes (12): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, SevkiyatId (+4 more)

### Community 114 - "createHeader"
Cohesion: 0.12
Nodes (22): subscribeCategories(), createCategoryCard(), createCategoryGrid(), createCategoryMegaMenu(), render(), update(), normalizeCategories(), slugify() (+14 more)

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

### Community 122 - "routes.js"
Cohesion: 0.13
Nodes (14): notFoundRoute, routes, AboutPage(), render(), createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load() (+6 more)

### Community 123 - "GetByIdUrunDto"
Cohesion: 0.19
Nodes (11): GetUrunQuery, Guid, List, GetByIdUrunDto, CancellationToken, Guid, IMapper, Task (+3 more)

### Community 124 - "AbstractValidator"
Cohesion: 0.24
Nodes (9): AbstractValidator, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, UpdateSiparisCommandValidator, Fact (+1 more)

### Community 125 - "Sevkiyat"
Cohesion: 0.22
Nodes (9): KargoGonderisi, ICollection, Sevkiyat, AktifMi, Gonderiler, SevkiyatTanım, TakipUrlSablonu, EntityTypeBuilder (+1 more)

### Community 126 - "GetUrunTurleriQueryHandler"
Cohesion: 0.22
Nodes (11): GetUrunTurleriQuery, Guid, ResultUrunTurDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 127 - "OrderConfirmationPage.js"
Cohesion: 0.15
Nodes (17): createBreadcrumbs(), createDeliveryCard(), createEmptyState(), createOrderDetailsCard(), createRawIcon(), createSuccessBanner(), createSummaryCard(), formatPrice() (+9 more)

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
Cohesion: 0.22
Nodes (11): GetUrunlerQuery, Guid, ResultUrunDto, CancellationToken, Guid, IMapper, List, Task (+3 more)

### Community 134 - "BaseEntity"
Cohesion: 0.33
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 135 - "HareketTipi"
Cohesion: 0.33
Nodes (6): HareketTipi, Cikis, Duzeltme, Giris, Rezervasyon, RezervasyonIptal

### Community 136 - "Sevkiyat"
Cohesion: 0.67
Nodes (3): Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

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

### Community 150 - ".Olustur"
Cohesion: 0.19
Nodes (13): Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, Guid, UpdateSiparisCommand, CancellationToken (+5 more)

### Community 151 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

### Community 152 - "AddressDto"
Cohesion: 0.27
Nodes (10): GetMyAddressesQuery, DateTime, Guid, AddressDto, CancellationToken, List, Task, GetMyAddresses (+2 more)

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.12
Nodes (16): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+8 more)

### Community 155 - "DeleteUrunTurCommandHandler"
Cohesion: 0.21
Nodes (8): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, Guid, DeleteUrunTurCommand, CancellationToken, Task, UrunTur, DeleteUrunTurCommandHandler, DeleteUrunTurCommandValidator

### Community 156 - "productData.js"
Cohesion: 0.29
Nodes (4): demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 157 - "GetUrunGorselQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, CancellationToken, Guid, IMapper, Task, GetUrunGorsel (+2 more)

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
Cohesion: 0.17
Nodes (6): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Common.Interfaces, ShopApp.Application.Features.Admin.Customers.Queries, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers

### Community 164 - "createPasswordStrength"
Cohesion: 0.67
Nodes (3): createPasswordStrength(), reset(), update()

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 167 - "AdminUrunController"
Cohesion: 0.25
Nodes (12): ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult (+4 more)

### Community 168 - "GenericUrunRepository"
Cohesion: 0.38
Nodes (5): GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 169 - "ShopApp.Domain.Urun.Entities"
Cohesion: 0.07
Nodes (22): ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Domain.Urun.Entities, src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, Guid, UrunGorsel, GorselSira, GorselUrl (+14 more)

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "CreateUrunTurCommandHandler"
Cohesion: 0.22
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunTur, Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler (+1 more)

### Community 172 - ".UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer"
Cohesion: 0.31
Nodes (7): CancellationToken, Guid, Task, UpdateAddressCommand, UpdateAddressCommandHandler, UpdateAddressCommandValidator, KeyNotFoundException

### Community 174 - "DeleteUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.20
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur (+2 more)

### Community 177 - "UpdateUrunOzellikCommandHandler"
Cohesion: 0.19
Nodes (9): ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, Guid, UpdateUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, UpdateUrunOzellikCommandHandler (+1 more)

### Community 178 - "IEntityTypeConfiguration"
Cohesion: 0.11
Nodes (16): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserClaim, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration (+8 more)

### Community 180 - "IGenericUrunRepository"
Cohesion: 0.13
Nodes (14): ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, CancellationToken, Guid, Task, IGenericUrunRepository, Guid, DeleteUrunGorselCommand, CancellationToken (+6 more)

### Community 182 - "BaseEntity"
Cohesion: 0.10
Nodes (19): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+11 more)

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

### Community 189 - "CreateAddressCommand"
Cohesion: 0.33
Nodes (7): CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler, CreateAddressCommandValidator, Fact, AddressHandlerTests

### Community 191 - "IdentityUserRoleConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 193 - "SiparisDurum"
Cohesion: 0.22
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 194 - ".BuildModel"
Cohesion: 0.14
Nodes (10): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 197 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

## Knowledge Gaps
- **528 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+523 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Infrastructure.Persistence.Context` to `Migration`, `.BuildModel`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddMahalleAndConvertPostaKoduToInteger`, `RemoveAdminProfileTable`, `AddRoleSpecificProfiles`, `RebuildAllEntitySchema`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `MakeIdValueGeneratedNever`, `AddAddressPhone`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `GetByIdUrunTurDto`, `.Handle`, `.AddInfrastructure`, `ResultSepetDto`, `GetUrunlerQueryHandler`, `ShopAppDbContext`, `TestDbContext`, `SiparisEntity`, `AddressDto`, `.DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer`, `Mock`, `SepetEntity`, `GetUrunGorselQueryHandler`, `Musteri`, `SiparisController`, `GetUrunOzellikQueryHandler`, `ShopApp.Domain.Urun.Entities`, `ResultSepetUrunDto`, `.UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer`, `UpdateAdminOrderStatusCommand`, `SepetUrunu`, `CreateAddressCommand`, `.For`, `UpdateAdminCustomerCommand`, `Address`, `.GetAll`, `GetAdminOrdersQueryHandler`, `GetUrunGorselleriQueryHandler`, `GetByIdUrunDto`, `GetUrunTurleriQueryHandler`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `.For`, `KargoDbContext`, `.Create`, `UpdateAdminOrderStatusCommand`, `IShopAppDbContext`, `Address`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `SiparisEntity`, `SiparisUrunleri`, `Mock`, `SepetEntity`, `SepetUrunu`, `Musteri`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _528 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AddressLookupItemDto` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.058673469387755105 - nodes in this community are weakly interconnected._
- **Should `ResultSepetDto` be split into smaller, more focused modules?**
  _Cohesion score 0.12043010752688173 - nodes in this community are weakly interconnected._