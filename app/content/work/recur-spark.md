## Founders had one real lever, and it was equity | 01 · Problem

Talking to founders and reviewing the market, one pattern kept surfacing: dilution was treated as the only lever. Most early-stage capital stacks leaned almost entirely on equity, at every stage, not just at seed.

![Equity, bank debt and the gap between them](/projects/recur-spark/illus-options.png "Illustration · Founders had one real lever, and it was expensive.")

1. **Equity is expensive.** Founders give away ownership, and every raise takes months of their time and attention away from the business.
2. **Bank debt was mostly out of reach.** Banks weren't equipped to underwrite asset-light, subscription-revenue businesses. Their models were built for collateral, not recurring contracts.
3. **Nothing filled the gap.** Almost no fast, founder-friendly alternative existed for how modern, asset-light companies earn revenue.

## Spark had to be fast, and feel founder-friendly | 02 · Goals

::: rows
The brief | A platform that gives founders non-dilutive capital.
How it should feel | Founder-friendly rather than extractive, helping founders grow sustainably instead of trading long-term ownership for short-term runway.
North star | Speed. A founder should raise through Spark and have usable cash within two days, not the weeks a bank would take.
Longer term | Turn Recur into an exchange for recurring revenue contracts, giving companies the best financing terms and the insight to scale.
:::

## The first shape already ran past seven days | 03 · Research

The project was constrained by speed, so there was no long discovery phase. The research we had time for looked at where the product creates value, how a handful of competitors approach the problem, and what fundraising feels like for the founders we could talk to. The full questions are in the appendix.

An early brainstorm with the team mapped a simple onboarding shape, and two problems surfaced straight away.

![Two problems from the brainstorm, and the decision each one set](/projects/recur-spark/illus-decisions.png "Illustration · Each problem set a decision.")

::: key-decision When founders get capital
Options | After underwriting finishes verifying everything · A smaller amount straight away, while underwriting works
Chose | A smaller amount straight away
Because | Onboarding to funded capital was already running past seven days end to end. Releasing some capital immediately stops the wait being the bottleneck a founder feels. Upfront capital is capped at ₹5L until full company verification clears.
:::

## Capital arrives while underwriting does its work | 04 · User flow

Before designing any single screen, I mapped the full path a company takes from signup to funded capital, including the underwriting handoff and the HNI-investor side of the marketplace. Spark had to work for both sides of the exchange at once. The full flow map is in the appendix.

![The first shape: onboard, review, terms, then capital, over more than seven days](/projects/recur-spark/illus-flow-before.png "User flow · The first shape. The founder waited for everything.")

![The new flow: upfront capital is unlocked while underwriting verifies](/projects/recur-spark/illus-flow-after.png "User flow · After. Dark steps are new.")

## Three moments carry the experience | 05 · Solution

::: rows
Problem | Founders waited more than seven days for any capital, while underwriting worked through their documents.
Decision | Ask for the minimum, connect the data founders already have, and release capital before verification finishes.
Outcome | A same-day application, with capital released in as little as two days.
:::

### Company onboarding
**Problem.** Underwriting faced real complexity working through founder-submitted documents.

**Solution.** Ask for the minimum needed to start: business details, a management information summary, and 24 months of financial statements. Companies then connect invoicing data from the billing tool they already use, such as Zoho, QuickBooks or Razorpay, and link 24 months of contracting data and bank accounts. Every requirement is visible up front, so nothing surprises a founder mid-flow.

![Company onboarding](/projects/recur-spark/onboarding.webp "Company onboarding. Every requirement is visible up front.")

### Capital while you wait
**Problem.** The journey to funded capital ran past seven days, and the founder felt every one of them.

**Solution.** Once financial and company information is submitted, the platform estimates the business's worth and unlocks an upfront amount straight away, to use while underwriting verifies the rest.

![Capital while you wait](/projects/recur-spark/capital-while-you-wait.webp "Upfront capital, unlocked while underwriting continues.")

### Approved terms
**Problem.** The terms are the number that matters most, and the easiest to misread.

**Solution.** Once signatory and KYC details clear, the company gets its full terms in one clear reveal: trading limit, trade price, tenure and fees. A plain-language explainer sits beside the number that matters most.

![Approved terms](/projects/recur-spark/approved-terms.webp "Approved terms, with an explainer beside the key number.")

## Vertical steps beat the conventional layout | 06 · Testing

The onboarding wizard is where founders hand over the data everything else depends on, so it was the highest-stakes screen in the product.

::: decision Horizontal or vertical steps
![Onboarding wizard layouts explored](/projects/recur-spark/concept-directions.webp "Onboarding wizard layouts explored. Click to enlarge.")
Options | Horizontal step navigation, the conventional default going in · Vertical step navigation
Chose | Vertical steps
Because | Users completed the flow with less friction and fewer backtracks, and said they preferred it. A vertical layout let founders see what was still ahead at a glance, instead of holding that picture in their heads.
:::

![Horizontal steps against vertical steps, with vertical chosen](/projects/recur-spark/illus-wizard.png "Illustration · The behaviour and the stated preference agreed.")

I also explored a lighter, more spacious layout against a denser, sidebar-led one. The calmer one won, because a quieter register builds more trust when people are handing over sensitive financial data.

## From weeks to days | 07 · Impact

![Weeks at a bank, against a same-day application and capital in as little as two days](/projects/recur-spark/illus-speed.png "Illustration · From weeks to days.")

1. **A same-day application,** where banks traditionally take weeks to underwrite a company like this.
2. **Capital in as little as two days,** against more than seven in the first shape.
3. **Upfront capital while waiting,** up to ₹5L, available while documents are still being verified.

## Speed is a design material | 08 · Reflection

1. **Speed is a design material.** The biggest decision wasn't a screen. It was releasing capital before verification finished, so the wait stopped being the bottleneck a founder feels.
2. **Automate what adds time, not judgement.** Underwriting kept its judgement; the steps around it got faster.
3. **Visibility beats convention.** Vertical steps tested better than the familiar horizontal pattern, because founders could see what was ahead.
4. **Calm builds trust.** When people hand over financial data, a quieter layout earns more trust than a dense one.

## Research questions, requirements and the full flow map | Appendix

**Research questions.** What the research we had time for set out to answer.

::: rows
Value | Where does the product create real value for the business and for founders?
Competitors | How do a handful of direct and indirect competitors approach the problem?
Founders | What does fundraising feel like for the founders we could talk to directly?
:::

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

**The full flow map.** From signup to funded capital, including the underwriting handoff and the investor side.

![The full flow map from signup to funded capital](/projects/recur-spark/flow-map.webp "The full flow map, from signup to funded capital. Click to enlarge.")

**The product in context.** Spark inside Recur.

![Spark, the revenue-based financing product inside Recur](/projects/recur-spark/hero.webp "Spark, inside Recur. Click to enlarge.")
