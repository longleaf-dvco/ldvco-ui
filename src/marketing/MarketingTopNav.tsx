import { useEffect, useState } from 'react';
import { wordmark } from '../brand/tokens';

export type MarketingNavLink = {
  /** Shown in uppercase via CSS — pass natural casing. */
  label: string;
  href: string;
};

export type MarketingNavCTA = MarketingNavLink;

export type MarketingTopNavProps = {
  /** Primary nav links. Rendered right-aligned on desktop. */
  links: MarketingNavLink[];
  /** Optional filled CTA at the end of the desktop nav (e.g. "Contact"). */
  cta?: MarketingNavCTA;
  /** Href the wordmark links to. Default '#'. */
  wordmarkHref?: string;
  /** Scroll position (px) at which nav swaps to blurred-white. Default 80. */
  scrollThreshold?: number;
};

/**
 * Canonical Longleaf marketing header. Fixed, transparent over the hero,
 * swaps to blurred white once the user scrolls past `scrollThreshold`.
 * Matches `longleafdvco.com` pixel-for-pixel; do not fork.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ LONGLEAF          About  Residential  Industrial  [CONTACT] │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Mobile (< md) collapses to a hamburger that opens a full-screen
 * editorial menu overlay.
 *
 * The `LONGLEAF` wordmark pulls its 3.5px letter-spacing from `brand.ts`
 * — the single source of truth. Internal-tool apps use 2.5px and a
 * different shell (`AppShell`); don't mix.
 */
export default function MarketingTopNav({
  links,
  cta,
  wordmarkHref = '#',
  scrollThreshold = 80,
}: MarketingTopNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    document.body.style.overflow = mobOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobOpen]);

  const bgClass = scrolled ? 'backdrop-blur-xl' : '';
  const wordmarkColor = scrolled ? 'text-deep-blue' : 'text-white';
  const linkColor = scrolled
    ? 'text-oyster hover:text-deep-blue'
    : 'text-white/70 hover:text-white';
  const hamburgerColor = scrolled ? 'bg-deep-blue' : 'bg-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14 h-16 lg:h-20 transition-all duration-300 ${bgClass}`}
        style={scrolled ? { backgroundColor: 'rgba(255,255,255,.92)' } : undefined}
      >
        <a
          href={wordmarkHref}
          className={`font-ui font-bold text-sm uppercase ${wordmarkColor} transition-colors`}
          style={wordmark.marketing}
        >
          LONGLEAF
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-ui font-semibold uppercase ${linkColor} transition-colors`}
              style={{ fontSize: '12px', letterSpacing: '0.5px' }}
            >
              {l.label}
            </a>
          ))}
          {cta && (
            <a
              href={cta.href}
              className="font-ui font-semibold uppercase bg-coastal-blue text-white px-5 py-2.5 hover:bg-deep-blue transition-colors"
              style={{ fontSize: '12px', letterSpacing: '0.5px' }}
            >
              {cta.label}
            </a>
          )}
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobOpen(true)}
          aria-label="Open menu"
        >
          {[24, 24, 16].map((w, i) => (
            <span
              key={i}
              className={`block h-0.5 ${hamburgerColor} transition-colors`}
              style={{ width: w }}
            />
          ))}
        </button>
      </nav>

      {mobOpen && (
        <div
          className="fixed inset-0 z-[60] bg-deep-blue flex flex-col items-center justify-center gap-8 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setMobOpen(false)}
            aria-label="Close menu"
            className="absolute top-5 right-6 text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobOpen(false)}
              className="font-editorial text-2xl text-white"
            >
              {l.label}
            </a>
          ))}
          {cta && (
            <a
              href={cta.href}
              onClick={() => setMobOpen(false)}
              className="font-editorial text-2xl text-white"
            >
              {cta.label}
            </a>
          )}
        </div>
      )}
    </>
  );
}
