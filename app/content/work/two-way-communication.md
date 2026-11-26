## Support was hard to find, and cases vanished into email | 01 · Problem

I asked the PM for case volume and mapped every route to support. The support team's numbers became the baseline.

![Baseline: about 13.9k cases over eight months, about 2% spam](/projects/two-way-communication/illus-dots-baseline.png "Illustration · The baseline. About 2 in every 100 cases were spam.")

1. **Hard to find.** Support sat on a company-wide contact page, among options for all of Amazon.
2. **Nothing to follow.** After sending, the case was invisible. Everything ran over email.
3. **Missed replies became new tickets.** A reply the developer couldn't see led to a duplicate case.

![How a reply the developer could not see became a second ticket](/projects/two-way-communication/illus-chain.png "Illustration · One missed reply became a duplicate ticket.")

The old experience:

![Step 1: the company-wide Contact Us form](/projects/two-way-communication/old-contact-1.png "Step 1 · A company-wide Contact Us page. The developer picks the marketplace from a category list.")
![Step 2: a route to developer support appears](/projects/two-way-communication/old-contact-2.png "Step 2 · Choosing the marketplace reveals a route to developer support.")
![Step 3: a plain confirmation](/projects/two-way-communication/old-contact-3.png "Step 3 · After sending, only a confirmation. Contact details are replaced.")
![The old journey: a form, then everything in email](/projects/two-way-communication/illus-flow-before.png "The old journey · Only the form is in the console. Everything after it is in the inbox.")

Developers and research said the same:

![A developer forum post](/projects/two-way-communication/forum-voice.png "Forum · No one answers the contact form. Author details removed.")
![Developer sentiment by theme](/projects/two-way-communication/sentiment-themes.png "Research · Support is the largest theme, and mostly negative.")

## Two teams took the cases, and Google Play already let developers follow one | 02 · Research

The plan came with research on who writes in, and a look at how other platforms do it.

![Four reasons developers wrote in](/projects/two-way-communication/illus-reasons.png "Illustration · Why developers wrote in.")

![Where the cases went: DART, ASQS and content policy](/projects/two-way-communication/illus-dots-split.png "Illustration · Where the cases went.")

> “I have just stopped putting any apps here, and cannot recommend any developer to get into this store without support.”
> — A developer, on the forum

> “I have written many times in over three years, but have never received an actual response.”
> — A developer, in research feedback

**Benchmark: Google Play Console** suggests articles before a case can be submitted, then lets a developer track it across teams. The full benchmark is in the appendix.

::: decision Which case tool to build on
Options | Four case tools, compared
Chose | The existing internal tool
Because | It needed the least change.
:::

## Three steps, each one unlocking the next | 03 · Strategy

![Three steps, each unlocking the next: Find, Follow, Answer](/projects/two-way-communication/illus-strategy.png "Illustration · Each step gives the next one something to build on.")

Product management wrote the plan in late 2023, before I joined. I designed within it.

![From a plan on paper to two launches](/projects/two-way-communication/illus-process.png "Illustration · The process, from the plan to two launches.")

## Support got its own entry in the navigation | 04 · Phase 1a

::: rows
Problem | Support was hard to find.
Decision | Option B: a mega menu in the top navigation.
Outcome | Engineering and the PM aligned. Its effect on tickets sits in the Phase 1 result.
:::

Two directions went forward from my low-fidelity screens.

::: decision Where support lives
![Option A: support inside the avatar menu](/projects/two-way-communication/option-avatar-menu.png "Option A · Support inside the avatar menu, beside Settings and Logout. Name replaced.")
![Option B: a mega menu in the top navigation](/projects/two-way-communication/mega-menu.png "Option B, chosen · A mega menu. For the marketplace, My Cases comes first.")
Options | Inside the avatar menu, beside Settings and Logout · A mega menu in the top navigation
Chose | The mega menu
Because | It shows every option at a glance, and gets a developer to the forum, a ticket or the docs from one place. I walked both through with engineering and the PM, and most of the room preferred it.
:::

## Every case got a page, a thread and a status | 05 · Phase 1b

::: rows
Problem | After submitting, a developer got nothing back in the console, so replies got missed.
Decision | Keep the whole journey in the console, in five parts.
Outcome | About 47% fewer tickets than the baseline. Duplicates dropped, because developers could see their own cases.
:::

::: decision How a developer follows a case
Options | A form, then everything over email · A case page in the console, with a thread and a status
Chose | A case page, written as a thread
Because | Developers asked for an email-like thread, and seeing their own cases removed the reason to raise a second ticket. Duplicates dropped.
:::

![The status model: open, pending support action, pending developer action and resolved](/projects/two-way-communication/illus-status.png "Illustration · The status says whose move it is.")

### The journey stays in the console
**Problem.** After sending, the case was invisible, and everything ran over email.

**Solution.** A confirmation with a case ID, then a case page to follow up or re-open.

![The new journey: everything happens in the console](/projects/two-way-communication/illus-flow-after.png "The new journey · Highlighted steps are new pages.")

### A form that asks for what support needs
**Problem.** The old form was a company-wide Contact Us page, where a developer picked the marketplace from a category list for all of Amazon.

**Solution.** Category, then topic. Searchable apps. Prompts for what support asks first. The full structure is in the appendix.

![The case form with category, topic and related apps selected](/projects/two-way-communication/related-apps.png#3/4 "The form · Category, topic, related apps and guided description. Example data.")

### Every case, in one list
**Problem.** Developers couldn't see their own cases, so they raised new ones.

**Solution.** Search, sort and filter. The status says whose move it is.

![The case list with search, filters and status](/projects/two-way-communication/case-list.png "The case list · Example data.")

### A case is a thread
**Problem.** A reply the developer couldn't see led to a duplicate case.

**Solution.** The conversation and details in one view, with the reply box below. No reason to raise a second ticket.

![The case page: conversation beside case details](/projects/two-way-communication/case-thread.png "The case page · Example data.")

### Cases live inside each app
**Problem.** Replies arrived in email, away from the app they were about.

**Solution.** A Communications panel for each app, with an unread count.

![An app's Communications page with two tabs and unread counts](/projects/two-way-communication/app-communications.png "The inbox · Example data.")

## One case carries the whole conversation | 06 · Internal teams

Two teams sat behind the form. Each had to work with the case system.

![The developer and the internal teams share one case](/projects/two-way-communication/illus-teams.png "Illustration · One case, shared by the developer and the teams behind the form.")

![What changed for DART, ASQS and the partner managers](/projects/two-way-communication/illus-teams-change.png "Illustration · What changed for each team.")

A case can start in two places: a developer asking for help, or ASQS asking for a document. Both now land in the same case.

The step-by-step flows for a document request and a help request are in the appendix.

![One case moving between the developer, DART and ASQS](/projects/two-way-communication/illus-flow-combined.png "User flow · One case moves between the developer, DART and ASQS. It replaces three separate flows.")

## An assistant answers first, and hands off only when it must | 07 · Phase 2

::: rows
What Phase 1 showed | Tickets fell by about 47% and duplicates dropped. The North Star was the next step: stop routine questions becoming tickets.
Decision | Once Phase 1 launched, the North Star was picked up as Phase 2. The plan had placed the assistant in Phase 3.
Outcome | About 87% fewer tickets than the baseline.
:::

::: decision When to build the assistant
Options | Phase 3, as the plan placed it · Phase 2, straight after Phase 1
Chose | Phase 2
Because | Phase 1 built the case pages, so the assistant had somewhere to hand off to. Once Phase 1 launched, the North Star was picked up next.
:::

![Three behaviours: answer, never dead-end, escalate](/projects/two-way-communication/illus-assistant-logic.png "Illustration · What I defined with the MarTech team, so answers come from documentation we already had.")

### The North Star: chat from anywhere
**Problem.** Routine questions still became tickets.

**Solution.** Chat first, from anywhere. Only if the chat cannot resolve it does it become a case, linked to the case page.

![The North Star flow: chat first, then a case if it is needed](/projects/two-way-communication/illus-flow-northstar.png "The North Star flow · Phase 1 built the place where the handoff lands.")

### The handoff, designed
**Problem.** A chat that can't answer must never leave a developer at a dead end.

**Solution.** With no answer, the chat opens a case, gives its ID and links to it.

![Chat frames: a question, then a handoff to a case](/projects/two-way-communication/chat-widget.png "The handoff · With no answer found, the chat opens a case and links to it. Example data.")

### The assistant opens over the console
**Problem.** Asking for help meant leaving the page where the problem happened.

**Solution.** A panel in the corner, so a developer can ask from that page.

![The assistant open on the app list](/projects/two-way-communication/devassistant-panel.png "The panel · It opens over the console.")

### It expands, with cited answers
**Problem.** Answers had to come from documentation the team already had.

**Solution.** A full view with a chat history. Answers carry numbered references to the documentation.

![The expanded assistant with a cited answer](/projects/two-way-communication/devassistant-full.png "The expanded view · A step-by-step answer with references to the documentation.")

## About 87% fewer tickets, and turnaround roughly halved | 08 · Impact

I measured tickets reaching support, and how many were duplicates, against the same baseline for both phases.

![Tickets remaining for every 100 at the baseline: 100, about 53 after Phase 1, about 13 after Phase 2](/projects/two-way-communication/illus-dots-impact.png "Illustration · Tickets remaining against the baseline.")

1. **About 47% fewer tickets after Phase 1,** against the support team's baseline. Duplicates dropped, because developers could see their own cases.
2. **About 87% fewer after Phase 2,** with the assistant answering routine questions first.
3. **Turnaround roughly halved,** and the tickets that still reach support are mostly the critical ones.

Fewer tickets only counts if developers were helped. I have no satisfaction results to show that.

## Most of the drop came from removing the reason for a second ticket | 09 · Reflection

1. **Sequence by dependency.** Finding first gave the case pages somewhere to be reached from. The case system gave the assistant somewhere to hand off to.
2. **Change the model.** From "submit and wait" to "open a thread". Most of the drop came from removing the reason to raise a second ticket.
3. **Structure carries the work.** Inside a design system I did not own, my leverage was what is shown, in what order, and whose move it is.
4. **Measure next.** Satisfaction after an assistant answer, drop-off on the longer form, and how often resolved cases are re-opened.

## Team flows, benchmark, user stories and form | Appendix

**Internal team flows.** A case can start with ASQS asking for a document, or with a developer asking for help.

**When ASQS needs a document.** Before, a developer with a question about the request had to raise a new case through the Contact Us form. The category they picked decided whether it reached ASQS directly or went through DART first. Now ASQS opens the case itself, and every question and reply stays on it.

![Before: a question about a document request meant a new Contact Us case, routed by category](/projects/two-way-communication/illus-flow-asqs-before.png "User flow · Before. A question about the request meant a new case.")

![After: ASQS opens the case, and questions and replies stay on it](/projects/two-way-communication/illus-flow-asqs-after.png "User flow · After. The case does the talking. Dark steps are new.")

**When a developer needs help.** Prompted links come first. A developer who still needs help opens one case in the console, and DART answers, triages and follows up on that same case until it is resolved.

![After: prompted links first, then one case that DART answers and updates](/projects/two-way-communication/illus-flow-dart.png "User flow · After. Prompted links first, then one case. Dark steps are new.")

**Benchmark detail.** What the Google Play Console benchmark and the plan settled.

![Google Play Console's contact page suggesting resources before a case is submitted](/projects/two-way-communication/benchmark-google-play.png "Benchmark · Google Play Console. Suggested resources appear before a case is submitted.")

::: rows
Articles first | Links to documentation before a case is raised, and later an assistant that answers from them.
Tracking | A case page with a status and a history in one place.
One thread | Developers asked for an email-like thread, which the case page became.
Back end | Four case tools were compared.
:::

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
