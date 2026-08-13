# Graph Report - src  (2026-08-13)

## Corpus Check
- 144 files · ~72,328 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 668 nodes · 1158 edges · 48 communities (44 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4b03551`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Musteri
- authService.js
- Urun
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- ShopApp.Infrastructure.Persistence.Migrations
- StokUrunleri
- KargoGonderisi
- LoginPage.js
- ShopApp.Infrastructure.csproj
- ShopApp.Infrastructure.Persistence
- IdentityService
- IJwtTokenGenerator
- IIdentityService
- BaseEntity
- SiparisUrunleri
- JwtTokenGenerator.cs
- Address
- homeService.js
- ShopAppDbContext
- ShopApp – Vanilla JavaScript SPA Frontend
- IEntityTypeConfiguration
- src.Monolith.ShopApp.Domain.Sepet
- cartService.js
- ShopApp.Application.Auth
- appConstants.js
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- CreateUrunRequest.cs
- eventBus.js
- .AddInfrastructure
- AuthController.cs
- AuthRequest.cs
- IdentityRoleSeeder
- AuthenticationValidationException
- Services/KargoServis/Infrastructure/Persistence/KargoDbContext.cs

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 17 edges
2. `ShopApp.Application.Auth` - 15 edges
3. `IdentityService` - 15 edges
4. `navigate()` - 13 edges
5. `LoginPage()` - 12 edges
6. `RegisterPage()` - 11 edges
7. `createFieldError()` - 11 edges
8. `Siparis` - 11 edges
9. `KargoGonderisi` - 11 edges
10. `Urun` - 11 edges

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

## Communities (48 total, 4 thin omitted)

### Community 0 - "Musteri"
Cohesion: 0.24
Nodes (6): ShopApp.Infrastructure.Persistence.Configurations, src.Monolith.ShopApp.Domain.Kullanici, Guid, Musteri, EntityTypeBuilder, MusteriConfiguraiton

### Community 1 - "authService.js"
Cohesion: 0.05
Nodes (59): initApp(), appConfig, bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate() (+51 more)

### Community 2 - "Urun"
Cohesion: 0.07
Nodes (34): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, KategoriServis.Domain.Common, DateTime, Guid, UrunResponse (+26 more)

### Community 3 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.07
Nodes (25): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, EntityTypeBuilder, Guid (+17 more)

### Community 4 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.07
Nodes (17): ShopApp.Infrastructure.Persistence.Migrations, Migration, ModelSnapshot, MigrationBuilder, ModelBuilder, CreateMonolithTables, MigrationBuilder, ModelBuilder (+9 more)

### Community 5 - "StokUrunleri"
Cohesion: 0.09
Nodes (23): StokServis.Infrastructure.Persistence, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common, DbContext, DateTime, Guid, BaseEntity (+15 more)

### Community 6 - "KargoGonderisi"
Cohesion: 0.10
Nodes (23): KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, DateOnly, DateTime, Guid, BaseEntity (+15 more)

### Community 7 - "LoginPage.js"
Cohesion: 0.11
Nodes (44): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+36 more)

### Community 8 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.07
Nodes (26): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk.Web, net10.0 (+18 more)

### Community 9 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.53
Nodes (3): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, ShopApp.Infrastructure

### Community 10 - "IdentityService"
Cohesion: 0.13
Nodes (14): IdentityError, IdentityResult, IdentityUser, Guid, IReadOnlyCollection, Task, IdentityService, DateTime (+6 more)

### Community 11 - "IJwtTokenGenerator"
Cohesion: 0.33
Nodes (3): IEnumerable, IJwtTokenGenerator, JwtToken

### Community 12 - "IIdentityService"
Cohesion: 0.10
Nodes (25): ActionResult, Authorize, ControllerBase, HttpPost, HttpGet, Task, AuthController, Guid (+17 more)

### Community 13 - "BaseEntity"
Cohesion: 0.17
Nodes (10): src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, ICollection, Sepet, Guid, SepetUrunleri (+2 more)

### Community 15 - "JwtTokenGenerator.cs"
Cohesion: 0.29
Nodes (5): ShopApp.Infrastructure.Authentication, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 16 - "Address"
Cohesion: 0.40
Nodes (4): Guid, Address, EntityTypeBuilder, AddressConfiguration

### Community 17 - "homeService.js"
Cohesion: 0.11
Nodes (14): createCategoryCard(), benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories, getHeroCategories(), getSecondaryCategories() (+6 more)

### Community 18 - "ShopAppDbContext"
Cohesion: 0.20
Nodes (8): IdentityDbContext, IDesignTimeDbContextFactory, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 19 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 20 - "IEntityTypeConfiguration"
Cohesion: 0.15
Nodes (9): src.Monolith.ShopApp.Domain.Siparisler, IEntityTypeConfiguration, Guid, ICollection, Siparis, SiparisDurum, SiparisDurumLookup, EntityTypeBuilder (+1 more)

### Community 21 - "src.Monolith.ShopApp.Domain.Sepet"
Cohesion: 0.28
Nodes (5): src.Monolith.ShopApp.Domain.Sepet, SepetDurum, SepetDurumLookup, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 22 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 23 - "ShopApp.Application.Auth"
Cohesion: 0.19
Nodes (4): ShopApp.Application.Auth, ShopApp.Application.Services, ShopApp.Application.Abstractions, IShopAppDbContext

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

### Community 42 - "AuthController.cs"
Cohesion: 0.29
Nodes (4): src.Monolith.ShopApp.Api.Controller, IActionResult, HttpGet, AdminController

### Community 44 - "IdentityRoleSeeder"
Cohesion: 0.33
Nodes (4): IServiceProvider, string, Task, IdentityRoleSeeder

### Community 51 - "AuthenticationValidationException"
Cohesion: 0.50
Nodes (3): Exception, IReadOnlyCollection, AuthenticationValidationException

## Knowledge Gaps
- **78 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Identity` connect `ShopApp.Infrastructure.Persistence` to `Musteri`, `IdentityService`, `IdentityRoleSeeder`, `ShopApp.Application.Auth`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `KayitliKullaniciConfiguration` connect `IdentityService` to `IEntityTypeConfiguration`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `KayitliKullanici` connect `IdentityService` to `ShopAppDbContext`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054203180785459264 - nodes in this community are weakly interconnected._
- **Should `Urun` be split into smaller, more focused modules?**
  _Cohesion score 0.06588235294117648 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.Persistence.Configurations.Identity` be split into smaller, more focused modules?**
  _Cohesion score 0.07207207207207207 - nodes in this community are weakly interconnected._