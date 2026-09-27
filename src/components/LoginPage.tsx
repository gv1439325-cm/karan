import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, User, KeyRound, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { playSoundFX } from '../utils/audioEffects';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Security Analyst' | 'User';
  clearanceLevel: string;
  avatar: string;
}

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@quantumsecure.demo');
  const [password, setPassword] = useState('Admin@123');
  const [role, setRole] = useState<'Admin' | 'Security Analyst' | 'User'>('Admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide valid credentials.');
      return;
    }

    setIsLoading(true);
    playSoundFX('processing');

    setTimeout(() => {
      setIsLoading(false);
      playSoundFX('startup');

      const user: AuthUser = {
        id: role === 'Admin' ? 'usr-admin-01' : role === 'Security Analyst' ? 'usr-analyst-04' : 'usr-client-09',
        name: role === 'Admin' ? 'Dr. Alex Vance (Lead)' : role === 'Security Analyst' ? 'Marcus Brody (SOC L3)' : 'Elena Rostova (Operator)',
        email,
        role,
        clearanceLevel: role === 'Admin' ? 'LEVEL-5 QDS ROOT' : role === 'Security Analyst' ? 'LEVEL-3 THREAT OPS' : 'LEVEL-1 READ/SIGN',
        avatar: role === 'Admin' ? '👑' : role === 'Security Analyst' ? '🛡️' : '👤',
      };

      onLogin(user);
    }, 450);
  };

  const handleQuickLogin = (selectedRole: 'Admin' | 'Security Analyst' | 'User') => {
    setRole(selectedRole);
    if (selectedRole === 'Admin') {
      setEmail('admin@quantumsecure.demo');
      setPassword('Admin@123');
    } else if (selectedRole === 'Security Analyst') {
      setEmail('analyst@quantumsecure.demo');
      setPassword('Analyst@123');
    } else {
      setEmail('user@quantumsecure.demo');
      setPassword('User@123');
    }

    setIsLoading(true);
    playSoundFX('listen');

    setTimeout(() => {
      setIsLoading(false);
      playSoundFX('startup');
      onLogin({
        id: selectedRole === 'Admin' ? 'usr-admin-01' : selectedRole === 'Security Analyst' ? 'usr-analyst-04' : 'usr-client-09',
        name: selectedRole === 'Admin' ? 'Dr. Alex Vance (Lead)' : selectedRole === 'Security Analyst' ? 'Marcus Brody (SOC L3)' : 'Elena Rostova (Operator)',
        email: `${selectedRole.toLowerCase().replace(' ', '')}@quantumsecure.demo`,
        role: selectedRole,
        clearanceLevel: selectedRole === 'Admin' ? 'LEVEL-5 QDS ROOT' : selectedRole === 'Security Analyst' ? 'LEVEL-3 THREAT OPS' : 'LEVEL-1 READ/SIGN',
        avatar: selectedRole === 'Admin' ? '👑' : selectedRole === 'Security Analyst' ? '🛡️' : '👤',
      });
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center p-4 relative overflow-hidden bg-cyber-grid selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Glassmorphism Auth Card */}
      <div className="w-full max-w-md relative z-10 rounded-2xl border border-cyan-500/30 bg-slate-950/85 backdrop-blur-xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        {/* Exact Logo from Screenshot */}
        <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-cyan-500/20">
          <div className="relative w-12 h-12 rounded-full border-2 border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Shield className="w-6 h-6 text-cyan-300" />
            <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="font-cyber font-black tracking-wider text-lg text-white">
                QUANTUM SECURE
              </h1>
              <span className="font-cyber text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold tracking-widest uppercase">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-sans tracking-wide">
              Cyber Threat Detection
            </p>
          </div>
        </div>

        {/* Voice Assistant Ready Chip */}
        <div className="mb-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-semibold text-cyan-200">MysterioTrap Voice AI</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
              ONLINE • READY
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans flex items-center gap-1.5 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>"Hello sir, how are you? MysterioTrap is ready to help you."</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-cyber tracking-wider text-slate-300 uppercase mb-1.5">
              Enterprise Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@quantumsecure.demo"
                className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cyber tracking-wider text-slate-300 uppercase mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cyber tracking-wider text-slate-300 uppercase mb-1.5">
              Access Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Admin', 'Security Analyst', 'User'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                    role === r
                      ? 'border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r === 'Admin' ? '👑 Admin' : r === 'Security Analyst' ? '🛡️ Analyst' : '👤 User'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>AUTHENTICATING TELEMETRY...</span>
              </>
            ) : (
              <>
                <span>ENTER SECURITY DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick 1-Click Demo Login options */}
        <div className="mt-6 pt-5 border-t border-cyan-500/20">
          <p className="text-[11px] font-cyber tracking-wider text-slate-400 uppercase text-center mb-3">
            Quick 1-Click Demo Profiles
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('Admin')}
              className="py-1.5 px-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-[11px] text-cyan-300 font-mono transition-all text-center"
            >
              Admin Demo
            </button>
            <button
              onClick={() => handleQuickLogin('Security Analyst')}
              className="py-1.5 px-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 text-[11px] text-purple-300 font-mono transition-all text-center"
            >
              Analyst Demo
            </button>
            <button
              onClick={() => handleQuickLogin('User')}
              className="py-1.5 px-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono transition-all text-center"
            >
              User Demo
            </button>
          </div>
        </div>

        {/* Bottom Security Architecture Badges */}
        <div className="mt-5 flex items-center justify-center gap-3 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Zero-Trust
          </span>
          <span>•</span>
          <span>QDS Telemetry</span>
          <span>•</span>
          <span>FIPS 204 PQC</span>
        </div>
      </div>
    </div>
  );
};
