# Offshore Africa Magazine — Website

The official website for **Offshore Africa Magazine**, Africa's premier monthly
energy, mining, oil and gas publication.

- **Live domain:** https://offshoreafricamagazine.net
- **Stack:** [Astro 5](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com)
- **Hosting:** Cloudflare Pages (static, auto-deploys from GitHub)
- **Content:** Markdown files (no database, no server runtime)

---

## Local development

Requires **Node 20+** and **npm**.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

---

## How auto-deploy works

The site is hosted on **Cloudflare Pages** and connected to this GitHub repo.

1. You push a commit to the `main` branch.
2. Cloudflare Pages detects the push and runs the build.
3. When the build succeeds, the new site goes live automatically — usually
   within a couple of minutes.

You never deploy by hand. **Push to `main` and the site updates itself.**

Cloudflare Pages build settings (already configured):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

> `dist/` is git-ignored — Cloudflare builds it. The magazine PDFs in
> `public/magazines/` **are** committed, because Cloudflare needs them at build time.

---

## How to add a new article

1. Create a new markdown file in `src/content/articles/`, e.g.
   `my-new-article.md`. The file name becomes the article URL
   (`/articles/my-new-article/`), so use lowercase words with hyphens.
2. Add the frontmatter block at the top:

   ```markdown
   ---
   title: "Your Article Headline"
   date: 2026-06-01
   author: "Gilbert Da Costa"
   category: "Oil & Gas"
   excerpt: "A one or two sentence summary shown on article cards and previews."
   featured: false
   ---

   Your article body goes here in **Markdown** — headings, lists,
   links, blockquotes and images all work.
   ```

3. `category` **must** be one of: `Oil & Gas`, `Mining`, `Downstream`,
   `Company News`, `Interviews`, `Gas`.
4. Commit and push to `main`. The article appears automatically.

---

## How to add a new magazine issue

1. Drop the PDF into `public/magazines/`. Use a URL-safe filename — all
   lowercase, hyphens instead of spaces, e.g.
   `offshore-africa-june-2026.pdf`.
2. Create a markdown file in `src/content/issues/`. Name it
   `YYYY-MM-month.md` (e.g. `2026-06-june.md`) so issues sort correctly.
3. Add the frontmatter:

   ```markdown
   ---
   title: "June 2026"
   date: 2026-06-01
   pdf: "/magazines/offshore-africa-june-2026.pdf"
   pdfSize: "8.2 MB"
   featured: true
   ---
   ```

   - `pdf` is the path under `public/` (note the leading `/`).
   - `pdfSize` is shown on the issue card — check the file's size and type it in.
   - `featured: true` marks it as the current issue (set it `false` on the
     previous month's file).
4. Commit and push to `main`. The issue appears on the homepage, the Issues
   archive and the Subscribe page automatically — newest first. The three most
   recent issues get a "New" badge.

---

## Set up the contact form (Web3Forms)

The contact form uses [Web3Forms](https://web3forms.com) — free, no backend.

1. Go to https://web3forms.com and enter the email address where you want
   form submissions delivered. You'll receive an **access key** (takes ~30s).
2. Open the `.env` file in the project root and set:

   ```
   PUBLIC_WEB3FORMS_KEY=your-real-access-key-here
   ```

3. In the **Cloudflare Pages dashboard** → your project → **Settings** →
   **Environment variables**, add the same variable:
   `PUBLIC_WEB3FORMS_KEY = your-real-access-key-here`.
4. Redeploy (push any commit, or use "Retry deployment").

Until a real key is set, the form shows a friendly "not yet configured" message
instead of submitting.

---

## Configure the newsletter / subscribe API

The newsletter and subscribe forms POST to the magazine mailer signup endpoint.

1. In `.env`, set the endpoint URL:

   ```
   PUBLIC_SIGNUP_API_URL=https://api.offshoreafricamagazine.net/public/signup
   ```

   During local development this defaults to
   `http://localhost:3000/public/signup`.
2. Add the same variable in the **Cloudflare Pages** environment variables so
   the live site uses the production endpoint.
3. The endpoint receives a JSON body: `{ "email": "...", "name": "..." }`.

---

## Project structure

```
src/
├── components/     # Header, Footer, Hero, cards, forms
├── content/
│   ├── articles/   # one markdown file per article
│   └── issues/     # one markdown file per magazine issue
├── layouts/        # Base.astro — shared <head>, SEO, fonts
├── pages/          # one file per route
├── styles/         # global.css — design tokens & article styling
├── consts.ts       # contact details, nav, site config — edit here
└── content.config.ts  # content collection schemas
public/
├── magazines/      # magazine PDFs (committed to git)
├── images/         # site & article images
├── favicon.svg
└── robots.txt
```

To update contact details (email, phone, address, Instagram), edit
**`src/consts.ts`** — it feeds the header, footer and contact page.
