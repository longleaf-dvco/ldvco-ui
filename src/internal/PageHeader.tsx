import type { ReactNode } from 'react';

export type PageHeaderProps = {
  /**
   * Which header recipe to use:
   *  - `editorial` — small eyebrow + large H1. For content-focused
   *    pages (priorities, marketing).
   *  - `utilitarian` — H1 + muted subtitle below it. For data-dense
   *    pages (users list, audit log).
   */
  variant: 'editorial' | 'utilitarian';
  /** H1 text — the page name or heading phrase. */
  title: string;
  /** Shown as uppercase eyebrow ABOVE the title in editorial variant. */
  eyebrow?: string;
  /** Shown as body subtitle BELOW the title in utilitarian variant. */
  subtitle?: string;
  /** Optional right-side actions (e.g. "+ New deal" button). */
  actions?: ReactNode;
};

/**
 * Top-of-page header. Two recipes cover every internal-tool surface:
 *
 *   Editorial:
 *     PRIORITIES
 *     What needs doing.
 *
 *   Utilitarian:
 *     Users                                         [Invite user]
 *     Everyone with an IAM record.
 *
 * Both:
 *   - 28px Libre Baskerville for the title
 *   - mb-8 below the header block (32px gap before page body)
 *   - Optional right-aligned actions row
 */
export default function PageHeader({
  variant,
  title,
  eyebrow,
  subtitle,
  actions,
}: PageHeaderProps) {
  if (variant === 'editorial') {
    return (
      <header className="mb-8 flex items-end justify-between gap-6 flex-wrap">
        <div>
          {eyebrow && (
            <p
              className="font-ui uppercase text-oyster mb-2"
              style={{ fontSize: '11px', letterSpacing: '2.5px' }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-editorial text-deep-blue"
            style={{ fontSize: '28px', lineHeight: '1.25' }}
          >
            {title}
          </h1>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </header>
    );
  }

  // Utilitarian
  return (
    <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-editorial text-[28px] leading-tight text-deep-blue">
          {title}
        </h1>
        {subtitle && (
          <p className="font-ui text-sm text-oyster mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>
      )}
    </header>
  );
}
