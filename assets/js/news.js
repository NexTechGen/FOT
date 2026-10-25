/* news.js — news and announcements
 * What this file is for: the list of announcements shown on the home page and
 *   the News & Events page. Add one object for each announcement; put the
 *   newest one first in the list.
 * 
 * What you can edit: the announcements below. Add real, dated announcements
 *   only.
 * 
 * Fields and what you can put in them:
 *   id         A unique code for the announcement, e.g. "news-2026-10-26".
 *              Do not repeat a code.
 *   title      The headline. One short line.
 *   date       The announcement date as YYYY-MM-DD, e.g. "2026-10-26".
 *   category   The label above the headline, e.g. "Notice", "Event", "Result".
 *   summary    One short sentence shown in the list.
 *   body       The full announcement in plain text. Line breaks are kept.
 *   doc.title  The name of the file to download, e.g. "Examination time table".
 *   doc.url    The file to download. Put it in assets/documents and give just
 *              its name here (e.g. "timetable.pdf"), or use a full https://
 *              address, or "" when there is no file yet.
 * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_CONTENT = window.DEPARTMENT_CONTENT || {};

window.DEPARTMENT_CONTENT.news = [
  {
    id: "news-2026-10-26",
    title: "Practical examinations for 1-2, 2-2 and 4-2 students",
    date: "2026-10-26",
    category: "Notice",
    summary: "Practical examinations for 1-2, 2-2 and 4-2 students commence on 26 October 2026.",
    body: "Practical examinations for students of 1-2, 2-2 and 4-2 will commence on 26 October 2026. Students are advised to be present at the laboratory with their student identity cards.",
    doc: {
      title: "Examination time table",
      url: ""
    }
  }
];
