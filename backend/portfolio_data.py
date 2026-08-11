"""
portfolio_data.py — Single source of truth for all portfolio content.

This module is used by:
  - portfolio_module.py (Python console)
  - main.py (API routes if needed)

Do NOT add server paths, env vars, credentials, or internal info here.
"""

PROJECTS = [
    {
        "id": "qr-platform",
        "idx": "01",
        "name": "Grampanchayat QR / Gharpati Platform",
        "tagline": "QR-based property/payment platform deployed across multiple grampanchayats.",
        "role": "Development · Deployment · QA · Coordination",
        "tech": ["Python", "Flask/Backend", "UPI QR", "cPanel/WHM", "SSL"],
        "overview": (
            "An interactive QR and 'gharpati' (property-holder) platform used by multiple "
            "grampanchayats to manage property records and UPI-based payments, generate QR "
            "codes, and track collections."
        ),
        "purpose": (
            "Give each grampanchayat a self-hosted, low-maintenance way to issue UPI QR codes "
            "for property dues, track who has paid, and export records for accounting."
        ),
        "my_role": [
            "Built and extended core dashboard features (filtering, sorting, statistics)",
            "Handled multi-instance production deployment for several grampanchayats",
            "Coordinated directly with senior engineers on production-readiness changes",
        ],
        "developed": [
            "Payment filtering and sorting by amount remaining, paid/unpaid, approved/unapproved status",
            "Statistics page with CSV export across configurable month ranges",
            "Transaction-note feature embedding house number into UPI QR transaction notes",
            "UPI QR codes showing grampanchayat name, owner name, and house number on both preview and download",
            "Year support for records",
            "'Dakhla' (receipt/record) functionality",
            "Dashboard UI improvements and performance fixes for pages with thousands of records",
            "Fixed a duplicate-entry bug (triple entries) for a user record in Dapoli",
        ],
        "tested": [
            "Verified multiple grampanchayat QR sites running correctly across different ports in cPanel",
            "Checked and approved QR codes for Dapoli, Ghivali, Gholwad, and Gandhare",
            "Validated dashboard performance under large record counts",
        ],
        "deployed": [
            "Set up domains and subdomains and made sites live (e.g. gharpati platform on smartechsolutionsdg.net, Gandhare and Gholwad domains, saagmo.com subdomains)",
            "Configured SSL certificates for QR code websites",
            "Diagnosed and worked on server load issues",
            "Documented the WHM setup process for onboarding new grampanchayats",
        ],
        "challenges": [
            "Keeping dashboards responsive once individual grampanchayats accumulated thousands of payment records",
            "Running many independent grampanchayat instances reliably on shared hosting infrastructure",
            "Coordinating production-readiness changes with a senior engineer under a live deployment",
        ],
        "contributions": (
            "Owned the feature work end-to-end for several dashboard and QR-generation improvements, "
            "while also handling the operational side — deployment, SSL, and cross-instance testing — "
            "that most 'feature dev' roles don't touch."
        ),
        "outcome": (
            "Multiple grampanchayat instances (including Dapoli, Ghivali, Gholwad, Gandhare, and "
            "Mamachagav) are live in production on individual domains, with documentation in place "
            "for onboarding future grampanchayats."
        ),
        "timeline_tag": "QR Platform",
    },
    {
        "id": "smart-card",
        "idx": "02",
        "name": "Digital Smart Card / Business Card Platform",
        "tagline": "A platform for creating and managing downloadable digital business cards.",
        "role": "Development · Deployment",
        "tech": ["Auth/Sessions", "PDF Generation", "Responsive CSS"],
        "overview": (
            "A platform where users register, build a business profile, manage services, and "
            "generate a downloadable digital business card."
        ),
        "purpose": (
            "Let a business owner create a profile once and produce a shareable, professional "
            "digital business card without design tools."
        ),
        "my_role": [
            "Built the core platform from user registration through PDF card generation",
            "Deployed the finished product live to a dedicated subdomain",
        ],
        "developed": [
            "User registration, login, and user profile",
            "Business profile creation and editing",
            "Profile photo upload and edit flow",
            "Business deletion functionality",
            "Services management — add/edit services shown on the business info page",
            "Dashboard and a redesigned home page UI",
            "Password-visibility toggle on login/forms",
            "Admin / logged-in-user verification before allowing business-detail edits",
            "Responsive fixes for mobile sizing issues",
            "PDF business-card generation (replacing an earlier image-download option)",
        ],
        "tested": [
            "Verified authentication/authorization checks so only the owning user or admin could edit a business",
            "Checked mobile responsiveness across sizing issues",
        ],
        "deployed": [
            "Took the platform live at smartcard.smartechsolutionsdg.net",
        ],
        "challenges": [
            "Getting profile/photo editing and PDF generation working reliably across devices",
            "Restricting edit access correctly between regular users and admins",
        ],
        "contributions": (
            "Primary developer on this project — built nearly every user-facing flow, from account "
            "creation to the final PDF export, and shipped it to production."
        ),
        "outcome": (
            "Live, production platform at smartcard.smartechsolutionsdg.net supporting registration, "
            "business profiles, services, and PDF business-card downloads."
        ),
        "timeline_tag": "Smart Card",
    },
    {
        "id": "e-auction",
        "idx": "03",
        "name": "E-Auction Portal",
        "tagline": "QA, requirements, and technical coordination on a client e-auction system.",
        "role": "QA · Requirements · Technical Coordination · Deployment",
        "tech": ["Manual QA", "Process Documentation", "AI Chatbot Integration"],
        "overview": (
            "An e-auction portal built for a client. I did not develop the core system — my "
            "contribution was on the requirements, QA, coordination, and related AI-chatbot "
            "deployment side."
        ),
        "purpose": (
            "Support a client-facing e-auction workflow, with my role focused on making sure the "
            "workflow was correctly understood, documented, and tested before and after each round "
            "of changes."
        ),
        "my_role": [
            "Attended requirement and review meetings with senior engineers",
            "Documented the auction workflow for the team",
            "Tested the portal, found and reported problems",
            "Coordinated fixes and communicated with the client/project stakeholders",
            "Deployed and hosted an AI chatbot related to the project on a new server",
        ],
        "developed": [
            "Workflow documentation (PPT) describing how the e-auction process should work",
        ],
        "tested": [
            "Inspected the e-auction portal, identified functional problems, and reported them to the senior engineer",
            "Verified functionality updates after fixes were made",
        ],
        "deployed": [
            "Hosted the project's AI chatbot on a new server and coordinated with the digital marketer",
        ],
        "challenges": [
            "Understanding an in-progress workflow well enough to document and test it accurately",
            "Communicating findings clearly between the client side and the development team",
        ],
        "contributions": (
            "Acted as the bridge between the client's requirements and the development team — "
            "reviewing the workflow, documenting it, breaking the system to find bugs, and making "
            "sure issues actually got fixed."
        ),
        "outcome": (
            "Delivered workflow documentation and a tested feedback loop for the portal, plus a "
            "deployed AI chatbot and supporting promotional content for the project."
        ),
        "timeline_tag": "E-Auction",
    },
    {
        "id": "ai-chatbot",
        "idx": "04",
        "name": "AI Chatbot",
        "tagline": "Training, tuning, and deployment of an AI chatbot used across two projects.",
        "role": "Data Collection · Integration · Deployment",
        "tech": ["AI/Chatbot Platform", "Server Deployment"],
        "overview": (
            "An AI chatbot integrated into both the e-auction project and the main SmarTech "
            "Solutions website, refined through iterative training-data work."
        ),
        "purpose": (
            "Provide an automated first line of client-facing responses for SmarTech Solutions "
            "and the e-auction portal."
        ),
        "my_role": [
            "Collected and tested training data with a colleague",
            "Updated conversation flow and functionality",
            "Deployed the chatbot to production servers",
        ],
        "developed": [
            "Conversation flow updates and functionality updates based on testing feedback",
            "AI chat integration on the smartechsolutions.in website",
        ],
        "tested": [
            "Collected and tested chatbot training data with Gaurav Bhaiya",
        ],
        "deployed": [
            "Hosted the chatbot on a new server for the e-auction project",
            "Got AI chat working live on smartechsolutions.in",
        ],
        "challenges": [
            "Improving response quality through iterative training-data collection and testing",
            "Keeping the chatbot's flow consistent across two different projects",
        ],
        "contributions": (
            "Handled the practical, iterative work of getting a chatbot from 'trained' to "
            "'actually working in production' — data collection, flow fixes, and deployment."
        ),
        "outcome": (
            "A working AI chatbot live on the SmarTech Solutions website and hosted separately "
            "for the e-auction project."
        ),
        "timeline_tag": "AI Chatbot",
    },
    {
        "id": "smartech-website",
        "idx": "05",
        "name": "SmarTech Solutions Website",
        "tagline": "The company's main marketing site — AI feature, forms, and client section.",
        "role": "Development · Maintenance",
        "tech": ["Frontend", "Forms", "AI Integration"],
        "overview": "The primary marketing and lead-generation website for SmarTech Solutions.",
        "purpose": (
            "Give SmarTech Solutions a live web presence with lead capture (enquiry/order forms) "
            "and an AI-assisted chat feature."
        ),
        "my_role": [
            "Added new features and forms to the live site",
            "Handled ongoing maintenance",
        ],
        "developed": [
            "AI feature / chat integration",
            "Enquiry form",
            "Order form",
            "Clients section",
            "AI-generated promotional content and video for the site",
        ],
        "tested": [
            "Checked form submissions and site functionality during updates",
        ],
        "deployed": [
            "Maintained the live site at smartechsolutions.in",
        ],
        "challenges": [
            "Integrating AI chat cleanly into an existing marketing site without disrupting other flows",
        ],
        "contributions": "Added and maintained the site's core lead-generation and AI features.",
        "outcome": (
            "A live company site with working enquiry/order forms, a clients section, and an AI "
            "chat feature."
        ),
        "timeline_tag": "SmarTech Website",
    },
    {
        "id": "training-institute",
        "idx": "06",
        "name": "SmarTech Training Institute Website",
        "tagline": "A separate site for SmarTech's training institute, converted to static and handed off for marketing.",
        "role": "Development · Maintenance · Marketing Coordination",
        "tech": ["Static Frontend", "Maps", "Social Integration"],
        "overview": (
            "A dedicated website for SmarTech's training institute, kept intentionally separate "
            "from the main SmarTech Solutions site."
        ),
        "purpose": (
            "Give the training institute its own simple, low-maintenance web presence listing "
            "courses and contact/location details."
        ),
        "my_role": [
            "Built and maintained course and content sections",
            "Converted the site to a fully static frontend",
            "Coordinated the social media handoff to the digital-marketing team",
        ],
        "developed": [
            "Course information listings",
            "Location/map integration",
            "Social media links section",
            "Removed the backend entirely and rebuilt the site as a fully static frontend",
        ],
        "tested": [
            "Checked posted content on Instagram and Facebook after handoff to confirm publishing",
        ],
        "deployed": [
            "Maintained the static site in production",
            "Set up Twitter and YouTube accounts for the institute and handed off login access to the marketing team",
        ],
        "challenges": [
            "Migrating a backend-driven site to static without losing content",
            "Coordinating a clean handoff of new social accounts to a non-technical marketing owner",
        ],
        "contributions": (
            "Simplified the site's architecture for easier long-term maintenance and set up the "
            "institute's initial social presence before handing ongoing marketing off to the "
            "digital-marketing team."
        ),
        "outcome": (
            "A live, low-maintenance static site for the training institute with active social "
            "accounts managed by the marketing team."
        ),
        "timeline_tag": "Training Institute",
    },
]

SKILL_GROUPS = [
    {"name": "Development", "items": ["Python", "Flask/Backend basics", "HTML", "CSS", "JavaScript"]},
    {"name": "Backend", "items": ["Authentication & Authorization", "CRUD flows", "Session/user management"]},
    {"name": "Deployment", "items": ["Linux (cPanel/WHM)", "Domains & Subdomains", "SSL Certificates", "Multi-instance Hosting"]},
    {"name": "AI", "items": ["Chatbot Training Data", "Chatbot Flow Design", "AI Content/Video Generation"]},
    {"name": "Professional", "items": ["QA / Testing", "Requirements Gathering", "Client Communication", "Technical Documentation", "Project Coordination"]},
]

EXPERIENCE = {
    "company": "SmarTech Solutions",
    "role": "Web Developer Intern",
    "period": "May 2026 – Present",
    "areas": [
        "Development — Web applications, dashboards, forms, and frontend/backend features",
        "QA & Testing — Application testing, bug identification and reporting",
        "Deployment & Infrastructure — Domain setup, SSL, cPanel/WHM, production deployment",
        "Requirements & Client Communication — Requirement-gathering, workflow documentation",
        "Technical Coordination — Bridging requirements between clients and development team",
        "AI & Digital Operations — AI chatbot training, flow updates, promotional video production",
    ],
}

ABOUT = [
    "B.Sc. IT student working professionally as a web developer at SmarTech Solutions.",
    "",
    "Most of what I do isn't classroom work — it's building and modifying applications",
    "that are already live, testing systems before they reach production, and sitting in",
    "on requirement calls where the spec is still being figured out.",
    "",
    "Day to day that means writing features for a QR-based payment platform used by",
    "multiple grampanchayats, building a business-card platform from registration",
    "through PDF export, and handling the less glamorous side of shipping software:",
    "domains, SSL, cPanel/WHM, and debugging why a dashboard lags at ten thousand records.",
    "",
    "I'd rather learn against a real deployment than a tutorial.",
]

CONTACT = {
    "email": "dipanshu0919@gmail.com",
    "github": "github.com/dipanshu0919",
    "linkedin": "linkedin.com/in/dipanshu-ashok-agarwal-3a3309370",
    "instagram": "instagram.com/dipanshu0919",
    "whatsapp": "+91 8554048836",
}
