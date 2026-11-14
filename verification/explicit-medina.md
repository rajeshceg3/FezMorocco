# Explicit Medina controls, 14 November 2026

One labelled Medina button replaces timed greeting, hover wake and stored Pin state. A Fassi-blue drawer contains named landmark arches, category chips, route/saved/sound/night actions and zoom/reset. Landmark details close the drawer; both surfaces handle Escape, focus wrap and return. Long content stays readable inside each surface. The existing map style, category colors, photos, sound synthesis and map camera behavior are preserved.

MapLibre is pinned to 6.18.0, beyond the fixed 6.4.1 release for GHSA-jrc7-96c5-q579. Its module worker is explicitly emitted by Vite. The browser suite checks actual rendered map features, not merely a canvas element. npm audit is clean. The previous warm-map style JSON is unchanged.

Checks: 320/390/1440 widths, normal/reduced motion, all 11 landmarks in both themes, readable detail scrolling, saved filter and persistence, category selection, route disclosure, reset, zoom, silent start, legacy-pin migration, photo lens, Escape/focus handling and viewport fit. Audio structure suite is unchanged. Before/after screenshots use real Chromium, not a physical iPhone or Safari. Existing map camera flyTo behavior and photo-lens fade are not a claim of full live OS-motion adoption.
