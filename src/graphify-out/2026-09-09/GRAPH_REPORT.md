# Graph Report - src  (2026-09-02)

## Corpus Check
- 218 files · ~122,778 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1122 nodes · 2032 edges · 86 communities (83 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Domain.Sepet.Entities
- AuthService
- KategoriDbContext
- ResultSiparisDto
- MakeApplicationUserUpdatedAtRequired
- StokUrunleri
- KargoDbContext
- LoginPage.js
- ShopApp.Infrastructure.csproj
- InitialCreate
- Migration
- homeService.js
- IdentityService
- src.Monolith.ShopApp.Domain.Siparisler
- AddRoleSpecificProfiles
- CreateSepetCommandHandler
- ModelSnapshot
- authService.js
- ShopAppDbContext
- ShopApp – Vanilla JavaScript SPA Frontend
- BaseEntity
- ShopApp.Infrastructure.Persistence.Configurations
- cartService.js
- .SaveChangesAsync
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- CreateUrunRequest.cs
- eventBus.js
- router.js
- IEntityTypeConfiguration
- ShopAppFrontendAGENTS.md
- App.js
- IJwtTokenGenerator
- ShopApp.Application.Dtos.SiparisUrunleriDto
- CreateMonolithTables
- ShopApp.Infrastructure.Persistence.Migrations
- UpdateMonolithTables
- DatabaseChanges
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- SiparisController
- AuthResponse
- SepetUrunu
- CartPage.js
- SiparisUrunService
- apiClient.js
- .AssignRole
- ShopApp.Application.Abstractions
- ShopApp.Application.Authentication
- package.json
- IRequest
- authStore.js
- ResultSiparisUrunleriDto
- IIdentityService
- ShopApp.Infrastructure.Identity
- KargoServis.Domain.Entities
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- ShopApp.Application.Siparis.Commands.CreateSiparis
- UrunResponse
- ISiparisService
- AdminProfile
- Kategori
- Sevkiyat
- KategoriServis.Domain.Entities
- SepetEntity
- Urun
- UrunTur
- IdentityUserTokenConfiguration
- UrunGorseli
- UrunOzelligi
- IdentityRoleClaimConfiguration
- IdentityUserLoginConfiguration
- IdentityUserRoleConfiguration
- IdentityRoleConfiguration
- GetSiparis.cs
- BaseEntity

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Abstractions` - 21 edges
2. `ShopAppDbContext` - 21 edges
3. `IdentityService` - 20 edges
4. `ShopApp.Application.Authentication` - 17 edges
5. `SepetEntity` - 16 edges
6. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
7. `SepetController` - 14 edges
8. `SiparisController` - 14 edges
9. `src.Monolith.ShopApp.Domain.Sepet.Entities` - 14 edges
10. `SepetUrunu` - 14 edges

## Surprising Connections (you probably didn't know these)
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/FormField.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/FormField.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `initApp()` --calls--> `initRouter()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/App.js → Frontend/ShopApp.Web/src/app/router.js
- `initApp()` --calls--> `navigate()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/App.js → Frontend/ShopApp.Web/src/app/router.js

## Import Cycles
- None detected.

## Communities (86 total, 3 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.21
Nodes (6): src.Monolith.ShopApp.Domain.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, SepetDurumLookup, SepetDurum, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 1 - "AuthService"
Cohesion: 0.23
Nodes (6): RegisterRequest, Guid, IReadOnlyCollection, string, Task, AuthService

### Community 2 - "KategoriDbContext"
Cohesion: 0.24
Nodes (5): KategoriServis.Infrastructure.Persistence, DbSet, ModelBuilder, KategoriDbContext, KategoriDbContextFactory

### Community 3 - "ResultSiparisDto"
Cohesion: 0.13
Nodes (12): ShopApp.Application.Services.SiparisServices, ShopApp.Application.Dtos.SiparisDtos, Guid, CreateSiparisDto, GetByIdSiparisDto, ResultSiparisDto, UpdateSiparisDto, Guid (+4 more)

### Community 4 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 5 - "StokUrunleri"
Cohesion: 0.05
Nodes (32): StokServis.Infrastructure.Persistence, StokServis.Migrations, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common, DateTime, Guid (+24 more)

### Community 6 - "KargoDbContext"
Cohesion: 0.20
Nodes (7): KargoServis.Infrastructure.Persistence, DbContext, IDesignTimeDbContextFactory, DbSet, ModelBuilder, KargoDbContext, KargoDbContextFactory

### Community 7 - "LoginPage.js"
Cohesion: 0.11
Nodes (44): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+36 more)

### Community 8 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (30): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk.Web, net10.0 (+22 more)

### Community 9 - "InitialCreate"
Cohesion: 0.28
Nodes (4): KategoriServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate

### Community 10 - "Migration"
Cohesion: 0.24
Nodes (5): KargoServis.Migrations, Migration, MigrationBuilder, ModelBuilder, IlkMigrasyon

### Community 11 - "homeService.js"
Cohesion: 0.17
Nodes (10): createCategoryCard(), createHeroCategoryGrid(), heroCategories, secondaryCategories, getHeroCategories(), getSecondaryCategories(), TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice. (+2 more)

### Community 12 - "IdentityService"
Cohesion: 0.20
Nodes (10): IdentityError, IdentityResult, IHttpContextAccessor, IdentityUserInfo, Guid, IReadOnlyCollection, Task, IdentityService (+2 more)

### Community 13 - "src.Monolith.ShopApp.Domain.Siparisler"
Cohesion: 0.18
Nodes (8): src.Monolith.ShopApp.Domain.Siparisler, SiparisDurumLookup, Guid, ICollection, SiparisEntity, SiparisDurum, EntityTypeBuilder, SiparisConfiguration

### Community 14 - "AddRoleSpecificProfiles"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 15 - "CreateSepetCommandHandler"
Cohesion: 0.32
Nodes (7): IRequestHandler, CancellationToken, CreateSepetCommand, Guid, IMapper, Task, CreateSepetCommandHandler

### Community 16 - "ModelSnapshot"
Cohesion: 0.17
Nodes (7): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot, ModelBuilder, KargoDbContextModelSnapshot, ModelBuilder, KategoriDbContextModelSnapshot

### Community 17 - "authService.js"
Cohesion: 0.21
Nodes (12): establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession(), setAnonymous() (+4 more)

### Community 18 - "ShopAppDbContext"
Cohesion: 0.22
Nodes (7): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 19 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 20 - "BaseEntity"
Cohesion: 0.12
Nodes (13): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, Guid, Address, Guid (+5 more)

### Community 21 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.15
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations, Guid, SiparisUrunleri, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+1 more)

### Community 22 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 23 - ".SaveChangesAsync"
Cohesion: 0.15
Nodes (15): CancellationToken, DbSet, SiparisUrunleri, Task, IShopAppDbContext, Guid, IMapper, List (+7 more)

### Community 24 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 26 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 27 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 28 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 29 - "CreateUrunRequest.cs"
Cohesion: 0.50
Nodes (3): KategoriServis.Application.DTOs.Requests, Guid, CreateUrunRequest

### Community 32 - "router.js"
Cohesion: 0.24
Nodes (12): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, routes (+4 more)

### Community 38 - "IEntityTypeConfiguration"
Cohesion: 0.17
Nodes (12): DateOnly, IEntityTypeConfiguration, Guid, KargoDurumGecmisi, Guid, ICollection, KargoGonderisi, KargoDurumu (+4 more)

### Community 39 - "ShopAppFrontendAGENTS.md"
Cohesion: 0.05
Nodes (39): 10. Cart Page Requirements, 11. Cart Client-Side Interactions, 12. Cart Empty State, 13. Orders Page Requirements, 14. Order Details Interaction, 15. Orders Empty State, 16. Demo Data, 17. Separation of Responsibilities (+31 more)

### Community 40 - "App.js"
Cohesion: 0.18
Nodes (15): initApp(), bootstrap(), subscribe(), createHeader(), navItems, setUnauthorizedHandler(), getState(), initialState (+7 more)

### Community 41 - "IJwtTokenGenerator"
Cohesion: 0.16
Nodes (8): ShopApp.Infrastructure.Authentication, JwtToken, IEnumerable, IJwtTokenGenerator, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 42 - "ShopApp.Application.Dtos.SiparisUrunleriDto"
Cohesion: 0.15
Nodes (8): ShopApp.Application.Services.SiparisUrunServices, ShopApp.Application.Dtos.SiparisUrunleriDto, Guid, CreateSiparisUrunleriDto, Guid, GetByIdSiparisUrunleriDto, Guid, UpdateSiparisUrunleriDto

### Community 43 - "CreateMonolithTables"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 45 - "UpdateMonolithTables"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 46 - "DatabaseChanges"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 47 - "AddMonolithDomainChanges"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 48 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 49 - "SiparisController"
Cohesion: 0.26
Nodes (10): ActionResult, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult, List (+2 more)

### Community 50 - "AuthResponse"
Cohesion: 0.15
Nodes (15): Authorize, ControllerBase, HashSet, AdminController, ActionResult, HttpGet, HttpPost, Task (+7 more)

### Community 51 - "SepetUrunu"
Cohesion: 0.26
Nodes (8): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu, EntityTypeBuilder, SepetUrunuConfiguration

### Community 52 - "CartPage.js"
Cohesion: 0.18
Nodes (6): BENEFITS, INITIAL_CART_ITEMS, benefits, createFeatureBenefits(), createIcon(), icons

### Community 53 - "SiparisUrunService"
Cohesion: 0.36
Nodes (6): Guid, IMapper, List, Task, SiparisUrunService, SiparisUrunleriEntity

### Community 55 - "apiClient.js"
Cohesion: 0.24
Nodes (8): appConfig, apiClient, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 56 - ".AssignRole"
Cohesion: 0.22
Nodes (6): Guid, HttpGet, HttpPost, IActionResult, Task, AssignRoleRequest

### Community 57 - "ShopApp.Application.Abstractions"
Cohesion: 0.06
Nodes (23): ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Mapping, ShopApp.Application.Sepet.Queries, ShopApp.Infrastructure, ShopApp.Application.Services.SepetUrunService, ShopApp.Application.Services.SepetUrunleri, ShopApp.Application.Sepet.Commands.CreateSepet, ShopApp.Application.Services.SepetServices (+15 more)

### Community 58 - "ShopApp.Application.Authentication"
Cohesion: 0.15
Nodes (7): ShopApp.Application.Authentication, Exception, IReadOnlyCollection, AuthenticationValidationException, List, AuthRequest, LoginRequest

### Community 59 - "package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 60 - "IRequest"
Cohesion: 0.06
Nodes (46): ShopApp.Application.Dtos.SepetUrunDtos, GetSepetQuery, IRequest, ActionResult, Guid, HttpDelete, HttpGet, HttpPost (+38 more)

### Community 61 - "authStore.js"
Cohesion: 0.24
Nodes (10): AUTH_STATUS, clearError(), getState(), initialState, merge(), notify(), setError(), setLoading() (+2 more)

### Community 62 - "ResultSiparisUrunleriDto"
Cohesion: 0.35
Nodes (6): Guid, ResultSiparisUrunleriDto, Guid, List, Task, ISiparisUrunService

### Community 63 - "IIdentityService"
Cohesion: 0.33
Nodes (4): Guid, IReadOnlyCollection, Task, IIdentityService

### Community 64 - "ShopApp.Infrastructure.Identity"
Cohesion: 0.10
Nodes (17): ShopApp.Infrastructure.Identity, IdentityUser, IHostedService, IServiceProvider, CancellationToken, Task, InfrastructureInitializer, Guid (+9 more)

### Community 65 - "KargoServis.Domain.Entities"
Cohesion: 0.27
Nodes (4): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities

### Community 66 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.22
Nodes (5): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityUserClaim, EntityTypeBuilder, Guid, IdentityUserClaimConfiguration

### Community 67 - "ShopApp.Application.Siparis.Commands.CreateSiparis"
Cohesion: 0.29
Nodes (4): ShopApp.Application.Siparis.Commands.CreateSiparis, CreateSiparis, CreateSiparisCommandHandler, CreateSiparisCommandValidator

### Community 68 - "UrunResponse"
Cohesion: 0.25
Nodes (6): KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, DateTime, Guid, UrunResponse, UrunMappingExtensions

### Community 69 - "ISiparisService"
Cohesion: 0.39
Nodes (4): Guid, List, Task, ISiparisService

### Community 70 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Kategori"
Cohesion: 0.29
Nodes (6): KategoriServis.Infrastructure.Persistence.Configurations, Guid, ICollection, Kategori, EntityTypeBuilder, KategoriConfiguration

### Community 72 - "Sevkiyat"
Cohesion: 0.29
Nodes (7): DateTime, Guid, BaseEntity, ICollection, Sevkiyat, EntityTypeBuilder, SevkiyatConfiguration

### Community 74 - "SepetEntity"
Cohesion: 0.18
Nodes (11): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, CancellationToken (+3 more)

### Community 75 - "Urun"
Cohesion: 0.33
Nodes (5): Guid, ICollection, Urun, EntityTypeBuilder, UrunConfiguration

### Community 76 - "UrunTur"
Cohesion: 0.33
Nodes (5): Guid, ICollection, UrunTur, EntityTypeBuilder, UrunTurConfiguration

### Community 77 - "IdentityUserTokenConfiguration"
Cohesion: 0.47
Nodes (4): IdentityUserToken, EntityTypeBuilder, Guid, IdentityUserTokenConfiguration

### Community 78 - "UrunGorseli"
Cohesion: 0.40
Nodes (4): Guid, UrunGorseli, EntityTypeBuilder, UrunGorseliConfiguration

### Community 79 - "UrunOzelligi"
Cohesion: 0.40
Nodes (4): Guid, UrunOzelligi, EntityTypeBuilder, UrunOzelligiConfiguration

### Community 80 - "IdentityRoleClaimConfiguration"
Cohesion: 0.60
Nodes (4): IdentityRoleClaim, EntityTypeBuilder, Guid, IdentityRoleClaimConfiguration

### Community 81 - "IdentityUserLoginConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserLogin, EntityTypeBuilder, Guid, IdentityUserLoginConfiguration

### Community 82 - "IdentityUserRoleConfiguration"
Cohesion: 0.60
Nodes (4): IdentityUserRole, EntityTypeBuilder, Guid, IdentityUserRoleConfiguration

### Community 83 - "IdentityRoleConfiguration"
Cohesion: 0.60
Nodes (4): EntityTypeBuilder, Guid, IdentityRole, IdentityRoleConfiguration

### Community 84 - "GetSiparis.cs"
Cohesion: 0.50
Nodes (3): ShopApp.Application.Siparis.Queries, Command, GetSiparis

### Community 85 - "BaseEntity"
Cohesion: 0.50
Nodes (3): DateTime, Guid, BaseEntity

## Knowledge Gaps
- **130 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence.Migrations` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ShopApp.Application.Abstractions`, `SepetEntity`, `ShopAppDbContext`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ShopApp.Infrastructure.Identity`, `AdminProfile`, `SepetEntity`, `IdentityService`, `src.Monolith.ShopApp.Domain.Siparisler`, `SepetUrunu`, `BaseEntity`, `ShopApp.Infrastructure.Persistence.Configurations`, `.SaveChangesAsync`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `.SaveChangesAsync` to `ResultSiparisDto`, `SepetEntity`, `src.Monolith.ShopApp.Domain.Siparisler`, `ShopAppDbContext`, `SepetUrunu`, `SiparisUrunService`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ResultSiparisDto` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
- **Should `StokUrunleri` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._
- **Should `LoginPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10714285714285714 - nodes in this community are weakly interconnected._