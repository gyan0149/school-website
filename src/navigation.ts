// Single source for nav menu and routes; paths are relative to the school's base path.
export interface NavItem {
  label: string;
  path: string;
  // Hover hint in Hindi: what opens on click.
  hint: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "", hint: "मुख्य पेज" },
  { label: "About School", path: "about", hint: "स्कूल का इतिहास और जानकारी" },
  { label: "School Information", path: "school-information", hint: "कक्षाएँ, शिक्षक, सुविधाएँ" },
  { label: "Academics", path: "academics", hint: "विषय और स्ट्रीम" },
  { label: "Admissions", path: "admissions", hint: "एडमिशन के नियम और ज़रूरी कागज़ात" },
  { label: "Principal's Desk", path: "principal", hint: "प्रधानाध्यापक का संदेश" },
  { label: "Notices & Circulars", path: "notices", hint: "नोटिस और सूचनाएँ (जल्द)" },
  { label: "Results & Achievements", path: "results", hint: "परीक्षा परिणाम (जल्द)" },
  { label: "Infrastructure", path: "infrastructure", hint: "भवन, लैब, लाइब्रेरी (जल्द)" },
  { label: "Photo Gallery", path: "gallery", hint: "स्कूल की फ़ोटो" },
  { label: "Downloads", path: "downloads", hint: "फ़ॉर्म और दस्तावेज़ (जल्द)" },
  { label: "Contact Us", path: "contact", hint: "फ़ोन, पता और नक्शा" },
];

// Sections with no real data yet; shown as "Coming soon".
export const comingSoonPages: Record<string, { title: string; text: string }> = {
  notices: { title: "Notices & Circulars", text: "School notices, holiday lists and circulars will be published here." },
  results: { title: "Results & Achievements", text: "Board results, toppers and achievements of the school will be published here." },
  infrastructure: { title: "Infrastructure", text: "Details of classrooms, labs, library, playground and other facilities will be added here." },
  gallery: { title: "Photo Gallery", text: "Photos of the school, events and celebrations will be added here." },
  downloads: { title: "Downloads", text: "Admission forms, academic calendar, syllabus and other documents will be available here." },
};
