/* staff.js — all staff details
 * What this file is for: the people of the department. This one list feeds the
 *   Staff Directory page, the staff cards on each specialisation page, the
 *   coordinators on the Academics page and the staff block on the home page,
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
 *   photo              The photo file name in assets/images, or "" for none.
 *   specialisationIds  The specialisation codes they teach or work in, from
 *                      specialisations.js.
 *   email              Their official email address, or "".
 *   researchInterests  A short line on their research interests, or "".
 *   isHeadOfDepartment "true" for the Head of Department only, "false" for
 *                      everyone else.
 * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_STAFF = {

  // Staff group headings and their order. A group with no members is hidden.
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
