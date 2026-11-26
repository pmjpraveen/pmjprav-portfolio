## Overview

Spark is a revenue-based financing product inside Recur. It lets startups borrow against their own recurring contracts and invoicing data instead of selling equity. I designed the onboarding, verification and approval flow.

**Short on time?** Read this overview, the table that opens the solution, and What changed.

::: stats
Same day | application, where a bank takes weeks
2 days | to usable capital, at the fastest
₹5L | released up front, while underwriting verifies the rest
:::

::: rows
Company | Recur, financial software
Product | Spark, Recur's first product: growth capital against revenue a founder has already earned
My role | Onboarding, verification and approval flow
Platform | Web app
:::

![Spark, the revenue-based financing product inside Recur](/projects/recur-spark/hero.webp "Spark, inside Recur. Click to enlarge.")

## One lever, and it was equity | The challenge

Talking to founders and reviewing the market, one pattern kept surfacing: dilution was treated as the only lever. Most early-stage capital stacks leaned almost entirely on equity, at every stage, not just at seed.

![Equity, bank debt and the gap between them](/projects/recur-spark/illus-options.png "Illustration · Founders had one real lever, and it was expensive.")

::: rows
Equity's cost | Founders give away ownership, and every raise takes months of their time and attention away from the business.
Bank debt | Banks weren't equipped to underwrite asset-light, subscription-revenue businesses. Their models were built for collateral, not recurring contracts.
The gap | Almost no fast, founder-friendly alternative existed for how modern, asset-light companies earn revenue.
:::

## What Spark had to be | Goals

::: rows
The brief | A platform that gives founders non-dilutive capital.
How it should feel | Founder-friendly rather than extractive, helping founders grow sustainably instead of trading long-term ownership for short-term runway.
North star | Speed. A founder should raise through Spark and have usable cash within two days, not the weeks a bank would take.
Longer term | Turn Recur into an exchange for recurring revenue contracts, giving companies the best financing terms and the insight to scale.
:::

## Research on a deadline | Research

The project was constrained by speed, so there was no long discovery phase. The research we had time for aimed at three questions.

::: rows
Value | Where does the product create real value for the business and for founders?
Competitors | How do a handful of direct and indirect competitors approach the problem?
Founders | What does fundraising feel like for the founders we could talk to directly?
:::

An early brainstorm with the team mapped a simple onboarding shape, and two problems surfaced straight away.

![Two problems from the brainstorm, and the decision each one set](/projects/recur-spark/illus-decisions.png "Illustration · Each problem set a decision.")

## What it had to do | Requirements

**User stories.** What a founder needed to be able to do.

::: rows
Start light | Get onboarded with minimal company detail up front.
Capital early | Access upfront capital while documents are still being verified.
Collateral | Offer contracts as collateral to raise against.
Payouts | Choose flexible payout options.
Report card | See a clear report card of company and account performance.
:::

**Constraints.** What the design could not bend.

::: rows
Real data | Applicants supply real financial data, with no shortcuts.
Upfront cap | Upfront capital is capped at ₹5L until full company verification clears.
Verification | Authorised signatory and KYC verification are mandatory, with no exceptions.
Investors | HNI investors with under ₹25L in investable capital can't be onboarded.
:::

## From signup to funded capital | User flow

Before designing any single screen, I mapped the full path a company takes from signup to funded capital, including the underwriting handoff and the HNI-investor side of the marketplace. Spark had to work for both sides of the exchange at once.

![The first shape: onboard, review, terms, then capital, over more than seven days](/projects/recur-spark/illus-flow-before.png "User flow · The first shape. The founder waited for everything.")

![The new flow: upfront capital is unlocked while underwriting verifies](/projects/recur-spark/illus-flow-after.png "User flow · After. Dark steps are new.")

![The full flow map from signup to funded capital](/projects/recur-spark/flow-map.webp "The full flow map, from signup to funded capital. Click to enlarge.")

## Three moments carry it | Solution

::: rows
Problem | Founders waited more than seven days for any capital, while underwriting worked through their documents.
Decision | Ask for the minimum, connect the data founders already have, and release capital before verification finishes.
Outcome | A same-day application, with capital released in as little as two days.
:::

### Company onboarding
Onboarding asks for the minimum needed to start: business details, a management information summary, and 24 months of financial statements. Companies then connect invoicing data from the billing tool they already use, such as Zoho, QuickBooks or Razorpay, and link 24 months of contracting data and bank accounts. Every requirement is visible up front, so nothing surprises a founder mid-flow.

![Company onboarding](/projects/recur-spark/onboarding.webp "Company onboarding. Every requirement is visible up front.")

### Capital while you wait
This answers the brainstorm's second problem. Once financial and company information is submitted, the platform estimates the business's worth and unlocks an upfront amount straight away, to use while underwriting verifies the rest. The founder is never just waiting.

![Capital while you wait](/projects/recur-spark/capital-while-you-wait.webp "Upfront capital, unlocked while underwriting continues.")

### Approved terms
Once signatory and KYC details clear, the company gets its full terms in one clear reveal: trading limit, trade price, tenure and fees. A plain-language explainer sits beside the number that matters most, so it can't be misread.

![Approved terms](/projects/recur-spark/approved-terms.webp "Approved terms, with an explainer beside the key number.")

## Horizontal or vertical | Testing

::: rows
Question | The onboarding wizard is where founders hand over the data everything else depends on. Which step navigation works best?
Tested | A horizontal step navigation against a vertical one. Horizontal was the conventional default going in.
Result | With vertical steps, users completed the flow with less friction and fewer backtracks, and said they preferred it.
:::

![Horizontal steps against vertical steps, with vertical chosen](/projects/recur-spark/illus-wizard.png "Illustration · The behaviour and the stated preference agreed.")

![Onboarding wizard layouts explored](/projects/recur-spark/concept-directions.webp "Onboarding wizard layouts explored. Click to enlarge.")

The reason was visibility. A vertical layout let founders see what was still ahead at a glance, instead of holding that picture in their heads. For a flow that asks for financial documents, lowering that load mattered more than the horizontal pattern's more polished first impression.

I also explored a lighter, more spacious layout against a denser, sidebar-led one. The calmer one won, because a quieter register builds more trust when people are handing over sensitive financial data.

## What changed | Impact

![Weeks at a bank, against a same-day application and capital in as little as two days](/projects/recur-spark/illus-speed.png "Illustration · From weeks to days.")

::: rows
Application | Same day, where banks traditionally take weeks to underwrite a company like this.
Capital | Released in as little as two days, against more than seven in the first shape.
While waiting | Upfront capital, up to ₹5L, available while documents are still being verified.
:::

## Reflection

::: rows
Speed is a design material | The biggest decision wasn't a screen. It was releasing capital before verification finished, so the wait stopped being the bottleneck a founder feels.
Automate what adds time, not judgement | Underwriting kept its judgement; the steps around it got faster.
Visibility beats convention | Vertical steps tested better than the familiar horizontal pattern, because founders could see what was ahead.
Calm builds trust | When people hand over financial data, a quieter layout earns more trust than a dense one.
:::
