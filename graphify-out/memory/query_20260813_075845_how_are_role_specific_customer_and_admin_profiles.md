---
type: "query"
date: "2026-08-13T07:58:45.353899+00:00"
question: "How are role-specific customer and admin profiles provisioned?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["KayitliKullanici", "Musteri", "AdminProfile", "IdentityService", "AdminController", "AddRoleSpecificProfiles"]
---

# Q: How are role-specific customer and admin profiles provisioned?

## Answer

Expanded from graph vocabulary: [identity, musteri, admin, profile, role, service, user]. KayitliKullanici owns authentication and can hold multiple Identity roles. Assigning User or Musteri idempotently creates Musteri; assigning Admin idempotently creates AdminProfile. Public registration runs user creation, User-role assignment, and Musteri creation in one database transaction. The Admin-only role endpoint validates managed roles and invokes the same provisioning path. The AddRoleSpecificProfiles migration adds the AdminProfilleri table and backfills Admin role holders.

## Outcome

- Signal: useful

## Source Nodes

- KayitliKullanici
- Musteri
- AdminProfile
- IdentityService
- AdminController
- AddRoleSpecificProfiles