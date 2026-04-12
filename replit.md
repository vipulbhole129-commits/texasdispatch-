# Texas Plumbing Dispatch — Workspace

## Overview

Premium landing page for "Texas Plumbing Dispatch" — a 24/7 AI call answering and lead dispatch service for Texas plumbers. Built as a pnpm monorepo with React Vite frontend + Express API backend.

## Brand
- Name: **Texas Plumbing Dispatch**
- Colors: Deep charcoal (`#0a0b0f`) background + Electric orange (`#f97316`) accent
- Font: **Bebas Neue** (display) + **Inter** (body)
- Contact: vic@texasdispatch.site

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4 + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2)
- **Email**: Resend (requires RESEND_API_KEY env var)

## Artifacts

| Artifact | Kind | Path | Port |
|----------|------|------|------|
| plumber-ai | web | `/` | 24121 |
| api-server | api | `/api` | 8080 |
| mockup-sandbox | design | `/__mockup` | 8081 |

## Frontend Components (artifacts/plumber-ai/src)

- `pages/home.tsx` — Main landing page assembly
- `components/NavMenu.tsx` — Fixed header + vertical slide-out hamburger overlay
- `components/HeroSection.tsx` — Full-screen hero with alert banner, Bebas Neue headline, CTAs, stats
- `components/LossCalculator.tsx` — Interactive 3D calculator showing revenue lost (red numbers)
- `components/ServicesSection.tsx` — 6 service cards + competitor comparison grid
- `components/PricingSection.tsx` — Gold/Platinum/Diamond 3-tier pricing
- `components/ROICalculator.tsx` — Interactive ROI calculator with plan selector + sliders (green numbers)
- `components/ReferralSection.tsx` — "Brotherhood Loop" referral program
- `components/FAQSection.tsx` — Accordion FAQ (8 questions)
- `components/LeadForm.tsx` — Lead capture form (POST /api/leads → DB + email)
- `components/TexasBot.tsx` — Floating AI chat widget (SSE streaming via OpenAI)
- `components/ContactInfoSection.tsx` — Email/territory/hours info

## API Routes (artifacts/api-server/src/routes)

- `POST /api/leads` — Save lead to DB, send email via Resend
- `POST /api/openai/conversations` — Create a chat conversation
- `POST /api/openai/conversations/:id/messages` — Stream AI response (SSE)
- `GET /api/openai/conversations/:id/messages` — List messages

## Database Schema (lib/db/src/schema)

- `leads` — Lead capture form submissions
- `conversations` — Texas Bot chat sessions
- `messages` — Texas Bot message history

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Environment Variables Required

- `SESSION_SECRET` — Session secret (already set)
- `RESEND_API_KEY` — Resend email API key (optional; email notifications won't send without it)
- `DATABASE_URL` — PostgreSQL connection string (auto-provisioned)
- `OPENAI_API_KEY` — OpenAI API key (via Replit AI Integrations, auto-configured)
