import React from 'react';
import {
  Users,
  Shield,
  Target,
  Flame,
  Globe,
  Radio,
  Cpu,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Bug,
  Activity,
  Zap,
  Lock
} from 'lucide-react';
import { ThreatActor, DiamondModel } from '../types';

interface ThreatActorsViewProps {
  actors: ThreatActor[];
  selectedActor: ThreatActor | null;
  onSelectActor: (actor: ThreatActor) => void;
  onGenerateActorRule: (actor: ThreatActor) => void;
}

export const ThreatActorsView: React.FC<ThreatActorsViewProps> = ({
  actors,
  selectedActor,
  onSelectActor,
  onGenerateActorRule,
}) => {
  const currentActor = selectedActor || actors[0];

  return (
    <div className="space-y-3 text-slate-900 font-sans">
      {/* Unified Offensive Intelligence Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">
              Unified Offensive Intelligence
            </h2>
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 font-mono">
              Tracked Threat Actors & Advanced Persistent Threat (APT) Registry
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
              Adversary attribution, Diamond Model telemetry, TTP matrices, and Triage playbooks
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      {/* Left Column: Actor Directory List (3 cols) */}
      <div className="lg:col-span-3 space-y-2">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 mb-1.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Adversary Registry</span>
            </h3>
            <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.2 rounded border border-indigo-100">
              {actors.length} ACTIVE
            </span>
          </div>

          <div className="space-y-1 max-h-[740px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-slate-200">
            {actors.map((actor) => {
              const isSelected = currentActor?.id === actor.id;
              return (
                <div
                  key={actor.id}
                  onClick={() => onSelectActor(actor)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-white border-red-500 ring-2 ring-red-500/10 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0 shadow-inner"
                        style={{ backgroundColor: actor.avatarColor || '#EF4444' }}
                      />
                      <h4 className="text-[11px] font-bold text-slate-900 line-clamp-1 font-mono tracking-tight group-hover:text-red-700">{actor.name}</h4>
                    </div>
                    <span className="text-[9px] font-mono px-1.2 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200 font-bold">
                      {actor.countryCode}
                    </span>
                  </div>

                  <p className="text-[9px] text-slate-500 line-clamp-1 mt-0.5 font-mono uppercase tracking-tight leading-none">
                    {actor.aliases.slice(0, 2).join(' • ')}
                  </p>

                  <div className="flex items-center justify-between text-[9px] font-mono mt-1 pt-1 border-t border-slate-100">
                    <span className="text-amber-700 font-bold uppercase tracking-tight">{actor.motivation}</span>
                    <span className="text-red-700 font-bold uppercase tracking-tight">{actor.sophistication}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Deep Adversary Dossier & Diamond Model (9 cols) */}
      <div className="lg:col-span-9 space-y-2.5">
        {currentActor ? (
          <div className="space-y-2.5">
            {/* Dossier Header Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Users className="w-20 h-20 text-slate-900" />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-2.5 relative z-10">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-red-600 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-black text-slate-900 font-mono tracking-tight">{currentActor.name}</h2>
                        <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-mono uppercase font-bold shadow-2xs">
                          {currentActor.status}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.2 uppercase tracking-wider font-bold">
                        Identifiers: <span className="text-indigo-600">{currentActor.aliases.join(', ')}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1.5 relative z-10">
                  <button
                    onClick={() => onGenerateActorRule(currentActor)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer font-mono uppercase tracking-tight"
                  >
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>Synthesize Detection</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Intelligence Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-2.5 pt-2.5 border-t border-slate-100 text-[10px] font-mono">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Origin</span>
                  <span className="font-bold text-slate-900 text-[11px]">{currentActor.originCountry}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Sponsor</span>
                  <span className="font-bold text-amber-600 uppercase text-[11px]">{currentActor.sponsorType.replace('_', ' ')}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Sophistication</span>
                  <span className="font-bold text-red-600 uppercase text-[11px]">{currentActor.sophistication}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Vector</span>
                  <span className="font-bold text-indigo-600 uppercase text-[11px] truncate block">Edge Incursion</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Motivation</span>
                  <span className="font-bold text-orange-600 uppercase text-[11px]">{currentActor.motivation}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 hidden lg:block">
                  <span className="text-[8px] uppercase text-slate-500 font-bold block tracking-wider">Campaigns</span>
                  <span className="font-bold text-slate-700 text-[11px]">{currentActor.activeCampaigns.length} Units</span>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-sans italic">
                {currentActor.description}
              </div>
            </div>

            {/* Diamond Model of Intrusion Visualizer */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Layers className="w-3 h-3 text-indigo-600" />
                  <span>Diamond Model Intelligence</span>
                </h3>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">Framework v2.1</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 font-mono">
                <div className="bg-red-50/40 p-2 rounded-lg border border-red-100">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-red-700 uppercase mb-0.5">
                    <Target className="w-2.5 h-2.5" />
                    <span>Adversary</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug font-sans line-clamp-3">
                    {currentActor.diamondModel.adversary}
                  </p>
                </div>

                <div className="bg-purple-50/40 p-2 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-purple-700 uppercase mb-0.5">
                    <Cpu className="w-2.5 h-2.5" />
                    <span>Capability</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug font-sans line-clamp-3">
                    {currentActor.diamondModel.capability}
                  </p>
                </div>

                <div className="bg-sky-50/40 p-2 rounded-lg border border-sky-100">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-sky-700 uppercase mb-0.5">
                    <Globe className="w-2.5 h-2.5" />
                    <span>Infrastructure</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug font-sans line-clamp-3">
                    {currentActor.diamondModel.infrastructure}
                  </p>
                </div>

                <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase mb-1">
                    <Shield className="w-3 h-3" />
                    <span>Victimology</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug font-sans line-clamp-3">
                    {currentActor.diamondModel.victim}
                  </p>
                </div>
              </div>
            </div>

            {/* Tactical TTPs, Weaponry & Sector Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 font-mono">
              <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MITRE ATT&CK Matrix TTPs</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {currentActor.primaryTTPs.map((ttp, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center gap-2 hover:bg-white hover:border-emerald-300 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {ttp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b border-slate-100">
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      <span>Adversary Weaponry</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentActor.associatedMalware.map((mal, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-[10px] font-bold text-rose-700 uppercase"
                        >
                          {mal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b border-slate-100">
                      <Bug className="w-3.5 h-3.5 text-amber-600" />
                      <span>Weaponized CVEs</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentActor.cvesExploited.map((cve, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-[10px] font-bold text-red-700"
                        >
                          {cve}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Targeted Industry Matrix</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentActor.targetSectors.map((sector, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] text-slate-700 font-bold uppercase"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center text-slate-500 font-mono shadow-xs text-xs">
            Select an adversary from the left directory to view full intelligence dossier.
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
