export const portfolioData = {
  personal: {
    name: "Erland Faturrahman",
    title: "Associate Product Manager | Technical Product Management",
    location: "Jakarta, Indonesia",
    phone: "081804832307",
    email: "erlandinfo@gmail.com",
    linkedin: "https://www.linkedin.com/in/erland-faturrahman",
    github: "https://github.com/Erlandfatur",
    summary:
      "Results-driven Associate Product Manager with a solid foundation in Digital Multimedia Engineering and practical experience bridging business objectives with technical execution. Proven track record in defining product roadmaps, authoring structured PRDs/User Stories, and leading Agile cross-functional teams to deliver enterprise tools and SaaS applications. Skilled in product discovery, UX wireframing (Figma), data-driven prioritization, and cross-team stakeholder alignment to drive end-to-end product success.",
    stats: [
      { label: "GPA", value: "3.67 / 4.00" },
      { label: "Active Users Impacted", value: "50+ Enterprise" },
      { label: "Tickers Tracked", value: "700+ Stocks" },
      { label: "Certifications", value: "7 Professional" },
    ],
  },

  education: [
    {
      institution: "Politeknik Negeri Jakarta",
      period: "2021 - 2025",
      degree: "Bachelor of Applied Science (D4), Digital Multimedia Engineering",
      gpa: "3.67 / 4.00",
      description: "Graduated with honors focusing on multimedia systems, software product lifecycles, and interactive technology engineering.",
    },
  ],

  skillCategories: [
    {
      category: "Product Management",
      icon: "Layers",
      skills: [
        "Product Discovery",
        "Product Roadmap & Vision",
        "PRD & BRD Drafting",
        "User Stories & Acceptance Criteria",
        "Backlog Prioritization (MoSCoW / RICE)",
        "Go-to-Market (GTM) Strategy",
        "User Acceptance Testing (UAT)",
      ],
    },
    {
      category: "UI/UX & Product Design",
      icon: "Palette",
      skills: [
        "Wireframing & Prototyping (Figma)",
        "User Journey Mapping",
        "Usability Testing",
        "Information Architecture",
        "Design System Thinking",
      ],
    },
    {
      category: "Technical & Data Understanding",
      icon: "Code2",
      skills: [
        "Python",
        "SQL & Data Querying",
        "REST APIs & Integrations",
        "System Architecture Basics",
        "SDLC & Agile / Scrum Frameworks",
      ],
    },
    {
      category: "Tools & Collaboration",
      icon: "Wrench",
      skills: [
        "Jira",
        "Trello",
        "Notion",
        "Google Workspace",
        "Git / GitHub",
        "Slack",
        "Zoom",
      ],
    },
    {
      category: "Languages",
      icon: "Globe",
      skills: [
        "Indonesian (Native)",
        "English (Professional Proficiency)",
      ],
    },
  ],

  // Real Public Repositories & Featured Systems with GitHub.io & Deep-Dive Specs
  projects: [
    {
      id: "voidshare",
      title: "VoidShare",
      subtitle: "Zero-Knowledge P2P & Air-Gapped Data Transfer Protocol",
      role: "Technical Product Manager & System Architect",
      category: "tools",
      status: "Live on GitHub Pages",
      hasLivePreview: true,
      githubIoUrl: "https://erlandfatur.github.io/voidshare/",
      demoUrl: "https://erlandfatur.github.io/voidshare/",
      githubUrl: "https://github.com/Erlandfatur/voidshare",
      language: "JavaScript / WebRTC / PWA",
      problem: "Kebutuhan transfer data antar-perangkat sering kali terkendala dua hal: privasi data (file harus transit di server pihak ketiga seperti Cloud Storage/WhatsApp) dan restriksi jaringan (lingkungan air-gapped, fasilitas medis/manufaktur terisolasi, atau Wi-Fi korporat dengan firewall ketat).",
      solution: "VoidShare, aplikasi web berbasis client-side murni dengan dua modalitas transfer: Optical QR Streaming (mengubah payload data biner menjadi sekuens animasi QR code berkecepatan tinggi untuk transfer tanpa jaringan apa pun via kamera ke layar), dan WebRTC Direct Link (koneksi peer-to-peer terenkripsi device-to-device tanpa perantara server penyimpanan data / zero-knowledge storage).",
      targetAudience: "Pegawai korporat di jaringan tertutup, teknisi lapangan di area isolasi/remote, dan user yang memprioritaskan kerahasiaan data (privacy-conscious).",
      architecture: [
        "Offline Shell (PWA): Service Workers & Cache Storage API enabling full application lifecycle with 0 kbps internet connectivity.",
        "Air-Gap Optical Engine: Binary chunking protocol splitting files into indexed Base64 payloads rendered as cyclic 10-15 FPS QR video stream, decoded via Client Webcam Canvas.",
        "P2P Signaling & Stream: PeerJS & WebRTC RTCDataChannel mesh with STUN/TURN NAT traversal for direct device-to-device memory buffer transmission with zero backend database storage."
      ],
      boundedContexts: [
        {
          name: "Offline Shell (PWA)",
          role: "Application bootstrapping, asset caching & standalone offline client execution",
          tech: "Service Workers, Cache Storage API, Web App Manifest"
        },
        {
          name: "Air-Gap Optical Engine",
          role: "Binary file chunking, indexed framing, cyclic high-speed QR rendering & webcam frame scanning",
          tech: "qrcode.js, jsQR.js, HTML5 Canvas API, Base64/Uint8Array"
        },
        {
          name: "P2P Signaling & Stream",
          role: "SDP handshake, ICE candidate exchange, NAT traversal & binary RTCDataChannel streaming",
          tech: "WebRTC, PeerJS, Public STUN/TURN Network"
        }
      ],
      systemFlow: [
        { step: "01. Intake", detail: "User drops payload file into client memory. System computes file size, MIME type, and SHA-256 integrity checksum." },
        { step: "02. Routing Logic", detail: "If Air-Gapped / Isolated Network: Triggers Optical Engine. If Connected Devices: Initializes WebRTC Signaling via PeerJS." },
        { step: "03. Optical Stream", detail: "Chunks payload into [index/total]:payload packets. Drives dynamic Canvas cyclic QR animation at 10-15 FPS." },
        { step: "04. WebRTC Stream", detail: "Generates ephemeral peer ID link. Handshakes RTCDataChannel, streams binary ArrayBuffer directly between memory buffers." },
        { step: "05. Verification & Assembly", detail: "Receiver decodes chunks in real time, verifies against original checksum, and triggers browser automatic file download." }
      ],
      gwtaiSpecs: [
        {
          scenario: "Optical QR Stream Generation & Payload Constraint",
          given: "User is in Optical Mode (Air-Gap) and has selected a file payload ≤ 2 MB",
          when: "The user clicks 'Generate Stream'",
          then: "The system partitions the binary buffer into sequential indexed packets [index/total]:data",
          and: "Renders cyclic animated QR codes on Canvas at target 10–15 FPS for camera synchronization",
          ifCondition: "File size exceeds 2 MB, the system triggers a warning banner suggesting WebRTC Mode due to optical transmission latency limits."
        },
        {
          scenario: "WebRTC Mid-Transfer Data Channel Disruption",
          given: "An active P2P data transfer session is underway with transfer progress at 60%",
          when: "One peer loses network connectivity or the browser tab closes",
          then: "WebRTC triggers an ICEConnectionState transition to 'disconnected'",
          and: "The receiver initiates a 15-second grace period showing an 'Awaiting peer reconnection' toast before terminating the session buffer."
        }
      ],
      tradeoffs: [
        {
          title: "Serverless (GitHub Pages) vs. Dedicated Signaling Server",
          decision: "Client-side architecture using public STUN servers",
          impact: "Cut infrastructure cost to $0/month and guarantees zero data retention on servers. Accepted limitation: rare symmetric corporate NATs require TURN fallback."
        },
        {
          title: "Optical QR Frame Rate vs. Camera Shutter Synchronization",
          decision: "Capped cyclic animation between 10-15 FPS instead of 60 FPS",
          impact: "Prevents rolling shutter packet loss and frame skips on low-end smartphone cameras while maintaining ~50-100 kbps visual transmission throughput."
        }
      ],
      productMetrics: [
        { label: "Transfer Completion Rate", value: "> 98.5%", desc: "Valid SHA-256 file assembly without packet corruption" },
        { label: "Handshake Time-to-Connect", value: "< 2.4s", desc: "Mean duration from link generation to open RTCDataChannel" },
        { label: "Zero-Knowledge Guarantee", value: "0 Bytes", desc: "Zero persistent bytes stored on any intermediate server" }
      ],
      keyPoints: [
        "Authored structured PRD & BDD acceptance criteria (GWTAI) guiding client-side WebRTC and Canvas stream engines.",
        "Engineered dual-modality data transfer solving strict air-gapped isolated network boundaries with zero hardware cables.",
        "Eliminated server infrastructure costs ($0 OpEx) and privacy liabilities through zero-retention peer-to-peer protocols.",
        "Optimized optical QR frame-rates (10-15 FPS) balancing transmission speed against smartphone camera shutter latency."
      ],
      techStack: ["JavaScript", "WebRTC (PeerJS)", "Optical QR Engine", "PWA Service Worker", "Canvas API", "GitHub Pages"],
    },
    {
      id: "e-procurement",
      title: "Esco E-Procurement System",
      subtitle: "Enterprise Procure-to-Pay (P2P) Platform",
      role: "Associate Product Specialist",
      category: "enterprise",
      status: "Live on GitHub Pages",
      hasLivePreview: true,
      githubIoUrl: "https://erlandfatur.github.io/e-procurement-system/",
      demoUrl: "https://erlandfatur.github.io/e-procurement-system/",
      githubUrl: "https://github.com/Erlandfatur/e-procurement-system",
      language: "JavaScript / Next.js",
      problem: "Manual email-based purchase requisitions caused financial discrepancies, duplicate invoice approvals, and multi-week procurement delays across regional offices.",
      solution: "Built a centralized Procure-to-Pay (P2P) digital portal with dynamic approval matrices, real-time budget lock concurrency, and automated PO generation.",
      architecture: [
        "Role-Based Access Control (RBAC) separating Requester, Dept Head, Finance, and Procurement leads.",
        "Optimistic locking and atomic transactions to prevent double-spending from department expense pools.",
        "Modular microservices with full audit logging and SLA tracking."
      ],
      keyPoints: [
        "Structured end-to-end PRDs, multi-tier approval workflows, and roadmap priorities (P0/P1) across NestJS/Next.js.",
        "Formulated strict specifications for server-side calculations, budget reservation concurrency controls, and RBAC authorization.",
        "Eliminated manual approval bottlenecks and financial discrepancies for cross-regional business operations.",
      ],
      techStack: ["Next.js", "JavaScript", "RBAC", "PRD/BRD", "Kaizen Workflow", "GitHub Pages"],
    },
    {
      id: "speech-translator",
      title: "Speech Translator Enterprise",
      subtitle: "Real-Time Audio Ingestion & Multilingual Streaming Translation",
      role: "System Architect & Developer",
      category: "ai",
      status: "Live on GitHub Pages",
      hasLivePreview: true,
      githubIoUrl: "https://erlandfatur.github.io/Speech-Translator-enterprise/",
      demoUrl: "https://erlandfatur.github.io/Speech-Translator-enterprise/",
      githubUrl: "https://github.com/Erlandfatur/Speech-Translator-enterprise",
      language: "Python / JS",
      problem: "Cross-border global meetings suffer from 2-3 second latency lag when using legacy translation tools, disrupting natural conversation flow.",
      solution: "Engineered a low-latency audio buffer and streaming inference pipeline delivering sub-500ms real-time audio transcription and translation.",
      architecture: [
        "WebSocket audio chunk streaming directly from browser microphone to inference service.",
        "Sliding-window context buffer maintaining sentence coherence while translating incrementally.",
        "Multi-language selector supporting instant English, Indonesian, Japanese, and Mandarin."
      ],
      keyPoints: [
        "Integrated real-time speech recognition models with low-latency streaming audio buffers.",
        "Designed clean pipeline architecture handling multi-speaker transcription and domain-specific vocabulary.",
        "Built modular web interface on GitHub Pages with instant audio wave visualization.",
      ],
      techStack: ["Python", "Speech AI", "Streaming Audio", "WebSockets", "GitHub Pages"],
    },
    {
      id: "nusantara-trading",
      title: "Nusantara Trading Terminal",
      subtitle: "Algorithmic Market Analytics SaaS",
      role: "Product Manager & System Architect",
      category: "enterprise",
      status: "Live SaaS Production",
      hasLivePreview: true,
      githubIoUrl: "https://nusantara-trading-terminal.streamlit.app/",
      demoUrl: "https://nusantara-trading-terminal.streamlit.app/",
      githubUrl: "https://github.com/Erlandfatur",
      language: "Python / Streamlit",
      problem: "Retail stock traders in Indonesia lack accessible institutional-grade market anomaly scanners and whale volume accumulation trackers.",
      solution: "Launched a full-featured SaaS web terminal scanning 700+ IDX tickers in real-time with proprietary volume flow algorithms and Mayar.id subscriptions.",
      architecture: [
        "Automated IDX data ingestion pipeline updating order book indicators across 700+ tickers.",
        "Whale Radar indicator algorithm detecting atypical block transactions and institutional accumulation.",
        "Mayar.id webhook payment gateway managing automated tier activations and VIP discord alerts."
      ],
      keyPoints: [
        "Defined product roadmap and subscription pricing models for high-frequency market analytics.",
        "Designed interactive Streamlit/Plotly dashboards and integrated Mayar.id payment gateways.",
        "Translated technical market indicators and order book anomalies into actionable user insights.",
      ],
      techStack: ["Python", "Streamlit", "Plotly", "Mayar.id", "Market Analytics", "PRD Drafting"],
    },
    {
      id: "upwork-agent",
      title: "Upwork Autonomous Freelance Agent",
      subtitle: "AI Lead Discovery & Bidding Automation Pipeline",
      role: "Lead Developer & System Designer",
      category: "ai",
      status: "AI Automation",
      hasLivePreview: false,
      githubIoUrl: null,
      demoUrl: "https://github.com/Erlandfatur/upwork-freelance-agent",
      githubUrl: "https://github.com/Erlandfatur/upwork-freelance-agent",
      language: "Python",
      problem: "Freelancers waste 10+ hours a week manually searching through noisy job boards with low conversion rates.",
      solution: "Engineered an autonomous AI agent that filters job feeds by client budget, reputation, and tech stack, then generates high-conversion customized proposals.",
      architecture: [
        "Headless RSS and API crawler fetching new postings within 60 seconds of publication.",
        "LLM scoring system calculating match percentage against Erland's verified skills.",
        "Automated markdown proposal generation with tailored portfolio evidence injection."
      ],
      keyPoints: [
        "Engineered automated scraping and filtering pipeline prioritizing high-ticket client job posts.",
        "Integrated LLM reasoning to evaluate client budget, project scope, and generate structured bid drafts.",
        "Built telemetry dashboard monitoring proposal conversion metrics and client response rates.",
      ],
      techStack: ["Python", "AI Agent", "LLM Reasoning", "Automation", "Workflow Pipeline"],
    },
    {
      id: "tele-badmin",
      title: "Tele-Badmin (Telegram Split-Bill Bot)",
      subtitle: "Automated Group Cash Management & Ledger Bot",
      role: "Product Creator & Developer",
      category: "tools",
      status: "Live Bot",
      hasLivePreview: false,
      githubIoUrl: null,
      demoUrl: "https://github.com/Erlandfatur/Tele-Badmin",
      githubUrl: "https://github.com/Erlandfatur/Tele-Badmin",
      language: "Python",
      problem: "Sports community organizers struggle with tracking variable court fees, shuttlecock expenses, and multi-payer split bills.",
      solution: "Built a specialized Telegram bot that automatically balances community ledgers, computes optimal settlement paths, and tracks payment statuses.",
      architecture: [
        "Finite State Machine (FSM) conversational flow for easy bill entry in group chats.",
        "Graph-based debt simplification algorithm reducing 10+ circular debts to 2-3 minimal transactions.",
        "SQLite persistent storage with transaction history export."
      ],
      keyPoints: [
        "Designed conversational UX state machine allowing effortless multi-user expense entry and debt settlement.",
        "Implemented transparent ledger calculation logic resolving circular group debts automatically.",
        "Adopted by active sports communities to eliminate manual payment tracking errors.",
      ],
      techStack: ["Python", "Telegram Bot API", "State Machine", "Ledger Accounting", "SQLite"],
    },
    {
      id: "gamejam-alaric",
      title: "GameJam Alaric & VR Interactive Systems",
      subtitle: "Interactive 3D Engine & Virtual Reality Development",
      role: "Game Developer & Tech Specialist",
      category: "games",
      status: "3D / Game Tech",
      hasLivePreview: false,
      githubIoUrl: null,
      demoUrl: "https://github.com/Erlandfatur/GameJamAlaric",
      githubUrl: "https://github.com/Erlandfatur/GameJamAlaric",
      language: "C# / Unity",
      problem: "Crafting immersive interactive game mechanics within tight 48-hour game jam constraints requires rapid prototyping and clean architectural decoupling.",
      solution: "Designed modular physics controllers, procedural shaders, and state-driven game loops in Unity C#.",
      architecture: [
        "Decoupled ScriptableObject architecture for state management and event dispatching.",
        "Custom HLSL shaders for dynamic lighting and stylized environmental effects.",
        "Optimized draw calls and physics tick rate for rock-solid 60 FPS VR rendering."
      ],
      keyPoints: [
        "Authored Game Design Documents (GDD) and technical feature specifications.",
        "Implemented real-time character physics, procedural animation states, and shader effects.",
        "Certified Unity Associate with strong grounding in 3D pipelines and spatial UX.",
      ],
      techStack: ["C#", "Unity 3D", "Game Physics", "ShaderLab", "GDD Drafting"],
    },
  ],

  experience: [
    {
      id: "esco",
      company: "PT ESCO LIFESCIENCES",
      location: "Bintan, Indonesia",
      role: "Virtual Specialist / Associate Product Specialist",
      period: "June 2025 – Present",
      type: "Full-time",
      badge: "Current Role",
      highlights: [
        {
          title: "Kaizen Digitalization & Product Roadmap (Esco E-Procurement System)",
          desc: "Spearheaded the continuous improvement (Kaizen) initiative to digitize manual procurement into an automated Procure-to-Pay (P2P) platform; structured end-to-end PRDs, multi-tier approval workflows, and roadmap priorities (P0/P1) across NestJS/Next.js architecture.",
        },
        {
          title: "Data Integrity & Business Logic Governance",
          desc: "Formulated strict PRD specifications for server-side calculations, budget reservation concurrency controls, and RBAC authorization to prevent budget over-commitments and financial data manipulation.",
        },
        {
          title: "Product Discovery & Backlog Management",
          desc: "Spearheaded user research and requirement gathering across operations, QA, and engineering teams, translating complex workflow bottlenecks into structured PRDs, user stories, and prioritized sprint backlogs.",
        },
        {
          title: "Feature Iteration & Process Optimization (Shipping Calculator V2)",
          desc: "Owned the end-to-end product iteration for the internal logistics tool, designing intuitive user flows and wireframes that eliminated manual calculation errors for 50+ active enterprise users.",
        },
        {
          title: "MVP Delivery & Stakeholder Alignment",
          desc: "Drove the product lifecycle and MVP delivery for complex industrial simulation software, managing agile milestones, scoping features, and aligning stakeholders to achieve 100% on-time deployment.",
        },
        {
          title: "UX Research & Usability",
          desc: "Conducted usability testing and user journey analysis for CRM dashboards and localized assessment modules, driving feature adoption and ensuring seamless cross-regional user experience.",
        },
      ],
    },
    {
      id: "onkolab",
      company: "PT GLOBAL ONKOLAB FARMA",
      location: "Jakarta, Indonesia",
      role: "Unity Developer (Technical Product Specialist Intern)",
      period: "September 2024 – December 2024",
      type: "Internship",
      badge: "Completed",
      highlights: [
        {
          title: "Requirement Mapping & PRD",
          desc: "Partnered with Subject Matter Experts (SMEs) to translate pharmaceutical Standard Operating Procedures (SOPs) into clear Product Requirement Documents (PRDs) and user acceptance criteria. Created and maintained the Game Design Document and feature specifications to ensure a clear development process.",
        },
        {
          title: "Agile Sprint Facilitation",
          desc: "Facilitated sprint planning, daily stand-ups, and user feedback iteration cycles, prioritizing bug triage and feature enhancements for seamless User Acceptance Testing (UAT).",
        },
      ],
    },
  ],

  leadership: [
    {
      organization: "Poros FM",
      location: "Depok, Indonesia",
      role: "Head of IT Division",
      period: "February 2023 – February 2024",
      highlights: [
        "Led the IT division supporting campus radio operations and digital audio streaming content.",
        "Prepared annual work plans, delegated tasks to team members, and ensured developer sprints ran on schedule.",
      ],
    },
    {
      organization: "Himpunan Mahasiswa Teknik Informatika dan Komputer",
      location: "Depok, Indonesia",
      role: "Staff / Member",
      period: "February 2022 – February 2023",
      highlights: [
        "Supported strategic initiatives related to technology education and community mentoring for students.",
        "Helped organize technical workshops and created accessible digital learning materials.",
      ],
    },
  ],

  certifications: [
    {
      name: "Product Management",
      issuer: "Great Learning",
      icon: "Award",
      badge: "PM Core",
    },
    {
      name: "Project Management",
      issuer: "Google Certification",
      icon: "CheckCircle2",
      badge: "Google Certified",
    },
    {
      name: "Product Lifecycle Management",
      issuer: "Great Learning",
      icon: "Layers",
      badge: "Lifecycle",
    },
    {
      name: "Agile Scrum Foundation",
      issuer: "Simplilearn",
      icon: "Zap",
      badge: "Agile/Scrum",
    },
    {
      name: "Advanced Multimedia Designer",
      issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
      icon: "Palette",
      badge: "National Standard",
    },
    {
      name: "Independent Study Program Batch 5 – Game Development",
      issuer: "MSIB Kampus Merdeka",
      icon: "Gamepad2",
      badge: "MSIB",
    },
    {
      name: "Unity Certified Associate – Game Developer",
      issuer: "Unity",
      icon: "Cpu",
      badge: "Unity Official",
    },
  ],
};
