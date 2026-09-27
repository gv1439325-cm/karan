import React, { useState } from 'react';
import {
  Brain,
  AlertOctagon,
  CheckCircle,
  Cpu,
  Activity,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Award,
} from 'lucide-react';
import { AttackVector } from '../types/security';

interface XAIDiagnosticCardProps {
  attack: AttackVector;
  onTrainFalseAlert: (attackId: string) => void;
  onVoiceExplain?: (text: string) => void;
  onExecuteCountermeasure?: () => void;
}

export const XAIDiagnosticCard: React.FC<XAIDiagnosticCardProps> = ({
  attack,
  onTrainFalseAlert,
  onVoiceExplain,
  onExecuteCountermeasure,
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedback = () => {
    setFeedbackSubmitted(true);
    onTrainFalseAlert(attack.id);
    onVoiceExplain?.(
      'Analyst feedback received Boss. Marking telemetry as benign baseline. Local on-premises model weights updated.'
    );
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 3500);
  };

  return (
    <div className="hud-panel-active rounded-2xl p-5 border border-cyan-500/40 bg-slate-950/90 relative shadow-[0_0_35px_rgba(6,182,212,0.2)] mb-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_#22d3ee]">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cyber font-bold text-sm tracking-wider text-cyan-200 uppercase">
                Explainable AI (XAI) Threat Diagnostic Box
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PROVABLE LOGIC
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Transparent attribution: Why the quantum-inspired neural model flagged this alert
            </p>
          </div>
        </div>

        {/* Explain Aloud Button */}
        <button
          onClick={() => {
            onVoiceExplain?.(
              `XAI Diagnostic for ${attack.name}: ${attack.xaiReason}. Recommended action is: ${attack.recommendedAction}`
            );
          }}
          className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-950/70 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Explain via MysterioTrap Voice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Threat Score Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
          <span className="text-xs font-cyber uppercase tracking-wider text-slate-400 mb-2">
            Calculated Risk Score
          </span>

          {/* SVG Circular Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(6, 182, 212, 0.15)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={
                  attack.threatScore > 80
                    ? '#ef4444'
                    : attack.threatScore > 60
                    ? '#f59e0b'
                    : '#10b981'
                }
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * attack.threatScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-cyber font-black text-2xl text-slate-100">
                {attack.threatScore}
              </span>
              <span className="text-[10px] font-mono text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-cyber font-bold tracking-wider uppercase ${
                attack.severity === 'Critical'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                  : attack.severity === 'High'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {attack.severity} Severity
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 mt-2">
            Target Attack: <strong className="text-cyan-300">{attack.name}</strong>
          </span>
        </div>

        {/* Right Column: Physical Reason & Feature Attribution */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          {/* Exact Reason Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-cyber tracking-wider text-amber-300 uppercase mb-1.5 font-bold">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              Root Cause Identification (Physical Telemetry)
            </div>
            <p className="text-sm font-mono text-amber-100 font-medium leading-relaxed">
              "{attack.xaiReason}"
            </p>
          </div>

          {/* Feature Attribution Bars */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Telemetry Feature Attribution</span>
              <span className="text-cyan-400">Deviation from Baseline</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Quantum Bit Error Rate (QBER)</span>
                  <span className="font-bold text-red-400">{attack.signatureMetrics.qber}% (Baseline: 1.2%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, attack.signatureMetrics.qber * 3)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Optical Power Ingress Delta</span>
                  <span className="font-bold text-amber-400">{attack.signatureMetrics.opticalPowerDelta}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.abs(parseFloat(attack.signatureMetrics.opticalPowerDelta) || 2) * 5)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Phase Modulation Drift (Δφ)</span>
                  <span className="font-bold text-cyan-400">{attack.signatureMetrics.phaseDrift}° (Tolerance: &lt;2.0°)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, attack.signatureMetrics.phaseDrift * 3)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: Countermeasure & Train/False Alert Button */}
          <div className="pt-3 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-300 font-mono">
              <span className="text-cyan-400 font-semibold">Recommended Response: </span>
              <span>{attack.recommendedAction}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Countermeasure button */}
              <button
                onClick={onExecuteCountermeasure}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Execute Countermeasure</span>
              </button>

              {/* CRITICAL FEATURE: "Train / False Alert" Action Button */}
              <button
                onClick={handleFeedback}
                disabled={feedbackSubmitted}
                className={`px-3.5 py-2 rounded-xl border text-xs font-cyber font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  feedbackSubmitted
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200'
                    : 'border-amber-500/50 bg-amber-950/30 text-amber-300 hover:border-amber-400 hover:bg-amber-950/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                }`}
                title="Mark this event as benign or false positive to locally retrain model baseline weights on-premises"
              >
                {feedbackSubmitted ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Model Retrained (On-Prem)</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Train / False Alert</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
