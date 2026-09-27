import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Binary,
  Radio,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface VivaDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceExplain: (text: string) => void;
}

export const VIVA_STEPS = [
  {
    step: 1,
    title: 'Document Ingestion',
    summary: 'Analyst uploads corporate document: financial_report.pdf (2.4 MB).',
    details: 'System reads file stream without transmitting plain payload to external cloud (air-gapped zero-trust principle).',
    status: 'COMPLETED',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Cryptographic Hashing',
    summary: 'Calculates deterministic SHA-256 digest: 8f4b23a9c7...e41b89.',
    details: 'Fixed 256-bit message digest acts as the baseline mathematical fingerprint of the payload.',
    status: 'COMPLETED',
    icon: Binary,
  },
  {
    step: 3,
    title: 'Quantum Digital Signature (QDS)',
    summary: 'Signs document using hybrid QDS-BB84 + FIPS 204 ML-DSA-87.',
    details: 'Quantum-derived secret keys generate unbreakable asymmetric authentication tokens.',
    status: 'COMPLETED',
    icon: CheckCircle2,
  },
  {
    step: 4,
    title: 'Baseline Verification',
    summary: 'Verification Engine runs initial check: VALID SIGNATURE.',
    details: 'Public verification matches secret token against physical quantum phase state with 100% correlation.',
    status: 'SUCCESS',
    icon: CheckCircle2,
  },
  {
    step: 5,
    title: 'Adversarial Injection (Simulated Tamper)',
    summary: 'Attacker flips 1 byte inside financial_report.pdf payload.',
    details: 'Simulates unauthorized modification of balance sheet line items during transmission.',
    status: 'ATTACK_INJECTED',
    icon: AlertTriangle,
  },
  {
    step: 6,
    title: 'Tamper Verification Trigger',
    summary: 'User verifies modified file: INVALID SIGNATURE.',
    details: 'Calculated hash mismatch triggers immediate physical channel audit flag across SOC sensors.',
    status: 'ALERT',
    icon: AlertTriangle,
  },
  {
    step: 7,
    title: 'Quantum-Inspired Threat Engine',
    summary: 'Telemetry pipeline evaluates 8 multidimensional vector features.',
    details: 'Analyses QBER, optical power delta, phase noise, signing frequency, and circadian login timing.',
    status: 'ANALYZING',
    icon: Radio,
  },
  {
    step: 8,
    title: 'Quantum State Optimization',
    summary: 'Optimization layer evaluates candidate states (Candidate C: 91% Anomaly).',
    details: 'Simulated annealing quantum heuristic selects highest-probability persistent attack signature.',
    status: 'OPTIMIZED',
    icon: Sparkles,
  },
  {
    step: 9,
    title: 'Risk Scoring & Classification',
    summary: 'Generates Threat Score: 92/100 (CRITICAL SEVERITY).',
    details: 'Classifies attack archetype as "Signature Tampering & Fiber Ingress Manipulation".',
    status: 'CRITICAL',
    icon: ShieldAlert,
  },
  {
    step: 10,
    title: 'Real-Time Alert Dispatch',
    summary: 'Alert #ALT-9082 broadcast to SOC dashboard with XAI diagnostics.',
    details: 'Ingress optical power exceeded by +14.2 dBm; system issues audio notification.',
    status: 'DISPATCHED',
    icon: ShieldAlert,
  },
  {
    step: 11,
    title: 'Active Defense & Virtual Honeypot',
    summary: 'Compromised key revoked (<100ms); attacker diverted to Decoy Path B.',
    details: 'Legitimate business transactions continue on clean quantum path without interruption.',
    status: 'CONTAINED',
    icon: CheckCircle2,
  },
  {
    step: 12,
    title: 'Immutable Blockchain Audit',
    summary: 'Forensic block #8942 committed to private compliance ledger.',
    details: 'Audit trail signed with SHA-256 for non-repudiation and external regulatory compliance.',
    status: 'FINALIZED',
    icon: CheckCircle2,
  },
];

export const VivaDemoModal: React.FC<VivaDemoModalProps> = ({
  isOpen,
  onClose,
  onVoiceExplain,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const currentStep = VIVA_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < VIVA_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleVoice = () => {
    onVoiceExplain(
      `Step ${currentStep.step}: ${currentStep.title}. ${currentStep.summary} ${currentStep.details}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-cyan-500/40 bg-[#050b18] p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-slate-100 font-sans max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cyber text-lg font-black tracking-wider text-cyan-300 uppercase">
                  12-Step Project Viva & Defense Demo
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  STEP {currentStep.step} / 12
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Controlled End-to-End Simulation of Digital Signature Protection & Attack Mitigation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVoice}
              className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Voice Narration</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 12-Step Progress Dots Bar */}
        <div className="py-4 border-b border-cyan-900/30">
          <div className="grid grid-cols-12 gap-1.5">
            {VIVA_STEPS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`py-1.5 rounded text-[10px] font-mono font-bold transition-all text-center ${
                  idx === currentStepIndex
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_#22d3ee] scale-105'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'
                }`}
              >
                S{s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="my-6 p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-cyber text-2xl font-black text-cyan-300">
                0{currentStep.step}
              </span>
              <h3 className="font-cyber text-xl font-bold text-white tracking-wide">
                {currentStep.title}
              </h3>
            </div>

            <span
              className={`text-xs font-mono px-3 py-1 rounded-full font-bold uppercase ${
                currentStep.status === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                  : currentStep.status === 'ALERT'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              STATUS: {currentStep.status}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-base font-sans">
            {currentStep.summary}
          </div>

          <div className="text-sm text-slate-400 font-mono leading-relaxed bg-slate-900/30 p-3 rounded-xl border border-cyan-900/20">
            <span className="text-cyan-400 font-semibold uppercase">Technical Architecture: </span>
            {currentStep.details}
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-cyan-500/25 pt-4">
          <button
            onClick={() => setCurrentStepIndex(0)}
            className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Step 1
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === VIVA_STEPS.length - 1}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
