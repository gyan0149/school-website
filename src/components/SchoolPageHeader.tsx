import { useLocation } from "react-router-dom";
import { imageUrl } from "../data/schools";
import { useSchool, useSchoolPath } from "../schoolContext";
import { PageHeader } from "./ui";

// Order in which a school's photos are handed out to page headers.
const PAGE_PHOTO_ORDER = [
  "principal",
  "about",
  "school-information",
  "academics",
  "admissions",
  "contact",
  "notices",
  "results",
  "infrastructure",
  "downloads",
  "gallery",
];

export function SchoolPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const school = useSchool();
  const to = useSchoolPath();
  const page = useLocation().pathname.split("/").filter(Boolean).pop() ?? "";
  const photos = school.photos ?? [];
  const slot = PAGE_PHOTO_ORDER.indexOf(page);
  const photo = photos.length && slot >= 0 ? photos[slot % photos.length] : undefined;

  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      homeTo={to()}
      image={photo ? { src: imageUrl(photo.src), alt: photo.caption } : undefined}
    />
  );
}
