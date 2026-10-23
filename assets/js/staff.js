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
  *   isHeadOfDepartment "true" for the Head of Department only, "false" for
  *                      everyone else.
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
      isHeadOfDepartment: true
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
      isHeadOfDepartment: false
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
      isHeadOfDepartment: false
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
      isHeadOfDepartment: false
    },

    // Academic Staff section
    {
      id: "academic-staff-01",
      name: "[Academic Staff 01 Name]",
      designation: "[Designation]",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology", "construction-technology"],
      email: "[academic staff 01 email address]",
      isHeadOfDepartment: false
    },

    // Technical staff Section
    {
      id: "technical-staff-01",
      name: "[Technical Staff 01 Name]",
      designation: "[Designation]",
      category: "technical",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology"],
      email: "[technical staff 01 email address]",
      isHeadOfDepartment: false
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
      email: "[administrative staff 01 email address]"
    }
  ]
};
