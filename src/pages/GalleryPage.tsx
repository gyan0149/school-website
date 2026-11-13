import { useEffect, useState } from "react";
import { PageBody, PageHeader, PhotoPlaceholder } from "../components/ui";
import { gallery } from "../data/schoolData";
import type { GalleryCategory, GalleryItem } from "../types/school";
import { formatDate } from "../utils/format";

const CATEGORIES: (GalleryCategory | "All")[] = ["All", ...new Set(gallery.map((g) => g.category))];

export function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory | "All">("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const items = gallery.filter((g) => category === "All" || g.category === category);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <PageHeader title="Photo Gallery" subtitle="Glimpses of school life, celebrations and events" />
      <PageBody>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                category === c ? "bg-brand-700 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelected(g)}
              className="group overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-slate-200 hover:shadow-md"
            >
              <div className="overflow-hidden">
                <div className="transition-transform group-hover:scale-105">
                  <PhotoPlaceholder label={g.category} seed={gallery.indexOf(g)} imageUrl={g.imageUrl} />
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium">{g.title}</div>
                <div className="text-xs text-slate-500">{formatDate(g.date)}</div>
              </div>
            </button>
          ))}
        </div>
      </PageBody>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
            <PhotoPlaceholder
              label={selected.title}
              seed={gallery.indexOf(selected)}
              imageUrl={selected.imageUrl}
              className="aspect-[16/10]"
            />
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-semibold">{selected.title}</div>
                <div className="text-sm text-slate-500">
                  {selected.category} · {formatDate(selected.date)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
