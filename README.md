# THE UNCHOSEN

An original 18-second vertical motion film about possibility.

One continuous ember thread travels through five visual states: a human profile, a field of possible futures, a living heart, an orbital world, and a final typographic resolution. Every visible asset is drawn from SVG geometry and deterministic particles. No stock footage, templates, photographs, or generated imagery.

## Format

- 1080 × 1920 (9:16)
- 30 fps / 540 frames / 18.000 seconds
- Silent by design
- Playfair Display Italic + Space Grotesk
- H.264 delivery

## Development

```sh
npm install
npm run typecheck
npm run studio
npm run render
```

The GitHub Actions workflow renders 10 frame-range chunks in parallel, joins them without re-encoding, and validates the final frame count and duration.
