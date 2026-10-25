/* downloads.js — E-Resources page (downloadable files)
 * What this file is for: the sections and the files listed on the E-Resources
 *   page. Add one object for a new section, or one file inside a section.
 * 
 * What you can edit: the sections and documents below. Put the real files in
 *   assets/documents and set the link to match.
 * 
 * The "Programme Documents" section is filled in automatically from each
 *   specialisation — you do not add it here.
 * 
 * Fields and what you can put in them:
 *   sections[] (the list below)
 *     id         A unique code for the section, e.g. "forms".
 *     title      The section heading, e.g. "Forms".
 *     documents[]  The files inside that section.
 *       id     A unique code for the file, e.g. "form-admissions".
 *       title  The name shown in the list, e.g. "Application form".
 *       format The file type, e.g. "PDF" or "DOCX".
 *       size   The file size shown to readers, e.g. "1.2 MB", or "".
 *       url    Where the file is. Put the file in assets/documents and give
 *              just its name here, e.g. "handbook.pdf" (or a sub-folder path
 *              like "forms/application.pdf"). Use a full https:// address for
 *              a file hosted elsewhere, or "" if the file has not been
 *              uploaded yet.
 * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_CONTENT = window.DEPARTMENT_CONTENT || {};

window.DEPARTMENT_CONTENT.downloads = [
  {
    id: "forms",
    title: "Forms",
    documents: [
      {
        id: "non-medical-form",
        title: "Non Medical Submission Form",
        format: "PDF",
        size: "",
        url: "NON-MEDICAL-SUBMISSION-FORM.pdf"
      },
      {
        id: "medical-form",
        title: "Medical Submission Form",
        format: "PDF",
        size: "",
        url: "MEDICAL-SUBMISSION-FORM.pdf"
      }
    ]
  },
  {
    id: "student-resources",
    title: "Student Resources",
    documents: [
      {
        id: "student-handbook-2023",
        title: "Handbook 2023 final",
        format: "PDF",
        size: "",
        url: "Handbook2023-final.pdf"
      }
    ]
  }
];
