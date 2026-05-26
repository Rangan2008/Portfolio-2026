
import { 
  Code2, 
  Database, 
  Layout, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Cpu,
  Globe,
  Award,
  Briefcase,
  Trophy
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Rangan Das",
  role: "Full Stack Developer",
  education: "BCA at IEM Kolkata (2023-2026)",
  location: "Kolkata, India",
  email: "ranganiem23@gmail.com",
  github: "https://github.com/Rangan2008",
  linkedin: "https://linkedin.com/in/rangandas2008",
  availability: "Available for work"
};

export const SKILLS = [
  { name: "Python", category: "Backend", level: "Advanced", description: "Used in backend APIs and automation tasks." },
  { name: "HTML", category: "Frontend", level: "Advanced", description: "Used for semantic page structure and accessible layouts." },
  { name: "CSS", category: "Frontend", level: "Advanced", description: "Used for responsive styling, themes, and motion design." },
  { name: "C++", category: "Core", level: "Intermediate", description: "Used for DSA, performance logic, and problem solving." },
  { name: "C", category: "Core", level: "Intermediate", description: "Used for fundamentals, memory concepts, and problem solving." },
  { name: "Java", category: "Core", level: "Intermediate", description: "Used for OOP-driven application development." },
  { name: "JavaScript", category: "Frontend", level: "Advanced", description: "Used across full-stack apps and interactive UIs." },
  { name: "React", category: "Frontend", level: "Intermediate", description: "Used to build reusable, component-based interfaces." },
  { name: "Node.js", category: "Backend", level: "Intermediate", description: "Used for API services and server-side logic." },
  { name: "MongoDB", category: "Database", level: "Intermediate", description: "Used in full-stack apps with flexible schema design." },
  { name: "MySQL", category: "Database", level: "Advanced", description: "Used for relational data modeling and optimized queries." },
  { name: "Docker", category: "DevOps", level: "Intermediate", description: "Used for containerized deployment workflows." },
  { name: "Git", category: "Workflow", level: "Advanced", description: "Used for collaborative version control and branching." },
  { name: "GitHub", category: "Workflow", level: "Advanced", description: "Used for remote repositories, collaboration, and project hosting." },
  { name: "Postman", category: "Testing", level: "Intermediate", description: "Used for API testing, debugging, and documentation." },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Amazon Clone",
    badge: "Featured",
    description: "A responsive storefront replica focused on layout precision, reusable UI blocks, and cart-ready interactions.",
    features: [
      "Category and product grid architecture",
      "Responsive navbar and section composition",
      "Scalable styling with reusable patterns"
    ],
    tags: ["Web App", "UI", "HTML", "CSS", "JavaScript"],
    image: "amazon_mockup",
    color: "#3b82f6",
    github: "https://github.com/Rangan2008/Landing-page-Amazon",
    live: "https://landing-page-amazon-nine.vercel.app/"
  },
  {
    id: 2,
    title: "Skill Snap",
    description: "An AI skill platform that maps growth plans, tracks progress, and recommends high-impact learning paths.",
    image: "skill_snap_mockup",
    features: [
      "AI-based recommendation workflows",
      "Role-specific dashboards and skill scoring",
      "REST-based full-stack integration"
    ],
    tags: ["AI", "EdTech", "React", "Node.js", "MongoDB"],
    color: "#f59e0b",
    github: "https://github.com/Rangan2008/Skill-Snap",
    live: "https://skill-snap-2025.vercel.app/"
  },
  {
    id: 3,
    title: "Nexus Chat",
    description: "A conversational AI app with session memory, lightweight APIs, and clean interaction flow for real users.",
    image: "nexus_chat_mockup",
    features: [
      "Context-preserving AI chat threads",
      "Backend API orchestration with Flask",
      "Performance-focused frontend messaging UI"
    ],
    tags: ["AI", "Chat", "Flask", "MongoDB", "JavaScript"],
    color: "#00e5cc",
    github: "https://github.com/Rangan2008/NexusChat",
    live: "https://nexuschat2k25.onrender.com/"
  },
  {
    id: 4,
    title: "Mindpal",
    description: "AI-powered companion focused on student mental health, stress management, and digital well-being with interactive support.",
    image: "mindpal_mockup",
    features: [
      "Intelligent chatbot support system",
      "Self-care routine recommendations",
      "Mindfulness and meditation tools",
      "Progress tracking dashboard"
    ],
    tags: ["AI", "Wellness", "Mental Health", "HTML", "CSS", "JavaScript", "AI APIs"],
    color: "#ec4899",
    github: "https://github.com/Rangan2008/Mindpal2K25",
    live: "https://mindpal2k25.onrender.com/"
  },
  {
    id: 5,
    title: "Driver Safety Mechanism",
    description: "Smart system designed to improve road safety by monitoring driver behavior and providing real-time alerts.",
    image: "driver_safety_mockup",
    features: [
      "Real-time driver behavior detection",
      "Alert system for safety violations",
      "Data logging and analytics",
      "IoT device integration ready"
    ],
    tags: ["IoT", "Safety", "System", "JavaScript", "Python", "Real-time Detection"],
    color: "#10b981",
    github: "https://github.com/Rangan2008/Driver-Safety-Final-",
    live: ""
  },
  {
    id: 6,
    title: "Weather App",
    description: "Real-time weather forecasting application with location-based updates and an intuitive, clean dashboard interface.",
    image: "weather_mockup",
    features: [
      "Live temperature and condition updates",
      "Location-based weather detection",
      "7-day forecast display",
      "Search by city functionality"
    ],
    tags: ["Web App", "API", "JavaScript", "Weather API", "CSS"],
    color: "#0ea5e9",
    github: "https://github.com/Rangan2008/Weather-Webpage",
    live: ""
  },
  {
    id: 7,
    title: "Scientific Calculator App",
    description: "Advanced calculator supporting scientific operations including trigonometry, logarithms, and complex mathematical functions.",
    image: "scientific_calculator_mockup",
    features: [
      "Trigonometric calculations (sin, cos, tan)",
      "Logarithmic and exponential functions",
      "Memory function for complex operations",
      "Clean, intuitive UI with keystroke support"
    ],
    tags: ["Utility", "Web App", "HTML", "CSS", "JavaScript"],
    color: "#8b5cf6",
    github: "https://github.com/Rangan2008/Scientific-Calculator",
    live: ""
  },
  {
    id: 8,
    title: "Langify",
    description: "An ML-based application that recognizes hand gestures and converts them into alphabets and meaningful words in real time using computer vision.",
    image: "langify_mockup",
    features: [
      "Real-time hand gesture detection",
      "Conversion of gestures into alphabets",
      "Dynamic word formation from detected letters",
      "Computer vision-based sign recognition"
    ],
    tags: ["EdTech", "AI", "Language Learning", "JavaScript", "React", "Backend API"],
    color: "#f43f5e",
    github: "https://github.com/Rangan2008/SignLanguage-Webpage",
    live: ""
  },
  {
    id: 9,
    title: "AetherType",
    description: "A gesture-based text input system that lets users type using hand movements instead of a keyboard, powered by real-time hand tracking and predictive text.",
    image: "aethertype_mockup",
    features: [
      "Real-time hand gesture detection and tracking",
      "Gesture-to-character mapping system",
      "AI-powered predictive text suggestions",
      "Multi-gesture keyboard interface",
      "Accessibility-focused input alternative"
    ],
    tags: ["Gesture Control", "AI", "Input System", "Python", "TensorFlow", "JavaScript", "Hand Tracking"],
    color: "#fbbf24",
    github: "https://github.com/Rangan2008/AetherType",
    live: "https://aethertype-one.vercel.app/"
  }
];

export const EXPERIENCE = [
  {
    company: "Blue Stock Fintech",
    role: "SDE Intern",
    period: "2025",
    description: "Developing robust fintech solutions and improving system architecture."
  },
  {
    company: "Forage Job Simulations – Deloitte (Technology), Tata (Cybersecurity, GenAI Data Analytics)",
    role: "Virtual Intern",
    period: "2024 – 2025",
    description: "Completed industry-simulated tasks in technology consulting, cybersecurity, and GenAI-powered data analytics across Deloitte and Tata programmes."
  }
];

export const ACHIEVEMENTS = [
  {
    title: "TCS CodeVita Season 13",
    rank: 8679,
    totalParticipants: 300000,
    description: "Secured a Global Rank of 8679 in TCS CodeVita Season 13, one of the world's largest competitive programming contests, showcasing strong problem-solving and coding skills.",
    tags: ["Competitive Programming", "Global Rank", "TCS CodeVita"],
    icon: Trophy,
    date: "2026",
    featured: true,
    type: "competitive",
    credentialImage: "/credentials/tcs-codevita-rank-certificate.png",
    credentialLink: "https://www.tcscodevita.com/"
  },
  {
    title: "HackerRank Gold – C Programming",
    description: "Earned Gold Level in C on HackerRank by solving algorithmic and problem-solving challenges (510+ points), strengthening core programming fundamentals.",
    icon: Terminal,
    date: "2026",
    featured: false,
    type: "certification_ranking"
  },
  {
    title: "3rd Position – 3MST Presentation, eHaCON 2025",
    description: "Secured 3rd position in 3MST Presentation at eHaCON 2025 (Cybersecurity Centre of Excellence, UEM Kolkata).",
    icon: Award,
    date: "2025",
    featured: false,
    type: "competition"
  },
  {
    title: "Social Winter of Code Contributor",
    description: "Active contributor in Social Winter of Code, collaborating on open-source projects and building real-world software solutions.",
    icon: Code2,
    date: "2025",
    featured: false,
    type: "community"
  },
  {
    title: "Hackolution Hackathon Participant",
    description: "Participated in Hackolution Hackathon, building innovative solutions under time constraints and collaborating with fellow developers.",
    icon: Code2,
    date: "2025",
    featured: false,
    type: "hackathon"
  },
  {
    title: "Ninja SlayGround Coding Challenge",
    description: "Competed in Ninja SlayGround Coding Challenge, demonstrating proficiency in algorithmic problem-solving and real-time coding skills.",
    icon: Trophy,
    date: "2025",
    featured: false,
    type: "competitive"
  }
];

export const FEATURED_CERTS = [
  {
    name: "Machine Learning with Python",
    issuer: "IBM",
    via: "Coursera",
    date: "Apr 2026",
    link: "https://www.coursera.org/account/accomplishments/records/739MGRD0GQJ9",
    accent: "#00e5cc",
    category: "AI & Machine Learning",
    logo: "IBM"
  },
  {
    name: "Deloitte Australia – Technology Job Simulation",
    issuer: "Deloitte",
    via: "Forage",
    date: "Oct 2025",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_ikDpKDeWiwp6Q3Rh7_1760675369646_completion_certificate.pdf",
    accent: "#3b82f6",
    category: "Professional Simulations",
    logo: "Deloitte"
  },
  {
    name: "Tata – GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    via: "Forage",
    date: "Oct 2025",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_ikDpKDeWiwp6Q3Rh7_1761460557423_completion_certificate.pdf",
    accent: "#f59e0b",
    category: "AI & Machine Learning",
    logo: "Tata"
  }
];

export const SUPPORTING_CERTS = [
  {
    name: "Introduction to Generative AI",
    issuer: "Google",
    date: "Feb 2024",
    link: "https://www.cloudskillsboost.google/public_profiles/45352703-3329-4440-9e0a-055d8f908b23/badges/8097686",
    category: "AI & Machine Learning",
    logo: "Google"
  },
  {
    name: "Introduction to Ethical Hacking and Computer Networking",
    issuer: "Udemy",
    date: "Jul 2024",
    link: "https://www.udemy.com/certificate/UC-6df18941-9972-4cba-a5eb-05bc7155994f/",
    category: "Cybersecurity",
    logo: "Udemy"
  },
  {
    name: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "Nov 2024",
    link: "https://www.coursera.org/account/accomplishments/records/3NK3QB3F88YZ",
    category: "Web Development",
    logo: "Meta"
  },
  {
    name: "Introduction to Back-End Development",
    issuer: "Meta",
    date: "Nov 2024",
    link: "https://www.coursera.org/account/accomplishments/records/F1G1V9KB0ZFU",
    category: "Web Development",
    logo: "Meta"
  },
  {
    name: "Programming Foundations: Fundamentals",
    issuer: "LinkedIn Learning",
    date: "May 2024",
    link: "https://www.linkedin.com/learning/certificates/3b0663b8191318ec22e61d435c840c5233d4aab9f743df589d5c9033baff4fad",
    category: "Web Development",
    logo: "LinkedIn"
  }
];


export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Globe },
  { id: 'about', label: 'About', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: Layout },
  { id: 'experience', label: 'Experience', icon: Database }
];
