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
};

/**
 * Three-zone app shell for every internal Longleaf tool.
 *
 * Structure (desktop):
 *   ┌────────────────┬──────────────────────────────────────────┐
 *   │ LONGLEAF       │                                          │
 *   │ {appName}      │                                          │
 *   │ ──────────────│                                          │
 *   │ {nav}          │          {children}                      │
 *   │                │                                          │
 *   │ ─ divider ─   │                                          │
 *   │ {secondary}    │                                          │
 *   │ ──────────────│                                          │
 *   │ Signed in as   │                                          │
 *   │ {user.name}    │                                          │
 *   │ {user.role}    │                                          │
 *   │ [Sign out]     │                                          │
 *   └────────────────┴──────────────────────────────────────────┘
 *
 * On mobile, the sidebar collapses to a horizontal top bar; the
 * signed-in footer hides (sign out is available on a menu or from
 * the app's own settings — out of scope for this shell).
 */
export default function AppShell({
  appName,
  user,
  nav,
  secondaryNav,
  onSignOut,
  children,
  contentClassName,
}: AppShellProps) {
  const displayName = user.name || user.email || 'Signed in';
  const roleLabel = user.role ? formatRole(user.role) : null;

  const main =
    contentClassName ??
    'max-w-5xl mx-auto px-6 py-12 lg:py-16';

  return (
    <div className="min-h-screen bg-light-sand flex flex-col lg:flex-row">
      <aside className="lg:w-64 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-sand bg-white flex-shrink-0 flex flex-col">
        {/* Branding */}
        <div className="px-6 py-6 border-b border-sand">
          <div
            className="font-ui font-bold text-deep-blue text-sm uppercase"
            style={{ letterSpacing: '2.5px' }}
          >
            LONGLEAF
          </div>
          <div
            className="font-ui font-semibold uppercase text-oyster mt-2"
            style={{ fontSize: '11px', letterSpacing: '2px' }}
          >
            {appName}
          </div>
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
  // 'super_admin' → 'SUPER ADMIN', 'member' → 'MEMBER'
  return role.replace(/_/g, ' ').toUpperCase();
}
