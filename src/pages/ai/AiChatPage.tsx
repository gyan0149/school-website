import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChatBox, DemoBadge } from "../../ai/ChatBox";
import { AI_LIVE, type AiTool } from "../../ai/client";
import { demoSamples, SCHOOL_BOT_SAMPLES } from "../../ai/demo";
import { AI_TOOLS } from "../../ai/tools";
import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { PageBody } from "../../components/ui";
import { subjectGroups } from "../../data/common";
import { useLang } from "../../i18n";
import { useSchool, useSchoolPath } from "../../schoolContext";

const CHAT_TOOLS: AiTool[] = ["study", "career", "scholarship", "teacher", "school"];

const INTRO: Record<string, { en: string; hi: string }> = {
  study: {
    en: "Hello! I am your study helper. Ask me any question from your books: maths, science, social science, Hindi or English. I will explain step by step.",
    hi: "नमस्ते! मैं आपका पढ़ाई सहायक हूँ। अपनी किताबों से कोई भी सवाल पूछें: गणित, विज्ञान, सामाजिक विज्ञान, हिंदी या अंग्रेज़ी। मैं स्टेप-बाय-स्टेप समझाऊँगा।",
  },
  career: {
    en: "Hello! Tell me your class and what you enjoy studying. I will help you choose a stream, course, exam or job path.",
    hi: "नमस्ते! अपनी कक्षा और पसंद के विषय बताइए। मैं विषय, कोर्स, परीक्षा या नौकरी का रास्ता चुनने में मदद करूँगा।",
  },
  scholarship: {
    en: "Hello! Ask me about scholarships and government schemes: who can apply, which documents are needed and how to apply.",
    hi: "नमस्ते! छात्रवृत्ति और सरकारी योजनाओं के बारे में पूछें: कौन आवेदन कर सकता है, कौन-से कागज़ात चाहिए और आवेदन कैसे करें।",
  },
  teacher: {
    en: "Namaste! I can make lesson plans, question papers with answers, worksheets, notices and activity ideas. Tell me the class, subject and topic.",
    hi: "नमस्ते! मैं पाठ योजना, उत्तर सहित प्रश्न-पत्र, वर्कशीट, सूचना और गतिविधियों के सुझाव बना सकता हूँ। कक्षा, विषय और पाठ बताइए।",
  },
  school: {
    en: "Namaste! Ask me about this school: admission, documents, fees, classes, location and contact.",
    hi: "नमस्ते! इस स्कूल के बारे में पूछें: एडमिशन, कागज़ात, फ़ीस, कक्षाएँ, पता और संपर्क।",
  },
};

const LIVE_SAMPLES: Record<string, { en: string; hi: string }[]> = {
  study: [
    { en: "Explain photosynthesis simply", hi: "प्रकाश संश्लेषण आसान भाषा में समझाइए" },
    { en: "Solve: 2x + 5 = 15", hi: "हल करें: 2x + 5 = 15" },
    { en: "Write a letter to my friend about my school", hi: "अपने दोस्त को स्कूल के बारे में पत्र लिखिए" },
  ],
  career: [
    { en: "What can I do after Class 10?", hi: "10वीं के बाद क्या करें?" },
    { en: "How to become a nurse?", hi: "नर्स कैसे बनें?" },
    { en: "ITI or Polytechnic, which is better for me?", hi: "ITI या Polytechnic, मेरे लिए कौन-सा अच्छा है?" },
  ],
  scholarship: [
    { en: "I am a girl in Class 9. Which schemes can I get?", hi: "मैं कक्षा 9 की छात्रा हूँ, मुझे कौन-सी योजनाएँ मिल सकती हैं?" },
    { en: "How do I apply on e-Kalyan?", hi: "ई-कल्याण पर आवेदन कैसे करें?" },
  ],
  teacher: [
    { en: "Lesson plan: Class 7 Science, 'Nutrition in plants', 40 minutes", hi: "पाठ योजना: कक्षा 7 विज्ञान, 'पौधों में पोषण', 40 मिनट" },
    { en: "10 MCQs with answers: Class 9 Maths, 'Number systems'", hi: "उत्तर सहित 10 MCQ: कक्षा 9 गणित, 'संख्या पद्धति'" },
    { en: "Notice for parent-teacher meeting on Saturday", hi: "शनिवार को अभिभावक-शिक्षक बैठक की सूचना" },
  ],
};

export function AiChatPage() {
  const { tool = "" } = useParams();
  const school = useSchool();
  const to = useSchoolPath();
  const { t, lang } = useLang();
  const subjects = [...new Set(subjectGroups.filter((g) => g.to >= school.classFrom && g.from <= school.classTo).flatMap((g) => g.subjects))].filter(
    (s) => !s.startsWith("As per"),
  );
  const classes = Array.from({ length: school.classTo - school.classFrom + 1 }, (_, i) => school.classFrom + i);
  const [cls, setCls] = useState(String(classes.at(-1) ?? ""));
  const [subject, setSubject] = useState("");

  const info = AI_TOOLS.find((x) => x.path === tool);
  if (!info || !CHAT_TOOLS.includes(tool as AiTool)) {
    return (
      <>
        <SchoolPageHeader title={t("Not found", "नहीं मिला")} />
        <PageBody>
          <Link to={to("ai")} className="text-brand-600 hover:underline">
            ← {t("All AI tools", "सभी AI टूल")}
          </Link>
        </PageBody>
      </>
    );
  }

  const aiTool = tool as AiTool;
  const samples = AI_LIVE
    ? (LIVE_SAMPLES[tool] ?? []).map((s) => t(s.en, s.hi))
    : aiTool === "school"
      ? SCHOOL_BOT_SAMPLES
      : demoSamples(aiTool);
  const intro = INTRO[tool];
  const select = "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none";

  return (
    <>
      <SchoolPageHeader title={`${info.icon} ${t(info.name.en, info.name.hi)}`} subtitle={t(info.text.en, info.text.hi)} />
      <PageBody>
        <Link to={to("ai")} className="text-sm font-medium text-brand-600 hover:underline">
          ← {t("All AI tools", "सभी AI टूल")}
        </Link>
        {aiTool !== "school" && <DemoBadge />}
        {aiTool === "study" && (
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              {t("Class", "कक्षा")}
              <select value={cls} onChange={(e) => setCls(e.target.value)} className={select}>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              {t("Subject", "विषय")}
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className={select}>
                <option value="">{t("Any", "कोई भी")}</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <ChatBox
          key={tool}
          tool={aiTool}
          intro={t(intro.en, intro.hi)}
          samples={samples}
          extra={{ lang, ...(aiTool === "study" ? { class: cls, subject } : {}) }}
        />
      </PageBody>
    </>
  );
}
