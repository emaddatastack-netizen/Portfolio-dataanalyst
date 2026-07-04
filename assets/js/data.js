
/* ============================================================
   DATA.JS
   ------------------------------------------------------------
   All repeatable page content lives here as plain JS objects.
   The page (script.js) reads these arrays and renders the
   Skills and Projects cards dynamically — nothing about the
   card markup is hardcoded in index.html.

   TO ADD A NEW PROJECT:
     Copy one object inside the `projects` array below, paste it
     as a new entry, and edit the fields. That's the only change
     needed — a 5th card will appear automatically.

   TO ADD OR UPDATE A SKILL:
     Same idea, inside the `skills` array. Icons are inline SVG
     strings (see the ICONS block) so everything stays
     dependency-free — no icon fonts, no CDNs.
   ============================================================ */


/* ------------------------------------------------------------
   ICONS
   Hand-coded inline SVGs, kept as strings and reused wherever
   needed. Add a new one here if a future skill/project needs
   an icon that doesn't exist yet.
------------------------------------------------------------ */
const ICONS = {
  powerbi: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6"  y="22" width="8" height="20" rx="1.5" fill="currentColor" opacity="0.55"/>
    <rect x="20" y="10" width="8" height="32" rx="1.5" fill="currentColor"/>
    <rect x="34" y="16" width="8" height="26" rx="1.5" fill="currentColor" opacity="0.8"/>
  </svg>`,

  excel: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" stroke-width="2.5"/>
    <line x1="6"  y1="18" x2="42" y2="18" stroke="currentColor" stroke-width="2"/>
    <line x1="6"  y1="30" x2="42" y2="30" stroke="currentColor" stroke-width="2"/>
    <line x1="18" y1="6"  x2="18" y2="42" stroke="currentColor" stroke-width="2"/>
    <line x1="30" y1="6"  x2="30" y2="42" stroke="currentColor" stroke-width="2"/>
  </svg>`,

  python: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 6c-8 0-7.5 3.5-7.5 3.5v4h8v1.5H10s-4.5-.5-4.5 9 4 9 4 9h3v-5.5s-.2-4 4-4h8s4-.1 4-4V10s.5-4-4.5-4Zm-4.5 4a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z" fill="currentColor" opacity="0.85"/>
    <path d="M24 42c8 0 7.5-3.5 7.5-3.5v-4h-8v-1.5H38s4.5.5 4.5-9-4-9-4-9h-3v5.5s.2 4-4 4h-8s-4 .1-4 4v9.5s-.5 4 4.5 4Zm4.5-4a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z" fill="currentColor"/>
  </svg>`,

  fabric: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 5 42 15v18L24 43 6 33V15Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24 5v19M24 24 6 15M24 24l18-9M24 24v19" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  </svg>`,

  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.44-2.28 1.18-3.09-.12-.3-.51-1.5.11-3.12 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.62.24 2.82.12 3.12.74.81 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>
  </svg>`,

  externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke-linejoin="round"/>
    <path d="m4 7 8 6 8-6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.1V21h-4v-5.7c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8H9Z"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
    <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};


/* ------------------------------------------------------------
   SKILLS
   Rendered by renderSkills() in script.js
------------------------------------------------------------ */
const skills = [
  {
    id: "powerbi",
    name: "Power BI",
    icon: ICONS.powerbi,
    description: "End-to-end report development, from data modeling to production-grade performance tuning.",
    bullets: [
      "Data Modeling",
      "DAX",
      "Performance Optimization",
      "DAX Studio",
      "Performance Analyzer",
    ],
  },
  {
    id: "excel",
    name: "Excel",
    icon: ICONS.excel,
    description: "Heavy-duty spreadsheet work for ad-hoc analysis and data prep before it reaches a model.",
    bullets: [
      "Power Query",
      "Pivot Tables",
      "Advanced Formulas",
      "Data Analysis",
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: ICONS.python,
    description: "Scripting for cleanup, automation, and reporting tasks that spreadsheets can't scale to.",
    bullets: [
      "Data Cleaning",
      "Pandas",
      "Automation",
      "Reporting",
    ],
  },
  {
    id: "fabric",
    name: "Microsoft Fabric",
    icon: ICONS.fabric,
    description: "Tenant-level administration and governance across workspaces, capacity, and security.",
    bullets: [
      "Dataflow Gen2",
      "Workspace Administration",
      "Security",
      "Capacity Management",
      "Tenant Administration",
    ],
  },
];


/* ------------------------------------------------------------
   PROJECTS
   Rendered by renderProjects() in script.js
   githubUrl / demoUrl: replace "#" placeholders with real links.
   Leave demoUrl as "" to show a disabled "Coming soon" button.
------------------------------------------------------------ */
const projects = [
  {
    id: "shipping-perf",
    title: "Shipping & Logistics Power BI Performance Optimization",
    description:
      "Rebuilt the data model and DAX layer behind a 1.68M-row fact table used for shipping operations reporting — replacing slow row-context patterns with pre-computed columns and boolean flags to cut report load times.",
    tags: ["Power BI", "DAX", "DAX Studio", "Data Modeling"],
    githubUrl: "#",
    demoUrl: "",
  },
  {
    id: "hr-insights",
    title: "HR Insights Analytics Dashboard",
    description:
      "Leave and headcount analytics for HR stakeholders, including benefit-utilization measures such as average benefited days per employee, validated directly with the HR team.",
    tags: ["Power BI", "DAX", "HR Analytics"],
    githubUrl: "#",
    demoUrl: "",
  },
  {
    id: "finance-etl",
    title: "Finance Reporting & ETL Diagnostics",
    description:
      "Root-caused a recurring refresh failure on a finance reporting dataset back to a long-running ETL procedure straining the source database, then restructured the query pattern to restore reliable refreshes.",
    tags: ["SQL", "Azure Data Factory", "ETL", "Power BI"],
    githubUrl: "#",
    demoUrl: "",
  },
  {
    id: "medcore-healthcare",
    title: "Healthcare BI Case Study — MedCore Health Network",
    description:
      "A portfolio-grade, end-to-end BI case study built from scratch: star/snowflake schema design, advanced DAX, row-level security, calculation groups, field parameters, and a six-page executive dashboard.",
    tags: ["Power BI", "RLS", "Calculation Groups", "Field Parameters"],
    githubUrl: "#",
    demoUrl: "",
  },
];


/* ------------------------------------------------------------
   CONTACT
   Rendered by renderContact() in script.js
------------------------------------------------------------ */
const contact = [
  { id: "email",    label: "Email",    value: "emad@example.com",        href: "mailto:emad@example.com",            icon: ICONS.mail },
  { id: "phone",    label: "Phone",    value: "+971 00 000 0000",        href: "tel:+97100000000",                   icon: ICONS.phone },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/emad",    href: "https://linkedin.com/in/emad",       icon: ICONS.linkedin },
  { id: "github",   label: "GitHub",   value: "github.com/emad",         href: "https://github.com/emad",            icon: ICONS.github },
];
