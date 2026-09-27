import React from 'react';
import { Mic, MicOff, Volume2, Sparkles, Cpu } from 'lucide-react';

export type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface ArcReactorCoreProps {
  state: AssistantState;
  audioLevel: number; // 0 to 1
  onClick: () => void;
  continuousMode: boolean;
}

export const ArcReactorCore: React.FC<ArcReactorCoreProps> = ({
  state,
  audioLevel,
  onClick,
  continuousMode,
}) => {
  // Dynamic scale & glow calculated from audio level and state
  const pulseScale = 1 + (state === 'speaking' || state === 'listening' ? audioLevel * 0.28 : 0);
  const glowIntensity = Math.min(1, 0.4 + audioLevel * 0.6);

  // Color schemes based on state
  const getColorScheme = () => {
    switch (state) {
      case 'listening':
        return {
          primary: '#10b981', // emerald
          border: 'border-emerald-400',
          glow: 'rgba(16, 185, 129, 0.7)',
          accent: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          ringBorder: 'border-emerald-500/40',
        };
      case 'thinking':
        return {
          primary: '#f59e0b', // amber
          border: 'border-amber-400',
          glow: 'rgba(245, 158, 11, 0.7)',
          accent: 'text-amber-400',
          bg: 'bg-amber-500/10',
          ringBorder: 'border-amber-500/40',
        };
      case 'speaking':
        return {
          primary: '#06b6d4', // cyan
          border: 'border-cyan-400',
          glow: 'rgba(6, 182, 212, 0.85)',
          accent: 'text-cyan-300',
          bg: 'bg-cyan-500/15',
          ringBorder: 'border-cyan-400/50',
        };
      case 'idle':
      default:
        return {
          primary: '#0284c7', // sky
          border: 'border-cyan-500/40',
          glow: 'rgba(2, 132, 199, 0.4)',
          accent: 'text-cyan-400',
          bg: 'bg-cyan-950/20',
          ringBorder: 'border-cyan-500/20',
        };
    }
  };

  const colors = getColorScheme();

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* Outer Hologram Energy Ripples */}
      {(state === 'listening' || state === 'speaking') && (
        <>
          <div
            className="absolute rounded-full border border-cyan-400/30 animate-ping pointer-events-none"
            style={{
              width: `${280 + audioLevel * 90}px`,
              height: `${280 + audioLevel * 90}px`,
              borderColor: colors.primary,
              animationDuration: '2s',
            }}
          />
          <div
            className="absolute rounded-full border border-cyan-400/20 animate-ping pointer-events-none"
            style={{
              width: `${340 + audioLevel * 120}px`,
              height: `${340 + audioLevel * 120}px`,
              borderColor: colors.primary,
              animationDuration: '2.8s',
            }}
          />
        </>
      )}

      {/* Main Reactor Body Container */}
      <div
        onClick={onClick}
        className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95"
        style={{
          width: '280px',
          height: '280px',
        }}
      >
        {/* Layer 1: Outermost Tachometer Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed ${colors.ringBorder} ${
            state === 'thinking' ? 'animate-spin-medium' : 'animate-spin-slow'
          }`}
          style={{
            borderWidth: '2px',
          }}
        />

        {/* Layer 2: Reverse Rotating HUD Gyro Ring */}
        <div
          className={`absolute inset-4 rounded-full border border-dotted ${colors.ringBorder} ${
            state === 'thinking' ? 'animate-spin-slow' : 'animate-spin-reverse-slow'
          }`}
          style={{
            borderWidth: '2px',
          }}
        >
          {/* Orbital Tech Nodes on the ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </div>

        {/* Layer 3: Segmented Arc Ring */}
        <div className="absolute inset-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={colors.primary}
              strokeWidth="4"
              strokeDasharray="289"
              strokeDashoffset={
                state === 'thinking'
                  ? '70'
                  : state === 'speaking' || state === 'listening'
                  ? `${289 - (audioLevel * 200 + 40)}`
                  : '190'
              }
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
        </div>

        {/* Layer 4: Inner Core Reactor Orb */}
        <div
          className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center border-2 ${colors.border} ${colors.bg} backdrop-blur-md transition-all duration-300`}
          style={{
            transform: `scale(${pulseScale})`,
            boxShadow: `0 0 ${40 * glowIntensity}px ${colors.glow}, inset 0 0 ${24 * glowIntensity}px ${colors.glow}`,
          }}
        >
          {/* Subtle Grid / Circuit Lines in Core */}
          <div className="absolute inset-2 rounded-full border border-cyan-400/20 opacity-70" />

          {/* Central Icon / Status Symbol */}
          {state === 'listening' ? (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <Mic className="w-10 h-10 text-emerald-400 mb-1 drop-shadow-[0_0_10px_#10b981]" />
              <span className="font-cyber text-[10px] tracking-widest text-emerald-300 uppercase font-bold">
                LISTENING
              </span>
            </div>
          ) : state === 'thinking' ? (
            <div className="flex flex-col items-center justify-center">
              <Cpu className="w-10 h-10 text-amber-400 mb-1 animate-spin drop-shadow-[0_0_10px_#f59e0b]" style={{ animationDuration: '4s' }} />
              <span className="font-cyber text-[10px] tracking-widest text-amber-300 uppercase font-bold">
                SYNAPSE...
              </span>
            </div>
          ) : state === 'speaking' ? (
            <div className="flex flex-col items-center justify-center">
              <Volume2 className="w-10 h-10 text-cyan-300 mb-1 animate-bounce drop-shadow-[0_0_12px_#06b6d4]" />
              <span className="font-cyber text-[10px] tracking-widest text-cyan-300 uppercase font-bold">
                SPEAKING
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-400/80 flex items-center justify-center mb-1 shadow-[0_0_15px_#22d3ee]">
                <Mic className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="font-cyber text-[10px] tracking-widest text-cyan-400/90 uppercase font-semibold">
                TAP TO SPEAK
              </span>
            </div>
          )}

          {/* Live Level Indicator Ticks */}
          {(state === 'speaking' || state === 'listening') && (
            <div className="flex gap-1 items-end h-3 mt-1">
              {[0.4, 0.8, 1, 0.7, 0.5].map((factor, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-75"
                  style={{
                    backgroundColor: colors.primary,
                    height: `${Math.max(3, audioLevel * 14 * factor)}px`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Core Caption & Instructions */}
      <div className="mt-3 flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-emerald-400 animate-ping'
                : state === 'thinking'
                ? 'bg-amber-400 animate-bounce'
                : state === 'speaking'
                ? 'bg-cyan-400 animate-pulse'
                : 'bg-cyan-600'
            }`}
          />
          <span className="font-cyber text-xs uppercase tracking-wider text-cyan-200">
            {state === 'idle'
              ? 'MysterioTrap Core Standby'
              : state === 'listening'
              ? 'Receiving Audio Input...'
              : state === 'thinking'
              ? 'Computing Neural Solution...'
              : 'Voice Synthesis Active'}
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-1 max-w-xs font-mono">
          {continuousMode ? (
            <span className="text-emerald-400 font-semibold">
              ● Hands-Free Continuous Mode Active
            </span>
          ) : (
            'Tap reactor or click "Speak" to ask anything'
          )}
        </p>
      </div>
    </div>
  );
};
