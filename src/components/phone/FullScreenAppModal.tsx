import React, { useState, useEffect } from 'react';
import type { AppId } from './DedSecPhoneOS';
import { TerminalApp } from './apps/TerminalApp';
import './FullScreenAppModal.css';

interface FullScreenAppModalProps {
  appId: AppId | null;
  onClose: () => void;
  followerCount: number;
  activityLogs: string[];
  onAddFollowers: (amount: number, reason: string) => void;
  onCtosOverridePulse?: () => void;
}

const PAGE_CONFIG: Record<
  string,
  { title: string; url: string; label: string; tag: string }
> = {
  WHOAMI: {
    title: '01 // ABOUT // ANSH YADAV',
    url: '/pages/about.html',
    label: '01 BIO',
    tag: '[ID_01]',
  },
  MISSIONS: {
    title: '02 // PROJECTS // REPOSITORIES',
    url: '/pages/projects.html',
    label: '02 PROJECTS',
    tag: '[OPS_02]',
  },
  LOADOUT: {
    title: '03 // CERTIFICATES // CREDENTIALS',
    url: '/pages/certs.html',
    label: '03 CERTS',
    tag: '[CRT_03]',
  },
  LEARNING: {
    title: '04 // LEARNING // ACTIVE FEEDS',
    url: '/pages/learning.html',
    label: '04 LEARNING',
    tag: '[LAB_04]',
  },
  SIGNAL: {
    title: '05 // CONTACT // OPEN CHANNELS',
    url: '/pages/contact.html',
    label: '05 CONTACT',
    tag: '[COM_05]',
  },
  TERMINAL: {
    title: '06 // TERMINAL // ctOS ROOT SHELL',
    url: '',
    label: '06 TERMINAL',
    tag: '[SH_06]',
  },
};

export const FullScreenAppModal: React.FC<FullScreenAppModalProps> = ({
  appId,
  onClose,
  followerCount,
}) => {
  const [currentApp, setCurrentApp] = useState<AppId | null>(appId);

  // Sync internal state when opened from outside
  useEffect(() => {
    if (appId) {
      setCurrentApp(appId);
    }
  }, [appId]);

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

  // Listen for postMessage from embedded page iframe (e.g. clicking [ < HUB ] or 00 Hub)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'DEDSEC_CLOSE_MODAL') {
        onClose();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  if (!appId || appId === 'HOME') return null;

  const activeId = currentApp || appId;
  const config = PAGE_CONFIG[activeId] || PAGE_CONFIG.WHOAMI;

  return (
    <div
      className="fullscreen-app-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
    >
      {/* Background CRT Scanlines */}
      <div className="fullscreen-crt-lines" />

      {/* Top DedSec System Bar with Navigation Tabs */}
      <header className="fullscreen-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="fullscreen-return-btn"
            onClick={onClose}
            title="Return to DedSec City Map (ESC)"
          >
            <span className="btn-glyph">&lt;</span>
            <span className="btn-text">[ &lt; RETURN_TO_HUB ]</span>
          </button>

          {/* Direct Tab Switchers */}
          <nav className="modal-tabs-nav" aria-label="Section Navigation">
            {(['WHOAMI', 'MISSIONS', 'LOADOUT', 'LEARNING', 'SIGNAL', 'TERMINAL'] as AppId[]).map((tabId) => {
              const tab = PAGE_CONFIG[tabId];
              const isActive = activeId === tabId;
              return (
                <button
                  key={tabId}
                  type="button"
                  className={`modal-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentApp(tabId)}
                  title={`Switch to ${tab.label}`}
                >
                  <span className="tab-tag">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="topbar-right">
          <div className="system-telemetry">
            <span className="telemetry-item">
              <span className="dim-label">BOTNET:</span>{' '}
              <span className="val-green">{followerCount.toLocaleString()}</span>
            </span>
            <span className="telemetry-separator">//</span>
            <span className="telemetry-item">
              <span className="dim-label">SECURITY:</span>{' '}
              <span className="val-cyan">AES-256 [SYS_OK]</span>
            </span>
          </div>

          {/* Direct link to standalone HTML page */}
          {config.url && (
            <a
              href={config.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fullscreen-ext-link"
              title="Open Standalone HTML Page in New Tab"
            >
              [ STANDALONE ↗ ]
            </a>
          )}

          <button
            type="button"
            className="fullscreen-close-x"
            onClick={onClose}
            aria-label="Close"
            title="Close View (ESC)"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Full-Screen App Canvas */}
      <main className="fullscreen-content-area embedded-mode">
        {activeId === 'TERMINAL' ? (
          <div className="fullscreen-content-inner">
            <TerminalApp />
          </div>
        ) : (
          <iframe
            key={config.url}
            src={config.url}
            title={config.title}
            className="fullscreen-page-iframe"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
          />
        )}
      </main>

      {/* Bottom Technical Status Ticker */}
      <footer className="fullscreen-bottombar">
        <div className="ticker-left">
          <span>ctOS_LKO // NODE 01</span>
          <span className="ticker-pulse">● LIVE CONNECTION</span>
        </div>
        <div className="ticker-right">
          <span>CLICK [ &lt; HUB ] OR PRESS [ESC] TO RETURN TO CITY MAP</span>
        </div>
      </footer>
    </div>
  );
};
