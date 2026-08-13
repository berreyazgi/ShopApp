# Graph Report - src  (2026-08-13)

## Corpus Check
- 157 files · ~79,295 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 727 nodes · 1272 edges · 52 communities (51 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4b03551`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Musteri
- authService.js
- Urun
- IEntityTypeConfiguration
- Migration
- StokUrunleri
- KargoGonderisi
- LoginPage.js
- ShopApp.Infrastructure.csproj
- ShopApp.Infrastructure.Persistence
- IdentityService
- AuthResponse
- IIdentityService
- BaseEntity
- ShopApp.Infrastructure.Persistence.Migrations
- IJwtTokenGenerator
- Address
- homeService.js
- ShopAppDbContext
- ShopApp – Vanilla JavaScript SPA Frontend
- Siparis
- Sepet
- cartService.js
- ShopApp.Application.Auth
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- CreateUrunRequest.cs
- eventBus.js
- .AddInfrastructure
- .AssignRole
- CreateMonolithTables
- IdentityRoleSeeder
- UpdateMonolithTables
- DatabaseChanges
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- IlkMigrasyon
- AuthenticationValidationException

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 19 edges
2. `IdentityService` - 18 edges
3. `ShopApp.Application.Auth` - 17 edges
4. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
5. `navigate()` - 13 edges
6. `ShopApp.Infrastructure.Persistence` - 13 edges
7. `LoginPage()` - 12 edges
8. `RegisterPage()` - 11 edges
9. `createFieldError()` - 11 edges
10. `IIdentityService` - 11 edges

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

## Communities (52 total, 1 thin omitted)

### Community 0 - "Musteri"
Cohesion: 0.47
Nodes (4): Guid, Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 1 - "authService.js"
Cohesion: 0.05
Nodes (60): initApp(), appConfig, bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate() (+52 more)

### Community 2 - "Urun"
Cohesion: 0.06
Nodes (35): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, KategoriServis.Domain.Common, DateTime, Guid, UrunResponse (+27 more)

### Community 3 - "IEntityTypeConfiguration"
Cohesion: 0.07
Nodes (28): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder (+20 more)

### Community 4 - "Migration"
Cohesion: 0.25
Nodes (4): Migration, MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 5 - "StokUrunleri"
Cohesion: 0.09
Nodes (23): StokServis.Infrastructure.Persistence, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common, DateTime, Guid, BaseEntity, ICollection (+15 more)

### Community 6 - "KargoGonderisi"
Cohesion: 0.06
Nodes (32): KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, KargoServis.Migrations, DateOnly, DbContext, IDesignTimeDbContextFactory (+24 more)

### Community 7 - "LoginPage.js"
Cohesion: 0.11
Nodes (44): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+36 more)

### Community 8 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.07
Nodes (26): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk.Web, net10.0 (+18 more)

### Community 9 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.30
Nodes (5): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, ShopApp.Infrastructure.Persistence.Configurations, ShopApp.Infrastructure, src.Monolith.ShopApp.Domain.Kullanici

### Community 10 - "IdentityService"
Cohesion: 0.13
Nodes (15): IdentityError, IdentityResult, IdentityUser, IdentityUserInfo, Guid, IReadOnlyCollection, Task, IdentityService (+7 more)

### Community 11 - "AuthResponse"
Cohesion: 0.16
Nodes (13): ActionResult, Authorize, HttpGet, HttpPost, Task, AuthController, Guid, Task (+5 more)

### Community 12 - "IIdentityService"
Cohesion: 0.19
Nodes (10): Guid, IReadOnlyCollection, Task, IIdentityService, RegisterRequest, Guid, IReadOnlyCollection, string (+2 more)

### Community 13 - "BaseEntity"
Cohesion: 0.18
Nodes (8): src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, Guid, AdminProfile, Guid, SepetUrunleri

### Community 14 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 15 - "IJwtTokenGenerator"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Authentication, IEnumerable, IJwtTokenGenerator, JwtToken, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 16 - "Address"
Cohesion: 0.40
Nodes (4): Guid, Address, EntityTypeBuilder, AddressConfiguration

### Community 17 - "homeService.js"
Cohesion: 0.11
Nodes (13): benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories, getHeroCategories(), getSecondaryCategories(), TODO: Integrate with Catalog API or Catalog Microservice. (+5 more)

### Community 18 - "ShopAppDbContext"
Cohesion: 0.22
Nodes (7): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 19 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 20 - "Siparis"
Cohesion: 0.14
Nodes (10): src.Monolith.ShopApp.Domain.Siparisler, Guid, ICollection, Siparis, SiparisDurum, SiparisDurumLookup, Guid, SiparisUrunleri (+2 more)

### Community 21 - "Sepet"
Cohesion: 0.17
Nodes (9): src.Monolith.ShopApp.Domain.Sepet, ICollection, Sepet, SepetDurum, SepetDurumLookup, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+1 more)

### Community 22 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 23 - "ShopApp.Application.Auth"
Cohesion: 0.22
Nodes (6): ShopApp.Application.Auth, ShopApp.Application.Services, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions, List, AuthRequest

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

### Community 41 - ".AddInfrastructure"
Cohesion: 0.50
Nodes (3): IConfiguration, IServiceCollection, DependencyInjection

### Community 42 - ".AssignRole"
Cohesion: 0.18
Nodes (9): ControllerBase, HashSet, IActionResult, Guid, HttpGet, HttpPost, Task, AdminController (+1 more)

### Community 43 - "CreateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 44 - "IdentityRoleSeeder"
Cohesion: 0.33
Nodes (4): IServiceProvider, string, Task, IdentityRoleSeeder

### Community 45 - "UpdateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 46 - "DatabaseChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 47 - "AddMonolithDomainChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 48 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 49 - "IlkMigrasyon"
Cohesion: 0.40
Nodes (3): MigrationBuilder, ModelBuilder, IlkMigrasyon

### Community 51 - "AuthenticationValidationException"
Cohesion: 0.50
Nodes (3): Exception, IReadOnlyCollection, AuthenticationValidationException

## Knowledge Gaps
- **75 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence` to `Migration`, `KargoGonderisi`, `CreateMonolithTables`, `UpdateMonolithTables`, `DatabaseChanges`, `AddMonolithDomainChanges`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopApp.Infrastructure.Persistence.Migrations`, `ShopAppDbContext`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `Musteri`, `ShopApp.Infrastructure.Persistence`, `IdentityService`, `BaseEntity`, `Address`, `Siparis`, `Sepet`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `IdentityService` connect `IdentityService` to `ShopApp.Infrastructure.Persistence`, `ShopAppDbContext`, `IIdentityService`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05348101265822785 - nodes in this community are weakly interconnected._
- **Should `Urun` be split into smaller, more focused modules?**
  _Cohesion score 0.06219426974143955 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.06951219512195123 - nodes in this community are weakly interconnected._