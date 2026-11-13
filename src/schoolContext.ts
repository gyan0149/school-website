import { createContext, useContext } from "react";
import type { School } from "./types/school";

export const SchoolContext = createContext<School | null>(null);

export function useSchool(): School {
  const school = useContext(SchoolContext);
  if (!school) throw new Error("useSchool must be used inside a school route");
  return school;
}

// Builds a link inside the current school's site, e.g. "about" -> "/2001.../about".
export function useSchoolPath() {
  const school = useSchool();
  return (path = "") => `/${school.udise}${path ? `/${path}` : ""}`;
}
