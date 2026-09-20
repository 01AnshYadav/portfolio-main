import React, { useState, useEffect } from 'react';
import { PHONE_SCREEN } from '../config';

interface DebugOverlayProps {
  containerWidth: number;
  containerHeight: number;
  onCornersChange?: (corners: [[number, number], [number, number], [number, number], [number, number]]) => void;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  containerWidth,
  containerHeight,
  onCornersChange,
}) => {
  const [corners, setCorners] = useState(PHONE_SCREEN.corners);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // Sync if config changes
  useEffect(() => {
    setCorners(PHONE_SCREEN.corners);
  }, []);

  if (!containerWidth || !containerHeight) return null;

  const pixelCoords = corners.map(([fx, fy]) => [
    fx * containerWidth,
    fy * containerHeight,
  ]) as [[number, number], [number, number], [number, number], [number, number]];

  const handlePointerDown = (idx: number, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingIdx(idx);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingIdx === null) return;
    const parent = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(containerWidth, e.clientX - parent.left));
    const y = Math.max(0, Math.min(containerHeight, e.clientY - parent.top));

    const fx = Number((x / containerWidth).toFixed(4));
    const fy = Number((y / containerHeight).toFixed(4));

    const newCorners = [...corners] as [[number, number], [number, number], [number, number], [number, number]];
    newCorners[draggingIdx] = [fx, fy];
    setCorners(newCorners);
    if (onCornersChange) onCornersChange(newCorners);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingIdx !== null) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setDraggingIdx(null);
    }
  };

  const labels = ['TL (0)', 'TR (1)', 'BR (2)', 'BL (3)'];

  return (
    <div
      className="debug-screen-overlay"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 999,
        pointerEvents: 'auto',
      }}
    >
      {/* SVG Outline Polygon connecting the 4 corners */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <polygon
          points={pixelCoords.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="rgba(58, 174, 196, 0.12)"
          stroke="rgb(99, 208, 228)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* Diagonals to verify perspective quad center */}
        <line
          x1={pixelCoords[0][0]}
          y1={pixelCoords[0][1]}
          x2={pixelCoords[2][0]}
          y2={pixelCoords[2][1]}
          stroke="rgba(255, 69, 54, 0.4)"
          strokeWidth="1"
        />
        <line
          x1={pixelCoords[1][0]}
          y1={pixelCoords[1][1]}
          x2={pixelCoords[3][0]}
          y2={pixelCoords[3][1]}
          stroke="rgba(255, 69, 54, 0.4)"
          strokeWidth="1"
        />
      </svg>

      {/* 4 Interactive Corner Handles */}
      {pixelCoords.map(([px, py], i) => (
        <div
          key={i}
          onPointerDown={(e) => handlePointerDown(i, e)}
          style={{
            position: 'absolute',
            left: `${px}px`,
            top: `${py}px`,
            width: '24px',
            height: '24px',
            marginLeft: '-12px',
            marginTop: '-12px',
            backgroundColor: draggingIdx === i ? '#ff4536' : '#3aaec4',
            border: '2px solid #ffffff',
            borderRadius: '50%',
            cursor: 'grab',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.8)',
            zIndex: 1000,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '-20px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: '2px 4px',
              borderRadius: '2px',
              pointerEvents: 'none',
              border: '1px solid rgba(58,174,196,0.6)',
            }}
          >
            {labels[i]}: [{corners[i][0]}, {corners[i][1]}]
          </span>
        </div>
      ))}

      {/* Calibration JSON Output Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.88)',
          border: '1px solid var(--cyan)',
          padding: '10px 14px',
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          color: 'var(--ink)',
          pointerEvents: 'auto',
          maxWidth: '380px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ color: 'var(--cyan-hi)', fontWeight: 'bold', marginBottom: '6px' }}>
          ?debug=1 // SCREEN RECTANGLE CALIBRATOR
        </div>
        <div style={{ color: 'var(--dim)', marginBottom: '8px' }}>
          Drag the 4 corner handles to align with the phone screen.
        </div>
        <pre
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            padding: '6px 8px',
            borderRadius: '3px',
            fontSize: '11px',
            overflowX: 'auto',
          }}
        >
{`corners: [
  [${corners[0][0]}, ${corners[0][1]}], // TL
  [${corners[1][0]}, ${corners[1][1]}], // TR
  [${corners[2][0]}, ${corners[2][1]}], // BR
  [${corners[3][0]}, ${corners[3][1]}], // BL
]`}
        </pre>
      </div>
    </div>
  );
};
