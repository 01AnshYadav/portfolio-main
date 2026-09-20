import React, { useState, useEffect } from 'react';
import { CtosMap } from './components/CtosMap';
import { HandPhoneStage } from './components/HandPhoneStage';

export const App: React.FC = () => {
  const [isPhoneSettled, setIsPhoneSettled] = useState<boolean>(false);
  const [isDebug, setIsDebug] = useState<boolean>(false);

  useEffect(() => {
    // Check if ?debug=1 in URL query
    const params = new URLSearchParams(window.location.search);
    setIsDebug(params.get('debug') === '1');
  }, []);

  return (
    <div className="portfolio-app" style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
      {/* Background Interactive ctOS Network Map */}
      <CtosMap isPhoneSettled={isPhoneSettled} />

      {/* Foreground Scroll Stage & Hand-Phone 3D Arc */}
      <HandPhoneStage
        onSettledChange={setIsPhoneSettled}
        isDebug={isDebug}
      />

      {/* Debug Indicator if active */}
      {isDebug && (
        <div
          style={{
            position: 'fixed',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 69, 54, 0.9)',
            color: '#ffffff',
            padding: '4px 12px',
            borderRadius: '2px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          DEBUG MODE ACTIVE (CALIBRATION ENABLED)
        </div>
      )}
    </div>
  );
};

export default App;
