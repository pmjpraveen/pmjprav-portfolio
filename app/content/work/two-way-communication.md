## Summary

Developers on the Amazon app marketplace could open a support case, but not follow it. Email carried the whole conversation. I turned the case into a page they can open, follow and return to.

::: stats
~47% | fewer cases after Phase 1
~87% | fewer cases after the Phase 2 help widget (shared with the platform team)
Halved | turnaround time, roughly
3 weeks | of design, plus a week of review and handoff
:::

![The old console home: banners stacked above the app list](/projects/two-way-communication/before-banners.png "Before · Operational notices share one banner stream with product announcements. A support reply has nowhere to live.")

## Problem

The brief was two-way communication. The real gap was that a case was never a thing a developer could hold: fill in a form, then wait in email.

::: rows
Follow-ups became new cases | One problem produced several tickets and inflated volume.
History lived in inboxes | Reviewing a case meant searching mail by hand.
Silence | Developers could not tell if anyone was working on their issue. Forums named "responsiveness" and "support" as the main negative drivers.
No single record | Five teams used seven tools to write to developers. No one could see patterns.
:::

::: stats
13.9k | cases in eight months of 2023, only 2% spam
~9 in 10 | resolved within 14 days
10–14 days | wait for managed partners writing via a shared mailbox
:::

## Role

::: rows
Role | Lead designer, sole designer. Joined Q3 2024; strategy and research predated me.
Team | PM, technical PM, engineers, researcher, design manager
Scope | Case creation, status, conversation and history, end to end
Phase 2 | I proposed the help widget; the contact-support platform team owned and built it
Constraint | The parent company's retail design system set the visuals, so my leverage was structure and clarity
:::

## Approach

I inherited a phased plan written in late 2023. I designed Phase 1, a case tool on the Contact Us form. The insight: silence did as much damage as slowness, so most of the drop would come from removing the reasons to open a second case.

::: rows
Launch and learn | Release to a random share of unmanaged developers first, to compare against the old flow.
Protect managed partners | Their email habit stays. A new address creates a case in the same tool.
Keep the forum | Crowd-sourced answers are convenient, so the forum was out of scope.
Rejected | A read-only viewer on top of email, which would not stop follow-ups becoming new tickets. A chat-first model, which was a much larger change and not on the roadmap.
:::

## Five decisions

### The console holds the conversation, and email mirrors it
A case page is the record: every message, attachment and detail, newest first. Replies from console and email land in one thread. A resolved case can be re-opened for 30 days.

![The case page: conversation thread beside case details](/projects/two-way-communication/case-thread.png "Phase 1 · The case page. Example data.")

### Status is the headline, written from the developer's side
Pending your action, pending support action, resolved. A developer sees whose move it is without opening the case. Search, sort and filter by app, status or creator.

![The support requests list with search, filter and status](/projects/two-way-communication/case-list.png "Phase 1 · The case list. Example data.")

### Collect context up front, and accept a longer form
Support's first reply was often a question: which app, which package, when. Those questions moved into the form, so the first response can be an answer. Category then topic, searchable related apps, and a description with prompts.

![Case form with category, topic and related apps selected](/projects/two-way-communication/related-apps.png#3/4 "Phase 1 · The form. Example data.")

### Put cases where developers already are
My Cases leads the Help menu. Every app has a Communications entry with an unread count, split into Support Requests and what the marketplace sent.

![An app's Communications page with two tabs and unread counts](/projects/two-way-communication/app-communications.png "Phase 1 · The inbox. Example data.")

### Adopt the ecosystem now, plan the exit, and let help end in a case
I designed within the ecosystem and wrote a staged plan for leaving it. For Phase 2 I proposed a chat widget that answers first and, failing that, opens a case and links to it. Its design is the platform team's.

![Chat widget: a question, then a handoff to a case](/projects/two-way-communication/chat-widget.png "Phase 2 · Chat. With no answer found, the chat opens a case and links to it. Example data.")

## Left out on purpose

::: rows
Resolution date | A date we miss costs more trust than silence. Wait until response targets are reliable, then show an estimate.
Trends and automation | A single record makes it possible to ask which issues recur. That was out of reach until the record existed.
:::

## Results

The numbers are in the summary above. Fewer cases is a good sign only if developers were helped, not turned away. I have no satisfaction data to show that.

## Reflection

The most useful change was a model change, from "submit and wait" to "open a thread".

::: rows
Measure helped | Satisfaction after a deflected question, form drop-off, how often resolved cases are re-opened.
Bring back an estimate | A status label only half solves the black box. Add estimated resolution time once targets hold.
Grow Communications | One role-aware home for everything the marketplace tells developers. A direction, not something I shipped.
:::
