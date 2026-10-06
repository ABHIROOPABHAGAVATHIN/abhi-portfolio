/**
 * Single source of truth for the portfolio. Every fact here comes from the resume.
 * Edit this file to update the site; components contain no personal content.
 */

export const personal = {
  name: "Abhiroopa Bhagavathi N",
  shortName: "Abhiroopa",
  initials: "AB",
  title: "Java Backend Developer",
  discipline: "Computer Science & Engineering",
  location: "Coimbatore, India",
  email: "abhiroopabhagavathi@gmail.com",
  headline: "Backend systems that stay fast under load and explain their decisions.",
  intro:
    "I build event-driven Java backends with Spring Boot, RabbitMQ and Redis, and wire LLMs into working tools with fallbacks that hold up when AI calls fail. Currently a Backend Developer Intern at Averqon, final-year B.E. CSE student at VSB College of Engineering Technical Campus.",
  status: "Backend Developer Intern at Averqon",
  resumeFile: "/resume/Abhiroopa_Bhagavathi_N_Resume.pdf",
  resumeDownloadName: "Abhiroopa_Bhagavathi_N_Resume.pdf",
};

export const social = {
  github: "https://github.com/ABHIROOPABHAGAVATHIN",
  githubUser: "ABHIROOPABHAGAVATHIN",
  linkedin: "https://www.linkedin.com/in/abhiroopa-bhagavathi",
};

export const about = {
  paragraphs: [
    "I'm a Java backend developer who likes the parts of a system users never see: message queues, rules engines, audit trails and the contracts between services.",
    "My projects focus on two things: decoupling slow work from request paths with event-driven design, and making automated decisions traceable, whether that's a credit rule firing or an LLM explaining an anomaly.",
    "At Averqon I'm part of an 11-member engineering team building a reusable, AI-assisted SaaS backend template, and I've implemented its payment integration flow.",
  ],
  facts: [
    { label: "Location", value: "Coimbatore, India" },
    { label: "Education", value: "B.E. CSE, 2023 – 2027" },
    { label: "CGPA", value: "8.6" },
    { label: "Current role", value: "Backend Developer Intern, Averqon" },
    { label: "Focus", value: "Event-driven backends & LLM integration" },
  ],
};

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Java", "Python", "C#", "JavaScript", "HTML/CSS"] },
  { label: "Backend", items: ["Spring Boot", "REST APIs", "Drools"] },
  { label: "Messaging & Caching", items: ["RabbitMQ", "Redis"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL"] },
  { label: "AI / LLM", items: ["Groq API", "Ollama", "LangChain (in progress)"] },
  { label: "Data Visualization", items: ["Power BI"] },
  { label: "Tools", items: ["Git", "GitHub", "IntelliJ IDEA", "VS Code"] },
  {
    label: "CS Fundamentals",
    items: ["OOP", "DBMS", "Computer Networks", "Data Structures"],
  },
];

export type ProjectVisual = "finvigil" | "logsage" | "dashboard";

export type Project = {
  slug: string;
  number: string;
  featured: boolean;
  name: string;
  subtitle: string;
  status?: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  features: string[];
  /** Short flow shown in the modal as the architecture. */
  architecture: string[];
  visual: ProjectVisual;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "finvigil-central",
    number: "01",
    featured: true,
    name: "FinVigil Central",
    subtitle: "Credit Underwriting & AML Surveillance Backend",
    status: "In progress",
    summary:
      "An event-driven backend that makes loan decisions asynchronously and watches transactions for AML structuring patterns in real time.",
    problem:
      "Credit decisioning is slow and rule-heavy; running it inside the API request couples response time to decision time, and the decisions themselves need to be auditable.",
    approach:
      "RabbitMQ decouples the API from async decisioning. A Drools rules engine evaluates DTI ratio, credit score and employment checks with traceable rule triggers. Redis sliding-window heuristics flag transaction structuring as it happens.",
    stack: ["Java", "Spring Boot", "Drools", "RabbitMQ", "Redis", "PostgreSQL"],
    features: [
      "Event-driven loan underwriting that decouples API response time from async credit decisioning",
      "Drools rules engine for auditable credit decisions (DTI ratio, credit score, employment checks) with traceable rule triggers",
      "Redis sliding-window heuristics to flag AML transaction structuring in real time",
      "PostgreSQL schema for applicants, loans, transactions and AML alerts with full audit trail support",
    ],
    architecture: [
      "API receives loan application",
      "RabbitMQ queues the decision event",
      "Drools evaluates credit rules",
      "PostgreSQL stores outcome + audit trail",
      "Redis sliding window screens transactions for AML structuring",
    ],
    visual: "finvigil",
  },
  {
    slug: "logsage-ai",
    number: "02",
    featured: true,
    name: "LogSage AI",
    subtitle: "Log File Anomaly Explainer",
    summary:
      "An AI-powered tool that detects anomalies in uploaded log files and explains them in plain language, with a rule-based fallback when AI calls fail.",
    problem:
      "Raw log files are hard to read under pressure, and a tool that depends entirely on an LLM is useless the moment the model call fails.",
    approach:
      "LLM-based analysis (Groq API, Ollama) produces plain-language explanations, backed by a rule-based fallback for reliability. A Streamlit dashboard handles upload, severity tracking and incident history.",
    stack: ["Python", "Streamlit", "Groq API", "Ollama", "SQLite", "Plotly", "ReportLab"],
    features: [
      "Detects anomalies and generates plain-language explanations from uploaded log files",
      "LLM analysis via Groq API and Ollama with a rule-based fallback when AI calls fail",
      "Interactive Streamlit dashboard for log upload, severity tracking and incident history",
      "PDF / CSV export and SQLite storage to maintain an analysis record",
    ],
    architecture: [
      "Upload log file",
      "Parse and detect anomalies",
      "Groq / Ollama explains; rule-based fallback if the call fails",
      "SQLite stores analysis history",
      "Plotly dashboard + PDF/CSV export",
    ],
    visual: "logsage",
  },
  {
    slug: "retail-sales-dashboard",
    number: "03",
    featured: false,
    name: "Online Retail Sales Dashboard",
    subtitle: "Business intelligence",
    summary:
      "A Power BI dashboard with data cleaning and DAX-based KPI calculations to surface sales insights.",
    problem: "Raw retail sales data needs cleaning and KPIs before it can inform decisions.",
    approach: "Cleaned the data and calculated KPIs with DAX in Power BI.",
    stack: ["Power BI", "DAX"],
    features: ["Data cleaning", "DAX-based KPI calculations", "Sales insight dashboard"],
    architecture: ["Raw sales data", "Data cleaning", "DAX KPI measures", "Power BI dashboard"],
    visual: "dashboard",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  stack: string[];
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Averqon",
    role: "Backend Developer Intern",
    period: "Ongoing",
    stack: ["Python"],
    points: [
      "Contributing to a reusable, AI-assisted SaaS backend template engineered for rapid client customization, from requirement intake to configured deployment, as part of an 11-member engineering team.",
      "Implemented payment integration functionality, handling transaction flow and third-party payment API interaction.",
    ],
  },
  {
    company: "Prodigy InfoTech",
    role: "Java Backend Developer Intern",
    period: "2024",
    location: "Virtual",
    stack: ["Java"],
    points: [
      "Implemented CRUD operations in Java with and without database connectivity, covering core backend data-handling and application-logic fundamentals.",
    ],
  },
];

export const education = [
  {
    school: "VSB College of Engineering Technical Campus",
    degree: "B.E. Computer Science and Engineering",
    period: "2023 – 2027",
    score: "CGPA 8.6",
  },
  {
    school: "Government High School, Coimbatore",
    degree: "HSC",
    period: "2022 – 2023",
    score: "85.5%",
  },
];

export const certifications = [
  { title: "Networking Basics", issuer: "Cisco" },
  { title: "Cyber Security Job Simulation", issuer: "Deloitte" },
];

export const achievements = [
  {
    title: "National Level Conference Participant",
    org: "VSB College of Engineering Technical Campus",
    detail:
      'Presented a paper on "ERP-Based Integrated Student Management System" at "Recent Trends in Renewable Energy and Environmental Sustainability" (ISBN: 978-81-993497-3-5).',
  },
];

export const whatIBuild = [
  {
    number: "01",
    title: "Event-driven backends",
    text: "Java and Spring Boot services that use RabbitMQ and Redis to keep request paths fast and process work asynchronously.",
  },
  {
    number: "02",
    title: "Auditable decision systems",
    text: "Rules engines (Drools) and PostgreSQL audit trails so every automated decision can be traced back to the rule that made it.",
  },
  {
    number: "03",
    title: "LLM-powered tools",
    text: "Groq API and Ollama integrations with rule-based fallbacks, so the tool keeps working when the AI call doesn't.",
  },
  {
    number: "04",
    title: "Data & dashboards",
    text: "Streamlit and Plotly interfaces and Power BI dashboards that turn raw data into something people can act on.",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
