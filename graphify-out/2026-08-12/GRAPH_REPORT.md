# Graph Report - ShopApp  (2026-08-11)

## Corpus Check
- 146 files · ~92,638 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 764 nodes · 1142 edges · 67 communities (55 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4b03551`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Abstractions
- router.js
- ShopApp.Infrastructure.csproj
- LoginPage.js
- CreateMonolithTables
- IEntityTypeConfiguration
- registerValidation.js
- Sepet
- BaseEntity
- ShopAppDbContext
- Siparis
- KayitliKullanici
- ShopApp.Infrastructure.Persistence.Configurations
- cartService.js
- appConstants.js
- src.Monolith.ShopApp.Domain.Siparisler
- agents.md
- eventBus.js
- InitialCreate
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- StokHareketi
- Kategori
- .RegisterAsync
- apiClient.js
- ShopApp – Vanilla JavaScript SPA Frontend
- KargoServis.Infrastructure.Persistence
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- JwtTokenGenerator
- .Login
- ShopApp.Application.Auth
- ShopApp.Infrastructure.Persistence.Migrations
- Migration
- SepetUrunleri
- UpdateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- KargoServis.csproj
- KategoriServis.csproj
- StokServis.csproj
- AuthService
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- IJwtTokenGenerator
- ShopApp.Domain.csproj
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- ShopAppDbContextModelSnapshot
- AGENTS.md — ShopApp AI Coding Agent Guide
- 4. Domain Layer
- 5. Application Layer
- graphify
- extraction-spec.md
- PostgreSQL/README.md

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 17 edges
2. `What You Must Do When Invoked` - 12 edges
3. `LoginPage()` - 11 edges
4. `createFieldError()` - 11 edges
5. `Siparis` - 11 edges
6. `RegisterPage()` - 10 edges
7. `validatePassword()` - 10 edges
8. `isNonEmpty()` - 10 edges
9. `BaseEntity` - 10 edges
10. `KargoGonderisi` - 10 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --calls--> `initApp()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/bootstrap.js → src/Frontend/ShopApp.Web/src/app/App.js
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `LoginPage()` --calls--> `validateLoginField()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js → src/Frontend/ShopApp.Web/src/features/auth/validation/loginValidation.js

## Import Cycles
- None detected.

## Communities (67 total, 12 thin omitted)

### Community 0 - "ShopApp.Application.Abstractions"
Cohesion: 0.15
Nodes (9): ShopApp.Infrastructure.Services, ShopApp.Infrastructure, ShopApp.Application.Abstractions, IConfiguration, IServiceCollection, IIdentityService, IShopAppDbContext, DependencyInjection (+1 more)

### Community 1 - "router.js"
Cohesion: 0.06
Nodes (36): initApp(), bootstrap(), compileRoute(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute (+28 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.DependencyInjection (10.0.10), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 3 - "LoginPage.js"
Cohesion: 0.07
Nodes (41): createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES (+33 more)

### Community 4 - "CreateMonolithTables"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.06
Nodes (41): KargoServis.Domain.Entities, ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration (+33 more)

### Community 6 - "registerValidation.js"
Cohesion: 0.19
Nodes (27): RFC-5322, PASSWORD_RULES, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword() (+19 more)

### Community 7 - "Sepet"
Cohesion: 0.15
Nodes (10): src.Monolith.ShopApp.Domain.Sepet, Guid, ICollection, Sepet, SepetDurum, SepetDurumLookup, EntityTypeBuilder, SepetConfiguration (+2 more)

### Community 8 - "BaseEntity"
Cohesion: 0.14
Nodes (12): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, Guid, Address, Boolean (+4 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.20
Nodes (8): IdentityDbContext, IDesignTimeDbContextFactory, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 10 - "Siparis"
Cohesion: 0.27
Nodes (5): Guid, ICollection, Siparis, EntityTypeBuilder, SiparisConfiguration

### Community 11 - "KayitliKullanici"
Cohesion: 0.20
Nodes (8): ShopApp.Infrastructure.Identity, IdentityUser, Boolean, DateTime, Guid, KayitliKullanici, EntityTypeBuilder, KayitliKullaniciConfiguration

### Community 12 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.25
Nodes (5): ShopApp.Infrastructure.Persistence.Configurations, SiparisDurumLookup, MusteriConfiguraiton, EntityTypeBuilder, SiparisDurumLookupConfiguration

### Community 13 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "src.Monolith.ShopApp.Domain.Siparisler"
Cohesion: 0.24
Nodes (6): src.Monolith.ShopApp.Domain.Siparisler, SiparisDurum, Guid, SiparisUrunleri, EntityTypeBuilder, SiparisUrunleriConfiguration

### Community 17 - "agents.md"
Cohesion: 0.04
Nodes (54): 10. Authentication and JWT, 11. JWT Validation, 12. Dependency Injection, 13. API Layer, 14. HTTP Status Codes, 15. Frontend Architecture, 16. Frontend Responsibilities, 17. SPA Routing (+46 more)

### Community 26 - "InitialCreate"
Cohesion: 0.07
Nodes (17): KategoriServis.Infrastructure.Persistence, StokServis.Infrastructure.Persistence, KategoriServis.Infrastructure.Persistence.Migrations, StokServis.Infrastructure.Persistence.Migrations, ModelSnapshot, MigrationBuilder, ModelBuilder, InitialCreate (+9 more)

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "StokHareketi"
Cohesion: 0.16
Nodes (17): StokServis.Domain.Entities, DbContext, DateTime, Guid, ICollection, StokHareketi, StokHareketTipi, StokKalemi (+9 more)

### Community 30 - "Kategori"
Cohesion: 0.19
Nodes (14): KategoriServis.Domain.Entities, DateTime, Guid, ICollection, Kategori, Urun, UrunKategori, DbSet (+6 more)

### Community 31 - ".RegisterAsync"
Cohesion: 0.19
Nodes (8): RegisterRequest, Task, List, AuthResponse, LoginRequest, RegisterRequest, RegisterRequest, Task

### Community 32 - "apiClient.js"
Cohesion: 0.24
Nodes (8): appConfig, apiClient, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 33 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 34 - "KargoServis.Infrastructure.Persistence"
Cohesion: 0.22
Nodes (5): KargoServis.Infrastructure.Persistence, KargoServis.Infrastructure.Persistence.Migrations, ModelBuilder, KargoDbContextModelSnapshot, WeatherForecast

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - "JwtTokenGenerator"
Cohesion: 0.29
Nodes (5): ShopApp.Infrastructure.Authentication, JwtSettings, IEnumerable, JwtTokenGenerator, string

### Community 38 - ".Login"
Cohesion: 0.43
Nodes (5): ControllerBase, HttpPost, IActionResult, Task, AuthController

### Community 39 - "ShopApp.Application.Auth"
Cohesion: 0.29
Nodes (4): ShopApp.Application.Auth, src.Monolith.ShopApp.Api.Controller, List, AuthRequest

### Community 41 - "Migration"
Cohesion: 0.33
Nodes (4): Migration, MigrationBuilder, ModelBuilder, InitialCreate

### Community 42 - "SepetUrunleri"
Cohesion: 0.33
Nodes (4): Guid, SepetUrunleri, EntityTypeBuilder, SepetUrunleriConfiguration

### Community 43 - "UpdateMonolithTables"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 44 - "DatabaseChanges"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 45 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk

### Community 48 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 49 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 50 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 52 - "AuthService"
Cohesion: 0.40
Nodes (4): RoleManager, IAuthService, AuthService, UserManager

### Community 53 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 54 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 55 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 57 - "ShopApp.Domain.csproj"
Cohesion: 0.50
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

## Knowledge Gaps
- **205 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+200 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Identity` connect `KayitliKullanici` to `ShopApp.Application.Abstractions`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence.Migrations` to `ShopApp.Application.Abstractions`, `ShopAppDbContext`, `KayitliKullanici`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `Sepet`, `BaseEntity`, `Siparis`, `SepetUrunleri`, `KayitliKullanici`, `ShopApp.Infrastructure.Persistence.Configurations`, `src.Monolith.ShopApp.Domain.Siparisler`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _205 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `router.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06397306397306397 - nodes in this community are weakly interconnected._
- **Should `LoginPage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07297726070861978 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.056107539450613676 - nodes in this community are weakly interconnected._