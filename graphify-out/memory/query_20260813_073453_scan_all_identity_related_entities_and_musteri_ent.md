---
type: "query"
date: "2026-08-13T07:34:53.420754+00:00"
question: "Scan all identity related entities and Musteri entities"
contributor: "graphify"
outcome: "useful"
source_nodes: ["KayitliKullanici", "Musteri", "Address", "IdentityService", "ShopAppDbContext", "AddMonolithDomainChanges"]
---

# Q: Scan all identity related entities and Musteri entities

## Answer

Expanded from graph vocabulary: [identity, kayitli, kullanici, musteri, role, user, address, configuration, dbcontext, migration]. The scan found a custom Identity user, generic role/claim/login/token/join mappings, and a separate customer profile and address model. Registration currently creates only the Identity user and role assignment; it does not create the required one-to-one Musteri profile. The generated migration changes schema and types while dropping legacy customer and address data, so it needs an explicit data-preservation/backfill plan before deployment.

## Outcome

- Signal: useful

## Source Nodes

- KayitliKullanici
- Musteri
- Address
- IdentityService
- ShopAppDbContext
- AddMonolithDomainChanges