import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { AFFILIATION, DEPARTMENT, govLinks } from "../data/common";
import { displayPhone, getSchool, schoolAddress } from "../data/schools";
import { navItems } from "../navigation";
import { SchoolContext, useSchool, useSchoolPath } from "../schoolContext";
import { Logo } from "./Logo";
import { SohraiBorder } from "./SohraiBorder";
import { PageBody, PageHeader } from "./ui";

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

export function TopStrip({ right }: { right?: ReactNode }) {
  return (
    <div className="bg-brand-900 text-xs text-brand-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
        <span>
          {AFFILIATION} · {DEPARTMENT}
        </span>
        {right && <span className="hidden sm:inline">{right}</span>}
      </div>
    </div>
  );
}

function Header() {
  const school = useSchool();
  const to = useSchoolPath();
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to={to()} className="shrink-0">
          <Logo className="h-14 w-14 md:h-20 md:w-20" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase md:text-sm">
            CM School of Excellence · {AFFILIATION}
          </p>
          <Link to={to()} className="block text-lg leading-tight font-bold text-brand-800 md:text-3xl">
            {school.name}
          </Link>
          <p className="text-xs text-slate-600 md:text-sm">
            {schoolAddress(school)} · U-DISE: {school.udise}
          </p>
        </div>
        <div className="ml-auto hidden text-right md:block">
          <p className="text-2xl font-bold text-ochre-700">जोहार</p>
          <p className="text-xs text-slate-500">
            {school.district}, Jharkhand
          </p>
        </div>
      </div>
      <SohraiBorder />
    </header>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const to = useSchoolPath();

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
              <NavLink to={to(item.path)} end={item.path === ""} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="mt-12 bg-brand-900 text-brand-100">
      <SohraiBorder />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        {children}
        <div className={children ? "" : "md:col-span-3"}>
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
        © {CURRENT_YEAR} · {DEPARTMENT}, {AFFILIATION}.
      </div>
    </footer>
  );
}

function SchoolFooter() {
  const school = useSchool();
  const to = useSchoolPath();
  return (
    <Footer>
      <div>
        <h3 className="mb-3 font-semibold text-white">{school.name}</h3>
        <p className="text-sm leading-relaxed">{schoolAddress(school)}</p>
        <p className="mt-2 text-sm">Phone: {displayPhone(school.hmPhone)}</p>
        <p className="text-sm">U-DISE: {school.udise}</p>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-white">Quick links</h3>
        <ul className="grid grid-cols-2 gap-1.5 text-sm">
          {navItems.slice(1).map((item) => (
            <li key={item.path}>
              <Link to={to(item.path)} className="hover:text-white hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-4 inline-block text-sm text-accent-400 hover:underline">
          All CM SoE schools →
        </Link>
      </div>
    </Footer>
  );
}

export function SchoolNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopStrip />
      <PageHeader title="School not found" />
      <PageBody>
        <p>
          We could not find this school.{" "}
          <Link to="/" className="text-brand-600 hover:underline">
            See all CM SoE schools
          </Link>
        </p>
      </PageBody>
    </div>
  );
}

export function SchoolLayout() {
  const { udise } = useParams();
  const { pathname } = useLocation();
  const school = getSchool(udise);

  useEffect(() => {
    if (school) document.title = `${school.name}, ${school.district}`;
  }, [school]);

  if (!school) return <SchoolNotFound />;

  return (
    <SchoolContext.Provider value={school}>
      <div className="flex min-h-screen flex-col">
        <ScrollManager />
        <TopStrip right={`☎ ${displayPhone(school.hmPhone)}`} />
        <Header />
        <NavBar />
        <main key={pathname} className="animate-fade-up flex-1">
          <Outlet />
        </main>
        <SchoolFooter />
      </div>
    </SchoolContext.Provider>
  );
}
