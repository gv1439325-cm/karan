import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  ShieldAlert,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Shield,
  BookOpen,
  Volume2,
  ChevronRight,
  Filter,
  RefreshCw,
  Zap,
  BarChart3,
  Layers,
  FileText,
  Radio,
  Sliders,
  ArrowUpRight,
  ArrowDownRight,
  Cpu
} from 'lucide-react';
import { playSoundFX } from '../utils/audioEffects';

interface AnalyticsViewProps {
  onOpenVivaDemo?: () => void;
  onOpenPillars?: () => void;
  onOpenResearch?: () => void;
  onVoiceExplain?: (text: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  onOpenVivaDemo,
  onOpenPillars,
  onOpenResearch,
  onVoiceExplain,
}) => {
  // Timeframe and Filter States
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'q3'>('7d');
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [activeSeries, setActiveSeries] = useState({
    mitigated: true,
    critical: true,
    total: true,
  });

  // Interactive Hover States
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>('Sig Tamper');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>('Jun'); // Default 'Jun' matches screenshot 2!
  const [hoveredLabItem, setHoveredLabItem] = useState<string | null>('Replay'); // Default 'Replay' matches screenshot 3!
  const [hoveredHour, setHoveredHour] = useState<number | null>(3);
  const [activeDonutTier, setActiveDonutTier] = useState<string | null>(null);

  // 1. Daily Trajectory Data (7 Days vs 30 Days)
  const trajectoryData7d = [
    { day: 'Sep 21', total: 18, mitigated: 17, critical: 1 },
    { day: 'Sep 22', total: 24, mitigated: 21, critical: 2 },
    { day: 'Sep 23', total: 32, mitigated: 28, critical: 3 },
    { day: 'Sep 24', total: 45, mitigated: 39, critical: 5 },
    { day: 'Sep 25', total: 38, mitigated: 36, critical: 2 },
    { day: 'Sep 26', total: 54, mitigated: 47, critical: 6 },
    { day: 'Sep 27', total: 42, mitigated: 37, critical: 4 },
  ];

  const trajectoryData30d = [
    { day: 'W1', total: 142, mitigated: 135, critical: 7 },
    { day: 'W2', total: 188, mitigated: 176, critical: 12 },
    { day: 'W3', total: 224, mitigated: 212, critical: 14 },
    { day: 'W4', total: 198, mitigated: 189, critical: 9 },
  ];

  const currentTrajectory = timeframe === '7d' ? trajectoryData7d : trajectoryData30d;

  // 2. Threat Classification Distribution
  const classificationData = [
    { label: 'Sig Tamper', count: 142, percentage: '35.6%', color: '#f43f5e', desc: 'Message digest mismatch or altered cryptosystem coefficients' },
    { label: 'Brute Force', count: 98, percentage: '24.6%', color: '#f97316', desc: 'Rapid iterative key guessing or token replay attempts' },
    { label: 'Replay Attk', count: 64, percentage: '16.0%', color: '#eab308', desc: 'Stale signature token playback over optical channel' },
    { label: 'Device Anom', count: 48, percentage: '12.0%', color: '#06b6d4', desc: 'Unregistered network card MAC or optical timing jitter' },
    { label: 'Key Compromise', count: 28, percentage: '7.0%', color: '#a855f7', desc: 'Photon phase decoherence indicating eavesdropping probe' },
    { label: 'PNS / Optical', count: 18, percentage: '4.8%', color: '#38bdf8', desc: 'Photon Number Splitting tap on multi-photon pulses' },
  ];

  // 3. Risk Tiers
  const riskTiers = [
    { tier: 'Low (0-25)', count: 218, pct: 58, color: '#06b6d4', strokeDash: '255 440', offset: '0' },
    { tier: 'Moderate (26-50)', count: 83, pct: 22, color: '#eab308', strokeDash: '96 440', offset: '-260' },
    { tier: 'High (51-75)', count: 49, pct: 13, color: '#f97316', strokeDash: '57 440', offset: '-360' },
    { tier: 'Critical (76-100)', count: 26, pct: 7, color: '#f43f5e', strokeDash: '31 440', offset: '-420' },
  ];

  // 4. Verification Volume & Tamper Ratio (by Month)
  const monthlyVerification = [
    { month: 'May', verified: 2850, tampered: 64, ratio: '2.2%' },
    { month: 'Jun', verified: 3120, tampered: 92, ratio: '2.9%' },
    { month: 'Jul', verified: 4200, tampered: 78, ratio: '1.8%' },
    { month: 'Aug', verified: 3600, tampered: 51, ratio: '1.4%' },
    { month: 'Sep', verified: 4350, tampered: 84, ratio: '1.9%' },
  ];

  // 6. Attack Simulation Lab Efficacy
  const labEfficacy = [
    { name: 'Tamper', injected: 38, quarantined: 38, rate: '100%' },
    { name: 'Replay', injected: 24, quarantined: 23, rate: '95.8%' },
    { name: 'Brute Force', injected: 48, quarantined: 46, rate: '95.8%' },
    { name: 'Behavioral', injected: 30, quarantined: 29, rate: '96.7%' },
    { name: 'Credential', injected: 18, quarantined: 18, rate: '100%' },
  ];

  const handleRefreshData = () => {
    playSoundFX('processing');
    onVoiceExplain?.('Telemetry analytics synchronized. Recalculated 376 threat events across all quantum virtual channels.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner from Screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="font-cyber text-xl font-black text-white tracking-wider flex items-center gap-2.5">
            <span className="text-cyan-400">📊</span>
            CYBERSECURITY ANALYTICS & THREAT INTELLIGENCE
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Statistical aggregation across digital signatures, behavioral patterns, and quantum virtual routing heuristics.
          </p>
        </div>

        {/* Action Controls & Horizon Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timeframe Selector */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-cyan-500/30 p-1 text-xs font-mono">
            <button
              onClick={() => {
                setTimeframe('7d');
                playSoundFX('listen');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === '7d'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => {
                setTimeframe('30d');
                playSoundFX('listen');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === '30d'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => {
                setTimeframe('q3');
                playSoundFX('listen');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === 'q3'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Q3 2026
            </button>
          </div>

          {/* Sync Button */}
          <button
            onClick={handleRefreshData}
            title="Refresh Aggregation Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-xs font-mono transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync Metrics</span>
          </button>

          {/* Horizon Badge */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-cyan-500/25 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evaluation Horizon: September 2026</span>
          </div>
        </div>
      </div>

      {/* 4 HIGH-LEVEL KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hud-panel rounded-2xl p-4 border border-cyan-500/25 bg-slate-950/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Aggregated Threats</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cyber font-black text-2xl text-white">376</span>
            <span className="text-xs text-rose-400 font-mono flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">100% routed to Honeypot Node B</p>
        </div>

        <div className="hud-panel rounded-2xl p-4 border border-emerald-500/25 bg-slate-950/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Auto-Mitigation Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cyber font-black text-2xl text-emerald-300">97.4%</span>
            <span className="text-xs text-emerald-400 font-mono flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.1%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">Autonomous quarantine without human delay</p>
        </div>

        <div className="hud-panel rounded-2xl p-4 border border-amber-500/25 bg-slate-950/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Mean Response Time</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cyber font-black text-2xl text-amber-300">42 ms</span>
            <span className="text-xs text-emerald-400 font-mono flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5" /> -12 ms
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">Key Revocation & payload locking speed</p>
        </div>

        <div className="hud-panel rounded-2xl p-4 border border-purple-500/25 bg-slate-950/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>False Alert Ratio</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cyber font-black text-2xl text-purple-300">0.24%</span>
            <span className="text-xs text-emerald-400 font-mono flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">Feedback loop updates weights on-prem</p>
        </div>
      </div>

      {/* 2x3 Grid of All 6 Charts from Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================================================================= */}
        {/* CHART 1: THREATS OVER TIME (DAILY TRAJECTORY) */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  1. THREATS OVER TIME (DAILY TRAJECTORY)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                Active Telemetry
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-4">
              Aggregated daily incidents, critical spikes, and automated mitigations.
            </p>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="relative w-full h-56">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradMitigated" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradTotal" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 15, 30, 45, 60].map((val) => {
                const y = 170 - (val / 60) * 140;
                return (
                  <g key={val}>
                    <line
                      x1="45"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(6, 182, 212, 0.12)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      fill="#64748b"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Day Labels on X Axis */}
              {currentTrajectory.map((item, idx) => {
                const x = 65 + idx * (390 / Math.max(1, currentTrajectory.length - 1));
                return (
                  <text
                    key={item.day}
                    x={x}
                    y="190"
                    fill="#94a3b8"
                    fontSize="9.5"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {item.day}
                  </text>
                );
              })}

              {/* Area under Mitigated Line */}
              {activeSeries.mitigated && (
                <path
                  d="M 65 130 Q 130 120, 195 105 T 325 80 T 455 83 L 455 170 L 65 170 Z"
                  fill="url(#gradMitigated)"
                />
              )}

              {/* Auto-Mitigated Line (Green) */}
              {activeSeries.mitigated && (
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  points="65,130 130,121 195,105 260,79 325,86 390,60 455,83"
                  className="transition-all"
                />
              )}

              {/* Total Threats Line (Orange) */}
              {activeSeries.total && (
                <polyline
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  points="65,128 130,114 195,95 260,65 325,81 390,44 455,72"
                  className="transition-all"
                />
              )}

              {/* Critical Spikes Line (Red/Pink) */}
              {activeSeries.critical && (
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  points="65,168 130,165 195,163 260,158 325,165 390,156 455,160"
                  className="transition-all"
                />
              )}

              {/* Interactive Points on Line */}
              {currentTrajectory.map((item, idx) => {
                const step = 390 / Math.max(1, currentTrajectory.length - 1);
                const x = 65 + idx * step;
                const yMit = 170 - (item.mitigated / 60) * 140;
                const yTot = 170 - (item.total / 60) * 140;
                const yCrit = 170 - (item.critical / 60) * 140;
                const isHovered = hoveredDay === idx;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredDay(idx)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Hover vertical line */}
                    {isHovered && (
                      <line
                        x1={x}
                        y1="30"
                        x2={x}
                        y2="170"
                        stroke="rgba(6, 182, 212, 0.4)"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Mitigated Dot */}
                    {activeSeries.mitigated && (
                      <circle
                        cx={x}
                        cy={yMit}
                        r={isHovered ? 6 : 3.5}
                        fill="#10b981"
                        stroke="#030712"
                        strokeWidth="1.5"
                      />
                    )}
                    {/* Total Dot */}
                    {activeSeries.total && (
                      <circle
                        cx={x}
                        cy={yTot}
                        r={isHovered ? 6 : 3.5}
                        fill="#f97316"
                        stroke="#030712"
                        strokeWidth="1.5"
                      />
                    )}
                    {/* Critical Dot */}
                    {activeSeries.critical && (
                      <circle
                        cx={x}
                        cy={yCrit}
                        r={isHovered ? 6 : 3}
                        fill="#f43f5e"
                        stroke="#030712"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={Math.min(380, Math.max(50, x - 55))}
                          y={yTot - 56}
                          width="110"
                          height="50"
                          rx="6"
                          fill="rgba(3, 7, 18, 0.95)"
                          stroke="#22d3ee"
                          strokeWidth="1.2"
                          className="shadow-xl"
                        />
                        <text
                          x={Math.min(380, Math.max(50, x - 55)) + 55}
                          y={yTot - 40}
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {item.day} — {Math.round((item.mitigated / item.total) * 100)}% Mitigated
                        </text>
                        <text
                          x={Math.min(380, Math.max(50, x - 55)) + 55}
                          y={yTot - 27}
                          fill="#f97316"
                          fontSize="9"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          Total: {item.total} | Crit: {item.critical}
                        </text>
                        <text
                          x={Math.min(380, Math.max(50, x - 55)) + 55}
                          y={yTot - 14}
                          fill="#10b981"
                          fontSize="8.5"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          Mitigated: {item.mitigated}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Legend from Screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-4 pt-3 border-t border-cyan-900/30 text-xs font-mono">
            <button
              onClick={() => setActiveSeries((p) => ({ ...p, mitigated: !p.mitigated }))}
              className={`flex items-center gap-1.5 cursor-pointer transition-opacity ${
                activeSeries.mitigated ? 'text-emerald-400 opacity-100' : 'text-slate-500 opacity-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Auto-Mitigated</span>
            </button>
            <button
              onClick={() => setActiveSeries((p) => ({ ...p, critical: !p.critical }))}
              className={`flex items-center gap-1.5 cursor-pointer transition-opacity ${
                activeSeries.critical ? 'text-rose-400 opacity-100' : 'text-slate-500 opacity-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>Critical Spikes</span>
            </button>
            <button
              onClick={() => setActiveSeries((p) => ({ ...p, total: !p.total }))}
              className={`flex items-center gap-1.5 cursor-pointer transition-opacity ${
                activeSeries.total ? 'text-orange-400 opacity-100' : 'text-slate-500 opacity-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span>Total Threats</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHART 2: THREAT CLASSIFICATION DISTRIBUTION */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  2. THREAT CLASSIFICATION DISTRIBUTION
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Quantum Confidence 98.2%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-4">
              Relative frequencies by attack archetype identified by quantum heuristics.
            </p>
          </div>

          {/* Vertical Bar Chart */}
          <div className="relative w-full h-56">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Y Axis Grid lines: 0, 40, 80, 120, 160 */}
              {[0, 40, 80, 120, 160].map((val) => {
                const y = 170 - (val / 160) * 140;
                return (
                  <g key={val}>
                    <line
                      x1="45"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(6, 182, 212, 0.12)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      fill="#64748b"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {classificationData.map((item, idx) => {
                const barWidth = 46;
                const x = 60 + idx * 70;
                const barHeight = (item.count / 160) * 140;
                const y = 170 - barHeight;
                const isHovered = hoveredCategory === item.label;

                return (
                  <g
                    key={item.label}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCategory(item.label)}
                  >
                    {/* Hover highlight column */}
                    {isHovered && (
                      <rect
                        x={x - 6}
                        y="20"
                        width={barWidth + 12}
                        height="150"
                        fill="rgba(255, 255, 255, 0.04)"
                        rx="6"
                      />
                    )}

                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      fill={item.color}
                      opacity={isHovered ? 1 : 0.85}
                      className="transition-all duration-200"
                    />
                    {/* Top glow border */}
                    <line
                      x1={x}
                      y1={y}
                      x2={x + barWidth}
                      y2={y}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2 : 1}
                      strokeOpacity="0.7"
                    />

                    {/* Category Label at bottom */}
                    <text
                      x={x + barWidth / 2}
                      y="188"
                      fill={isHovered ? '#ffffff' : '#94a3b8'}
                      fontSize="9"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {item.label}
                    </text>

                    {/* Value on top of bar */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      fill={item.color}
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {item.count}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Drilldown description footer */}
          <div className="flex flex-wrap items-center justify-between mt-4 pt-3 border-t border-cyan-900/30 text-xs font-mono text-slate-400">
            {hoveredCategory ? (
              <span className="text-cyan-300">
                Selected: <strong className="text-white">{hoveredCategory}</strong> —{' '}
                {classificationData.find((c) => c.label === hoveredCategory)?.desc}
              </span>
            ) : (
              <span>Dominant Archetype: Signature Tamper (35.6%)</span>
            )}
            <span className="text-emerald-400 font-bold">100% In-Perimeter</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHART 3: THREAT RISK SCORE TIERS (0-100) */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  3. THREAT RISK SCORE TIERS (0-100)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400">376 Total Flagged</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-2">
              Breakdown of total flagged events across Low, Moderate, High, and Critical bands.
            </p>
          </div>

          {/* Donut Chart matching Screenshot 2 */}
          <div className="relative w-full h-56 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Outer Donut Segments */}
              {riskTiers.map((tier) => (
                <circle
                  key={tier.tier}
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke={tier.color}
                  strokeWidth="28"
                  strokeDasharray={tier.strokeDash}
                  strokeDashoffset={tier.offset}
                  className="hover:opacity-100 opacity-90 transition-all cursor-pointer"
                  onMouseEnter={() => setActiveDonutTier(tier.tier)}
                  onMouseLeave={() => setActiveDonutTier(null)}
                />
              ))}

              {/* Center hole cutout */}
              <circle cx="100" cy="100" r="54" fill="#030712" />

              {/* Center Dynamic readout */}
              <text
                x="100"
                y="94"
                fill="#ffffff"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {activeDonutTier ? riskTiers.find((t) => t.tier === activeDonutTier)?.pct + '%' : '376'}
              </text>
              <text
                x="100"
                y="112"
                fill="#94a3b8"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {activeDonutTier ? activeDonutTier.split(' ')[0] : 'Incidents'}
              </text>
            </svg>
          </div>

          {/* Donut Legend matching Screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-3 border-t border-cyan-900/30 text-xs font-mono">
            {riskTiers.map((tier) => (
              <div
                key={tier.tier}
                onMouseEnter={() => setActiveDonutTier(tier.tier)}
                onMouseLeave={() => setActiveDonutTier(null)}
                className={`flex items-center gap-1.5 cursor-pointer transition-transform ${
                  activeDonutTier === tier.tier ? 'scale-105 font-bold' : ''
                }`}
                style={{ color: tier.color }}
              >
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: tier.color }} />
                <span>{tier.tier} ({tier.pct}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHART 4: SIGNATURE VERIFICATION VOLUME & TAMPER RATIO */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  4. SIGNATURE VERIFICATION VOLUME & TAMPER RATIO
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Pass Rate 98.1%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-4">
              Verified certificates vs detected invalid/tampered attempts across monthly billing periods.
            </p>
          </div>

          {/* Grouped Bar Chart with Interactive Tooltip (Screenshot 2) */}
          <div className="relative w-full h-56">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Y Axis Grid lines: 0, 1500, 3000, 4500, 6000 */}
              {[0, 1500, 3000, 4500, 6000].map((val) => {
                const y = 170 - (val / 6000) * 140;
                return (
                  <g key={val}>
                    <line
                      x1="45"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(6, 182, 212, 0.12)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      fill="#64748b"
                      fontSize="9.5"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Grouped Bars per Month */}
              {monthlyVerification.map((m, idx) => {
                const xGroup = 70 + idx * 82;
                const barWidth = 32;
                const hVer = (m.verified / 6000) * 140;
                const yVer = 170 - hVer;

                // Tampered bar scaled for visibility
                const hTam = Math.max(6, (m.tampered / 600) * 25);
                const yTam = 170 - hTam;

                const isHovered = hoveredMonth === m.month;

                return (
                  <g
                    key={m.month}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(m.month)}
                  >
                    {/* Hover column background highlight (seen in screenshot 2 behind Jun) */}
                    {isHovered && (
                      <rect
                        x={xGroup - 12}
                        y="20"
                        width={barWidth * 2 + 10}
                        height="150"
                        fill="rgba(255, 255, 255, 0.04)"
                        rx="6"
                      />
                    )}

                    {/* Verified Signatures Bar (Green/Emerald) */}
                    <rect
                      x={xGroup}
                      y={yVer}
                      width={barWidth}
                      height={hVer}
                      rx="3"
                      fill="#10b981"
                      className="transition-all"
                    />

                    {/* Tampered Bar (Pink/Red) */}
                    <rect
                      x={xGroup + barWidth + 6}
                      y={yTam}
                      width={14}
                      height={hTam}
                      rx="2"
                      fill="#f43f5e"
                    />

                    {/* Month Label */}
                    <text
                      x={xGroup + barWidth / 2}
                      y="188"
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {m.month}
                    </text>

                    {/* EXACT Tooltip Card from Screenshot 2 on Jun */}
                    {isHovered && (
                      <g>
                        <rect
                          x={xGroup - 10}
                          y={yVer - 75}
                          width="160"
                          height="64"
                          rx="8"
                          fill="rgba(10, 18, 36, 0.95)"
                          stroke="rgba(6, 182, 212, 0.4)"
                          strokeWidth="1.2"
                          className="shadow-2xl"
                        />
                        <text
                          x={xGroup + 5}
                          y={yVer - 54}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {m.month} 2026
                        </text>
                        <text
                          x={xGroup + 5}
                          y={yVer - 38}
                          fill="#f43f5e"
                          fontSize="10"
                          fontFamily="sans-serif"
                        >
                          Invalid / Tampered : {m.tampered}
                        </text>
                        <text
                          x={xGroup + 5}
                          y={yVer - 22}
                          fill="#10b981"
                          fontSize="10"
                          fontFamily="sans-serif"
                        >
                          Verified Signatures : {m.verified}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend from Screenshot */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-cyan-900/30 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="w-3 h-3 bg-rose-500 rounded-sm" />
              <span>Invalid / Tampered</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
              <span>Verified Signatures</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHART 5: CIRCADIAN BEHAVIORAL DNA (NORMAL VS ANOMALOUS) */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  5. CIRCADIAN BEHAVIORAL DNA (NORMAL VS ANOMALOUS)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                03:00 Night Anomaly Detected
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-4">
              Hour-by-hour baseline activity vs night-time anomaly bursts (3:00 AM spike deviation).
            </p>
          </div>

          {/* Dual Smooth Curve Graph */}
          <div className="relative w-full h-56">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Y Axis Grid lines: 0, 300, 600, 900, 1200 */}
              {[0, 300, 600, 900, 1200].map((val) => {
                const y = 170 - (val / 1200) * 140;
                return (
                  <g key={val}>
                    <line
                      x1="45"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(6, 182, 212, 0.12)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      fill="#64748b"
                      fontSize="9.5"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Time Labels */}
              {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((time, idx) => {
                const x = 60 + idx * 78;
                return (
                  <text
                    key={time}
                    x={x}
                    y="190"
                    fill="#94a3b8"
                    fontSize="9.5"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {time}
                  </text>
                );
              })}

              {/* Normal Circadian Curve (Cyan) peaking at 12:00 ~1200 */}
              <path
                d="M 60 160 C 130 160, 200 120, 260 35 C 320 35, 380 90, 470 162"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />

              {/* Anomalous Burst Curve (Purple) - flat except 03:00 spike */}
              <path
                d="M 60 165 C 100 164, 115 145, 130 166 L 470 167"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />

              {/* Spiking Anomaly Dot at 3:00 AM */}
              <g className="cursor-pointer" onClick={() => onVoiceExplain?.('Night-time anomaly alert. A sudden burst of 45 invalid verification attempts was recorded at 03:00 AM outside standard corporate operating hours.')}>
                <circle
                  cx="115"
                  cy="145"
                  r="6"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <circle
                  cx="115"
                  cy="145"
                  r="12"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  className="animate-spin"
                />
                <rect
                  x="65"
                  y="92"
                  width="115"
                  height="40"
                  rx="6"
                  fill="rgba(244, 63, 94, 0.9)"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text
                  x="122"
                  y="107"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  3:00 AM SPIKE
                </text>
                <text
                  x="122"
                  y="122"
                  fill="#ffe4e6"
                  fontSize="8.5"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  Risk: 92% (Night Attack)
                </text>
              </g>
            </svg>
          </div>

          {/* Legend from Screenshot */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-cyan-900/30 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 bg-cyan-400 rounded-sm" />
              <span>Normal Behavioral DNA Curve</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-400">
              <span className="w-3 h-3 bg-purple-400 rounded-sm" />
              <span>Anomalous Burst Profile</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHART 6: ATTACK SIMULATION LAB EFFICACY */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <h3 className="font-cyber text-xs tracking-wider text-white font-bold uppercase">
                  6. ATTACK SIMULATION LAB EFFICACY
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Efficacy: 98.4%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mb-4">
              Number of adversarial injections vs successfully quarantined threat sessions.
            </p>
          </div>

          {/* Grouped Bar Chart with Interactive Tooltip (Screenshot 3) */}
          <div className="relative w-full h-56">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Y Axis Grid lines: 0, 15, 30, 45, 60 */}
              {[0, 15, 30, 45, 60].map((val) => {
                const y = 170 - (val / 60) * 140;
                return (
                  <g key={val}>
                    <line
                      x1="45"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(6, 182, 212, 0.12)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      fill="#64748b"
                      fontSize="9.5"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Grouped Bars per Attack Archetype */}
              {labEfficacy.map((item, idx) => {
                const xGroup = 70 + idx * 82;
                const barWidth = 24;
                const hInj = (item.injected / 60) * 140;
                const yInj = 170 - hInj;
                const hQua = (item.quarantined / 60) * 140;
                const yQua = 170 - hQua;

                const isHovered = hoveredLabItem === item.name;

                return (
                  <g
                    key={item.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLabItem(item.name)}
                  >
                    {/* Hover Column highlight box (seen on Replay in Screenshot 3!) */}
                    {isHovered && (
                      <rect
                        x={xGroup - 10}
                        y="20"
                        width={barWidth * 2 + 16}
                        height="150"
                        fill="rgba(255, 255, 255, 0.05)"
                        rx="6"
                      />
                    )}

                    {/* Attacks Injected Bar (Slate / Grey) */}
                    <rect
                      x={xGroup}
                      y={yInj}
                      width={barWidth}
                      height={hInj}
                      rx="3"
                      fill="#475569"
                    />

                    {/* Successfully Quarantined Bar (Cyan) */}
                    <rect
                      x={xGroup + barWidth + 4}
                      y={yQua}
                      width={barWidth}
                      height={hQua}
                      rx="3"
                      fill="#06b6d4"
                    />

                    {/* Category Label */}
                    <text
                      x={xGroup + barWidth}
                      y="188"
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {item.name}
                    </text>

                    {/* EXACT Tooltip Card from Screenshot 3 on Replay */}
                    {isHovered && (
                      <g>
                        <rect
                          x={xGroup - 10}
                          y={yQua - 85}
                          width="180"
                          height="66"
                          rx="8"
                          fill="rgba(10, 18, 36, 0.95)"
                          stroke="rgba(6, 182, 212, 0.4)"
                          strokeWidth="1.2"
                          className="shadow-2xl"
                        />
                        <text
                          x={xGroup + 5}
                          y={yQua - 62}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {item.name} Attack
                        </text>
                        <text
                          x={xGroup + 5}
                          y={yQua - 46}
                          fill="#cbd5e1"
                          fontSize="10"
                          fontFamily="sans-serif"
                        >
                          Attacks Injected : {item.injected}
                        </text>
                        <text
                          x={xGroup + 5}
                          y={yQua - 30}
                          fill="#06b6d4"
                          fontSize="10"
                          fontFamily="sans-serif"
                        >
                          Successfully Quarantined : {item.quarantined} ({item.rate})
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend from Screenshot */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-cyan-900/30 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 bg-slate-600 rounded-sm" />
              <span>Attacks Injected</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 bg-cyan-400 rounded-sm" />
              <span>Successfully Quarantined</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 ACADEMIC & DEMO TOOLS SECTION (MATCHING SCREENSHOT BOTTOM & PROMPT) */}
      {/* ========================================================================= */}
      <div className="mt-8 pt-6 border-t border-cyan-500/25">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] font-cyber tracking-widest text-cyan-400 uppercase font-bold">
              ACADEMIC & DEMO EVALUATION TOOLS
            </span>
            <h3 className="font-cyber text-base font-bold text-white tracking-wide flex items-center gap-2 mt-0.5">
              <span>Interactive Evaluation Suite for Panel & Judges</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                FIPS 204 & QDS
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Click any tool below or from the sidebar to open complete technical modal walkthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tool 1: 12-Step Viva Demo */}
          <div className="hud-panel rounded-2xl p-5 border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-950/80 hover:border-indigo-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
                  TOOL 01
                </span>
              </div>
              <h4 className="font-cyber font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                12-Step Viva Demo
              </h4>
              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                Step-by-step interactive presentation flow crafted specifically for evaluation panels: document hashing, QDS key negotiation, adversarial tamper injection, and honeypot isolation.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-indigo-900/40 flex items-center gap-2">
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onOpenVivaDemo?.();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-cyber text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Launch Demo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onVoiceExplain?.(
                    'The 12-Step Viva Demo guides judges through the complete cryptographic verification and quantum honey-path diversion cycle, demonstrating end-to-end zero-trust containment.'
                  );
                }}
                title="Voice Readout"
                className="p-2 rounded-xl border border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/50 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tool 2: 7 Architecture Pillars */}
          <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-slate-950/80 hover:border-cyan-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  TOOL 02
                </span>
              </div>
              <h4 className="font-cyber font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                7 Architecture Pillars
              </h4>
              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                Comprehensive defense-in-depth breakdown: Air-Gapped Zero-Trust, Quantum Channel DNA, Instant Key Revocation (&lt;100ms), Proactive Deception, Local XAI, and Circadian Behavioral DNA.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-cyan-900/40 flex items-center gap-2">
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onOpenPillars?.();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-cyber text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Explore Pillars</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onVoiceExplain?.(
                    'The 7 Architecture Pillars define our defense-in-depth framework, ensuring zero external egress, physical quantum baseline tracking, and proactive deception.'
                  );
                }}
                title="Voice Readout"
                className="p-2 rounded-xl border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tool 3: About Research */}
          <div className="hud-panel rounded-2xl p-5 border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-slate-950/80 hover:border-purple-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  <BookOpen className="w-5 h-5 text-purple-400 group-hover:rotate-6 transition-transform" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  TOOL 03
                </span>
              </div>
              <h4 className="font-cyber font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                About Academic Research
              </h4>
              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                Academic motivation and standards grounding: NIST FIPS 204 ML-DSA-87 lattice cryptography, QDS BB84 phase stability, peer-reviewed citations, and mathematical guarantees.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center gap-2">
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onOpenResearch?.();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-cyber text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View Research</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playSoundFX('listen');
                  onVoiceExplain?.(
                    'Our research integrates quantum physical measurements with post-quantum lattice cryptography, moving beyond mathematical assumptions to continuous physical verification.'
                  );
                }}
                title="Voice Readout"
                className="p-2 rounded-xl border border-purple-500/30 text-purple-300 hover:bg-purple-950/50 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
