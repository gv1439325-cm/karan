import React from 'react';
import { Shield, Network, Lock, CheckCircle2, AlertTriangle, Info, Cpu } from 'lucide-react';
import { EnterprisePermissions } from '../types/security';

interface PermissionsBannerProps {
  permissions: EnterprisePermissions;
  onToggleTelemetry: () => void;
  onToggleGateRouting: () => void;
  onVoiceAnnounce?: (text: string) => void;
}

export const PermissionsBanner: React.FC<PermissionsBannerProps> = ({
  permissions,
  onToggleTelemetry,
  onToggleGateRouting,
  onVoiceAnnounce,
}) => {
  return (
    <div className="hud-panel rounded-2xl p-4 border border-cyan-500/30 bg-slate-950/80 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Enterprise Zero-Trust Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cyber font-bold text-sm tracking-wider text-cyan-200 uppercase">
                Enterprise Zero-Trust Security Gateway
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                AIR-GAPPED ON-PREM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Local telemetry ingestion • Zero external egress • Cryptographic keys strictly isolated within client boundary
            </p>
          </div>
        </div>

        {/* Right: The 2 Core Enterprise Permissions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Permission 1: Read-Only Physical Telemetry Access */}
          <div
            onClick={() => {
              onToggleTelemetry();
              onVoiceAnnounce?.(
                permissions.readOnlyTelemetryAccess
                  ? 'Warning Boss: Physical telemetry access paused. QBER and phase noise monitoring suspended.'
                  : 'Telemetry access confirmed Boss: Reading physical QBER, phase noise, and packet timing from QDS optical nodes.'
              );
            }}
            className={`flex-1 sm:flex-initial flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
              permissions.readOnlyTelemetryAccess
                ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200 hover:border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
            }`}
            title="Grants software read-only permission to ingest physical QBER, phase noise, and photon timing metrics"
          >
            <Cpu className={`w-4 h-4 ${permissions.readOnlyTelemetryAccess ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold flex items-center gap-1.5">
                <span>QDS Telemetry Access</span>
                {permissions.readOnlyTelemetryAccess ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                {permissions.readOnlyTelemetryAccess ? 'READ-ONLY GRANTED (QBER/PHASE)' : 'PERMISSION SUSPENDED'}
              </div>
            </div>
          </div>

          {/* Permission 2: Network Gate Permission (Virtual Path Rerouting) */}
          <div
            onClick={() => {
              onToggleGateRouting();
              onVoiceAnnounce?.(
                permissions.virtualPathRerouting
                  ? 'Network Gate Permission revoked. Automatic honeypot diversion disabled.'
                  : 'Network Gate Permission authorized Boss: Automatic diversion of compromised sessions to Quantum Virtual Path active.'
              );
            }}
            className={`flex-1 sm:flex-initial flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
              permissions.virtualPathRerouting
                ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-200 hover:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
            }`}
            title="Grants IT admin permission to trigger network routing rules (divert to Honeypot or block key)"
          >
            <Network className={`w-4 h-4 ${permissions.virtualPathRerouting ? 'text-cyan-400' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold flex items-center gap-1.5">
                <span>Network Gate Routing</span>
                {permissions.virtualPathRerouting ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                {permissions.virtualPathRerouting ? 'VIRTUAL PATH API AUTHORIZED' : 'ROUTING API PAUSED'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
