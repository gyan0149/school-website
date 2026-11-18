import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSchoolPath } from "../schoolContext";

interface TourStep {
  // Matches a data-tour="..." element; no target means a centred card.
  target?: string;
  title: string;
  text: string;
  en: string;
}

const STEPS: TourStep[] = [
  {
    title: "नमस्ते! जोहार!",
    text: "यह आपके स्कूल की वेबसाइट है। 1 मिनट में देखिए कि कहाँ क्लिक करने पर क्या मिलता है।",
    en: "A 1-minute guide to this school website.",
  },
  { target: "school-name", title: "स्कूल का नाम", text: "यहाँ स्कूल का नाम, पता और U-DISE कोड दिखता है।", en: "School name, address and U-DISE code." },
  {
    target: "menu",
    title: "मेनू",
    text: "यहाँ क्लिक करके कोई भी पेज खोलें: स्कूल के बारे में, एडमिशन, प्रधानाध्यापक, फ़ोटो गैलरी, संपर्क आदि।",
    en: "Open any page from this menu.",
  },
  { target: "call", title: "फ़ोन करें", text: "इस बटन पर क्लिक करते ही सीधे स्कूल को फ़ोन लग जाएगा।", en: "Tap to call the school." },
  { target: "location", title: "लोकेशन", text: "यहाँ क्लिक करें, स्कूल का नक्शा और आसपास के लैंडमार्क दिखेंगे।", en: "See the school on the map." },
  { target: "photos", title: "स्कूल की फ़ोटो", text: "यहाँ स्कूल की फ़ोटो दिखती हैं। ‹ › बटन से अगली फ़ोटो देखें।", en: "School photos." },
  { target: "highlights", title: "एक नज़र में", text: "कक्षाएँ, ज़िला, प्रखंड, स्थापना वर्ष: मुख्य जानकारी एक नज़र में।", en: "Key facts at a glance." },
  { target: "jump-links", title: "सीधे पहुँचें", text: "इन बटनों से इसी पेज के किसी भी भाग पर तुरंत पहुँचें।", en: "Jump to any part of this page." },
  { target: "principal", title: "प्रधानाध्यापक का संदेश", text: "प्रधानाध्यापक की फ़ोटो, संदेश और फ़ोन नंबर यहाँ है।", en: "Principal's photo, message and phone." },
  {
    target: "coming-soon",
    title: "जल्द आ रहा है",
    text: "नोटिस, रिज़ल्ट, डाउनलोड: स्कूल अपनी नोटिस, रिज़ल्ट और फ़ॉर्म यहाँ डाल सकेगा।",
    en: "Notices, results and downloads are coming soon.",
  },
  { target: "action-bar", title: "नीचे के बटन", text: "फ़ोन, मैप, प्रधानाध्यापक और होम: ये बटन हर पेज पर नीचे रहते हैं।", en: "Quick buttons on every page." },
  { target: "help", title: "दोबारा देखें", text: "यह गाइड फिर से देखने के लिए कभी भी इस बटन पर क्लिक करें।", en: "Tap here to see this guide again." },
];

const SEEN_KEY = "tour-seen-v1";

function seen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Private mode etc.; the tour just shows again next time.
  }
}

function findTarget(name?: string): HTMLElement | null {
  if (!name) return null;
  const el = document.querySelector<HTMLElement>(`[data-tour="${name}"]`);
  return el && el.getClientRects().length > 0 ? el : null;
}

// Steps whose element is missing or hidden on this screen size are skipped.
function visibleSteps(): TourStep[] {
  return STEPS.filter((s) => !s.target || findTarget(s.target));
}

export function GuidedTour() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const to = useSchoolPath();
  const isHome = pathname.replace(/\/$/, "").endsWith(to());
  const [steps, setSteps] = useState<TourStep[] | null>(null);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const start = useCallback(() => {
    setSteps(visibleSteps());
    setIndex(0);
  }, []);

  const close = useCallback(() => {
    markSeen();
    setSteps(null);
  }, []);

  // Auto-start on the first home visit, or when the help button asked for it from another page.
  const askedFor = (state as { tour?: number } | null)?.tour;
  useEffect(() => {
    if (!isHome || (seen() && !askedFor)) return;
    const t = window.setTimeout(start, 900);
    return () => window.clearTimeout(t);
  }, [isHome, askedFor, start]);

  const step = steps?.[index];

  useLayoutEffect(() => {
    if (!step) return;
    const el = findTarget(step.target);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    const update = () => setRect(el.getBoundingClientRect());
    update();
    const t = window.setTimeout(update, 450);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [step]);

  useEffect(() => {
    if (!steps) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, steps.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steps, close]);

  const openHelp = () => (isHome ? start() : navigate(to(), { state: { tour: Date.now() } }));

  const pad = 6;
  const hole = step?.target ? rect : null;
  const last = steps ? index === steps.length - 1 : false;
  // Card goes on the side of the screen away from the highlighted element.
  const cardAtTop = hole ? hole.top + hole.height / 2 > window.innerHeight / 2 : false;

  return (
    <>
      <button
        type="button"
        data-tour="help"
        onClick={openHelp}
        className="fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2.5 font-semibold text-brand-900 shadow-lg ring-2 ring-white hover:bg-accent-400 md:bottom-6"
      >
        <span aria-hidden>❓</span> मदद / Guide
      </button>

      {step && steps && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Website guide">
          {hole ? (
            <div
              className="pointer-events-none absolute rounded-lg ring-4 ring-accent-400 transition-all duration-300"
              style={{
                top: hole.top - pad,
                left: hole.left - pad,
                width: hole.width + pad * 2,
                height: hole.height + pad * 2,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)",
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-black/65" />
          )}

          <div
            key={index}
            className={`animate-fade-up absolute inset-x-3 mx-auto max-w-md rounded-xl bg-white p-5 shadow-2xl ${
              hole ? (cardAtTop ? "top-4" : "bottom-4") : "top-1/2 -translate-y-1/2"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>
                {index + 1} / {steps.length}
              </span>
              <button type="button" onClick={close} className="rounded px-2 py-1 hover:bg-slate-100">
                छोड़ें / Skip ✕
              </button>
            </div>
            <h2 className="mt-1 text-xl font-bold text-brand-800">
              {hole && <span aria-hidden>👉 </span>}
              {step.title}
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-slate-800">{step.text}</p>
            <p className="mt-1 text-sm text-slate-500">{step.en}</p>
            <div className="mt-4 flex gap-1">
              {steps.map((s, i) => (
                <span key={s.title} className={`h-1.5 flex-1 rounded-full ${i <= index ? "bg-accent-500" : "bg-slate-200"}`} />
              ))}
            </div>
            <div className="mt-4 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setIndex((i) => i - 1)}
                disabled={index === 0}
                className="rounded-md px-4 py-2.5 font-semibold text-brand-700 ring-1 ring-brand-600 disabled:opacity-30"
              >
                ‹ पीछे
              </button>
              <button
                type="button"
                onClick={() => (last ? close() : setIndex((i) => i + 1))}
                className="flex-1 rounded-md bg-brand-700 px-4 py-2.5 font-semibold text-white hover:bg-brand-800"
              >
                {index === 0 ? "शुरू करें / Start ›" : last ? "समझ गया ✓" : "आगे ›"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
