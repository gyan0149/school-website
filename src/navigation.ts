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
  { label: "Notices & Circulars", path: "notices", hint: "सूचनाएँ देखें और अपलोड करें" },
  { label: "Results & Achievements", path: "results", hint: "रिज़ल्ट देखें और अपलोड करें" },
  { label: "Infrastructure", path: "infrastructure", hint: "भवन, लैब, लाइब्रेरी (जल्द)" },
  { label: "Photo Gallery", path: "gallery", hint: "फ़ोटो देखें और अपलोड करें" },
  { label: "Downloads", path: "downloads", hint: "फ़ॉर्म डाउनलोड और अपलोड करें" },
  { label: "Contact Us", path: "contact", hint: "फ़ोन, पता और नक्शा" },
];

// Sections with no real data yet; shown as "Coming soon".
export const comingSoonPages: Record<string, { title: string; text: string }> = {
  infrastructure: { title: "Infrastructure", text: "Details of classrooms, labs, library, playground and other facilities will be added here." },
};
