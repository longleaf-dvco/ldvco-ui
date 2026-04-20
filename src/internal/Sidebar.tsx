import type { ReactNode } from 'react';

export type SidebarSectionProps = {
  /** Section label (e.g. "Console", "Apps", "Verticals"). Rendered
   *  as a small uppercase eyebrow — pass natural casing. */
  title: string;
  children: ReactNode;
};

/**
 * Groups nav items under a quiet section label. Used inside AppShell's
 * `nav` slot. Children are the nav items themselves (NavLink / button /
 * anchor — whichever suits the app). Apply `sidebarItemClass()` from
 * the classes helper to keep each item on-brand.
 *
 * On mobile the section lays out horizontally so the whole sidebar
 * collapses to a scrolling strip.
 */
export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-3 last:mb-0 md:mb-4 flex md:flex-col gap-2 md:gap-0.5 items-center md:items-start">
      <h3
        className="font-ui uppercase text-oyster/60 px-1 md:px-3 md:mb-1 whitespace-nowrap text-[10px] leading-tight"
        style={{ letterSpacing: '0.15em' }}
      >
        {title}
      </h3>
      <div className="flex md:flex-col md:w-full gap-0.5">{children}</div>
    </div>
  );
}
