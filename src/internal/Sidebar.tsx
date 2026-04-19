import type { ReactNode } from 'react';

export type SidebarSectionProps = {
  /** Section label (e.g. "Console", "Apps", "Verticals"). Rendered
   *  in mixed case — internal-tools chrome stays subdued. */
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
    <div className="mb-3 last:mb-0 lg:mb-4 flex lg:flex-col gap-1 lg:gap-0.5 items-start">
      <h3 className="font-body text-oyster/70 px-3 lg:mb-1 whitespace-nowrap text-[11px] leading-tight">
        {title}
      </h3>
      <div className="flex lg:flex-col lg:w-full gap-0.5">{children}</div>
    </div>
  );
}
