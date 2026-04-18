# @longleaf/ui

App-design components and chrome contracts shared across Longleaf
apps — internal tools (Operations, admin, marketing, pipeline) and
private-tier microsites (deal rooms, property sites).

## What lives here vs. UI-INTERFACE.md

`UI-INTERFACE.md` (in the LDVCO IAM Workspace) is the **brand kit** —
color palette, type stack, voice, global rules (no rounding, no
shadows), the things every Longleaf surface (public marketing,
external deals, internal tools) shares.

This package is **app design** — the specific React components and
chrome contracts used to build Longleaf apps (internal tools **and**
private-tier microsites). It assumes `UI-INTERFACE.md` tokens (colors,
fonts, Tailwind config) are already wired up in the consuming app.

Microsites are a subdued/private version of `longleafdvco.com`, but
"subdued" applies to content density and motion — **not** the chrome.
Header and footer must match the public site pixel-for-pixel; see
[Microsite chrome contract](#microsite-chrome-contract) below.

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

Then:

```tsx
import { AppShell, PageHeader, Button } from '@ui';
```

## v0.1 surface

| Component | Purpose |
|---|---|
| `AppShell` | Three-zone shell: branding / nav / signed-in footer + main content. Every internal app wraps in this. |
| `SidebarSection` + `SidebarItem` (styles helper) | Nav slot building blocks. Supports `<NavLink>`, `<a>`, `<button>` children via a className helper. |
| `PageHeader` | Top-of-page. Two variants: `editorial` (eyebrow + H1) and `utilitarian` (H1 + subtitle). |
| `Button` | Primary / secondary / ghost variants. Consistent letter-spacing dialect (`tracking-wider`). |
| `EmptyState` | "No data yet" messaging — consistent language across pages. |
| `ErrorBanner` | Dismissible red banner for operation failures. |

## Microsite chrome contract

The private-tier microsites (deal rooms, property microsites like Retreat /
Preserve / Indigo / Bayberry) must render header and footer **identical to
`longleafdvco.com`**. The public site is the source of truth. When the
microsite looks "less refined" than the public site, it's almost always
because someone hand-rolled the chrome and drifted — copy the snippets
below verbatim.

Shared components (`MarketingTopNav`, `MarketingFooter`) aren't in `v0.1`
yet. Until they ship, paste these snippets directly into each microsite.

### Rule: stacked wordmark is hero-only

`longleafdvco.com` uses the stacked `LONGLEAF` + `DEVELOPMENT CO.` wordmark
in **exactly one place — the hero**. It is **never** in the header and
**never** in the footer. If a microsite footer has a large `LONGLEAF` with
`DEVELOPMENT CO.` underneath, that is the bug: delete it and use the
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

### Microsite chrome PR audit

Before merging a new microsite, grep for these tells of drift:

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
