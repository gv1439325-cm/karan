import React from 'react';
import { ShieldCheck, Database, FileCheck, Lock, AlertTriangle, Cpu } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  blockHeight: number;
  eventType: string;
  details: string;
  hash: string;
  status: 'Committed' | 'Validated';
}

const SAMPLE_LEDGER: AuditLogEntry[] = [
  {
    id: 'TX-9042',
    timestamp: '10:44:12',
    blockHeight: 84210,
    eventType: 'QDS Re-Key Established',
    details: 'Fresh 256-bit key seed generated across Clean Blue Path after threat containment.',
    hash: '0x8f2a...c01d',
    status: 'Committed',
  },
  {
    id: 'TX-9041',
    timestamp: '10:43:58',
    blockHeight: 84209,
    eventType: 'Virtual Path Reroute Triggered',
    details: 'Attacker session diverted to Virtual Node B Honeypot. Fake key stream engaged.',
    hash: '0x7e1b...9a4f',
    status: 'Committed',
  },
  {
    id: 'TX-9040',
    timestamp: '10:43:55',
    blockHeight: 84208,
    eventType: 'Trojan Horse Ingress Flagged',
    details: 'XAI Root Cause: Ingress optical power +14.2 dBm anomaly flagged by model.',
    hash: '0x3c9f...a882',
    status: 'Committed',
  },
  {
    id: 'TX-9039',
    timestamp: '10:41:20',
    blockHeight: 84207,
    eventType: 'Digital Signature Verified',
    details: 'financial_report.pdf SHA-256 match confirmed. ML-DSA verification valid.',
    hash: '0x1a8c...ff32',
    status: 'Validated',
  },
];

export const PostQuantumLedger: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Post-Quantum Cryptography Comparison Matrix */}
      <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4">
          <Cpu className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-cyber font-bold text-base tracking-wider text-cyan-200 uppercase">
              Post-Quantum Cryptography (PQC) Migration Matrix
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              NIST-standardized post-quantum algorithms vs classical asymmetric ciphers
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Algorithm</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Primary Purpose</th>
                <th className="py-2.5 px-3">Quantum Resistance Status</th>
                <th className="py-2.5 px-3">Security Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="bg-red-950/20">
                <td className="py-3 px-3 font-bold text-red-300">RSA-2048 / 4096</td>
                <td className="py-3 px-3 text-slate-400">Classical Digital Signature</td>
                <td className="py-3 px-3 text-slate-300">Public-key signatures & key exchange</td>
                <td className="py-3 px-3 text-red-400 font-semibold">VULNERABLE (Shor's Algorithm)</td>
                <td className="py-3 px-3 text-red-300">Deprecating</td>
              </tr>
              <tr className="bg-red-950/20">
                <td className="py-3 px-3 font-bold text-red-300">ECDSA (P-256/384)</td>
                <td className="py-3 px-3 text-slate-400">Classical Digital Signature</td>
                <td className="py-3 px-3 text-slate-300">Elliptic curve digital signatures</td>
                <td className="py-3 px-3 text-red-400 font-semibold">VULNERABLE (Shor's Algorithm)</td>
                <td className="py-3 px-3 text-red-300">Deprecating</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-3 px-3 font-bold text-emerald-300">ML-DSA (Dilithium)</td>
                <td className="py-3 px-3 text-cyan-300">Post-Quantum Lattice-Based</td>
                <td className="py-3 px-3 text-slate-200">High-speed quantum-resilient signatures</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">QUANTUM-RESISTANT (NIST FIPS 204)</td>
                <td className="py-3 px-3 text-emerald-300">Level 2 / 3 / 5</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-3 px-3 font-bold text-emerald-300">SLH-DSA (SPHINCS+)</td>
                <td className="py-3 px-3 text-cyan-300">Post-Quantum Stateless Hash</td>
                <td className="py-3 px-3 text-slate-200">Conservative hash-based backup signatures</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">QUANTUM-RESISTANT (NIST FIPS 205)</td>
                <td className="py-3 px-3 text-emerald-300">Category 1-5</td>
              </tr>
              <tr className="bg-purple-950/20">
                <td className="py-3 px-3 font-bold text-purple-300">QDS-BB84 (Quantum)</td>
                <td className="py-3 px-3 text-purple-300">Physical Quantum Signatures</td>
                <td className="py-3 px-3 text-slate-200">Information-theoretic security via single photons</td>
                <td className="py-3 px-3 text-purple-300 font-bold">UNCONDITIONALLY SECURE (Physical Law)</td>
                <td className="py-3 px-3 text-purple-300">Provable Physics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono">
          <strong className="text-cyan-300">Research & Architecture Notice: </strong>
          This system couples physical Quantum Digital Signature (QDS) telemetry with post-quantum ML-DSA verification. Quantum-inspired anomaly detection protects against physical channel tampering and protocol side-channel leakage.
        </div>
      </div>

      {/* Immutable Blockchain Audit & Compliance Ledger */}
      <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-cyber font-bold text-base tracking-wider text-cyan-200 uppercase">
                Immutable On-Premises Compliance Ledger
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Tamper-evident record of all threat events, honeypot diversions, and analyst feedback
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            LEDGER SYNCED • 84,210 BLOCKS
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {SAMPLE_LEDGER.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-300">{entry.eventType}</span>
                  <span className="text-[10px] text-slate-500">[{entry.timestamp}]</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    Block #{entry.blockHeight}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">{entry.details}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500">{entry.hash}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
