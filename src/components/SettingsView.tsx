import React from 'react';
import { Settings, Shield, Network, Sliders, Bell, Zap, Radio, Globe, Lock } from 'lucide-react';
import { EnterprisePermissions } from '../types/security';
import { SpeechSettings, NEURAL_VOICES } from '../utils/speechEngine';

interface SettingsViewProps {
  permissions: EnterprisePermissions;
  onUpdatePermissions: (perms: Partial<EnterprisePermissions>) => void;
  speechSettings: SpeechSettings;
  onUpdateSpeechSettings: (settings: Partial<SpeechSettings>) => void;
  browserVoices: SpeechSynthesisVoice[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  permissions,
  onUpdatePermissions,
  speechSettings,
  onUpdateSpeechSettings,
  browserVoices,
}) => {
  return (
    <div className="space-y-6">
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40">
        <h2 className="font-cyber text-xl font-black text-white tracking-wide flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          SOC Configuration & System Permissions
        </h2>
        <p className="text-sm text-slate-300 font-sans mt-1">
          Configure zero-trust enterprise hardware permissions, automated honeypot routing rules, and MysterioTrap AI voice settings.
        </p>
      </div>

      {/* Enterprise System Permissions Card (From prompt) */}
      <div className="hud-panel rounded-2xl p-6">
        <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          Enterprise Hardware & Network Gate Permissions
        </h3>

        <div className="space-y-4">
          {/* Permission 1: Telemetry Access */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="font-cyber text-xs font-bold text-white">
                  System Permission (Read-Only Telemetry Access)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ENTERPRISE GRANTED
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                The enterprise grants your software permission to read physical network metrics (such as QBER, phase noise, and packet timing) coming from Quantum Digital Signature (QDS) network cards or fiber nodes.
              </p>
            </div>

            <button
              onClick={() => onUpdatePermissions({ readOnlyTelemetryAccess: !permissions.readOnlyTelemetryAccess })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                permissions.readOnlyTelemetryAccess ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                  permissions.readOnlyTelemetryAccess ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Permission 2: Virtual Path Rerouting */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <span className="font-cyber text-xs font-bold text-white">
                  Network Gate Permission (Virtual Path Rerouting)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  API ROUTING ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                The IT admin grants the software API permission to trigger network routing rules (so it can divert bad traffic to the Quantum Virtual Path / Honeypot or block a compromised key in under 100 milliseconds).
              </p>
            </div>

            <button
              onClick={() => onUpdatePermissions({ virtualPathRerouting: !permissions.virtualPathRerouting })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                permissions.virtualPathRerouting ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                  permissions.virtualPathRerouting ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Voice Assistant Engine Settings Card */}
      <div className="hud-panel rounded-2xl p-6">
        <h3 className="font-cyber text-xs tracking-wider text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-300" />
          MysterioTrap Jarvis AI Voice Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
            <span className="text-xs font-cyber text-slate-300 uppercase block font-semibold">
              Synthesis Engine
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSpeechSettings({ engine: 'native' })}
                className={`p-2.5 rounded-lg border text-left text-xs ${
                  speechSettings.engine === 'native'
                    ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400'
                }`}
              >
                Instant Native Voice (&lt;100ms)
              </button>
              <button
                type="button"
                onClick={() => onUpdateSpeechSettings({ engine: 'neural' })}
                className={`p-2.5 rounded-lg border text-left text-xs ${
                  speechSettings.engine === 'neural'
                    ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400'
                }`}
              >
                Gemini Studio Neural TTS
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
            <span className="text-xs font-cyber text-slate-300 uppercase block font-semibold">
              Hands-Free Continuous Mode
            </span>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Keep listening for commands after MysterioTrap finishes speaking
              </p>
              <button
                type="button"
                onClick={() => onUpdateSpeechSettings({ continuousMode: !speechSettings.continuousMode })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  speechSettings.continuousMode ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    speechSettings.continuousMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
