import React, { useState, useEffect } from 'react';
import { Network, ShieldAlert, ArrowRight, Radio, RefreshCw, Lock, Zap } from 'lucide-react';

interface QuantumVirtualPathMapProps {
  isRerouted: boolean;
  onToggleReroute: () => void;
  activeAttackName?: string;
  onVoiceAnnounce?: (text: string) => void;
}

export const QuantumVirtualPathMap: React.FC<QuantumVirtualPathMapProps> = ({
  isRerouted,
  onToggleReroute,
  activeAttackName,
  onVoiceAnnounce,
}) => {
  const [decoyBitStream, setDecoyBitStream] = useState<string>('1010011010110010');
  const [cleanBitStream, setCleanBitStream] = useState<string>('1101001011100101');
  const [decoyPacketsCaught, setDecoyPacketsCaught] = useState(148);

  // Generate randomized dummy quantum key stream for honeypot
  useEffect(() => {
    const interval = setInterval(() => {
      let dummy = '';
      for (let i = 0; i < 16; i++) {
        dummy += Math.random() > 0.5 ? '1' : '0';
      }
      setDecoyBitStream(dummy);

      let clean = '';
      for (let i = 0; i < 16; i++) {
        clean += Math.random() > 0.5 ? '1' : '0';
      }
      setCleanBitStream(clean);

      if (isRerouted) {
        setDecoyPacketsCaught((prev) => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [isRerouted]);

  return (
    <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h3 className="font-cyber font-bold text-sm tracking-wider text-cyan-200 uppercase">
              Quantum Virtual Path & Honeypot Deception Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Proactive Deception: Silently diverts attacker sessions to isolated Virtual Node B with decoy telemetry
          </p>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleReroute();
              onVoiceAnnounce?.(
                !isRerouted
                  ? 'Quantum Virtual Path engaged Boss: Attacker session diverted to Red Decoy Node B with dummy quantum key stream.'
                  : 'Quantum Virtual Path reset: Traffic returned to direct single path.'
              );
            }}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              isRerouted
                ? 'border-red-500 bg-red-950/50 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.4)]'
                : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isRerouted ? 'animate-pulse text-red-400' : 'text-cyan-400'}`} />
            <span>{isRerouted ? 'HONEYPOT DIVERGENCE ACTIVE' : 'TOGGLE VIRTUAL PATH'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Topology Visualizer */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl bg-slate-950/90 border border-cyan-500/20 p-4 flex flex-col justify-center overflow-hidden">
        {/* SVG Path Diagram */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="redDivert" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Clean Primary Path (Node A to Node B) */}
          <path
            d="M 120 135 C 240 135, 340 70, 540 70"
            fill="none"
            stroke="url(#blueBeam)"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Red Virtual Diverted Path (Node A / Splitter to Virtual Node B Decoy) */}
          {isRerouted && (
            <path
              d="M 280 115 C 360 160, 420 205, 540 205"
              fill="none"
              stroke="url(#redDivert)"
              strokeWidth="4"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Nodes Representation */}
        <div className="relative z-10 w-full h-full flex justify-between items-center px-4 sm:px-12">
          {/* SENDER NODE A (ALICE) */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <span className="font-cyber font-bold text-xs text-cyan-200">NODE A</span>
              <span className="text-[10px] font-mono text-cyan-400">ALICE (SENDER)</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shadow-[0_0_6px_#10b981]" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">QDS Transceiver</span>
          </div>

          {/* MID-CHANNEL SPLITTER / GATEWAY */}
          <div className="flex flex-col items-center">
            <div className={`p-2.5 rounded-xl border font-mono text-xs flex flex-col items-center backdrop-blur-md transition-all ${
              isRerouted
                ? 'border-red-500 bg-red-950/60 shadow-[0_0_15px_rgba(239,68,68,0.5)] text-red-200'
                : 'border-cyan-500/40 bg-slate-900/80 text-cyan-300'
            }`}>
              <span className="font-cyber text-[10px] uppercase font-bold">
                {isRerouted ? 'GATEWAY DIVERGENCE' : 'QUANTUM GATE'}
              </span>
              <span className="text-[9px] text-slate-300 mt-0.5">
                {isRerouted ? 'Traffic Split Active' : 'Normal Relay'}
              </span>
            </div>
          </div>

          {/* DESTINATIONS (Legitimate Node B & Decoy Node B) */}
          <div className="flex flex-col gap-6">
            {/* CLEAN PATH: NODE B (BOB) */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-950/80 border-2 border-blue-400 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <span className="font-cyber font-bold text-[11px] text-blue-200">NODE B</span>
                <span className="text-[9px] font-mono text-blue-300">CLEAN PATH</span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-0.5" />
              </div>
              <div className="hidden sm:block text-xs font-mono text-blue-300">
                <div className="font-semibold text-emerald-400">● Legitimate Session</div>
                <div className="text-[10px] text-slate-400">QBER: 1.1% (Pristine)</div>
                <div className="text-[9px] text-slate-500 font-mono">Stream: {cleanBitStream.slice(0, 8)}...</div>
              </div>
            </div>

            {/* DECOY PATH: VIRTUAL NODE B (HONEYPOT) */}
            <div className={`flex items-center gap-3 transition-all ${isRerouted ? 'opacity-100 scale-105' : 'opacity-40'}`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-950/90 border-2 border-red-500 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.6)]">
                <span className="font-cyber font-bold text-[10px] text-red-200">VIRTUAL B</span>
                <span className="text-[9px] font-mono text-red-300">DECOY / HONEYPOT</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-0.5 animate-ping" />
              </div>
              <div className="text-xs font-mono text-red-300">
                <div className="font-semibold text-red-400 flex items-center gap-1">
                  <span>🚨 Attacker Session Trapped</span>
                </div>
                <div className="text-[10px] text-slate-400">Captured: {decoyPacketsCaught} fake frames</div>
                <div className="text-[9px] text-amber-400 font-mono">Decoy Key: {decoyBitStream.slice(0, 10)}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-center justify-between">
          <span className="text-slate-400">Path Routing State:</span>
          <span className={`font-bold ${isRerouted ? 'text-red-400' : 'text-emerald-400'}`}>
            {isRerouted ? 'SPLIT (HONEYPOT ENGAGED)' : 'CLEAN DIRECT PATH'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-center justify-between">
          <span className="text-slate-400">Attacker Deception:</span>
          <span className="font-bold text-cyan-300">
            {isRerouted ? 'DUMMY TELEMETRY EMITTED' : 'STANDBY'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-center justify-between">
          <span className="text-slate-400">Active Threat Target:</span>
          <span className="font-bold text-amber-300 truncate max-w-[140px]">
            {activeAttackName || 'None (Baseline Clean)'}
          </span>
        </div>
      </div>
    </div>
  );
};
