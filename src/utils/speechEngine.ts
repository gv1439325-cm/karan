/**
 * MysterioTrap Unified Speech Synthesis Engine
 * Supports:
 * 1. Ultra-fast Native Browser Web Speech (zero latency, instant response)
 * 2. Studio Gemini Neural TTS (via gemini-3.8-flash-lite-tts on backend)
 */

import { playBase64Pcm, stopNeuralAudio, playSoundFX } from './audioEffects';

export type VoiceEngineType = 'native' | 'neural';

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  isNeural?: boolean;
}

export interface SpeechSettings {
  engine: VoiceEngineType;
  voiceName: string;
  rate: number;
  pitch: number;
  autoSpeak: boolean;
  continuousMode: boolean; // Keep listening after speaking
  language: 'auto' | 'en' | 'hi';
}

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  engine: 'native', // native for ultra-fast instant answers
  voiceName: '',
  rate: 1.05, // slightly snappy Jarvis speed
  pitch: 0.95, // slightly deeper Jarvis baritone
  autoSpeak: true,
  continuousMode: false,
  language: 'auto',
};

// Available neural voices from Gemini
export const NEURAL_VOICES = [
  { id: 'Fenrir', name: 'Fenrir (Deep Cybernetic Male)', lang: 'en-US', isNeural: true },
  { id: 'Puck', name: 'Puck (Youthful Articulate)', lang: 'en-US', isNeural: true },
  { id: 'Charon', name: 'Charon (Deep Resonant Jarvis)', lang: 'en-US', isNeural: true },
  { id: 'Kore', name: 'Kore (Calm Sophisticated Female)', lang: 'en-US', isNeural: true },
  { id: 'Zephyr', name: 'Zephyr (Smooth Natural)', lang: 'en-US', isNeural: true },
];

export class SpeechEngine {
  private static isSpeakingNative = false;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  /**
   * Fetch available browser voices
   */
  public static getBrowserVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return resolve([]);
      }

      let voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        return resolve(voices);
      }

      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };

      // Fallback timeout in case event doesn't fire
      setTimeout(() => {
        resolve(window.speechSynthesis.getVoices());
      }, 300);
    });
  }

  /**
   * Stop all ongoing speech (both native and neural)
   */
  public static stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopNeuralAudio();
    this.isSpeakingNative = false;
    this.currentUtterance = null;
  }

  /**
   * Speak text out loud using selected engine
   */
  public static async speak(
    text: string,
    settings: SpeechSettings,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): Promise<void> {
    this.stopSpeaking();

    const cleanText = text
      .replace(/[*#_`~>[\]]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .trim();

    if (!cleanText) {
      callbacks?.onEnd?.();
      return;
    }

    playSoundFX('speechStart');

    // Engine 1: Neural TTS (Gemini Studio Audio)
    if (settings.engine === 'neural') {
      try {
        callbacks?.onStart?.();
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText,
            voice: settings.voiceName || 'Fenrir',
          }),
        });

        if (!res.ok) {
          throw new Error('Neural TTS service returned error');
        }

        const data = await res.json();
        if (data?.audioBase64) {
          await playBase64Pcm(data.audioBase64, data.sampleRate || 24000);
          callbacks?.onEnd?.();
          return;
        } else {
          // Fallback to native if no audio
          await this.speakNative(cleanText, settings, callbacks);
          return;
        }
      } catch (err) {
        console.warn('Neural TTS failed, falling back to native engine:', err);
        // Seamless fallback to native
        await this.speakNative(cleanText, settings, callbacks);
        return;
      }
    }

    // Engine 2: Ultra-Fast Native Web Speech
    await this.speakNative(cleanText, settings, callbacks);
  }

  private static speakNative(
    text: string,
    settings: SpeechSettings,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        callbacks?.onError?.(new Error('SpeechSynthesis not supported'));
        callbacks?.onEnd?.();
        return resolve();
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;

      const voices = window.speechSynthesis.getVoices();

      // Detect if text contains Hindi Devanagari characters
      const hasDevanagari = /[\u0900-\u097F]/.test(text);

      if (settings.voiceName) {
        const found = voices.find((v) => v.name === settings.voiceName);
        if (found) utterance.voice = found;
      } else if (hasDevanagari || settings.language === 'hi') {
        // Find Hindi voice if available
        const hiVoice = voices.find((v) => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('lekha'));
        if (hiVoice) {
          utterance.voice = hiVoice;
        }
      } else {
        // Preferred English Jarvis voices: Google UK English Male, Daniel, George, Aaron, or default
        const jarvisVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('UK') ||
              v.name.includes('Daniel') ||
              v.name.includes('David'))
        );
        if (jarvisVoice) {
          utterance.voice = jarvisVoice;
        }
      }

      utterance.onstart = () => {
        this.isSpeakingNative = true;
        callbacks?.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeakingNative = false;
        this.currentUtterance = null;
        callbacks?.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        this.isSpeakingNative = false;
        this.currentUtterance = null;
        callbacks?.onError?.(e);
        callbacks?.onEnd?.();
        resolve();
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    });
  }
}
