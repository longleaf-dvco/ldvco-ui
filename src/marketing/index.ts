// Marketing tier — public-facing chrome. Shared verbatim between
// longleafdvco.com and project sites (Retreat, Preserve, Indigo, ...).
// The "subdued" feel of a project site comes from its body components,
// not from the nav/footer — those match the public site pixel-for-pixel.

export { default as MarketingTopNav } from './MarketingTopNav';
export type {
  MarketingTopNavProps,
  MarketingNavLink,
  MarketingNavCTA,
} from './MarketingTopNav';

export { default as MarketingFooter } from './MarketingFooter';
export type { MarketingFooterProps } from './MarketingFooter';
