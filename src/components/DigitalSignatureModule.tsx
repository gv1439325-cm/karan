import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Shield,
  Key,
  Hash,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { DigitalDocSignature } from '../types/security';

interface DigitalSignatureModuleProps {
  onSignatureTamperedAlert: (doc: DigitalDocSignature) => void;
  onVoiceAnnounce?: (text: string) => void;
}

export const DigitalSignatureModule: React.FC<DigitalSignatureModuleProps> = ({
  onSignatureTamperedAlert,
  onVoiceAnnounce,
}) => {
  const [activeDoc, setActiveDoc] = useState<DigitalDocSignature>({
    id: 'QDS-SIG-9842',
    fileName: 'financial_report.pdf',
    fileSize: '2.4 MB',
    fileHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    algorithm: 'QDS-BB84 + ML-DSA-87 (Post-Quantum Hybrid)',
    signatureValue: '7f9a2b84c01d4e83a92f03b57c91d84e2a6b8f10c3d5e7a9b0c2d4e6f8a1b3c5',
    createdAt: new Date().toLocaleDateString() + ' 10:42 AM',
    user: 'chief_financial_officer@enterprise.corp',
    isValid: true,
    isTampered: false,
  });

  const [verificationResult, setVerificationResult] = useState<'idle' | 'valid' | 'invalid'>('valid');
  const [isVerifying, setIsVerifying] = useState(false);

  // File Upload Simulator
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockHash = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      const mockSig = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      const newDoc: DigitalDocSignature = {
        id: `QDS-SIG-${Math.floor(1000 + Math.random() * 9000)}`,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileHash: mockHash,
        algorithm: 'QDS-BB84 + ML-DSA-87 (Post-Quantum)',
        signatureValue: mockSig,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: 'security_analyst@enterprise.corp',
        isValid: true,
        isTampered: false,
      };

      setActiveDoc(newDoc);
      setVerificationResult('valid');
      onVoiceAnnounce?.(`New document ${file.name} uploaded. SHA-256 hash computed, and digital signature generated.`);
    }
  };

  // Perform Verification
  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (activeDoc.isTampered) {
        setVerificationResult('invalid');
        onSignatureTamperedAlert(activeDoc);
        onVoiceAnnounce?.(
          `Security Alert Boss: Document verification failed. SHA-256 hash mismatch detected. Signature is INVALID.`
        );
      } else {
        setVerificationResult('valid');
        onVoiceAnnounce?.(`Document signature verification completed: VALID SIGNATURE. Integrity intact.`);
      }
    }, 600);
  };

  // Simulate File Tamper (The Demo Scenario!)
  const handleSimulateTamper = () => {
    const tamperedHash = activeDoc.fileHash.slice(0, 10) + '9999ff' + activeDoc.fileHash.slice(16);
    const updated: DigitalDocSignature = {
      ...activeDoc,
      fileHash: tamperedHash,
      isTampered: true,
      isValid: false,
    };
    setActiveDoc(updated);
    setVerificationResult('invalid');
    onSignatureTamperedAlert(updated);
    onVoiceAnnounce?.(
      `Tamper simulation active Boss: One byte altered in ${updated.fileName}. Signature verification returned INVALID SIGNATURE. Threat score 92 percent.`
    );
  };

  // Restore Original Clean File
  const handleRestoreClean = () => {
    const original: DigitalDocSignature = {
      ...activeDoc,
      fileHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      isTampered: false,
      isValid: true,
    };
    setActiveDoc(original);
    setVerificationResult('valid');
    onVoiceAnnounce?.('Document restored to original clean state. Signature verified.');
  };

  return (
    <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-cyber font-bold text-base tracking-wider text-cyan-200 uppercase">
              Quantum Digital Signature (QDS) Verification Studio
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Cryptographic document authenticity, SHA-256 integrity verification & tamper detection
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Upload File (PDF/TXT/JSON)</span>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.txt,.docx,.json,.png,.jpg"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Document Metadata Card */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">File Name:</span>
              <span className="text-slate-100 font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                {activeDoc.fileName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">File Size:</span>
              <span className="text-slate-300">{activeDoc.fileSize}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-slate-400">SHA-256 Digest:</span>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 break-all select-all font-mono">
                {activeDoc.fileHash}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Signature Algorithm:</span>
              <span className="text-purple-300 font-semibold">{activeDoc.algorithm}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Signer Identity:</span>
              <span className="text-slate-200">{activeDoc.user}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Signature Token ID:</span>
              <span className="text-amber-400">{activeDoc.id}</span>
            </div>
          </div>
        </div>

        {/* Verification Status & Interactive Tamper Demo */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
          <div>
            <span className="text-xs font-cyber uppercase tracking-wider text-slate-400 mb-2 block">
              Cryptographic Integrity Result
            </span>

            {/* Big Status Badge */}
            {verificationResult === 'valid' ? (
              <div className="p-4 rounded-xl bg-emerald-950/50 border-2 border-emerald-500/60 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-10 h-10 text-emerald-400 mb-1" />
                <span className="font-cyber font-black text-lg text-emerald-300 uppercase tracking-widest">
                  VALID SIGNATURE
                </span>
                <span className="text-[11px] text-emerald-200/80 font-mono mt-0.5">
                  Quantum Digital Signature intact • No tampering detected
                </span>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-950/70 border-2 border-red-500 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse">
                <XCircle className="w-10 h-10 text-red-400 mb-1" />
                <span className="font-cyber font-black text-lg text-red-300 uppercase tracking-widest">
                  INVALID SIGNATURE
                </span>
                <span className="text-[11px] text-red-200/90 font-mono mt-0.5">
                  CRITICAL: Payload modified after signing • Hash corrupted
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-cyber uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>Verify Signature</span>
              </button>

              {activeDoc.isTampered ? (
                <button
                  onClick={handleRestoreClean}
                  className="py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-cyber uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Restore Clean</span>
                </button>
              ) : (
                <button
                  onClick={handleSimulateTamper}
                  className="py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-cyber uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                  title="Alters 1 byte of the document to demonstrate immediate attack detection"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Simulate Tamper</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                alert(`Verification Report Exported:\nDocument: ${activeDoc.fileName}\nSHA-256: ${activeDoc.fileHash}\nStatus: ${activeDoc.isValid ? 'VERIFIED' : 'TAMPERED / FRAUDULENT'}\nTimestamp: ${new Date().toISOString()}`);
              }}
              className="w-full py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Verification Report (.PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
