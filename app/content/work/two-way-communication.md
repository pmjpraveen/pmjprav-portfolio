## Overview

Developers on Amazon's app marketplace could open a support case but could not follow it. I redesigned how they find support and follow a case, then set out the North Star that became an AI assistant.

**Short on time?** Read this overview, the table that opens each phase, and Impact.

::: stats
~47% | fewer tickets after Phase 1
~87% | fewer tickets after Phase 2
Halved | turnaround time, roughly
:::

::: rows
Role | Lead designer, and the only designer. I joined Amazon in mid-2024.
Team | PM, technical PM, engineers, researcher, design manager, MarTech team
Timeline | About three weeks of design and one week of review and handoff for Phase 1, then Phase 2
Status | Both phases shipped
Owned | Help navigation, case creation, case history, communication panels
Phase 2 | I set out the assistant, then defined what it shows and when it escalates, with the MarTech team
Constraint | Amazon's retail design system, so my work was structure and flow
:::

## Two problems behind one request | The challenge

I asked the PM for case volume and mapped every route to support. The support team's numbers became the baseline.

![Baseline: about 13.9k cases over eight months, about 2% spam](/projects/two-way-communication/illus-dots-baseline.png "Illustration · The baseline. About 2 in every 100 cases were spam.")

::: rows
Hard to find | Support sat on a company-wide contact page, among options for all of Amazon.
Nothing to follow | After sending, the case was invisible. Everything ran over email.
:::

![How a reply the developer could not see became a second ticket](/projects/two-way-communication/illus-chain.png "Illustration · One missed reply became a duplicate ticket.")

The old experience:

![Step 1: the company-wide Contact Us form](/projects/two-way-communication/old-contact-1.png "Step 1 · A company-wide Contact Us page. The developer picks the marketplace from a category list.")
![Step 2: a route to developer support appears](/projects/two-way-communication/old-contact-2.png "Step 2 · Choosing the marketplace reveals a route to developer support.")
![Step 3: a plain confirmation](/projects/two-way-communication/old-contact-3.png "Step 3 · After sending, only a confirmation. Contact details are replaced.")
![The old journey: a form, then everything in email](/projects/two-way-communication/illus-flow-before.png "The old journey · Only the form is in the console. Everything after it is in the inbox.")

Developers and research said the same:

![A developer forum post](/projects/two-way-communication/forum-voice.png "Forum · No one answers the contact form. Author details removed.")
![Developer sentiment by theme](/projects/two-way-communication/sentiment-themes.png "Research · Support is the largest theme, and mostly negative.")

## Research and benchmarking | Research

The plan came with research on who writes in, and a look at how other platforms do it.

![Four reasons developers wrote in](/projects/two-way-communication/illus-reasons.png "Illustration · Why developers wrote in.")

![Where the cases went: DART, ASQS and content policy](/projects/two-way-communication/illus-dots-split.png "Illustration · Where the cases went.")

::: rows
Developer forum | “I have just stopped putting any apps here, and cannot recommend any developer to get into this store without support.”
Research feedback | “I have written many times in over three years, but have never received an actual response.”
:::

**Benchmark: Google Play Console** suggests articles before a case can be submitted, then lets a developer track it across teams.

![Google Play Console's contact page suggesting resources before a case is submitted](/projects/two-way-communication/benchmark-google-play.png "Benchmark · Google Play Console. Suggested resources appear before a case is submitted.")

::: rows
Articles first | Links to documentation before a case is raised, and later an assistant that answers from them.
Tracking | A case page with a status and a history in one place.
One thread | Developers asked for an email-like thread, which the case page became.
Back end | Four case tools were compared. The existing internal tool needed the least change.
:::

## Three steps, in order | Strategy

![Three steps, each unlocking the next: Find, Follow, Answer](/projects/two-way-communication/illus-strategy.png "Illustration · Each step gives the next one something to build on.")

Product management wrote the plan in late 2023, before I joined. I designed within it.

![From a plan on paper to two launches](/projects/two-way-communication/illus-process.png "Illustration · The process, from the plan to two launches.")

## Phase 1a: give support its own entry | 1a · Find help

::: rows
Problem | Support was hard to find.
Decision | Option B: a mega menu in the top navigation.
Outcome | Engineering and the PM aligned. Its effect on tickets sits in the Phase 1 result.
:::

Two directions went forward from my low-fidelity screens.

![Option A: support inside the avatar menu](/projects/two-way-communication/option-avatar-menu.png "Option A · Support inside the avatar menu, beside Settings and Logout. Name replaced.")
![Option B: a mega menu in the top navigation](/projects/two-way-communication/mega-menu.png "Option B, chosen · A mega menu. For the marketplace, My Cases comes first.")

I walked both through with engineering and the PM. Most of the room preferred the mega menu: it shows every option at a glance, and gets a developer to the forum, a ticket or the docs from one place.

## Phase 1b: give every case a home | 1b · Follow cases

::: rows
Problem | After submitting, a developer got nothing back in the console, so replies got missed.
Decision | Keep the whole journey in the console, in five parts.
Outcome | About 47% fewer tickets than the baseline. Duplicates dropped, because developers could see their own cases.
:::

![The status model: open, pending support action, pending developer action and resolved](/projects/two-way-communication/illus-status.png "Illustration · The status says whose move it is.")

### The journey stays in the console
A confirmation with a case ID, then a case page to follow up or re-open.

![The new journey: everything happens in the console](/projects/two-way-communication/illus-flow-after.png "The new journey · Highlighted steps are new pages.")

### A form that asks for what support needs
Category, then topic. Searchable apps. Prompts for what support asks first. The full structure is in the appendix.

![The case form with category, topic and related apps selected](/projects/two-way-communication/related-apps.png#3/4 "The form · Category, topic, related apps and guided description. Example data.")

### Every case, in one list
Search, sort and filter. The status says whose move it is.

![The case list with search, filters and status](/projects/two-way-communication/case-list.png "The case list · Example data.")

### A case is a thread
The conversation and details in one view, with the reply box below. No reason to raise a second ticket.

![The case page: conversation beside case details](/projects/two-way-communication/case-thread.png "The case page · Example data.")

### Cases live inside each app
A Communications panel for each app, with an unread count.

![An app's Communications page with two tabs and unread counts](/projects/two-way-communication/app-communications.png "The inbox · Example data.")

## How it maps to DART and ASQS | Internal teams

Two teams sat behind the form. Each had to work with the case system.

![The developer and the internal teams share one case](/projects/two-way-communication/illus-teams.png "Illustration · One case, shared by the developer and the teams behind the form.")

![What changed for DART, ASQS and the partner managers](/projects/two-way-communication/illus-teams-change.png "Illustration · What changed for each team.")

A case can start in two places: a developer asking for help, or ASQS asking for a document. Both now land in the same case.

![One case moving between the developer, DART and ASQS](/projects/two-way-communication/illus-flow-combined.png "User flow · One case moves between the developer, DART and ASQS. It replaces three separate flows.")

## Phase 2: answer before it becomes a ticket | 2 · Answer first

::: rows
What Phase 1 showed | Tickets fell by about 47% and duplicates dropped. The North Star was the next step: stop routine questions becoming tickets.
Decision | Once Phase 1 launched, the North Star was picked up as Phase 2. The plan had placed the assistant in Phase 3.
Outcome | About 87% fewer tickets than the baseline.
:::

![Three behaviours: answer, never dead-end, escalate](/projects/two-way-communication/illus-assistant-logic.png "Illustration · What I defined with the MarTech team, so answers come from documentation we already had.")

### The North Star: chat from anywhere
Only if the chat cannot resolve it does it become a case, linked to the case page.

![The North Star flow: chat first, then a case if it is needed](/projects/two-way-communication/illus-flow-northstar.png "The North Star flow · Phase 1 built the place where the handoff lands.")

### The handoff, designed
With no answer, the chat opens a case, gives its ID and links to it.

![Chat frames: a question, then a handoff to a case](/projects/two-way-communication/chat-widget.png "The handoff · With no answer found, the chat opens a case and links to it. Example data.")

### The assistant opens over the console
A panel in the corner, so a developer can ask from the page where the problem happened.

![The assistant open on the app list](/projects/two-way-communication/devassistant-panel.png "The panel · It opens over the console.")

### It expands, with cited answers
A full view with a chat history. Answers carry numbered references to the documentation.

![The expanded assistant with a cited answer](/projects/two-way-communication/devassistant-full.png "The expanded view · A step-by-step answer with references to the documentation.")

## Impact

I measured tickets reaching support, and how many were duplicates, against the same baseline for both phases.

![Tickets remaining for every 100 at the baseline: 100, about 53 after Phase 1, about 13 after Phase 2](/projects/two-way-communication/illus-dots-impact.png "Illustration · Tickets remaining against the baseline.")

::: rows
Support team | Far fewer tickets each day, and mostly critical ones. The assistant answers routine questions.
Developers | They can see their own cases, so duplicates dropped.
Turnaround | Roughly halved.
:::

Fewer tickets only counts if developers were helped. I have no satisfaction results to show that.

## Reflection

::: rows
Sequence by dependency | Finding first gave the case pages somewhere to be reached from. The case system gave the assistant somewhere to hand off to.
Change the model | From "submit and wait" to "open a thread". Most of the drop came from removing the reason to raise a second ticket.
Structure carries the work | Inside a design system I did not own, my leverage was what is shown, in what order, and whose move it is.
Next measure | Satisfaction after an assistant answer, drop-off on the longer form, and how often resolved cases are re-opened.
:::

## Appendix: user stories and form structure | Appendix

**The plan as written.** Product management wrote it in late 2023.

::: rows
Planned Phase 1 | The case tool for unmanaged developers, rolled out to a random share first, starting at 20%, with DART and ASQS using it. A two-way door, easy to reverse.
Planned Phase 2 | Managed partners and partner managers move onto the same tool.
Planned Phase 3 | Trend analysis, inline help, a generative-AI assistant, a resolution time and simpler navigation.
What followed | Phase 1 delivered case management and help navigation. Phase 2 delivered the assistant, which the plan had placed in Phase 3.
:::

![The plan placed the assistant in Phase 3, and it was delivered in Phase 2](/projects/two-way-communication/illus-plan.png "Illustration · The plan, and what followed.")

**User stories.** Fourteen, with priorities. P0 made up the first release.

![Fourteen user stories ranked by priority: six P0, seven P1 and one P2](/projects/two-way-communication/illus-stories.png "Illustration · The fourteen user stories by priority.")

::: rows
P0 · Create a case | Submit with an app, a category and sub-category, a description under 4,000 characters and an attachment up to 5 MB. Bad files are rejected with a clear error.
P0 · See the status | Open, pending support action, pending developer action or resolved.
P0 · Reply | Follow up from the console, and by email once acknowledged. The reply lands on the same case.
P0 · DART | View, respond to and triage queries from the backend tool.
P0 · ASQS, reply | View and reply to assigned cases from the backend tool.
P0 · ASQS, documents | Open a case, on the case tool or the internal approvals portal, with the status pending developer action. The conversation stays on the case tool.
P1 · Pick my app | Choose from a searchable drop-down, or type to find it.
P1 · Re-open | Re-open a resolved case, which notifies the team. The case ID stays the same.
P1 · Get notified | A status change shows in the console's notification area.
P1 · Managed partners | A managed developer creates and tracks a case on the same portal.
P1 · Documentation links | After a category or description, relevant links appear. If there are none, none show.
P1 · Partner managers, see all | See everything about a managed partner's case in one place.
P1 · Partner managers, access | Limit access to a managed partner's data to their own assignees.
P2 · Resolution time | See an estimated time to resolution, updated if the case runs late.
:::

**Case form structure.** Category, then topic, then only the fields that topic needs. Every combination keeps a subject and a description.

![The form: category, then topic, then only the fields that topic needs](/projects/two-way-communication/illus-form.png "Illustration · How the form is structured.")

::: rows
Appstore | App submission and update, test results, content policy, payment and tax, huddle, feedback, leaderboards
Appstore on Windows | Submission inquiries, test results, device compatibility, content policy, developer portal, feedback
Developer account | Administration, signup and contract, developer portal, login, feedback
GameOn | Program inquiry, featuring, user behaviour, reporting a post, removing a game
:::

::: rows
Submission and update | App name, ID or package, mandatory. Current app status as a drop-down. A description with prompts.
Test results, content policy | App name, mandatory. Devices as a multi-select, mandatory for content policy.
Payment and tax | A payment number, optional. Prompts for the amount, date and marketplace.
Developer portal | The error message, a timestamp and the steps to reproduce, all mandatory.
Account topics | Which program, mandatory. A login email for login issues.
Feedback, huddle, GameOn | No extra fields. A subject and a description only.
:::

![The support form with a View my cases prompt above the fields](/projects/two-way-communication/case-creation.png#3/4 "The form · A subject line, optional sharing, and a route to existing cases.")
![Category chosen, topic list open](/projects/two-way-communication/category-topic.png#3/4 "The form · Category, then topic. The topic list depends on the product area.")

::: rows
The app field | Names are not unique, IDs are, and package names are. So it became a searchable multi-select showing the name with its package name, with an Others option.
Backend-only fields | The current app status and release ID are needed by the team but hidden from the developer, so the team can spot a status mismatch.
Name, ID, package | One field, because they are three ways of naming the same thing.
Marketplace | Free text, because marketplaces differ and a case can span several.
Payment topics | Not split into three, as that would not map to anything in the back-end tool.
Device on content policy | Not device-specific, but the content-quality team needs it for tracking.
:::
