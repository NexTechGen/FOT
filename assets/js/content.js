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
 *   dean.name / .title / .photo / .photoAlt / .message
 *       The Dean's message on the About page. Use the approved text only.
 *   department.heading / .intro / .image / .imageAlt / .focus
 *       The department introduction on the home page.
 *   hod.title / .message
 *       The Head of Department message on the About page.
 *   about.organisation.heading / .intro / .image / .imageAlt
 *       The "Academic organisation" block on the About page.
 *   about.vision / .mission / .history
 *       The approved vision statement, mission statement and history.
 *   facilities[] — id / name / description / image / imageAlt /
 *   specialisationIds
 *       One laboratory or facility: a unique code, its name, a one or two
 *       sentence description, a picture, the picture description and the
 *       specialisation codes that use it.
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

  // 3. Message from the Dean (About page) — keep it separate from the Head of
  //    Department message below.
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

  // 4. Department introduction (home page section 3)
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
      intro: [
        "[Describe how the department is organised academically, for example " +
        "its specialisations and teaching units.]"
      ],
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


  // 9. Laboratories and facilities (home page section 6 and facilities page)
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

  // 12. Contact details (Contact page and the footer "Contact us" column).
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
