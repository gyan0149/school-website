import { Link } from "react-router-dom";
import { DemoBadge } from "../../ai/ChatBox";
import { AI_TOOLS, type AiToolInfo } from "../../ai/tools";
import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { PageBody } from "../../components/ui";
import { useLang } from "../../i18n";
import { useSchoolPath } from "../../schoolContext";

export function AiToolCards({ tools, compact }: { tools: AiToolInfo[]; compact?: boolean }) {
  const to = useSchoolPath();
  const { t } = useLang();
  return (
    <ul className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {tools.map((tool) => (
        <li key={tool.path}>
          <Link
            to={to(`ai/${tool.path}`)}
            className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-600"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-2xl" aria-hidden>
              {tool.icon}
            </span>
            <span className="mt-3 font-semibold text-brand-800">{t(tool.name.en, tool.name.hi)}</span>
            <span className="mt-1 flex-1 text-sm text-slate-600">{t(tool.text.en, tool.text.hi)}</span>
            <span className="mt-3 text-sm font-semibold text-brand-600 group-hover:underline">{t("Open", "खोलें")} →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AiHubPage() {
  const { t } = useLang();
  return (
    <>
      <SchoolPageHeader
        title={t("✨ AI Learning Corner", "✨ AI से पढ़ाई")}
        subtitle={t("Free AI help for students, teachers and parents, in Hindi and English", "छात्रों, शिक्षकों और अभिभावकों के लिए मुफ़्त AI मदद, हिंदी और अंग्रेज़ी में")}
      />
      <PageBody>
        <DemoBadge />
        <section>
          <h2 className="mb-3 text-xl font-bold text-brand-800">{t("For students", "छात्रों के लिए")}</h2>
          <AiToolCards tools={AI_TOOLS.filter((x) => x.group === "students")} />
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-brand-800">{t("For teachers and parents", "शिक्षकों और अभिभावकों के लिए")}</h2>
          <AiToolCards tools={AI_TOOLS.filter((x) => x.group === "teachers")} compact />
        </section>
        <section className="rounded-xl bg-brand-50 p-5 ring-1 ring-brand-100">
          <h2 className="font-semibold text-brand-800">{t("Use AI the right way", "AI का सही इस्तेमाल")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 marker:text-accent-500">
            <li>{t("Ask AI to explain, then try the question yourself. Don't just copy answers.", "AI से समझें, फिर खुद सवाल हल करें। जवाब सिर्फ़ नकल न करें।")}</li>
            <li>{t("Tap 🎤 to ask by speaking, and 🔊 to hear the answer.", "🎤 दबाकर बोलकर पूछें और 🔊 दबाकर जवाब सुनें।")}</li>
            <li>{t("Never share your phone number, address or passwords with AI.", "AI को अपना फ़ोन नंबर, पता या पासवर्ड कभी न बताएँ।")}</li>
            <li>{t("AI can make mistakes. Check important answers with your teacher.", "AI से गलती हो सकती है। ज़रूरी जवाब शिक्षक से ज़रूर जाँचें।")}</li>
          </ul>
        </section>
      </PageBody>
    </>
  );
}
