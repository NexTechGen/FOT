# CONTENT CHECKLIST — Official information required

This website has been built with **clearly labelled editable placeholders** wherever official
content was not supplied. Nothing in square brackets `[...]` is real content — it must be replaced
or removed by the department before publication.

For each item below, once the approved content is supplied, make the change in the file listed and
undeploy/redeploy the site (see `README.md`).

Legend: ☐ = outstanding, ✔ = supplied (tick when done).

---

## 1. Identity and branding

- ✔ **Official university logo** — supplied (`assets/images/UOJ-Logo-Color-scaled.png`) and used as
  the header brand mark on every page.
- ✔ **Official brand colours** — the palette in `assets/css/styles.css` now uses the official
  University of Jaffna blue `#233C98` (as used on `jfn.ac.lk`). Confirm the derived shades
  (`#172B75`, `#EAEEF5`) are acceptable before launch.
- ☐ **Verified external links** — the footer contains no external URLs. Add only verified
  University/Faculty URLs when confirmed.
- ☐ **Production domain** — intentionally not set. Do not add canonical URLs until a real domain
  is assigned.

## 2. Faculty (homepage section 1) and Dean (About page)

- File: `assets/js/content.js`
- ☐ `faculty.intro` — approved Faculty of Technology introduction.
- ☐ `faculty.image` — real campus/faculty photograph (currently an SVG placeholder).
- ☐ `dean.name` — Dean's full name.
- ☐ `dean.photo` — Dean's photograph (currently a portrait placeholder).
- ☐ `dean.message` — the **approved** Dean's message (do not write one on the Dean's behalf).

## 3. Department (homepage section 2) and Head of Department (About page)

- File: `assets/js/content.js` and `assets/js/staff.js`
- ✔ `department.intro` — supplied (used on the home page and the About page).
- ✔ `department.focus` — supplied.
- ☐ `department.image` — department photograph.
- ☐ Head of Department record in `staff.js` (name, designation, photo, email).
- ☐ `hod.message` — approved Head of Department message (separate from the Dean's message).
- The Dean's message and the Head of Department message both appear on the **About** page
  (`about/index.html`).

## 4. Specialisations (all pages)

- File: `assets/js/content.js` **and** the navigation/footer of every HTML page.
- ✔ **Specialisation names** — supplied and applied everywhere, including the static navigation
  and footer of every page: **Automobile Technology**, **Construction Technology** and
  **Electro Technology**.
- ☐ Descriptions, overviews and intros for each specialisation.
- ☐ Real images for each specialisation (currently SVG placeholders).
- ☐ `coordinatorStaffId` — confirmed Specialisation Coordinator for each specialisation.
- ☐ Study areas, curriculum structure, related laboratories and research per specialisation.

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

## 6. Academics

- Files: `academics/index.html`, `assets/js/content.js`
- ✔ **Degree Programme** — supplied and published on `academics/index.html` (four-year Bachelor of
  Engineering Technology Honours, eight semesters, three specialisations). The Sydney Accord /
  SLQF Level 6 wording is kept as **published department information**, not as an accreditation
  claim.
- ✔ **Programme Structure** — supplied (Semesters 1–2 common; specialisation from Semester 3;
  Years 2–4 / Semesters 3–8).
- ☐ Credits and admission requirements (only if officially approved).
- ☐ Module codes and regulations.
- ☐ Student resources / handbooks.

> Note: the supplied **Career Opportunities** text has no matching page or section on the site,
> so it was not placed.

## 7. Research

- File: `assets/js/content.js`
- ☐ Research themes.
- ☐ Research projects and student projects.
- ☐ Publications (currently empty).
- ☐ Research intro text.

## 8. Facilities

- File: `assets/js/content.js`
- ✔ Two facility names supplied and shown on the site: **Engineering Workshop** and **Automobile
  Electronics and Mechatronics Laboratory**.
- ☐ Descriptions for both facilities (currently placeholder text).
- ☐ The other eight supplied names — Material, Applied Mechanics & Thermodynamics, Electrical,
  Construction, Automobile, Electronics, Heavy Construction and Surveying laboratories — have
  **no card slots** on the site. Add more facility entries (or a full list) to show them.
- ☐ Facility photographs (currently SVG placeholders).
- ☐ Correct specialisation associations.

## 9. News and events

- File: `assets/js/content.js`
- ☐ Add dated announcements to the `news` array (currently empty — a clear empty state is shown).
- ☐ Confirm each item's date, category and summary.

## 10. Downloads

- Files: `assets/js/content.js`, `assets/documents/`
- ☐ Upload the real PDFs/documents to `assets/documents/`.
- ☐ Set `url` for each document that exists (empty `url` shows "Not yet available").
- ☐ Add file format and size only when known.

## 11. Contact

- File: `assets/js/content.js`
- ☐ Official postal address.
- ☐ Official department email address (enables a working `mailto:` link).
- ☐ Official telephone number (enables a working `tel:` link).
- ☐ Location/map link — add only if the location is verified.
- ☐ Visiting instructions (optional).

## 12. Other supplied media

- ☐ Authentic campus and laboratory photography (currently placeholders).
- ☐ Any official icons or imagery for research/facilities/news.

---

## Placeholder inventory (search and replace)

Search the project for the following strings before launch:

- `[Dean's Name]`, `[Head of Department Name]`
- `[Insert the approved ...]` (faculty intro, department vision / mission / history, research,
  visiting instructions)
- `[department email address]`, `[telephone number]`, `[Building / street]`, `[City]`, `[Postal code]`
- `[Address to be added]`, `[Email to be added]`, `[Telephone to be added]`, `[Map link pending
  verification]`, `[Verify location before adding a map link]`
- `[Short description of the ... specialisation.]`, `[Introduction to this specialisation.]`,
  `[Overview paragraph ...]`, `[Main study area ...]`
- `[Curriculum area ...]`, `[Level / Year 01]`, `[Project or research area placeholder]`
- `[Brief description of research and project activity in this specialisation.]`
- `[Concise description of this laboratory or facility.]`
- `[Research theme ...]`, `[Student project ...]`, `[Guides, forms and documents available to students.]`
- `[Specialisation Coordinator to be appointed]`
- `[Application / admissions form]`, `[Student handbook]`
- Staff placeholder names/emails: `[Academic Staff 01 Name]`, `[Coordinator 01 Name]`,
  `[Technical Staff 01 Name]`, `[Administrative Staff 01 Name]`, `[... email address]`

Every remaining placeholder after you finish is information the department still needs to supply.
