import React, { useState, useEffect } from 'react';
import { WD2_STATS } from '../../config';
import './DedSecPhoneOS.css';

export type AppId = 'HOME' | 'WHOAMI' | 'MISSIONS' | 'LOADOUT' | 'FOLLOWERS' | 'TERMINAL' | 'SIGNAL';

interface DedSecPhoneOSProps {
  onOpenApp?: (appId: AppId) => void;
  onClosePhone?: () => void;
}

export const DedSecPhoneOS: React.FC<DedSecPhoneOSProps> = ({
  onOpenApp,
  onClosePhone,
}) => {
  const [clockTime, setClockTime] = useState<string>('4:04');

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

  const handleAppClick = (appId: AppId) => {
    if (onOpenApp) {
      onOpenApp(appId);
    }
  };

  const sixApps = [
    {
      id: 'WHOAMI' as AppId,
      name: 'Bio',
      iconClass: 'bio-icon',
      iconElement: (
        <div className="app-glyph bio-glyph">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      ),
      tooltip: 'Operative Bio & Identity',
    },
    {
      id: 'MISSIONS' as AppId,
      name: 'Projects',
      iconClass: 'projects-icon',
      iconElement: (
        <div className="app-glyph projects-glyph">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#3aaec4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      ),
      tooltip: 'GitHub Projects & Repos',
    },
    {
      id: 'LOADOUT' as AppId,
      name: 'Certificates',
      iconClass: 'certs-icon',
      iconElement: (
        <div className="app-glyph certs-glyph">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ffaa00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" stroke="#ffffff" />
          </svg>
        </div>
      ),
      tooltip: 'AWS & ctOS Security Modules',
    },
    {
      id: 'LOADOUT' as AppId,
      name: 'Skills',
      iconClass: 'skills-icon',
      iconElement: (
        <div className="app-glyph skills-glyph">
          <div className="keycap-shape">
            <span className="keycap-skull">💀</span>
          </div>
        </div>
      ),
      tooltip: 'Technical Skill Tree & Arsenal',
    },
    {
      id: 'TERMINAL' as AppId,
      name: 'Terminal',
      iconClass: 'terminal-icon',
      iconElement: (
        <div className="app-glyph terminal-glyph">
          <span className="prompt-symbol">&gt;_</span>
        </div>
      ),
      tooltip: 'Root Shell & Resume Download',
    },
    {
      id: 'SIGNAL' as AppId,
      name: 'Contact',
      iconClass: 'contact-icon',
      iconElement: (
        <div className="app-glyph contact-glyph">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
      ),
      tooltip: 'Encrypted Comms & Bypass',
    },
  ];

  return (
    <div className="wd2-phone-os" role="application" aria-label="Watch Dogs 2 Smartphone OS">
      {/* 1. TOP SYSTEM STATUS BAR */}
      <div className="wd2-status-bar">
        <div className="status-left">
          <span className="new-content-badge">
            <span className="plus-icon">+</span>
            <span className="new-content-text">New content available</span>
          </span>
        </div>
        <div className="status-right">
          <span className="status-clock">{clockTime}</span>
          <span className="status-signal">
            <svg viewBox="0 0 16 12" width="14" height="10" fill="currentColor">
              <rect x="1" y="9" width="2" height="3" />
              <rect x="4" y="6" width="2" height="6" />
              <rect x="7" y="4" width="2" height="8" />
              <rect x="10" y="1" width="2" height="11" />
            </svg>
          </span>
          <span className="status-battery">
            <span className="battery-body">
              <span className="battery-level" />
            </span>
          </span>
        </div>
      </div>

      {/* 2. DEDSEC FOLLOWER & LEVEL HEADER (Clickable to view Leaderboard) */}
      <button
        type="button"
        className="wd2-follower-hud-btn"
        onClick={() => handleAppClick('FOLLOWERS')}
        title="View Botnet Telemetry & Rankings"
      >
        <div className="follower-bar-outer">
          <div className="follower-bar-inner">
            <span className="follower-heart-icon">♥</span>
            <span className="follower-numbers">
              {WD2_STATS.followersCurrent.toLocaleString()} / {WD2_STATS.followersTarget.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="follower-meta-row">
          <span className="level-tag">LEVEL {WD2_STATS.level}</span>
          <div className="research-money-group">
            <span className="research-points">
              <span className="skull-icon">💀</span> +{WD2_STATS.researchPoints}
            </span>
            <span className="money-balance">
              ${WD2_STATS.bankBalance.toLocaleString()}
            </span>
            <span className="wallet-icon">🗂</span>
          </div>
        </div>
      </button>

      {/* 3. SAN FRANCISCO / LUCKNOW WEATHER WIDGET */}
      <div className="wd2-weather-card">
        <div className="weather-main">
          {/* Moon Graphic with clouds */}
          <div className="weather-moon-wrapper">
            <div className="moon-sphere" />
            <div className="cloud-puff" />
          </div>
          <div className="weather-temp-info">
            <span className="weather-temp">{WD2_STATS.weather.temp}</span>
            <span className="weather-city">{WD2_STATS.weather.location}</span>
            <span className="weather-condition">{WD2_STATS.weather.condition}</span>
          </div>
        </div>

        <div className="weather-forecast">
          <div className="forecast-row">
            <span className="forecast-day">Today</span>
            <span className="forecast-icon sun-cloud">⛅</span>
            <span className="forecast-temp">{WD2_STATS.weather.today}</span>
          </div>
          <div className="forecast-row">
            <span className="forecast-day">Tomorrow</span>
            <span className="forecast-icon sun">☀️</span>
            <span className="forecast-temp">{WD2_STATS.weather.tomorrow}</span>
          </div>
        </div>
      </div>

      {/* 4. DEDSEC COMIC POP-ART WALLPAPER WITH LASER BEAMS */}
      <div className="wd2-comic-wallpaper" aria-hidden="true">
        {/* Frankenstein monster eyes cyan laser beams */}
        <div className="laser-beam beam-left" />
        <div className="laser-beam beam-right" />
        <div className="comic-halftone-pattern" />
      </div>

      {/* 5. ONLY 6 APPS GRID WITH REAL NAMES (BIO, PROJECTS, CERTIFICATES, SKILLS, TERMINAL, CONTACT) */}
      <div className="wd2-six-apps-container">
        <div className="wd2-six-apps-grid">
          {sixApps.map((app, idx) => (
            <button
              key={`${app.id}-${idx}`}
              type="button"
              className="wd2-six-app-card"
              onClick={() => handleAppClick(app.id)}
              title={app.tooltip}
            >
              <div className={`app-icon-box ${app.iconClass}`}>
                {app.iconElement}
              </div>
              <span className="app-title-label">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. BOTTOM BEZEL & CLOSE ESC BUTTON */}
      <div className="wd2-bottom-bezel">
        <div className="dedsec-hex-home" title="DedSec Core">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#606d75" strokeWidth="1.8">
            <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        </div>

        <button
          type="button"
          className="wd2-close-esc-btn"
          onClick={onClosePhone}
          title="Close Phone (Slide Away)"
        >
          <span className="close-text">Close</span>
          <span className="esc-key">Esc</span>
        </button>
      </div>
    </div>
  );
};
