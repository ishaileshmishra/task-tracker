## Migrated Descendant API to CMA-entries-microservice (July 2025)

**Tags:** Monitoring, ACL, API

- Integrated workflow staging details into `cms-entries` repository.
- Handled descendants across levels (even without depth).
- Resolved 500 error with JSON RTE references.
- Supported custom user access with limited permissions.
- Fixed asset_parent_uid and parent_uid issues.
- Added WEB_UI_API_KEY header support.
- Built Descendants Log Dashboard for Non-Prod.

## Bug Fixes - July (July 2025)

**Tags:** Variants, API, ACL

- Fixed variant deletion bug on UI.
- Corrected asset_parent_uid and parent_uid logic.
- Resolved API response differences for descendants.
- Fixed custom field not saving on variants (on hold).
- Updated error message typo in environment permission bug.
- Work in progress: API support based on version.

## Entry and Asset Descendants (May 2025)

**Tags:** ACL, API

- Refactored logic and implemented tests.
- Added ACL permissions and SDK support.
- Debugged include_publish_details for multiple environments.
- Integrated workflow details into API.
- Planning production deployment.

## Security & GRPC Enhancements (May 2025)

**Tags:** Security, ACL, Variants, gRPC, Performance

- Resolved 2 VAPT issues (Matt Black).
- Fixed OAuth Variant Write permission typo.
- Updated gRPC proto files and debugging.
- Implemented database time tracking for performance.
- gRPC support in publishing rules implemented.

## Permission Enhancements & Release Planning (April 2025)

**Tags:** Variants, ACL, API, Security

- Implemented role-based access control on descendants.
- Added sidecar support for permissions on Variants.
- Fixed unauthorized update access (VAPT).
- Handled workflow details in API response.
- Release plan finalized with stakeholders.
- Indexed Variant Group name in Superadmin DB.

## Learnings & Side Projects (April 2025)

**Tags:** Variants

- Completed 'Pair Programming with AI' course.
- Started System Design course.
- Spiked branch support in variant management.
- Investigated multiple event triggers on delete.
- Prepared detailed release plan sheet.
