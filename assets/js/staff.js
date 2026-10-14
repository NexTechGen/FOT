/* ============================================================================
 * staff.js — Single source of truth for all staff records
 * ----------------------------------------------------------------------------
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * Loaded with `defer` AFTER content.js and BEFORE main.js.
 * Exposes: window.DEPARTMENT_STAFF
 *
 * Every staff record is maintained ONLY here. The staff directory, each
 * specialisation page and the Head of Department section are all rendered from
 * this one list. To update a person, edit their record once and it updates
 * everywhere.
 *
 * Record shape (all fields optional except id / name):
 *   id                string   stable unique id (never change once in use)
 *   name              string   full name (placeholder in [brackets] until known)
 *   designation       string   post held
 *   category          string   "head" | "academic" | "technical" | "admin"
 *   qualifications    string   e.g. "BSc (Hons), MSc, PhD"
 *   photo             string   path from site root, or "" to show initials
 *   specialisationIds string[] ids from content.js (may list more than one)
 *   email             string   official email, or "[placeholder]" if unknown
 *   researchInterests string   free text, or ""
 *   isHeadOfDepartment boolean  exactly one record should be true
 *
 * See README.md -> "Editing the site" for how to add / edit staff.
 * ==========================================================================*/

window.DEPARTMENT_STAFF = {

  /* Display order and labels for staff categories. Categories with no members
   * are automatically hidden by main.js. */
  categories: [
    { id: "head",      label: "Head of Department" },
    { id: "academic",  label: "Academic Staff" },
    { id: "technical", label: "Technical Staff" },
    { id: "admin",     label: "Administrative & Support Staff" }
  ],

  members: [
    {
      id: "staff-hod",
      name: "[Head of Department Name]",
      designation: "[Designation]",
      category: "head",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-01", "sp-02", "sp-03"],
      email: "[head email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: true
    },
    {
      id: "staff-coord-01",
      name: "[Coordinator 01 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-01"],
      email: "[coordinator 01 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "staff-coord-02",
      name: "[Coordinator 02 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-02"],
      email: "[coordinator 02 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "staff-coord-03",
      name: "[Coordinator 03 Name]",
      designation: "Specialisation Coordinator",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-03"],
      email: "[coordinator 03 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "staff-acad-01",
      name: "[Academic Staff 01 Name]",
      designation: "[Designation]",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-01", "sp-02"],
      email: "[academic staff 01 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "staff-acad-02",
      name: "[Academic Staff 02 Name]",
      designation: "[Designation]",
      category: "academic",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-03"],
      email: "[academic staff 02 email address]",
      researchInterests: "[Research interests]",
      isHeadOfDepartment: false
    },
    {
      id: "staff-tech-01",
      name: "[Technical Staff 01 Name]",
      designation: "[Designation]",
      category: "technical",
      qualifications: "[Qualifications]",
      photo: "",
      specialisationIds: ["sp-01"],
      email: "[technical staff 01 email address]",
      researchInterests: "",
      isHeadOfDepartment: false
    },
    {
      id: "staff-admin-01",
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
