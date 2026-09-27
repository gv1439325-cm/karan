import React from 'react';
import {
  X,
  Shield,
  Radio,
  Zap,
  Split,
  Brain,
  Layers,
  Cpu,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

interface ArchitecturePillarsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceExplain: (text: string) => void;
}

export const ARCHITECTURE_PILLARS = [
  {
    number: '01',
    title: 'Air-Gapped Zero-Trust Architecture',
    subtitle: 'Local Ingestion & Zero External Egress',
    icon: Shield,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    description:
      'Packaged as self-contained Docker containers and Kubernetes pods deployed entirely inside the enterprise private network. Cryptographic private keys, signed documents, and payloads never leave the organizational perimeter.',
  },
  {
    number: '02',
    title: 'Quantum Channel DNA & Pre-Attack Radar',
    subtitle: 'Continuous Physical Baseline Tracking',
    icon: Radio,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    description:
      'Monitors real-time quantum channel metrics—Quantum Bit Error Rate (QBER), phase drift, photon loss, and noise tolerance—against a baseline physical channel signature to issue proactive alerts before key compromise.',
  },
  {
    number: '03',
    title: 'Instant Key Revocation & Payload Locking Engine',
    subtitle: '<100ms Dynamic Revocation & Quantum Re-Keying',
    icon: Zap,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    description:
      'The moment an optical tap or phase disturbance is detected, the key is revoked in under 100 milliseconds. The underlying document payload is locked in its encrypted state, and fresh QDS keys are negotiated over a clean uncompromised path.',
  },
  {
    number: '04',
    title: 'Proactive Deception Engine (Quantum Virtual Path)',
    subtitle: 'Silent Session Divergence to Honeypot Node B',
    icon: Split,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    description:
      'Rather than abruptly disconnecting an adversary (which alerts them to defensive detection), traffic is silently routed to an isolated Quantum Virtual Node. Decoy key streams and synthetic telemetry keep the attacker trapped while SOC analysts profile the threat.',
  },
  {
    number: '05',
    title: 'Explainable AI (XAI) & Human-in-the-Loop Feedback',
    subtitle: 'Transparent Diagnostics & Local Model Retraining',
    icon: Brain,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    description:
      'Replaces black-box alerts with human-readable causality cards (e.g., "Ingress optical power exceeded by +14.2 dBm → Trojan Horse signature"). Analysts can flag false alerts (e.g. ambient fiber noise) to retrain model weights on-premises with zero cloud egress.',
  },
  {
    number: '06',
    title: 'Immutable Blockchain Audit & Compliance Ledger',
    subtitle: 'Tamper-Evident Forensic History',
    icon: Layers,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/30',
    description:
      'Every telemetry snapshot, threat event, XAI diagnostic card, and analyst action is permanently committed to an internal private blockchain ledger. Provides cryptographic non-repudiation for SOC auditors and international regulatory bodies.',
  },
  {
    number: '07',
    title: 'Plug-and-Play Middleware & Verification Gateway',
    subtitle: 'Zero-Trust API Gateway for Enterprise Integration',
    icon: Cpu,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    description:
      'Operates as a lightweight zero-trust API middleware between existing core banking, ERP, or document signers and the underlying physical QDS network. External parties verify signatures via public verification modules without access to internal system keys.',
  },
];

export const ArchitecturePillarsModal: React.FC<ArchitecturePillarsModalProps> = ({
  isOpen,
  onClose,
  onVoiceExplain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl border border-cyan-500/40 bg-[#050b18] p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-slate-100 font-sans max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="font-cyber text-lg font-black tracking-wider text-cyan-300 uppercase">
                7 Enterprise Architecture Pillars
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Commercial Viability & Zero-Trust Defense for Quantum Digital Signature Networks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onVoiceExplain(
                  'The 7 Architecture Pillars define our zero-trust quantum digital signature system, including air-gapped deployment, quantum channel baseline tracking, instant key revocation, honeypot rerouting, and explainable AI.'
                )
              }
              className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Voice Overview</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="my-4 overflow-y-auto pr-1 space-y-3.5 max-h-[65vh]">
          {ARCHITECTURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className={`p-4 rounded-xl bg-slate-950/80 border ${pillar.borderColor} hover:border-cyan-400 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-cyber text-xl font-black text-slate-500">
                    {pillar.number}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <Icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-cyber text-sm font-bold text-white tracking-wide">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-1.5 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-cyan-500/25 pt-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>FIPS 204 & NIST PQC Compliance Certified</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
          >
            Close Architecture Guide
          </button>
        </div>
      </div>
    </div>
  );
};
