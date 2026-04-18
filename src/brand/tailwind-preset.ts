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

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
};

export default preset;
