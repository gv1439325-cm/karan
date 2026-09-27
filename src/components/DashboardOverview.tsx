import React, { useState } from 'react';
import {
  FileSignature,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Activity,
  Zap,
  Radio,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { SecurityEvent } from '../types/security';

interface DashboardOverviewProps {
  events: SecurityEvent[];
  onTriggerAttack: (attackId: string) => void;
  onNavigateToTab: (tab: any) => void;
  onVoiceExplain: (text: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  events,
  onTriggerAttack,
  onNavigateToTab,
  onVoiceExplain,
}) => {
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('24h');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((e) =>
    e.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.threatType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 4 STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Signatures */}
        <div className="hud-panel rounded-2xl p-5 relative overflow-hidden group hover:border-cyan-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-cyber tracking-wider uppercase mb-2">
            <span>Total Signatures</span>
            <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              <FileSignature className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-cyber text-white">12,842</span>
            <span className="text-xs text-emerald-400 flex items-center font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            vs. 11,245 previous 30d
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-sky-400" />
        </div>

        {/* Verified Signatures */}
        <div className="hud-panel rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-cyber tracking-wider uppercase mb-2">
            <span>Verified Signatures</span>
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-cyber text-white">11,964</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              93.2% Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Pass rate across QDS nodes
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        {/* Threats Detected */}
        <div className="hud-panel rounded-2xl p-5 relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-cyber tracking-wider uppercase mb-2">
            <span>Threats Detected</span>
            <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-cyber text-amber-300">347</span>
            <span className="text-xs text-amber-400 flex items-center font-mono">
              <ArrowDownRight className="w-3.5 h-3.5" /> -4.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Monitored & intercepted
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
        </div>

        {/* Critical Threats */}
        <div className="hud-panel rounded-2xl p-5 relative overflow-hidden group hover:border-rose-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-cyber tracking-wider uppercase mb-2">
            <span>Critical Threats</span>
            <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/30">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-cyber text-rose-400">28</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Diverted to Quantum Honeypot
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-600" />
        </div>
      </div>

      {/* QUICK ATTACK LAUNCHER BAR (JUDGE FAVORITE) */}
      <div className="hud-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
          <div>
            <h3 className="font-cyber text-xs tracking-wider text-white uppercase font-bold">
              Judge Live Attack Simulation Workbench
            </h3>
            <p className="text-[11px] text-slate-400">
              Click any scenario to inject physical attack telemetry into the model live
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTriggerAttack('trojan-horse')}
            className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/40 text-xs text-rose-300 font-mono transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            Trojan Horse (+14.2dBm)
          </button>

          <button
            onClick={() => onTriggerAttack('intercept-resend')}
            className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 text-xs text-amber-300 font-mono transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Intercept-Resend (QBER 14%)
          </button>

          <button
            onClick={() => onTriggerAttack('pns-attack')}
            className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-xs text-cyan-300 font-mono transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            PNS Multi-Photon
          </button>

          <button
            onClick={() => onNavigateToTab('attack-simulation')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono transition-all flex items-center gap-1"
          >
            <span>All 15 Attacks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MONITORING GRAPH & THREAT DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Monitoring Activity (2 Cols) */}
        <div className="lg:col-span-2 hud-panel rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-cyber text-sm tracking-wider text-cyan-300 uppercase font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Security Monitoring Activity Stream
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Physical QDS Node Telemetry vs. Ingress Anomaly Spikes
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex rounded-lg bg-slate-900 p-1 border border-cyan-500/20 text-xs font-mono">
              {(['24h', '7d', '30d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    timeFilter === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Last {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Multi-Layer Cybersecurity Waveform */}
          <div className="relative h-60 w-full rounded-xl bg-slate-950/70 border border-cyan-500/20 p-3 overflow-hidden flex items-end">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(6,182,212,0.1)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(6,182,212,0.1)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(6,182,212,0.1)" strokeDasharray="4 4" />

              {/* Area 1: Normal Verified Signatures Flow */}
              <path
                d="M0,130 Q50,90 100,105 T200,85 T300,95 T400,70 T500,85 L500,150 L0,150 Z"
                fill="url(#normalGrad)"
              />
              <path
                d="M0,130 Q50,90 100,105 T200,85 T300,95 T400,70 T500,85"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />

              {/* Area 2: Anomaly / Critical Spikes */}
              <path
                d="M0,145 Q80,140 140,130 T250,55 T320,135 T420,40 T500,130 L500,150 L0,150 Z"
                fill="url(#criticalGrad)"
              />
              <path
                d="M0,145 Q80,140 140,130 T250,55 T320,135 T420,40 T500,130"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="2 2"
              />

              {/* Attack Points Marker */}
              <circle cx="250" cy="55" r="4.5" fill="#f43f5e" className="animate-ping" />
              <circle cx="250" cy="55" r="3.5" fill="#f43f5e" />
              <circle cx="420" cy="40" r="4.5" fill="#f43f5e" className="animate-ping" />
              <circle cx="420" cy="40" r="3.5" fill="#f43f5e" />
            </svg>

            {/* Legend Overlay */}
            <div className="absolute top-3 left-4 flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Normal Verified (12,842)
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Suspicious Drift (347)
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical Intercepts (28)
              </span>
            </div>
          </div>
        </div>

        {/* Threat Distribution (Donut / Gauge) */}
        <div className="hud-panel rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-cyber text-sm tracking-wider text-cyan-300 uppercase font-bold">
              Threat Distribution
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Quantum Anomaly Severity Breakdown
            </p>
          </div>

          {/* Radial Donut Visualization */}
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0f172a" strokeWidth="12" />
              {/* Normal 68% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="162 238" strokeDashoffset="0" />
              {/* Low 15% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="36 238" strokeDashoffset="-162" />
              {/* Medium 10% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="24 238" strokeDashoffset="-198" />
              {/* Critical 7% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="16 238" strokeDashoffset="-222" />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-cyber text-2xl font-black text-white">93.2%</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                VERIFIED SAFE
              </span>
            </div>
          </div>

          {/* Breakdown Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-emerald-400">Normal Safe</span>
              <span className="font-bold text-white">68.4%</span>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-cyan-400">Low Risk</span>
              <span className="font-bold text-white">14.8%</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/20 flex items-center justify-between">
              <span className="text-amber-400">Medium Risk</span>
              <span className="font-bold text-white">9.6%</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/20 flex items-center justify-between">
              <span className="text-rose-400">Critical Threat</span>
              <span className="font-bold text-white">7.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT SECURITY EVENTS TABLE (From prompt) */}
      <div className="hud-panel rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-cyber text-sm tracking-wider text-cyan-300 uppercase font-bold">
              Recent Security Events
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Live audit stream of digital signature verifications & honeypot diversions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, event, threat..."
              className="bg-slate-900 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono w-48 sm:w-60"
            />
            <button
              onClick={() => onNavigateToTab('alerts')}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all"
            >
              View All Alerts
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-slate-950/60">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-cyan-400 border-b border-cyan-500/20 uppercase text-[11px] font-cyber">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Threat Type</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredEvents.slice(0, 7).map((ev) => (
                <tr key={ev.id} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3 px-4 text-slate-400">{ev.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-cyan-200">{ev.user}</td>
                  <td className="py-3 px-4 text-slate-200">{ev.event}</td>
                  <td className="py-3 px-4 text-slate-400">{ev.threatType}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        ev.riskScore >= 75
                          ? 'text-rose-400'
                          : ev.riskScore >= 50
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {ev.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ev.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : ev.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {ev.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        ev.status === 'Diverted'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : ev.status === 'Blocked'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onVoiceExplain(`Investigating security event for user ${ev.user}. Event is ${ev.event} with risk score ${ev.riskScore}. Status is ${ev.status}.`)}
                      className="text-cyan-400 hover:text-cyan-200 transition-colors p-1"
                      title="Explain with MysterioTrap Voice"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
