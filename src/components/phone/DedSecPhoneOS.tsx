import React, { useState, useEffect } from 'react';
import './DedSecPhoneOS.css';
import { WhoamiApp } from './apps/WhoamiApp';
import { MissionsApp } from './apps/MissionsApp';
import { LoadoutApp } from './apps/LoadoutApp';
import { FollowersApp } from './apps/FollowersApp';
import { TerminalApp } from './apps/TerminalApp';
import { SignalApp } from './apps/SignalApp';

export type AppId = 'HOME' | 'WHOAMI' | 'MISSIONS' | 'LOADOUT' | 'FOLLOWERS' | 'TERMINAL' | 'SIGNAL';

interface DedSecPhoneOSProps {
  onCtosOverridePulse?: () => void;
}

export const DedSecPhoneOS: React.FC<DedSecPhoneOSProps> = ({ onCtosOverridePulse }) => {
  const [activeApp, setActiveApp] = useState<AppId>('HOME');
  const [clockTime, setClockTime] = useState<string>('09:41');
  const [followerCount, setFollowerCount] = useState<number>(428750);
  const [activityLogs, setActivityLogs] = useState<string[]>([
    'Botnet baseline established (Lucknow Relay)',
    'Encrypted ctOS bypass node connected',
    'Operative session verified: 01AnshYadav',
  ]);

  // Live system clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setClockTime(
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
      );
    };
    updateTime();
    const interval = window.setInterval(updateTime, 10000);
    return () => window.clearInterval(interval);
  }, []);

  const addFollowers = (amount: number, reason: string) => {
    setFollowerCount((prev) => prev + amount);
    setActivityLogs((prev) => [...prev, `${reason} (+${amount.toLocaleString()})`]);
  };

  const apps = [
    {
      id: 'WHOAMI' as AppId,
      label: 'WHOAMI',
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21 C5.5 16 8.5 14 12 14 C15.5 14 18.5 16 18.5 21" />
        </svg>
      ),
    },
    {
      id: 'MISSIONS' as AppId,
      label: 'MISSIONS',
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      ),
    },
    {
      id: 'LOADOUT' as AppId,
      label: 'LOADOUT',
      icon: (
        <svg viewBox="0 0 24 24">
          <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 'FOLLOWERS' as AppId,
      label: 'FOLLOWERS',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'TERMINAL' as AppId,
      label: 'TERMINAL',
      icon: (
        <svg viewBox="0 0 24 24">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
    },
    {
      id: 'SIGNAL' as AppId,
      label: 'SIGNAL',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
          <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <line x1="12" y1="14" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div className="dedsec-os" role="application" aria-label="DedSec Smartphone OS">
      {/* Top Status Bar */}
      <div className="os-status-bar">
        {activeApp !== 'HOME' ? (
          <button
            type="button"
            className="nav-back"
            onClick={() => setActiveApp('HOME')}
            aria-label="Back to Home Screen"
          >
            ◀ BACK
          </button>
        ) : (
          <span style={{ color: 'var(--ink)' }}>{clockTime}</span>
        )}

        <div className="uplink-badge">
          <span className="uplink-dot" />
          <span>DEDSEC // {activeApp}</span>
        </div>

        <div style={{ display: 'flex', gap: '1cqw', alignItems: 'center' }}>
          <span>LTE</span>
          <span className="pbat" />
        </div>
      </div>

      {/* Main Screen Content: Home Screen vs Active App */}
      {activeApp === 'HOME' ? (
        <div className="os-home-screen">
          <div className="os-grid">
            {apps.map((app) => (
              <button
                key={app.id}
                type="button"
                className="os-app-btn"
                onClick={() => setActiveApp(app.id)}
                aria-label={`Open ${app.label}`}
              >
                <div className="os-app-icon">{app.icon}</div>
                <span className="os-app-label">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="os-app-view">
          {activeApp === 'WHOAMI' && <WhoamiApp />}
          {activeApp === 'MISSIONS' && <MissionsApp onFollowerBonus={addFollowers} />}
          {activeApp === 'LOADOUT' && <LoadoutApp />}
          {activeApp === 'FOLLOWERS' && (
            <FollowersApp followerCount={followerCount} activityLogs={activityLogs} />
          )}
          {activeApp === 'TERMINAL' && <TerminalApp />}
          {activeApp === 'SIGNAL' && (
            <SignalApp
              onTakeDownCtos={() => {
                addFollowers(5000, 'Global ctOS Override Executed');
                if (onCtosOverridePulse) onCtosOverridePulse();
              }}
            />
          )}
        </div>
      )}

      {/* Bottom Home Indicator Bar (.pbar) */}
      <button
        type="button"
        className="os-home-bar-btn"
        onClick={() => setActiveApp('HOME')}
        title="Return to Home"
        aria-label="Home"
      >
        <span className="os-home-bar-pill" />
      </button>
    </div>
  );
};
