export class AudioController {
  constructor(audioSrc) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.isPlaying = false;
  }

  setTrack(audioSrc) {
    if (this.audio.src === new URL(audioSrc, window.location.href).href) {
      return;
    }
    const wasPlaying = this.isPlaying;
    this.audio.pause();
    this.audio.src = audioSrc;
    if (wasPlaying) {
      this.play();
    }
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
