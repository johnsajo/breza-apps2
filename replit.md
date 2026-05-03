# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### API Server (`artifacts/api-server`)
- Express 5, port 8080
- AI route: `POST /api/ai/chat` — model `gpt-4o`, `max_tokens: 2000`, `response_format: json_object`
- Supports optional `imageBase64` + `imageType` for vision (gpt-4o multimodal)
- JSON output stripped of markdown fences before returning

### The Outside Eye (`artifacts/outside-eye`)
- React 19 + Vite + TypeScript + Tailwind v4 (CSS `@theme`)
- Wouter routing, base path `/outside-eye/`
- Fonts: Fraunces (display), DM Sans (UI)
- 9 creative rooms: Critique, Brief Decoder, Bridge, Feedback Translator, Jury, Colour Intelligence, Wordmark Room, Library, First Draft
- AI via `src/lib/ai.ts` → `callOutsideEye(prompt, system, imageBase64?, imageType?)`
  - No key: routes via API server (gpt-4o)
  - With key: routes directly to OpenAI / Gemini / Claude / Groq / DeepSeek
  - All paths strip markdown fences before returning
- File upload: Critique + Jury support drag-and-drop image/PDF/doc; images encoded as base64 for vision
- Inspiration URL field on all 9 rooms
- `← All rooms` back button on all pages (via RoomTemplate + custom pages)
- Industries: 24 options inc. Advertising, Marketing, Media, PR and Communications, Creative Agency
- Brief categories: 16 options inc. Advertising, Marketing, PR, Integrated, Events
- Jury mediums: 12 options inc. Experiential, PR, Radio, Email, Events
- Library disciplines: 13 options inc. Art Direction, Media Planning, PR and Communications, Social Media
- Critique: evaluates headline, baseline/tagline, layout, and CTA separately for ad work

### KINDD (`artifacts/kindd-site`)
- Static marketing website

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
