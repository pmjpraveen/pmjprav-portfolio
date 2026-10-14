## Summary

One in-review version blocked every other submission on a major app marketplace's developer console, including test builds and builds for other devices. I led the redesign that replaced the single-file submission queue with independent release tracks, and **review waits fell from about 7 days to 2**.

Phases 1 and 2 shipped in Q2 2025, in time for the launch of a new device OS that the project was blocking. Phase 3, a full overhaul of the developer platform, was in progress when I left.

![Release tracks: one lane is live at 100% while another is in review](/projects/appstore-console/p1-after-3-versions.png "After · Release tracks. A lane live at 100% while another is in review, impossible before.")

## Problem and approach

Developers ship to several device families, each with its own binary and release rhythm. The console treated an app as one thing with one submission. Nothing else could go out until the current version cleared review.

The brief was narrow: allow parallel binary uploads. A two-week study with seven strategic partners, the platform's highest-revenue developers, combined card sorting, interviews and survey questions. It showed the brief was a symptom:

- **About 7 days** per review, each one blocking everything behind it.
- **A 2-week lag** against the same apps on other mobile platforms.
- **Test builds stuck** behind production review, so the safety net for a release was blocked by the release.
- **Staged rollout** was hard to find, and hard to operate once found.

An earlier 39-developer survey had pointed at the same themes, which gave me confidence they were real patterns. Mapping the old flow end to end made the real issue clear: it was a straight line built for one live version at a time. Parallel upload could not be bolted on. The information architecture itself had to change.

![The old four-step submission flow](/projects/appstore-console/before-1-upload.png "Before · Step 1 of 4. Upload, targeting, store details and review all lived in one sequence. Brand elements redacted.")

![The structural change: one linear submission became shared app setup plus independent release tracks](/projects/appstore-console/ia-before-after.png "The structural shift · From one linear submission to shared app setup and independent release tracks.")

**Separate the app from the release.** App-level information (availability, privacy, content rating) is set once and shared. Everything about a version (binary, devices, notes, rollout, date) belongs to a lane of its own.

**Borrow familiarity.** The card sort showed partners already knew a competing console's structure. We designed toward conventions developers trusted, not a model they would have to learn.

**Phase by dependency.** Three phases: unblock parallel submission, re-architect the information hierarchy, then redesign the whole platform.

## Challenges

- **A launch deadline.** The project blocked a new device OS, targeted for Q2 2025. A full restructure risked the date.
- **Engineering pushback.** Restructuring the information architecture meant large back-end changes and a longer timeline. The objection was fair, so I treated it as a design input: ship the lighter structure the back end could carry, hold the deeper shift for Phase 3.
- **Reviewer capacity.** More parallel lanes only work if the review side can absorb them. That is why the first lanes followed OS boundaries, where packages are incompatible and can never collide.
- **Gaps at launch.** Phase 1 left four known limits: no per-device tracks, no per-track store listings, no regional listings, no release history. They became the Phase 2 agenda.

## Solution

**Phase 1: unblock.** A persistent navigation (Publish, Monetize, Test, Services) with app-level setup in one hub, and one release lane per operating system. Staged roll-out became a column in the table developers already read, instead of a hidden feature.

![App setup and Release tracks in the new navigation](/projects/appstore-console/p1-after-1-nav.png "Phase 1 · App setup and Release tracks sit side by side under Publish.")

**Phase 2: let the track own its content.** Creating a track became two choices: pick the platform, then the device types, as a combined release or one track per device type. Each track now owns its store listing, releases and history, with a section index and field-level guidance so long forms stay navigable.

![Creating a release track](/projects/appstore-console/p2-3-create-track.png "Phase 2 · Choose an OS, then device types, as one combined release or a track for each.")

![A named release track](/projects/appstore-console/p2-4-track-page.png "Phase 2 · Store listing and first release are independent first steps inside each track.")

## Results and impact

- **Review wait time fell from about 7 days to 2**, gradually rather than overnight.
- **Phases 1 and 2 shipped in Q2 2025**, meeting the new-OS device launch the project was blocking.
- **Strategic partners could submit multiple binaries**, even while another was in review, and keep pace with their other platforms.
- **Partners found the flow quicker to learn** because it matched console conventions they already knew.
- **Smaller developers got the same capabilities**, not only the strategic partners.
- **The four-step submission** became two places: store details and the production release.

## What came next

**Phase 3: rebuild around the developer.** A new design system matched to the marketplace's devices, and a console organised by jobs (Dashboard, Release, Testing, Monetization, Monitoring) rather than by forms. It was still in progress when I left, so it is shown as design, not as shipped.

![The Phase 3 dashboard](/projects/appstore-console/p3-dashboard.png "Phase 3 · Design in progress. Sample data.")



The longer-term direction in the product requirements is an **experiment track** alongside production, where developers could test store-listing or app changes against control groups and promote a winner. It was explicitly future work, and the reason the track model was worth getting right.

What I would carry forward: treat the brief as a hypothesis, and ask what model a feature assumes before designing it.
