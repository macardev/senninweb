# SenninWeb — AGENTS.md

## Stack
- **React 18**, **Vite**, **TailwindCSS 3**, **PostCSS**
- JavaScript (no TypeScript)
- `@` path alias → `./src` (configured in `vite.config.js`)
- React Router v7 (react-router-dom)
- `framer-motion` for animations
- **EmailJS** for contact form, **pdfmake** for PDF generation
- Deployed on **Vercel** (`vercel.json` rewrites SPA routes: `/blog`, `/gebze` → `/index.html`)

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Generates favicon.ico, starts Vite dev server |
| `npm run build` | Generates favicon.ico → builds → runs `postbuild.mjs` (sitemap gen + HTML perf optimization) |
| `npm run preview` | Serves the built `dist/` |
| `npm run generate-favicon` | Regenerate favicon.ico from SVG only |

No lint, typecheck, or test commands exist.

## Architecture
- **Routes**: `/` (Home), `/blog`, `/blog/:slug`, `/gebze`, `/sss`
- **Entry**: `src/main.jsx` → `src/App.jsx`
- **Layout**: `src/components/layout/Layout.jsx` renders Navbar + `<Outlet/>` + Footer; custom cursor (lazy, desktop-only hover-capable devices)
- **Home page** (`src/pages/Home.jsx`): Hero (eager), BlogCTA (eager), rest lazy-loaded inside `<Suspense>`
- **Blog pages** (`Blog.jsx`, `BlogPost.jsx`): lazy-loaded in App.jsx
- Blog data is static in `src/data/blogPosts.js` with section-based typed content blocks
- Production: sitemap auto-generated in `postbuild.mjs` (sitemap.xml added to `dist/`); CSS loading optimized to non-blocking, modulepreload tags injected

## Dev notes
- SSR-like prerendered hero in `index.html` for fast FCP; React hydrates over it
- Hash-anchor scroll on homepage: `/#contact`, `/#services`, etc. — handled by `Layout.jsx` + `scrollToId.js`
- Favicon SVG source: `public/favicon/favicon.svg`; ico regenerated during `dev` / `build`
- `node_modules` is the only thing gitignored
- No CI, no pre-commit hooks

## SEO
- SEO-REHBERI.md in project root: structured data (JSON-LD) guide with schema templates
- Organization schema in `index.html` (global)
- Home: Organization + WebSite (managed in page component via `useEffect`)
- Blog: CollectionPage
- BlogPost: Article (with image + datePublished)
- SSS: FAQPage
- Gebze: Service (local)
