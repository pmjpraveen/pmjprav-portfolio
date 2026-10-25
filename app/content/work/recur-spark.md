## Summary

Spark is a revenue-based financing product inside Recur. It lets startups borrow against their own recurring contracts and invoicing data instead of selling equity. I designed the onboarding, verification and approval flow. Banks traditionally take weeks to underwrite a company like this. Spark made it a same-day application, with capital released in as little as two days.

![Spark, the revenue-based financing product inside Recur](/projects/recur-spark/hero.webp "Spark, inside Recur. Click to enlarge.")

## Context

::: rows
Company | Recur, financial software
My role | Onboarding, verification and approval flow
:::

Recur set out to build an alternative to equity. Spark was its first product: growth capital against revenue a founder has already earned, delivered fast enough to match how quickly founders need to move.

## Problem

**Founders had one financing lever: equity.** Talking to founders and reviewing the market, one pattern kept surfacing: dilution was treated as the only lever, so most early-stage capital stacks leaned almost entirely on equity, at every stage and not just at seed.

Equity is expensive in two ways. Founders give away ownership, and every raise takes months of their time and attention away from the business. And because the startups raising the biggest rounds are treated as winners, single-digit founder ownership had become a normal measure of success.

The usual non-dilutive alternative, bank debt, mostly wasn't available to this group. Banks weren't equipped to underwrite asset-light, subscription-revenue businesses: their models were built for collateral, not recurring contracts.

**The gap:** there was almost no fast, founder-friendly alternative built for how modern, asset-light companies earn revenue.

## Goals

The brief: a platform that gives founders non-dilutive capital. It should feel founder-friendly rather than extractive, and help founders grow sustainably instead of trading long-term ownership for short-term runway.

The north star was speed: a founder should raise through Spark and have usable cash within two days, not the weeks a bank would take. The longer-term vision was to turn Recur into an exchange for recurring revenue contracts, giving companies the best financing terms and the insight to scale.

## Research

This project was constrained by speed, so there was no long discovery phase. The research we had time for aimed at three questions. Where does the product create real value for the business and for founders? How do a handful of direct and indirect competitors approach the problem? And what does fundraising feel like for the founders we could talk to directly?

An early brainstorm with the team mapped a simple onboarding shape and surfaced two problems straight away. The underwriting team would face real complexity working through founder-submitted documents, and the journey from onboarding to funded capital was already running past seven days end to end.

Two decisions came directly out of that:

- Automate the steps that add time without adding judgement.
- Don't make founders wait while underwriting works. Release a smaller amount of capital immediately, so the wait stops being the bottleneck a founder feels.

## Requirements

**User stories**

- Get onboarded with minimal company detail up front.
- Access upfront capital while documents are still being verified.
- Offer contracts as collateral to raise against.
- Choose flexible payout options.
- See a clear report card of company and account performance.

**Constraints**

- Applicants need to supply real financial data, with no shortcuts.
- Upfront capital is capped at ₹5L until full company verification clears.
- Authorised signatory and KYC verification are mandatory, with no exceptions.
- HNI investors with under ₹25L in investable capital can't be onboarded.

## Mapping the flow

Before designing any single screen, I mapped the full path a company takes from signup to funded capital, including the underwriting handoff and the HNI-investor side of the marketplace. Spark had to work for both sides of the exchange at once.

![The flow from signup to funded capital](/projects/recur-spark/flow-map.webp "End-to-end flow, from signup to funded capital. Click to enlarge.")

## The solution

Three moments carry the whole experience.

### Company onboarding

Onboarding asks for the minimum needed to start: business details, a management information summary, and 24 months of financial statements. Companies then connect invoicing data from the billing tool they already use, such as Zoho, QuickBooks or Razorpay, and link 24 months of contracting data and bank accounts. Every requirement is visible up front, so nothing surprises a founder mid-flow.

![Company onboarding](/projects/recur-spark/onboarding.webp "Company onboarding.")

### Capital while you wait

This answers the research finding. Once financial and company information is submitted, the platform estimates the business's worth and unlocks an upfront amount straight away, to use while underwriting verifies the rest. The founder is never just waiting.

![Capital while you wait](/projects/recur-spark/capital-while-you-wait.webp "Upfront capital, unlocked while underwriting continues.")

### Approved terms

Once signatory and KYC details clear, the company gets its full terms in one clear reveal: trading limit, trade price, tenure and fees. A plain-language explainer sits beside the number that matters most, so it can't be misread.

![Approved terms](/projects/recur-spark/approved-terms.webp "Approved terms.")

## Validating the design

**Horizontal felt organised. Vertical actually worked.** The onboarding wizard was the highest-stakes screen in the product, because it is where founders hand over the data everything else depends on. We tested a horizontal step navigation against a vertical one, since horizontal was the more conventional default going in.

![Onboarding wizard layouts](/projects/recur-spark/concept-directions.webp "Onboarding wizard layouts explored. Click to enlarge.")

Users completed the flow with less friction and fewer backtracks when the steps were vertical, and participants said they preferred it. The behaviour and the stated preference agreed.

The reason was visibility. A vertical layout let founders see what was still ahead at a glance, instead of holding that picture in their heads. For a flow that asks for financial documents, lowering that load mattered more than the horizontal pattern's more polished first impression. I had also explored a lighter, more spacious layout against a denser, sidebar-led one, and the calmer one won, because a quieter register builds more trust when people are handing over sensitive financial data.
