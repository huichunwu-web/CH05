// Web Audio API Synthesizer for educational feedback sounds

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export class SoundManager {
  private static isMuted: boolean = false;
  private static volume: number = 0.5;

  static init() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('ghp_sound_muted');
      if (savedMute !== null) {
        SoundManager.isMuted = savedMute === 'true';
      }
    }
  }

  static toggleMute(): boolean {
    SoundManager.isMuted = !SoundManager.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghp_sound_muted', String(SoundManager.isMuted));
    }
    return SoundManager.isMuted;
  }

  static setMuted(muted: boolean) {
    SoundManager.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghp_sound_muted', String(muted));
    }
  }

  static getIsMuted(): boolean {
    return SoundManager.isMuted;
  }

  // 答對音效：清脆愉悅的上行和弦 (Ding-Ding-Dong! C5 -> E5 -> G5 -> C6)
  static playCorrect() {
    if (SoundManager.isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const noteDuration = 0.09;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * noteDuration);

        // Gentle envelope
        gain.gain.setValueAtTime(0.001, now + idx * noteDuration);
        gain.gain.linearRampToValueAtTime(0.25 * SoundManager.volume, now + idx * noteDuration + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * noteDuration + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * noteDuration);
        osc.stop(now + idx * noteDuration + 0.3);
      });
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  }

  // 答錯音效：低沈警示兩音 (Buzz! F3 -> D3)
  static playIncorrect() {
    if (SoundManager.isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const tones = [220, 164.81]; // A3 -> E3
      const duration = 0.16;

      tones.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gain.gain.setValueAtTime(0.001, now + idx * duration);
        gain.gain.linearRampToValueAtTime(0.2 * SoundManager.volume, now + idx * duration + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * duration + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * duration);
        osc.stop(now + idx * duration + duration + 0.02);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 測驗完成/滿分喝采勝利號角
  static playFanfare() {
    if (SoundManager.isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0, d: 0.12 },     // C5
        { f: 523.25, t: 0.12, d: 0.12 },  // C5
        { f: 523.25, t: 0.24, d: 0.12 },  // C5
        { f: 659.25, t: 0.38, d: 0.22 },  // E5
        { f: 783.99, t: 0.62, d: 0.22 },  // G5
        { f: 1046.50, t: 0.86, d: 0.6 },  // C6
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.3 * SoundManager.volume, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch (e) {
      console.warn('Fanfare error:', e);
    }
  }

  // 翻轉字卡 / 點擊音效
  static playFlip() {
    if (SoundManager.isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(0.08 * SoundManager.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn('Flip sound error:', e);
    }
  }
}
