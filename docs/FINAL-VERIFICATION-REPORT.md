# Final Verification Report

Verification of five already-implemented fixes in the department website.
This report is the only project file changed by this verification task.

Verification performed by: automated inspection (headless Chrome via CDP, Node, Python HTTP server).
Verification date: 2026-10-14.

Important limitation up front:
This report is based on programmatic checks, not on human visual review.
The automated assistant cannot view images, so screenshots were captured but
were NOT visually inspected. No real-device testing was performed.
No screen-reader testing was performed.
See section F for what this means for confidence.

## A. Verdict

PASS WITH NOTES.

All five targeted fixes behave correctly under automated checking.
No blocking defects were found.
The notes concern untestable areas and non-blocking observations, not failures.

## B. Environment and baseline

- Project root: D:\ET\department-website
- Branch: main
- HEAD commit: 560dd4178958b5d4495dedc6449ab486e84008d4
- HEAD subject: Remove skip-to-content link
- AGENTS.md: none found at project root or any parent directory.
- Served locally with: python -m http.server 8080 --bind 127.0.0.1
- Preview URL: http://127.0.0.1:8080/
- Node: v22.22.3
- Python: 3.x
- Browser used for automation: Google Chrome (headless) at
  C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
- No npm project, no Playwright, no Selenium were installed or used.

Pre-existing working tree (before this verification):
- 20 modified tracked files plus 2 untracked image files.
- No git stashes.
- Baseline captured to:
  C:\Users\Express\AppData\Local\Temp\opencode\baseline-status.txt
  and baseline.diff

Files modified before this task (unchanged by this task):
404.html, about/index.html, academics/index.html, assets/css/styles.css,
assets/images/UOJ-Logo-Color-scaled.png, assets/js/content.js,
assets/js/main.js, contact/index.html, docs/CONTENT_CHECKLIST.md,
docs/README.md, downloads/index.html, facilities/index.html, index.html,
news/index.html, research/index.html,
specialisations/automobile-technology/index.html,
specialisations/construction-technology/index.html,
specialisations/electro-technology/index.html, staff/index.html.
Untracked before this task: assets/images/UOJ-Logo-Black-White-scaled.png,
assets/images/UOJ-Logo-Color-scaled.ico.

## C. Results for the five fixes

### Fix 1 - Coordinator title on specialisation pages
Result: PASS.

- Each of the three specialisation pages shows exactly one card whose role is
  "Specialisation Coordinator" (role count = 1 on all three).
- The designation string appears exactly once per page.
- Coordinator name and the correct specialisation tag are present.
- Source data: staff.js defines staff-coord-01, staff-coord-02, staff-coord-03
  with designation "Specialisation Coordinator" and specialisationIds
  sp-01, sp-02, sp-03 respectively.
- The HOD record (staff-hod) is correctly flagged isHeadOfDepartment = true and
  is not mislabelled as coordinator.

### Fix 2 - Homepage order (faculty, dean, department)
Result: PASS.

- DOM section order on the homepage is:
  faculty, dean, department, specialisations, academics, facilities, news.
- Actual render order begins: faculty-intro, dean, department-intro, ...
  with news rendered last.
- Dean block renders from the shared content source.
- About page also carries the dean section (data-render="dean").
- content.js changes versus HEAD are comments and section-number labels only
  (for example dean is now "section 2 and About page", department "section 3").
  The evaluated data payload is deep-equal (JSON.stringify comparison) to HEAD.
  So the change is cosmetic in the file, not behavioural in the data.

### Fix 3 - Facilities limit
Result: PASS.

- Homepage: facility cards displayed = 2.
- Full facilities page: unlimited (all records shown).
- Specialisation pages: the facilities slot is filtered by specialisation and is
  not present on the specialisation template, so it contributes 0 and does not
  interfere with filtering.
- Fixture matrix (in-memory overrides of DEPARTMENT_CONTENT):
  - fixture 0: empty state on home and facilities.
  - fixture 1: 1 card on both.
  - fixture 2: 2 cards on both.
  - fixture 3: home 2, facilities 3.
  - fixture 5: home 2, facilities 5.
  All as expected.

### Fix 4 - Logo optimisation
Result: PASS.

- Header logo assets/images/UOJ-Logo-Color-scaled.png:
  new 12,674 bytes, 192x192, palette + tRNS (transparency).
  HEAD version 456,432 bytes, 2560x2560, palette + tRNS.
  Reduction: 97.22 percent. Square aspect and transparency preserved.
- Footer logo assets/images/UOJ-Logo-Black-White-scaled.png:
  16,311 bytes, 288x288, palette + tRNS.
  Untracked file, so no prior version exists in git to compare against.
- Favicon assets/images/UOJ-Logo-Color-scaled.ico: 4,286 bytes.
- Rendered sizes: header logo 40x40 (mobile/tablet) and 48x48 (desktop),
  footer logo 72x72. All keep a 1:1 ratio matching their natural square ratio.
- After scrolling, both logos load with natural sizes 192 and 288 and no broken
  images on home, facilities, about, a specialisation page, and staff.

### Fix 5 - URL handling and resolve() validation
Result: PASS.

- 36 of 36 unit cases pass (helpers extracted verbatim from main.js and executed
  in Node with a fake document).
- Accepted: relative, root-relative, anchor, http, https, protocol-relative,
  mailto, tel.
- Rejected to empty string: empty, null, undefined, whitespace.
- Rejected: javascript:, mixed-case JaVaScRiPt:, vbscript:, leading-space plus
  tab, data:, control characters, newline inside scheme, file:, ftp:.
- The image kind rejects mailto, tel, javascript, data, and keeps relative,
  http, https, root-relative.
- Real-content checks: 442 local links/assets all returned 200.
  9 anchors checked, 0 broken.
  No mailto/tel or other unexpected schemes present in real content.
  The only external link is https://jfn.ac.lk/.
- In-memory malicious fixtures: javascript: and "   VBScript:" academic tile
  urls render as non-clickable divs or a placeholder note.
  A data: specialisation pageUrl yields no link plus a placeholder note.
  A javascript: download url yields "Not yet available" with no link.
  A data: facility image falls back to placeholder-lab.svg.
  A javascript: mapUrl yields no map link.
  Injected real email/phone correctly produce mailto: and tel: links
  (created, never activated during testing).
  A tel: staff photo yields an initials avatar with no img element.
  Zero unsafe href or src values were found anywhere.

## D. Logo measurements

- UOJ-Logo-Color-scaled.png: 12,674 bytes, 192x192, 8-bit palette, tRNS present.
- UOJ-Logo-Black-White-scaled.png: 16,311 bytes, 288x288, 8-bit palette, tRNS.
- UOJ-Logo-Color-scaled.ico: 4,286 bytes.
- Reduction for the color logo versus HEAD: 97.22 percent.
- Aspect ratio preserved in all rendered placements (1:1).

## E. HTTP and responsive checks

- All 13 pages checked (including 404.html): no duplicate IDs, no console
  errors, no failed requests, no bad HTTP responses, no unsafe links or images.
- Response link check: 442 local links/assets, 0 non-200.
- Responsive sweep at 390, 768 and 1440 px on home, a specialisation page, and
  facilities:
  - Horizontal overflow: false on every combination.
  - Offending elements: 0.
  - scrollWidth equals viewport width.
- Navigation at 390 px: collapsed by default (toggle visible, list height 0);
  opens (navOpen true, aria-expanded true, list height 364, 7 rows);
  a sub-dropdown opens inside the panel; Escape closes the panel.
- Navigation at 1440 px: toggle hidden, desktop dropdown opens with 3 links.
- Geometry and layout proxies (programmatic, not visual):
  - No element shows clipped text except the intentional visually-hidden
    heading on the facilities page ("Facilities list"), which is by design.
  - The nav toggle is not obscured; the topmost element at its centre is its
    own child span.
  - Brand text does not overflow the masthead and is not clipped at the right.
  - Footer layout stacks to a column at 390 px and stays in a row at 768/1440 px.
  - Header sticky offset is a positive value at all widths.

## F. Remaining issues

This section separates genuine defects from missing content and from things that
were simply not tested.

Genuine defects found:
- None.

Missing content (expected, not defects):
- The downloads page shows 5 "Not yet available" badges. These are placeholders
  awaiting real files.
- The footer "Black and White" logo is an untracked new file, so its history
  cannot be compared to a previous committed version.

Not tested / cannot be fully confirmed:
- No visual review of screenshots. The assistant cannot view images, so the
  captured screenshots were not inspected. Visual clarity, colour, spacing and
  contrast were only assessed indirectly through computed styles and geometry.
- No real-device testing (phones, tablets).
- No screen-reader or accessibility-tree testing.
- No cross-browser testing (only Chrome was used).
- Footer logo naturalWidth read as 0 on some pages at measurement time due to
  lazy loading; it resolves to 288x288 once loaded, which was confirmed
  separately by scrolling. This is a timing artifact of the measurement, not a
  defect.

## G. Change confirmation

- This task wrote exactly one project file:
  D:\ET\department-website\docs\FINAL-VERIFICATION-REPORT.md
- No application code was edited.
- No files were installed, committed, pushed, or deployed.
- Pre-existing uncommitted work, including the footer changes, was preserved.
- All test scaffolding and outputs live outside the project under:
  C:\Users\Express\AppData\Local\Temp\opencode\
- A final git status comparison against the baseline is recorded in section H
  and was taken after this report was written.

## H. Next action

Local verification is not the same as a live deployment.
Passing these checks means the fixes behave correctly on the local static build
served over http://127.0.0.1:8080/. It does not prove the published site behaves
the same.

Recommended next steps:
- Have a human open the captured screenshots and the live preview to confirm
  visual quality (colour, spacing, clarity, contrast), since that part was not
  testable here.
- Perform a quick real-device and screen-reader pass if accessibility and
  layout on phones matter for release.
- When satisfied, review and commit the pre-existing working tree changes
  together with this report, then deploy through the normal process.
