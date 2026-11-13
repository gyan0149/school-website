import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Footer, TopStrip } from "../components/Layout";
import { Logo } from "../components/Logo";
import { SohraiBorder } from "../components/SohraiBorder";
import { ABOUT_CM_SOE } from "../data/common";
import { SCHOOLS } from "../data/schools";

const DISTRICTS = [...new Set(SCHOOLS.map((s) => s.district))].sort();

export function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    document.title = "CM Schools of Excellence, Jharkhand";
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHOOLS.filter(
      (s) =>
        (!district || s.district === district) &&
        (!q || [s.name, s.block, s.district, s.udise].join(" ").toLowerCase().includes(q)),
    );
  }, [query, district]);

  return (
    <div className="flex min-h-screen flex-col">
      <TopStrip />
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5">
          <Logo className="h-14 w-14 md:h-16 md:w-16" />
          <div>
            <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">Government of Jharkhand</p>
            <h1 className="text-xl font-bold text-brand-800 md:text-3xl">CM Schools of Excellence</h1>
          </div>
        </div>
        <SohraiBorder />
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8">
        <p className="max-w-3xl text-slate-700">{ABOUT_CM_SOE} Choose a school to open its website.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school, block, district or U-DISE…"
            aria-label="Search schools"
            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            aria-label="Filter by district"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All districts</option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <span className="text-sm text-slate-500">
            {filtered.length} of {SCHOOLS.length} schools
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="py-10 text-center text-slate-500">No schools match this search.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <li key={s.udise}>
                <Link
                  to={`/${s.udise}`}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-500 hover:shadow-md"
                >
                  <span className="text-xs font-medium tracking-wide text-accent-600 uppercase">
                    {s.district} · {s.block}
                  </span>
                  <span className="mt-1 font-semibold text-brand-800">{s.name}</span>
                  <span className="mt-auto pt-3 text-xs text-slate-500">
                    Classes {s.classFrom}–{s.classTo} · U-DISE {s.udise}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
