# Graph Report - .  (2026-08-09)

## Corpus Check
- 121 files · ~82,304 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 434 nodes · 725 edges · 29 communities (25 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- API and Authentication
- Frontend App Bootstrap
- Solution Configuration
- Frontend Auth Service
- EF Core Migrations
- Authentication Forms
- Login Validation
- Cart Domain Model
- Domain Entity Configurations
- Database Context
- Entity Base Types
- Identity User Model
- Order Domain Model
- Cart Service
- Frontend Constants
- Order Item Persistence
- Application Abstractions
- Frontend Event Bus
- Catalog API
- Inventory API

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 18 edges
2. `Siparis` - 13 edges
3. `LoginPage()` - 11 edges
4. `createFieldError()` - 11 edges
5. `RegisterPage()` - 10 edges
6. `validatePassword()` - 10 edges
7. `isNonEmpty()` - 10 edges
8. `BaseEntity` - 10 edges
9. `navigate()` - 9 edges
10. `createFormField()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `createAuthForm()` --indirect_call--> `setLoading()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/AuthForm.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `clearError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `createFormField()` --indirect_call--> `setError()`  [INFERRED]
  src/Frontend/ShopApp.Web/src/features/auth/components/FormField.js → src/Frontend/ShopApp.Web/src/features/auth/state/authStore.js
- `Siparis` --references--> `SiparisDurum`  [EXTRACTED]
  src/Monolith/ShopApp.Domain/Siparisler/Siparis.cs → src/Monolith/ShopApp.Domain/Siparisler/SiparisDurum.cs
- `ShopAppDbContext` --references--> `SiparisDurumLookup`  [EXTRACTED]
  src/Monolith/ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → src/Monolith/ShopApp.Domain/Siparisler/SiparisDurumLookup.cs

## Import Cycles
- None detected.

## Communities (29 total, 4 thin omitted)

### Community 0 - "API and Authentication"
Cohesion: 0.05
Nodes (37): ControllerBase, ShopApp.Infrastructure.Authentication, ShopApp.Infrastructure.Services, src.Monolith.ShopApp.Application.Common.Models, src.Monolith.ShopApp.Application.Auth, ShopApp.Infrastructure, src.Monolith.ShopApp.Api.Controller, src.Monolith.ShopApp.Application.Common.Interfaces (+29 more)

### Community 1 - "Frontend App Bootstrap"
Cohesion: 0.06
Nodes (36): initApp(), bootstrap(), compileRoute(), initRouter(), matchRoute(), navigate(), render(), notFoundRoute (+28 more)

### Community 2 - "Solution Configuration"
Cohesion: 0.05
Nodes (34): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.DependencyInjection (10.0.10), Swashbuckle.AspNetCore (7.3.1), net10.0, Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10), Microsoft.EntityFrameworkCore.Design (10.0.10), Microsoft.OpenApi (1.6.22), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3) (+26 more)

### Community 3 - "Frontend Auth Service"
Cohesion: 0.08
Nodes (29): appConfig, login(), logout(), mapAuthResponse(), NOTE: The backend does not yet expose a logout endpoint., NOTE: Backend does not yet expose a /me endpoint., NOTE: Backend does not yet expose a refresh endpoint., register() (+21 more)

### Community 4 - "EF Core Migrations"
Cohesion: 0.08
Nodes (15): ShopApp.Infrastructure.Persistence.Migrations, ShopApp.Infrastructure.Persistence, Migration, ModelSnapshot, MigrationBuilder, ModelBuilder, CreateMonolithTables, MigrationBuilder (+7 more)

### Community 5 - "Authentication Forms"
Cohesion: 0.15
Nodes (22): createAuthForm(), createAuthLayout(), createFormField(), createPasswordField(), createPasswordStrength(), createSocialLoginButtons(), IMPORTANT: These are visual placeholders only., AUTH_ROUTES (+14 more)

### Community 6 - "Login Validation"
Cohesion: 0.21
Nodes (25): RFC-5322, NOTE: This is a UX helper only., validateEmail(), validateLoginField(), validateLoginForm(), validatePassword(), NOTE: This is a UX helper only., validateConfirmPassword() (+17 more)

### Community 7 - "Cart Domain Model"
Cohesion: 0.15
Nodes (11): src.Monolith.ShopApp.Domain.Sepet, Guid, ICollection, Sepet, SepetDurum, Guid, SepetUrunleri, EntityTypeBuilder (+3 more)

### Community 8 - "Domain Entity Configurations"
Cohesion: 0.18
Nodes (10): ShopApp.Infrastructure.Persistence.Configurations, src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, Guid, Address, Musteri, EntityTypeBuilder, AddressConfiguration (+2 more)

### Community 9 - "Database Context"
Cohesion: 0.18
Nodes (9): DbSet, IdentityDbContext, IdentityRole, IDesignTimeDbContextFactory, SepetDurumLookup, Guid, ModelBuilder, ShopAppDbContext (+1 more)

### Community 10 - "Entity Base Types"
Cohesion: 0.22
Nodes (6): DateTime, Guid, BaseEntity, Guid, ICollection, Siparis

### Community 11 - "Identity User Model"
Cohesion: 0.22
Nodes (7): ShopApp.Infrastructure.Identity, IdentityUser, IEntityTypeConfiguration, Guid, ApplicationUser, EntityTypeBuilder, ApplicationUserConfiguration

### Community 12 - "Order Domain Model"
Cohesion: 0.20
Nodes (5): src.Monolith.ShopApp.Domain.Siparisler, SiparisDurum, SiparisDurumLookup, EntityTypeBuilder, SiparisConfiguration

### Community 13 - "Cart Service"
Cohesion: 0.22
Nodes (4): TODO: return apiClient.get(endpoints.cart.summary());, TODO: const result = await apiClient.post(endpoints.cart.addItem(), item);, TODO: await apiClient.delete(endpoints.cart.removeItem(itemId));, TODO: await apiClient.post(endpoints.cart.clear());

### Community 14 - "Frontend Constants"
Cohesion: 0.25
Nodes (7): APP_CURRENCY, APP_LOCALE, APP_NAME, APP_VERSION, BREAKPOINTS, EVENTS, STORAGE_KEYS

### Community 16 - "Order Item Persistence"
Cohesion: 0.33
Nodes (4): Guid, SiparisUrunleri, EntityTypeBuilder, SiparisUrunleriConfiguration

## Knowledge Gaps
- **62 isolated node(s):** `initialState`, `state`, `subscribers`, `RFC-5322`, `benefits` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopAppDbContext` connect `Database Context` to `Cart Domain Model`, `Domain Entity Configurations`, `Entity Base Types`, `Identity User Model`, `Order Domain Model`, `Order Item Persistence`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `EF Core Migrations` to `API and Authentication`, `Database Context`, `Identity User Model`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Identity` connect `Identity User Model` to `API and Authentication`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `initialState`, `state`, `subscribers` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API and Authentication` be split into smaller, more focused modules?**
  _Cohesion score 0.05084745762711865 - nodes in this community are weakly interconnected._
- **Should `Frontend App Bootstrap` be split into smaller, more focused modules?**
  _Cohesion score 0.06397306397306397 - nodes in this community are weakly interconnected._
- **Should `Solution Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.049494949494949494 - nodes in this community are weakly interconnected._