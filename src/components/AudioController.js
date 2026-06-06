export class AudioController {
  constructor(audioSrc, options = {}) {
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.preload = 'metadata';
    this.targetVolume = options.volume ?? 0.5;
    this.audio.volume = this.targetVolume;
    this.isPlaying = false;
    this.isDucked = false;
    this.fadeInterval = null;
    this.currentMaxVolume = this.targetVolume;
    this.trackLabel = options.label || 'Medina soundscape';
    this.trackDescription = options.description || 'Ambient audio for the current part of the walk.';

    this.audio.addEventListener('pause', () => {
      if (!this.audio.ended && this.isPlaying) {
        this.isPlaying = false;
        this.dispatchState('paused');
      }
    });
  }

  setTrack(audioSrc, metadata = {}) {
    const nextSrc = new URL(audioSrc, window.location.href).href;
    const isSameTrack = this.audio.src === nextSrc;
    this.trackLabel = metadata.label || this.trackLabel;
    this.trackDescription = metadata.description || this.trackDescription;

    if (isSameTrack) {
      this.dispatchState('track-metadata-updated');
      return;
    }

    const wasPlaying = this.isPlaying;
    const changeTrack = async () => {
      this.audio.pause();
      this.audio.src = audioSrc;
      this.audio.currentTime = 0;
      this.audio.load();
      this.audio.volume = 0;
      this.dispatchState('track-changed');

      if (wasPlaying) {
        await this.play('track-changed');
      }
    };

    if (wasPlaying) {
      this.fadeOut(changeTrack);
    } else {
      changeTrack();
    }
  }

  fadeOut(callback) {
    this.fadeTo(0, callback);
  }

  fadeTo(target, callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const safeTarget = Math.max(0, Math.min(1, target));

    this.fadeInterval = setInterval(() => {
      if (Math.abs(this.audio.volume - safeTarget) > 0.03) {
        const direction = this.audio.volume > safeTarget ? -0.03 : 0.03;
        const nextVolume = this.audio.volume + direction;
        this.audio.volume = Math.max(0, Math.min(1, nextVolume));
      } else {
        this.audio.volume = safeTarget;
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        this.dispatchState('volume-changed');
        if (callback) callback();
      }
    }, 40);
  }

  fadeIn(callback) {
    this.fadeTo(this.currentMaxVolume, callback);
  }

  async play(reason = 'play-requested') {
    this.isPlaying = true;
    try {
      await this.audio.play();
      if (this.audio.volume === 0) this.fadeIn();
      this.dispatchState(reason);
      return true;
    } catch (error) {
      console.log('Audio play failed (user interaction needed):', error);
      this.isPlaying = false;
      document.dispatchEvent(new CustomEvent('ambient-audio-blocked', {
        detail: { label: this.trackLabel }
      }));
      this.dispatchState('blocked');
      return false;
    }
  }

  pause(reason = 'pause-requested') {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    this.isPlaying = false;
    this.audio.pause();
    this.dispatchState(reason);
  }

  async toggle(shouldPlay) {
    if (shouldPlay) {
      return this.play('toggle-on');
    }

    this.pause('toggle-off');
    return false;
  }

  setVolume(volume) {
    const safeVolume = Math.max(0, Math.min(1, Number(volume)));
    this.targetVolume = safeVolume;
    this.currentMaxVolume = this.getEffectiveVolume();

    if (this.isPlaying) {
      this.fadeTo(this.currentMaxVolume);
    } else {
      this.audio.volume = this.currentMaxVolume;
      this.dispatchState('volume-changed');
    }
  }

  duck() {
    this.isDucked = true;
    this.currentMaxVolume = this.getEffectiveVolume();
    if (this.isPlaying) {
      this.fadeTo(this.currentMaxVolume);
    } else {
      this.dispatchState('ducked');
    }
  }

  unduck() {
    this.isDucked = false;
    this.currentMaxVolume = this.getEffectiveVolume();
    if (this.isPlaying) {
      this.fadeIn();
    } else {
      this.dispatchState('unducked');
    }
  }

  getEffectiveVolume() {
    if (!this.isDucked) return this.targetVolume;
    return Math.max(0.08, this.targetVolume * 0.35);
  }

  dispatchState(reason) {
    document.dispatchEvent(new CustomEvent('ambient-audio-state-change', {
      detail: {
        active: this.isPlaying,
        ducked: this.isDucked,
        label: this.trackLabel,
        description: this.trackDescription,
        volume: this.targetVolume,
        effectiveVolume: this.audio.volume,
        reason
      }
    }));
  }
}
