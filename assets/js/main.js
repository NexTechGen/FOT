/* ============================================================================
 * main.js — the site engine (do not edit)
 * Department of Engineering Technology, Faculty of Technology, University of Jaffna
 *
 * This file makes the menu and pages work. Please do NOT change it.
 * To change the website text, edit these files instead:
 *   content.js, specialisations.js, research.js, news.js, downloads.js, staff.js
 *
 * Full help: see docs/ADMIN_GUIDE.md
 * ==========================================================================*/

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
   * 0. Data references + tiny helpers
   * ------------------------------------------------------------------------*/
  var CONTENT = window.DEPARTMENT_CONTENT || {};
  var STAFF = window.DEPARTMENT_STAFF || { categories: [], members: [] };
  var SPECIALISATIONS = CONTENT.specialisations || [];
  var FACILITIES = CONTENT.facilities || [];
  var DOWNLOADS = CONTENT.downloads || [];
  var NEWS = CONTENT.news || [];
  var RESEARCH = CONTENT.research || { items: [] };

  /* URL schemes that are acceptable for each kind of field. Anything else
   * (javascript:, vbscript:, data:, ...) is rejected so a data file can never
   * inject executable links. */
  var LINK_SCHEMES = { "http:": true, "https:": true, "mailto:": true, "tel:": true };
  var IMAGE_SCHEMES = { "http:": true, "https:": true };

  /** Return the lower-case scheme (e.g. "https:") of a URL, or "" if none. */
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
   * kind: "link" (default) allows http/https/mailto/tel; "image" allows only
   * http/https. Returns "" for missing or disallowed values so callers can
   * fall back to an unavailable state instead of emitting a broken link.
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

  /* --------------------------------------------------------------------------
   * Inline SVG icons (Lucide, ISC licence), stored as <path> data so they can
   * be created with the DOM API only — no innerHTML is ever used. content.js
   * may set `icon` on academic tiles to any name below; anything unknown
   * falls back to DEFAULT_ICON.
   * ------------------------------------------------------------------------*/
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

  /* --------------------------------------------------------------------------
   * Brand/social icons (Simple Icons, CC0). These are filled single-path
   * glyphs drawn on a 24x24 viewBox, rendered with `fill: currentColor`
   * instead of the stroked app icons above.
   * ------------------------------------------------------------------------*/
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

  /** Build an inline <svg> icon (decorative). Returns null when name is empty. */
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
   * Every document a specialisation lists as a "related download". These are
   * shown on the specialisation's own page AND collected into the E-Resources
   * "Programme Documents" section, so they stay in sync automatically.
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
   * Every download entry across every section (including the specialisation
   * documents), flattened — used for id lookups from specialisation pages.
   */
  function allDownloads() {
    var entries = [];
    var seen = {};
    function add(entry) {
      if (!entry || entry.id == null || seen[entry.id]) {
        return;
      }
      seen[entry.id] = true;
      entries.push(entry);
    }
    specialisationDownloads().forEach(add);
    (DOWNLOADS || []).forEach(function (section) {
      ((section && section.documents) || []).forEach(add);
    });
    return entries;
  }

  /**
   * Ordered download sections for the E-Resources page: the auto-collected
   * "Programme Documents" first, then every admin-defined section in order.
   * Empty sections are dropped so no heading is shown without content.
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

  function getDownloadById(id) {
    var entries = allDownloads();
    for (var i = 0; i < entries.length; i += 1) {
      if (entries[i].id === id) {
        return entries[i];
      }
    }
    return null;
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

  /**
   * True when the viewport is in the mobile-navigation range. This matches the
   * CSS breakpoint exactly: the collapsible nav is used below lg (992px).
   */
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

  /* --------------------------------------------------------------------------
   * 1. Reusable component builders
   * ------------------------------------------------------------------------*/

  function staffAvatar(member) {
    var wrap = el("span", { cls: "avatar" });
    var photoSrc = resolve(member.photo, "image");
    if (photoSrc) {
      var img = el("img", {
        attrs: {
          src: photoSrc,
          alt: "Portrait of " + member.name,
          width: "64",
          height: "64",
          loading: "lazy",
          decoding: "async"
        }
      });
      // A broken photo falls back to the same initials avatar used when no
      // photo is supplied. `once` removes the listener after the first error,
      // so there is no possibility of an error loop.
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

  /**
   * Staff card. variant: "full" (directory) or "compact".
   */
  function buildStaffCard(member, variant) {
    var card = el("article", { cls: "staff-card" });
    card.id = "profile-" + member.id;

    var head = el("div", { cls: "staff-card__head", children: [staffAvatar(member)] });
    var nameWrap = el("div", {
      children: [
        el("h3", { cls: "staff-card__name", text: member.name }),
        el("p", { cls: "staff-card__designation", text: member.designation || "" })
      ]
    });
    head.appendChild(nameWrap);
    card.appendChild(head);

    var affiliations = specialisationsForStaff(member);
    if (affiliations.length) {
      var tags = el("div", { cls: "staff-card__tags" });
      affiliations.forEach(function (sp) {
        tags.appendChild(el("span", { cls: "tag", text: sp.name }));
      });
      card.appendChild(tags);
    }

    if (variant === "compact") {
      if (isRealEmail(member.email)) {
        var contact = el("p", { cls: "staff-card__meta" });
        contact.appendChild(el("a", { text: member.email, attrs: { href: "mailto:" + member.email } }));
        card.appendChild(contact);
      }
      var compactProfile = staffProfileLink(member);
      if (compactProfile) {
        card.appendChild(compactProfile);
      }
      return card;
    }

    var details = document.createElement("details");
    details.className = "disclosure";
    var summary = el("summary", { text: "Contact and details" });
    details.appendChild(summary);

    var dl = el("dl", { cls: "staff-card__meta" });
    addMetaRow(dl, "Qualifications", member.qualifications ? el("span", { text: member.qualifications }) : null);
    if (affiliations.length) {
      addMetaRow(
        dl,
        "Specialisations",
        el("span", {
          text: affiliations
            .map(function (sp) {
              return sp.name;
            })
            .join(", ")
        })
      );
    }
    addMetaRow(dl, "Email", emailNode(member.email));
    addMetaRow(
      dl,
      "Research interests",
      member.researchInterests ? el("span", { text: member.researchInterests }) : null
    );
    details.appendChild(dl);
    card.appendChild(details);

    var fullProfile = staffProfileLink(member);
    if (fullProfile) {
      card.appendChild(fullProfile);
    }

    return card;
  }

  /**
   * Link to a person's full entry on the staff directory. Only shown on the
   * specialisation pages, where each card is a short summary rather than the
   * profile itself.
   */
  function staffProfileLink(member) {
    if (!document.body.getAttribute("data-specialisation")) {
      return null;
    }
    return el("p", { cls: "staff-card__profile", children: [
      el("a", {
        cls: "link-more",
        text: "View staff profile",
        attrs: { href: resolve("pages/staff.html") + "#profile-" + member.id }
      })
    ] });
  }

  function buildMessageBlock(options) {
    var block = el("div", { cls: "message-block" + (options.tint ? " message-block--tint" : "") });

    var media = el("div", { cls: "message-block__media" });
    var placeholder = resolve("assets/images/placeholder-portrait.svg", "image");
    var imgSrc = resolve(options.photo, "image") || placeholder;
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
    // A supplied-but-broken photo must not leave a broken image. `once` removes
    // the listener after the first error, so there can never be an error loop
    // even if the placeholder itself fails to load.
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

    if (options.footerLink) {
      body.appendChild(options.footerLink);
    }

    append(block, [media, body]);
    return block;
  }

  function specialisationCard(sp) {
    var card = el("article", { cls: "card" });

    var media = el("div", { cls: "card__media", children: [
      el("img", {
        attrs: {
          src: resolve(sp.image, "image") || resolve("assets/images/placeholder-department.svg", "image"),
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
          src: resolve(facility.image, "image") || resolve("assets/images/placeholder-lab.svg", "image"),
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

  /* --------------------------------------------------------------------------
   * 2. Rendering functions (each no-ops when its target is absent)
   * ------------------------------------------------------------------------*/

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
   * Faculty photograph. The markup ships with the placeholder SVG as a no-JS
   * fallback; when the data supplies a usable image, the src/alt are updated so
   * content.js stays the single editable source.
   */
  function renderFacultyMedia() {
    var targets = document.querySelectorAll('[data-render="faculty-image"]');
    if (!targets.length) {
      return;
    }
    var faculty = CONTENT.faculty || {};
    var src = resolve(faculty.image, "image");
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
   * Department photograph. Shown in the homepage department section and the
   * About page's academic-organisation panel. The placeholder SVG is the no-JS
   * fallback; a usable data value updates src/alt.
   */
  function renderDepartmentMedia() {
    var targets = document.querySelectorAll('[data-render="department-image"]');
    if (!targets.length) {
      return;
    }
    var department = CONTENT.department || {};
    var src = resolve(department.image, "image");
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
   * Institution / faculty / department identity text. This is the single
   * editable source for the masthead brand, the homepage hero headings and the
   * contact page identity line. The static HTML ships with the same wording so
   * the pages still read correctly without JavaScript.
   */
  function renderIdentity() {
    var institution = CONTENT.institution || {};
    var faculty = CONTENT.faculty || {};
    var department = CONTENT.department || {};
    var contact = CONTENT.contact || {};
    var fields = [
      ["institution-university", institution.university],
      ["institution-department", institution.department],
      ["institution-faculty", institution.faculty],
      ["faculty-label", faculty.label],
      ["faculty-heading", faculty.heading],
      ["department-heading", department.heading],
      ["contact-department-line", contact.departmentLine],
      ["contact-faculty-line", contact.facultyLine]
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
   * Specialisation names in the existing navigation and footer link lists
   * (identified by data-sp-link="sp-0X"). The visible text is always refreshed
   * from the data; the link target is only rewritten when it resolves to a
   * valid URL, so a bad value can never break the (no-JS-equivalent) links.
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
      link = el("p", { cls: "mt-0", children: [
        el("a", {
          cls: "link-more",
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
   * About page body text. The academic-organisation block (heading, intro,
   * overview link, image) is fully driven from CONTENT.about.organisation;
   * the specialisation links underneath come from renderSpecialisationLinks.
   * Vision / mission / history each no-op when their target is absent.
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

    var orgLink = document.querySelector('[data-render="about-organisation-link"]');
    if (orgLink) {
      clear(orgLink);
      var href = resolve(org.linkUrl, "link");
      if (href && org.linkText) {
        orgLink.appendChild(
          el("a", { cls: "link-more", text: org.linkText, attrs: { href: href } })
        );
      }
    }

    var orgImage = document.querySelector('[data-render="about-organisation-image"]');
    if (orgImage) {
      var src = resolve(org.image, "image");
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

  // Small screens show one specialisation card at a time, centred, swiped
  // left/right. The dots below track the scroll position and jump to a card.
  // CSS hides the dots from 768px up, where the same grid lays the cards out
  // as columns instead.
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

    var buttons = cards.map(function (card, index) {
      var title = card.querySelector(".card__title");
      var name = (title && title.textContent) || "Specialisation " + (index + 1);
      var button = el("button", {
        cls: "sp-dots__btn",
        attrs: { type: "button", "aria-label": "Show: " + name }
      });
      button.addEventListener("click", function () {
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
      buttons.forEach(function (button, index) {
        if (index === active) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      });
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
      var list = el("ul", { cls: "checklist" });
      SPECIALISATIONS.forEach(function (sp) {
        var href = resolve(sp.pageUrl, "link");
        list.appendChild(
          el("li", { children: [
            href
              ? el("a", { text: sp.name, attrs: { href: href } })
              : el("span", { cls: "placeholder-note", text: sp.name })
          ] })
        );
      });
      target.appendChild(list);
    });
  }

  // Academics > "Study areas and specialisations": each specialisation is a
  // single browsable card whose whole surface is the link, so the hit area
  // matches what is visible (the footer hint sits inside the same anchor).
  // No image here — the cards carry the name, description and curriculum link.
  // On small screens the cards swiper left/right exactly like the home page
  // specialisation cards (same .sp-scroller / .sp-dots behaviour). Falls back
  // to a static card when a page URL is unavailable.
  function renderSpecialisationShowcase() {
    var target = document.querySelector('[data-render="specialisation-showcase"]');
    if (!target) {
      return;
    }
    clear(target);
    var grid = el("div", {
      cls: "grid grid--3 sp-scroller",
      attrs: { tabindex: "0", role: "group", "aria-label": "Study areas and specialisations" }
    });
    SPECIALISATIONS.forEach(function (sp, index) {
      grid.appendChild(studyAreaCard(sp, index));
    });
    target.appendChild(grid);
    initialiseSpecialisationCarousel(target, grid);
  }

  function studyAreaCard(sp, index) {
    var href = resolve(sp.pageUrl, "link");

    var body = el("div", { cls: "card__body", children: [
      el("p", { cls: "eyebrow", text: "Specialisation " + (index + 1 < 10 ? "0" : "") + (index + 1) }),
      el("h3", { cls: "card__title", text: sp.name }),
      sp.description ? el("p", { cls: "card__text", text: sp.description }) : null,
      el("p", { cls: "card__footer", children: [
        href
          ? el("span", { cls: "link-more", text: "View curriculum" })
          : el("span", { cls: "placeholder-note", text: "Curriculum coming soon" })
      ] })
    ] });

    if (!href) {
      return el("div", { cls: "card card--plain", children: [body] });
    }
    return el("a", { cls: "card card--link", attrs: { href: href }, children: [body] });
  }

  function renderFacilities() {
    var targets = document.querySelectorAll('[data-render="facilities"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      var attr = target.getAttribute("data-limit");
      var limit = attr ? parseInt(attr, 10) : NaN;
      var items = isFinite(limit) && limit > 0 ? FACILITIES.slice(0, limit) : FACILITIES.slice();
      if (!items.length) {
        target.appendChild(emptyState("Facilities coming soon", "Laboratory and facility information has not been published yet."));
        return;
      }
      var list = el("div", { cls: "feature-list" });
      items.forEach(function (facility) {
        list.appendChild(facilityCard(facility));
      });
      target.appendChild(list);
    });
  }

  /**
   * Build one research/publication entry as a publication card.
   * entry: { title, authors, type, venue, year, status, specialisationIds, url }
   * `withSpec` adds specialisation tags (used on the Research page).
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

  /** Look up a research entry's specialisation names for the specialisation
   *  page filter (a specialisation page calls this with its own id). */
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
      target.appendChild(el("div", { cls: "research-results", attrs: { id: "research-results" } }));
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
   * Full-notice modal. One shared <dialog> is created lazily and filled with
   * the clicked notice: subject, full body and an optional download link.
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

    // Older browsers without <dialog> support only get the plain "open"
    // attribute, so closing has to fall back to removing it.
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
          // history.replaceState can throw on file:// or sandboxed documents;
          // falling back to clearing the hash directly keeps things working.
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
      // showModal() throws InvalidStateError if the dialog is already open
      // (e.g. a hashchange fires while the modal is showing).
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
                el("span", { cls: "tile__more-label", text: "Learn more" }),
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

  /**
   * Academics page body (pages/academics.html). Every field no-ops when its
   * target is absent; the static HTML inside each hook remains the no-JS
   * fallback. The showcase and the specialisation tags are built from
   * SPECIALISATIONS so renamed specialisations stay in sync automatically.
   */
  function renderAcademicsPage() {
    var page = CONTENT.academics || {};

    var overview = page.overview || {};
    var overviewIntro = document.querySelector('[data-render="academics-overview"]');
    if (overviewIntro && (overview.intro || []).length) {
      clear(overviewIntro);
      overview.intro.forEach(function (text) {
        overviewIntro.appendChild(el("p", { text: text }));
      });
    }
    var overviewNote = document.querySelector('[data-render="academics-overview-note"]');
    if (overviewNote && overview.note) {
      overviewNote.textContent = overview.note;
    }

    var studyIntro = document.querySelector('[data-render="academics-study-intro"]');
    if (studyIntro && page.studyAreas && page.studyAreas.intro) {
      studyIntro.textContent = page.studyAreas.intro;
    }

    var curriculum = page.curriculum || {};
    var curIntro = document.querySelector('[data-render="academics-curriculum-intro"]');
    if (curIntro && curriculum.intro) {
      curIntro.textContent = curriculum.intro;
    }

    var curProse = document.querySelector('[data-render="academics-curriculum-prose"]');
    if (curProse && (curriculum.prose || []).length) {
      clear(curProse);
      curriculum.prose.forEach(function (text) {
        curProse.appendChild(el("p", { text: text }));
      });
    }

    var steps = document.querySelector('[data-render="academics-steps"]');
    if (steps && (curriculum.steps || []).length) {
      clear(steps);
      curriculum.steps.forEach(function (step, index) {
        steps.appendChild(
          el("li", { cls: "path__step", children: [
            el("span", { cls: "path__marker", text: String(index + 1), attrs: { "aria-hidden": "true" } }),
            el("div", { cls: "path__body", children: [
              el("p", { cls: "path__meta", text: step.meta || "" }),
              el("h3", { cls: "path__title", text: step.title || "" }),
              el("p", { cls: "path__text", text: step.text || "" })
            ] })
          ] })
        );
      });
    }

    var tagsLabel = document.querySelector('[data-render="academics-tags-label"]');
    if (tagsLabel && curriculum.tagsLabel) {
      tagsLabel.textContent = curriculum.tagsLabel;
    }

    var tags = document.querySelector('[data-render="academics-tags"]');
    if (tags && SPECIALISATIONS.length) {
      clear(tags);
      SPECIALISATIONS.forEach(function (sp) {
        var href = resolve(sp.pageUrl, "link");
        if (!href) {
          return;
        }
        tags.appendChild(
          el("li", { children: [ el("a", { cls: "tag", text: sp.name, attrs: { href: href } }) ] })
        );
      });
    }
  }

  /**
   * One collapsible E-Resources section: a <details class="doc-group"> with a
   * <summary> heading and the document list inside.
   */
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
      var addrLines = (c.address || []).filter(Boolean);
      if (!addrLines.length) {
        addrValue = el("span", { cls: "placeholder-note", text: "[Address to be added]" });
      } else {
        var addrText = addrLines.join(", ");
        addrValue = addrText.indexOf("[") > -1
          ? el("span", { cls: "placeholder-note", text: addrText })
          : el("span", { text: addrText });
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

    // Location map (contact page aside). Renders an <iframe> from the embed URL
    // in content.js; a blank/invalid URL shows a neutral placeholder instead of
    // an empty frame.
    var mapTarget = document.querySelector('[data-render="contact-map"]');
    if (mapTarget) {
      clear(mapTarget);
      var mapSrc = resolve(c.mapEmbedUrl, "link");
      if (mapSrc) {
        mapTarget.appendChild(
          el("iframe", {
            cls: "contact-map__frame",
            attrs: {
              src: mapSrc,
              title: c.mapTitle || "Department location map",
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

  /* --------------------------------------------------------------------------
   * 2b. Footer contact block (every page)
   *     Renders the footer "Contact us" column from CONTENT.contact — the SAME
   *     block that drives the contact page — so the address, telephone, email
   *     and social links live in one place. Both the column heading and its
   *     content are produced here (the heading uses `title`, defaulting to
   *     "Contact us"). Placeholders and unsafe URLs are handled exactly like the
   *     contact page: real values become links, an unresolved value is shown as
   *     plain text, and an unsupported social entry is skipped rather than
   *     emitting a broken icon.
   * ------------------------------------------------------------------------*/
  function renderFooterContact() {
    var targets = document.querySelectorAll('[data-render="footer-contact"]');
    if (!targets.length) {
      return;
    }
    var c = CONTENT.contact || {};
    var lines = c.address || [];

    targets.forEach(function (target) {
      clear(target);

      // Heading — rendered from the same JS section as the content below.
      target.appendChild(
        el("h2", { cls: "footer__title", text: c.footerTitle || "Contact us" })
      );

      var box = el("div", { cls: "footer__address" });

      // Address — one <br>-separated line per entry.
      if (lines.length) {
        var p = el("p");
        lines.forEach(function (line, index) {
          if (index > 0) {
            p.appendChild(el("br"));
          }
          p.appendChild(document.createTextNode(String(line)));
        });
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

  /* --------------------------------------------------------------------------
   * 3. Specialisation page rendering
   * ------------------------------------------------------------------------*/
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
    setText("intro", sp.intro || "");
    setText("curriculum-note", sp.curriculumNote || "");

    var imageTarget = document.querySelector('[data-sp="image"]');
    if (imageTarget) {
      imageTarget.setAttribute(
        "src",
        resolve(sp.image, "image") || resolve("assets/images/placeholder-department.svg", "image")
      );
      imageTarget.setAttribute("alt", sp.imageAlt || ("Image for " + sp.name));
    }

    // Overview paragraphs
    var overview = document.querySelector('[data-sp="overview"]');
    if (overview) {
      clear(overview);
      (sp.overview || []).forEach(function (paragraph) {
        overview.appendChild(el("p", { text: paragraph }));
      });
    }

    // Curriculum
    var curriculum = document.querySelector('[data-sp="curriculum"]');
    if (curriculum) {
      clear(curriculum);
      var sections = sp.curriculum || [];
      if (!sections.length) {
        curriculum.appendChild(
          el("p", { text: "Curriculum information has not been supplied yet." })
        );
      } else {
        sections.forEach(function (block) {
          var wrap = el("div", { cls: "mt-4" });
          wrap.appendChild(el("h3", { text: block.title }));
          var ul = el("ul", { cls: "checklist" });
          (block.items || []).forEach(function (item) {
            var li = el("li");
            if (typeof item === "string") {
              li.textContent = item;
            } else if (item && typeof item === "object") {
              var label = item.name || "";
              if (item.code) {
                label += (label ? " - " : "") + item.code;
              }
              li.textContent = label;
              var docHref = resolve(item.doc, "link");
              if (docHref) {
                li.appendChild(
                  el("a", {
                    cls: "checklist__doc",
                    text: "Download curriculum",
                    attrs: { href: docHref, target: "_blank", rel: "noopener" }
                  })
                );
              }
            }
            ul.appendChild(li);
          });
          wrap.appendChild(ul);
          curriculum.appendChild(wrap);
        });
      }
    }

    // Coordinator
    var coordinator = document.querySelector('[data-sp="coordinator"]');
    if (coordinator) {
      clear(coordinator);
      var coord = getStaffById(sp.coordinatorStaffId);
      if (coord) {
        var card = buildStaffCard(coord, "compact");
        var head = card.querySelector(".staff-card__head");
        var roleText = "Specialisation Coordinator";
        // The card already shows the member's designation; only add the
        // coordinator role label when it is not already displayed.
        var alreadyShown = false;
        Array.prototype.forEach.call(
          head.querySelectorAll(".staff-card__designation"),
          function (node) {
            if (node.textContent.trim() === roleText) {
              alreadyShown = true;
            }
          }
        );
        if (!alreadyShown) {
          head.appendChild(el("p", { cls: "staff-card__designation", text: roleText }));
        }
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
      var associated = staffForSpecialisation(sp.id, { excludeId: sp.coordinatorStaffId });
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
      var labs = (sp.laboratoryIds || []).map(getFacilityById).filter(Boolean);
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
      researchHolder.appendChild(researchSection(spItems, false));
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

  /* --------------------------------------------------------------------------
   * 4. Staff directory (search / filter / reset / empty state)
   * ------------------------------------------------------------------------*/
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
    var addSection = function (label, group) {
      var section = el("section", { cls: "mt-6" });
      section.appendChild(el("h2", { text: label }));
      var grid = el("div", { cls: "grid grid--3" });
      group.forEach(function (member) {
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

    // Anyone whose group heading is missing from the list above is still shown
    // at the end, so a person can never quietly disappear from the directory.
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

  /* --------------------------------------------------------------------------
   * 5. Navigation
   * ------------------------------------------------------------------------*/
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

      // Keep aria-expanded in sync with the CSS hover enhancement so screen
      // readers agree with what mouse users see.
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

    // Outside click closes dropdowns (desktop) and the mobile panel.
    // NOTE: #primary-nav lives OUTSIDE .site-header, so the nav itself must be
    // excluded too — otherwise tapping a sub-menu toggle inside the open panel
    // would immediately close the whole panel.
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
    // inherits a half-open mobile panel (or a stale dropdown).
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

  /* --------------------------------------------------------------------------
   * 6. Small page utilities
   * ------------------------------------------------------------------------*/
  function setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  /**
   * Keep the CSS variable for the sticky mobile masthead height in sync with
   * the real measured height (the brand text can wrap at very narrow widths).
   * The masthead, the nav panel and the breadcrumbs all key off this value.
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

  /**
   * Progressive enhancement for horizontally scrollable tables: expose each
   * .table-wrap as a labelled, keyboard-focusable scroll region.
   */
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

  /* --------------------------------------------------------------------------
   * 7. Bootstrap
   * ------------------------------------------------------------------------*/
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
    renderSpecialisationShowcase();
    renderSpecialisationNav();
    renderFacilities();
    renderResearch();
    renderNews();
    initNews();
    renderAcademicOverview();
    renderAcademicsPage();
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
