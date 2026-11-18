import { useEffect, useState } from "react";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { DemoNote, UploadForm } from "../components/Uploads";
import { UPLOAD_CONFIGS } from "../data/uploadConfig";
import { PageBody } from "../components/ui";
import { imageUrl } from "../data/schools";
import { deleteUpload, useFileUrl, useUploads, type UploadItem } from "../data/uploads";
import { useSchool } from "../schoolContext";

interface Shown {
  url: string;
  caption: string;
}

function Tile({ photo, onOpen, onDelete }: { photo: Shown; onOpen: () => void; onDelete?: () => void }) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
      >
        <div className="overflow-hidden">
          <img src={photo.url} alt={photo.caption} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
        </div>
        <div className="px-4 py-3 text-sm font-medium text-slate-800">{photo.caption}</div>
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={() => confirm("यह फ़ोटो हटाएँ? / Delete this photo?") && onDelete()}
          className="absolute top-2 right-2 rounded bg-white/90 px-2 py-1 text-xs text-red-600 shadow hover:bg-white"
        >
          हटाएँ
        </button>
      )}
    </li>
  );
}

function UploadedTile({ item, onOpen }: { item: UploadItem; onOpen: (p: Shown) => void }) {
  const url = useFileUrl(item);
  if (!url) return null;
  const photo = { url, caption: item.title };
  return <Tile photo={photo} onOpen={() => onOpen(photo)} onDelete={() => deleteUpload(item.id)} />;
}

export function GalleryPage() {
  const school = useSchool();
  const uploaded = useUploads(school.udise, "photo");
  const [open, setOpen] = useState<Shown | null>(null);
  const real = (school.photos ?? []).map((p) => ({ url: imageUrl(p.src), caption: p.caption }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <SchoolPageHeader title="Photo Gallery" subtitle={school.name} />
      <PageBody>
        <div className="space-y-3">
          <UploadForm config={UPLOAD_CONFIGS.photo} />
          <DemoNote />
        </div>
        {real.length + uploaded.length === 0 ? (
          <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-slate-500">
            अभी कोई फ़ोटो नहीं है। ऊपर के बटन से स्कूल की फ़ोटो अपलोड करें।
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploaded.map((item) => (
              <UploadedTile key={item.id} item={item} onOpen={setOpen} />
            ))}
            {real.map((p) => (
              <Tile key={p.url} photo={p} onOpen={() => setOpen(p)} />
            ))}
          </ul>
        )}
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
            <img src={open.url} alt={open.caption} className="max-h-[80vh] w-full rounded-lg object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-white">
              <span>{open.caption}</span>
              <span className="flex gap-2">
                <a href={open.url} download className="rounded-md bg-accent-500 px-4 py-1.5 text-sm font-semibold text-brand-900">
                  ⬇ Download
                </a>
                <button type="button" onClick={() => setOpen(null)} className="rounded-md bg-white/15 px-4 py-1.5 text-sm hover:bg-white/25">
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
