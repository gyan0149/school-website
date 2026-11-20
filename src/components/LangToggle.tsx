import { useLang } from "../i18n";

// English / Hindi switch shown at the top of every page.
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const hi = lang === "hi";
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 text-xs font-semibold select-none ${className}`} data-tour="lang">
      <span className={hi ? "opacity-60" : ""}>English</span>
      <input type="checkbox" role="switch" className="peer sr-only" checked={hi} onChange={(e) => setLang(e.target.checked ? "hi" : "en")} aria-label="हिंदी में देखें / View in Hindi" />
      <span className="relative h-5 w-9 rounded-full bg-white/30 ring-1 ring-white/60 transition peer-checked:bg-accent-500 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-400 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-4" />
      <span className={hi ? "" : "opacity-60"}>हिंदी</span>
    </label>
  );
}
