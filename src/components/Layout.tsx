import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { AFFILIATION, DEPARTMENT, govLinks } from "../data/common";
import { displayPhone, getSchool, imageUrl, mapLink, schoolAddress, schoolAddressHi } from "../data/schools";
import { useLang } from "../i18n";
import { navItems } from "../navigation";
import { LangToggle } from "./LangToggle";
import { SchoolContext, useSchool, useSchoolPath } from "../schoolContext";
import { GuidedTour } from "./GuidedTour";
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
  const { t } = useLang();
  return (
    <div className="bg-brand-900 text-xs text-brand-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5">
        <span className="min-w-0 truncate">
          {t(AFFILIATION, "झारखंड सरकार")} · {t(DEPARTMENT, "स्कूली शिक्षा एवं साक्षरता विभाग")}
        </span>
        <span className="flex shrink-0 items-center gap-4">
          {right && <span className="hidden sm:inline">{right}</span>}
          <LangToggle className="rounded-full bg-white/10 px-2.5 py-1 text-white" />
        </span>
      </div>
    </div>
  );
}

function Header() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t } = useLang();
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to={to()} className="shrink-0">
          <Logo className="h-14 w-14 md:h-20 md:w-20" />
        </Link>
        <div className="min-w-0" data-tour="school-name">
          <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase md:text-sm">
            {t(`CM School of Excellence · ${AFFILIATION}`, "मुख्यमंत्री उत्कृष्ट विद्यालय · झारखंड सरकार")}
          </p>
          <Link to={to()} className="block text-lg leading-tight font-bold text-brand-800 md:text-3xl">
            {school.name}
          </Link>
          <p className="text-xs text-slate-600 md:text-sm">
            {t(schoolAddress(school), schoolAddressHi(school))} · U-DISE: {school.udise}
          </p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-2xl font-bold text-ochre-700">जोहार झारखंड</p>
            <p className="text-xs text-slate-500">
              {school.district}, {t("Jharkhand", "झारखंड")}
            </p>
          </div>
          <figure className="flex flex-col items-center">
            <img
              src={imageUrl("hemant-soren.jpg")}
              alt="Shri Hemant Soren, Hon'ble Chief Minister, Jharkhand"
              title="Shri Hemant Soren, Hon'ble Chief Minister, Jharkhand"
              width={72}
              height={72}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-accent-500 md:h-[72px] md:w-[72px]"
            />
            <figcaption className="mt-1 hidden text-center text-[10px] leading-tight text-slate-500 md:block">
              {t("Hon'ble CM", "माननीय मुख्यमंत्री")}
            </figcaption>
          </figure>
        </div>
      </div>
      <SohraiBorder />
    </header>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const to = useSchoolPath();
  const { t } = useLang();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? "bg-accent-500 text-brand-900" : "text-white hover:bg-brand-600"
    }`;

  return (
    <nav className="sticky top-0 z-30 bg-brand-700 shadow" aria-label="Main" data-tour="menu">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:hidden">
          <span className="py-3 text-sm font-semibold text-white">{t("Menu", "मेनू")}</span>
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
              <NavLink to={to(item.path)} end={item.path === ""} className={linkClass} onClick={() => setOpen(false)} data-hint={item.hint}>
                {item.path === "ai" && <span aria-hidden>✨ </span>}
                {t(item.label, item.hi)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function Footer({ children }: { children?: ReactNode }) {
  const { t } = useLang();
  return (
    <footer className="mt-12 bg-brand-900 text-brand-100">
      <SohraiBorder />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        {children}
        <div className={children ? "" : "md:col-span-3"}>
          <h3 className="mb-3 font-semibold text-white">{t("Useful government links", "उपयोगी सरकारी लिंक")}</h3>
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
  const { t } = useLang();
  return (
    <Footer>
      <div>
        <h3 className="mb-3 font-semibold text-white">{school.name}</h3>
        <p className="text-sm leading-relaxed">{t(schoolAddress(school), schoolAddressHi(school))}</p>
        <p className="mt-2 text-sm">{t("Phone", "फ़ोन")}: {displayPhone(school.hmPhone)}</p>
        <p className="text-sm">U-DISE: {school.udise}</p>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-white">{t("Quick links", "मुख्य लिंक")}</h3>
        <ul className="grid grid-cols-2 gap-1.5 text-sm">
          {navItems.slice(1).map((item) => (
            <li key={item.path}>
              <Link to={to(item.path)} className="hover:text-white hover:underline">
                {t(item.label, item.hi)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Footer>
  );
}

// Phone-only action bar fixed to the bottom of the screen.
function MobileActionBar() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t } = useLang();
  const item = "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium";
  return (
    <nav
      aria-label="Quick actions"
      data-tour="action-bar"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-800 bg-brand-700 text-white shadow-[0_-4px_12px_rgba(0,0,0,0.15)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a href={`tel:+91${school.hmPhone}`} className={`${item} bg-accent-500 text-brand-900`}>
        <span className="text-lg" aria-hidden>☎</span>
        {t("Call", "फ़ोन")}
      </a>
      <a href={mapLink(school)} target="_blank" rel="noreferrer" className={item}>
        <span className="text-lg" aria-hidden>📍</span>
        {t("Map", "नक्शा")}
      </a>
      <Link to={to("ai")} className={item}>
        <span className="text-lg" aria-hidden>✨</span>
        {t("AI Help", "AI मदद")}
      </Link>
      <Link to={to()} className={item}>
        <span className="text-lg" aria-hidden>🏠</span>
        {t("Home", "होम")}
      </Link>
    </nav>
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
      <div className="flex min-h-screen flex-col pb-16 md:pb-0">
        <ScrollManager />
        <TopStrip right={`☎ ${displayPhone(school.hmPhone)}`} />
        <Header />
        <NavBar />
        <main key={pathname} className="animate-fade-up flex-1">
          <Outlet />
        </main>
        <SchoolFooter />
        <MobileActionBar />
        <GuidedTour />
      </div>
    </SchoolContext.Provider>
  );
}
