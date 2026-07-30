// Audio Synth Engine for Kids Memory Game using Web Audio API

class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.init();
    }

    init() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.ctx = new AudioContext();
        }
    }

    ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    // Card Flip Sound
    playFlip() {
        if (this.muted || !this.ctx) return;
        this.ensureContext();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    // Match Success Sound (Happy Arpeggio)
    playMatch() {
        if (this.muted || !this.ctx) return;
        this.ensureContext();

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.07);
            
            gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.07);
            gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + index * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.07 + 0.25);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(this.ctx.currentTime + index * 0.07);
            osc.stop(this.ctx.currentTime + index * 0.07 + 0.25);
        });
    }

    // Mismatch Sound (Boing)
    playMismatch() {
        if (this.muted || !this.ctx) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    // Victory Fanfare Sound
    playVictory() {
        if (this.muted || !this.ctx) return;
        this.ensureContext();

        const notes = [
            { f: 523.25, d: 0.15, delay: 0 },
            { f: 659.25, d: 0.15, delay: 0.15 },
            { f: 783.99, d: 0.15, delay: 0.30 },
            { f: 1046.50, d: 0.40, delay: 0.45 }
        ];

        notes.forEach(n => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.delay);

            gain.gain.setValueAtTime(0.4, this.ctx.currentTime + n.delay);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.delay + n.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + n.delay);
            osc.stop(this.ctx.currentTime + n.delay + n.d);
        });
    }

    // Click Sound
    playClick() {
        if (this.muted || !this.ctx) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }
}

window.soundManager = new SoundManager();
