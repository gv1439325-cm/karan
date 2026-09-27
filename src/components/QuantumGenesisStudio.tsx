import React, { useState, useEffect, useRef } from 'react';
import {
  Atom,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  Undo2,
  TrendingUp,
  BarChart2,
  Target,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { QuantumStateVector, BlochCoordinates } from '../types/security';

interface QuantumGenesisStudioProps {
  onVoiceExplain?: (text: string) => void;
}

export const QuantumGenesisStudio: React.FC<QuantumGenesisStudioProps> = ({
  onVoiceExplain,
}) => {
  const onVoiceAnnounce = onVoiceExplain;
  // Qubit state representation: |ψ> = α|0> + β|1>
  const [alpha, setAlpha] = useState<number>(1);
  const [beta, setBeta] = useState<number>(0);
  const [stateName, setStateName] = useState<string>('|0⟩');
  const [gateHistory, setGateHistory] = useState<string[]>([]);
  const [measurementBasis, setMeasurementBasis] = useState<'Z' | 'X' | 'Y'>('Z');
  const [isMeasured, setIsMeasured] = useState(false);
  const [lastMeasuredOutcome, setLastMeasuredOutcome] = useState<string | null>(null);

  // Shots Experiment state
  const [numShots, setNumShots] = useState<number>(1000);
  const [shotResults, setShotResults] = useState<{ [key: string]: number }>({
    '0': 1000,
    '1': 0,
  });
  const [isRunningShots, setIsRunningShots] = useState(false);
  const [isGuidedRunning, setIsGuidedRunning] = useState(false);

  // Canvas ref for Bloch Sphere
  const blochCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Normalization: Ensure |α|² + |β|² = 1
  const norm = Math.sqrt(alpha * alpha + beta * beta) || 1;
  const normAlpha = alpha / norm;
  const normBeta = beta / norm;

  const prob0 = normAlpha * normAlpha;
  const prob1 = normBeta * normBeta;

  // Calculate Bloch coordinates (X, Y, Z)
  // |ψ> = cos(θ/2)|0> + e^(iφ)sin(θ/2)|1>
  const theta = 2 * Math.acos(Math.max(-1, Math.min(1, Math.abs(normAlpha))));
  const phi = normBeta < 0 ? Math.PI : 0;
  const blochX = Math.sin(theta) * Math.cos(phi);
  const blochY = Math.sin(theta) * Math.sin(phi);
  const blochZ = Math.cos(theta) * (normAlpha >= 0 ? 1 : -1);

  // Render Bloch Sphere on HTML5 Canvas
  useEffect(() => {
    const canvas = blochCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 80;

    // Draw Outer Sphere Outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw Equator Ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.35, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw Z Axis (Vertical)
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 15);
    ctx.lineTo(cx, cy + radius + 15);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.stroke();

    // Draw X Axis (Diagonal 3D)
    ctx.beginPath();
    ctx.moveTo(cx - radius * 0.8, cy + radius * 0.4);
    ctx.lineTo(cx + radius * 0.8, cy - radius * 0.4);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.stroke();

    // Pole Labels
    ctx.font = '11px JetBrains Mono';
    ctx.fillStyle = '#22d3ee';
    ctx.fillText('|0⟩ (+Z)', cx + 8, cy - radius - 6);
    ctx.fillText('|1⟩ (-Z)', cx + 8, cy + radius + 14);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('+X', cx + radius * 0.8 + 4, cy - radius * 0.4);
    ctx.fillText('-X', cx - radius * 0.8 - 20, cy + radius * 0.4 + 4);

    // Calculate state vector arrow tip on 2D projection
    // Projection: x_proj = X * cos(-30°) - Y * sin(30°), y_proj = -Z + ...
    const px = cx + (blochX * 0.7 - blochY * 0.3) * radius;
    const py = cy - blochZ * radius + (blochX * 0.25) * radius * 0.35;

    // State Vector Line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.stroke();

    // State Vector Glow Tip
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  }, [blochX, blochY, blochZ]);

  // Set Preset States
  const handleSelectPreset = (preset: '|0⟩' | '|1⟩' | '|+⟩' | '|-⟩') => {
    setIsMeasured(false);
    setLastMeasuredOutcome(null);
    if (preset === '|0⟩') {
      setAlpha(1);
      setBeta(0);
      setStateName('|0⟩');
      onVoiceAnnounce?.('Initialized quantum state to ket 0. Probability of measuring zero is one hundred percent.');
    } else if (preset === '|1⟩') {
      setAlpha(0);
      setBeta(1);
      setStateName('|1⟩');
      onVoiceAnnounce?.('Initialized quantum state to ket 1. Probability of measuring one is one hundred percent.');
    } else if (preset === '|+⟩') {
      setAlpha(1 / Math.SQRT2);
      setBeta(1 / Math.SQRT2);
      setStateName('|+⟩');
      onVoiceAnnounce?.('Prepared superposition state plus. Equal fifty percent probability for zero and one.');
    } else if (preset === '|-⟩') {
      setAlpha(1 / Math.SQRT2);
      setBeta(-1 / Math.SQRT2);
      setStateName('|-⟩');
      onVoiceAnnounce?.('Prepared state minus. Equal amplitudes with pi phase inversion.');
    }
  };

  // Apply Quantum Gates
  const handleApplyGate = (gate: 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T') => {
    setIsMeasured(false);
    setLastMeasuredOutcome(null);
    let newAlpha = normAlpha;
    let newBeta = normBeta;

    switch (gate) {
      case 'X': // Bit flip: [0 1; 1 0]
        newAlpha = normBeta;
        newBeta = normAlpha;
        break;
      case 'Z': // Phase flip: [1 0; 0 -1]
        newBeta = -normBeta;
        break;
      case 'Y': // Bit + phase flip
        newAlpha = -normBeta;
        newBeta = normAlpha;
        break;
      case 'H': // Hadamard superposition: 1/√2 [1 1; 1 -1]
        newAlpha = (normAlpha + normBeta) / Math.SQRT2;
        newBeta = (normAlpha - normBeta) / Math.SQRT2;
        break;
      case 'S': // Phase gate (pi/2)
        newBeta = normBeta;
        break;
      case 'T': // pi/4 gate
        newBeta = normBeta;
        break;
    }

    setAlpha(newAlpha);
    setBeta(newBeta);
    setGateHistory((prev) => [...prev, gate]);
    setStateName('Custom');

    onVoiceAnnounce?.(`Applied quantum ${gate} gate to state vector. Bloch coordinates updated.`);
  };

  // Perform Projective Measurement
  const handlePerformMeasurement = () => {
    const random = Math.random();
    let outcome = '0';

    if (measurementBasis === 'Z') {
      outcome = random < prob0 ? '0' : '1';
    } else if (measurementBasis === 'X') {
      // Probability in X basis
      const probPlus = Math.pow((normAlpha + normBeta) / Math.SQRT2, 2);
      outcome = random < probPlus ? '+ (0)' : '- (1)';
    } else {
      outcome = random < 0.5 ? '0' : '1';
    }

    setIsMeasured(true);
    setLastMeasuredOutcome(outcome);

    // State collapse
    if (outcome === '0' || outcome.includes('+')) {
      setAlpha(1);
      setBeta(0);
      setStateName('|0⟩');
    } else {
      setAlpha(0);
      setBeta(1);
      setStateName('|1⟩');
    }

    onVoiceAnnounce?.(
      `Projective measurement executed in ${measurementBasis} basis. Wave function collapsed to outcome ${outcome}.`
    );
  };

  // Run Repeated Measurement Shots
  const handleRunShots = () => {
    setIsRunningShots(true);
    setTimeout(() => {
      let count0 = 0;
      let count1 = 0;

      for (let i = 0; i < numShots; i++) {
        if (Math.random() < prob0) {
          count0++;
        } else {
          count1++;
        }
      }

      setShotResults({ '0': count0, '1': count1 });
      setIsRunningShots(false);

      onVoiceAnnounce?.(
        `Completed ${numShots} projective measurement shots. Outcome zero observed ${count0} times, outcome one observed ${count1} times.`
      );
    }, 400);
  };

  // Step-by-Step Guided Experiment
  const handleStartGuided = () => {
    setIsGuidedRunning(true);
    handleSelectPreset('|0⟩');

    setTimeout(() => {
      handleApplyGate('H');
      setTimeout(() => {
        handlePerformMeasurement();
        setTimeout(() => {
          handleRunShots();
          setIsGuidedRunning(false);
        }, 1500);
      }, 2000);
    }, 2000);
  };

  // Dynamic explanation text
  const getExplanation = () => {
    if (isMeasured) {
      return `A projective measurement in the ${measurementBasis}-basis produced outcome ${lastMeasuredOutcome}. The wave function has now collapsed irreversibly into state |${lastMeasuredOutcome}⟩.`;
    }
    if (Math.abs(prob0 - 0.5) < 0.02) {
      return `The qubit is in an equal superposition: |ψ⟩ = (|0⟩ + |1⟩)/√2. If measured in the Z-basis, there is exactly a 50% probability of collapsing to |0⟩ and 50% probability of collapsing to |1⟩.`;
    }
    if (prob0 > 0.98) {
      return `The qubit is in ground state |0⟩. A projective Z-basis measurement will yield 0 with 100% deterministic certainty.`;
    }
    if (prob1 > 0.98) {
      return `The qubit is in excited state |1⟩. A projective Z-basis measurement will yield 1 with 100% deterministic certainty.`;
    }
    return `The qubit is in arbitrary superposition |ψ⟩ = ${(normAlpha).toFixed(3)}|0⟩ + ${(normBeta).toFixed(3)}|1⟩ with Born probability P(0) = ${(prob0 * 100).toFixed(1)}% and P(1) = ${(prob1 * 100).toFixed(1)}%.`;
  };

  return (
    <div className="hud-panel rounded-2xl p-5 border border-cyan-500/30 bg-slate-950/85 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            <h3 className="font-cyber font-bold text-base tracking-wider text-cyan-200 uppercase">
              Quantum State Genesis & Projective Measurement Studio
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Interactive single-qubit simulator • Bloch sphere visualization • Quantum gate circuit • Born-rule collapse
          </p>
        </div>

        {/* Guided Mode & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartGuided}
            disabled={isGuidedRunning}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isGuidedRunning ? 'RUNNING EXPERIMENT...' : 'START GUIDED EXPERIMENT'}</span>
          </button>

          <button
            onClick={() => {
              handleSelectPreset('|0⟩');
              setGateHistory([]);
            }}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset Experiment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: State Genesis & Gate Studio */}
        <div className="lg:col-span-4 space-y-4">
          {/* Preset States Selection */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
            <span className="text-xs font-cyber uppercase tracking-wider text-cyan-300 block mb-2 font-bold">
              1. Initial State Genesis
            </span>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {(['|0⟩', '|1⟩', '|+⟩', '|-⟩'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleSelectPreset(preset)}
                  className={`py-2 rounded-lg font-cyber font-bold text-xs border transition-all ${
                    stateName === preset
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom Amplitude Sliders */}
            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-400 mb-0.5">
                  <span>Amplitude α (|0⟩)</span>
                  <span className="text-cyan-300 font-bold">{normAlpha.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.05"
                  value={alpha}
                  onChange={(e) => {
                    setAlpha(parseFloat(e.target.value));
                    setStateName('Custom');
                  }}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-0.5">
                  <span>Amplitude β (|1⟩)</span>
                  <span className="text-purple-300 font-bold">{normBeta.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.05"
                  value={beta}
                  onChange={(e) => {
                    setBeta(parseFloat(e.target.value));
                    setStateName('Custom');
                  }}
                  className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="text-[10px] text-slate-500 pt-1">
                Normalizing Condition: |α|² + |β|² = {(prob0 + prob1).toFixed(2)} = 1.00
              </div>
            </div>
          </div>

          {/* Quantum Gate Studio */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
            <span className="text-xs font-cyber uppercase tracking-wider text-cyan-300 block mb-2 font-bold">
              2. Quantum Gate Studio
            </span>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['H', 'X', 'Z', 'Y', 'S', 'T'] as const).map((gate) => (
                <button
                  key={gate}
                  onClick={() => handleApplyGate(gate)}
                  className="py-2 rounded-lg font-cyber font-bold text-xs bg-slate-950 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40 transition-all shadow-sm"
                >
                  {gate} Gate
                </button>
              ))}
            </div>

            {/* Circuit / History */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Circuit:</span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[180px]">
                {gateHistory.length === 0 ? (
                  <span className="text-slate-500 italic">No gates applied</span>
                ) : (
                  gateHistory.map((g, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold"
                    >
                      {g}
                    </span>
                  ))
                )}
              </div>
              {gateHistory.length > 0 && (
                <button
                  onClick={() => setGateHistory([])}
                  className="text-slate-500 hover:text-red-400 text-[10px]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Bloch Sphere & State Vector */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
          <span className="text-xs font-cyber uppercase tracking-wider text-cyan-300 font-bold mb-1">
            3D Bloch Sphere Visualization
          </span>

          {/* Canvas Bloch Sphere */}
          <div className="relative my-2">
            <canvas
              ref={blochCanvasRef}
              width={220}
              height={220}
              className="rounded-full bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            />
          </div>

          {/* Coordinates & Vector Output */}
          <div className="w-full space-y-1.5 text-xs font-mono bg-slate-950/70 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Current State |ψ⟩:</span>
              <span className="text-amber-300 font-bold">
                {normAlpha.toFixed(2)}|0⟩ + {normBeta.toFixed(2)}|1⟩
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Coordinates:</span>
              <span>
                X: <strong className="text-cyan-300">{blochX.toFixed(2)}</strong> | Y:{' '}
                <strong className="text-cyan-300">{blochY.toFixed(2)}</strong> | Z:{' '}
                <strong className="text-cyan-300">{blochZ.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Projective Measurement & Shots */}
        <div className="lg:col-span-4 space-y-4">
          {/* Measurement Studio */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
            <span className="text-xs font-cyber uppercase tracking-wider text-cyan-300 block mb-2 font-bold">
              3. Projective Measurement
            </span>

            {/* Basis Selection */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-slate-400">Basis:</span>
              {(['Z', 'X', 'Y'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setMeasurementBasis(b)}
                  className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    measurementBasis === b
                      ? 'border-purple-400 bg-purple-950/60 text-purple-200'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  {b}-Basis
                </button>
              ))}
            </div>

            {/* Born Rule Probabilities */}
            <div className="space-y-1.5 text-xs font-mono mb-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>P(0) Probability</span>
                  <span className="text-cyan-400 font-bold">{(prob0 * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${prob0 * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>P(1) Probability</span>
                  <span className="text-purple-400 font-bold">{(prob1 * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${prob1 * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Big Perform Measurement Button */}
            <button
              onClick={handlePerformMeasurement}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" />
              <span>PERFORM PROJECTIVE MEASUREMENT</span>
            </button>

            {isMeasured && (
              <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-center text-xs font-mono text-emerald-200 animate-in fade-in duration-200">
                Collapsed State Outcome: <strong>|{lastMeasuredOutcome}⟩</strong>
              </div>
            )}
          </div>

          {/* Repeated Shots Simulator */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-cyber uppercase tracking-wider text-cyan-300 font-bold">
                Repeated Shots ({numShots})
              </span>
              <select
                value={numShots}
                onChange={(e) => setNumShots(parseInt(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 rounded px-1.5 py-0.5"
              >
                <option value={10}>10 shots</option>
                <option value={100}>100 shots</option>
                <option value={500}>500 shots</option>
                <option value={1000}>1,000 shots</option>
                <option value={5000}>5,000 shots</option>
              </select>
            </div>

            <button
              onClick={handleRunShots}
              disabled={isRunningShots}
              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors mb-2.5 flex items-center justify-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isRunningShots ? 'Sampling Quantum Distribution...' : 'RUN SHOTS EXPERIMENT'}</span>
            </button>

            {/* Shots Distribution Chart */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-300">0: {shotResults['0']} ({(shotResults['0'] / numShots * 100).toFixed(1)}%)</span>
                <span className="text-purple-300">1: {shotResults['1']} ({(shotResults['1'] / numShots * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full flex overflow-hidden">
                <div
                  className="bg-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${(shotResults['0'] / numShots) * 100}%` }}
                />
                <div
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${(shotResults['1'] / numShots) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL EXPLANATION PANEL & VOICE NARRATION */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-cyber text-xs tracking-wider text-cyan-300 uppercase font-bold">
              What Is Happening? (Physics Diagnostic)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {getExplanation()}
          </p>
        </div>

        <button
          onClick={() => onVoiceExplain?.(getExplanation())}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
        >
          <Volume2 className="w-4 h-4 text-cyan-400" />
          <span>🔊 Explain via Voice</span>
        </button>
      </div>
    </div>
  );
};
