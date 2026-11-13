# CM Schools of Excellence – school websites

One React + TypeScript + Vite site that gives each of the 100 CM SoE schools in Jharkhand its own website.

- Directory of all schools: `/`
- A school's site: `/<U-DISE code>` (e.g. `/20011900801`), with pages like `/20011900801/contact`

Live: https://gyan0149.github.io/school-website/

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Where things live

| Path | What it is |
|------|------------|
| `src/data/schools.ts` | The 100 schools (name, district, block, U-DISE, classes, HM name, HM mobile) plus optional extras per school (`EXTRAS`: established year, teachers, PIN code, map coordinates, landmarks). |
| `src/data/common.ts` | Information shared by all schools (government links, schemes, admission guidelines, subjects). |
| `src/pages/` | Directory page and per-school pages. Sections without real data show "Coming soon". |
| `src/schoolContext.ts` | Gives every page the current school. |

To add landmarks or an exact map pin for a school, add an entry for its U-DISE code in `EXTRAS` in `src/data/schools.ts`.

## Deploy

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Later (Firebase)

- Data in Firestore instead of `schools.ts`; files in Firebase Storage; admin login for schools to post notices.
- Coming soon: AI help assistant and WhatsApp updates for parents.
