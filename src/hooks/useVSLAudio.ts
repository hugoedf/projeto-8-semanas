import { useEffect, useRef, useState, useCallback } from "react";

interface UseVSLAudioOptions {
  isPlaying: boolean;
  currentTime: number;
  volume?: number;
}

// Timestamps para efeitos sonoros de impacto
const IMPACT_SFX_TIMESTAMPS = [
  { time: 5, type: "whoosh" },
  { time: 25, type: "impact" },
  { time: 50, type: "rise" },
  { time: 75, type: "reveal" },
  { time: 95, type: "impact" },
  { time: 120, type: "ding" },
  { time: 140, type: "whoosh" },
  { time: 160, type: "finale" },
];

// Preload SFX como data URIs (sons sintéticos curtos)
const SFX_LIBRARY = {
  whoosh: createWhooshSound(),
  impact: createImpactSound(),
  rise: createRiseSound(),
  reveal: createRevealSound(),
  ding: createDingSound(),
  finale: createFinaleSound(),
};

function createOscillatorSound(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  envelope: { attack: number; decay: number; sustain: number; release: number } = {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.2,
  }
): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      // ADSR envelope
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + envelope.attack);
      gainNode.gain.linearRampToValueAtTime(envelope.sustain * 0.3, now + envelope.attack + envelope.decay);
      gainNode.gain.linearRampToValueAtTime(0, now + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + duration);
      
      setTimeout(() => audioContext.close(), duration * 1000 + 100);
    } catch (e) {
      console.log("SFX playback error:", e);
    }
  };
}

function createWhooshSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      // Noise-like whoosh
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, audioContext.currentTime);
      filter.Q.setValueAtTime(2, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      
      setTimeout(() => audioContext.close(), 400);
    } catch (e) {
      console.log("Whoosh SFX error:", e);
    }
  };
}

function createImpactSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      
      setTimeout(() => audioContext.close(), 400);
    } catch (e) {
      console.log("Impact SFX error:", e);
    }
  };
}

function createRiseSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.3);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      
      setTimeout(() => audioContext.close(), 600);
    } catch (e) {
      console.log("Rise SFX error:", e);
    }
  };
}

function createRevealSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Multiple harmonics for rich reveal sound
      [400, 500, 600].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.1 / (i + 1), audioContext.currentTime + 0.05 + i * 0.02);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.4);
      });
      
      setTimeout(() => audioContext.close(), 500);
    } catch (e) {
      console.log("Reveal SFX error:", e);
    }
  };
}

function createDingSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      
      setTimeout(() => audioContext.close(), 600);
    } catch (e) {
      console.log("Ding SFX error:", e);
    }
  };
}

function createFinaleSound(): () => void {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Chord: C major (C4, E4, G4)
      [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.start(audioContext.currentTime + i * 0.02);
        osc.stop(audioContext.currentTime + 1.5);
      });
      
      setTimeout(() => audioContext.close(), 1600);
    } catch (e) {
      console.log("Finale SFX error:", e);
    }
  };
}

export const useVSLAudio = ({ isPlaying, currentTime, volume = 0.3 }: UseVSLAudioOptions) => {
  const lastSfxRef = useRef<number>(-1);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [bgMusicLoaded, setBgMusicLoaded] = useState(false);

  // Play SFX at key moments
  useEffect(() => {
    if (!isPlaying) return;

    const currentSfx = IMPACT_SFX_TIMESTAMPS.find(
      (sfx) => Math.abs(currentTime - sfx.time) < 0.3 && sfx.time !== lastSfxRef.current
    );

    if (currentSfx) {
      lastSfxRef.current = currentSfx.time;
      const sfxFunction = SFX_LIBRARY[currentSfx.type as keyof typeof SFX_LIBRARY];
      if (sfxFunction) {
        sfxFunction();
      }
    }
  }, [currentTime, isPlaying]);

  // Clean up
  useEffect(() => {
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  return {
    bgMusicLoaded,
  };
};

export default useVSLAudio;
