export class AudioController {
  constructor(audioSrc) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.targetVolume = 0.5;
    this.audio.volume = this.targetVolume;
    this.isPlaying = false;
    this.fadeInterval = null;
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
    }
  }

  fadeOut(callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume > 0.05) {
        this.audio.volume -= 0.05;
      } else {
        this.audio.volume = 0;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  fadeIn(callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.audio.volume = 0;
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume < this.targetVolume - 0.05) {
        this.audio.volume += 0.05;
      } else {
        this.audio.volume = this.targetVolume;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  play() {
    this.isPlaying = true;
    this.audio.play().catch(e => {
      console.log("Audio play failed (user interaction needed):", e);
      this.isPlaying = false;
    });
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
}
