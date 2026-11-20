// Government schemes and scholarships for students of Jharkhand government schools.
// Amounts and rules change from year to year; every entry points to the official source to check.
import type { Bi } from "../i18n";

export type Category = "SC" | "ST" | "OBC" | "Minority" | "General";

export interface WelfareScheme {
  id: string;
  icon: string;
  name: Bi;
  benefit: Bi;
  who: Bi;
  how: Bi;
  // Classes the scheme is for; 13 means after Class 12 (college).
  classFrom: number;
  classTo: number;
  girlsOnly?: boolean;
  categories?: Category[];
  kind: "school" | "scholarship" | "higher";
  link?: string;
}

export const SCHEMES: WelfareScheme[] = [
  {
    id: "books",
    icon: "📚",
    name: { en: "Free textbooks", hi: "मुफ़्त पाठ्यपुस्तकें" },
    benefit: { en: "All textbooks free of cost every year.", hi: "हर साल सभी किताबें मुफ़्त।" },
    who: { en: "All students of Classes 1 to 8 in government schools.", hi: "सरकारी स्कूलों के कक्षा 1 से 8 के सभी छात्र।" },
    how: { en: "Given by the school at the start of the session.", hi: "सत्र की शुरुआत में स्कूल से मिलती हैं।" },
    classFrom: 1,
    classTo: 8,
    kind: "school",
  },
  {
    id: "uniform",
    icon: "👕",
    name: { en: "Free school uniform", hi: "मुफ़्त पोशाक" },
    benefit: { en: "School uniform (or money for it) every year.", hi: "हर साल स्कूल पोशाक या उसकी राशि।" },
    who: { en: "Students of Classes 1 to 8 in government schools.", hi: "सरकारी स्कूलों के कक्षा 1 से 8 के छात्र।" },
    how: { en: "Through the school.", hi: "स्कूल के माध्यम से।" },
    classFrom: 1,
    classTo: 8,
    kind: "school",
  },
  {
    id: "mdm",
    icon: "🍲",
    name: { en: "PM POSHAN (mid-day meal)", hi: "पीएम पोषण (मध्याह्न भोजन)" },
    benefit: { en: "Hot cooked meal on every school day.", hi: "हर स्कूल दिवस पर गर्म पका हुआ भोजन।" },
    who: { en: "Students of Classes 1 to 8.", hi: "कक्षा 1 से 8 के छात्र।" },
    how: { en: "Served in school; no form needed.", hi: "स्कूल में ही मिलता है, कोई फ़ॉर्म नहीं।" },
    classFrom: 1,
    classTo: 8,
    kind: "school",
  },
  {
    id: "cycle",
    icon: "🚲",
    name: { en: "Bicycle scheme", hi: "साइकिल योजना" },
    benefit: { en: "A bicycle (or money for it) to reach school easily.", hi: "स्कूल आने-जाने के लिए साइकिल या उसकी राशि।" },
    who: { en: "Eligible Class 8 students, as per the state scheme rules.", hi: "राज्य योजना के नियमों के अनुसार पात्र कक्षा 8 के छात्र।" },
    how: { en: "The school sends the list; money comes by DBT to the bank account.", hi: "स्कूल सूची भेजता है; राशि DBT से बैंक खाते में आती है।" },
    classFrom: 8,
    classTo: 8,
    kind: "school",
  },
  {
    id: "kishori",
    icon: "👧",
    name: { en: "Savitribai Phule Kishori Samriddhi Yojana", hi: "सावित्रीबाई फुले किशोरी समृद्धि योजना" },
    benefit: {
      en: "Money support to girls at each stage from Class 8 to 12, and a larger amount at age 18–19, so they continue studying.",
      hi: "कक्षा 8 से 12 तक हर चरण पर लड़कियों को आर्थिक सहायता और 18–19 वर्ष की उम्र पर बड़ी राशि, ताकि वे पढ़ाई जारी रखें।",
    },
    who: { en: "Girls of Jharkhand studying in Classes 8 to 12 (family eligibility rules apply).", hi: "झारखंड की कक्षा 8 से 12 में पढ़ने वाली छात्राएँ (परिवार की पात्रता के नियम लागू)।" },
    how: { en: "Apply through the school / Anganwadi with Aadhaar and bank account.", hi: "आधार और बैंक खाते के साथ स्कूल / आंगनबाड़ी से आवेदन करें।" },
    classFrom: 8,
    classTo: 12,
    girlsOnly: true,
    kind: "scholarship",
  },
  {
    id: "nmms",
    icon: "🏅",
    name: { en: "NMMS scholarship (National Means-cum-Merit)", hi: "NMMS छात्रवृत्ति (राष्ट्रीय साधन-सह-मेधा)" },
    benefit: { en: "₹12,000 a year from Class 9 to 12 for students who clear the exam.", hi: "परीक्षा पास करने पर कक्षा 9 से 12 तक हर साल ₹12,000।" },
    who: {
      en: "Class 8 students of government schools; family income up to ₹3.5 lakh a year and the marks required in Class 7.",
      hi: "सरकारी स्कूल के कक्षा 8 के छात्र; परिवार की सालाना आय ₹3.5 लाख तक और कक्षा 7 में ज़रूरी अंक।",
    },
    how: { en: "Fill the NMMS exam form in Class 8 (ask your teacher), then renew on the National Scholarship Portal.", hi: "कक्षा 8 में NMMS परीक्षा का फ़ॉर्म भरें (शिक्षक से पूछें), फिर राष्ट्रीय छात्रवृत्ति पोर्टल पर नवीकरण करें।" },
    classFrom: 8,
    classTo: 12,
    kind: "scholarship",
    link: "https://scholarships.gov.in",
  },
  {
    id: "prematric",
    icon: "🎓",
    name: { en: "Pre-matric scholarship", hi: "प्री-मैट्रिक छात्रवृत्ति" },
    benefit: { en: "Yearly scholarship for school students up to Class 10.", hi: "कक्षा 10 तक के छात्रों के लिए वार्षिक छात्रवृत्ति।" },
    who: { en: "Eligible SC, ST, OBC and minority students (income limits apply).", hi: "पात्र SC, ST, OBC और अल्पसंख्यक छात्र (आय सीमा लागू)।" },
    how: { en: "Apply on the Jharkhand e-Kalyan portal through the school.", hi: "स्कूल के माध्यम से झारखंड ई-कल्याण पोर्टल पर आवेदन करें।" },
    classFrom: 1,
    classTo: 10,
    categories: ["SC", "ST", "OBC", "Minority"],
    kind: "scholarship",
    link: "https://ekalyan.cgg.gov.in",
  },
  {
    id: "postmatric",
    icon: "🎓",
    name: { en: "Post-matric scholarship", hi: "पोस्ट-मैट्रिक छात्रवृत्ति" },
    benefit: { en: "Scholarship for Class 11, 12 and college.", hi: "कक्षा 11, 12 और कॉलेज की पढ़ाई के लिए छात्रवृत्ति।" },
    who: { en: "Eligible SC, ST, OBC and minority students (income limits apply).", hi: "पात्र SC, ST, OBC और अल्पसंख्यक छात्र (आय सीमा लागू)।" },
    how: { en: "Apply on the e-Kalyan portal (state) or the National Scholarship Portal (central schemes).", hi: "ई-कल्याण पोर्टल (राज्य) या राष्ट्रीय छात्रवृत्ति पोर्टल (केंद्र) पर आवेदन करें।" },
    classFrom: 11,
    classTo: 13,
    categories: ["SC", "ST", "OBC", "Minority"],
    kind: "scholarship",
    link: "https://ekalyan.cgg.gov.in",
  },
  {
    id: "guruji",
    icon: "💳",
    name: { en: "Guruji Student Credit Card Yojana", hi: "गुरुजी स्टूडेंट क्रेडिट कार्ड योजना" },
    benefit: { en: "Low-interest education loan for higher studies after Class 10 / 12.", hi: "10वीं / 12वीं के बाद उच्च शिक्षा के लिए कम ब्याज पर शिक्षा ऋण।" },
    who: { en: "Students who passed Class 10 or 12 from Jharkhand, for higher education courses.", hi: "झारखंड से 10वीं या 12वीं पास छात्र, उच्च शिक्षा के कोर्स के लिए।" },
    how: { en: "Apply online on the state's Guruji Credit Card portal; check current rules there.", hi: "राज्य के गुरुजी क्रेडिट कार्ड पोर्टल पर ऑनलाइन आवेदन करें; ताज़ा नियम वहीं देखें।" },
    classFrom: 11,
    classTo: 13,
    kind: "higher",
  },
  {
    id: "inspire",
    icon: "🔬",
    name: { en: "INSPIRE scholarship (SHE)", hi: "इंस्पायर छात्रवृत्ति (SHE)" },
    benefit: { en: "Scholarship for B.Sc / M.Sc in natural sciences.", hi: "प्राकृतिक विज्ञान में B.Sc / M.Sc के लिए छात्रवृत्ति।" },
    who: { en: "Top-scoring Class 12 students (top 1% of the board) who take up science degrees.", hi: "12वीं बोर्ड में सबसे ऊपर के 1% छात्र जो विज्ञान में डिग्री लेते हैं।" },
    how: { en: "Apply online on the INSPIRE (DST) portal after admission.", hi: "एडमिशन के बाद INSPIRE (DST) पोर्टल पर ऑनलाइन आवेदन करें।" },
    classFrom: 13,
    classTo: 13,
    kind: "higher",
    link: "https://online-inspire.gov.in",
  },
  {
    id: "kgbv",
    icon: "🏫",
    name: { en: "Kasturba Gandhi Balika Vidyalaya (KGBV)", hi: "कस्तूरबा गांधी बालिका विद्यालय (KGBV)" },
    benefit: { en: "Free residential schooling with hostel and meals for girls.", hi: "लड़कियों के लिए हॉस्टल और भोजन के साथ मुफ़्त आवासीय पढ़ाई।" },
    who: { en: "Girls from disadvantaged groups, Classes 6 to 12.", hi: "वंचित वर्गों की कक्षा 6 से 12 की लड़कियाँ।" },
    how: { en: "Ask the block education office (BEO) about admission.", hi: "एडमिशन के लिए प्रखंड शिक्षा कार्यालय (BEO) से संपर्क करें।" },
    classFrom: 6,
    classTo: 12,
    girlsOnly: true,
    kind: "school",
  },
  {
    id: "rbsk",
    icon: "🩺",
    name: { en: "Rashtriya Bal Swasthya Karyakram (RBSK)", hi: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)" },
    benefit: { en: "Free health check-ups in school and free treatment for listed conditions.", hi: "स्कूल में मुफ़्त स्वास्थ्य जाँच और चुनी हुई बीमारियों का मुफ़्त इलाज।" },
    who: { en: "All children in government schools.", hi: "सरकारी स्कूलों के सभी बच्चे।" },
    how: { en: "Health teams visit the school; no form needed.", hi: "स्वास्थ्य टीम स्कूल आती है; कोई फ़ॉर्म नहीं।" },
    classFrom: 1,
    classTo: 12,
    kind: "school",
  },
];

export const SCHEME_DOCUMENTS: Bi[] = [
  { en: "Aadhaar card of the student", hi: "छात्र का आधार कार्ड" },
  { en: "Bank account in the student's name, linked with Aadhaar (for DBT)", hi: "छात्र के नाम से बैंक खाता, आधार से जुड़ा (DBT के लिए)" },
  { en: "Caste certificate (SC / ST / OBC)", hi: "जाति प्रमाण पत्र (SC / ST / OBC)" },
  { en: "Income certificate", hi: "आय प्रमाण पत्र" },
  { en: "Residence certificate", hi: "निवास प्रमाण पत्र" },
  { en: "Marksheet of the previous class", hi: "पिछली कक्षा की मार्कशीट" },
  { en: "Passport-size photo", hi: "पासपोर्ट साइज़ फ़ोटो" },
];
