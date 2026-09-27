import React, { useState } from 'react';
import { Bell, Filter, CheckCircle2, ShieldAlert, AlertTriangle, XCircle, Search, ExternalLink } from 'lucide-react';

export interface AlertItem {
  id: string;
  timestamp: string;
  threatType: string;
  user: string;
  riskScore: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Investigating' | 'Resolved' | 'Dismissed';
  details: string;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-9042',
    timestamp: '10:48 AM',
    threatType: 'Trojan Horse Optical Probe',
    user: 'attacker_ip_192.88.1',
    riskScore: 94,
    severity: 'Critical',
    status: 'New',
    details: 'Ingress optical power exceeded by +14.2 dBm. Modulator probe detected.',
  },
  {
    id: 'ALT-9039',
    timestamp: '10:39 AM',
    threatType: 'Multiple Failed Signatures (Brute Force)',
    user: 'user_05_finance',
    riskScore: 89,
    severity: 'High',
    status: 'Investigating',
    details: '5 consecutive failed signature validation requests in 12 seconds.',
  },
  {
    id: 'ALT-9032',
    timestamp: '10:32 AM',
    threatType: 'Signature Tampering & Hash Collision',
    user: 'user_02_legal',
    riskScore: 92,
    severity: 'Critical',
    status: 'New',
    details: 'financial_report.pdf modified post-signature. SHA-256 verification failed.',
  },
  {
    id: 'ALT-9028',
    timestamp: '10:15 AM',
    threatType: 'Intercept-Resend Measurement',
    user: 'unknown_tap_node',
    riskScore: 88,
    severity: 'Critical',
    status: 'New',
    details: 'QBER spiked to 14.2% on fiber segment alpha. State entropy dropped by 42%.',
  },
  {
    id: 'ALT-9024',
    timestamp: '09:55 AM',
    threatType: 'Night-Time Behavioral Anomaly',
    user: 'dr_vance_exec',
    riskScore: 78,
    severity: 'High',
    status: 'New',
    details: 'Login at 03:14 AM from unusual location (Singapore vs. London baseline).',
  },
  {
    id: 'ALT-9018',
    timestamp: '09:20 AM',
    threatType: 'Photon Number Splitting (PNS)',
    user: 'quantum_sniffer_08',
    riskScore: 82,
    severity: 'High',
    status: 'Investigating',
    details: 'Multi-photon pulses tapped on weak coherent laser pulses.',
  },
  {
    id: 'ALT-9011',
    timestamp: '08:44 AM',
    threatType: 'Environmental Noise (Subway Fiber Vibration)',
    user: 'system_channel_node',
    riskScore: 42,
    severity: 'Medium',
    status: 'Resolved',
    details: 'Marked as false positive by analyst. Baseline retrained locally.',
  },
];

interface AlertsViewProps {
  onVoiceExplain: (text: string) => void;
  onUpdateAlertCount?: (count: number) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  onVoiceExplain,
  onUpdateAlertCount,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const handleUpdateStatus = (id: string, newStatus: AlertItem['status']) => {
    setAlerts((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
      const activeCount = updated.filter((a) => a.status === 'New' || a.status === 'Investigating').length;
      onUpdateAlertCount?.(activeCount);
      return updated;
    });

    if (selectedAlert && selectedAlert.id === id) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchesFilter =
      severityFilter === 'All' ||
      (severityFilter === 'Resolved' ? a.status === 'Resolved' : a.severity === severityFilter);
    const matchesSearch =
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.threatType.toLowerCase().includes(search.toLowerCase()) ||
      a.user.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-cyber text-xl font-black text-white tracking-wide flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-400" />
            Security Threat Alert Management
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-1">
            Real-time critical threat dispatches, quantum honeypot routing alarms, and analyst triaging.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {['All', 'Critical', 'High', 'Medium', 'Resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setSeverityFilter(f)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                severityFilter === f
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alerts Table */}
      <div className="hud-panel rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Alert ID, threat type, user..."
            className="w-full max-w-sm bg-slate-900 border border-cyan-500/30 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400"
          />
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-slate-950/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-cyan-400 border-b border-cyan-500/20 uppercase text-[11px] font-cyber">
              <tr>
                <th className="py-3 px-4">Alert ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Threat Type</th>
                <th className="py-3 px-4">Target / User</th>
                <th className="py-3 px-4">Threat Score</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Triage Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredAlerts.map((alt) => (
                <tr key={alt.id} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{alt.id}</td>
                  <td className="py-3 px-4 text-slate-400">{alt.timestamp}</td>
                  <td className="py-3 px-4 text-white font-medium">{alt.threatType}</td>
                  <td className="py-3 px-4 text-slate-400">{alt.user}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        alt.riskScore >= 75
                          ? 'text-rose-400'
                          : alt.riskScore >= 50
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {alt.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alt.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : alt.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {alt.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        alt.status === 'New'
                          ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                          : alt.status === 'Investigating'
                          ? 'bg-amber-500/20 text-amber-300'
                          : alt.status === 'Resolved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {alt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedAlert(alt);
                          onVoiceExplain(
                            `Alert ${alt.id}: ${alt.threatType} detected on user ${alt.user}. Risk score ${alt.riskScore}. Diagnostic: ${alt.details}`
                          );
                        }}
                        className="px-2 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-[10px] text-cyan-300 transition-all"
                      >
                        Details
                      </button>
                      {alt.status !== 'Resolved' && (
                        <button
                          onClick={() => handleUpdateStatus(alt.id, 'Resolved')}
                          className="px-2 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-[10px] text-emerald-300 transition-all"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Alert Modal / Drawer */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-2xl text-slate-100 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="font-cyber text-sm font-bold text-cyan-300">
                {selectedAlert.id} • Forensic Investigation
              </span>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Threat Type:</span>
                <span className="text-white font-bold">{selectedAlert.threatType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attacker Target:</span>
                <span className="text-cyan-300">{selectedAlert.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Risk Score:</span>
                <span className="text-rose-400 font-bold">{selectedAlert.riskScore}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-slate-300 font-sans">
                <span className="text-xs font-cyber text-cyan-400 block mb-1">XAI Diagnostic:</span>
                {selectedAlert.details}
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-500/20 flex justify-end gap-2">
              <button
                onClick={() => handleUpdateStatus(selectedAlert.id, 'Dismissed')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedAlert.id, 'Resolved');
                  setSelectedAlert(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-cyber font-bold text-xs uppercase"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
