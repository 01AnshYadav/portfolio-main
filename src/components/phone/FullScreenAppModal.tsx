import React, { useEffect } from 'react';
import type { AppId } from './DedSecPhoneOS';
import { WhoamiApp } from './apps/WhoamiApp';
import { MissionsApp } from './apps/MissionsApp';
import { LoadoutApp } from './apps/LoadoutApp';
import { FollowersApp } from './apps/FollowersApp';
import { TerminalApp } from './apps/TerminalApp';
import { SignalApp } from './apps/SignalApp';
import './FullScreenAppModal.css';

interface FullScreenAppModalProps {
  appId: AppId | null;
  onClose: () => void;
  followerCount: number;
  activityLogs: string[];
  onAddFollowers: (amount: number, reason: string) => void;
  onCtosOverridePulse?: () => void;
}

export const FullScreenAppModal: React.FC<FullScreenAppModalProps> = ({
  appId,
  onClose,
  followerCount,
  activityLogs,
  onAddFollowers,
  onCtosOverridePulse,
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!appId || appId === 'HOME') return null;

  const appTitles: Record<string, string> = {
    WHOAMI: 'DEDSEC // BIO & OPERATIVE DOSSIER',
    MISSIONS: 'DEDSEC // PROJECTS & REPOSITORIES',
    LOADOUT: 'ctOS 2.0 // CERTIFICATES & SKILL TREE',
    FOLLOWERS: 'DEDSEC // BOTNET LEADERBOARD & TELEMETRY',
    TERMINAL: 'DEDSEC // ROOT TERMINAL & RESUME ARCHIVES',
    SIGNAL: 'ENCRYPTED DISPATCH // CONTACT CHANNELS',
  };

  return (
    <div
      className="fullscreen-app-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={appTitles[appId] || 'DedSec Full Screen Application'}
    >
      {/* Background CRT Scanlines & Cyber Grid */}
      <div className="fullscreen-crt-lines" />
      <div className="fullscreen-grid-ambient" />

      {/* Top DedSec System Bar */}
      <header className="fullscreen-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="fullscreen-return-btn"
            onClick={onClose}
            title="Return to DedSec Hub (ESC)"
          >
            <span className="btn-glyph">&lt;</span>
            <span className="btn-text">[ &lt; RETURN_TO_HUB ]</span>
          </button>

          <div className="app-breadcrumb">
            <span className="breadcrumb-dot" />
            <span className="breadcrumb-title">{appTitles[appId] || appId}</span>
          </div>
        </div>

        <div className="topbar-right">
          <div className="system-telemetry">
            <span className="telemetry-item">
              <span className="dim-label">FOLLOWERS:</span>{' '}
              <span className="val-green">{followerCount.toLocaleString()}</span>
            </span>
            <span className="telemetry-separator">//</span>
            <span className="telemetry-item">
              <span className="dim-label">SECURITY:</span>{' '}
              <span className="val-cyan">AES-256 AIR-GAPPED</span>
            </span>
            <span className="telemetry-separator">//</span>
            <span className="telemetry-item">
              <span className="dim-label">SESSION:</span>{' '}
              <span className="val-green">[ROOT_ACTIVE]</span>
            </span>
          </div>

          <button
            type="button"
            className="fullscreen-close-x"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Full-Screen App Canvas */}
      <main className="fullscreen-content-area">
        <div className="fullscreen-content-inner">
          {appId === 'WHOAMI' && <WhoamiApp />}
          {appId === 'MISSIONS' && <MissionsApp onFollowerBonus={onAddFollowers} />}
          {appId === 'LOADOUT' && <LoadoutApp />}
          {appId === 'FOLLOWERS' && (
            <FollowersApp followerCount={followerCount} activityLogs={activityLogs} />
          )}
          {appId === 'TERMINAL' && <TerminalApp />}
          {appId === 'SIGNAL' && (
            <SignalApp
              onTakeDownCtos={() => {
                onAddFollowers(10000, 'Global ctOS 2.0 Take Down Executed');
                if (onCtosOverridePulse) onCtosOverridePulse();
              }}
            />
          )}
        </div>
      </main>

      {/* Bottom Technical Status Ticker */}
      <footer className="fullscreen-bottombar">
        <div className="ticker-left">
          <span>DEDSEC OS 2.0 // LUCKNOW-SF RELAY ACTIVE</span>
          <span className="ticker-pulse">● LIVE</span>
        </div>
        <div className="ticker-right">
          <span>PRESS [ESC] OR CLICK RETURN TO RESUME SMARTPHONE VIEW</span>
        </div>
      </footer>
    </div>
  );
};
