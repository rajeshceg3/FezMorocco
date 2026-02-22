Product Requirements Document (PRD)

FEZ — A Living Map of Timeless Craft

A Leaflet-powered, no-scroll, immersive travel application for Fez


---

1. Vision

To design the definitive digital companion to Fez — an application so refined, calm, and intentional that it feels less like software and more like a crafted object.

This is not a map with pins.
This is a quiet guide.
A spatial storybook.
A seamless glass surface revealing 1,200 years of civilization.

The experience must feel:

Native

Fluid

Silent in complexity

Emotionally warm

Architecturally precise


No scroll.
Only layered transitions.
Everything intentional.


---

2. Core Design Philosophy

Fez is not loud. It is textured. Layered. Worn-in. Human.

The interface must reflect:

Sandstone warmth

Zellige geometry

Brass glow at dusk

Indigo dye from the tanneries

Soft shadows like Medina alleyways


Color Theme:

Base: Warm parchment (#F4EDE3)

Accent: Deep indigo (#1F3A5F)

Highlight: Brass gold (#B08D57)

Map Tint Overlay: 6% warm sepia


Typography:

Elegant serif for headings (evokes Islamic manuscript tradition)

Modern geometric sans for UI clarity


Motion:

300–450ms cubic-bezier easing

Layer fade + scale transitions

No jarring map jumps



---

3. Product Scope

Platform

Web-first

PWA enabled

Installable on iOS/Android

Offline tile caching (Medina zone)


Technology Stack

Leaflet.js

OpenStreetMap tiles

GSAP for transitions

Service Workers

IndexedDB for offline caching



---

4. Core Experience Architecture

4.1 Entry Experience

Landing screen:

Full-bleed aerial map centered on Fez Medina.

Minimal UI:

Location title: “Fez”

Subtitle: “The Spiritual Capital of Morocco”

Enter button: “Begin the Walk”


Tap → Smooth zoom into Medina with animated camera glide.


---

5. Curated Experience Layers (No Scroll Design)

Navigation uses horizontal card layering (like stacked sheets of paper).

Each section is a modal layer over the map:

1. Explore


2. Sacred


3. Craft


4. Taste


5. Stay




---

6. Landmark Architecture

6.1 Sacred Sites

Al Quaraouiyine University

Oldest continuously operating university (founded 859 CE)

Soft green highlight marker

Tap reveals:

Founding year

Architectural notes

Audio ambience (courtyard soundscape)

Historical timeline slider




---

Bou Inania Madrasa

Marinid architecture

Gold accent marker

Feature: “Detail Lens” → zoom into tile geometry



---

6.2 Craft Heritage

Chouara Tannery

Indigo and saffron dye pits

Feature: Color extraction animation

Explain leather process visually (step overlay animation)



---

6.3 Gates & Architecture

Bab Bou Jeloud

Transition gateway into Medina mode

Marker glows at night mode



---

7. Interaction Model

Map Behavior

No default zoom controls visible

Gesture-based pinch

Double tap zoom

Smooth animated flyTo transitions


Marker Philosophy

No clutter

Only 8 curated landmarks at a time

Context-aware filtering


Bottom Dock

Minimal curved glass dock:

Explore

Route

Saved

Audio

Night



---

8. Signature Polished Features

8.1 Medina Mode

When activated:

Streets narrow visually

UI edges soften

Ambient souk audio fades in

Warm vignette overlay


8.2 Golden Hour Mode

Map lighting shifts tone Shadows simulated Markers glow brass

8.3 Guided Path Animation

Animated walking line with subtle ripple effect Estimated time badge floats near path


---

9. Navigation Flow

No scroll.

Flow example:

Open → Map
Tap landmark → Card rises
Swipe sideways → Related landmarks
Tap “Back to Map” → Card melts down

All transitions: Opacity fade + scale transform (0.96 → 1.0)


---

10. Information Architecture

Each landmark includes:

Title

One-paragraph poetic intro

3 key facts

Practical visitor info

Open hours

Best visit time

Audio snippet


Data stored as structured JSON.


---

11. Performance Requirements

First load under 2.5s on 4G

Offline support for Medina core

Lazy-load media

Use WebP images

Tile cache limit: 50MB



---

12. Accessibility

High contrast toggle

Adjustable text size

Voice-over compatibility

Haptic feedback on marker tap



---

13. Offline Experience

When offline:

Map tiles for central Medina still render

Saved places accessible

Audio disabled with graceful fallback



---

14. Competitive Differentiation

Unlike Google Maps:

No commercial clutter

No ads

No ratings

Only curated heritage


Unlike travel blogs:

Spatially immersive

Instantly navigable

Calm and intentional



---

15. Emotional Goal

User should feel:

“I understand Fez.”

Not overwhelmed.
Not rushed.
Grounded.


---

16. Future Enhancements

AR overlay for architectural details

Craft workshop booking

Local artisan spotlight

AI audio storytelling voice



---

17. Definition of Done

The product is complete when:

It feels inevitable.

Nothing can be removed.

Nothing distracts.

Every transition feels natural.

It makes other travel apps feel loud.



---

Closing Statement

Fez is not explored.
It is revealed.

This application will not guide tourists.

It will quietly accompany wanderers through the living labyrinth of Fez.

A map that breathes.
A guide that listens.
A crafted digital artifact worthy of a 1,200-year-old city.