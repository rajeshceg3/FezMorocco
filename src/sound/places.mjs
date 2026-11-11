// Fez soundscape: the old medina, mixed quietly. Fountain water and courtyard
// wind everywhere; what changes by place is who else is there - doves in the
// sacred courtyards, the coppersmiths' tapping near Seffarine, a slower,
// emptier breeze by the gates and roofs. No voice, no song, no melody, no
// samples; synthesized in the browser.
export const SOUND_PLACES = [
  { id: 'medina', beds: [{ type: 'surf', params: { period: 2.6, lowpass: 1500, swash: 0.26, swashFreq: 1150, power: 1.1 }, gain: 0.34 }, { type: 'wind', params: { baseCutoff: 540, gustRate: 0.06, gustDepth: 0.5 }, gain: 0.28 }], voices: [{ kind: 'dove', weight: 0.7, gain: 0.05 }, { kind: 'coppersmith', weight: 0.3, gain: 0.03 }], voiceGap: [18, 45] },
  { id: 'sacred', beds: [{ type: 'surf', params: { period: 2.9, lowpass: 1400, swash: 0.22, swashFreq: 1050, power: 1.1 }, gain: 0.36 }, { type: 'wind', params: { baseCutoff: 480, gustRate: 0.05, gustDepth: 0.4 }, gain: 0.18 }], voices: [{ kind: 'dove', weight: 1, gain: 0.05 }], voiceGap: [20, 50] },
  { id: 'craft', beds: [{ type: 'surf', params: { period: 2.4, lowpass: 1300, swash: 0.2, swashFreq: 1000, power: 1.1 }, gain: 0.34 }, { type: 'wind', params: { baseCutoff: 560, gustRate: 0.07, gustDepth: 0.55 }, gain: 0.26 }], voices: [{ kind: 'coppersmith', weight: 0.7, gain: 0.04 }, { kind: 'dove', weight: 0.3, gain: 0.045 }], voiceGap: [12, 30] },
  { id: 'courtyard', beds: [{ type: 'surf', params: { period: 2.7, lowpass: 1450, swash: 0.24, swashFreq: 1100, power: 1.1 }, gain: 0.32 }, { type: 'wind', params: { baseCutoff: 520, gustRate: 0.06, gustDepth: 0.45 }, gain: 0.3 }], voices: [{ kind: 'dove', weight: 0.8, gain: 0.05 }, { kind: 'coppersmith', weight: 0.2, gain: 0.025 }], voiceGap: [20, 48] },
];
// Landmark category -> soundscape index
export const CATEGORY_PLACES = { Sacred: 1, Craft: 2, Stay: 3, Architecture: 3, Taste: 0 };
