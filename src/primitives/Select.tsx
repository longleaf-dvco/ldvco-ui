import type { SelectHTMLAttributes } from 'react';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectSize = 'md' | 'sm';

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'className' | 'size' | 'children'
> & {
  options: SelectOption[];
  /** `md` (default) or `sm` for dense filter rows. */
  size?: SelectSize;
};

const SIZE_PAD: Record<SelectSize, string> = {
  md: 'pl-0 pr-6 py-1 text-sm',
  sm: 'pl-0 pr-5 py-0.5 text-[13px]',
};

/**
 * Utility-mode dropdown. Transparent background, bottom border only —
 * the select reads as a line to pick from, not a boxed control stuck
 * on top of the page.
 *
 * Rest:  sand underline, no box, inherits page bg.
 * Hover: underline → oyster.
 * Focus: underline → coastal-blue.
 *
 * Appearance is stripped so the chevron is the same on every OS.
 */
export default function Select({
  options,
  size = 'md',
  disabled,
  ...rest
}: SelectProps) {
  return (
    <span className="relative block w-full">
      <select
        disabled={disabled}
        className={`w-full appearance-none bg-transparent border-0 border-b border-sand hover:border-oyster focus:border-coastal-blue focus:outline-none font-ui text-driftwood disabled:opacity-50 disabled:hover:border-sand transition-colors ${SIZE_PAD[size]}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-oyster" />
    </span>
  );
}

export type SelectFieldProps = SelectProps & {
  /** Uppercase eyebrow label shown above the select. */
  label: string;
};

/**
 * Label + Select combo for filter bars and inline forms. Label is a
 * small uppercase eyebrow stacked above — matches the column-header
 * dialect so a filter bar reads like a row of table columns you can
 * narrow by.
 *
 *   TRANSACTION
 *   All ▾
 */
export function SelectField({ label, ...selectProps }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-0.5">
      <span
        className="font-ui uppercase text-oyster"
        style={{ fontSize: '10px', letterSpacing: '1.5px' }}
      >
        {label}
      </span>
      <Select {...selectProps} />
    </label>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
