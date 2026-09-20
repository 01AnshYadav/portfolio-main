import React, { useState, useEffect } from 'react';
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
  const [clockTime, setClockTime] = useState<string>('09:41');

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setClockTime(
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
      );
    };
    updateClock();
    const interval = window.setInterval(updateClock, 10000);
    return () => window.clearInterval(interval);
  }, []);

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
          padding: '16px 28px',
          boxSizing: 'border-box',
          border: '1px solid rgba(58, 174, 196, 0.4)',
          userSelect: 'none',
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(58, 174, 196, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      >
        {/* Top Status Bar from ctos-map (1).html */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            fontFamily: 'var(--mono)',
            color: 'var(--ink)',
          }}
        >
          <span>{clockTime}</span>
          <span style={{ color: 'var(--cyan-hi)', fontSize: '11px', letterSpacing: '0.15em' }}>
            ctOS // LINK ESTABLISHED
          </span>
          <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>LTE</span>
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '10px',
                border: '1.5px solid var(--ink)',
                borderRadius: '2.5px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: '1.5px',
                  right: '5px',
                  backgroundColor: 'var(--ink)',
                }}
              />
            </span>
          </span>
        </div>

        {/* 8 App Slots Grid from ctos-map (1).html */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '18px',
            justifyItems: 'center',
            alignItems: 'center',
            margin: 'auto 0',
          }}
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '18px',
                border: '1.5px dashed rgba(213, 221, 226, 0.24)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(213, 221, 226, 0.35)',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
              }}
            >
              SLOT {idx + 1}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '110px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
