export class AudioController {
  constructor(audioSrc) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  play() {
    this.audio.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
  }

  pause() {
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
