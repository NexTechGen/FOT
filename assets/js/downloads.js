/* ============================================================================
 * downloads.js — E-Resources page (downloadable files)
 * Department of Engineering Technology
 * Faculty of Technology, University of Jaffna
 *
 * WHAT YOU CAN EDIT HERE
 *   The list of download sections .................... E-Resources page
 *   The files inside each section .................... E-Resources page
 *
 * Each section has a title, and each file has a title, format, size and link.
 * Put real files in the assets/documents folder and set the link to match.
 * The "Programme Documents" section is filled in automatically from each
 * specialisation — you do not add it here.
 *
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 * ==========================================================================*/

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
