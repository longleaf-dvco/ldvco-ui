import type { ReactNode } from 'react';

export type EmptyStateProps = {
  /** Short heading — e.g. "No deals yet." */
  title: string;
  /** Optional second sentence giving context or next-step hint. */
  hint?: string;
  /** Optional call-to-action (typically a Button). */
  action?: ReactNode;
};

/**
 * Consistent "nothing here yet" block. Stays quiet: a short sentence on
 * white with a subtle border, optional hint underneath, optional action.
 *
 * Use whenever a list, table, or dashboard surface has no rows to show
 * — priorities page when empty, deals list when filtered to zero, etc.
 */
export default function EmptyState({ title, hint, action }: EmptyStateProps) {
  return (
    <div className="border border-sand bg-white px-6 py-10 text-center">
      <p className="font-ui text-sm text-driftwood">{title}</p>
      {hint && <p className="font-ui text-xs text-oyster mt-1">{hint}</p>}
      {action && <div className="mt-4 inline-flex">{action}</div>}
    </div>
  );
}
