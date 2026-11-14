import { imageUrl } from "../data/schools";
import { useSchool } from "../schoolContext";
import type { Distance, Milestone, SchoolStory } from "../types/school";

export function HistoryTimeline({ history }: { history: Milestone[] }) {
  return (
    <ol className="relative space-y-4 border-l-2 border-accent-400 pl-6">
      {history.map((m) => (
        <li key={m.year} className="relative">
          <span className="absolute top-1 -left-[31px] h-4 w-4 rounded-full bg-accent-500 ring-4 ring-white" aria-hidden />
          <span className="inline-block rounded bg-brand-700 px-2 py-0.5 text-sm font-bold text-white">{m.year}</span>
          <p className="mt-1 text-slate-700">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function DistanceList({ distances }: { distances: Distance[] }) {
  return (
    <ul className="divide-y divide-slate-100 rounded-md border border-slate-200">
      {distances.map((d) => (
        <li key={d.place} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
          <span className="text-slate-800">{d.place}</span>
          <span className="shrink-0 rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{d.distance}</span>
        </li>
      ))}
    </ul>
  );
}

export function ObjectiveCards({ story }: { story: SchoolStory }) {
  const cards = [
    { icon: "🎯", title: "Our Objective", text: story.objective },
    { icon: "🤝", title: "Our Commitment", text: story.commitment },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <div key={c.title} className="rounded-lg border-l-4 border-accent-500 bg-amber-50/60 p-4">
          <div className="flex items-center gap-2 font-semibold text-brand-800">
            <span className="text-xl" aria-hidden>
              {c.icon}
            </span>
            {c.title}
          </div>
          <p className="mt-2 leading-relaxed text-slate-700">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

// One of the school's real photos (by position, wrapping around); nothing for schools without photos.
export function SchoolPhotoFigure({ index, className = "" }: { index: number; className?: string }) {
  const photos = useSchool().photos ?? [];
  if (!photos.length) return null;
  const p = photos[index % photos.length];
  return (
    <figure className={`overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 ${className}`}>
      <img src={imageUrl(p.src)} alt={p.caption} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <figcaption className="px-3 py-2 text-xs text-slate-600">{p.caption}</figcaption>
    </figure>
  );
}
