# Graph Report - ShopApp  (2026-08-13)

## Corpus Check
- 169 files · ~93,847 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 875 nodes · 1397 edges · 75 communities (65 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4b03551`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Auth
- homeService.js
- ShopApp.Infrastructure.csproj
- authService.js
- ShopAppDbContextModelSnapshot.cs
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- Address
- ShopAppDbContext
- BaseEntity
- IEntityTypeConfiguration
- AddRoleSpecificProfiles
- cartService.js
- appConstants.js
- src.Monolith.ShopApp.Domain.Common
- agents.md
- eventBus.js
- Urun
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- StokUrunleri
- IdentityService
- AuthResponse
- Migration
- ShopApp – Vanilla JavaScript SPA Frontend
- KargoGonderisi
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- IJwtTokenGenerator
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- ShopApp.Infrastructure.Persistence
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- ShopApp.Infrastructure.Persistence.Migrations
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- AddMonolithDomainChanges
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- IdentityRoleSeeder
- ShopApp.Domain.csproj
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CreateUrunRequest.cs
- AGENTS.md — ShopApp AI Coding Agent Guide
- 4. Domain Layer
- 5. Application Layer
- graphify
- extraction-spec.md
- AuthenticationValidationException
- AdminProfile
- Services/KargoServis/Infrastructure/Persistence/KargoDbContext.cs
- Musteri
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- .AddInfrastructure
- AuthRequest.cs

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 19 edges
2. `IdentityService` - 18 edges
3. `ShopApp.Application.Auth` - 17 edges
4. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
5. `navigate()` - 13 edges
6. `ShopApp.Infrastructure.Persistence` - 13 edges
7. `LoginPage()` - 12 edges
8. `What You Must Do When Invoked` - 12 edges
9. `RegisterPage()` - 11 edges
10. `createFieldError()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/bootstrap.js → src/Frontend/ShopApp.Web/src/app/App.js
- `guardedPath()` --indirect_call--> `hasRole()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/app/router.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js

## Import Cycles
- None detected.

## Communities (75 total, 10 thin omitted)

### Community 0 - "ShopApp.Application.Auth"
Cohesion: 0.27
Nodes (4): ShopApp.Application.Auth, ShopApp.Application.Services, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions

### Community 1 - "homeService.js"
Cohesion: 0.10
Nodes (16): createCategoryCard(), benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories, NotFoundPage(), getHeroCategories() (+8 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.DependencyInjection (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 3 - "authService.js"
Cohesion: 0.06
Nodes (57): initApp(), appConfig, bootstrap(), compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate() (+49 more)

### Community 4 - "ShopAppDbContextModelSnapshot.cs"
Cohesion: 0.40
Nodes (3): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.07
Nodes (25): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, EntityTypeBuilder, Guid (+17 more)

### Community 6 - "LoginPage.js"
Cohesion: 0.11
Nodes (44): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+36 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "Address"
Cohesion: 0.40
Nodes (4): Guid, Address, EntityTypeBuilder, AddressConfiguration

### Community 9 - "ShopAppDbContext"
Cohesion: 0.20
Nodes (8): IdentityDbContext, IDesignTimeDbContextFactory, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 10 - "BaseEntity"
Cohesion: 0.12
Nodes (13): src.Monolith.ShopApp.Domain.Siparisler, DateTime, Guid, BaseEntity, Guid, ICollection, Siparis, SiparisDurum (+5 more)

### Community 11 - "IEntityTypeConfiguration"
Cohesion: 0.22
Nodes (7): IdentityUser, IEntityTypeConfiguration, DateTime, Guid, KayitliKullanici, EntityTypeBuilder, KayitliKullaniciConfiguration

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.12
Nodes (12): src.Monolith.ShopApp.Domain.Sepet, src.Monolith.ShopApp.Domain.Common, ICollection, Sepet, SepetDurum, SepetDurumLookup, Guid, SepetUrunleri (+4 more)

### Community 17 - "agents.md"
Cohesion: 0.04
Nodes (54): 10. Authentication and JWT, 11. JWT Validation, 12. Dependency Injection, 13. API Layer, 14. HTTP Status Codes, 15. Frontend Architecture, 16. Frontend Responsibilities, 17. SPA Routing (+46 more)

### Community 26 - "Urun"
Cohesion: 0.07
Nodes (34): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Application.DTOs.Responses, KategoriServis.Application.Mappings, KategoriServis.Domain.Common, DateTime, Guid, UrunResponse (+26 more)

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "StokUrunleri"
Cohesion: 0.09
Nodes (23): StokServis.Infrastructure.Persistence, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Domain.Common, DbContext, DateTime, Guid, BaseEntity (+15 more)

### Community 30 - "IdentityService"
Cohesion: 0.11
Nodes (19): IdentityError, IdentityResult, RoleManager, Guid, IReadOnlyCollection, Task, IIdentityService, IdentityUserInfo (+11 more)

### Community 31 - "AuthResponse"
Cohesion: 0.15
Nodes (14): ActionResult, Authorize, ControllerBase, HttpGet, HttpPost, Task, AuthController, Guid (+6 more)

### Community 32 - "Migration"
Cohesion: 0.25
Nodes (4): Migration, MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 33 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 34 - "KargoGonderisi"
Cohesion: 0.10
Nodes (23): KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, DateOnly, DateTime, Guid, BaseEntity (+15 more)

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - "IJwtTokenGenerator"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Authentication, IEnumerable, IJwtTokenGenerator, JwtToken, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 38 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 39 - ".AssignRole"
Cohesion: 0.20
Nodes (8): HashSet, IActionResult, Guid, HttpGet, HttpPost, Task, AdminController, AssignRoleRequest

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 43 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.30
Nodes (5): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, ShopApp.Infrastructure.Persistence.Configurations, ShopApp.Infrastructure, src.Monolith.ShopApp.Domain.Kullanici

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk

### Community 48 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 49 - "DatabaseChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 50 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 52 - "AddMonolithDomainChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 53 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 54 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 55 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 56 - "IdentityRoleSeeder"
Cohesion: 0.33
Nodes (4): IServiceProvider, string, Task, IdentityRoleSeeder

### Community 57 - "ShopApp.Domain.csproj"
Cohesion: 0.50
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

### Community 60 - "CreateUrunRequest.cs"
Cohesion: 0.50
Nodes (3): KategoriServis.Application.DTOs.Requests, Guid, CreateUrunRequest

### Community 66 - "AuthenticationValidationException"
Cohesion: 0.50
Nodes (3): Exception, IReadOnlyCollection, AuthenticationValidationException

### Community 67 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 70 - "Musteri"
Cohesion: 0.47
Nodes (4): Guid, Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - ".AddInfrastructure"
Cohesion: 0.50
Nodes (3): IConfiguration, IServiceCollection, DependencyInjection

## Knowledge Gaps
- **206 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+201 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence` to `Migration`, `ShopAppDbContextModelSnapshot.cs`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddRoleSpecificProfiles`, `ShopApp.Infrastructure.Persistence.Migrations`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `AdminProfile`, `Musteri`, `Address`, `BaseEntity`, `ShopApp.Infrastructure.Persistence`, `IEntityTypeConfiguration`, `src.Monolith.ShopApp.Domain.Common`, `IdentityService`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `IdentityService` connect `IdentityService` to `ShopAppDbContext`, `ShopApp.Infrastructure.Persistence`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _206 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `homeService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._
- **Should `authService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05738615327656423 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.Persistence.Configurations.Identity` be split into smaller, more focused modules?**
  _Cohesion score 0.07207207207207207 - nodes in this community are weakly interconnected._