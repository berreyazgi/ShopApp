# Graph Report - src  (2026-09-02)

## Corpus Check
- 208 files · ~122,739 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1105 nodes · 2017 edges · 59 communities (56 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src.Monolith.ShopApp.Domain.Sepet.Entities
- IIdentityService
- Urun
- BaseEntity
- MakeApplicationUserUpdatedAtRequired
- StokUrunleri
- KargoGonderisi
- LoginPage.js
- ShopApp.Infrastructure.csproj
- InitialCreate
- Migration
- homeService.js
- IdentityService
- src.Monolith.ShopApp.Domain.Siparisler
- AddRoleSpecificProfiles
- CreateSepetCommandHandler
- ShopAppDbContextModelSnapshot
- InfrastructureInitializer
- ShopAppDbContext
- ShopApp – Vanilla JavaScript SPA Frontend
- src.Monolith.ShopApp.Domain.Common
- ShopApp.Infrastructure.Persistence.Configurations
- cartService.js
- .SaveChangesAsync
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- CreateUrunRequest.cs
- eventBus.js
- ShopAppFrontendAGENTS.md
- authService.js
- CreateMonolithTables
- ShopApp.Infrastructure.Persistence.Migrations
- UpdateMonolithTables
- DatabaseChanges
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- IRequest
- AuthResponse
- SepetUrunu
- .AssignRole
- ShopApp.Application.Abstractions
- ShopApp.Application.Authentication
- package.json
- SepetController
- IEntityTypeConfiguration
- ShopApp.Application.Siparis.Commands.CreateSiparis
- AdminProfile
- SepetEntity
- GetSiparis.cs

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
- `initApp()` --calls--> `navigate()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/App.js → Frontend/ShopApp.Web/src/app/router.js
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/bootstrap.js → Frontend/ShopApp.Web/src/app/App.js

## Import Cycles
- None detected.

## Communities (59 total, 3 thin omitted)

### Community 0 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.21
Nodes (6): src.Monolith.ShopApp.Domain.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, SepetDurumLookup, SepetDurum, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 1 - "IIdentityService"
Cohesion: 0.18
Nodes (10): RegisterRequest, Guid, IReadOnlyCollection, string, Task, AuthService, Guid, IReadOnlyCollection (+2 more)

### Community 2 - "Urun"
Cohesion: 0.06
Nodes (39): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, KategoriServis.Domain.Common, Product, DateTime, Guid (+31 more)

### Community 3 - "BaseEntity"
Cohesion: 0.22
Nodes (7): DateTime, Guid, BaseEntity, Guid, SiparisUrunleri, EntityTypeBuilder, SiparisUrunleriConfiguration

### Community 4 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 5 - "StokUrunleri"
Cohesion: 0.08
Nodes (25): StokServis.Infrastructure.Persistence, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common, DbContext, IDesignTimeDbContextFactory, DateTime, Guid (+17 more)

### Community 6 - "KargoGonderisi"
Cohesion: 0.08
Nodes (25): KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, KargoServis.Migrations, DateOnly, DateTime, Guid (+17 more)

### Community 7 - "LoginPage.js"
Cohesion: 0.11
Nodes (45): RFC-5322, navigate(), createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons() (+37 more)

### Community 8 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (30): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk.Web, net10.0 (+22 more)

### Community 9 - "InitialCreate"
Cohesion: 0.08
Nodes (15): KategoriServis.Migrations, StokServis.Migrations, ModelSnapshot, ModelBuilder, KargoDbContextModelSnapshot, MigrationBuilder, ModelBuilder, InitialCreate (+7 more)

### Community 10 - "Migration"
Cohesion: 0.33
Nodes (4): Migration, MigrationBuilder, ModelBuilder, IlkMigrasyon

### Community 11 - "homeService.js"
Cohesion: 0.08
Nodes (18): BENEFITS, INITIAL_CART_ITEMS, createCategoryCard(), benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories (+10 more)

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
Cohesion: 0.11
Nodes (19): GetSepetQuery, IRequestHandler, CancellationToken, Guid, Task, ISepetRepository, CancellationToken, CreateSepetCommand (+11 more)

### Community 17 - "InfrastructureInitializer"
Cohesion: 0.20
Nodes (8): IHostedService, IServiceProvider, CancellationToken, Task, InfrastructureInitializer, string, Task, IdentityRoleSeeder

### Community 18 - "ShopAppDbContext"
Cohesion: 0.22
Nodes (7): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 19 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 20 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.14
Nodes (10): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, Guid, Address, Guid, Musteri, EntityTypeBuilder, AddressConfiguration (+2 more)

### Community 21 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.19
Nodes (7): ShopApp.Infrastructure.Persistence.Configurations, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, SepetUrunuConfiguration

### Community 22 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 23 - ".SaveChangesAsync"
Cohesion: 0.11
Nodes (21): CancellationToken, DbSet, SiparisUrunleri, Task, IShopAppDbContext, Guid, IMapper, List (+13 more)

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

### Community 39 - "ShopAppFrontendAGENTS.md"
Cohesion: 0.05
Nodes (39): 10. Cart Page Requirements, 11. Cart Client-Side Interactions, 12. Cart Empty State, 13. Orders Page Requirements, 14. Order Details Interaction, 15. Orders Empty State, 16. Demo Data, 17. Separation of Responsibilities (+31 more)

### Community 40 - "authService.js"
Cohesion: 0.06
Nodes (54): initApp(), appConfig, bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), render() (+46 more)

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

### Community 49 - "IRequest"
Cohesion: 0.06
Nodes (42): ShopApp.Application.Services.SiparisServices, ShopApp.Application.Services.SiparisUrunServices, ShopApp.Application.Dtos.SiparisDtos, ShopApp.Application.Dtos.SiparisUrunleriDto, IRequest, ActionResult, Guid, HttpDelete (+34 more)

### Community 50 - "AuthResponse"
Cohesion: 0.14
Nodes (14): Authorize, ControllerBase, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+6 more)

### Community 51 - "SepetUrunu"
Cohesion: 0.36
Nodes (6): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu

### Community 56 - ".AssignRole"
Cohesion: 0.18
Nodes (8): HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController, AssignRoleRequest

### Community 57 - "ShopApp.Application.Abstractions"
Cohesion: 0.05
Nodes (29): ShopApp.Infrastructure.Authentication, ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Dtos.SepetUrunDtos, ShopApp.Application.Mapping, ShopApp.Application.Sepet.Queries, ShopApp.Infrastructure, ShopApp.Application.Services.SepetUrunService, ShopApp.Application.Services.SepetUrunleri (+21 more)

### Community 58 - "ShopApp.Application.Authentication"
Cohesion: 0.12
Nodes (9): ShopApp.Application.Authentication, Exception, IReadOnlyCollection, AuthenticationValidationException, List, AuthRequest, JwtToken, IEnumerable (+1 more)

### Community 59 - "package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 60 - "SepetController"
Cohesion: 0.07
Nodes (35): ActionResult, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult, List (+27 more)

### Community 64 - "IEntityTypeConfiguration"
Cohesion: 0.05
Nodes (35): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUser, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken (+27 more)

### Community 67 - "ShopApp.Application.Siparis.Commands.CreateSiparis"
Cohesion: 0.29
Nodes (4): ShopApp.Application.Siparis.Commands.CreateSiparis, CreateSiparis, CreateSiparisCommandHandler, CreateSiparisCommandValidator

### Community 70 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 74 - "SepetEntity"
Cohesion: 0.29
Nodes (7): Guid, ICollection, SepetEntity, CancellationToken, Guid, Task, SepetRepository

### Community 84 - "GetSiparis.cs"
Cohesion: 0.50
Nodes (3): ShopApp.Application.Siparis.Queries, Command, GetSiparis

## Knowledge Gaps
- **130 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence.Migrations` to `IEntityTypeConfiguration`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `SepetEntity`, `ShopAppDbContext`, `ShopApp.Application.Abstractions`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `src.Monolith.ShopApp.Domain.Sepet.Entities`, `IEntityTypeConfiguration`, `BaseEntity`, `AdminProfile`, `SepetEntity`, `IdentityService`, `src.Monolith.ShopApp.Domain.Siparisler`, `SepetUrunu`, `src.Monolith.ShopApp.Domain.Common`, `.SaveChangesAsync`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `.SaveChangesAsync` to `SepetEntity`, `src.Monolith.ShopApp.Domain.Siparisler`, `ShopAppDbContext`, `SepetUrunu`, `SepetController`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Urun` be split into smaller, more focused modules?**
  _Cohesion score 0.056107539450613676 - nodes in this community are weakly interconnected._
- **Should `StokUrunleri` be split into smaller, more focused modules?**
  _Cohesion score 0.08250355618776671 - nodes in this community are weakly interconnected._
- **Should `KargoGonderisi` be split into smaller, more focused modules?**
  _Cohesion score 0.07804878048780488 - nodes in this community are weakly interconnected._