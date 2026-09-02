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
      problem: "Cross-device data transfers in air-gapped high-security environments (banking, SCADA/manufacturing, military facilities) are crippled by two barriers: third-party data transit vulnerabilities (cloud drives, Slack, WhatsApp) and zero-connectivity network isolation (no internet, Bluetooth, or local Wi-Fi pairing allowed).",
      solution: "Engineered VoidShare: a client-side, zero-knowledge data transfer protocol with dual-modality architecture: High-Speed Optical QR Streaming for 100% offline air-gapped network traversal (camera-to-screen), and Direct WebRTC DataChannels for serverless, zero-retention ephemeral device-to-device streaming.",
      targetAudience: "Enterprise personnel in isolated corporate intranets, field technicians in air-gapped SCADA facilities, and privacy-centric users requiring absolute zero server-side data retention.",
      architecture: [
        "Offline Shell (PWA): Service Workers & Cache Storage API enabling full application lifecycle execution with 0 kbps internet connectivity.",
        "Air-Gap Optical Engine: Binary chunking protocol partitioning files into indexed Base64 packets rendered as cyclic 10-15 FPS QR video streams, decoded via client Webcam Canvas.",
        "P2P Signaling & Stream: PeerJS & WebRTC RTCDataChannel mesh with STUN/TURN NAT traversal for direct browser-to-browser memory buffer streaming with zero intermediate database persistence."
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
        { step: "01. Intake", detail: "User drops payload file into client memory. System computes byte size, MIME type, and SHA-256 integrity checksum." },
        { step: "02. Routing Logic", detail: "Evaluates network context: triggers Air-Gapped Optical Engine for isolated environments, or initializes WebRTC Signaling via PeerJS for connected peers." },
        { step: "03. Optical Stream", detail: "Partitions payload into [index/total]:payload packets, driving dynamic Canvas cyclic QR animation at 10-15 FPS." },
        { step: "04. WebRTC Stream", detail: "Generates ephemeral peer ID link, handshakes RTCDataChannel, and streams binary ArrayBuffer directly between device memory heaps." },
        { step: "05. Verification & Assembly", detail: "Receiver decodes chunks in real time, verifies reconstructed buffer against original SHA-256 checksum, and triggers browser automatic file download." }
      ],
      gwtaiSpecs: [
        {
          scenario: "Optical QR Stream Generation & Payload Constraint",
          given: "User is in Optical Mode (Air-Gap) and selects a file payload ≤ 2 MB",
          when: "User triggers the 'Generate Stream' action",
          then: "The system partitions the binary buffer into sequential indexed packets [index/total]:data",
          and: "Renders cyclic animated QR codes on Canvas at target 10–15 FPS for camera synchronization",
          ifCondition: "File size exceeds 2 MB, the system triggers a warning banner suggesting WebRTC Mode due to optical transmission latency limits."
        },
        {
          scenario: "WebRTC Mid-Transfer Data Channel Disruption",
          given: "An active P2P data transfer session is underway with transfer progress at 60%",
          when: "One peer experiences network failure or closes the browser tab",
          then: "WebRTC triggers an ICEConnectionState transition to 'disconnected'",
          and: "The receiver initiates a 15-second grace period displaying an 'Awaiting peer reconnection' state before terminating the session buffer."
        }
      ],
      tradeoffs: [
        {
          title: "Serverless Static Architecture vs. Dedicated Signaling Server",
          decision: "Client-side architecture hosted on GitHub Pages utilizing public STUN network",
          impact: "Eliminated infrastructure operating expenses ($0 OpEx) and eliminated privacy liability via zero server retention. Trade-off: symmetric enterprise firewalls require TURN fallback."
        },
        {
          title: "Optical QR Frame Rate vs. Camera Shutter Synchronization",
          decision: "Capped cyclic animation between 10-15 FPS instead of uncapped 60 FPS",
          impact: "Mitigates rolling shutter packet loss and frame drops across low-end mobile lenses while maintaining a stable ~50-100 kbps optical data throughput."
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
      subtitle: "Enterprise Speech-to-Speech AI Translator & Dubbing Engine",
      role: "Technical Product Manager & System Architect",
      category: "ai",
      domain: "Enterprise SaaS, GenAI Audio Pipeline, Real-Time Collaboration",
      status: "Live on GitHub Pages",
      hasLivePreview: true,
      githubIoUrl: "https://erlandfatur.github.io/Speech-Translator-enterprise/",
      demoUrl: "https://erlandfatur.github.io/Speech-Translator-enterprise/",
      githubUrl: "https://github.com/Erlandfatur/Speech-Translator-enterprise",
      language: "Python / WebSockets / GenAI / Chrome MV3",
      problem: "Cross-border enterprise meetings (e.g., EN ↔ ID/JP/ZH) across Zoom/Teams suffer from rigid one-way captioning, literal translations lacking industry jargon comprehension, and high latency (> 2.5s) that disrupts conversational turn-taking.",
      solution: "Architected a low-latency, bidirectional Speech-to-Speech pipeline orchestrated across specialized AI models (Whisper → Llama/Gemini → Neural TTS), engineered with Custom Domain Glossary injection (~370 enterprise financial/tech terms) and graceful multi-tier failover.",
      distributionStrategy: [
        { channel: "Chrome Extension MV3", detail: "Direct tabCapture audio injection eliminating third-party meeting bots that breach enterprise IT security policies." },
        { channel: "Desktop Client (BYOK)", detail: "Standalone Bring-Your-Own-Key application for strict corporate compliance and zero infrastructure cost to the SaaS provider." }
      ],
      architecture: [
        "VAD & Chunking: Silero VAD v5 (ONNX) with dynamic silence detection (≥ 0.6s) reducing cloud API token ingestion by 40%.",
        "STT & Transcription: Groq Whisper Large v3 Turbo (sub-350ms inference) with automated fallback to local FasterWhisper.",
        "NMT & Custom Glossary: Groq Llama-3.3-70B with system prompt injection of ~370 corporate terms, falling back to Gemini Flash / Google Translate.",
        "TTS & Dubbing: Edge-TTS Neural streaming synthesis with graceful degradation to local Piper TTS ONNX engine."
      ],
      orchestrationPipeline: [
        {
          stage: "VAD & Chunking",
          primary: "Silero VAD v5 (ONNX)",
          fallback: "Fixed Time-Buffer",
          tradeoff: "Reduces cloud server compute and network egress by only processing active speech (saves 40% token cost)."
        },
        {
          stage: "STT (Transcription)",
          primary: "Groq Whisper Large v3 Turbo",
          fallback: "FasterWhisper (Local ONNX)",
          tradeoff: "Sub-350ms cloud inference speed vs. offline reliability during external API network throttling."
        },
        {
          stage: "NMT (Contextual Translation)",
          primary: "Groq Llama-3.3-70B",
          fallback: "Gemini Flash / Google Translate",
          tradeoff: "Contextual understanding of localized business jargon + system prompt injection of ~370 enterprise terms."
        },
        {
          stage: "TTS (Neural Dubbing)",
          primary: "Edge-TTS (Neural)",
          fallback: "Piper TTS (Local ONNX)",
          tradeoff: "Human-like cadence and prosody without exorbitant per-character enterprise voice licensing fees."
        }
      ],
      systemFlow: [
        { step: "01. Capture", detail: "Chrome Extension MV3 captures raw clean audio via tabCapture API / Virtual Cable without requiring invasive meeting bots." },
        { step: "02. VAD Detection", detail: "Silero VAD ONNX identifies silence pauses ≥ 0.6s after minimum 1.5s speech buffer is met, triggering immediate WebSocket payload flush." },
        { step: "03. Groq STT", detail: "Audio buffer streams to Groq Whisper Large v3 Turbo for high-fidelity transcription within < 350ms." },
        { step: "04. Contextual NMT", detail: "Llama-3.3-70B synthesizes translation with domain prompt injection of ~370 specialized corporate terms." },
        { step: "05. Neural Dubbing", detail: "Edge-TTS generates natural audio stream, returned over WebSocket with P95 end-to-end latency < 1.5s." }
      ],
      gwtaiSpecs: [
        {
          scenario: "Dynamic Buffer Flush & Low-Latency Translation",
          given: "Bidirectional voice translation session is active on Chrome Extension MV3",
          when: "Silero VAD detects speech silence ≥ 0.6s after meeting minimum 1.5s speech buffer threshold",
          then: "The system flushes the audio payload immediately to the WebSocket gateway",
          and: "The server returns dubbing audio stream within target latency budget ≤ 1.2s",
          ifCondition: "Inference queue latency exceeds 2.0s due to network congestion, the system automatically activates a Subtitle Overlay visual fallback before neural audio render completes."
        },
        {
          scenario: "Enterprise Token & Rate Limiting (Cost Protection)",
          given: "An enterprise user accesses the premium WebSocket cluster with 0 remaining credits",
          when: "User initiates WebSocket handshake to ws://gateway/ws/translate?token=<jwt>",
          then: "The server rejects the handshake with WebSocket close code 4402 (Payment Required)",
          and: "The client UI renders an upgrade modal: 'Monthly quota reached. Upgrade plan or switch to BYOK Desktop mode.'"
        }
      ],
      tradeoffs: [
        {
          title: "API Orchestration vs. Self-Hosted Heavy Models",
          decision: "Leveraged ultra-fast cloud APIs (Groq Llama-3.3 & Whisper) as primary tier; local models strictly as disaster recovery fallback",
          impact: "Prevented runaway cloud GPU expenses ($000s/mo), preserved SaaS gross margins, and maintained a 99.9% uptime SLA."
        },
        {
          title: "Chrome Extension tabCapture vs. Virtual Meeting Bot",
          decision: "Engineered Chrome MV3 client-side tab capture over headless meeting bots (Otter/Fireflies)",
          impact: "Eliminated enterprise IT security friction—allowing users to translate internal confidential meetings without requiring workspace admin bot approvals."
        }
      ],
      productMetrics: [
        { label: "End-to-End Latency", value: "< 1.5s", desc: "P95 speech-to-speech round-trip maintaining natural conversational turn-taking" },
        { label: "Domain Accuracy", value: "98.6%", desc: "Glossary benchmark match rate across technical & financial enterprise terminology" },
        { label: "Cost-per-Meeting-Hour", value: "< $0.15/hr", desc: "Average compute spend per meeting hour achieved via dynamic VAD silence flushing" }
      ],
      starFraming: {
        situation: "Real-time voice AI trilemma: minimizing latency, preventing margin-eroding cloud GPU costs, and ensuring strict enterprise contextual precision.",
        task: "Architect a scalable, enterprise-grade B2B translation system that complies with corporate IT security without requiring meeting room admin bot approvals.",
        action: "Engineered dynamic silence VAD flushing (cut token consumption by 40%), built a multi-tier failover mesh (Groq → Gemini → Local ONNX), and established a dual-tier monetization model (Enterprise Cloud Credits vs. Free BYOK Desktop).",
        result: "Delivered sub-1.5s P95 voice-to-voice latency, 98.6% technical glossary benchmark accuracy, and compressed compute costs below $0.15/meeting hour."
      },
      keyPoints: [
        "Architected multi-model AI orchestration pipeline (Whisper, Llama 3.3, Edge-TTS) with zero-downtime local failover.",
        "Compressed cloud API egress expenses by 40% through dynamic speech silence buffer flushing with Silero VAD.",
        "Overcame enterprise IT security gatekeepers by engineering a Chrome Extension MV3 client-side capture architecture.",
        "Structured a dual-tier product offering: Enterprise Metered Token Credits vs. Self-hosted BYOK Desktop Client."
      ],
      techStack: ["Python", "Groq Whisper v3", "Llama 3.3 70B", "Edge-TTS", "WebSockets", "Silero VAD", "Chrome MV3"],
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
      title: "Autonomous Freelance Hunt Agent",
      subtitle: "Autonomous Freelance Hunt Agent & Proposal Copilot",
      role: "Technical Product Manager & Lead AI System Architect",
      category: "ai",
      domain: "Agentic AI, Autonomous Workflow Automation, MarTech / Lead Generation",
      status: "Production Agent",
      hasLivePreview: false,
      githubIoUrl: null,
      demoUrl: "https://github.com/Erlandfatur/upwork-freelance-agent",
      githubUrl: "https://github.com/Erlandfatur/upwork-freelance-agent",
      language: "Python 3.11+ / Groq / MongoDB / Docker",
      problem: "Technical freelancers lose 15–20 hours weekly sifting through noisy job board feeds, evaluating high-risk clients (unverified payment, sub-30% hire rates), and authoring tailored technical proposals—frequently forfeiting high-conversion early-bidder windows.",
      solution: "Engineered an autonomous 24/7 Human-in-the-Loop agent that continuously ingests job feeds, computes semantic relevance scores, and generates tailored, anti-hallucinated technical proposals with 1-click interactive Telegram dispatch.",
      complianceSafeguard: "Architected with strict 100% platform Terms of Service (TOS) compliance by strictly prohibiting automated proposal submissions (zero auto-bidding). The agent acts strictly as an intelligent curator and drafting copilot.",
      architecture: [
        "Tier 1 Deterministic Engine: Pure Python regex heuristics discarding ~70% low-quality jobs with zero API token consumption (< 5ms).",
        "Tier 2 Semantic Matching Agent: Groq Llama-3.1-8B/3.3-70B evaluating portfolio-to-job compatibility scores at 300–750 tokens/sec.",
        "Tier 3 Ground-Truth Proposal Generator: Structured 4-stage technical pitch generation (Hook → Solution → Proof → CTA) strictly bound to verified portfolio data in profile.yaml.",
        "Event-Driven Dispatcher: Async Telegram Bot API alerting users in < 60s from job publication with 1-click copy code blocks and interactive CTAs."
      ],
      orchestrationPipeline: [
        {
          stage: "Tier 1: Risk & Budget Filter",
          primary: "Pure Python / Regex Heuristics",
          fallback: "Zero-Cost Discard",
          tradeoff: "< 5ms execution ($0 cost). Discards ~70% of spam/low-budget postings before consuming LLM token budgets."
        },
        {
          stage: "Tier 2: Semantic Fit Scoring",
          primary: "Groq Llama-3.1-8B / 3.3-70B",
          fallback: "Score < 70% Discard",
          tradeoff: "High-speed inference (~300–750 tps) evaluating deep portfolio relevance against client scope in real time."
        },
        {
          stage: "Tier 3: Ground-Truth Generation",
          primary: "Groq Llama-3.3-70B Versatile",
          fallback: "Re-prompt with Temp Penalty 0.2",
          tradeoff: "Generates structured 4-part pitch (Hook → Solution → Proof → CTA) with strict profile.yaml anti-hallucination verification."
        }
      ],
      systemFlow: [
        { step: "01. Intake", detail: "Continuous RSS / Webhook polling captures newly published freelance opportunities within seconds of publication." },
        { step: "02. Tier 1 Heuristics", detail: "Deterministic regex engine filters payment status, client hire rate (> 30%), minimum budget, and tech stack tags." },
        { step: "03. Tier 2 Semantic Eval", detail: "Groq Llama assesses scope complexity and computes semantic compatibility score (threshold ≥ 70%)." },
        { step: "04. Ground-Truth Draft", detail: "Llama-3.3-70B drafts proposal with strict validation against verified profile.yaml portfolio metrics." },
        { step: "05. Telegram Dispatch", detail: "Dispatches actionable alert to user Telegram within < 60s with 1-click copy blocks and interactive action buttons." }
      ],
      gwtaiSpecs: [
        {
          scenario: "Anti-Hallucination Portfolio Injection (Anti-Slop Gate)",
          given: "A job posting passes Tier 2 evaluation with a semantic compatibility score ≥ 70%",
          when: "The generator drafts a tailored technical proposal",
          then: "The system injects verified portfolio links, technical metrics, and tech stacks exclusively from profile.yaml",
          and: "An anti-hallucination validator confirms 100% exact match between drafted claims and profile credentials",
          ifCondition: "The model outputs unverified project claims or hallucinates unearned metrics, the generator aborts the draft and re-prompts with a temperature penalty lowered to 0.2."
        },
        {
          scenario: "Sub-60s Alert Dispatching via Telegram",
          given: "A proposal draft is successfully generated and verified against profile ground truth",
          when: "The dispatcher transmits payload to the Telegram Bot API",
          then: "The alert delivers to the user's channel in total elapsed time < 60 seconds from original RSS publication",
          and: "The Telegram message renders 1-click copy code blocks alongside interactive buttons: [Open Job Link], [Regenerate Pitch], and [Skip]."
        }
      ],
      tradeoffs: [
        {
          title: "Autonomous Bidding vs. Human-in-the-Loop",
          decision: "Strictly limited automation to curation, drafting, and screening assistance; manual final submission retained",
          impact: "Eliminated platform account suspension risks and prevented brand damage from bot misinterpretations while cutting manual workload by 80%."
        },
        {
          title: "Storage Deduplication Lifecycle (TTL)",
          decision: "Configured MongoDB 7-day Time-To-Live (TTL) automatic document expiration indices",
          impact: "Maintains cloud database storage permanently within free-tier limits without recurring maintenance overhead or stale feed clutter."
        }
      ],
      productMetrics: [
        { label: "Time-to-Pitch Latency", value: "≤ 2 mins", desc: "Reduced from 25–40 mins manual drafting to 1-min review + 1-click submit" },
        { label: "Token Cost Efficiency", value: "0 Tokens", desc: "Zero LLM tokens spent on unqualified jobs via Tier 1 deterministic discard" },
        { label: "Dispatch Velocity", value: "< 60s", desc: "Total elapsed time from RSS publication to Telegram copilot alert" }
      ],
      starFraming: {
        situation: "Technical freelancers waste 40% of working hours manually sifting through low-quality job board postings and writing repetitive proposals, consistently missing high-conversion early-bidder windows.",
        task: "Architect a scalable, cost-efficient lead discovery and proposal engine with 100% platform TOS compliance and zero LLM hallucinations.",
        action: "Designed a two-tier decision funnel: zero-cost deterministic regex heuristics filtering ~70% junk jobs, paired with a Groq Llama-3.3 semantic scoring agent and a strict profile.yaml anti-hallucination guardrail gate.",
        result: "Compressed proposal turnaround from 30+ minutes to under 2 minutes, maintained 100% platform compliance through Human-in-the-Loop design, and cut candidate screening compute costs to zero."
      },
      keyPoints: [
        "Architected a cost-optimized two-tier decision funnel filtering 70% of low-quality leads at $0 compute cost.",
        "Built an anti-hallucination guardrail gate ensuring 100% factual accuracy in AI-generated client proposals.",
        "Enforced strict platform compliance via Human-in-the-Loop design, rejecting risky automated bidding bots.",
        "Engineered sub-60s event-driven notification dispatch via Telegram Bot API with 1-click interactive actions."
      ],
      techStack: ["Python 3.11+", "Groq (Llama 3.3 70B)", "MongoDB", "Telegram Bot API", "Docker", "Regex Engine"],
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
