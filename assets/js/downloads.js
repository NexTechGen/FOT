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
 *              its path here, e.g. "assets/documents/handbook.pdf", or "" if
 *              the file has not been uploaded yet.
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
        id: "form-admissions",
        title: "[Application / admissions form]",
        format: "PDF",
        size: "",
        url: ""
      }
    ]
  },
  {
    id: "student-resources",
    title: "Student Resources",
    documents: [
      {
        id: "student-handbook",
        title: "[Student handbook]",
        format: "PDF",
        size: "",
        url: ""
      }
    ]
  }
];
