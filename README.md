# Watch Dogs 2 // DedSec ctOS Portfolio

An interactive developer portfolio inspired by the Watch Dogs 2 ctOS operating system.

## Features

- **ctOS Core Network Map**: Interactive canvas rendering procedural city grid, hubs, relays, data packets, mouse radar lens, and vulnerability dossier panels.
- **Scroll-Triggered 3D Hand-Phone Entrance**: Scrolling down past the 8% threshold on the 200vh container triggers a physical smartphone held in hand to swing smoothly into the viewport along a quarter-circle 3D arc, rotating and settling centered with overshoot.
- **Homography Matrix3d Corner-Pinning**: The smartphone screen uses real-time 4-point projective homography to perspective-warp onto arbitrary quad corners, keeping screen elements aligned even when tilted.
- **Dynamic HUD Dimming**: The background ctOS status HUD and vulnerability panel smoothly fade to 20% opacity when the phone is settled, avoiding visual clash.
- **Calibration Mode (`?debug=1`)**: Open with `?debug=1` to drag the four screen corners visually and generate the exact coordinates for `src/config.ts`.
- **Zero-Friction Fallback**: Automatically renders a physical smartphone silhouette with front notch and matte body if `/public/hand-phone.png` is loading or missing.

## Getting Started

### Development
```bash
npm install
npm run dev
```

Visit `http://localhost:5173/` or `http://localhost:5173/?debug=1`.

### Production Build
```bash
npm run build
```

## Adding Hand + Phone Asset
Place your transparent PNG of a hand holding a landscape smartphone at:
```
public/hand-phone.png
```
Open `http://localhost:5173/?debug=1` to calibrate the 4 screen corners to align with your image.
