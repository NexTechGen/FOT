# Administrator Guide
**Department of Engineering Technology Website**  
Faculty of Technology, University of Jaffna

## Purpose
This guide is designed for department staff responsible for updating website content. No programming experience is required – all updates are done by editing simple JavaScript files.

## Quick Start

1. Open the website folder in a text editor (e.g., VS Code, Notepad++)
2. Edit the appropriate `.js` file in the `assets/js/` folder
3. Save your changes
4. Refresh the website in your browser to see updates

## What to Edit Where

| Task | File to Edit | Notes |
| --- | --- | --- |
| Update department name, contact details, vision/mission, Dean/HOD messages | `assets/js/content.js` | Main site content |
| Add/edit/remove staff members | `assets/js/staff.js` | Staff directory |
| Update specialisation pages (curriculum, overview) | `assets/js/specialisations.js` | Three specialisation pages |
| Add research publications | `assets/js/research.js` | Research page |
| Add news and events | `assets/js/news.js` | News & Events page |
| Add/downloadable resources | `assets/js/downloads.js` | E-Resources page |
| Add images | `assets/images/*/` folders | Place in appropriate subfolder |

## Step-by-Step Instructions

### 1. Updating Contact Information
Edit `assets/js/content.js`, find the `contact` section:

```javascript
contact: {
  address: ["Ariviyal Nagar", "Kilinochchi", "Sri Lanka"],
  email: "tech@univ.jfn.ac.lk",
  phone: "(+94) 21-313-5880",
  mapEmbedUrl: "https://...", // Google Maps embed URL
  social: [
    { icon: "facebook", label: "Facebook", url: "https://..." },
    // ...
  ]
}
```

### 2. Adding a New Staff Member
Edit `assets/js/staff.js`:

1. Find the appropriate section (academic/technical/admin)
2. Copy an existing staff member object
3. Update all fields with new information
4. Ensure `id` is unique
5. Add photo to `assets/images/staff/` if available

```javascript
{
  id: "academic-staff-18",
  name: "Dr. Example Name",
  designation: "Senior Lecturer Gr II",
  category: "academic",
  qualifications: "Ph.D., M.Sc., B.Sc.",
  photo: "example.jpg",
  specialisationIds: ["electro-technology"],
  email: "example@tech.jfn.ac.lk",
  phone: "+94 XX XXX XXXX",
  isHeadOfDepartment: false,
  onStudyLeave: false
}
```

### 3. Updating Specialisation Curriculum
Edit `assets/js/specialisations.js`. Find your specialisation and update the `curriculum` array.

**Important:** If updating to a new academic year, you can add a new entry. The page will show a dropdown if multiple years exist.

### 4. Adding News
Edit `assets/js/news.js`:

```javascript
{
  id: "news-005",
  title: "Workshop on Renewable Energy",
  date: "2026-03-15",
  category: "Event",
  summary: "Department conducted a workshop...",
  body: [
    "First paragraph of full story...",
    "Second paragraph..."
  ],
  image: "workshop.jpg", // optional
  imageAlt: "Workshop participants"
}
```

### 5. Adding Research Publications
Edit `assets/js/research.js`:

```javascript
{
  id: "pub-025",
  title: "Research Paper Title",
  authors: "Smith J., Perera K., etc.",
  type: "Journal Article",
  venue: "IEEE Conference Proceedings",
  year: "2026",
  status: "Published",
  specialisationIds: ["automobile-technology"],
  url: "https://doi.org/xxxx"
}
```

## Best Practices

- **Use quotes correctly** – All text must be in single or double quotes
- **Commas matter** – Don't forget commas between items in arrays/objects
- **Test after changes** – Open the page in a browser and check for errors
- **Keep backups** – Copy files before making major changes
- **Use unique IDs** – Never reuse staff/news/research IDs
- **Optimize images** – Compress images before adding to reduce load times
- **Verify links** – Test all URLs you add
- **Only one HOD** – Ensure exactly one staff member has `isHeadOfDepartment: true`

## Troubleshooting

| Issue | Solution |
| --- | --- |
| Changes don't appear | Clear browser cache or do a hard refresh (Ctrl+Shift+R) |
| Page shows errors | Check for missing commas, quotes, or brackets in your JavaScript |
| Image not showing | Verify filename matches exactly (case-sensitive) and file is in correct folder |
| Staff not appearing | Check category is valid and member is properly added to array |
| Broken layout | Revert to backup and check recent changes carefully |

## File Naming Conventions

- **Staff photos:** Use descriptive names like `firstname-lastname.jpg`
- **Specialisation images:** Use existing naming style or clear descriptive names
- **All filenames:** Lowercase, use hyphens instead of spaces
- **Image formats:** Prefer `.jpg` for photos, `.png` for logos

## Support

For technical issues beyond content updates, please consult the web development team or refer to `docs/README.md` for technical details.
