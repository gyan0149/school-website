import { useEffect, useState } from "react";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { PageBody } from "../components/ui";
import { imageUrl } from "../data/schools";
import { useSchool } from "../schoolContext";
import type { SchoolPhoto } from "../types/school";
import { ComingSoonPage } from "./ComingSoonPage";

export function GalleryPage() {
  const school = useSchool();
  const [open, setOpen] = useState<SchoolPhoto | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!school.photos?.length) return <ComingSoonPage />;

  return (
    <>
      <SchoolPageHeader title="Photo Gallery" subtitle={school.name} />
      <PageBody>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {school.photos.map((p) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="group block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    src={imageUrl(p.src)}
                    alt={p.caption}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3 text-sm font-medium text-slate-800">{p.caption}</div>
              </button>
            </li>
          ))}
        </ul>
      </PageBody>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <figure className="max-h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={imageUrl(open.src)} alt={open.caption} className="max-h-[80vh] w-full rounded-lg object-contain" />
            <figcaption className="mt-3 flex items-center justify-between text-white">
              <span>{open.caption}</span>
              <button type="button" onClick={() => setOpen(null)} className="rounded-md bg-white/15 px-4 py-1.5 text-sm hover:bg-white/25">
                Close
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
