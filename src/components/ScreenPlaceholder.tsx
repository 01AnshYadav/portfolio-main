import React from 'react';
import { PHONE_SCREEN } from '../config';
import { computeHomographyMatrix3d, getCornerClipPath } from '../utils/homography';
import { DedSecPhoneOS } from './phone/DedSecPhoneOS';

interface ScreenPlaceholderProps {
  containerWidth: number;
  containerHeight: number;
  isSettled?: boolean;
}

export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({
  containerWidth,
  containerHeight,
  isSettled = false,
}) => {
  if (!containerWidth || !containerHeight) return null;

  // Base virtual resolution for the phone screen
  const V_WIDTH = 880;
  const V_HEIGHT = Math.round(V_WIDTH / PHONE_SCREEN.aspectRatio);

  // Convert fractional corners to container pixel coordinates
  const pixelCorners: [[number, number], [number, number], [number, number], [number, number]] = [
    [PHONE_SCREEN.corners[0][0] * containerWidth, PHONE_SCREEN.corners[0][1] * containerHeight],
    [PHONE_SCREEN.corners[1][0] * containerWidth, PHONE_SCREEN.corners[1][1] * containerHeight],
    [PHONE_SCREEN.corners[2][0] * containerWidth, PHONE_SCREEN.corners[2][1] * containerHeight],
    [PHONE_SCREEN.corners[3][0] * containerWidth, PHONE_SCREEN.corners[3][1] * containerHeight],
  ];

  const transformMatrix = computeHomographyMatrix3d(V_WIDTH, V_HEIGHT, pixelCorners);
  const clipPath = getCornerClipPath(pixelCorners, containerWidth, containerHeight);

  return (
    <div
      className="screen-placeholder-wrapper"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: isSettled ? 'auto' : 'none',
        clipPath,
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      <div
        className="screen-placeholder-surface"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${V_WIDTH}px`,
          height: `${V_HEIGHT}px`,
          transformOrigin: '0 0',
          transform: transformMatrix,
          backgroundColor: '#000000',
          color: 'var(--ink)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          userSelect: 'none',
          containerType: 'inline-size',
        }}
      >
        <DedSecPhoneOS />
      </div>
    </div>
  );
};
