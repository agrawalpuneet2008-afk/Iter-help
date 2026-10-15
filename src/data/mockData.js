// Campus Data Store for CampusPulse

export const CAMPUS_BUILDINGS = [
  {
    id: "eng-a",
    name: "Engineering & Applied Sciences (Block A)",
    shortName: "Block A",
    category: "Academic",
    code: "ENG-A",
    x: 220,
    y: 190,
    width: 170,
    height: 120,
    color: "#4f46e5",
    accent: "#818cf8",
    description: "Hub for Computer Science, Robotics & Electrical Engineering labs.",
    occupancy: "72% (Busy)",
    occupancyLevel: "busy",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Level 1: Reception & Mechatronics Lab", rooms: ["A101 - Auditorium", "A104 - Embedded Systems Lab", "Cabin A-105 - Dr. Rajesh Sharma (IoT Lab)", "A108 - Robotics Bay"] },
      { level: 2, name: "Level 2: Software Engineering & AI Centers", rooms: ["A201 - Cloud Lab", "A204 - Lecture Hall 2", "Cabin A-215 - Prof. Elena Rostova (Math)", "A208 - Faculty Lounge"] },
      { level: 3, name: "Level 3: Cyber Security & Graduate Research", rooms: ["Cabin A-302 - Dr. Aisha Khan (CyberSec)", "Cabin A-308 - Prof. Sarah Chen (Assoc Dean)", "A301 - Defense Lab", "A305 - Dean's Office", "A310 - Seminar Room"] }
    ],
    hours: "07:30 AM - 10:00 PM"
  },
  {
    id: "sci-tech",
    name: "Turing Innovation & AI Labs (Block C)",
    shortName: "Turing Hub",
    category: "Research",
    code: "TUR-C",
    x: 450,
    y: 150,
    width: 160,
    height: 110,
    color: "#0284c7",
    accent: "#38bdf8",
    description: "Incubation center, AI Supercomputing cluster & Quantum Tech sandbox.",
    occupancy: "45% (Moderate)",
    occupancyLevel: "moderate",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Ground: Maker Space & 3D Printing", rooms: ["C101 - Prototype Lab", "C103 - VR Studio"] },
      { level: 2, name: "Level 2: Google Developer Student Club HQ", rooms: ["Cabin C-214 - Dr. Marcus Vance (AI Lead)", "C201 - Hackathon Arena", "C205 - GDG Sandbox"] }
    ],
    hours: "24/7 Access for authorized badges"
  },
  {
    id: "library",
    name: "Knowledge Commons & Central Library",
    shortName: "Main Library",
    category: "Services",
    code: "LIB-M",
    x: 350,
    y: 350,
    width: 200,
    height: 140,
    color: "#059669",
    accent: "#34d399",
    description: "400,000+ volumes, 40 private study pods, quiet reading halls & media lounge.",
    occupancy: "84% (Very High)",
    occupancyLevel: "busy",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Level 1: Circulation Desk & Cafe", rooms: ["L101 - Helpdesk", "L102 - Book Return", "L105 - Cafe Common"] },
      { level: 2, name: "Level 2: Collaborative Study & Tech Carrels", rooms: ["L201 - Pods A1-A6", "L208 - Discussion Zone", "L215 - Print & Scan"] },
      { level: 3, name: "Level 3: Silent Research & Archives", rooms: ["L301 - Silent Hall", "L304 - Graduate Stacks", "L310 - Rare Books Archive"] }
    ],
    hours: "08:00 AM - Midnight"
  },
  {
    id: "student-union",
    name: "Student Union & Campus Center",
    shortName: "Student Union",
    category: "Community",
    code: "STU-U",
    x: 140,
    y: 380,
    width: 150,
    height: 120,
    color: "#d97706",
    accent: "#fbbf24",
    description: "Student council, clubs office, event atrium, gaming lounge & bookstore.",
    occupancy: "60% (Moderate)",
    occupancyLevel: "moderate",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Level 1: Info Desk, ATM & Retail", rooms: ["U101 - Campus Info", "U103 - University Store"] },
      { level: 2, name: "Level 2: Club Offices & Multipurpose Room", rooms: ["U201 - GDG Club Room", "U204 - Student Affairs", "U210 - Event Hall"] }
    ],
    hours: "08:00 AM - 11:00 PM"
  },
  {
    id: "dining-hall",
    name: "Global Dining & Food Quad",
    shortName: "Dining Commons",
    category: "Food",
    code: "DIN-Q",
    x: 650,
    y: 290,
    width: 150,
    height: 110,
    color: "#e11d48",
    accent: "#fb7185",
    description: "Multiple international cuisine stations, organic salad bar, barista counter.",
    occupancy: "30% (Low)",
    occupancyLevel: "low",
    accessibility: {
      hasElevator: false,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Ground Floor: Food Court & Outdoor Patio", rooms: ["D101 - Main Mess", "D104 - Artisan Coffee", "D108 - Juice & Snack Bar"] }
    ],
    hours: "07:00 AM - 09:30 PM"
  },
  {
    id: "sports-center",
    name: "Olympian Sports Pavilion & Gym",
    shortName: "Sports Complex",
    category: "Recreation",
    code: "SPT-O",
    x: 650,
    y: 450,
    width: 160,
    height: 120,
    color: "#7c3aed",
    accent: "#a78bfa",
    description: "Indoor basketball court, Olympic-size pool, weights gym & physio clinic.",
    occupancy: "50% (Moderate)",
    occupancyLevel: "moderate",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Level 1: Fitness Gym & Locker Rooms", rooms: ["S101 - Main Gym", "S105 - Aquatic Arena"] },
      { level: 2, name: "Level 2: Indoor Track & Squash Courts", rooms: ["S201 - Track 1", "S204 - Squash Pod"] }
    ],
    hours: "06:00 AM - 10:00 PM"
  },
  {
    id: "residence-quad",
    name: "North Campus Hall & Residencies",
    shortName: "North Dorms",
    category: "Residential",
    code: "RES-N",
    x: 180,
    y: 40,
    width: 170,
    height: 90,
    color: "#0d9488",
    accent: "#2dd4bf",
    description: "Student residential towers with common recreation halls and study lofts.",
    occupancy: "88% (Residents only)",
    occupancyLevel: "busy",
    accessibility: {
      hasElevator: true,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Level 1: Check-in & Mail Center", rooms: ["R101 - Concierge", "R102 - Laundry"] }
    ],
    hours: "24/7 Access (Keycard Required)"
  },
  {
    id: "health-center",
    name: "Student Health & Wellness Clinic",
    shortName: "Health Center",
    category: "Services",
    code: "HLT-W",
    x: 670,
    y: 80,
    width: 130,
    height: 90,
    color: "#16a34a",
    accent: "#4ade80",
    description: "24/7 urgent first aid, mental health counseling, pharmacy & consultation.",
    occupancy: "20% (Low wait)",
    occupancyLevel: "low",
    accessibility: {
      hasElevator: false,
      hasRamps: true,
      brailleSignage: true,
      accessibleRestrooms: true
    },
    floors: [
      { level: 1, name: "Ground Floor: Urgent Care & Pharmacy", rooms: ["H101 - Triage", "H102 - Doctor Consult", "H104 - Pharmacy"] }
    ],
    hours: "24 Hours Emergency Service"
  }
];

// Pre-defined routes for the wayfinding engine
export const CAMPUS_ROUTES = [
  {
    from: "eng-a",
    to: "library",
    distanceMeters: 280,
    standardTimeMin: 4,
    accessibleTimeMin: 5,
    pathCoords: [
      { x: 305, y: 310 },
      { x: 320, y: 340 },
      { x: 360, y: 350 },
      { x: 400, y: 350 }
    ],
    standardSteps: [
      "Exit Block A via South Main Atrium.",
      "Follow the paved Central Promenade past the Clock Tower.",
      "Take the front steps into the Library Knowledge Commons main entrance."
    ],
    accessibleSteps: [
      "Exit Block A via South West Ramp (Slope gradient 1:14).",
      "Follow the smooth tactile stone pathway avoiding steps.",
      "Take the automated South ramp directly into Library Level 1 West Portal.",
      "Use elevator Bank B if navigating to Level 2 or 3."
    ],
    elevationGain: "Zero steps (Accessible Mode)"
  },
  {
    from: "student-union",
    to: "sci-tech",
    distanceMeters: 450,
    standardTimeMin: 6,
    accessibleTimeMin: 7,
    pathCoords: [
      { x: 250, y: 380 },
      { x: 320, y: 320 },
      { x: 420, y: 240 },
      { x: 480, y: 220 }
    ],
    standardSteps: [
      "Depart Student Union towards East Quad.",
      "Cross the sunken garden steps.",
      "Enter Turing Hub through the glass bridge."
    ],
    accessibleSteps: [
      "Depart Student Union via level West Concourse.",
      "Bypass the sunken garden by utilizing the North Ring flat boulevard.",
      "Enter Turing Hub Ground Floor via automatic sensor doors."
    ],
    elevationGain: "Step-free flat path"
  },
  {
    from: "residence-quad",
    to: "eng-a",
    distanceMeters: 190,
    standardTimeMin: 2,
    accessibleTimeMin: 3,
    pathCoords: [
      { x: 260, y: 130 },
      { x: 270, y: 160 },
      { x: 280, y: 190 }
    ],
    standardSteps: [
      "Leave North Dorms via Main Gate.",
      "Walk straight down the Academic Walk.",
      "Arrive at Block A front porch."
    ],
    accessibleSteps: [
      "Leave North Dorms via East Ramp.",
      "Follow continuous tactile paving along Academic Walk.",
      "Enter Block A ground ramp at North entrance."
    ],
    elevationGain: "Zero elevation change"
  },
  {
    from: "library",
    to: "dining-hall",
    distanceMeters: 220,
    standardTimeMin: 3,
    accessibleTimeMin: 3.5,
    pathCoords: [
      { x: 500, y: 400 },
      { x: 580, y: 370 },
      { x: 650, y: 340 }
    ],
    standardSteps: [
      "Exit Library East Doors.",
      "Cross the Student Lawn.",
      "Enter Dining Commons main hall."
    ],
    accessibleSteps: [
      "Exit Library East ADA-compliant automatic ramp.",
      "Take the paved asphalt pathway around the lawn perimeter.",
      "Roll directly into Dining Commons level patio entrance."
    ],
    elevationGain: "Flat ground"
  }
];

export const STUDENT_SCHEDULE = [
  {
    id: "cls-1",
    courseCode: "CS402",
    courseTitle: "Distributed Cloud Systems",
    day: "Thursday",
    time: "10:30 AM - 12:00 PM",
    startTime: "10:30",
    endTime: "12:00",
    room: "Room A201 (Cloud Lab)",
    buildingId: "eng-a",
    buildingName: "Engineering Block A",
    floor: "Level 2",
    professor: "Prof. Sarah Chen",
    type: "Lecture & Lab",
    status: "Upcoming",
    isNext: true,
    minutesUntil: 18,
    attendanceRate: "94%"
  },
  {
    id: "cls-2",
    courseCode: "AI310",
    courseTitle: "Neural Networks & Deep Learning",
    day: "Thursday",
    time: "02:00 PM - 03:30 PM",
    startTime: "14:00",
    endTime: "15:30",
    room: "Hackathon Arena C201",
    buildingId: "sci-tech",
    buildingName: "Turing Innovation Hub",
    floor: "Level 2",
    professor: "Dr. Marcus Vance",
    type: "Hands-on Workshop",
    status: "Scheduled",
    isNext: false,
    minutesUntil: 228,
    attendanceRate: "100%"
  },
  {
    id: "cls-3",
    courseCode: "GDG101",
    courseTitle: "Google Solution Challenge Mentorship",
    day: "Thursday",
    time: "04:30 PM - 06:00 PM",
    startTime: "16:30",
    endTime: "18:00",
    room: "GDG Sandbox C205",
    buildingId: "sci-tech",
    buildingName: "Turing Innovation Hub",
    floor: "Level 2",
    professor: "GDG Lead & Tech Mentors",
    type: "Project Mentorship",
    status: "Scheduled",
    isNext: false,
    minutesUntil: 378,
    attendanceRate: "100%"
  },
  {
    id: "cls-4",
    courseCode: "MATH240",
    courseTitle: "Probability & Applied Statistics",
    day: "Friday",
    time: "09:00 AM - 10:30 AM",
    startTime: "09:00",
    endTime: "10:30",
    room: "Auditorium A101",
    buildingId: "eng-a",
    buildingName: "Engineering Block A",
    floor: "Level 1",
    professor: "Prof. Elena Rostova",
    type: "Lecture",
    status: "Upcoming",
    isNext: false,
    attendanceRate: "88%"
  },
  {
    id: "cls-5",
    courseCode: "ENG205",
    courseTitle: "Technical Leadership & Communication",
    day: "Friday",
    time: "11:00 AM - 12:30 PM",
    startTime: "11:00",
    endTime: "12:30",
    room: "Seminar Room A310",
    buildingId: "eng-a",
    buildingName: "Engineering Block A",
    floor: "Level 3",
    professor: "Dr. Jonathan Hayes",
    type: "Seminar",
    status: "Upcoming",
    isNext: false,
    attendanceRate: "92%"
  }
];

export const STUDY_ROOMS = [
  {
    id: "room-pod-1",
    name: "Apex Acoustic Pod #4",
    building: "Central Library",
    buildingId: "library",
    floor: "Level 2 (West Wing)",
    capacity: 1,
    category: "Solo Quiet Pod",
    status: "Available",
    amenities: ["Ultra-Quiet Soundproofing", "Power & USB-C Fast Charger", "Ergonomic Herman Miller Chair", "Warm Dimming Light"],
    currentOccupant: null,
    rating: 4.9,
    slots: ["11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM"]
  },
  {
    id: "room-collab-1",
    name: "Collaborative Innovation Pod B2",
    building: "Central Library",
    buildingId: "library",
    floor: "Level 2 (East Zone)",
    capacity: 6,
    category: "Group Collaboration",
    status: "Available",
    amenities: ["65\" 4K Casting Monitor", "Floor-to-Ceiling Whiteboard", "Conference Mic & Camera", "Polycom Audio"],
    currentOccupant: null,
    rating: 4.8,
    slots: ["10:30 AM - 12:00 PM", "01:00 PM - 02:30 PM", "03:00 PM - 04:30 PM"]
  },
  {
    id: "room-vr-1",
    name: "XR & Spatial Computing Lab",
    building: "Turing Innovation Hub",
    buildingId: "sci-tech",
    floor: "Ground Floor",
    capacity: 4,
    category: "Tech Sandbox",
    status: "Reserved",
    amenities: ["Meta Quest 3 Headsets", "RTX 4090 Workstations", "Motion Tracking Sensors", "Spatial Audio Rig"],
    currentOccupant: "GDG Hackathon Team (Until 1:30 PM)",
    rating: 5.0,
    slots: ["02:00 PM - 03:30 PM", "04:00 PM - 05:30 PM"]
  },
  {
    id: "room-quiet-2",
    name: "Zenith Deep Work Suite #12",
    building: "Central Library",
    buildingId: "library",
    floor: "Level 3 (Silent Wing)",
    capacity: 2,
    category: "Dual Study Carrel",
    status: "Occupied",
    amenities: ["Dual Monitor Mounts", "Noise-Cancellation Partition", "Air Purifier", "Standing Desk"],
    currentOccupant: "Occupied until 12:15 PM",
    rating: 4.7,
    slots: ["12:30 PM - 01:30 PM", "01:30 PM - 02:30 PM", "03:30 PM - 04:30 PM"]
  },
  {
    id: "room-media-1",
    name: "Podcast & Media Production Studio",
    building: "Student Union",
    buildingId: "student-union",
    floor: "Level 2",
    capacity: 5,
    category: "Media Studio",
    status: "Available",
    amenities: ["Shure SM7B Microphones", "Rodecaster Pro II Console", "Studio Acoustic Damping", "RGB Key Lights"],
    currentOccupant: null,
    rating: 4.9,
    slots: ["11:30 AM - 01:00 PM", "02:00 PM - 03:30 PM", "04:00 PM - 05:30 PM"]
  }
];

export const LOST_FOUND_ITEMS = [
  {
    id: "item-1",
    title: "Navy Blue Hydro Flask (32oz) with GDG Stickers",
    category: "Drinkware & Bottles",
    type: "FOUND",
    location: "Library Level 2, Desk #14",
    buildingId: "library",
    date: "Today, 10:15 AM",
    description: "Insulated water bottle covered with Google Developer Groups and React logos. Handed over to Library front desk.",
    contactDesk: "Library Circulation Desk (Ext. 4102)",
    status: "Unclaimed",
    finder: "Anonymous Student",
    tags: ["bottle", "blue", "stickers", "gdg"],
    icon: "bottle"
  },
  {
    id: "item-2",
    title: "Black Sony WH-1000XM5 Headphones in Case",
    category: "Electronics",
    type: "LOST",
    location: "Engineering Block A, Room A204",
    buildingId: "eng-a",
    date: "Yesterday, 4:45 PM",
    description: "Left behind on the 3rd row desk after Distributed Systems lecture. Case has a small silver carabiner attached.",
    contactDesk: "Owner contact: alex.m@campus.edu",
    status: "Searching",
    finder: null,
    tags: ["headphones", "sony", "audio", "electronics"],
    icon: "headphones"
  },
  {
    id: "item-3",
    title: "University RFID Student Badge & Keycard (Alex Chen)",
    category: "Cards & ID",
    type: "FOUND",
    location: "Dining Commons Patio",
    buildingId: "dining-hall",
    date: "Yesterday, 1:20 PM",
    description: "Student ID card with blue lanyard and room key tag. Securely stored at campus safety office.",
    contactDesk: "Campus Security Desk, Student Union",
    status: "Claimed",
    finder: "Dining Staff",
    tags: ["id", "badge", "keycard", "chen"],
    icon: "credit-card"
  },
  {
    id: "item-4",
    title: "Logitech MX Master 3S Wireless Mouse (Space Gray)",
    category: "Electronics",
    type: "FOUND",
    location: "Turing Hub C201 (Hackathon Arena)",
    buildingId: "sci-tech",
    date: "2 days ago",
    description: "Found next to workstation 8 after the weekend workshop. USB dongle still inside battery slot.",
    contactDesk: "Turing Lab Tech Desk",
    status: "Unclaimed",
    finder: "Lab Assistant Jordan",
    tags: ["mouse", "logitech", "electronics"],
    icon: "mouse"
  },
  {
    id: "item-5",
    title: "Brown Leather Moleskine Notebook with CS Notes",
    category: "Books & Notes",
    type: "LOST",
    location: "Central Lawn benches near Fountain",
    buildingId: "library",
    date: "Oct 14, 2026",
    description: "Contains handwritten machine learning algorithm summaries and project draft diagrams. Invaluable notes!",
    contactDesk: "Owner: priya.k@campus.edu / +1 (555) 019-2834",
    status: "Searching",
    finder: null,
    tags: ["notebook", "notes", "leather", "book"],
    icon: "book"
  }
];

export const CAMPUS_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Urgent: North Shuttle Route Modified for Campus Marathon",
    category: "Transit & Safety",
    urgent: true,
    department: "Campus Transit Authority",
    timestamp: "25 mins ago",
    content: "Due to the annual inter-college 10K marathon, the North Quad shuttle will detour via Perimeter Blvd from 1:00 PM to 5:00 PM today. Wheelchair accessible shuttle vans remain available on call via the transit hotline.",
    upvotes: 42,
    bookmarked: false
  },
  {
    id: "ann-2",
    title: "Library 24/7 Extended Access & Free Coffee Hours Announced for Midterms",
    category: "Academic",
    urgent: false,
    department: "Knowledge Commons Library",
    timestamp: "2 hours ago",
    content: "Starting next Monday, Central Library floors 1 through 3 will remain open 24/7. Complementary drip coffee and herbal tea stations will operate nightly between 10:00 PM and 2:00 AM in the West Cafe Atrium.",
    upvotes: 189,
    bookmarked: true
  },
  {
    id: "ann-3",
    title: "Google Solution Challenge 2026 Hackathon Kickoff & Ideation Workshop",
    category: "Clubs & Innovation",
    urgent: false,
    department: "Google Developer Student Club (GDG)",
    timestamp: "5 hours ago",
    content: "Join us this Friday at 4:30 PM in Turing Hub C205 for the official GDG Solution Challenge kickoff! Meet mentors, form cross-disciplinary teams, and pitch ideas addressing UN SDGs with Google Cloud & AI tech.",
    upvotes: 275,
    bookmarked: false
  },
  {
    id: "ann-4",
    title: "Scheduled Maintenance: Turing AI Cluster GPU Upgrades This Weekend",
    category: "IT & Services",
    urgent: false,
    department: "High Performance Computing Center",
    timestamp: "1 day ago",
    content: "The Turing Lab AI cluster will experience a 4-hour scheduled downtime on Saturday from 2:00 AM to 6:00 AM for the installation of additional Tensor Core GPU nodes. Local workstations will not be affected.",
    upvotes: 56,
    bookmarked: false
  }
];

export const STUDENT_PROFILE = {
  name: "Karan Mehta",
  studentId: "U2023-CS-8941",
  department: "Computer Science & Engineering",
  year: "3rd Year (Junior)",
  email: "karan.mehta@campus.edu",
  rfidCard: "04:A2:99:F1:C7:38",
  activeReservations: 1,
  rewardPoints: 340,
  emergencyContact: "Campus Emergency: +1 (555) 911-CAMPUS",
  medicalAllergies: "None Reported",
  mobilityPreference: "Standard (Elevator Preferred)"
};

export const FACULTY_DIRECTORY = [
  {
    id: "fac-1",
    name: "Prof. Sarah Chen",
    title: "Professor & Associate Dean",
    department: "Computer Science & Engineering",
    block: "Block A (Engineering & Sciences)",
    buildingId: "eng-a",
    cabinNumber: "Cabin A-308",
    floor: "Level 3 (Faculty Wing)",
    avatar: "SC",
    color: "#6366f1",
    status: "In Cabin (Available)",
    statusType: "available",
    officeHours: "Mon & Thu: 02:00 PM - 04:30 PM",
    email: "s.chen@campus.edu",
    phone: "Ext. 3081",
    courses: ["CS402 - Distributed Cloud Systems", "CS580 - Advanced Systems"],
    specialization: "Distributed Consensus, Cloud Orchestration, Fault Tolerance",
    directionsHint: "Take North elevator in Block A to Level 3, turn left past the Seminar Hall. Cabin A-308 is the corner office with glass signage."
  },
  {
    id: "fac-2",
    name: "Dr. Marcus Vance",
    title: "Lead AI Researcher & Assistant Professor",
    department: "Artificial Intelligence & Robotics",
    block: "Block C (Turing Innovation Hub)",
    buildingId: "sci-tech",
    cabinNumber: "Cabin C-214",
    floor: "Level 2 (AI Sandbox)",
    avatar: "MV",
    color: "#0284c7",
    status: "In Cabin (Available)",
    statusType: "available",
    officeHours: "Tue & Wed: 11:00 AM - 01:00 PM",
    email: "m.vance@campus.edu",
    phone: "Ext. 2140",
    courses: ["AI310 - Neural Networks & Deep Learning", "AI420 - Computer Vision"],
    specialization: "Transformer Architectures, Autonomous Robotics, Generative Models",
    directionsHint: "Walk across the Level 2 glass bridge into Turing Hub. Cabin C-214 is directly facing the GDG Innovation Arena."
  },
  {
    id: "fac-3",
    name: "Prof. Elena Rostova",
    title: "Department Chair & Professor",
    department: "Applied Mathematics & Statistics",
    block: "Block A (Engineering & Sciences)",
    buildingId: "eng-a",
    cabinNumber: "Cabin A-215",
    floor: "Level 2 (Math Wing)",
    avatar: "ER",
    color: "#10b981",
    status: "In Lecture (Until 12:30 PM)",
    statusType: "busy",
    officeHours: "Wed & Fri: 01:30 PM - 03:30 PM",
    email: "e.rostova@campus.edu",
    phone: "Ext. 2154",
    courses: ["MATH240 - Probability & Applied Statistics", "MATH301 - Linear Algebra"],
    specialization: "Stochastic Processes, Bayesian Inference, High-Dimensional Data",
    directionsHint: "Level 2 of Block A, walk past Lecture Hall 2 into the Mathematics faculty corridor. Cabin A-215 is on the right."
  },
  {
    id: "fac-4",
    name: "Dr. Jonathan Hayes",
    title: "Associate Professor & Student Mentor",
    department: "Technical Leadership & Communication",
    block: "Student Union & Campus Center",
    buildingId: "student-union",
    cabinNumber: "Cabin U-204",
    floor: "Level 2 (Student Affairs)",
    avatar: "JH",
    color: "#d97706",
    status: "In Cabin (Available)",
    statusType: "available",
    officeHours: "Daily: 10:00 AM - 12:00 PM",
    email: "j.hayes@campus.edu",
    phone: "Ext. 2045",
    courses: ["ENG205 - Technical Leadership", "HUM102 - Ethics in Engineering"],
    specialization: "Engineering Ethics, Tech Communication, GDG Faculty Sponsor",
    directionsHint: "Take central stairs or elevator in Student Union to Level 2. Cabin U-204 is located within the Student Affairs & Clubs wing."
  },
  {
    id: "fac-5",
    name: "Dr. Rajesh Sharma",
    title: "Professor & Lab Director",
    department: "Embedded Systems & IoT",
    block: "Block A (Engineering & Sciences)",
    buildingId: "eng-a",
    cabinNumber: "Cabin A-105",
    floor: "Level 1 (Hardware Wing)",
    avatar: "RS",
    color: "#7c3aed",
    status: "In Lab / Field Work",
    statusType: "away",
    officeHours: "Mon & Fri: 03:00 PM - 05:00 PM",
    email: "r.sharma@campus.edu",
    phone: "Ext. 1052",
    courses: ["EE305 - Microcontrollers & Embedded Systems", "IOT410 - Sensor Networks"],
    specialization: "FPGA Design, Real-Time Operating Systems, Edge AI Hardware",
    directionsHint: "Ground floor of Block A, directly adjacent to the Mechatronics and Embedded Systems Lab."
  },
  {
    id: "fac-6",
    name: "Dr. Aisha Khan",
    title: "Research Director",
    department: "Cyber Security & Information Assurance",
    block: "Block A (Engineering & Sciences)",
    buildingId: "eng-a",
    cabinNumber: "Cabin A-302",
    floor: "Level 3 (Security Wing)",
    avatar: "AK",
    color: "#e11d48",
    status: "In Cabin (Available)",
    statusType: "available",
    officeHours: "Tue & Thu: 01:00 PM - 03:00 PM",
    email: "a.khan@campus.edu",
    phone: "Ext. 3028",
    courses: ["SEC401 - Network Security", "SEC450 - Applied Cryptography"],
    specialization: "Zero-Trust Architecture, Protocol Verification, Cryptographic Primitives",
    directionsHint: "Level 3 Block A, directly opposite the Cyber Defense Sandbox in Room A301."
  }
];
