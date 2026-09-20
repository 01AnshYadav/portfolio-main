import React from 'react';

interface ScrollCueProps {
  visible: boolean;
}

export const ScrollCue: React.FC<ScrollCueProps> = ({ visible }) => {
  return (
    <div
      className="scroll-cue"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: '#ffffff',
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        opacity: visible ? 0.75 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
        zIndex: 15,
        userSelect: 'none',
      }}
      aria-hidden={!visible}
    >
      <span>SCROLL</span>
      {/* Animated chevron tick */}
      <span
        style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          transform: 'rotate(45deg)',
          animation: visible ? 'scrollTick 1.8s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`
        @keyframes scrollTick {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(5px) rotate(45deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
