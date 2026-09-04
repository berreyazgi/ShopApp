# Graph Report - src  (2026-08-19)

## Corpus Check
- 168 files · ~82,495 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 790 nodes · 1317 edges · 54 communities (50 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc60aeea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- router.js
- authStore.js
- Urun
- IEntityTypeConfiguration
- MakeApplicationUserUpdatedAtRequired
- StokUrunleri
- KargoGonderisi
- LoginPage.js
- ShopApp.Infrastructure.csproj
- InitialCreate
- IdentityService
- Header.js
- IIdentityService
- BaseEntity
- AddRoleSpecificProfiles
- apiClient.js
- src.Monolith.ShopApp.Domain.Kullanici
- homeService.js
- ShopAppDbContext
- ShopApp – Vanilla JavaScript SPA Frontend
- src.Monolith.ShopApp.Domain.Common
- Sepet
- cartService.js
- ShopApp.Application.Auth
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- CreateUrunRequest.cs
- eventBus.js
- navigate
- storage.js
- store.js
- src.Monolith.ShopApp.Domain.Sepet
- SepetDto
- ShopApp.Infrastructure.Persistence.Migrations
- AdminProfile
- UpdateMonolithTables
- DatabaseChanges
- Migration
- TurkcheIdentityVeMusteriGuncellemesi
- ShopApp.Application.Sepet.Commands.CreateSepet
- ShopAppDbContextModelSnapshot.cs
- CreateSepetDto.cs
- endpoints.js

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 19 edges
2. `IdentityService` - 18 edges
3. `ShopApp.Application.Auth` - 17 edges
4. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
5. `navigate()` - 13 edges
6. `ShopApp.Infrastructure.Persistence` - 13 edges
7. `LoginPage()` - 12 edges
8. `BaseEntity` - 12 edges
9. `RegisterPage()` - 11 edges
10. `createFieldError()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/FormField.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  Frontend/ShopApp.Web/src/features/auth/components/FormField.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  Frontend/ShopApp.Web/src/app/bootstrap.js → Frontend/ShopApp.Web/src/app/App.js
- `guardedPath()` --indirect_call--> `hasRole()`  [INFERRED]
  Frontend/ShopApp.Web/src/app/router.js → Frontend/ShopApp.Web/src/features/auth/state/authStore.js

## Import Cycles
- None detected.

## Communities (54 total, 4 thin omitted)

### Community 0 - "router.js"
Cohesion: 0.24
Nodes (9): compileRoute(), guardedPath(), matchRoute(), notFoundRoute, routes, hasRole(), isAuthenticated(), NotFoundPage() (+1 more)

### Community 1 - "authStore.js"
Cohesion: 0.22
Nodes (12): AUTH_STATUS, clearError(), getState(), initialState, merge(), notify(), setAnonymous(), setAuthenticated() (+4 more)

### Community 2 - "Urun"
Cohesion: 0.06
Nodes (39): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, KategoriServis.Domain.Common, Product, DateTime, Guid (+31 more)

### Community 3 - "IEntityTypeConfiguration"
Cohesion: 0.07
Nodes (28): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder (+20 more)

### Community 4 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 5 - "StokUrunleri"
Cohesion: 0.05
Nodes (34): StokServis.Infrastructure.Persistence, StokServis.Migrations, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common, DbContext, IDesignTimeDbContextFactory, ModelSnapshot (+26 more)

### Community 6 - "KargoGonderisi"
Cohesion: 0.07
Nodes (28): KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, KargoServis.Migrations, DateOnly, DateTime, Guid (+20 more)

### Community 7 - "LoginPage.js"
Cohesion: 0.07
Nodes (56): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+48 more)

### Community 8 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.07
Nodes (26): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk.Web, net10.0 (+18 more)

### Community 9 - "InitialCreate"
Cohesion: 0.18
Nodes (6): KategoriServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate, ModelBuilder, KategoriDbContextModelSnapshot

### Community 10 - "IdentityService"
Cohesion: 0.16
Nodes (12): IdentityError, IdentityResult, IdentityUserInfo, Guid, IReadOnlyCollection, Task, IdentityService, DateTime (+4 more)

### Community 11 - "Header.js"
Cohesion: 0.19
Nodes (7): subscribe(), benefits, createFeatureBenefits(), navItems, createIcon(), icons, subscribe()

### Community 12 - "IIdentityService"
Cohesion: 0.07
Nodes (32): ActionResult, Authorize, ControllerBase, HashSet, IActionResult, Guid, HttpGet, HttpPost (+24 more)

### Community 13 - "BaseEntity"
Cohesion: 0.15
Nodes (10): DateTime, Guid, BaseEntity, Guid, ICollection, Siparis, Guid, SiparisUrunleri (+2 more)

### Community 14 - "AddRoleSpecificProfiles"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 15 - "apiClient.js"
Cohesion: 0.23
Nodes (8): appConfig, apiClient, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), TODO: Retrieve JWT from store or localStorage when auth is implemented., request(), serviceRegistry

### Community 16 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.16
Nodes (9): src.Monolith.ShopApp.Domain.Kullanici, Guid, Address, Guid, Musteri, EntityTypeBuilder, AddressConfiguration, EntityTypeBuilder (+1 more)

### Community 17 - "homeService.js"
Cohesion: 0.17
Nodes (10): createCategoryCard(), createHeroCategoryGrid(), heroCategories, secondaryCategories, getHeroCategories(), getSecondaryCategories(), TODO: Integrate with Catalog API or Catalog Microservice., TODO: Integrate with Catalog API or Catalog Microservice. (+2 more)

### Community 18 - "ShopAppDbContext"
Cohesion: 0.20
Nodes (8): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, SepetUrunleri, ShopAppDbContext, ShopAppDbContextFactory

### Community 19 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 20 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.29
Nodes (4): src.Monolith.ShopApp.Domain.Common, src.Monolith.ShopApp.Domain.Siparisler, SiparisDurumLookup, SiparisDurum

### Community 21 - "Sepet"
Cohesion: 0.16
Nodes (11): src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure.Persistence.Configurations, ICollection, Sepet, SepetDurumLookup, Guid, SepetUrunleri, EntityTypeBuilder (+3 more)

### Community 22 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 23 - "ShopApp.Application.Auth"
Cohesion: 0.05
Nodes (30): ShopApp.Application.Auth, ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Authentication, ShopApp.Infrastructure.Persistence, ShopApp.Application.Services, ShopApp.Infrastructure, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions (+22 more)

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

### Community 38 - "navigate"
Cohesion: 0.42
Nodes (8): initApp(), bootstrap(), initRouter(), navigate(), render(), logout(), createHeader(), initStore()

### Community 39 - "storage.js"
Cohesion: 0.22
Nodes (3): TODO: Implement token storage strategy during backend integration., TODO: Read from the configured storage strategy., TODO: Clear the configured token storage.

### Community 40 - "store.js"
Cohesion: 0.36
Nodes (7): getState(), initialState, notify(), resetStore(), setState(), state, subscribers

### Community 41 - "src.Monolith.ShopApp.Domain.Sepet"
Cohesion: 0.29
Nodes (5): src.Monolith.ShopApp.Domain.Sepet, SepetDurum, Guid, Sepet, SepetUrunleri

### Community 42 - "SepetDto"
Cohesion: 0.33
Nodes (5): ShopApp.Application.Sepet.Queries, Guid, List, SepetDto, SepetUrunDto

### Community 43 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 44 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 45 - "UpdateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 46 - "DatabaseChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 47 - "Migration"
Cohesion: 0.25
Nodes (4): Migration, MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 48 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 49 - "ShopApp.Application.Sepet.Commands.CreateSepet"
Cohesion: 0.40
Nodes (3): ShopApp.Application.Sepet.Commands.CreateSepet, CreateSepet, CreateSepetCommandValidator

## Knowledge Gaps
- **81 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Application.Auth` to `MakeApplicationUserUpdatedAtRequired`, `ShopApp.Infrastructure.Persistence.Migrations`, `UpdateMonolithTables`, `DatabaseChanges`, `Migration`, `TurkcheIdentityVeMusteriGuncellemesi`, `AddRoleSpecificProfiles`, `ShopAppDbContextModelSnapshot.cs`, `ShopAppDbContext`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `IdentityService`, `AdminProfile`, `BaseEntity`, `src.Monolith.ShopApp.Domain.Kullanici`, `src.Monolith.ShopApp.Domain.Common`, `Sepet`, `ShopApp.Application.Auth`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `IdentityService` connect `IdentityService` to `ShopAppDbContext`, `IIdentityService`, `ShopApp.Application.Auth`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Urun` be split into smaller, more focused modules?**
  _Cohesion score 0.056107539450613676 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.06852497096399536 - nodes in this community are weakly interconnected._
- **Should `StokUrunleri` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._