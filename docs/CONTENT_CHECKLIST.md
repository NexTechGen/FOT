# CONTENT CHECKLIST — Official information required

This website has been built with **clearly labelled editable placeholders** wherever official
content was not supplied. Nothing in square brackets `[...]` is real content — it must be replaced
or removed by the department before publication.

For each item below, once the approved content is supplied, make the change in the file listed and
publish the updated files to the web server the normal way (see `README.md`). No undeploying or
taking the site offline is required.

> **How to edit (short version):** open the listed file in a plain-text editor, change only the text
> **between the quotes** `" "`, replace any `[square-bracket]` placeholder with the real wording,
> keep every comma, save the file and re-upload it. The same rules are written at the top of every
> content file. For the full admin manual (every page, every file, publishing steps), see
> **`docs/ADMIN_GUIDE.md`**. `site/main.js` is not an admin file.

Legend: ☐ = outstanding, ✔ = supplied (tick when done).

---

## 1. Identity and branding

- ✔ **Official university logo** — supplied (`assets/images/UOJ-Logo-Color-scaled.png`) and used as
  the header brand mark on every page. The black-and-white variant
  (`assets/images/UOJ-Logo-Black-White-scaled.png`) is the footer mark, and
  `assets/images/UOJ-Logo-Color-scaled.ico` is the page favicon.
- ✔ **Official brand colours** — the palette in `assets/css/styles.css` now uses the official
  University of Jaffna blue `#233C98` (as used on `jfn.ac.lk`). Confirm the derived shades
  (`#172B75`, `#EAEEF5`) are acceptable before launch.
- ☐ **Verified external links** — the only external link is the footer `University of Jaffna`
  link to `https://jfn.ac.lk/`. Add further verified University/Faculty URLs only when confirmed.
- ☐ **Production domain** — intentionally not set. Do not add canonical URLs until a real domain
  is assigned.

## 2. Faculty (homepage section 1) and Dean (About page)

- File: `assets/js/content.js`
- ☐ `faculty.intro` — approved Faculty of Technology introduction.
- ☐ `faculty.image` — real campus/faculty photograph (currently an SVG placeholder).
- ☐ `dean.name` — Dean's full name.
- ☐ `dean.photo` — Dean's photograph (currently a portrait placeholder).
- ☐ `dean.message` — the **approved** Dean's message (do not write one on the Dean's behalf).

## 3. Department (homepage section 3) and Head of Department (About page)

- File: `assets/js/content.js` and `assets/js/staff.js`
- ✔ `department.intro` — supplied (used on the home page only).
- ✔ `department.focus` — supplied.
- ☐ `department.image` — department photograph.
- ☐ Head of Department record in `staff.js` (name, designation, photo, email).
- ☐ `hod.message` — approved Head of Department message (separate from the Dean's message).
- The Dean's message appears on the **About** page only (`pages/about.html`); the Head of Department
  message also appears on the **About** page. (News and announcements sit directly after the
  Faculty section on the home page.)

## 4. Specialisations (all pages)

- File: `assets/js/specialisations.js` **and** the navigation/footer of every HTML page.
- ✔ **Specialisation names** — supplied and applied everywhere, including the static navigation
  and footer of every page: **Automobile Technology**, **Construction Technology** and
  **Electro Technology**.
- ☐ Descriptions, overviews and intros for each specialisation.
- ☐ Real images for each specialisation (currently SVG placeholders).
- ☐ `coordinatorStaffId` — confirmed Specialisation Coordinator for each specialisation.
- ☐ Curriculum structure, related laboratories and research per specialisation.

> Note: specialisation names appear in the static navigation and footer of **all** HTML pages
> (so navigation works without JavaScript). Remember to update those too.

## 5. Staff directory

- File: `assets/js/staff.js`
- ☐ Real names, designations and categories for all staff.
- ☐ Qualifications.
- ☐ Official email addresses (nothing is linked until a real address is present).
- ☐ Staff photographs (or confirm initials avatars are acceptable).
- ☐ Correct `specialisationIds` for each person.
- ☐ Confirm exactly one `isHeadOfDepartment: true`.

## 6. Academic overview

- File: `assets/js/specialisations.js`
- ☐ Confirm the four **Academic overview** cards on the home page (`academicOverview`); each card
  has an optional `icon` (see §3.11 of `README.md`).

> Note: the supplied **Career Opportunities** text has no matching page or section on the site,
> so it was not placed.

## 7. Research

- File: `assets/js/research.js`
- ☐ Research themes.
- ☐ Research projects and student projects.
- ☐ Publications (only a `[Research or publication title]` placeholder is present — replace or
  delete it; the site shows an empty state when the list has no real entries).
- ☐ Research intro text.

## 8. Facilities

- File: `assets/js/content.js`
- ✔ Two facility entries supplied and shown on the site: **Engineering Workshop** and **Automobile
  Electronics and Mechatronics Laboratory**. The home page shows the first two entries; the
  Facilities page lists **every** entry in the `facilities` array.
- ☐ Descriptions for both facilities (currently placeholder text).
- ☐ The other eight supplied names — Material, Applied Mechanics & Thermodynamics, Electrical,
  Construction, Automobile, Electronics, Heavy Construction and Surveying laboratories — have
  **no entries yet**. Add an object for each to the `facilities` array to show them (they will then
  appear on the Facilities page automatically).
- ☐ Facility photographs (currently SVG placeholders).
- ☐ Correct specialisation associations.

## 9. News and events

- File: `assets/js/news.js`
- ☐ One announcement is listed (practical examinations, 26 October 2026) — confirm the wording,
  date and category before launch.
- ☐ Add further dated announcements to the `news` array (newest first). When the array is empty,
  a clear empty state is shown instead.
- ☐ Attach the examination time table (or any other file) to `doc.url` once it exists in
  `assets/documents/`.

## 10. Downloads

- Files: `assets/js/downloads.js`, `assets/documents/`
- ☐ Upload the real PDFs/documents to `assets/documents/`.
- ☐ Set `url` for each document that exists (empty `url` shows "Not yet available").
- ☐ Add file format and size only when known.

## 11. Contact

- File: `assets/js/content.js`
- ☑ Official postal address — **supplied**: "Ariviyal Nagar", "Kilinochchi", "Sri Lanka"
  (in `contact.address`, one entry per line; printed as "Ariviyal Nagar, Kilinochchi, Sri Lanka.").
  Shown on the Contact page and in the footer.
- ☑ Official department email address — **supplied**: `tech@univ.jfn.ac.lk` (in `contact.email`,
  shown as a working `mailto:` link).
- ☑ Official telephone number — **supplied**: "(+94) 21-313-5880" (in `contact.phone`, shown as a
  working `tel:` link).
- ☐ Location/map link — the map embed is in place; confirm the pin still marks the correct
  building before launch.
- ☐ Visiting instructions (optional).

## 12. Other supplied media

- ☐ Authentic campus and laboratory photography (currently placeholders).
- ☐ Any official icons or imagery for research/facilities/news.

---

## Placeholder inventory (search and replace)

This list is generated from the content files themselves, so it is exactly what
is still waiting for the department. At the time of writing there are **189
placeholders in 85 different forms**.

**`assets/js/content.js`** (11)

- `[Dean's Name]`
- `[Insert the approved introduction to the Faculty of Technology here. …]`
- `[Optional second paragraph. …]`
- `[Insert the approved Dean's message here. …]`
- `[Insert the approved message from the Head of the Department of Engineering Technology here. …]`
- `[Describe how the department is organised academically, …]`
- `[Insert the approved vision statement of the department here. …]`
- `[Insert the approved mission statement of the department here. …]`
- `[Insert the approved history of the department here, …]`
- `[Concise description of this laboratory or facility.]` (×2 — one per facility)

**`assets/js/staff.js`** (34)

- Names: `[Head of Department Name]`, `[Coordinator 01 Name]`,
  `[Coordinator 02 Name]`, `[Coordinator 03 Name]`, `[Academic Staff 01 Name]`,
  `[Academic Staff 02 Name]`, `[Technical Staff 01 Name]`,
  `[Administrative Staff 01 Name]`
- Emails: `[head email address]`, `[coordinator 01 email address]`,
  `[coordinator 02 email address]`, `[coordinator 03 email address]`,
  `[academic staff 01 email address]`, `[academic staff 02 email address]`,
  `[technical staff 01 email address]`, `[administrative staff 01 email address]`
- Details: `[Designation]` (×5), `[Qualifications]` (×7), `[Research interests]` (×6)

**`assets/js/specialisations.js`** (138 — the largest group)

- `[Short description of the first specialisation. One or two sentences.]`,
  `[Short description of the second specialisation. One or two sentences.]`,
  `[Short description of the third specialisation. One or two sentences.]`
- `[Introduction to Automobile Technology. …]`,
  `[Introduction to Construction Technology. …]`,
  `[Introduction to Electro Technology. …]`
- `[Overview paragraph one for this specialisation.]`,
  `[Overview paragraph two for this specialisation.]`
- `[Year 01 / Semester 01]` – `[Year 04 / Semester 02]`
- `[Subject name 01]` – `[Subject name 16]`
- `[Subject code 01]` – `[Subject code 16]`
- `[Curriculum shown is indicative. …]`
- `[Brief description of research and project activity in this specialisation.]`

Each of these repeats in all three specialisations.

**`assets/js/research.js`** (4)

- `[Research or publication title]`, `[Author names, co-authors]`,
  `[Journal article / Conference paper / Thesis]`, `[Journal or conference name]`

**`assets/js/downloads.js`** (2)

- `[Application / admissions form]`, `[Student handbook]`

**`assets/js/news.js`** (0) — the one announcement is already written.

**Fallbacks, not placeholders** — shown only when a published value is cleared,
so there is nothing to replace: `[Address to be added]`, `[Email to be added]`,
`[Telephone to be added]`, `[Contact details to be added]`.

Every remaining placeholder after you finish is information the department still needs to supply.
