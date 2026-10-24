# Department of Engineering Technology Website – Documentation

This documentation provides guidance for managing and maintaining the official website of the Department of Engineering Technology, Faculty of Technology, University of Jaffna.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Adding and Updating Staff](#adding-and-updating-staff)
- [Managing Specialisations](#managing-specialisations)
- [Managing Research, News, and Downloads](#managing-research-news-and-downloads)
- [Images and Assets](#images-and-assets)
- [Styling and Layout](#styling-and-layout)
- [Deployment](#deployment)
- [Technical Notes](#technical-notes)

## Overview

This is a static HTML/CSS/JavaScript website. All content is data-driven and managed through JavaScript files, allowing non-technical users to update text, staff details, and other information without modifying HTML directly.

**Live site structure:**
- Homepage (`index.html`)
- About page (`pages/about.html`)
- Staff directory (`pages/staff.html`)
- Specialisation pages (`pages/automobile-technology.html`, `pages/construction-technology.html`, `pages/electro-technology.html`)
- Research (`pages/research.html`)
- News & Events (`pages/news.html`)
- E-Resources/Downloads (`pages/downloads.html`)
- Facilities (`pages/facilities.html`)
- Contact (`pages/contact.html`)

## Project Structure

```
department-website/
├── assets/
│   ├── css/           # Stylesheets (styles.css)
│   ├── images/        # Images (logos, staff, specialisations, campus, facilities)
│   └── js/            # JavaScript files
│       ├── content.js          # Main site content
│       ├── staff.js            # Staff directory data
│       ├── specialisations.js  # Specialisation pages data
│       ├── research.js         # Research publications
│       ├── news.js             # News and events
│       ├── downloads.js        # E-Resources/Downloads
│       └── site/
│           └── main.js         # Core rendering engine
├── docs/              # Documentation (this folder)
├── pages/             # Individual HTML pages
└── index.html         # Homepage
```

## Content Management

All editable content is stored in the `assets/js/` files. **Do not edit HTML files directly for content changes** – use the appropriate JavaScript data files.

### Main Content (`assets/js/content.js`)

This file contains site-wide content including:

| Section | Purpose |
| --- | --- |
| `institution` | University, faculty, and department names (used in header/footer) |
| `faculty` | Faculty of Technology intro (homepage) |
| `dean` | Dean's message (About page) |
| `department` | Department intro (homepage) |
| `hod` | Head of Department message (About page) |
| `about` | Vision, mission, history, and academic organisation text |
| `facilities` | Laboratory and facility listings |
| `academicOverview` | Homepage academic overview tiles |
| `contact` | Contact details, address, phone, email, map, and social media links |

**Tips:**
- Keep keys exactly as they are – the JavaScript engine looks them up by key
- Use arrays for multi-paragraph text (each string becomes a paragraph)
- Leave placeholders like `[to be added]` will show as placeholders if not filled
- Contact details with empty/placeholder values will show `[... to be added]` notes

## Adding and Updating Staff

Edit `assets/js/staff.js`.

### Staff Categories
Define groups in the `categories` array:
```javascript
categories: [
  { id: "head", label: "Head of Department" },
  { id: "coordinator", label: "Specialisation Coordinators" },
  { id: "academic", label: "Academic Staff" },
  { id: "technical", label: "Technical Staff" },
  { id: "admin", label: "Administrative & Support Staff" }
]
```

### Staff Member Fields
```javascript
{
  id: "unique-id",                    // Unique identifier (no spaces/reuse)
  name: "Full Name",                  // Display name
  designation: "Job Title",           // e.g., "Senior Lecturer Gr II", "Lecturer"
  category: "academic",               // Must match a category id
  qualifications: "Degrees...",       // Qualifications
  photo: "photo.jpg",                 // Photo filename in assets/images/staff/ (leave "" if none)
  specialisationIds: ["automobile-technology"], // Which specialisations they belong to
  email: "email@tech.jfn.ac.lk",      // Email address
  phone: "+94 12 345 6789",           // Phone number
  isHeadOfDepartment: false,          // true only for HOD
  onStudyLeave: false                 // true if on study leave
}
```

**Important:**
- Only **one** person should have `isHeadOfDepartment: true`
- Use designation values consistently for proper ordering (see `designationOrder` at top of file)
- The HOD appears in both "Head of Department" category and is referenced by the About page
- Coordinators are shown in both coordinator category and their respective specialisation pages

### Adding Staff Photos
1. Place the photo in `assets/images/staff/`
2. Reference the filename in the `photo` field
3. Recommended format: JPG/PNG, reasonable size (optimized for web)
4. If no photo, leave `photo: ""` – initials will be displayed as fallback

## Managing Specialisations

Edit `assets/js/specialisations.js`. There are three specialisations:

- `automobile-technology`
- `construction-technology`
- `electro-technology`

### Specialisation Fields

```javascript
{
  id: "automobile-technology",           // Unique code
  name: "Automobile Technology",        // Display name
  pageUrl: "pages/automobile-technology.html",
  description: "Short description for cards",
  image: "Automobile-Technology.jpg",   // In assets/images/specialisations/
  imageAlt: "Alt text for image",
  coordinatorStaffId: "coordinator-automobile-technology", // Links to staff member
  overview: ["Paragraph 1", "Paragraph 2"], // About this specialisation
  curriculum: [ /* See below */ ],
  research: { summary: "Research summary text" },
  downloads: [ /* Programme documents */ ]
}
```

### Managing Curriculum
Each curriculum entry has a year and sections. Multiple years can be listed (dropdown will appear if more than one).
```javascript
{
  year: "2023",
  sections: [
    {
      title: "Year 01 / Semester 01",
      items: [
        { name: "Course Name", code: "COURSE123" },
        // Or for electives:
        { name: "Elective Module:", options: [
          { name: "Option 1", code: "OPT123" },
          { name: "Option 2", code: "OPT456" }
        ]}
      ]
    }
  ]
}
```

**Notes:**
- Staff shown on specialisation pages are pulled automatically from `staff.js` based on `specialisationIds`
- Place specialisation images in `assets/images/specialisations/`

## Managing Research, News, and Downloads

### Research (`assets/js/research.js`)
Add publications with:
```javascript
{
  id: "research-001",
  title: "Publication Title",
  authors: "Author Names",
  type: "Journal Article", // or Conference, etc.
  venue: "Journal/Conference Name",
  year: "2024",
  status: "Published", // or "In Press", "Under Review"
  specialisationIds: ["automobile-technology"], // Optional filtering
  url: "https://..." // Link to publication
}
```

### News & Events (`assets/js/news.js`)
```javascript
{
  id: "news-001",
  title: "News Title",
  date: "2024-10-01", // ISO format YYYY-MM-DD
  category: "Announcement", // or "Event", "Achievement"
  summary: "Short summary",
  body: ["Paragraph 1", "Paragraph 2"],
  image: "image.jpg", // Optional, in assets/images/news/
  imageAlt: "Alt text"
}
```

### Downloads/E-Resources (`assets/js/downloads.js`)
Organize into sections:
```javascript
[
  {
    id: "section-id",
    title: "Section Title",
    documents: [
      {
        id: "doc-001",
        title: "Document Title",
        format: "PDF", // or DOCX, XLSX
        size: "2.5 MB",
        url: "path/to/file.pdf" // Relative to site root or full URL
      }
    ]
  }
]
```

**Note:** Specialisation programme documents are automatically collected from each specialisation's `downloads` array and appear in the "Programme Documents" section.

## Images and Assets

| Location | Purpose | Notes |
| --- | --- | --- |
| `assets/images/logos/` | University/faculty logos | Used in header and footer |
| `assets/images/staff/` | Staff photos | Referenced in `staff.js` |
| `assets/images/specialisations/` | Specialisation images | Referenced in `specialisations.js` |
| `assets/images/campus/` | Campus/faculty images | Used on homepage and About page |
| `assets/images/facilities/` | Laboratory photos | Referenced in `content.js` facilities |
| `assets/images/news/` | News images | Referenced in `news.js` |
| `assets/images/placeholders/` | Placeholder images | Used as fallbacks |

**Guidelines:**
- Use descriptive filenames (lowercase, hyphens instead of spaces)
- Optimize images for web (compress before uploading)
- Provide alt text for all images
- For staff photos, portrait orientation works best

## Styling and Layout

- **Main stylesheet:** `assets/css/styles.css`
- **Responsive design:** Mobile-friendly with breakpoints
- **Navigation:** Built dynamically by `assets/js/site/main.js`
- **Components:** Cards, grids, timelines, and other UI components defined in CSS

Only modify CSS if you need design changes. Content changes should go through the JavaScript data files.

## Deployment

This is a static site – no server-side processing required. It can be deployed to:
- Web server (Apache/Nginx)
- GitHub Pages
- University web hosting
- Any static hosting service

**Deployment steps:**
1. Ensure all files are uploaded maintaining the directory structure
2. Update all paths are relative (already configured)
3. Test in browser after deployment
4. Check all images and links load correctly

## Technical Notes

### JavaScript Architecture
- `content.js`, `staff.js`, `specialisations.js`, etc. define data objects on `window`
- `assets/js/site/main.js` reads these objects and dynamically renders HTML
- Data is loaded via `<script>` tags in HTML files (with `defer`)

### URL Resolution
The site uses a `data-base` attribute on `<body>` to handle relative paths correctly from different page depths (root vs pages/ subdirectory).

### Security
- All URLs are validated (only http/https/mailto/tel allowed)
- No innerHTML usage – DOM API used throughout for safety
- Control characters are filtered

### Browser Compatibility
Modern browsers supported. Uses ES5-compatible JavaScript for broad compatibility.

---

**For questions or technical issues, please contact the web development team.**
