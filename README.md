# NexusCore — Next.js 14 Frontend

Frontend de NexusCore con el design system "Obsidian Interface".
Stack: Next.js 14 (App Router) · TypeScript · Tailwind · Anime.js · shadcn/ui · dnd-kit · cmdk.

## Setup

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

- `src/app/` — App Router (landing en `/`, dashboard en `/app/[workspace]`)
- `src/components/` — UI, layout, kanban, ai, dashboard, landing, shared
- `src/hooks/` — `useAnime`, `useRevealOnScroll`, `useStaggerReveal`, `useCountUp`
- `src/lib/` — utils, mock data, format helpers

## Notas

- Backend tRPC NO incluido — los hooks tienen `TODO: conectar a tRPC`.
- Toda la data viene de `src/lib/mock-data.ts`.
- Las pantallas implementadas: Landing, Overview, Board (Kanban dnd-kit), Gantt, Projects, Members, Integrations, Billing, Settings, Command Palette (⌘K), AI Panel (⌘J).

Este proyecto es el equivalente Next.js de la versión React+Vite construida en Lovable.
La lógica visual, design tokens y animaciones son idénticas.
