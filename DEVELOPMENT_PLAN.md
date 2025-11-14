# Cinderella’s Cakes – Development Plan

This living document tracks how the React/Vite project will be executed. It must be updated whenever tasks move forward so we always know what is done, what is in progress, and what still needs planning.

## Reference Specifications
- `cinderellapromt.txt` – consolidated text export of the design & development brief (primary day-to-day reference).
- `Cinderella’s Cakes Website_ Design and Development Plan.docx` – original source document in case we need to verify formatting or missing details.

## Guiding Requirements
- Tech stack: React (Vite), Tailwind CSS, Framer Motion, React Three Fiber (+ Drei), react-i18next, React Hook Form, React Helmet, with room for future TypeScript upgrades (`cinderellapromt.txt`, Project Overview & Tech Stack sections).
- Key experiences: bilingual content, premium fairy-tale aesthetic, interactive slideshow/carousels, 3D cake showcases, contact form, SEO-first structure, responsive/mobile-first, fixed topbar with quick info (see “Key Pages and Features” in the spec).
- Pages: Home, About, Products overview, individual Product Stories, Production/Services (Retail/Hotels/Catering), Contact, plus supporting assets like downloadable catalogues.
- All visual design must be executed with Tailwind utility classes / @apply (no standalone CSS layouts), per latest guidance.

## Progress Tracking Convention
- Checkbox legend: `[ ]` not started, `[~]` in progress, `[x]` completed.
- Every time a task state changes we will update this file (and reference the spec paragraph we followed if clarification is needed).
- Notes can be appended below each phase when implementation details diverge from the brief.

## Phase 0 – Discovery & Planning
- [x] Re-read `cinderellapromt.txt` and highlight open questions or ambiguities that may affect implementation order.
- [ ] Extract visual cues (color palette, typography hints, fairy-tale motifs, imagery needs) so UI tasks have clear references.
- [ ] Identify external assets (photos, 3D models, PDF catalogue) and define placeholders or delivery timelines.

## Phase 1 – Environment & Tooling
- [~] Confirm Vite + React + Tailwind scaffolding is clean and up to date (deps, scripts, linting, formatting).
- [ ] Install and configure required libraries: Framer Motion, @react-three/fiber, @react-three/drei, react-i18next, React Hook Form, React Helmet (spec “Tech Stack” bullet list).
- [ ] Establish shared config: absolute imports/aliases, Tailwind theme tokens, ESLint/Prettier rules, Git conventions.
- [ ] Document any environment setup steps (Node version, npm scripts) inside `README.md`.

## Phase 2 – Global Layout & Theming
- [x] Build the global layout skeleton (Topbar, Navbar, Footer, Router outlet) per “Homepage” + “Site-wide” description; ensure fixed topbar behavior.
- [~] Define Tailwind design tokens (colors, gradients, typography) to reflect the premium fairy-tale tone.
- [ ] Implement reusable UI primitives (buttons, tags, cards, section headers) for use across pages.
- [ ] Wire up base scrolling/animation helpers (e.g., intersection observers for reveal effects).

## Phase 3 – Content Infrastructure
- [ ] Create `src/locales/en.json` & `src/locales/bg.json`, and configure `react-i18next` with a language toggle (per “Internationalization” section).
- [ ] Model product/service data (JS/JSON) capturing attributes called out in the Products + Product Story sections (ingredients, stories, health tags, availability).
- [ ] Organize media assets (`src/assets` + `public/images`) and establish naming conventions for hero imagery, galleries, and 3D resources.
- [ ] Provide fallbacks/placeholders for assets that will arrive later while keeping the structure ready for swaps.

## Phase 4 – Page Implementations
- **Home**
  - [ ] Hero slideshow with CTA slides for best-sellers, catering, and B2B offerings; includes Framer Motion transitions.
  - [ ] Value/info panels (quality ingredients, mission, healthy options) and brand story preview linking to About.
  - [ ] Featured product carousel with “Discover the story” CTAs leading to detail pages.
  - [ ] Contact teaser section + embedded form summary + footer anchor.
- **About**
  - [ ] Story-driven layout with workshop/team imagery, timeline/milestones, and narrative copy from the spec.
  - [ ] Optional gallery strip or hero image highlighting craftsmanship.
- **Products Overview**
  - [ ] Responsive grid of product cards (no pricing) with ingredients, health highlights, and quick CTAs.
  - [ ] Featured best-sellers banner and link to downloadable PDF catalogue.
  - [ ] Filters or tags for categories (e.g., sugar-free, flourless, protein-rich).
- **Product Story Pages**
  - [ ] Template for flagship cakes: hero image/3D canvas, narrative, testimonials/fun facts, CTA to inquire/order.
  - [ ] Support for multiple products via dynamic routing/data.
- **Production / Services**
  - [ ] Sections for Retail, Hotels, and Catering, each outlining offerings, quality assurances, and inquiry CTAs.
  - [ ] Highlight logistics/consistency messaging from spec.
- **Contact & Footer Enhancements**
  - [ ] Full contact form (React Hook Form validation), Google Map/embed placeholder, address/phone for local SEO.
  - [ ] Footer with multilingual info, sitemap links, and legal elements.

## Phase 5 – Advanced Interactions & Visuals
- [ ] Implement 3D cake showcase using React Three Fiber/Drei with graceful fallbacks for unsupported devices.
- [ ] Add motion choreography (Framer Motion timelines, parallax scroll cues) aligning with the fairy-tale theme.
- [ ] Build carousels/sliders with accessible controls (keyboard/swipe) for hero and product sections.
- [ ] Integrate any video or interactive storytelling modules if provided later.

## Phase 6 – Internationalization, SEO & Performance
- [ ] Hook up language switcher that updates `<html lang>` attribute and stores preference.
- [ ] Use React Helmet (or @vitejs/plugin-react head helpers) for per-page titles, descriptions, Open Graph, and Twitter meta (per “SEO Best Practices” section).
- [ ] Add structured data (JSON-LD) for LocalBusiness and Product schemas.
- [ ] Generate/maintain an XML sitemap and robots.txt (under `public/`).
- [ ] Audit Core Web Vitals: lazy-loading media, preloading critical assets, code splitting where sensible.

## Phase 7 – QA, Content Polish & Launch
- [ ] Content QA in both languages (spelling, alignment with provided copy, placeholder replacements).
- [ ] Accessibility review (keyboard nav, contrast, aria labels on carousels/forms).
- [ ] Cross-browser/device responsive testing; capture issues in this file with pointers to sections that need fixes.
- [ ] Final build verification (`npm run build && npm run preview`) and deployment checklist (hosting target, analytics, domain, pre-render/prerender service if needed).
- [ ] Post-launch tasks: search console submission, performance monitoring hooks, backlog for future features (blog, ecommerce).

## Notes / Questions
- 2025-02-14 – По указание интерактивните/3D елементи са вътрешна спецификация: UI текстовете не трябва да обещават „3D истории“ или „интерактивна торта“, но функционалността остава в обхвата за разработка.
- 2025-02-14 – Създадена е проектната структура (layouts/pages/locales/hooks/styles + MainLayout + Home shell) според `cinderellapromt.txt`, включително базов footer.
- 2025-02-15 – Всички визуални елементи вече се реализират чрез Tailwind класове (или @apply в base слой); отделни CSS файлове за компоненти бяха премахнати.
