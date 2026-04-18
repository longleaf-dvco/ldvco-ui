export type ErrorBannerProps = {
  /** The error message to show. Falsy renders nothing. */
  message: string | null | undefined;
  /** Called when the user clicks "dismiss". If absent, no dismiss button. */
  onDismiss?: () => void;
};

/**
 * Dismissible red banner for operation failures. Kept intentionally
 * spartan — the goal is to surface the error clearly without competing
 * with the page content.
 *
 * Every async action in every internal tool should catch and funnel its
 * error into one of these rather than alert() or console.error.
 */
export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="font-ui text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-2 mb-6 flex items-start gap-3"
    >
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="font-ui text-xs uppercase tracking-wider text-red-700 hover:text-red-900"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
