# ADMIN GUIDE — How to run and update this website

Department of Engineering Technology, Faculty of Technology, University of Jaffna.

This is a **manual for admins with no programming background**. It explains what the
site is made of, every page it has, and exactly how to change the text, add items
and put your changes live. Follow it top to bottom the first time; afterwards use
the section you need.

> **Golden rule:** there is no admin login page and no build step. You edit a plain
> text file, save it, and **upload it**. Nothing changes on the live site until you
> upload the edited file.

---

## 1. The 5-minute version

1. Open the file you need in a **plain-text editor** (Notepad++, VS Code, or even
   Notepad). Files to edit are in `assets/js/` and all end in `.js`.
2. Change **only the text between the quotes** `" "`.
   - **Never** change the labels on the left (like `title:` or `name:`).
   - **Never** remove the characters `{ } [ ] , : ;`.
3. Any text in `[square brackets]` is a **placeholder**. Replace it with the real,
   **approved** wording.
4. Keep **every comma** between items. If you delete an item, delete its **whole**
   `{ ... }` block *and* its trailing comma.
5. **Save** the file.
6. **Upload** the file to the same folder on the web server (see §7).
7. **Refresh** the site in your browser and check the page.

If a page goes **blank or looks broken**, you probably removed a comma or a bracket.
Undo with `Ctrl+Z`, or re-copy the original file, and try again.

---

## 2. What the site is made of

| Folder | What it is | Do you edit it? |
|---|---|---|
| `assets/js/content.js` | Core text: identity, welcome, Dean/HoD messages, About, facilities, contact | **Yes** |
| `assets/js/specialisations.js` | The 3 specialisations, academic tiles, Academics page | **Yes** |
| `assets/js/research.js` | Research / publications list | **Yes** |
| `assets/js/news.js` | News and announcements | **Yes** |
| `assets/js/downloads.js` | E-Resources / downloads sections | **Yes** |
| `assets/js/staff.js` | All staff records | **Yes** |
| `assets/js/site/main.js` | The engine that draws the pages | **No — never edit** |
| `assets/css/styles.css` | Colours, fonts and layout | Only a designer |
| `assets/images/` | Logos, photos, placeholders | Upload images here |
| `assets/documents/` | PDFs and downloadable files | Upload files here |
| `pages/*.html` | One file per inner page (structure only) | Rarely (see §8) |
| `index.html`, `404.html` | Home page and not-found page | Rarely |
| `docs/` | These instructions | Reference only |

**The data files win.** A page's changing text comes from the `assets/js/*.js` files.
The `.html` files only provide the structure (header, menu, footer) and headings.

---

## 3. Every page, and which file controls it

| Page (in browser) | File on disk | Content comes from |
|---|---|---|
| Home | `index.html` | `content.js`, `specialisations.js`, `research.js`, `news.js` |
| About Us | `pages/about.html` | `content.js` (`dean`, `hod`, `about`) |
| Academics | *(removed)* | `specialisations.js` (`academics`) |
| Our Research | `pages/research.html` | `research.js` |
| E-Resources | `pages/downloads.html` | `downloads.js` (+ specialisations' own files) |
| Staff | `pages/staff.html` | `staff.js` |
| Facilities | `pages/facilities.html` | `content.js` (`facilities`) |
| News & Announcements | `pages/news.html` | `news.js` |
| Contact Us | `pages/contact.html` | `content.js` (`contact`) |
| Automobile / Construction / Electro Technology | `pages/automobile-technology.html`, `pages/construction-technology.html`, `pages/electro-technology.html` | `specialisations.js` (+ `content.js`, `research.js`, `staff.js`) |
| 404 (page not found) | `404.html` | fixed wording (edit the HTML if needed) |

A **shared header and footer** appear on every page; their text comes from
`content.js` (`institution`, `contact`) plus the static HTML of each page.

---

## 4. How to edit each content file

Each file below has the same rules and a **"SECTIONS IN THIS FILE"** list at the
top, so you can always look there. Links jump to the detailed page example.

### 4.1 `content.js` — core text
Controls: university/faculty/department names, the homepage welcome text and image,
the Dean's message, the Head of Department message, the About page (vision / mission
/ history), facilities, and all contact details (address, email, phone, map, social
links).

- To change a **message**, edit the text inside the `[ ... ]` in `dean.message` or
  `hod.message`.
- To change **contact details**, edit `address`, `email`, `phone`. A real email
  becomes a clickable `mailto:` link automatically.
- The **address**, **phone** and **email** have been supplied by the department
  and are published on the Contact page and in the footer. If you ever need to
  hide one, clear that value: the Contact page then shows "[Address to be added]",
  "[Telephone to be added]" or "[Email to be added]", and the footer leaves it out.
  The address is one entry per line in `address`. It is printed line by line in
  the footer ("Ariviyal Nagar, / Kilinochchi, / Sri Lanka.") and as one sentence
  on the Contact page ("Ariviyal Nagar, Kilinochchi, Sri Lanka.") — the commas
  and the full stop are added for you, so write the parts without them. You may
  also give it as one string: `"Ariviyal Nagar, Kilinochchi, Sri Lanka"`.
- To add a **facility**, copy a `{ ... }` block in `facilities` and edit it.

### 4.2 `specialisations.js` — specialisations & Academics
Controls the three specialisations (cards, nav/footer links, each specialisation
page), the homepage "Academic overview" tiles, and the Academics page.

- To add a specialisation: copy a whole `{ ... }` block, paste it after the last one,
  give it a **new** `id` (e.g. `"marine-technology"`), then edit the text.
- ⚠️ A specialisation **name** also appears in the menu and footer of **every** HTML
  page. If you rename one, update those too (or ask your webperson).

### 4.3 `research.js` — publications
Controls the Research page and the "Research" block on each specialisation page.

To add an item, copy this block and edit it:
```js
{
  title: "Paper title",
  authors: "A. Perera, B. Kumar",
  type: "Journal article",          // or "Conference paper" / "Thesis" / ""
  venue: "Journal or conference name",
  year: "2026",
  status: "Published",              // or "Ongoing" / "Under review" / "" (hide)
  specialisationIds: ["automobile-technology"],  // which specialisation page shows it
  url: ""                            // DOI/link, or "" for plain text
}
```

### 4.4 `news.js` — announcements
Controls the homepage news strip and the News page. Add **real, dated** items only.
```js
{
  id: "news-2026-11-01",            // unique; used as the #link anchor
  title: "Announcement title",
  date: "2026-11-01",               // YYYY-MM-DD
  category: "Notice",               // short label
  summary: "One sentence for lists.",
  body: "Full announcement text.",
  doc: { title: "Time table", url: "" }  // optional file; "" = no link
}
```
To attach a file: put it in `assets/documents/` and set `url` to
`"assets/documents/time-table.pdf"`. Leave `url: ""` for no file (never a dead link).

### 4.5 `downloads.js` — E-Resources
Controls the collapsible sections on the E-Resources page. `downloads` is an
**array of sections**; add, rename, reorder or delete sections freely.
```js
{
  id: "forms",                       // unique
  title: "Forms",                    // heading shown to users
  documents: [
    { id: "dl-04", title: "Admission form", format: "PDF", size: "120 KB", url: "assets/documents/form.pdf" }
  ]
}
```
To add a document: upload it to `assets/documents/`, then copy a document block,
give it a **new** `id`, and set its `url`. Leave `url: ""` until the file exists.
> The **"Programme Documents"** section is built automatically from each
> specialisation's own downloads — do **not** add it here.

### 4.6 `staff.js` — staff
The single source for the Staff page, each specialisation page and the Head of
Department block. To add a person, copy a `{ ... }` block in `members`, paste it
after the last one, give them a **new** `id`, and fill in the fields.
**Keep exactly one person with `isHeadOfDepartment: true`.**

---

### 4.7 The codes you will see (and how to use them)

Every specialisation, staff member and document has a short **code** (the `id` field).
The codes are written in plain words so you can tell what they mean at a glance.

**Specialisation codes** (used in `specialisations.js`, `staff.js` and `research.js`):

| Code | Specialisation |
|---|---|
| `automobile-technology` | Automobile Technology |
| `construction-technology` | Construction Technology |
| `electro-technology` | Electro Technology |

**Staff codes** (used in `staff.js`, and in `coordinatorStaffId` in `specialisations.js`):

| Code | Meaning |
|---|---|
| `head-of-department` | The Head of Department |
| `coordinator-automobile-technology` | Coordinator of Automobile Technology |
| `coordinator-construction-technology` | Coordinator of Construction Technology |
| `coordinator-electro-technology` | Coordinator of Electro Technology |
| `academic-staff-01`, `academic-staff-02` | Academic staff members |
| `technical-staff-01` | Technical staff members |
| `administrative-staff-01` | Administrative & support staff |

**How to use them:**
- To put a staff member on a specialisation, type that specialisation's code in
  `specialisationIds`, e.g. `specialisationIds: ["automobile-technology"]`.
- To show a publication on a specialisation page, do the same in `research.js`.
- To name the coordinator of a specialisation, put that person's staff code in
  `coordinatorStaffId`.
- When you add something new, choose a code that says what it is, in the same style
  (all lowercase, words separated by hyphens), and make sure it is unique.

---

## 5. Files and documents

- **Documents (PDFs, forms, handbooks):** upload to `assets/documents/`, then set the
  matching `url` (e.g. `"assets/documents/handbook.pdf"`). An empty `url` shows
  "Not yet available" — never a dead link.
- **Images (photos, logos):** upload to `assets/images/`, then set the matching
  `image` / `photo` field to the file path (e.g. `"assets/images/dean.jpg"`).
- Paths are **relative to the site root** and start with `assets/`.
- **Links to other pages** are also written from the site root, e.g.
  `"pages/staff.html"` (not `"staff.html"`). The site works out the correct
  address for whichever page the link appears on, so always start from the root.

---

## 6. Placeholders — what to look for

Before launch, replace everything in `[square brackets]`. Common ones:

- `[Dean's Name]`, `[Head of Department Name]`, `[Coordinator 01 Name]`
- `[Insert the approved ...]` (faculty intro, vision / mission / history, research)
- `[Short description of the ... specialisation.]`, `[Overview paragraph ...]`
- `[Concise description of this laboratory or facility.]`
- `[Application / admissions form]`, `[Student handbook]`
- `[... email address]`, `[Qualifications]`, `[Designation]`

See `CONTENT_CHECKLIST.md` for the full list of official information still needed.

---

## 7. How to publish your changes

You only upload the file(s) you changed.

1. Save your edited file (e.g. `news.js`).
2. Open your web host's file manager (or FTP/SFTP program).
3. Go to the same folder on the server and **overwrite** the old file with the new one
   (keep the exact same filename).
4. Refresh the website (press `Ctrl+F5` to bypass the browser cache).

No "republishing" or taking the site offline is needed. There is no build step.

> **Tip:** keep a backup. Before big edits, copy the original file somewhere safe so
> you can restore it if something breaks.

---

## 8. Editing an inner page's own wording (HTML)

The menu, footer and a few page headings are written directly in each `.html` file.
To change those:

1. Open the page file (e.g. `pages/about.html`) in a text editor.
2. Find the words you want to change **between the tags**, e.g.
   `<h1>About Us</h1>` — change only `About Us`.
3. **Do not** change anything inside `< ... >` (those are instructions to the browser).
4. Save and upload the file.

If you are unsure, ask your webperson — a wrong edit here can break the page layout.

---

## 9. Quick troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| A section is blank / page looks broken | Missing comma or bracket `}` `]` | Undo (`Ctrl+Z`) and re-check, or restore the backup file |
| My change does not appear | File not uploaded, or browser cache | Re-upload, then `Ctrl+F5` |
| A download link does nothing | `url` is `""` or the file is not in `assets/documents/` | Upload the file and set its `url` |
| A photo does not show | Wrong path, or file not in `assets/images/` | Check the path spelling and upload the file |
| Two "Head of Department" people show | More than one `isHeadOfDepartment: true` | Keep exactly one `true`, set the others `false` |

---

## 10. Do NOT edit

- `assets/js/site/main.js` — the engine. Editing it can break **every** page.
- Anything inside `< ... >` tags in the HTML files.
- The characters `{ } [ ] , : ;` and the labels (`title:`, `name:`) in the `.js` files.

When in doubt, back up first and make one small change at a time.

---

## 11. Files you will usually touch — cheat sheet

| I want to change... | Edit this file |
|---|---|
| University / faculty / department name | `content.js` → `institution` |
| Homepage welcome text / image | `content.js` → `faculty`, `department` |
| Dean's message or Head of Department message | `content.js` → `dean`, `hod` |
| About page vision / mission / history | `content.js` → `about` |
| Laboratories & facilities | `content.js` → `facilities` |
| Address, email, phone, map, social links | `content.js` → `contact` |
| Specialisation names, text, images | `specialisations.js` |
| Academics page | `specialisations.js` → `academics` |
| Homepage academic tiles | `specialisations.js` → `academicOverview` |
| Research / publications | `research.js` |
| News & announcements | `news.js` |
| E-Resources / downloads | `downloads.js` |
| Staff names, emails, photos | `staff.js` |
| Which specialisations a staff member belongs to | `staff.js` → `specialisationIds` (use the codes in §4.7) |
| Which specialisations a publication belongs to | `research.js` → `specialisationIds` (use the codes in §4.7) |
| The coordinator of a specialisation | `specialisations.js` → `coordinatorStaffId` (use the codes in §4.7) |

For the full list of outstanding official content, see `CONTENT_CHECKLIST.md`.
For technical/developer detail, see `README.md`.
