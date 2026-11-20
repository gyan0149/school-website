import type { Bi } from "../i18n";

export interface AiToolInfo {
  path: string;
  icon: string;
  name: Bi;
  text: Bi;
  group: "students" | "teachers";
}

// Every AI section, as shown on the AI Learning page and the home page.
export const AI_TOOLS: AiToolInfo[] = [
  {
    path: "study",
    icon: "📘",
    name: { en: "Study Helper", hi: "पढ़ाई सहायक" },
    text: { en: "Ask any doubt from Class 1 to 12 and get step-by-step answers.", hi: "कक्षा 1 से 12 का कोई भी सवाल पूछें, स्टेप-बाय-स्टेप जवाब पाएँ।" },
    group: "students",
  },
  {
    path: "quiz",
    icon: "📝",
    name: { en: "Practice Quiz", hi: "क्विज़ अभ्यास" },
    text: { en: "Quick quizzes by class and subject with explanations.", hi: "कक्षा और विषय के अनुसार क्विज़, हर उत्तर की व्याख्या के साथ।" },
    group: "students",
  },
  {
    path: "english",
    icon: "🗣",
    name: { en: "English Speaking Practice", hi: "अंग्रेज़ी बोलने का अभ्यास" },
    text: { en: "Read aloud, and the app checks your pronunciation.", hi: "ज़ोर से पढ़ें, ऐप आपका उच्चारण जाँचेगा।" },
    group: "students",
  },
  {
    path: "planner",
    icon: "📅",
    name: { en: "Exam Study Planner", hi: "परीक्षा टाइमटेबल" },
    text: { en: "Make a day-by-day study timetable till your exam.", hi: "परीक्षा तक हर दिन का पढ़ाई टाइमटेबल बनाएँ।" },
    group: "students",
  },
  {
    path: "career",
    icon: "🧭",
    name: { en: "Career Guide", hi: "करियर गाइड" },
    text: { en: "Which stream, course or exam after Class 10 and 12.", hi: "10वीं और 12वीं के बाद कौन-सा विषय, कोर्स या परीक्षा।" },
    group: "students",
  },
  {
    path: "scholarship",
    icon: "🎓",
    name: { en: "Scholarship Helper", hi: "छात्रवृत्ति सहायक" },
    text: { en: "Find scholarships and learn how to apply.", hi: "छात्रवृत्ति खोजें और आवेदन का तरीका जानें।" },
    group: "students",
  },
  {
    path: "teacher",
    icon: "👩‍🏫",
    name: { en: "Teacher Tools", hi: "शिक्षक टूल" },
    text: { en: "Lesson plans, question papers, worksheets and notices in seconds.", hi: "पाठ योजना, प्रश्न-पत्र, वर्कशीट और सूचना कुछ ही सेकंड में।" },
    group: "teachers",
  },
  {
    path: "school",
    icon: "🏫",
    name: { en: "Ask the School", hi: "स्कूल से पूछें" },
    text: { en: "Parents: admission, documents, fees, contact and more.", hi: "अभिभावक: एडमिशन, कागज़ात, फ़ीस, संपर्क और बहुत कुछ।" },
    group: "teachers",
  },
];
