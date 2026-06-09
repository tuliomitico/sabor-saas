# Agent Guide: next-saas-rbac

## Overview
This is a monorepo containing a multi-tenant SaaS application with Role-Based Access Control (RBAC). It consists of two main applications linked by shared packages:
- `apps/api`: A Fastify-based backend.
- `apps/web`: A Next.js frontend.
- `packages/auth`: Shared logic, models, and schemas for authentication and authorization.
- `packages/env`: Centralized environment configuration.

## Project Structure & Context
The project uses **Turborepo** to manage the monorepo workspace.
- `apps/api`: Uses Fastify with `@fastify/swagger`, `@fastify/jwt`, and Zod for type validation via `fastify-type-provider-zod`.
- `apps/web`: A Next.js application using the App Router, Tailwind CSS, and a custom API client to communicate with the backend.
- `packages/auth`: The "source of truth" for business logic models (User, Organization, Project).

## Core Commands
All commands are managed via Turborepo from the root:

| Command | Description |
| --- | --- |
| `pnpm build` | Builds all projects in the workspace. |
| `pnpm dev` | Starts the development environment for both web and api. |
| `pnpm lint` | Runs linter checks across the project. |
| `pnpm format` | Runs Prettier to format code. |
| `pnpm check-types` | Performs TypeScript type checking. |

## Backend Architecture (`apps/api`)
- **Framework**: Fastify.
- **Routing**: Routes are modularly defined in `src/http/routes/`, grouped by domain (e.g., `auth`, `billing`, `orgs`, `projects`).
- **Validation**: Every route is validated using Zod schemas integrated with the Fastify type provider.
- **Error Handling**: Centralized error handling is managed via `src/http/error-handler.ts`.
- **Database**: Prisma ORM handles database interactions, shared across the project from `packages/auth`.

## Frontend Architecture (`apps/web`)
- **Framework**: Next.js (App Router).
- **Auth Flow**: Handled in `src/app/auth` and protected via `src/middleware.ts`.
- **API Interaction**: The frontend interacts with the backend through a client in `src/http/api-client.ts`.
- **UI Components**: Standardized components are located in `src/components`.

## Cross-Cutting Concerns & Patterns
- **Shared Logic**: Always look into `packages/auth` first when modifying logic related to permissions, roles, or core entities (User, Organization).
- **Types**: Shared types and business models should be defined in the appropriate layer (preferring `packages/auth`) rather than duplicated in app folders.
- **Environment**: Standardize configuration using `@saas/env` available from `packages/env`.

## Gotchas & Conventions
- **Zod Integration**: In the backend, ensure that Zod schemas are applied correctly to routes for automatic type inference and validation.
- **Route Naming**: Follow the existing folder structure in `apps/api/src/http/routes` when adding new features. 
- **Scoped Routes**: Use Route Groups (e.g., `(app)`) in the Next.js frontend to manage layout nesting correctly.
- **Naming Convention**: Prefer descriptive, camelCase for variables and PascalCase for classes/types as per TypeScript standards.
