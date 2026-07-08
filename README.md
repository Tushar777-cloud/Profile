# Tushar Laha — Personal Portfolio

A modern, fully animated single-page personal portfolio and resume website for **Tushar Laha** — Full-Stack Web Developer & Content Writer (BCA student), based in Lalitpur, Nepal.

> Live site: open `index.html` in any browser. No build step, no dependencies, no backend.

## Features

- **Dark / Light theme** — toggle in the top-right navbar, persisted with `localStorage`, smooth color transitions via CSS variables.
- **Hero section** — full-viewport intro with a typewriter role animation, spinning avatar ring (using `pp.jpg`), staggered entrance, and an animated scroll indicator.
- **About** — short bio plus a glassmorphism quick-facts grid (location, languages, education, interests).
- **Skills** — animated radial progress rings and skill bars that fill on scroll, plus categorized icon chips.
- **Experience** — vertical animated timeline with staggered reveal.
- **Projects** — interactive cards with cursor-following 3D tilt and glow, linking to GitHub repos.
- **Contact** — glass contact cards (`mailto:` / `tel:` with click-to-copy), LinkedIn & GitHub links.
- **Particle background** — lightweight canvas animation that adapts its color to the active theme.
- **Responsive** — works on mobile, tablet, and desktop, with a mobile hamburger menu.
- **Accessible** — semantic HTML5, ARIA labels, keyboard-navigable nav, and `prefers-reduced-motion` support.

## Tech Stack

- HTML5, CSS3 (custom properties / variables), vanilla JavaScript
- No frameworks, no build tools, no external libraries (Google Fonts only)
- Intersection Observer API for scroll animations

## Files

| File | Description |
|------|-------------|
| `index.html` | Page structure and content |
| `style.css` | Styling, theming, animations, responsive layout |
| `script.js` | Theme toggle, nav, reveals, typewriter, skills, particles, copy-to-clipboard |
| `pp.jpg` | Profile photo used in the hero avatar |
| `Tushar_Resume.pdf` | Downloadable CV (linked from the hero "Download Resume" button) |

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Tushar777-cloud/Profile.git
   ```
2. Open `index.html` in your browser (or use a simple static server):
   ```bash
   # optional: run a local server
   python -m http.server 8000
   ```

That's it — no installation or build required.

## Contact

- 📧 Email: [tusharlaha777@gmail.com](mailto:tusharlaha777@gmail.com)
- 📞 Phone: [+977-9768839977](tel:+9779768839977)
- 💼 LinkedIn: [linkedin.com/in/tushar-laha-06242b3a7](https://linkedin.com/in/tushar-laha-06242b3a7)
- 🐙 GitHub: [github.com/Tushar777-cloud](https://github.com/Tushar777-cloud)

---

© <span>2026</span> Tushar Laha. All rights reserved.
