/* research.js — research and publications
 * What this file is for: the research intro text and the list of research /
 *   publications shown on the Research page and on each specialisation page.
 * 
 * What you can edit: the intro paragraph and the items below. Add real items
 *   only — never invent authors or papers.
 * 
 * Fields and what you can put in them:
 *   intro      An optional short paragraph placed above the list.
 *   items[]    One object per paper, project or publication.
 *     title        The title of the work.
 *     authors      The author names with co-authors, separated by commas.
 *     type         The kind of work, e.g. "Journal article", "Conference
 *                  paper", "Thesis".
 *     venue        The journal, conference or publisher name.
 *     year         The year of publication as four digits, e.g. "2026".
 *     status       Where the work stands, e.g. "Published", "In press",
 *                  "Ongoing".
 *     specialisationIds
 *                  The specialisation codes this work belongs to, from
 *                  specialisations.js.
 *     url          A link to the work (full https:// address), or "" if none.
 * 
 * Anything in [square brackets] is a placeholder to replace.
 * Full help: see docs/ADMIN_GUIDE.md
 */

window.DEPARTMENT_CONTENT = window.DEPARTMENT_CONTENT || {};

window.DEPARTMENT_CONTENT.research = {
  intro: "",
  items: [
    {
      title: "STC-Net: Electroluminescence-Based Solar Cell Crack Segmentation for Power Loss Estimation",
      authors: "Akila Eranda Jayasinghe",
      type: "Conference paper",
      venue: "ResearchGate",
      year: "August 2026",
      status: "Published",
      specialisationIds: ["electro-technology"],
      url: "https://www.researchgate.net/publication/414487822_STC-Net_Electroluminescence-Based_Solar_Cell_Crack_Segmentation_for_Power_Loss_Estimation"
    },
    {
      title: "Model-Based Lithium-ion Battery Impedance Analysis, Degradation and Health Assessment under Dynamic Cycling",
      authors: "Akila Eranda Jayasinghe",
      type: "Thesis",
      venue: "ResearchGate",
      year: "December 2025",
      status: "Published",
      specialisationIds: ["electro-technology"],
      url: "https://www.researchgate.net/publication/411854387_Model-Based_Lithium-ion_Battery_Impedance_Analysis_Degradation_and_Health_Assessment_under_Dynamic_Cycling"
    },
  ]
};
