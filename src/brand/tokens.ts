// ─────────────────────────────────────────────────────────────────────────
//  Longleaf brand tokens — the machine-readable source of truth.
//  UI-INTERFACE.md (in ldvco-iam-workspace) is the human-readable guide;
//  this file is what Tailwind, CSS, and inline styles actually import.
//  If these two ever disagree, THIS FILE WINS and UI-INTERFACE.md
//  must be updated to match.
// ─────────────────────────────────────────────────────────────────────────

/** Canonical Longleaf palette. Every consumer defines these in Tailwind. */
export const colors = {
  'deep-blue':    '#2A3D4A', // primary brand, headings, wordmark on light bg
  'coastal-blue': '#4A6B7A', // links, default button bg, active states
  'driftwood':    '#3A3632', // dark body text, hover states
  'oyster':       '#6B6054', // body text, eyebrow labels, helper text
  'gold':         '#B8975A', // accents, experiment badges, selection highlight
  'light-sand':   '#FAFAF8', // subtle section backgrounds
  'sand':         '#E8E4DE', // borders, dividers
  'deep-green':   '#2E3D2A', // nature-accent moments, maps
  'sage':         '#7A8C73', // nature-accent muted backgrounds
} as const;

export type BrandColor = keyof typeof colors;

/** Three fonts, three jobs. Don't mix. */
export const fontFamily = {
  ui:        ['"Open Sans"', 'sans-serif'],          // wordmark, nav, buttons, uppercase
  editorial: ['"Libre Baskerville"', 'serif'],       // all headings, editorial moments
  body:      ['"Outfit"', 'sans-serif'],             // paragraph copy
} as const;

/** Google Fonts stylesheet URL — include in index.html <head>. */
export const googleFontsHref =
  'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap';

/**
 * Wordmark letter-spacing differs by tier:
 *  - 2.5px on internal tools (ldvco-admin, ldvco-ops, etc.)
 *  - 3.5px on public marketing + external microsites (longleafdvco.com,
 *    retreat.longleafdvco.com, etc.)
 * Internal apps should reach for `wordmark.internal`, customer-facing
 * for `wordmark.marketing`.
 */
export const wordmark = {
  internal:  { letterSpacing: '2.5px' },
  marketing: { letterSpacing: '3.5px' },
} as const;

/** Selection highlight — gold at 25% opacity. */
export const selectionBackground = 'rgba(184, 151, 90, 0.25)';
