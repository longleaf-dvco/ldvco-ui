# @longleaf/ui

App-design components shared across Longleaf internal tools
(Operations, admin, marketing, pipeline).

## What lives here vs. UI-INTERFACE.md

`UI-INTERFACE.md` (in the LDVCO IAM Workspace) is the **brand kit** —
color palette, type stack, voice, global rules (no rounding, no
shadows), the things every Longleaf surface (public marketing,
external deals, internal tools) shares.

This package is **app design** — the specific React components used
to build internal tools. It assumes `UI-INTERFACE.md` tokens (colors,
fonts, Tailwind config) are already wired up in the consuming app.

## Consumption

Added as a git submodule at `ui/` in each consuming app:

```bash
git submodule add git@github.com:longleaf-dvco/ldvco-ui.git ui
git commit -m "Add ldvco-ui submodule"
```

Consumers wire a path alias so imports read cleanly:

```ts
// vite.config.ts
resolve: {
  alias: { '@ui': path.resolve(__dirname, 'ui/src') }
}

// tsconfig.json
"paths": {
  "@ui": ["./ui/src/index.ts"],
  "@ui/*": ["./ui/src/*"]
}
```

Then:

```tsx
import { AppShell, PageHeader, Button } from '@ui';
```

## v0.1 surface

| Component | Purpose |
|---|---|
| `AppShell` | Three-zone shell: branding / nav / signed-in footer + main content. Every internal app wraps in this. |
| `SidebarSection` + `SidebarItem` (styles helper) | Nav slot building blocks. Supports `<NavLink>`, `<a>`, `<button>` children via a className helper. |
| `PageHeader` | Top-of-page. Two variants: `editorial` (eyebrow + H1) and `utilitarian` (H1 + subtitle). |
| `Button` | Primary / secondary / ghost variants. Consistent letter-spacing dialect (`tracking-wider`). |
| `EmptyState` | "No data yet" messaging — consistent language across pages. |
| `ErrorBanner` | Dismissible red banner for operation failures. |

## Vercel submodule builds

Each consuming app's Vercel project needs "Include source files
outside of the Root Directory" enabled, and the build command set
to include `git submodule update --init`. Alternatively, set
`VERCEL_GITHUB_DEPLOY_KEY` so Vercel's build machine can clone
the submodule directly.

For the `longleaf-development-co` team, the standard setup uses the
existing Vercel GitHub integration — the same GitHub App authorized
for the parent repo can read the submodule repo because both live
in the `longleaf-dvco` org.
