// Built-in practice questions, used in demo mode (and offline) for the Practice Quiz.
import type { Bi } from "../i18n";

export interface QuizQuestion {
  question: Bi;
  options: Bi[];
  answer: number;
  explain: Bi;
}

const b = (en: string, hi: string): Bi => ({ en, hi });

export const QUIZ_SUBJECTS = [
  { id: "science", name: b("Science", "विज्ञान") },
  { id: "maths", name: b("Mathematics", "गणित") },
  { id: "gk", name: b("GK: Jharkhand", "सामान्य ज्ञान: झारखंड") },
  { id: "english", name: b("English", "अंग्रेज़ी") },
] as const;

export type QuizSubject = (typeof QUIZ_SUBJECTS)[number]["id"];

export const QUIZ_BANK: Record<QuizSubject, QuizQuestion[]> = {
  science: [
    {
      question: b("Which gas do green plants give out during photosynthesis?", "प्रकाश संश्लेषण में हरे पौधे कौन-सी गैस छोड़ते हैं?"),
      options: [b("Oxygen", "ऑक्सीजन"), b("Carbon dioxide", "कार्बन डाइऑक्साइड"), b("Nitrogen", "नाइट्रोजन"), b("Hydrogen", "हाइड्रोजन")],
      answer: 0,
      explain: b("Plants take in carbon dioxide and give out oxygen while making food.", "पौधे भोजन बनाते समय कार्बन डाइऑक्साइड लेते हैं और ऑक्सीजन छोड़ते हैं।"),
    },
    {
      question: b("What is the SI unit of electric current?", "विद्युत धारा का SI मात्रक क्या है?"),
      options: [b("Volt", "वोल्ट"), b("Ampere", "एम्पियर"), b("Ohm", "ओम"), b("Watt", "वाट")],
      answer: 1,
      explain: b("Current is measured in ampere (A); volt is for potential difference, ohm for resistance.", "धारा एम्पियर (A) में मापी जाती है; वोल्ट विभवांतर का और ओम प्रतिरोध का मात्रक है।"),
    },
    {
      question: b("Which organ pumps blood through the body?", "शरीर में खून कौन-सा अंग पंप करता है?"),
      options: [b("Lungs", "फेफड़े"), b("Kidney", "गुर्दा"), b("Heart", "हृदय"), b("Liver", "यकृत")],
      answer: 2,
      explain: b("The heart pumps blood to all parts of the body through blood vessels.", "हृदय रक्त वाहिकाओं के ज़रिए पूरे शरीर में खून पंप करता है।"),
    },
    {
      question: b("At sea level, water boils at:", "समुद्र तल पर पानी किस तापमान पर उबलता है?"),
      options: [b("50 °C", "50 °C"), b("90 °C", "90 °C"), b("100 °C", "100 °C"), b("120 °C", "120 °C")],
      answer: 2,
      explain: b("Pure water boils at 100 °C at normal atmospheric pressure.", "सामान्य वायुमंडलीय दाब पर शुद्ध पानी 100 °C पर उबलता है।"),
    },
    {
      question: b("Light travels fastest in:", "प्रकाश सबसे तेज़ किसमें चलता है?"),
      options: [b("Water", "पानी"), b("Glass", "काँच"), b("Vacuum", "निर्वात"), b("Air", "हवा")],
      answer: 2,
      explain: b("Light is fastest in vacuum (about 3 lakh km per second) and slows down in other materials.", "प्रकाश निर्वात में सबसे तेज़ (लगभग 3 लाख किमी प्रति सेकंड) चलता है और दूसरे माध्यमों में धीमा हो जाता है।"),
    },
  ],
  maths: [
    {
      question: b("What is 15% of 200?", "200 का 15% कितना है?"),
      options: [b("15", "15"), b("20", "20"), b("30", "30"), b("35", "35")],
      answer: 2,
      explain: b("15% of 200 = 15/100 × 200 = 30.", "200 का 15% = 15/100 × 200 = 30।"),
    },
    {
      question: b("(a + b)² is equal to:", "(a + b)² किसके बराबर है?"),
      options: [b("a² + b²", "a² + b²"), b("a² + 2ab + b²", "a² + 2ab + b²"), b("a² − 2ab + b²", "a² − 2ab + b²"), b("2a + 2b", "2a + 2b")],
      answer: 1,
      explain: b("(a + b)² = (a + b)(a + b) = a² + 2ab + b².", "(a + b)² = (a + b)(a + b) = a² + 2ab + b²।"),
    },
    {
      question: b("The sum of the angles of a triangle is:", "त्रिभुज के तीनों कोणों का योग होता है:"),
      options: [b("90°", "90°"), b("180°", "180°"), b("270°", "270°"), b("360°", "360°")],
      answer: 1,
      explain: b("In every triangle the three angles add up to 180°.", "हर त्रिभुज के तीनों कोणों का योग 180° होता है।"),
    },
    {
      question: b("What is the LCM of 4 and 6?", "4 और 6 का लघुत्तम समापवर्त्य (LCM) क्या है?"),
      options: [b("2", "2"), b("10", "10"), b("12", "12"), b("24", "24")],
      answer: 2,
      explain: b("Multiples of 4: 4, 8, 12… Multiples of 6: 6, 12… The smallest common one is 12.", "4 के गुणज: 4, 8, 12… 6 के गुणज: 6, 12… सबसे छोटा साझा गुणज 12 है।"),
    },
    {
      question: b("Area of a rectangle 8 cm long and 5 cm wide:", "8 सेमी लंबे और 5 सेमी चौड़े आयत का क्षेत्रफल:"),
      options: [b("13 cm²", "13 सेमी²"), b("26 cm²", "26 सेमी²"), b("40 cm²", "40 सेमी²"), b("80 cm²", "80 सेमी²")],
      answer: 2,
      explain: b("Area = length × breadth = 8 × 5 = 40 cm². (26 cm is the perimeter.)", "क्षेत्रफल = लंबाई × चौड़ाई = 8 × 5 = 40 सेमी²। (26 सेमी परिमाप है।)"),
    },
  ],
  gk: [
    {
      question: b("When was Jharkhand formed as a state?", "झारखंड राज्य कब बना?"),
      options: [b("15 August 1947", "15 अगस्त 1947"), b("15 November 2000", "15 नवंबर 2000"), b("26 January 1950", "26 जनवरी 1950"), b("1 November 2000", "1 नवंबर 2000")],
      answer: 1,
      explain: b("Jharkhand was carved out of Bihar on 15 November 2000.", "झारखंड 15 नवंबर 2000 को बिहार से अलग होकर बना।"),
    },
    {
      question: b("What is the capital of Jharkhand?", "झारखंड की राजधानी क्या है?"),
      options: [b("Jamshedpur", "जमशेदपुर"), b("Dhanbad", "धनबाद"), b("Ranchi", "रांची"), b("Bokaro", "बोकारो")],
      answer: 2,
      explain: b("Ranchi is the capital of Jharkhand.", "रांची झारखंड की राजधानी है।"),
    },
    {
      question: b("Which is the highest peak of Jharkhand?", "झारखंड की सबसे ऊँची चोटी कौन-सी है?"),
      options: [b("Parasnath", "पारसनाथ"), b("Netarhat", "नेतरहाट"), b("Dalma", "दलमा"), b("Rajmahal", "राजमहल")],
      answer: 0,
      explain: b("Parasnath hill in Giridih district is the highest peak of Jharkhand.", "गिरिडीह ज़िले की पारसनाथ पहाड़ी झारखंड की सबसे ऊँची चोटी है।"),
    },
    {
      question: b("Bhagwan Birsa Munda's birth anniversary is celebrated on:", "भगवान बिरसा मुंडा की जयंती कब मनाई जाती है?"),
      options: [b("15 November", "15 नवंबर"), b("2 October", "2 अक्टूबर"), b("30 June", "30 जून"), b("26 January", "26 जनवरी")],
      answer: 0,
      explain: b("15 November is Birsa Munda Jayanti and also Jharkhand Foundation Day.", "15 नवंबर को बिरसा मुंडा जयंती और झारखंड स्थापना दिवस दोनों मनाए जाते हैं।"),
    },
    {
      question: b("Hundru Falls near Ranchi is on which river?", "रांची के पास हुंडरू जलप्रपात किस नदी पर है?"),
      options: [b("Damodar", "दामोदर"), b("Subarnarekha", "स्वर्णरेखा"), b("Koel", "कोयल"), b("Barakar", "बराकर")],
      answer: 1,
      explain: b("Hundru Falls is formed by the Subarnarekha river.", "हुंडरू जलप्रपात स्वर्णरेखा नदी पर है।"),
    },
  ],
  english: [
    {
      question: b("What is the plural of 'child'?", "'child' का बहुवचन क्या है?"),
      options: [b("childs", "childs"), b("childes", "childes"), b("children", "children"), b("childrens", "childrens")],
      answer: 2,
      explain: b("'Child' has an irregular plural: 'children'.", "'Child' का बहुवचन अनियमित है: 'children'।"),
    },
    {
      question: b("Choose the opposite of 'ancient'.", "'ancient' का विलोम चुनें।"),
      options: [b("old", "old"), b("modern", "modern"), b("historic", "historic"), b("early", "early")],
      answer: 1,
      explain: b("'Ancient' means very old; its opposite is 'modern'.", "'Ancient' का अर्थ बहुत पुराना है; इसका विलोम 'modern' (आधुनिक) है।"),
    },
    {
      question: b("Which sentence is correct?", "कौन-सा वाक्य सही है?"),
      options: [b("She go to school every day.", "She go to school every day."), b("She goes to school every day.", "She goes to school every day."), b("She going to school every day.", "She going to school every day."), b("She gone to school every day.", "She gone to school every day.")],
      answer: 1,
      explain: b("With he/she/it in the simple present, the verb takes -s/-es: 'goes'.", "Simple present में he/she/it के साथ क्रिया में -s/-es लगता है: 'goes'।"),
    },
    {
      question: b("Choose the word with the same meaning as 'happy'.", "'happy' का समानार्थी शब्द चुनें।"),
      options: [b("sad", "sad"), b("angry", "angry"), b("glad", "glad"), b("tired", "tired")],
      answer: 2,
      explain: b("'Glad' means happy.", "'Glad' का अर्थ भी खुश (happy) है।"),
    },
    {
      question: b("What is the past tense of 'write'?", "'write' का भूतकाल (past tense) क्या है?"),
      options: [b("writed", "writed"), b("wrote", "wrote"), b("written", "written"), b("writing", "writing")],
      answer: 1,
      explain: b("write → wrote → written. The simple past is 'wrote'.", "write → wrote → written। Simple past 'wrote' है।"),
    },
  ],
};
