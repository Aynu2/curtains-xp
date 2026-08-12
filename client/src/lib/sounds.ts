// System sounds for Curtains XP
// Uses Web Audio API to generate retro Windows XP-style sounds

export class SystemSounds {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3; // Default volume (0-1)

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    // Clamp volume between 0 and 1
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }

  private play(frequency: number, duration: number, type: 'sine' | 'square' = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = type;

    gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  private playSequence(notes: Array<{ freq: number; duration: number }>) {
    if (!this.enabled || !this.audioContext) return;

    let time = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        this.play(note.freq, note.duration);
      }, time);
      time += note.duration * 1000;
    });
  }

  // Authentic multi-tonal Windows XP style startup sound
  playStartup() {
    if (!this.enabled || !this.audioContext) return;
    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    } catch {}

    const chords = [
      { notes: [261.63, 329.63, 392.00], duration: 0.25 }, // C4 Major
      { notes: [329.63, 392.00, 523.25], duration: 0.25 }, // E4
      { notes: [392.00, 493.88, 587.33, 783.99], duration: 0.35 }, // G4 Major 7th
      { notes: [523.25, 659.25, 783.99, 1046.50], duration: 0.8 }, // C5 High Resolution Finale
    ];

    let delay = 0;
    chords.forEach(({ notes, duration }) => {
      setTimeout(() => {
        if (!this.audioContext) return;
        notes.forEach((freq) => {
          this.play(freq, duration, 'sine');
        });
      }, delay * 1000);
      delay += duration * 0.85;
    });
  }

  // Button click sound
  playClick() {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
    osc.type = 'square';

    gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  // Notification sound
  playNotification() {
    this.playSequence([
      { freq: 800, duration: 0.1 },
      { freq: 1000, duration: 0.1 },
    ]);
  }

  // Error sound
  playError() {
    this.playSequence([
      { freq: 300, duration: 0.1 },
      { freq: 200, duration: 0.1 },
      { freq: 100, duration: 0.2 },
    ]);
  }

  // Success sound
  playSuccess() {
    this.playSequence([
      { freq: 400, duration: 0.1 },
      { freq: 500, duration: 0.1 },
      { freq: 600, duration: 0.2 },
    ]);
  }

  // Shutdown sound
  playShutdown() {
    this.playSequence([
      { freq: 1000, duration: 0.1 },
      { freq: 800, duration: 0.1 },
      { freq: 600, duration: 0.1 },
      { freq: 400, duration: 0.2 },
    ]);
  }
}

// Global sound instance
let soundInstance: SystemSounds | null = null;

export const getSoundInstance = (): SystemSounds => {
  if (!soundInstance) {
    soundInstance = new SystemSounds(true);
  }
  return soundInstance;
};
