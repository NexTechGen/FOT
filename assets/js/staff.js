/* ============================================================================
 * staff.js — all staff details
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * WHAT YOU CAN EDIT HERE
 *   The staff group headings ......................... Staff page
 *   Every staff member's details ..................... Staff page, specialisation pages and the Head of Department section
 *
 * For each person you can set: name, designation, group, qualifications,
 * photo, specialisations, email and research interests.
 * Keep exactly ONE person marked as the Head of Department.
 * These details are used in every place a person appears, so edit once here.
 *
 * THE CODES USED HERE
 *   "id" is the person's own code (unique, do not reuse). Examples:
 *     head-of-department
 *     coordinator-automobile-technology
 *     academic-staff-01
 *   "specialisationIds" says which specialisations the person belongs to.
 *   Use the specialisation's own code:
 *     automobile-technology
 *     construction-technology
 *     electro-technology
 *
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 * ==========================================================================*/

window.DEPARTMENT_STAFF = {

  /* Staff group headings and the order they appear in.
   * A group with no members is hidden automatically. */
  categories: [
    { id: "head",      label: "Head of Department" },
    { id: "academic",  label: "Academic Staff" },
    { id: "technical", label: "Technical Staff" },
    { id: "admin",     label: "Administrative & Support Staff" }
  ],

  members: [
    {
      id: "head-of-department",
      name: "[Head of Department Name]",
      designation: "[Designation]",
      category: "head",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology", "construction-technology", "electro-technology"],
      email: "[head email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: true
    },
    {
      id: "coordinator-automobile-technology",
      name: "[Coordinator 01 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology"],
      email: "[coordinator 01 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "coordinator-construction-technology",
      name: "[Coordinator 02 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["construction-technology"],
      email: "[coordinator 02 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "coordinator-electro-technology",
      name: "[Coordinator 03 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["electro-technology"],
      email: "[coordinator 03 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "academic-staff-01",
      name: "[Academic Staff 01 Name]",
      designation: "[Designation]",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology", "construction-technology"],
      email: "[academic staff 01 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "academic-staff-02",
      name: "[Academic Staff 02 Name]",
      designation: "[Designation]",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["electro-technology"],
      email: "[academic staff 02 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "technical-staff-01",
      name: "[Technical Staff 01 Name]",
      designation: "[Designation]",
      category: "technical",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["automobile-technology"],
      email: "[technical staff 01 email address]",
      researchInterests: "",
      isHeadOfDepartment: false
    },
    {
      id: "administrative-staff-01",
      name: "[Administrative Staff 01 Name]",
      designation: "[Designation]",
      category: "admin",
      qualifications: "",
      photo: "",
      specialisationIds: [],
      email: "[administrative staff 01 email address]",
      researchInterests: "",
      isHeadOfDepartment: false
    }
  ]
};
