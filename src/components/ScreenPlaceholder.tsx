import React from 'react';
import { PHONE_SCREEN } from '../config';
import { computeHomographyMatrix3d, getCornerClipPath } from '../utils/homography';

interface ScreenPlaceholderProps {
  containerWidth: number;
  containerHeight: number;
}

export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({
  containerWidth,
  containerHeight,
}) => {
  // If container dimensions are not yet measured, render nothing
  if (!containerWidth || !containerHeight) return null;

  // Base virtual resolution for the phone screen
  const V_WIDTH = 800;
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
        pointerEvents: 'none',
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 32px',
          boxSizing: 'border-box',
          border: '1px solid rgba(58, 174, 196, 0.4)',
          userSelect: 'none',
        }}
      >
        {/* Top Status Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
            letterSpacing: '0.1em',
            color: 'var(--cyan-hi)',
            borderBottom: '1px solid rgba(58, 174, 196, 0.25)',
            paddingBottom: '8px',
          }}
        >
          <span>ctOS // LINK ESTABLISHED</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--dim)' }}>SECURE UPLINK</span>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--cyan)',
                borderRadius: '50%',
                display: 'inline-block',
                boxShadow: '0 0 6px var(--cyan)',
              }}
            />
          </span>
        </div>

        {/* Center Minimal Linework */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid var(--cyan)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '1px solid var(--cyan-hi)',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: 'var(--ink)',
            }}
          >
            AUTHENTICATING NODE...
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: 'var(--dim)',
            borderTop: '1px solid rgba(213, 221, 226, 0.14)',
            paddingTop: '8px',
          }}
        >
          <span>PORT: 0xDEADBEEF</span>
          <span>DEDSEC // ROOT</span>
        </div>
      </div>
    </div>
  );
};
