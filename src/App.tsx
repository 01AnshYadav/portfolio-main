import React, { useState, useEffect } from 'react';
import { CtosMap } from './components/CtosMap';
import { HandPhoneStage } from './components/HandPhoneStage';
import { FullScreenAppModal } from './components/phone/FullScreenAppModal';
import { BootSequence } from './components/BootSequence';
import type { AppId } from './components/phone/DedSecPhoneOS';
import { WD2_STATS } from './config';

export const App: React.FC = () => {
  const [isPhoneSettled, setIsPhoneSettled] = useState<boolean>(false);
  const [isDebug, setIsDebug] = useState<boolean>(false);
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    // Check if user already booted during this browser session
    try {
      return Boolean(sessionStorage.getItem('dedsec_booted_session'));
    } catch {
      return false;
    }
  });

  const [fullScreenApp, setFullScreenApp] = useState<AppId | null>(null);
  const [followerCount, setFollowerCount] = useState<number>(WD2_STATS.followersCurrent);
  const [activityLogs, setActivityLogs] = useState<string[]>([
    'Botnet baseline established (Lucknow Relay)',
    'Encrypted ctOS bypass node connected',
    'Operative session verified: Marcus Holloway (01AnshYadav)',
  ]);

  const addFollowers = (amount: number, reason: string) => {
    setFollowerCount((prev) => prev + amount);
    setActivityLogs((prev) => [...prev, `${reason} (+${amount.toLocaleString()})`]);
  };

  const handleBootComplete = () => {
    setIsBooted(true);
    try {
      sessionStorage.setItem('dedsec_booted_session', '1');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Check if ?debug=1 in URL query
    const params = new URLSearchParams(window.location.search);
    setIsDebug(params.get('debug') === '1');
  }, []);

  return (
    <div className="portfolio-app" style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
      {/* 1. Initial Terminal Boot Sequence & Wrong Profile Override (Prompt A) */}
      {!isBooted && <BootSequence onComplete={handleBootComplete} />}

      {/* 3. Background Interactive ctOS Network Map */}
      <CtosMap
        isPhoneSettled={isPhoneSettled}
        onOpenApp={(appId) => setFullScreenApp(appId)}
      />

      {/* 4. Foreground Scroll Stage & DedSec Smartphone 3D Arc */}
      <HandPhoneStage
        onSettledChange={setIsPhoneSettled}
        isDebug={isDebug}
        onOpenApp={(appId) => setFullScreenApp(appId)}
      />

      {/* 5. Watch Dogs 2 Full-Screen Desktop Application Modal (Prompt C) */}
      <FullScreenAppModal
        appId={fullScreenApp}
        onClose={() => setFullScreenApp(null)}
        followerCount={followerCount}
        activityLogs={activityLogs}
        onAddFollowers={addFollowers}
      />

      {/* Debug Indicator if active */}
      {isDebug && (
        <div
          style={{
            position: 'fixed',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ff3838',
            color: '#0b0d10',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: '0',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          DEBUG MODE ACTIVE [CALIBRATION ENABLED]
        </div>
      )}
    </div>
  );
};

export default App;
