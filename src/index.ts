// @longleaf/ui — design components shared across Longleaf apps.
//
// Three tiers, kept separate so no surface accidentally borrows chrome
// from another tier:
//   - marketing/  → longleafdvco.com + all project sites
//   - project/    → per-development customer sites (Retreat, Preserve, ...)
//   - internal/   → employee-only tools behind auth
// Plus two cross-tier folders:
//   - brand/      → color/font/wordmark tokens; every tier imports
//   - primitives/ → Button, EmptyState, ErrorBanner; every tier imports
//
// Consumers can import from this flat barrel or from a tier-scoped path
// for stricter scoping:
//
//   import { MarketingTopNav, AppShell } from '@ui';           // flat
//   import { MarketingTopNav } from '@ui/marketing';           // tier-scoped
//   import { AppShell } from '@ui/internal';
//   import { Button } from '@ui/primitives';
//   import { colors, wordmark } from '@ui/brand';
//
// Prefer tier-scoped imports in code review: seeing `@ui/internal` in a
// project-site file is an obvious smell.

// Internal tier
export { default as AppShell } from './internal/AppShell';
export type { AppShellProps, AppShellUser } from './internal/AppShell';

export { default as SidebarSection } from './internal/Sidebar';
export type { SidebarSectionProps } from './internal/Sidebar';

export { default as PageHeader } from './internal/PageHeader';
export type { PageHeaderProps } from './internal/PageHeader';

// Marketing tier (shared by public marketing site + project sites)
export { default as MarketingTopNav } from './marketing/MarketingTopNav';
export type {
  MarketingTopNavProps,
  MarketingNavLink,
  MarketingNavCTA,
} from './marketing/MarketingTopNav';

export { default as MarketingFooter } from './marketing/MarketingFooter';
export type { MarketingFooterProps } from './marketing/MarketingFooter';

// Primitives — tier-agnostic
export { default as Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';

export { default as EmptyState } from './primitives/EmptyState';
export type { EmptyStateProps } from './primitives/EmptyState';

export { default as ErrorBanner } from './primitives/ErrorBanner';
export type { ErrorBannerProps } from './primitives/ErrorBanner';

export { default as Select, SelectField } from './primitives/Select';
export type {
  SelectProps,
  SelectFieldProps,
  SelectOption,
  SelectSize,
} from './primitives/Select';

export { default as Input, InputField, TextArea } from './primitives/Input';
export type {
  InputProps,
  InputFieldProps,
  InputSize,
  TextAreaProps,
} from './primitives/Input';

export { cn, sidebarItemClass, buttonClass } from './primitives/classes';
export type {
  SidebarItemState,
  ButtonVariant,
  ButtonSize,
} from './primitives/classes';

// Brand tokens — also available via '@ui/brand' for direct imports.
export {
  colors as brandColors,
  fontFamily as brandFontFamily,
  googleFontsHref,
  wordmark,
  selectionBackground,
  tailwindPreset as longleafTailwindPreset,
} from './brand';
export type { BrandColor } from './brand';
