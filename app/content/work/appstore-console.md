## Overview

On Amazon's app developer console, one version in review blocked every other submission, including test builds and builds for other devices. The brief asked for parallel uploads. I led the redesign that separated the app from its releases and gave each operating system a release track of its own.

**Short on time?** Read this overview, the table that opens each phase, and Impact.

::: stats
~2 days | review wait, down from about 7
Q2 2025 | Phases 1 and 2 shipped, on time for the new-OS launch
7 | strategic partners in the research that reframed the brief
:::

::: rows
Role | Lead designer for app submissions
Team | About twelve: PM, TPM, design manager, engineering lead and team, QA lead and two testers, researcher, support
Status | Phases 1 and 2 shipped in Q2 2025. Phase 3 was in progress when I left.
Owned | Flows, UI, prototypes and design-system work through handoff, then visual QA and sign-off on the build
Research | I shaped the study's questions and methods with the research team, who ran it
Outside my scope | The reviewers' certification tool, a separate internal product
:::

## One more binary, one blocked queue | The challenge

The marketplace was preparing a new device with a new operating system, beside its TV and tablet lines. Its packages could not run on the other devices, and theirs could not run on it. The console treated an app as one thing with one submission, so nothing else could go out while a version was in review.

![One version in review, with the TV, new-OS and test builds waiting behind it](/projects/appstore-console/illus-queue.png "Illustration · One version in review held up everything behind it.")

Developers had two options, and a workaround with its own cost.

![Three ways to ship to a second device, each with a cost](/projects/appstore-console/illus-options.png "Illustration · Every option was a compromise.")

::: rows
The stake | The project blocked the new device's launch, targeted for Q2 2025, and its results went to senior leadership.
The brief | Allow parallel binary uploads. The PM wrote the requirements; I discussed them with the PM and pulled research in before designing anything.
:::

The old console, step by step:

![Step 1 of the old console: upload your app file](/projects/appstore-console/before-1-upload.png "Before · Step 1 of 4. The upload step also held the title, category, languages and support contact.")
![Step 2 of the old console: target your app](/projects/appstore-console/p1-step2.png#3/4 "Before · Step 2 of 4. Devices, availability, audience, rating and privacy on one long page.")
![Step 3 of the old console: store details](/projects/appstore-console/before-3-details.png "Before · Step 3 of 4. Store copy lived in the same flow as the release.")
![Step 3 of the old console: device-specific store assets](/projects/appstore-console/before-3-assets.png "Before · Step 3 of 4. Change a screenshot and you were inside the release flow.")

![The old flow: create, upload, wait about 7 days, publish, and only then start the next](/projects/appstore-console/illus-flow-before.png "User flow · Before. A straight line, built for one live version at a time.")

Reading the old screens showed six structural problems before any research:

::: rows
Names didn't match contents | "Upload your app file" also held the title, SKU, category, languages and support contact.
Optional and mandatory at once | Steps could be done in any order, yet device selection was blocked until a file was uploaded.
One step, unrelated decisions | Devices follow the binary. Availability, audience, rating and privacy are about the app, with different owners.
One pass per version | Every field sat in one submission, so metadata could never differ between binaries.
Testing outside the flow | Testing, in-app items and promotions sat apart in the sidebar.
No release decisions | Timing arrived last, and staged roll-out was nowhere in the path.
:::

## What partners told us | Research

I sat with the research team to shape the questions, structure and methods. The study ran for two weeks with seven strategic partners, the developers who account for a large share of the platform's revenue, and combined card sorting, interviews and survey questions.

![Five findings: three about parallel upload, two about how releasing is modelled](/projects/appstore-console/illus-findings.png "Illustration · Findings 4 and 5 had nothing to do with binaries.")

::: rows
Earlier research | Four interviews and a survey of 39 developers. 72% rated satisfaction 4 or higher out of 5, and 23% rated it 3. They liked the simple UI, and disliked slow review, vague rejections and testing that waited on review.
Staged roll-out survey | About 130 developers, asked what they wanted from staged roll-out.
The counterweight | Many developers release on larger platforms first and treat that as their safety check, so the goal was clarity rather than more controls.
Card sort | Most partners already knew a competing console's structure and were comfortable in it.
:::

> “I would like it if the processing/review time for Live App Testing were shorter, or if there were an internal testing track that bypassed the review process.”
> — A developer, in the earlier survey

> “It would be great if the UI was more in line with [the other major store].”
> — A developer, in the earlier survey

> “The more flexibility we have to control who gets the update is better.”
> — A developer, in the staged roll-out survey

The requirements named three people to design for. Their names are fictional.

::: rows
Lead developer, streaming | Ships to TV, tablet and the new-OS TV from separate codebases. A tablet review delays the other two, and critical fixes wait on unrelated reviews.
Independent game developer | A small studio with limited resources, forced to choose which platform to update first.
Reviewer, internal | Reviews thousands of submissions a month, and struggles to track related submissions across platforms.
:::

## From a feature to a structure | Strategy

Findings 1 to 3 fit the brief. Findings 4 and 5 were about how releasing was modelled. Parallel upload could not be bolted on: metadata, status, roll-out and testing each broke as soon as a second version existed.

![The structural change: one linear submission became shared app setup plus independent release tracks](/projects/appstore-console/ia-before-after.png "The structural shift · App setup is set once and shared. Each release lives in a lane of its own.")

::: rows
Separate app from release | Availability, privacy and content rating are set once and shared. Binary, devices, notes, roll-out and date belong to a release.
Borrow familiarity | Design toward the console structure partners already trusted, not a model to learn.
Phase by dependency | Unblock the launch first, then fix the hierarchy, then rebuild the platform.
:::

I took the findings to the PM and leadership and made the case that this was a workflow whose architecture could not support what developers needed. Rather than one larger project, we agreed to three phases, so the launch blocker came first.

![Three phases: unblock, re-architect, rebuild](/projects/appstore-console/illus-phases.png "Illustration · Each phase stands on its own and sets up the next.")

Engineering pushed back on a full restructure: it meant large back-end changes and a longer timeline. The objection was fair, so I treated it as a design input. Phase 2 got a lighter change the existing back end could carry, and the deeper shift moved to Phase 3.

## Phase 1: unblock | 1 · Unblock

::: rows
Problem | A new OS was blocked behind an existing one, and nothing else could ship while a version was in review.
Decision | One release track per operating system, under a new navigation that separates app setup from releases.
Outcome | Developers could submit builds for each OS independently, in parallel.
:::

![Two lanes side by side: one live at 100%, one in review](/projects/appstore-console/illus-lanes.png "Illustration · Each operating system gets a lane of its own.")

### Group by the jobs developers do
The four steps gave way to a persistent navigation: Publish, Monetize, Test and Services. Under Publish, App setup and Release tracks sit side by side.

![App setup and Release tracks in the new navigation](/projects/appstore-console/p1-after-1-nav.png "Phase 1 · App setup and Release tracks sit side by side under Publish.")

### A lane for each operating system
Each lane has its own Create a release action, so starting one platform's release never waits on another. An OS boundary was the cleanest line to draw: the packages are incompatible, so the lanes can never collide.

![Two empty lanes, each with its own Create a release action](/projects/appstore-console/p1-after-2-tracks.png "Phase 1 · One lane per OS, each with its own action.")
![Release tracks: one lane is live at 100% while another is in review](/projects/appstore-console/p1-after-3-versions.png "Phase 1 · One lane live at 100% while another is in review, impossible before.")

### Roll-out as a column, not a feature
Partners could not find staged roll-out. A setting would still need discovering; a column is seen every time a developer looks at their releases.

### A release, with the system doing the checking

![Set up the app once, create a release in the lane, submit with a roll-out, then review and live](/projects/appstore-console/illus-flow-release.png "User flow · After, Phase 1. Dark steps are new.")

![The release page with app setup incomplete, and a banner explaining the rule](/projects/appstore-console/p1-deps-banner.png "Phase 1 · The rule is stated once: releases can't publish until app setup is done.")
![The binary uploading inside an OS lane](/projects/appstore-console/p1-upload-progress.png "Phase 1 · The file uploads inside its lane, with progress shown.")
![An uploaded file as a card, with devices chosen per file](/projects/appstore-console/p1-file-card.png#3/4 "Phase 1 · The file becomes a card with its own actions, and devices are chosen per file.")
![A release that cannot be submitted until app setup is complete](/projects/appstore-console/p1-release-blocked.png "Phase 1 · Submit waits, and the reason sits beside the disabled button.")
![The staged roll-out dialog, from 1% to a full release](/projects/appstore-console/p1-rollout-dialog.png "Phase 1 · Roll-out is chosen when submitting: 1%, 5%, 10%, 50% or a full release.")

## Phase 2: let the track own its content | 2 · Tracks

::: rows
What Phase 1 left | Four known gaps, from shipping on time.
Decision | Make the track an object that owns its store listing, releases and history, and guide the longer forms that follow.
Outcome | Tracks by device type, each with its own listing, plus release history and a guided app setup. Shipped in Q2 2025.
:::

![Four gaps left at launch, and the two outcomes Phase 2 set out to meet](/projects/appstore-console/illus-gaps.png "Illustration · Phase 1's gaps became Phase 2's agenda.")

### Know what data is needed
App setup opens with a one-line explanation of its role. A section index on the right lists all nine sections and highlights the one in view, with field-level guidance and links to documentation.

![App setup with a section index on the right](/projects/appstore-console/p2-2-setup-intro.png "Phase 2 · A section index turns a long form into a map.")

### A track you can combine or split

![Create a track: choose the OS, then device types, as one track or one per device type](/projects/appstore-console/illus-flow-track.png "User flow · After, Phase 2. Dark steps are new.")

![Creating a release track](/projects/appstore-console/p2-3-create-track.png "Phase 2 · Choose an OS, then device types, as one combined track or a track for each.")
![A named release track](/projects/appstore-console/p2-4-track-page.png "Phase 2 · Store listing and first release are independent first steps inside each track.")

### A release is its own page

![Creating a release inside a track](/projects/appstore-console/p2-create-release.png "Phase 2 · Release title, notes by language, files, date and testing instructions in one place.")
![Each uploaded file lists the devices it supports](/projects/appstore-console/p2-devices-per-file.png "Phase 2 · Devices are chosen per file, shown as selected out of total for each family.")

### A track that knows its own state

![The track with its release summary, the release in review and its history](/projects/appstore-console/p2-track-state.png "Phase 2 · A summary, Releases and Store Listings tabs, and release history.")

### Staged roll-out, where developers look

![A banner on the app list introducing staged roll-out](/projects/appstore-console/p2-rollout-banner.png "Phase 2 · A banner on the app list explains staged roll-out and when it's available.")

## The reviewer, as a constraint | Reviewers

Parallel submissions multiply what a reviewer has to look at. The reviewers' tool was a separate product I did not design, but its requirements shaped my design.

::: rows
Visibility | How many tracks are active, and which device types they target.
Order | First in, first out across a developer's tracks, so no track is starved.
Results | Shared back to the developer with clear next steps.
Checklists | Specific to each device and OS, so attention goes where the risk is.
At launch | This is why the first lanes followed OS boundaries, where packages can never collide.
:::

## Phase 3: rebuild around the developer | 3 · Platform

::: rows
Aim | A complete overhaul of the developer platform: new structure, new guidance and a new design system matched to Amazon's devices.
Structure | Organised by jobs: Dashboard, Release, Testing, Monetization and Monitoring.
Status | In progress when I left, so shown as design, not as shipped. Sample data throughout.
:::

![The Phase 3 dashboard](/projects/appstore-console/p3-dashboard.png "Phase 3 · The dashboard answers what to do next. Design in progress.")
![The Phase 3 app dashboard: release, app vitals, monetization and KPI trends](/projects/appstore-console/p3-ex-dashboard.png "Phase 3 · An app at a glance. The roll-out column from Phase 1 is now a headline.")
![The Phase 3 general information form with a notifications panel](/projects/appstore-console/p3-ex-general.png "Phase 3 · Setup, with urgent work beside it.")
![The Phase 3 all apps view](/projects/appstore-console/p3-ex-allapps.png "Phase 3 · All apps in one place, with a pinned app summarised at the top.")

## Impact

![Review wait in days: about 7 before, about 2 after](/projects/appstore-console/illus-impact.png "Illustration · Review wait, falling gradually after Phases 1 and 2.")

::: rows
Review wait | Fell gradually from about 7 days to about 2.
Launch | Phases 1 and 2 shipped in Q2 2025, meeting the new-OS device launch the project was blocking.
Strategic partners | Could submit several binaries at once, or while another was in review, and match their timing on other platforms.
Learning curve | Partners found the flow quicker to learn, because it matched console conventions they already knew.
Reach | The same abilities went to smaller developers, not only strategic partners.
:::

::: rows
Before · one at a time | After · independent submissions per OS, in parallel
Before · four steps in order | After · two places, store details and the production release
Before · store content tied to the release | After · each edited on its own
Before · staged roll-out hard to find | After · partial or full release chosen up front
:::

Partner feedback is paraphrased from my account of the response, not quoted.

## Reflection

::: rows
Treat the brief as a hypothesis | "Allow parallel uploads" was a reasonable request and the wrong problem. Ask what model a feature assumes before designing it.
Every capability has a second user | The reviewer's needs set how many lanes were reasonable at launch.
Let constraints shape the sequence | Engineering's objection produced a better plan: ship what the back end can carry, hold the deeper shift.
Familiar beats novel | Designing toward conventions developers trusted cut the learning curve.
Design for the rest too | Research focused on the largest partners, so progressive disclosure and a non-linear first-time flow kept the console usable for a solo developer.
:::

## Appendix: research questions, flows and the longer view | Appendix

**Research questions.** What the partner study set out to answer.

::: rows
Different apps | Do you submit different apps for TVs and tablets?
Features used | Which submission features do you use most often?
Usefulness | How useful are future release dates, staged roll-out and a simple submission flow?
The one to answer | Does the concept of parallel binary submission hold up?
:::

**First-time setup.** The flow maps organised a first-time developer's setup into four groups, with testing in parallel.

![Four setup groups, with early development testing in parallel](/projects/appstore-console/illus-flow-onboarding.png "Illustration · From the flow maps. Monetisation can be skipped, and Save and exit is always there.")

::: rows
Release controls | Publish immediately, on a fixed future date, or by hand after approval.
Testing | Choose what to test the build with and add testers by hand or by upload. A test release no longer waits on production review.
Locked until ready | Production release setup stays locked until mandatory information is complete.
:::

**What changed from the plan.** The requirements described tracks by device type, up to three per app. What launched organised tracks by operating system, with devices inside each release. Phase 2 delivered the device-level model.

**The longer view.** The requirements end with experiment tracks beside production, where developers could test store-listing or app changes against control groups and promote the winner with a staged roll-out. It was explicitly future work, and the reason the track model was worth getting right.
