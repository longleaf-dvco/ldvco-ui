# Longleaf brand tokens

The machine-readable source of truth for the Longleaf visual identity.

**Relationship to `UI-INTERFACE.md`:** the markdown file in
`ldvco-iam-workspace` is the human-readable brand kit — voice, semantic
guidance, copy-and-paste patterns. This folder is the **code** that
consuming apps actually import. When the two disagree, **this folder
wins** and `UI-INTERFACE.md` must be updated.

## What's here

| File | Purpose | Consumed by |
|---|---|---|
| `tokens.ts` | Colors, font families, Google Fonts URL, wordmark letter-spacing, selection color | TypeScript code (inline styles, condition logic) |
| `tailwind-preset.ts` | Tailwind config preset — extends theme with Longleaf colors + `font-ui`/`font-editorial`/`font-body` | `tailwind.config.ts` |
| `base.css` | Global reset: no border-radius, no shadows, body defaults, `::selection` | Consumer's `src/index.css` |
| `index.ts` | Barrel file | `import { ... } from '@ui/brand'` |

## Wiring into a new consumer

Assumes the consumer has `ldvco-ui` as a submodule at `ui/` with an
`@ui` path alias (see top-level README).

### 1. `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';
import longleafPreset from './ui/src/brand/tailwind-preset';

export default {
  presets: [longleafPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // app-specific extensions (e.g. one-off accent for a project site)
    },
  },
} satisfies Config;
```

### 2. `src/index.css`

```css
@import "../ui/src/brand/base.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. `index.html`

Paste the canonical Google Fonts link into `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap"
/>
```

(The same URL is available as `googleFontsHref` from `tokens.ts` if you
prefer to inject it programmatically.)

### 4. Wordmark

Use `wordmark.marketing` (3.5px) for customer-facing surfaces,
`wordmark.internal` (2.5px) for internal tools:

```tsx
import { wordmark } from '@ui/brand';

<div
  className="font-ui font-bold text-deep-blue text-sm uppercase"
  style={wordmark.marketing}
>
  LONGLEAF
</div>
```

## Updating the brand

1. Change the relevant file in this folder.
2. Mirror the change in `UI-INTERFACE.md` so the human-readable guide stays current.
3. Commit + push.
4. In each consumer repo: `git submodule update --remote ui && npm run build`.

Every downstream app picks up the new tokens on its next build.
