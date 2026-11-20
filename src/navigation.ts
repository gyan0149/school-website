// Single source for nav menu and routes; paths are relative to the school's base path.
export interface NavItem {
  label: string;
  hi: string;
  path: string;
  // Hover hint in Hindi: what opens on click.
  hint: string;
}

export const navItems: NavItem[] = [
  { label: "Home", hi: "होम", path: "", hint: "मुख्य पेज" },
  { label: "About School", hi: "स्कूल के बारे में", path: "about", hint: "स्कूल का इतिहास और जानकारी" },
  { label: "School Information", hi: "स्कूल की जानकारी", path: "school-information", hint: "कक्षाएँ, शिक्षक, सुविधाएँ" },
  { label: "Academics", hi: "पढ़ाई", path: "academics", hint: "विषय और स्ट्रीम" },
  { label: "Admissions", hi: "एडमिशन", path: "admissions", hint: "एडमिशन के नियम और ज़रूरी कागज़ात" },
  { label: "Principal's Desk", hi: "प्रधानाध्यापक", path: "principal", hint: "प्रधानाध्यापक का संदेश" },
  { label: "Notices & Circulars", hi: "सूचनाएँ", path: "notices", hint: "सूचनाएँ देखें और अपलोड करें" },
  { label: "Results & Achievements", hi: "रिज़ल्ट", path: "results", hint: "रिज़ल्ट देखें और अपलोड करें" },
  { label: "AI Learning", hi: "AI से पढ़ाई", path: "ai", hint: "AI से पढ़ाई, क्विज़, करियर और शिक्षक टूल" },
  { label: "Welfare Schemes", hi: "सरकारी योजनाएँ", path: "schemes", hint: "छात्रवृत्ति और सरकारी योजनाएँ" },
  { label: "Activities", hi: "सह-पाठ्यक्रम गतिविधियाँ", path: "activities", hint: "खेल, कला, क्लब और गतिविधियाँ" },
  { label: "Infrastructure", hi: "भवन व सुविधाएँ", path: "infrastructure", hint: "भवन, लैब, लाइब्रेरी (जल्द)" },
  { label: "Photo Gallery", hi: "फ़ोटो गैलरी", path: "gallery", hint: "फ़ोटो देखें और अपलोड करें" },
  { label: "Downloads", hi: "डाउनलोड", path: "downloads", hint: "फ़ॉर्म डाउनलोड और अपलोड करें" },
  { label: "Contact Us", hi: "संपर्क", path: "contact", hint: "फ़ोन, पता और नक्शा" },
];

// Sections with no real data yet; shown as "Coming soon".
export const comingSoonPages: Record<string, { title: string; titleHi: string; text: string; textHi: string }> = {
  infrastructure: {
    title: "Infrastructure",
    titleHi: "भवन व सुविधाएँ",
    text: "Details of classrooms, labs, library, playground and other facilities will be added here.",
    textHi: "कक्षाओं, लैब, लाइब्रेरी, खेल के मैदान और दूसरी सुविधाओं की जानकारी यहाँ जोड़ी जाएगी।",
  },
};
