# DedSec Portfolio (React + Vite + Tailwind CSS)

> A hacker-themed portfolio with neon green on black, glitch/scanline effects, terminal-style animations, and subtle sound design. Built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Overview

This is a personal portfolio themed after DedSec/Watch Dogs with Solo Leveling UI vibes. It features a short boot/login screen with a typewriter effect and "clickity clack" audio, a hero with dynamic identity text that rotates roles, glowing project cards, an about section, and terminal-style contact links. Hovering key UI elements plays a subtle beep.

Live development is via Vite's dev server. The site is responsive and deployable to Vercel or Netlify.

## Features

- **Boot/Login Screen** (`src/components/BootScreen.jsx`)
  - Typing animation with audio clicks.
  - Skip button and a "REBOOT SYSTEM" footer button to replay.
- **Dynamic Hero** (`src/components/Hero.jsx` + `src/components/RotatingType.jsx`)
  - Identity header: "Identity: Rexl Kokoro".
  - Line below types "Hey, I am Manas Kumar Singh", backspaces to "I am", then cycles roles like "an Innovator.", "a Builder.", etc.
- **About / Projects / Contact**
  - Glowing "status window" cards, hover flicker, neon outlines.
  - Beep on hover across sections and links.
- **Sound Design** (`src/utils/sfx.js`)
  - Short retro beeps on hover, typing clicks on boot.
  - Autoplay-safe audio unlock on first user gesture.
- **Styling**
  - Tailwind CSS v4 with custom palette and pixel font (`Nothing5x7`).
  - Scanlines, noise, flicker, glitch, neon outline effects.

## Tech Stack

- React + Vite
- Tailwind CSS v4 (+ `@tailwindcss/postcss`)
- Framer Motion
- PostCSS + Autoprefixer

## Getting Started

Prereqs: Node.js LTS and npm.

1. Install dependencies
```bash
npm install
```
2. Start the dev server
```bash
npm run dev
```
3. Build for production
```bash
npm run build
```
4. Preview the build locally
```bash
npm run preview
```

## Project Structure

```
dedsec-portfolio/
├─ index.html
├─ postcss.config.js
├─ tailwind.config.js
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ globals.css
│  ├─ utils/
│  │  └─ sfx.js           # shared AudioContext, beep + hoverBeep + unlockAudio
│  └─ components/
│     ├─ BootScreen.jsx   # boot/login with typing + audio clicks
│     ├─ Hero.jsx         # hero section; uses RotatingType
│     ├─ RotatingType.jsx # rotating typewriter (delete → type role)
│     ├─ About.jsx
│     ├─ Projects.jsx
│     └─ Contact.jsx
└─ public/
   ├─ assets/ (e.g. reaper.png)
   └─ fonts/  (nothing-font-5x7.otf)
```

## Configuration & Customization

- **Identity and roles**
  - Edit `src/components/Hero.jsx` roles array and prefix for the rotating typewriter.
- **About content**
  - Edit summaries and tech stack in `src/components/About.jsx`.
- **Projects**
  - Edit the list in `src/components/Projects.jsx`.
- **Contact links**
  - Update `links` in `src/components/Contact.jsx`.
- **Colors / font**
  - Color CSS variables and effects in `src/globals.css`.
  - Tailwind theme and utilities in `tailwind.config.js`.
  - `Nothing5x7` font imported in `src/globals.css` (path `/fonts/nothing-font-5x7.otf`).
- **Sound**
  - Tweak hover beep loudness/duration in `src/utils/sfx.js` (`beep()` / `hoverBeep()`).
  - Audio is unlocked once via `unlockAudio()` on first user gesture (wired in `App.jsx` and boot screen).

## Tailwind v4 Notes

- `src/globals.css` uses `@import "tailwindcss";` (v4 style).
- PostCSS config uses `@tailwindcss/postcss` and `autoprefixer`.
- Avoid `@apply` for utilities inside CSS; prefer CSS rules or className usage.

## Deployment

### Vercel
- Import the repo in Vercel.
- Framework preset: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.

### Netlify
- New site from Git.
- Build command: `npm run build`.
- Publish directory: `dist`.

## Acknowledgements

- Aesthetic inspired by Watch Dogs / DedSec and Solo Leveling UI.
- Pixel font: Nothing 5x7.

## License

MIT License. You may replace this with your preferred license.
