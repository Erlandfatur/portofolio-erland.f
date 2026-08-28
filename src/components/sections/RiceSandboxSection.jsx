import React, { useState } from 'react';
import { Sliders, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Zap, Layers, FileText } from 'lucide-react';

export function RiceSandboxSection({ onSoundEffect }) {
  // Preset real product feature sets
  const productPresets = [
    {
      id: 'esco-p2p',
      name: 'Esco E-Procurement System',
      badge: 'Enterprise Platform',
      features: [
        {
          id: 'f1',
          name: 'Multi-Tier Approval Matrix & Concurrency Lock',
          tag: 'P0 Core Security',
          userStory: 'As a Finance Controller, I want budget allocations locked atomically during concurrent approvals to eliminate accidental over-commitments.',
          reach: 2500,
          impact: 3.0,
          confidence: 90,
          effort: 1.5,
          acceptanceCriteria: [
            'AC-01: Concurrency mutex lock applied on department budget record during PO validation.',
            'AC-02: Multi-step approval routing based on monetary threshold (> $50K requires Director sign-off).',
            'AC-03: Full audit trail timestamp and actor ID logged permanently.',
          ],
        },
        {
          id: 'f2',
          name: 'Automated PO & Supplier Invoice OCR Scanner',
          tag: 'P1 Kaizen Automation',
          userStory: 'As a Procurement Officer, I want invoices scanned via OCR so that line items match POs automatically without manual data entry.',
          reach: 1200,
          impact: 2.0,
          confidence: 80,
          effort: 2.0,
          acceptanceCriteria: [
            'AC-01: 95%+ accuracy on extracting invoice number, tax ID, and line total amounts.',
            'AC-02: Automated discrepancy flag if invoice amount deviates > 1% from original PO.',
          ],
        },
        {
          id: 'f3',
          name: 'Cross-Regional Shipping Calculator V2 Integration',
          tag: 'P1 Logistics Core',
          userStory: 'As an Operations Specialist, I want container shipping freight fees estimated in real-time to prevent unexpected border tariffs.',
          reach: 4000,
          impact: 2.5,
          confidence: 95,
          effort: 1.0,
          acceptanceCriteria: [
            'AC-01: Real-time volumetric vs gross weight automated conversion.',
            'AC-02: Automated tariff lookup across Bintan and Singapore freight routes.',
          ],
        },
      ],
    },
    {
      id: 'trading-terminal',
      name: 'Nusantara Trading Terminal',
      badge: 'Algorithmic SaaS',
      features: [
        {
          id: 't1',
          name: 'Proprietary Whale Radar Order Book Flow Scanner',
          tag: 'P0 Monetization Driver',
          userStory: 'As an Active Trader, I want instant alerts when institutional block accumulation is detected across 700+ IDX tickers.',
          reach: 8500,
          impact: 3.0,
          confidence: 85,
          effort: 2.0,
          acceptanceCriteria: [
            'AC-01: Order book anomaly detection algorithm running under 250ms latency.',
            'AC-02: Live alert dispatch to subscribed VIP Discord & Telegram channels.',
          ],
        },
        {
          id: 't2',
          name: 'Mayar.id Automated VIP Subscription Webhook',
          tag: 'P0 Revenue Core',
          userStory: 'As a Subscriber, I want my premium terminal access unlocked instantly upon QRIS/credit card payment completion.',
          reach: 5000,
          impact: 2.5,
          confidence: 100,
          effort: 0.8,
          acceptanceCriteria: [
            'AC-01: Webhook signature verification and instantaneous database role upgrade.',
            'AC-02: Automated invoice receipt email dispatch with PDF attachment.',
          ],
        },
      ],
    },
    {
      id: 'voidshare-protocol',
      name: 'VoidShare Air-Gapped Protocol',
      badge: 'Zero-Server Tool',
      features: [
        {
          id: 'v1',
          name: '60 FPS Optical QR Video Stream Encoder',
          tag: 'P0 Breakthrough Protocol',
          userStory: 'As a Security Engineer, I want offline binary data transmitted via webcam QR video frames without physical USB or internet access.',
          reach: 3000,
          impact: 3.0,
          confidence: 90,
          effort: 1.5,
          acceptanceCriteria: [
            'AC-01: Base64 chunk streaming achieving > 100 KB/s optical throughput.',
            'AC-02: Reed-Solomon error correction to handle camera glare or dropped frames.',
          ],
        },
      ],
    },
  ];

  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(0);

  const activeProduct = productPresets[selectedProductIdx];
  const activePresetFeature = activeProduct.features[selectedFeatureIdx] || activeProduct.features[0];

  // Dynamic slider state
  const [reach, setReach] = useState(activePresetFeature.reach);
  const [impact, setImpact] = useState(activePresetFeature.impact);
  const [confidence, setConfidence] = useState(activePresetFeature.confidence);
  const [effort, setEffort] = useState(activePresetFeature.effort);

  // Synchronize when switching features
  const handleSelectFeature = (featIdx) => {
    if (onSoundEffect) onSoundEffect('interact');
    setSelectedFeatureIdx(featIdx);
    const feat = activeProduct.features[featIdx];
    setReach(feat.reach);
    setImpact(feat.impact);
    setConfidence(feat.confidence);
    setEffort(feat.effort);
  };

  const handleSelectProduct = (prodIdx) => {
    if (onSoundEffect) onSoundEffect('interact');
    setSelectedProductIdx(prodIdx);
    setSelectedFeatureIdx(0);
    const feat = productPresets[prodIdx].features[0];
    setReach(feat.reach);
    setImpact(feat.impact);
    setConfidence(feat.confidence);
    setEffort(feat.effort);
  };

  // RICE Score Formula: (Reach * Impact * (Confidence / 100)) / Effort
  const riceScore = Math.round((reach * impact * (confidence / 100)) / (effort || 0.1));

  const getPriorityTier = (score) => {
    if (score >= 4000) return { label: 'P0 • SPRINT MVP (TOP PRIORITY)', color: 'bg-[#FF5A00] text-white', border: 'border-[#FF5A00]' };
    if (score >= 2000) return { label: 'P1 • HIGH IMPACT ITERATION', color: 'bg-[#121316] text-white', border: 'border-[#121316]' };
    return { label: 'P2 • BACKLOG / FUTURE RELEASE', color: 'bg-[#E5E7EB] text-[#4B5563]', border: 'border-[#D1D5DB]' };
  };

  const tier = getPriorityTier(riceScore);

  return (
    <section id="sec-rice-sandbox" className="w-full space-y-8">
      
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D1D5DB] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider">
              [03 / PM LABORATORY & METHODOLOGY]
            </span>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#121316] text-white rounded-full">
              INTERACTIVE SIMULATOR
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-[#121316] font-heading mt-1">
            PRD & RICE PRIORITIZATION ENGINE
          </h2>
        </div>
        <div className="text-xs font-mono text-[#6B7280]">
          FORMULA: (REACH × IMPACT × CONFIDENCE) ÷ EFFORT
        </div>
      </div>

      {/* Main Interactive Studio Card */}
      <div className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-[2.5rem] p-6 sm:p-12 shadow-xl space-y-8 font-sans">
        
        {/* Product System Selector */}
        <div className="space-y-3 border-b border-[#F3F4F6] pb-6">
          <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider block">
            STEP 1: SELECT PRODUCT CASE STUDY TO EVALUATE:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {productPresets.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(idx)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedProductIdx === idx
                    ? 'bg-[#121316] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#4B5563] hover:text-[#121316] border border-[#D1D5DB]'
                }`}
              >
                <span>{prod.name}</span>
                <span className="text-[9px] opacity-70">({prod.badge})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Item Selector */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider block">
            STEP 2: CHOOSE SPECIFIC FEATURE BACKLOG ITEM:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeProduct.features.map((feat, idx) => (
              <button
                key={feat.id}
                onClick={() => handleSelectFeature(idx)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedFeatureIdx === idx
                    ? 'bg-[#FF5A00] text-white shadow-sm'
                    : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] border border-[#E5E7EB]'
                }`}
              >
                {feat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Interactive Workspace: Sliders (Left) vs Real-Time Scoring & PRD (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Left Column: Interactive RICE Parameter Sliders (6 cols) */}
          <div className="lg:col-span-6 bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 rounded-[2rem] space-y-6 font-mono">
            
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <span className="text-xs font-bold text-[#121316] flex items-center gap-2">
                <Sliders size={16} className="text-[#FF5A00]" />
                RICE SCORING METRIC SLIDERS
              </span>
              <button
                onClick={() => handleSelectFeature(selectedFeatureIdx)}
                className="text-[10px] text-[#6B7280] hover:text-[#121316] flex items-center gap-1 cursor-pointer"
                title="Reset to baseline"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>

            {/* 1. Reach Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#121316]">REACH (Users Impacted / Quarter)</span>
                <span className="text-[#FF5A00]">{reach.toLocaleString()} users</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={reach}
                onChange={(e) => {
                  if (onSoundEffect) onSoundEffect('interact');
                  setReach(Number(e.target.value));
                }}
                className="w-full accent-[#FF5A00] cursor-pointer"
              />
              <span className="text-[10px] text-[#9CA3AF] block">
                Number of stakeholders / end-users interacting with this feature.
              </span>
            </div>

            {/* 2. Impact Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#121316]">IMPACT MULTIPLIER</span>
                <span className="text-[#FF5A00]">
                  {impact === 3.0 ? '3.0 (Massive)' : impact === 2.0 ? '2.0 (High)' : impact === 1.0 ? '1.0 (Medium)' : `${impact} (Low)`}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={impact}
                onChange={(e) => {
                  if (onSoundEffect) onSoundEffect('interact');
                  setImpact(Number(e.target.value));
                }}
                className="w-full accent-[#FF5A00] cursor-pointer"
              />
              <span className="text-[10px] text-[#9CA3AF] block">
                Direct contribution to business goals (Kaizen efficiency / ARR).
              </span>
            </div>

            {/* 3. Confidence Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#121316]">CONFIDENCE LEVEL</span>
                <span className="text-[#FF5A00]">{confidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={confidence}
                onChange={(e) => {
                  if (onSoundEffect) onSoundEffect('interact');
                  setConfidence(Number(e.target.value));
                }}
                className="w-full accent-[#FF5A00] cursor-pointer"
              />
              <span className="text-[10px] text-[#9CA3AF] block">
                Data validation backed by user research & technical feasibility proof.
              </span>
            </div>

            {/* 4. Effort Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#121316]">EFFORT (Person-Months)</span>
                <span className="text-[#FF5A00]">{effort} PMs</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={effort}
                onChange={(e) => {
                  if (onSoundEffect) onSoundEffect('interact');
                  setEffort(Number(e.target.value));
                }}
                className="w-full accent-[#FF5A00] cursor-pointer"
              />
              <span className="text-[10px] text-[#9CA3AF] block">
                Engineering, QA, and PM time required to ship to production.
              </span>
            </div>

          </div>

          {/* Right Column: Live Calculated RICE Telemetry & Dynamic PRD Spec (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Score Telemetry Banner */}
            <div className="bg-[#121316] text-white p-6 sm:p-8 rounded-[2rem] border border-[#23262D] space-y-4 shadow-xl font-mono">
              <div className="flex items-center justify-between border-b border-[#23262D] pb-3">
                <span className="text-xs text-[#9CA3AF] uppercase">
                  COMPUTED RICE SCORE:
                </span>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${tier.color}`}>
                  {tier.label}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#FF5A00] font-heading tracking-tight">
                  {riceScore.toLocaleString()}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  PTS (Normalized)
                </span>
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {riceScore >= 4000
                  ? '⚡ High ROI Feature: Exceptional impact-to-effort ratio. Recommended for immediate sprint commitment (P0 MVP).'
                  : riceScore >= 2000
                  ? '📈 Solid Iteration: Substantial user value with manageable engineering cost (P1 Iteration).'
                  : '⏳ Low Priority: Defer to subsequent release or re-evaluate scope reduction (P2 Backlog).'}
              </p>
            </div>

            {/* Live Dynamic PRD Artifact Card */}
            <div className="bg-[#FFFFFF] border border-[#D1D5DB] p-6 sm:p-8 rounded-[2rem] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#FF5A00]" />
                  <span className="text-xs font-mono font-bold text-[#121316] uppercase">
                    LIVE PRD SPECIFICATION PREVIEW:
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#FF5A00] bg-[#FF5A00]/10 px-2 py-0.5 rounded">
                  {activePresetFeature.tag}
                </span>
              </div>

              {/* User Story */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#6B7280] uppercase">
                  USER STORY:
                </span>
                <p className="text-xs text-[#121316] font-medium leading-relaxed bg-[#F9FAFB] p-3.5 rounded-xl border border-[#E5E7EB]">
                  "{activePresetFeature.userStory}"
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-2 font-mono">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase block">
                  ACCEPTANCE CRITERIA (DEFINITION OF DONE):
                </span>
                <div className="space-y-2">
                  {activePresetFeature.acceptanceCriteria.map((ac, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                      <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-xs">{ac}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
