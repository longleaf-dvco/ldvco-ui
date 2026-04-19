import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type InputSize = 'md' | 'sm';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size'
> & {
  size?: InputSize;
};

const INPUT_SIZE: Record<InputSize, string> = {
  md: 'py-1 text-sm',
  sm: 'py-0.5 text-[13px]',
};

const UNDERLINE_CLASS =
  'w-full bg-transparent border-0 border-b border-sand hover:border-oyster focus:border-coastal-blue focus:outline-none font-ui text-driftwood placeholder:text-oyster/50 disabled:opacity-50 disabled:hover:border-sand transition-colors px-0';

/**
 * Utility-mode text input. Matches `Select`: no box, bottom border
 * only, transparent bg, focus swaps the underline to coastal-blue.
 *
 * Reads as "a line to write on" — flush left, no padding, no frame
 * competing for attention. Stack several in a form and you get the
 * feel of filling out a sheet, not filling out boxes.
 *
 * All native `<input>` attributes pass through except `className`.
 * For size variants, pass `size="sm"` (13px, tighter line) or omit
 * for the default (14px).
 */
export default function Input({ size = 'md', ...rest }: InputProps) {
  return <input className={`${UNDERLINE_CLASS} ${INPUT_SIZE[size]}`} {...rest} />;
}

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
>;

/**
 * Utility-mode multi-line input. Same underline aesthetic as `Input`
 * — no frame, grows vertically with `rows`. Resize is disabled by
 * default; pass your own `style` to override.
 */
export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className={`${UNDERLINE_CLASS} py-1 text-sm resize-none`}
      {...props}
    />
  );
}

export type InputFieldProps = InputProps & {
  /** Uppercase eyebrow label shown above the input. */
  label: string;
};

/**
 * Label + Input combo. Same stacked layout as `SelectField` so forms
 * and filter bars read as one rhythm.
 *
 *   COUNTERPARTY
 *   ___________________
 */
export function InputField({ label, ...inputProps }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-0.5">
      <span
        className="font-ui uppercase text-oyster"
        style={{ fontSize: '10px', letterSpacing: '1.5px' }}
      >
        {label}
      </span>
      <Input {...inputProps} />
    </label>
  );
}
