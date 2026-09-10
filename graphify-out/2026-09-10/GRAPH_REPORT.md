# Graph Report - ShopApp  (2026-09-10)

## Corpus Check
- 475 files · ~397,955 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3219 nodes · 6880 edges · 186 communities (174 shown, 11 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 642 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8e9cc874`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AddressLookupItemDto
- .Handle
- ShopApp.Infrastructure.csproj
- CartPage.js
- FrontendAGENTS.md
- ShopApp.Infrastructure.Persistence.Configurations.Identity
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
- CreateUrunCommandHandler
- SiparisUrunleri
- productsService.js
- SepetUrunu
- .Create_Throws_WhenParentOrderBelongsToAnotherCustomer
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
- createIcon
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- src.Monolith.ShopApp.Domain.Common
- ShopApp.Application.Common.Interfaces
- ChangeUserRoleCommand
- UserProfileDto
- AGENTS.md
- extraction-spec.md
- .Create
- IRequest
- UrunOzellik
- src.Monolith.ShopApp.Domain.Siparis.Entities
- IRequestHandler
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- DeleteSiparisUrunuCommand
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
- AdminProductsPage
- StokUrunleri
- KategoriDbContext
- http
- navigate
- .GetAll
- categoryService.js
- UrunOzelligi
- InitialCreate
- .Olustur
- KargoDbContext
- SyncIdentityModels
- store.js
- Kategori
- GetAdminOrdersQueryHandler
- .GetBySiparisIdAsync
- AdminDashboardPage.js
- RemoveAdminProfileTable
- .Create
- AuthRequest
- .GetMyProfile_ReturnsCorrectUserProfileDto
- createAuthForm
- .GetAll
- ISiparisRepository
- KategoriServis.Domain.Entities
- KargoGonderisi
- Header.js
- UrunTur
- KargoDurumu
- UrunGorseli
- graphify reference: extra exports and benchmark
- .GetMyAddresses
- StokServis.Domain.Entities
- SeedSiparisDurumLookup
- .Handle
- BaseEntity
- AbstractValidator
- BaseEntity
- GetUrunTurleriQueryHandler
- OrderConfirmationPage.js
- createConfirmModal
- .AddInfrastructure
- IdentityRoleConfiguration
- graphify reference: query, path, explain
- .GetAdminOrder_ReturnsShipment_WhenKargoReadServiceHasOne
- .GetBySiparisId
- BaseEntity
- HareketTipi
- authConstants.js
- ShopApp.Application.Tests.csproj
- InitialCreate
- IdentityUserClaimConfiguration
- UpdateUrunTurCommand
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- CreateUrunGorselCommandHandler
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- apiClient.js
- AdminSiparisController.cs
- .GetProfile
- ShopApp Development Notes
- IdentityUserInfo
- DeleteUrunTurCommand
- ProductCard.js
- GetUrunGorselQueryHandler
- .BuildModel
- BaseEntity
- UpdateUrunOzellikCommand
- GetUrunOzellikQueryHandler
- ProfilePage.js
- ShopApp.Application.Features.Urun.Dtos
- ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu
- KayitliKullanici
- IdentityUserLoginConfiguration
- AdminUrunController
- GenericUrunRepository
- UrunGorsel
- AddMahalleAndConvertPostaKoduToInteger
- CreateUrunTurCommandHandler
- Musteri
- SiparisDurumLookup
- DeleteUrunOzellikCommand
- CreateUrunOzellikCommandHandler
- IEntityTypeConfiguration
- .GetByIdAsync
- UrunTur
- AddAddressPhone
- AuthenticationValidationException
- SepetDurumLookup
- AddressDto
- SiparisDurum
- .BuildModel
- .BuildModel

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 91 edges
2. `createIcon()` - 88 edges
3. `IShopAppDbContext` - 60 edges
4. `ShopAppDbContext` - 50 edges
5. `Urun` - 48 edges
6. `ICurrentCustomerContext` - 42 edges
7. `SiparisEntity` - 41 edges
8. `navigate()` - 39 edges
9. `TestDbContext` - 36 edges
10. `SepetEntity` - 34 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/about/pages/AboutPage.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateImagePreview()` --calls--> `createIcon()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/admin/components/AdminProductFormModal.js → src/Frontend/ShopApp.Web/src/shared/components/Icon/Icon.js
- `updateQuantity()` --calls--> `formatPrice()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/cart/components/CartItem.js → src/Frontend/ShopApp.Web/src/shared/utils/format.js
- `initApp()` --calls--> `logout()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- `initApp()` --calls--> `restoreSession()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js

## Import Cycles
- None detected.

## Communities (186 total, 11 thin omitted)

### Community 0 - "AddressLookupItemDto"
Cohesion: 0.07
Nodes (29): CityServices, ShopApp.Application.Tests.Features.Adres, src.Monolith.ShopApp.Api.Services.Address, ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator (+21 more)

### Community 1 - ".Handle"
Cohesion: 0.07
Nodes (29): ShopApp.Application.Features.Urun.Commands.UpdateKategori, ShopApp.Application.Features.Urun.Commands.CreateKategori, ShopApp.Application.Features.Urun.Commands.DeleteKategori, CancellationToken, Guid, HttpDelete, HttpPost, HttpPut (+21 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.17
Nodes (11): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.Extensions.Http (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+3 more)

### Community 3 - "CartPage.js"
Cohesion: 0.12
Nodes (23): createCartItemRow(), updateQuantity(), createCartSummary(), formatPrice(), update(), CartPage(), getShippingCost(), getSubtotal() (+15 more)

### Community 4 - "FrontendAGENTS.md"
Cohesion: 0.05
Nodes (36): 10. No Database Changes, 11. Frontend Responsibility, 12. Dynamic Components Instead of Hardcoded Pages, 13. Existing Architecture Must Be Preserved, 14. Graphify, 15. User-Facing Language, 16. Forms, 17. Authentication and Role-Based Routing Boundary (+28 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.19
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserRole, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration, EntityTypeBuilder, Guid (+1 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.10
Nodes (11): createAuthLayout(), createFormField(), createPasswordField(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES, LoginPage(), RegisterPage() (+3 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "UpdateSepetCommand"
Cohesion: 0.14
Nodes (22): Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler, Guid, DeleteSepetCommand (+14 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.06
Nodes (31): IdentityDbContext, IDesignTimeDbContextFactory, DbSet, Guid, IdentityRole, Kategori, ModelBuilder, SiparisUrunleri (+23 more)

### Community 10 - "ProductDetailPage.js"
Cohesion: 0.19
Nodes (18): isAuthenticated(), addCartItem(), buildPropertyGroups(), createBreadcrumbs(), createGalleryPlaceholder(), createImage(), isValueReachable(), ProductDetailPage() (+10 more)

### Community 11 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.08
Nodes (16): ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Tests.Features.Admin, ShopApp.Application.Tests.Features.Profil, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Tests.TestSupport, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Authentication.DTOs (+8 more)

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "authService.js"
Cohesion: 0.14
Nodes (21): AUTH_STATUS, establishSession(), getCurrentUser(), login(), mapUser(), register(), restoreSession(), clearError() (+13 more)

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
Cohesion: 0.13
Nodes (16): Guid, ICollection, SiparisEntity, AraToplam, Durum, DurumId, IndirimTutari, KargoFiyat (+8 more)

### Community 20 - "CreateUrunCommandHandler"
Cohesion: 0.19
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrun, Guid, CreateUrunCommand, CancellationToken, Guid, Kategori, Task, UrunEntity (+2 more)

### Community 21 - "SiparisUrunleri"
Cohesion: 0.15
Nodes (13): Guid, SiparisUrunleri, IndirimOrani, SiparisEntity, SiparisId, StokTakipNumarasi, ToplamFiyat, UrunAciklamasi (+5 more)

### Community 22 - "productsService.js"
Cohesion: 0.09
Nodes (36): createHeroCategoryGrid(), render(), HomePage(), render(), getHomeCategories(), createCategoryCard(), createCategoryGrid(), CategoryListPage() (+28 more)

### Community 23 - "SepetUrunu"
Cohesion: 0.24
Nodes (7): Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId, UrunMiktar, UrunTurId

### Community 24 - ".Create_Throws_WhenParentOrderBelongsToAnotherCustomer"
Cohesion: 0.29
Nodes (10): Guid, UpdateSiparisUrunuCommand, CancellationToken, Task, UpdateSiparisUrunuCommandHandler, CancellationToken, Fact, KeyNotFoundException (+2 more)

### Community 25 - "registerValidation.js"
Cohesion: 0.20
Nodes (26): RFC-5322, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only. (+18 more)

### Community 26 - ".For"
Cohesion: 0.28
Nodes (15): Mock, Guid, CreateSepetUrunuCommand, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler, CancellationToken (+7 more)

### Community 27 - "SepetEntity"
Cohesion: 0.10
Nodes (25): CancellationToken, Guid, Task, ISepetRepository, Guid, DeleteSepetUrunuCommand, CancellationToken, Task (+17 more)

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
Nodes (57): GetMySiparislerQuery, GetSiparisQuery, GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+49 more)

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
Cohesion: 0.20
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
Cohesion: 0.06
Nodes (55): GetMySepetlerQuery, GetSepetQuery, GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete (+47 more)

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
Nodes (13): ShopApp.Infrastructure.Identity.Seed, IHostedService, CancellationToken, ILogger, IServiceProvider, Task, InfrastructureInitializer, Guid (+5 more)

### Community 57 - "createIcon"
Cohesion: 0.10
Nodes (35): createAdminOrderDetailModal(), close(), handleKeydown(), createAdminPagination(), createAdminProductCard(), createPlaceholderIcon(), createProductStockBadge(), createAdminProductDetailModal() (+27 more)

### Community 60 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.09
Nodes (14): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, src.Monolith.ShopApp.Domain.Common, ShopApp.Infrastructure.Persistence.Configurations.Siparis, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration (+6 more)

### Community 61 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.12
Nodes (10): ShopApp.Infrastructure.Identity.Services, ShopApp.Application.Features.Urun.Commands.UpdateUrunTur, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Common.Interfaces, ShopApp.Infrastructure.Kargo, ShopApp.Domain.Urun.Entities, ShopApp.Infrastructure.Identity.Settings, ShopApp.Application.Tests.Features.Urun (+2 more)

### Community 62 - "ChangeUserRoleCommand"
Cohesion: 0.18
Nodes (15): ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole, InlineData, Guid, ChangeUserRoleCommand, ChangeUserRoleCommandHandler, ChangeUserRoleCommandValidator, CancellationToken, Fact (+7 more)

### Community 63 - "UserProfileDto"
Cohesion: 0.18
Nodes (12): ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, CancellationToken, IMediator, Task, UpdateMyProfileCommand, UpdateMyProfileCommandHandler (+4 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - ".Create"
Cohesion: 0.24
Nodes (14): Guid, CreateSiparisCommand, CancellationToken, Guid, Task, CreateSiparisCommandHandler, Fact, InvalidOperationException (+6 more)

### Community 67 - "IRequest"
Cohesion: 0.20
Nodes (7): IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid, GetByIdSiparisUrunleriDto

### Community 68 - "UrunOzellik"
Cohesion: 0.15
Nodes (11): ShopApp.Infrastructure.Persistence.Configurations.Urun, Guid, UrunOzellik, OzellikAd, OzellikDeger, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 69 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.09
Nodes (11): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Features.Siparis.Queries, src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Features.Siparis (+3 more)

### Community 70 - "IRequestHandler"
Cohesion: 0.10
Nodes (26): IRequestHandler, CancellationToken, Guid, Task, CurrentCustomer, ICurrentCustomerContext, IGenericUrunRepository, DeleteUrunCommandHandler (+18 more)

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

### Community 76 - "orderService.js"
Cohesion: 0.12
Nodes (15): AdminOrdersPage(), closeActiveModal(), destroy(), getFilteredOrders(), getStatusId(), openDetailModal(), renderPage(), renderTable() (+7 more)

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
Cohesion: 0.09
Nodes (20): ShopApp.Application.Features.Urun.Commands.DeleteUrun, Guid, DeleteUrunCommand, DeleteUrunCommandValidator, Guid, ICollection, Urun, AktifMi (+12 more)

### Community 81 - "UpdateAdminCustomerCommand"
Cohesion: 0.07
Nodes (38): ControllerBase, ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer, ShopApp.Application.Features.Admin.Customers.Dtos, ShopApp.Application.Features.Admin.Customers.Queries, GetAdminCustomersQuery, ActionResult, CancellationToken, Guid (+30 more)

### Community 82 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, Detay, GorselUrl, KategoriAd (+5 more)

### Community 83 - "Address"
Cohesion: 0.18
Nodes (10): Guid, Address, AdresBilgisi, Ilce, Mahalle, MusteriId, PostaKodu, Sehir (+2 more)

### Community 84 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.05
Nodes (20): src.Monolith.ShopApp.Domain.Sepet.Enums, ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Features.Sepet.Commands.DeleteSepet (+12 more)

### Community 85 - "IIdentityService"
Cohesion: 0.21
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

### Community 92 - "navigate"
Cohesion: 0.09
Nodes (23): initApp(), bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render() (+15 more)

### Community 93 - ".GetAll"
Cohesion: 0.08
Nodes (29): GetKategorilerQuery, GetKategoriQuery, ActionResult, CancellationToken, Guid, HttpGet, IMediator, List (+21 more)

### Community 94 - "categoryService.js"
Cohesion: 0.12
Nodes (27): createAdminConfirmModal(), close(), handleKeydown(), createCategoryFormPanel(), applyCategory(), populateParentOptions(), resetForm(), createRecentCategoriesCard() (+19 more)

### Community 95 - "UrunOzelligi"
Cohesion: 0.16
Nodes (11): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder (+3 more)

### Community 96 - "InitialCreate"
Cohesion: 0.18
Nodes (8): KategoriServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 97 - ".Olustur"
Cohesion: 0.19
Nodes (13): Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, Guid, UpdateSiparisCommand, CancellationToken (+5 more)

### Community 98 - "KargoDbContext"
Cohesion: 0.15
Nodes (10): KargoServis.Infrastructure.Persistence, DbContext, DbContextOptions, DbSet, ModelBuilder, KargoDbContext, KargoDurumGecmisleri, KargoGonderileri (+2 more)

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
Cohesion: 0.29
Nodes (9): GetAdminOrdersQuery, DateTime, Guid, AdminOrderDto, CancellationToken, List, Task, GetAdminOrdersQuery (+1 more)

### Community 103 - ".GetBySiparisIdAsync"
Cohesion: 0.13
Nodes (15): HttpClient, KargoGonderisiResponse, CancellationToken, DateOnly, Guid, Task, IKargoReadService, ShipmentInfoDto (+7 more)

### Community 104 - "AdminDashboardPage.js"
Cohesion: 0.29
Nodes (10): createAdminMetricCard(), createCategoryStatistics(), AdminDashboardPage(), load(), createLowStockList(), createMetricsRow(), createOrdersTable(), getDashboardSummary() (+2 more)

### Community 105 - "RemoveAdminProfileTable"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, RemoveAdminProfileTable

### Community 106 - ".Create"
Cohesion: 0.07
Nodes (44): active, GetUrunlerQuery, GetUrunQuery, passive, Profile, ActionResult, CancellationToken, Guid (+36 more)

### Community 107 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 108 - ".GetMyProfile_ReturnsCorrectUserProfileDto"
Cohesion: 0.26
Nodes (10): GetMyProfileQuery, CancellationToken, Task, GetMyProfile, GetMyProfileQuery, GetMyProfileQueryHandler, Fact, KeyNotFoundException (+2 more)

### Community 109 - "createAuthForm"
Cohesion: 0.21
Nodes (5): createAuthForm(), createAlert(), clear(), render(), setMessage()

### Community 110 - ".GetAll"
Cohesion: 0.24
Nodes (10): ActionResult, CancellationToken, Guid, HttpGet, HttpPut, IActionResult, IMediator, List (+2 more)

### Community 111 - "ISiparisRepository"
Cohesion: 0.27
Nodes (8): CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task, CreateSiparisUrunuCommandHandler

### Community 113 - "KargoGonderisi"
Cohesion: 0.13
Nodes (15): DateOnly, Guid, ICollection, KargoGonderisi, Durum, DurumGecmisi, KargoSirketIsmi, Sevkiyat (+7 more)

### Community 114 - "Header.js"
Cohesion: 0.11
Nodes (27): createAdminHeader(), createAdminLayout(), createAdminSidebar(), NAV_SECTIONS, logout(), getState(), subscribeCategories(), openConfirmModal() (+19 more)

### Community 115 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 116 - "KargoDurumu"
Cohesion: 0.12
Nodes (16): Guid, KargoDurumGecmisi, Durum, KargoGonderisiId, KargoDurumu, Bekliyor, DagitimaCikti, Hazirlaniyor (+8 more)

### Community 117 - "UrunGorseli"
Cohesion: 0.22
Nodes (8): Guid, UrunGorseli, GorselSiralamasi, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorseliConfiguration

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

### Community 122 - ".Handle"
Cohesion: 0.29
Nodes (10): GetAdminOrderQuery, DateTime, Guid, List, AdminOrderCustomerDto, AdminOrderDetailDto, AdminOrderItemDto, CancellationToken (+2 more)

### Community 123 - "BaseEntity"
Cohesion: 0.29
Nodes (6): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi

### Community 124 - "AbstractValidator"
Cohesion: 0.19
Nodes (10): AbstractValidator, CreateSepetUrunuCommandValidator, UpdateSepetCommandValidator, Guid, CreateSiparisUrunuCommand, CreateSiparisUrunuCommandValidator, UpdateSiparisCommandValidator, UpdateUrunCommandValidator (+2 more)

### Community 125 - "BaseEntity"
Cohesion: 0.13
Nodes (15): DateTime, Guid, BaseEntity, GuncellemeTarihi, Id, OlusturmaTarihi, KargoGonderisi, ICollection (+7 more)

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

### Community 130 - "IdentityRoleConfiguration"
Cohesion: 0.47
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 131 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 132 - ".GetAdminOrder_ReturnsShipment_WhenKargoReadServiceHasOne"
Cohesion: 0.30
Nodes (8): Guid, GetAdminOrderQuery, CancellationToken, Fact, Guid, KeyNotFoundException, Task, AdminOrderDetailHandlerTests

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
Cohesion: 0.24
Nodes (8): createPasswordStrength(), reset(), update(), FIELD_IDS, PASSWORD_RULE_LABELS, PASSWORD_RULES, PASSWORD_STRENGTH, NOTE: These are frontend-only quality hints.

### Community 137 - "ShopApp.Application.Tests.csproj"
Cohesion: 0.22
Nodes (8): coverlet.collector (6.0.4), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72), xunit (2.9.3), xunit.runner.visualstudio (3.1.4), net10.0, Microsoft.NET.Sdk

### Community 138 - "InitialCreate"
Cohesion: 0.18
Nodes (8): StokServis.Migrations, DateTime, Guid, MigrationBuilder, DateTime, Guid, ModelBuilder, InitialCreate

### Community 139 - "IdentityUserClaimConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 140 - "UpdateUrunTurCommand"
Cohesion: 0.25
Nodes (5): Guid, UpdateUrunTurCommand, CancellationToken, Task, UpdateUrunTurCommandValidator

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
Cohesion: 0.23
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel, Guid, CreateUrunGorselCommand, CancellationToken, Guid, Task, UrunGorsel, CreateUrunGorselCommandHandler (+1 more)

### Community 150 - "apiClient.js"
Cohesion: 0.29
Nodes (6): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry

### Community 151 - "AdminSiparisController.cs"
Cohesion: 0.28
Nodes (5): ShopApp.Application.Features.Admin.Orders.Dtos, ShopApp.Application.Features.Admin.Orders.Queries, UpdateAdminOrderStatusRequest, GetAdminOrder, GetAdminOrders

### Community 152 - ".GetProfile"
Cohesion: 0.31
Nodes (7): ActionResult, CancellationToken, HttpGet, HttpPut, IMediator, Task, ProfilController

### Community 153 - "ShopApp Development Notes"
Cohesion: 0.12
Nodes (16): Address Integer Location Migration (2026-09-09), Admin Architecture & Dynamic Data Rules, Admin Management & Backend Endpoints Integration (2026-09-09), AdminController Security/Validation Hardening & CQRS Migration (2026-09-09), Database Reset and Entity Migration (2026-09-08), Dynamic Cart, Order Confirmation, and Category Single-Source-of-Truth Architecture (2026-09-08), Generic Product Repository (2026-09-08), Hierarchical Category Mega Menu Under Kategoriler (2026-09-08) (+8 more)

### Community 154 - "IdentityUserInfo"
Cohesion: 0.38
Nodes (3): DateTime, Guid, IdentityUserInfo

### Community 155 - "DeleteUrunTurCommand"
Cohesion: 0.40
Nodes (4): ShopApp.Application.Features.Urun.Commands.DeleteUrunTur, Guid, DeleteUrunTurCommand, DeleteUrunTurCommandValidator

### Community 156 - "ProductCard.js"
Cohesion: 0.15
Nodes (7): createProductCard(), createProductImage(), createProductListLayout(), demoProducts, productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts

### Community 157 - "GetUrunGorselQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunGorselQuery, Guid, GetByIdUrunGorselDto, CancellationToken, Guid, IMapper, Task, GetUrunGorsel (+2 more)

### Community 158 - ".BuildModel"
Cohesion: 0.29
Nodes (5): DateOnly, DateTime, Guid, ModelBuilder, KargoDbContextModelSnapshot

### Community 159 - "BaseEntity"
Cohesion: 0.14
Nodes (12): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+4 more)

### Community 160 - "UpdateUrunOzellikCommand"
Cohesion: 0.40
Nodes (4): ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik, Guid, UpdateUrunOzellikCommand, UpdateUrunOzellikCommandValidator

### Community 161 - "GetUrunOzellikQueryHandler"
Cohesion: 0.21
Nodes (10): GetUrunOzellikQuery, Guid, GetByIdUrunOzellikDto, CancellationToken, Guid, IMapper, Task, GetUrunOzellik (+2 more)

### Community 162 - "ProfilePage.js"
Cohesion: 0.07
Nodes (46): createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner(), createOrderCard(), createStatusBadge(), formatDate(), formatPrice() (+38 more)

### Community 163 - "ShopApp.Application.Features.Urun.Dtos"
Cohesion: 0.24
Nodes (3): ShopApp.Application.Features.Urun.Dtos, ShopApp.Application.Features.Urun.Queries, src.Monolith.ShopApp.Api.Controllers

### Community 165 - "KayitliKullanici"
Cohesion: 0.09
Nodes (20): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+12 more)

### Community 166 - "IdentityUserLoginConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 167 - "AdminUrunController"
Cohesion: 0.05
Nodes (53): ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel, ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel, GetUrunGorselleriQuery, GetUrunOzellikleriQuery, GetUrunTurQuery, ActionResult, CancellationToken, Guid (+45 more)

### Community 168 - "GenericUrunRepository"
Cohesion: 0.38
Nodes (5): GenericUrunRepositoryTests, CancellationToken, Guid, Task, GenericUrunRepository

### Community 169 - "UrunGorsel"
Cohesion: 0.20
Nodes (8): Guid, UrunGorsel, GorselSira, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGorselConfiguration

### Community 170 - "AddMahalleAndConvertPostaKoduToInteger"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMahalleAndConvertPostaKoduToInteger

### Community 171 - "CreateUrunTurCommandHandler"
Cohesion: 0.23
Nodes (9): ShopApp.Application.Features.Urun.Commands.CreateUrunTur, Guid, CreateUrunTurCommand, CancellationToken, Guid, Task, UrunTur, CreateUrunTurCommandHandler (+1 more)

### Community 172 - "Musteri"
Cohesion: 0.67
Nodes (3): Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 173 - "SiparisDurumLookup"
Cohesion: 0.50
Nodes (3): SiparisDurumLookup, DurumIsmi, Id

### Community 174 - "DeleteUrunOzellikCommand"
Cohesion: 0.20
Nodes (9): ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik, Guid, DeleteUrunOzellikCommand, CancellationToken, Task, UrunOzellik, UrunTur, DeleteUrunOzellikCommandHandler (+1 more)

### Community 176 - "CreateUrunOzellikCommandHandler"
Cohesion: 0.21
Nodes (10): ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik, Guid, CreateUrunOzellikCommand, CancellationToken, Guid, Task, UrunOzellik, UrunTur (+2 more)

### Community 178 - "IEntityTypeConfiguration"
Cohesion: 0.28
Nodes (7): IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration, EntityTypeBuilder, AddressConfiguration

### Community 180 - ".GetByIdAsync"
Cohesion: 0.11
Nodes (15): CancellationToken, Guid, Task, CancellationToken, Task, CancellationToken, Task, CancellationToken (+7 more)

### Community 182 - "UrunTur"
Cohesion: 0.17
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAded (+3 more)

### Community 183 - "AddAddressPhone"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddAddressPhone

### Community 185 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 187 - "SepetDurumLookup"
Cohesion: 0.33
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 189 - "AddressDto"
Cohesion: 0.08
Nodes (33): ShopApp.Application.Features.Adres.Dtos, GetMyAddressesQuery, CancellationToken, Task, CancellationToken, Task, CreateAddressCommand, CreateAddressCommandHandler (+25 more)

### Community 193 - "SiparisDurum"
Cohesion: 0.25
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 194 - ".BuildModel"
Cohesion: 0.14
Nodes (10): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot, DateTime, Guid (+2 more)

### Community 197 - ".BuildModel"
Cohesion: 0.33
Nodes (4): DateTime, Guid, ModelBuilder, StokDbContextModelSnapshot

## Knowledge Gaps
- **530 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+525 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1225 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `IdentityService` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `KayitliKullanici` (2× useful, score=1.167199864) _(code changed — re-verify)_
- `ShopAppDbContext` (2× useful, score=1.166756402) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Application.Common.Interfaces` to `Migration`, `.BuildModel`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddMahalleAndConvertPostaKoduToInteger`, `ShopApp.Application.Features.Authentication.DTOs`, `AddRoleSpecificProfiles`, `RemoveAdminProfileTable`, `RebuildAllEntitySchema`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `MakeIdValueGeneratedNever`, `AddAddressPhone`, `SeedSiparisDurumLookup`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `TestDbContext` connect `TestDbContext` to `.Create`, `KargoDbContext`, `.GetAdminOrder_ReturnsShipment_WhenKargoReadServiceHasOne`, `.Create`, `Musteri`, `UpdateAdminOrderStatusCommand`, `IShopAppDbContext`, `SiparisDurumLookup`, `Address`, `SiparisEntity`, `SiparisUrunleri`, `SepetUrunu`, `.For`, `SepetEntity`, `ShopApp.Application.Common.Interfaces`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `.Handle`, `.AddInfrastructure`, `ShopAppDbContext`, `TestDbContext`, `SiparisEntity`, `SepetUrunu`, `.For`, `SepetEntity`, `GetUrunGorselQueryHandler`, `SiparisController`, `GetUrunOzellikQueryHandler`, `AdminUrunController`, `ResultSepetUrunDto`, `Musteri`, `SiparisDurumLookup`, `UpdateAdminOrderStatusCommand`, `AddressDto`, `ShopApp.Application.Common.Interfaces`, `.Create`, `UpdateAdminCustomerCommand`, `Address`, `.GetAll`, `GetAdminOrdersQueryHandler`, `.Create`, `.Handle`, `GetUrunTurleriQueryHandler`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AddressLookupItemDto` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.06852497096399536 - nodes in this community are weakly interconnected._
- **Should `CartPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11827956989247312 - nodes in this community are weakly interconnected._