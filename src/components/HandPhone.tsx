import React, { useState, useEffect, useRef } from 'react';
import { PNG_PATH, PNG_ASPECT, PHONE_SCREEN } from '../config';
import { ScreenPlaceholder } from './ScreenPlaceholder';
import { DebugOverlay } from './DebugOverlay';
import './HandPhone.css';

interface HandPhoneProps {
  isDebug?: boolean;
}

export const HandPhone: React.FC<HandPhoneProps> = ({ isDebug = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wallCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [clockTime, setClockTime] = useState<string>('09:41');

  // Clock timer matching ctos-map (1).html
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

  // Preload PNG
  useEffect(() => {
    const img = new Image();
    img.src = PNG_PATH;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
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

  // Paint phone wallpaper canvas (from ctos-map (1).html paintWall)
  useEffect(() => {
    const cv = wallCanvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const w = cv.width;
    const h = cv.height;

    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(58, 174, 196, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Cyan ctOS wallpaper gradient
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, 'rgba(58, 174, 196, 0.22)');
    g.addColorStop(0.55, 'rgba(0, 0, 0, 0.45)');
    g.addColorStop(1, 'rgba(58, 174, 196, 0.12)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, [imageLoaded, imageError]);

  return (
    <div
      ref={containerRef}
      className="hand-phone-container"
      style={{
        position: 'relative',
        width: 'min(86vw, calc(78vh * 2.2), 1020px)',
        aspectRatio: `${PNG_ASPECT}`,
        userSelect: 'none',
        pointerEvents: isDebug ? 'auto' : 'none',
        willChange: 'transform',
      }}
    >
      {/* If PNG is provided by user, render the PNG object */}
      {imageLoaded && !imageError ? (
        <>
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
          {/* Homography Screen pinned to the 4 corners of the PNG */}
          <ScreenPlaceholder
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
          />
        </>
      ) : (
        /* The authentic ctOS Phone UI from ctos-map (1).html */
        <div className="phone" id="phone" role="group" aria-label="Phone">
          <i className="btn b1" />
          <i className="btn b2" />
          <i className="btn b3" />
          <div className="body">
            <div className="screen">
              <canvas
                ref={wallCanvasRef}
                className="wall-canvas"
                width="1000"
                height="450"
              />
              <div className="pcam" />
              <div className="pstatus">
                <span id="clock">{clockTime}</span>
                <span className="r">
                  <span>LTE</span>
                  <i className="pbat" />
                </span>
              </div>

              {/* Home App Slots from ctos-map (1).html */}
              <div className="home" id="home">
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
              </div>

              {/* Centered ctOS Uplink Status Label */}
              <div
                style={{
                  position: 'absolute',
                  top: '4.5cqw',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: 'max(10px, 1.3cqw)',
                  letterSpacing: '0.15em',
                  color: 'var(--cyan-hi)',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                ctOS // LINK ESTABLISHED
              </div>

              <div className="pbar" />
              <div className="glare" />
            </div>
          </div>
        </div>
      )}

      {/* Visual Corner Pin Debug Overlay when ?debug=1 */}
      {isDebug && (
        <DebugOverlay
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
          onCornersChange={(newCorners) => {
            PHONE_SCREEN.corners = newCorners;
          }}
        />
      )}
    </div>
  );
};
