import React, { useEffect, useRef } from 'react';
import { AssistantState } from './ArcReactorCore';

interface AudioWaveVisualizerProps {
  state: AssistantState;
  audioLevel: number; // 0 to 1
  className?: string;
}

export const AudioWaveVisualizer: React.FC<AudioWaveVisualizerProps> = ({
  state,
  audioLevel,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const barCount = 42;
      const barWidth = width / barCount - 2;

      // Color based on state
      let strokeColor = 'rgba(6, 182, 212, 0.7)';
      if (state === 'listening') strokeColor = 'rgba(16, 185, 129, 0.85)';
      if (state === 'thinking') strokeColor = 'rgba(245, 158, 11, 0.85)';
      if (state === 'speaking') strokeColor = 'rgba(34, 211, 238, 0.95)';

      // Draw center reference horizon
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render symmetric frequency spectrum bars
      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);
        const distFromCenter = Math.abs(i - barCount / 2) / (barCount / 2);
        const centerFactor = Math.cos(distFromCenter * (Math.PI / 2.2));

        let amplitude = 4; // idle baseline

        if (state === 'speaking' || state === 'listening') {
          // Dynamic wave based on live audio level + trigonometric harmonics
          const wave =
            Math.sin(phase + i * 0.3) * 0.4 +
            Math.sin(phase * 1.5 + i * 0.5) * 0.3 +
            0.5;
          amplitude = Math.max(
            4,
            audioLevel * 38 * centerFactor * wave + 3
          );
        } else if (state === 'thinking') {
          // Scanning pulse wave
          const scan = Math.sin(phase * 2 + i * 0.4) * 0.5 + 0.5;
          amplitude = 5 + scan * 18 * centerFactor;
        }

        const barHeight = Math.min(height - 4, amplitude * 2);
        const y = centerY - barHeight / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (state === 'listening') {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)');
          gradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.6)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.9)');
        } else if (state === 'thinking') {
          gradient.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
          gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.5)');
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0.9)');
        } else {
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.9)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.5)');
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0.9)');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += state === 'thinking' ? 0.08 : 0.05;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, audioLevel]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={420}
        height={56}
        className="w-full max-w-lg h-14 rounded-lg bg-slate-950/60 border border-cyan-500/20 shadow-inner"
      />
    </div>
  );
};
