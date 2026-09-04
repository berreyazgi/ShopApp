# Graph Report - Monolith  (2026-09-01)

## Corpus Check
- 108 files · ~15,080 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 534 nodes · 889 edges · 37 communities (36 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77f1d1c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Authentication
- Migration
- IIdentityService
- ShopApp.Infrastructure.csproj
- KayitliKullanici
- IEntityTypeConfiguration
- ShopAppDbContext
- Sepet
- IRequest
- IdentityService
- src.Monolith.ShopApp.Domain.Sepet.Entities
- ShopApp.Infrastructure.Persistence.Migrations
- CreateMonolithTables
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- src.Monolith.ShopApp.Domain.Sepet
- BaseEntity
- Siparis
- ShopApp.Application.Dtos.SepetDtos
- ISepetService
- src.Monolith.ShopApp.Domain.Common
- SepetUrunu
- ShopApp.Application.Dtos.SiparisDtos
- ShopApp.Infrastructure.Persistence
- CreateSepetCommandHandler.cs
- IJwtTokenGenerator
- ShopApp.Application.Siparis.Commands.CreateSiparis
- src.Monolith.ShopApp.Domain.Siparisler
- Musteri
- JwtTokenGenerator.cs
- IdentityRoleSeeder
- ShopAppDbContextModelSnapshot.cs
- GetSiparis.cs
- AuthenticationValidationException
- AuthRequest.cs

## God Nodes (most connected - your core abstractions)
1. `IdentityService` - 20 edges
2. `ShopAppDbContext` - 20 edges
3. `Sepet` - 19 edges
4. `ShopApp.Application.Authentication` - 17 edges
5. `ShopApp.Application.Abstractions` - 16 edges
6. `ShopApp.Infrastructure.Persistence.Migrations` - 15 edges
7. `Siparis` - 14 edges
8. `ShopApp.Infrastructure.Persistence` - 14 edges
9. `IIdentityService` - 13 edges
10. `BaseEntity` - 12 edges

## Surprising Connections (you probably didn't know these)
- `SepetController` --references--> `ISepetRepository`  [EXTRACTED]
  ShopApp.Api/Controller/SepetController.cs → ShopApp.Application/Abstractions/ISepetRepository.cs
- `IdentityService` --implements--> `IIdentityService`  [EXTRACTED]
  ShopApp.Infrastructure/Identity/IdentityService.cs → ShopApp.Application/Abstractions/IIdentityService.cs
- `JwtTokenGenerator` --implements--> `IJwtTokenGenerator`  [EXTRACTED]
  ShopApp.Infrastructure/Authentication/JwtTokenGenerator.cs → ShopApp.Application/Abstractions/IJwtTokenGenerator.cs
- `ShopAppDbContext` --references--> `Address`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/Address.cs
- `ShopAppDbContext` --references--> `AdminProfile`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/AdminProfile.cs

## Import Cycles
- None detected.

## Communities (37 total, 1 thin omitted)

### Community 0 - "ShopApp.Application.Authentication"
Cohesion: 0.20
Nodes (7): ShopApp.Application.Services, ShopApp.Application.Authentication, src.Monolith.ShopApp.Api.Controller, ShopApp.Application.Abstractions, SepetController, SiparisController, AssignRoleRequest

### Community 1 - "Migration"
Cohesion: 0.25
Nodes (4): Migration, MigrationBuilder, ModelBuilder, UpdateMonolithTables

### Community 2 - "IIdentityService"
Cohesion: 0.07
Nodes (31): ActionResult, Authorize, ControllerBase, HashSet, IActionResult, Guid, HttpGet, HttpPost (+23 more)

### Community 3 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (29): AutoMapper (16.2.0), MediatR (14.2.0), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.EntityFrameworkCore (10.0.11), Microsoft.Extensions.DependencyInjection (10.0.11), Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), Microsoft.NET.Sdk.Web (+21 more)

### Community 4 - "KayitliKullanici"
Cohesion: 0.18
Nodes (8): IdentityUser, Guid, ApplicationUser, DateTime, Guid, KayitliKullanici, EntityTypeBuilder, KayitliKullaniciConfiguration

### Community 5 - "IEntityTypeConfiguration"
Cohesion: 0.07
Nodes (30): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, IEntityTypeConfiguration, Guid (+22 more)

### Community 6 - "ShopAppDbContext"
Cohesion: 0.20
Nodes (8): DbSet, IdentityDbContext, IDesignTimeDbContextFactory, Guid, IdentityRole, ModelBuilder, ShopAppDbContext, ShopAppDbContextFactory

### Community 7 - "Sepet"
Cohesion: 0.12
Nodes (18): ICollection, CancellationToken, Guid, Task, ISepetRepository, CancellationToken, CreateSepetCommand, Guid (+10 more)

### Community 8 - "IRequest"
Cohesion: 0.06
Nodes (33): ShopApp.Application.Dtos.SepetUrunDtos, ShopApp.Application.Mapping, ShopApp.Application.Dtos.SiparisUrunleriDto, GetSepetQuery, IRequest, IRequestHandler, Profile, Guid (+25 more)

### Community 9 - "IdentityService"
Cohesion: 0.18
Nodes (10): IdentityError, IdentityResult, IHttpContextAccessor, RoleManager, IdentityUserInfo, Guid, IReadOnlyCollection, Task (+2 more)

### Community 10 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.29
Nodes (5): src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Infrastructure.Persistence.Configurations, SepetDurumLookup, EntityTypeBuilder, SepetDurumLookupConfiguration

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

### Community 17 - "src.Monolith.ShopApp.Domain.Sepet"
Cohesion: 0.29
Nodes (5): src.Monolith.ShopApp.Domain.Sepet, SepetDurum, Guid, Sepet, SepetUrunu

### Community 18 - "BaseEntity"
Cohesion: 0.21
Nodes (7): DateTime, Guid, BaseEntity, Guid, SiparisUrunleri, EntityTypeBuilder, SiparisUrunleriConfiguration

### Community 19 - "Siparis"
Cohesion: 0.24
Nodes (6): Guid, IReadOnlyCollection, List, Siparis, EntityTypeBuilder, SiparisConfiguration

### Community 20 - "ShopApp.Application.Dtos.SepetDtos"
Cohesion: 0.22
Nodes (5): ShopApp.Application.Dtos.SepetDtos, ShopApp.Application.Sepet.Queries, ShopApp.Application.Services.SepetServices, BaseSepetUrunDto, DeleteSepetDto

### Community 21 - "ISepetService"
Cohesion: 0.14
Nodes (12): Guid, CreateSepetDto, Guid, UpdateSepetDto, Guid, List, Task, ISepetService (+4 more)

### Community 22 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.17
Nodes (6): src.Monolith.ShopApp.Domain.Kullanici, src.Monolith.ShopApp.Domain.Common, Guid, Address, EntityTypeBuilder, AddressConfiguration

### Community 23 - "SepetUrunu"
Cohesion: 0.26
Nodes (8): CancellationToken, Guid, Task, IUrunRepository, Guid, SepetUrunu, EntityTypeBuilder, SepetUrunuConfiguration

### Community 24 - "ShopApp.Application.Dtos.SiparisDtos"
Cohesion: 0.12
Nodes (15): ShopApp.Application.Services.SiparisServices, ShopApp.Application.Dtos.SiparisDtos, Guid, CreateSiparisDto, GetByIdSiparisDto, ResultSiparisDto, UpdateSiparisDto, Guid (+7 more)

### Community 25 - "ShopApp.Infrastructure.Persistence"
Cohesion: 0.25
Nodes (6): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Persistence, ShopApp.Infrastructure, IConfiguration, IServiceCollection, DependencyInjection

### Community 26 - "CreateSepetCommandHandler.cs"
Cohesion: 0.25
Nodes (5): ShopApp.Application.Sepet.Commands.CreateSepet, CreateSepetCommand, List, CreateSepetCommandValidator, ValidationResult

### Community 27 - "IJwtTokenGenerator"
Cohesion: 0.25
Nodes (4): IEnumerable, IJwtTokenGenerator, JwtToken, IEnumerable

### Community 28 - "ShopApp.Application.Siparis.Commands.CreateSiparis"
Cohesion: 0.29
Nodes (4): ShopApp.Application.Siparis.Commands.CreateSiparis, CreateSiparis, CreateSiparisCommandHandler, CreateSiparisCommandValidator

### Community 29 - "src.Monolith.ShopApp.Domain.Siparisler"
Cohesion: 0.29
Nodes (3): src.Monolith.ShopApp.Domain.Siparisler, SiparisDurumLookup, SiparisDurum

### Community 30 - "Musteri"
Cohesion: 0.38
Nodes (4): Guid, Musteri, EntityTypeBuilder, MusteriConfiguration

### Community 31 - "JwtTokenGenerator.cs"
Cohesion: 0.40
Nodes (4): ShopApp.Infrastructure.Authentication, string, JwtSettings, JwtTokenGenerator

### Community 32 - "IdentityRoleSeeder"
Cohesion: 0.33
Nodes (4): IServiceProvider, string, Task, IdentityRoleSeeder

### Community 33 - "ShopAppDbContextModelSnapshot.cs"
Cohesion: 0.40
Nodes (3): ModelSnapshot, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 34 - "GetSiparis.cs"
Cohesion: 0.50
Nodes (3): ShopApp.Application.Siparis.Queries, Command, GetSiparis

### Community 35 - "AuthenticationValidationException"
Cohesion: 0.50
Nodes (3): Exception, IReadOnlyCollection, AuthenticationValidationException

## Knowledge Gaps
- **42 isolated node(s):** `SiparisController`, `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)`, `Microsoft.EntityFrameworkCore.Design (10.0.10)`, `Microsoft.OpenApi (1.6.22)` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence` to `Migration`, `ShopAppDbContextModelSnapshot.cs`, `ShopAppDbContext`, `Sepet`, `ShopApp.Infrastructure.Persistence.Migrations`, `CreateMonolithTables`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `TurkcheIdentityVeMusteriGuncellemesi`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `Sepet` connect `Sepet` to `ShopAppDbContext`, `IRequest`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `BaseEntity`, `ShopApp.Application.Dtos.SepetDtos`, `src.Monolith.ShopApp.Domain.Common`, `SepetUrunu`, `CreateSepetCommandHandler.cs`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `KayitliKullanici`, `IEntityTypeConfiguration`, `Sepet`, `IdentityService`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `BaseEntity`, `Siparis`, `src.Monolith.ShopApp.Domain.Common`, `SepetUrunu`, `ShopApp.Infrastructure.Persistence`, `src.Monolith.ShopApp.Domain.Siparisler`, `Musteri`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `SiparisController`, `net10.0`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `IIdentityService` be split into smaller, more focused modules?**
  _Cohesion score 0.06892230576441102 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.csproj` be split into smaller, more focused modules?**
  _Cohesion score 0.06439393939393939 - nodes in this community are weakly interconnected._
- **Should `IEntityTypeConfiguration` be split into smaller, more focused modules?**
  _Cohesion score 0.06553911205073996 - nodes in this community are weakly interconnected._