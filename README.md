# NexusCore

<div align="center">

```
███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗
████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗██║     ██║   ██║██████╔╝█████╗  
██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║██║     ██║   ██║██╔══██╗██╔══╝  
██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║╚██████╗╚██████╔╝██║  ██║███████╗
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
```

**The project workspace built for engineering teams.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![tRPC](https://img.shields.io/badge/tRPC-v11-398CCB?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/tuusuario/nexuscore/ci.yml?style=flat-square&label=CI)](https://github.com/tuusuario/nexuscore/actions)

[**Live Demo**](https://nexuscore.vercel.app) · [**Docs**](https://nexuscore.vercel.app/docs) · [**Report Bug**](https://github.com/tuusuario/nexuscore/issues) · [**Request Feature**](https://github.com/tuusuario/nexuscore/issues)

</div>

---

## ¿Qué es NexusCore?

NexusCore es una plataforma SaaS **production-ready** de gestión de proyectos con IA integrada, construida para equipos de desarrollo modernos. Combina tableros Kanban con drag & drop, vistas Gantt con dependencias, y un asistente IA que analiza tu sprint, detecta bloqueos y sugiere prioridades — todo en un solo workspace oscuro y veloz.

> Construido como proyecto de portafolio fullstack demostrando arquitectura multi-tenant, integración de IA, sistema de pagos, API pública, CI/CD y deploy en producción.

---

## ✦ Features

| Feature | Descripción |
|---|---|
| 🏢 **Multi-tenant** | Cada equipo tiene su workspace aislado con subdomain propio |
| 🗂️ **Kanban drag & drop** | Tablero visual con columnas personalizables y reordenamiento en tiempo real |
| 📅 **Vista Gantt** | Línea de tiempo con dependencias entre tareas |
| 🤖 **Asistente IA** | Powered by Groq (llama-3.3-70b) — resume sprints, detecta bloqueos, sugiere prioridades |
| 👥 **Roles y permisos** | Owner / Admin / Member / Viewer con lógica granular server-side |
| 🔗 **Integraciones** | GitHub (sync PRs/issues), Slack, Jira |
| 💳 **Billing con Stripe** | Planes Free / Pro / Team con límites por plan verificados server-side |
| 🌐 **API REST pública** | Documentada, autenticada por API key, disponible en planes Pro+ |
| ⚡ **Tiempo real** | Notificaciones de menciones, cambios de estado y deadlines vía Pusher |
| 📊 **Panel de admin** | Métricas de uso, gestión de usuarios y planes |
| 🧪 **Tests completos** | E2E con Playwright, unitarios con Vitest |
| 🚀 **CI/CD automático** | GitHub Actions: lint → typecheck → test → build → deploy |

---

## 🛠️ Stack

### Frontend
```
Next.js 14 (App Router)    →  Framework principal con Server Components
TypeScript 5.3             →  Tipado estricto, cero any
Tailwind CSS               →  Estilos utility-first
Anime.js                   →  Animaciones sofisticadas (partículas, stagger, spring)
shadcn/ui + Radix UI       →  Componentes accesibles y sin estilos impuestos
@dnd-kit                   →  Drag & drop del Kanban
Framer Motion              →  Transiciones de página
cmdk                       →  Command palette ⌘K
Syne + DM Sans + JetBrains →  Tipografía del sistema de diseño
```

### Backend
```
tRPC v11                   →  API type-safe end-to-end, sin REST boilerplate
Prisma 5                   →  ORM con migraciones y tipos generados
Neon PostgreSQL            →  Base de datos serverless, compatible con Vercel Edge
Upstash Redis              →  Cache y rate limiting serverless
Clerk                      →  Autenticación multi-tenant con organizations
Groq SDK                   →  IA ultrarrápida (llama-3.3-70b-versatile)
Pusher                     →  WebSockets para tiempo real
Resend                     →  Emails transaccionales
Stripe SDK v14             →  Billing, suscripciones y webhooks
Cloudflare R2              →  Storage para adjuntos y avatares
```

### DevOps & Calidad
```
GitHub Actions             →  CI/CD pipeline completo
Vercel                     →  Deploy con Edge Middleware para subdomains
Sentry                     →  Monitoreo de errores en producción
Playwright                 →  Tests E2E
Vitest                     →  Tests unitarios
ESLint + Prettier          →  Linting y formateo
Husky + lint-staged        →  Pre-commit hooks
```

---

## 🗄️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│  Next.js App Router  ·  React Query  ·  tRPC Client  ·  Pusher  │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP / WebSocket
┌───────────────────────────────▼─────────────────────────────────┐
│                    EDGE MIDDLEWARE (Vercel)                       │
│         Subdomain routing  ·  Auth  ·  Workspace context         │
└───────────────────────────────┬─────────────────────────────────┘
                                │
        ┌───────────────────────┼────────────────────┐
        │                       │                    │
┌───────▼───────┐    ┌──────────▼───────┐  ┌────────▼────────┐
│  tRPC Routers │    │  REST API /v1/   │  │  Webhooks        │
│  (type-safe)  │    │  (pública + key) │  │  Stripe · Clerk  │
└───────┬───────┘    └──────────┬───────┘  └────────┬─────────┘
        │                       │                   │
┌───────▼───────────────────────▼───────────────────▼─────────┐
│                      SERVICIOS                                │
│  workspace · task · member · ai · billing · notification     │
│  realtime · email · storage · plan-limits                    │
└───────────────────────────────┬──────────────────────────────┘
                                │
        ┌───────────────────────┼──────────────────────┐
        │                       │                      │
┌───────▼──────┐    ┌───────────▼──────┐   ┌──────────▼───────┐
│  Neon Postgres│    │  Upstash Redis   │   │  Servicios ext.  │
│  (Prisma ORM) │    │  (cache/rate)    │   │  Groq·Pusher·R2  │
└──────────────┘    └──────────────────┘   └──────────────────┘
```

### Multi-tenancy

Cada workspace tiene su propio **subdomain** (`miequipo.nexuscore.app`). El Edge Middleware de Vercel detecta el subdomain, extrae el slug, reescribe la URL internamente y adjunta el contexto de workspace a cada request — sin que el usuario note nada.

```
miequipo.nexuscore.app/board
    → Edge Middleware detecta subdomain "miequipo"
    → Reescribe a /app/miequipo/board
    → Adjunta x-workspace-slug: miequipo al header
    → tRPC context verifica membresía del userId al workspace
```

---

## 📁 Estructura del proyecto

```
nexuscore/
├── .github/workflows/
│   ├── ci.yml                  # lint + typecheck + test + build
│   └── deploy.yml              # deploy a Vercel en merge a main
│
├── prisma/
│   ├── schema.prisma           # Schema completo multi-tenant
│   └── seed.ts                 # Datos de demo realistas
│
├── src/
│   ├── app/
│   │   ├── (auth)/             # Sign in / Sign up (Clerk)
│   │   ├── onboarding/         # Crear primer workspace
│   │   ├── app/[workspace]/    # Dashboard principal
│   │   │   ├── board/          # Kanban drag & drop
│   │   │   ├── gantt/          # Vista Gantt
│   │   │   ├── members/        # Gestión de miembros
│   │   │   ├── settings/       # Configuración del workspace
│   │   │   └── billing/        # Planes y facturación
│   │   └── api/
│   │       ├── trpc/           # tRPC HTTP handler
│   │       ├── v1/             # REST API pública
│   │       └── webhooks/       # Stripe + Clerk
│   │
│   ├── components/
│   │   ├── kanban/             # Board, Column, Card, Modal
│   │   ├── ai/                 # Panel, TypingIndicator, Streaming
│   │   ├── billing/            # PlanCard, UsageBar
│   │   └── landing/            # Hero, Features, Pricing, Footer
│   │
│   ├── server/
│   │   ├── trpc/routers/       # workspace · task · member · ai · billing
│   │   ├── db/                 # Prisma singleton
│   │   └── services/           # Lógica de negocio desacoplada
│   │
│   ├── hooks/                  # useAnime · useRevealOnScroll · useWorkspace
│   └── middleware.ts           # Edge: subdomain routing + auth
│
├── emails/                     # React Email templates
└── tests/
    ├── e2e/                    # Playwright specs
    └── unit/                   # Vitest specs
```

---

## 🚀 Setup local

### Prerequisitos

- Node.js 20+
- npm 10+
- Cuenta en: Neon · Clerk · Groq · Pusher · Upstash · Resend · Stripe

### 1. Clonar el repo

```bash
git clone https://github.com/tuusuario/nexuscore.git
cd nexuscore
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales. Ver la sección **[Variables de entorno](#-variables-de-entorno)** para saber dónde obtener cada una.

### 4. Inicializar la base de datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en Neon
npx prisma db push

# Poblar con datos de demo
npm run db:seed
```

### 5. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — deberías ver la landing page de NexusCore.

---

## 🔑 Variables de entorno

Crea tu `.env.local` con estas variables. Todas son **obligatorias** para que el proyecto funcione completo.

```bash
# Base de datos — neon.tech
DATABASE_URL=""
DIRECT_URL=""

# Auth — clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
CLERK_WEBHOOK_SECRET=""

# IA — console.groq.com
GROQ_API_KEY=""

# Tiempo real — pusher.com
PUSHER_APP_ID=""
PUSHER_APP_KEY=""
PUSHER_APP_SECRET=""
PUSHER_CLUSTER=""
NEXT_PUBLIC_PUSHER_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER=""

# Cache — upstash.com
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Email — resend.com
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""

# Pagos — stripe.com
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRO_PRICE_ID=""
STRIPE_TEAM_PRICE_ID=""

# Storage — cloudflare.com/r2
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
NEXT_PUBLIC_R2_PUBLIC_URL=""

# Monitoreo — sentry.io
NEXT_PUBLIC_SENTRY_DSN=""
SENTRY_AUTH_TOKEN=""
SENTRY_ORG=""
SENTRY_PROJECT=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_DOMAIN="localhost:3000"
NODE_ENV="development"

# Seguridad (genera con: openssl rand -base64 32)
ENCRYPTION_KEY=""
```

---

## 📜 Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
npm run typecheck    # TypeScript sin emitir archivos
npm run test:unit    # Tests unitarios con Vitest
npm run test:e2e     # Tests E2E con Playwright
npm run db:push      # Aplicar schema a la DB sin migración
npm run db:migrate   # Crear y aplicar migración
npm run db:seed      # Poblar DB con datos de demo
npm run db:studio    # Abrir Prisma Studio (UI de la DB)
npm run db:reset     # Reset completo + seed
npm run format       # Prettier en todo el proyecto
```

---

## 🤖 Integración con IA

NexusCore usa **Groq** con el modelo `llama-3.3-70b-versatile` para tres funcionalidades principales:

### 1. Resumen de sprint
Analiza todas las tareas del sprint y genera un informe ejecutivo en markdown con progreso, completadas, en progreso y bloqueos detectados.

### 2. Sugerencia de prioridades
Examina el conjunto de tareas activas considerando fechas de vencimiento, carga del equipo y dependencias, y propone reordenamiento de prioridades con justificación.

### 3. Detección de bloqueos
Identifica patrones problemáticos: tareas sin assignee cerca del deadline, dependencias circulares, tareas bloqueadas sin acción, y entrega sugerencias concretas de resolución.

**Límites por plan:**
- Free: 5 requests/día
- Pro: 50 requests/día  
- Team: 200 requests/día

---

## 💳 Planes

| | Free | Pro | Team |
|---|---|---|---|
| **Precio** | $0 | $12/user/mo | $28/user/mo |
| **Miembros** | 3 | 15 | Ilimitados |
| **Proyectos** | 2 | 20 | Ilimitados |
| **Tareas/proyecto** | 50 | 1,000 | Ilimitadas |
| **Requests IA/día** | 5 | 50 | 200 |
| **Storage** | 0.5 GB | 10 GB | 100 GB |
| **Integraciones** | ✗ | ✓ | ✓ |
| **Vista Gantt** | ✗ | ✓ | ✓ |
| **API pública** | ✗ | ✓ | ✓ |

---

## 🌐 API pública

Disponible en planes **Pro** y **Team**. Autenticación con API key en el header:

```bash
Authorization: Bearer nexus_TU_WORKSPACE_ID
```

### Endpoints

```bash
# Listar tareas
GET /api/v1/tasks?projectId=xxx&status=IN_PROGRESS&limit=50

# Crear tarea
POST /api/v1/tasks
Content-Type: application/json
{
  "projectId": "proj_xxx",
  "columnId": "col_xxx",
  "title": "Mi nueva tarea",
  "priority": "HIGH"
}
```

---

## 🔄 CI/CD

Cada push dispara el pipeline en GitHub Actions:

```
Push / PR
    │
    ├── lint         → ESLint + Prettier check
    ├── typecheck    → tsc --noEmit
    ├── test:unit    → Vitest
    └── build        → next build (con prisma generate)
         │
         └── [merge a main] → Deploy automático en Vercel
```

---

## 🧪 Tests

```bash
# Unitarios (servicios, helpers, validaciones)
npm run test:unit

# E2E (flujos completos en browser)
npm run test:e2e

# Con UI interactiva
npx vitest --ui
npx playwright test --ui
```

Cobertura de tests:
- `tests/unit/ai.test.ts` — Prompts de Groq y parsing de respuestas
- `tests/unit/plan-limits.test.ts` — Lógica de límites por plan
- `tests/e2e/auth.spec.ts` — Registro, login, onboarding
- `tests/e2e/kanban.spec.ts` — Crear tareas, drag & drop
- `tests/e2e/billing.spec.ts` — Flujo de upgrade de plan

---

## 🤝 Contribuir

```bash
# 1. Fork del repo
# 2. Crear branch para tu feature
git checkout -b feature/nombre-descriptivo

# 3. Commit con mensaje descriptivo
git commit -m "feat: agregar exportación de tablero a CSV"

# 4. Push y abrir PR
git push origin feature/nombre-descriptivo
```

Por favor asegúrate de que tu PR:
- Pasa todos los checks del CI
- No introduce instancias de `any` en TypeScript
- Incluye tests para la funcionalidad nueva
- Actualiza la documentación si es necesario

---

## 📄 Licencia

MIT © 2026 NexusCore. Ver [LICENSE](LICENSE) para detalles.

---

<div align="center">

Construido con ☕ y demasiadas horas de código.

**[⬆ Volver arriba](#nexuscore)**

</div>