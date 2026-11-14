// Single source for nav menu and routes; paths are relative to the school's base path.
export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "" },
  { label: "About School", path: "about" },
  { label: "School Information", path: "school-information" },
  { label: "Academics", path: "academics" },
  { label: "Admissions", path: "admissions" },
  { label: "Principal's Desk", path: "principal" },
  { label: "Notices & Circulars", path: "notices" },
  { label: "Results & Achievements", path: "results" },
  { label: "Infrastructure", path: "infrastructure" },
  { label: "Photo Gallery", path: "gallery" },
  { label: "Downloads", path: "downloads" },
  { label: "Contact Us", path: "contact" },
];

// Sections with no real data yet; shown as "Coming soon".
export const comingSoonPages: Record<string, { title: string; text: string }> = {
  notices: { title: "Notices & Circulars", text: "School notices, holiday lists and circulars will be published here." },
  results: { title: "Results & Achievements", text: "Board results, toppers and achievements of the school will be published here." },
  infrastructure: { title: "Infrastructure", text: "Details of classrooms, labs, library, playground and other facilities will be added here." },
  gallery: { title: "Photo Gallery", text: "Photos of the school, events and celebrations will be added here." },
  downloads: { title: "Downloads", text: "Admission forms, academic calendar, syllabus and other documents will be available here." },
};
