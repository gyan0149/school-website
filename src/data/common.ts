// General information shared by all CM Schools of Excellence (not school-specific).
import type { GovLink, Scheme, SubjectGroup } from "../types/school";

export const AFFILIATION = "Government of Jharkhand";
export const DEPARTMENT = "School Education & Literacy Department";

export const ABOUT_CM_SOE_HI =
  "मुख्यमंत्री उत्कृष्ट विद्यालय (CM SoE) झारखंड सरकार द्वारा चुने गए सरकारी स्कूल हैं, जहाँ बच्चों को बेहतर कक्षाओं, लैब, पुस्तकालय और प्रशिक्षित शिक्षकों के साथ मुफ़्त गुणवत्तापूर्ण शिक्षा दी जाती है।";

export const ABOUT_CM_SOE =
  "CM Schools of Excellence (CM SoE) are government schools selected by the Government of Jharkhand to give children quality education with better classrooms, labs, libraries and trained teachers, free of cost.";

export const govLinks: GovLink[] = [
  { label: "Government of Jharkhand", url: "https://www.jharkhand.gov.in" },
  { label: "Jharkhand Education Project Council", url: "https://jepc.jharkhand.gov.in" },
  { label: "Central Board of Secondary Education (CBSE)", url: "https://www.cbse.gov.in" },
  { label: "Jharkhand Academic Council (JAC)", url: "https://jac.jharkhand.gov.in" },
  { label: "Ministry of Education", url: "https://www.education.gov.in" },
  { label: "UDISE+", url: "https://udiseplus.gov.in" },
  { label: "DIKSHA", url: "https://diksha.gov.in" },
];

export const welfareSchemes: Scheme[] = [
  { name: "Free textbooks and uniform", details: "For students of Classes 1 to 8." },
  { name: "PM POSHAN (mid-day meal)", details: "Hot cooked meal for Classes 1 to 8." },
  { name: "Bicycle distribution", details: "Free bicycle for eligible Class 8 students under the state scheme." },
  { name: "Savitribai Phule Kishori Samriddhi Yojana", details: "Financial support for eligible girls from Class 8 onwards." },
  { name: "Pre- and post-matric scholarships", details: "For eligible SC, ST, OBC and minority students through the e-Kalyan portal." },
];

export const subjectGroups: SubjectGroup[] = [
  { from: 1, to: 2, subjects: ["Hindi", "English", "Mathematics", "Art & Craft", "Games"] },
  { from: 3, to: 5, subjects: ["Hindi", "English", "Mathematics", "Environmental Studies", "Art & Craft", "Games"] },
  { from: 6, to: 8, subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Sanskrit / Urdu"] },
  { from: 9, to: 10, subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Skill subject"] },
  { from: 11, to: 12, subjects: ["As per stream: Science, Commerce or Humanities"] },
];

export const STREAMS = ["Science", "Commerce", "Humanities"];

export const admissionGuidelines: string[] = [
  "Admissions are made as per the guidelines of the School Education & Literacy Department, Government of Jharkhand.",
  "Education is free for Classes 1 to 8 under the RTE Act. No donation or capitation fee is charged.",
  "Class 11 admission (where available) is based on Class 10 board marks and seat availability in each stream.",
  "Children with special needs (CWSN) are admitted with the necessary support.",
  "For exact dates and seats, please contact the school office.",
];

export const requiredDocuments: string[] = [
  "Birth certificate (for entry class)",
  "Aadhaar card of the child",
  "Transfer certificate (TC) from the previous school",
  "Marksheet of the previous class",
  "Caste and income certificate (for scholarships, if applicable)",
  "Bank passbook of the child (for DBT schemes)",
  "Passport-size photographs",
];

export const admissionGuidelinesHi: string[] = [
  "एडमिशन स्कूली शिक्षा एवं साक्षरता विभाग, झारखंड सरकार के दिशानिर्देशों के अनुसार होते हैं।",
  "RTE कानून के तहत कक्षा 1 से 8 तक पढ़ाई मुफ़्त है। कोई डोनेशन या कैपिटेशन फ़ीस नहीं ली जाती।",
  "कक्षा 11 में एडमिशन (जहाँ उपलब्ध हो) 10वीं बोर्ड के अंकों और हर स्ट्रीम में सीटों के आधार पर होता है।",
  "विशेष आवश्यकता वाले बच्चों (CWSN) को ज़रूरी सहायता के साथ एडमिशन दिया जाता है।",
  "सही तारीख और सीटों के लिए स्कूल कार्यालय से संपर्क करें।",
];

export const requiredDocumentsHi: string[] = [
  "जन्म प्रमाण पत्र (प्रवेश कक्षा के लिए)",
  "बच्चे का आधार कार्ड",
  "पिछले स्कूल का स्थानांतरण प्रमाण पत्र (TC)",
  "पिछली कक्षा की मार्कशीट",
  "जाति और आय प्रमाण पत्र (छात्रवृत्ति के लिए, यदि लागू हो)",
  "बच्चे का बैंक पासबुक (DBT योजनाओं के लिए)",
  "पासपोर्ट साइज़ फ़ोटो",
];
