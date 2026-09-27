import React from 'react';
import {
  LayoutGrid,
  FileSignature,
  ShieldAlert,
  Target,
  BarChart3,
  Bell,
  FileText,
  Users,
  Atom,
  Settings,
  LogOut,
  Shield,
  Zap,
  Sparkles,
  Layers,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { AuthUser } from './LoginPage';

export type SidebarTab =
  | 'dashboard'
  | 'digital-signatures'
  | 'threat-detection'
  | 'attack-simulation'
  | 'analytics'
  | 'alerts'
  | 'reports'
  | 'users'
  | 'post-quantum'
  | 'settings';

interface QuantumSidebarProps {
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  unreadAlertsCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenVivaDemo?: () => void;
  onOpenPillars?: () => void;
  onOpenResearch?: () => void;
}

export const QuantumSidebar: React.FC<QuantumSidebarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  unreadAlertsCount = 7,
  isMobileOpen = false,
  onCloseMobile,
  onOpenVivaDemo,
  onOpenPillars,
  onOpenResearch,
}) => {
  const navItems = [
    {
      id: 'dashboard' as SidebarTab,
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'digital-signatures' as SidebarTab,
      label: 'Digital Signatures',
      icon: FileSignature,
    },
    {
      id: 'threat-detection' as SidebarTab,
      label: 'Threat Detection',
      icon: ShieldAlert,
      badge: 'Quantum',
      badgeColor: 'cyan',
    },
    {
      id: 'attack-simulation' as SidebarTab,
      label: 'Attack Simulation',
      icon: Target,
      badge: 'Lab',
      badgeColor: 'cyan',
    },
    {
      id: 'analytics' as SidebarTab,
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'alerts' as SidebarTab,
      label: 'Alerts',
      icon: Bell,
      badge: `${unreadAlertsCount}`,
      badgeColor: 'red',
    },
    {
      id: 'reports' as SidebarTab,
      label: 'Reports',
      icon: FileText,
    },
    {
      id: 'users' as SidebarTab,
      label: 'Users',
      icon: Users,
    },
    {
      id: 'post-quantum' as SidebarTab,
      label: 'Post-Quantum',
      icon: Atom,
      badge: 'FIPS 204',
      badgeColor: 'cyan',
    },
    {
      id: 'settings' as SidebarTab,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar matching Screenshots 1, 2, 3 exactly */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#030712] border-r border-cyan-500/20 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header Branding from Screenshot */}
        <div className="p-5 border-b border-cyan-500/15">
          <div className="flex items-center gap-3.5">
            {/* Cyan glowing circle with shield icon */}
            <div className="relative w-11 h-11 rounded-full border-2 border-cyan-400 bg-cyan-950/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.45)]">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h1 className="font-cyber font-black tracking-wider text-base text-white truncate">
                  QUANTUM SECURE
                </h1>
                <span className="font-cyber text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold tracking-widest uppercase">
                  PROTOTYPE
                </span>
              </div>
              <p className="text-[11px] text-cyan-400 font-sans tracking-wide">
                Cyber Threat Detection
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List from Screenshot */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-sans transition-all group ${
                    isActive
                      ? 'border border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-semibold'
                      : 'border border-transparent text-slate-300 hover:text-cyan-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]'
                          : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />
                    <span className={isActive ? 'text-cyan-300' : 'text-slate-300'}>
                      {item.label}
                    </span>
                  </div>

                  {/* Badges: Quantum, Lab, Red 7, FIPS 204 */}
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.badgeColor === 'red'
                          ? 'bg-rose-500 text-white shadow-[0_0_8px_rgba(244,63,94,0.6)] px-2.5'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ACADEMIC & DEMO TOOLS SECTION FROM SCREENSHOT */}
          <div className="pt-2 border-t border-cyan-900/40">
            <span className="block text-[10px] font-cyber tracking-wider text-slate-400 uppercase font-semibold mb-2 px-1">
              ACADEMIC & DEMO TOOLS
            </span>

            <div className="space-y-1.5">
              {/* 1. 12-Step Viva Demo */}
              <button
                onClick={() => {
                  onOpenVivaDemo?.();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-900/30 hover:border-indigo-400/60 text-indigo-300 text-xs font-sans font-medium transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 group-hover:animate-spin" />
                  <span>12-Step Viva Demo</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400/70 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 2. 7 Architecture Pillars */}
              <button
                onClick={() => {
                  onOpenPillars?.();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 hover:border-cyan-400 text-cyan-300 text-xs font-sans font-medium transition-all group shadow-[0_0_12px_rgba(6,182,212,0.15)]"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>7 Architecture Pillars</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400/70 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 3. About Research */}
              <button
                onClick={() => {
                  onOpenResearch?.();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30 hover:border-purple-400 text-purple-300 text-xs font-sans font-medium transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>About Research</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400/70 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Engine Status & User Profile Footer matching Screenshot */}
        <div className="p-3.5 border-t border-cyan-500/15 bg-slate-950/80">
          {/* Engine Status Block from Screenshot */}
          <div className="mb-3 px-2 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">ENGINE STATUS:</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-cyan-400/80 truncate mt-0.5">
              Quantum-Inspired Classical Sim
            </p>
          </div>

          {currentUser && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-300 shadow-inner">
                  {currentUser.avatar || 'D'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[9px] font-mono text-cyan-400 truncate">
                    {currentUser.role}
                  </p>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Logout from SOC"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
