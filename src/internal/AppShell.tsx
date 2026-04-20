import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../primitives/classes';
import { wordmark } from '../brand/tokens';

export type AppShellUser = {
  /** Display name — falls back to email if absent */
  name: string | null | undefined;
  /** Raw IAM role string ('super_admin' | 'admin' | 'member' | 'viewer') */
  role?: string | null;
  /** Email as the fallback display string */
  email?: string | null;
};

export type AppShellProps = {
  /** Subtitle under the LONGLEAF wordmark — e.g. "Operations", "Admin console" */
  appName: string;
  /** Current user — name + role + email fallback */
  user: AppShellUser;
  /** Main nav content. Use <SidebarSection> + nav items. */
  nav: ReactNode;
  /**
   * Optional secondary nav rendered below the main nav with a thin
   * divider above it. Used for "quick handoff" links like the
   * Operations link from inside admin.
   */
  secondaryNav?: ReactNode;
  /**
   * Optional eyebrow above `secondaryNav` (e.g. "Jump to"). Renders
   * only when `secondaryNav` is present. Defaults to "Other consoles".
   */
  secondaryNavLabel?: string;
  /** Called when the user clicks Sign out */
  onSignOut: () => void | Promise<void>;
  /** Page content */
  children: ReactNode;
  /**
   * Override the main content container classes. Default:
   * 'max-w-5xl mx-auto px-6 py-8 md:py-12'. Utility-mode density —
   * data surfaces sit closer to the top. Override for content-focused
   * pages that want more breathing room, or for narrower columns
   * (notes pages use 'max-w-2xl mx-auto px-6 py-12 md:py-16').
   */
  contentClassName?: string;
  /**
   * App slug used as the localStorage key for the collapsed-sidebar
   * preference. Required so each app remembers its own state — set to
   * the same string the consuming app already uses elsewhere
   * (e.g. 'admin', 'ops', 'pipeline').
   */
  appSlug: string;
};

const COLLAPSE_KEY_PREFIX = 'ldvco-ui:sidebar-collapsed:';

/**
 * Three-zone app shell for every internal Longleaf tool, with a
 * collapsible sidebar.
 *
 * Default layout:
 *   ┌────────────────┬──────────────────────────────────────────┐
 *   │ LONGLEAF    [‹]│                                          │
 *   │ {appName}      │                                          │
 *   │ ──────────────│          {children}                      │
 *   │ {nav}          │                                          │
 *   │ ─ divider ─   │                                          │
 *   │ {secondary}    │                                          │
 *   │ ──────────────│                                          │
 *   │ Signed in as   │                                          │
 *   │ {user.name}    │                                          │
 *   │ {user.role}    │                                          │
 *   │ [Sign out]     │                                          │
 *   └────────────────┴──────────────────────────────────────────┘
 *
 * Collapsed:
 *   ┌─┬─────────────────────────────────────────────────────────┐
 *   │≡│                  {children}                             │
 *   └─┴─────────────────────────────────────────────────────────┘
 *
 * Collapse state persists per-app in localStorage so the user's
 * choice carries across sessions.
 *
 * On mobile the sidebar lays out as a horizontal top strip; the
 * collapse toggle hides on mobile (the sidebar is already compact).
 */
export default function AppShell({
  appName,
  user,
  nav,
  secondaryNav,
  secondaryNavLabel = 'Other consoles',
  onSignOut,
  children,
  contentClassName,
  appSlug,
}: AppShellProps) {
  const collapseKey = `${COLLAPSE_KEY_PREFIX}${appSlug}`;
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(collapseKey) === '1';
  });

  // Persist collapse changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (collapsed) window.localStorage.setItem(collapseKey, '1');
    else window.localStorage.removeItem(collapseKey);
  }, [collapsed, collapseKey]);

  const displayName = user.name || user.email || 'Signed in';
  const roleLabel = user.role ? formatRole(user.role) : null;

  const main = contentClassName ?? 'max-w-5xl mx-auto px-6 py-8 md:py-12';

  return (
    <div className="min-h-screen bg-light-sand flex flex-col md:flex-row relative">
      {/* Floating "show sidebar" button — only visible on desktop while collapsed */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Show sidebar"
          className="hidden md:flex fixed top-4 left-4 z-20 w-9 h-9 items-center justify-center bg-white border border-sand text-deep-blue hover:bg-light-sand"
        >
          <HamburgerIcon />
        </button>
      )}

      <aside
        className={cn(
          'md:border-r border-sand bg-white flex-shrink-0 flex flex-col',
          // Hidden on desktop when collapsed; mobile always shows it as horizontal strip
          collapsed ? 'hidden md:hidden' : 'border-b md:border-b-0 md:w-64 md:min-h-screen'
        )}
      >
        {/* Branding — LONGLEAF is the wordmark; appName is a quiet eyebrow tag */}
        <div className="px-5 py-4 md:px-6 md:py-6 flex items-center md:items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className="font-ui font-bold text-deep-blue text-sm uppercase"
              style={wordmark.internal}
            >
              LONGLEAF
            </div>
            <div
              className="font-ui text-oyster/70 mt-1 truncate uppercase text-[10.5px] leading-tight"
              style={{ letterSpacing: '0.15em' }}
            >
              {appName}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="hidden md:flex w-7 h-7 items-center justify-center text-oyster/70 hover:text-deep-blue shrink-0"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        {/* Nav — on mobile this is a horizontal scrolling strip; on
            desktop, a vertical stack. */}
        <nav className="px-3 pb-3 md:pb-4 flex-1 overflow-x-auto md:overflow-x-visible flex md:flex-col items-center md:items-stretch gap-1">
          {nav}

          {secondaryNav && (
            <div
              className={cn(
                // Mobile: thin vertical rule marks the handoff as a
                // context-switch, not just another nav item.
                'flex items-center md:items-stretch gap-2 md:gap-0.5 pl-3 ml-1 border-l border-sand',
                // Desktop: collapse to a horizontal divider above the
                // handoff group so it reads as a separate region.
                'md:flex-col md:pl-0 md:ml-0 md:border-l-0 md:border-t md:border-sand/60 md:mt-3 md:pt-3'
              )}
            >
              <span
                className="font-ui uppercase text-oyster/60 text-[10px] whitespace-nowrap px-1 md:px-3 md:mb-1"
                style={{ letterSpacing: '0.15em' }}
              >
                {secondaryNavLabel}
              </span>
              <div className="flex md:flex-col md:w-full gap-0.5">
                {secondaryNav}
              </div>
            </div>
          )}
        </nav>

        {/* Signed-in footer */}
        <div className="hidden md:block px-6 py-4 border-t border-sand/60">
          <div className="font-body text-oyster/80 text-[11px] leading-tight">
            Signed in as
          </div>
          <div className="font-body text-deep-blue truncate text-sm mt-0.5">
            {displayName}
          </div>
          {roleLabel && (
            <div className="font-body text-oyster/70 mt-0.5 text-[11px] leading-tight">
              {roleLabel}
            </div>
          )}
          <button
            type="button"
            onClick={onSignOut}
            className="mt-3 font-body text-coastal-blue hover:text-deep-blue text-[12px]"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className={cn(main)}>{children}</div>
      </main>
    </div>
  );
}

function formatRole(role: string): string {
  return role.replace(/_/g, ' ').toUpperCase();
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4H14M2 8H14M2 12H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
