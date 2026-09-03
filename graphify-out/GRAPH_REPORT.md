# Graph Report - ShopApp  (2026-09-03)

## Corpus Check
- 250 files · ~150,045 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1413 nodes · 2430 edges · 103 communities (94 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Abstractions
- homeService.js
- ShopApp.Infrastructure.csproj
- App.js
- ShopAppFrontendAGENTS.md
- IEntityTypeConfiguration
- src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js
- TurkcheIdentityVeMusteriGuncellemesi
- ResultSiparisDto
- ShopAppDbContext
- IShopAppDbContext
- src.Monolith.ShopApp.Domain.Sepet.Entities
- AddRoleSpecificProfiles
- cartService.js
- appConstants.js
- ShopApp.Application.Dtos.SiparisDtos
- agents.md
- eventBus.js
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- OrderListPage.js
- productData.js
- OrderConfirmationPage.js
- Task
- BaseEntity
- shopapp_microservice_database_agent.md
- What You Must Do When Invoked
- StokServis.Domain.Entities
- IdentityService
- AuthResponse
- CreateMonolithTables
- ShopApp – Vanilla JavaScript SPA Frontend
- KargoGonderisi
- ShopApp.Api.csproj
- graphify reference: extra exports and benchmark
- .GenerateToken
- KargoServis.csproj
- .AssignRole
- KategoriServis.csproj
- StokServis.csproj
- ISiparisService
- ShopApp.Infrastructure.Persistence
- InitialCreate
- ShopApp.Infrastructure.Persistence.Configurations
- graphify reference: query, path, explain
- ShopApp.Application.csproj
- UpdateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
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
- IRequest
- SepetUrunu
- SepetEntity
- AdminProfile
- Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?
- Q: Scan all identity related entities and Musteri entities
- StokDbContext
- SiparisController
- StokHareketi
- SepetController
- src/Frontend/ShopApp.Web/package.json
- shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json
- .GetRequiredAsync
- GetSepetQueryHandler
- ModelSnapshot
- src/Frontend/ShopApp.Web/src/features/auth/services/authService.js
- Migration
- .SaveChangesAsync
- ShopApp.Application.Dtos.SepetUrunDtos
- .Validate
- Q: How are role-specific customer and admin profiles provisioned?
- SiparisService
- StokUrunleri
- SepetUrunService
- ISepetService
- IIdentityService
- src/Frontend/ShopApp.Web/src/shared/services/apiClient.js
- authStore.js
- KategoriServis.Domain.Entities
- InitialCreate
- store.js
- .Validate
- ShopApp.Infrastructure.Persistence.Migrations
- ShopAppDbContextModelSnapshot.cs
- SepetMapping.cs
- orderDemoData.js

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Abstractions` - 22 edges
2. `ShopAppDbContext` - 21 edges
3. `navigate()` - 20 edges
4. `IdentityService` - 20 edges
5. `SepetEntity` - 18 edges
6. `ShopApp.Application.Authentication` - 17 edges
7. `ShopApp.Infrastructure.Persistence.Migrations` - 17 edges
8. `createIcon()` - 16 edges
9. `ShopApp.Infrastructure.Persistence` - 16 edges
10. `SepetController` - 14 edges

## Surprising Connections (you probably didn't know these)
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `initApp()` --calls--> `navigate()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/app/router.js
- `initApp()` --calls--> `logout()`  [EXTRACTED]
  src/Frontend/ShopApp.Web/src/app/App.js → src/Frontend/ShopApp.Web/src/features/auth/services/authService.js

## Import Cycles
- None detected.

## Communities (103 total, 9 thin omitted)

### Community 0 - "ShopApp.Application.Abstractions"
Cohesion: 0.15
Nodes (9): ShopApp.Application.Authentication, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions, Exception, IReadOnlyCollection, AuthenticationValidationException, List, AuthRequest (+1 more)

### Community 1 - "homeService.js"
Cohesion: 0.11
Nodes (13): createCategoryCard(), benefits, createFeatureBenefits(), createHeroCategoryGrid(), heroCategories, secondaryCategories, getHeroCategories(), getSecondaryCategories() (+5 more)

### Community 2 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.18
Nodes (10): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0) (+2 more)

### Community 3 - "App.js"
Cohesion: 0.33
Nodes (8): initApp(), bootstrap(), initRouter(), createFooter(), TRUST_BADGES, createHeader(), setUnauthorizedHandler(), initStore()

### Community 4 - "ShopAppFrontendAGENTS.md"
Cohesion: 0.05
Nodes (39): 10. Cart Page Requirements, 11. Cart Client-Side Interactions, 12. Cart Empty State, 13. Orders Page Requirements, 14. Order Details Interaction, 15. Orders Empty State, 16. Demo Data, 17. Separation of Responsibilities (+31 more)

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.07
Nodes (28): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder (+20 more)

### Community 6 - "src/Frontend/ShopApp.Web/src/features/auth/pages/LoginPage.js"
Cohesion: 0.11
Nodes (44): RFC-5322, createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only. (+36 more)

### Community 7 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 8 - "ResultSiparisDto"
Cohesion: 0.19
Nodes (10): GetSiparisQuery, GetByIdSiparisDto, ResultSiparisDto, CancellationToken, Guid, IMapper, Task, GetSiparis (+2 more)

### Community 9 - "ShopAppDbContext"
Cohesion: 0.22
Nodes (7): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 10 - "IShopAppDbContext"
Cohesion: 0.15
Nodes (11): src.Monolith.ShopApp.Domain.Siparisler, DbSet, SiparisUrunleri, IShopAppDbContext, SiparisDurumLookup, Guid, ICollection, SiparisEntity (+3 more)

### Community 11 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.23
Nodes (6): src.Monolith.ShopApp.Domain.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, SepetDurumLookup, SepetDurum, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 12 - "AddRoleSpecificProfiles"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 13 - "cartService.js"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 14 - "appConstants.js"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "ShopApp.Application.Dtos.SiparisDtos"
Cohesion: 0.22
Nodes (6): ShopApp.Application.Services.SiparisServices, ShopApp.Application.Dtos.SiparisDtos, ShopApp.Application.Siparis.Queries, Guid, CreateSiparisDto, UpdateSiparisDto

### Community 17 - "agents.md"
Cohesion: 0.04
Nodes (54): 10. Authentication and JWT, 11. JWT Validation, 12. Dependency Injection, 13. API Layer, 14. HTTP Status Codes, 15. Frontend Architecture, 16. Frontend Responsibilities, 17. SPA Routing (+46 more)

### Community 20 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.14
Nodes (20): appConfig, LoginPage(), RegisterPage(), establishSession(), getCurrentUser(), login(), logout(), mapAuthError() (+12 more)

### Community 21 - "OrderListPage.js"
Cohesion: 0.21
Nodes (16): createBenefitsSection(), createSuccessBanner(), BENEFITS, createBenefitsSection(), createBreadcrumbs(), createEmptyState(), createErrorState(), createLoadingSpinner() (+8 more)

### Community 22 - "productData.js"
Cohesion: 0.20
Nodes (14): categories, demoProducts, formatPrice(), getProductDetail(), productDetailMap, TODO: Replace with real API integration when backend is wired up., relatedProducts, CategoryListPage() (+6 more)

### Community 23 - "OrderConfirmationPage.js"
Cohesion: 0.14
Nodes (14): BENEFITS, createDeliveryCard(), createOrderDetailsCard(), createRawIcon(), createSummaryCard(), formatPrice(), ORDER_DATA, TODO: Replace musteriId with the authenticated user's ID from authStore, (+6 more)

### Community 24 - "Task"
Cohesion: 0.21
Nodes (10): Guid, HttpDelete, HttpPost, HttpPut, IActionResult, Task, Guid, UpdateSepetDto (+2 more)

### Community 26 - "BaseEntity"
Cohesion: 0.14
Nodes (11): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, DateTime, Guid, BaseEntity, Guid, Address, Guid (+3 more)

### Community 27 - "shopapp_microservice_database_agent.md"
Cohesion: 0.07
Nodes (28): 1. Kategori / Catalog Service, 2. Stok / Inventory Service, 3. Kargo / Shipping Service, Acceptance Criteria, Agent Execution Plan, Connection Strings, Cross-Service Data Rules, Development Database Layout (+20 more)

### Community 28 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 29 - "StokServis.Domain.Entities"
Cohesion: 0.19
Nodes (9): StokServis.Domain.Entities, StokServis.Domain.Common, DateTime, Guid, BaseEntity, ICollection, Depo, EntityTypeBuilder (+1 more)

### Community 30 - "IdentityService"
Cohesion: 0.11
Nodes (17): IdentityError, IdentityResult, IdentityUser, IHttpContextAccessor, RoleManager, Guid, ApplicationUser, Guid (+9 more)

### Community 31 - "AuthResponse"
Cohesion: 0.13
Nodes (15): Authorize, ControllerBase, ActionResult, HttpGet, HttpPost, Task, AuthController, DateTime (+7 more)

### Community 32 - "CreateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 33 - "ShopApp – Vanilla JavaScript SPA Frontend"
Cohesion: 0.18
Nodes (10): ♿ Accessibility, 🎨 Design System, 🔧 How the Router Works, ➕ How to Add a New Feature Module, 🔌 How to Connect the Backend API, 🔄 Migration to React / Vue / Angular, 🏗️ Monolith → Microservice Migration, 📁 Project Structure (+2 more)

### Community 34 - "KargoGonderisi"
Cohesion: 0.06
Nodes (30): KargoServis.Infrastructure.Persistence.Configurations, KargoServis.Infrastructure.Persistence, KargoServis.Domain.Common, KargoServis.Domain.Enums, KargoServis.Domain.Entities, KargoServis.Migrations, DateOnly, DateTime (+22 more)

### Community 35 - "ShopApp.Api.csproj"
Cohesion: 0.20
Nodes (9): Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0) (+1 more)

### Community 36 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 37 - ".GenerateToken"
Cohesion: 0.18
Nodes (7): ShopApp.Infrastructure.Authentication, JwtToken, IEnumerable, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 38 - "KargoServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 39 - ".AssignRole"
Cohesion: 0.20
Nodes (8): HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController, AssignRoleRequest

### Community 40 - "KategoriServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 41 - "StokServis.csproj"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.AspNetCore.OpenApi (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 42 - "ISiparisService"
Cohesion: 0.33
Nodes (5): CancellationToken, Guid, List, Task, ISiparisService

### Community 43 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.23
Nodes (6): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, ShopApp.Infrastructure, IConfiguration, IServiceCollection, DependencyInjection

### Community 44 - "InitialCreate"
Cohesion: 0.28
Nodes (4): KategoriServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate

### Community 45 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.13
Nodes (11): ShopApp.Infrastructure.Persistence.Configurations, Guid, SiparisUrunleri, EntityTypeBuilder, BaseEntityConfiguration, EntityTypeBuilder, SepetConfiguration, EntityTypeBuilder (+3 more)

### Community 46 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 47 - "ShopApp.Application.csproj"
Cohesion: 0.22
Nodes (8): AutoMapper (16.2.0), MediatR (14.2.0), Microsoft.EntityFrameworkCore (10.0.11), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), System.ComponentModel.Annotations (5.0.0), System.IdentityModel.Tokens.Jwt (8.22.0), Microsoft.NET.Sdk

### Community 48 - "UpdateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, UpdateMonolithTables

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

### Community 56 - "InfrastructureInitializer"
Cohesion: 0.20
Nodes (8): IHostedService, IServiceProvider, CancellationToken, Task, InfrastructureInitializer, string, Task, IdentityRoleSeeder

### Community 57 - "ShopApp.Domain.csproj"
Cohesion: 0.50
Nodes (3): net10.0, System.ComponentModel.Annotations (5.0.0), Microsoft.NET.Sdk

### Community 60 - "router.js"
Cohesion: 0.16
Nodes (15): compileRoute(), guardedPath(), matchRoute(), navigate(), render(), notFoundRoute, routes, hasRole() (+7 more)

### Community 64 - "AGENTS.md"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Additional Instructions !IMPORTANT!, graphify

### Community 66 - "IRequest"
Cohesion: 0.09
Nodes (16): ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Sepet.Queries, ShopApp.Application.Services.SepetServices, IRequest, BaseSepetUrunDto, Guid, CreateSepetDto, Guid (+8 more)

### Community 67 - "SepetUrunu"
Cohesion: 0.36
Nodes (6): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu

### Community 68 - "SepetEntity"
Cohesion: 0.17
Nodes (11): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, CancellationToken (+3 more)

### Community 70 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 71 - "Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?, Source Nodes

### Community 72 - "Q: Scan all identity related entities and Musteri entities"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Scan all identity related entities and Musteri entities, Source Nodes

### Community 73 - "StokDbContext"
Cohesion: 0.20
Nodes (7): StokServis.Infrastructure.Persistence, DbContext, IDesignTimeDbContextFactory, DbSet, ModelBuilder, StokDbContext, StokDbContextFactory

### Community 74 - "SiparisController"
Cohesion: 0.08
Nodes (30): ShopApp.Application.Services.SiparisUrunServices, ShopApp.Application.Dtos.SiparisUrunleriDto, SiparisUrunleriEntity, ActionResult, Guid, HttpDelete, HttpGet, HttpPost (+22 more)

### Community 75 - "StokHareketi"
Cohesion: 0.24
Nodes (6): StokServis.Domain.Enums, Guid, StokHareketi, HareketTipi, EntityTypeBuilder, StokHareketiConfiguration

### Community 76 - "SepetController"
Cohesion: 0.22
Nodes (10): ActionResult, HttpGet, List, SepetController, Guid, ResultSepetUrunDto, Guid, List (+2 more)

### Community 77 - "src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 78 - "shopapp-auth-patch.7p8f9i/src/Frontend/ShopApp.Web/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, name, private, scripts, dev, serve (+1 more)

### Community 79 - ".GetRequiredAsync"
Cohesion: 0.24
Nodes (7): CancellationToken, Task, CurrentCustomer, ICurrentCustomerContext, CancellationToken, Task, CurrentCustomerContext

### Community 80 - "GetSepetQueryHandler"
Cohesion: 0.13
Nodes (14): ShopApp.Application.Sepet.Commands.CreateSepet, GetSepetQuery, IRequestHandler, Guid, CreateSepetCommand, CancellationToken, Guid, Task (+6 more)

### Community 81 - "ModelSnapshot"
Cohesion: 0.22
Nodes (5): ModelSnapshot, ModelBuilder, KategoriDbContextModelSnapshot, ModelBuilder, StokDbContextModelSnapshot

### Community 82 - "src/Frontend/ShopApp.Web/src/features/auth/services/authService.js"
Cohesion: 0.24
Nodes (12): establishSession(), getCurrentUser(), login(), logout(), mapUser(), register(), restoreSession(), setAnonymous() (+4 more)

### Community 83 - "Migration"
Cohesion: 0.33
Nodes (4): Migration, MigrationBuilder, ModelBuilder, IlkMigrasyon

### Community 84 - ".SaveChangesAsync"
Cohesion: 0.22
Nodes (9): CancellationToken, Task, Guid, ResultSepetDto, Guid, IMapper, List, Task (+1 more)

### Community 85 - "ShopApp.Application.Dtos.SepetUrunDtos"
Cohesion: 0.28
Nodes (3): ShopApp.Application.Dtos.SepetUrunDtos, ShopApp.Application.Services.SepetUrunService, ShopApp.Application.Services.SepetUrunleri

### Community 86 - ".Validate"
Cohesion: 0.17
Nodes (9): CreateSiparisCommand, ShopApp.Application.Siparis.Commands.CreateSiparis, Guid, Command, CreateSiparis, CreateSiparisCommand, List, ValidationResult (+1 more)

### Community 87 - "Q: How are role-specific customer and admin profiles provisioned?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How are role-specific customer and admin profiles provisioned?, Source Nodes

### Community 88 - "SiparisService"
Cohesion: 0.30
Nodes (6): CancellationToken, Guid, IMapper, List, Task, SiparisService

### Community 89 - "StokUrunleri"
Cohesion: 0.29
Nodes (6): StokServis.Infrastructure.Persistence.Configurations, Guid, ICollection, StokUrunleri, EntityTypeBuilder, StokUrunleriConfiguration

### Community 90 - "SepetUrunService"
Cohesion: 0.41
Nodes (5): Guid, IMapper, List, Task, SepetUrunService

### Community 91 - "ISepetService"
Cohesion: 0.43
Nodes (4): Guid, List, Task, ISepetService

### Community 92 - "IIdentityService"
Cohesion: 0.20
Nodes (10): IdentityUserInfo, Guid, IReadOnlyCollection, string, Task, AuthService, Guid, IReadOnlyCollection (+2 more)

### Community 93 - "src/Frontend/ShopApp.Web/src/shared/services/apiClient.js"
Cohesion: 0.29
Nodes (6): appConfig, buildUrl(), DEFAULT_HEADERS, getAuthHeader(), request(), serviceRegistry

### Community 94 - "authStore.js"
Cohesion: 0.18
Nodes (13): AUTH_STATUS, clearError(), getState(), initialState, merge(), notify(), setError(), setLoading() (+5 more)

### Community 95 - "KategoriServis.Domain.Entities"
Cohesion: 0.06
Nodes (34): KategoriServis.Domain.Entities, KategoriServis.Infrastructure.Persistence, KategoriServis.Domain.Common, KategoriServis.Infrastructure.Persistence.Configurations, DateTime, Guid, BaseEntity, Guid (+26 more)

### Community 96 - "InitialCreate"
Cohesion: 0.28
Nodes (4): StokServis.Migrations, MigrationBuilder, ModelBuilder, InitialCreate

### Community 97 - "store.js"
Cohesion: 0.36
Nodes (7): getState(), initialState, notify(), resetStore(), setState(), state, subscribers

### Community 98 - ".Validate"
Cohesion: 0.33
Nodes (4): Command, List, ValidationResult, CreateSiparisCommandHandler

### Community 99 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, SyncIdentityModels

### Community 104 - "SepetMapping.cs"
Cohesion: 0.40
Nodes (4): ShopApp.Application.Mapping, Profile, SepetMapping, SiparisMapping

## Knowledge Gaps
- **279 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `SepetUrunu`, `SepetEntity`, `AdminProfile`, `IShopAppDbContext`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `ShopApp.Infrastructure.Persistence.Configurations`, `BaseEntity`, `IdentityService`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence` to `CreateMonolithTables`, `ShopApp.Infrastructure.Persistence.Migrations`, `ShopAppDbContextModelSnapshot.cs`, `SepetEntity`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContext`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `AddRoleSpecificProfiles`, `UpdateMonolithTables`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `IShopAppDbContext` connect `IShopAppDbContext` to `SepetUrunu`, `SepetEntity`, `ShopAppDbContext`, `SiparisController`, `.SaveChangesAsync`, `SiparisService`, `SepetUrunService`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `homeService.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11067193675889328 - nodes in this community are weakly interconnected._
- **Should `ShopAppFrontendAGENTS.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.06951219512195123 - nodes in this community are weakly interconnected._