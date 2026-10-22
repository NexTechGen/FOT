/* specialisations.js — specialisation pages
 * What this file is for: the three specialisations (Automobile Technology,
 *   Construction Technology, Electro Technology) plus the academic overview
 *   tiles on the home page.
 * 
 * What you can edit: the specialisation names, text and images, and the tiles.
 *   If you rename a specialisation, the menu and footer of every page need the
 *   same update by the webperson. The staff on each specialisation come from
 *   staff.js automatically.
 * 
 * The codes used here: "id" is the specialisation's own code (unique, do not
 *   reuse) — automobile-technology, construction-technology, electro-technology.
 *   Use the same codes in staff.js and research.js (specialisationIds).
 *   "coordinatorStaffId" is the staff member's code from staff.js.
 * 
 * Each specialisation — one object per specialisation:
 *   id                The specialisation's own code (see above).
 *   name              The name shown on the cards, in the menu, in the footer
 *                     and on the specialisation page.
 *   pageUrl           The page that shows this specialisation.
 *   description       One or two sentences for the specialisation cards.
 *   image / imageAlt  The picture on the card and its description.
 *   coordinatorStaffId
 *                     The staff code of the specialisation coordinator.
 *   intro             The introduction shown at the top of the page.
 *   overview          One or two paragraphs about the specialisation. This is
 *                     what appears in the "About this specialisation" section.
 *   curriculum        The subjects, grouped by year and semester: title is
 *                     the year / semester heading, and each item in items has
 *                     a name, a code and doc — the link to the subject PDF in
 *                     assets/documents, or "" if there is no file yet.
 *   curriculumNote    The note printed under the curriculum.
 *   laboratoryIds     The codes of the laboratories used by the specialisation
 *                     (the laboratory codes come from content.js).
 *   research.summary  A short description of research and project activity.
 *   downloads         The files shown on this page and collected into the
 *                     E-Resources "Programme Documents" section: id, title,
 *                     format, size and url (leave url blank until the file
 *                     exists).
 * 
 * The academic overview tiles (home page) — each tile has a title, a
 *   description, an icon and a link. Only set "url" to a page that exists.
 *   Icon names: "award", "book-open", "download", "file-text", "folder-open",
 *   "globe", "graduation-cap", "layers", "list-checks", "mail", "map-pin",
 *   "phone", "users".
 * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_CONTENT = window.DEPARTMENT_CONTENT || {};

/* The three specialisations — one object each. The staff shown on each
 * specialisation page come from staff.js automatically; do not list them here. */
window.DEPARTMENT_CONTENT.specialisations = [
  {
    id: "automobile-technology",
    name: "Automobile Technology",
    pageUrl: "pages/automobile-technology.html",
    description:
      "[Short description of the first specialisation. One or two sentences.]",
    image: "assets/images/specialisation-01.svg",
    imageAlt: "Placeholder image for Automobile Technology",
    coordinatorStaffId: "coordinator-automobile-technology",
    intro:
      "[Introduction to Automobile Technology. Describe what the " +
      "specialisation is about and who it is for.]",
    overview: [
      "[Overview paragraph one for this specialisation.]",
      "[Overview paragraph two for this specialisation.]"
    ],
    curriculum: [
      { title: "[Year 01 / Semester 01]", items: [
        { name: "[Subject name 01]", code: "[Subject code 01]", doc: "" },
        { name: "[Subject name 02]", code: "[Subject code 02]", doc: "" }
      ] },
      { title: "[Year 01 / Semester 02]", items: [
        { name: "[Subject name 03]", code: "[Subject code 03]", doc: "" },
        { name: "[Subject name 04]", code: "[Subject code 04]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 01]", items: [
        { name: "[Subject name 05]", code: "[Subject code 05]", doc: "" },
        { name: "[Subject name 06]", code: "[Subject code 06]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 02]", items: [
        { name: "[Subject name 07]", code: "[Subject code 07]", doc: "" },
        { name: "[Subject name 08]", code: "[Subject code 08]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 01]", items: [
        { name: "[Subject name 09]", code: "[Subject code 09]", doc: "" },
        { name: "[Subject name 10]", code: "[Subject code 10]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 02]", items: [
        { name: "[Subject name 11]", code: "[Subject code 11]", doc: "" },
        { name: "[Subject name 12]", code: "[Subject code 12]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 01]", items: [
        { name: "[Subject name 13]", code: "[Subject code 13]", doc: "" },
        { name: "[Subject name 14]", code: "[Subject code 14]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 02]", items: [
        { name: "[Subject name 15]", code: "[Subject code 15]", doc: "" },
        { name: "[Subject name 16]", code: "[Subject code 16]", doc: "" }
      ] }
    ],
    curriculumNote:
      "[Curriculum shown is indicative. Official module codes, credits and " +
      "regulations must be added by the department.]",
    laboratoryIds: ["lab-01", "lab-02"],
    research: {
      summary: "[Brief description of research and project activity in this specialisation.]"
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Leave `url` blank until the file exists.
    downloads: [
      {
        id: "automobile-technology-doc-01",
        title: "Automobile Technology — Programme document",
        format: "PDF",
        size: "",
        url: ""
      }
    ]
  },
  {
    id: "construction-technology",
    name: "Construction Technology",
    pageUrl: "pages/construction-technology.html",
    description:
      "[Short description of the second specialisation. One or two sentences.]",
    image: "assets/images/specialisation-02.svg",
    imageAlt: "Placeholder image for Construction Technology",
    coordinatorStaffId: "coordinator-construction-technology",
    intro:
      "[Introduction to Construction Technology. Describe what the " +
      "specialisation is about and who it is for.]",
    overview: [
      "[Overview paragraph one for this specialisation.]",
      "[Overview paragraph two for this specialisation.]"
    ],
    curriculum: [
      { title: "[Year 01 / Semester 01]", items: [
        { name: "[Subject name 01]", code: "[Subject code 01]", doc: "" },
        { name: "[Subject name 02]", code: "[Subject code 02]", doc: "" }
      ] },
      { title: "[Year 01 / Semester 02]", items: [
        { name: "[Subject name 03]", code: "[Subject code 03]", doc: "" },
        { name: "[Subject name 04]", code: "[Subject code 04]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 01]", items: [
        { name: "[Subject name 05]", code: "[Subject code 05]", doc: "" },
        { name: "[Subject name 06]", code: "[Subject code 06]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 02]", items: [
        { name: "[Subject name 07]", code: "[Subject code 07]", doc: "" },
        { name: "[Subject name 08]", code: "[Subject code 08]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 01]", items: [
        { name: "[Subject name 09]", code: "[Subject code 09]", doc: "" },
        { name: "[Subject name 10]", code: "[Subject code 10]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 02]", items: [
        { name: "[Subject name 11]", code: "[Subject code 11]", doc: "" },
        { name: "[Subject name 12]", code: "[Subject code 12]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 01]", items: [
        { name: "[Subject name 13]", code: "[Subject code 13]", doc: "" },
        { name: "[Subject name 14]", code: "[Subject code 14]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 02]", items: [
        { name: "[Subject name 15]", code: "[Subject code 15]", doc: "" },
        { name: "[Subject name 16]", code: "[Subject code 16]", doc: "" }
      ] }
    ],
    curriculumNote:
      "[Curriculum shown is indicative. Official module codes, credits and " +
      "regulations must be added by the department.]",
    laboratoryIds: ["lab-01", "lab-02"],
    research: {
      summary: "[Brief description of research and project activity in this specialisation.]"
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Leave `url` blank until the file exists.
    downloads: [
      {
        id: "construction-technology-doc-01",
        title: "Construction Technology — Programme document",
        format: "PDF",
        size: "",
        url: ""
      }
    ]
  },
  {
    id: "electro-technology",
    name: "Electro Technology",
    pageUrl: "pages/electro-technology.html",
    description:
      "[Short description of the third specialisation. One or two sentences.]",
    image: "assets/images/specialisation-03.svg",
    imageAlt: "Placeholder image for Electro Technology",
    coordinatorStaffId: "coordinator-electro-technology",
    intro:
      "[Introduction to Electro Technology. Describe what the " +
      "specialisation is about and who it is for.]",
    overview: [
      "[Overview paragraph one for this specialisation.]",
      "[Overview paragraph two for this specialisation.]"
    ],
    curriculum: [
      { title: "[Year 01 / Semester 01]", items: [
        { name: "[Subject name 01]", code: "[Subject code 01]", doc: "" },
        { name: "[Subject name 02]", code: "[Subject code 02]", doc: "" }
      ] },
      { title: "[Year 01 / Semester 02]", items: [
        { name: "[Subject name 03]", code: "[Subject code 03]", doc: "" },
        { name: "[Subject name 04]", code: "[Subject code 04]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 01]", items: [
        { name: "[Subject name 05]", code: "[Subject code 05]", doc: "" },
        { name: "[Subject name 06]", code: "[Subject code 06]", doc: "" }
      ] },
      { title: "[Year 02 / Semester 02]", items: [
        { name: "[Subject name 07]", code: "[Subject code 07]", doc: "" },
        { name: "[Subject name 08]", code: "[Subject code 08]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 01]", items: [
        { name: "[Subject name 09]", code: "[Subject code 09]", doc: "" },
        { name: "[Subject name 10]", code: "[Subject code 10]", doc: "" }
      ] },
      { title: "[Year 03 / Semester 02]", items: [
        { name: "[Subject name 11]", code: "[Subject code 11]", doc: "" },
        { name: "[Subject name 12]", code: "[Subject code 12]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 01]", items: [
        { name: "[Subject name 13]", code: "[Subject code 13]", doc: "" },
        { name: "[Subject name 14]", code: "[Subject code 14]", doc: "" }
      ] },
      { title: "[Year 04 / Semester 02]", items: [
        { name: "[Subject name 15]", code: "[Subject code 15]", doc: "" },
        { name: "[Subject name 16]", code: "[Subject code 16]", doc: "" }
      ] }
    ],
    curriculumNote:
      "[Curriculum shown is indicative. Official module codes, credits and " +
      "regulations must be added by the department.]",
    laboratoryIds: ["lab-01", "lab-02"],
    research: {
      summary: "[Brief description of research and project activity in this specialisation.]"
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Leave `url` blank until the file exists.
    downloads: [
      {
        id: "electro-technology-doc-01",
        title: "Electro Technology — Programme document",
        format: "PDF",
        size: "",
        url: ""
      }
    ]
  }
];

/* Academic overview tiles (home page). Each tile has a title, some text, a
 * link and an optional icon. Only set "url" to a page that exists. Icon names:
 * "graduation-cap", "book-open", "layers", "list-checks", "folder-open",
 * "file-text", "award", "users", "download".
 */
window.DEPARTMENT_CONTENT.academicOverview = [
  {
    title: "Vision and mission",
    description: "Our direction, aims and core values as a department.",
    icon: "file-text",
    url: "pages/about.html#vision-mission"
  },
  {
    title: "Our Research",
    description: "Research activities, projects and publications from the department.",
    icon: "book-open",
    url: "pages/research.html"
  },
  {
    title: "Academic organisation",
    description: "How the department is organised and its academic structure.",
    icon: "layers",
    url: "pages/about.html#academic-organisation"
  },
  {
    title: "E-Resources",
    description: "Guides, forms, handbooks and other useful student documents.",
    icon: "download",
    url: "pages/downloads.html"
  }
];
