/* ============================================================================
 * content.js — main website text
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * WHAT YOU CAN EDIT HERE
 *   University / faculty / department names .......... shown in the header and footer of every page
 *   Homepage welcome text and image .................. top of the home page
 *   Dean's name, photo and message ................... About Us page
 *   Homepage department introduction ................. home page
 *   Head of Department message ....................... About Us page
 *   About Us text (vision, mission, history) ......... About Us page
 *   Laboratories and facilities ...................... home page and Facilities page
 *   Address, email, phone, map and social links ...... Contact Us page and footer
 *
 * Other files: specialisations.js, research.js, news.js, downloads.js and
 * staff.js hold their own text.
 *
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 * ==========================================================================*/

window.DEPARTMENT_CONTENT = Object.assign(window.DEPARTMENT_CONTENT || {}, {

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
    image: "assets/images/FOT-image-02.png",
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
    image: "assets/images/FOT-image.png",
    imageAlt: "Faculty of Technology",
    focus:
      "Through academic study, practical learning, and research, the department " +
      "prepares graduates to contribute to industrial advancement and national " +
      "development."
  },

  /* --------------------------------------------------------------------------
   * 5. Message from the Head of Department (ABOUT PAGE)
   *    The person's name and photo come from staff.js; only the approved
   *    message text lives here.
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
   * 5b. About page text (ABOUT PAGE)
   *     Text for the "Academic organisation" block, plus the vision, mission
   *     and history paragraphs. The specialisation links below it and the
   *     staff are filled in automatically from the other files.
   * ------------------------------------------------------------------------*/
  about: {
    organisation: {
      heading: "Academic organisation",
      intro: [
        "[Describe how the department is organised academically, for example " +
        "its specialisations and teaching units.]"
      ],
      linkText: "See the academic overview",
      // IMPORTANT: file links and image links in this file start from the
      // website root, e.g. "pages/academics.html" and "assets/images/....".
      // Do not leave off the "pages/" part.
      linkUrl: "pages/academics.html",
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
   * Specialisations, academic overview, research, news and downloads live in
   * their own files: specialisations.js, research.js, news.js, downloads.js.
   * ------------------------------------------------------------------------*/

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
      specialisationIds: ["automobile-technology", "construction-technology", "electro-technology"]
    },
    {
      id: "lab-02",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "assets/images/placeholder-lab.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["automobile-technology", "electro-technology"]
    }
  ],

  /* --------------------------------------------------------------------------
   * 12. Contact details (Contact Us page AND footer "Contact us" column)
   *     One block drives both the Contact page and the footer, so the address,
   *     email and phone only have to be edited once.
   *     - Address: each line is one line on the page.
   *     - Social links: use the icon names "facebook", "twitter", "linkedin",
   *       "youtube" with a full https:// address.
   *
   *     ADDRESS, PHONE and EMAIL ARE INTENTIONALLY EMPTY: the official postal
   *     address, telephone number and department email address have not been
   *     supplied yet, so nothing unverified is published. The page shows
   *     "[Address to be added]", "[Telephone to be added]" and
   *     "[Email to be added]" until the department fills them in.
   *       address: ["PO Box 57", "Thirunelvely", "Jaffna", "Sri Lanka"],
   *       phone: "(+94) 021 221 8100",
   *       email: "info@univ.jfn.ac.lk",
   * ------------------------------------------------------------------------*/
  contact: {
    departmentLine: "Department of Engineering Technology",
    facultyLine: "Faculty of Technology, University of Jaffna",
    // Official postal address — one line per entry. Empty until supplied.
    address: [],
    // Official department email address. Empty until supplied.
    email: "",
    // Official telephone number. Empty until supplied.
    phone: "",
    // Location map shown on the Contact page (replaces the old "Visiting the
    // department" text/photo). `mapEmbedUrl` is the src for the <iframe> — use
    // the embed/share URL from Google Maps (it must be a plain https:// URL).
    // `mapTitle` is the accessible title/description of the map. Leave
    // `mapEmbedUrl` blank and a neutral, non-linking placeholder is shown.
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.79103579514!2d80.40010347030801!3d9.323776503060026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe9737ef3f1c91%3A0xc0ea9c664291f305!2sFaculty%20of%20Technology!5e0!3m2!1sen!2slk!4v1792588317453!5m2!1sen!2slk",
    mapTitle: "Map showing the location of the Faculty of Technology, University of Jaffna",
    mapLabel: "[Verify location before adding the map]",
    social: [
      { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/university.jaffna" },
      { icon: "twitter", label: "Twitter", url: "https://www.twitter.com/uojofficial" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/school/9667892/" },
      { icon: "youtube", label: "YouTube", url: "https://www.youtube.com/channel/UCMNzGVtXq9_Y4oYOYEkd-7Q?sub_confirmation=1" }
    ]
  }
});
