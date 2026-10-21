/* ============================================================================
 * specialisations.js — specialisation pages and the Academics page
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * WHAT YOU CAN EDIT HERE
 *   Specialisation names, text and images ............ home page, menu, footer and each specialisation page
 *   Academic overview tiles .......................... home page
 *   Academics page content ........................... Academics page
 *
 * IMPORTANT: a specialisation name is also written in the menu and footer of
 * every page. If you rename one, ask your webperson to update those too.
 * The list of staff on each specialisation comes from staff.js automatically.
 *
 * THE CODES USED HERE
 *   "id" is the specialisation's own code (unique, do not reuse):
 *     automobile-technology
 *     construction-technology
 *     electro-technology
 *   Use these same codes in staff.js (specialisationIds) and research.js
 *   (specialisationIds) to link a person or a publication to a specialisation.
 *   "coordinatorStaffId" is the staff member's code from staff.js, e.g.
 *   "coordinator-automobile-technology".
 *
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 * ==========================================================================*/

window.DEPARTMENT_CONTENT = window.DEPARTMENT_CONTENT || {};

/* --------------------------------------------------------------------------
 * The three specialisations
 *   - The "name" is shown on the cards, in the menu, in the footer and on the
 *     specialisation page. If you change it, ask your webperson to update the
 *     menu and footer too.
 *   - Do not change "shortName" - it is not used on the site.
 *   - "coordinatorStaffId" links to a staff member in staff.js.
 *   - The staff shown on each specialisation page come from staff.js
 *     automatically; do not list them here.
 *   - For each subject in "curriculum": give its name and code, and set "doc"
 *     to its PDF file in assets/documents (or "" if there is no file yet).
 * ------------------------------------------------------------------------*/
window.DEPARTMENT_CONTENT.specialisations = [
  {
    id: "automobile-technology",
    name: "Automobile Technology",
    shortName: "Automobile Technology",
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
    studyAreas: [
      "[Main study area 01]",
      "[Main study area 02]",
      "[Main study area 03]",
      "[Main study area 04]"
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
    // Related downloads for this specialisation (shown on its own page AND
    // collected into the E-Resources "Programme Documents" section). Add as
    // many as needed; leave `url` blank until the file exists in
    // assets/documents/ (shown as "not yet available").
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
    shortName: "Construction Technology",
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
    studyAreas: [
      "[Main study area 01]",
      "[Main study area 02]",
      "[Main study area 03]",
      "[Main study area 04]"
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
    // Related downloads for this specialisation (shown on its own page AND
    // collected into the E-Resources "Programme Documents" section). Add as
    // many as needed; leave `url` blank until the file exists in
    // assets/documents/ (shown as "not yet available").
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
    shortName: "Electro Technology",
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
    studyAreas: [
      "[Main study area 01]",
      "[Main study area 02]",
      "[Main study area 03]",
      "[Main study area 04]"
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
    // Related downloads for this specialisation (shown on its own page AND
    // collected into the E-Resources "Programme Documents" section). Add as
    // many as needed; leave `url` blank until the file exists in
    // assets/documents/ (shown as "not yet available").
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

/* --------------------------------------------------------------------------
 * Academic overview tiles (home page)
 *   Each tile has a title, some text, a link and an icon.
 *   - Only set "url" to a page that actually exists.
 *   - "icon" is optional. Choose one of these names:
 *     "graduation-cap", "book-open", "layers", "list-checks",
 *     "folder-open", "file-text", "award", "users", "download".
 * ------------------------------------------------------------------------*/
window.DEPARTMENT_CONTENT.academicOverview = [
  {
    title: "Degree Programme",
    description: "A four-year Bachelor of Engineering Technology Honours degree comprising eight semesters.",
    icon: "graduation-cap",
    url: "pages/academics.html#overview"
  },
  {
    title: "Study Areas",
    description: "Automobile Technology, Construction Technology and Electro Technology.",
    icon: "layers",
    url: "pages/academics.html#study-areas"
  },
  {
    title: "Programme Structure",
    description: "The first two semesters are common; specialisation studies begin in Semester 3.",
    icon: "list-checks",
    url: "pages/academics.html#curriculum"
  },
  {
    title: "Student Resources",
    description: "[Guides, forms and documents available to students.]",
    icon: "folder-open",
    url: "pages/downloads.html"
  }
];

/* --------------------------------------------------------------------------
 * Academics page content
 * ------------------------------------------------------------------------*/
window.DEPARTMENT_CONTENT.academics = {
  overview: {
    intro: [
      "The Department of Engineering Technology offers a four-year Bachelor " +
      "of Engineering Technology Honours undergraduate degree comprising " +
      "eight semesters. Students can pursue one of three specialisations: " +
      "Automobile Technology, Construction Technology, or Electro Technology.",
      "The published department information describes the programme as " +
      "designed to comply with Sydney Accord requirements and Sri Lanka " +
      "Qualifications Framework (SLQF) Level 6."
    ],
    note:
      "Compliance with Sydney Accord requirements and SLQF Level 6 is stated " +
      "as published department information and is not presented here as a " +
      "claim of accreditation. Confirm current details with the department."
  },
  studyAreas: {
    intro:
      "The department's teaching is organised around three specialisations. " +
      "Each specialisation has its own dedicated page."
  },
  curriculum: {
    intro: "The semester structure of the four-year Bachelor of Engineering Technology Honours degree.",
    prose: [
      "The first two semesters are common to all Engineering Technology " +
      "students. Specialisation studies begin in Semester 3 and continue " +
      "through the remaining years of the four-year degree programme."
    ],
    steps: [
      {
        meta: "Year 1 · Semesters 1–2",
        title: "Common programme",
        text: "Shared by every Engineering Technology student before specialisation begins."
      },
      {
        meta: "Years 2–4 · Semesters 3–8",
        title: "Specialisation studies",
        text: "Students continue in one of the department's three specialisations."
      }
    ],
    tagsLabel: "View a specialisation curriculum"
  }
};
