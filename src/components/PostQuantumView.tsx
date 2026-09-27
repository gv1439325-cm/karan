import React from 'react';
import { Atom, ShieldCheck, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { QuantumGenesisStudio } from './QuantumGenesisStudio';

interface PostQuantumViewProps {
  onVoiceExplain: (text: string) => void;
}

export const PostQuantumView: React.FC<PostQuantumViewProps> = ({
  onVoiceExplain,
}) => {
  const pqcComparison = [
    {
      algo: 'RSA-2048 / 4096',
      category: 'Classical Public-Key',
      purpose: 'Digital Signature & Key Exchange',
      resistance: 'VULNERABLE',
      details: "Shor's algorithm can factor large primes in polynomial time on quantum machines.",
      isSafe: false,
    },
    {
      algo: 'ECDSA (secp256k1/r1)',
      category: 'Classical Elliptic Curve',
      purpose: 'Digital Signature (Bitcoin, TLS)',
      resistance: 'VULNERABLE',
      details: "Discrete logarithm problem broken by Shor's quantum algorithm.",
      isSafe: false,
    },
    {
      algo: 'ML-DSA (Dilithium / FIPS 204)',
      category: 'Post-Quantum Lattice-Based',
      purpose: 'Primary NIST Digital Signature Standard',
      resistance: 'QUANTUM-RESISTANT',
      details: 'Based on hardness of Module Learning With Errors (M-LWE). Fully supported.',
      isSafe: true,
    },
    {
      algo: 'SLH-DSA (SPHINCS+ / FIPS 205)',
      category: 'Post-Quantum Hash-Based',
      purpose: 'Stateless Hash-Based Signatures',
      resistance: 'QUANTUM-RESISTANT',
      details: 'Security relies exclusively on collision resistance of cryptographic hash functions.',
      isSafe: true,
    },
    {
      algo: 'QDS-BB84 (Quantum Digital Signature)',
      category: 'Physical Quantum Channel',
      purpose: 'Information-Theoretic Security',
      resistance: 'UNCONDITIONALLY SECURE',
      details: 'Protected by Heisenberg uncertainty principle & no-cloning theorem.',
      isSafe: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-cyber text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                NIST FIPS 204 & QDS STANDARD
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                ● Post-Quantum Readiness Matrix
              </span>
            </div>
            <h2 className="font-cyber text-xl font-black text-white tracking-wide">
              Post-Quantum Security & Cryptographic Migration
            </h2>
            <p className="text-sm text-slate-300 font-sans mt-1">
              Comparison between vulnerable classical public-key cryptography and NIST-standardized Post-Quantum Digital Signatures (ML-DSA / SLH-DSA).
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="hud-panel rounded-2xl p-5">
        <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Cryptographic Algorithm Quantum Resistance Matrix
        </h3>

        <div className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-slate-950/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-cyan-400 border-b border-cyan-500/20 uppercase text-[11px] font-cyber">
              <tr>
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Quantum Resistance</th>
                <th className="py-3 px-4">Mathematical Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {pqcComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.algo}</td>
                  <td className="py-3 px-4 text-slate-400">{row.category}</td>
                  <td className="py-3 px-4 text-slate-300">{row.purpose}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.isSafe
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {row.resistance}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-300 font-sans">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-cyan-300 font-cyber">Informational Note:</strong> This prototype demonstrates threat detection and security monitoring; it does not claim that quantum-inspired detection itself makes a cryptographic algorithm quantum-resistant. We enforce true hybrid security combining NIST FIPS 204 ML-DSA signatures with quantum channel QBER telemetry.
          </p>
        </div>
      </div>

      {/* Embedded Quantum State Genesis & Projective Measurement Studio */}
      <QuantumGenesisStudio onVoiceExplain={onVoiceExplain} />
    </div>
  );
};
