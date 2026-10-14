/* ============================================================================
 * content.js — Shared, editable content source
 * ----------------------------------------------------------------------------
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * This file is a plain JavaScript file loaded with `defer` BEFORE main.js.
 * It exposes a single global object: window.DEPARTMENT_CONTENT
 *
 * Everything that appears on more than one page, or that official staff are
 * likely to update, lives here so it only has to be edited once:
 *   - Faculty introduction (homepage section 1)
 *   - Dean's message (homepage section 2 & About page)
 *   - Department introduction (homepage section 3)
 *   - Head of Department message (About page)
 *   - The three specialisations and their dedicated page content
 *   - Academic overview tiles
 *   - Research themes / projects / publications
 *   - Laboratories and facilities
 *   - News and announcements
 *   - Downloads (grouped by category)
 *   - Contact details
 *
 * IMPORTANT
 * ---------
 * - Text wrapped in [square brackets] is an EDITABLE PLACEHOLDER. Replace it
 *   with approved official content before publishing.
 * - Never invent names, qualifications, statistics, dates, messages, module
 *   codes, credits or accreditation claims. Ask the department for the real
 *   wording and paste it in.
 * - Image paths are relative to the site root (e.g. "assets/images/x.jpg").
 *   main.js resolves them for nested pages automatically.
 * - Staff records live in staff.js, NOT here. Specialisations reference staff
 *   by `id` so a person's record is only maintained in one place.
 *
 * See README.md -> "Editing the site" for step-by-step instructions.
 * ==========================================================================*/

window.DEPARTMENT_CONTENT = {

  /* --------------------------------------------------------------------------
   * 1. Institution identity (used by the header/footer and page rendering)
   * ------------------------------------------------------------------------*/
  institution: {
    university: "University of Jaffna",
    faculty: "Faculty of Technology",
    department: "Department of Engineering Technology",
    // RESERVED — not rendered anywhere (no consumer in main.js). Kept for
    // future use; do not assume editing it changes the site.
    tagline: "Engineering innovation for the North of Sri Lanka"
  },

  /* --------------------------------------------------------------------------
   * 2. Faculty of Technology introduction (HOME PAGE SECTION 1)
   * ------------------------------------------------------------------------*/
  faculty: {
    label: "University of Jaffna",
    heading: "Faculty of Technology",
    intro: [
      "[Insert the approved introduction to the Faculty of Technology here. " +
      "Describe the faculty's purpose, the disciplines it brings together and " +
      "its role within the University of Jaffna.]",
      "[Optional second paragraph. Keep it concise and factual — do not add " +
      "statistics, dates or accreditation claims that have not been approved.]"
    ],
    image: "assets/images/placeholder-campus.svg",
    imageAlt: "Placeholder image representing the Faculty of Technology campus",
    // RESERVED — not rendered. No page defines a [data-render="dean-note"]
    // target, and the same information is already covered by the department
    // copy, so this value is intentionally unused.
    deptNote:
      "This website belongs to the Department of Engineering Technology, " +
      "one of the departments within the Faculty of Technology."
  },

  /* --------------------------------------------------------------------------
   * 3. Message from the Dean (ABOUT PAGE)
   *    Keep this SEPARATE from the Head of Department message below.
   * ------------------------------------------------------------------------*/
  dean: {
    name: "[Dean's Name]",
    title: "Dean, Faculty of Technology",
    photo: "assets/images/placeholder-portrait.svg",
    photoAlt: "Placeholder portrait of the Dean, Faculty of Technology",
    message: [
      "[Insert the approved Dean's message here. This text must be provided " +
      "and approved by the Dean's office before it is published. Do not write " +
      "a welcome message on the Dean's behalf.]"
    ]
  },

  /* --------------------------------------------------------------------------
   * 4. Department of Engineering Technology introduction (HOME PAGE SECTION 3)
   * ------------------------------------------------------------------------*/
  department: {
    heading: "Welcome to the Department of Engineering Technology",
    intro: [
      "Engineering technology applies science and engineering principles to " +
      "real-world challenges. The Department of Engineering Technology aims to " +
      "develop engineering technologists who contribute to national development " +
      "by sharing technical knowledge and applying it to practical problems."
    ],
    image: "assets/images/placeholder-department.svg",
    imageAlt: "Placeholder image representing the Department of Engineering Technology",
    focus:
      "Through academic study, practical learning, and research, the department " +
      "prepares graduates to contribute to industrial advancement and national " +
      "development."
  },

  /* --------------------------------------------------------------------------
   * 5. Message from the Head of Department (ABOUT PAGE)
   *    The person is defined in staff.js (isHeadOfDepartment: true); only the
   *    approved message text lives here.
   * ------------------------------------------------------------------------*/
  hod: {
    title: "Head, Department of Engineering Technology",
    message: [
      "[Insert the approved message from the Head of the Department of " +
      "Engineering Technology here. This is separate from the Dean's message " +
      "and must be written and approved by the Head of Department.]"
    ]
  },

  /* --------------------------------------------------------------------------
   * 6. The three specialisations
   *    - `name` is used by the cards, the navigation dropdown, the footer link
   *      lists AND must match the static navigation links in each HTML file
   *      (the nav keeps working without JavaScript).
   *    - `shortName` is RESERVED and not rendered anywhere; every consumer uses
   *      the full `name`, so edit `name` (not `shortName`) to change a label.
   *    - `coordinatorStaffId` points at a staff record in staff.js.
   *    - Staff lists are DERIVED from staff.js (members' specialisationIds),
   *      never duplicated here.
   * ------------------------------------------------------------------------*/
  specialisations: [
    {
      id: "sp-01",
      name: "Automobile Technology",
      shortName: "Automobile Technology",
      pageUrl: "specialisations/automobile-technology/",
      description:
        "[Short description of the first specialisation. One or two sentences.]",
      image: "assets/images/specialisation-01.svg",
      imageAlt: "Placeholder image for Automobile Technology",
      coordinatorStaffId: "staff-coord-01",
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
        { title: "[Level / Year 01]", items: ["[Curriculum area 01]", "[Curriculum area 02]"] },
        { title: "[Level / Year 02]", items: ["[Curriculum area 03]", "[Curriculum area 04]"] }
      ],
      curriculumNote:
        "[Curriculum shown is indicative. Official module codes, credits and " +
        "regulations must be added by the department.]",
      laboratoryIds: ["lab-01", "lab-02"],
      research: {
        summary: "[Brief description of research and project activity in this specialisation.]",
        projects: ["[Project or research area placeholder]"]
      },
      downloadIds: ["dl-01"]
    },
    {
      id: "sp-02",
      name: "Construction Technology",
      shortName: "Construction Technology",
      pageUrl: "specialisations/construction-technology/",
      description:
        "[Short description of the second specialisation. One or two sentences.]",
      image: "assets/images/specialisation-02.svg",
      imageAlt: "Placeholder image for Construction Technology",
      coordinatorStaffId: "staff-coord-02",
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
        { title: "[Level / Year 01]", items: ["[Curriculum area 01]", "[Curriculum area 02]"] },
        { title: "[Level / Year 02]", items: ["[Curriculum area 03]", "[Curriculum area 04]"] }
      ],
      curriculumNote:
        "[Curriculum shown is indicative. Official module codes, credits and " +
        "regulations must be added by the department.]",
      laboratoryIds: ["lab-01"],
      research: {
        summary: "[Brief description of research and project activity in this specialisation.]",
        projects: ["[Project or research area placeholder]"]
      },
      downloadIds: ["dl-02"]
    },
    {
      id: "sp-03",
      name: "Electro Technology",
      shortName: "Electro Technology",
      pageUrl: "specialisations/electro-technology/",
      description:
        "[Short description of the third specialisation. One or two sentences.]",
      image: "assets/images/specialisation-03.svg",
      imageAlt: "Placeholder image for Electro Technology",
      coordinatorStaffId: "staff-coord-03",
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
        { title: "[Level / Year 01]", items: ["[Curriculum area 01]", "[Curriculum area 02]"] },
        { title: "[Level / Year 02]", items: ["[Curriculum area 03]", "[Curriculum area 04]"] }
      ],
      curriculumNote:
        "[Curriculum shown is indicative. Official module codes, credits and " +
        "regulations must be added by the department.]",
      laboratoryIds: ["lab-01", "lab-02"],
      research: {
        summary: "[Brief description of research and project activity in this specialisation.]",
        projects: ["[Project or research area placeholder]"]
      },
      downloadIds: ["dl-03"]
    }
  ],

  /* --------------------------------------------------------------------------
   * 7. Academic overview tiles (HOME PAGE SECTION 5 only)
   *    Only edit `url` if the destination genuinely exists.
   *    `icon` is optional — pick a name from the set below (rendered as an
   *    inline SVG next to the title); unknown names fall back to a default:
   *      "graduation-cap", "book-open", "layers", "list-checks",
   *      "folder-open", "file-text", "award", "users", "download".
   * ------------------------------------------------------------------------*/
  academicOverview: [
    {
      title: "Degree Programme",
      description: "A four-year Bachelor of Engineering Technology Honours degree comprising eight semesters.",
      icon: "graduation-cap",
      url: "academics/#overview"
    },
    {
      title: "Study Areas",
      description: "Automobile Technology, Construction Technology and Electro Technology.",
      icon: "layers",
      url: "academics/#study-areas"
    },
    {
      title: "Programme Structure",
      description: "The first two semesters are common; specialisation studies begin in Semester 3.",
      icon: "list-checks",
      url: "academics/#curriculum"
    },
    {
      title: "Student Resources",
      description: "[Guides, forms and documents available to students.]",
      icon: "folder-open",
      url: "downloads/"
    }
  ],

  /* --------------------------------------------------------------------------
   * 8. Research (research page only)
   *    Leave these as clearly labelled placeholders until verified content is
   *    supplied. Do not invent projects, awards or publications.
   * ------------------------------------------------------------------------*/
  research: {
    intro:
      "[Insert the approved description of the department's research activity.]",
    themes: [
      { title: "[Research theme 01]", description: "[Description of research theme 01.]" },
      { title: "[Research theme 02]", description: "[Description of research theme 02.]" },
      { title: "[Research theme 03]", description: "[Description of research theme 03.]" }
    ],
    projects: [
      { title: "[Student project 01]", description: "[Description of project 01.]" },
      { title: "[Student project 02]", description: "[Description of project 02.]" }
    ],
    publications: []
  },

  /* --------------------------------------------------------------------------
   * 9. Laboratories and facilities (HOME PAGE SECTION 6 & facilities page)
   * ------------------------------------------------------------------------*/
  facilities: [
    {
      id: "lab-01",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "assets/images/placeholder-lab.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["sp-01", "sp-02", "sp-03"]
    },
    {
      id: "lab-02",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "assets/images/placeholder-lab.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["sp-01", "sp-03"]
    }
  ],

  /* --------------------------------------------------------------------------
   * 10. News and announcements (HOME PAGE SECTION 7 & news page)
   *     EMPTY BY DESIGN. Add real, dated announcements only. Each item:
   *       { id, title, date (ISO "YYYY-MM-DD"), category, summary, body }
   *     Until items are added, a clear empty state is shown instead of
   *     fictional news.
   * ------------------------------------------------------------------------*/
  news: [],

  /* --------------------------------------------------------------------------
   * 11. Downloads (downloads page and specialisation pages)
   *     Only set `url` to a file that ACTUALLY EXISTS in assets/documents/.
   *     Leave format/size blank if unknown. Empty url => shown as "not yet
   *     available" (no dead link).
   * ------------------------------------------------------------------------*/
  downloads: [
    {
      id: "dl-01",
      title: "Automobile Technology — Programme document",
      category: "Programme Documents",
      format: "PDF",
      size: "",
      url: "",
      specialisationIds: ["sp-01"]
    },
    {
      id: "dl-02",
      title: "Construction Technology — Programme document",
      category: "Programme Documents",
      format: "PDF",
      size: "",
      url: "",
      specialisationIds: ["sp-02"]
    },
    {
      id: "dl-03",
      title: "Electro Technology — Programme document",
      category: "Programme Documents",
      format: "PDF",
      size: "",
      url: "",
      specialisationIds: ["sp-03"]
    },
    {
      id: "dl-04",
      title: "[Application / admissions form]",
      category: "Forms",
      format: "PDF",
      size: "",
      url: "",
      specialisationIds: []
    },
    {
      id: "dl-05",
      title: "[Student handbook]",
      category: "Student Resources",
      format: "PDF",
      size: "",
      url: "",
      specialisationIds: []
    }
  ],

  /* --------------------------------------------------------------------------
   * 12. Contact details (contact page)
   *     Leave the square-bracket placeholders until official details are
   *     supplied. main.js only turns them into mailto:/tel: links when a real
   *     value is present.
   * ------------------------------------------------------------------------*/
  contact: {
    departmentLine: "Department of Engineering Technology",
    facultyLine: "Faculty of Technology, University of Jaffna",
    address: ["[Building / street]", "[City]", "[Postal code]"],
    email: "[department email address]",
    phone: "[telephone number]",
    mapUrl: "",
    mapLabel: "[Verify location before adding a map link]"
  }
};
