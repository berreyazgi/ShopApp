# Graph Report - Monolith  (2026-09-01)

## Corpus Check
- 111 files · ~15,241 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 557 nodes · 923 edges · 31 communities (30 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Abstractions
- Migration
- IIdentityService
- ShopApp.Infrastructure.csproj
- AdminProfile
- IEntityTypeConfiguration
- SepetDurumLookup
- Sepet
- IRequest
- IdentityService
- ShopAppDbContext.cs
- AddRoleSpecificProfiles
- CreateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- BaseEntity
- SiparisUrunleri
- ShopAppDbContext
- ShopApp.Application.Dtos.SepetDtos
- src.Monolith.ShopApp.Domain.Kullanici
- SepetUrunu
- SiparisService
- ShopApp.Infrastructure.Persistence.Migrations
- ShopApp.Application.Siparis.Commands.CreateSiparis
- src.Monolith.ShopApp.Domain.Common
- Musteri
- InfrastructureInitializer
- ShopAppDbContextModelSnapshot
- GetSiparis.cs

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 21 edges
2. `IdentityService` - 20 edges
3. `ShopApp.Application.Abstractions` - 19 edges
4. `Sepet` - 19 edges
5. `ShopApp.Application.Authentication` - 17 edges
6. `Siparis` - 17 edges
7. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
8. `IIdentityService` - 13 edges
9. `ShopApp.Infrastructure.Persistence` - 13 edges
10. `BaseEntity` - 12 edges

## Surprising Connections (you probably didn't know these)
- `SepetController` --references--> `ISepetRepository`  [EXTRACTED]
  ShopApp.Api/Controller/SepetController.cs → ShopApp.Application/Abstractions/ISepetRepository.cs
- `IdentityService` --implements--> `IIdentityService`  [EXTRACTED]
  ShopApp.Infrastructure/Identity/IdentityService.cs → ShopApp.Application/Abstractions/IIdentityService.cs
- `ShopAppDbContext` --references--> `Address`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/Address.cs
- `ShopAppDbContext` --references--> `AdminProfile`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/AdminProfile.cs
- `ShopAppDbContext` --references--> `Musteri`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/Musteri.cs

## Import Cycles
- None detected.

## Communities (31 total, 1 thin omitted)

### Community 0 - "ShopApp.Application.Abstractions"
Cohesion: 0.06
Nodes (24): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Authentication, ShopApp.Application.Services, ShopApp.Application.Authentication, ShopApp.Infrastructure, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions, Exception (+16 more)

### Community 1 - "Migration"
Cohesion: 0.29
Nodes (4): Migration, MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 2 - "IIdentityService"
Cohesion: 0.07
Nodes (31): ActionResult, Authorize, ControllerBase, HashSet, IActionResult, Guid, HttpGet, HttpPost (+23 more)

### Community 3 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (30): AutoMapper (16.2.0), MediatR (14.2.0), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.EntityFrameworkCore (10.0.11), Microsoft.Extensions.Configuration.Json (10.0.11), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1) (+22 more)

### Community 4 - "AdminProfile"
Cohesion: 0.38
Nodes (4): Guid, AdminProfile, EntityTypeBuilder, AdminProfileConfiguration

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.07
Nodes (28): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, EntityTypeBuilder (+20 more)

### Community 6 - "SepetDurumLookup"
Cohesion: 0.50
Nodes (3): SepetDurumLookup, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 7 - "Sepet"
Cohesion: 0.08
Nodes (24): ShopApp.Application.Sepet.Commands.CreateSepet, ICollection, SepetController, CancellationToken, Guid, Task, ISepetRepository, CancellationToken (+16 more)

### Community 8 - "IRequest"
Cohesion: 0.07
Nodes (26): ShopApp.Application.Dtos.SepetUrunDtos, ShopApp.Application.Mapping, ShopApp.Application.Dtos.SiparisUrunleriDto, IRequest, Profile, Guid, CreateSepetUrunDto, Guid (+18 more)

### Community 9 - "IdentityService"
Cohesion: 0.13
Nodes (16): IdentityError, IdentityResult, IdentityUser, IHttpContextAccessor, RoleManager, IdentityUserInfo, Guid, ApplicationUser (+8 more)

### Community 10 - "ShopAppDbContext.cs"
Cohesion: 0.24
Nodes (4): src.Monolith.ShopApp.Domain.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure.Persistence.Configurations, SepetDurum

### Community 11 - "AddRoleSpecificProfiles"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, AddRoleSpecificProfiles

### Community 12 - "CreateMonolithTables"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, CreateMonolithTables

### Community 13 - "DatabaseChanges"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, DatabaseChanges

### Community 14 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 15 - "AddMonolithDomainChanges"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, AddMonolithDomainChanges

### Community 16 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.33
Nodes (3): MigrationBuilder, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 17 - "BaseEntity"
Cohesion: 0.22
Nodes (6): DateTime, Guid, BaseEntity, Guid, Sepet, SepetUrunu

### Community 18 - "SiparisUrunleri"
Cohesion: 0.32
Nodes (4): Guid, SiparisUrunleri, EntityTypeBuilder, SiparisUrunleriConfiguration

### Community 19 - "ShopAppDbContext"
Cohesion: 0.08
Nodes (19): IdentityDbContext, IDesignTimeDbContextFactory, CancellationToken, DbSet, Task, IShopAppDbContext, Guid, IReadOnlyCollection (+11 more)

### Community 21 - "ShopApp.Application.Dtos.SepetDtos"
Cohesion: 0.06
Nodes (30): ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Sepet.Queries, ShopApp.Application.Services.SepetServices, GetSepetQuery, IRequestHandler, BaseSepetUrunDto, Guid, CreateSepetDto (+22 more)

### Community 22 - "src.Monolith.ShopApp.Domain.Kullanici"
Cohesion: 0.24
Nodes (5): src.Monolith.ShopApp.Domain.Kullanici, Guid, Address, EntityTypeBuilder, AddressConfiguration

### Community 23 - "SepetUrunu"
Cohesion: 0.26
Nodes (8): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu, EntityTypeBuilder, SepetUrunuConfiguration

### Community 24 - "SiparisService"
Cohesion: 0.11
Nodes (16): ShopApp.Application.Services.SiparisServices, ShopApp.Application.Dtos.SiparisDtos, Guid, CreateSiparisDto, GetByIdSiparisDto, ResultSiparisDto, UpdateSiparisDto, Guid (+8 more)

### Community 28 - "ShopApp.Application.Siparis.Commands.CreateSiparis"
Cohesion: 0.29
Nodes (4): ShopApp.Application.Siparis.Commands.CreateSiparis, CreateSiparis, CreateSiparisCommandHandler, CreateSiparisCommandValidator

### Community 29 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.40
Nodes (3): src.Monolith.ShopApp.Domain.Common, src.Monolith.ShopApp.Domain.Siparisler, SiparisDurum

### Community 30 - "Musteri"
Cohesion: 0.38
Nodes (4): Guid, Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 32 - "InfrastructureInitializer"
Cohesion: 0.20
Nodes (8): IHostedService, IServiceProvider, CancellationToken, Task, InfrastructureInitializer, string, Task, IdentityRoleSeeder

### Community 33 - "ShopAppDbContextModelSnapshot"
Cohesion: 0.50
Nodes (3): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 34 - "GetSiparis.cs"
Cohesion: 0.50
Nodes (3): ShopApp.Application.Siparis.Queries, Command, GetSiparis

## Knowledge Gaps
- **41 isolated node(s):** `SiparisController`, `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)`, `Microsoft.EntityFrameworkCore.Design (10.0.10)`, `Microsoft.OpenApi (1.6.22)` (+36 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Application.Abstractions` connect `ShopApp.Application.Abstractions` to `Sepet`, `ShopAppDbContext.cs`, `ShopAppDbContext`, `ShopApp.Application.Dtos.SepetDtos`, `SepetUrunu`, `SiparisService`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence.Migrations` to `ShopApp.Application.Abstractions`, `ShopAppDbContext.cs`, `ShopAppDbContext`, `Sepet`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `AdminProfile`, `SepetDurumLookup`, `Sepet`, `IdentityService`, `ShopAppDbContext.cs`, `SiparisUrunleri`, `src.Monolith.ShopApp.Domain.Kullanici`, `SepetUrunu`, `Musteri`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **What connects `SiparisController`, `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)` to the rest of the system?**
  _41 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ShopApp.Application.Abstractions` be split into smaller, more focused modules?**
  _Cohesion score 0.05893719806763285 - nodes in this community are weakly interconnected._
- **Should `IIdentityService` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.csproj` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._