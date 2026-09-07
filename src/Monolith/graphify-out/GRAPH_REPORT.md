# Graph Report - Monolith  (2026-09-07)

## Corpus Check
- 177 files · ~26,175 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1281 nodes · 2651 edges · 70 communities (68 shown, 2 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 287 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe12b717`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .AddInfrastructure
- ShopApp.Infrastructure.Persistence.Migrations
- UserProfileDto
- ShopApp.Application.csproj
- BaseEntity
- ShopApp.Infrastructure.Persistence.Configurations.Identity
- SepetDurumLookup
- IShopAppDbContext
- IRequest
- IdentityService
- src.Monolith.ShopApp.Domain.Sepet.Entities
- AddRoleSpecificProfiles
- Migration
- DatabaseChanges
- MakeApplicationUserUpdatedAtRequired
- AddMonolithDomainChanges
- TurkcheIdentityVeMusteriGuncellemesi
- SiparisEntity
- SepetController
- ShopAppDbContext
- SiparisController
- ResultSepetDto
- IEntityTypeConfiguration
- SepetUrunu
- .Create_Throws_WhenParentCartBelongsToAnotherCustomer
- AbstractValidator
- SepetEntity
- .Olustur
- AuthResponse
- src.Monolith.ShopApp.Domain.Common
- Musteri
- .Login
- InfrastructureInitializer
- .BuildModel
- .For
- Urun
- ValidationBehavior
- ICurrentCustomerContext
- IIdentityService
- SepetController.cs
- http
- Kategori
- KayitliKullanici
- ShopApp.Application.Common.Interfaces
- SiparisController.cs
- src.Monolith.ShopApp.Domain.Siparis.Entities
- UrunOzellik
- AddUrunCatalogTables
- .AssignRole
- DeleteSiparisCommand
- TestDbContext
- UrunTur
- SyncIdentityModels
- StandardizeSepetUrunuQuantityField
- ShopApp.Application.Features.Authentication.DTOs
- Address
- UrunGorsel
- src.Monolith.ShopApp.Domain.Sepet.Enums
- .SeedAsync
- ApplicationUser
- .Create_DerivesMusteriId_FromAuthenticatedCustomer
- SiparisDurum
- AuthRequest
- .GenerateToken
- RegisterRequest
- ShopApp.Application.Features.Sepet.Commands.DeleteSepet
- AuthenticationValidationException
- CurrentCustomerContext
- .BuildTargetModel
- ShopAppDbContextFactory

## God Nodes (most connected - your core abstractions)
1. `ShopApp.Application.Common.Interfaces` - 51 edges
2. `SiparisEntity` - 39 edges
3. `ShopAppDbContext` - 38 edges
4. `SepetEntity` - 34 edges
5. `ICurrentCustomerContext` - 31 edges
6. `IShopAppDbContext` - 30 edges
7. `IdentityService` - 25 edges
8. `SiparisUrunleri` - 24 edges
9. `Urun` - 22 edges
10. `CurrentCustomer` - 21 edges

## Surprising Connections (you probably didn't know these)
- `AdminController` --references--> `IIdentityService`  [EXTRACTED]
  ShopApp.Api/Controllers/AdminController.cs → ShopApp.Application/Common/Interfaces/IIdentityService.cs
- `GetSepetQueryHandlerTests` --references--> `CurrentCustomer`  [EXTRACTED]
  ShopApp.Application.Tests/Features/Sepet/GetSepetQueryHandlerTests.cs → ShopApp.Application/Common/Interfaces/ICurrentCustomerContext.cs
- `SepetCommandHandlerTests` --references--> `CurrentCustomer`  [EXTRACTED]
  ShopApp.Application.Tests/Features/Sepet/SepetCommandHandlerTests.cs → ShopApp.Application/Common/Interfaces/ICurrentCustomerContext.cs
- `SepetUrunuCommandHandlerTests` --references--> `CurrentCustomer`  [EXTRACTED]
  ShopApp.Application.Tests/Features/Sepet/SepetUrunuCommandHandlerTests.cs → ShopApp.Application/Common/Interfaces/ICurrentCustomerContext.cs
- `GetSiparisQueryHandlerTests` --references--> `CurrentCustomer`  [EXTRACTED]
  ShopApp.Application.Tests/Features/Siparis/GetSiparisQueryHandlerTests.cs → ShopApp.Application/Common/Interfaces/ICurrentCustomerContext.cs

## Import Cycles
- None detected.

## Communities (70 total, 2 thin omitted)

### Community 0 - ".AddInfrastructure"
Cohesion: 0.14
Nodes (13): IConfiguration, IOptions, IJwtTokenGenerator, Guid, IdentityRole, IServiceCollection, DependencyInjection, JwtTokenGenerator (+5 more)

### Community 1 - "ShopApp.Infrastructure.Persistence.Migrations"
Cohesion: 0.32
Nodes (4): ShopApp.Infrastructure.Persistence.Migrations, Guid, MigrationBuilder, UpdateMonolithTables

### Community 2 - "UserProfileDto"
Cohesion: 0.08
Nodes (31): ControllerBase, ShopApp.Application.Features.Profil.Commands.UpdateMyProfile, ShopApp.Application.Features.Profil.Queries.GetMyProfile, ShopApp.Application.Features.Profil.Dtos, ShopApp.Application.Tests.Features.Profil, GetMyProfileQuery, ActionResult, CancellationToken (+23 more)

### Community 3 - "ShopApp.Application.csproj"
Cohesion: 0.04
Nodes (42): AutoMapper (16.2.0), coverlet.collector (6.0.4), FluentValidation (12.1.1), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.10), Microsoft.EntityFrameworkCore (10.0.11), Microsoft.EntityFrameworkCore.InMemory (10.0.11), Microsoft.Extensions.Configuration.Json (11.0.0-preview.7.26381.103), Microsoft.Extensions.DependencyInjection (10.0.11) (+34 more)

### Community 4 - "BaseEntity"
Cohesion: 0.17
Nodes (11): DateTime, Guid, BaseEntity, GuncellemeTarihi, GuncelleyenKullaniciId, Id, OlusturanKullaniciId, OlusturmaTarihi (+3 more)

### Community 5 - "ShopApp.Infrastructure.Persistence.Configurations.Identity"
Cohesion: 0.07
Nodes (25): ShopApp.Infrastructure.Persistence.Configurations.Identity, IdentityRoleClaim, IdentityUserClaim, IdentityUserLogin, IdentityUserRole, IdentityUserToken, EntityTypeBuilder, Guid (+17 more)

### Community 6 - "SepetDurumLookup"
Cohesion: 0.29
Nodes (5): SepetDurumLookup, DurumIsmi, Id, EntityTypeBuilder, SepetDurumLookupConfiguration

### Community 7 - "IShopAppDbContext"
Cohesion: 0.05
Nodes (60): ShopApp.Application.Tests.Features.Adres, ShopApp.Application.Features.Adres.Queries.GetMyAddresses, ShopApp.Application.Features.Adres.Commands.UpdateAddress, ShopApp.Application.Features.Adres.Commands.DeleteAddress, ShopApp.Application.Features.Adres.Commands.CreateAddress, ShopApp.Application.Features.Adres.Dtos, GetMyAddressesQuery, ActionResult (+52 more)

### Community 8 - "IRequest"
Cohesion: 0.06
Nodes (41): ShopApp.Application.Features.Siparis.Dtos, ShopApp.Application.Mapping, GetMySiparislerQuery, GetSiparisQuery, IRequest, Profile, Guid, GetByIdSepetDto (+33 more)

### Community 9 - "IdentityService"
Cohesion: 0.21
Nodes (10): IdentityError, IdentityResult, Guid, IdentityRole, IHttpContextAccessor, IReadOnlyCollection, RoleManager, Task (+2 more)

### Community 10 - "src.Monolith.ShopApp.Domain.Sepet.Entities"
Cohesion: 0.25
Nodes (5): ShopApp.Application.Tests.Features.Sepet, src.Monolith.ShopApp.Domain.Sepet.Entities, ShopApp.Application.Features.Sepet.Commands.CreateSepet, ShopApp.Application.Tests.TestSupport, CustomerContextFactory

### Community 11 - "AddRoleSpecificProfiles"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddRoleSpecificProfiles

### Community 12 - "Migration"
Cohesion: 0.14
Nodes (10): Migration, DateTime, DateTimeOffset, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid (+2 more)

### Community 13 - "DatabaseChanges"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, DatabaseChanges

### Community 14 - "MakeApplicationUserUpdatedAtRequired"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, MakeApplicationUserUpdatedAtRequired

### Community 15 - "AddMonolithDomainChanges"
Cohesion: 0.20
Nodes (7): Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddMonolithDomainChanges

### Community 16 - "TurkcheIdentityVeMusteriGuncellemesi"
Cohesion: 0.18
Nodes (7): DateTime, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, TurkcheIdentityVeMusteriGuncellemesi

### Community 17 - "SiparisEntity"
Cohesion: 0.05
Nodes (53): ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu, CancellationToken, Guid, Task, ISiparisRepository, CancellationToken, Guid, Task (+45 more)

### Community 18 - "SepetController"
Cohesion: 0.08
Nodes (35): ShopApp.Application.Features.Sepet.Dtos, GetSepetUrunleriQuery, GetSepetUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet (+27 more)

### Community 19 - "ShopAppDbContext"
Cohesion: 0.10
Nodes (20): IdentityDbContext, DbSet, Guid, IdentityRole, ModelBuilder, SiparisUrunleri, ShopAppDbContext, AdminProfilleri (+12 more)

### Community 20 - "SiparisController"
Cohesion: 0.10
Nodes (31): GetSiparisUrunleriQuery, GetSiparisUrunuQuery, ActionResult, CancellationToken, Guid, HttpDelete, HttpGet, HttpPost (+23 more)

### Community 21 - "ResultSepetDto"
Cohesion: 0.12
Nodes (24): GetMySepetlerQuery, GetSepetQuery, DateTime, Guid, ResultSepetDto, CancellationToken, IMapper, List (+16 more)

### Community 22 - "IEntityTypeConfiguration"
Cohesion: 0.18
Nodes (7): src.Monolith.ShopApp.Domain.Kullanici, ShopApp.Infrastructure.Persistence.Configurations.Kullanici, IEntityTypeConfiguration, EntityTypeBuilder, AddressConfiguration, EntityTypeBuilder, AdminProfileConfiguration

### Community 23 - "SepetUrunu"
Cohesion: 0.08
Nodes (20): ShopApp.Infrastructure.Persistence.Configurations.Common, ShopApp.Infrastructure.Persistence.Configurations.Sepet, ShopApp.Infrastructure.Persistence.Configurations.Siparis, Guid, SepetUrunu, FiyatGecmis, SepetEntity, SepetId (+12 more)

### Community 24 - ".Create_Throws_WhenParentCartBelongsToAnotherCustomer"
Cohesion: 0.16
Nodes (17): ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu, Guid, DeleteSepetUrunuCommand, CancellationToken, Task, DeleteSepetUrunuCommandHandler, DeleteSepetUrunuCommandValidator, Guid (+9 more)

### Community 25 - "AbstractValidator"
Cohesion: 0.14
Nodes (17): AbstractValidator, Guid, CreateSepetUrunuCommand, CreateSepetUrunuCommandValidator, Guid, UpdateSepetCommand, UpdateSepetCommandValidator, UpdateSepetUrunuCommandValidator (+9 more)

### Community 26 - "SepetEntity"
Cohesion: 0.16
Nodes (15): CancellationToken, Guid, Task, ISepetRepository, Guid, ICollection, SepetEntity, Durum (+7 more)

### Community 27 - ".Olustur"
Cohesion: 0.21
Nodes (14): Guid, DeleteSepetCommand, CancellationToken, Task, DeleteSepetCommandHandler, CancellationToken, Task, UpdateSepetCommandHandler (+6 more)

### Community 28 - "AuthResponse"
Cohesion: 0.16
Nodes (13): IReadOnlyCollection, DateTime, AuthResponse, AccessToken, ExpiresAt, User, Guid, IReadOnlyCollection (+5 more)

### Community 29 - "src.Monolith.ShopApp.Domain.Common"
Cohesion: 0.29
Nodes (3): ShopApp.Infrastructure.Persistence.Configurations.Urun, ShopApp.Domain.Urun.Entities, src.Monolith.ShopApp.Domain.Common

### Community 30 - "Musteri"
Cohesion: 0.28
Nodes (7): Musteri, Guid, Musteri, Cinsiyet, KullaniciId, EntityTypeBuilder, MusteriConfiguration

### Community 31 - ".Login"
Cohesion: 0.16
Nodes (13): AllowAnonymous, Authorize, ActionResult, HttpGet, HttpPost, Task, AuthController, LoginRequest (+5 more)

### Community 32 - "InfrastructureInitializer"
Cohesion: 0.32
Nodes (6): IHostedService, ILogger, CancellationToken, IServiceProvider, Task, InfrastructureInitializer

### Community 33 - ".BuildModel"
Cohesion: 0.25
Nodes (6): ModelSnapshot, DateTime, DateTimeOffset, Guid, ModelBuilder, ShopAppDbContextModelSnapshot

### Community 34 - ".For"
Cohesion: 0.29
Nodes (11): Mock, CancellationToken, Task, UpdateSiparisCommandHandler, CancellationToken, Fact, Guid, KeyNotFoundException (+3 more)

### Community 35 - "Urun"
Cohesion: 0.12
Nodes (16): Guid, ICollection, Urun, AktifMi, Fiyat, FiyatGecmis, Gorseller, GorselUrl (+8 more)

### Community 36 - "ValidationBehavior"
Cohesion: 0.12
Nodes (12): ShopApp.Infrastructure, ShopApp.Application, ShopApp.Application.Common.Behaviors, IPipelineBehavior, IValidator, RequestHandlerDelegate, CancellationToken, IEnumerable (+4 more)

### Community 37 - "ICurrentCustomerContext"
Cohesion: 0.16
Nodes (14): IRequestHandler, CancellationToken, Task, ICurrentCustomerContext, CancellationToken, Guid, Task, CreateSepetUrunuCommandHandler (+6 more)

### Community 38 - "IIdentityService"
Cohesion: 0.24
Nodes (6): Guid, Task, IIdentityService, DateTime, Guid, IdentityUserInfo

### Community 39 - "SepetController.cs"
Cohesion: 0.14
Nodes (5): ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu, ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu, ShopApp.Application.Features.Sepet.Queries, ShopApp.Application.Tests.Validation, ShopApp.Application.Features.Sepet.Commands.UpdateSepet

### Community 40 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 41 - "Kategori"
Cohesion: 0.14
Nodes (13): Guid, ICollection, Kategori, AktifMi, AltKategoriler, GorselUrl, KategoriAciklamasi, KategoriIsim (+5 more)

### Community 42 - "KayitliKullanici"
Cohesion: 0.14
Nodes (12): DateTime, Guid, KayitliKullanici, Ad, Durum, GuncellemeTarihi, OlusturmaTarihi, Soyad (+4 more)

### Community 43 - "ShopApp.Application.Common.Interfaces"
Cohesion: 0.29
Nodes (6): ShopApp.Infrastructure.Identity.Services, ShopApp.Infrastructure.Persistence.Context, ShopApp.Application.Common.Interfaces, ShopApp.Infrastructure.Identity.Models, ShopApp.Infrastructure.Identity.Settings, ShopApp.Infrastructure.Persistence.Repositories

### Community 44 - "SiparisController.cs"
Cohesion: 0.18
Nodes (4): ShopApp.Application.Features.Siparis.Queries, ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu, ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu, ShopApp.Application.Tests.Features.Siparis

### Community 45 - "src.Monolith.ShopApp.Domain.Siparis.Entities"
Cohesion: 0.19
Nodes (4): src.Monolith.ShopApp.Domain.Siparis.Entities, ShopApp.Application.Features.Siparis.Commands.CreateSiparis, src.Monolith.ShopApp.Domain.Siparis.Enums, ShopApp.Application.Features.Siparis.Commands.UpdateSiparis

### Community 46 - "UrunOzellik"
Cohesion: 0.18
Nodes (10): Guid, UrunOzellik, OzellikAdi, OzellikDegeri, UrunTur, UrunTurId, EntityTypeBuilder, UrunOzellikConfiguration (+2 more)

### Community 47 - "AddUrunCatalogTables"
Cohesion: 0.17
Nodes (8): DateTime, Guid, MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, AddUrunCatalogTables

### Community 48 - ".AssignRole"
Cohesion: 0.18
Nodes (9): HashSet, Guid, HttpGet, HttpPost, IActionResult, Task, AdminController, AssignRoleRequest (+1 more)

### Community 49 - "DeleteSiparisCommand"
Cohesion: 0.24
Nodes (7): ShopApp.Application.Features.Siparis.Commands.DeleteSiparis, Guid, DeleteSiparisCommand, CancellationToken, Task, DeleteSiparisCommandHandler, DeleteSiparisCommandValidator

### Community 50 - "TestDbContext"
Cohesion: 0.18
Nodes (11): DbContext, DbContextOptions, DbSet, TestDbContext, Adresler, Musteriler, Sepetler, SepetUrunleri (+3 more)

### Community 51 - "UrunTur"
Cohesion: 0.18
Nodes (11): Guid, ICollection, UrunTur, Ad, AktifMi, FiyatFarki, Ozellikler, StokAdedi (+3 more)

### Community 52 - "SyncIdentityModels"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, SyncIdentityModels

### Community 53 - "StandardizeSepetUrunuQuantityField"
Cohesion: 0.20
Nodes (6): MigrationBuilder, DateTime, DateTimeOffset, Guid, ModelBuilder, StandardizeSepetUrunuQuantityField

### Community 54 - "ShopApp.Application.Features.Authentication.DTOs"
Cohesion: 0.27
Nodes (4): ShopApp.Application.Features.Authentication.DTOs, src.Monolith.ShopApp.Api.Controllers, ShopApp.Application.Features.Authentication.Services, ShopApp.Application.Features.Authentication

### Community 55 - "Address"
Cohesion: 0.22
Nodes (9): Guid, Address, AdresBilgisi, Ilce, MusteriId, PostaKodu, Sehir, TamAdres (+1 more)

### Community 56 - "UrunGorsel"
Cohesion: 0.22
Nodes (8): Guid, UrunGorsel, GorselSiralamasi, GorselUrl, Urun, UrunId, EntityTypeBuilder, UrunGörselConfiguration

### Community 57 - "src.Monolith.ShopApp.Domain.Sepet.Enums"
Cohesion: 0.22
Nodes (6): src.Monolith.ShopApp.Domain.Sepet.Enums, SepetDurum, Aktif, AktifDegil, IptalEdilmis, Tamamlanmis

### Community 58 - ".SeedAsync"
Cohesion: 0.22
Nodes (7): ShopApp.Infrastructure.Identity.Seed, Guid, IdentityRole, IServiceProvider, RoleManager, Task, IdentityRoleSeeder

### Community 59 - "ApplicationUser"
Cohesion: 0.22
Nodes (8): IdentityUser, Guid, ApplicationUser, Ad, durum, GuncellemeTarihi, OlusturmaTarihi, Soyad

### Community 60 - ".Create_DerivesMusteriId_FromAuthenticatedCustomer"
Cohesion: 0.33
Nodes (6): Guid, CreateSepetCommand, CancellationToken, Guid, Task, CreateSepetCommandHandler

### Community 61 - "SiparisDurum"
Cohesion: 0.22
Nodes (8): SiparisDurum, BekleyenOdeme, Gönderildi, Hazirlaniyor, IadeEdildi, IptalEdildi, Odenmis, TeslimEdildi

### Community 62 - "AuthRequest"
Cohesion: 0.25
Nodes (7): List, AuthRequest, Ad, Email, Role, Soyad, Token

### Community 63 - ".GenerateToken"
Cohesion: 0.33
Nodes (4): IEnumerable, DateTime, JwtToken, IEnumerable

### Community 64 - "RegisterRequest"
Cohesion: 0.33
Nodes (5): RegisterRequest, Ad, Email, Sifre, Soyad

### Community 66 - "AuthenticationValidationException"
Cohesion: 0.40
Nodes (4): Exception, IReadOnlyCollection, AuthenticationValidationException, Errors

### Community 67 - "CurrentCustomerContext"
Cohesion: 0.40
Nodes (4): CancellationToken, IHttpContextAccessor, Task, CurrentCustomerContext

### Community 68 - ".BuildTargetModel"
Cohesion: 0.40
Nodes (4): DateTime, DateTimeOffset, Guid, ModelBuilder

## Knowledge Gaps
- **207 isolated node(s):** `$schema`, `commandName`, `dotnetRunMessages`, `launchBrowser`, `applicationUrl` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 478 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShopApp.Infrastructure.Persistence.Context` connect `ShopApp.Application.Common.Interfaces` to `ShopApp.Infrastructure.Persistence.Migrations`, `.BuildModel`, `ShopAppDbContextFactory`, `AddRoleSpecificProfiles`, `Migration`, `DatabaseChanges`, `MakeApplicationUserUpdatedAtRequired`, `AddMonolithDomainChanges`, `TurkcheIdentityVeMusteriGuncellemesi`, `AddUrunCatalogTables`, `SyncIdentityModels`, `StandardizeSepetUrunuQuantityField`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `ShopApp.Application.Common.Interfaces` connect `ShopApp.Application.Common.Interfaces` to `.AddInfrastructure`, `ShopApp.Application.Features.Sepet.Commands.DeleteSepet`, `UserProfileDto`, `IShopAppDbContext`, `SepetController.cs`, `IRequest`, `src.Monolith.ShopApp.Domain.Sepet.Entities`, `SiparisController.cs`, `src.Monolith.ShopApp.Domain.Siparis.Entities`, `DeleteSiparisCommand`, `SepetController`, `SiparisEntity`, `SiparisController`, `ResultSepetDto`, `ShopApp.Application.Features.Authentication.DTOs`, `.Create_Throws_WhenParentCartBelongsToAnotherCustomer`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `ShopAppDbContext` connect `ShopAppDbContext` to `.AddInfrastructure`, `InfrastructureInitializer`, `CurrentCustomerContext`, `BaseEntity`, `ShopAppDbContextFactory`, `SepetDurumLookup`, `IShopAppDbContext`, `IRequest`, `IdentityService`, `KayitliKullanici`, `ShopApp.Application.Common.Interfaces`, `SiparisEntity`, `SepetUrunu`, `Address`, `SepetEntity`, `Musteri`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `$schema`, `commandName`, `dotnetRunMessages` to the rest of the system?**
  _207 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `.AddInfrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._
- **Should `UserProfileDto` be split into smaller, more focused modules?**
  _Cohesion score 0.08416389811738649 - nodes in this community are weakly interconnected._
- **Should `ShopApp.Application.csproj` be split into smaller, more focused modules?**
  _Cohesion score 0.04440333024976873 - nodes in this community are weakly interconnected._