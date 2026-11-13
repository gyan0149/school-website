// Demo data only. Replace with real school details, later served from Firebase.
import type {
  Achievement,
  AdmissionClassGroup,
  BoardResult,
  CalendarEvent,
  ClassStrength,
  DocumentLink,
  ExamScheduleRow,
  Facility,
  GalleryItem,
  GovLink,
  Highlight,
  InfrastructureItem,
  Landmark,
  Notice,
  PrincipalMessage,
  QuickLink,
  ScheduleItem,
  Scheme,
  SchoolExamResult,
  SchoolProfile,
  StaffMember,
  Stream,
  SubjectGroup,
  Topper,
} from "../types/school";

const SAMPLE_PDF = `${import.meta.env.BASE_URL}docs/sample-document.pdf`;

export const school: SchoolProfile = {
  name: "CM SoE Govt Upg +2 HS Birbal",
  shortName: "CM SoE Birbal",
  udiseCode: "20011900801",
  affiliation: "Government of Jharkhand",
  department: "School Education & Literacy Department",
  address: "Birbal, Sagma, Garhwa, Jharkhand – 822114",
  state: "Jharkhand",
  district: "Garhwa",
  block: "Sagma",
  established: 1957,
  category: "Co-educational",
  type: "Senior Secondary",
  board: "Central Board of Secondary Education (CBSE)",
  classes: "Class 1 to Class 12",
  medium: ["Hindi", "English"],
  shift: "Morning (Single shift)",
  timings: [
    { label: "Summer (Apr – Sep)", value: "7:00 AM – 12:30 PM" },
    { label: "Winter (Oct – Mar)", value: "9:30 AM – 3:30 PM" },
    { label: "Saturday", value: "7:00 AM – 11:00 AM (Bal Sansad & activities)" },
  ],
  principalName: "Dr. Pratiyush Dubey",
  vision:
    "To give every child of Jharkhand quality, inclusive education rooted in our culture and languages, and to prepare them for higher studies, skills and a dignified life.",
  objectives: [
    "Ensure foundational literacy and numeracy for every child in Classes 1 to 5.",
    "Offer Science, Commerce and Humanities streams at the +2 level.",
    "Teach and celebrate Jharkhand's tribal and regional languages alongside Hindi and English.",
    "Promote sports, especially hockey, football and archery, in which Jharkhand excels.",
    "Keep the campus safe, accessible and girl-friendly, and involve parents through the SMC.",
  ],
  history: [
    "The school was established in 1957 to serve children of Birbal and the nearby villages of Sagma block, Garhwa.",
    "It was later upgraded (Utkramit) to a +2 High School, offering classes up to Class 12.",
    "It has been selected by the Government of Jharkhand as a Chief Minister School of Excellence (CM SoE), with classes from 1 to 12.",
  ],
  totalStudents: 1472,
  totalTeachers: 32,
  phone: "94315 45940",
  email: "demo.school@example.edu.in",
  officeTimings: "Monday – Saturday, 9:00 AM – 2:00 PM (closed on government holidays)",
  // Birbal village centre (Google Maps). Replace with the school's exact pin when available.
  mapEmbedUrl: "https://www.google.com/maps?q=24.2070318,83.418992&z=15&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=24.2070318,83.418992",
};

// Nearby places as seen on Google Maps; distances are approximate from Birbal village.
export const landmarks: Landmark[] = [
  { name: "Shiv Mandir Birbal", type: "Temple", distance: "In Birbal village" },
  { name: "Makri", type: "Village (Birbal Gram Panchayat)", distance: "About 4 km north" },
  { name: "Sondiha and Shiv Mandir Sondiha", type: "Village / temple", distance: "About 3 km north-east" },
  { name: "Putur and Putur Dam", type: "Village / dam", distance: "About 2.5 km east" },
  { name: "Kalma", type: "Village", distance: "About 3 km south-east" },
  { name: "Sagma (block headquarters)", type: "Block office", distance: "About 5 km east" },
  { name: "Uttar Pradesh border", type: "State border", distance: "About 4–5 km west" },
  { name: "Garhwa (district headquarters)", type: "Town", distance: "About 57 km" },
];

export const principalMessage: PrincipalMessage = {
  name: school.principalName,
  designation: "Principal (Pradhanacharya)",
  message: [
    "Johar! Welcome to our school website.",
    "Our school serves children of Birbal and the villages around it in Sagma block. We want every child to study well, take part in sports and culture, and grow up proud of Jharkhand's rich heritage.",
    "Parents are requested to attend parent-teacher meetings, keep in touch with class teachers, and check this website regularly for notices.",
  ],
};

export const highlights: Highlight[] = [
  { label: "Established", value: String(school.established) },
  { label: "Classes", value: "1 – 12" },
  { label: "Students", value: school.totalStudents.toLocaleString("en-IN") },
  { label: "Teachers", value: String(school.totalTeachers) },
  { label: "Streams", value: "Sci · Com · Hum" },
  { label: "Board", value: "CBSE" },
];

export const quickLinks: QuickLink[] = [
  { label: "Admissions", to: "/admissions", icon: "📝" },
  { label: "Results", to: "/results", icon: "🏆" },
  { label: "CBSE Website", to: "https://www.cbse.gov.in", external: true, icon: "🎓" },
  { label: "Academic Calendar", to: "/academics#calendar", icon: "📅" },
  { label: "Downloads", to: "/downloads", icon: "📄" },
  { label: "Contact Us", to: "/contact", icon: "☎️" },
];

export const notices: Notice[] = [
  {
    id: "n-2026-052",
    title: "Jharkhand Sthapna Diwas and Bhagwan Birsa Munda Jayanti celebration – 15 November",
    date: "2026-11-12",
    category: "General",
    description:
      "The school will celebrate Jharkhand Foundation Day and Birsa Munda Jayanti on 15 November with flag hoisting at 8:00 AM, a quiz and cultural programmes. Attendance is compulsory.",
    status: "active",
    isNew: true,
  },
  {
    id: "n-2026-051",
    title: "CBSE Class 10 and 12 Board Examination 2027: submission of candidate details (LOC)",
    date: "2026-11-10",
    category: "Examination",
    description:
      "Students of Class 10 and Class 12 must verify their name, date of birth and subjects for the CBSE List of Candidates (LOC) and submit the exam fee through the school by 30 November 2026.",
    attachmentUrl: SAMPLE_PDF,
    status: "active",
    isNew: true,
  },
  {
    id: "n-2026-050",
    title: "Parent-Teacher Meeting on Saturday, 22 November 2026",
    date: "2026-11-08",
    category: "PTM",
    description:
      "A PTM for all classes will be held from 9:30 AM to 12:30 PM. Half-yearly progress reports will be shared with parents.",
    attachmentUrl: SAMPLE_PDF,
    status: "active",
  },
  {
    id: "n-2026-049",
    title: "Distribution of bicycles to Class 8 students",
    date: "2026-11-04",
    category: "Government Circular",
    description:
      "Under the state bicycle distribution scheme, eligible Class 8 students will receive bicycles on 25 November. Parents must bring the bank passbook and Aadhaar.",
    attachmentUrl: SAMPLE_PDF,
    status: "active",
  },
  {
    id: "n-2026-048",
    title: "Chhath Puja holidays",
    date: "2026-11-02",
    category: "Holiday",
    description: "The school will remain closed on account of Chhath Puja as per the department holiday list. Classes resume on the following working day.",
    attachmentUrl: SAMPLE_PDF,
    status: "active",
  },
  {
    id: "n-2026-047",
    title: "Remedial classes for Class 10 and 12 (CBSE Board 2027)",
    date: "2026-10-28",
    category: "Academic",
    description:
      "Extra classes in Mathematics, Science and English will be held daily after school from 1 December to 31 January.",
    attachmentUrl: SAMPLE_PDF,
    status: "active",
  },
  {
    id: "n-2026-040",
    title: "Durga Puja vacation",
    date: "2026-10-10",
    category: "Holiday",
    description: "The school will remain closed for Durga Puja as per the department holiday list.",
    status: "archived",
  },
  {
    id: "n-2026-031",
    title: "Admission in Class 11: stream-wise merit list",
    date: "2026-06-05",
    category: "Admission",
    description:
      "The merit list for Class 11 Science, Commerce and Humanities is attached. Selected students must complete admission by 20 June.",
    attachmentUrl: SAMPLE_PDF,
    status: "archived",
  },
  {
    id: "n-2026-020",
    title: "School Chalein Chalayen Abhiyan: enrolment drive for Class 1",
    date: "2026-04-02",
    category: "Admission",
    description: "Teachers will visit nearby villages to enrol all children aged 6 years and above. Parents may also come directly to the school office.",
    attachmentUrl: SAMPLE_PDF,
    status: "archived",
  },
  {
    id: "n-2026-012",
    title: "Sarhul festival holiday",
    date: "2026-03-18",
    category: "Holiday",
    description: "The school will remain closed for Sarhul as per the state holiday list.",
    status: "archived",
  },
];

export const classStrength: ClassStrength[] = [
  { className: "1", sections: 2, boys: 48, girls: 52 },
  { className: "2", sections: 2, boys: 51, girls: 49 },
  { className: "3", sections: 2, boys: 47, girls: 54 },
  { className: "4", sections: 2, boys: 50, girls: 50 },
  { className: "5", sections: 2, boys: 49, girls: 53 },
  { className: "6", sections: 3, boys: 64, girls: 68 },
  { className: "7", sections: 3, boys: 62, girls: 70 },
  { className: "8", sections: 3, boys: 66, girls: 69 },
  { className: "9", sections: 3, boys: 71, girls: 74 },
  { className: "10", sections: 3, boys: 68, girls: 72 },
  { className: "11", sections: 3, boys: 58, girls: 62 },
  { className: "12", sections: 3, boys: 55, girls: 60 },
];

export const infrastructure: InfrastructureItem[] = [
  { name: "Classrooms", count: "32", details: "Including 8 smart classrooms" },
  { name: "Science laboratories", count: "3", details: "Physics, Chemistry and Biology labs for +2 students" },
  { name: "ICT laboratory", count: "1", details: "30 computers under the ICT@School scheme" },
  { name: "Library", count: "1", details: "About 6,000 books, including books in Santhali, Kurukh and Nagpuri" },
  { name: "Playground", count: "1", details: "Hockey and football ground" },
  { name: "Girls' common room", count: "1", details: "With sanitary pad vending machine and incinerator" },
  { name: "Kitchen shed", count: "1", details: "For mid-day meal" },
  { name: "Toilets", count: "18", details: "Separate blocks for boys, girls and staff; 2 accessible toilets" },
];

export const facilities: Facility[] = [
  { name: "Classrooms", icon: "🏫", available: true, details: "32 classrooms, 8 with smart boards." },
  { name: "Science laboratories", icon: "🔬", available: true, details: "Physics, Chemistry and Biology labs for Classes 9–12." },
  { name: "ICT laboratory", icon: "💻", available: true, details: "30 computers with internet under the ICT@School scheme." },
  { name: "Library", icon: "📚", available: true, details: "About 6,000 books, newspapers and a reading corner." },
  { name: "Playground", icon: "🏑", available: true, details: "Hockey and football ground; archery practice twice a week." },
  { name: "Drinking water", icon: "🚰", available: true, details: "Deep borewell with RO purifier and water coolers." },
  { name: "Separate toilets", icon: "🚻", available: true, details: "Separate toilet blocks for boys and girls with running water." },
  { name: "Medical facilities", icon: "🩺", available: true, details: "First-aid room; regular health check-ups under RBSK." },
  { name: "CCTV and security", icon: "📹", available: true, details: "CCTV at the gate and corridors; boundary wall all around." },
  { name: "Accessibility", icon: "♿", available: true, details: "Ramps, handrails and accessible toilets." },
  { name: "Mid-day meal", icon: "🍱", available: true, details: "Hot cooked meal and eggs for Classes 1 to 8 under PM POSHAN." },
  { name: "Hostel", icon: "🛏️", available: false, details: "Hostel facility is not available." },
];

export const welfareSchemes: Scheme[] = [
  { name: "Free textbooks and uniform", details: "For all students of Classes 1 to 8." },
  { name: "PM POSHAN (mid-day meal)", details: "Hot cooked meal for Classes 1 to 8, with eggs or fruit on set days." },
  { name: "Bicycle distribution", details: "Free bicycle for eligible Class 8 students under the state scheme." },
  { name: "Savitribai Phule Kishori Samriddhi Yojana", details: "Financial support for girls from Class 8 onwards (eligibility as per scheme)." },
  { name: "Pre- and post-matric scholarships", details: "For SC, ST, OBC and minority students through the e-Kalyan portal." },
];

export const streams: Stream[] = [
  {
    name: "Science",
    subjects: ["Hindi / English (core)", "Physics", "Chemistry", "Mathematics / Biology", "Computer Science (optional)"],
    seats: 120,
  },
  {
    name: "Commerce",
    subjects: ["Hindi / English (core)", "Accountancy", "Business Studies", "Economics", "Mathematics / Entrepreneurship"],
    seats: 60,
  },
  {
    name: "Humanities",
    subjects: ["Hindi / English (core)", "History", "Political Science", "Geography", "Economics / Sociology"],
    seats: 120,
  },
];

export const subjectGroups: SubjectGroup[] = [
  { classes: "1 – 2", subjects: ["Hindi", "English", "Mathematics", "Art & Craft", "Games"] },
  { classes: "3 – 5", subjects: ["Hindi", "English", "Mathematics", "Environmental Studies", "Art & Craft", "Games"] },
  { classes: "6 – 8", subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Sanskrit / Urdu"] },
  {
    classes: "9 – 10",
    subjects: [
      "Hindi Course A / B",
      "English",
      "Mathematics",
      "Science",
      "Social Science",
      "Skill subject: Artificial Intelligence / Information Technology",
    ],
  },
  { classes: "11 – 12", subjects: ["As per stream: Science, Commerce or Humanities (see below)"] },
];

export const academicCalendar: CalendarEvent[] = [
  { month: "April 2026", events: ["New session begins (1 Apr)", "School Chalein Chalayen Abhiyan (enrolment drive)"] },
  { month: "May 2026", events: ["CBSE results for Class 10 & 12", "Summer vacation begins (22 May)"] },
  { month: "June 2026", events: ["School reopens", "Hul Diwas (30 Jun)", "Class 11 admissions"] },
  { month: "August 2026", events: ["Independence Day celebration", "Monthly test", "Karma Puja"] },
  { month: "September 2026", events: ["Half-yearly examination (Classes 6–12)", "Hindi Diwas (14 Sep)"] },
  { month: "October 2026", events: ["Durga Puja vacation", "Science exhibition"] },
  { month: "November 2026", events: ["Diwali & Chhath holidays", "Jharkhand Sthapna Diwas & Birsa Munda Jayanti (15 Nov)", "PTM (22 Nov)"] },
  { month: "December 2026", events: ["Pre-board exams for Class 10 & 12", "Winter break (25–31 Dec)"] },
  { month: "January 2027", events: ["Republic Day celebration", "Practical exams (Class 12)"] },
  { month: "February 2027", events: ["CBSE Board exams begin (Class 10 & 12)", "Annual sports day"] },
  { month: "March 2027", events: ["Annual examination (Classes 1–9, 11)", "Sarhul", "Result declaration (31 Mar)"] },
];

export const examSchedule: ExamScheduleRow[] = [
  { exam: "Monthly test (Mashik Pariksha)", classes: "3 – 12", dates: "Last week of every month" },
  { exam: "Half-yearly examination", classes: "6 – 12", dates: "15 – 27 September 2026" },
  { exam: "Pre-board examination", classes: "10, 12", dates: "1 – 12 December 2026" },
  { exam: "Class 12 practical examination", classes: "12", dates: "January 2027 (as per CBSE)" },
  { exam: "CBSE Board Examination", classes: "10, 12", dates: "From February 2027 (as per CBSE date sheet)" },
  { exam: "Annual examination", classes: "1 – 9, 11", dates: "2 – 18 March 2027" },
];

export const syllabusLinks: DocumentLink[] = [
  { title: "Classes 1 – 5 syllabus (NCERT)", category: "Syllabus", url: SAMPLE_PDF },
  { title: "Classes 6 – 8 syllabus (NCERT)", category: "Syllabus", url: SAMPLE_PDF },
  { title: "Class 9 & 10 syllabus (CBSE)", category: "Syllabus", url: SAMPLE_PDF },
  { title: "Class 11 & 12 syllabus (CBSE)", category: "Syllabus", url: SAMPLE_PDF },
];

export const questionPapers: DocumentLink[] = [
  { title: "CBSE Class 10 – Sample papers 2026–27", category: "Question papers", url: SAMPLE_PDF },
  { title: "CBSE Class 10 – Previous year papers 2026", category: "Question papers", url: SAMPLE_PDF },
  { title: "CBSE Class 12 – Sample papers 2026–27", category: "Question papers", url: SAMPLE_PDF },
  { title: "CBSE Class 12 – Previous year papers 2026", category: "Question papers", url: SAMPLE_PDF },
];

export const boardResultsX: BoardResult[] = [
  { year: 2026, appeared: 138, passed: 131, passPercentage: 94.9, distinctions: 34 },
  { year: 2025, appeared: 142, passed: 132, passPercentage: 93.0, distinctions: 29 },
  { year: 2024, appeared: 129, passed: 117, passPercentage: 90.7, distinctions: 22 },
];

export const boardResultsXII: BoardResult[] = [
  { year: 2026, appeared: 112, passed: 105, passPercentage: 93.8, distinctions: 27 },
  { year: 2025, appeared: 108, passed: 99, passPercentage: 91.7, distinctions: 23 },
  { year: 2024, appeared: 101, passed: 91, passPercentage: 90.1, distinctions: 18 },
];

export const schoolExamResults: SchoolExamResult[] = [
  { className: "6", exam: "Annual 2025–26", passPercentage: 98.5 },
  { className: "7", exam: "Annual 2025–26", passPercentage: 97.7 },
  { className: "8", exam: "Annual 2025–26", passPercentage: 97.0 },
  { className: "9", exam: "Annual 2025–26", passPercentage: 92.4 },
  { className: "11", exam: "Annual 2025–26", passPercentage: 93.1 },
];

export const toppers: Topper[] = [
  { name: "Sneha Kumari", className: "12", stream: "Science", year: 2026, percentage: 93.6 },
  { name: "Rahul Mahto", className: "12", stream: "Commerce", year: 2026, percentage: 91.2 },
  { name: "Puja Tirkey", className: "12", stream: "Humanities", year: 2026, percentage: 90.4 },
  { name: "Aditya Munda", className: "10", year: 2026, percentage: 95.2 },
  { name: "Anjali Hembrom", className: "10", year: 2026, percentage: 94.6 },
  { name: "Md. Faizan", className: "10", year: 2026, percentage: 93.8 },
];

export const achievements: Achievement[] = [
  { title: "District topper in CBSE Class 10 (Garhwa)", year: 2026, type: "Academic", description: "Aditya Munda secured 95.2% and was felicitated by the district administration." },
  { title: "State-level Science Exhibition – 2nd prize", year: 2025, type: "Academic", description: "Class 11 students built a low-cost drip irrigation model for small farms." },
  { title: "State School Hockey Championship (Girls U-17)", year: 2025, type: "Sports", description: "Our girls' team won the gold medal at the state school games." },
  { title: "District Archery Meet", year: 2025, type: "Sports", description: "Two Class 9 students won silver and bronze in the recurve category." },
  { title: "Swachh Vidyalaya Puraskar (District)", year: 2024, type: "Award", description: "Recognised for clean toilets, drinking water and hygiene practices." },
  { title: "Best Bal Sansad (Block level)", year: 2024, type: "Award", description: "Our student cabinet was awarded for running the library and plantation drives." },
];

export const staff: StaffMember[] = [
  { name: "Shri Anil Kumar Oraon", designation: "Principal", group: "Principal" },
  { name: "Smt. Rekha Sinha", designation: "Vice Principal", group: "Vice Principal" },
  { name: "Dr. Manoj Kumar Singh", designation: "+2 Teacher (PGT)", department: "Physics", group: "PGT" },
  { name: "Smt. Kiran Toppo", designation: "+2 Teacher (PGT)", department: "Chemistry", group: "PGT" },
  { name: "Shri Ravi Shankar Prasad", designation: "+2 Teacher (PGT)", department: "Mathematics", group: "PGT" },
  { name: "Smt. Sunita Ekka", designation: "+2 Teacher (PGT)", department: "Biology", group: "PGT" },
  { name: "Shri Deepak Agarwal", designation: "+2 Teacher (PGT)", department: "Accountancy", group: "PGT" },
  { name: "Smt. Nirmala Hansda", designation: "+2 Teacher (PGT)", department: "History", group: "PGT" },
  { name: "Shri Sanjay Pandey", designation: "+2 Teacher (PGT)", department: "Hindi", group: "PGT" },
  { name: "Smt. Priya Lakra", designation: "+2 Teacher (PGT)", department: "English", group: "PGT" },
  { name: "Shri Birsa Kachhap", designation: "Graduate Teacher (TGT)", department: "Mathematics", group: "TGT" },
  { name: "Smt. Anita Kumari", designation: "Graduate Teacher (TGT)", department: "Science", group: "TGT" },
  { name: "Shri Rajesh Mahto", designation: "Graduate Teacher (TGT)", department: "Social Science", group: "TGT" },
  { name: "Smt. Mary Kujur", designation: "Graduate Teacher (TGT)", department: "English", group: "TGT" },
  { name: "Shri Sukra Munda", designation: "Graduate Teacher (TGT)", department: "Mundari / Nagpuri", group: "TGT" },
  { name: "Smt. Shabnam Parveen", designation: "Graduate Teacher (TGT)", department: "Urdu", group: "TGT" },
  { name: "Smt. Savitri Devi", designation: "Primary Teacher", department: "Classes 1 – 2", group: "PRT" },
  { name: "Shri Ganesh Ram", designation: "Primary Teacher", department: "Classes 3 – 4", group: "PRT" },
  { name: "Smt. Lalita Minz", designation: "Sahayak Adhyapak", department: "Class 5", group: "PRT" },
  { name: "Smt. Pushpa Kumari", designation: "Librarian", department: "Library", group: "Librarian" },
  { name: "Shri Ajay Tigga", designation: "Physical Education Teacher", department: "Sports (Hockey & Archery)", group: "Physical Education" },
  { name: "Smt. Neha Sharma", designation: "Resource Teacher", department: "Inclusive Education (CWSN)", group: "Special Educator" },
  { name: "Shri Umesh Prasad", designation: "Head Clerk", department: "Office", group: "Administrative" },
  { name: "Shri Vikash Kumar", designation: "Computer Operator", department: "Office / e-Vidyavahini", group: "Administrative" },
  { name: "Shri Bandhu Oraon", designation: "Lab Attendant", department: "Science Labs", group: "Non-Teaching" },
  { name: "Shri Somra Lohra", designation: "Night Guard", group: "Non-Teaching" },
  { name: "Smt. Phulmani Devi", designation: "Cook (PM POSHAN)", group: "Non-Teaching" },
];

export const admissionGuidelines: string[] = [
  "Admissions are made as per the guidelines of the School Education & Literacy Department, Government of Jharkhand.",
  "Education is free for Classes 1 to 8 under the RTE Act. No donation or capitation fee is charged.",
  "Class 11 admission is based on Class 10 board marks and seat availability in each stream.",
  "Students coming from other boards or states must submit a migration certificate.",
  "Children with special needs (CWSN) are admitted with support from the resource teacher.",
];

export const admissionClassGroups: AdmissionClassGroup[] = [
  { group: "Entry level", classes: "Class 1", eligibility: "Age 6+ years as on 1 April of the session", mode: "Apply at the school office; enrolment drive in nearby villages", schedule: "April" },
  { group: "Middle", classes: "Classes 2 – 8", eligibility: "Transfer certificate from previous school (age-appropriate admission also allowed under RTE)", mode: "Apply at the school office", schedule: "April – May" },
  { group: "Secondary", classes: "Class 9", eligibility: "Passed Class 8", mode: "Apply at the school office", schedule: "April" },
  { group: "Senior Secondary", classes: "Class 11", eligibility: "Passed Class 10 from CBSE or another recognised board (JAC, etc.)", mode: "Online / offline application; stream-wise merit list", schedule: "May – June" },
];

export const requiredDocuments: string[] = [
  "Birth certificate (for Class 1)",
  "Aadhaar card of the child",
  "Transfer certificate (TC) / school leaving certificate from the previous school",
  "Marksheet of the previous class (Class 10 board marksheet for Class 11)",
  "Migration certificate (for students from other boards)",
  "Caste certificate and income certificate (for scholarships, if applicable)",
  "Residence certificate of Jharkhand (if applicable)",
  "Bank passbook of the child (for DBT schemes)",
  "Four passport-size photographs",
];

export const admissionSchedule: ScheduleItem[] = [
  { activity: "Enrolment drive for Class 1 (School Chalein Chalayen Abhiyan)", date: "1 – 15 April 2027" },
  { activity: "Admission for Classes 2 – 9", date: "1 April – 15 May 2027" },
  { activity: "Class 11 application opens", date: "After Class 10 board results (May)" },
  { activity: "Class 11 stream-wise merit list", date: "First week of June 2027" },
  { activity: "Class 11 admission and document verification", date: "June 2027" },
];

export const admissionLinks: QuickLink[] = [
  { label: "Central Board of Secondary Education", to: "https://www.cbse.gov.in", external: true, icon: "🎓" },
  { label: "Class 11 merit list / status", to: "/notices", icon: "🔎" },
  { label: "Download admission form", to: SAMPLE_PDF, external: true, icon: "📄" },
];

export const downloads: DocumentLink[] = [
  { title: "Admission form (Classes 1 – 9)", category: "Admission forms", url: SAMPLE_PDF, size: "110 KB", updated: "2026-03-25" },
  { title: "Class 11 admission form", category: "Admission forms", url: SAMPLE_PDF, size: "95 KB", updated: "2026-05-20" },
  { title: "School prospectus 2026–27", category: "Prospectus", url: SAMPLE_PDF, size: "1.1 MB", updated: "2026-04-01" },
  { title: "Academic calendar 2026–27", category: "Academic calendar", url: SAMPLE_PDF, size: "200 KB", updated: "2026-04-01" },
  { title: "Syllabus: Classes 1 – 8 (NCERT)", category: "Syllabus", url: SAMPLE_PDF, size: "580 KB", updated: "2026-04-05" },
  { title: "Syllabus: Classes 9 – 12 (CBSE)", category: "Syllabus", url: SAMPLE_PDF, size: "1.6 MB", updated: "2026-04-05" },
  { title: "Pre-board timetable (Class 10 & 12)", category: "Examination timetable", url: SAMPLE_PDF, size: "80 KB", updated: "2026-11-10" },
  { title: "Holiday list 2026 (Government of Jharkhand)", category: "Holiday list", url: SAMPLE_PDF, size: "75 KB", updated: "2026-01-02" },
  { title: "Transfer certificate: procedure and application", category: "Transfer certificate", url: SAMPLE_PDF, size: "60 KB", updated: "2026-04-01" },
  { title: "School rules and guidelines for students", category: "School guidelines", url: SAMPLE_PDF, size: "140 KB", updated: "2026-04-01" },
  { title: "Department circular: Bicycle distribution 2026", category: "Government circulars", url: SAMPLE_PDF, size: "250 KB", updated: "2026-11-04" },
  { title: "Department circular: Safety of students in schools", category: "Government circulars", url: SAMPLE_PDF, size: "230 KB", updated: "2026-08-03" },
];

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Main academic block", category: "School Building", date: "2026-04-10" },
  { id: "g2", title: "School gate and assembly ground", category: "School Building", date: "2026-04-10" },
  { id: "g3", title: "Smart classroom, Class 8", category: "Classrooms", date: "2026-07-15" },
  { id: "g4", title: "Primary classroom reading corner", category: "Classrooms", date: "2026-07-15" },
  { id: "g5", title: "Flag hoisting by the Principal", category: "Independence Day", date: "2026-08-15" },
  { id: "g6", title: "Patriotic song performance", category: "Independence Day", date: "2026-08-15" },
  { id: "g7", title: "Republic Day march past", category: "Republic Day", date: "2026-01-26" },
  { id: "g8", title: "Tableau on Jharkhand's freedom fighters", category: "Republic Day", date: "2026-01-26" },
  { id: "g9", title: "Annual Day – Jhumar folk dance", category: "Annual Function", date: "2026-02-14" },
  { id: "g10", title: "Prize distribution", category: "Annual Function", date: "2026-02-14" },
  { id: "g11", title: "Girls' hockey team practice", category: "Sports", date: "2025-09-20" },
  { id: "g12", title: "Archery training session", category: "Sports", date: "2025-12-05" },
  { id: "g13", title: "Drip irrigation model", category: "Science Exhibition", date: "2025-10-18" },
  { id: "g14", title: "Solar lantern project", category: "Science Exhibition", date: "2025-10-18" },
  { id: "g15", title: "Sarhul celebration", category: "Other Events", date: "2026-03-21" },
  { id: "g16", title: "Jharkhand Sthapna Diwas", category: "Other Events", date: "2025-11-15" },
];

export const govLinks: GovLink[] = [
  { label: "Government of Jharkhand", url: "https://www.jharkhand.gov.in" },
  { label: "Central Board of Secondary Education (CBSE)", url: "https://www.cbse.gov.in" },
  { label: "Jharkhand Academic Council (JAC)", url: "https://jac.jharkhand.gov.in" },
  { label: "Jharkhand Education Project Council", url: "https://jepc.jharkhand.gov.in" },
  { label: "Ministry of Education", url: "https://www.education.gov.in" },
  { label: "UDISE+", url: "https://udiseplus.gov.in" },
  { label: "DIKSHA", url: "https://diksha.gov.in" },
  { label: "National Portal of India", url: "https://www.india.gov.in" },
];
