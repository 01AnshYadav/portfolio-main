import React, { useState, useEffect } from 'react';
import './ScannerCursor.css';

export const ScannerCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<string>('0x8F');
  const [latency, setLatency] = useState<number>(12);

  useEffect(() => {
    // Only enable on desktop devices (width >= 768px and non-touch)
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive target
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target && (
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.wd2-app-card') ||
          target.closest('.mission-card') ||
          target.closest('.interactive-node')
        )
      );

      if (isInteractive !== isLocked) {
        setIsLocked(isInteractive);
        if (isInteractive) {
          // Generate deterministic hex node ID
          const hex = '0x' + Math.floor(Math.abs(Math.sin(e.clientX * e.clientY) * 255)).toString(16).toUpperCase().padStart(2, '0');
          setTargetId(hex);
          setLatency(Math.floor(8 + Math.random() * 8));
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, isLocked]);

  if (!isVisible) return null;

  return (
    <div
      className={`scanner-cursor-container ${isLocked ? 'target-locked' : ''}`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
      aria-hidden="true"
    >
      {/* Reticle Target Crosshairs */}
      <div className="scanner-reticle">
        <span className="reticle-corner tl" />
        <span className="reticle-corner tr" />
        <span className="reticle-corner br" />
        <span className="reticle-corner bl" />
        <span className="reticle-center-dot" />
      </div>

      {/* Floating Target Metadata Card */}
      <div className="scanner-data-card">
        <div className="data-row header-row">
          <span className="data-node">[SYS_NODE: {targetId}]</span>
          <span className={`data-status ${isLocked ? 'status-locked' : ''}`}>
            {isLocked ? 'LOCKED' : 'ENCRYPTED'}
          </span>
        </div>
        <div className="data-row">
          <span className="dim-text">LATENCY:</span>
          <span className="val-text">{latency}ms</span>
        </div>
        <div className="data-row">
          <span className="dim-text">MESH:</span>
          <span className="val-text">SF_LUCKNOW</span>
        </div>
      </div>
    </div>
  );
};
