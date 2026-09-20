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

      {/* 2. DEDSEC FOLLOWER & LEVEL HEADER */}
      <div className="wd2-follower-hud">
        <div className="follower-bar-outer">
          <div className="follower-bar-inner">
            <span className="follower-heart-icon">♥</span>
            <span className="follower-numbers">
              {WD2_STATS.followersCurrent} / {WD2_STATS.followersTarget}
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
      </div>

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

      {/* 5. 8-APP LAUNCHER GRID */}
      <div className="wd2-app-grid">
        {/* App 1: Nudle Maps (Missions) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('MISSIONS')}
          title="Open Operations & Missions"
        >
          <div className="app-icon nudle-maps-icon">
            <div className="map-roads" />
            <div className="compass-arrow" />
          </div>
          <span className="app-label">Nudle Maps</span>
        </button>

        {/* App 2: DedSec App (WHOAMI) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('WHOAMI')}
          title="Open DedSec Profiler & Identity"
        >
          <div className="app-icon dedsec-app-icon">
            <div className="pixel-eyeball" />
          </div>
          <span className="app-label">DedSec App</span>
        </button>

        {/* App 3: ./Research (Loadout) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('LOADOUT')}
          title="Open Skill Tree & ctOS Modules"
        >
          <div className="app-icon research-icon">
            <div className="keycap-shape">
              <span className="keycap-skull">💀</span>
            </div>
          </div>
          <span className="app-label">./Research</span>
        </button>

        {/* App 4: Car on Demand (Signal) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('SIGNAL')}
          title="Open Comms & Defense Bypass"
        >
          <div className="app-icon car-demand-icon">
            <div className="steering-gauge" />
            <span className="app-badge">1</span>
          </div>
          <span className="app-label">Car on Demand</span>
        </button>

        {/* App 5: App Shop (Loadout/Certs) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('LOADOUT')}
          title="Open Security Modules Repository"
        >
          <div className="app-icon app-shop-icon">
            <div className="phone-screen-glyph">
              <span className="star-glyph">★</span>
            </div>
          </div>
          <span className="app-label">App Shop</span>
        </button>

        {/* App 6: Media Player (Terminal) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('TERMINAL')}
          title="Open Root Shell & Media"
        >
          <div className="app-icon media-player-icon">
            <div className="cassette-tape" />
          </div>
          <span className="app-label">Media Player</span>
        </button>

        {/* App 7: Leaderboard (Followers) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('FOLLOWERS')}
          title="Open Botnet Leaderboard"
        >
          <div className="app-icon leaderboard-icon">
            <div className="isometric-cube" />
          </div>
          <span className="app-label">Leaderboard</span>
        </button>

        {/* App 8: ScoutX (Missions CTF) */}
        <button
          type="button"
          className="wd2-app-item"
          onClick={() => handleAppClick('MISSIONS')}
          title="Open ScoutX Security Labs"
        >
          <div className="app-icon scoutx-icon">
            <span className="cross-x">✖</span>
            <span className="app-badge">1</span>
          </div>
          <span className="app-label">ScoutX</span>
        </button>
      </div>

      {/* 6. CAROUSEL PAGINATION INDICATOR */}
      <div className="wd2-pagination">
        <span className="page-arrow">◀</span>
        <span className="page-dot active">◉</span>
        <span className="page-dot">○</span>
        <span className="page-arrow">▶</span>
      </div>

      {/* 7. BOTTOM DOCK (4 APPS) */}
      <div className="wd2-dock-shelf">
        {/* Camera (Whoami) */}
        <button
          type="button"
          className="wd2-dock-item"
          onClick={() => handleAppClick('WHOAMI')}
          title="ctOS Profiler Camera"
        >
          <div className="dock-icon camera-icon">
            <span className="cam-lens" />
          </div>
          <span className="dock-label">Camera</span>
        </button>

        {/* Know-It-All (Whoami / Manifesto) */}
        <button
          type="button"
          className="wd2-dock-item"
          onClick={() => handleAppClick('WHOAMI')}
          title="About & Manifesto"
        >
          <div className="dock-icon knowitall-icon">
            <span className="bulb-glyph">💡</span>
          </div>
          <span className="dock-label">Know-It-All</span>
        </button>

        {/* Multiplayer (Followers) */}
        <button
          type="button"
          className="wd2-dock-item"
          onClick={() => handleAppClick('FOLLOWERS')}
          title="Botnet Operatives & Crew"
        >
          <div className="dock-icon multiplayer-icon">
            <div className="multiplayer-cards" />
          </div>
          <span className="dock-label">Multiplayer</span>
        </button>

        {/* Game Options (Terminal) */}
        <button
          type="button"
          className="wd2-dock-item"
          onClick={() => handleAppClick('TERMINAL')}
          title="Terminal CLI & System Settings"
        >
          <div className="dock-icon options-icon">
            <span className="gear-glyph gear-cyan">⚙</span>
            <span className="gear-glyph gear-green">⚙</span>
          </div>
          <span className="dock-label">Game Options</span>
        </button>
      </div>

      {/* 8. BOTTOM BEZEL & CLOSE ESC BUTTON */}
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
