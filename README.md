# Aia Health — Medical Equipment Storefront

A modern e-commerce front end for a medical equipment and supplies business, built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui**. It includes an interactive 3D hero, a working cart, product detail pages and an on-site shopping assistant.

[![Live demo](https://img.shields.io/badge/Live_demo-0F766E?style=for-the-badge&logo=githubpages&logoColor=white)](https://mmn-software.github.io/aia-health/)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)

---

## Highlights

- **3D hero scene** built with React Three Fiber and Drei, loaded client-side so it doesn't block first paint
- **Product catalogue** with category grid, featured products and statically generated detail pages (`/product/[slug]`)
- **Cart** backed by React Context: add, remove, change quantity, live totals
- **Shopping assistant** chat widget driven by an intent-based engine (product search, price ranges, comparison, shipping, returns, bulk quotes). The engine exposes a single `respond()` function so it can be swapped for an LLM API later without touching the UI
- **Accessible UI** built on Radix primitives via shadcn/ui (dialog, sheet, tabs, accordion, dropdown), plus toast notifications with Sonner
- **Static export** (`output: "export"`) deployed to GitHub Pages through GitHub Actions

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, `class-variance-authority`, `tailwind-merge` |
| UI components | shadcn/ui (Radix UI), Lucide icons |
| Motion & 3D | Framer Motion, Three.js, React Three Fiber, Drei |
| Deployment | GitHub Actions → GitHub Pages |

## Project structure

```
src/
├── app/                 # Routes: home, products, product/[slug], cart, about, faq, contact
├── components/
│   ├── sections/        # Page sections (hero, featured products, testimonials, FAQ…)
│   ├── shared/          # Reusable pieces (product card, section heading)
│   ├── assistant/       # Chat widget UI
│   └── ui/              # shadcn/ui primitives
├── lib/
│   ├── assistant/       # Intent-matching assistant engine
│   ├── data/            # Product catalogue
│   └── store/           # Cart context
└── types/               # Shared TypeScript types
```

## Getting started

```bash
git clone https://github.com/MMN-software/aia-health.git
cd aia-health
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export to ./out
npm run lint
```

> `basePath` is set to `/aia-health` for GitHub Pages. Remove it in `next.config.ts` if you deploy to a domain root.

## Roadmap

- Connect the catalogue to a headless CMS or database
- Checkout with a payment provider
- Replace the rule-based assistant with an LLM-backed endpoint

---

Built by **[Mohammad Mehdi Nemati](https://github.com/MMN-software)** · Available for freelance work — [get in touch](mailto:mohammadmehdi.neemati@gmail.com)
