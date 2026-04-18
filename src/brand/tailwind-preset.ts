// ─────────────────────────────────────────────────────────────────────────
//  Longleaf Tailwind preset — import and extend in each consumer's
//  tailwind.config.ts. Guarantees every Longleaf surface speaks the
//  same color and type language out of the box.
//
//  Usage:
//    // tailwind.config.ts
//    import longleafPreset from './ui/src/brand/tailwind-preset';
//    export default {
//      presets: [longleafPreset],
//      content: [...],   // consumer-specific globs
//      // theme.extend: consumer-specific extensions
//    };
// ─────────────────────────────────────────────────────────────────────────

import type { Config } from 'tailwindcss';
import { colors, fontFamily } from './tokens';

// tokens.ts declares colors + fontFamily with `as const` so downstream
// type-narrow code (e.g. `BrandColor`) gets precise literals. Tailwind's
// Config type expects mutable objects, so we widen here at the boundary.
type MutableFontFamily = Record<string, string[]>;

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: {
        ui: [...fontFamily.ui],
        editorial: [...fontFamily.editorial],
        body: [...fontFamily.body],
      } satisfies MutableFontFamily,
    },
  },
};

export default preset;
