import type { Notice } from "../types/school";
import { formatDate } from "../utils/format";
import { Badge, DownloadLink } from "./ui";

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="flex gap-4 py-4">
      <div className="w-16 shrink-0 rounded-md bg-brand-50 py-2 text-center text-brand-800">
        <div className="text-xl leading-none font-bold">{notice.date.slice(8, 10)}</div>
        <div className="mt-1 text-xs uppercase">{formatDate(notice.date).split(" ")[1]}</div>
        <div className="text-xs">{notice.date.slice(0, 4)}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Badge>{notice.category}</Badge>
          {notice.isNew && <Badge tone="red">New</Badge>}
          {notice.status === "archived" && <Badge tone="slate">Archived</Badge>}
        </div>
        <h3 className="font-semibold text-slate-900">{notice.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{notice.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span>Published: {formatDate(notice.date)}</span>
          <span>Ref: {notice.id.toUpperCase()}</span>
          {notice.attachmentUrl && <DownloadLink href={notice.attachmentUrl} />}
        </div>
      </div>
    </article>
  );
}
