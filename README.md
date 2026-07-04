# Emad | Data Analyst — Portfolio Website

A single-page portfolio site for a Business Intelligence Engineer / Data
Analyst. Built with plain HTML, CSS, and vanilla JavaScript — no
frameworks, no build step, no external dependencies (no CDNs, no Google
Fonts, no icon libraries). Everything needed to render the page is inside
this repo, so it works fully offline once cloned.

```
/index.html
/assets/css/style.css
/assets/js/script.js
/assets/js/data.js
/assets/images/          (drop og-image.png etc. here)
/README.md
```

---

## 1. Upload this project to GitHub

1. Create a new repository on GitHub (e.g. `portfolio`).
2. From this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Refresh the repo page on GitHub — you should see all the files.

## 2. Enable GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub will give you a live URL shortly, usually:
   `https://<your-username>.github.io/<repo-name>/`

## 3. Connect a custom domain later

No code changes are required — GitHub Pages reads a `CNAME` file at the
repo root.

1. Add a file named exactly `CNAME` (no extension) at the project root,
   containing just your domain, e.g.:
   ```
   www.emaduddin.com
   ```
2. At your domain registrar, add a `CNAME` record pointing your subdomain
   (e.g. `www`) to `<your-username>.github.io`. For an apex domain
   (`emaduddin.com` with no `www`), add `A` records pointing to GitHub
   Pages' IP addresses (GitHub's docs list the current set).
3. Back in **Settings → Pages**, enter the custom domain and enable
   **Enforce HTTPS** once it's verified.
4. Before going live, update the placeholder URLs in `index.html`:
   `<link rel="canonical">` and the `og:url` meta tag.

## 4. Where to edit personal information

| What                                   | File                          |
|-----------------------------------------|-------------------------------|
| Name, title, hero summary                | `index.html` → `.hero__content` |
| Contact details (email, phone, links)    | `assets/js/data.js` → `contact` array |
| Skills                                   | `assets/js/data.js` → `skills` array |
| Projects                                 | `assets/js/data.js` → `projects` array |
| Footer copyright line                    | `index.html` → `.site-footer` |
| Colors, fonts, spacing                   | `assets/css/style.css` → `:root` variables at the top |
| Favicon / OG image                       | `index.html` `<head>`, and drop a real `og-image.png` (1200×630px) into `assets/images/` |

## 5. How to add a new project

Open `assets/js/data.js` and find the `projects` array. Copy one existing
object, paste it as a new entry, and edit the fields:

```js
{
  id: "my-new-project",
  title: "Project Title",
  description: "One or two sentences describing what it does and the impact.",
  tags: ["Power BI", "SQL"],
  githubUrl: "https://github.com/you/repo",
  demoUrl: "",   // leave empty for a disabled "Coming soon" button
},
```

That's the only change needed — a new card appears automatically, no HTML
or CSS edits required.

## 6. How to add or update a skill

Same idea, in the `skills` array in `assets/js/data.js`:

```js
{
  id: "sql",
  name: "SQL",
  icon: ICONS.powerbi, // reuse an existing icon, or add a new one to ICONS
  description: "Short description of how you use this skill.",
  bullets: ["Query Optimization", "Stored Procedures", "Indexing"],
},
```

If you want a brand-new icon, add it to the `ICONS` object near the top of
`data.js` as an inline SVG string, then reference it the same way.

## 7. Extending this into a multi-page site later

The current structure is intentionally easy to grow without breaking
anything:

- **Add detail pages** (e.g. `/projects/project-1.html`) as new standalone
  HTML files that reuse `assets/css/style.css` and link back to
  `index.html`. Each project object in `data.js` can then get an optional
  `detailUrl` field pointing to its page.
- **Add a blog** by creating a `/blog/` folder with its own `index.html`
  (a post list) and one HTML file per post, all sharing the same
  stylesheet and nav markup.
- **Keep content in `data.js`-style files** for any new repeating content
  type (blog posts, testimonials, etc.) rather than hardcoding it in
  HTML, following the same pattern used for `skills` and `projects`.
- **Keep JS modular**: add new features as new named functions in
  `script.js` (or a new file loaded alongside it), rather than editing
  existing functions, so nothing already working gets disturbed.
- Because there's no build step, every new page is just another static
  HTML file — GitHub Pages serves it automatically once it's pushed.

---

## Before publishing

- Replace the placeholder email, phone, LinkedIn, and GitHub values in
  `assets/js/data.js` (`contact` array) with your real details — this
  repo, and therefore this info, will be public.
- Replace the placeholder GitHub/demo URLs in the `projects` array.
- Add a real `og-image.png` to `assets/images/` and update the canonical
  URL / `og:url` in `index.html` once you know your final domain.
