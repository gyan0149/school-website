// Single source for nav menu and routes.
export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About School", path: "/about" },
  { label: "School Information", path: "/school-information" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Principal", path: "/principal" },
  { label: "Notices & Circulars", path: "/notices" },
  { label: "Results & Achievements", path: "/results" },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Photo Gallery", path: "/gallery" },
  { label: "Downloads", path: "/downloads" },
  { label: "Contact Us", path: "/contact" },
];
