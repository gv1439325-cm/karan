/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  Zap,
  Globe,
  Radio,
  Clock,
  ShieldCheck,
  Bell,
  Cpu,
  LogOut,
  Maximize2,
} from 'lucide-react';

// Components
import { LoginPage, AuthUser } from './components/LoginPage';
import { QuantumSidebar, SidebarTab } from './components/QuantumSidebar';
import { ArcReactorCore, AssistantState } from './components/ArcReactorCore';
import { AudioWaveVisualizer } from './components/AudioWaveVisualizer';
import { SettingsModal } from './components/SettingsModal';
import { PermissionsBanner } from './components/PermissionsBanner';
import { AttackWorkbench } from './components/AttackWorkbench';
import { QuantumVirtualPathMap } from './components/QuantumVirtualPathMap';
import { XAIDiagnosticCard } from './components/XAIDiagnosticCard';
import { DigitalSignatureModule } from './components/DigitalSignatureModule';
import { DashboardOverview } from './components/DashboardOverview';
import { ThreatDetectionModule } from './components/ThreatDetectionModule';
import { AnalyticsView } from './components/AnalyticsView';
import { AlertsView } from './components/AlertsView';
import { ReportsView } from './components/ReportsView';
import { UsersView } from './components/UsersView';
import { PostQuantumView } from './components/PostQuantumView';
import { SettingsView } from './components/SettingsView';
import { VivaDemoModal } from './components/VivaDemoModal';
import { ArchitecturePillarsModal } from './components/ArchitecturePillarsModal';
import { AboutResearchModal } from './components/AboutResearchModal';
import { Search, Mic, ChevronDown } from 'lucide-react';

// Utilities & Hooks
import { SpeechEngine, SpeechSettings, DEFAULT_SPEECH_SETTINGS } from './utils/speechEngine';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { playSoundFX } from './utils/audioEffects';
import { ATTACK_VECTORS } from './data/attackVectors';
import { AttackVector, EnterprisePermissions, SecurityEvent } from './types/security';

const DEFAULT_SECURITY_EVENTS: SecurityEvent[] = [
  {
    id: 'evt-01',
    timestamp: '10:48 AM',
    user: 'attacker_ip_192.88.1',
    event: 'Trojan Horse Optical Probe',
    threatType: 'Hardware Modulation Probe',
    riskScore: 94,
    severity: 'Critical',
    status: 'Diverted',
    virtualPathRouted: true,
  },
  {
    id: 'evt-02',
    timestamp: '10:42 AM',
    user: 'user_01_hq',
    event: 'QDS Signature Verification',
    threatType: 'Normal Channel',
    riskScore: 12,
    severity: 'Low',
    status: 'Verified',
  },
  {
    id: 'evt-03',
    timestamp: '10:39 AM',
    user: 'user_05_finance',
    event: 'Multiple Failed Verification Attempts',
    threatType: 'Brute Force Attack',
    riskScore: 89,
    severity: 'High',
    status: 'Blocked',
  },
  {
    id: 'evt-04',
    timestamp: '10:32 AM',
    user: 'user_02_legal',
    event: 'financial_report.pdf Content Alteration',
    threatType: 'Signature Tampering',
    riskScore: 92,
    severity: 'Critical',
    status: 'Blocked',
  },
  {
    id: 'evt-05',
    timestamp: '10:20 AM',
    user: 'user_08_ops',
    event: 'QDS Signature Generated (ML-DSA-87)',
    threatType: 'Normal Operation',
    riskScore: 8,
    severity: 'Low',
    status: 'Verified',
  },
];

export default function App() {
  // Authentication State - Defaults to null so Login Page is ALWAYS presented first on entry/refresh!
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Navigation Tab State (defaults to 'dashboard' matching the screenshot)
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Security Platform State
  const [permissions, setPermissions] = useState<EnterprisePermissions>({
    readOnlyTelemetryAccess: true,
    virtualPathRerouting: true,
  });

  const [activeAttack, setActiveAttack] = useState<AttackVector>(ATTACK_VECTORS[0]);
  const [isVirtualPathActive, setIsVirtualPathActive] = useState<boolean>(true);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(DEFAULT_SECURITY_EVENTS);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(7);

  // Voice Assistant State
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>(() => {
    try {
      const saved = localStorage.getItem('mysterio_settings');
      return saved ? { ...DEFAULT_SPEECH_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SPEECH_SETTINGS;
    } catch {
      return DEFAULT_SPEECH_SETTINGS;
    }
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVivaDemoOpen, setIsVivaDemoOpen] = useState(false);
  const [isPillarsOpen, setIsPillarsOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isVoicePanelOpen, setIsVoicePanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [speakingLevel, setSpeakingLevel] = useState(0);
  const [latestAnswer, setLatestAnswer] = useState<string>(
    'MysterioTrap Jarvis Core online, Boss. All QDS neural nodes and quantum telemetry systems operational.'
  );

  const speakingAnimRef = useRef<number | null>(null);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Voices
  useEffect(() => {
    SpeechEngine.getBrowserVoices().then((voices) => setBrowserVoices(voices));
  }, []);

  // Audio wave animation
  const startSpeakingWave = () => {
    let phase = 0;
    const animate = () => {
      phase += 0.15;
      const lvl = Math.abs(Math.sin(phase) * 0.7 + Math.cos(phase * 2.3) * 0.3);
      setSpeakingLevel(lvl);
      speakingAnimRef.current = requestAnimationFrame(animate);
    };
    speakingAnimRef.current = requestAnimationFrame(animate);
  };

  const stopSpeakingWave = () => {
    if (speakingAnimRef.current) {
      cancelAnimationFrame(speakingAnimRef.current);
      speakingAnimRef.current = null;
    }
    setSpeakingLevel(0);
  };

  // Speak custom explanation or alert
  const handleVoiceExplain = useCallback(
    async (textToSpeak: string) => {
      if (isMuted || !textToSpeak) return;

      SpeechEngine.stopSpeaking();
      stopSpeakingWave();

      setLatestAnswer(textToSpeak);
      setAssistantState('speaking');
      startSpeakingWave();

      await SpeechEngine.speak(textToSpeak, speechSettings, {
        onEnd: () => {
          stopSpeakingWave();
          setAssistantState('idle');
          if (speechSettings.continuousMode) {
            setTimeout(() => voiceRec.startListening(), 400);
          }
        },
        onError: () => {
          stopSpeakingWave();
          setAssistantState('idle');
        },
      });
    },
    [isMuted, speechSettings]
  );

  // Process query via Gemini
  const handleProcessQuery = useCallback(
    async (queryText: string) => {
      if (!queryText.trim()) return;

      SpeechEngine.stopSpeaking();
      stopSpeakingWave();

      setAssistantState('thinking');
      playSoundFX('processing');

      // Check for quick trigger commands
      const lower = queryText.toLowerCase();
      if (lower.includes('trojan') || lower.includes('optical probe')) {
        const v = ATTACK_VECTORS.find((a) => a.id === 'trojan-horse') || ATTACK_VECTORS[0];
        setActiveAttack(v);
        setIsVirtualPathActive(true);
      } else if (lower.includes('intercept') || lower.includes('resend')) {
        const v = ATTACK_VECTORS.find((a) => a.id === 'intercept-resend') || ATTACK_VECTORS[0];
        setActiveAttack(v);
        setIsVirtualPathActive(true);
      } else if (lower.includes('pns') || lower.includes('photon number')) {
        const v = ATTACK_VECTORS.find((a) => a.id === 'pns-attack') || ATTACK_VECTORS[0];
        setActiveAttack(v);
        setIsVirtualPathActive(true);
      }

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: queryText,
            language: speechSettings.language,
          }),
        });

        const data = await res.json();
        const text =
          data.text ||
          'I am MysterioTrap, online and monitoring your quantum security matrix. How can I assist you further, Boss?';
        setLatestAnswer(text);

        if (!isMuted) {
          setAssistantState('speaking');
          startSpeakingWave();

          await SpeechEngine.speak(text, speechSettings, {
            onEnd: () => {
              stopSpeakingWave();
              setAssistantState('idle');
              if (speechSettings.continuousMode) {
                setTimeout(() => voiceRec.startListening(), 400);
              }
            },
            onError: () => {
              stopSpeakingWave();
              setAssistantState('idle');
            },
          });
        } else {
          setAssistantState('idle');
        }
      } catch (e) {
        setAssistantState('idle');
        stopSpeakingWave();
      }
    },
    [isMuted, speechSettings]
  );

  // Voice recognition hook
  const voiceRec = useVoiceRecognition({
    language: speechSettings.language,
    onTranscriptComplete: (transcript) => {
      if (transcript.trim()) {
        handleProcessQuery(transcript.trim());
      }
    },
  });

  // Sync listening state
  useEffect(() => {
    if (voiceRec.isListening) {
      setAssistantState('listening');
    } else if (assistantState === 'listening') {
      setAssistantState('idle');
    }
  }, [voiceRec.isListening]);

  // Audio level
  const activeAudioLevel =
    assistantState === 'listening'
      ? voiceRec.micVolume
      : assistantState === 'speaking'
      ? speakingLevel
      : 0;

  // Login handler
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    sessionStorage.setItem('quantum_auth_user', JSON.stringify(user));
    localStorage.setItem('quantum_auth_user', JSON.stringify(user));
    playSoundFX('startup');

    // Spoken greeting as requested: "Hello sir, how are you? MysterioTrap is ready to help you."
    const greetingText = `Hello sir, how are you? MysterioTrap is ready to help you. Welcome to the Quantum Secure SOC, ${user.name}. Clearance level verified. All physical QDS nodes and attack detection systems are active.`;

    setTimeout(() => {
      handleVoiceExplain(greetingText);
    }, 400);
  };

  // Logout handler
  const handleLogout = () => {
    SpeechEngine.stopSpeaking();
    stopSpeakingWave();
    setCurrentUser(null);
    sessionStorage.removeItem('quantum_auth_user');
    localStorage.removeItem('quantum_auth_user');
    playSoundFX('stop');
  };

  // Launch attack scenario
  const handleSelectAttack = (attack: AttackVector) => {
    setActiveAttack(attack);
    setIsVirtualPathActive(attack.severity === 'Critical' || attack.severity === 'High');
    playSoundFX('alert');

    // Add security event
    const newEvent: SecurityEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: `attacker_sim_${Math.floor(Math.random() * 900 + 100)}`,
      event: attack.name,
      threatType: attack.concept,
      riskScore: attack.threatScore,
      severity: attack.severity === 'Baseline' ? 'Low' : attack.severity,
      status: attack.threatScore >= 60 ? 'Diverted' : 'Investigating',
      virtualPathRouted: attack.threatScore >= 60,
    };
    setSecurityEvents((prev) => [newEvent, ...prev.slice(0, 15)]);

    handleVoiceExplain(
      `Alert! ${attack.name} detected. Risk score ${attack.threatScore} percent. ${attack.xaiReason}. Traffic routed to Quantum Virtual Path.`
    );
  };

  const handleRetrainModel = (attackId: string) => {
    const vector = ATTACK_VECTORS.find((a) => a.id === attackId) || activeAttack;
    playSoundFX('listen');
    handleVoiceExplain(
      `Feedback acknowledged for ${vector.name}. Model weights updated on-premises without external egress.`
    );
  };

  // IF NOT LOGGED IN -> SHOW LOGIN PAGE FIRST!
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. EXACT SIDEBAR FROM SCREENSHOT */}
      <QuantumSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        unreadAlertsCount={unreadAlertsCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenVivaDemo={() => setIsVivaDemoOpen(true)}
        onOpenPillars={() => setIsPillarsOpen(true)}
        onOpenResearch={() => setIsResearchOpen(true)}
      />

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-cyber-grid">
        {/* TOP STATUS BAR */}
        <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Mobile Menu Toggle & Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="p-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 lg:hidden hover:bg-cyan-950/50"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-cyber font-black text-sm sm:text-base text-white uppercase tracking-wider">
                  {activeTab.replace('-', ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden sm:inline-block">
                  QDS ONLINE
                </span>
              </div>
            </div>

            {/* Middle Telemetry & Live Clock */}
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-cyan-300/80">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/20">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentTime}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentUser.clearanceLevel}</span>
              </div>
            </div>

            {/* Quick Actions Right */}
            <div className="flex items-center gap-2">
              {/* Mute Button */}
              <button
                onClick={() => {
                  if (!isMuted) {
                    SpeechEngine.stopSpeaking();
                    stopSpeakingWave();
                    setAssistantState('idle');
                  }
                  setIsMuted(!isMuted);
                }}
                className={`p-2 rounded-xl border transition-all ${
                  isMuted
                    ? 'border-red-500/40 bg-red-950/30 text-red-400'
                    : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                }`}
                title={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Hands-Free Button */}
              <button
                onClick={() =>
                  setSpeechSettings((prev) => ({ ...prev, continuousMode: !prev.continuousMode }))
                }
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  speechSettings.continuousMode
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_#10b981]'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                <Radio className={`w-3.5 h-3.5 ${speechSettings.continuousMode ? 'animate-pulse text-emerald-400' : ''}`} />
                <span>{speechSettings.continuousMode ? 'HANDS-FREE ON' : 'HANDS-FREE'}</span>
              </button>

              {/* Settings modal trigger */}
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-red-400 hover:border-red-500/40"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* 3. HERO VOICE COMPONENT: ALWAYS AT THE VERY TOP OF CONTENT (AS REQUESTED) */}
        <div className="p-4 sm:p-6 pb-2">
          <div className="hud-panel rounded-2xl p-5 border-cyan-500/35 bg-gradient-to-b from-slate-950/90 to-slate-900/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Arc Reactor Voice Core */}
              <div className="flex flex-col items-center">
                <ArcReactorCore
                  state={assistantState}
                  audioLevel={activeAudioLevel}
                  onClick={() => {
                    if (assistantState === 'speaking') {
                      SpeechEngine.stopSpeaking();
                      stopSpeakingWave();
                      setAssistantState('idle');
                    } else if (voiceRec.isListening) {
                      voiceRec.stopListening();
                    } else {
                      voiceRec.startListening();
                    }
                  }}
                  continuousMode={speechSettings.continuousMode}
                />
              </div>

              {/* Center & Right: Audio Wave, Live Speech Transcript & Jarvis Speech Box */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
                    <span className="font-cyber text-xs tracking-wider text-cyan-300 uppercase font-bold">
                      MysterioTrap Jarvis AI Voice Engine
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      [Gemini 3.8 Flash • Real-Time Voice]
                    </span>
                  </div>

                  <button
                    onClick={() => handleVoiceExplain(latestAnswer)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono border border-cyan-500/30 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Replay Voice</span>
                  </button>
                </div>

                {/* Audio Wave Visualizer */}
                <AudioWaveVisualizer state={assistantState} audioLevel={activeAudioLevel} />

                {/* Live Speech Recognition Transcript */}
                {(voiceRec.isListening || voiceRec.interimTranscript) && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-200 animate-in fade-in">
                    <span className="font-cyber font-bold block mb-0.5">LISTENING TO YOU:</span>
                    <p className="font-sans italic">"{voiceRec.interimTranscript || 'Speak now, MysterioTrap is listening...'}"</p>
                  </div>
                )}

                {/* Spoken Response Text */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                  <p className="font-medium">{latestAnswer}</p>
                </div>

                {/* Voice Quick-Action Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Explain Trojan Horse Attack',
                    'Divert Session to Honeypot',
                    'Verify financial_report.pdf',
                    'Apply Hadamard Gate',
                    'Kya haal hai MysterioTrap?',
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleProcessQuery(prompt)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-cyan-500/25 hover:border-cyan-400 text-[11px] text-slate-300 hover:text-cyan-200 transition-all font-mono"
                    >
                      ⚡ {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MAIN TAB WORKSPACE (DYNAMICALLY SWITCHED) */}
        <main className="p-4 sm:p-6 pt-2 flex-1">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <DashboardOverview
              events={securityEvents}
              onTriggerAttack={(attackId) => {
                const vector = ATTACK_VECTORS.find((a) => a.id === attackId) || ATTACK_VECTORS[0];
                handleSelectAttack(vector);
                setActiveTab('attack-simulation');
              }}
              onNavigateToTab={setActiveTab}
              onVoiceExplain={handleVoiceExplain}
            />
          )}

          {/* TAB 2: DIGITAL SIGNATURES */}
          {activeTab === 'digital-signatures' && (
            <DigitalSignatureModule
              onVoiceAnnounce={handleVoiceExplain}
              onSignatureTamperedAlert={(doc) => {
                const event: SecurityEvent = {
                  id: `evt-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  user: doc.user,
                  event: `${doc.fileName} verification failure (Hash collision)`,
                  threatType: 'Signature Tampering',
                  riskScore: 92,
                  severity: 'Critical',
                  status: 'Blocked',
                };
                setSecurityEvents((prev) => [event, ...prev]);
                setUnreadAlertsCount((c) => c + 1);
              }}
            />
          )}

          {/* TAB 3: THREAT DETECTION */}
          {activeTab === 'threat-detection' && (
            <ThreatDetectionModule onVoiceExplain={handleVoiceExplain} />
          )}

          {/* TAB 4: ATTACK SIMULATION (THE 4 JUDGE WORKBENCH COMPONENTS) */}
          {activeTab === 'attack-simulation' && (
            <div className="space-y-6">
              <PermissionsBanner
                permissions={permissions}
                onToggleTelemetry={() =>
                  setPermissions((prev) => ({ ...prev, readOnlyTelemetryAccess: !prev.readOnlyTelemetryAccess }))
                }
                onToggleGateRouting={() =>
                  setPermissions((prev) => ({ ...prev, virtualPathRerouting: !prev.virtualPathRerouting }))
                }
                onVoiceAnnounce={handleVoiceExplain}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttackWorkbench
                  activeAttackId={activeAttack.id}
                  onSelectAttack={handleSelectAttack}
                  onVoiceAnnounce={handleVoiceExplain}
                />

                <div className="space-y-6">
                  <QuantumVirtualPathMap
                    isRerouted={isVirtualPathActive}
                    onToggleReroute={() => setIsVirtualPathActive(!isVirtualPathActive)}
                    activeAttackName={activeAttack.name}
                    onVoiceAnnounce={handleVoiceExplain}
                  />

                  <XAIDiagnosticCard
                    attack={activeAttack}
                    onTrainFalseAlert={handleRetrainModel}
                    onVoiceExplain={handleVoiceExplain}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === 'analytics' && (
            <AnalyticsView
              onOpenVivaDemo={() => setIsVivaDemoOpen(true)}
              onOpenPillars={() => setIsPillarsOpen(true)}
              onOpenResearch={() => setIsResearchOpen(true)}
              onVoiceExplain={handleVoiceExplain}
            />
          )}

          {/* TAB 6: ALERTS */}
          {activeTab === 'alerts' && (
            <AlertsView
              onVoiceExplain={handleVoiceExplain}
              onUpdateAlertCount={setUnreadAlertsCount}
            />
          )}

          {/* TAB 7: REPORTS */}
          {activeTab === 'reports' && <ReportsView />}

          {/* TAB 8: USERS */}
          {activeTab === 'users' && <UsersView />}

          {/* TAB 9: POST-QUANTUM (FIPS 204 MATRIX + QUANTUM STATE GENESIS STUDIO) */}
          {activeTab === 'post-quantum' && (
            <PostQuantumView onVoiceExplain={handleVoiceExplain} />
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView
              permissions={permissions}
              onUpdatePermissions={(newP) => setPermissions((prev) => ({ ...prev, ...newP }))}
              speechSettings={speechSettings}
              onUpdateSpeechSettings={(newS) => {
                setSpeechSettings((prev) => {
                  const updated = { ...prev, ...newS };
                  localStorage.setItem('mysterio_settings', JSON.stringify(updated));
                  return updated;
                });
              }}
              browserVoices={browserVoices}
            />
          )}
        </main>
      </div>

      {/* SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={speechSettings}
        onUpdateSettings={(newS) => {
          setSpeechSettings((prev) => {
            const updated = { ...prev, ...newS };
            localStorage.setItem('mysterio_settings', JSON.stringify(updated));
            return updated;
          });
        }}
        browserVoices={browserVoices}
      />

      {/* 12-STEP VIVA DEMO MODAL */}
      <VivaDemoModal
        isOpen={isVivaDemoOpen}
        onClose={() => setIsVivaDemoOpen(false)}
        onVoiceExplain={handleVoiceExplain}
      />

      {/* 7 ARCHITECTURE PILLARS MODAL */}
      <ArchitecturePillarsModal
        isOpen={isPillarsOpen}
        onClose={() => setIsPillarsOpen(false)}
        onVoiceExplain={handleVoiceExplain}
      />

      {/* ABOUT ACADEMIC RESEARCH MODAL */}
      <AboutResearchModal
        isOpen={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
        onVoiceExplain={handleVoiceExplain}
      />
    </div>
  );
}
