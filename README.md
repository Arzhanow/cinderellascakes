# Cinderella’s Cakes Frontend

Custom Vite + React build for a luxury confectionery experience. The goal is to deliver a bilingual, mobile-first landing site with cinematic UI flourishes, motion, and future-ready content architecture.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4 (custom theme tokens)
- Framer Motion, React Three Fiber + Drei, React Hook Form, react-i18next, React Helmet

## Project Structure

```
cinderellascakes/
├── public/
│   ├── index.html
│   ├── favicon.ico (placeholder)
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── TopBar.jsx
│   ├── hooks/
│   │   └── useToggleLanguage.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── locales/
│   │   ├── bg.json
│   │   └── en.json
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   └── base.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── DEVELOPMENT_PLAN.md
```

Each folder is aligned with the design brief: components host re-usable UI, layouts define chrome (topbar/nav/footer), pages represent routes, locales/hooks prepare us for i18n, and styles centralize global + section styles alongside Tailwind utilities.

## Scripts

- `npm run dev` – start Vite in dev mode with HMR.
- `npm run build` – production build (runs during CI).
- `npm run preview` – preview the production bundle locally.
- `npm run lint` – lint all files via ESLint.

## Next Steps

1. Install the rest of the required libraries (Framer Motion, R3F, react-i18next, etc.).
2. Flesh out additional pages (About, Products, Stories, Services) under `src/pages/`.
3. Wire localization + routing so the layout hosts actual navigation targets.
