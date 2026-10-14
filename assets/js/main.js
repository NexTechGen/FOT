/* ============================================================================
 * main.js — Behaviour + rendering for the Department of Engineering Technology
 * ----------------------------------------------------------------------------
 * Loaded with `defer` AFTER content.js and staff.js.
 *
 * Responsibilities
 *   1. Accessible navigation: mobile menu, click + keyboard dropdowns,
 *      Escape to close, outside-click to close, focus management.
 *   2. Render repeated content from the shared data sources:
 *      DEPARTMENT_CONTENT (content.js) and DEPARTMENT_STAFF (staff.js).
 *   3. Staff directory search / specialisation filter / reset / empty state.
 *   4. Specialisation page rendering (driven by body[data-specialisation]).
 *
 * All text is inserted with textContent (never innerHTML) so the data files
 * can never inject markup.
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
  var RESEARCH = CONTENT.research || { themes: [], projects: [], publications: [] };

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
    return parseInt(match[3], 10) + " " + months[parseInt(match[2], 10) - 1] + " " + match[1];
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

  function getDownloadById(id) {
    for (var i = 0; i < DOWNLOADS.length; i += 1) {
      if (DOWNLOADS[i].id === id) {
        return DOWNLOADS[i];
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

  function categoryLabel(id) {
    var cats = STAFF.categories || [];
    for (var i = 0; i < cats.length; i += 1) {
      if (cats[i].id === id) {
        return cats[i].label;
      }
    }
    return id;
  }

  /**
   * True when the viewport is in the mobile-navigation range. This matches the
   * CSS breakpoint exactly: the collapsible nav is used below lg (992px).
   */
  function isSmallScreen() {
    if (typeof window.matchMedia === "function") {
      return window.matchMedia("(max-width: 991px)").matches;
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
      append(wrap, [
        el("img", {
          attrs: {
            src: photoSrc,
            alt: "Portrait of " + member.name,
            width: "64",
            height: "64",
            loading: "lazy",
            decoding: "async"
          }
        })
      ]);
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

    return card;
  }

  function buildMessageBlock(options) {
    var block = el("div", { cls: "message-block" + (options.tint ? " message-block--tint" : "") });

    var media = el("div", { cls: "message-block__media" });
    var imgSrc = resolve(options.photo, "image") ||
      resolve("assets/images/placeholder-portrait.svg", "image");
    media.appendChild(
      el("img", {
        attrs: {
          src: imgSrc,
          alt: options.photoAlt || ("Placeholder portrait of " + options.name),
          width: "600",
          height: "750",
          loading: "lazy",
          decoding: "async"
        }
      })
    );

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

  function renderDepartmentIntro() {
    var target = document.querySelector('[data-render="department-intro"]');
    if (target) {
      clear(target);
      var intro = (CONTENT.department && CONTENT.department.intro) || [];
      intro.forEach(function (paragraph) {
        target.appendChild(el("p", { text: paragraph }));
      });
    }
    var focus = document.querySelector('[data-render="department-focus"]');
    if (focus) {
      clear(focus);
      var focusText = (CONTENT.department && CONTENT.department.focus) || "";
      focus.appendChild(el("p", { cls: "prose", text: focusText }));
    }
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
      message: dean.message || [],
      tint: true
    });
    target.appendChild(full);

    // Surface the approved Faculty introduction labels used on the cards
    var note = document.querySelector('[data-render="dean-note"]');
    if (note) {
      clear(note);
      note.textContent =
        CONTENT.faculty && CONTENT.faculty.deptNote ? CONTENT.faculty.deptNote : "";
    }
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
          attrs: { href: resolve("staff/") + "#profile-" + hod.id }
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
        photoAlt: "Placeholder portrait of the Head of Department",
        message: content.message || [],
        footerLink: link
      })
    );
  }

  function renderSpecialisationCards() {
    var target = document.querySelector('[data-render="specialisations"]');
    if (!target) {
      return;
    }
    clear(target);
    var grid = el("div", { cls: "grid grid--3" });
    SPECIALISATIONS.forEach(function (sp) {
      grid.appendChild(specialisationCard(sp));
    });
    target.appendChild(grid);
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

  function renderStaffPreview() {
    var target = document.querySelector('[data-render="staff-preview"]');
    if (!target) {
      return;
    }
    clear(target);
    var members = (STAFF.members || []).slice(0, 4);
    if (!members.length) {
      target.appendChild(emptyState("Staff directory coming soon", "Staff records have not been published yet."));
      return;
    }
    var grid = el("div", { cls: "grid grid--4" });
    members.forEach(function (member) {
      grid.appendChild(buildStaffCard(member, "compact"));
    });
    target.appendChild(grid);
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

  function researchSection() {
    var wrap = el("div", { cls: "flow" });

    if (RESEARCH.intro) {
      wrap.appendChild(el("p", { cls: "prose", text: RESEARCH.intro }));
    }

    var themes = RESEARCH.themes || [];
    if (themes.length) {
      wrap.appendChild(el("h3", { text: "Research themes" }));
      var themeGrid = el("div", { cls: "grid grid--3" });
      themes.forEach(function (theme) {
        var card = el("div", { cls: "card card--plain" });
        var body = el("div", { cls: "card__body" });
        body.appendChild(el("h4", { cls: "card__title", text: theme.title }));
        body.appendChild(el("p", { cls: "card__text", text: theme.description }));
        card.appendChild(body);
        themeGrid.appendChild(card);
      });
      wrap.appendChild(themeGrid);
    }

    var projects = RESEARCH.projects || [];
    if (projects.length) {
      wrap.appendChild(el("h3", { text: "Student projects" }));
      var projectList = el("div", { cls: "grid grid--2" });
      projects.forEach(function (project) {
        var card = el("div", { cls: "card card--plain" });
        var body = el("div", { cls: "card__body" });
        body.appendChild(el("h4", { cls: "card__title", text: project.title }));
        body.appendChild(el("p", { cls: "card__text", text: project.description }));
        card.appendChild(body);
        projectList.appendChild(card);
      });
      wrap.appendChild(projectList);
    }

    var publications = RESEARCH.publications || [];
    if (publications.length) {
      wrap.appendChild(el("h3", { text: "Publications" }));
      var pubList = el("ul", { cls: "checklist" });
      publications.forEach(function (pub) {
        pubList.appendChild(el("li", { text: pub.title }));
      });
      wrap.appendChild(pubList);
    }

    if (!themes.length && !projects.length && !publications.length) {
      wrap.appendChild(
        emptyState(
          "Research information coming soon",
          "Research themes, projects and publications will be published here once verified by the department."
        )
      );
    }

    return wrap;
  }

  function renderResearch() {
    var targets = document.querySelectorAll('[data-render="research"]');
    if (!targets.length) {
      return;
    }
    targets.forEach(function (target) {
      clear(target);
      target.appendChild(researchSection());
    });
  }

  function newsSection(limit) {
    var wrap = el("div", { cls: "grid grid--2" });
    if (!NEWS.length) {
      return emptyState(
        "No announcements published yet",
        "News and events will appear here once they are published by the department. Please check back later."
      );
    }
    NEWS.slice(0, limit || NEWS.length).forEach(function (item) {
      var card = el("a", { cls: "news-item", attrs: { href: resolve("news/") + "#" + item.id } });
      var meta = el("div", { cls: "news-item__meta", children: [
        el("span", { cls: "news-item__date", text: formatDate(item.date) }),
        el("span", { cls: "badge", text: item.category || "News" })
      ] });
      card.appendChild(meta);
      card.appendChild(el("h3", { cls: "news-item__title", text: item.title }));
      card.appendChild(el("p", { cls: "news-item__text", text: item.summary || "" }));
      wrap.appendChild(card);
    });
    return wrap;
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
          el("h3", { cls: "tile__title", text: item.title }),
          el("p", { cls: "tile__text", text: item.description }),
          el("span", { cls: "tile__more", text: "Learn more" })
        ];
        grid.appendChild(
          href
            ? el("a", { cls: "tile", attrs: { href: href }, children: children })
            : el("div", { cls: "tile", children: children })
        );
      });
      target.appendChild(grid);
    });
  }

  function renderDownloads() {
    var target = document.querySelector('[data-render="downloads"]');
    if (!target) {
      return;
    }
    clear(target);

    if (!DOWNLOADS.length) {
      target.appendChild(emptyState("No documents available", "Documents will be listed here once they are published."));
      return;
    }

    var order = [];
    var groups = {};
    DOWNLOADS.forEach(function (doc) {
      var cat = doc.category || "Documents";
      if (!groups[cat]) {
        groups[cat] = [];
        order.push(cat);
      }
      groups[cat].push(doc);
    });

    order.forEach(function (cat) {
      var section = el("section", { cls: "mt-6" });
      section.appendChild(el("h2", { text: cat }));
      var list = el("ul", { cls: "doc-list" });
      groups[cat].forEach(function (doc) {
        list.appendChild(documentRow(doc));
      });
      section.appendChild(list);
      target.appendChild(section);
    });
  }

  function renderContact() {
    var targets = document.querySelectorAll('[data-render="contact"]');
    if (!targets.length) {
      return;
    }
    var c = CONTENT.contact || {};
    targets.forEach(function (target) {
      clear(target);

      var addressText = (c.address || []).filter(Boolean).join(", ");
      var addressNode = addressText.indexOf("[") > -1
        ? el("span", { cls: "placeholder-note", text: addressText || "[Address to be added]" })
        : el("span", { text: addressText });

      var dl = el("dl", { cls: "contact-list" });

      dl.appendChild(el("dt", { text: "Address" }));
      var addrDd = el("dd");
      addrDd.appendChild(addressNode);
      dl.appendChild(addrDd);

      dl.appendChild(el("dt", { text: "Email" }));
      var emailDd = el("dd");
      if (isRealEmail(c.email)) {
        emailDd.appendChild(el("a", { text: c.email, attrs: { href: "mailto:" + c.email } }));
      } else {
        emailDd.appendChild(el("span", { cls: "placeholder-note", text: c.email || "[Email to be added]" }));
      }
      dl.appendChild(emailDd);

      dl.appendChild(el("dt", { text: "Telephone" }));
      var phoneDd = el("dd");
      if (isRealPhone(c.phone)) {
        phoneDd.appendChild(
          el("a", { text: c.phone, attrs: { href: "tel:" + String(c.phone).replace(/[^0-9+]/g, "") } })
        );
      } else {
        phoneDd.appendChild(el("span", { cls: "placeholder-note", text: c.phone || "[Telephone to be added]" }));
      }
      dl.appendChild(phoneDd);

      target.appendChild(dl);

      var mapHref = resolve(c.mapUrl, "link");
      if (mapHref) {
        target.appendChild(
          el("p", { cls: "mt-4", children: [
            el("a", {
              cls: "link-more",
              text: "Open location on map",
              attrs: { href: mapHref, target: "_blank", rel: "noopener" }
            })
          ] })
        );
      } else {
        target.appendChild(
          el("p", { cls: "mt-4", children: [
            el("span", { cls: "placeholder-note", text: c.mapLabel || "[Map link pending verification]" })
          ] })
        );
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
    setText("intro", sp.intro);
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

    // Study areas
    var study = document.querySelector('[data-sp="study-areas"]');
    if (study) {
      clear(study);
      var list = el("ul", { cls: "checklist" });
      (sp.studyAreas || []).forEach(function (area) {
        list.appendChild(el("li", { text: area }));
      });
      study.appendChild(list);
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
            ul.appendChild(el("li", { text: item }));
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
      var projects = r.projects || [];
      if (projects.length) {
        var projectList = el("div", { cls: "grid grid--2" });
        projects.forEach(function (project) {
          var card2 = el("div", { cls: "card card--plain" });
          var body2 = el("div", { cls: "card__body" });
          body2.appendChild(el("h4", { cls: "card__title", text: project }));
          card2.appendChild(body2);
          projectList.appendChild(card2);
        });
        researchHolder.appendChild(projectList);
      }
    }

    // Downloads
    var downloadsHolder = document.querySelector('[data-sp="downloads"]');
    if (downloadsHolder) {
      clear(downloadsHolder);
      var docs = (sp.downloadIds || []).map(getDownloadById).filter(Boolean);
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
    categories.forEach(function (category) {
      var group = members.filter(function (member) {
        return member.category === category.id;
      });
      if (!group.length) {
        return;
      }
      var section = el("section", { cls: "mt-6" });
      section.appendChild(el("h2", { text: category.label }));
      var grid = el("div", { cls: "grid grid--3" });
      group.forEach(function (member) {
        grid.appendChild(buildStaffCard(member, "full"));
      });
      section.appendChild(grid);
      container.appendChild(section);
    });
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
      var haystack = (member.name + " " + (member.designation || "")).toLowerCase();
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
        if (event.target.closest("a") && isSmallScreen()) {
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
    renderFacultyIntro();
    renderDepartmentIntro();
    renderDean();
    renderHod();
    renderSpecialisationCards();
    renderSpecialisationLinks();
    renderStaffPreview();
    renderFacilities();
    renderResearch();
    renderNews();
    renderAcademicOverview();
    renderDownloads();
    renderContact();
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
