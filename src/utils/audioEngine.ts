/**
 * VELOCITY X Web Audio Engine Synthesizer
 * Generates dynamic hypercar engine tones, acceleration spool, and exhaust harmonics
 */

class HypercarAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private oscSub: OscillatorNode | null = null;
  private oscMid: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private currentRpmRatio: number = 0.2; // 0 to 1.0 (idle to redline)
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    if (this.isRunning) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, now);
      this.masterGain.connect(this.ctx.destination);

      // Filter to simulate exhaust resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(450, now);
      this.filter.Q.setValueAtTime(3.5, now);
      this.filter.connect(this.masterGain);

      // Low rumble sub
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'sawtooth';
      this.oscSub.frequency.setValueAtTime(45, now);
      this.oscSub.connect(this.filter);
      this.oscSub.start(now);

      // Mid combustion tone
      this.oscMid = this.ctx.createOscillator();
      this.oscMid.type = 'triangle';
      this.oscMid.frequency.setValueAtTime(90, now);
      this.oscMid.connect(this.filter);
      this.oscMid.start(now);

      // High electric whine / turbo harmonic
      this.oscHarmonic = this.ctx.createOscillator();
      this.oscHarmonic.type = 'sine';
      this.oscHarmonic.frequency.setValueAtTime(220, now);
      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.15, now);
      this.oscHarmonic.connect(harmonicGain);
      harmonicGain.connect(this.filter);
      this.oscHarmonic.start(now);

      this.isRunning = true;
    } catch {
      // Audio auto-play policies or unsupported
    }
  }

  public setThrottle(ratio: number) {
    if (!this.isRunning || !this.ctx) return;
    this.currentRpmRatio = Math.max(0.15, Math.min(1.0, ratio));
    const now = this.ctx.currentTime;

    const baseFreq = 42 + this.currentRpmRatio * 220; // 42Hz idle to 262Hz redline
    const filterFreq = 380 + this.currentRpmRatio * 2800;

    if (this.oscSub) {
      this.oscSub.frequency.setTargetAtTime(baseFreq, now, 0.08);
    }
    if (this.oscMid) {
      this.oscMid.frequency.setTargetAtTime(baseFreq * 2.05, now, 0.08);
    }
    if (this.oscHarmonic) {
      this.oscHarmonic.frequency.setTargetAtTime(baseFreq * 4.2 + (this.currentRpmRatio * 800), now, 0.05);
    }
    if (this.filter) {
      this.filter.frequency.setTargetAtTime(filterFreq, now, 0.08);
    }
  }

  public revBurst() {
    this.start();
    if (!this.isRunning) return;
    this.setThrottle(0.95);
    setTimeout(() => {
      this.setThrottle(0.2);
    }, 900);
  }

  public stop() {
    if (!this.isRunning || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, now, 0.1);
      }
      setTimeout(() => {
        this.oscSub?.stop();
        this.oscMid?.stop();
        this.oscHarmonic?.stop();
        this.isRunning = false;
      }, 150);
    } catch {
      this.isRunning = false;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const hypercarAudio = new HypercarAudioEngine();
