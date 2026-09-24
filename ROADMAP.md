# Roadmap

Personal portfolio site: Astro + TinaCMS (local/Git mode), deployed static on Vercel.

How do you eat an elephant? One bite at a time. Milestones are the elephants, tasks are the bites.

## Decisions

- **TinaCMS in local/Git mode.** No TinaCloud, no self-hosted backend. Content lives in the repo, edit with `pnpm dev`, commit, push, Vercel builds.
- **Fully static.** No server runtime in production.
- **Assets in the repo, kept lean.** Optimise images on the way in, Astro generates sizes. Video is hosted externally (YouTube/Vimeo), never committed.
- **Upgrade path stays open.** TinaCloud or a self-hosted backend later is a config change, not a rebuild.

---

## M0: Clean house

- [ ] Commit current work on a branch
- [ ] Use pnpm only, delete `package-lock.json`
- [ ] Remove deploy adapters, go fully static (confirm `/tina-island` isn't needed in prod)
- [ ] Remove Firebase + LikeButton
- [ ] Pick one design language (dark minimal vs space theme)
- [ ] Delete starter junk: llamas, tinanaut, placeholder blog posts, `/shadcn-test`
- [ ] Remove TinaCloud references from `.env.example` and `tina/config.ts`
- [ ] Update README and GEMINI.md to describe the real project and editing workflow

## M1: Live on the real domain

- [ ] Vercel project from the repo, static build via `build:local`, `SITE_URL` set
- [ ] Retire the GitHub Pages workflow (or repurpose Actions for CI checks)
- [ ] Keep `/admin` out of the production build (or block + noindex)
- [ ] Preview deploys from `develop`, production from `main`
- [ ] Point the domain at it, confirm HTTPS

## M2: Content model in Tina

- [ ] **Projects** collection: title, slug, summary, role, client, year, stack tags, cover, gallery, live URL, repo URL, featured, SEO group, body
- [ ] **Experience** collection: company, role, dates, location, highlights
- [ ] **Skills** (grouped), in global config or own collection
- [ ] Reusable **SEO field group** on every collection: title, description, OG image, noindex
- [ ] **Global config**: name, headline, socials, resume PDF, contact email
- [ ] Rename Blog to Notes
- [ ] Media conventions: folder structure, max dimensions, formats

## M3: Design system

- [ ] Tokens for colour, type scale and spacing in `global.css`
- [ ] Rebuild template sections as Tina blocks (feature folder pattern)
- [ ] New blocks: project card, tag, timeline item, skill grid
- [ ] Light/dark toggle driven by tokens
- [ ] Mobile pass at 360px

## M4: Core pages

- [ ] Home: positioning line, featured projects, CTA to resume and contact
- [ ] `/work` index + `/work/[slug]`
- [ ] `/about`: experience timeline + skills from data
- [ ] `/resume`: PDF embed + download
- [ ] `/contact`: working form (Vercel function or Formspree) + spam protection
- [ ] 404 in the new design

## M5: Case studies

- [ ] Lobster (Figma to WordPress pipeline), sanitised, with a diagram
- [ ] Jam Collective (Payload build)
- [ ] Centro Church app (Flutter/Firebase)
- [ ] QTFN WordPress build
- [ ] Same shape for each: problem, constraints, what I built, stack, outcome, screenshots

## M6: SEO foundation

- [ ] Rewrite `robots.txt` and `llms.txt` for the real domain
- [ ] Canonical, OG and Twitter tags in BaseHead, driven by the SEO group
- [ ] JSON-LD: Person + ProfilePage (home/about), CreativeWork (case studies), BreadcrumbList
- [ ] OG image for every page
- [ ] Keyword map: one target phrase per page
- [ ] Alt text and heading hierarchy audit
- [ ] Verify sitemap, point RSS at Notes

## M7: Proof layer

- [ ] Lighthouse 95+ across the board, Lighthouse CI in Actions
- [ ] axe accessibility pass + accessibility statement page
- [ ] Playwright smoke tests in CI + GIF on the site
- [ ] "How this site is built" page
- [ ] Analytics (Vercel Analytics or Plausible)

## M8: Launch and distribution

- [ ] Google Search Console + Bing Webmaster, submit sitemap
- [ ] Site link on resume, LinkedIn, GitHub profile, email signature
- [ ] Pin the repo on GitHub with a decent README
- [ ] First 2 Notes posts
- [ ] Site link in every application from here on

## Later

- Component library page
- More Notes posts
- Google Passwordless plugin case study
- Remote editing via self-hosted Tina backend, if ever needed
