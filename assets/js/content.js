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
 *   - Research publications by staff and students (shown on the Research page
 *     and filtered per specialisation)
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
    image: "assets/images/FOT-image.png",
    imageAlt: "Placeholder image representing the Faculty of Technology campus"
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
    image: "assets/images/FOT-image-02.png",
    imageAlt: "Faculty of Technology",
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
   * 5b. About page body text (ABOUT PAGE)
   *     The academic-organisation section (heading, intro, overview link and
   *     image) is fully driven from here. The specialisation links shown
   *     underneath are generated automatically from `specialisations` below.
   *     Vision / mission / history are plain-text paragraphs.
   * ------------------------------------------------------------------------*/
  about: {
    organisation: {
      heading: "Academic organisation",
      intro: [
        "[Describe how the department is organised academically, for example " +
        "its specialisations and teaching units.]"
      ],
      linkText: "See the academic overview",
      linkUrl: "academics.html",
      image: "assets/images/FOT-image-02.png",
      imageAlt: "Faculty of Technology"
    },
    vision:
      "[Insert the approved vision statement of the department here. Do not " +
      "publish a vision statement that has not been officially approved.]",
    mission:
      "[Insert the approved mission statement of the department here. Do not " +
      "publish a mission statement that has not been officially approved.]",
    history: [
      "[Insert the approved history of the department here, including only " +
      "verified dates and milestones.]"
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
   *    - `curriculum` items: { name, code, doc }.
   *        name  — subject name (shown as "name - code" on the page)
   *        code  — official subject/module code
   *        doc   — path to that subject's curriculum/syllabus PDF inside
   *                assets/documents/ (e.g. "assets/documents/etm1102.pdf").
   *                Leave "" until the file is uploaded — an empty value shows
   *        no link (never a dead link). A plain string item is also accepted
   *        and shown as-is.
   * ------------------------------------------------------------------------*/
  specialisations: [
    {
      id: "sp-01",
      name: "Automobile Technology",
      shortName: "Automobile Technology",
      pageUrl: "pages/automobile-technology.html",
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
      downloadIds: ["dl-01"]
    },
    {
      id: "sp-02",
      name: "Construction Technology",
      shortName: "Construction Technology",
      pageUrl: "pages/construction-technology.html",
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
      laboratoryIds: ["lab-01"],
      research: {
        summary: "[Brief description of research and project activity in this specialisation.]"
      },
      downloadIds: ["dl-02"]
    },
    {
      id: "sp-03",
      name: "Electro Technology",
      shortName: "Electro Technology",
      pageUrl: "pages/electro-technology.html",
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
  ],

  /* --------------------------------------------------------------------------
   * 7b. Academics page body (pages/academics.html)
   *     Drives the Degree Programme, Study areas and Programme Structure
   *     sections of the Academics page. Section headings stay in the HTML.
   *     The specialisation showcase and the tag links under the semester
   *     steps are generated automatically from `specialisations` above.
   * ------------------------------------------------------------------------*/
  academics: {
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
  },

  /* --------------------------------------------------------------------------
   * 8. Research (research page AND specialisation pages)
   *    A single list of research/publications produced by department staff and
   *    students. Add verified items only — never invent authors or papers.
   *    Each entry:
   *      {
   *        title,          // research/paper title
   *        authors,        // full author list, e.g. "A. Perera, B. Kumar, C. Silva"
   *        type,           // "Journal article" | "Conference paper" | "Thesis" | ""
   *        venue,          // journal / conference name
   *        year,           // "2025"
   *        status,         // "Published" | "Ongoing" | "" (leave "" to hide)
   *        specialisationIds: ["sp-01"],   // which specialisation pages show it
   *        url             // DOI or link, or "" (shows as plain text)
   *      }
   *    The Research page lists every entry; each specialisation page lists the
   *    entries whose specialisationIds include that specialisation.
   * ------------------------------------------------------------------------*/
  research: {
    intro: "",
    items: [
      {
        title: "[Research or publication title]",
        authors: "[Author names, co-authors]",
        type: "[Journal article / Conference paper / Thesis]",
        venue: "[Journal or conference name]",
        year: "",
        status: "",
        specialisationIds: ["sp-01"],
        url: ""
      }
    ]
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
   *     Add real, dated announcements only. Each item:
   *       { id, title, date (ISO "YYYY-MM-DD"), category, summary, body, doc }
   *     `id` must be unique and stable (it becomes the #anchor link).
   *     Optional `doc` attaches a downloadable file (e.g. exam time table):
   *       { title, url }
   *     Only set `url` to a file that ACTUALLY EXISTS in assets/documents/;
   *     an empty url shows no download link (never a dead link).
   * ------------------------------------------------------------------------*/
  news: [
    {
      id: "news-2026-10-26",
      title: "Practical examinations for 1-2, 2-2 and 4-2 students",
      date: "2026-10-26",
      category: "Notice",
      summary: "Practical examinations for 1-2, 2-2 and 4-2 students commence on 26 October 2026.",
      body: "Practical examinations for students of 1-2, 2-2 and 4-2 will commence on 26 October 2026. Students are advised to be present at the laboratory with their student identity cards.",
      doc: {
        title: "Examination time table",
        url: ""
      }
    }
  ],

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
    mapLabel: "[Verify location before adding a map link]",
    visiting: {
      intro: ["[Insert visiting instructions here, such as directions and opening hours, once they have been verified.]"],
      image: "assets/images/FOT-image.png",
      imageAlt: "Placeholder image of the University of Jaffna campus"
    }
  }
};
