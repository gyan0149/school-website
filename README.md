# School Website (demo)

Website for a Jharkhand government +2 school (CBSE, CM School of Excellence), built with React, TypeScript, Vite, Tailwind CSS and React Router.
Right now all content is hard-coded demo data. Firebase will be added later.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
```

## Where things live

| Path | What it is |
|------|------------|
| `src/data/schoolData.ts` | **All website content** (school profile, notices, staff, results, gallery, downloads…). Edit this to change the site. |
| `src/types/school.ts` | Types for that data. Shaped like the future Firestore collections. |
| `src/navigation.ts` | Menu items (used by the header and footer). |
| `src/pages/` | One file per page (Home, About, School Information, Academics, Admissions, Faculty, Notices, Results, Infrastructure, Gallery, Downloads, Contact). |
| `src/components/` | Layout (header, nav, notice ticker, footer) and shared UI pieces. |
| `public/docs/` | PDFs. Every download currently points to `sample-document.pdf`. |

Photos: gallery items take an optional `imageUrl`. Without it a coloured placeholder is shown.

## Firebase plan (later)

- Hosting: Firebase Hosting (SPA rewrite to `index.html`).
- Data: Firestore collections matching `src/types/school.ts` (`notices`, `gallery`, `downloads`, …).
- Files: Firebase Storage for notice PDFs and gallery photos.
- Admin: Firebase Auth + an admin panel for the school to post notices.
- Coming soon (shown on the home page): AI help assistant and WhatsApp updates for parents.
