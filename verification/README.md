# Fez guide repair - November 11, 2026

## Scope and executed proof

The live guide's Carto tiles showed "API KEY REQUIRED". Replaced them with key-free OpenStreetMap tiles and visible linked attribution, and stopped the service worker from manually caching tiles. Preserved all 11 landmarks, category filters, saved places, the illustrative route and detail panels. Added a semantic place picker and Reset map.

Removed a recursive filter dispatch that could overflow the call stack. Removed fabricated rotating proverb quotes, local-time "Fez" greetings and tiny spaced capitals. Both control themes use opaque panels, readable 14px floors, visible focus and a closed detail panel that is inert to keyboard navigation. Route no longer claims a verified 45-minute walking time. Hours direct visitors to confirm with each venue.

Replaced nine broken photo links with locally served, visually inspected Commons images. Caption, source URL, photographer, license and license URL are recorded in src/data/photos.js and linked in each panel. Cafe Clock and Riad Fes have honest photo-unavailable notes rather than mismatched images. Images are unmodified except browser crop/display.

Removed mislabeled remote audio playback from the active path. Audio is now generated illustrative wind/bird ambience, explicitly not narration or a Fez field recording. It only starts on opt-in, closes its context on off, and replay was executed. Captured 14 seconds of actual app output. Subjective listening remains unsigned.

Proof: local Chromium checked all 11 landmarks in both themes at 320/390/1440 (66 states), plus filters, save/un-save, route toggle and map reset. After photo replacement, the same 66 states passed; the final 390 test explicitly required the nine real images to decode. verification/check.cjs executes those checks and produces screenshots. CI is a further gate, not a claim that CI has already passed.

275 glyph-mask samples over entry, map controls and both detail-panel themes at three widths: minimum 5.972:1. Map tile labels are third-party content, outside this owned-UI measurement. Build and full npm audit passed with zero advisories.

## Content sources and limits

- https://www.visitmorocco.com/en/travel/fez : official guide for the medina, Bab Boujloud, tanneries, Quaraouiyin, Nejjarine and Merinid tombs. Linked from detail panels.
- https://www.openstreetmap.org/copyright : map attribution.
- Individual Commons image pages, observed asset URLs, descriptions and license metadata are in src/data/photos.js.

The original poetic/historical notes are largely retained. They have not all been independently fact-checked. Hotel facilities, event schedules, live hours, admission prices and current access are not verified; explicit hours and the most obvious schedule/facility claims were removed or qualified. This release repairs map/media/readability, not a full current travel-guide audit. No 3D or mapped walking-navigation claim is made.
