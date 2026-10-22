# Department of Engineering Technology — Website

Official website for the **Department of Engineering Technology**, **Faculty of Technology**,
**University of Jaffna**.

Built with **HTML5, CSS3 and vanilla JavaScript only**. No frameworks, no backend, no database,
no build step, no package installation required. The home page and `404.html` sit at the site root;
every other page is a flat HTML file inside `pages/`. Links work when files are opened directly
from disk, and a simple static file server (see section 2) mirrors real hosting exactly.

Institutional hierarchy used throughout the site:

```
University of Jaffna
  └── Faculty of Technology
        └── Department of Engineering Technology
              ├── Automobile Technology
              ├── Construction Technology
              └── Electro Technology
```

---

## 1. Project structure

```
department-website/
├── index.html                      # Home (Faculty intro → News & announcements → Department → Specialisations → Academic overview → Facilities)
├── 404.html
├── pages/                          # Every inner page is a flat HTML file in this one folder
│   ├── about.html                  # Dean's message, academic organisation, HoD message, vision & mission, history
│   ├── staff.html                  # Searchable / filterable staff directory
│   ├── academics.html
│   ├── research.html
│   ├── facilities.html
│   ├── news.html
│   ├── downloads.html
│   ├── contact.html
│   ├── automobile-technology.html
│   ├── construction-technology.html
│   └── electro-technology.html
├── assets/
│   ├── css/
│   │   └── styles.css              # All styling (mobile-first)
│   ├── js/
│   │   ├── content.js              # EDITABLE core content: identity, dean/HoD messages, about, facilities, contact
│   │   ├── specialisations.js      # EDITABLE: specialisations, academic overview, Academics page
│   │   ├── research.js             # EDITABLE: research publications
│   │   ├── news.js                 # EDITABLE: news and announcements
│   │   ├── downloads.js            # EDITABLE: E-Resources / downloads sections
│   │   ├── staff.js                # EDITABLE staff records (single source of truth)
│   │   └── site/
│   │       └── main.js             # Behaviour + rendering (navigation, staff filter, page rendering)
│   ├── images/                     # Images: header logo (colour), footer logo (black & white), favicon (.ico), SVG placeholders
│   └── documents/                  # Put official PDFs and documents here
└── docs/
    ├── README.md
    ├── ADMIN_GUIDE.md              # Plain-language manual for admins (every page & file)
    └── CONTENT_CHECKLIST.md        # List of official information still required
```

The header, navigation, footer and core page text are plain HTML in every page. Repeated or
frequently-updated information is rendered by JavaScript from the two data files.

Every page links to others with plain relative `.html` URLs (e.g. `about.html`,
`automobile-technology.html` within `pages/`, or `index.html` for the home page). Each page's
`<body>` carries a `data-base` attribute (`""` at the site root, `"../"` inside `pages/`) that the
scripts use to build correct asset and content paths.

The official University of Jaffna logo (`assets/images/UOJ-Logo-Color-scaled.png`) is the header
brand mark, and `assets/images/UOJ-Logo-Black-White-scaled.png` is the footer mark. Both have been
optimised to match their rendered sizes (the header mark displays at 40–48 px and the footer mark at
72 px) so they stay sharp on high-density screens without shipping the full-resolution originals.
The footer mark is monochrome black artwork; it is rendered white against the dark footer with
`filter: brightness(0) invert(1)` (`.footer__logo` in `assets/css/styles.css`). The favicon
(`assets/images/UOJ-Logo-Color-scaled.ico`) is linked from the `<head>` of every page. On desktop
the blue navigation bar is `position: sticky` and stays pinned to the top of
the viewport, while the masthead scrolls out of view. On mobile (below `lg`) the roles reverse: the
masthead — with the "Menu" button — is sticky, and the breadcrumbs bar (on every page except the
home page and 404) pins directly beneath it.

---

## 2. Local preview

You can preview the site in any of these ways:

**Option A — open directly**
All pages use plain relative links (e.g. `pages/about.html`, `../assets/css/styles.css`), so
double-clicking `index.html` or any file in `pages/` works without a server. Use Option B when you
want to mirror real hosting exactly (and to test `404.html`).

**Option B — simple static server (recommended, mirrors real hosting)**

Python 3:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080/`.

Node (if you already have it — no packages needed):

```bash
npx serve .
```

> A server is recommended because it tests relative paths exactly as a real host does, and it lets
> you test the 404 behaviour.

### Testing the 404 page

The site is hosted on the domain root (currently Netlify — `https://engineeringtech.netlify.app/`),
and Netlify serves `404.html` automatically for unknown paths while keeping the requested URL in the
address bar. Most other static hosts can be configured to do the same (`ErrorDocument` on Apache,
`error_page` on nginx).

> **`404.html` resolves every URL against a `<base>` element.** Because the error page is shown for
> *any* missing URL (e.g. `/foo/bar/`), a path relative to the browser's own URL would resolve to
> `/foo/bar/assets/...` and break. Instead the page carries `<base href="/">` (the site root) and
> writes its stylesheet, images, scripts and links as plain relative paths (`assets/...`,
> `pages/about.html`, `./`). A two-line script flips the base to `./` when the file is opened
> directly from disk (`file://`), so double-clicking `404.html` also renders correctly. Keep the
> URLs relative and keep the `<base>` if you edit the page.

Every other page keeps relative paths (with its own `data-base`) so the pages inside `pages/`
resolve their assets correctly; the `404.html` `<body>` uses `data-base=""` because the `<base>`
element already supplies the root.

---

## 3. Editing the site

> **There is no browser-based admin panel.** All updates are made by editing the source files
> and then **uploading** the changed files to the web server (no build step, no undeploy/redeploy
> and no downtime). Nothing updates on the live site until the edited files are uploaded.

All editable, repeated content lives in these files (each loads after `content.js`
and merges into the same `window.DEPARTMENT_CONTENT` object):

- `assets/js/content.js` — core content: institutional identity, Dean's and Head of Department
  messages, the About page, facilities and contact details.
- `assets/js/specialisations.js` — the three specialisations, the academic overview tiles and the
  Academics page content.
- `assets/js/research.js` — research publications.
- `assets/js/news.js` — news and announcements.
- `assets/js/downloads.js` — E-Resources / downloads sections.
- `assets/js/staff.js` — every staff record.

### How to edit a file (for admins) — the short version

Every content file has the same simple rules, and the rules are repeated at the
top of each file so you do not have to remember them:

1. Open the file in any **plain-text editor** (Notepad++, VS Code, etc.).
2. Only change the text **between the quotes** `" "`. Never change the labels
   (`title:`, `name:`, …) or the `{ } [ ] , : ;` characters.
3. Any text in `[square brackets]` is a **placeholder** — replace it with the
   real, approved wording. Never invent names, dates, figures or statements.
4. Keep every comma between items. When deleting an item, delete its whole
   `{ ... }` block including the trailing comma.
5. To **add** an item, copy an existing block, paste it after the last one, add
   the missing comma, give it a new unique `id`, then edit the text.
6. **Save**, then **re-upload** the file to the same folder on the server.
   Nothing changes on the live site until the file is uploaded.
7. **Preview** in a browser. If a page goes blank, a comma or bracket is
   missing — undo (`Ctrl+Z`) and re-check.

`site/main.js` is **not** an admin file — do not edit site text there.

> **For a full, non-technical admin manual** — every page, every file, adding items,
> uploading and troubleshooting — see **`docs/ADMIN_GUIDE.md`**.

### What is editable (JS) vs static HTML

- **Editable in the data files** — change these only in the JS files above: specialisation
  names, Dean/HoD messages, staff records, academic overview, research, facilities, news,
  downloads, contact details, **and** the institutional identity text (university / faculty /
  department), the home hero and department headings, and the contact identity lines.
- **Static HTML** — the header, navigation structure, footer structure, breadcrumbs and the general
  page prose (About, Academics, etc.). These are plain HTML in each page; edit the page file
  directly if the wording needs to change.
- A few values exist in **both** places on purpose: the data file is the source of truth and the
  matching static HTML is the **no-JS fallback** (see §3.10 for the specialisation names). Editing
  the data file is enough.
- Values marked **RESERVED** in `content.js` / `specialisations.js` (`institution.tagline`, `specialisations[].shortName`)
  are stored but not shown anywhere yet — do not expect them to appear.

Text wrapped in `[square brackets]` is an **editable placeholder**. Replace it with approved
official content only. Never invent names, qualifications, statistics, dates, messages, module
codes, credits or accreditation claims.

After editing, always reload the page(s) to confirm the change and check the browser console for
errors (press F12).

### 3.1 Add a staff member

Open `assets/js/staff.js` and add a new object to the `members` array. Copy an existing record and
change the fields:

```js
{
  id: "academic-staff-03",             // unique, stable; do not reuse an existing id
  name: "Dr Full Name",
  designation: "Senior Lecturer",
  category: "academic",                // "head" | "academic" | "technical" | "admin"
  qualifications: "BSc (Hons), MSc, PhD",
  photo: "assets/images/staff-full-name.jpg",   // or "" to show initials
  specialisationIds: ["automobile-technology", "electro-technology"],  // may belong to more than one
  email: "name@example.ac.lk",
  researchInterests: "Your research interests",
  isHeadOfDepartment: false
}
```

The new member appears automatically on the staff directory and on any specialisation page listed
in `specialisationIds`. No other file needs editing.

### 3.2 Edit a designation (or any staff field)

Find the person's `id` in `assets/js/staff.js` and change the relevant field, e.g.
`designation: "Professor"`. Save and upload the file.

### 3.3 Replace a staff photo

1. Put the image in `assets/images/` (JPG or PNG, roughly square, e.g. `400×400`).
2. Set the person's `photo` field to the path, e.g. `"assets/images/staff-full-name.jpg"`.
3. Leave `photo` as `""` to fall back to an initials avatar (useful before a photo is available).

### 3.4 Assign staff to specialisations

Edit the person's `specialisationIds` array in `assets/js/staff.js` using the specialisation ids
defined in `assets/js/specialisations.js` (`automobile-technology`, `construction-technology`,
`electro-technology`). Specialisation pages derive their staff list from these ids — there is never
a second copy to maintain.

### 3.5 Change the Specialisation Coordinator

In `assets/js/specialisations.js`, set the specialisation's `coordinatorStaffId` to the `id` of the staff
member in `assets/js/staff.js`. The coordinator is shown under the heading **"Specialisation
Coordinator"** on that specialisation's page. (There is deliberately no "Head of Specialisation"
role.)

### 3.6 Update the Dean's message

The Dean's message is shown on the **About** page (not the home page). In
`assets/js/content.js`, edit the `dean` object:

```js
dean: {
  name: "Prof Full Name",
  title: "Dean, Faculty of Technology",
  photo: "assets/images/dean.jpg",        // or leave the placeholder
  photoAlt: "Portrait of the Dean",
  message: [
    "First approved paragraph.",
    "Second approved paragraph."
  ]
}
```

The Dean's message and the Head of Department message are separate roles and separate content —
do not merge them.

### 3.7 Update the Head of Department message

The Head of Department is identified by `isHeadOfDepartment: true` in `staff.js` (exactly one
record). Edit their name, photo and designation there. The approved message text is in
`content.js` under `hod.message`.

### 3.8 Add a news item

In `assets/js/news.js`, add an object to the `news` array:

```js
news: [
  {
    id: "news-2026-01",            // used as a stable anchor link (#news-2026-01)
    title: "Announcement title",
    date: "2026-03-14",            // ISO date: YYYY-MM-DD
    category: "Announcement",      // short label, e.g. "Event", "Notice"
    summary: "One-sentence summary shown in lists."
  }
]
```

Until items exist, a clear **empty state** is shown — no fictional news is displayed.

### 3.9 Add a PDF (or other document)

1. Copy the file into `assets/documents/` (e.g. `assets/documents/programme-guide.pdf`).
2. In `assets/js/downloads.js`, add or edit a section in the `downloads` array:

```js
{
  id: "dl-06",
  title: "Programme guide",
  category: "Programme Documents",     // groups documents on the Downloads page
  format: "PDF",                       // or leave "" if unknown
  size: "1.2 MB",                      // only fill in if known
  url: "assets/documents/programme-guide.pdf",
  specialisationIds: ["automobile-technology"]   // optional
}
```

Only set `url` to a file that **actually exists**. Entries with an empty `url` are shown as
"Not yet available" instead of a broken link.

### 3.10 Change/rename a specialisation

Rename the specialisation in **one place**: `assets/js/specialisations.js` (`specialisations[].name`).
That name drives the cards, the specialisation page's `<h1>`, breadcrumb and title, **and** the
existing navigation dropdown and footer link lists on every page (those links are tagged with
`data-sp-link` and refreshed at runtime).

Each page also ships the same names as static HTML in its nav and footer so the links still work
with JavaScript disabled. Those static copies are only the **no-JS fallback** — you do not have to
edit them, though you may update them to match if you want the no-JS view to show the new name.
The specialisation page file (`pages/automobile-technology.html`) and its `pageUrl` value in
`specialisations.js` do not need to change unless the URL itself changes.

### 3.11 Edit the Academic overview tiles

The four cards in the home page **Academic overview** section are driven by the
`academicOverview` array in `assets/js/specialisations.js`. Each entry has:

```js
{
  title: "Degree Programme",
  description: "A four-year Bachelor of Engineering Technology Honours degree ...",
  icon: "graduation-cap",          // optional — see the list below
  url: "academics/#overview"        // link destination, or "" for a non-clickable card
}
```

The `icon` is shown in a round blue badge above the title. Choose one of:
`"graduation-cap"`, `"book-open"`, `"layers"`, `"list-checks"`, `"folder-open"`, `"file-text"`,
`"award"`, `"users"`, `"download"`. An unknown or missing value falls back to a default icon, so a
typo can never break the layout. If `url` does not resolve to a valid destination the card is
rendered as a plain, non-clickable box (the "Learn more" link is omitted).

---

## 4. Verified links and external URLs

Only **verified** external links should be added. The only external link on the site is
`University of Jaffna` in the footer, which points to the official `https://jfn.ac.lk/`
(in the same pattern used on the faculty site, opened in a new tab with
`rel="noopener noreferrer"`). Add further University/Faculty URLs only once they are
confirmed (see `CONTENT_CHECKLIST.md`).
There is intentionally **no contact form**, because the site has no backend.

---

## 5. Deployment to a static host

1. Edit the data files (`content.js`, `specialisations.js`, `research.js`, `news.js`,
   `downloads.js`, `staff.js`) locally and preview (section 2).
2. Upload the entire `department-website/` folder to your web space (FTP/SFTP, or a Git-based
   static host such as Netlify).
3. Ensure `index.html` is served at the site root.
4. Serve `404.html` for unknown paths (Netlify does this automatically; Apache uses
   `ErrorDocument`, nginx uses `error_page`). See "Testing the 404 page" in section 2 — `404.html`
   uses a `<base href="/">` element instead of the `data-base` attribute.
5. Keep the relative paths on the normal pages intact so the pages inside `pages/` resolve their
   assets. The `data-base` attribute on each page (`""` at the root, `"../"` inside `pages/`)
   handles this; if you add a page at a new depth, set its `data-base` to the correct number of
   `../` segments. (`404.html` is the one exception: it uses `<base href="/">` with relative URLs.)

No npm install, no build command and no environment variables are required.

---

## 6. Accessibility and browser support

- Mobile-first responsive layout using CSS Grid and Flexbox. All responsive rules use the
  Bootstrap 5 breakpoints — base (`xs`, < 576), `sm` 576, `md` 768, `lg` 992, `xl` 1200,
  `xxl` 1400 px — and there are no other width media queries. The navigation collapses below
  `lg` and is full from 992 px upward. Tested widths: 320, 390, 575, 576, 767, 768, 991, 992,
  1199, 1200, 1399, 1400 and 1920 px (no horizontal overflow at any width).
- Touch targets are at least 44 px tall for buttons, navigation, form controls and disclosure
  summaries (inline text links are exempt per WCAG 2.5.5).
- Semantic landmarks, one `<h1>` per page, logical heading order and a skip-to-content link.
- Visible keyboard focus, `aria-current` on the active navigation link, labelled form controls,
  and dropdown menus that support hover, click and keyboard (Escape closes; focus is not trapped).
  Horizontally scrollable `.table-wrap` regions are focusable and labelled.
- Navigation state is reset when the viewport crosses the `lg` breakpoint, so a half-open mobile
  menu never leaks into the desktop layout.
- Below `lg`, the `.masthead` is sticky (`top: 0`) and the breadcrumbs bar pins directly beneath it.
  The masthead height is measured at runtime and published as the `--header-sticky-offset` CSS
  variable (kept in sync with a `ResizeObserver`), so the nav panel and breadcrumbs stay aligned
  even when the brand text wraps at very narrow widths. In-page anchors respect the sticky bars via
  `scroll-padding-top`.
- `prefers-reduced-motion` is respected — animations and transitions are disabled on request.
- All rendered text is inserted with `textContent`, so the data files cannot inject HTML.

---

## 7. Palette

Brand palette used in `assets/css/styles.css`, based on the official University of Jaffna
blue (`#233C98`, as used on `jfn.ac.lk`):

| Token         | Colour  |
|---------------|---------|
| Primary blue  | #233C98 |
| Dark blue     | #172B75 |
| Light blue    | #EAEEF5 |
| White         | #FFFFFF |
| Main text     | #243447 |
| Muted text    | #5A6880 |
| Borders       | #DBE0F0 |

---

## 8. What still needs official content

See **`CONTENT_CHECKLIST.md`** for the full list of placeholders that must be replaced before the
site can be considered complete (messages, contact details, photographs, documents, research and
news). Note that the **Career Opportunities** text supplied for the home page has no matching
section and was therefore not placed. The facilities list is data-driven: the home page shows the
first two facility entries (via `data-limit="2"`) while the Facilities page lists every entry in
`content.js`. Only two facility entries have been supplied so far, so the remaining eight names
have no card until an entry is added for each (see `CONTENT_CHECKLIST.md`).
