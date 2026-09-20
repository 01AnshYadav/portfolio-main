export interface Point2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3D {
  rx: number; // degrees
  ry: number; // degrees
  rz: number; // degrees
}

export interface PhoneScreenConfig {
  /**
   * 4 corners of the smartphone screen area expressed as fractions (0 to 1)
   * of the PNG's width and height, in clockwise order:
   * [top-left, top-right, bottom-right, bottom-left]
   */
  corners: [
    [number, number], // Top-Left
    [number, number], // Top-Right
    [number, number], // Bottom-Right
    [number, number]  // Bottom-Left
  ];
  aspectRatio: number; // width / height of the PNG object
}

/**
 * Landscape smartphone screen rectangle calibration.
 * Default values for a centered landscape smartphone held in hand.
 * Calibrate precisely in real-time by adding ?debug=1 to the URL.
 */
export const PHONE_SCREEN: PhoneScreenConfig = {
  corners: [
    [0.165, 0.145], // Top-Left [x, y]
    [0.835, 0.145], // Top-Right [x, y]
    [0.835, 0.855], // Bottom-Right [x, y]
    [0.165, 0.855], // Bottom-Left [x, y]
  ],
  aspectRatio: 16 / 9,
};

export const PNG_ASPECT = PHONE_SCREEN.aspectRatio;
export const PNG_PATH = '/hand-phone.png';

export const SCROLL_CONFIG = {
  // Trigger threshold: 8% down the 200vh scroll container
  threshold: 0.08,
  // Container height in vh
  containerHeightVh: 200,
  // Opacity of ctOS HUD and panel when phone is settled
  hudDimOpacity: 0.2,
};

export const ANIMATION_CONFIG = {
  durationEntranceMs: 1100,
  durationExitMs: 950,
  easingEntrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easingExit: 'cubic-bezier(0.7, 0, 0.84, 0)',

  // Quarter-circle arc trajectory
  // Start: below the viewport, offset to the left/bottom to trace an upward arc
  arc: {
    startPosition: { x: -320, y: 880, z: -180 } as Vector3D,
    endPosition: { x: 0, y: 35, z: 0 } as Vector3D, // Centered, slightly below middle
    startRotation: { rx: 28, ry: -22, rz: 38 } as Rotation3D,
    endRotation: { rx: 0, ry: 0, rz: 0 } as Rotation3D,
    startScale: 0.72,
    endScale: 1.0,

    // Subtle overshoot & settle parameters
    overshoot: {
      positionDelta: { x: 12, y: -24, z: 10 },
      rotationDelta: { rx: -3.5, ry: 2, rz: -3 },
      scaleDelta: 0.025,
      atProgress: 0.78, // Overshoot occurs at 78% of the entrance duration
    },
    // Intermediate point count for smooth Web Animations API / keyframe curve
    intermediateSteps: 10,
    motionBlurMaxPx: 2.0,
  },

  // Responsive max dimensions for hand + phone container
  maxPhoneWidthPx: 820,
  viewportMarginPx: 24,
};

export const COLORS = {
  bg: '#000000',
  cyan: 'rgb(58, 174, 196)',
  cyanHi: 'rgb(99, 208, 228)',
  red: 'rgb(255, 69, 54)',
  ink: '#d5dde2',
  dim: '#8f9ba2',
  panelBg: 'rgba(0, 0, 0, 0.76)',
};
