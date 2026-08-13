# Graph Report - Monolith  (2026-08-10)

## Corpus Check
- 50 files · ~9,316 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 225 nodes · 332 edges · 8 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4fa3341c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ShopApp.Application.Auth
- ShopApp.Infrastructure.Persistence.Migrations
- Siparis
- ShopApp.Infrastructure.csproj
- ShopApp.Application.Abstractions
- ShopApp.Infrastructure.Persistence.Configurations
- Sepet
- ShopAppDbContext

## God Nodes (most connected - your core abstractions)
1. `ShopAppDbContext` - 18 edges
2. `Siparis` - 13 edges
3. `BaseEntity` - 10 edges
4. `ShopApp.Application.Abstractions` - 9 edges
5. `Sepet` - 9 edges
6. `ShopApp.Infrastructure.Persistence.Migrations` - 9 edges
7. `ShopApp.Infrastructure.Persistence` - 8 edges
8. `ShopApp.Application.Auth` - 7 edges
9. `src.Monolith.ShopApp.Domain.Common` - 7 edges
10. `Address` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ShopAppDbContext` --references--> `SepetDurumLookup`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Sepet/SepetDurumLookup.cs
- `JwtTokenGenerator` --implements--> `IJwtTokenGenerator`  [EXTRACTED]
  ShopApp.Infrastructure/Authentication/JwtTokenGenerator.cs → ShopApp.Application/Abstractions/IJwtTokenGenerator.cs
- `ShopAppDbContext` --references--> `Address`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/Address.cs
- `ShopAppDbContext` --references--> `Musteri`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Kullanici/Musteri.cs
- `ShopAppDbContext` --references--> `Sepet`  [EXTRACTED]
  ShopApp.Infrastructure/Persistence/ShopAppDbContext.cs → ShopApp.Domain/Sepet/Sepet.cs

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "ShopApp.Application.Auth"
Cohesion: 0.08
Nodes (23): ControllerBase, ShopApp.Application.Auth, src.Monolith.ShopApp.Api.Controller, HttpPost, IActionResult, RoleManager, Task, AuthController (+15 more)

### Community 1 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.07
Nodes (18): ShopApp.Infrastructure.Persistence.Migrations, ShopApp.Infrastructure.Persistence, Migration, ModelSnapshot, MigrationBuilder, ModelBuilder, CreateMonolithTables, MigrationBuilder (+10 more)

### Community 2 - "Siparis"
Cohesion: 0.10
Nodes (15): src.Monolith.ShopApp.Domain.Common, src.Monolith.ShopApp.Domain.Siparisler, DateTime, Guid, BaseEntity, Guid, ICollection, Siparis (+7 more)

### Community 3 - "ShopApp.Infrastructure.csproj"
Cohesion: 0.06
Nodes (30): Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.Extensions.DependencyInjection (10.0.10), Microsoft.OpenApi (1.6.22), Swashbuckle.AspNetCore (7.3.1), Microsoft.NET.Sdk.Web, net10.0, DataAnnotationsExtensions (5.0.1.27), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10) (+22 more)

### Community 4 - "ShopApp.Application.Abstractions"
Cohesion: 0.10
Nodes (15): ShopApp.Infrastructure.Identity, ShopApp.Infrastructure.Authentication, ShopApp.Infrastructure.Services, ShopApp.Infrastructure, ShopApp.Application.Abstractions, IConfiguration, IServiceCollection, IIdentityService (+7 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations"
Cohesion: 0.11
Nodes (16): ShopApp.Infrastructure.Persistence.Configurations, src.Monolith.ShopApp.Domain.Kullanici, IdentityUser, IEntityTypeConfiguration, Guid, Address, Musteri, DateTime (+8 more)

### Community 6 - "Sepet"
Cohesion: 0.13
Nodes (12): src.Monolith.ShopApp.Domain.Sepet, Guid, ICollection, Sepet, SepetDurum, SepetDurumLookup, Guid, SepetUrunleri (+4 more)

### Community 7 - "ShopAppDbContext"
Cohesion: 0.18
Nodes (9): DbSet, IdentityDbContext, IdentityRole, IDesignTimeDbContextFactory, SiparisDurumLookup, Guid, ModelBuilder, ShopAppDbContext (+1 more)

## Knowledge Gaps
- **34 isolated node(s):** `src.Monolith.ShopApp.Api.Controller`, `net10.0`, `DataAnnotationsExtensions (5.0.1.27)`, `Microsoft.AspNetCore.Authentication.JwtBearer (10.0.10)`, `Microsoft.EntityFrameworkCore.Design (10.0.10)` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `ShopApp.Infrastructure.Persistence.Migrations`, `Siparis`, `ShopApp.Infrastructure.Persistence.Configurations`, `Sepet`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Persistence` connect `ShopApp.Infrastructure.Persistence.Migrations` to `ShopApp.Application.Abstractions`, `ShopAppDbContext`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **Why does `ShopApp.Infrastructure.Identity` connect `ShopApp.Application.Abstractions` to `ShopApp.Infrastructure.Persistence.Migrations`, `ShopApp.Infrastructure.Persistence.Configurations`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **What connects `src.Monolith.ShopApp.Api.Controller`, `net10.0`, `DataAnnotationsExtensions (5.0.1.27)` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ShopApp.Application.Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Infrastructure.Persistence.Migrations` be split into smaller, more focused modules?**
  _Cohesion score 0.06707317073170732 - nodes in this community are weakly interconnected._
- **Should `Siparis` be split into smaller, more focused modules?**
  _Cohesion score 0.10344827586206896 - nodes in this community are weakly interconnected._