// Medina ambience, synthesized in the browser: fountain water, courtyard
// wind, doves, and the coppersmiths' tapping near craft streets. No samples,
// no voice, no song, no melody. Nothing plays until the listener opts in;
// pausing closes the AudioContext. Ducks under the audio guide.
import { createSoundscape } from '../sound/soundscape.mjs';
import { SOUND_PLACES, CATEGORY_PLACES } from '../sound/places.mjs';

export class AudioController {
  constructor() {
    this.scape = createSoundscape(SOUND_PLACES);
    this.state = this.scape.state;
    this.isPlaying = false;
    this.place = 0;
  }
  get paused() { return !this.isPlaying; }
  setTrack() {} // Kept for API compatibility; ambience is one synthesized palette.
  setCategory(category) {
    this.place = CATEGORY_PLACES[category] ?? 0;
    this.scape.setPlace(this.place);
  }
  async play() {
    if (this.isPlaying) return true;
    try {
      this.scape.toggle(this.place);
      this.isPlaying = this.scape.state.on;
      if (this.ducked) this.duck();
      return this.isPlaying;
    } catch (e) {
      this.pause();
      document.dispatchEvent(new CustomEvent('ambient-audio-blocked'));
      return false;
    }
  }
  pause() {
    if (this.isPlaying) this.scape.toggle(this.place);
    this.isPlaying = false;
  }
  toggle(v) { if (v) this.play(); else this.pause(); }
  duck() {
    this.ducked = true;
    if (this.state.gain && this.state.ctx) this.state.gain.gain.setTargetAtTime(0.25, this.state.ctx.currentTime, 0.3);
  }
  unduck() {
    this.ducked = false;
    if (this.state.gain && this.state.ctx) this.state.gain.gain.setTargetAtTime(0.9, this.state.ctx.currentTime, 0.3);
  }
}
