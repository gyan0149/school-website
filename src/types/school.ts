// Shapes mirror the Firestore collections we plan to add later.

export interface SchoolProfile {
  name: string;
  shortName: string;
  udiseCode: string;
  affiliation: string;
  department: string;
  address: string;
  state: string;
  district: string;
  block: string;
  established: number;
  category: "Boys" | "Girls" | "Co-educational";
  type: "Primary" | "Middle" | "Secondary" | "Senior Secondary";
  board: string;
  classes: string;
  medium: string[];
  shift: string;
  timings: { label: string; value: string }[];
  principalName: string;
  vision: string;
  objectives: string[];
  history: string[];
  totalStudents: number;
  totalTeachers: number;
  phone: string;
  email: string;
  officeTimings: string;
  mapEmbedUrl: string;
  mapLink: string;
}

export interface PrincipalMessage {
  name: string;
  designation: string;
  message: string[];
}

export type NoticeCategory =
  | "General"
  | "Holiday"
  | "Examination"
  | "Admission"
  | "PTM"
  | "Government Circular"
  | "Academic"
  | "Recruitment";

export interface Notice {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: NoticeCategory;
  description: string;
  attachmentUrl?: string;
  status: "active" | "archived";
  isNew?: boolean;
}

export interface QuickLink {
  label: string;
  to: string;
  external?: boolean;
  icon: string;
}

export interface Highlight {
  label: string;
  value: string;
}

export interface ClassStrength {
  className: string;
  sections: number;
  boys: number;
  girls: number;
}

export interface InfrastructureItem {
  name: string;
  count: string;
  details: string;
}

export interface Facility {
  name: string;
  icon: string;
  available: boolean;
  details: string;
}

export interface Stream {
  name: string;
  subjects: string[];
  seats: number;
}

export interface SubjectGroup {
  classes: string;
  subjects: string[];
}

export interface CalendarEvent {
  month: string;
  events: string[];
}

export interface ExamScheduleRow {
  exam: string;
  classes: string;
  dates: string;
}

export interface DocumentLink {
  title: string;
  category: string;
  url: string;
  size?: string;
  updated?: string;
}

export interface BoardResult {
  year: number;
  appeared: number;
  passed: number;
  passPercentage: number;
  distinctions: number;
}

export interface SchoolExamResult {
  className: string;
  exam: string;
  passPercentage: number;
}

export interface Topper {
  name: string;
  className: "10" | "12";
  stream?: string;
  year: number;
  percentage: number;
}

export interface Achievement {
  title: string;
  year: number;
  type: "Academic" | "Sports" | "Award";
  description: string;
}

export type StaffGroup =
  | "Principal"
  | "Vice Principal"
  | "PGT"
  | "TGT"
  | "PRT"
  | "Librarian"
  | "Physical Education"
  | "Special Educator"
  | "Administrative"
  | "Non-Teaching";

export interface StaffMember {
  name: string;
  designation: string;
  department?: string;
  group: StaffGroup;
}

export interface AdmissionClassGroup {
  group: string;
  classes: string;
  eligibility: string;
  mode: string;
  schedule: string;
}

export interface ScheduleItem {
  activity: string;
  date: string;
}

export type GalleryCategory =
  | "School Building"
  | "Classrooms"
  | "Independence Day"
  | "Republic Day"
  | "Annual Function"
  | "Sports"
  | "Science Exhibition"
  | "Other Events";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  date: string;
  imageUrl?: string;
}

export interface GovLink {
  label: string;
  url: string;
}

export interface Scheme {
  name: string;
  details: string;
}

export interface Landmark {
  name: string;
  type: string;
  distance: string;
}
