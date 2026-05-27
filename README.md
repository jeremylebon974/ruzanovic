# RUZANOVIC — Maison de Mode

Site web officiel RUZANOVIC. Architecture Next.js 15 premium, optimisé Vercel.

## Stack

- **Next.js 15** — App Router
- **React 19** — Composants serveur + client
- **TailwindCSS** — Système de design tokens
- **Framer Motion** — Animations premium
- **TypeScript** — Code robuste

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déployer sur Vercel

```bash
# Option 1 — CLI
npm i -g vercel
vercel

# Option 2 — Git push
# Connecter le repo sur vercel.com
# Déploiement automatique à chaque push
```

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Layout root + fonts
│   └── page.tsx            # Page principale
├── components/
│   ├── ui/
│   │   └── CustomCursor.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── IntroScreen.tsx    # Intro cinématographique
│       ├── HeroSection.tsx    # Hero fullscreen
│       ├── EditorialIntro.tsx # Manifeste marque
│       ├── MarqueeSection.tsx # Ticker
│       ├── CollectionSection.tsx # Grid pièces
│       ├── EditorialFeature.tsx  # Feature pleine page
│       ├── LookbookSection.tsx   # Layout asymétrique
│       └── ContactSection.tsx   # CTA + contact
└── styles/
    └── globals.css         # Design system global

public/
└── images/                 # Assets éditoriaux
    ├── logo.jpg
    ├── tenu-1.png → tenu-6.png
```

## Extensions prévues

L'architecture est prête pour :
- `/dashboard` — espace admin
- `/shop` — e-commerce
- `/api` — endpoints backend
- CMS headless (Sanity / Contentful)
- Espace membre

## Design System

Couleurs :
- `rz-black` #0a0a0a
- `rz-white` #f5f2ee
- `rz-cream` #ede8e0
- `rz-stone` #8a8580
- `rz-orange` #e84c1e (accent signature)
- `rz-fluo` #d4f000 (accent signature)
- `rz-fuchsia` #e8006a (accent signature)

Typographie :
- Display : Cormorant Garamond
- Body : Jost
- Mono : DM Mono
