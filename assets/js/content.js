/* content.js — main website text (editable by the department)
 * What this file is for: it holds the words used across the site — the
 *   university, faculty and department names, the home page sections, the
 *   Dean's and Head of Department messages, the About Us text, the
 *   laboratories and facilities, and the contact details.
 * 
 * How to edit: replace the text between the quotes. Keep the key names
 *   exactly as they are, because the pages look every value up by key.
 * 
 * Fields and what you can put in them:
 *   institution.university / .faculty / .department
 *       The three names shown in the header and footer of every page.
 *   faculty.label / .heading / .intro / .image / .imageAlt
 *       The Faculty of Technology block on the home page: a short label, the
 *       heading, one or two paragraphs, a picture and its description.
 *   dean.name / .title / .qualifications / .email / .photo / .photoAlt /
 *   .message
 *       The Dean's message on the About page, with the name, title,
 *       qualifications and email shown beneath it. Use the approved text only.
 *   department.heading / .intro / .image / .imageAlt / .focus
 *       The department introduction on the home page.
 *   hod.title / .message
 *       The Head of Department message on the About page.
 *   about.organisation.heading / .intro / .image / .imageAlt
 *       The "Academic organisation" block on the About page.
 *   about.vision / .mission / .history / .historyMilestones
 *       The approved vision statement, mission statement and history. The
 *       history is a list of paragraphs; historyMilestones is an optional list
 *       of { year, text } entries shown beside it as a timeline.
 *   facilities[] — id / name / description / image / imageAlt /
 *   specialisationIds
 *       One laboratory or facility: a unique code, its name, a one or two
 *       sentence description, a picture, the picture description and the
 *       specialisation codes that use it. A bare image file name is read from
 *       assets/images/facilities.
 *   academicOverview[] — title / description / icon / url
 *       One academic overview tile on the home page: its title, a short
 *       description, an optional icon name and the page it links to.
 *   contact.address / .email / .phone / .mapEmbedUrl / .social
 *       The Contact page and the footer "Contact us" column: the address
 *       lines, the email, the phone, a Google Maps embed address, and the
 *       social links ("facebook", "twitter", "linkedin" or "youtube" with a
 *       full https:// address). Clear any value (empty string) and that line
 *       falls back to a "[... to be added]" placeholder, so nothing
 *       unverified is published.
 * 
 * Other files: specialisations.js, research.js, news.js, downloads.js, staff.js.
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_CONTENT = Object.assign(window.DEPARTMENT_CONTENT || {}, {

  // 1. Institution identity (header/footer and page rendering)
  institution: {
    university: "University of Jaffna",
    faculty: "Faculty of Technology",
    department: "Department of Engineering Technology"
  },

  // 2. Faculty of Technology introduction (home page section 1)
  faculty: {
    label: "University of Jaffna",
    heading: "Faculty of Technology",
    intro: ["The Faculty of Technology, University of Jaffna, established in 2016, provides quality higher education in diverse technological disciplines. Through its departments, the faculty promotes practical learning, research, and innovation to develop skilled graduates who contribute to Sri Lanka’s technological and industrial development.","The faculty is dedicated to academic excellence, professional development, and technological advancement through quality education and practical experience."],
    image: "FOT-image-02.png",
    imageAlt: "Placeholder image representing the Faculty of Technology campus"
  },

  // 3. Message from the Dean (About page) — keep it separate from the Head of
  //    Department message below.
  dean: {
    name: "Dr T. Ketheesan",
    title: "Dean, Faculty of Technology",
    qualifications: "Ph.D. in Computer Vision (DCU, Ire), B.Sc. Special in Computer Science (Hons) (UoJ)",
    email: "deantech@univ.jfn.ac.lk",
    photo: "Dr-T-etheesan.jpg",
    photoAlt: "Placeholder portrait of the Dean, Faculty of Technology",
    message: ["It is my great pleasure to welcome you to the Department of Engineering Technology, Faculty of Technology, University of Jaffna. Our department offers a four-year Bachelor of Engineering Technology Honours degree programme with specialisations in Automobile, Construction, and Electro Technology. With dedicated academic staff, practical learning, and a commitment to excellence, we aim to produce skilled, innovative, and responsible engineering technologists who contribute to industrial development and the technological advancement of Sri Lanka."]
  },

  // 4. Department introduction (home page section 3)
  department: {
    heading: "Welcome to the Department of Engineering Technology",
    intro: [
      "Engineering technology applies science and engineering principles to " +
      "real-world challenges. The Department of Engineering Technology aims to " +
      "develop engineering technologists who contribute to national development " +
      "by sharing technical knowledge and applying it to practical problems."
    ],
    image: "FOT-image.png",
    imageAlt: "Faculty of Technology",
    focus:
      "Through academic study, practical learning, and research, the department " +
      "prepares graduates to contribute to industrial advancement and national " +
      "development."
  },

  // 5. Message from the Head of Department (About page). The name and photo
  //    come from staff.js; only the message text lives here.
  hod: {
    title: "Head, Department of Engineering Technology",
    message: [
      "[Insert the approved message from the Head of the Department of " +
      "Engineering Technology here. This is separate from the Dean's message " +
      "and must be written and approved by the Head of Department.]"
    ]
  },

  // 5b. About page text (About page). The specialisation links and the staff
  //    are filled in automatically from the other files.
  about: {
    organisation: {
      heading: "Academic organisation",
      intro: ["The Department of Engineering Technology is academically organised into three specialisations: Automobile Technology, Construction Technology, and Electro Technology. The four-year Bachelor of Engineering Technology Honours degree programme combines common foundational studies during the first three semesters with specialised courses from the fourth semester onwards, providing students with theoretical knowledge, practical experience, and technical skills relevant to their chosen field."],
      image: "FOT-image-02.png",
      imageAlt: "Faculty of Technology"
    },
    vision:
      "To be a leading centre of fostering and promoting technological studies and research.",
    mission:"To produce knowledgeable and skillful technocrats who excel in innovative application of technological skills and expertise for the progress of technology in the country.",
    history: [
      "The Faculty of Technology, University of Jaffna, was established in " +
      "2016 as the 10th faculty of the university, created to accommodate " +
      "students of the newly introduced G.C.E. Advanced Level Technology " +
      "stream. Sri Lanka needed technology professionals who could keep pace " +
      "with global trends and changing industrial knowledge, so the university " +
      "took the initiative to open undergraduate and postgraduate pathways for " +
      "the technology stream, filling a long-standing gap in the national " +
      "education system.",
      "The faculty is located in Ariviyal Nagar (“city of knowledge”), " +
      "Kilinochchi, alongside the Faculty of Engineering and the Faculty of " +
      "Agriculture. It admitted its first batch in 2016 and was preparing to " +
      "admit its fifth batch in 2021.",
      "Engineering Technology is one of its two Honours degree programmes, " +
      "covering Construction, Electro and Automobile disciplines in line with " +
      "international standards. Information and Communication Technology was " +
      "planned to be added from the 2021/2022 academic year.",
      "A 30-acre building complex with advanced laboratory facilities was " +
      "nearing completion and due to open within months. With support from the " +
      "Vice-Chancellor, the faculty aims to produce academically sound, skilled " +
      "graduates and to become a centre of excellence in teaching, research " +
      "and development."
    ],
    historyMilestones: [
      {
        year: "2016",
        text: "Established as the 10th faculty of the University of Jaffna and admitted its first batch of students."
      },
      {
        year: "2021",
        text: "Preparing to admit its fifth batch of students."
      },
      {
        year: "2021/2022",
        text: "Information and Communication Technology planned to be introduced as a second Honours degree programme."
      }
    ]
  },

  // 9. Laboratories and facilities (home page section 6 and facilities page) 
  facilities: [
    {
      id: "lab-01",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["automobile-technology"]
    },
    {
      id: "lab-02",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["automobile-technology"]
    },
    {
      id: "lab-03",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["automobile-technology"]
    },
    {
      id: "lab-04",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["electro-technology"]
    },
    {
      id: "lab-05",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["electro-technology"]
    },
    {
      id: "lab-06",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["electro-technology"]
    },
    {
      id: "lab-07",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["construction-technology"]
    },
    {
      id: "lab-08",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["construction-technology"]
    },
    {
      id: "lab-09",
      name: "Engineering Workshop",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Engineering Workshop",
      specialisationIds: ["construction-technology"]
    },
    {
      id: "lab-10",
      name: "Automobile Electronics and Mechatronics Laboratory",
      description: "[Concise description of this laboratory or facility.]",
      image: "placeholders/placeholder.svg",
      imageAlt: "Placeholder image for the Automobile Electronics and Mechatronics Laboratory",
      specialisationIds: ["construction-technology"]
    }
  ],

  // 10. Academic overview tiles (home page section 5). Each tile has a title,
  // a description, an optional icon and a link. Icon names:
  // "graduation-cap", "book-open", "layers", "list-checks", "folder-open",
  // "file-text", "award", "users", "download".
  academicOverview: [
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
  ],

  // 11. Contact details (Contact page and the footer "Contact us" column).
  contact: {
    address: ["Ariviyal Nagar", "Kilinochchi", "Sri Lanka"],
    email: "tech@univ.jfn.ac.lk",
    phone: "(+94) 21-313-5880",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.79103579514!2d80.40010347030801!3d9.323776503060026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe9737ef3f1c91%3A0xc0ea9c664291f305!2sFaculty%20of%20Technology!5e0!3m2!1sen!2slk!4v1792588317453!5m2!1sen!2slk",
    social: [
      { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/university.jaffna" },
      { icon: "twitter", label: "Twitter", url: "https://www.twitter.com/uojofficial" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/school/9667892/" },
      { icon: "youtube", label: "YouTube", url: "https://www.youtube.com/channel/UCMNzGVtXq9_Y4oYOYEkd-7Q?sub_confirmation=1" }
    ]
  }
});
