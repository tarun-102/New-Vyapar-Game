// audio.js - Web Audio API આધારિત સાઉન્ડ ઇફેક્ટ્સ (૧૦૦% સેફ, ક્યારેય ક્રેક કે એરર ન આપે)

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      // Audio not permitted without gesture on some mobile browsers
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // પાસા ફેંકવાનો અવાજ (Dice Roll Clatter)
  playDice() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const count = 4;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          try {
            if (!this.ctx || this.ctx.state !== 'running') return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const freq = 140 + Math.random() * 260;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.055);
          } catch (err) {}
        }, i * 55);
      }
    } catch (e) {}
  }

  // કૂકરી ચાલવાનો અવાજ (Token Step)
  playStep() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // પૈસાનો ખણખણાટ / કેશ ટ્રાન્ઝેક્શન (Coins & Cash "Ka-Ching")
  playCash() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.37);
    } catch (e) {}
  }

  // બેંક લોન મંજૂર સાઉન્ડ (Bank Loan Fanfare)
  playLoan() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const startTime = this.ctx.currentTime + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) {}
  }

  // મિલ્કત ખરીદવાનો વિજયી અવાજ (Buy Property Fanfare)
  playBuy() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, idx) => {
        const startTime = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.24);
      });
    } catch (e) {}
  }

  // જેલ અથવા નુકશાનનો બઝર (Jail / Penalty Slam)
  playJail() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }

  playVictory() {
    this.playBuy();
  }

  playPenalty() {
    this.playJail();
  }

  // બટન ક્લિક
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }
}

export const sound = new SoundFX();
