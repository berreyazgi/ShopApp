# Graph Report - Monolith  (2026-08-20)

## Corpus Check
- 78 files · ~14,118 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 389 nodes · 635 edges · 20 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc60aeea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Authentication
- Migration
- IIdentityService
- ShopApp.Infrastructure.csproj
- ShopApp.Infrastructure.Persistence
- IEntityTypeConfiguration
- ShopAppDbContext
- KayitliKullanici
- SepetDto
- IdentityService
- IJwtTokenGenerator
- ShopApp.Infrastructure.Persistence.Migrations
- CreateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- IdentityRoleSeeder
- ShopApp.Application.Sepet.Commands.CreateSepet
- ShopAppDbContextModelSnapshot.cs

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 19 edges
2. `IdentityService` - 18 edges
3. `ShopApp.Application.Authentication` - 17 edges
4. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
5. `ShopApp.Infrastructure.Persistence` - 13 edges
6. `BaseEntity` - 12 edges
7. `ShopApp.Application.Abstractions` - 11 edges
8. `IIdentityService` - 11 edges
9. `Siparis` - 11 edges
10. `AuthResponse` - 10 edges

## Surprising Connections (you probably didn't know these)
- `IdentityService` --implements--> `IIdentityService`  [EXTRACTED]
  ShopApp.Infrastructure/Identity/IdentityService.cs → ShopApp.Application/Abstractions/IIdentityService.cs
- `ShopAppDbContext` --references--> `AdminProfile`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/AdminProfile.cs
- `ShopAppDbContext` --references--> `Sepet`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Sepet/Entities/Sepet.cs
- `ShopAppDbContext` --references--> `SepetDurumLookup`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Sepet/Entities/SepetDurumLookup.cs
- `AdminController` --references--> `IIdentityService`  [EXTRACTED]
  ShopApp.Api/Controller/AdminController.cs → ShopApp.Application/Abstractions/IIdentityService.cs

## Import Cycles
- None detected.

## Communities (20 total, 0 thin omitted)

### Community 0 - "ShopApp.Application.Authentication"
Cohesion: 0.08
Nodes (23): ActionResult, Authorize, ShopApp.Application.Services, ShopApp.Application.Authentication, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions, Exception, HttpGet (+15 more)

### Community 1 - "Migration"
Cohesion: 0.25
Nodes (4): Migration, MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 2 - "IIdentityService"
Cohesion: 0.11
Nodes (19): ControllerBase, HashSet, IActionResult, Guid, HttpGet, HttpPost, Task, AdminController (+11 more)

### Community 3 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (29): AutoMapper (16.2.0), MediatR (14.2.0), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.EntityFrameworkCore (10.0.11), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), Microsoft.NET.Sdk.Web (+21 more)

### Community 4 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.09
Nodes (18): ShopApp.Infrastructure.Identity, src.Monolith.ShopApp.Domain.Sepet, ShopApp.Infrastructure.Persistence, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure.Persistence.Configurations, ShopApp.Infrastructure, src.Monolith.ShopApp.Domain.Kullanici, IConfiguration (+10 more)

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.06
Nodes (30): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, Guid (+22 more)

### Community 6 - "ShopAppDbContext"
Cohesion: 0.05
Nodes (35): src.Monolith.ShopApp.Domain.Common, src.Monolith.ShopApp.Domain.Siparisler, DbSet, IdentityDbContext, IDesignTimeDbContextFactory, DateTime, Guid, BaseEntity (+27 more)

### Community 7 - "KayitliKullanici"
Cohesion: 0.18
Nodes (8): IdentityUser, Guid, ApplicationUser, DateTime, Guid, KayitliKullanici, EntityTypeBuilder, KayitliKullaniciConfiguration

### Community 8 - "SepetDto"
Cohesion: 0.09
Nodes (20): CancellationToken, ShopApp.Application.Sepet.Queries, ShopApp.Application.MappingProfile, GetSepetQuery, IMapper, IRequest, IRequestHandler, Profile (+12 more)

### Community 9 - "IdentityService"
Cohesion: 0.22
Nodes (8): IdentityError, IdentityResult, RoleManager, Guid, IReadOnlyCollection, Task, IdentityService, UserManager

### Community 10 - "IJwtTokenGenerator"
Cohesion: 0.18
Nodes (8): ShopApp.Infrastructure.Authentication, IEnumerable, IJwtTokenGenerator, JwtToken, string, JwtSettings, IEnumerable, JwtTokenGenerator

### Community 11 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.28
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 12 - "CreateMonolithTables"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 13 - "DatabaseChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 14 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 15 - "AddMonolithDomainChanges"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 16 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.29
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 17 - "IdentityRoleSeeder"
Cohesion: 0.33
Nodes (4): IServiceProvider, string, Task, IdentityRoleSeeder

### Community 18 - "ShopApp.Application.Sepet.Commands.CreateSepet"
Cohesion: 0.40
Nodes (3): ShopApp.Application.Sepet.Commands.CreateSepet, CreateSepet, CreateSepetCommandValidator

### Community 19 - "ShopAppDbContextModelSnapshot.cs"
Cohesion: 0.40
Nodes (3): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot

## Knowledge Gaps
- **34 isolated node(s):** `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)`, `Microsoft.EntityFrameworkCore.Design (10.0.10)`, `Microsoft.OpenApi (1.6.22)`, `Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3)` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence` to `Migration`, `ShopAppDbContext`, `ShopApp.Infrastructure.Persistence.Migrations`, `CreateMonolithTables`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `TurkcheIdentityVeMusteriGuncellemesi`, `ShopAppDbContextModelSnapshot.cs`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `IdentityService`, `ShopApp.Infrastructure.Persistence`, `IEntityTypeConfiguration`, `KayitliKullanici`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `IdentityService` connect `IdentityService` to `IIdentityService`, `ShopApp.Infrastructure.Persistence`, `ShopAppDbContext`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **What connects `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)`, `Microsoft.EntityFrameworkCore.Design (10.0.10)` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ShopApp.Application.Authentication` be split into smaller, more focused modules?**
  _Cohesion score 0.07862679955703211 - nodes in this community are weakly interconnected._
- **Should `IIdentityService` be split into smaller, more focused modules?**
  _Cohesion score 0.1140819964349376 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.csproj` be split into smaller, more focused modules?**
  _Cohesion score 0.06439393939393939 - nodes in this community are weakly interconnected._