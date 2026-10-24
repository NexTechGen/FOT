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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
      isHeadOfDepartment: false,
      onStudyLeave: false
    },

    // Technical staff Section
    {
      id: "technical-staff-01",
      name: "[Technical Staff 01 Name]",
      designation: "[Designation]",
      category: "technical",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: [],
      email: "[technical staff 01 email address]",
      phone: "+94 21 222 6803",
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
      phone: "+94 21 222 6803",
      onStudyLeave: false
    }
  ]
};
