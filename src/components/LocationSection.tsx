import { mapEmbedUrl, mapLink, schoolAddress } from "../data/schools";
import { useSchool } from "../schoolContext";
import { Section } from "./ui";

export function LocationSection() {
  const school = useSchool();
  const landmarks = school.landmarks ?? [];
  return (
    <Section
      title="Location & Nearby Landmarks"
      id="location"
      action={
        <a href={mapLink(school)} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-600 hover:underline">
          Open in Google Maps ↗
        </a>
      }
    >
      <p className="mb-4 text-slate-700">📍 {schoolAddress(school)}</p>
      <div className="grid gap-6 lg:grid-cols-5">
        <iframe
          title="School location map"
          src={mapEmbedUrl(school)}
          className="h-80 w-full rounded-md border border-slate-200 lg:col-span-3 lg:h-full lg:min-h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="lg:col-span-2">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">Landmarks around the school</h3>
          {landmarks.length > 0 ? (
            <>
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
            </>
          ) : (
            <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
              Landmarks around the school will be added soon. Map location is approximate.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
