# Portfolio Development Rules

## 1. Project

This is the personal portfolio website for **Praveenkumar**, a Lead UX / Product Designer.

The portfolio should communicate:

* Strong product thinking
* UX and interaction design craft
* Experience designing complex digital products
* Ability to simplify complexity
* Strategic thinking
* Visual and interaction craft
* Mature editorial storytelling

The website is a **designer portfolio**, not a generic developer portfolio.

The work should be the dominant content.

---

# 2. Source of Truth

The design system is defined by:

* `docs/DESIGN.md`
* `design/tokens.json`
* `design/variables.css`
* `design/theme.css`

These files are the primary design-system references.

Before making significant visual changes:

1. Inspect the relevant design-system files.
2. Reuse existing tokens.
3. Avoid creating competing values.
4. Preserve the established visual language.

The portfolio may extend the design system when necessary, but extensions must feel intentional and consistent.

Do not blindly copy the information architecture or content of any reference website.

---

# 3. Product Philosophy

The portfolio should feel:

* Editorial
* Minimal
* Warm
* Precise
* Spacious
* Contemporary
* Design-led
* Quietly confident

It should feel like the website of a product designer who cares deeply about systems, typography, hierarchy, interaction and detail.

Avoid making the website feel:

* Template-driven
* Corporate
* Over-designed
* SaaS-like
* Dribbble-like
* Behance-like
* Excessively animated
* Generic AI-generated

The visual system should support the work rather than compete with it.

---

# 4. Technology Stack

Use:

* Next.js
* App Router
* TypeScript
* Tailwind CSS v4
* Motion
* Lucide React
* Next/Image
* Git
* GitHub
* Vercel

Initial implementation should not require:

* Database
* CMS
* Authentication
* Backend
* API layer

Project content should initially live in TypeScript files.

Avoid unnecessary dependencies.

---

# 5. Typography

## Primary Typeface

The primary typeface is **Switzer**.

Do not use Waldenburg or Inter.

Typography hierarchy:

* Display: Switzer 300
* Large headings: Switzer 300
* Headings: Switzer 300–400
* Body: Switzer 400
* Navigation: Switzer 400
* Buttons / emphasis: Switzer 500
* Technical metadata: Geist Mono 400

Do not introduce additional typefaces.

## Type Scale

Use the established scale:

* Display: 48px
* Heading: 36px
* Heading Small: 32px
* Body Large: 20px
* Body: 16px
* Body Small: 14px
* Caption: 10px

Display typography should use approximately:

`letter-spacing: -0.02em`

Body typography should use approximately:

`letter-spacing: 0.01em`

Typography should be responsive.

Do not simply scale every type size proportionally on mobile. Preserve hierarchy and readability.

---

# 6. Font Files

If licensed Switzer font files are available, place them under:

```text
public/fonts/Switzer/
```

Use the actual filenames available in the project.

Do not invent font filenames.

Geist Mono should live under:

```text
public/fonts/GeistMono/
```

If font files are not yet available, do not create fake `@font-face` declarations.

---

# 7. Color System

Use these established colors.

## Canvas

```text
Eggshell       #fdfcfc
Warm Taupe     #f5f3f1
Stone          #ebe8e4
```

## Typography

```text
Ink            #000000
Graphite       #44403b
Smoke          #777169
Ash            #a59f97
```

## Product / Project Accents

```text
Violet Spark   #0447ff
Ember Orange   #ff4704
```

Violet and orange are primarily for project/product visuals.

Do not use them as general UI chrome.

Avoid introducing arbitrary colors.

Do not use pure white `#ffffff` as the page background.

---

# 8. Page Canvas

The global page canvas should use the eggshell background:

```text
#fdfcfc
```

The portfolio uses a subtle **24px dot-grid paper background**.

The dot grid is a portfolio-specific extension of the existing spacing system.

Conceptually:

```css
background-color: #fdfcfc;
background-image: radial-gradient(
  circle,
  rgba(119, 113, 105, 0.22) 0.8px,
  transparent 0.8px
);
background-size: 24px 24px;
```

The dot grid should:

* Remain subtle
* Sit behind the page canvas
* Not interfere with readability
* Not appear inside every component
* Not appear inside project visuals
* Not become a decorative gimmick

Content surfaces can sit cleanly above the canvas.

---

# 9. Surfaces

Use:

### Page Canvas

`#fdfcfc`

### Feature Surface

`#f5f3f1`

### Divider / Border

`#ebe8e4`

Prefer:

* Flat surfaces
* Hairline borders
* Subtle contrast
* Clear hierarchy

Avoid:

* Heavy shadows
* Glassmorphism
* Excessive gradients
* Floating cards everywhere
* Excessive borders
* Pure white cards on an eggshell canvas

The interface should feel printed/editorial rather than glossy.

---

# 10. Layout

Maximum content width:

```text
1280px
```

Desktop horizontal gutter:

```text
64px
```

Tablet:

```text
32px
```

Mobile:

```text
20px
```

Use generous whitespace.

Typical section spacing:

```text
96px–125px
```

Card/content padding:

```text
32px
```

Small element spacing:

```text
8px–16px
```

Do not compress layouts simply to fit more content above the fold.

Whitespace is part of the design.

---

# 11. Border Radius

Use the established radius system.

```text
Cards:          20px
Large cards:    24px
Buttons:        9999px
Tags:           9999px
Inputs:         4px
Small elements: 4px–10px
```

Do not round every container.

Rounded corners should communicate component grouping, not decoration.

---

# 12. Navigation

The navigation should be minimal.

Recommended primary navigation:

```text
Work
About
Contact
```

Keep navigation:

* Simple
* Lightweight
* Spacious
* Easy to scan

Avoid:

* Mega menus
* Large dropdown systems
* Excessive navigation items
* Decorative navigation patterns
* Overly complex mobile navigation

Navigation should not compete with the hero.

---

# 13. Homepage Structure

The homepage should follow this high-level structure:

```text
Header
↓
Hero
↓
Selected Works
↓
About
↓
Contact
↓
Footer
```

The homepage should prioritize the work.

Do not add sections simply to make the page longer.

Avoid adding:

* Generic skills grids
* Testimonials
* Logo walls
* Statistics without meaning
* Generic services sections
* Random awards sections
* Decorative filler
* Tiny project-card grids

unless there is a strong content reason to introduce them later.

---

# 14. Hero

The hero should establish:

1. Who Praveenkumar is
2. What he does
3. What kind of product/design work he focuses on
4. Why the work is worth exploring

The hero should be editorial rather than promotional.

Prioritize:

* Strong typography
* Clear hierarchy
* Generous whitespace
* Simple supporting metadata
* One clear action toward the work

Avoid:

* Hero carousels
* Excessive animation
* Huge decorative illustrations
* Generic "I create digital experiences" language
* Multiple competing CTAs

---

# 15. Selected Works

Selected Works is the most important section of the homepage.

It is an **editorial sequence of project stories**, not a conventional card grid.

Do NOT implement the primary Selected Works section as:

```text
Card
Card
Card
Card
```

or a generic:

```text
3-column project grid
```

Instead, projects should flow vertically as editorial stories.

---

# 16. Project Story Structure

Each project should generally contain:

```text
Project number / category
↓
Project headline
↓
Short description
↓
Metadata
↓
Large product visual
↓
Supporting narrative / details
↓
Divider
↓
Next project
```

Example structure:

```text
01 · DESIGN

Stop programming.
Start directing.

Short project introduction.

Role
Year
Category

[LARGE PRODUCT VISUAL]

Supporting project details...

────────────────────────

02 · DESIGN

Project headline...

...
```

The exact content will vary by project.

Do not force every project into an identical composition.

---

# 17. Editorial Rhythm

Projects should create visual rhythm as the user scrolls.

Use variation through:

* Text alignment
* Visual scale
* Image placement
* Content density
* Section height
* Supporting details
* Asymmetric compositions

Variation should remain systematic.

Do not randomly change layouts.

The experience should feel authored.

---

# 18. Project Visuals

Project visuals should be large and dominant.

Use `next/image` wherever practical.

Prioritize:

* High-quality screenshots
* Product UI
* Real project artifacts
* Interface details
* Meaningful visual storytelling

Avoid:

* Generic stock photography
* Decorative mockups with no informational value
* Tiny screenshots
* Excessive device frames
* Visuals that obscure the actual product

The product itself should be the visual hero.

---

# 19. Project Content Architecture

Keep project content data-driven.

Use:

```text
src/content/projects.ts
```

A project should contain structured metadata such as:

```ts
type Project = {
  slug: string
  title: string
  description: string
  role: string
  year: string
  category: string
  thumbnail: string
  featured?: boolean
}
```

Extend this structure as the case-study system evolves.

Do not hard-code the same project content independently across multiple components.

---

# 20. Case Studies

Individual case studies live under:

```text
/work/[slug]
```

Case studies should feel like editorial product stories.

Recommended structure:

```text
Project Hero
↓
Context
↓
Problem
↓
Research / Discovery
↓
Strategy
↓
Design Exploration
↓
Final Experience
↓
Impact
↓
Reflection
↓
Next Project
```

Not every project needs every section.

Only include sections that strengthen the story.

Avoid making case studies feel like:

* Slide decks
* Behance presentations
* Marketing landing pages
* Endless image galleries

The narrative should explain:

* What happened
* Why it mattered
* What decisions were made
* What the designer contributed
* What changed because of the work

---

# 21. About Page

The About page should communicate:

* Professional identity
* Design philosophy
* Experience
* Selected background
* Relevant capabilities
* Personality where appropriate

Keep it editorial.

Avoid turning the page into a conventional resume dump.

Do not create a giant skill matrix unless there is a clear reason.

---

# 22. Contact

Contact should be simple and direct.

Prioritize:

* Clear invitation
* Email/contact action
* Relevant social/professional links if provided

Do not create unnecessary forms unless required.

---

# 23. Footer

Keep the footer minimal.

It may contain:

* Name
* Copyright
* Navigation
* Contact
* Relevant external links

Avoid making the footer another major visual section.

---

# 24. Components

Prefer reusable components.

Recommended structure:

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── navigation/
│   │   └── Nav.tsx
│   │
│   ├── typography/
│   │   ├── Display.tsx
│   │   ├── Heading.tsx
│   │   ├── Body.tsx
│   │   └── Label.tsx
│   │
│   ├── buttons/
│   │   ├── Button.tsx
│   │   └── LinkButton.tsx
│   │
│   ├── projects/
│   │   ├── SelectedWorks.tsx
│   │   ├── ProjectStory.tsx
│   │   ├── ProjectIntro.tsx
│   │   ├── ProjectVisual.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── ProjectMeta.tsx
│   │   └── NextProject.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AboutPreview.tsx
│   │   └── ContactCTA.tsx
│   │
│   └── motion/
│       ├── FadeIn.tsx
│       └── Reveal.tsx
│
├── content/
│   ├── projects.ts
│   └── site.ts
│
└── lib/
    └── utils.ts
```

This structure is a guideline, not a requirement to create every file immediately.

Do not create abstractions before they are needed.

---

# 25. Tailwind

Use Tailwind CSS v4.

Prefer design tokens and semantic values over arbitrary one-off values.

Avoid excessive arbitrary Tailwind values such as:

```text
mt-[37px]
px-[53px]
text-[#123456]
```

unless the value has a deliberate design reason.

Use the established token system whenever possible.

---

# 26. Accessibility

Accessibility is required.

Use:

* Semantic HTML
* Proper heading hierarchy
* Accessible links and buttons
* Keyboard navigation
* Visible focus states
* Meaningful alt text
* Sufficient contrast
* Reduced-motion support
* Proper interactive states

Do not use `div` elements as buttons or links when semantic elements are appropriate.

---

# 27. Responsive Design

The site must work across:

* Desktop
* Tablet
* Mobile

Do not treat mobile as a shrunken desktop.

On mobile:

* Preserve typography hierarchy
* Reduce horizontal padding appropriately
* Simplify complex compositions
* Maintain whitespace
* Keep project visuals prominent
* Prevent horizontal overflow
* Ensure navigation remains usable

Test at realistic viewport sizes.

---

# 28. Motion

Use Motion selectively.

Motion should communicate:

* Hierarchy
* Continuity
* Interaction
* Spatial relationships

Good uses:

* Hero reveal
* Image reveal
* Section entrance
* Subtle project hover
* Page transitions
* Navigation interactions

Avoid:

* Excessive parallax
* Floating elements everywhere
* Long animations
* Constant movement
* Animation for decoration alone

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled, remove or simplify non-essential animation.

---

# 29. Images

Use `next/image` where appropriate.

Organize project assets under:

```text
public/projects/
```

Example:

```text
public/
└── projects/
    ├── utsav/
    ├── project-02/
    └── project-03/
```

General site imagery can live under:

```text
public/images/
```

Do not add placeholder imagery that looks like final content.

If real assets are unavailable, use clearly temporary placeholders that can be replaced easily.

---

# 30. Current Project: Utsav

Utsav is one of the portfolio projects.

Initial project data may use:

```text
Title:
Utsav

Role:
Lead Product Designer

Year:
2026

Category:
Consumer · Marketplace
```

The description and case-study content should not be invented.

Use placeholders until the actual project information is supplied.

Do not fabricate:

* Metrics
* User research
* Business results
* Product claims
* Client information
* User numbers
* Revenue
* Conversion improvements

Only use factual project information provided by the user.

---

# 31. Code Quality

Use TypeScript throughout.

Avoid:

```ts
any
```

unless there is a documented technical reason.

Prefer:

* Small components
* Clear props
* Data-driven rendering
* Semantic naming
* Predictable state
* Reusable primitives
* Simple architecture

Do not over-engineer.

Do not add libraries when native Next.js, React, CSS, Tailwind, Motion or Lucide can solve the problem cleanly.

---

# 32. Performance

Prioritize:

* Next/Image
* Optimized images
* Minimal JavaScript
* Server components where appropriate
* Lazy loading where useful
* Avoiding unnecessary client components
* Avoiding unnecessary dependencies

Do not make the entire application a client component.

Use `"use client"` only when needed.

---

# 33. SEO

Each page should have appropriate metadata.

At minimum:

* Title
* Description
* Open Graph metadata where appropriate
* Correct canonical URL when the production domain is known

Use Next.js metadata APIs.

Do not invent the production domain.

---

# 34. Development Process

Before making a major change:

1. Inspect the existing implementation.
2. Inspect relevant design-system files.
3. Understand the current component structure.
4. Identify conflicts or missing setup.
5. Explain the proposed approach.
6. Make the smallest coherent change.
7. Run validation.
8. Report what changed.

Do not rewrite working code unnecessarily.

Do not modify unrelated files.

Do not introduce speculative architecture.

---

# 35. Claude Code Behaviour

When starting work on the project:

First inspect:

```text
CLAUDE.md
docs/DESIGN.md
design/tokens.json
design/variables.css
design/theme.css
```

Then inspect the current project structure.

Before implementing a significant feature, briefly state:

* What you found
* What you propose
* Which files will change
* Any assumptions

For major changes, wait for approval before proceeding if the user has asked for review-first workflow.

For small, explicitly requested changes, implement directly.

---

# 36. Validation

After meaningful changes, run:

```bash
npm run lint
npm run build
```

If either command fails:

1. Diagnose the actual error.
2. Fix the root cause.
3. Run the validation again.

Do not claim a change is complete if the build is broken.

When visual work changes, also inspect the result in the browser at:

* Desktop
* Tablet
* Mobile

Check for:

* Overflow
* Incorrect spacing
* Typography problems
* Broken images
* Misaligned sections
* Responsive issues
* Interaction problems

---

# 37. Git

Use small, meaningful commits.

Example:

```bash
git add .
git commit -m "chore: initialize portfolio foundation"
```

Prefer commits such as:

```text
feat: build portfolio header
feat: add homepage hero
feat: build selected works editorial layout
feat: add project detail page
style: refine typography hierarchy
fix: resolve mobile overflow
refactor: simplify project story components
```

Avoid giant commits containing unrelated changes.

---

# 38. Do Not

Do not:

* Recreate ElevenLabs
* Copy another designer's portfolio
* Introduce random colors
* Use Waldenburg
* Use Inter
* Add excessive shadows
* Use glassmorphism
* Turn Selected Works into a generic card grid
* Overuse rounded containers
* Over-animate the page
* Invent project metrics
* Invent project content
* Create unnecessary dependencies
* Rewrite working architecture without reason
* Add a database/CMS prematurely
* Make every section look identical
* Sacrifice whitespace to fit more content
* Use decorative elements that don't support hierarchy

---

# 39. Design Decision Hierarchy

When deciding between implementation options, prioritize in this order:

```text
1. Content clarity
2. Information hierarchy
3. Design-system consistency
4. Editorial composition
5. Accessibility
6. Responsive behaviour
7. Performance
8. Motion
9. Decorative detail
```

Do not sacrifice hierarchy for visual novelty.

---

# 40. Overall Quality Bar

The finished portfolio should feel like a carefully designed product.

A visitor should immediately understand:

```text
Who is this designer?
↓
What kind of work do they do?
↓
What products have they worked on?
↓
How do they think?
↓
What did they actually design?
↓
How can I contact them?
```

The interface should feel restrained enough that the **quality of the work becomes the visual identity**.

The final result should be:

**Minimal. Editorial. Warm. Precise. Spacious. Product-focused.**
