# ShopApp Microservice Database & Entity Implementation Guide

## Purpose

This document is intended for an AI coding agent working on the **ShopApp** repository.

The existing system uses **Clean Architecture** for the modular monolith. Monolith domain entities already live in `src/Monolith/ShopApp.Domain`.

The next task is to introduce domain entities and PostgreSQL persistence for the microservices under `src/Services`, especially:

- `KategoriServis` / Catalog service
- `StokServis` / Inventory service
- `KargoServis` / Shipping service

The architecture diagram models these as separate services with their own data stores. Preserve that ownership boundary.

---

# Important Architecture Decision

## Do NOT create one shared EF Core persistence project such as

```text
src/Services/PostgreSQL/
    Entities/
    DbContexts/
    Configurations/
    Migrations/
```

and then make every microservice depend on it.

That would technically work, but it would make the services share their persistence model and would couple independently deployable services together.

A microservice should own:

1. its domain model,
2. its database schema/database,
3. its EF Core `DbContext`,
4. its entity configurations,
5. its migrations.

The services may use the **same PostgreSQL server/container in development**, but they should not share the same EF Core model or directly read/write another service's tables.

---

# Recommended Repository Structure

Use service-owned Clean Architecture boundaries.

```text
src/
├── Monolith/
│   ├── ShopApp.Domain/
│   ├── ShopApp.Application/
│   ├── ShopApp.Infrastructure/
│   └── ShopApp.Api/
│
└── Services/
    ├── KategoriServis/
    │   ├── KategoriServis.Domain/
    │   │   └── Entities/
    │   ├── KategoriServis.Application/
    │   ├── KategoriServis.Infrastructure/
    │   │   └── Persistence/
    │   │       ├── Configurations/
    │   │       ├── Migrations/
    │   │       └── KategoriDbContext.cs
    │   └── KategoriServis.Api/
    │
    ├── StokServis/
    │   ├── StokServis.Domain/
    │   │   └── Entities/
    │   ├── StokServis.Application/
    │   ├── StokServis.Infrastructure/
    │   │   └── Persistence/
    │   │       ├── Configurations/
    │   │       ├── Migrations/
    │   │       └── StokDbContext.cs
    │   └── StokServis.Api/
    │
    └── KargoServis/
        ├── KargoServis.Domain/
        │   └── Entities/
        ├── KargoServis.Application/
        ├── KargoServis.Infrastructure/
        │   └── Persistence/
        │       ├── Configurations/
        │       ├── Migrations/
        │       └── KargoDbContext.cs
        └── KargoServis.Api/
```

If creating four projects per service is too heavy for the current learning stage, keep one project per service temporarily, but still keep ownership inside that service:

```text
src/Services/
├── KategoriServis/
│   ├── Domain/Entities/
│   ├── Application/
│   ├── Infrastructure/Persistence/
│   └── Program.cs
├── StokServis/
│   ├── Domain/Entities/
│   ├── Application/
│   ├── Infrastructure/Persistence/
│   └── Program.cs
└── KargoServis/
    ├── Domain/Entities/
    ├── Application/
    ├── Infrastructure/Persistence/
    └── Program.cs
```

Prefer this second structure over a shared `src/Services/PostgreSQL` persistence project if we do not want to split every service into multiple class libraries yet.

---

# What `src/Services/PostgreSQL` May Contain

A common PostgreSQL folder is acceptable **only for deployment/development infrastructure**, not service domain entities or shared DbContexts.

For example:

```text
src/Services/PostgreSQL/
├── init/
│   ├── 01-create-databases.sql
│   └── 02-create-users.sql
├── README.md
└── docker/
```

An even cleaner location would be outside `src`, because these are infrastructure/deployment files rather than application source code:

```text
infrastructure/
└── postgres/
    ├── init/
    │   └── 01-create-databases.sql
    └── README.md
```

or

```text
deploy/
└── postgres/
```

Use this shared folder only to provision PostgreSQL. Do **not** put EF Core entities, configurations, repositories, DbContexts, or migrations from multiple services there.

---

# Development Database Layout

For local development, one PostgreSQL instance/container is enough.

Inside it, provision separate logical databases:

```text
shopapp_catalog
shopapp_inventory
shopapp_shipping
```

Each service receives only its own connection string.

Example configuration concept:

```text
KategoriServis -> shopapp_catalog
StokServis     -> shopapp_inventory
KargoServis    -> shopapp_shipping
```

Do not create database-level foreign keys between these databases.

A service may store an external identifier such as `ProductId` or `OrderId`, but it must treat that value as a reference to another bounded context rather than an EF Core navigation property to an entity owned by another service.

Example:

```text
InventoryItem
- Id
- ProductId       // external reference to Catalog
- QuantityOnHand
- ReservedQuantity

Shipment
- Id
- OrderId         // external reference to Monolith/Order
- CarrierId
- TrackingNumber
- Status
```

There should be no relationship such as:

```csharp
InventoryItem.Product -> KategoriServis.Domain.Product
```

and no cross-service `Include()` or shared DbContext.

---

# Initial Domain Model

The agent should inspect the existing repository and the architecture diagram before finalizing entity names. Do not copy monolith entities into services without determining ownership.

## 1. Kategori / Catalog Service

The diagram assigns product/category management to the catalog side. Start with a compact catalog model such as:

```text
Category
- Id : Guid
- Name
- Slug
- Description?
- ParentCategoryId?
- IsActive
- CreatedAt
- UpdatedAt?

Product
- Id : Guid
- Name
- Description?
- SKU
- Price
- IsActive
- CreatedAt
- UpdatedAt?

ProductCategory
- ProductId
- CategoryId
```

If the current ShopApp design already has product variants/attributes, retain those concepts only when they are actually required by the existing ER model. Do not invent a large catalog model unnecessarily.

Potential future entities:

```text
ProductVariant
ProductAttribute
AttributeDefinition
AttributeValue
```

Keep **stock quantity out of Catalog**. Catalog describes what a product is; Inventory owns how much is available.

---

## 2. Stok / Inventory Service

Suggested initial entities:

```text
InventoryItem
- Id : Guid
- ProductId : Guid
- SKU
- QuantityOnHand
- ReservedQuantity
- ReorderLevel?
- UpdatedAt

StockMovement
- Id : Guid
- InventoryItemId
- Type
- Quantity
- ReferenceId?
- CreatedAt

StockReservation
- Id : Guid
- ProductId
- OrderId
- Quantity
- Status
- ExpiresAt?
- CreatedAt
```

Use a constrained enum/value representation for movement types, for example:

```text
Inbound
Outbound
Reservation
Release
Adjustment
```

Inventory owns stock state. Catalog must not update inventory tables directly.

---

## 3. Kargo / Shipping Service

The architecture describes shipping tracking, carriers, shipping status, and delivery responsibilities.

Suggested initial entities:

```text
Shipment
- Id : Guid
- OrderId : Guid
- CarrierId : Guid?
- TrackingNumber?
- Status
- ShippingAddressSnapshot
- CreatedAt
- ShippedAt?
- DeliveredAt?

Carrier
- Id : Guid
- Name
- TrackingUrlTemplate?
- IsActive

ShipmentStatusHistory
- Id : Guid
- ShipmentId
- Status
- Description?
- OccurredAt
```

Potential shipment statuses:

```text
Pending
Preparing
Shipped
InTransit
OutForDelivery
Delivered
FailedDelivery
Returned
Cancelled
```

Do not create an EF foreign key from `Shipment.OrderId` to the monolith `Order` table. `OrderId` is a distributed-system reference only.

---

# EF Core Persistence Rules

For each service:

1. Create its own `DbContext` in that service's Infrastructure/Persistence area.
2. Add only entities owned by that service as `DbSet<T>`.
3. Use `IEntityTypeConfiguration<T>` classes for table/column/index/relationship configuration.
4. Keep migrations inside that service's Infrastructure project/folder.
5. Register the service's DbContext from that service's composition root/API.
6. Use PostgreSQL through the Npgsql EF Core provider already compatible with the repository's target .NET/EF Core version.
7. Do not reference `ShopApp.Infrastructure.ShopAppDbContext` from a microservice.
8. Do not reuse the monolith's migrations.
9. Do not create a shared generic repository solely to share database code between services.
10. Reuse small technical primitives only when they truly contain no domain/persistence ownership.

Example ownership:

```text
KategoriDbContext
  -> Category
  -> Product
  -> ProductCategory

StokDbContext
  -> InventoryItem
  -> StockMovement
  -> StockReservation

KargoDbContext
  -> Shipment
  -> Carrier
  -> ShipmentStatusHistory
```

---

# Project References

For the full Clean Architecture version, keep dependencies pointing inward.

```text
KategoriServis.Domain
    -> no service project dependency

KategoriServis.Application
    -> KategoriServis.Domain

KategoriServis.Infrastructure
    -> KategoriServis.Application
    -> KategoriServis.Domain

KategoriServis.Api
    -> KategoriServis.Application
    -> KategoriServis.Infrastructure
```

Apply the same pattern to Stok and Kargo.

Do not add references such as:

```text
StokServis.Infrastructure -> KategoriServis.Infrastructure
KargoServis.Infrastructure -> ShopApp.Infrastructure
```

Service-to-service integration should eventually use HTTP/gRPC/messages/events/contracts rather than direct project/database access.

---

# Migrations

Each service must generate and apply its own migrations.

Conceptually:

```text
KategoriServis.Infrastructure/Persistence/Migrations
StokServis.Infrastructure/Persistence/Migrations
KargoServis.Infrastructure/Persistence/Migrations
```

Do not generate all microservice migrations into:

```text
src/Services/PostgreSQL/Migrations
```

The migration lifecycle belongs to the service that owns the schema.

---

# PostgreSQL Initialization

If a shared PostgreSQL development container is used, create only the databases/users in the common SQL initialization script.

Example responsibility of `infrastructure/postgres/init/01-create-databases.sql`:

```sql
CREATE DATABASE shopapp_catalog;
CREATE DATABASE shopapp_inventory;
CREATE DATABASE shopapp_shipping;
```

Do not manually create application tables there when EF Core migrations are the schema-management mechanism.

The SQL initialization folder provisions the databases; EF Core migrations define the service schemas.

---

# Connection Strings

Each service should use its own configuration key/environment variable.

For example:

```text
KategoriServis:
ConnectionStrings__CatalogDatabase

StokServis:
ConnectionStrings__InventoryDatabase

KargoServis:
ConnectionStrings__ShippingDatabase
```

Never let all services receive a privileged connection string that grants uncontrolled access to every database when separate credentials can reasonably be used.

For local development, a single PostgreSQL user may be tolerated initially, but preserve separate connection strings so credentials can be separated later without changing application architecture.

---

# Cross-Service Data Rules

The agent must preserve these boundaries:

- Catalog owns product/category descriptive data.
- Inventory owns stock quantities, reservations, and stock movements.
- Shipping owns shipments, tracking, carriers, and delivery status.
- Order ownership remains outside these services unless the repository explicitly changes that boundary.
- A database owned by one service must not be queried directly by another service.
- Cross-service IDs are identifiers, not EF navigation relationships.
- Never add cross-database foreign keys between service-owned data stores.
- Do not duplicate entire foreign entities merely to establish ORM relationships.
- If local data is needed from another service, use an integration contract/event/read model rather than sharing its entity class.

---

# Naming Guidance

Use one language consistently in code. The current repository contains Turkish domain names in the monolith, while service names also include Turkish terminology.

Before renaming anything, inspect the existing conventions and preserve them unless there is a clear repository-wide naming decision.

Do not perform unrelated renaming as part of this task.

Possible English mapping if the project decides to standardize later:

```text
KategoriServis -> CatalogService
StokServis     -> InventoryService
KargoServis    -> ShippingService
```

This is optional and must not be done automatically.

---

# Agent Execution Plan

## Phase 1 — Inspect

Before modifying code:

1. Inspect the entire `src/Services` tree.
2. Inspect the `.sln` file and all relevant `.csproj` files.
3. Detect the target .NET version and existing EF Core/Npgsql versions.
4. Inspect current naming conventions and namespaces.
5. Inspect `docker-compose.yml` / compose files and PostgreSQL configuration.
6. Inspect the monolith only as a style/reference source; do not couple services to its Infrastructure layer.
7. Report any conflicts between the repository and this specification before making destructive changes.

## Phase 2 — Structure

Choose the least disruptive structure:

- If each service already contains multiple Clean Architecture projects, extend those projects.
- If each service is currently a single API project, create `Domain`, `Application`, and `Infrastructure/Persistence` folders inside each service first unless the repository clearly expects separate class libraries.
- Do not create needless projects simply to imitate the monolith.

## Phase 3 — Implement Domain Entities

Create only the minimum entities required for Catalog, Inventory, and Shipping ownership.

Entities must not contain EF Core-specific mapping attributes unless that is already the repository's convention. Prefer Fluent API configurations in Infrastructure.

## Phase 4 — Persistence

For every service:

- create its DbContext,
- create entity configurations,
- register Npgsql,
- add migrations,
- configure connection strings,
- verify migrations build successfully.

## Phase 5 — PostgreSQL Provisioning

If a common PostgreSQL development folder is desired, create:

```text
infrastructure/postgres/
```

or keep the already-created `src/Services/PostgreSQL` only as a temporary infrastructure directory.

It may contain database initialization/deployment scripts but no service-owned EF Core entities or DbContexts.

## Phase 6 — Validation

Run:

```bash
dotnet restore
dotnet build
```

Then validate each service migration independently.

Do not apply destructive migrations or delete an existing database without explicit approval.

---

# Acceptance Criteria

The task is complete when:

- Catalog/Kategori has its own domain entities and `KategoriDbContext` (or repository-consistent equivalent).
- Inventory/Stok has its own domain entities and `StokDbContext`.
- Shipping/Kargo has its own domain entities and `KargoDbContext`.
- Each service owns its configurations and migrations.
- Each service has an independent connection string.
- Local development can use one PostgreSQL instance while maintaining three logical service databases.
- No microservice references the monolith `ShopAppDbContext`.
- No service directly references another service's Infrastructure/DbContext/entities for persistence.
- There are no cross-service EF relationships or database foreign keys.
- The shared PostgreSQL folder, if retained, contains only provisioning/deployment assets.
- `dotnet build` succeeds.

---

# Non-Goals

Do not implement the following unless already required by the repository or separately requested:

- API Gateway changes
- message broker
- Kafka/RabbitMQ
- distributed transactions
- outbox pattern
- service mesh
- Kubernetes
- payment service
- notification service
- frontend integration
- unrelated monolith refactoring

Design the persistence boundary so these can be added later without sharing databases.

---

# Final Instruction to the Coding Agent

Implement this incrementally. Do not generate a giant shared database layer for all services.

The key rule is:

> **One service owns its domain model and persistence model. A shared PostgreSQL server is acceptable; a shared service database model is not.**

Before writing code, inspect the repository and adapt filenames/namespaces to what already exists. After implementation, provide a short summary containing:

1. files/projects created or changed,
2. entities created for each service,
3. DbContext names and locations,
4. database/connection-string names,
5. migrations created,
6. build/migration validation results,
7. any architectural decision that still requires developer approval.
