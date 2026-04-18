import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonClass } from './classes';
import type { ButtonVariant, ButtonSize } from './classes';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  /** Extra classes appended after the variant recipe — use sparingly. */
  extraClassName?: string;
};

/**
 * On-brand button. Three variants cover every internal-tool need:
 *  - `primary` — filled coastal-blue with white text; hovers to deep-blue
 *  - `secondary` — outlined coastal-blue; hovers to inverse
 *  - `ghost` — text-only coastal-blue link-button
 *
 * All variants use the shared utility-mode letter-spacing dialect
 * (`tracking-wider`) so buttons across apps behave identically.
 *
 * For non-button elements (e.g. an `<a>` styled as a button), use
 * `buttonClass(variant, size)` from '@ui/classes' directly.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  extraClassName,
  children,
  ...rest
}: ButtonProps) {
  const cls =
    buttonClass(variant, size) + (extraClassName ? ` ${extraClassName}` : '');
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
