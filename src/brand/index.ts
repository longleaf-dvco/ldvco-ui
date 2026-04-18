// Re-export brand tokens + Tailwind preset for convenient consumption.
// Consumers typically import from '@ui/brand' (or '@ui' once re-exported
// at the package root).

export {
  colors,
  fontFamily,
  googleFontsHref,
  wordmark,
  selectionBackground,
} from './tokens';
export type { BrandColor } from './tokens';

export { default as tailwindPreset } from './tailwind-preset';

// base.css is imported, not re-exported — consumers reach it via
//   @import "../ui/src/brand/base.css";
// in their own index.css.
