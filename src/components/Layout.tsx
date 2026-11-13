import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { govLinks, notices, school } from "../data/schoolData";
import { navItems } from "../navigation";
import { Logo } from "./Logo";
import { SohraiBorder } from "./SohraiBorder";

const CURRENT_YEAR = new Date().getFullYear();

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function TopStrip() {
  return (
    <div className="bg-brand-900 text-xs text-brand-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
        <span>
          {school.affiliation} · {school.department}
        </span>
        <span className="hidden sm:inline">
          ☎ {school.phone} · ✉ {school.email}
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to="/" className="shrink-0">
          <Logo className="h-14 w-14 md:h-20 md:w-20" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase md:text-sm">
            {school.affiliation}
          </p>
          <Link to="/" className="block text-lg leading-tight font-bold text-brand-800 md:text-3xl">
            {school.name}
          </Link>
          <p className="text-xs text-slate-600 md:text-sm">
            {school.address} · UDISE: {school.udiseCode}
          </p>
        </div>
        <div className="ml-auto hidden text-right md:block">
          <p className="text-2xl font-bold text-ochre-700">जोहार</p>
          <p className="text-xs text-slate-500">{school.district}, {school.state}</p>
        </div>
      </div>
      <SohraiBorder />
    </header>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? "bg-accent-500 text-brand-900" : "text-white hover:bg-brand-600"
    }`;

  return (
    <nav className="sticky top-0 z-30 bg-brand-700 shadow" aria-label="Main">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:hidden">
          <span className="py-3 text-sm font-semibold text-white">Menu</span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded px-3 py-2 text-xl text-white hover:bg-brand-600"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        <ul className={`${open ? "block" : "hidden"} pb-2 lg:flex lg:flex-wrap lg:pb-0`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === "/"} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NoticeTicker() {
  const latest = notices.filter((n) => n.status === "active").slice(0, 5);
  const items = [...latest, ...latest];
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        <Link
          to="/notices"
          className="z-10 shrink-0 bg-accent-500 px-3 py-2 text-xs font-bold tracking-wide text-brand-900 uppercase"
        >
          Latest
        </Link>
        <div className="overflow-hidden">
          <div className="animate-ticker flex w-max gap-10 py-2 pl-4 text-sm">
            {items.map((n, i) => (
              <Link key={`${n.id}-${i}`} to="/notices" className="whitespace-nowrap text-slate-700 hover:text-brand-700">
                ▸ {n.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 bg-brand-900 text-brand-100">
      <SohraiBorder />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-3 font-semibold text-white">{school.name}</h3>
          <p className="text-sm leading-relaxed">{school.address}</p>
          <p className="mt-2 text-sm">Phone: {school.phone}</p>
          <p className="text-sm">Email: {school.email}</p>
          <p className="mt-2 text-sm">Office: {school.officeTimings}</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-white">Quick links</h3>
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {navItems.slice(1).map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-white">Useful government links</h3>
          <ul className="space-y-1.5 text-sm">
            {govLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800 py-4 text-center text-xs">
        © {CURRENT_YEAR} {school.name}, {school.department}, {school.affiliation}. Content managed by the school.
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <TopStrip />
      <Header />
      <NavBar />
      <NoticeTicker />
      <main key={pathname} className="animate-fade-up flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
