## Summary

Developers on Amazon's app marketplace could open a support case but could not follow it. Support was hard to find, and once a case was sent the whole conversation moved to email. I redesigned how developers find support and how they follow a case, then set out the North Star that became an AI assistant. Tickets fell by about 47% after the first phase and by about 87% after the second.

::: stats
~47% | fewer tickets after Phase 1
~87% | fewer tickets after Phase 2
:::

## My role

::: rows
Role | Lead designer, and the only designer on the project. I joined Amazon in mid-2024.
Team | PM, technical PM, engineers, researcher, design manager, MarTech team
Owned | Help and support navigation, case creation, case history and the communication panels, from low-fidelity options through to handoff
Phase 2 | I set out the AI assistant as the North Star during Phase 1, then defined what it shows and when it escalates, working with the MarTech team
Constraint | Amazon's retail design system set the visual language, so my work was in structure, hierarchy and flow
:::

## Framing the problem

The request was to build a two-way communication system for the developer platform. Before designing anything I asked the PM how many cases the team handled each day and each month, and I mapped every route a developer could take to create a case or reach support.

The PM and the support team gave me the numbers. The Contact Us form had taken in about 13.9k cases over eight months, and only about 2% were spam, so nearly all of it was genuine demand. I used that figure as the baseline for everything that followed.

::: stats
~13.9k | cases over eight months, the baseline
~2% | spam
:::

The numbers and the routes pointed to two problems, not one.

::: rows
Discoverability | Support lived on a company-wide contact page. To reach marketplace support, a developer had to pick through options for all of Amazon, then raise a ticket for their app or the console. The navigation made this hard to find, and much of the information around it was unnecessary.
No follow-up | After a ticket was submitted, the developer could not see its details. Everything ran over email. When the team missed a reply, the developer raised the same request again, which created duplicate tickets and more work for support.
:::

![The old console home: banners stacked above the app list](/projects/two-way-communication/before-banners.png "Before · Notices and announcements share one banner stream, so nothing about support stands out.")

The journey for a developer was a form on the console followed by a confirmation email and a reply from a support team. After the form, everything happened in their inbox.

![The old journey: a form on the console, then everything in email](/projects/two-way-communication/journey-before.png "Before · The current journey. Everything after the form happens in the developer's email.")

In practice the old experience was three screens.

![Step 1: the company-wide Contact Us form, with a category to choose](/projects/two-way-communication/old-contact-1.png "Before · Step 1. A company-wide Contact Us page. The developer chooses the marketplace from the category list.")

![Step 2: once the marketplace is chosen, a link to developer support appears](/projects/two-way-communication/old-contact-2.png "Before · Step 2. Choosing the marketplace reveals a route to developer support.")

![Step 3: a plain confirmation that the message was sent](/projects/two-way-communication/old-contact-3.png "Before · Step 3. Once the message is sent, only a confirmation is shown. Contact details are replaced.")

Developer support sat in a menu beside Alexa, AWS and Login with Amazon, and reaching it meant choosing the right category on a page written for the whole company. After sending, the developer saw a confirmation and nothing else.

Developers were saying the same thing in public. A forum post addressed to the team complains that no one answers the Contact Us form and that only automated replies come back.

![A developer forum post complaining of automated replies and no answer](/projects/two-way-communication/forum-voice.png "Evidence · Developer forum. Author details removed.")

Developer sentiment research agreed. Customer support was the largest theme and mostly negative, ahead of review and approval.

![Sentiment by theme from developer research](/projects/two-way-communication/sentiment-themes.png "Evidence · Developer sentiment research, by theme.")

## Strategy

I split the work into three steps and put them in this order on purpose.

::: rows
1a · Find | Make support easy to find, so a developer can open a case at all.
1b · Follow | Give every case a place where its history and replies live, so developers stop raising it again.
2 · Answer | Resolve routine questions before they become tickets, and send only critical ones to the support team.
:::

Each step depends on the one before it. A case page is wasted if developers cannot find the way in, and an assistant needs a case system to hand off to.

## Phase 1a: make support easy to find | Phase 1a

I drew low-fidelity screens exploring how a developer finds help. Two directions went forward.

**Option A: support inside the avatar menu.** Help sits in the menu behind the profile icon, beside Settings and Logout.

![Option A: support inside the avatar menu](/projects/two-way-communication/option-avatar-menu.png "Option A · Support inside the avatar menu, beside Settings and Logout. Name replaced.")

**Option B: a mega menu in the top navigation.** Help gets its own entry, opening a menu that shows every action a developer can take and where each one leads.

![The mega menu opened from the help icon, with links for each product and a What's New panel](/projects/two-way-communication/mega-menu.png "Option B, chosen · The mega menu. Each product has its own links to documentation, the forum and contact. For the marketplace, My Cases comes first.")

**Decision: Option B.** I walked both options through with engineering and the PM and explained the reasoning behind each. Most of the room preferred the mega menu. It shows what is available at a glance, and it lets a developer go straight to the community forum, raise a ticket or search the support documents from one place.

## Phase 1b: make every case followable | Phase 1b

Before, a developer chose marketplace queries from a company-wide list, submitted, and got nothing back in the console. I rebuilt the journey so that it stays in the console. After submitting, the developer receives a confirmation with a case ID and lands on a detailed case page, where they can follow up or re-open the case. A case management page lists every case together.

![The new journey: everything happens in the console](/projects/two-way-communication/journey-after.png "Phase 1 · The new journey. The highlighted steps are new pages, and everything happens in the console.")

### A form that asks for what support needs
The category became two steps, product area then topic. Related apps are searchable, and the description opens with prompts for the details support asks for first. The first reply can then be an answer and not another question.

![The support form with a View my cases prompt above the fields](/projects/two-way-communication/case-creation.png#3/4 "Phase 1 · The form. A subject line, optional sharing, and a route to existing cases.")

![Category chosen, topic list open](/projects/two-way-communication/category-topic.png#3/4 "Phase 1 · Category, then topic. The topic list depends on the product area chosen.")

![Case form with category, topic and related apps selected](/projects/two-way-communication/related-apps.png#3/4 "Phase 1 · The form. Example data.")

### A case history that keeps every query and answer in context
I added a section for case history, listing the queries a developer raised and the responses they received. Each case opens as a thread with its status and details beside it. A developer no longer has to search their email, and has no reason to raise a second ticket for a reply that already exists.

![The support requests list with search, filter and status](/projects/two-way-communication/case-list.png "Phase 1 · The case list. Example data.")

![The case page: conversation thread beside case details](/projects/two-way-communication/case-thread.png "Phase 1 · The case page. Example data.")

### Communication inside each app
There are two ways in. The global navigation holds every case on the account. Inside each app, a Communications panel holds the threads for that app, with an unread count. A developer can look at one app, or step back and see everything.

![An app's Communications page with two tabs and unread counts](/projects/two-way-communication/app-communications.png "Phase 1 · The inbox. Example data.")

### The North Star: help that hands off to a case
While designing the case pages I also set out where this should go next. A developer should be able to ask a question from anywhere in the console. Only if the chat cannot resolve it should it become a case, opened in the chat and linked straight to the case page. Phase 1 built the place that handoff lands.

![Chat widget: a question, then a handoff to a case](/projects/two-way-communication/chat-widget.png "North Star · The handoff to a case. With no answer found, the chat opens a case and links to it. Example data.")

## Phase 2: answer before it becomes a ticket | Phase 2

Once Phase 1 launched, the North Star was picked up and implemented as Phase 2. The assistant answers routine questions, so the support team receives only the tickets that need a person.

![The North Star flow: chat first, then a case if it is needed](/projects/two-way-communication/journey-north-star.png "Phase 2 · The North Star flow. Chat from anywhere, and a case only when the chat cannot resolve it.")

I worked with the MarTech team to decide what the assistant should show and how the content behind it should be structured, so that answers came from documentation we already had. I defined three behaviours.

::: rows
Searching the documentation | A developer's question is matched to documents, and the content is structured so the right pages come up first.
No document found | The developer does not hit a dead end. They can create a ticket inside the chat without leaving it.
A critical issue | When something is urgent, such as a review taking far too long, the chat raises an expedited ticket and sends it to customer support. The developer sees at once that it has been created. If it relates to an app, it is mapped to that app, and the ticket ID is shared in the chat.
:::

The assistant opens as a panel in the corner of the console and can expand into a full view with a chat history. Its answers carry numbered references to the documentation they came from, so a developer can check the source.

![The assistant open on the app list](/projects/two-way-communication/devassistant-panel.png "Phase 2 · The assistant opens over the console.")

![The expanded assistant with chat history and a cited answer](/projects/two-way-communication/devassistant-full.png "Phase 2 · The expanded view. A step-by-step answer, with references to the documentation.")

## Impact

The measure was the number of tickets reaching customer support, and how many of those were duplicates. I set both against the baseline from the support team, and I mapped the Phase 1 and Phase 2 reductions to that same baseline.

::: stats
~47% | fewer tickets than the baseline after Phase 1
~87% | fewer tickets than the baseline after Phase 2
Halved | turnaround time, roughly
:::

::: rows
Duplicates | Developers could see their own cases, so they stopped re-raising them. This showed in the ticket count after Phase 1, and it was the clearest sign that developers could follow a case.
Support workload | After Phase 2 the team received far fewer tickets each day, and the ones that arrived were high-critical issues. Most routine questions were answered by the assistant.
:::

Fewer tickets only counts as a good result if developers were helped, and I do not have satisfaction results to show that here.

## Reflection

The change that mattered most was in the model, from "submit and wait" to "open a thread". Sequencing mattered too. Fixing discoverability first meant the case pages had somewhere to be reached from, and building the case system before the assistant meant the assistant had somewhere to hand off to.

::: rows
Next measure | Satisfaction after a question is answered by the assistant, drop-off on the longer form, and how often resolved cases are re-opened.
Next step | One home for everything the marketplace tells developers. This is a direction, not something I shipped.
:::
