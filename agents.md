# AGENTS.md — ShopApp AI Coding Agent Guide

## 1. Purpose

This file defines the rules AI coding agents must follow when working on the **ShopApp** repository.

Repository:

```text
berreyazgi/ShopApp
```

ShopApp is an e-commerce learning/project system being developed with a **hybrid architecture**:

- Modular/Clean Architecture monolith
- Separate microservice-style APIs
- Vanilla JavaScript SPA frontend
- ASP.NET Core
- Entity Framework Core
- PostgreSQL
- ASP.NET Core Identity
- JWT authentication
- Docker / Docker Compose

Agents must preserve the existing architecture instead of introducing unrelated architectural patterns without a clear reason.

---

# 2. Repository Structure

The important high-level structure is:

```text
ShopApp/
├── ShopApp.sln
├── docker-compose.yml
├── src/
│
├── src/Frontend/
│   └── ShopApp.Web/
│
├── src/Monolith/
│   ├── ShopApp.Domain/
│   ├── ShopApp.Application/
│   ├── ShopApp.Infrastructure/
│   └── ShopApp.Api/
│
└── src/Services/
    ├── Catalog.Api/
    ├── Inventory.Api/
    └── Shipping.Api/
```

Do not move files between these architectural boundaries unless the task specifically requires a refactor.

---

# 3. Architecture Principles

The monolith follows Clean Architecture concepts.

Dependency direction should remain approximately:

```text
Domain
   ↑
Application
   ↑
Infrastructure
   ↑
Api
```

More precisely:

```text
ShopApp.Domain
    should depend on almost nothing

ShopApp.Application
    may depend on Domain

ShopApp.Infrastructure
    may depend on Application and Domain

ShopApp.Api
    may depend on Application and Infrastructure
```

Never create dependencies such as:

```text
Domain → Infrastructure
Domain → Api
Application → Api
Application → Infrastructure implementation classes
```

Infrastructure-specific technology must remain outside the Domain layer.

---

# 4. Domain Layer

Location:

```text
src/Monolith/ShopApp.Domain/
```

Current domain areas include:

```text
Common/
Kullanici/
Sepet/
Siparisler/
```

Domain contains business entities, value-oriented domain concepts, domain rules, enums/lookups when appropriate, and common domain base classes.

Examples include concepts related to:

```text
Musteri
Address
Sepet
SepetUrunleri
Siparis
SiparisUrunleri
```

## Domain Rules

The Domain layer must NOT know about:

```text
Entity Framework Core
DbContext
ASP.NET Core
Controllers
JWT
Identity
HTTP
Swagger
Docker
PostgreSQL
Dependency Injection
```

Avoid adding EF Core attributes to entities when the same configuration can reasonably be expressed in Infrastructure configuration classes.

Business rules belong in the domain when they are genuinely domain behavior.

Do not turn every entity into an anemic DTO only for database convenience.

---

# 5. Application Layer

Location:

```text
src/Monolith/ShopApp.Application/
```

Current important directories include:

```text
Abstractions/
Auth/
```

The Application layer defines what the application can do.

Typical contents:

```text
interfaces
application services
commands
queries
DTOs
request models
response models
use-case contracts
validators
```

Infrastructure-independent abstractions should normally live here.

Examples:

```text
IAuthService
IJwtTokenGenerator
IShopAppDbContext
```

when appropriate to their responsibility.

## Application Rules

Application code must not directly instantiate:

```text
ShopAppDbContext
UserManager<ApplicationUser>
JwtSecurityTokenHandler infrastructure implementation
NpgsqlConnection
```

Application should declare abstractions where infrastructure behavior is required.

Do not put controllers in Application.

Do not put EF migrations in Application.

Do not place Identity persistence types here unless there is a strong architectural reason.

---

# 6. Infrastructure Layer

Location:

```text
src/Monolith/ShopApp.Infrastructure/
```

Current structure includes:

```text
Authentication/
Identity/
Persistence/
Services/
DependencyInjection.cs
```

Infrastructure owns technology-specific implementations.

This includes:

```text
Entity Framework Core
PostgreSQL
ASP.NET Core Identity
JWT token generation
repository/persistence implementations
external service implementations
database configuration
dependency injection registrations
```

---

# 7. Persistence and EF Core

Persistence belongs under:

```text
src/Monolith/ShopApp.Infrastructure/Persistence/
```

`ShopAppDbContext` belongs in Infrastructure.

Entity configurations should normally use:

```csharp
IEntityTypeConfiguration<TEntity>
```

and live under a structure such as:

```text
Persistence/
└── Configurations/
```

Prefer Fluent API configurations instead of filling domain classes with persistence concerns.

When adding a new entity:

1. Create/domain-model it in Domain.
2. Add the appropriate DbSet if necessary.
3. Add an EF Core configuration class.
4. Register/apply configurations.
5. Generate a migration.
6. Inspect the generated migration before assuming it is correct.

Do not manually edit migration files unless there is a justified migration-specific reason.

---

# 8. ASP.NET Core Identity

Identity implementation belongs in:

```text
src/Monolith/ShopApp.Infrastructure/Identity/
```

`ApplicationUser` is an infrastructure Identity representation.

Do not move ASP.NET Core Identity types into Domain simply because they represent users.

Keep the distinction between:

```text
Identity account
```

and

```text
business/customer domain model
```

clear.

For example, authentication credentials and Identity fields belong to Identity, while customer business information may belong to the `Kullanici` domain.

Do not store plaintext passwords anywhere.

Never add passwords to JWT claims.

Never return password hashes through API responses.

---

# 9. Identity Table Customization

When changing ASP.NET Core Identity table names, column names, schemas, relationships, or indexes:

Use EF Core configuration through:

```text
ShopAppDbContext
OnModelCreating
```

or dedicated configuration helpers where appropriate.

Always call:

```csharp
base.OnModelCreating(builder);
```

before customizing Identity metadata unless there is a specific documented reason otherwise.

Preferred approach:

```text
Identity model configuration
        ↓
EF Core migration
        ↓
database schema update
```

Do NOT directly alter the PostgreSQL Identity tables and then leave the EF model unchanged.

If an Identity schema modification is requested, inspect:

```text
ApplicationUser
ShopAppDbContext
Identity configuration
existing migrations
```

before generating code.

---

# 10. Authentication and JWT

JWT-related implementation currently belongs under:

```text
src/Monolith/ShopApp.Infrastructure/Authentication/
```

JWT configuration is registered through Infrastructure dependency injection.

Maintain separation between:

```text
JwtSettings
IJwtTokenGenerator
JwtTokenGenerator
authentication configuration
AuthService
```

JWT payloads may contain claims such as:

```text
user id
email
role
given name
surname
```

when required.

JWT payloads must NEVER contain:

```text
password
password hash
connection string
JWT secret key
refresh-token secret
private credentials
sensitive database values
```

Remember:

JWT payloads are encoded, not encrypted.

Do not treat a JWT as a secure place for secrets.

---

# 11. JWT Validation

JWT validation should include, where appropriate:

```text
issuer validation
audience validation
lifetime validation
signing-key validation
```

Authentication registration belongs in Infrastructure.

The middleware pipeline belongs in the API project.

The typical ordering should remain:

```csharp
app.UseCors(...);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
```

Authentication must come before Authorization.

---

# 12. Dependency Injection

Infrastructure registrations belong primarily in:

```text
ShopApp.Infrastructure/DependencyInjection.cs
```

API composition happens from:

```text
ShopApp.Api/Program.cs
```

Prefer extension methods such as:

```csharp
builder.Services.AddInfrastructure(builder.Configuration);
```

rather than putting every EF Core, Identity, and JWT registration directly into `Program.cs`.

Before registering a service, search for an existing registration.

Do not create duplicate registrations such as:

```csharp
services.AddScoped<IAuthService, AuthService>();
```

in multiple locations without an intentional reason.

There is currently overlapping `IAuthService` registration behavior in the repository. When touching authentication DI, consolidate it instead of copying the duplication.

---

# 13. API Layer

Location:

```text
src/Monolith/ShopApp.Api/
```

The API project is the composition root and HTTP boundary.

It owns:

```text
Program.cs
Controllers
middleware configuration
Swagger/OpenAPI
CORS
host configuration
API routing
HTTP request/response mapping
```

Controllers should remain thin.

Bad:

```text
Controller
 ├── database querying
 ├── password verification
 ├── token creation
 ├── domain mutation
 └── response generation
```

Preferred:

```text
Controller
   ↓
Application abstraction / use case
   ↓
Infrastructure implementation where required
```

Controllers should orchestrate HTTP behavior, not contain substantial business logic.

---

# 14. HTTP Status Codes

Use HTTP semantics correctly.

Common authentication cases:

```text
400 Bad Request
    invalid request/model

401 Unauthorized
    user is not authenticated
    invalid/missing/expired JWT

403 Forbidden
    user is authenticated but does not have permission

404 Not Found
    requested resource does not exist

409 Conflict
    operation conflicts with current state
    e.g. duplicate resource where appropriate
```

Do not interchange 401 and 403.

---

# 15. Frontend Architecture

Frontend location:

```text
src/Frontend/ShopApp.Web/
```

It is a framework-free SPA.

Current structure includes:

```text
src/
├── app/
├── assets/
├── features/
├── shared/
└── styles/
```

Preserve this feature-oriented structure.

Do not introduce:

```text
React
Vue
Angular
Next.js
Nuxt
Svelte
```

unless explicitly requested.

Use:

```text
HTML
CSS
Vanilla JavaScript
ES modules
```

---

# 16. Frontend Responsibilities

Prefer separation approximately like:

```text
app/
    application bootstrapping and routing

features/
    feature-specific UI and logic

shared/
    reusable utilities, API client, storage, reusable components

styles/
    global/shared styling

assets/
    static resources
```

Do not create one giant JavaScript file containing the entire application.

Feature-specific code should stay within the relevant feature.

Reusable infrastructure belongs under `shared`.

---

# 17. SPA Routing

The frontend is intended to behave as a SPA.

Avoid full-page reload navigation when internal SPA navigation is appropriate.

Route handling should remain centralized.

When adding pages such as:

```text
login
register
home
category
product
basket
orders
profile
```

prefer feature modules rather than duplicating navigation logic.

---

# 18. Frontend Authentication

The frontend communicates with the backend API using JWT Bearer authentication.

Protected API requests should normally use:

```http
Authorization: Bearer <access_token>
```

Never place passwords inside the token.

Never expose backend JWT secret keys to frontend JavaScript.

Never hard-code server secrets into frontend files.

Be careful before using:

```text
localStorage
sessionStorage
```

for authentication tokens.

Do not silently change the project's token-storage strategy as part of an unrelated task.

If authentication persistence must be redesigned, explain the security trade-offs before implementing the change.

---

# 19. Microservices / Separate Services

Separate APIs currently exist under:

```text
src/Services/
├── Catalog.Api/
├── Inventory.Api/
└── Shipping.Api/
```

Treat these as independent service boundaries.

Do not make them directly depend on internal classes from:

```text
ShopApp.Infrastructure
ShopApp.Domain
ShopApp.Api
```

just for convenience.

Microservices should eventually be independently:

```text
buildable
deployable
configurable
replaceable
```

Cross-service communication should happen through explicit contracts/API/event mechanisms rather than direct database-table coupling.

Do not convert additional monolith modules into microservices unless explicitly requested.

---

# 20. Modular Monolith vs Microservices

Do not assume everything should become a microservice.

When implementing functionality, first determine whether it belongs to:

```text
Monolith
```

or

```text
Services
```

based on the current repository architecture.

Avoid creating distributed-system complexity without a concrete reason.

Examples of concerns that may remain within the monolith:

```text
Identity
Basket
Orders
Customer
```

Existing independently separated concerns include:

```text
Catalog
Inventory
Shipping
```

Follow the repository's current direction instead of redesigning it during unrelated tasks.

---

# 21. Database

The repository currently uses PostgreSQL with EF Core/Npgsql.

Use PostgreSQL-compatible behavior.

Do not generate SQL Server-specific code such as:

```text
UseSqlServer
IDENTITY syntax
GETDATE()
NEWID()
nvarchar(max)
```

unless specifically requested for a different environment.

Preferred EF provider:

```text
Npgsql.EntityFrameworkCore.PostgreSQL
```

---

# 22. Docker

Root orchestration file:

```text
docker-compose.yml
```

The monolith API Dockerfile currently lives at:

```text
src/Monolith/ShopApp.Api/Dockerfile
```

Docker Compose currently provides:

```text
webapi
db
```

with PostgreSQL as the database.

When changing Docker networking, remember:

Inside Docker Compose:

```text
localhost
```

means the current container.

Services communicate through Compose service names, for example:

```text
Host=db
```

Do not replace container-to-container database hosts with `localhost`.

---

# 23. Port Configuration

Check all relevant places before changing ports:

```text
Program.cs
launchSettings.json
Dockerfile
docker-compose.yml
frontend API configuration
CORS configuration
```

Do not fix a port conflict by randomly assigning different ports in multiple files.

The repository currently has host configuration differences between local API hosting and Docker configuration.

When modifying ports, make the environment-specific behavior explicit and consistent.

Avoid hard-coding:

```csharp
builder.WebHost.UseUrls(...)
```

unless there is a specific requirement.

Prefer configuration/environment variables where possible.

---

# 24. Configuration and Secrets

Configuration may come from:

```text
appsettings.json
appsettings.Development.json
environment variables
Docker Compose
user secrets
deployment secrets
```

Never commit real production secrets.

Do not expose:

```text
JWT secret keys
database production passwords
API keys
private certificates
```

to source control.

When adding new configuration, support environment-variable override.

ASP.NET configuration naming should support forms such as:

```text
ConnectionStrings__DefaultConnection
JwtSettings__SecretKey
```

---

# 25. EF Core Migrations

Before creating a migration:

1. Understand the domain model change.
2. Inspect entity configurations.
3. Inspect `ShopAppDbContext`.
4. Check existing migrations.
5. Build the project.
6. Generate the migration.
7. Inspect the migration.

Typical command shape:

```bash
dotnet ef migrations add <MigrationName> \
  --project src/Monolith/ShopApp.Infrastructure \
  --startup-project src/Monolith/ShopApp.Api
```

Use repository paths rather than assuming the current shell directory.

Do not remove existing migrations simply because a new migration fails.

Do not recreate the entire database unless explicitly requested or clearly safe in a development-only scenario.

---

# 26. Build Commands

From repository root, prefer:

```bash
dotnet restore ShopApp.sln
dotnet build ShopApp.sln
```

For the monolith API:

```bash
dotnet run --project src/Monolith/ShopApp.Api/ShopApp.Api.csproj
```

For Docker:

```bash
docker compose up --build
```

To stop:

```bash
docker compose down
```

Removing volumes:

```bash
docker compose down -v
```

is destructive to local database data.

Never run destructive database or Docker-volume commands automatically unless the user explicitly asks for that behavior.

---

# 27. Before Making Changes

Before modifying code, an agent should inspect relevant neighboring files.

For authentication work, inspect at least:

```text
Application/Auth/
Application/Abstractions/
Infrastructure/Authentication/
Infrastructure/Identity/
Infrastructure/Services/
Infrastructure/DependencyInjection.cs
Api/Program.cs
Api/Controllers/
```

For EF/database changes, inspect:

```text
Domain entity
Persistence/Configurations
ShopAppDbContext
existing migrations
```

For frontend changes, inspect:

```text
app/
features/
shared/
styles/
```

Do not generate a replacement architecture based only on a single file.

---

# 28. Minimal Change Principle

Prefer the smallest coherent change that solves the task.

Do not:

```text
rename unrelated files
reformat the whole repository
replace existing architecture
upgrade packages unrelated to the task
introduce new frameworks unnecessarily
move folders without need
rewrite working code for stylistic reasons
```

Keep changes focused.

---

# 29. Existing Code Is Context, Not Absolute Truth

Do not blindly reproduce existing code if it contains an obvious issue.

For example, when the repository contains:

```text
duplicate dependency registrations
inconsistent ports
stale comments
unused imports
incorrect namespace naming
security-sensitive configuration
```

identify the problem and make the smallest appropriate correction when it is part of the requested area.

Do not propagate mistakes just because they already exist.

---

# 30. Naming and Language

The repository currently contains a mixture of English infrastructure names and Turkish domain terminology.

Examples:

```text
Kullanici
Sepet
Siparisler
Musteri
```

Do not randomly translate existing domain entities to English during unrelated work.

Maintain naming consistency within the bounded area being modified.

Examples:

Bad:

```text
Sepet
CartItem
SiparisUrunleri
CustomerAddressInfoEntity
```

mixed arbitrarily within the same domain feature.

Prefer the naming convention already established by that domain/module.

---

# 31. C# Coding Guidelines

Use modern C#/.NET conventions.

Prefer:

```csharp
async/await
dependency injection
nullable reference awareness
cancellation tokens where meaningful
small focused methods
constructor injection
strongly typed configuration
```

Avoid:

```text
service locator pattern
static DbContext
new DbContext inside services
async void
blocking .Result/.Wait()
catch(Exception) with ignored exception
hard-coded connection strings
hard-coded JWT secrets
```

---

# 32. Error Handling

Do not leak infrastructure exception details directly to API consumers.

Bad:

```json
{
  "error": "Npgsql.PostgresException: relation ... stack trace..."
}
```

Return appropriate application/API errors and log technical details server-side.

Avoid swallowing exceptions.

---

# 33. Security Rules

Security takes priority over convenience.

Never:

```text
store plaintext passwords
include passwords in JWT
return PasswordHash
disable JWT validation to make tests pass
commit secrets
trust role/user IDs from client without validation
construct authorization solely from frontend state
disable CORS security globally without justification
```

The backend is the authority for authorization.

Frontend visibility is not authorization.

---

# 34. Password Handling

Registration:

```text
Frontend password
      ↓ HTTPS
RegisterRequest
      ↓
AuthService
      ↓
UserManager.CreateAsync(user, password)
      ↓
ASP.NET Core Identity hashes password
```

Login:

```text
email + password
      ↓
AuthService
      ↓
UserManager / password validation
      ↓
JWT generated after successful authentication
```

Never manually hash passwords if ASP.NET Core Identity is responsible for them.

Never persist request passwords as entity properties.

---

# 35. JWT Claims

Only include claims required by downstream authorization/application behavior.

Typical safe examples:

```text
sub / user id
email
name
role
```

Avoid adding information merely because it is available.

A JWT should not become a serialized `ApplicationUser`.

---

# 36. Testing Expectations

When changing backend code:

At minimum run:

```bash
dotnet build ShopApp.sln
```

When relevant, also test:

```text
registration
login
JWT validation
401 behavior
403 behavior
protected endpoints
database migrations
```

For frontend modifications, verify:

```text
SPA navigation
browser console errors
API request paths
authentication headers
responsive layout
```

For Docker changes:

```bash
docker compose config
```

should be considered before starting containers.

---

# 37. Do Not Fake Successful Validation

If commands cannot be run, say:

```text
Not verified locally
```

Do not claim:

```text
Build passes
Tests pass
Migration works
Docker works
```

unless those checks were actually executed.

---

# 38. API Contracts

Avoid returning EF Core entities directly from controllers.

Prefer request/response models.

Example:

```text
HTTP Request
     ↓
RegisterRequest
     ↓
Application service
     ↓
Domain / Identity
     ↓
AuthResponse
     ↓
HTTP Response
```

This prevents database schema details from becoming accidental public API contracts.

---

# 39. Controller Design

Controllers should normally handle:

```text
HTTP input
model binding
calling application abstraction
HTTP response
authorization attributes
```

Controllers should not normally contain:

```text
EF queries
Identity configuration
JWT signing code
database migrations
business rule implementation
```

---

# 40. New Feature Workflow

When asked to implement a new backend feature, reason through:

```text
1. Domain
2. Application contract/use case
3. Infrastructure implementation
4. API endpoint
5. Persistence changes
6. Migration
7. Tests
```

Not every feature requires changes to every layer.

Do not create empty classes merely to make every layer participate.

---

# 41. Authentication Feature Workflow

For authentication-related requests, use approximately:

```text
API Controller
     ↓
IAuthService
     ↓
AuthService
     ↓
UserManager<ApplicationUser>
     ↓
IJwtTokenGenerator
     ↓
JwtTokenGenerator
```

Configuration:

```text
appsettings/environment
     ↓
JwtSettings
     ↓
DependencyInjection
     ↓
JWT authentication/token generator
```

Preserve this separation.

---

# 42. Database Relationship Changes

When modifying relationships:

1. Understand cardinality.
2. Identify aggregate ownership.
3. Check FK placement.
4. Configure delete behavior explicitly when important.
5. Avoid unexpected cascade deletes.
6. Generate migration.
7. Inspect resulting constraints.

Be especially careful with:

```text
User → Address
Customer → Basket
Basket → BasketItems
Order → OrderItems
Identity User → domain Customer
```

Do not infer cascade behavior without considering business consequences.

---

# 43. Identity vs Customer

Do not automatically merge:

```text
ApplicationUser
```

and

```text
Musteri
```

They have different responsibilities.

Think of them approximately as:

```text
ApplicationUser
    authentication / security identity

Musteri
    commerce/business customer
```

If linking them, prefer a clear identifier relationship rather than duplicating credentials.

---

# 44. Microservice Data Ownership

Each independent service should eventually own its own data.

Do not design:

```text
Catalog.Api
Inventory.Api
Shipping.Api
```

to directly modify monolith database tables.

If temporary shared infrastructure exists during development, do not expand that coupling unnecessarily.

---

# 45. Future Architecture

The repository is being developed so parts can evolve from a modular monolith toward independent services.

Therefore prefer:

```text
explicit module boundaries
interfaces
DTO contracts
low coupling
feature ownership
service isolation
configuration-driven endpoints
```

Avoid premature infrastructure such as:

```text
service mesh
distributed sagas
Kafka
event sourcing
multiple gateways
complex orchestration
```

unless the task explicitly requires them.

Architecture should grow with actual requirements.

---

# 46. Frontend ↔ Backend Boundary

Frontend must access backend behavior through HTTP APIs.

Do not make frontend code aware of:

```text
EF entities
DbContext
database schemas
Identity tables
PostgreSQL details
```

Frontend should know API contracts only.

---

# 47. CORS

CORS configuration belongs in the API.

Do not use:

```csharp
AllowAnyOrigin()
.AllowCredentials()
```

together.

Explicit development origins are preferred.

When adding a frontend development server port, update CORS deliberately rather than enabling every origin globally.

---

# 48. Swagger

Swagger/OpenAPI belongs in the API layer.

Maintain JWT Bearer support for protected endpoint testing.

Do not expose secrets in Swagger examples.

Swagger behavior may remain development-only.

---

# 49. Comments and Documentation

Comments should explain **why**, not narrate obvious syntax.

Good:

```csharp
// Restrict deletion because order history must remain valid.
```

Poor:

```csharp
// Set RequiredLength to 8.
options.Password.RequiredLength = 8;
```

Remove stale comments when behavior changes.

For example, if a port changes, update comments mentioning the old URL.

---

# 50. When the User Asks "How?"

This repository is also used for learning.

When the requested task is educational, do not only dump code.

Explain:

```text
what layer owns the change
why it belongs there
how data flows
what the framework is doing
what changes in the database/API
```

Prefer showing the architectural path before the final implementation.

---

# 51. When the User Asks an Agent to Implement Something

Before implementation, briefly identify:

```text
files to inspect
files likely to change
architectural layer affected
database impact
security impact
```

Then make the change.

Do not ask unnecessary clarification when the answer can be determined from the repository.

---

# 52. Git Discipline

Keep commits conceptually focused.

Good examples:

```text
feat(auth): add login endpoint
feat(identity): customize identity table mappings
fix(auth): remove duplicate service registration
fix(api): align local port configuration
refactor(persistence): move basket mapping to configuration
```

Avoid combining unrelated frontend, database, auth, and Docker changes into one commit unless they are part of the same feature.

---

# 53. Files That Require Extra Care

Changes to these files can have broad effects:

```text
ShopApp.sln
docker-compose.yml
ShopApp.Api/Program.cs
ShopApp.Infrastructure/DependencyInjection.cs
ShopAppDbContext.cs
ApplicationUser.cs
appsettings.json
*.csproj
EF Core migrations
frontend storage/authentication utilities
```

Inspect their consumers before modifying them.

---

# 54. Agent Pre-Change Checklist

Before changing code, answer internally:

```text
Which layer owns this responsibility?

Does an implementation already exist?

Am I creating duplicate functionality?

Will this affect database schema?

Will this affect authentication/authorization?

Will this expose sensitive information?

Does this introduce coupling between monolith and services?

Does this break the SPA/API contract?

Does this require a migration?

Does configuration need an environment-variable equivalent?
```

---

# 55. Agent Post-Change Checklist

After changes:

```text
[ ] Build affected .NET projects
[ ] Check namespaces/usings
[ ] Check DI registrations
[ ] Check configuration keys
[ ] Check authentication middleware ordering
[ ] Check database migration impact
[ ] Check API contract changes
[ ] Check frontend API usage if contract changed
[ ] Check Docker configuration if ports/network changed
[ ] Ensure no secrets were introduced
[ ] Summarize exactly what changed
```

---

# 56. Main Rule

When several implementations are possible, prefer the solution that:

```text
fits the existing architecture
has the fewest unnecessary dependencies
preserves module boundaries
is understandable to a developer learning the system
is secure
is easy to test
can evolve toward the intended hybrid architecture
```

Do not optimize for cleverness.

Optimize for clarity, correctness, architecture boundaries, and maintainability.

---

# 57. Final Response Expected From Agents

After completing a coding task, report:

```text
Changed:
- files modified
- behavior added/fixed

Architecture:
- why the code belongs in those layers

Database:
- whether a migration is required

Security:
- authentication/authorization implications if any

Verification:
- commands actually run
- build/test result
- anything not verified

Potential follow-up:
- only genuinely relevant next steps
```

Do not claim successful verification for commands that were not actually executed.