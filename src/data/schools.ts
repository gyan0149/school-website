// 100 CM Schools of Excellence (source: HM contact list). hmName is null where the source entry was unclear.
import type { School, SchoolBase, SchoolExtra } from "../types/school";

export const SCHOOL_LIST: SchoolBase[] = [
  { slNo: 1, udise: "20130110202", district: "Bokaro", block: "Chandankiyari", name: "CM SoE UPG +2 HIGH SCHOOL BARMASIA", classFrom: 6, classTo: 12, hmName: "Subhash Kumar Pandey", hmPhone: "8210157284" },
  { slNo: 2, udise: "20130322001", district: "Bokaro", block: "Chas", name: "CM SoE UPG BASIC HIGH SCHOOL SONABAD", classFrom: 1, classTo: 10, hmName: "Sujata Kumari", hmPhone: "8709229292" },
  { slNo: 3, udise: "20131008701", district: "Bokaro", block: "Gomiya", name: "CM SoE UPG RAJKIYAKRIT +2 HIGH SCHOOL MAHUATAND", classFrom: 1, classTo: 12, hmName: "Deo Kumar Yadav", hmPhone: "8969125940" },
  { slNo: 4, udise: "20131100601", district: "Bokaro", block: "Petarwar", name: "CM SoE UPG RAJKIYAKRIT +2 HIGH SCHOOL CHANDO", classFrom: 1, classTo: 12, hmName: "Shivan Kumar", hmPhone: "8210481652" },
  { slNo: 5, udise: "20030701204", district: "Chatra", block: "Pathalgada", name: "CM SoE + 2 JANTA H.S. PATHALGADDA", classFrom: 1, classTo: 12, hmName: "Shrawan Kumar", hmPhone: "7004085656" },
  { slNo: 6, udise: "20030403201", district: "Chatra", block: "Pratappur", name: "CM SoE GOVT. UPGRADED +2 HIGH SCHOOL TANDWA", classFrom: 1, classTo: 12, hmName: "Sunil Yadav", hmPhone: "9839606229" },
  { slNo: 7, udise: "20070813401", district: "Deoghar", block: "Karown", name: "RANI MANDAKINI CM SoE SoE UPG+2 H.S KAROGRAM", classFrom: 1, classTo: 12, hmName: "Uday Shankar Pathak", hmPhone: "7903035764" },
  { slNo: 8, udise: "20070710301", district: "Deoghar", block: "Madhupur", name: "CM SoE UPG. +2 H.S JAGDISHPUR", classFrom: 1, classTo: 12, hmName: "Priya Sinha", hmPhone: "9097303144" },
  { slNo: 9, udise: "20070117601", district: "Deoghar", block: "Mohanpur", name: "CM SoE UPG. +2 RAJKIYAKRIT S.S. MOHANAND H.S TAPOBAN", classFrom: 1, classTo: 12, hmName: "Umesh Prasad Yadav", hmPhone: "7004638582" },
  { slNo: 10, udise: "20070516601", district: "Deoghar", block: "Sarath", name: "G.N.SINGH CM SoE UPG +2 H.S KUKRAHA", classFrom: 1, classTo: 12, hmName: "Upendra Mishra", hmPhone: "8873597695" },
  { slNo: 11, udise: "20120600511", district: "Dhanbad", block: "Baghmara", name: "CM SoE SS +2 HIGH SCHOOL BAGHMARA", classFrom: 1, classTo: 12, hmName: "Sushant Kumar Pandey", hmPhone: "8969547803" },
  { slNo: 12, udise: "20120500601", district: "Dhanbad", block: "Baliapur", name: "CM SoE UPG HS KARMATAND", classFrom: 1, classTo: 10, hmName: "Devendra Kishor", hmPhone: "9234494551" },
  { slNo: 13, udise: "20120717702", district: "Dhanbad", block: "Egarkund", name: "CM SoE J.K.R.R.+2 H.S. CHIRKUNDA", classFrom: 9, classTo: 12, hmName: "Kishor Kumar Mishra", hmPhone: "9939176161" },
  { slNo: 14, udise: "20120210510", district: "Dhanbad", block: "Jharia", name: "CM SoE HIGH SCHOOL BHOWRA", classFrom: 1, classTo: 10, hmName: "Braj Kishor Pathak", hmPhone: "9504390446" },
  { slNo: 15, udise: "20120904002", district: "Dhanbad", block: "Purvi Tundi", name: "CM SoE UPG +2HS MAIRANAWATAND", classFrom: 1, classTo: 12, hmName: "Om Prakash Sharma", hmPhone: "9931358120" },
  { slNo: 16, udise: "20110428302", district: "Dumka", block: "Jama", name: "CM SoE GOVT +2 HIGH SCHOOL JAMA", classFrom: 9, classTo: 12, hmName: "Ajit Kumar", hmPhone: "9304469946" },
  { slNo: 17, udise: "20110520503", district: "Dumka", block: "Jarmundi", name: "CM SoE GOVT +2 H.S.HARIPUR", classFrom: 1, classTo: 12, hmName: "Diljit Kumar", hmPhone: "9939170517" },
  { slNo: 18, udise: "20110325901", district: "Dumka", block: "Masalia", name: "CM SoE UPGRADE +2 GOVT H.S. PINDARI", classFrom: 1, classTo: 12, hmName: "Rajesh Kumar", hmPhone: "9304000075" },
  { slNo: 19, udise: "20110735401", district: "Dumka", block: "Ramgarh", name: "RANI SONAWATI CM SoE Govt +2 H.S. NONIHAT", classFrom: 9, classTo: 12, hmName: "Shiksha Shandilya", hmPhone: "9572342017" },
  { slNo: 20, udise: "20110213301", district: "Dumka", block: "Ranishwar", name: "CM SoE UPGRADE +2 H.S. MAHULBANA", classFrom: 1, classTo: 12, hmName: "Basant Tudu", hmPhone: "8709360341" },
  { slNo: 21, udise: "20111005402", district: "Dumka", block: "Shikaripara", name: "CM SoE UPGRADE GOVT H.S.DHAKA", classFrom: 1, classTo: 10, hmName: "Md Marshal Ansari", hmPhone: "7667972826" },
  { slNo: 22, udise: "20011600504", district: "Garhwa", block: "Bishunpura", name: "CM SoE GOVT UPG +2 HS PIPIRI KALA", classFrom: 1, classTo: 12, hmName: "Shashi Prakash Raman", hmPhone: "9113785004" },
  { slNo: 23, udise: "20011802405", district: "Garhwa", block: "Ketar", name: "CM SoE GOVT UPG +2 HS PARSODIH", classFrom: 1, classTo: 12, hmName: "Birendra Yadaw", hmPhone: "7717728640" },
  { slNo: 24, udise: "20010101101", district: "Garhwa", block: "Ramkanda", name: "CM SoE GOVT UPG +2 HS RAMKANDA", classFrom: 1, classTo: 12, hmName: "Harsh Jyoti Kumar Shukla", hmPhone: "9936153713" },
  { slNo: 25, udise: "20011900801", district: "Garhwa", block: "Sagma", name: "CM SoE GOVT UPG +2 HS BIRBAL", classFrom: 1, classTo: 12, hmName: "Dr. Pratiyush Dubey", hmPhone: "9431545940" },
  { slNo: 26, udise: "20060108302", district: "Giridih", block: "Bengabad", name: "CM SoE +2 S.S. HIGH SCHOOL BENGABAD", classFrom: 9, classTo: 12, hmName: null, hmPhone: "8986758515" },
  { slNo: 27, udise: "20060705901", district: "Giridih", block: "Dhanwar", name: "CM SoE UPG GOVT +2 HS ARKHANGO", classFrom: 1, classTo: 12, hmName: null, hmPhone: "7319816025" },
  { slNo: 28, udise: "20061307101", district: "Giridih", block: "Gandey", name: "CM SoE UPG GOVT +2 HS TARATAND", classFrom: 1, classTo: 12, hmName: "Dilip Kumar Mandal", hmPhone: "7979917419" },
  { slNo: 29, udise: "20060916703", district: "Giridih", block: "Giridih", name: "T.R.P. CM SoE HS LEDA", classFrom: 9, classTo: 12, hmName: "Anita Mittal", hmPhone: "9304957838" },
  { slNo: 30, udise: "20060533501", district: "Giridih", block: "Jamua", name: "CM SoE UPG GOVT +2 HS SAHARPURA", classFrom: 1, classTo: 12, hmName: "Amit Kumar Tripathi", hmPhone: "7652040901" },
  { slNo: 31, udise: "20061000102", district: "Giridih", block: "Pirtand", name: "CM SoE UPGRADED PROJECT KANYA +2 HS PIRTAND", classFrom: 9, classTo: 12, hmName: "Ashish Kumar Mandilwar", hmPhone: "7979878756" },
  { slNo: 32, udise: "20061502004", district: "Giridih", block: "Suriya", name: "CM SoE UPG GOVT +2 HS KESWARI", classFrom: 1, classTo: 12, hmName: "Laljee Mandal", hmPhone: "7050896345" },
  { slNo: 33, udise: "20080901302", district: "Godda", block: "Pathargama", name: "CM SoE GOVT GIRL'S HIGH SCHOOL PATHERGAMA", classFrom: 1, classTo: 10, hmName: "Anil Yadav", hmPhone: "7992351706" },
  { slNo: 34, udise: "20080504401", district: "Godda", block: "Poraiyahat", name: "CM SoE UPG GOVT HS CHATRA", classFrom: 1, classTo: 10, hmName: "Smita Tudu", hmPhone: "8292248856" },
  { slNo: 35, udise: "20080801101", district: "Godda", block: "Thakurgangti", name: "CM SoE UPG GOVT +2 HS MORDIHA", classFrom: 1, classTo: 12, hmName: "Keshav Kumar", hmPhone: "9939572849" },
  { slNo: 36, udise: "20161002308", district: "Gumla", block: "Bharno", name: "CM SoE GOVT +2 HS BHARNO", classFrom: 6, classTo: 12, hmName: "Bardani Toppo", hmPhone: "8340634413" },
  { slNo: 37, udise: "20160106104", district: "Gumla", block: "Bishunpur", name: "CM SoE S S HS BISHUNPUR", classFrom: 6, classTo: 12, hmName: "Laxmi Narayn Ohdar", hmPhone: "7033543806" },
  { slNo: 38, udise: "20161206501", district: "Gumla", block: "Kamdara", name: "CM SoE RAJKIYAKRIT UPGRADED +2 HIGH SCHOOL KURKURA", classFrom: 1, classTo: 12, hmName: "Indira Kumari Baraik", hmPhone: "9661807221" },
  { slNo: 39, udise: "20160700501", district: "Gumla", block: "Raidih", name: "CM SoE RAJKRIYAKRIT UPGRADED +2 HIGH SCHOOL SILAM", classFrom: 1, classTo: 10, hmName: "Sumit Kumar Nand", hmPhone: "9304123448" },
  { slNo: 40, udise: "20040301104", district: "Hazaribag", block: "Barkagaon", name: "CM SoE + 2 HIGH SCHOOL BARKAGAON", classFrom: 9, classTo: 12, hmName: "Kuleshwar Mahto", hmPhone: "9771838342" },
  { slNo: 41, udise: "20040210402", district: "Hazaribag", block: "Barkatha", name: "CM SoE UPGRADED GIRLS + 2 HIGH SCHOOL BELKAPPI", classFrom: 1, classTo: 12, hmName: "Sanjay Kumar Das", hmPhone: "7783026429" },
  { slNo: 42, udise: "20040411301", district: "Hazaribag", block: "Bishnugarh", name: "CM SoE UPG HIGH SCHOOL CHANO", classFrom: 1, classTo: 12, hmName: "Sanjay Kumar", hmPhone: "9835711835" },
  { slNo: 43, udise: "20191506303", district: "Jamtara", block: "Karmatanr Vidyasagar", name: "CM SoE RAJKIYKRIT GULABA ROY SCHOOL", classFrom: 9, classTo: 12, hmName: "Ritesh Kumar Singh", hmPhone: "9472766551" },
  { slNo: 44, udise: "20191402204", district: "Jamtara", block: "Kundahit", name: "CM SoE RAJKIYAKRIT +2 SCHOOL, BAGDEHRI", classFrom: 1, classTo: 12, hmName: "Mithilesh Kumar Pandey", hmPhone: "9470410252" },
  { slNo: 45, udise: "20191324208", district: "Jamtara", block: "Nala", name: "CM SoE RAJKIYAKRIT+2 SCHOOL, NALA", classFrom: 9, classTo: 12, hmName: "Uttam Kumar Mandal", hmPhone: "8709463516" },
  { slNo: 46, udise: "20191221707", district: "Jamtara", block: "Narayanpur", name: "CM SoE RAJKIYAKRIT+2 HIGH SCHOOL, NARAYANPUR", classFrom: 9, classTo: 12, hmName: "Saurabh Malviya", hmPhone: "8736985201" },
  { slNo: 47, udise: "20230410401", district: "Khunti", block: "Karra", name: "CM SoE UPG GOVT MS-CUM-HS LODHMA", classFrom: 1, classTo: 12, hmName: "Neelam Bishwasi Horo", hmPhone: "7258011147" },
  { slNo: 48, udise: "20230201301", district: "Khunti", block: "Murhu", name: "CM SoE UPG GOVT MS-CUM-HS +2 PELLOL", classFrom: 1, classTo: 12, hmName: "Purushotam Singh", hmPhone: "8051087962" },
  { slNo: 49, udise: "20230106301", district: "Khunti", block: "Rania", name: "CM SoE UPG GOVT +2 HIGH SCHOOL TOKEN", classFrom: 1, classTo: 12, hmName: "Albina Samad", hmPhone: "7631198331" },
  { slNo: 50, udise: "20050501401", district: "Kodarma", block: "Chandwara", name: "CM SoE UPG GOVT HS JAUNGI", classFrom: 1, classTo: 10, hmName: "Santosh Kumar Pandey", hmPhone: "8292675582" },
  { slNo: 51, udise: "20050207114", district: "Kodarma", block: "Markacho", name: "CM SoE SARVODAYA +2 HS MARKACHO", classFrom: 9, classTo: 12, hmName: "Harihar Kumar Singh", hmPhone: "9386199862" },
  { slNo: 52, udise: "20220715114", district: "Latehar", block: "Balumath", name: "CM SoE RAJKIYA +2 BOYS HS BALUMATH", classFrom: 9, classTo: 12, hmName: "Rubi Bano", hmPhone: "6207050992" },
  { slNo: 53, udise: "20220500501", district: "Latehar", block: "Barwadih", name: "CM SoE UPG GOVT HS SARAIDIH", classFrom: 1, classTo: 12, hmName: "Umesh Toppo", hmPhone: "8809335544" },
  { slNo: 54, udise: "20150400201", district: "Lohardaga", block: "Bhandra", name: "CM SoE UPG GOVT HS MASMANO", classFrom: 1, classTo: 10, hmName: "Nutan Kumar", hmPhone: "6207941742" },
  { slNo: 55, udise: "20150505804", district: "Lohardaga", block: "Kuru", name: "CM SoE GANDHI MEMORIAL +2 HIGH SCHOOL MARADIH KURU", classFrom: 9, classTo: 12, hmName: "Mukesh Kumar Yadav", hmPhone: "7992243464" },
  { slNo: 56, udise: "20150306601", district: "Lohardaga", block: "Senha", name: "CM SoE UPG GOVT HS SHAHBUTI", classFrom: 1, classTo: 10, hmName: "Anita Xalxo", hmPhone: "7004694162" },
  { slNo: 57, udise: "20101207403", district: "Pakaur", block: "Amrapara", name: "CM SoE RAJKIYAKRIT+2 HS AMARAPARA", classFrom: 9, classTo: 12, hmName: "Chandan Kumar", hmPhone: "6299764255" },
  { slNo: 58, udise: "20100902901", district: "Pakaur", block: "Hiranpur", name: "CM SoE RAJKIYAKRIT +2 HS HIRANPUR", classFrom: 9, classTo: 12, hmName: "Ramesh Prasad Goswami", hmPhone: "7250767888" },
  { slNo: 59, udise: "20100701405", district: "Pakaur", block: "Maheshpur", name: "CM SoE HIGH SCHOOL MAHESHPUR (RAJ)", classFrom: 1, classTo: 12, hmName: "Md Jainal Abedin", hmPhone: "8271844671" },
  { slNo: 60, udise: "20100805001", district: "Pakaur", block: "Pakuria", name: "CM SoE UPG HS FULJHINJHARI", classFrom: 1, classTo: 12, hmName: "Md Sarif Ansari", hmPhone: "6202788834" },
  { slNo: 61, udise: "20020909004", district: "Palamu", block: "Bishrampur", name: "R K J B CM SoE +2 HIGH SCHOOL REHLA", classFrom: 1, classTo: 12, hmName: "Dr. Anil Kumar Singh", hmPhone: "9801018580" },
  { slNo: 62, udise: "20020616801", district: "Palamu", block: "Chhatarpur", name: "CM SoE UPG RAJKIYEKRIT + 2 HIGH SCHOOL DALI", classFrom: 1, classTo: 12, hmName: "Sujit Kumar Patel", hmPhone: "9334099322" },
  { slNo: 63, udise: "20020200216", district: "Palamu", block: "Hariharganj", name: "CM SoE RAJKIYEKRIT SITA +2 HIGH SCHOOL HARIHARGANJ", classFrom: 9, classTo: 12, hmName: "Ajay Prasad Ray", hmPhone: "8863022545" },
  { slNo: 64, udise: "20020301006", district: "Palamu", block: "Panki", name: "CM SoE UPG RAJKIYEKRIT HIGH SCHOOL MAADAN", classFrom: 1, classTo: 10, hmName: "Rishikesh Kumar Singh", hmPhone: "7004606988" },
  { slNo: 65, udise: "20172400105", district: "Pashchimi Singhbhum", block: "Anandpur", name: "CM SoE +2 HIGH RAJANANDPUR", classFrom: 1, classTo: 12, hmName: null, hmPhone: "7260004511" },
  { slNo: 66, udise: "20170118702", district: "Pashchimi Singhbhum", block: "Bandgaon", name: "CM SoE +2 HIGH SCHOOL BIRSA BHAGWAN", classFrom: 9, classTo: 12, hmName: "Rajeev Verma", hmPhone: "9431177083" },
  { slNo: 67, udise: "20170214503", district: "Pashchimi Singhbhum", block: "Chakradharpur", name: "CM SoE MARWARI +2 HIGH SCHOOL CKP", classFrom: 9, classTo: 12, hmName: "Sosan Prabhawati Xess", hmPhone: "6206690352" },
  { slNo: 68, udise: "20170600804", district: "Pashchimi Singhbhum", block: "Hatgamaharia", name: "CM SoE +2 HIGH SCHOOL HATGAMAHARIA", classFrom: 1, classTo: 12, hmName: "Alka Samad", hmPhone: "9204248824" },
  { slNo: 69, udise: "20170704509", district: "Pashchimi Singhbhum", block: "Jagannathpur", name: "CM SoE +2 HIGH SCHOOL RASSEL JAGANNATHPUR", classFrom: 1, classTo: 12, hmName: "Sushma Jonko", hmPhone: "8789777562" },
  { slNo: 70, udise: "20171509613", district: "Pashchimi Singhbhum", block: "Manoharpur", name: "ISWAR PATHAK CM SoE+2 HIGH SCHOOL", classFrom: 1, classTo: 12, hmName: "Sandhya Suren", hmPhone: "9693617414" },
  { slNo: 71, udise: "20172202504", district: "Pashchimi Singhbhum", block: "Tantnagar", name: "CM SoE+2 HIGH SCHOOL CHITIMITI", classFrom: 1, classTo: 12, hmName: "Indu Jamuda", hmPhone: "7367970847" },
  { slNo: 72, udise: "20181001002", district: "Purbi Singhbhum", block: "Boram", name: "CM SoE ADIBASI H.S BORAM", classFrom: 1, classTo: 10, hmName: "Majnu Ansari", hmPhone: "6207281282" },
  { slNo: 73, udise: "20180823908", district: "Purbi Singhbhum", block: "Chakulia", name: "CM SoE UPG GOVT +2 School MANOHAR LAL CHAKULIA", classFrom: 1, classTo: 12, hmName: "Subhash Mahato", hmPhone: "6200189400" },
  { slNo: 74, udise: "20180409703", district: "Purbi Singhbhum", block: "Dumaria", name: "CM SoE UPG GOVT +2S ASTKOSI, BHALUK PATRA", classFrom: 1, classTo: 12, hmName: "Abhay Kumar Singh", hmPhone: "9801502100" },
  { slNo: 75, udise: "20180600801", district: "Purbi Singhbhum", block: "Ghatshila", name: "CM SoE UPGRADED GOVT H.S.BANKATI", classFrom: 1, classTo: 10, hmName: "Sanjay Kumar Bhakat", hmPhone: "7654188357" },
  { slNo: 76, udise: "20180310501", district: "Purbi Singhbhum", block: "Golmuri-Cum-Jugsalai", name: "RASHTRAPITA GANDHI CM SoE HIGH SCHOOL MANGO", classFrom: 1, classTo: 10, hmName: "Dr. Firdaus Bano", hmPhone: "9334013754" },
  { slNo: 77, udise: "20181103501", district: "Purbi Singhbhum", block: "Gurabandha", name: "CM SoE UPG GOVT H.S.GURABANDA", classFrom: 1, classTo: 10, hmName: "Deepak Kumar Mangal", hmPhone: "8102374315" },
  { slNo: 78, udise: "20180231602", district: "Purbi Singhbhum", block: "Potka", name: "CM SoE UPG GOVT +2 SCHOOL VNIKETAN HALDIPOKHAR", classFrom: 1, classTo: 12, hmName: "Narendra Kumar", hmPhone: "9608184286" },
  { slNo: 79, udise: "20241600501", district: "Ramgarh", block: "Dulmi", name: "CM SoE HIGH SCHOOL CHATAK", classFrom: 1, classTo: 12, hmName: "Shankar Karmali", hmPhone: "7857002175" },
  { slNo: 80, udise: "20240701206", district: "Ramgarh", block: "Gola", name: "CM SoE S S HIGH SCHOOL GOLA", classFrom: 1, classTo: 12, hmName: "Anupa Pushpa Tirkey", hmPhone: "9608539222" },
  { slNo: 81, udise: "20241206705", district: "Ramgarh", block: "Mandu", name: "CM SoE JANTA H.S., CHAINPUR", classFrom: 9, classTo: 12, hmName: "Ram Lal Rajak", hmPhone: "7004945626" },
  { slNo: 82, udise: "20141004506", district: "Ranchi", block: "Angara", name: "CM SoE PROJECT UPG +2 HIGH SCHOOL JONHA", classFrom: 6, classTo: 12, hmName: "Manila Jyoti Lakra", hmPhone: "9835791461" },
  { slNo: 83, udise: "20141803503", district: "Ranchi", block: "Bundu", name: "RSMS CM SoE +2 HIGH SCHOOL BUNDU", classFrom: 6, classTo: 12, hmName: "Nilmani Soreng", hmPhone: "7488558239" },
  { slNo: 84, udise: "20140608901", district: "Ranchi", block: "Burmu", name: "CM SoE GOVT BASIC HIGH SCHOOL SOSAI", classFrom: 1, classTo: 10, hmName: "Anju Toppo", hmPhone: "8969519284" },
  { slNo: 85, udise: "20140405202", district: "Ranchi", block: "Mandar", name: "CM SoE UPG HIGH SCHOOL UCHARI", classFrom: 1, classTo: 12, hmName: "Putul Tirkey", hmPhone: "9939730846" },
  { slNo: 86, udise: "20142011510", district: "Ranchi", block: "Tamar", name: "CM SoE GOVT+2 HIGH SCHOOL TAMAR", classFrom: 9, classTo: 12, hmName: "Kaushal Kumar Jha", hmPhone: "8210082852" },
  { slNo: 87, udise: "20090805801", district: "Sahibganj", block: "Barharwa", name: "CM SoE UPG GOVT HS ISLAMPUR", classFrom: 1, classTo: 10, hmName: "John Sowrabh Baskey", hmPhone: "6206462421" },
  { slNo: 88, udise: "20090700502", district: "Sahibganj", block: "Berhait", name: "CM SoE UPG GOVT HS ADARSH BERHEIT", classFrom: 1, classTo: 10, hmName: "Sumitra Nandan Bharat Kumar", hmPhone: "8002317193" },
  { slNo: 89, udise: "20090600102", district: "Sahibganj", block: "Borio", name: "CM SoE UPG GOVT HS SOTICHOWKI PANGRO", classFrom: 1, classTo: 10, hmName: "Sushmita Soren", hmPhone: "8294101742" },
  { slNo: 90, udise: "20090200103", district: "Sahibganj", block: "Mandro", name: "CM SoE UPG GOVT HS TETARIYA", classFrom: 1, classTo: 10, hmName: "Ruby", hmPhone: "7991189690" },
  { slNo: 91, udise: "20090307602", district: "Sahibganj", block: "Pathna", name: "GANGIYA DAMIN CM SoE UPGRADED+2 HS BISHANPUR", classFrom: 9, classTo: 12, hmName: "Vijay Anand Hembrom", hmPhone: "7717721563" },
  { slNo: 92, udise: "20090402619", district: "Sahibganj", block: "Rajmahal", name: "CM SoE +2 JK HIGH SCHOOL RAJMAHAL", classFrom: 9, classTo: 12, hmName: "Dr. Avijeet Kumar", hmPhone: "7004380594" },
  { slNo: 93, udise: "20200404501", district: "Saraikela-Kharsawan", block: "Gamharia", name: "CM SoE HS DUGNI", classFrom: 1, classTo: 10, hmName: "Motilal Munda", hmPhone: "7992206184" },
  { slNo: 94, udise: "20200602703", district: "Saraikela-Kharsawan", block: "Ichagarh", name: "CM SoE HS KUTAM", classFrom: 1, classTo: 12, hmName: "Thakur Manjhi", hmPhone: "9955332852" },
  { slNo: 95, udise: "20200907601", district: "Saraikela-Kharsawan", block: "Kharsawan", name: "CM SoE HS PADAMPUR", classFrom: 1, classTo: 10, hmName: "Shikha Suman", hmPhone: "8102846860" },
  { slNo: 96, udise: "20201604705", district: "Saraikela-Kharsawan", block: "Nimdih", name: "CM SoE+2 HS RAGHUNATHPUR", classFrom: 9, classTo: 12, hmName: "Jay Nandan Thakur", hmPhone: "7762966577" },
  { slNo: 97, udise: "20201802009", district: "Saraikela-Kharsawan", block: "Rajnagar", name: "CM SoE S.S. +2 HIGH SCHOOL, RAJNAGAR", classFrom: 9, classTo: 12, hmName: "Suresh Kunkal", hmPhone: "9955677452" },
  { slNo: 98, udise: "20210605908", district: "Simdega", block: "Bano", name: "CM SoE SS +2 HIGH SCHOOL BANO", classFrom: 6, classTo: 12, hmName: "Anand Kumar", hmPhone: "9430779666" },
  { slNo: 99, udise: "20210700601", district: "Simdega", block: "Jaldega", name: "CM SoE UPG GOVT +2 HIGH SCHOOL ORGA", classFrom: 1, classTo: 12, hmName: "Surekha Ekka", hmPhone: "9123491769" },
  { slNo: 100, udise: "20210800303", district: "Simdega", block: "Pakartanr", name: "CM SoE+2 HS PAKARDANR RAMLOYA", classFrom: 1, classTo: 12, hmName: "Vimla Kumari", hmPhone: "8789161865" },
];

const EXTRAS: Record<string, SchoolExtra> = {
  "20011900801": {
    established: 1957,
    totalTeachers: 32,
    pinCode: "822114",
    village: "Birbal",
    // Birbal village centre on Google Maps.
    coords: { lat: 24.2070318, lng: 83.418992 },
    landmarks: [
      { name: "Shiv Mandir Birbal", type: "Temple", distance: "In Birbal village" },
      { name: "Makri", type: "Village (Birbal Gram Panchayat)", distance: "About 4 km north" },
      { name: "Sondiha and Shiv Mandir Sondiha", type: "Village / temple", distance: "About 3 km north-east" },
      { name: "Putur and Putur Dam", type: "Village / dam", distance: "About 2.5 km east" },
      { name: "Kalma", type: "Village", distance: "About 3 km south-east" },
      { name: "Sagma (block headquarters)", type: "Block office", distance: "About 5 km east" },
      { name: "Uttar Pradesh border", type: "State border", distance: "About 4–5 km west" },
      { name: "Garhwa (district headquarters)", type: "Town", distance: "About 57 km" },
    ],
  },
};

export const SCHOOLS: School[] = SCHOOL_LIST.map((s) => ({ ...s, ...EXTRAS[s.udise] }));

const BY_UDISE = new Map(SCHOOLS.map((s) => [s.udise, s]));

export function getSchool(udise: string | undefined): School | undefined {
  return udise ? BY_UDISE.get(udise) : undefined;
}

export function classesLabel(s: School): string {
  return `Class ${s.classFrom} to ${s.classTo}`;
}

export function schoolLevel(s: School): string {
  return s.classTo >= 12 ? "Senior Secondary (up to Class 12)" : "Secondary (up to Class 10)";
}

export function schoolAddress(s: School): string {
  const parts = [s.village, `Block ${s.block}`, `District ${s.district}`, "Jharkhand"].filter(Boolean);
  return parts.join(", ") + (s.pinCode ? ` – ${s.pinCode}` : "");
}

export function principalLabel(s: School): string {
  return s.hmName ?? "Headmaster";
}

export function displayPhone(phone: string): string {
  return `${phone.slice(0, 5)} ${phone.slice(5)}`;
}

export function mapQuery(s: School): string {
  return s.coords ? `${s.coords.lat},${s.coords.lng}` : `${s.name}, ${s.block}, ${s.district}, Jharkhand`;
}

export function mapEmbedUrl(s: School): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(s))}&z=${s.coords ? 15 : 13}&output=embed`;
}

export function mapLink(s: School): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(s))}`;
}
