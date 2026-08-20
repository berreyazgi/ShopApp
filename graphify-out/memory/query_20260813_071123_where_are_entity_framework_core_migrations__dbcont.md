---
type: "query"
date: "2026-08-13T07:11:23.292690+00:00"
question: "Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Migrations", "ShopAppDbContext", "ShopApp.Infrastructure.csproj"]
---

# Q: Where are Entity Framework Core migrations, DbContext, startup database configuration, and connection strings located?

## Answer

Expanded from graph vocabulary: [migrations, database, dbcontext, connection, persistence, infrastructure]. The graph identifies the monolith migration project in ShopApp.Infrastructure/Persistence/Migrations, with ShopAppDbContext and the API startup project as its EF Core entry points.

## Outcome

- Signal: useful

## Source Nodes

- Migrations
- ShopAppDbContext
- ShopApp.Infrastructure.csproj