import React from 'react';
import {
  X,
  BookOpen,
  Volume2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Atom,
  ShieldAlert,
} from 'lucide-react';

interface AboutResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceExplain: (text: string) => void;
}

export const AboutResearchModal: React.FC<AboutResearchModalProps> = ({
  isOpen,
  onClose,
  onVoiceExplain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-cyan-500/40 bg-[#050b18] p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-slate-100 font-sans max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="font-cyber text-lg font-black tracking-wider text-cyan-300 uppercase">
                About Academic Research
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Quantum-Inspired Cyber Threat Detection for Digital Signature Security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onVoiceExplain(
                  'Academic research summary: Traditional digital signatures provide mathematical integrity, but cannot detect active channel probing. Our quantum-inspired framework tracks physical telemetry and circadian patterns to mitigate threats in real time.'
                )
              }
              className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Voice Readout</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="my-4 overflow-y-auto pr-1 space-y-4 max-h-[65vh]">
          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-cyber uppercase font-bold mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              Problem Statement
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Traditional digital-signature systems primarily provide authenticity and mathematical integrity via public-key cryptography. However, they lack real-time continuous behavioral security monitoring to detect physical channel eavesdropping (such as Photon Number Splitting, fiber bending, and Trojan Horse optical probes) or credential compromises prior to key invalidation.
            </p>
          </div>

          {/* Proposed Solution */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-cyber uppercase font-bold mb-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Proposed Quantum-Inspired Solution
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              A quantum-inspired cyber threat detection framework that combines physical telemetry baseline tracking (QBER, phase drift, packet timing), circadian behavioral DNA analysis, multi-candidate quantum state optimization, explainable AI diagnostics (XAI), and autonomous virtual honeypot traffic divergence.
            </p>
          </div>

          {/* Expected Benefits */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-cyber uppercase font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Expected Technical & Research Benefits
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Early Micro-Anomaly Detection prior to key loss</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Continuous Physical Baseline Tracking (QBER)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Automated Risk Scoring & Attack Classification</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Sub-100ms Instant Key Invalidation Engine</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Controlled Lab Attack Simulation & Benchmarking</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Post-Quantum FIPS 204 Migration Roadmap</span>
              </div>
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs font-mono leading-relaxed">
            <span className="font-bold uppercase text-amber-400 flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-4 h-4" />
              Official Academic Prototype Disclaimer:
            </span>
            “This application is an academic prototype demonstrating quantum-inspired cyber threat detection concepts. Detection results, performance metrics, and attack scenarios may use simulated data and should not be interpreted as production-security guarantees.”
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-cyan-500/25 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
