import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

export function PageHeader({
  title,
  subtitle,
  homeTo = "/",
  image,
}: {
  title: string;
  subtitle?: string;
  homeTo?: string;
  image?: { src: string; alt: string };
}) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-800 to-brand-600 text-white">
      {image ? (
        <>
          <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/75 to-brand-700/40" />
        </>
      ) : (
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
      )}
      <div className={`relative mx-auto max-w-7xl px-4 ${image ? "py-12 md:py-20" : "py-8"}`}>
        <nav aria-label="Breadcrumb" className="mb-2 text-sm text-brand-100">
          <Link to={homeTo} className="hover:underline">
            {t("Home", "होम")}
          </Link>
          <span className="mx-2">›</span>
          <span>{title}</span>
        </nav>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-brand-100">{subtitle}</p>}
      </div>
    </div>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">{children}</div>;
}

export function Section({
  title,
  id,
  action,
  children,
}: {
  title: string;
  id?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3">
        <h2 className="border-l-4 border-accent-500 pl-3 text-lg font-semibold text-brand-800">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  footer,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-brand-50 text-brand-800">
          <tr>
            {columns.map((c) => (
              <th key={c.header} className={`px-4 py-2.5 font-semibold ${c.className ?? ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className="odd:bg-white even:bg-slate-50">
              {columns.map((c) => (
                <td key={c.header} className={`px-4 py-2.5 ${c.className ?? ""}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && <tfoot className="bg-brand-50 font-semibold text-brand-800">{footer}</tfoot>}
      </table>
    </div>
  );
}

export function InfoGrid({ items, single = false }: { items: { label: string; value: ReactNode }[]; single?: boolean }) {
  return (
    <dl className={`grid gap-x-8 ${single ? "" : "sm:grid-cols-2"}`}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5 border-b border-slate-100 py-2.5 sm:flex-row sm:gap-4">
          <dt className="shrink-0 text-sm font-medium text-slate-500 sm:w-40">{item.label}</dt>
          <dd className="text-slate-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "green" | "slate" | "red" }) {
  const tones = {
    blue: "bg-brand-50 text-brand-700 ring-brand-100",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    green: "bg-green-50 text-green-700 ring-green-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
    red: "bg-red-50 text-red-700 ring-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function DownloadLink({ href, label = "Download PDF" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
    >
      <span aria-hidden>⬇</span> {label}
    </a>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-slate-700 marker:text-accent-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const PLACEHOLDER_GRADIENTS = [
  "from-brand-700 to-brand-600",
  "from-amber-600 to-orange-500",
  "from-emerald-700 to-teal-500",
  "from-rose-700 to-pink-500",
  "from-indigo-700 to-violet-500",
  "from-sky-700 to-cyan-500",
];

// Stand-in for photos until real images are uploaded.
export function PhotoPlaceholder({
  label,
  seed,
  imageUrl,
  className = "aspect-[4/3]",
}: {
  label: string;
  seed: number;
  imageUrl?: string;
  className?: string;
}) {
  if (imageUrl) {
    return <img src={imageUrl} alt={label} className={`w-full object-cover ${className}`} loading="lazy" />;
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex w-full items-center justify-center bg-gradient-to-br p-4 text-center text-white ${PLACEHOLDER_GRADIENTS[seed % PLACEHOLDER_GRADIENTS.length]} ${className}`}
    >
      <div>
        <div className="text-3xl opacity-80" aria-hidden>
          📷
        </div>
        <div className="mt-2 text-sm font-medium">{label}</div>
      </div>
    </div>
  );
}

export function ComingSoonNote({ text }: { text: string }) {
  const { t } = useLang();
  return (
    <div className="flex items-start gap-3 rounded-md border border-dashed border-accent-500 bg-amber-50/60 p-4">
      <span className="rounded-full bg-accent-500 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-brand-900 uppercase">{t("Coming soon", "जल्द")}</span>
      <p className="text-sm text-slate-700">{text}</p>
    </div>
  );
}
