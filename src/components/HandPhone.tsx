import React, { useState, useEffect, useRef } from 'react';
import { PNG_PATH, PNG_ASPECT, PHONE_SCREEN } from '../config';
import { ScreenPlaceholder } from './ScreenPlaceholder';
import { DebugOverlay } from './DebugOverlay';

interface HandPhoneProps {
  isDebug?: boolean;
}

export const HandPhone: React.FC<HandPhoneProps> = ({ isDebug = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = PNG_PATH;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      // Graceful fallback to black rectangle phone
      setImageLoaded(false);
      setImageError(true);
    };
  }, []);

  // Measure container dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hand-phone-container"
      style={{
        position: 'relative',
        width: 'min(90vw, calc(80vh * 1.778), 780px)',
        aspectRatio: `${PNG_ASPECT}`,
        userSelect: 'none',
        pointerEvents: isDebug ? 'auto' : 'none',
        willChange: 'transform',
      }}
    >
      {/* Real PNG Hand + Phone Asset if loaded */}
      {imageLoaded && !imageError ? (
        <img
          src={PNG_PATH}
          alt="Hand holding smartphone in landscape"
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            display: 'block',
          }}
        />
      ) : (
        /* Fallback: Physical smartphone silhouette with hand cradle silhouette */
        <div
          className="fallback-phone"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Outer Phone Body */}
          <div
            style={{
              position: 'absolute',
              inset: '3% 5%',
              backgroundColor: '#0a0c0e',
              borderRadius: '24px',
              border: '2px solid #2a3138',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.95), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Front Camera Dot */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                width: '10px',
                height: '10px',
                marginTop: '-5px',
                borderRadius: '50%',
                backgroundColor: '#040507',
                border: '1px solid rgba(58, 174, 196, 0.3)',
              }}
            />
            {/* Subtle Glare Diagonal */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 35%)',
              }}
            />
          </div>

          {/* Minimalist Hand Contour Silhouette at bottom edge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '25%',
              width: '45%',
              height: '36px',
              backgroundColor: '#101418',
              borderRadius: '20px 20px 0 0',
              borderTop: '1px solid rgba(213, 221, 226, 0.1)',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.6)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* Screen Placeholder pinned to the 4 corners via matrix3d homography */}
      <ScreenPlaceholder
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
      />

      {/* Visual Corner Pin Debug Overlay when ?debug=1 */}
      {isDebug && (
        <DebugOverlay
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
          onCornersChange={(newCorners) => {
            // Live update config corners in runtime
            PHONE_SCREEN.corners = newCorners;
          }}
        />
      )}
    </div>
  );
};
