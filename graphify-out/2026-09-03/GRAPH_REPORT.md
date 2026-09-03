# Graph Report - ShopApp  (2026-09-03)

## Corpus Check
- 248 files · ~150,002 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1402 nodes · 2413 edges · 106 communities (97 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Authentication
- homeService.js
- ShopApp.Infrastructure.csproj
- App.js
- ShopAppFrontendAGENTS.md
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- registerValidation.js
- TurkcheIdentityVeMusteriGuncellemesi
- src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js
- ShopAppDbContext
- IShopAppDbContext
- IEntityTypeConfiguration
- AddRoleSpecificProfiles
- cartService.js
- appConstants.js
- IRequest
- agents.md
- eventBus.js
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- OrderListPage.js
- productData.js
- OrderConfirmationPage.js
- SepetController
- BaseEntity
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- StokUrunleri
- IdentityService
- AuthResponse
- CreateMonolithTables
- ShopApp – Vanilla JavaScript SPA Frontend
- KargoGonderisi
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- IJwtTokenGenerator
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- ISiparisService
- ShopApp.Application.Abstractions
- InitialCreate
- ShopApp.Infrastructure.Persistence.Configurations
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- UpdateMonolithTables
- Migration
- ShopApp.Infrastructure.Persistence.Migrations
- AddMonolithDomainChanges
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- InfrastructureInitializer
- ShopApp.Domain.csproj
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- router.js
- AGENTS.md — ShopApp AI Coding Agent Guide
- 4. Domain Layer
- 5. Application Layer
- AGENTS.md
- extraction-spec.md
- ShopApp.Application.Dtos.SepetDtos
- SepetUrunu
- SepetEntity
- AdminProfile
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- ShopApp.Application.Dtos.SiparisUrunleriDto
- SiparisController
- SiparisUrunService
- ResultSepetUrunDto
- src/Frontend/ShopApp.Web/package.json
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json
- CreateSepet.cs
- CreateSepetCommandHandler
- ModelSnapshot
- src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- IlkMigrasyon
- .SaveChangesAsync
- AuthService
- .Validate
- Q: How are role-specific customer and admin profiles provisioned?
- SiparisService
- ResultSiparisUrunleriDto
- SepetUrunService
- ResultSepetDto
- IIdentityService
- src/Frontend/ShopApp.Web/src/shared/services/apiClient.js
- authStore.js
- KategoriDbContext
- InitialCreate
- BaseEntity
- UrunOzelligi
- SyncIdentityModels
- KategoriServis.Domain.Entities
- Kategori
- Urun
- UrunTur
- SepetMapping.cs
- orderDemoData.js

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Abstractions` - 21 edges
2. `ShopAppDbContext` - 21 edges
3. `navigate()` - 20 edges
4. `IdentityService` - 20 edges
5. `ShopApp.Application.Authentication` - 17 edges
6. `ShopApp.Infrastructure.Persistence.Migrations` - 17 edges
7. `createIcon()` - 16 edges
8. `SepetEntity` - 16 edges
9. `ShopApp.Infrastructure.Persistence` - 15 edges
10. `SepetController` - 14 edges

## Surprising Connections (you probably didn't know these)
- `OrderConfirmationPage()` --calls--> `render()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/features/orders/pages/OrderConfirmationPage.js → src/Frontend/ShopApp.Web/src/app/router.js
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `initApp()` --calls--> `initRouter()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js

## Import Cycles
- None detected.

## Communities (106 total, 9 thin omitted)

### Community 0 - "ShopApp.Application.Authentication"
Cohesion: 0.17
Nodes (7): ShopApp.Application.Authentication, src.Monolith.ShopApp.Api.Controller, Exception, IReadOnlyCollection, AuthenticationValidationException, List, AuthRequest

### Community 1 - "homeService.js"
Cohesion: 0.11
Nodes (14): createCategoryCard(), benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories, NotFoundPage(), getHeroCategories() (+6 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "App.js"
Cohesion: 0.15
Nodes (17): initApp(), bootstrap(), subscribe(), createFooter(), TRUST_BADGES, createHeader(), navItems, setUnauthorizedHandler() (+9 more)

### Community 4 - "ShopAppFrontendAGENTS.md"
Cohesion: 0.05
Nodes (39): 10. Cart Page Requirements, 11. Cart Client-Side Interactions, 12. Cart Empty State, 13. Orders Page Requirements, 14. Order Details Interaction, 15. Orders Empty State, 16. Demo Data, 17. Separation of Responsibilities (+31 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.07
Nodes (25): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, EntityTypeBuilder, Guid (+17 more)

### Community 6 - "registerValidation.js"
Cohesion: 0.19
Nodes (27): RFC-5322, PASSWORD_RULES, VALIDATION_MESSAGES, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword() (+19 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js"
Cohesion: 0.16
Nodes (18): createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES (+10 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.22
Nodes (7): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 10 - "IShopAppDbContext"
Cohesion: 0.15
Nodes (11): src.Monolith.ShopApp.Domain.Siparisler, DbSet, SiparisUrunleri, IShopAppDbContext, SiparisDurumLookup, Guid, ICollection, SiparisEntity (+3 more)

### Community 11 - "IEntityTypeConfiguration"
Cohesion: 0.17
Nodes (9): IdentityUser, IEntityTypeConfiguration, Guid, ApplicationUser, DateTime, Guid, KayitliKullanici, EntityTypeBuilder (+1 more)

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "IRequest"
Cohesion: 0.11
Nodes (15): ShopApp.Application.Dtos.SiparisDtos, ShopApp.Application.Siparis.Queries, IRequest, Guid, GetByIdSepetDto, Guid, GetByIdSepetUrunDto, Guid (+7 more)

### Community 17 - "agents.md"
Cohesion: 0.04
Nodes (54): 10. Authentication and JWT, 11. JWT Validation, 12. Dependency Injection, 13. API Layer, 14. HTTP Status Codes, 15. Frontend Architecture, 16. Frontend Responsibilities, 17. SPA Routing (+46 more)

### Community 20 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.14
Nodes (20): appConfig, LoginPage(), RegisterPage(), establishSession(), getCurrentUser(), login(), logout(), mapAuthError() (+12 more)

### Community 21 - "OrderListPage.js"
Cohesion: 0.17
Nodes (17): createBenefitsSection(), createSuccessBanner(), BENEFITS, createBenefitsSection(), createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner() (+9 more)

### Community 22 - "productData.js"
Cohesion: 0.20
Nodes (14): categories, demoProducts, formatPrice(), getProductDetail(), productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts, CategoryListPage() (+6 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.13
Nodes (15): BENEFITS, createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSummaryCard(), formatPrice(), ORDER_DATA, OrderConfirmationPage() (+7 more)

### Community 24 - "SepetController"
Cohesion: 0.26
Nodes (10): ActionResult, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult, List (+2 more)

### Community 26 - "BaseEntity"
Cohesion: 0.11
Nodes (13): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, Guid, Address, Guid (+5 more)

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "StokUrunleri"
Cohesion: 0.07
Nodes (28): StokServis.Infrastructure.Persistence, StokServis.Domain.Entities, StokServis.Domain.Enums, StokServis.Infrastructure.Persistence.Configurations, StokServis.Domain.Common, DbContext, IDesignTimeDbContextFactory, DateTime (+20 more)

### Community 30 - "IdentityService"
Cohesion: 0.20
Nodes (10): IdentityError, IdentityResult, IHttpContextAccessor, RoleManager, IdentityUserInfo, Guid, IReadOnlyCollection, Task (+2 more)

### Community 31 - "AuthResponse"
Cohesion: 0.15
Nodes (13): Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime, AuthResponse (+5 more)

### Community 32 - "CreateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 33 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 34 - "KargoGonderisi"
Cohesion: 0.07
Nodes (27): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, DateOnly, DateTime, Guid (+19 more)

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - "IJwtTokenGenerator"
Cohesion: 0.16
Nodes (8): ShopApp.Infrastructure.Authentication, JwtToken, IEnumerable, IJwtTokenGenerator, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 38 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 39 - ".AssignRole"
Cohesion: 0.18
Nodes (9): ControllerBase, HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController (+1 more)

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "ISiparisService"
Cohesion: 0.19
Nodes (10): GetSiparisQuery, CancellationToken, Guid, List, Task, ISiparisService, CancellationToken, IMapper (+2 more)

### Community 43 - "ShopApp.Application.Abstractions"
Cohesion: 0.13
Nodes (13): ShopApp.Application.Services.SiparisServices, ShopApp.Infrastructure.Identity, src.Monolith.ShopApp.Domain.Sepet, ShopApp.Infrastructure.Persistence, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure, ShopApp.Application.Services.SepetUrunService, ShopApp.Application.Services.SepetUrunleri (+5 more)

### Community 44 - "InitialCreate"
Cohesion: 0.18
Nodes (6): KategoriServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate, ModelBuilder, KategoriDbContextModelSnapshot

### Community 45 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.15
Nodes (9): ShopApp.Infrastructure.Persistence.Configurations, Guid, SiparisUrunleri, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetUrunuConfiguration, EntityTypeBuilder (+1 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.22
Nodes (8): AutoMapper (16.2.0), MediatR (14.2.0), Microsoft.EntityFrameworkCore (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk

### Community 48 - "UpdateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 49 - "Migration"
Cohesion: 0.33
Nodes (4): Migration, MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 50 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.22
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

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

### Community 56 - "InfrastructureInitializer"
Cohesion: 0.20
Nodes (8): IHostedService, IServiceProvider, CancellationToken, Task, InfrastructureInitializer, string, Task, IdentityRoleSeeder

### Community 57 - "ShopApp.Domain.csproj"
Cohesion: 0.50
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

### Community 60 - "router.js"
Cohesion: 0.21
Nodes (13): compileRoute(), guardedPath(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute, routes (+5 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - "ShopApp.Application.Dtos.SepetDtos"
Cohesion: 0.18
Nodes (7): ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Services.SepetServices, BaseSepetUrunDto, Guid, CreateSepetDto, Guid, UpdateSepetDto

### Community 67 - "SepetUrunu"
Cohesion: 0.36
Nodes (6): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu

### Community 68 - "SepetEntity"
Cohesion: 0.14
Nodes (12): SepetDurumLookup, Guid, ICollection, SepetEntity, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder, SepetDurumLookupConfiguration (+4 more)

### Community 70 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "ShopApp.Application.Dtos.SiparisUrunleriDto"
Cohesion: 0.16
Nodes (8): ShopApp.Application.Services.SiparisUrunServices, ShopApp.Application.Dtos.SiparisUrunleriDto, Guid, CreateSiparisUrunleriDto, Guid, GetByIdSiparisUrunleriDto, Guid, UpdateSiparisUrunleriDto

### Community 74 - "SiparisController"
Cohesion: 0.26
Nodes (10): ActionResult, Guid, HttpDelete, HttpGet, HttpPost, HttpPut, IActionResult, List (+2 more)

### Community 75 - "SiparisUrunService"
Cohesion: 0.36
Nodes (6): SiparisUrunleriEntity, Guid, IMapper, List, Task, SiparisUrunService

### Community 76 - "ResultSepetUrunDto"
Cohesion: 0.17
Nodes (11): ShopApp.Application.Dtos.SepetUrunDtos, Guid, CreateSepetUrunDto, Guid, ResultSepetUrunDto, Guid, UpdateSepetUrunDto, Guid (+3 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 78 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 79 - "CreateSepet.cs"
Cohesion: 0.12
Nodes (13): ShopApp.Application.Sepet.Queries, ShopApp.Application.Sepet.Commands.CreateSepet, Guid, Command, CreateSepet, CreateSepetCommand, CreateSepetCommand, List (+5 more)

### Community 80 - "CreateSepetCommandHandler"
Cohesion: 0.14
Nodes (16): GetSepetQuery, IRequestHandler, CancellationToken, Guid, Task, ISepetRepository, CancellationToken, CreateSepetCommand (+8 more)

### Community 81 - "ModelSnapshot"
Cohesion: 0.15
Nodes (7): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot, ModelBuilder, KargoDbContextModelSnapshot, ModelBuilder, StokDbContextModelSnapshot

### Community 82 - "src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.31
Nodes (11): establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession(), setAnonymous() (+3 more)

### Community 83 - "IlkMigrasyon"
Cohesion: 0.28
Nodes (4): KargoServis.Migrations, MigrationBuilder, ModelBuilder, IlkMigrasyon

### Community 84 - ".SaveChangesAsync"
Cohesion: 0.26
Nodes (7): CancellationToken, Task, Guid, IMapper, List, Task, SepetService

### Community 85 - "AuthService"
Cohesion: 0.23
Nodes (6): RegisterRequest, Guid, IReadOnlyCollection, string, Task, AuthService

### Community 86 - ".Validate"
Cohesion: 0.17
Nodes (8): Command, ShopApp.Application.Siparis.Commands.CreateSiparis, Command, CreateSiparis, List, ValidationResult, CreateSiparisCommandHandler, CreateSiparisCommandValidator

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "SiparisService"
Cohesion: 0.30
Nodes (6): CancellationToken, Guid, IMapper, List, Task, SiparisService

### Community 89 - "ResultSiparisUrunleriDto"
Cohesion: 0.31
Nodes (6): Guid, ResultSiparisUrunleriDto, Guid, List, Task, ISiparisUrunService

### Community 90 - "SepetUrunService"
Cohesion: 0.41
Nodes (5): Guid, IMapper, List, Task, SepetUrunService

### Community 91 - "ResultSepetDto"
Cohesion: 0.27
Nodes (6): Guid, ResultSepetDto, Guid, List, Task, ISepetService

### Community 92 - "IIdentityService"
Cohesion: 0.33
Nodes (4): Guid, IReadOnlyCollection, Task, IIdentityService

### Community 93 - "src/Frontend/ShopApp.Web/src/shared/services/apiClient.js"
Cohesion: 0.27
Nodes (7): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry, getAccessToken()

### Community 94 - "authStore.js"
Cohesion: 0.27
Nodes (9): clearError(), getState(), initialState, merge(), notify(), setError(), setLoading(), state (+1 more)

### Community 95 - "KategoriDbContext"
Cohesion: 0.24
Nodes (5): KategoriServis.Infrastructure.Persistence, DbSet, ModelBuilder, KategoriDbContext, KategoriDbContextFactory

### Community 96 - "InitialCreate"
Cohesion: 0.28
Nodes (4): StokServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate

### Community 97 - "BaseEntity"
Cohesion: 0.25
Nodes (7): DateTime, Guid, BaseEntity, Guid, UrunGorseli, EntityTypeBuilder, UrunGorseliConfiguration

### Community 98 - "UrunOzelligi"
Cohesion: 0.29
Nodes (5): KategoriServis.Infrastructure.Persistence.Configurations, Guid, UrunOzelligi, EntityTypeBuilder, UrunOzelligiConfiguration

### Community 99 - "SyncIdentityModels"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, SyncIdentityModels

### Community 101 - "Kategori"
Cohesion: 0.33
Nodes (5): Guid, ICollection, Kategori, EntityTypeBuilder, KategoriConfiguration

### Community 102 - "Urun"
Cohesion: 0.33
Nodes (5): Guid, ICollection, Urun, EntityTypeBuilder, UrunConfiguration

### Community 103 - "UrunTur"
Cohesion: 0.33
Nodes (5): Guid, ICollection, UrunTur, EntityTypeBuilder, UrunTurConfiguration

### Community 104 - "SepetMapping.cs"
Cohesion: 0.40
Nodes (4): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping

## Knowledge Gaps
- **279 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `SepetUrunu`, `SepetEntity`, `AdminProfile`, `IShopAppDbContext`, `ShopApp.Application.Abstractions`, `IEntityTypeConfiguration`, `ShopApp.Infrastructure.Persistence.Configurations`, `BaseEntity`, `IdentityService`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `SepetUrunu`, `SepetEntity`, `ShopAppDbContext`, `SiparisUrunService`, `.SaveChangesAsync`, `SiparisService`, `SepetUrunService`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Application.Abstractions` to `CreateMonolithTables`, `SyncIdentityModels`, `SepetEntity`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `AddRoleSpecificProfiles`, `UpdateMonolithTables`, `ModelSnapshot`, `ShopApp.Infrastructure.Persistence.Migrations`, `AddMonolithDomainChanges`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `homeService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._
- **Should `ShopAppFrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.Persistence.Configurations.Identity` be split into smaller, more focused modules?**
  _Cohesion score 0.07207207207207207 - nodes in this community are weakly interconnected._