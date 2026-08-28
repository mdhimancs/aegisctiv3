import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Network,
  Share2,
  Terminal,
  ShieldAlert,
  Flame,
  Globe2,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Zap,
  Filter,
  Search,
  Copy,
  Check,
  FileDown,
  Download,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Lock,
  Compass,
  Radar,
  Radio,
  FileText,
  Boxes,
  HelpCircle,
  Eye,
  Sliders,
  RefreshCw,
  Target
} from 'lucide-react';
import {
  NEXT_GEN_RECOMMENDATIONS,
  SAMPLE_ATTACK_GRAPH,
  SAMPLE_DARKWEB_LEAKS,
  SAMPLE_TRANSPILATION_RULES,
  SAMPLE_GEOPOLITICAL_EVENTS,
  GraphNode
} from '../data/nextGenRecommendationsData';
import { NextGenRecommendation } from '../types';

interface NextGenRecommendationsViewProps {
  onNavigateTab?: (tabName: any) => void;
  onExportSTIX?: () => void;
}

export const NextGenRecommendationsView: React.FC<NextGenRecommendationsViewProps> = ({
  onNavigateTab,
  onExportSTIX
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'roadmap' | 'graph-engine' | 'siem-transpiler' | 'darkweb-leaks' | 'epss-velocity' | 'geopolitics' | 'executive-report'
  >('roadmap');

  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Attack Graph Interactive State
  const [selectedGraphNode, setSelectedGraphNode] = useState<GraphNode | null>(SAMPLE_ATTACK_GRAPH.nodes[0]);
  const [isDiamondMode, setIsDiamondMode] = useState<boolean>(false);

  // SIEM Transpiler State
  const [selectedRuleId, setSelectedRuleId] = useState<string>(SAMPLE_TRANSPILATION_RULES[0].id);
  const [targetSiem, setTargetSiem] = useState<'splunk' | 'sentinelKql' | 'elasticEql' | 'crowdstrikeLql' | 'qradarAql'>('splunk');

  // EPSS Interactive Calculator State
  const [calculatorCve, setCalculatorCve] = useState<string>('CVE-2024-37085');
  const [calculatorCvss, setCalculatorCvss] = useState<number>(9.8);
  const [calculatorEpss, setCalculatorEpss] = useState<number>(0.94);
  const [hasPocInWild, setHasPocInWild] = useState<boolean>(true);
  const [isCisaKev, setIsCisaKev] = useState<boolean>(true);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter recommendations
  const filteredRecs = NEXT_GEN_RECOMMENDATIONS.filter((rec) => {
    if (selectedPillar !== 'all' && rec.pillar !== selectedPillar) return false;
    if (selectedImpact !== 'all' && rec.strategicImpact !== selectedImpact) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        rec.title.toLowerCase().includes(q) ||
        rec.shortDesc.toLowerCase().includes(q) ||
        rec.pillar.toLowerCase().includes(q) ||
        rec.technicalComponents.some((c) => c.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const activeRule = SAMPLE_TRANSPILATION_RULES.find((r) => r.id === selectedRuleId) || SAMPLE_TRANSPILATION_RULES[0];

  // Calculated Weaponization Velocity
  const computeWeaponizationVelocity = () => {
    let velocityDays = 14;
    if (calculatorCvss >= 9.0) velocityDays -= 4;
    if (calculatorEpss >= 0.8) velocityDays -= 5;
    if (hasPocInWild) velocityDays -= 3;
    if (isCisaKev) velocityDays -= 1;
    const finalDays = Math.max(1, velocityDays);
    const urgency = finalDays <= 2 ? 'IMMINENT / EXPLOITED NOW' : finalDays <= 5 ? 'CRITICAL HIGH (2-5 Days)' : 'ELEVATED (1-2 Weeks)';
    return { finalDays, urgency };
  };

  const { finalDays, urgency } = computeWeaponizationVelocity();

  // Export full architecture blueprint
  const handleExportBlueprint = () => {
    const jsonStr = JSON.stringify(
      {
        blueprint: 'AEGIS Next-Gen Enterprise CTI Roadmap & Capability Matrix',
        author: 'Principal Cyber Threat Intelligence Research & Architecture',
        generatedDate: new Date().toISOString(),
        pillarsCount: NEXT_GEN_RECOMMENDATIONS.length,
        recommendations: NEXT_GEN_RECOMMENDATIONS
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis-nextgen-cti-blueprint-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto">
      {/* 1. Header Banner & Executive Scorecard */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-500/40 text-indigo-400 shrink-0 shadow-inner">
              <Sparkles className="w-7 h-7 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  AEGIS Next-Gen Architecture &amp; Senior Research Roadmap
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-wide">
                  CTI 2.0 Enterprise Spec
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wide">
                  7 Core Pillars
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Strategic blueprint and functional prototypes elevating AEGIS into a tier-1 intelligence engine: unified STIX 2.1 attack graph correlation, EPSS weaponization velocity, live dark web ransomware monitoring, multi-SIEM detection transpilation, and geopolitical threat barometers.
              </p>
            </div>
          </div>

          {/* Action Suite */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={handleExportBlueprint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer border border-indigo-400/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Architecture Spec (JSON)</span>
            </button>
            <button
              onClick={onExportSTIX}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export STIX 2.1 Bundle</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded bg-indigo-950 text-indigo-400">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pillars Architected</div>
              <div className="text-sm font-bold text-white">7 Strategic Vectors</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded bg-emerald-950 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Interactive Prototypes</div>
              <div className="text-sm font-bold text-emerald-400">6 Working Sandboxes</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded bg-amber-950 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Investigation MTTR</div>
              <div className="text-sm font-bold text-amber-300">-74% Projected Time</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-950 text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Zero-Day Lead Time</div>
              <div className="text-sm font-bold text-cyan-300">48-72h Early Warning</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'roadmap', label: '1. Next-Gen Roadmap Matrix', icon: Layers },
            { id: 'graph-engine', label: '2. STIX 2.1 Attack Graph Sandbox', icon: Network },
            { id: 'siem-transpiler', label: '3. Multi-SIEM Transpiler Sandbox', icon: Terminal },
            { id: 'darkweb-leaks', label: '4. Dark Web & Ransomware Live Feed', icon: Lock },
            { id: 'epss-velocity', label: '5. Weaponization Velocity & EPSS', icon: Zap },
            { id: 'geopolitics', label: '6. Geopolitical Threat Barometer', icon: Globe2 },
            { id: 'executive-report', label: '7. C-Suite Strategic Report Generator', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Content Body */}
      <div className="p-6 flex-1">
        {/* SUBTAB 1: Roadmap & Recommendations Overview */}
        {activeSubTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 ml-1" />
                <input
                  type="text"
                  placeholder="Filter pillars, components, or standards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-[11px]">Impact:</span>
                  <select
                    value={selectedImpact}
                    onChange={(e) => setSelectedImpact(e.target.value)}
                    className={`rounded-lg px-2.5 py-1 text-xs focus:outline-hidden transition-all cursor-pointer font-medium ${
                      selectedImpact !== 'all' 
                        ? 'bg-sky-950 text-sky-300 border-sky-600 shadow-3xs font-bold' 
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <option value="all" className="bg-slate-900 text-slate-100">All Impact Levels</option>
                    <option value="Strategic Game-Changer" className="bg-slate-900 text-slate-100">Strategic Game-Changer</option>
                    <option value="Critical" className="bg-slate-900 text-slate-100">Critical</option>
                    <option value="High" className="bg-slate-900 text-slate-100">High</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="font-mono text-[11px]">Pillar:</span>
                  <select
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value)}
                    className={`rounded-lg px-2.5 py-1 text-xs focus:outline-hidden transition-all cursor-pointer font-medium ${
                      selectedPillar !== 'all' 
                        ? 'bg-sky-950 text-sky-300 border-sky-600 shadow-3xs font-bold' 
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <option value="all" className="bg-slate-900 text-slate-100">All Pillars (7)</option>
                    {Array.from(new Set(NEXT_GEN_RECOMMENDATIONS.map((r) => r.pillar))).map((p) => (
                      <option key={p} value={p} className="bg-slate-900 text-slate-100">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredRecs.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/80 uppercase">
                          {rec.pillar}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1.5 group-hover:text-indigo-300 transition-colors">
                          {rec.title}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            rec.strategicImpact === 'Strategic Game-Changer'
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                              : rec.strategicImpact === 'Critical'
                              ? 'bg-red-950/80 text-red-300 border border-red-800'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {rec.strategicImpact}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/60">
                          {rec.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">{rec.shortDesc}</p>

                    {/* Rationale Callout */}
                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-3 mb-3 text-xs text-slate-300 font-sans leading-relaxed">
                      <span className="text-indigo-400 font-semibold font-mono text-[11px] block mb-1">
                        CTI Architect Rationale:
                      </span>
                      {rec.fullRationale}
                    </div>

                    {/* Key Technical Components */}
                    <div className="mb-3">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                        Technical Architecture:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.technicalComponents.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Standards & Compliance */}
                    <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Standards:</span>
                      {rec.standardsCompliance.map((std, idx) => (
                        <span
                          key={idx}
                          className="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/40"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action / Launch Prototype */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-300">
                      <Zap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{rec.roiMetric}</span>
                    </div>

                    {rec.interactiveFeatureKey && (
                      <button
                        onClick={() => {
                          if (rec.interactiveFeatureKey === 'graph') setActiveSubTab('graph-engine');
                          if (rec.interactiveFeatureKey === 'transpiler') setActiveSubTab('siem-transpiler');
                          if (rec.interactiveFeatureKey === 'darkweb') setActiveSubTab('darkweb-leaks');
                          if (rec.interactiveFeatureKey === 'epss') setActiveSubTab('epss-velocity');
                          if (rec.interactiveFeatureKey === 'geopolitics') setActiveSubTab('geopolitics');
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-bold transition-all border border-indigo-500/40 cursor-pointer"
                      >
                        <span>Launch Prototype</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: STIX 2.1 Attack Graph Sandbox */}
        {activeSubTab === 'graph-engine' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-indigo-400" />
                  STIX 2.1 Entity Relationship &amp; Attack Path Visualizer
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-hop interactive graph correlating Threat Actor $\rightarrow$ Campaign $\rightarrow$ Malware $\rightarrow$ TTP $\rightarrow$ Infrastructure $\rightarrow$ Target Asset.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDiamondMode(!isDiamondMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                    isDiamondMode
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {isDiamondMode ? 'Diamond Model: ON' : 'Diamond Model: OFF'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Interactive SVG Graph Area */}
              <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-4 relative min-h-[460px] flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Graph Background Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                {/* SVG Visual Graph Rendering */}
                <svg className="w-full h-96 relative z-10">
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 10"
                      refX="20"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>

                  {/* Render Graph Edges */}
                  {SAMPLE_ATTACK_GRAPH.edges.map((edge, idx) => {
                    const sourceNode = SAMPLE_ATTACK_GRAPH.nodes.find((n) => n.id === edge.source);
                    const targetNode = SAMPLE_ATTACK_GRAPH.nodes.find((n) => n.id === edge.target);
                    if (!sourceNode || !targetNode) return null;

                    const isHighlighted =
                      selectedGraphNode?.id === sourceNode.id || selectedGraphNode?.id === targetNode.id;

                    return (
                      <g key={idx}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={isHighlighted ? '#818cf8' : '#334155'}
                          strokeWidth={isHighlighted ? 2.5 : 1.5}
                          strokeDasharray={isHighlighted ? '4,4' : 'none'}
                          className={isHighlighted ? 'animate-pulse' : ''}
                          markerEnd="url(#arrow)"
                        />
                        <text
                          x={(sourceNode.x + targetNode.x) / 2}
                          y={(sourceNode.y + targetNode.y) / 2 - 6}
                          fill="#94a3b8"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {edge.relationship}
                        </text>
                      </g>
                    );
                  })}

                  {/* Render Graph Nodes */}
                  {SAMPLE_ATTACK_GRAPH.nodes.map((node) => {
                    const isSelected = selectedGraphNode?.id === node.id;
                    let nodeColor = '#6366f1';
                    if (node.type === 'actor') nodeColor = '#ef4444';
                    if (node.type === 'malware') nodeColor = '#f59e0b';
                    if (node.type === 'infrastructure') nodeColor = '#06b6d4';
                    if (node.type === 'victim') nodeColor = '#ec4899';
                    if (node.type === 'cve') nodeColor = '#8b5cf6';
                    if (node.type === 'ttp') nodeColor = '#10b981';

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedGraphNode(node)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 18 : 14}
                          fill={nodeColor}
                          fillOpacity={isSelected ? 0.9 : 0.6}
                          stroke={isSelected ? '#ffffff' : '#1e293b'}
                          strokeWidth={isSelected ? 3 : 1.5}
                        />
                        <text
                          x={node.x}
                          y={node.y + 28}
                          fill="#e2e8f0"
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Graph Legend */}
                <div className="flex items-center gap-3 flex-wrap text-[10px] font-mono text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 z-10">
                  <span className="font-bold text-slate-300 uppercase">Entity Legend:</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Threat Actor</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Campaign</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Malware</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Infrastructure</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> MITRE TTP</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Weaponized CVE</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span> Target Victim</span>
                </div>
              </div>

              {/* Selected Node Details & Diamond Pivot */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                {selectedGraphNode ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {selectedGraphNode.type}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1">{selectedGraphNode.label}</h3>
                      </div>
                      {selectedGraphNode.severity && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-950 text-red-400 border border-red-800">
                          {selectedGraphNode.severity}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Entity Intel Details:</div>
                      <p className="text-xs text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                        {selectedGraphNode.details}
                      </p>
                    </div>

                    {/* Diamond Model Pivot View */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-2">
                      <div className="text-[11px] font-mono font-bold text-indigo-400 flex items-center justify-between">
                        <span>Diamond Model Analysis:</span>
                        <span className="text-[9px] bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-300">STIX 2.1</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-red-400 font-bold">1. Adversary</div>
                          <div className="text-slate-300 truncate">UNC3886 (State-Nexus)</div>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-amber-400 font-bold">2. Capability</div>
                          <div className="text-slate-300 truncate">VIRTUALPWN / T1059</div>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-cyan-400 font-bold">3. Infrastructure</div>
                          <div className="text-slate-300 truncate">185.220.101.45 (C2)</div>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-pink-400 font-bold">4. Victim Asset</div>
                          <div className="text-slate-300 truncate">Defense Industrial Base</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Pivot Actions:</div>
                      <button
                        onClick={() => {
                          if (onNavigateTab) onNavigateTab('actors');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-mono transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>Inspect Full Actor Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
                      </button>
                      <button
                        onClick={() => {
                          if (onNavigateTab) onNavigateTab('iocs');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-mono transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>Detonate Related IOCs</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500 text-xs">
                    Click any node on the canvas to inspect STIX relationships
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: Multi-SIEM Detection Transpiler */}
        {activeSubTab === 'siem-transpiler' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Universal Detection Engineering &amp; Multi-SIEM Transpiler
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  1-Click syntax translation from Sigma YAML into Splunk SPL, Microsoft Sentinel KQL, Elastic EQL, CrowdStrike Falcon LQL, and QRadar AQL.
                </p>
              </div>

              {/* Vendor Selector */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'splunk', label: 'Splunk (SPL)' },
                  { id: 'sentinelKql', label: 'Sentinel (KQL)' },
                  { id: 'elasticEql', label: 'Elastic (EQL)' },
                  { id: 'crowdstrikeLql', label: 'CrowdStrike (LQL)' },
                  { id: 'qradarAql', label: 'IBM QRadar (AQL)' }
                ].map((target) => (
                  <button
                    key={target.id}
                    onClick={() => setTargetSiem(target.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      targetSiem === target.id
                        ? 'bg-emerald-600 text-white shadow-md border border-emerald-400'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {target.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Source Sigma YAML */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      Source Sigma Rule (YAML Specification)
                    </span>
                    <button
                      onClick={() => handleCopy(activeRule.sigmaYaml, 'sigma-raw')}
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'sigma-raw' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'sigma-raw' ? 'Copied' : 'Copy Sigma'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-100 p-3 rounded-lg border border-slate-300 text-[11px] font-mono text-slate-800 overflow-x-auto max-h-[380px] leading-relaxed">
                    {activeRule.sigmaYaml}
                  </pre>
                </div>

                <div className="mt-3 text-[10px] font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
                  <span>Author: Aegis Detection Research</span>
                  <span className="text-emerald-700 font-bold">Validated against Sysmon v14.1</span>
                </div>
              </div>

              {/* Right Column: Live Transpiled Target SIEM Query */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                      Transpiled Output: {targetSiem.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleCopy(activeRule.transpiledQueries[targetSiem], 'transpiled-query')}
                      className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 text-[11px] font-mono font-bold flex items-center gap-1 transition-all border border-emerald-200 cursor-pointer"
                    >
                      {copiedKey === 'transpiled-query' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'transpiled-query' ? 'Copied to Clipboard' : 'Copy Query'}</span>
                    </button>
                  </div>

                  <pre className="bg-slate-100 p-4 rounded-lg border border-slate-300 text-xs font-mono text-emerald-900 overflow-x-auto max-h-[380px] leading-relaxed shadow-inner">
                    {activeRule.transpiledQueries[targetSiem]}
                  </pre>
                </div>

                <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700 text-[11px] font-mono">AST Syntax Verified (0 Errors, 0 Warnings)</span>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigateTab) onNavigateTab('rules');
                    }}
                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Save to Detection Library</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: Dark Web & Ransomware Live Extortion Feed */}
        {activeSubTab === 'darkweb-leaks' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-400" />
                  Live Dark Web &amp; Ransomware Extortion Blog Monitor
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated Tor onion crawling across 35+ ransomware leak sites with victim verification, countdown timers, and exfiltration samples.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-red-400 bg-red-950/60 px-3 py-1.5 rounded-lg border border-red-800/80">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>4 Active Extortion Auctions Monitored</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_DARKWEB_LEAKS.map((leak) => (
                <div
                  key={leak.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-800 uppercase">
                            {leak.ransomwareGroup}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{leak.victimCountry}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5">{leak.victimName}</h3>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5">{leak.victimSector} • Est. Revenue: {leak.estimatedRevenue}</div>
                      </div>

                      <div className="text-right font-mono">
                        <div className={`text-xs font-bold ${leak.leakCountdownHours <= 6 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                          {leak.leakCountdownHours === 0 ? 'DUMPED' : `${leak.leakCountdownHours}h Remaining`}
                        </div>
                        <div className="text-[9px] text-slate-500 uppercase">Leak Timer</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 mb-3">
                      <div>
                        <span className="text-slate-500">Exfiltrated Data:</span>
                        <div className="text-slate-200 font-bold">{leak.dataVolume}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Ransom Demand:</span>
                        <div className="text-amber-300 font-bold">{leak.ransomDemand}</div>
                      </div>
                    </div>

                    {/* Proof files */}
                    <div className="mb-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Exfiltration Samples:</div>
                      <div className="flex flex-wrap gap-1">
                        {leak.proofFiles.map((file, idx) => (
                          <span key={idx} className="text-[9.5px] font-mono bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-slate-400">IOCs: {leak.iocs.join(', ')}</span>
                    <button
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('iocs');
                      }}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-indigo-300 text-[10px] font-bold cursor-pointer"
                    >
                      Ingest IOCs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 5: Weaponization Velocity & EPSS Calculator */}
        {activeSubTab === 'epss-velocity' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Predictive Weaponization Velocity &amp; Real-Time EPSS Matrix
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculate real-world exploitation likelihood by correlating CVSS 3.1, FIRST EPSS v3 probability, CISA KEV status, and GitHub PoC velocity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Interactive Inputs */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Vulnerability Parameters Simulator
                </h3>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Target CVE Identifier:</label>
                  <input
                    type="text"
                    value={calculatorCve}
                    onChange={(e) => setCalculatorCve(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>CVSS 3.1 Base Score:</span>
                    <span className="text-amber-400 font-bold">{calculatorCvss} / 10.0</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    value={calculatorCvss}
                    onChange={(e) => setCalculatorCvss(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>FIRST EPSS v3 Exploit Probability:</span>
                    <span className="text-emerald-400 font-bold">{(calculatorEpss * 100).toFixed(1)}% ({(calculatorEpss >= 0.8 ? 'Top 1%' : 'Elevated')})</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.99"
                    step="0.01"
                    value={calculatorEpss}
                    onChange={(e) => setCalculatorEpss(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-800 cursor-pointer text-xs font-mono text-slate-200">
                    <input
                      type="checkbox"
                      checked={hasPocInWild}
                      onChange={(e) => setHasPocInWild(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span>Public GitHub PoC Exploit Published</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-800 cursor-pointer text-xs font-mono text-slate-200">
                    <input
                      type="checkbox"
                      checked={isCisaKev}
                      onChange={(e) => setIsCisaKev(e.target.checked)}
                      className="accent-red-500"
                    />
                    <span>Listed in CISA KEV Catalog</span>
                  </label>
                </div>
              </div>

              {/* Calculated Weaponization Output */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                    <Radar className="w-4 h-4 text-emerald-400" />
                    Predictive Threat Forecast &amp; Mitigation Velocity
                  </h3>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Forecasted Time-to-Wild Exploitation
                    </div>
                    <div className={`text-3xl font-black font-mono tracking-tight ${finalDays <= 2 ? 'text-red-400' : 'text-amber-300'}`}>
                      {finalDays === 1 ? '< 24 Hours' : `${finalDays} Days`}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-300 mt-1 uppercase tracking-wide">
                      Status: <span className={finalDays <= 2 ? 'text-red-400' : 'text-amber-400'}>{urgency}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Risk Assessment:</span>
                      <span className="font-bold text-white">{calculatorCvss >= 9 && calculatorEpss > 0.8 ? 'Catastrophic Critical' : 'High Priority'}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Recommended SLA:</span>
                      <span className="font-bold text-red-400">{finalDays <= 2 ? 'Emergency Virtual Patching (< 4 Hours)' : 'Patch within 48 Hours'}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Automated Edge Action:</span>
                      <span className="font-bold text-emerald-400">Dispatch WAF &amp; IPS Signature</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      if (onNavigateTab) onNavigateTab('cve');
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono transition-all cursor-pointer"
                  >
                    View in 0-Day / CVE Radar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: Geopolitical Threat Barometer */}
        {activeSubTab === 'geopolitics' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  State-Sponsored Nexus Matrix &amp; Cyber-Kinetic Correlation
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Correlation barometer mapping physical geopolitical flashpoints to cyber espionage, critical infrastructure probing, and wiper surges.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {SAMPLE_GEOPOLITICAL_EVENTS.map((geo) => (
                <div
                  key={geo.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{geo.region}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800 uppercase">
                        {geo.threatLevel}
                      </span>
                      <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/60">
                        Risk Score: {geo.riskScore}/100
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-sans">{geo.conflictStatus}</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[9px] uppercase">Associated State Actors:</span>
                        <span className="text-amber-300 font-bold">{geo.stateActors.join(', ')}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[9px] uppercase">Targeted Critical Sectors:</span>
                        <span className="text-slate-200">{geo.targetingSectors.join(', ')}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[9px] uppercase">Primary Offensive Vectors:</span>
                        <span className="text-indigo-300">{geo.primaryOffensiveVectors.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex lg:flex-col gap-2 justify-end">
                    <button
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('actors');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-mono font-bold transition-all border border-indigo-500/40 cursor-pointer"
                    >
                      Pivoting Actors
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('world-map');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-all border border-slate-700 cursor-pointer"
                    >
                      View on Global Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 7: C-Suite Executive Threat Report Generator */}
        {activeSubTab === 'executive-report' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  C-Suite Executive Threat Intelligence Report Generator
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Produce board-ready strategic intelligence summaries in Markdown and PDF format with zero technical jargon.
                </p>
              </div>

              <button
                onClick={() => {
                  const report = `# AEGIS Global Threat Intelligence Executive Briefing
Generated: ${new Date().toUTCString()}
Classification: TLP:AMBER | Board of Directors Strategic Memo

## 1. Executive Summary & Macro Threat Posture
The global enterprise threat landscape remains elevated at DEFCON 2. Key adversary operations are dominated by nation-state prepositioning (Volt Typhoon, UNC3886) targeting hypervisor management fabrics and critical infrastructure perimeters. Concurrently, ransomware extortion syndicates (LockBit 3.0, RansomHub) are shortening double-extortion negotiation windows from 10 days to under 48 hours.

## 2. Key Business Risks & Material Impact
- **Supply Chain Vulnerability**: Recent zero-day weaponization in enterprise hypervisors and perimeter firewalls.
- **Ransomware & Dark Web Exposure**: 4 partner suppliers currently active on extortion auction sites.
- **Geopolitical Cyber-Kinetic Spillovers**: Heightened activity in Eastern Europe and Taiwan Strait corridors.

## 3. Prioritized Strategic Directives for C-Suite
1. Enforce strict isolation on all VMware vSphere / ESXi management interfaces.
2. Accelerate virtual patching for CVSS 9.0+ / EPSS > 80% vulnerabilities within a 4-hour SLA.
3. Validate immutable, air-gapped backup restoration pipelines across critical business ledgers.`;
                  const blob = new Blob([report], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `aegis-csuite-threat-briefing-${new Date().toISOString().slice(0, 10)}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono transition-all cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Executive Briefing (.MD)</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                    Sample Executive Briefing Preview
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Weekly Board Threat Landscape &amp; Risk Posture</h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800">
                  TLP:AMBER
                </span>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Executive Summary &amp; Macro Threat Posture</h4>
                  <p>
                    The global enterprise threat landscape remains elevated at <strong>DEFCON 2</strong>. Key adversary operations are dominated by nation-state prepositioning (Volt Typhoon, UNC3886) targeting hypervisor management fabrics and critical infrastructure perimeters. Concurrently, ransomware extortion syndicates are shortening double-extortion negotiation windows from 10 days to under 48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Key Business Risks &amp; Material Impact</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li><strong>Supply Chain Vulnerability</strong>: Active zero-day weaponization in enterprise hypervisors and perimeter firewalls.</li>
                    <li><strong>Ransomware &amp; Dark Web Exposure</strong>: 4 critical partner suppliers currently listed on extortion auction sites.</li>
                    <li><strong>Geopolitical Cyber-Kinetic Spillovers</strong>: Heightened activity in Eastern Europe and East Asia maritime corridors.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-800/60 space-y-2">
                  <h4 className="font-bold text-indigo-200 text-sm">3. Prioritized Strategic Directives for C-Suite</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-indigo-100 font-medium">
                    <li>Enforce strict isolation on all VMware vSphere / ESXi management interfaces.</li>
                    <li>Accelerate virtual patching for CVSS 9.0+ / EPSS &gt; 80% vulnerabilities within a 4-hour SLA.</li>
                    <li>Validate immutable, air-gapped backup restoration pipelines across critical business ledgers.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
