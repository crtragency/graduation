# ProjectForge EDU

ProjectForge EDU is a focused website workspace for graduation-project teams. Students describe the real problem, users, objectives, and system modules; review a structured website plan; inspect the result across screen sizes; and export or publish editable source code.

## Product surfaces

- Premium animated marketing site with product demo, social proof, pricing, and FAQ.
- Clerk authentication with a safe credential-free demo mode.
- Project dashboard, usage overview, templates, history, deployments, and profile.
- Guided graduation-project studio with structured options for field, visual direction, typography, framework, and language.
- Generation timeline: analysis, planning, code, imagery, SEO, deployment.
- Sandboxed live preview for desktop, tablet, and mobile.
- Source file browser and code viewer.
- ZIP download, GitHub repository creation, Vercel deployment, QR sharing, and custom domains.
- PostgreSQL and Prisma data model for users, workspaces, projects, versions, deployments, subscriptions, usage, templates, and prompt logs.
- Stripe subscriptions and verified webhooks.
- Supabase Storage uploads.
- Admin command center for users, revenue, token usage, deployments, system health, and prompt logs.
- Dark and light appearance with responsive, accessible interactions.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS and shadcn-style reusable UI components
- Framer Motion and Lucide icons
- PostgreSQL with Prisma ORM
- Clerk authentication
- OpenAI API
- Stripe Billing
- Vercel deployments
- Supabase Storage

## Local setup

Requirements:

- Node.js 20 or newer
- PostgreSQL 15 or newer

Install dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

For the credential-free product demo, every external variable may remain empty. For the complete production workflow, configure the services listed in `.env.example`.

Generate Prisma Client and initialize the database:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Public application URL used in metadata and redirects |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk browser key |
| `CLERK_SECRET_KEY` | Clerk server key |
| `OPENAI_API_KEY` | Live AI generation |
| `OPENAI_MODEL` | OpenAI model used by the generator |
| `STRIPE_SECRET_KEY` | Stripe server API |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature verification |
| `STRIPE_PRO_PRICE_ID` | Pro recurring price |
| `STRIPE_TEAM_PRICE_ID` | Team recurring price |
| `VERCEL_TOKEN` | Generated-project deployments and domains |
| `VERCEL_TEAM_ID` | Optional Vercel team scope |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only storage access |
| `SUPABASE_STORAGE_BUCKET` | Asset bucket name |
| `GITHUB_TOKEN` | Repository creation and source upload |

Never expose server secrets through `NEXT_PUBLIC_` variables.

## Architecture

```text
app/
  api/                 Route handlers for generation and integrations
  dashboard/           Authenticated product workspace
  admin/               Role-gated operations dashboard
  sign-in, sign-up/    Clerk authentication surfaces
components/
  auth/                Authentication UI
  dashboard/           Application shell and management panels
  generator/           AI builder, preview, export, and deploy workflow
  marketing/           Public landing page
  ui/                  Reusable shadcn-style primitives
lib/
  ai/                  OpenAI generation orchestration and demo fallback
  repositories/        Ownership-aware data access
  auth.ts              Clerk identity boundary
  db.ts                Prisma singleton
  security.ts          Origin validation and rate limiting
  validation.ts        Zod input schemas
prisma/
  schema.prisma        PostgreSQL production schema
  seed.ts              Curated starter templates
```

## Production database

Use migrations in deployed environments:

```bash
npx prisma migrate dev --name init
npm run db:migrate
```

Do not use `prisma db push` as the deployment migration strategy.

## Vercel deployment

1. Import the GitHub repository into Vercel.
2. Add production environment variables.
3. Provision PostgreSQL and apply Prisma migrations.
4. Add the Clerk, Stripe, and Vercel callback URLs for the production domain.
5. Point Stripe webhooks to `/api/stripe/webhook`.
6. Create the Supabase Storage bucket named by `SUPABASE_STORAGE_BUCKET`.
7. Deploy from `main`.

The included `vercel.json` explicitly selects the Next.js framework and production build.

## Security controls

- Server-side ownership checks for project access.
- Same-origin verification for state-changing requests.
- Zod validation and bounded request sizes.
- Request rate limits for generation, deployment, export, uploads, and integrations.
- Stripe signature verification.
- Restricted upload MIME types and maximum file size.
- Sandboxed generated-site previews.
- Security headers and disabled framework disclosure.
- Secrets confined to server-only variables.

For distributed production rate limiting, replace the in-process fallback with a shared Redis or database-backed limiter.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Academic integrity

ProjectForge EDU is a creation and learning tool. Students remain responsible for understanding, reviewing, testing, and presenting the work they submit, and for complying with their university's academic policies.

## License

Proprietary. All rights reserved unless a separate license is added to the repository.
