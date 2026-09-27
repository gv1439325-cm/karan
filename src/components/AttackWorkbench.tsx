import React, { useState } from 'react';
import { ShieldAlert, Play, Sparkles, Filter, AlertTriangle, Zap, Activity } from 'lucide-react';
import { AttackVector, AttackTier } from '../types/security';
import { ATTACK_VECTORS } from '../data/attackVectors';

interface AttackWorkbenchProps {
  onSelectAttack: (attack: AttackVector) => void;
  activeAttackId?: string;
  onVoiceAnnounce?: (text: string) => void;
}

export const AttackWorkbench: React.FC<AttackWorkbenchProps> = ({
  onSelectAttack,
  activeAttackId,
  onVoiceAnnounce,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttacks = ATTACK_VECTORS.filter((atk) => {
    const matchesTier = selectedTier === 'all' || atk.tier === selectedTier;
    const matchesSearch =
      atk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atk.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atk.tierLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="font-cyber font-bold text-base tracking-wider text-cyan-200 uppercase">
              Interactive Attack Vector Workbench (15+ Scenarios)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Live physical attack simulator: Click any vector to simulate real-time optical & quantum telemetry intrusion
          </p>
        </div>

        {/* Tier Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {[
            { id: 'all', label: 'All (19)' },
            { id: 'tier1', label: 'Tier 1: Quantum Channel' },
            { id: 'tier2', label: 'Tier 2: Protocol/Phase' },
            { id: 'tier3', label: 'Tier 3: Multi-Vector' },
            { id: 'behavioral', label: 'Identity / Auth' },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedTier === tier.id
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Launch Buttons for Popular Attacks (Judge Favorites) */}
      <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex flex-wrap items-center gap-2">
        <span className="text-xs font-cyber text-cyan-400 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Judge Fast-Triggers:
        </span>

        {[
          'trojan-horse',
          'intercept-resend',
          'pns',
          'multi-vector-threat',
          'environmental-noise',
          'signature-forgery',
        ].map((atkId) => {
          const atk = ATTACK_VECTORS.find((a) => a.id === atkId);
          if (!atk) return null;
          const isSelected = activeAttackId === atk.id;

          return (
            <button
              key={atk.id}
              onClick={() => {
                onSelectAttack(atk);
                onVoiceAnnounce?.(
                  `Alert Boss: Simulating ${atk.name}. Physical metrics adjusted. Threat score reached ${atk.threatScore} percent.`
                );
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'border-red-400 bg-red-950/60 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-105'
                  : 'border-cyan-500/30 bg-slate-950/80 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40'
              }`}
            >
              <Play className="w-3 h-3 text-cyan-400" />
              <span>{atk.name}</span>
              <span
                className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                  atk.severity === 'Critical'
                    ? 'bg-red-500/20 text-red-300'
                    : atk.severity === 'Baseline'
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {atk.threatScore}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of All Attack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
        {filteredAttacks.map((atk) => {
          const isActive = activeAttackId === atk.id;

          return (
            <div
              key={atk.id}
              onClick={() => {
                onSelectAttack(atk);
                onVoiceAnnounce?.(
                  `Injecting ${atk.name} into Quantum Threat Core. Threat score is ${atk.threatScore} percent.`
                );
              }}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 relative group flex flex-col justify-between ${
                isActive
                  ? 'border-red-400 bg-red-950/40 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                  : 'border-slate-800/80 bg-slate-900/50 hover:border-cyan-500/40 hover:bg-slate-900/80'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 truncate">
                    {atk.tierLabel}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      atk.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : atk.severity === 'High'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : atk.severity === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {atk.severity.toUpperCase()}
                  </span>
                </div>

                {/* Attack Name */}
                <h4 className="font-sans font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {atk.name}
                </h4>

                {/* Concept Snippet */}
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-sans">
                  {atk.concept}
                </p>
              </div>

              {/* Physical Metrics Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>
                  QBER: <strong className="text-cyan-300">{atk.signatureMetrics.qber}%</strong>
                </span>
                <span>
                  Pwr Δ: <strong className="text-amber-300">{atk.signatureMetrics.opticalPowerDelta}</strong>
                </span>
                <span className="font-bold text-red-400">
                  Risk: {atk.threatScore}/100
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
