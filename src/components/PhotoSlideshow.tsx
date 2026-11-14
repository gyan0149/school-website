import { useEffect, useState } from "react";
import { imageUrl } from "../data/schools";
import type { SchoolPhoto } from "../types/school";

const INTERVAL_MS = 4000;

export function PhotoSlideshow({ photos }: { photos: SchoolPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = photos.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce || count < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused, count]);

  const go = (i: number) => setIndex((i + count) % count);
  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white hover:bg-black/60";

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden bg-brand-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="School photos"
    >
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={imageUrl(p.src)}
          alt={p.caption}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-8 text-sm font-medium text-white">
        {photos[index].caption}
      </div>
      {count > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={() => go(index - 1)} className={`${arrow} left-2`}>
            ‹
          </button>
          <button type="button" aria-label="Next photo" onClick={() => go(index + 1)} className={`${arrow} right-2`}>
            ›
          </button>
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                aria-label={`Show photo ${i + 1}: ${p.caption}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent-400" : "w-2 bg-white/70 hover:bg-white"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
