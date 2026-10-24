/* main.js — site engine: builds the navigation, page content and footer.
 * What this file is for: the code that turns the data files into pages. It
 *   builds the header, navigation, footer, cards, the staff directory with its
 *   search and filter boxes, and the specialisation pages. It holds none of
 *   the department's own text.
 * What you can edit: nothing here for ordinary content changes. Editable
 *   content lives in content.js, specialisations.js, research.js, news.js,
 *   downloads.js and staff.js — see docs/ADMIN_GUIDE.md. Only the webperson
 *   should change this file, and only to add or fix behaviour.
 * How the file is organised:
 *   0. Data references and helpers  — loads the data files and checks that
 *      every link and image address is safe to use.
 *   1. Reusable component builders  — the shared HTML snippets (cards, lists,
 *      buttons, empty states) used by the pages.
 *   2. Rendering functions           — fills each part of a page: home page
 *      sections, About page, contact details, facilities, news and downloads.
 *   3. Specialisation page rendering — the page for each specialisation.
 *   4. Staff directory               — the staff list with its search box,
 *      specialisation filter and reset button.
 *   5. Navigation                    — the main menu, the dropdown and the
 *      mobile menu button.
 *   6. Small page utilities          — the current year and small helpers.
 *   7. Bootstrap                     — starts everything when the page loads.
 */

(function () {
  "use strict";

  // 0. Data references and helpers
  var CONTENT = window.DEPARTMENT_CONTENT || {};
  var STAFF = window.DEPARTMENT_STAFF || { categories: [], members: [] };
  var SPECIALISATIONS = CONTENT.specialisations || [];
  var FACILITIES = CONTENT.facilities || [];
  var DOWNLOADS = CONTENT.downloads || [];
  var NEWS = CONTENT.news || [];
  var RESEARCH = CONTENT.research || { items: [] };

  // Only http/https/mailto/tel are allowed for links and http/https for
  // images; anything else is rejected so a data file cannot inject a link.
  var LINK_SCHEMES = { "http:": true, "https:": true, "mailto:": true, "tel:": true };
  var IMAGE_SCHEMES = { "http:": true, "https:": true };

  /** Lower-case scheme of a URL (e.g. "https:"), or "" when there is none. */
  function urlScheme(value) {
    var match = /^([a-z][a-z0-9+.\-]*):/i.exec(value);
    return match ? match[1].toLowerCase() + ":" : "";
  }

  /** Control characters can hide a scheme from the check above, so reject them. */
  function hasControlChars(value) {
    return /[\u0000-\u001f\u007f]/.test(value);
  }

  /**
   * Resolve a URL from the data files for the current page depth.
   * kind: "link" (default) allows http/https/mailto/tel, "image" allows only
   * http/https. Missing or disallowed values return "" so callers can fall back
   * to an unavailable state instead of a broken link.
   */
  function resolve(path, kind) {
    if (path == null) {
      return "";
    }
    var value = String(path).trim();
    if (!value || hasControlChars(value)) {
      return "";
    }
    var scheme = urlScheme(value);
    if (scheme) {
      var allowed = kind === "image" ? IMAGE_SCHEMES : LINK_SCHEMES;
      return allowed[scheme] ? value : "";
    }
    // Scheme-less: protocol-relative, root-relative or in-page anchor.
    if (value.slice(0, 2) === "//" || value.charAt(0) === "/" || value.charAt(0) === "#") {
      return value;
    }
    var base = document.body.getAttribute("data-base") || "";
    return base + value;
  }

  /**
   * Resolve an image path. Image values are relative to assets/images, so
   * content files can use "photo.jpg" or "staff/photo.jpg" instead of
   * repeating the full path. A bare file name is looked up in the field's
   * conventional folder. Full paths and URLs are left unchanged.
   */
  function imagePath(path, folder) {
    if (path == null) {
      return "";
    }
    var value = String(path).trim();
    if (!value || hasControlChars(value)) {
      return "";
    }
    if (
      urlScheme(value) ||
      value.slice(0, 2) === "//" ||
      value.charAt(0) === "/" ||
      value.charAt(0) === "#" ||
      value.slice(0, 7) === "assets/"
    ) {
      return resolve(value, "image");
    }
    if (value.indexOf("/") === -1 && value.indexOf("\\") === -1) {
      value = (folder ? folder + "/" : "") + value;
    }
    return resolve("assets/images/" + value, "image");
  }

  /** Create an element. opts: { text, cls, attrs, children } */
  function el(tag, opts) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.cls) {
      node.className = opts.cls;
    }
    if (opts.text != null) {
      node.textContent = String(opts.text);
    }
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (key) {
        var value = opts.attrs[key];
        if (value != null && value !== false) {
          node.setAttribute(key, String(value));
        }
      });
    }
    if (opts.children) {
      opts.children.forEach(function (child) {
        if (child) {
          node.appendChild(child);
        }
      });
    }
    return node;
  }

  function clear(node) {
    node.textContent = "";
  }

  function append(target, children) {
    (children || []).forEach(function (child) {
      if (child) {
        target.appendChild(child);
      }
    });
  }

  // Inline SVG icons (Lucide, ISC licence) built with the DOM API only — no
  // innerHTML is ever used.
  var SVG_NS = "http://www.w3.org/2000/svg";
  var DEFAULT_ICON = "graduation-cap";
  var ICONS = {
    "graduation-cap": [
      "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      "M22 10v6",
      "M6 12.5V16a6 3 0 0 0 12 0v-3.5"
    ],
    "book-open": [
      "M12 5v16",
      "M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"
    ],
    "layers": [
      "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
    ],
    "list-checks": [
      "M13 5h8",
      "M13 12h8",
      "M13 19h8",
      "m3 17 2 2 4-4",
      "m3 7 2 2 4-4"
    ],
    "folder-open": [
      "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
    ],
    "file-text": [
      "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      "M14 2v5a1 1 0 0 0 1 1h5",
      "M10 9H8",
      "M16 13H8",
      "M16 17H8"
    ],
    "award": [
      "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      "M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
    ],
    "users": [
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
      "M16 3.128a4 4 0 0 1 0 7.744",
      "M22 21v-2a4 4 0 0 0-3-3.87",
      "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
    ],
    "download": [
      "M12 15V3",
      "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      "m7 10 5 5 5-5"
    ],
    "chevron-right": [
      "m9 18 6-6-6-6"
    ],
    "map-pin": [
      "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    ],
    "mail": [
      "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
      "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"
    ],
    "phone": [
      "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    ],
    "globe": [
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
      "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      "M2 12h20"
    ]
  };

  // Brand/social icons (Simple Icons, CC0): filled single-path glyphs drawn
  // with fill: currentColor.
  var BRAND_ICONS = {
    facebook:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    twitter:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    google:
      "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
    youtube:
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  };

  /** Build a filled brand icon <svg>. Returns null for an unknown name. */
  function brandIcon(name) {
    var pathData = BRAND_ICONS[name];
    if (!pathData) {
      return null;
    }
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    return svg;
  }

  /** Build an inline <svg> icon (decorative). Unknown names fall back to the default. */
  function svgIcon(name) {
    var paths = ICONS[name] || ICONS[DEFAULT_ICON];
    if (!paths) {
      return null;
    }
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    paths.forEach(function (d) {
      var path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
    });
    return svg;
  }

  /** First two initials of a name, ignoring bracket characters. */
  function initials(name) {
    var cleaned = String(name || "").replace(/[[\]]/g, " ").trim();
    var parts = cleaned.split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return "?";
    }
    var letters = parts.map(function (part) {
      return part.charAt(0);
    });
    // Skip a numeric-only token when choosing initials.
    var filtered = parts.filter(function (part) {
      return /[A-Za-z]/.test(part.charAt(0));
    });
    if (filtered.length) {
      letters = filtered.map(function (part) {
        return part.charAt(0);
      });
    }
    return letters.join("").slice(0, 2).toUpperCase();
  }

  function isRealEmail(value) {
    return typeof value === "string" && value.indexOf("@") > -1 && value.indexOf("[") === -1;
  }

  function isRealPhone(value) {
    return typeof value === "string" && /[0-9]/.test(value) && value.indexOf("[") === -1;
  }

  /**
   * Normalise the contact address into its parts. `address` may be a comma
   * separated string or an array of lines; trailing punctuation is dropped
   * here and added back by the renderers.
   */
  function addressParts(value) {
    if (!value) {
      return [];
    }
    var raw = Array.isArray(value) ? value : String(value).split(",");
    return raw
      .map(function (part) {
        return String(part == null ? "" : part).trim().replace(/[.,;]+$/, "");
      })
      .filter(Boolean);
  }

  /** The address as one sentence: "Ariviyal Nagar, Kilinochchi, Sri Lanka." */
  function addressSentence(parts) {
    if (!parts.length) {
      return "";
    }
    var text = parts.join(", ");
    return /[.!?]$/.test(text) ? text : text + ".";
  }

  /** Faculty and university as one line, e.g. "Faculty of Technology, University of Jaffna". */
  function institutionLine() {
    var institution = CONTENT.institution || {};
    return [institution.faculty, institution.university].filter(Boolean).join(", ");
  }

  function formatDate(iso) {
    var months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    if (!match) {
      return String(iso || "");
    }
    var monthIndex = parseInt(match[2], 10) - 1;
    if (monthIndex < 0 || monthIndex > 11) {
      return String(iso || "");
    }
    return parseInt(match[3], 10) + " " + months[monthIndex] + " " + match[1];
  }

  function getSpecialisationById(id) {
    for (var i = 0; i < SPECIALISATIONS.length; i += 1) {
      if (SPECIALISATIONS[i].id === id) {
        return SPECIALISATIONS[i];
      }
    }
    return null;
  }

  function getFacilityById(id) {
    for (var i = 0; i < FACILITIES.length; i += 1) {
      if (FACILITIES[i].id === id) {
        return FACILITIES[i];
      }
    }
    return null;
  }

  /**
   * Documents a specialisation lists as related downloads: shown on its own page
   * and collected into the E-Resources "Programme Documents" section.
   */
  function specialisationDownloads() {
    var entries = [];
    SPECIALISATIONS.forEach(function (sp) {
      (sp.downloads || []).forEach(function (doc) {
        if (!doc || !doc.title) {
          return;
        }
        entries.push({
          id: doc.id || (sp.id + "-document-" + (entries.length + 1)),
          title: doc.title,
          format: doc.format || "",
          size: doc.size || "",
          url: doc.url || ""
        });
      });
    });
    return entries;
  }


  /**
   * Download sections for the E-Resources page: auto-collected "Programme
   * Documents" first, then the admin-defined sections. Empty sections are
   * dropped so no heading is shown without content.
   */
  function downloadSections() {
    var spDocs = specialisationDownloads();
    var sections = [];
    if (spDocs.length) {
      sections.push({ id: "programme-documents", title: "Programme Documents", documents: spDocs });
    }
    (DOWNLOADS || []).forEach(function (section) {
      if (!section || !(section.documents || []).length) {
        return;
      }
      sections.push(section);
    });
    return sections;
  }

  function getStaffById(id) {
    var members = STAFF.members || [];
    for (var i = 0; i < members.length; i += 1) {
      if (members[i].id === id) {
        return members[i];
      }
    }
    return null;
  }

  function getHeadOfDepartment() {
    var members = STAFF.members || [];
    for (var i = 0; i < members.length; i += 1) {
      if (members[i].isHeadOfDepartment) {
        return members[i];
      }
    }
    return null;
  }

  /** Specialisations a staff member belongs to. */
  function specialisationsForStaff(member) {
    var ids = member.specialisationIds || [];
    return ids
      .map(function (id) {
        return getSpecialisationById(id);
      })
      .filter(Boolean);
  }

  /** Whether a staff member coordinates a specialisation. */
  function isSpecialisationCoordinator(member) {
    for (var i = 0; i < SPECIALISATIONS.length; i += 1) {
      if (SPECIALISATIONS[i].coordinatorStaffId === member.id) {
        return true;
      }
    }
    return false;
  }

  /** Staff assigned to a specialisation (derived — never duplicated). */
  function staffForSpecialisation(spId, options) {
    options = options || {};
    return (STAFF.members || []).filter(function (member) {
      if ((member.specialisationIds || []).indexOf(spId) === -1) {
        return false;
      }
      if (options.excludeId && member.id === options.excludeId) {
        return false;
      }
      return true;
    });
  }

  /** True in the mobile-navigation range (below the lg breakpoint of 992px). */
  function isSmallScreen() {
    if (typeof window.matchMedia === "function") {
      return window.matchMedia("(max-width: 991.98px)").matches;
    }
    return typeof window.innerWidth === "number" ? window.innerWidth < 992 : false;
  }

  /** True when the pointer can hover (mouse / trackpad). */
  function canHover() {
    return typeof window.matchMedia === "function"
      ? window.matchMedia("(hover: hover)").matches
      : false;
  }

  // 1. Reusable component builders

  function staffAvatar(member) {
    var wrap = el("span", { cls: "avatar" });
    var photoSrc = imagePath(member.photo, "staff");
    if (photoSrc) {
      var img = el("img", {
        attrs: {
          src: photoSrc,
          alt: "Portrait of " + member.name,
          width: "120",
          height: "140",
          loading: "lazy",
          decoding: "async"
        }
      });
    // A broken photo falls back to the initials avatar; `once` prevents an error loop.
      img.addEventListener(
        "error",
        function () {
          wrap.setAttribute("aria-hidden", "true");
          wrap.textContent = initials(member.name);
        },
        { once: true }
      );
      wrap.appendChild(img);
    } else {
      wrap.setAttribute("aria-hidden", "true");
      wrap.textContent = initials(member.name);
    }
    return wrap;
  }

  function addMetaRow(dl, label, valueNode) {
    if (!valueNode) {
      return;
    }
    dl.appendChild(el("dt", { text: label }));
    var dd = el("dd");
    dd.appendChild(valueNode);
    dl.appendChild(dd);
  }

  function emailNode(email) {
    if (isRealEmail(email)) {
      return el("a", { text: email, attrs: { href: "mailto:" + email } });
    }
    return el("span", {
      cls: "placeholder-note",
      text: email || "[email address to be added]"
    });
  }

  /** Staff card. variant: "full" (directory) or "compact". */
  function buildStaffCard(member, variant) {
    var card = el("article", { cls: "staff-card" });
    card.id = "profile-" + member.id;

    var isHead = !!member.isHeadOfDepartment;
    // The Head of Department oversees every specialisation, so always show
    // all three in their tags regardless of their own list.
    var affiliations = isHead ? SPECIALISATIONS.slice() : specialisationsForStaff(member);

    var head = el("div", { cls: "staff-card__head", children: [staffAvatar(member)] });
    var nameWrap = el("div", {
      children: [
        el("h3", { cls: "staff-card__name", text: member.name }),
        el("p", { cls: "staff-card__designation", text: member.designation || "" })
      ]
    });
    if (affiliations.length) {
      var tags = el("div", { cls: "staff-card__tags" });
      affiliations.forEach(function (sp) {
        tags.appendChild(el("span", { cls: isHead ? "tag tag--hod" : "tag", text: sp.name }));
      });
      nameWrap.appendChild(tags);
    }
    if (member.onStudyLeave) {
      nameWrap.appendChild(el("span", { cls: "tag tag--leave", text: "On Study Leave" }));
    }
    head.appendChild(nameWrap);
    card.appendChild(head);

    if (variant === "compact") {
      var compactProfile = staffProfileLink(member);
      if (compactProfile) {
        card.appendChild(compactProfile);
      }
      return card;
    }

    card.classList.add("staff-card--full");

    var details = document.createElement("details");
    details.className = "disclosure";
    var summary = el("summary", {
      children: [
        document.createTextNode("Contact and details"),
        el("span", { cls: "disclosure__cue", text: "\u2192", attrs: { "aria-hidden": "true" } })
      ]
    });
    details.appendChild(summary);

    var dl = el("dl", { cls: "staff-card__meta" });
    addMetaRow(dl, "Qualifications", member.qualifications ? el("span", { text: member.qualifications }) : null);
    if (member.phone) {
      addMetaRow(dl, "Contact Number", el("a", { text: member.phone, attrs: { href: "tel:" + String(member.phone).replace(/\s+/g, "") } }));
    }
    addMetaRow(dl, "Email", emailNode(member.email));
    details.appendChild(dl);

    var side = el("div", { cls: "staff-card__side", children: [details] });
    card.appendChild(side);
    syncStaffDisclosure(details);

    var fullProfile = staffProfileLink(member);
    if (fullProfile) {
      card.appendChild(fullProfile);
    }

    return card;
  }

  /**
   * Small screens keep the "Contact and details" panel collapsible. On large
   * screens it sits beside the card content permanently open, so keep its
   * `open` state in step with the breakpoint (which also hides the summary).
   */
  function syncStaffDisclosure(details) {
    if (!window.matchMedia) {
      return;
    }
    var desktop = window.matchMedia("(min-width: 992px)");
    var sync = function () {
      details.open = desktop.matches;
    };
    sync();
    if (desktop.addEventListener) {
      desktop.addEventListener("change", sync);
    } else if (desktop.addListener) {
      desktop.addListener(sync);
    }
    details.addEventListener("toggle", function () {
      if (desktop.matches && !details.open) {
        details.open = true;
      }
    });
  }

  /**
   * Link to a person's full entry on the staff directory; only shown on the
   * specialisation pages, where the card is a short summary.
   */
  function staffProfileLink(member) {
    if (!document.body.getAttribute("data-specialisation")) {
      return null;
    }
    return el("div", { cls: "staff-card__profile", children: [
      el("a", {
        cls: "btn btn--outline staff-card__profile-btn",
        text: "View staff profile",
        attrs: { href: resolve("pages/staff.html") + "#profile-" + member.id }
      })
    ] });
  }

  function buildMessageBlock(options) {
    var block = el("div", { cls: "message-block" + (options.tint ? " message-block--tint" : "") });

    var media = el("div", { cls: "message-block__media" });
    var placeholder = imagePath("placeholder.svg", "placeholders");
    var imgSrc = imagePath(options.photo, "staff") || placeholder;
    var portrait = el("img", {
      attrs: {
        src: imgSrc,
        alt: options.photoAlt || ("Placeholder portrait of " + options.name),
        width: "600",
        height: "750",
        loading: "lazy",
        decoding: "async"
      }
    });
    // A broken photo must not leave a broken image; `once` prevents an error loop.
    if (placeholder && imgSrc !== placeholder) {
      portrait.addEventListener(
        "error",
        function () {
          portrait.setAttribute("src", placeholder);
        },
        { once: true }
      );
    }
    media.appendChild(portrait);

    var body = el("div", { cls: "message-block__body" });
    body.appendChild(el("span", { cls: "eyebrow", text: options.eyebrow }));
    body.appendChild(el("h2", { text: options.heading }));

    var blockquote = el("blockquote");
    (options.message || []).forEach(function (paragraph) {
      blockquote.appendChild(el("p", { text: paragraph }));
    });
    body.appendChild(blockquote);

    body.appendChild(el("p", { cls: "message-block__name", text: options.name }));
    body.appendChild(el("p", { cls: "message-block__role", text: options.title }));

    if (options.qualifications) {
      body.appendChild(
        el("p", { cls: "message-block__qualifications", text: options.qualifications })
      );
    }

    if (options.email) {
      var email = String(options.email).trim();
      var emailNode = isRealEmail(email)
        ? el("a", { text: email, attrs: { href: "mailto:" + email } })
        : el("span", { cls: "placeholder-note", text: email });
      body.appendChild(
        el("p", { cls: "message-block__email", children: [emailNode] })
      );
    }

    if (options.footerLink) {
      body.appendChild(options.footerLink);
    }

    append(block, [media, body]);
    return block;
  }

  function initialiseFacilitiesCarousel(target, scroller) {
    var cards = Array.prototype.slice.call(scroller.children);
    if (cards.length < 2) {
      return;
    }

    var wrap = target.classList && target.classList.contains("fac-scroller-wrap")
      ? target
      : scroller.parentNode;

    var dots = el("div", {
      cls: "fac-dots",
      attrs: { role: "group", "aria-label": "Choose a facility" }
    });

    var buttons = [];
    cards.forEach(function (_, index) {
      var btn = el("button", {
        cls: "fac-dots__btn",
        attrs: {
          type: "button",
          "aria-label": "Go to facility " + (index + 1)
        }
      });
      btn.addEventListener("click", function () {
        var max = scroller.scrollWidth - scroller.clientWidth;
        var offset = max <= 0 ? 0 : (max * index) / (cards.length - 1);
        scroller.scrollTo({ left: offset, behavior: "smooth" });
        setActive(index);
      });
      buttons.push(btn);
      dots.appendChild(btn);
    });

    function setActive(index) {
      buttons.forEach(function (button, i) {
        if (i === index) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      });
    }

    function update() {
      var max = scroller.scrollWidth - scroller.clientWidth;
      if (max <= 0) {
        setActive(0);
        return;
      }
      var index = Math.round((scroller.scrollLeft / max) * (cards.length - 1));
      if (index < 0) index = 0;
      if (index > cards.length - 1) index = cards.length - 1;
      setActive(index);
    }

    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    setActive(0);
    if (wrap) {
      wrap.appendChild(dots);
    } else {
      target.appendChild(dots);
    }
  }

  function specialisationCard(sp) {
    var card = el("article", { cls: "card" });

    var media = el("div", { cls: "card__media", children: [
      el("img", {
        attrs: {
          src: imagePath(sp.image, "specialisations") || imagePath("placeholder.svg", "placeholders"),
          alt: sp.imageAlt || ("Image for " + sp.name),
          width: "800",
          height: "500",
          loading: "lazy",
          decoding: "async"
        }
      })
    ] });

    var body = el("div", { cls: "card__body" });
    body.appendChild(el("h3", { cls: "card__title", text: sp.name }));
    body.appendChild(el("p", { cls: "card__text", text: sp.description }));

    var pageHref = resolve(sp.pageUrl, "link");
    var footer = el("p", { cls: "card__footer" });
    if (pageHref) {
      footer.appendChild(el("a", {
        cls: "link-more",
        text: "Explore Specialisation",
        attrs: { href: pageHref }
      }));
    } else {
      footer.appendChild(el("span", { cls: "placeholder-note", text: "Explore Specialisation" }));
    }
    body.appendChild(footer);

    append(card, [media, body]);
    return card;
  }

  function facilityCard(facility) {
    var card = el("article", { cls: "feature" });
    card.appendChild(
      el("img", {
        attrs: {
          src: imagePath(facility.image, "facilities") || imagePath("placeholder.svg", "placeholders"),
          alt: facility.imageAlt || ("Image for " + facility.name),
          width: "800",
          height: "450",
          loading: "lazy",
          decoding: "async"
        }
      })
    );
    var body = el("div", { cls: "feature__body" });
    body.appendChild(el("h3", { text: facility.name }));
    body.appendChild(el("p", { text: facility.description }));

    var affiliations = (facility.specialisationIds || [])
      .map(getSpecialisationById)
      .filter(Boolean);
    if (affiliations.length) {
      var tags = el("div", { cls: "staff-card__tags" });
      affiliations.forEach(function (sp) {
        tags.appendChild(el("span", { cls: "tag", text: sp.name }));
      });
      body.appendChild(tags);
    }
    card.appendChild(body);
    return card;
  }

  function documentRow(doc) {
    var row = el("li", { cls: "doc" });
    row.appendChild(el("p", { cls: "doc__title", text: doc.title }));

    var meta = el("div", { cls: "doc__meta" });
    var docHref = resolve(doc.url, "link");
    if (docHref) {
      if (doc.format) {
        meta.appendChild(el("span", { cls: "badge", text: doc.format }));
      }
      if (doc.size) {
        meta.appendChild(el("span", { text: doc.size }));
      }
      meta.appendChild(
        el("a", {
          cls: "link-more",
          text: "Open document",
          attrs: { href: docHref, target: "_blank", rel: "noopener" }
        })
      );
    } else {
      meta.appendChild(el("span", { cls: "badge badge--muted", text: "Not yet available" }));
    }
    row.appendChild(meta);
    return row;
  }

  function emptyState(title, text) {
    return el("div", { cls: "empty-state", children: [
      el("h3", { text: title }),
      el("p", { text: text })
    ] });
  }

  // 2. Rendering functions (each no-ops when its target is absent)

  function renderFacultyIntro() {
    var target = document.querySelector('[data-render="faculty-intro"]');
    if (!target) {
      return;
    }
    clear(target);
    var intro = (CONTENT.faculty && CONTENT.faculty.intro) || [];
    intro.forEach(function (paragraph, index) {
      target.appendChild(
        el("p", index === 0 ? { cls: "lead", text: paragraph } : { text: paragraph })
      );
    });
  }

  /**
   * Faculty photograph: the placeholder SVG stays as the no-JS fallback and a
   * usable data value updates src/alt, so content.js is the single source.
   */
  function renderFacultyMedia() {
    var targets = document.querySelectorAll('[data-render="faculty-image"]');
    if (!targets.length) {
      return;
    }
    var faculty = CONTENT.faculty || {};
    var src = imagePath(faculty.image, "campus");
    targets.forEach(function (target) {
      if (src) {
        target.setAttribute("src", src);
      }
      if (faculty.imageAlt) {
        target.setAttribute("alt", faculty.imageAlt);
      }
    });
  }

  function renderDepartmentIntro() {
    var target = document.querySelector('[data-render="department-intro"]');
    if (target) {
      clear(target);
      var intro = (CONTENT.department && CONTENT.department.intro) || [];
      intro.forEach(function (paragraph, index) {
        target.appendChild(
          el("p", index === 0 ? { cls: "lead", text: paragraph } : { text: paragraph })
        );
      });
    }
    var focus = document.querySelector('[data-render="department-focus"]');
    if (focus) {
      clear(focus);
      var focusText = (CONTENT.department && CONTENT.department.focus) || "";
      focus.appendChild(el("p", { cls: "prose", text: focusText }));
    }
  }

  /**
   * Department photograph, shown on the homepage and the About page. The
   * placeholder SVG is the no-JS fallback; a usable value updates src/alt.
   */
  function renderDepartmentMedia() {
    var targets = document.querySelectorAll('[data-render="department-image"]');
    if (!targets.length) {
      return;
    }
    var department = CONTENT.department || {};
    var src = imagePath(department.image, "campus");
    targets.forEach(function (target) {
      if (src) {
        target.setAttribute("src", src);
      }
      if (department.imageAlt) {
        target.setAttribute("alt", department.imageAlt);
      }
    });
  }

  /**
   * Institution / faculty / department identity text — the single source for the
   * masthead brand, the homepage headings and the contact page identity line.
   */
  function renderIdentity() {
    var institution = CONTENT.institution || {};
    var faculty = CONTENT.faculty || {};
    var department = CONTENT.department || {};
    // The contact page names the department and the faculty with the university
    // ("Faculty of Technology, University of Jaffna"), so it is built from the
    // shared institution names instead of being stored twice.
    var fields = [
      ["institution-university", institution.university],
      ["institution-department", institution.department],
      ["institution-faculty", institution.faculty],
      ["faculty-label", faculty.label],
      ["faculty-heading", faculty.heading],
      ["department-heading", department.heading],
      ["contact-department-line", institution.department],
      ["contact-faculty-line", institutionLine()]
    ];
    fields.forEach(function (pair) {
      if (pair[1] == null || pair[1] === "") {
        return;
      }
      document.querySelectorAll('[data-render="' + pair[0] + '"]').forEach(function (node) {
        node.textContent = String(pair[1]);
      });
    });
  }

  /**
   * Specialisation names in the navigation and footer link lists. The text is
   * always refreshed from the data; a link target is only rewritten when it
   * resolves to a valid URL.
   */
  function renderSpecialisationNav() {
    document.querySelectorAll("[data-sp-link]").forEach(function (node) {
      var sp = getSpecialisationById(node.getAttribute("data-sp-link"));
      if (!sp) {
        return;
      }
      if (sp.name) {
        node.textContent = String(sp.name);
      }
      var href = resolve(sp.pageUrl, "link");
      if (href) {
        node.setAttribute("href", href);
      }
    });
  }

  function renderDean() {
    var target = document.querySelector('[data-render="dean"]');
    if (!target) {
      return;
    }
    clear(target);
    var dean = CONTENT.dean || {};
    var full = buildMessageBlock({
      eyebrow: "Message",
      heading: "Message from the Dean",
      name: dean.name,
      title: dean.title,
      qualifications: dean.qualifications,
      email: dean.email,
      photo: dean.photo,
      photoAlt: dean.photoAlt,
      message: dean.message || []
    });
    target.appendChild(full);
  }

  function renderHod() {
    var target = document.querySelector('[data-render="hod"]');
    if (!target) {
      return;
    }
    clear(target);
    var hod = getHeadOfDepartment();
    var content = CONTENT.hod || {};

    var link = null;
    if (hod) {
      link = el("div", { cls: "mt-0", children: [
        el("a", {
          cls: "btn btn--outline staff-card__profile-btn",
          text: "View staff profile",
          attrs: { href: resolve("pages/staff.html") + "#profile-" + hod.id }
        })
      ] });
    }

    target.appendChild(
      buildMessageBlock({
        eyebrow: "Department leadership",
        heading: "Message from the Head of Department",
        name: hod ? hod.name : "[Head of Department Name]",
        title: content.title || "Head, Department of Engineering Technology",
        photo: hod ? hod.photo : "",
        photoAlt: (hod && hod.name ? "Portrait of " + hod.name + ", Head of Department" : "Portrait of the Head of Department"),
        message: content.message || [],
        footerLink: link
      })
    );
  }

  /**
   * About page body text. The academic-organisation block is driven from
   * CONTENT.about.organisation and the specialisation links come from
   * renderSpecialisationLinks. Each block no-ops when its target is absent.
   */
  function renderAbout() {
    var about = CONTENT.about || {};
    var org = about.organisation || {};

    var orgHeading = document.querySelector('[data-render="about-organisation-heading"]');
    if (orgHeading && org.heading) {
      orgHeading.textContent = org.heading;
    }

    var orgIntro = document.querySelector('[data-render="about-organisation"]');
    if (orgIntro) {
      clear(orgIntro);
      (org.intro || []).forEach(function (text) {
        orgIntro.appendChild(el("p", { text: text }));
      });
    }

    var orgImage = document.querySelector('[data-render="about-organisation-image"]');
    if (orgImage) {
      var src = imagePath(org.image, "campus");
      if (src) {
        orgImage.setAttribute("src", src);
      }
      if (org.imageAlt) {
        orgImage.setAttribute("alt", org.imageAlt);
      }
    }

    var vision = document.querySelector('[data-render="about-vision"]');
    if (vision && about.vision) {
      vision.textContent = about.vision;
    }

    var mission = document.querySelector('[data-render="about-mission"]');
    if (mission && about.mission) {
      mission.textContent = about.mission;
    }

    var history = document.querySelector('[data-render="about-history"]');
    if (history) {
      clear(history);
      (about.history || []).forEach(function (text) {
        history.appendChild(el("p", { text: text }));
      });
    }

    var milestones = document.querySelector('[data-render="about-history-milestones"]');
    if (milestones) {
      clear(milestones);
      var timeline = about.historyMilestones || [];
      var aside = milestones.closest(".history__aside");
      if (aside) {
        aside.hidden = !timeline.length;
      }
      timeline.forEach(function (item) {
        milestones.appendChild(
          el("li", {
            cls: "timeline__item",
            children: [
              el("span", { cls: "timeline__year", text: item.year || "" }),
              el("p", { cls: "timeline__text", text: item.text || "" })
            ]
          })
        );
      });
    }
  }

  function renderSpecialisationCards() {
    var target = document.querySelector('[data-render="specialisations"]');
    if (!target) {
      return;
    }
    clear(target);
    var grid = el("div", {
      cls: "grid grid--3 sp-scroller",
      attrs: { tabindex: "0", role: "group", "aria-label": "Our specialisations" }
    });
    SPECIALISATIONS.forEach(function (sp) {
      grid.appendChild(specialisationCard(sp));
    });
    target.appendChild(grid);
    initialiseSpecialisationCarousel(target, grid);
  }

    // Small screens show one specialisation card at a time; the dots track the
    // scroll position and jump to a card. CSS shows the dots below 768px only.
  function initialiseSpecialisationCarousel(target, scroller) {
    var cards = Array.prototype.slice.call(scroller.children);
    if (cards.length < 2) {
      return;
    }

    var dots = el("div", {
      cls: "sp-dots",
      attrs: { role: "group", "aria-label": "Choose a specialisation" }
    });

    function prefersReducedMotion() {
      return window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    }

    function maxScroll() {
      return scroller.scrollWidth - scroller.clientWidth;
    }

    function offsetFor(index) {
      var max = maxScroll();
      return max <= 0 ? 0 : (max * index) / (cards.length - 1);
    }

    function currentIndex() {
      var max = maxScroll();
      return max <= 0 ? 0 : Math.round((scroller.scrollLeft / max) * (cards.length - 1));
    }

    // The dots keep the requested position while a smooth scroll is running.
    var pendingIndex = null;
    var pendingTimer = null;

    function setActive(index) {
      buttons.forEach(function (button, i) {
        if (i === index) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      });
    }

    var buttons = cards.map(function (card, index) {
      var title = card.querySelector(".card__title");
      var name = (title && title.textContent) || "Specialisation " + (index + 1);
      var button = el("button", {
        cls: "sp-dots__btn",
        attrs: { type: "button", "aria-label": "Show: " + name }
      });
      button.addEventListener("click", function () {
    // Mark the dot straight away; the scroll event only re-syncs the dots once the
    // smooth scroll has finished.
        pendingIndex = index;
        setActive(index);
        if (pendingTimer) {
          window.clearTimeout(pendingTimer);
        }
        pendingTimer = window.setTimeout(function () {
          pendingIndex = null;
          sync();
        }, 800);
        scroller.scrollTo({
          left: offsetFor(index),
          behavior: prefersReducedMotion() ? "auto" : "smooth"
        });
      });
      dots.appendChild(button);
      return button;
    });

    target.appendChild(dots);

    function sync() {
      var active = currentIndex();
      if (pendingIndex !== null && active !== pendingIndex) {
        return;
      }
      pendingIndex = null;
      setActive(active);
    }

    var ticking = false;
    scroller.addEventListener("scroll", function () {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function () {
        sync();
        ticking = false;
      });
    }, { passive: true });

    sync();
  }

  function renderSpecialisationLinks() {
    var targets = document.querySelectorAll('[data-render="specialisation-links"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      var list = el("ul", { cls: "org-tracks__list" });
      SPECIALISATIONS.forEach(function (sp, index) {
        var href = resolve(sp.pageUrl, "link");
        var name = sp.name || "Specialisation " + (index + 1);
        var card = el(href ? "a" : "div", {
          cls: "org-track" + (href ? "" : " org-track--static"),
          attrs: href ? { href: href } : null
        });
        card.appendChild(
          el("span", {
            cls: "org-track__num",
            text: (index + 1 < 10 ? "0" : "") + (index + 1)
          })
        );
        card.appendChild(el("span", { cls: "org-track__name", text: name }));
        card.appendChild(
          el("span", {
            cls: "org-track__arrow",
            text: "\u2192",
            attrs: { "aria-hidden": "true" }
          })
        );
        list.appendChild(el("li", { cls: "org-track__item", children: [card] }));
      });
      target.appendChild(list);
    });
  }

  // The home page shows a short list per specialisation rather than just the
  // first few facilities overall, so every specialisation is represented.
  function facilitiesPerSpecialisation(limit) {
    var seen = {};
    var picked = [];
    SPECIALISATIONS.forEach(function (sp) {
      var count = 0;
      FACILITIES.forEach(function (facility) {
        if (count >= limit) {
          return;
        }
        if ((facility.specialisationIds || []).indexOf(sp.id) === -1) {
          return;
        }
        var key = facility.id || facility.name;
        if (seen[key]) {
          return;
        }
        seen[key] = true;
        picked.push(facility);
        count += 1;
      });
    });
    return picked;
  }

  function renderFacilities() {
    var targets = document.querySelectorAll('[data-render="facilities"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      var perSpecialisationAttr = target.getAttribute("data-per-specialisation");
      var perSpecialisation = perSpecialisationAttr ? parseInt(perSpecialisationAttr, 10) : NaN;
      var attr = target.getAttribute("data-limit");
      var limit = attr ? parseInt(attr, 10) : NaN;
      var items;
      if (isFinite(perSpecialisation) && perSpecialisation > 0) {
        items = facilitiesPerSpecialisation(perSpecialisation);
      } else if (isFinite(limit) && limit > 0) {
        items = FACILITIES.slice(0, limit);
      } else {
        items = FACILITIES.slice();
      }
      if (!items.length) {
        target.appendChild(emptyState("Facilities coming soon", "Laboratory and facility information has not been published yet."));
        return;
      }
      var list = el("div", { cls: "feature-list fac-scroller" });
      items.forEach(function (facility) {
        list.appendChild(facilityCard(facility));
      });
      target.appendChild(list);
      initialiseFacilitiesCarousel(target, list);
    });
  }

  /**
   * Build one research/publication entry as a card.
   * entry: { title, authors, type, venue, year, status, specialisationIds, url }
   * `withSpec` adds the specialisation tags (used on the Research page).
   */
  function buildResearchEntry(entry, withSpec) {
    var card = el("li", { cls: "research-entry" });

    var head = el("div", { cls: "research-entry__head" });
    if (entry.type) {
      head.appendChild(el("span", { cls: "research-entry__type", text: entry.type }));
    }
    if (entry.year) {
      head.appendChild(el("span", { cls: "research-entry__year", text: entry.year }));
    }
    if (entry.status) {
      head.appendChild(
        el("span", {
          cls: "research-entry__status",
          text: entry.status,
          attrs: { "data-status": String(entry.status).trim().toLowerCase() }
        })
      );
    }
    if (head.childNodes.length) {
      card.appendChild(head);
    }

    card.appendChild(el("h3", { cls: "research-entry__title", text: entry.title || "" }));

    if (entry.authors) {
      card.appendChild(el("p", { cls: "research-entry__authors", text: entry.authors }));
    }

    if (entry.venue) {
      card.appendChild(el("p", { cls: "research-entry__venue", text: entry.venue }));
    }

    var href = resolve(entry.url, "link");
    if (href) {
      card.appendChild(
        el("a", {
          cls: "link-more research-entry__link",
          text: "View publication",
          attrs: { href: href, target: "_blank", rel: "noopener" }
        })
      );
    }

    if (withSpec && (entry.specialisationIds || []).length) {
      var tags = el("div", { cls: "research-entry__tags" });
      entry.specialisationIds.forEach(function (id) {
        var sp = getSpecialisationById(id);
        if (sp) {
          tags.appendChild(el("span", { cls: "tag", text: sp.name }));
        }
      });
      if (tags.childNodes.length) {
        card.appendChild(tags);
      }
    }

    return card;
  }

  /** A research entry's specialisation names, for the specialisation page filter. */
  function researchEntryHasSpecialisation(entry, spId) {
    return (entry.specialisationIds || []).indexOf(spId) !== -1;
  }

  function researchSection(items, withSpec) {
    var wrap = el("div", { cls: "flow" });

    if (RESEARCH.intro) {
      wrap.appendChild(el("p", { cls: "prose", text: RESEARCH.intro }));
    }

    var list = items || [];
    if (!list.length) {
      wrap.appendChild(
        emptyState(
          "Research information coming soon",
          "Research produced by the department's staff and students will be listed here once verified."
        )
      );
      return wrap;
    }

    var docList = el("ul", { cls: "doc-list" });
    list.forEach(function (entry) {
      docList.appendChild(buildResearchEntry(entry, withSpec));
    });
    wrap.appendChild(docList);
    return wrap;
  }

  function renderResearch() {
    var targets = document.querySelectorAll('[data-render="research"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      if (RESEARCH.intro) {
        target.appendChild(el("p", { cls: "prose", text: RESEARCH.intro }));
      }
      target.appendChild(el("div", { attrs: { id: "research-results" } }));
    });
    initResearchFilters();
    applyResearchFilter();
  }

  /** Wire a filter control to re-run the research filter on user input. */
  function bindFilterInput(node) {
    if (!node) {
      return;
    }
    node.addEventListener("input", applyResearchFilter);
    node.addEventListener("change", applyResearchFilter);
  }

  /** Distinct, non-empty values for a research facet, in a stable order. */
  function researchFacet(entries, key) {
    var seen = {};
    entries.forEach(function (entry) {
      var value = String(entry[key] || "").trim();
      if (value) {
        seen[value] = true;
      }
    });
    var values = Object.keys(seen);
    if (key === "year") {
      values.sort(function (a, b) {
        return b.localeCompare(a, undefined, { numeric: true });
      });
    } else {
      values.sort(function (a, b) {
        return a.localeCompare(b);
      });
    }
    return values;
  }

  function fillResearchSelect(select, allLabel, values) {
    if (!select) {
      return;
    }
    var current = select.value;
    clear(select);
    select.appendChild(el("option", { text: allLabel, attrs: { value: "" } }));
    values.forEach(function (value) {
      select.appendChild(el("option", { text: value, attrs: { value: value } }));
    });
    if (current && values.indexOf(current) !== -1) {
      select.value = current;
    }
  }

  function initResearchFilters() {
    var entries = RESEARCH.items || [];
    fillResearchSelect(
      document.getElementById("research-type"),
      "All types",
      researchFacet(entries, "type")
    );
    fillResearchSelect(
      document.getElementById("research-year"),
      "All years",
      researchFacet(entries, "year")
    );
    var spSelect = document.getElementById("research-specialisation");
    if (spSelect) {
      clear(spSelect);
      spSelect.appendChild(el("option", { text: "All specialisations", attrs: { value: "" } }));
      SPECIALISATIONS.forEach(function (sp) {
        spSelect.appendChild(el("option", { text: sp.name, attrs: { value: sp.id } }));
      });
    }

    bindFilterInput(document.getElementById("research-search"));
    bindFilterInput(document.getElementById("research-type"));
    bindFilterInput(document.getElementById("research-year"));
    bindFilterInput(document.getElementById("research-specialisation"));

    var reset = document.getElementById("research-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        [
          "research-search",
          "research-type",
          "research-year",
          "research-specialisation"
        ].forEach(function (id) {
          var node = document.getElementById(id);
          if (node) {
            node.value = "";
          }
        });
        applyResearchFilter();
        var search = document.getElementById("research-search");
        if (search) {
          search.focus();
        }
      });
    }
  }

  function applyResearchFilter() {
    var container = document.getElementById("research-results");
    if (!container) {
      return;
    }
    var search = document.getElementById("research-search");
    var type = document.getElementById("research-type");
    var year = document.getElementById("research-year");
    var sp = document.getElementById("research-specialisation");
    var count = document.getElementById("research-count");

    var query = search ? search.value.trim().toLowerCase() : "";
    var typeValue = type ? type.value : "";
    var yearValue = year ? year.value : "";
    var spValue = sp ? sp.value : "";
    var all = RESEARCH.items || [];

    var results = all.filter(function (entry) {
      var haystack = [
        entry.title || "",
        entry.authors || "",
        entry.venue || ""
      ].join(" ").toLowerCase();
      if (query && haystack.indexOf(query) === -1) {
        return false;
      }
      if (typeValue && String(entry.type || "").trim() !== typeValue) {
        return false;
      }
      if (yearValue && String(entry.year || "").trim() !== yearValue) {
        return false;
      }
      if (spValue && (entry.specialisationIds || []).indexOf(spValue) === -1) {
        return false;
      }
      return true;
    });

    clear(container);
    if (!all.length) {
      container.appendChild(
        emptyState(
          "Research information coming soon",
          "Research produced by the department's staff and students will be listed here once verified."
        )
      );
    } else if (!results.length) {
      var empty = emptyState(
        "No research matches your filters",
        "Try a different search term or clear the type, year and specialisation filters."
      );
      var resetBtn = el("button", {
        cls: "btn btn--outline mt-4",
        text: "Reset filters",
        attrs: { type: "button" }
      });
      resetBtn.addEventListener("click", function () {
        [
          "research-search",
          "research-type",
          "research-year",
          "research-specialisation"
        ].forEach(function (id) {
          var node = document.getElementById(id);
          if (node) {
            node.value = "";
          }
        });
        applyResearchFilter();
      });
      empty.appendChild(resetBtn);
      container.appendChild(empty);
    } else {
      var docList = el("ul", { cls: "doc-list" });
      results.forEach(function (entry) {
        docList.appendChild(buildResearchEntry(entry, true));
      });
      container.appendChild(docList);
    }

    if (count) {
      if (!all.length) {
        count.textContent = "";
      } else {
        var label = results.length === 1 ? "entry" : "entries";
        count.textContent = "Showing " + results.length + " of " + all.length + " " + label + ".";
      }
    }
  }

  function newsSection(limit) {
    var wrap = el("div", { cls: "news-list" });
    if (!NEWS.length) {
      return emptyState(
        "No announcements published yet",
        "News and events will appear here once they are published by the department. Please check back later."
      );
    }
    var count = isFinite(limit) && limit > 0 ? limit : NEWS.length;
    NEWS.slice(0, count).forEach(function (item) {
      var card = el("article", { cls: "news-item", attrs: { id: item.id } });
      var meta = el("div", { cls: "news-item__meta", children: [
        el("span", { cls: "news-item__date", text: formatDate(item.date) }),
        el("span", { cls: "badge", text: item.category || "News" })
      ] });
      card.appendChild(meta);
      card.appendChild(
        el("h3", { cls: "news-item__title", children: [
          el("button", {
            cls: "news-item__link",
            text: item.title,
            attrs: { type: "button", "data-news-open": item.id }
          })
        ] })
      );
      // Preview line: the body shown as a single truncated line (3 dots).
      card.appendChild(
        el("p", { cls: "news-item__text", text: oneLine(item.body || item.summary || "") })
      );
      wrap.appendChild(card);
    });
    return wrap;
  }

  /** Collapse text to a single tidy line (browsers add the "…" via CSS). */
  function oneLine(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  /**
   * Full-notice modal: one shared <dialog>, created lazily and filled with the
   * clicked notice (subject, full body and an optional download link).
   */
  var newsDialog = null;

  function ensureNewsDialog() {
    if (newsDialog) {
      return newsDialog;
    }
    var dialog = el("dialog", { cls: "news-modal", attrs: { "aria-labelledby": "news-modal-title" } });
    var shell = el("div", { cls: "news-modal__shell" });

    var closeBtn = el("button", {
      cls: "news-modal__close",
      attrs: { type: "button", "aria-label": "Close notice" },
      children: [el("span", { attrs: { "aria-hidden": "true" }, text: "\u00D7" })]
    });
    shell.appendChild(closeBtn);

    var meta = el("div", { cls: "news-item__meta", attrs: { id: "news-modal-meta" } });
    shell.appendChild(meta);

    var title = el("h2", { cls: "news-modal__title", attrs: { id: "news-modal-title" } });
    shell.appendChild(title);

    var body = el("div", { cls: "news-modal__body prose", attrs: { id: "news-modal-body" } });
    shell.appendChild(body);

    var docWrap = el("div", { cls: "news-modal__doc", attrs: { id: "news-modal-doc" } });
    shell.appendChild(docWrap);

    dialog.appendChild(shell);

    // Older browsers without <dialog> support only get the plain "open" attribute.
    var closeDialog = function () {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    };

    closeBtn.addEventListener("click", function () {
      closeDialog();
    });
    // Click on the backdrop (outside the shell) closes the dialog.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });
    // Drop the deep-link hash once closed so a reload shows the list again.
    dialog.addEventListener("close", function () {
      if (window.location.hash) {
        try {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        } catch (err) {
    // history.replaceState can throw on file:// documents, so fall back to clearing
    // the hash.
          window.location.hash = "";
        }
      }
    });

    newsDialog = dialog;
    document.body.appendChild(dialog);
    return dialog;
  }

  function openNewsItem(id) {
    var item = null;
    for (var i = 0; i < NEWS.length; i += 1) {
      if (NEWS[i].id === id) {
        item = NEWS[i];
        break;
      }
    }
    if (!item) {
      return;
    }

    var dialog = ensureNewsDialog();

    var meta = dialog.querySelector("#news-modal-meta");
    clear(meta);
    meta.appendChild(el("span", { cls: "news-item__date", text: formatDate(item.date) }));
    meta.appendChild(el("span", { cls: "badge", text: item.category || "News" }));

    dialog.querySelector("#news-modal-title").textContent = item.title || "";

    var body = dialog.querySelector("#news-modal-body");
    clear(body);
    var paragraphs = item.body || item.summary || "";
    if (Object.prototype.toString.call(paragraphs) === "[object Array]") {
      paragraphs.forEach(function (p) {
        body.appendChild(el("p", { text: p }));
      });
    } else if (paragraphs) {
      body.appendChild(el("p", { text: paragraphs }));
    }

    var docWrap = dialog.querySelector("#news-modal-doc");
    clear(docWrap);
    var doc = item.doc || {};
    var docHref = resolve(doc.url, "link");
    if (docHref && doc.title) {
      docWrap.appendChild(
        el("a", {
          cls: "link-more",
          text: "Download " + doc.title,
          attrs: { href: docHref, target: "_blank", rel: "noopener" }
        })
      );
    }

    if (typeof dialog.showModal === "function") {
    // showModal() throws InvalidStateError if the dialog is already open.
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (!dialog.hasAttribute("open")) {
      dialog.setAttribute("open", "");
    }
  }

  function initNews() {
    var targets = document.querySelectorAll('[data-render="news"]');
    if (!targets.length) {
      return;
    }
    // One delegated listener handles every notice card (present or future).
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest ? event.target.closest("[data-news-open]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openNewsItem(trigger.getAttribute("data-news-open"));
    });

    // Deep link: opening .../news.html#news-<id> shows that notice directly.
    var openFromHash = function () {
      var id = (window.location.hash || "").replace(/^#/, "");
      if (id) {
        openNewsItem(id);
      }
    };
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
  }

  function renderNews() {
    var targets = document.querySelectorAll('[data-render="news"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      target.appendChild(newsSection(target.getAttribute("data-limit") ? parseInt(target.getAttribute("data-limit"), 10) : null));
    });
  }

  function renderAcademicOverview() {
    var targets = document.querySelectorAll('[data-render="academic-overview"]');
    if (!targets.length) {
      return;
    }
    var items = CONTENT.academicOverview || [];
    targets.forEach(function (target) {
      clear(target);
      var grid = el("div", { cls: "grid grid--4" });
      items.forEach(function (item) {
        var href = resolve(item.url, "link");
        var children = [
          el("span", {
            cls: "tile__icon",
            children: [svgIcon(item.icon)]
          }),
          el("h3", { cls: "tile__title", text: item.title }),
          el("p", { cls: "tile__text", text: item.description })
        ];
        if (href) {
          children.push(
            el("span", {
              cls: "tile__more",
              children: [
                el("span", { text: "Learn more" }),
                el("span", {
                  cls: "tile__more-arrow",
                  children: [svgIcon("chevron-right")]
                })
              ]
            })
          );
          grid.appendChild(el("a", { cls: "tile", attrs: { href: href }, children: children }));
        } else {
          grid.appendChild(el("div", { cls: "tile tile--static", children: children }));
        }
      });
      target.appendChild(grid);
    });
  }

  /** One collapsible E-Resources section: a <details class="doc-group"> with the documents inside. */
  function downloadGroup(section, openByDefault) {
    var details = el("details", { cls: "doc-group", attrs: { id: section.id || null } });
    if (openByDefault) {
      details.setAttribute("open", "");
    }

    var summary = el("summary", { cls: "doc-group__summary" });
    summary.appendChild(el("span", { cls: "doc-group__label", text: section.title }));
    summary.appendChild(
      el("span", {
        cls: "doc-group__count",
        text: section.documents.length === 1 ? "1 item" : section.documents.length + " items"
      })
    );
    details.appendChild(summary);

    var list = el("ul", { cls: "doc-list" });
    section.documents.forEach(function (doc) {
      list.appendChild(documentRow(doc));
    });
    details.appendChild(list);
    return details;
  }

  function renderDownloads() {
    var target = document.querySelector('[data-render="downloads"]');
    if (!target) {
      return;
    }
    clear(target);

    var sections = downloadSections();
    if (!sections.length) {
      target.appendChild(emptyState("No documents available", "Documents will be listed here once they are published."));
      return;
    }

    var wrap = el("div", { cls: "doc-groups" });
    sections.forEach(function (section, index) {
      wrap.appendChild(downloadGroup(section, index === 0));
    });
    target.appendChild(wrap);
  }

  function renderContact() {
    var targets = document.querySelectorAll('[data-render="contact"]');
    if (!targets.length) {
      return;
    }
    var c = CONTENT.contact || {};
    targets.forEach(function (target) {
      clear(target);

      var rows = el("ul", { cls: "contact-details" });

      function contactRow(icon, label, valueNode) {
        var row = el("li", { cls: "contact-details__row" });

        var badge = el("span", { cls: "contact-details__icon", attrs: { "aria-hidden": "true" } });
        var badgeIcon = svgIcon(icon);
        if (badgeIcon) {
          badge.appendChild(badgeIcon);
        }
        row.appendChild(badge);

        var body = el("div", { cls: "contact-details__body" });
        body.appendChild(el("span", { cls: "contact-details__label", text: label }));
        body.appendChild(el("div", { cls: "contact-details__value", children: [valueNode] }));
        row.appendChild(body);

        return row;
      }

      // Address — the parts are comma-separated into a single readable value.
      var addrValue;
      var addrParts = addressParts(c.address);
      if (!addrParts.length) {
        addrValue = el("span", { cls: "placeholder-note", text: "[Address to be added]" });
      } else {
        var addrText = addressSentence(addrParts);
        addrValue = addrText.indexOf("[") > -1
          ? el("span", { cls: "placeholder-note", text: addrText })
          : el("span", { cls: "contact-details__address", text: addrText });
      }
      rows.appendChild(contactRow("map-pin", "Address", addrValue));

      // Email
      var emailValue;
      if (isRealEmail(c.email)) {
        emailValue = el("a", { text: c.email, attrs: { href: "mailto:" + c.email } });
      } else {
        emailValue = el("span", { cls: "placeholder-note", text: c.email || "[Email to be added]" });
      }
      rows.appendChild(contactRow("mail", "Email", emailValue));

      // Telephone
      var phoneValue;
      if (isRealPhone(c.phone)) {
        phoneValue = el("a", {
          text: c.phone,
          attrs: { href: "tel:" + String(c.phone).replace(/[^0-9+]/g, "") }
        });
      } else {
        phoneValue = el("span", { cls: "placeholder-note", text: c.phone || "[Telephone to be added]" });
      }
      rows.appendChild(contactRow("phone", "Telephone", phoneValue));

      // Social media links (same data as the footer column).
      var social = (c.social || []).filter(function (item) {
        return item && brandIcon(item.icon) && resolve(item.url, "link");
      });
      if (social.length) {
        var socialWrap = el("div", { cls: "contact-details__social" });
        social.forEach(function (item) {
          socialWrap.appendChild(
            el("a", {
              cls: "contact-details__social-link",
              attrs: {
                href: resolve(item.url, "link"),
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": item.label || item.icon,
                title: item.label || item.icon
              },
              children: [brandIcon(item.icon)]
            })
          );
        });
        rows.appendChild(el("li", { cls: "contact-details__row", children: [socialWrap] }));
      }

      target.appendChild(rows);
    });

    // Location map (contact page aside). Renders an <iframe> from the embed URL in
    // content.js; a blank or invalid URL shows a placeholder instead.
    var mapTarget = document.querySelector('[data-render="contact-map"]');
    if (mapTarget) {
      clear(mapTarget);
      var mapSrc = resolve(c.mapEmbedUrl, "link");
      var mapNames = institutionLine();
      var mapTitle = mapNames
        ? "Map showing the location of the " + mapNames
        : "Department location map";
      if (mapSrc) {
        mapTarget.appendChild(
          el("iframe", {
            cls: "contact-map__frame",
            attrs: {
              src: mapSrc,
              title: mapTitle,
              loading: "lazy",
              referrerpolicy: "no-referrer-when-downgrade",
              allowfullscreen: ""
            }
          })
        );
      } else {
        mapTarget.appendChild(
          el("div", { cls: "contact-map__placeholder", children: [
            el("span", { cls: "placeholder-note", text: c.mapLabel || "[Map location pending verification]" })
          ] })
        );
      }
    }
  }

  // 2b. Footer contact block (every page) — rendered from the same contact
  //     data as the contact page, so the heading and the content always match.
  function renderFooterContact() {
    var targets = document.querySelectorAll('[data-render="footer-contact"]');
    if (!targets.length) {
      return;
    }
    var c = CONTENT.contact || {};
    var parts = addressParts(c.address);

    targets.forEach(function (target) {
      clear(target);

      // Heading — rendered from the same JS section as the content below.
      target.appendChild(
        el("h2", { cls: "footer__title", text: c.footerTitle || "Contact us" })
      );

      var box = el("div", { cls: "footer__address" });

    // Address: one part per line, punctuated as a postal address (a comma after
    // every line and a full stop after the last). The whole address links to the
    // Contact page.
      if (parts.length) {
        var p = el("p");
        var addrLink = el("a", {
          cls: "footer__address-link",
          attrs: { href: resolve("pages/contact.html", "link") }
        });
        parts.forEach(function (part, index) {
          if (index > 0) {
            addrLink.appendChild(el("br"));
          }
          var last = index === parts.length - 1;
          addrLink.appendChild(document.createTextNode(part + (last ? "." : ",")));
        });
        p.appendChild(addrLink);
        box.appendChild(p);
      }

      // Telephone
      if (c.phone) {
        var telP = el("p");
        telP.appendChild(document.createTextNode("Tel : \u00a0"));
        if (isRealPhone(c.phone)) {
          telP.appendChild(
            el("a", {
              text: c.phone,
              attrs: { href: "tel:" + String(c.phone).replace(/[^0-9+]/g, "") }
            })
          );
        } else {
          telP.appendChild(el("span", { text: c.phone }));
        }
        box.appendChild(telP);
      }

      // Email
      if (c.email) {
        var mailP = el("p");
        mailP.appendChild(document.createTextNode("Email : "));
        if (isRealEmail(c.email)) {
          mailP.appendChild(el("a", { text: c.email, attrs: { href: "mailto:" + c.email } }));
        } else {
          mailP.appendChild(el("span", { text: c.email }));
        }
        box.appendChild(mailP);
      }

      // Social links — rendered as a full-width, centred row across the whole
      // footer top (not inside the narrow contact column).
      var social = (c.social || []).filter(function (item) {
        return item && brandIcon(item.icon) && resolve(item.url, "link");
      });

    // Nothing to show yet — say so instead of leaving a blank column.
      if (!box.childNodes.length) {
        box.appendChild(
          el("p", { cls: "footer__address-pending", text: "[Contact details to be added]" })
        );
      }

      target.appendChild(box);

      if (social.length) {
        var wrap = el("div", { cls: "footer__social" });
        social.forEach(function (item) {
          var icon = brandIcon(item.icon);
          wrap.appendChild(
            el("a", {
              cls: "footer__social-link",
              attrs: {
                href: resolve(item.url, "link"),
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": item.label || item.icon,
                title: item.label || item.icon
              },
              children: [icon]
            })
          );
        });

        var host = target.parentElement || target;
        host.appendChild(wrap);
      }
    });
  }

  // 3. Specialisation page rendering
  function renderSpecialisationPage(spId) {
    var sp = getSpecialisationById(spId);
    if (!sp) {
      return;
    }

    document.title = sp.name + " | Department of Engineering Technology";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", sp.description || sp.name);
    }

    var set = function (key, node) {
      var target = document.querySelector('[data-sp="' + key + '"]');
      if (!target || !node) {
        return;
      }
      clear(target);
      target.appendChild(node);
    };
    var setText = function (key, text) {
      var target = document.querySelector('[data-sp="' + key + '"]');
      if (target) {
        target.textContent = text;
      }
    };

    setText("breadcrumb-name", sp.name);
    setText("title", sp.name);
    setText("intro", sp.description || "");

    var imageTarget = document.querySelector('[data-sp="image"]');
    if (imageTarget) {
      imageTarget.setAttribute(
        "src",
        imagePath(sp.image, "specialisations") || imagePath("placeholder.svg", "placeholders")
      );
      imageTarget.setAttribute("alt", sp.imageAlt || ("Image for " + sp.name));
    }

    // Overview paragraphs
    var overview = document.querySelector('[data-sp="overview"]');
    if (overview) {
      clear(overview);
      if (imageTarget && window.matchMedia && window.matchMedia("(max-width: 991.98px)").matches) {
        if (imageTarget.parentNode && imageTarget.parentNode !== overview) {
          imageTarget.parentNode.removeChild(imageTarget);
        }
        imageTarget.classList.add("sp-overview__image");
        overview.appendChild(imageTarget);
      }
      (sp.overview || []).forEach(function (paragraph) {
        overview.appendChild(el("p", { text: paragraph }));
      });
    }

    // Curriculum — one version per year, chosen with a dropdown when several
    // years are supplied. The first entry is shown by default.
    var curriculum = document.querySelector('[data-sp="curriculum"]');
    if (curriculum) {
      clear(curriculum);
      var versions = (sp.curriculum || []).filter(function (entry) {
        return entry && Array.isArray(entry.sections);
      });
      if (!versions.length && Array.isArray(sp.curriculum) && sp.curriculum.length) {
        versions = [{ year: "", sections: sp.curriculum }];
      }
      versions.sort(function (a, b) {
        return (parseInt(a.year, 10) || 0) - (parseInt(b.year, 10) || 0);
      });

      if (!versions.length) {
        curriculum.appendChild(
          el("p", { text: "Curriculum information has not been supplied yet." })
        );
      } else {
        var groups = el("div", { cls: "curriculum-groups" });

        var renderSubject = function (target, entry) {
          var name = entry.name || "";
          if (entry.code) {
            target.className = "has-code";
            target.appendChild(el("span", { cls: "checklist__name", text: name }));
            target.appendChild(el("span", { cls: "checklist__code", text: entry.code }));
          } else {
            target.textContent = name;
          }
        };

        var renderSections = function (sections) {
          clear(groups);
          if (!sections.length) {
            groups.appendChild(
              el("p", { text: "Curriculum information has not been supplied yet." })
            );
            return;
          }
          sections.forEach(function (block, index) {
            var details = el("details", { cls: "doc-group curriculum-group" });
            if (index === 0) {
              details.open = true;
            }
            details.addEventListener("toggle", function () {
              if (!details.open) {
                return;
              }
              groups.querySelectorAll(".curriculum-group").forEach(function (other) {
                if (other !== details) {
                  other.open = false;
                }
              });
            });
            details.appendChild(
              el("summary", {
                cls: "doc-group__summary",
                children: [
                  el("span", { cls: "doc-group__label", text: block.title })
                ]
              })
            );
            var ul = el("ul", { cls: "checklist" });
            (block.items || []).forEach(function (item) {
              var li = el("li");
              if (typeof item === "string") {
                li.textContent = item;
              } else if (item && typeof item === "object") {
                renderSubject(li, item);
                if (Array.isArray(item.options) && item.options.length) {
                  var sublist = el("ol", { cls: "checklist checklist--sub" });
                  item.options.forEach(function (option) {
                    var sub = el("li");
                    if (typeof option === "string") {
                      sub.textContent = option;
                    } else if (option && typeof option === "object") {
                      renderSubject(sub, option);
                    }
                    sublist.appendChild(sub);
                  });
                  li.appendChild(sublist);
                }
              }
              ul.appendChild(li);
            });
            details.appendChild(ul);
            groups.appendChild(details);
          });
        };

        if (versions.length > 1) {
          var toolbar = el("div", { cls: "curriculum-toolbar" });
          toolbar.appendChild(
            el("label", {
              cls: "curriculum-toolbar__label",
              text: "Curriculum year",
              attrs: { for: "curriculum-year" }
            })
          );
          var selectWrap = el("div", { cls: "curriculum-select" });
          var select = el("select", { attrs: { id: "curriculum-year" } });
          versions.forEach(function (version, index) {
            select.appendChild(
              el("option", {
                text: version.year || ("Curriculum " + (index + 1)),
                attrs: { value: String(index) }
              })
            );
          });
          select.addEventListener("change", function () {
            var selected = versions[parseInt(this.value, 10)] || versions[0];
            renderSections(selected.sections);
          });
          selectWrap.appendChild(select);
          toolbar.appendChild(selectWrap);
          curriculum.appendChild(toolbar);
        }

        curriculum.appendChild(groups);
        renderSections(versions[0].sections);
      }
    }

    // Coordinator
    var coordinator = document.querySelector('[data-sp="coordinator"]');
    if (coordinator) {
      clear(coordinator);
      var coord = getStaffById(sp.coordinatorStaffId);
      if (coord) {
        var card = buildStaffCard(coord, "full");
        coordinator.appendChild(card);
      } else {
        coordinator.appendChild(
          el("p", { cls: "placeholder-note", text: "[Specialisation Coordinator to be appointed]" })
        );
      }
    }

    // Associated staff (derived; coordinator excluded to avoid duplication)
    var staffHolder = document.querySelector('[data-sp="staff"]');
    if (staffHolder) {
      clear(staffHolder);
      var hod = getHeadOfDepartment();
      var associated = staffForSpecialisation(sp.id, { excludeId: sp.coordinatorStaffId });
      associated = associated.filter(function (member) {
        return !(hod && member.id === hod.id);
      });
      if (!associated.length) {
        staffHolder.appendChild(
          el("p", { cls: "placeholder-note", text: "Staff assignments for this specialisation have not been published yet." })
        );
      } else {
        var staffGrid = el("div", { cls: "grid grid--3" });
        associated.forEach(function (member) {
          staffGrid.appendChild(buildStaffCard(member, "compact"));
        });
        staffHolder.appendChild(staffGrid);
      }
    }

    // Laboratories
    var labsHolder = document.querySelector('[data-sp="labs"]');
    if (labsHolder) {
      clear(labsHolder);
      var labs = FACILITIES.filter(function (facility) {
        return (facility.specialisationIds || []).indexOf(sp.id) !== -1;
      });
      if (!labs.length) {
        labsHolder.appendChild(
          el("p", { cls: "placeholder-note", text: "Related laboratories have not been published yet." })
        );
      } else {
        var labList = el("div", { cls: "feature-list" });
        labs.forEach(function (facility) {
          labList.appendChild(facilityCard(facility));
        });
        labsHolder.appendChild(labList);
      }
    }

    // Research
    var researchHolder = document.querySelector('[data-sp="research"]');
    if (researchHolder) {
      clear(researchHolder);
      var r = sp.research || {};
      if (r.summary) {
        researchHolder.appendChild(el("p", { cls: "prose", text: r.summary }));
      }
      var spItems = (RESEARCH.items || []).filter(function (entry) {
        return researchEntryHasSpecialisation(entry, sp.id);
      });
      researchHolder.appendChild(researchSection(spItems.slice(0, 3), false));
      if (spItems.length > 0) {
        var seeMore = el("div", { cls: "mt-4" });
        seeMore.appendChild(
          el("a", {
            cls: "btn btn--outline",
            text: "See more",
            attrs: { href: "research.html" }
          })
        );
        researchHolder.appendChild(seeMore);
      }
    }

    // Downloads — the specialisation's own related downloads.
    var downloadsHolder = document.querySelector('[data-sp="downloads"]');
    if (downloadsHolder) {
      clear(downloadsHolder);
      var docs = (sp.downloads || []).filter(function (doc) {
        return doc && doc.title;
      });
      if (!docs.length) {
        downloadsHolder.appendChild(
          el("p", { cls: "placeholder-note", text: "No documents are available for this specialisation yet." })
        );
      } else {
        var docList = el("ul", { cls: "doc-list" });
        docs.forEach(function (doc) {
          docList.appendChild(documentRow(doc));
        });
        downloadsHolder.appendChild(docList);
      }
    }

    // Other specialisations
    var othersHolder = document.querySelector('[data-sp="others"]');
    if (othersHolder) {
      clear(othersHolder);
      var others = SPECIALISATIONS.filter(function (item) {
        return item.id !== sp.id;
      });
      var otherGrid = el("div", { cls: "grid grid--2" });
      others.forEach(function (other) {
        otherGrid.appendChild(specialisationCard(other));
      });
      othersHolder.appendChild(otherGrid);
    }
  }

  // 4. Staff directory (search / filter / reset / empty state)
  function renderStaffGroups(container, members) {
    clear(container);

    if (!members.length) {
      var empty = emptyState(
        "No staff match your search",
        "Try a different name or clear the specialisation filter."
      );
      var resetBtn = el("button", {
        cls: "btn btn--outline mt-4",
        text: "Reset filters",
        attrs: { type: "button" }
      });
      resetBtn.addEventListener("click", function () {
        var search = document.getElementById("staff-search");
        var filter = document.getElementById("staff-filter");
        if (search) { search.value = ""; }
        if (filter) { filter.value = ""; }
        applyStaffFilter();
      });
      empty.appendChild(resetBtn);
      container.appendChild(empty);
      return;
    }

    var categories = STAFF.categories || [];
    var grouped = [];
    var rankDesignation = function (d) {
      var designationOrder = (STAFF && STAFF.designationOrder) || {};
      if (d && designationOrder.hasOwnProperty(d)) {
        return designationOrder[d];
      }
      var s = (d || "").toLowerCase();
      if (s.indexOf("senior lecturer gr ii") !== -1 || s.indexOf("gr ii") !== -1) {
        return 0;
      }
      if (s.indexOf("senior lecturer gr i") !== -1 || s.indexOf("gr i") !== -1) {
        return 1;
      }
      if (s.indexOf("lecturer") !== -1 && s.indexOf("senior lecturer") === -1) {
        return 2;
      }
      if (s.indexOf("senior lecturer gr iii") !== -1 || s.indexOf("gr iii") !== -1) {
        return 3;
      }
      return 9;
    };
    var addSection = function (label, group) {
      var section = el("section", { cls: "mt-6" });
      section.appendChild(el("h2", { text: label }));
      var sorted = group.slice().sort(function (a, b) {
        var ra = rankDesignation(a.designation);
        var rb = rankDesignation(b.designation);
        if (ra !== rb) {
          return ra - rb;
        }
        return (a.name || "").localeCompare(b.name || "");
      });
      var grid = el("div", { cls: "grid grid--3 staff-grid" });
      sorted.forEach(function (member) {
        grid.appendChild(buildStaffCard(member, "full"));
      });
      section.appendChild(grid);
      container.appendChild(section);
    };

    categories.forEach(function (category) {
      var group = members.filter(function (member) {
        return member.category === category.id;
      });
      if (!group.length) {
        return;
      }
      grouped = grouped.concat(group);
      addSection(category.label, group);
    });

    // Anyone whose group heading is missing is still shown, so nobody disappears.
    var others = members.filter(function (member) {
      return grouped.indexOf(member) === -1;
    });
    if (others.length) {
      addSection("Other Staff", others);
    }
  }

  function applyStaffFilter() {
    var directory = document.getElementById("staff-directory");
    if (!directory) {
      return;
    }
    var search = document.getElementById("staff-search");
    var filter = document.getElementById("staff-filter");
    var count = document.getElementById("staff-count");

    var query = search ? search.value.trim().toLowerCase() : "";
    var spFilter = filter ? filter.value : "";
    var all = STAFF.members || [];

    var results = all.filter(function (member) {
      if (spFilter && member.category === "head") {
        return false;
      }
      var haystack = ((member.name || "") + " " + (member.designation || "")).toLowerCase();
      if (query && haystack.indexOf(query) === -1) {
        return false;
      }
      if (spFilter && (member.specialisationIds || []).indexOf(spFilter) === -1) {
        return false;
      }
      return true;
    });

    renderStaffGroups(directory, results);

    if (count) {
      var label = results.length === 1 ? "staff member" : "staff members";
      count.textContent = "Showing " + results.length + " of " + all.length + " " + label + ".";
    }
  }

  function initStaffDirectory() {
    var directory = document.getElementById("staff-directory");
    if (!directory) {
      return;
    }
    var search = document.getElementById("staff-search");
    var filter = document.getElementById("staff-filter");
    var reset = document.getElementById("staff-reset");

    if (filter) {
      clear(filter);
      filter.appendChild(el("option", { text: "All specialisations", attrs: { value: "" } }));
      SPECIALISATIONS.forEach(function (sp) {
        filter.appendChild(el("option", { text: sp.name, attrs: { value: sp.id } }));
      });
    }

    if (search) {
      search.addEventListener("input", applyStaffFilter);
    }
    if (filter) {
      filter.addEventListener("change", applyStaffFilter);
    }
    if (reset) {
      reset.addEventListener("click", function () {
        if (search) { search.value = ""; }
        if (filter) { filter.value = ""; }
        applyStaffFilter();
        if (search) { search.focus(); }
      });
    }

    applyStaffFilter();

    // A "View staff profile" link points at #profile-<id>. Open that person's
    // panel so the details are visible straight away instead of staying
    // collapsed.
    var openProfileFromHash = function () {
      var id = (window.location.hash || "").replace(/^#/, "");
      if (!id || id.indexOf("profile-") !== 0) {
        return;
      }
      var card = document.getElementById(id);
      if (!card) {
        return;
      }
      var details = card.querySelector("details");
      if (details) {
        details.open = true;
      }
    };
    openProfileFromHash();
    window.addEventListener("hashchange", openProfileFromHash);
  }

  // 5. Navigation
  function closeAllDropdowns(except) {
    document.querySelectorAll(".has-dropdown.is-open").forEach(function (item) {
      if (item === except) {
        return;
      }
      item.classList.remove("is-open");
      var button = item.querySelector(".nav-sub-toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMobileNav() {
    var nav = document.getElementById("primary-nav");
    var toggle = document.querySelector(".nav-toggle");
    if (!nav) {
      return;
    }
    nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  /** Reset all navigation state (used when crossing the lg breakpoint). */
  function resetNavState() {
    closeAllDropdowns();
    closeMobileNav();
  }

  function initNav() {
    var nav = document.getElementById("primary-nav");
    var toggle = document.querySelector(".nav-toggle");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        if (!isOpen) {
          closeAllDropdowns();
        }
      });
    }

    document.querySelectorAll(".nav-sub-toggle").forEach(function (button) {
      var parent = button.closest(".has-dropdown");
      if (!parent) {
        return;
      }

      button.addEventListener("click", function () {
        var isOpen = parent.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
        closeAllDropdowns(parent);
      });

      button.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          parent.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          var firstLink = parent.querySelector(".dropdown a");
          if (firstLink) {
            firstLink.focus();
          }
        }
      });

      // Close a dropdown when focus leaves it entirely.
      parent.addEventListener("focusout", function (event) {
        if (!parent.contains(event.relatedTarget)) {
          parent.classList.remove("is-open");
          button.setAttribute("aria-expanded", "false");
        }
      });

    // Keep aria-expanded in sync with the CSS hover enhancement.
      parent.addEventListener("mouseenter", function () {
        if (!isSmallScreen() && canHover()) {
          button.setAttribute("aria-expanded", "true");
        }
      });
      parent.addEventListener("mouseleave", function () {
        if (!isSmallScreen() && !parent.classList.contains("is-open")) {
          button.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Escape closes menus and returns focus to the toggling button.
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }
      var openItem = document.querySelector(".has-dropdown.is-open");
      if (openItem) {
        var button = openItem.querySelector(".nav-sub-toggle");
        closeAllDropdowns();
        if (button && document.activeElement && openItem.contains(document.activeElement)) {
          button.focus();
        }
      }
      var navToggle = document.querySelector(".nav-toggle");
      if (nav && nav.classList.contains("is-open")) {
        closeMobileNav();
        if (navToggle) {
          navToggle.focus();
        }
      }
    });

    // Outside click closes dropdowns (desktop) and the mobile panel. NOTE:
    // #primary-nav lives OUTSIDE .site-header, so the nav itself is excluded too.
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) {
        return;
      }
      if (!target.closest(".has-dropdown")) {
        closeAllDropdowns();
      }
      var insideNav = target.closest("#primary-nav") !== null;
      var insideHeader = target.closest(".site-header") !== null;
      if (
        isSmallScreen() &&
        nav &&
        nav.classList.contains("is-open") &&
        !insideNav &&
        !insideHeader
      ) {
        closeMobileNav();
      }
    });

    // Close the mobile panel after following a link.
    if (nav) {
      nav.addEventListener("click", function (event) {
        if (event.target.closest && event.target.closest("a") && isSmallScreen()) {
          closeMobileNav();
        }
      });
    }

    // Crossing the lg breakpoint resets nav state so the desktop layout never
    // inherits a half-open mobile panel.
    if (typeof window.matchMedia === "function") {
      var breakpoint = window.matchMedia("(min-width: 992px)");
      var onBreakpointChange = function () {
        resetNavState();
      };
      if (typeof breakpoint.addEventListener === "function") {
        breakpoint.addEventListener("change", onBreakpointChange);
      } else if (typeof breakpoint.addListener === "function") {
        breakpoint.addListener(onBreakpointChange);
      }
    }
  }

  // 6. Small page utilities
  function setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  /**
   * Keep the CSS variable for the sticky mobile masthead height in sync with the
   * measured height; the masthead, nav panel and breadcrumbs key off it.
   */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) {
      return;
    }
    var apply = function () {
      document.documentElement.style.setProperty(
        "--header-sticky-offset",
        header.offsetHeight + "px"
      );
    };
    apply();
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(apply).observe(header);
    }
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
  }

  /** Progressive enhancement: expose each .table-wrap as a labelled, focusable scroll region. */
  function enhanceTables() {
    document.querySelectorAll(".table-wrap").forEach(function (wrap) {
      if (!wrap.hasAttribute("tabindex")) {
        wrap.setAttribute("tabindex", "0");
      }
      if (!wrap.hasAttribute("role")) {
        wrap.setAttribute("role", "region");
      }
      if (!wrap.hasAttribute("aria-label")) {
        var caption = wrap.querySelector("caption");
        var label = caption ? caption.textContent.trim() : "";
        wrap.setAttribute("aria-label", label || "Scrollable table");
      }
    });
  }

  // 7. Bootstrap
  function boot() {
    // Enables the JS-driven collapsible mobile nav (no-JS keeps links visible).
    document.body.classList.add("has-js");

    initNav();
    renderIdentity();
    renderFacultyIntro();
    renderFacultyMedia();
    renderDepartmentIntro();
    renderDepartmentMedia();
    renderDean();
    renderHod();
    renderAbout();
    renderSpecialisationCards();
    renderSpecialisationLinks();
    renderSpecialisationNav();
    renderFacilities();
    renderResearch();
    renderNews();
    initNews();
    renderAcademicOverview();
    renderDownloads();
    renderContact();
    renderFooterContact();
    initStaffDirectory();
    setCurrentYear();
    enhanceTables();
    initStickyHeader();

    var spId = document.body.getAttribute("data-specialisation");
    if (spId) {
      renderSpecialisationPage(spId);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
