import { useState, useEffect, useRef, useCallback } from 'react';
import { playSoundFX } from '../utils/audioEffects';

interface UseVoiceRecognitionProps {
  onTranscriptComplete: (transcript: string) => void;
  language?: 'auto' | 'en' | 'hi';
}

export function useVoiceRecognition({
  onTranscriptComplete,
  language = 'auto',
}: UseVoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [micVolume, setMicVolume] = useState<number>(0);
  const [micPermissionGranted, setMicPermissionGranted] = useState<boolean | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Set recognition language
    if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else if (language === 'en') {
      recognition.lang = 'en-US';
    } else {
      // Auto: defaults to Indian English / Hinglish or browser language
      recognition.lang = navigator.language || 'en-IN';
    }

    recognition.onstart = () => {
      setIsListening(true);
      playSoundFX('listen');
      setupAudioAnalyzer();
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(interim);
      if (final) {
        setFinalTranscript(final);
        setInterimTranscript('');
        onTranscriptComplete(final.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition event error:', event.error);
      if (event.error === 'not-allowed') {
        setMicPermissionGranted(false);
      }
      setIsListening(false);
      cleanupAudioAnalyzer();
    };

    recognition.onend = () => {
      setIsListening(false);
      cleanupAudioAnalyzer();
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
      cleanupAudioAnalyzer();
    };
  }, [language, onTranscriptComplete]);

  // Audio Analyzer for Reacting Arc Reactor & Visualizer
  const setupAudioAnalyzer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicPermissionGranted(true);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(1, average / 120);
        setMicVolume(normalized);

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn('Microphone access denied or unavailable:', err);
      setMicPermissionGranted(false);
    }
  };

  const cleanupAudioAnalyzer = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicVolume(0);
  };

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setInterimTranscript('');
      setFinalTranscript('');
      recognitionRef.current.start();
    } catch (e) {
      // If already started, restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 150);
      } catch (err) {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      playSoundFX('stop');
    } catch (e) {}
    setIsListening(false);
    cleanupAudioAnalyzer();
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    interimTranscript,
    finalTranscript,
    micVolume,
    isSupported,
    micPermissionGranted,
    startListening,
    stopListening,
    toggleListening,
  };
}
