import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Gauge,
  Volume2,
} from 'lucide-react';

interface ThreatDetectionModuleProps {
  onVoiceExplain: (text: string) => void;
}

export const ThreatDetectionModule: React.FC<ThreatDetectionModuleProps> = ({
  onVoiceExplain,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<'A' | 'B' | 'C'>('C');
  const [activeScore, setActiveScore] = useState(87);

  const pipelineSteps = [
    { title: 'Data Collection', desc: 'Ingesting QBER, phase noise & timing' },
    { title: 'Feature Extraction', desc: '14 quantum physical dimensions' },
    { title: 'Quantum-Inspired Optimization', desc: 'Simulated annealing state mapping' },
    { title: 'Anomaly Detection', desc: 'Physical DNA thresholding' },
    { title: 'Risk Scoring', desc: 'Dynamic Trust Score calculation' },
    { title: 'Security Response', desc: 'Honeypot diversion & key revocation' },
  ];

  const candidateStates = [
    { id: 'A' as const, label: 'Candidate State A', risk: 21, status: 'Normal Drift', desc: 'Baseline thermal noise on fiber link' },
    { id: 'B' as const, label: 'Candidate State B', risk: 74, status: 'Suspicious Probe', desc: 'Phase drift exceeding threshold (+18°)' },
    { id: 'C' as const, label: 'Candidate State C', risk: 91, status: 'Active Attack', desc: 'Trojan Horse optical power spike (+14.2 dBm)' },
  ];

  const handleSelectCandidate = (cand: typeof candidateStates[0]) => {
    setSelectedCandidate(cand.id);
    setActiveScore(cand.risk);
    onVoiceExplain(
      `Quantum-inspired optimization selected ${cand.label}. Assessed risk level is ${cand.risk} percent. Classification is ${cand.status}: ${cand.desc}.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-cyber text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                Quantum-Inspired Classical Simulation
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                ● 14 Telemetry Vectors Monitored
              </span>
            </div>
            <h2 className="font-cyber text-xl font-black text-white tracking-wide">
              Quantum-Inspired Cyber Threat Detection Engine
            </h2>
            <p className="text-sm text-slate-300 font-sans mt-1">
              Leverages quantum state superposition simulation to evaluate multi-vector cyber attack patterns in parallel.
            </p>
          </div>

          <button
            onClick={() =>
              onVoiceExplain(
                'The Quantum-Inspired Threat Detection Engine analyzes quantum channel telemetry in real-time, detecting unauthorized physical interception and spoofed digital signatures.'
              )
            }
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>MysterioTrap Voice Breakdown</span>
          </button>
        </div>
      </div>

      {/* PIPELINE VISUALIZATION */}
      <div className="hud-panel rounded-2xl p-6">
        <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          End-to-End Threat Detection Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 relative group hover:border-cyan-400 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                  STAGE 0{idx + 1}
                </span>
                <p className="text-xs font-cyber font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  {step.desc}
                </p>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center text-[10px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DETECTION METRICS & QUANTUM-INSPIRED OPTIMIZATION LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="hud-panel rounded-2xl p-5">
          <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Model Performance Metrics (Simulation)
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">Detection Accuracy</span>
              <span className="font-bold text-emerald-400">98.4%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">Precision (PPV)</span>
              <span className="font-bold text-cyan-300">97.2%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">Recall (Sensitivity)</span>
              <span className="font-bold text-cyan-300">96.8%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">F1 Score</span>
              <span className="font-bold text-cyan-300">97.0%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">False Positive Rate</span>
              <span className="font-bold text-emerald-400">1.2%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex justify-between items-center">
              <span className="text-slate-300">Detection Latency</span>
              <span className="font-bold text-amber-300">34 ms</span>
            </div>
          </div>
        </div>

        {/* Quantum-Inspired Optimization Layer */}
        <div className="lg:col-span-2 hud-panel rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Quantum-Inspired Optimization Layer (Candidate States)
              </h3>
              <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                Parallel State Evaluation
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-4 font-sans">
              The engine simulates superposition across potential attack topologies, converging on the highest-risk anomaly pattern:
            </p>

            <div className="space-y-3">
              {candidateStates.map((cand) => {
                const isSelected = selectedCandidate === cand.id;
                return (
                  <div
                    key={cand.id}
                    onClick={() => handleSelectCandidate(cand)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-rose-400 bg-rose-950/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-cyber text-xs font-bold ${
                          isSelected
                            ? 'bg-rose-500 text-slate-950 shadow-[0_0_8px_#f43f5e]'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {cand.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-cyber text-xs font-bold text-white">
                            {cand.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            → {cand.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          {cand.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-cyber text-sm font-bold ${
                          cand.risk >= 75
                            ? 'text-rose-400'
                            : cand.risk >= 50
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        Risk {cand.risk}%
                      </span>
                      {isSelected && (
                        <span className="block text-[9px] font-mono text-rose-300 font-bold uppercase mt-0.5">
                          SELECTED STATE
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circular Threat Score Gauge */}
          <div className="mt-4 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={activeScore >= 75 ? '#f43f5e' : activeScore >= 50 ? '#f59e0b' : '#10b981'}
                    strokeWidth="10"
                    strokeDasharray="251"
                    strokeDashoffset={`${251 - (activeScore / 100) * 251}`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute font-cyber text-xs font-black text-white">
                  {activeScore}
                </span>
              </div>
              <div>
                <p className="font-cyber text-xs font-bold text-white uppercase">
                  Current Threat Score: {activeScore}/100
                </p>
                <p
                  className={`text-xs font-mono font-bold uppercase ${
                    activeScore >= 75
                      ? 'text-rose-400'
                      : activeScore >= 50
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  Status: {activeScore >= 75 ? 'CRITICAL RISK' : activeScore >= 50 ? 'MODERATE RISK' : 'LOW RISK'}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              Response: Virtual Path Rerouting Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
