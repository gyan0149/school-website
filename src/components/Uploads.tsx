import { useState, type FormEvent } from "react";
import type { UploadConfig } from "../data/uploadConfig";
import { addUpload, deleteUpload, fileSize, formatDate, todayIso, useFileUrl, type UploadItem } from "../data/uploads";
import { useSchool } from "../schoolContext";

export function DemoNote() {
  return (
    <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">
      <strong>डेमो:</strong> अपलोड की गई फ़ाइलें अभी सिर्फ़ इसी फ़ोन/कंप्यूटर पर सेव होती हैं। फ़ाइनल वेबसाइट में ये सभी को दिखेंगी।
    </p>
  );
}

const input =
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none";

export function UploadForm({ config }: { config: UploadConfig }) {
  const school = useSchool();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayIso);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await addUpload({
        udise: school.udise,
        kind: config.kind,
        title: title.trim(),
        date,
        details: details.trim() || undefined,
        file: file ?? undefined,
        fileName: file?.name,
      });
      setTitle("");
      setDetails("");
      setFile(null);
      setOpen(false);
      setDone(true);
      window.setTimeout(() => setDone(false), 3000);
    } catch {
      alert("Upload नहीं हो पाया। कृपया फिर से कोशिश करें।");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          data-tour="upload"
          onClick={() => setOpen(true)}
          className="rounded-md bg-brand-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-brand-800"
        >
          ⬆ {config.button}
        </button>
        {done && <span className="animate-fade-up rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700">✓ अपलोड हो गया</span>}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="animate-fade-up space-y-4 rounded-xl border-2 border-brand-600 bg-white p-5 shadow-sm" data-tour="upload-form">
      <h3 className="text-lg font-semibold text-brand-800">⬆ {config.button}</h3>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">{config.titleLabel} *</span>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={config.titlePlaceholder} className={input} name="title" />
      </label>
      {config.kind !== "photo" && (
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">तारीख / Date *</span>
          <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} name="date" />
        </label>
      )}
      {config.withDetails && (
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">विवरण / Details</span>
          <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} className={input} name="details" />
        </label>
      )}
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          फ़ाइल चुनें / Choose file {config.fileRequired ? "*" : "(optional)"}
        </span>
        <input
          type="file"
          required={config.fileRequired}
          accept={config.accept}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2.5 file:font-semibold file:text-brand-700"
          name="file"
        />
        {file && <span className="mt-1 block text-xs text-slate-500">{file.name} · {fileSize(file.size)}</span>}
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="flex-1 rounded-md bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
          {saving ? "सेव हो रहा है…" : "✓ सेव करें / Save"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-md px-5 py-3 font-semibold text-slate-600 ring-1 ring-slate-300">
          रद्द / Cancel
        </button>
      </div>
    </form>
  );
}

function UploadRow({ item, compact }: { item: UploadItem; compact?: boolean }) {
  const url = useFileUrl(item);
  const isImage = item.file?.type.startsWith("image/");
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start" data-tour="upload-item">
      <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
        <span className="rounded bg-brand-50 px-2 py-1 text-xs font-semibold whitespace-nowrap text-brand-700">{formatDate(item.date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{item.title}</p>
        {item.details && !compact && <p className="mt-1 text-sm whitespace-pre-line text-slate-600">{item.details}</p>}
        {isImage && url && !compact && <img src={url} alt={item.title} className="mt-2 max-h-48 rounded-md ring-1 ring-slate-200" />}
        {url && (
          <div className="mt-2 flex flex-wrap gap-2">
            <a href={url} target="_blank" rel="noreferrer" className="rounded-md px-3 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-600 hover:bg-brand-50">
              👁 देखें / View
            </a>
            <a href={url} download={item.fileName} data-tour="download" className="rounded-md bg-accent-500 px-3 py-1.5 text-sm font-semibold text-brand-900 hover:bg-accent-400">
              ⬇ डाउनलोड / Download
            </a>
            {item.file && <span className="self-center text-xs text-slate-500">{fileSize(item.file.size)}</span>}
          </div>
        )}
      </div>
      {!compact && (
        <button
          type="button"
          onClick={() => confirm("यह आइटम हटाएँ? / Delete this item?") && deleteUpload(item.id)}
          className="self-start rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
        >
          हटाएँ / Delete
        </button>
      )}
    </li>
  );
}

export function UploadList({ items, empty, compact }: { items: UploadItem[]; empty: string; compact?: boolean }) {
  if (!items.length) {
    return <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-slate-100">
      {items.map((i) => (
        <UploadRow key={i.id} item={i} compact={compact} />
      ))}
    </ul>
  );
}
