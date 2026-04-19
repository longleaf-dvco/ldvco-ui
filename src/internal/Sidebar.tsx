import type { ReactNode } from 'react';

export type SidebarSectionProps = {
  /** Uppercase eyebrow label (e.g. "Console", "Apps", "Experiments"). */
  title: string;
  children: ReactNode;
};

/**
 * Groups nav items under a small uppercase label. Used inside AppShell's
 * `nav` slot. Children are the nav items themselves (NavLink / button
 * / anchor — whichever suits the app). Apply `sidebarItemClass()` from
 * the classes helper to keep each item on-brand.
 *
 * On mobile the section lays out horizontally so the whole sidebar
 * collapses to a scrolling strip.
 */
export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-2 last:mb-0 lg:mb-2 flex lg:flex-col gap-1 lg:gap-0.5 items-start">
      <h3
        className="font-ui uppercase text-oyster px-3 lg:mb-2 whitespace-nowrap"
        style={{ fontSize: '11px', letterSpacing: '2px' }}
      >
        {title}
      </h3>
      <div className="flex lg:flex-col lg:w-full gap-0.5">{children}</div>
    </div>
  );
}
