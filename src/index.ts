// @longleaf/ui — app-design components shared across internal Longleaf tools.

export { default as AppShell } from './AppShell';
export type { AppShellProps, AppShellUser } from './AppShell';

export { default as SidebarSection } from './Sidebar';
export type { SidebarSectionProps } from './Sidebar';

export { default as PageHeader } from './PageHeader';
export type { PageHeaderProps } from './PageHeader';

export { default as Button } from './Button';
export type { ButtonProps } from './Button';

export { default as EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';

export { default as ErrorBanner } from './ErrorBanner';
export type { ErrorBannerProps } from './ErrorBanner';

export {
  cn,
  sidebarItemClass,
  buttonClass,
} from './classes';
export type {
  SidebarItemState,
  ButtonVariant,
  ButtonSize,
} from './classes';

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
