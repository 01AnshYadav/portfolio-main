import React, { useState, useEffect } from 'react';
import { CtosMap } from './components/CtosMap';
import { HandPhoneStage } from './components/HandPhoneStage';
import { FullScreenAppModal } from './components/phone/FullScreenAppModal';
import type { AppId } from './components/phone/DedSecPhoneOS';
import { WD2_STATS } from './config';

export const App: React.FC = () => {
  const [isPhoneSettled, setIsPhoneSettled] = useState<boolean>(false);
  const [isDebug, setIsDebug] = useState<boolean>(false);
  const [fullScreenApp, setFullScreenApp] = useState<AppId | null>(null);
  const [followerCount, setFollowerCount] = useState<number>(WD2_STATS.followersCurrent);
  const [activityLogs, setActivityLogs] = useState<string[]>([
    'Botnet baseline established (Lucknow Relay)',
    'Encrypted ctOS bypass node connected',
    'Operative session verified: 01AnshYadav',
  ]);

  const addFollowers = (amount: number, reason: string) => {
    setFollowerCount((prev) => prev + amount);
    setActivityLogs((prev) => [...prev, `${reason} (+${amount.toLocaleString()})`]);
  };

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
        onOpenApp={(appId) => setFullScreenApp(appId)}
      />

      {/* Watch Dogs 2 Full-Screen Desktop Modal */}
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
