// Web Audio API synth to generate authentic, lightweight vibe soundscapes for each music genre
class VibePlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTimeout = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {
        // ignore
      }
      this.ctx = null;
    }
  }

  playGenreVibe(genre, onStopCallback) {
    this.stop();
    this.init();
    if (!this.ctx) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    if (genre === 'Eletrônica') {
      // 4-on-the-floor kick + pulsing bass filter sweep
      this.playTechnoBeat(now);
    } else if (genre === 'Funk') {
      // 130bpm MPC tamborzão & sub bounce
      this.playFunkBeat(now);
    } else if (genre === 'Rock') {
      // Power chord harmonic riff
      this.playRockRiff(now);
    } else if (genre === 'Pagode') {
      // Syncopated cavaquinho arpeggio & surdo
      this.playPagodeGroove(now);
    } else if (genre === 'Trap') {
      // 808 sub bass & rolling trap hats
      this.playTrapBeat(now);
    } else {
      // Pop / Synthwave upbeat chords
      this.playPopSynth(now);
    }

    // Automatically stop after 5.5 seconds
    this.currentTimeout = setTimeout(() => {
      this.isPlaying = false;
      if (onStopCallback) onStopCallback();
    }, 5500);
  }

  playKick(time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  playHat(time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  playTechnoBeat(startTime) {
    const bpm = 126;
    const beat = 60 / bpm;
    for (let i = 0; i < 8; i++) {
      const t = startTime + i * beat;
      this.playKick(t);
      this.playHat(t + beat * 0.5);

      // Bass synth note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const notes = [65.41, 65.41, 77.78, 65.41]; // C2, Eb2
      osc.frequency.setValueAtTime(notes[i % notes.length], t + beat * 0.25);
      gain.gain.setValueAtTime(0.2, t + beat * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + beat * 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + beat * 0.25);
      osc.stop(t + beat * 0.7);
    }
  }

  playFunkBeat(startTime) {
    const bpm = 130;
    const beat = 60 / bpm;
    for (let i = 0; i < 8; i++) {
      const t = startTime + i * beat;
      this.playKick(t);
      this.playKick(t + beat * 0.75);

      // Snare / Tambor
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t + beat * 0.5);
      gain.gain.setValueAtTime(0.25, t + beat * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.01, t + beat * 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + beat * 0.5);
      osc.stop(t + beat * 0.7);
    }
  }

  playTrapBeat(startTime) {
    const bpm = 140;
    const beat = 60 / bpm;
    for (let i = 0; i < 8; i++) {
      const t = startTime + i * beat;
      if (i % 2 === 0) this.playKick(t);
      // Fast hi-hat rolls
      for (let h = 0; h < 4; h++) {
        this.playHat(t + (h * beat) / 4);
      }
      // Sub 808 bass slide
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + beat);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + beat);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + beat);
    }
  }

  playRockRiff(startTime) {
    const chords = [130.81, 146.83, 164.81, 174.61]; // C3, D3, E3, F3
    chords.forEach((freq, idx) => {
      const t = startTime + idx * 0.6;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 1.5, t); // fifth
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.55);
      osc2.stop(t + 0.55);
    });
  }

  playPagodeGroove(startTime) {
    const bpm = 100;
    const beat = 60 / bpm;
    const cavaquinhoNotes = [523.25, 659.25, 783.99, 659.25]; // C5, E5, G5, E5
    for (let i = 0; i < 8; i++) {
      const t = startTime + i * beat;
      // Surdo
      this.playKick(t);
      // Cavaquinho strum
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(cavaquinhoNotes[i % 4], t + beat * 0.25);
      gain.gain.setValueAtTime(0.15, t + beat * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + beat * 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + beat * 0.25);
      osc.stop(t + beat * 0.5);
    }
  }

  playPopSynth(startTime) {
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
    for (let i = 0; i < 10; i++) {
      const t = startTime + i * 0.3;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(notes[i % notes.length], t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.28);
    }
  }
}

export const vibePlayer = new VibePlayer();
