// Co-curricular activities encouraged in CM Schools of Excellence (general list, not school-specific).
import type { Bi } from "../i18n";

export interface Activity {
  icon: string;
  name: Bi;
  text: Bi;
}

export const ACTIVITIES: Activity[] = [
  {
    icon: "⚽",
    name: { en: "Sports & games", hi: "खेलकूद" },
    text: { en: "Football, hockey, athletics, kabaddi and archery, sports in which Jharkhand has produced national players.", hi: "फ़ुटबॉल, हॉकी, एथलेटिक्स, कबड्डी और तीरंदाज़ी, जिनमें झारखंड ने राष्ट्रीय खिलाड़ी दिए हैं।" },
  },
  {
    icon: "💃",
    name: { en: "Folk dance & music", hi: "लोक नृत्य व संगीत" },
    text: { en: "Jhumar, Chhau and other folk forms of Jharkhand, plus songs and instruments for school functions.", hi: "झूमर, छऊ और झारखंड के दूसरे लोक नृत्य, साथ ही स्कूल समारोहों के लिए गीत-संगीत।" },
  },
  {
    icon: "🎨",
    name: { en: "Art & Sohrai painting", hi: "कला व सोहराय चित्रकला" },
    text: { en: "Drawing, craft and the traditional Sohrai and Khovar wall art of Jharkhand.", hi: "चित्रकारी, शिल्प और झारखंड की पारंपरिक सोहराय व कोहबर कला।" },
  },
  {
    icon: "⛺",
    name: { en: "Scouts & Guides / NCC", hi: "स्काउट-गाइड / NCC" },
    text: { en: "Discipline, first aid, camping and service to the community.", hi: "अनुशासन, प्राथमिक उपचार, कैंप और समाज सेवा।" },
  },
  {
    icon: "🌱",
    name: { en: "Eco club & kitchen garden", hi: "इको क्लब व किचन गार्डन" },
    text: { en: "Tree planting, cleanliness drives and growing vegetables on campus.", hi: "पेड़ लगाना, स्वच्छता अभियान और परिसर में सब्ज़ियाँ उगाना।" },
  },
  {
    icon: "🔬",
    name: { en: "Science & maths club", hi: "विज्ञान व गणित क्लब" },
    text: { en: "Models, experiments, science exhibitions and maths puzzles.", hi: "मॉडल, प्रयोग, विज्ञान प्रदर्शनी और गणित की पहेलियाँ।" },
  },
  {
    icon: "🎤",
    name: { en: "Debate, quiz & essay", hi: "वाद-विवाद, क्विज़ व निबंध" },
    text: { en: "Speaking, writing and general-knowledge competitions in Hindi and English.", hi: "हिंदी और अंग्रेज़ी में भाषण, लेखन और सामान्य ज्ञान प्रतियोगिताएँ।" },
  },
  {
    icon: "🧘",
    name: { en: "Yoga & health", hi: "योग व स्वास्थ्य" },
    text: { en: "Morning yoga, health and hygiene awareness.", hi: "सुबह का योग, स्वास्थ्य और साफ़-सफ़ाई की जानकारी।" },
  },
  {
    icon: "🏛",
    name: { en: "Bal Sansad & Meena Manch", hi: "बाल संसद व मीना मंच" },
    text: { en: "Student leadership: children run school committees and girls' forum activities.", hi: "छात्र नेतृत्व: बच्चे स्कूल की समितियाँ और बालिका मंच की गतिविधियाँ चलाते हैं।" },
  },
  {
    icon: "📖",
    name: { en: "Library & reading", hi: "पुस्तकालय व पठन" },
    text: { en: "Reading hour, storybooks and newspaper reading.", hi: "पठन घंटा, कहानी की किताबें और अख़बार पढ़ना।" },
  },
];

export const SCHOOL_DAYS: { date: Bi; name: Bi }[] = [
  { date: { en: "26 January", hi: "26 जनवरी" }, name: { en: "Republic Day", hi: "गणतंत्र दिवस" } },
  { date: { en: "21 June", hi: "21 जून" }, name: { en: "International Yoga Day", hi: "अंतरराष्ट्रीय योग दिवस" } },
  { date: { en: "15 August", hi: "15 अगस्त" }, name: { en: "Independence Day", hi: "स्वतंत्रता दिवस" } },
  { date: { en: "5 September", hi: "5 सितंबर" }, name: { en: "Teachers' Day", hi: "शिक्षक दिवस" } },
  { date: { en: "14 November", hi: "14 नवंबर" }, name: { en: "Children's Day", hi: "बाल दिवस" } },
  { date: { en: "15 November", hi: "15 नवंबर" }, name: { en: "Jharkhand Foundation Day & Birsa Munda Jayanti", hi: "झारखंड स्थापना दिवस व बिरसा मुंडा जयंती" } },
];
