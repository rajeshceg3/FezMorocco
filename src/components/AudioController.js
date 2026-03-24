export class AudioController {
  constructor(audioSrc) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.targetVolume = 0.5;
    this.audio.volume = this.targetVolume;
    this.isPlaying = false;
    this.fadeInterval = null;
    this.currentMaxVolume = this.targetVolume;

    this._unlockAudio = this._unlockAudio.bind(this);
    document.addEventListener('pointerdown', this._unlockAudio, { once: true });
    document.addEventListener('keydown', this._unlockAudio, { once: true });
  }

  setTrack(audioSrc) {
    if (this.audio.src === new URL(audioSrc, window.location.href).href) {
      return;
    }
    const wasPlaying = this.isPlaying;

    if (wasPlaying) {
      this.fadeOut(() => {
        this.audio.pause();
        this.audio.src = audioSrc;
        this.play();
        this.fadeIn();
      });
    } else {
      this.audio.src = audioSrc;
      this.audio.load();
    }
  }

  _unlockAudio() {
    // Priming handler so first user interaction enables playback on strict browsers.
  }

  fadeOut(callback) {
    this.fadeTo(0, callback);
  }

  fadeTo(target, callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (Math.abs(this.audio.volume - target) > 0.05) {
        const direction = this.audio.volume > target ? -0.05 : 0.05;
        const nextVolume = this.audio.volume + direction;
        this.audio.volume = Math.max(0, Math.min(1, nextVolume));
      } else {
        this.audio.volume = target;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  fadeIn(callback) {
    this.fadeTo(this.currentMaxVolume, callback);
  }

  async play() {
    this.isPlaying = true;
    try {
      await this.audio.play();
      return true;
    } catch (e) {
      console.log('Audio play failed (user interaction needed):', e);
      this.isPlaying = false;
      document.dispatchEvent(new CustomEvent('ambient-audio-blocked'));
      return false;
    }
  }

  pause() {
    this.isPlaying = false;
    this.audio.pause();
  }

  toggle(shouldPlay) {
    if (shouldPlay) {
      this.play();
    } else {
      this.pause();
    }
  }

  duck() {
    this.currentMaxVolume = Math.max(0.1, this.targetVolume * 0.35);
    if (this.isPlaying) {
      this.fadeTo(this.currentMaxVolume);
    }
  }

  unduck() {
    this.currentMaxVolume = this.targetVolume;
    if (this.isPlaying) {
      this.fadeIn();
    }
  }
}
