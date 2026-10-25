/* specialisations.js — specialisation pages
 * What this file is for: the three specialisations (Automobile Technology,
 *   Construction Technology, Electro Technology).
 * 
 * What you can edit: the specialisation names, text and images.
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
 *   description       One or two sentences, shown on the specialisation cards
 *                     and at the top of the specialisation page.
 *   image / imageAlt  The picture on the card and its description. A bare file
 *                     name is read from assets/images/specialisations.
 *   coordinatorStaffId
 *                     The staff code of the specialisation coordinator.
 *   overview          One or two paragraphs about the specialisation. This is
 *                     what appears in the "About this specialisation" section.
 *   curriculum        One entry per curriculum year. Each entry has a year and
 *                     sections grouped by year and semester: title is the
 *                     heading, and each item in items has a name and a code. An
 *                     item may instead have options (each with a name and code)
 *                     for elective modules. When more than one entry is listed,
 *                     the page shows a year dropdown and the earliest year is
 *                     selected by default.
 *   research.summary  A short description of research and project activity.
 *   downloads         The files shown on this page and collected into the
 *                     E-Resources "Programme Documents" section: id, title,
 *                     format, size and url. Put the file in assets/documents
 *                     and give just its name here (e.g. "handbook.pdf"); leave
 *                     url blank until the file exists.
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
      "Focuses on vehicle systems, automotive diagnostics, maintenance, and emerging automotive technologies.",
    image: "Automobile-Technology.jpg",
    imageAlt: "Placeholder image for Automobile Technology",
    coordinatorStaffId: "coordinator-automobile-technology",
    overview: [
      "Automobile Technology focuses on the study of modern vehicle systems, automotive engineering principles, maintenance, diagnostics, and emerging automotive technologies. The specialisation combines theoretical knowledge with practical training to develop skilled graduates capable of meeting the evolving demands of the automotive industry.",
      "The specialisation provides students with practical experience in vehicle inspection, engine systems, automotive electrical and electronic systems, and fault diagnosis. Through laboratory activities, technical projects, and hands-on learning, students develop problem-solving skills and the technical competencies required for careers in the automotive industry and related engineering fields."
    ],
    curriculum: [
      {
        year: "2024",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "[Subject name 1]", code: "[Subject code 1]" },
            { name: "[Subject name 2]", code: "[Subject code 2]" },
            { name: "[Subject name 3]", code: "[Subject code 3]" },
            { name: "[Subject name 4]", code: "[Subject code 4]" },
            { name: "[Subject name 5]", code: "[Subject code 5]" },
            { name: "[Subject name 6]", code: "[Subject code 6]" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "[Subject name 7]", code: "[Subject code 7]" },
            { name: "[Subject name 8]", code: "[Subject code 8]" },
            { name: "[Subject name 9]", code: "[Subject code 9]" },
            { name: "[Subject name 10]", code: "[Subject code 10]" },
            { name: "[Subject name 11]", code: "[Subject code 11]" },
            { name: "[Subject name 12]", code: "[Subject code 12]" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "[Subject name 13]", code: "[Subject code 13]" },
            { name: "[Subject name 14]", code: "[Subject code 14]" },
            { name: "[Subject name 15]", code: "[Subject code 15]" },
            { name: "[Subject name 16]", code: "[Subject code 16]" },
            { name: "[Subject name 17]", code: "[Subject code 17]" },
            { name: "[Subject name 18]", code: "[Subject code 18]" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "[Subject name 19]", code: "[Subject code 19]" },
            { name: "[Subject name 20]", code: "[Subject code 20]" },
            { name: "[Subject name 21]", code: "[Subject code 21]" },
            { name: "[Subject name 22]", code: "[Subject code 22]" },
            { name: "[Subject name 23]", code: "[Subject code 23]" },
            { name: "[Subject name 24]", code: "[Subject code 24]" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "[Subject name 25]", code: "[Subject code 25]" },
            { name: "[Subject name 26]", code: "[Subject code 26]" },
            { name: "[Subject name 27]", code: "[Subject code 27]" },
            { name: "[Subject name 28]", code: "[Subject code 28]" },
            { name: "[Subject name 29]", code: "[Subject code 29]" },
            { name: "[Subject name 30]", code: "[Subject code 30]" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "[Subject name 31]", code: "[Subject code 31]" },
            { name: "[Subject name 32]", code: "[Subject code 32]" },
            { name: "[Subject name 33]", code: "[Subject code 33]" },
            { name: "[Subject name 34]", code: "[Subject code 34]" },
            { name: "[Subject name 35]", code: "[Subject code 35]" },
            { name: "[Subject name 36]", code: "[Subject code 36]" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "[Subject name 37]", code: "[Subject code 37]" },
            { name: "[Subject name 38]", code: "[Subject code 38]" },
            { name: "[Subject name 39]", code: "[Subject code 39]" },
            { name: "[Subject name 40]", code: "[Subject code 40]" },
            { name: "[Subject name 41]", code: "[Subject code 41]" },
            { name: "[Subject name 42]", code: "[Subject code 42]" }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "[Subject name 43]", code: "[Subject code 43]" },
            { name: "[Subject name 44]", code: "[Subject code 44]" },
            { name: "[Subject name 45]", code: "[Subject code 45]" },
            { name: "[Subject name 46]", code: "[Subject code 46]" },
            { name: "[Subject name 47]", code: "[Subject code 47]" },
            { name: "[Subject name 48]", code: "[Subject code 48]" }
          ] }
        ]
      },
      {
        year: "2023",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology I", code: "ETM121BC3" },
            { name: "Science for Engineering Technology I", code: "ETS121BC3" },
            { name: "Engineering Drawing and Workshop Technology I", code: "ETW121BC3" },
            { name: "Metrology", code: "ETF120BC2" },
            { name: "Fundamentals of Construction Technology", code: "ETC120BC3" },
            { name: "Foundation of Computer Systems", code: "ETS122BC2" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology II", code: "ETM122BC3" },
            { name: "Science for Engineering Technology II", code: "ETS123BC3" },
            { name: "Engineering Drawing and Workshop Technology II", code: "ETW122BC3" },
            { name: "Foundation in Electro Technology", code: "ETE120BC3" },
            { name: "Foundation in Automobile Technology", code: "ETA120BC3" },
            { name: "Engineering Materials", code: "ETS124BC3" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology III", code: "ETM223BC3" },
            { name: "Economics and Cost Analysis", code: "CST220NT3" },
            { name: "Electrical Installation Practices", code: "ETS225BC3" },
            { name: "Occupational Health and Safety", code: "EST222BC2" },
            { name: "Mechanics for Technologists ", code: "ETS226BC3" },
            { name: "Theory of Machines I", code: "ETA221TC3" },
            { name: "Automobile Engine and Components", code: "ETA222TC1" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology IV", code: "ETM224BC3" },
            { name: "Control Systems", code: "ETA223TC3" },
            { name: "Automobile Workshop Practice and Management", code: "ETA224TC2" },
            { name: "Automobile Engines", code: "ETA225TC3" },
            { name: "Computer Aided Modelling ", code: "ETA226SE2" },
            { name: "Theory of Machines II", code: "ETA227TC2" },
            { name: "Automobile Electronics", code: "ETA228TC3" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "Fundamentals of Electric Propulsion", code: "ETA329TC3" },
            { name: "Fundamentals of Vehicle Dynamics", code: "ETA330TC3" },
            { name: "Automobile Chassis Systems", code: "ETA331TC2" },
            { name: "Computing for Automobile Technology", code: "ETA332TC2" },
            { name: "Design of Automobile Components", code: "ETA333TC3" },
            { name: "Automobile Drivetrain and Braking", code: "ETA334TC2" },
            { name: "Fault Diagnosis and Maintenance", code: "ETA335TC2" },
            { name: "English for Research", code: "EST323NT2" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "Industrial Training", code: "EST324SE6" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "Research Project I", code: "EST425SE2" },
            { name: "Advanced Vehicle Controls", code: "ETA436TC2" },
            { name: "Alternative Fuels and Pollution Control", code: "ETA437TC2" },
            { name: "Automotive Interior Systems", code: "ETA438TC3" },
            { name: "Mechatronics", code: "ETA439TC2" },
            { name: "Professional Ethics and Human Value", code: "CST421NT2" },
            { name: "Industrial Operations Management", code: "CST422NT2" },
            { name: "Elective Module I:", options: [
              { name: "Advanced Engineering Materials", code: "ETA440TE2" },
              { name: "Aerodynamics for Automobile Technology", code: "ETA441TE2" }
            ] }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "Research Project II", code: "EST426SE6" },
            { name: "Capstone Project", code: "EST427SE3" },
            { name: "Advance Electric Propulsion Systems", code: "ETA442TC2" },
            { name: "Entrepreneurship", code: "CST423NT2" },
            { name: "Elective Module I:", options: [
              { name: "Heavy Vehicle Technology", code: "ETA443TE2" },
              { name: "High Performance Vehicle Technology", code: "ETA444TE2" }
            ] }
          ] }
        ]
      }
    ],
    research: {
      summary:
        "Research and project activity in Automobile Technology focuses on vehicle systems, automotive electronics, fault diagnosis, sustainable mobility, and emerging automotive technologies."
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Put the file in assets/documents and give
    // just its name here; leave `url` blank until the file exists.
    downloads: [
      {
        id: "automobile-technology-doc-01",
        title: "Automobile Technology — Programme document 2020",
        format: "PDF",
        size: "",
        url: "Auto-Tech-2020-batch.pdf"
      }
    ]
  },
  {
    id: "construction-technology",
    name: "Construction Technology",
    pageUrl: "pages/construction-technology.html",
    description:
      "Focuses on construction methods, structural systems, building materials, and modern construction practices.",
    image: "Construction-Technology.jpg",
    imageAlt: "Placeholder image for Construction Technology",
    coordinatorStaffId: "coordinator-construction-technology",
    overview: [
      "Construction Technology focuses on modern construction methods, building materials, structural systems, and construction management. The specialisation combines theoretical knowledge with practical training to develop graduates with the technical skills required for the construction industry.",
      "Students gain knowledge of construction practices, surveying, material testing, building technology, and project planning. Through laboratory activities, practical work, and technical projects, they develop problem-solving skills and competencies for careers in construction, infrastructure development, and related engineering fields."
    ],
    curriculum: [
      {
        year: "2024",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "[Subject name 1]", code: "[Subject code 1]" },
            { name: "[Subject name 2]", code: "[Subject code 2]" },
            { name: "[Subject name 3]", code: "[Subject code 3]" },
            { name: "[Subject name 4]", code: "[Subject code 4]" },
            { name: "[Subject name 5]", code: "[Subject code 5]" },
            { name: "[Subject name 6]", code: "[Subject code 6]" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "[Subject name 7]", code: "[Subject code 7]" },
            { name: "[Subject name 8]", code: "[Subject code 8]" },
            { name: "[Subject name 9]", code: "[Subject code 9]" },
            { name: "[Subject name 10]", code: "[Subject code 10]" },
            { name: "[Subject name 11]", code: "[Subject code 11]" },
            { name: "[Subject name 12]", code: "[Subject code 12]" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "[Subject name 13]", code: "[Subject code 13]" },
            { name: "[Subject name 14]", code: "[Subject code 14]" },
            { name: "[Subject name 15]", code: "[Subject code 15]" },
            { name: "[Subject name 16]", code: "[Subject code 16]" },
            { name: "[Subject name 17]", code: "[Subject code 17]" },
            { name: "[Subject name 18]", code: "[Subject code 18]" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "[Subject name 19]", code: "[Subject code 19]" },
            { name: "[Subject name 20]", code: "[Subject code 20]" },
            { name: "[Subject name 21]", code: "[Subject code 21]" },
            { name: "[Subject name 22]", code: "[Subject code 22]" },
            { name: "[Subject name 23]", code: "[Subject code 23]" },
            { name: "[Subject name 24]", code: "[Subject code 24]" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "[Subject name 25]", code: "[Subject code 25]" },
            { name: "[Subject name 26]", code: "[Subject code 26]" },
            { name: "[Subject name 27]", code: "[Subject code 27]" },
            { name: "[Subject name 28]", code: "[Subject code 28]" },
            { name: "[Subject name 29]", code: "[Subject code 29]" },
            { name: "[Subject name 30]", code: "[Subject code 30]" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "[Subject name 31]", code: "[Subject code 31]" },
            { name: "[Subject name 32]", code: "[Subject code 32]" },
            { name: "[Subject name 33]", code: "[Subject code 33]" },
            { name: "[Subject name 34]", code: "[Subject code 34]" },
            { name: "[Subject name 35]", code: "[Subject code 35]" },
            { name: "[Subject name 36]", code: "[Subject code 36]" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "[Subject name 37]", code: "[Subject code 37]" },
            { name: "[Subject name 38]", code: "[Subject code 38]" },
            { name: "[Subject name 39]", code: "[Subject code 39]" },
            { name: "[Subject name 40]", code: "[Subject code 40]" },
            { name: "[Subject name 41]", code: "[Subject code 41]" },
            { name: "[Subject name 42]", code: "[Subject code 42]" }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "[Subject name 43]", code: "[Subject code 43]" },
            { name: "[Subject name 44]", code: "[Subject code 44]" },
            { name: "[Subject name 45]", code: "[Subject code 45]" },
            { name: "[Subject name 46]", code: "[Subject code 46]" },
            { name: "[Subject name 47]", code: "[Subject code 47]" },
            { name: "[Subject name 48]", code: "[Subject code 48]" }
          ] }
        ]
      },
      {
        year: "2023",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology I", code: "ETM121BC3" },
            { name: "Science for Engineering Technology I", code: "ETS121BC3" },
            { name: "Engineering Drawing and Workshop Technology I", code: "ETW121BC3" },
            { name: "Metrology", code: "ETF120BC2" },
            { name: "Fundamentals of Construction Technology", code: "ETC120BC3" },
            { name: "Foundation of Computer Systems", code: "ETS122BC2" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology II", code: "ETM122BC3" },
            { name: "Science for Engineering Technology II", code: "ETS123BC3" },
            { name: "Engineering Drawing and Workshop Technology II", code: "ETW122BC3" },
            { name: "Foundation in Electro Technology", code: "ETE120BC3" },
            { name: "Foundation in Automobile Technology", code: "ETA120BC3" },
            { name: "Engineering Materials", code: "ETS124BC3" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology III", code: "ETM223BC3" },
            { name: "Economics and Cost Analysis", code: "CST220NT3" },
            { name: "Electrical Installation Practices", code: "ETS225BC3" },
            { name: "Occupational Health and Safety", code: "EST222BC2" },
            { name: "Fluid Mechanics and Flow Systems", code: "ETC221TC3" },
            { name: "Mechanics for Technologists", code: "ETS226BC3" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology IV", code: "ETM224BC3" },
            { name: "Structural Analysis for Construction Technology", code: "ETC222TC3" },
            { name: "Construction Contract and Cost Estimation", code: "ETC223TC3" },
            { name: "Soil Mechanics", code: "ETC224TC3" },
            { name: "Fundamentals of Building Information Modelling", code: "ETC225TC2" },
            { name: "Concrete Technology and Testing", code: "ETC226TC3" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "Design of Steel and Timber Structures", code: "ETC327TC3" },
            { name: "Surveying", code: "ETC328TC3" },
            { name: "Construction Management and Planning", code: "ETC329TC3" },
            { name: "Geotechnology", code: "ETC330TC3" },
            { name: "Sustainable Building Technology", code: "ETC331TC2" },
            { name: "Fieldwork in Construction Technology", code: "ETC332TC2" },
            { name: "English for Research", code: "EST323NT2" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "Industrial Training", code: "EST324SE6" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "Research Project I", code: "EST425SE2" },
            { name: "Design of Concrete Structures", code: "ETC433TC3" },
            { name: "Water and Wastewater Treatment", code: "ETC434TC3" },
            { name: "Highway Infrastructure Systems", code: "ETC435TC3" },
            { name: "Geotechnical Instrumentation", code: "ETC436TC3" },
            { name: "Professional Ethics and Human Value", code: "CST421NT2" },
            { name: "Elective Module I:", options: [
              { name: "Tall Building and Bridge Technology", code: "ETC437TE3" },
              { name: "Hydraulic and Irrigation Structures", code: "ETC438TE3" },
              { name: "Geology for Technologists", code: "ETC439TE3" }
            ] }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "Research Project II", code: "EST426SE6" },
            { name: "Capstone Project", code: "EST427SE3" },
            { name: "Building Services", code: "ETC440TC2" },
            { name: "Entrepreneurship", code: "CST423NT2" },
            { name: "Elective Module II:", options: [
              { name: "Sustainable Concrete Production", code: "ETC441TE3" },
              { name: "Construction Biotechnology", code: "ETC442TE3" }
            ] }
          ] }
        ]
      }
    ],
    research: {
      summary:
        "Research and project activity in Construction Technology focuses on sustainable building materials, structural systems, construction management, resilient infrastructure, and practical challenges in the built environment."
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Put the file in assets/documents and give
    // just its name here; leave `url` blank until the file exists.
    downloads: [
      {
        id: "construction-technology-doc-01",
        title: "Construction Technology — Programme document 2020",
        format: "PDF",
        size: "",
        url: "Cons-Tech-2020-batch.pdf"
      }
    ]
  },
  {
    id: "electro-technology",
    name: "Electro Technology",
    pageUrl: "pages/electro-technology.html",
    description:
      "Focuses on electrical systems, electronics, power technology, industrial automation, and control systems.",
    image: "electro-technology.jpg",
    imageAlt: "Placeholder image for Electro Technology",
    coordinatorStaffId: "coordinator-electro-technology",
    overview: [
      "Electro Technology focuses on electrical systems, electronics, electrical power, industrial automation, and control technologies. The specialisation combines theoretical principles with practical learning to prepare graduates for the evolving demands of electrical and technology-related industries.",
      "Students develop practical skills in electrical installations, circuit analysis, electrical machines, power systems, and automation. Through laboratory experiments, technical projects, and hands-on training, they build the competencies needed for careers in electrical engineering technology, industrial maintenance, automation, and related fields."
    ],
    curriculum: [
      {
        year: "2024",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "[Subject name 1]", code: "[Subject code 1]" },
            { name: "[Subject name 2]", code: "[Subject code 2]" },
            { name: "[Subject name 3]", code: "[Subject code 3]" },
            { name: "[Subject name 4]", code: "[Subject code 4]" },
            { name: "[Subject name 5]", code: "[Subject code 5]" },
            { name: "[Subject name 6]", code: "[Subject code 6]" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "[Subject name 7]", code: "[Subject code 7]" },
            { name: "[Subject name 8]", code: "[Subject code 8]" },
            { name: "[Subject name 9]", code: "[Subject code 9]" },
            { name: "[Subject name 10]", code: "[Subject code 10]" },
            { name: "[Subject name 11]", code: "[Subject code 11]" },
            { name: "[Subject name 12]", code: "[Subject code 12]" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "[Subject name 13]", code: "[Subject code 13]" },
            { name: "[Subject name 14]", code: "[Subject code 14]" },
            { name: "[Subject name 15]", code: "[Subject code 15]" },
            { name: "[Subject name 16]", code: "[Subject code 16]" },
            { name: "[Subject name 17]", code: "[Subject code 17]" },
            { name: "[Subject name 18]", code: "[Subject code 18]" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "[Subject name 19]", code: "[Subject code 19]" },
            { name: "[Subject name 20]", code: "[Subject code 20]" },
            { name: "[Subject name 21]", code: "[Subject code 21]" },
            { name: "[Subject name 22]", code: "[Subject code 22]" },
            { name: "[Subject name 23]", code: "[Subject code 23]" },
            { name: "[Subject name 24]", code: "[Subject code 24]" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "[Subject name 25]", code: "[Subject code 25]" },
            { name: "[Subject name 26]", code: "[Subject code 26]" },
            { name: "[Subject name 27]", code: "[Subject code 27]" },
            { name: "[Subject name 28]", code: "[Subject code 28]" },
            { name: "[Subject name 29]", code: "[Subject code 29]" },
            { name: "[Subject name 30]", code: "[Subject code 30]" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "[Subject name 31]", code: "[Subject code 31]" },
            { name: "[Subject name 32]", code: "[Subject code 32]" },
            { name: "[Subject name 33]", code: "[Subject code 33]" },
            { name: "[Subject name 34]", code: "[Subject code 34]" },
            { name: "[Subject name 35]", code: "[Subject code 35]" },
            { name: "[Subject name 36]", code: "[Subject code 36]" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "[Subject name 37]", code: "[Subject code 37]" },
            { name: "[Subject name 38]", code: "[Subject code 38]" },
            { name: "[Subject name 39]", code: "[Subject code 39]" },
            { name: "[Subject name 40]", code: "[Subject code 40]" },
            { name: "[Subject name 41]", code: "[Subject code 41]" },
            { name: "[Subject name 42]", code: "[Subject code 42]" }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "[Subject name 43]", code: "[Subject code 43]" },
            { name: "[Subject name 44]", code: "[Subject code 44]" },
            { name: "[Subject name 45]", code: "[Subject code 45]" },
            { name: "[Subject name 46]", code: "[Subject code 46]" },
            { name: "[Subject name 47]", code: "[Subject code 47]" },
            { name: "[Subject name 48]", code: "[Subject code 48]" }
          ] }
        ]
      },
      {
        year: "2023",
        sections: [
          { title: "Year 01 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology I", code: "ETM121BC3" },
            { name: "Science for Engineering Technology I", code: "ETS121BC3" },
            { name: "Engineering Drawing and Workshop Technology I", code: "ETW121BC3" },
            { name: "Metrology", code: "ETF120BC2" },
            { name: "Fundamentals of Construction Technology", code: "ETC120BC3" },
            { name: "Foundation of Computer Systems", code: "ETS122BC2" }
          ] },
          { title: "Year 01 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology II", code: "ETM122BC3" },
            { name: "Science for Engineering Technology II", code: "ETS123BC3" },
            { name: "Engineering Drawing and Workshop Technology II", code: "ETW122BC3" },
            { name: "Foundation in Electro Technology", code: "ETE120BC3" },
            { name: "Foundation in Automobile Technology", code: "ETA120BC3" },
            { name: "Engineering Materials", code: "ETS124BC3" }
          ] },
          { title: "Year 02 / Semester 01", items: [
            { name: "Mathematics for Engineering Technology III", code: "ETM223BC3" },
            { name: "Economics and Cost Analysis", code: "CST220NT3" },
            { name: "Electrical Installation Practices", code: "ETS225BC3" },
            { name: "Occupational Health and Safety", code: "EST222BC2" },
            { name: "Electrical Power Generation", code: "ETE221TC3" },
            { name: "Mechanics for Technologists", code: "ETS226BC3" }
          ] },
          { title: "Year 02 / Semester 02", items: [
            { name: "Mathematics for Engineering Technology IV", code: "ETM224BC3" },
            { name: "Electrical Machine I", code: "ETE222TC3" },
            { name: "Renewable Power Generation Technology", code: "ETE223TC3" },
            { name: "Control System Engineering", code: "ETE224TC3" },
            { name: "Electronics for Technologists", code: "ETE225TC3" },
            { name: "Computer Programming using C++", code: "ETE226TC3" }
          ] },
          { title: "Year 03 / Semester 01", items: [
            { name: "Electrical Transmission and Distribution System", code: "ETE327TC3" },
            { name: "Electrical Machine II", code: "ETE328TC3" },
            { name: "Transducer Technology", code: "ETE329TC3" },
            { name: "Power Electronics and Applications", code: "ETE330TC3" },
            { name: "Embedded Systems", code: "ETE331TC3" },
            { name: "English for Research", code: "EST323NT2" }
          ] },
          { title: "Year 03 / Semester 02", items: [
            { name: "Industrial Training", code: "EST324SE6" }
          ] },
          { title: "Year 04 / Semester 01", items: [
            { name: "Research Project I", code: "EST425SE2" },
            { name: "Electrical Drives and Control", code: "ETE432TC3" },
            { name: "Communication Systems", code: "ETE433TC3" },
            { name: "Industrial Automation Technology", code: "ETE434TC3" },
            { name: "Professional Ethics and Human Value", code: "CST421NT2" },
            { name: "Industrial Operations Management", code: "CST422NT2" },
            { name: "Elective Modules I:", options: [
              { name: "Fiber Optic Communication", code: "ETE435TE3" },
              { name: "Robotic Technology and Applications", code: "ETE436TE3" },
              { name: "Power System Control and Operation", code: "ETE437TE3" },
              { name: "Signals Processing Technology", code: "ETE438TE3" }
            ] }
          ] },
          { title: "Year 04 / Semester 02", items: [
            { name: "Research Project II", code: "EST426SE6" },
            { name: "Capstone Project", code: "EST427SE3" },
            { name: "Robotics", code: "ETE439TC3" },
            { name: "Entrepreneurship", code: "CST423NT2" },
            { name: "Elective Modules II:", options: [
              { name: "High Voltage Technology", code: "ETE440TE3" },
              { name: "Machine Learning", code: "ETE441TE3" },
              { name: "Distributed Generation and Smart Grid Technologies", code: "ETE442TE3" },
              { name: "Biomedical Instrumentation", code: "ETE443TE3" }
            ] }
          ] }
        ]
      }
    ],
    research: {
      summary:
        "Research and project activity in Electro Technology focuses on electrical power, electronics, industrial automation, control systems, renewable energy, and reliable electrical technologies."
    },
    // Related downloads: shown on this page and collected into the E-Resources
    // "Programme Documents" section. Put the file in assets/documents and give
    // just its name here; leave `url` blank until the file exists.
    downloads: [
      {
        id: "electro-technology-doc-01",
        title: "Electro Technology — Programme document 2020",
        format: "PDF",
        size: "",
        url: "Electro-Tech-2020-batch.pdf"
      }
    ]
  }
];
