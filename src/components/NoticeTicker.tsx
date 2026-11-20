import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, useUploads } from "../data/uploads";
import { useLang } from "../i18n";
import { useSchool, useSchoolPath } from "../schoolContext";

const NEW_DAYS = 7;

// Running notice strip: the school's latest notices scroll continuously; hovering pauses it.
export function NoticeTicker() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t } = useLang();
  const notices = useUploads(school.udise, "notice").slice(0, 8);
  const [now] = useState(() => Date.now());

  const items = notices.length
    ? notices.map((n) => ({
        key: n.id,
        text: n.title,
        date: formatDate(n.date),
        isNew: now - n.createdAt < NEW_DAYS * 86400000,
        path: "notices",
      }))
    : [
        { key: "w", text: t(`Welcome to the website of ${school.name}`, `${school.name} की वेबसाइट पर आपका स्वागत है`), path: "about" },
        { key: "n", text: t("School notices and circulars will appear here", "स्कूल की सूचनाएँ और परिपत्र यहाँ दिखेंगे"), path: "notices" },
        { key: "s", text: t("Check government scholarships and schemes for your class", "अपनी कक्षा के लिए सरकारी छात्रवृत्ति और योजनाएँ देखें"), path: "schemes", isNew: true },
        { key: "a", text: t("New: free AI study helper, quiz and career guide for students", "नया: छात्रों के लिए मुफ़्त AI पढ़ाई सहायक, क्विज़ और करियर गाइड"), path: "ai", isNew: true },
      ];

  // Longer lists scroll for longer so the speed stays readable.
  const seconds = Math.max(25, items.reduce((n, i) => n + i.text.length, 0) / 5);

  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <li key={i.key} className="flex items-center whitespace-nowrap">
          <Link to={to(i.path)} tabIndex={hidden ? -1 : undefined} className="px-6 hover:underline">
            {i.isNew && <span className="mr-2 animate-pulse rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">{t("New", "नया")}</span>}
            {i.text}
            {"date" in i && i.date && <span className="ml-2 text-xs text-brand-100">({i.date})</span>}
          </Link>
          <span className="text-accent-400" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-y border-brand-800 bg-brand-800 text-sm text-white" data-tour="ticker">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <Link to={to("notices")} className="z-10 flex shrink-0 items-center gap-1.5 bg-accent-500 px-3 py-2 font-bold text-brand-900 md:px-4">
          <span aria-hidden>📢</span>
          {t("Notices", "सूचना")}
        </Link>
        <div className="ticker-wrap group relative flex min-w-0 flex-1 overflow-hidden py-2" aria-label={t("Latest notices", "ताज़ा सूचनाएँ")}>
          <div className="animate-ticker flex w-max group-focus-within:[animation-play-state:paused]" style={{ animationDuration: `${seconds}s` }}>
            {list(false)}
            {list(true)}
          </div>
        </div>
      </div>
    </div>
  );
}
