/* staff.js — all staff details
 * What this file is for: the people of the department. This one list feeds the
 *   Staff Directory page and the staff cards on each specialisation page,
 *   so a person is edited once here and appears everywhere.
 * 
 * What you can edit: the staff group headings, and every person's details
 *   below. Keep exactly ONE person marked as Head of Department.
 * 
 * The group headings (categories) — the headings in the directory and the
 *   order they appear in. A group with no members is hidden.
 * 
 *   id     The group's own code, used by each person's "category" field:
 *          "head", "academic", "technical" or "admin".
 *   label  The heading shown to readers, e.g. "Academic Staff".
 * 
 * The people (members) — add one object for each new person:
 *   id                 Their own code (unique, do not reuse), e.g.
 *                      "head-of-department",
 *                      "coordinator-automobile-technology", "academic-staff-01".
 *   name               Full name as it should be shown.
 *   designation        Their job title or designation.
 *   category           Which group they belong to: "head", "academic",
 *                      "technical" or "admin".
 *   qualifications     Degrees, qualifications and professional memberships.
 *   photo              The photo file name (assets/images/staff is added
 *                      automatically), or "" for none.
 *   specialisationIds  The specialisation codes they teach or work in, from
 *                      specialisations.js.
  *   email              Their official email address, or "".
  *   phone              Their phone number, or "".
  *   isHeadOfDepartment "true" for the Head of Department only, "false" for
  *                      everyone else.
  *   onStudyLeave       true if the staff member is on study leave, false otherwise.
  * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_STAFF = {

  // Designation order for Academic Staff (key = exact designation value)
  // Lower number appears first. Add/edit values here to control order.
  designationOrder: {
    "Senior Lecturer Gr II": 0,
    "Senior Lecturer Gr I": 1,
    "Lecturer": 2,
    " Lecturer (Probationary)": 3
  },

  // Staff group headings and their order. A group with no members is hidden.
  categories: [
    { id: "head",                label: "Head of Department" },
    { id: "coordinator",         label: "Specialisation Coordinators" },
    { id: "academic",            label: "Academic Staff" },
    { id: "technical",           label: "Technical Staff" },
    { id: "admin",               label: "Administrative & Support Staff" }
  ],

  members: [
    // HOD Details - make sure the ID:head-of-department
    {
      id: "head-of-department",
      name: "Dr (Ms.) T H K Nawarathna",
      designation: "Head of Department",
      category: "head",
      qualifications: "Ph.D. (Hokkaido, Japan), M.Eng & B.Sc. Eng. (Hons) (Moratuwa, SL)",
      photo: "Eng-DrHiranya.jpg",
      specialisationIds: ["construction-technology"],
      email: "hiranya@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: true,
      onStudyLeave: false
    },

    // Specialisation coordinator sections
    {
      id: "coordinator-automobile-technology",
      name: "Eng. J. Joy Mathavan",
      designation: "Senior Lecturer Gr II",
      category: "coordinator",
      qualifications: "M.Sc. (Mech. Eng. - USM, Malaysia), B. Tech (Mech. Eng. - MNIT, Jaipur, India)",
      photo: "Eng-J-Joy-Mathavan.jpg",
      specialisationIds: ["automobile-technology"],
      email: "joy@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "coordinator-construction-technology",
      name: "Dr (Ms.) T H K Nawarathna",
      designation: "Senior Lecturer Gr II",
      category: "coordinator",
      qualifications: "Ph.D. (Hokkaido, Japan), M.Eng & B.Sc. Eng. (Hons) (Moratuwa, SL)",
      photo: "Eng-DrHiranya.jpg",
      specialisationIds: ["construction-technology"],
      email: "hiranya@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "coordinator-electro-technology",
      name: "Dr. (Eng) Akila Eranda Jayasinghe",
      designation: "Senior Lecturer Gr II",
      category: "coordinator",
      qualifications: "Ph.D (RMIT), B.Sc. Eng. (Hons) (Jaffna, SL)",
      photo: "Akila-Eranda-Jayasinghe.png",
      specialisationIds: ["electro-technology"],
      email: "jakila@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },

    // Academic Staff section - Automobile Technology
    {
      id: "academic-staff-01",
      name: "Eng. S. Seralathan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "B.Sc. in Engineering, (Peradeniya, SL), M.Sc. (Reading) (Moratuwa, SL)",
      photo: "seralathan.jpg",
      specialisationIds: ["automobile-technology"],
      email: "seralathan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-02",
      name: "Eng. T. Sam Niroshan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "B.Sc. Eng. (Hons) (Moratuwa, SL), M.Eng. (Reading) (Moratuwa, SL)",
      photo: "ET-EngSam.jpg",
      specialisationIds: ["automobile-technology"],
      email: "samt@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-03",
      name: "Mr V. Yasitha Madusanka",
      designation: "Lecturer",
      category: "academic",
      qualifications: "BET (Hons) in Automobile Tech. (Jaffna, SL)",
      photo: "yasitha1.jpg",
      specialisationIds: ["automobile-technology"],
      email: "yasitha@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-04",
      name: "Mr G. Daisan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "B.E in Aeronautical. Eng. (Anna, IN) M.Sc. in Aerospace. Eng. (WUT, PL) PPL (A) (Flying Academy, AT & CZ) Reading",
      photo: "daisan.jpg",
      specialisationIds: ["automobile-technology"],
      email: "daisan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-05",
      name: "Mr Sangeeth Khan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "BET (Hons) in Automobile Technology",
      photo: "khan1.jpg",
      specialisationIds: ["automobile-technology"],
      email: "khan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-06",
      name: "Mr. N. Rishiheshan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "BET (Hons) in Automobile Technology(USJ), Dip in English(USJ), ETecIE (SL)",
      photo: "Rishi.jpg",
      specialisationIds: ["automobile-technology"],
      email: "rishiheshan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },

    // Academic Staff section - Construction Technology
    {
      id: "academic-staff-07",
      name: "Dr (Eng). M. Nithurshan",
      designation: "Senior Lecturer Gr II",
      category: "academic",
      qualifications: "M.Sc. Eng. in GeoTech. Eng. (Peradeniya, SL), B.Sc. Eng. (Hons). (Peradeniya, SL)",
      photo: "ET-EngNithu.jpg",
      specialisationIds: ["construction-technology"],
      email: "mnithurshan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-08",
      name: "Dr. (Eng). K. Jeyamohan",
      designation: "Senior Lecturer Gr II",
      category: "academic",
      qualifications: "PhD (QUT), M.Sc. in Structural Eng. (Peradeniya, SL), B.Sc. (Hons) in Civil Eng. (Peradeniya, SL)",
      photo: "Dr-Jeyamohan.jpeg",
      specialisationIds: ["construction-technology"],
      email: "jeya@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-09",
      name: "Eng R. Athavan",
      designation: "Lecturers",
      category: "academic",
      qualifications: "B.E in Civil Engineering (GTU, IN), M.Sc. in Environmental and Water Eng. (Reading) (Peradeniya, SL)",
      photo: "Eng-Athavan.jpg",
      specialisationIds: ["construction-technology"],
      email: "rathavan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-10",
      name: "Eng. B. Banujan",
      designation: "Lecturers",
      category: "academic",
      qualifications: "M.Sc.E. (New Brunswick, CA), DUT (New Brunswick, CA), B.Sc. Eng. (Hons) (Moratuwa, SL)",
      photo: "Eng-B-Banujan.jpeg",
      specialisationIds: ["construction-technology"],
      email: "banujan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-11",
      name: "Eng. Ms. S. Thawsika",
      designation: "Lecturers",
      category: "academic",
      qualifications: "BSc.Eng (Hons) in Civil. (UOM, SL)",
      photo: "thawsika.jpg",
      specialisationIds: ["construction-technology"],
      email: "thawsika@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-12",
      name: "Eng. Ms S. Venuja",
      designation: "Lecturers",
      category: "academic",
      qualifications: "Ph.D. (Reading, University of Peradeniya), B.Sc. (Hons) in Civil Engineering (University of Peradeniya, Sri Lanka)",
      photo: "venuja.jpg",
      specialisationIds: ["construction-technology"],
      email: "venuja@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },

    // Academic Staff section - Electro-Technology
    {
      id: "academic-staff-13",
      name: "Eng. A. Kunaraj",
      designation: "Senior Lecturer Gr II",
      category: "academic",
      qualifications: "M.Sc (Electrical &Electronics Eng)(National University of Malaysia), PG Dip (Industrial Automation) (Moratuwa, SL), B.Tech (Electronics & Instrumentation Eng)(SRM University, IN) SL)",
      photo: "Eng-Kunaraj.jpg",
      specialisationIds: ["electro-technology"],
      email: "kunaraj@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-14",
      name: "Mr T. Sajarupan",
      designation: "Lecturer",
      category: "academic",
      qualifications: "BET (Hons) in Engineering Technology (Ruhuna, SL), MPhil. in Industrial Technology (Reading) (Sri Jayewardenepura, SL)",
      photo: "sajarupan.jpg",
      specialisationIds: ["electro-technology"],
      email: "sajarupan@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "academic-staff-15",
      name: "Ms K. Saikrisha",
      designation: "Lecturer",
      category: "academic",
      qualifications: "B.E (IN) PG Dip. in Electronics and Automation (Moratuwa, SL)",
      photo: "K-Saikrisha.jpeg",
      specialisationIds: ["electro-technology"],
      email: "saikrisha@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-16",
      name: "Mr G. Alfered Canistus",
      designation: "Lecturer",
      category: "academic",
      qualifications: "BET (Hons) in Electro Technology (Jaffna, SL)",
      photo: "Canistus-G.jpg",
      specialisationIds: ["electro-technology"],
      email: "canistus@tech.jfn.ac.lk",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: true
    },
    {
      id: "academic-staff-17",
      name: "Rajkumar Thilaksani",
      designation: "Lecturer (Probationary)",
      category: "academic",
      qualifications: "B.E.T (Hons) UOJ, M.Sc. (Reading) (UOP)",
      photo: "Thilaksani-R.png",
      specialisationIds: ["electro-technology"],
      email: "thilaksani@tech.jfn.ac.lk",
      phone: "+94 76 529 4956",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },

    // Technical staff Section
    {
      id: "technical-staff-01",
      name: "Mr. T. Luxshman",
      designation: "Technical Officer",
      category: "technical",
      qualifications: "NCT in Mechanical Eng. (Level 5)",
      photo: "luxshman.jpg",
      specialisationIds: ["electro-technology"],
      email: "luxshman@tech.jfn.ac.lk​",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    {
      id: "technical-staff-02",
      name: "Mr. S. Niruparan",
      designation: "Technical Officer",
      category: "technical",
      qualifications: "B.Sc. (Hons) in Engineering (OUSL), NDT in Civil Engineering (ITUM) (AM-IESL, AE-ECSL)",
      photo: "Sethurajah-Niruparan.jpg",
      specialisationIds: ["construction-technology"],
      email: "niruparan@tech.jfn.ac.lk​",
      phone: "+94 12 345 6789",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },
    

    // administrative Staff Section
    {
      id: "administrative-staff-01",
      name: "[Administrative Staff 01 Name]",
      designation: "[Designation]",
      category: "admin",
      qualifications: "",
      photo: "",
      specialisationIds: [],
      email: "[administrative staff 01 email address]",
      phone: "+94 12 345 6789",
      onStudyLeave: false
    }
  ]
};
