# Department of Engineering Technology — Website

Official website for the **Department of Engineering Technology**, **Faculty of Technology**,
**University of Jaffna**.

Built with **HTML5, CSS3 and vanilla JavaScript only**. No frameworks, no backend, no database,
no build step, no package installation required. The site uses **clean URLs** (one folder per page,
each containing an `index.html`), so it should be previewed through a simple static file server
(see section 2).

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
├── index.html                      # Home (Faculty intro → News → Department → Specialisations → Academic overview → Facilities)
├── 404.html
├── about/
│   └── index.html                  # Dean's message, academic organisation, HoD message, vision & mission, history
├── staff/
│   └── index.html                  # Searchable / filterable staff directory
├── academics/
│   └── index.html
├── research/
│   └── index.html
├── facilities/
│   └── index.html
├── news/
│   └── index.html
├── downloads/
│   └── index.html
├── contact/
│   └── index.html
├── specialisations/
│   ├── automobile-technology/
│   │   └── index.html
│   ├── construction-technology/
│   │   └── index.html
│   └── electro-technology/
│       └── index.html
├── assets/
│   ├── css/
│   │   └── styles.css              # All styling (mobile-first)
│   ├── js/
│   │   ├── content.js              # EDITABLE content: specialisations, dean/HoD messages, news, facilities, downloads, contact
│   │   ├── staff.js                # EDITABLE staff records (single source of truth)
│   │   └── main.js                 # Behaviour + rendering (navigation, staff filter, page rendering)
│   ├── images/                     # Local images (SVG placeholders included)
│   └── documents/                  # Put official PDFs and documents here
└── docs/
    ├── README.md
    └── CONTENT_CHECKLIST.md        # List of official information still required
```

The header, navigation, footer and core page text are plain HTML in every page. Repeated or
frequently-updated information is rendered by JavaScript from the two data files.

Every page links to others with **clean URLs** (e.g. `about/`, `staff/`,
`specialisations/automobile-technology/`). Each page's `<body>` carries a `data-base` attribute
(`""` at the site root, `"../"` inside a top-level folder, `"../../"` inside a specialisation
folder) that the scripts use to build correct asset and content paths.

The official University of Jaffna logo (`assets/images/UOJ-Logo-Color-scaled.png`) is the header
brand mark. On desktop the blue navigation bar is `position: sticky` and stays pinned to the top of
the viewport, while the masthead scrolls out of view. On mobile (below `lg`) the roles reverse: the
masthead — with the "Menu" button — is sticky, and the breadcrumbs bar (on every page except the
home page and 404) pins directly beneath it.

---

## 2. Local preview

You can preview the site in any of these ways:

**Option A — open directly**
Opening individual files from disk (e.g. double-clicking `index.html`) works for that single page,
but the clean folder URLs (`about/`, `staff/`, …) only resolve to their `index.html` under a server.
Use Option B for full local preview.

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

Automatic use of `404.html` **depends on the hosting server**. Most static hosts (GitHub Pages,
Netlify, Netlify-style hosts, Apache with `ErrorDocument`, nginx with `error_page`) can be
configured to serve `404.html`. If your host does not do this automatically, configure it in the
server settings. Opening `404.html` directly always works regardless.

---

## 3. Editing the site

> **There is no browser-based admin panel.** All updates are made by editing the source files
> and then **uploading / redeploying** the changed files to the web server. Nothing updates on the
> live site until the edited files are uploaded.

All editable, repeated content lives in two files:

- `assets/js/content.js` — specialisations, Dean's and Head of Department messages, academic
  overview, research, facilities, news, downloads, contact details.
- `assets/js/staff.js` — every staff record.

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
  id: "staff-acad-03",                 // unique, stable; do not reuse an existing id
  name: "Dr Full Name",
  designation: "Senior Lecturer",
  category: "academic",                // "head" | "academic" | "technical" | "admin"
  qualifications: "BSc (Hons), MSc, PhD",
  photo: "assets/images/staff-full-name.jpg",   // or "" to show initials
  specialisationIds: ["sp-01", "sp-03"],         // may belong to more than one
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
defined in `assets/js/content.js` (`sp-01`, `sp-02`, `sp-03`). A person may be listed in several
specialisations. Specialisation pages derive their staff list from these ids — there is never a
second copy to maintain.

### 3.5 Change the Specialisation Coordinator

In `assets/js/content.js`, set the specialisation's `coordinatorStaffId` to the `id` of the staff
member in `assets/js/staff.js`. The coordinator is shown under the heading **"Specialisation
Coordinator"** on that specialisation's page. (There is deliberately no "Head of Specialisation"
role.)

### 3.6 Update the Dean's message

In `assets/js/content.js`, edit the `dean` object:

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

In `assets/js/content.js`, add an object to the `news` array:

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
2. In `assets/js/content.js`, add or edit an entry in the `downloads` array:

```js
{
  id: "dl-06",
  title: "Programme guide",
  category: "Programme Documents",     // groups documents on the Downloads page
  format: "PDF",                       // or leave "" if unknown
  size: "1.2 MB",                      // only fill in if known
  url: "assets/documents/programme-guide.pdf",
  specialisationIds: ["sp-01"]         // optional
}
```

Only set `url` to a file that **actually exists**. Entries with an empty `url` are shown as
"Not yet available" instead of a broken link.

### 3.10 Change/rename a specialisation

Specialisation names appear in three places by design:

1. `assets/js/content.js` (`specialisations[].name`) — drives cards and specialisation pages.
2. The static **navigation dropdown** in every HTML file.
3. The **footer** in every HTML file.

Navigation is kept in HTML so that it works without JavaScript. When you rename a specialisation,
update `content.js` **and** the matching text in the nav and footer of each page. The dedicated
pages themselves (`specialisations/automobile-technology/index.html`) do not need to change filename.

---

## 4. Verified links and external URLs

Only **verified** external links should be added. The footer intentionally contains no external
university links until official URLs are confirmed (see `CONTENT_CHECKLIST.md`).
There is intentionally **no contact form**, because the site has no backend.

---

## 5. Deployment to a static host

1. Edit `content.js` / `staff.js` locally and preview (section 2).
2. Upload the entire `department-website/` folder to your web space (FTP/SFTP, or a Git-based
   static host).
3. Ensure `index.html` is served at the site root.
4. Configure the server, if it supports it, to serve `404.html` for unknown paths.
5. Keep relative paths intact so the nested `specialisations/…/` pages resolve their assets.
   The `data-base` attribute on each page (`""`, `"../"` or `"../../"`) handles this; if you add
   a page at a new depth, set its `data-base` to the correct number of `../` segments.

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
section and was therefore not placed, and only two of the supplied facility names are shown on the
site (the remaining eight have no card slots).
