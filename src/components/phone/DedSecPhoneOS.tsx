import React, { useState, useEffect } from 'react';
import './DedSecPhoneOS.css';

export type AppId = 'HOME' | 'WHOAMI' | 'MISSIONS' | 'LOADOUT' | 'LEARNING' | 'SIGNAL' | 'TERMINAL' | 'FOLLOWERS';

interface DedSecPhoneOSProps {
  onOpenApp?: (appId: AppId) => void;
  onClosePhone?: () => void;
  followerCount?: number;
}

export const DedSecPhoneOS: React.FC<DedSecPhoneOSProps> = ({
  onOpenApp,
  onClosePhone,
  followerCount = 2320950,
}) => {
  const [clockTime, setClockTime] = useState<string>('04:04');

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

  const handleAppClick = (appId: AppId) => {
    if (onOpenApp) {
      onOpenApp(appId);
    }
  };

  const coreApps = [
    {
      id: 'WHOAMI' as AppId,
      code: '01_ABOUT',
      label: 'BIO',
      subtext: 'Ansh Yadav // B.Tech',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="1.8">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21 C5.5 16 8.5 14 12 14 C15.5 14 18.5 16 18.5 21" />
        </svg>
      ),
      tag: '[BIO_01]',
    },
    {
      id: 'MISSIONS' as AppId,
      code: '02_PROJECTS',
      label: 'PROJECTS',
      subtext: 'Uni Manager & Repos',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00e5ff" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="0" />
          <path d="M8 9l4 3-4 3" />
          <line x1="14" y1="15" x2="17" y2="15" />
        </svg>
      ),
      tag: '[OPS_02]',
    },
    {
      id: 'LOADOUT' as AppId,
      code: '03_CERTS',
      label: 'CERTIFICATES',
      subtext: 'Verified Credentials',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="1.8">
          <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      tag: '[CRT_03]',
    },
    {
      id: 'LEARNING' as AppId,
      code: '04_LEARNING',
      label: 'LEARNING',
      subtext: 'TryHackMe & LeetCode',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="1.8">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      tag: '[LAB_04]',
    },
    {
      id: 'SIGNAL' as AppId,
      code: '05_CONTACT',
      label: 'CONTACT',
      subtext: 'Open Channels // DC',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ff0055" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" />
          <polyline points="3,7 12,13 21,7" />
        </svg>
      ),
      tag: '[COM_05]',
    },
    {
      id: 'TERMINAL' as AppId,
      code: '06_TERMINAL',
      label: 'TERMINAL',
      subtext: 'ctOS Shell & CLI',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00e5ff" strokeWidth="1.8">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
      tag: '[SH_06]',
    },
  ];

  return (
    <div className="dedsec-phone-hub" role="application" aria-label="DedSec Phone OS Hub">
      {/* 1. Top System Status Bar */}
      <div className="hub-status-bar">
        <div className="status-left">
          <span className="hub-tag">[DEDSEC // ROOT]</span>
        </div>
        <div className="status-right">
          <span className="hub-time">{clockTime}</span>
          <span className="hub-cipher">[AES_256]</span>
          <span className="hub-signal">
            <span className="sig-bar" style={{ height: '4px' }} />
            <span className="sig-bar" style={{ height: '7px' }} />
            <span className="sig-bar" style={{ height: '10px' }} />
          </span>
        </div>
      </div>

      {/* 2. System Profiler & Followers Telemetry HUD */}
      <div className="hub-telemetry-hud">
        <div className="telemetry-row">
          <span className="dim-label">TARGET_NODE:</span>
          <span className="val-cyan">LUCKNOW_RELAY_09</span>
        </div>
        <div className="telemetry-row">
          <span className="dim-label">BOTNET_POWER:</span>
          <span className="val-green">{followerCount.toLocaleString()} OPERATIVES</span>
        </div>
        <div className="telemetry-row">
          <span className="dim-label">DEFCON_STATE:</span>
          <span className="val-alert">LEVEL 1 // OFF-GRID</span>
        </div>
      </div>

      {/* 3. The 4 Crisp DedSec Core App Cards (WHOAMI, MISSIONS, LOADOUT, SIGNAL) */}
      <div className="hub-apps-grid">
        {coreApps.map((app) => (
          <button
            key={app.id}
            type="button"
            className="hub-app-card glitch-hover"
            onClick={() => handleAppClick(app.id)}
            title={`Launch ${app.label}`}
          >
            <div className="app-card-header">
              <span className="card-tag">{app.tag}</span>
              <span className="card-dot" />
            </div>

            <div className="app-card-body">
              <div className="app-icon-slot">
                {app.icon}
              </div>
              <div className="app-meta">
                <span className="app-code">{app.code}</span>
                <span className="app-label-text">{app.label}</span>
                <span className="app-subtext">{app.subtext}</span>
              </div>
            </div>

            <div className="app-card-footer">
              <span>[ EXECUTE_APP ]</span>
              <span className="arrow-glyph">&gt;</span>
            </div>
          </button>
        ))}
      </div>

      {/* 4. Terminal CLI Quick Access Bar */}
      <div className="hub-terminal-strip">
        <button
          type="button"
          className="terminal-strip-btn glitch-hover"
          onClick={() => handleAppClick('TERMINAL')}
          title="Open Root Interactive Shell"
        >
          <span className="term-prompt">&gt;_</span>
          <span className="term-text">TERMINAL // RESUME ARCHIVES &amp; DOWNLOAD</span>
          <span className="term-status">[READY]</span>
        </button>
      </div>

      {/* 5. Bottom Technical Bezel Bar */}
      <div className="hub-bottom-bezel">
        <div className="bezel-left">
          <span>SEC_HASH: 4A9F-8B12-C034</span>
        </div>

        {onClosePhone && (
          <button
            type="button"
            className="hub-close-btn"
            onClick={onClosePhone}
            title="Close Phone View (ESC)"
          >
            [ CLOSE_PHONE ]
          </button>
        )}
      </div>
    </div>
  );
};
