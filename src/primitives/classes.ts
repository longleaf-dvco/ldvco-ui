// ─────────────────────────────────────────────────────────────────────────
//  Shared className helpers — the single source of truth for states
//  that multiple components render (sidebar items, button variants, etc.)
//
//  These are helpers, not components, because sidebar items need to
//  render as different element types across apps: <NavLink> in admin
//  (react-router), plain <button> in ops (session-handoff), <a> in
//  marketing. All three can consume the same className recipe.
// ─────────────────────────────────────────────────────────────────────────

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export type SidebarItemState = 'active' | 'inactive' | 'disabled';

// Internal-tools chrome runs subdued — no filled backgrounds on
// active/hover, no semibold weight, no boxes. State distinction is
// communicated by color shifts only:
//   - active:   text deepens to deep-blue
//   - inactive: text-oyster, deepens on hover
//   - disabled: lighter still, no interaction
const SIDEBAR_ITEM_BASE =
  'w-full flex items-center gap-2 px-3 py-1.5 text-left font-body whitespace-nowrap transition-colors text-[14px] leading-tight';

const SIDEBAR_ITEM_VARIANTS: Record<SidebarItemState, string> = {
  active: 'text-deep-blue cursor-default',
  inactive: 'text-oyster hover:text-deep-blue',
  disabled: 'text-oyster/50 cursor-default',
};

/** Class recipe for a sidebar nav item. Apply to <NavLink>, <a>, or <button>. */
export function sidebarItemClass(state: SidebarItemState): string {
  return cn(SIDEBAR_ITEM_BASE, SIDEBAR_ITEM_VARIANTS[state]);
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

const BUTTON_BASE =
  'font-ui font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center';

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: 'text-xs px-5 py-2.5',
  sm: 'text-[11px] px-3 py-2',
};

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-coastal-blue text-white hover:bg-deep-blue',
  secondary:
    'border border-coastal-blue text-coastal-blue hover:bg-coastal-blue hover:text-white',
  ghost: 'text-coastal-blue hover:text-deep-blue',
};

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
): string {
  return cn(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant]);
}
