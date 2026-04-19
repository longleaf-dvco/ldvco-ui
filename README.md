# @longleaf/ui

Design components and chrome contracts shared across every Longleaf
surface. Three tiers, explicitly separated — see [Tiers](#tiers) below.

## What lives here vs. UI-INTERFACE.md

`UI-INTERFACE.md` (in the LDVCO IAM Workspace) is the **brand kit** —
color palette, type stack, voice, global rules (no rounding, no
shadows), the things every Longleaf surface (public marketing,
external deals, internal tools) shares.

This package is **app design** — the specific React components and
chrome contracts used to build Longleaf apps across all three tiers.
It assumes `UI-INTERFACE.md` tokens (colors, fonts, Tailwind config)
are already wired up in the consuming app.

## Consumption

Added as a git submodule at `ui/` in each consuming app:

```bash
git submodule add git@github.com:longleaf-dvco/ldvco-ui.git ui
git commit -m "Add ldvco-ui submodule"
```

Consumers wire a path alias so imports read cleanly:

```ts
// vite.config.ts
resolve: {
  alias: { '@ui': path.resolve(__dirname, 'ui/src') }
}

// tsconfig.json
"paths": {
  "@ui": ["./ui/src/index.ts"],
  "@ui/*": ["./ui/src/*"]
}
```

**Critical — Tailwind content paths.** Tailwind only generates utility
CSS for class names it finds in files listed in `content`. Add the
submodule path or every responsive utility used inside @longleaf/ui
components (`lg:w-64`, `lg:flex-row`, `lg:min-h-screen`, etc.) gets
purged and the sidebar collapses to its mobile layout at every viewport
width:

```ts
// tailwind.config.ts
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './ui/src/**/*.{ts,tsx}',  // ← required, easy to forget
  ],
  // ...
};
```

Then:

```tsx
import { AppShell, PageHeader, Button } from '@ui';     // flat barrel
import { MarketingTopNav } from '@ui/marketing';        // tier-scoped
import { Button } from '@ui/primitives';
import { colors, wordmark } from '@ui/brand';
```

Both import styles work. Prefer tier-scoped in code review — seeing
`@ui/internal` in a project-site file is an obvious smell.

## Tiers

Three tiers of surface, all share the same palette, fonts, and
no-rounding/no-shadow rules. What differs is **chrome** (nav + footer)
and **density**. The `src/` tree makes the separation literal:

| Tier | Folder | Lives at | Audience | Chrome |
|---|---|---|---|---|
| **Public marketing** | `src/marketing/` | `longleafdvco.com` | Open web, prospects, general public | Assertive: 3.5px wordmark, fixed nav with transparent-over-hero + blurred-white scrolled state |
| **Project** | `src/project/` + `src/marketing/` | `retreat.longleafdvco.com`, `preserve.longleafdvco.com`, `indigo.longleafdvco.com`, `bayberry.longleafdvco.com` | Customers/partners of a specific development | **Same chrome as public.** "Subdued" applies to body density and motion, not the header/footer |
| **Internal tools** | `src/internal/` | `admin.ldvco.com`, `launcher.ldvco.com`, `ops.ldvco.com`, `pipeline.ldvco.com` | Longleaf team, behind auth | Utility: 2.5px wordmark, sidebar-dominant shell, hidden interactive chrome at rest |

Cross-tier folders (both `brand/` and `primitives/` are safe to import
from any tier):

| Folder | What's there | Used by |
|---|---|---|
| `src/brand/` | Palette, fonts, wordmark presets, Tailwind preset, `base.css` reset | All tiers |
| `src/primitives/` | `Button`, `EmptyState`, `ErrorBanner`, `cn`/`buttonClass`/`sidebarItemClass` helpers | All tiers |

### Why "project" and not "microsite"?

"Microsite" is generic marketing jargon. "Deal room" overloads the
pipeline app's concept of a deal (an in-flight transaction). The
canonical Longleaf term across `projects.json`, the Projects section
on the public site, and the property names themselves is **project**.
A project site is the per-development surface — one per named
development (Retreat, Preserve, Indigo, Bayberry).

### How the "subdued private side" is achieved

Project sites are NOT a forked, quieter copy of the public marketing
site. They are:

1. The **same `MarketingTopNav` + `MarketingFooter`** as the public site
   — imported verbatim from `@ui/marketing`. Zero drift by construction.
2. A **subdued body** — this is what "private side" actually means. Quieter
   hero (smaller wordmark, less motion, no clamp-to-90px), denser content
   density, less marketing copy, more specifics. Lives in `src/project/`
   (currently empty; grows as we extract shared project patterns).

If a project site's header or footer doesn't match the public site,
that's a bug, not a design choice.

## v0.1 surface

| Component | Tier | Purpose |
|---|---|---|
| `MarketingTopNav` | `marketing` | Canonical public-tier header. Fixed, transparent-over-hero, swaps to blurred white on scroll. Used on public site AND every project site. |
| `MarketingFooter` | `marketing` | Canonical public-tier footer. Thin `bg-deep-blue` strip, `© {year}` · caption. Used on public site AND every project site. |
| `AppShell` | `internal` | Three-zone sidebar shell: branding / nav / signed-in footer + main content. |
| `SidebarSection` + `sidebarItemClass` helper | `internal` | Nav slot building blocks. Supports `<NavLink>`, `<a>`, `<button>` children via a className helper. |
| `PageHeader` | `internal` | Top-of-page. Two variants: `editorial` (eyebrow + H1) and `utilitarian` (H1 + subtitle). 28px Libre Baskerville — utility-mode sized. |
| `Button` | `primitives` | Primary / secondary / ghost variants. Consistent letter-spacing dialect (`tracking-wider`). |
| `EmptyState` | `primitives` | "No data yet" messaging — consistent language across pages. |
| `ErrorBanner` | `primitives` | Dismissible red banner for operation failures. |

(`src/project/` is intentionally empty at v0.1 — project sites use
marketing chrome and roll their own body components until shared
patterns emerge.)

## Project chrome contract

Project sites (Retreat, Preserve, Indigo, Bayberry — see the
[Tiers](#tiers) section) must render header and footer **identical to
`longleafdvco.com`**. The public site is the source of truth. When a
project site looks "less refined" than the public site, it's almost
always because someone hand-rolled the chrome and drifted — import the
shared components below.

Preferred: import `MarketingTopNav` and `MarketingFooter` from this
package — they encode the contract so project sites can't drift:

```tsx
import { MarketingTopNav, MarketingFooter } from '@ui/marketing';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingTopNav
        links={[
          { label: 'About',       href: '#about' },
          { label: 'Residential', href: '#residential' },
          { label: 'Industrial',  href: '#industrial' },
          { label: 'Projects',    href: '#projects' },
        ]}
        cta={{ label: 'Contact', href: '#contact' }}
      />
      {children}
      <MarketingFooter />
    </>
  );
}
```

The snippets below document what the components render — use them to
audit an existing project site, or as a starting point if you genuinely
cannot import from `@ui` (submodule not wired yet). **Do not** fork the
components into a project-local copy; fix the contract here instead.

### Rule: stacked wordmark is hero-only

`longleafdvco.com` uses the stacked `LONGLEAF` + `DEVELOPMENT CO.` wordmark
in **exactly one place — the hero**. It is **never** in the header and
**never** in the footer. If a project site's footer has a large `LONGLEAF`
with `DEVELOPMENT CO.` underneath, that is the bug: delete it and use the
canonical footer below. The mis-sized look people report is this element
being staged somewhere it doesn't belong.

| Element | Where it appears | Size |
|---|---|---|
| Nav wordmark | Header, every page | `text-sm` (14px), 3.5px tracking |
| Hero stacked wordmark | Hero, landing page only | `clamp(40px,10vw,90px)` + `clamp(11px,2vw,18px)` subtitle |
| Contact-block wordmark | Contact section only, standalone | 48px, 4px tracking, no subtitle |
| Footer | Every page | **text only — no wordmark** |

### Canonical header

Fixed, transparent-over-hero, swaps to blurred white once the user scrolls
past 80px. Mobile collapses to a full-screen editorial menu.

```tsx
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { document.body.style.overflow = mob ? 'hidden' : ''; }, [mob]);

  const bg = scrolled ? 'backdrop-blur-xl' : '';
  const tx = scrolled ? 'text-deep-blue' : 'text-white';
  const lk = scrolled ? 'text-oyster hover:text-deep-blue' : 'text-white/70 hover:text-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14 h-16 lg:h-20 transition-all duration-300 ${bg}`}
        style={scrolled ? { backgroundColor: 'rgba(255,255,255,.92)' } : {}}
      >
        <a
          href="#"
          className={`font-ui font-bold text-sm uppercase ${tx} transition-colors`}
          style={{ letterSpacing: '3.5px' }}
        >
          LONGLEAF
        </a>
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`font-ui font-semibold uppercase ${lk} transition-colors`}
              style={{ fontSize: '12px', letterSpacing: '0.5px' }}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="font-ui font-semibold uppercase bg-coastal-blue text-white px-5 py-2.5 hover:bg-deep-blue transition-colors"
            style={{ fontSize: '12px', letterSpacing: '0.5px' }}
          >
            CONTACT
          </a>
        </div>
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMob(true)}
          aria-label="Menu"
        >
          {[24, 24, 16].map((w, i) => (
            <span
              key={i}
              className={`block h-0.5 ${scrolled ? 'bg-deep-blue' : 'bg-white'} transition-colors`}
              style={{ width: w }}
            />
          ))}
        </button>
      </nav>
      {/* Mobile overlay uses font-editorial text-2xl links — see longleafdvco.com/index.html */}
    </>
  );
}
```

Locked values — do not "improve":

| Property | Value |
|---|---|
| Height | `h-16` mobile (64px), `h-20` desktop (80px) |
| Horizontal padding | `px-6` mobile, `lg:px-14` desktop |
| Position | `fixed top-0 left-0 right-0 z-50` |
| Over-hero state | transparent bg, `text-white` wordmark, `text-white/70` links |
| Scrolled state | `backdrop-blur-xl`, bg `rgba(255,255,255,.92)`, `text-deep-blue` wordmark, `text-oyster` links |
| Scroll threshold | 80px |
| Wordmark | `font-ui font-bold text-sm uppercase`, inline `letterSpacing: '3.5px'` |
| Nav links | `font-ui font-semibold uppercase`, 12px, 0.5px tracking, `gap-9` |
| Contact CTA | `bg-coastal-blue` → hover `bg-deep-blue`, `px-5 py-2.5`, 12px / 0.5px |
| Mobile hamburger | three bars, widths **24 / 24 / 16** (the asymmetry is intentional) |

### Canonical footer

One thin dark strip at the bottom. Text only. No wordmark, no logo, no
stacked elements.

```tsx
function Footer() {
  return (
    <footer className="bg-deep-blue border-t border-white/10 py-6 px-6 lg:px-14">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-body text-coastal-blue" style={{ fontSize: '12px' }}>
          &copy; {new Date().getFullYear()}
        </span>
        <span className="font-body text-coastal-blue" style={{ fontSize: '12px' }}>
          Longleaf Development Co.
        </span>
      </div>
    </footer>
  );
}
```

Locked values:

| Property | Value |
|---|---|
| Background | `bg-deep-blue` |
| Top border | `border-t border-white/10` |
| Vertical padding | `py-6` |
| Horizontal padding | `px-6 lg:px-14` |
| Inner layout | `max-w-5xl mx-auto flex items-center justify-between` |
| Text | `font-body text-coastal-blue`, inline `fontSize: '12px'` |
| Left | `© {year}` |
| Right | `Longleaf Development Co.` |

### Project chrome PR audit

Before merging a new project site, grep for these tells of drift:

- [ ] Header wordmark uses `letterSpacing: '3.5px'` (not `2.5px` — that's internal-tools)
- [ ] Header has the 80px scroll threshold + `backdrop-blur-xl` swap
- [ ] Over-hero state is transparent; scrolled state is `rgba(255,255,255,.92)`
- [ ] Mobile hamburger bars are **24 / 24 / 16**, not three equal bars
- [ ] Footer has **no** `LONGLEAF` text, **no** stacked wordmark, **no** logo
- [ ] Footer is `py-6` (not `py-12`, not `py-24` — it's a strip, not a section)
- [ ] Footer text is 12px `text-coastal-blue` on `bg-deep-blue`
- [ ] Stacked `LONGLEAF` + `DEVELOPMENT CO.` appears only in the hero, if at all

---

## Vercel submodule builds

Each consuming app's Vercel project needs "Include source files
outside of the Root Directory" enabled, and the build command set
to include `git submodule update --init`. Alternatively, set
`VERCEL_GITHUB_DEPLOY_KEY` so Vercel's build machine can clone
the submodule directly.

For the `longleaf-development-co` team, the standard setup uses the
existing Vercel GitHub integration — the same GitHub App authorized
for the parent repo can read the submodule repo because both live
in the `longleaf-dvco` org.
