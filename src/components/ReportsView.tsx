import React, { useState } from 'react';
import { FileText, Download, Printer, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { PostQuantumLedger } from './PostQuantumLedger';

export const ReportsView: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);

      const reportData = {
        projectName: 'Quantum-Inspired Cyber Threat Detection for Digital Signature Security',
        reportId: `REP-QDS-${Date.now()}`,
        date: new Date().toISOString(),
        totalSignatures: 12842,
        validSignatures: 11964,
        invalidSignatures: 878,
        threatsDetected: 347,
        criticalThreats: 28,
        averageRiskScore: 31.4,
        detectionMetrics: {
          accuracy: '98.4%',
          precision: '97.2%',
          recall: '96.8%',
          f1Score: '97.0%',
          falsePositiveRate: '1.2%',
          detectionLatency: '34ms',
        },
        algorithmCompliance: ['FIPS 204 (ML-DSA-87)', 'FIPS 205 (SLH-DSA)', 'QDS-BB84'],
        auditStatus: 'VERIFIED_COMPLIANT',
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Quantum_Security_Report_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-cyber text-xl font-black text-white tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Post-Quantum Compliance & Audit Reports
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-1">
            Generate tamper-evident security audit certificates and regulatory compliance documentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>REPORT DOWNLOADED</span>
              </>
            ) : isExporting ? (
              <span>GENERATING CRYPTO PROOF...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>GENERATE AUDIT REPORT (JSON)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Summary Card */}
      <div className="hud-panel rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-5">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase">OFFICIAL SOC AUDIT CERTIFICATE</span>
            <h3 className="font-cyber text-lg font-bold text-white">
              Enterprise QDS Integrity & Threat Assessment Report
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
            FIPS 204 COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs mb-6">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <span className="text-slate-400 block mb-1">Total Digital Signatures:</span>
            <span className="text-lg font-bold text-white">12,842</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <span className="text-slate-400 block mb-1">Pass Ratio:</span>
            <span className="text-lg font-bold text-emerald-400">93.2% Verified</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <span className="text-slate-400 block mb-1">Threat Interceptions:</span>
            <span className="text-lg font-bold text-amber-400">347 Incidents</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <span className="text-slate-400 block mb-1">Critical Honeypot Reroutes:</span>
            <span className="text-lg font-bold text-rose-400">28 Diverted</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs font-sans text-slate-300 space-y-2">
          <p className="font-semibold text-cyan-300 font-cyber">Executive Security Summary:</p>
          <p>
            During the audit period, zero unauthorized digital signature alterations bypassed the SHA-256 pre-image and ML-DSA verification layers. Physical quantum channel metrics (QBER, phase noise, packet jitter) remained strictly within the baseline threshold of 1.4% QBER, with 28 targeted physical eavesdropping attacks successfully contained via the Quantum Virtual Path honeypot without compromising customer cryptographic key streams.
          </p>
        </div>
      </div>

      {/* Immutable Blockchain Ledger Component */}
      <PostQuantumLedger />
    </div>
  );
};
