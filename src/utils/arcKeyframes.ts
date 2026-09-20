import { ANIMATION_CONFIG } from '../config';

export interface Keyframe3D {
  offset: number;
  transform: string;
  filter?: string;
  easing?: string;
  [key: string]: string | number | undefined;
}

/**
 * Computes the exact 3D transform string for any progress p (0 to 1)
 * along the quarter-circle arc with rotation, overshoot, and settle.
 */
export function getArcTransform(p: number): string {
  const clampedP = Math.max(0, Math.min(1, p));
  const { arc } = ANIMATION_CONFIG;
  const { startPosition, endPosition, startRotation, endRotation, startScale, endScale, overshoot } = arc;

  const Rx = endPosition.x - startPosition.x;
  const Ry = startPosition.y - endPosition.y;
  const cx = endPosition.x;
  const cy = startPosition.y;

  let x: number, y: number, z: number;
  let rx: number, ry: number, rz: number;
  let scale: number;

  if (clampedP <= overshoot.atProgress) {
    // Phase 1: Quarter-circle swing from start up to overshoot peak
    const progress = clampedP / (overshoot.atProgress || 0.82);
    const theta = progress * (Math.PI / 2);

    const baseX = cx - Rx * Math.cos(theta);
    const baseY = cy - Ry * Math.sin(theta);
    const baseZ = startPosition.z + (endPosition.z - startPosition.z) * progress;

    const overFactor = Math.pow(progress, 2.5);
    x = baseX + overshoot.positionDelta.x * overFactor;
    y = baseY + overshoot.positionDelta.y * overFactor;
    z = baseZ + overshoot.positionDelta.z * overFactor;

    rx = startRotation.rx + (endRotation.rx + overshoot.rotationDelta.rx - startRotation.rx) * progress;
    ry = startRotation.ry + (endRotation.ry + overshoot.rotationDelta.ry - startRotation.ry) * progress;
    rz = startRotation.rz + (endRotation.rz + overshoot.rotationDelta.rz - startRotation.rz) * progress;

    scale = startScale + (endScale + overshoot.scaleDelta - startScale) * progress;
  } else {
    // Phase 2: Settle from overshoot back to final centered position
    const settleProgress = (clampedP - overshoot.atProgress) / (1 - overshoot.atProgress);
    const ease = 1 - Math.pow(1 - settleProgress, 3);

    const peakX = endPosition.x + overshoot.positionDelta.x;
    const peakY = endPosition.y + overshoot.positionDelta.y;
    const peakZ = endPosition.z + overshoot.positionDelta.z;

    x = peakX + (endPosition.x - peakX) * ease;
    y = peakY + (endPosition.y - peakY) * ease;
    z = peakZ + (endPosition.z - peakZ) * ease;

    const peakRx = endRotation.rx + overshoot.rotationDelta.rx;
    const peakRy = endRotation.ry + overshoot.rotationDelta.ry;
    const peakRz = endRotation.rz + overshoot.rotationDelta.rz;

    rx = peakRx + (endRotation.rx - peakRx) * ease;
    ry = peakRy + (endRotation.ry - peakRy) * ease;
    rz = peakRz + (endRotation.rz - peakRz) * ease;

    const peakScale = endScale + overshoot.scaleDelta;
    scale = peakScale + (endScale - peakScale) * ease;
  }

  return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
}

/**
 * Computes the keyframes for the hand-phone quarter-circle arc entrance.
 */
export function generateArcEntranceKeyframes(): Keyframe3D[] {
  const steps = ANIMATION_CONFIG.arc.intermediateSteps || 10;
  const keyframes: Keyframe3D[] = [];

  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    keyframes.push({
      offset: Number(u.toFixed(4)),
      transform: getArcTransform(u),
    });
  }

  return keyframes;
}

/**
 * Computes reverse exit keyframes returning back along the arc
 */
export function generateArcExitKeyframes(): Keyframe3D[] {
  const entrance = generateArcEntranceKeyframes();
  return entrance.slice().reverse().map((kf, i, arr) => ({
    offset: Number((i / (arr.length - 1)).toFixed(4)),
    transform: kf.transform,
    filter: 'none',
  }));
}

/**
 * Reduced motion keyframes (clean short fade without camera/arc motion)
 */
export const REDUCED_MOTION_ENTRANCE_KEYFRAMES: Keyframe3D[] = [
  {
    offset: 0,
    transform: `translate3d(${ANIMATION_CONFIG.arc.endPosition.x}px, ${ANIMATION_CONFIG.arc.endPosition.y}px, 0px) scale(${ANIMATION_CONFIG.arc.endScale})`,
    filter: 'opacity(0)',
  },
  {
    offset: 1,
    transform: `translate3d(${ANIMATION_CONFIG.arc.endPosition.x}px, ${ANIMATION_CONFIG.arc.endPosition.y}px, 0px) scale(${ANIMATION_CONFIG.arc.endScale})`,
    filter: 'opacity(1)',
  },
];

export const REDUCED_MOTION_EXIT_KEYFRAMES: Keyframe3D[] = [
  {
    offset: 0,
    transform: `translate3d(${ANIMATION_CONFIG.arc.endPosition.x}px, ${ANIMATION_CONFIG.arc.endPosition.y}px, 0px) scale(${ANIMATION_CONFIG.arc.endScale})`,
    filter: 'opacity(1)',
  },
  {
    offset: 1,
    transform: `translate3d(${ANIMATION_CONFIG.arc.endPosition.x}px, ${ANIMATION_CONFIG.arc.endPosition.y}px, 0px) scale(${ANIMATION_CONFIG.arc.endScale})`,
    filter: 'opacity(0)',
  },
];
