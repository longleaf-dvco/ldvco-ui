import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from './classes';

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
  /** Called when the user clicks Sign out */
  onSignOut: () => void | Promise<void>;
  /** Page content */
  children: ReactNode;
  /**
   * Override the main content container classes. Default:
   * 'max-w-5xl mx-auto px-6 py-12 lg:py-16'. Override for content-width
   * variance: notes pages use 'max-w-2xl mx-auto ...'.
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

  const main = contentClassName ?? 'max-w-5xl mx-auto px-6 py-12 lg:py-16';

  return (
    <div className="min-h-screen bg-light-sand flex flex-col lg:flex-row relative">
      {/* Floating "show sidebar" button — only visible on desktop while collapsed */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Show sidebar"
          className="hidden lg:flex fixed top-4 left-4 z-20 w-9 h-9 items-center justify-center bg-white border border-sand text-deep-blue hover:bg-light-sand"
        >
          <HamburgerIcon />
        </button>
      )}

      <aside
        className={cn(
          'border-b lg:border-b-0 lg:border-r border-sand bg-white flex-shrink-0 flex flex-col',
          // Hidden on desktop when collapsed; mobile always shows it as horizontal strip
          collapsed ? 'hidden lg:hidden' : 'lg:w-64 lg:min-h-screen'
        )}
      >
        {/* Branding */}
        <div className="px-6 py-6 border-b border-sand flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className="font-ui font-bold text-deep-blue text-sm uppercase"
              style={{ letterSpacing: '2.5px' }}
            >
              LONGLEAF
            </div>
            <div
              className="font-ui font-semibold uppercase text-oyster mt-2 truncate"
              style={{ fontSize: '11px', letterSpacing: '2px' }}
            >
              {appName}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="hidden lg:flex w-7 h-7 items-center justify-center text-oyster hover:text-deep-blue hover:bg-light-sand shrink-0"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 flex-1 overflow-x-auto lg:overflow-x-visible flex lg:flex-col gap-1">
          {nav}

          {secondaryNav && (
            <div className="lg:mt-2 lg:pt-2 lg:border-t border-sand">
              {secondaryNav}
            </div>
          )}
        </nav>

        {/* Signed-in footer */}
        <div className="hidden lg:block px-6 py-4 border-t border-sand">
          <div className="font-ui text-xs text-oyster mb-1">Signed in as</div>
          <div className="font-ui text-sm font-semibold text-deep-blue truncate">
            {displayName}
          </div>
          {roleLabel && (
            <div
              className="font-ui text-oyster uppercase mt-0.5"
              style={{ fontSize: '11px', letterSpacing: '2px' }}
            >
              {roleLabel}
            </div>
          )}
          <button
            type="button"
            onClick={onSignOut}
            className="mt-3 font-ui text-xs uppercase tracking-wider text-coastal-blue hover:text-deep-blue"
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
