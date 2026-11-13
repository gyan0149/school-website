import { landmarks, school } from "../data/schoolData";
import { Section } from "./ui";

export function LocationSection() {
  return (
    <Section
      title="Location & Nearby Landmarks"
      id="location"
      action={
        <a href={school.mapLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-600 hover:underline">
          Open in Google Maps ↗
        </a>
      }
    >
      <p className="mb-4 text-slate-700">
        📍 {school.address} · Block: {school.block} · District: {school.district}
      </p>
      <div className="grid gap-6 lg:grid-cols-5">
        <iframe
          title="School location map"
          src={school.mapEmbedUrl}
          className="h-80 w-full rounded-md border border-slate-200 lg:col-span-3 lg:h-full lg:min-h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="lg:col-span-2">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">Landmarks around the school</h3>
          <ul className="divide-y divide-slate-100 rounded-md border border-slate-200">
            {landmarks.map((l) => (
              <li key={l.name} className="flex items-start justify-between gap-3 px-3 py-2.5 text-sm">
                <div>
                  <div className="font-medium text-slate-900">{l.name}</div>
                  <div className="text-xs text-slate-500">{l.type}</div>
                </div>
                <span className="shrink-0 rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">{l.distance}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-500">Distances are approximate.</p>
        </div>
      </div>
    </Section>
  );
}
