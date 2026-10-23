# Department Website — Administrator Guide

**Department of Engineering Technology · Faculty of Technology · University of Jaffna**

This manual explains how the department website is put together and how to update it
safely. It is written for admins with **no programming background**. Follow the
"5-minute version" the first time; afterwards, jump to the section you need.

> **Golden rule:** there is no admin login and no build step. You edit a plain-text
> file, save it, and **upload it**. Nothing changes on the live site until the
> edited file is uploaded, and visitors may need `Ctrl+F5` to see it.

---

## Contents

1. The 5-minute version
2. How the site is built
3. Every page, and which file controls it
4. How to edit each content file
5. Files and documents
6. Placeholders — what to look for
7. How to publish your changes
8. Editing an inner page's own wording (HTML)
9. Quick troubleshooting
10. Do NOT edit
11. Cheat sheet — "I want to change…"
12. Where to get more help

---

## 1. The 5-minute version

1. Open the file you need in a **plain-text editor** (Notepad++, VS Code, or even
   Notepad). Editable files are in `assets/js/` and all end in `.js`.
2. Change **only the text between the quotes** `"…"`.
   - **Never** change the labels on the left (like `title:` or `name:`).
   - **Never** remove the characters `{ } [ ] , : ;`.
3. Any text in `[square brackets]` is a **placeholder**. Replace it with the real,
   **approved** wording.
4. Keep **every comma** between items. If you delete an item, delete its **whole**
   `{ … }` block *and* its trailing comma.
5. **Save** the file.
6. **Upload** it to the same folder on the web server (see §7).
7. **Refresh** the site in your browser (`Ctrl+F5`) and check the page.

If a page goes **blank or looks broken**, a comma or bracket is missing. Undo with
`Ctrl+Z`, or restore the original file from your backup, and try again.

**What you need:** a text editor, the login for your web host (file manager or FTP),
and a copy of this guide. No special software or programming knowledge is required.

---

## 2. How the site is built

The website is a collection of plain files — there is no database and no
"publish" button. Every page is assembled in two layers:

```
HTML files (structure)          JS data files (your text)
──────────────────────────      ─────────────────────────────
index.html                      assets/js/content.js
pages/*.html        ◄────────   assets/js/specialisations.js
header, menu, headings          assets/js/research.js
static wording                  assets/js/news.js
                                assets/js/downloads.js
                                assets/js/staff.js
                                         │
                                         ▼
                              assets/js/site/main.js
                              (the engine — draws the
                               final page in the browser)
```

- The **HTML files** give every page the same header, menu, footer and section
  headings. You rarely touch them.
- The **data files** hold the department's actual wording: names, messages, news,
  staff, downloads and so on. These are the files you edit.
- The **engine** (`main.js`) reads the data files each time a page loads and fills
  in the text. You never edit it.

Because the engine runs in the visitor's browser, a change becomes visible on the
live site as soon as the edited data file is uploaded — nothing else is required.

### Folder map

| Folder / file | What it is | Do you edit it? |
|---|---|---|
| `assets/js/content.js` | Core text: identity, welcome, Dean/HoD messages, About, facilities, contact | **Yes** |
| `assets/js/specialisations.js` | The 3 specialisations, homepage academic tiles | **Yes** |
| `assets/js/research.js` | Research / publications list | **Yes** |
| `assets/js/news.js` | News and announcements | **Yes** |
| `assets/js/downloads.js` | E-Resources / downloads sections | **Yes** |
| `assets/js/staff.js` | All staff records | **Yes** |
| `assets/js/site/main.js` | The engine that draws the pages | **No — never edit** |
| `assets/css/styles.css` | Colours, fonts and layout | Only a designer |
| `assets/images/` | Images, grouped into `logos/`, `staff/`, `campus/`, `placeholders/` and `specialisations/` | Upload images to the matching folder |
| `assets/documents/` | PDFs and downloadable files | Upload files here |
| `pages/*.html` | One file per inner page (structure only) | Rarely (see §8) |
| `index.html`, `404.html` | Home page and not-found page | Rarely |
| `docs/` | These instructions | Reference only |

**The data files win.** A page's changing text comes from `assets/js/*.js`. The
`.html` files only provide structure and fixed headings.

---

## 3. Every page, and which file controls it

| Page (in browser) | File on disk | Content comes from |
|---|---|---|
| Home | `index.html` | `content.js`, `specialisations.js`, `news.js` |
| About Us | `pages/about.html` | `content.js` (`dean`, `hod`, `about`) |
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

> **Note:** the **Academics** item in the menu is a dropdown, not a separate page.
> Its links go straight to the three specialisation pages.

---

## 4. How to edit each content file

Each file below starts with a **"SECTIONS IN THIS FILE"** list and a field guide,
so you can always look at the top of the file for a reminder.

### 4.1 `content.js` — core text

Controls: university/faculty/department names, the homepage welcome text and image,
the Dean's message, the Head of Department message, the About page (vision /
mission / history), facilities, the academic overview tiles, and all contact
details (address, email, phone, map, social links).

- To change a **message**, edit the text inside the `[ … ]` in `dean.message` or
  `hod.message`.
- To change **contact details**, edit `address`, `email`, `phone`. A real email
  becomes a clickable `mailto:` link automatically.
- The **address**, **phone** and **email** have been supplied by the department
  and are published on the Contact page and in the footer. If you ever need to
  hide one, clear that value: the Contact page then shows "[Address to be added]",
  "[Telephone to be added]" or "[Email to be added]", and the footer leaves it out.
- The address is one entry per line in `address`. It is printed line by line in
  the footer ("Ariviyal Nagar, / Kilinochchi, / Sri Lanka.") and as one sentence
  on the Contact page ("Ariviyal Nagar, Kilinochchi, Sri Lanka.") — the commas
  and the full stop are added for you, so write the parts without them. You may
  also give it as one string: `"Ariviyal Nagar, Kilinochchi, Sri Lanka"`.
- To add a **facility**, copy a `{ … }` block in `facilities` and edit it.

#### Fields in this file

| Field | What it is | What to put in it |
|---|---|---|
| `institution.university` | The university name in the header and footer of every page | The official name, e.g. `"University of Jaffna"` |
| `institution.faculty` | The faculty name | e.g. `"Faculty of Technology"` |
| `institution.department` | The department name | e.g. `"Department of Engineering Technology"` |
| `faculty.label` | The small label above the faculty block on the home page | A short label, e.g. `"University of Jaffna"` |
| `faculty.heading` | The heading of the faculty block | e.g. `"Faculty of Technology"` |
| `faculty.intro` | The faculty introduction — a **list**, so each quoted line is one paragraph | Replace the text inside the `[ … ]`. To add a paragraph, add another quoted line inside the same square brackets |
| `faculty.image` | The faculty picture | A file in `assets/images/campus/`, e.g. `"assets/images/campus/faculty.jpg"` |
| `faculty.imageAlt` | The picture's description (read aloud by screen readers) | A short sentence describing the picture |
| `dean.name` | The Dean's full name | e.g. `"Dr. A. B. Perera"` |
| `dean.title` | The Dean's job title | e.g. `"Dean, Faculty of Technology"` |
| `dean.qualifications` | The Dean's degrees and qualifications | e.g. `"Ph.D. (…), B.Sc. (…)"` |
| `dean.email` | The Dean's official email address | It becomes a `mailto:` link automatically |
| `dean.photo` | The Dean's photograph | A file in `assets/images/staff/`, e.g. `"assets/images/staff/dean.jpg"` |
| `dean.photoAlt` | The photograph's description | A short sentence |
| `dean.message` | The Dean's message — a **list** of paragraphs | Replace the text inside the `[ … ]` with the approved message |
| `department.heading` | The "Welcome to …" heading on the home page | The approved welcome heading |
| `department.intro` | The department introduction — a **list** of paragraphs | The approved introduction |
| `department.image` | The department picture | A file in `assets/images/campus/` |
| `department.imageAlt` | The picture's description | A short sentence |
| `department.focus` | The short "focus" sentence under the introduction | One or two sentences |
| `hod.title` | The Head of Department's job title | e.g. `"Head, Department of Engineering Technology"` |
| `hod.message` | The Head of Department message — a **list** of paragraphs | Replace the text inside the `[ … ]` with the approved message |
| `about.organisation.heading` | The "Academic organisation" heading on the About page | The official heading |
| `about.organisation.intro` | The paragraph under it — a **list** | How the department is organised academically |
| `about.organisation.image` | Its picture | A file in `assets/images/campus/` |
| `about.organisation.imageAlt` | The picture's description | A short sentence |
| `about.vision` | The vision statement — one paragraph | The approved vision statement |
| `about.mission` | The mission statement — one paragraph | The approved mission statement |
| `about.history` | The history - a **list** of paragraphs | The approved history, with verified dates only |
| `about.historyMilestones` | Milestones beside the history - a **list** of `{ year, text }` entries | Only verified dates and facts |
| `facilities` | A **list**: one `{ … }` block per laboratory or facility | See the table below |
| `academicOverview` | A **list**: one `{ … }` block per academic overview tile | See the table below |
| `contact.address` | The postal address — one entry per line | The address parts, written without commas or full stops |
| `contact.email` | The department email address | The official address; it becomes a `mailto:` link automatically |
| `contact.phone` | The telephone number | The official number; it becomes a `tel:` link automatically |
| `contact.mapEmbedUrl` | The Google map shown on the Contact page | The `src="…"` address from Google Maps → Share → Embed a map |
| `contact.social` | A **list**: one line per social link | `{ icon: "facebook", label: "Facebook", url: "https://…" }` |

#### The facilities block — one `{ … }` per laboratory or facility

| Field | What it is |
|---|---|
| `id` | A unique code, e.g. `"lab-01"` |
| `name` | The name of the laboratory or facility |
| `description` | One or two sentences |
| `image` | The picture — a file in `assets/images/` |
| `imageAlt` | The picture's description |
| `specialisationIds` | The codes of the specialisations that use it (Section 4.7). These facilities appear on those specialisation pages |

The laboratory list on each specialisation page comes from these
`specialisationIds`; nothing needs to be added to `specialisations.js`.

#### The Academic overview tiles (home page)

| Field | What it is | What to put in it |
|---|---|---|
| `title` | The tile heading | A short heading, e.g. `"E-Resources"` |
| `description` | One short line under the heading | One sentence |
| `icon` | The small picture on the tile | Optional. One of: `award`, `book-open`, `download`, `file-text`, `folder-open`, `globe`, `graduation-cap`, `layers`, `list-checks`, `mail`, `map-pin`, `phone`, `users` |
| `url` | The page the tile links to | e.g. `"pages/about.html#vision-mission"`. Only use a page that exists |

#### The contact details — what you may publish or hide

| Field | On the Contact page | In the footer |
|---|---|---|
| `contact.address` | One sentence: "Ariviyal Nagar, Kilinochchi, Sri Lanka." | One line per entry |
| `contact.email` | A clickable `mailto:` link | A clickable `mailto:` link |
| `contact.phone` | A clickable `tel:` link | A clickable `tel:` link |
| `contact.mapEmbedUrl` | The Google map | Not shown |
| `contact.social` | The social links | The social links |

- The **address**, **phone** and **email** supplied by the department are published on
  the Contact page and in the footer. To hide one, clear its value (`""`): the
  Contact page then shows "[Address to be added]", "[Email to be added]" or
  "[Telephone to be added]", and the footer leaves it out.
- `contact.social` accepts only these icon names: `facebook`, `twitter`,
  `linkedin`, `youtube`. The `url` must be a full `https://` address. A link that
  is not a normal web address is simply not shown.

### 4.2 `specialisations.js` — specialisations

Controls the three specialisations (cards, nav/footer links and each
specialisation page).

- To add a specialisation: copy a whole `{ … }` block, paste it after the last one,
  give it a **new** `id` (e.g. `"marine-technology"`), then edit the text.
- ⚠️ A specialisation **name** also appears in the menu and footer of **every**
  HTML page. If you rename one, update those too (or ask your webperson).

#### Fields in each specialisation block

| Field | What it is | What to put in it |
|---|---|---|
| `id` | The specialisation's own code | A new unique code, e.g. `"marine-technology"` (Section 4.7) |
| `name` | The name shown on the cards, in the menu, in the footer and on the page | The official name |
| `pageUrl` | The page that shows this specialisation | e.g. `"pages/automobile-technology.html"`. A **new** specialisation also needs its own page file in `pages/` — ask your webperson for that |
| `description` | One or two sentences, used on the cards and at the top of the specialisation page | The official summary |
| `image` | The picture on the card | A file in `assets/images/` |
| `imageAlt` | The picture's description | A short sentence |
| `coordinatorStaffId` | The coordinator of this specialisation | That person's staff code, e.g. `"coordinator-automobile-technology"` (Section 4.7) |
| `overview` | A **list** of paragraphs about the specialisation | Each quoted line is one paragraph |
| `curriculum` | One entry per curriculum year; with more than one a year dropdown appears | See the block below |
| `research.summary` | A short description of research and project activity | One or two sentences |
| `downloads` | The files shown on this page and collected into "Programme Documents" | See the table below |

**The curriculum block** — a **list** of curriculum years. Each entry has a
`year` and `sections`. Each section has a `title` (the year/semester heading)
and an `items` list; each item has a `name` and a `code`. An elective item can
instead have an `options` list, each option with a `name` and a `code`; the
options display as i), ii), … under the module name. Years are listed in
ascending order (2023, then 2024) and the earliest year is shown by default.
When there is more than one year, a dropdown lets the visitor switch between
them; with a single year, no dropdown is shown.

```js
curriculum: [
  {
    year: "2024",
    sections: [
      { title: "Year 01 / Semester 01", items: [
        { name: "Subject name", code: "Subject code" },
        { name: "Elective Module I:", options: [
          { name: "Advanced Engineering Materials", code: "ETA440TE2" },
          { name: "Aerodynamics for Automobile Technology", code: "ETA441TE2" }
        ] }
      ] }
    ]
  },
  {
    year: "2023",
    sections: [
      { title: "Year 01 / Semester 01", items: [
        { name: "Subject name", code: "Subject code" }
      ] }
    ]
  }
]
```

**The downloads block** — one `{ … }` per file:

| Field | What it is |
|---|---|
| `id` | A unique code, e.g. `"automobile-technology-doc-01"` |
| `title` | The name shown in the list |
| `format` | The file type, e.g. `"PDF"` |
| `size` | The size shown to readers, e.g. `"1.2 MB"`, or `""` |
| `url` | Where the file is — put it in `assets/documents/` and give the path, e.g. `"assets/documents/handbook.pdf"`, or `""` until it exists |

### 4.3 `research.js` — publications

Controls the Research page and the "Research" block on each specialisation page.
The whole file is one object with two parts: `intro` (an optional paragraph shown
above the list) and `items` (the list of papers). To add a paper, add another
`{ … }` block **inside the square brackets** after `items:`:

```js
window.DEPARTMENT_CONTENT.research = {
  intro: "Short paragraph placed above the list (or \"\" for none).",
  items: [
    {
      title: "Paper title",
      authors: "A. Perera, B. Kumar",
      type: "Journal article",     // or "Conference paper" / "Thesis" / ""
      venue: "Journal or conference name",
      year: "2026",
      status: "Published",         // or "Ongoing" / "Under review" / "" (hide)
      specialisationIds: ["automobile-technology"],  // page that shows it
      url: ""                      // DOI/link, or "" for plain text
    }
    // add more { ... } blocks inside these square brackets
  ]
};
```

#### Fields in this file

| Field | What it is |
|---|---|
| `intro` | An optional short paragraph above the list. Leave it `""` for none |
| `items` | The **list** of papers. Every paper is one `{ … }` block inside it |
| `items[].title` | The title of the work |
| `items[].authors` | The author names with co-authors, separated by commas |
| `items[].type` | The kind of work, e.g. `"Journal article"`, `"Conference paper"`, `"Thesis"` |
| `items[].venue` | The journal, conference or publisher name |
| `items[].year` | The year as four digits, e.g. `"2026"` |
| `items[].status` | Where the work stands, e.g. `"Published"`, `"In press"`, `"Ongoing"`. Use `""` to hide it |
| `items[].specialisationIds` | The specialisation codes this work belongs to (Section 4.7) |
| `items[].url` | A link to the work (a full `https://` address), or `""` for plain text |

Only add work that actually exists — never invent authors or papers.

### 4.4 `news.js` — announcements

Controls the homepage news strip and the News page. Add **real, dated** items only,
newest first. Every announcement is one `{ … }` block in the `news` list:

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

| Field | What it is | What to put in it |
|---|---|---|
| `id` | A unique code for the announcement | e.g. `"news-2026-11-01"`. It is the link anchor, so do not repeat it |
| `title` | The headline | One short line |
| `date` | The announcement date | `YYYY-MM-DD`, e.g. `"2026-11-01"` |
| `category` | The label above the headline | A short label, e.g. `"Notice"`, `"Event"`, `"Result"` |
| `summary` | The one-line summary shown in the list | One sentence |
| `body` | The full announcement | Plain text. Line breaks are kept |
| `doc.title` | The name of the file to download | e.g. `"Examination time table"` |
| `doc.url` | Where that file is | `"assets/documents/time-table.pdf"`, or `""` when there is no file yet |

To attach a file: put it in `assets/documents/` and set `url` to
`"assets/documents/time-table.pdf"`. Leave `url: ""` for no file (never a dead
link). Visitors can open a notice directly with
`…/news.html#news-2026-11-01`.

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

| Field | What it is | What to put in it |
|---|---|---|
| `sections[].id` | A unique code for the section | e.g. `"forms"`, `"student-resources"` |
| `sections[].title` | The section heading shown to users | e.g. `"Forms"`, `"Student Resources"` |
| `sections[].documents` | The **list** of files inside the section | One `{ … }` block per file |
| `documents[].id` | A unique code for the file | e.g. `"form-admissions"`, `"student-handbook"` |
| `documents[].title` | The name shown in the list | e.g. `"Application form"` |
| `documents[].format` | The file type | e.g. `"PDF"`, `"DOCX"` |
| `documents[].size` | The size shown to readers | e.g. `"1.2 MB"`, or `""` if not known |
| `documents[].url` | Where the file is | `"assets/documents/handbook.pdf"`, or `""` until it exists |

> The **"Programme Documents"** section is built automatically from each
> specialisation's own downloads — do **not** add it here.

### 4.6 `staff.js` — staff

The single source for the Staff page, each specialisation page and the Head of
Department block. To add a person, copy a `{ … }` block in `members`, paste it
after the last one, give them a **new** `id`, and fill in the fields.

**Keep exactly one person with `isHeadOfDepartment: true`.**

#### The group headings (`categories`)

This short list controls the headings in the Staff Directory and the order they
appear in. A group with **no members is hidden**.

| Field | What it is | What to put in it |
|---|---|---|
| `id` | The group's own code, used by each person's `category` | One of: `"head"`, `"academic"`, `"technical"`, `"admin"` |
| `label` | The heading shown to readers | e.g. `"Academic Staff"`, `"Administrative & Support Staff"` |

#### The people (`members`) — one `{ … }` block per person

| Field | What it is | What to put in it |
|---|---|---|
| `id` | Their own code, unique | e.g. `"academic-staff-03"` (Section 4.7) |
| `name` | Full name as it should be shown | e.g. `"Dr. A. B. Perera"` |
| `designation` | Their job title or designation | e.g. `"Senior Lecturer"` |
| `category` | Which group they belong to | `"head"`, `"academic"`, `"technical"` or `"admin"` — it must match one of the `categories` ids above, or the person will not show up |
| `qualifications` | Degrees, qualifications and professional memberships | e.g. `"M.Sc. (Eng), Ph.D."` |
| `photo` | Their photograph | A file in `assets/images/staff/`, e.g. `"assets/images/staff/perera.jpg"`, or `""` for none |
| `specialisationIds` | The specialisations they teach or work in | The specialisation codes, e.g. `["automobile-technology"]` (Section 4.7) |
| `email` | Their official email address | e.g. `"a.perera@tech.univ.jfn.ac.lk"`, or `""` for none |
| `researchInterests` | A short line on their research interests | e.g. `"Vehicle dynamics, tribology"`, or `""` |
| `isHeadOfDepartment` | Who is the Head of Department | `true` for the Head of Department **only**, `false` for everyone else |

> The Head of Department's **name and photo come from `staff.js`**, not from
> `content.js` — `content.js` only holds the Head's job title and message.

### 4.7 The codes you will see (and how to use them)

Every specialisation, staff member and document has a short **code** (the `id`
field). The codes are written in plain words so you can tell what they mean at a
glance.

**Specialisation codes** (used in `specialisations.js`, `staff.js` and
`research.js`):

| Code | Specialisation |
|---|---|
| `automobile-technology` | Automobile Technology |
| `construction-technology` | Construction Technology |
| `electro-technology` | Electro Technology |

**Staff codes** (used in `staff.js`, and in `coordinatorStaffId` in
`specialisations.js`):

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
- When you add something new, choose a code that says what it is, in the same
  style (all lowercase, hyphen-separated), and make sure it is unique.

---

## 5. Files and documents

- **Documents (PDFs, forms, handbooks):** upload to `assets/documents/`, then set
  the matching `url` (e.g. `"assets/documents/handbook.pdf"`). An empty `url`
  shows "Not yet available" — never a dead link.
- **Images (photos, logos):** upload to the matching folder inside `assets/images/`
  (`logos/`, `staff/`, `campus/`, `placeholders/` or `specialisations/`), then set the matching
  `image` / `photo` field to the file name or path.
- Image values are **relative to `assets/images/`**, e.g. `photo: "dean.jpg"` means
  `assets/images/staff/dean.jpg` (staff photos default to the `staff/` folder),
  and `image: "specialisations/dean.jpg"` means
  `assets/images/specialisations/dean.jpg`. Full paths starting with `assets/` still work.
- Paths are **relative to the site root** and start with `assets/`.
- **Links to other pages** are also written from the site root, e.g.
  `"pages/staff.html"` (not `"staff.html"`). The site works out the correct
  address for whichever page the link appears on, so always start from the root.
- Links and addresses in the data files are checked for safety before they are
  used: only normal web, email and telephone addresses are allowed, so a
  mistyped or unsafe link is simply not shown.

---

## 6. Placeholders — what to look for

Before launch, replace everything in `[square brackets]`. The list below is
regenerated from the site's own content files, so it is exactly what is still
waiting for the department.

**At the time of writing there are 189 placeholders in 85 different forms.**

| File | Placeholders still to replace |
|---|---|
| `content.js` | `[Dean's Name]`; the approved faculty introduction `[Insert the approved introduction to the Faculty of Technology here. …]`; the optional second paragraph `[Optional second paragraph. …]`; the approved Dean's message `[Insert the approved Dean's message here. …]`; the approved Head of Department message `[Insert the approved message from the Head of the Department of Engineering Technology here. …]`; the academic organisation text `[Describe how the department is organised academically, …]`; `[Insert the approved vision statement of the department here. …]`; `[Insert the approved mission statement of the department here. …]`; `[Concise description of this laboratory or facility.]` (×2) |
| `staff.js` | **Names:** `[Head of Department Name]`, `[Coordinator 01 Name]`, `[Coordinator 02 Name]`, `[Coordinator 03 Name]`, `[Academic Staff 01 Name]`, `[Academic Staff 02 Name]`, `[Technical Staff 01 Name]`, `[Administrative Staff 01 Name]`. **Emails:** `[head email address]`, `[coordinator 01 email address]`, `[coordinator 02 email address]`, `[coordinator 03 email address]`, `[academic staff 01 email address]`, `[academic staff 02 email address]`, `[technical staff 01 email address]`, `[administrative staff 01 email address]`. **Details:** `[Designation]` (×5), `[Qualifications]` (×7), `[Research interests]` (×6) |
| `specialisations.js` | `[Short description of the first/second/third specialisation. One or two sentences.]`; `[Introduction to Automobile/Construction/Electro Technology. …]`; `[Overview paragraph one/two for this specialisation.]`; `[Year 01 / Semester 01]`–`[Year 04 / Semester 02]`; `[Subject name 1]`–`[Subject name 48]` and `[Subject code 1]`–`[Subject code 48]` (2024, all 48 slots); `[Subject name 13]`–`[Subject name 48]` and `[Subject code 13]`–`[Subject code 48]` (2023, after the 12 real Year 1 subjects); `[Brief description of research and project activity in this specialisation.]` |
| `research.js` | `[Research or publication title]`, `[Author names, co-authors]`, `[Journal article / Conference paper / Thesis]`, `[Journal or conference name]` |
| `downloads.js` | `[Application / admissions form]`, `[Student handbook]` |
| `news.js` | None — the one announcement is already written. Add new items with real wording, not placeholders |

The curriculum placeholders are the largest group (**120 of the 189**): every
subject name, every subject code and every year/semester heading is still a
placeholder, in all three specialisations.

**These are fallbacks, not placeholders** — they appear only when a published
value is cleared, so there is nothing to replace:
`[Address to be added]`, `[Email to be added]`, `[Telephone to be added]`,
`[Contact details to be added]`.

See `docs/CONTENT_CHECKLIST.md` for the full list of official information still
needed.

---

## 7. How to publish your changes

You only upload the file(s) you changed.

1. Save your edited file (e.g. `news.js`).
2. Open your web host's file manager (or FTP/SFTP program).
3. Go to the same folder on the server and **overwrite** the old file with the new
   one (keep the exact same filename).
4. Refresh the website (`Ctrl+F5` bypasses the browser cache).

No "republishing" or taking the site offline is needed. There is no build step.

> **Tip — always keep a backup.** Before editing, copy the original file to a safe
> place (for example `news.js.backup`). If something breaks, you can restore it in
> seconds.

---

## 8. Editing an inner page's own wording (HTML)

The menu, footer and a few page headings are written directly in each `.html`
file. To change those:

1. Open the page file (e.g. `pages/about.html`) in a text editor.
2. Find the words you want to change **between the tags**, e.g.
   `<h1>About Us</h1>` — change only `About Us`.
3. **Do not** change anything inside `< … >` (those are instructions to the
   browser).
4. Save and upload the file.

If you are unsure, ask your webperson — a wrong edit here can break the page
layout. Note that if you rename a specialisation or a menu entry, the same change
must be made in **every** HTML page's menu and footer.

---

## 9. Quick troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| A section is blank / page looks broken | Missing comma or bracket `}` `]` | Undo (`Ctrl+Z`) and re-check, or restore the backup file |
| My change does not appear | File not uploaded, or browser cache | Re-upload, then `Ctrl+F5` |
| A download link does nothing | `url` is `""` or the file is not in `assets/documents/` | Upload the file and set its `url` |
| A photo does not show | Wrong path, or file not in `assets/images/` | Check the path spelling and upload the file |
| Two "Head of Department" people show | More than one `isHeadOfDepartment: true` | Keep exactly one `true`, set the others `false` |
| A staff member or paper is missing from a specialisation page | Their code is missing from `specialisationIds` | Add the specialisation's code (§4.7) |
| A news notice does not open from a link | The `#news-…` anchor does not match the item's `id` | Make the `id` unique and use it in the link |

---

## 10. Do NOT edit

- `assets/js/site/main.js` — the engine. Editing it can break **every** page.
- Anything inside `< … >` tags in the HTML files (except the wording between
  tags, as described in §8).
- The characters `{ } [ ] , : ;` and the labels (`title:`, `name:`) in the `.js`
  files.

When in doubt, back up first and make one small change at a time.

---

## 11. Cheat sheet — "I want to change…"

| I want to change… | Edit this file |
|---|---|
| University / faculty / department name | `content.js` → `institution` |
| Homepage welcome text / image | `content.js` → `faculty`, `department` |
| Dean's message or Head of Department message | `content.js` → `dean`, `hod` |
| About page vision / mission / history | `content.js` → `about` |
| Laboratories & facilities | `content.js` → `facilities` |
| Address, email, phone, map, social links | `content.js` → `contact` |
| Specialisation names, text, images | `specialisations.js` |
| Homepage academic tiles | `content.js` → `academicOverview` |
| Research / publications | `research.js` |
| News & announcements | `news.js` |
| E-Resources / downloads | `downloads.js` |
| Staff names, emails, photos | `staff.js` |
| Which specialisations a staff member belongs to | `staff.js` → `specialisationIds` (codes in §4.7) |
| Which specialisations a publication belongs to | `research.js` → `specialisationIds` (codes in §4.7) |
| The coordinator of a specialisation | `specialisations.js` → `coordinatorStaffId` (codes in §4.7) |

---

## 12. Where to get more help

- **Still unsure what to replace?** Check `docs/CONTENT_CHECKLIST.md` — it lists the
  official information the site is still waiting for.
- **Technical / developer detail?** See `README.md` in the `docs/` folder.
- **Anything else?** Ask the department's webperson before editing.

**Webperson:** https://ruzait.github.io/ — the person who built and maintains this
site. Ask them before touching page files, ids, navigation or anything not listed
in §11, and whenever a file or image you need is missing.
