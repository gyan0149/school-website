export interface SchoolBase {
  slNo: number;
  udise: string;
  district: string;
  block: string;
  name: string;
  classFrom: number;
  classTo: number;
  hmName: string | null;
  hmPhone: string;
}

export interface SchoolPhoto {
  src: string;
  caption: string;
}

export interface Landmark {
  name: string;
  type: string;
  distance: string;
}

// Optional details known only for some schools.
export interface SchoolExtra {
  established?: number;
  totalTeachers?: number;
  pinCode?: string;
  village?: string;
  coords?: { lat: number; lng: number };
  landmarks?: Landmark[];
  // Real photos (file names under public/images/); bannerPhoto replaces the demo gate picture.
  bannerPhoto?: string;
  photos?: SchoolPhoto[];
}

export type School = SchoolBase & SchoolExtra;

export interface GovLink {
  label: string;
  url: string;
}

export interface Scheme {
  name: string;
  details: string;
}

export interface SubjectGroup {
  from: number;
  to: number;
  subjects: string[];
}
