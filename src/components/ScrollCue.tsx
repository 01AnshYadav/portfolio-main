import React from 'react';

interface ScrollCueProps {
  visible: boolean;
}

export const ScrollCue: React.FC<ScrollCueProps> = ({ visible }) => {
  const handleClick = () => {
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div
      className="scroll-cue"
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: '#ffffff',
        fontFamily: 'var(--mono)',
        fontSize: 'clamp(15px, 1.8vw, 18px)',
        fontWeight: 800,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, box-shadow 0.2s ease',
        pointerEvents: visible ? 'auto' : 'none',
        cursor: 'pointer',
        zIndex: 20,
        userSelect: 'none',
        background: 'rgba(11, 14, 18, 0.88)',
        border: '1px solid rgba(0, 229, 255, 0.5)',
        borderTop: '2px solid #00e5ff',
        padding: '10px 24px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7), 0 0 18px rgba(0, 229, 255, 0.3)',
      }}
      role="button"
      tabIndex={visible ? 0 : -1}
      aria-label="Scroll up to open phone"
      aria-hidden={!visible}
      title="Click or scroll to engage DedSec Smartphone"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#00e5ff', fontSize: '13px' }}>[▲]</span>
        <span style={{ color: '#ffffff', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>
          SCROLL UP
        </span>
      </div>

      {/* Animated indicator chevron */}
      <span
        style={{
          display: 'inline-block',
          width: '9px',
          height: '9px',
          borderRight: '2px solid #00e5ff',
          borderBottom: '2px solid #00e5ff',
          transform: 'rotate(45deg)',
          animation: visible ? 'scrollCueTick 1.6s ease-in-out infinite' : 'none',
        }}
      />

      <style>{`
        .scroll-cue:hover {
          background: rgba(16, 22, 30, 0.96) !important;
          border-color: #00e5ff !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 229, 255, 0.6) !important;
          transform: translateX(-50%) translateY(-2px) !important;
        }
        @keyframes scrollCueTick {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(6px) rotate(45deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
