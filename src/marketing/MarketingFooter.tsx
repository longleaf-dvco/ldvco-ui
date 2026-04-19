export type MarketingFooterProps = {
  /** Right-side caption. Default: "Longleaf Development Co." */
  caption?: string;
  /** Year shown on the left. Default: current year. */
  year?: number;
};

/**
 * Canonical Longleaf marketing footer. A single thin `bg-deep-blue` strip
 * with copyright left, caption right. Matches `longleafdvco.com`.
 *
 * **Do not add a stacked `LONGLEAF` / `DEVELOPMENT CO.` wordmark here.**
 * That element is hero-only on the public site. Putting it in the footer
 * is the #1 drift bug across project sites — this component exists so you
 * don't have to reinvent the right answer.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ © 2026                       Longleaf Development Co.       │
 *   └──────────────────────────────────────────────────────────────┘
 */
export default function MarketingFooter({
  caption = 'Longleaf Development Co.',
  year = new Date().getFullYear(),
}: MarketingFooterProps) {
  return (
    <footer className="bg-deep-blue border-t border-white/10 py-6 px-6 lg:px-14">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span
          className="font-body text-coastal-blue"
          style={{ fontSize: '12px' }}
        >
          &copy; {year}
        </span>
        <span
          className="font-body text-coastal-blue"
          style={{ fontSize: '12px' }}
        >
          {caption}
        </span>
      </div>
    </footer>
  );
}
