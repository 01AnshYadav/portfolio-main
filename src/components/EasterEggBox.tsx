import React, { useState, useEffect } from 'react';
import './EasterEggBox.css';

interface EasterEggBoxProps {
  acquired: number;
  total?: number;
  isDimmed?: boolean;
}

export const EasterEggBox: React.FC<EasterEggBoxProps> = ({
  acquired,
  total = 8,
  isDimmed = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [showLockedAlert, setShowLockedAlert] = useState<boolean>(false);
  const [modalTheme, setModalTheme] = useState<'cinematic-white' | 'dark'>('cinematic-white');

  const isUnlocked = acquired >= total && total > 0;
  const progressPercent = Math.min(100, Math.round((acquired / total) * 100));

  // ESC key closes popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen]);

  const handleBoxClick = () => {
    if (isUnlocked) {
      setIsPopupOpen(true);
    } else {
      setShowLockedAlert(true);
      setTimeout(() => setShowLockedAlert(false), 2200);
    }
  };

  const handleQuickBreach = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Dispatch custom event to CtosMap to breach all targets instantly
    window.dispatchEvent(new CustomEvent('DEDSEC_BREACH_ALL'));
  };

  return (
    <>
      {/* Small Image Box positioned at Middle-Right Edge of the Main Page */}
      <div
        className={`ctos-easter-egg-box ${isUnlocked ? 'unlocked' : 'locked'} ${
          isDimmed ? 'dimmed' : ''
        }`}
        onClick={handleBoxClick}
        role="button"
        tabIndex={0}
        aria-label={
          isUnlocked
            ? 'DedSec Classified Payload: Unlocked! Click to view easter egg'
            : `ctOS Encrypted Payload: ${acquired}/${total} targets breached`
        }
        title={
          isUnlocked
            ? 'Classified Payload Decrypted! Click to reveal Marcus Holloway Dossier.'
            : `Encrypted Payload: Breach all ${total} map targets to decrypt (${acquired}/${total})`
        }
      >
        <div className="egg-header">
          <span className="egg-tag">
            {isUnlocked ? '[ 0xEE // READY ]' : `[ 0xEE // ${acquired}/${total} ]`}
          </span>
          <span className="egg-status">
            {isUnlocked ? '● DECRYPTED' : '🔒 ENCRYPTED'}
          </span>
        </div>

        {/* Thumbnail Image Container */}
        <div className="egg-img-container">
          <img
            src={`${import.meta.env.BASE_URL}assets/marcus_easter_egg.jpg`}
            alt="Marcus Holloway Preview"
            className="egg-thumb"
          />

          {!isUnlocked ? (
            <div className="egg-locked-overlay">
              <span className="egg-lock-icon">🔒</span>
              <span className="egg-count-badge">{acquired}/{total} HACKED</span>
            </div>
          ) : (
            <div className="egg-unlocked-banner">
              [ CLICK TO VIEW ]
            </div>
          )}
        </div>

        {/* Progress Fill Bar */}
        <div className="egg-progress-bar">
          <div
            className="egg-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Bottom Status Text */}
        <div className="egg-status-text">
          <span>{isUnlocked ? 'STATUS: UNLOCKED' : showLockedAlert ? 'BREACH ALL 8!' : 'PAYLOAD'}</span>
          <b>{progressPercent}%</b>
        </div>

        {/* Quick Testing Button to test immediately on localhost */}
        {!isUnlocked && (
          <button
            type="button"
            className="egg-test-btn"
            onClick={handleQuickBreach}
            title="Dev shortcut: Instantly breach all 8 map targets on localhost"
          >
            [OVERRIDE: HACK ALL]
          </button>
        )}
      </div>

      {/* Easter Egg Enlarged Dossier Modal (Authentic Watch Dogs White Cinematic Theme) */}
      {isPopupOpen && (
        <div
          className="easter-egg-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Marcus Holloway Dossier - Watch Dogs 2 Easter Egg"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className={`easter-egg-popup-dialog ${modalTheme}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vignette CRT overlay */}
            <div className="egg-cinematic-vignette" aria-hidden="true" />

            {/* Top Bar with Title and Actions */}
            <div className="egg-popup-topbar">
              <div className="egg-topbar-meta">
                <span className="egg-topbar-tag">[ ★ EASTER EGG UNLOCKED ]</span>
                <span className="egg-topbar-crumb">ctOS 2.0 // SAN_FRANCISCO_ARCHIVE // 0xRETR0</span>
              </div>
              <div className="egg-topbar-actions">
                <button
                  type="button"
                  className="egg-theme-toggle"
                  onClick={() => setModalTheme(prev => prev === 'cinematic-white' ? 'dark' : 'cinematic-white')}
                  title="Toggle Theme"
                >
                  {modalTheme === 'cinematic-white' ? 'MODE: WHITE (ORIGINAL)' : 'MODE: DARK TERMINAL'}
                </button>
                <button
                  type="button"
                  className="egg-popup-close-btn"
                  onClick={() => setIsPopupOpen(false)}
                  title="Close (ESC)"
                >
                  [ ✕ CLOSE ]
                </button>
              </div>
            </div>

            {/* Modal Main Scrollable Content */}
            <div className="egg-modal-scroll-area">
              <div className="egg-cinematic-layout">
                {/* Left Crosshairs Gutter matching the reference screenshot */}
                <div className="egg-crosshair-column" aria-hidden="true">
                  {Array.from({ length: 26 }).map((_, idx) => (
                    <span key={idx} className="egg-crosshair-glyph">+</span>
                  ))}
                </div>

                {/* Main Content Body */}
                <div className="egg-stream-content">
                  {/* Top "execute?" sequence prompt like in the intro image */}
                  <div className="egg-execute-prompt">
                    <div className="egg-prompt-line">
                      <span className="egg-prompt-q">execute?</span>
                    </div>
                    <div className="egg-prompt-response">
                      <span className="egg-prompt-ans">Y</span>
                    </div>
                  </div>

                  {/* Operative Header: PFP of Marcus Holloway & Name */}
                  <div className="egg-operative-header">
                    <div className="egg-pfp-frame">
                      <img
                        src={`${import.meta.env.BASE_URL}assets/marcus_easter_egg.jpg`}
                        alt="Marcus Holloway Profile"
                        className="egg-pfp-img"
                      />
                      <div className="egg-pfp-corners">
                        <span className="corner tl">+</span>
                        <span className="corner tr">+</span>
                        <span className="corner bl">+</span>
                        <span className="corner br">+</span>
                      </div>
                      <div className="egg-pfp-badge">SUBJ // RETR0</div>
                    </div>

                    <div className="egg-operative-titles">
                      <div className="egg-operative-flag">ctOS 2.0 BIOMETRIC PROFILE // CLASSIFIED</div>
                      <h2 className="egg-operative-name">MARCUS HOLLOWAY</h2>
                      <div className="egg-operative-alias">
                        Alias <span className="highlight">Retr0</span>. DedSec, San Francisco.
                      </div>
                      <div className="egg-status-pill">
                        <span className="pulse-dot"></span>
                        <span>STATUS: ACTIVE OPERATIVE // MISPROFILED</span>
                      </div>
                    </div>
                  </div>

                  {/* CREDENTIALS SECTION */}
                  <div className="egg-dossier-section">
                    <div className="egg-section-header">
                      <span className="egg-sec-glyph">#</span>
                      <h3 className="egg-section-title">CREDENTIALS</h3>
                    </div>
                    <div className="egg-credentials-grid">
                      <div className="egg-cred-row">
                        <span className="egg-cred-key">Name:</span>
                        <span className="egg-cred-val">Marcus Holloway</span>
                      </div>
                      <div className="egg-cred-row">
                        <span className="egg-cred-key">Alias:</span>
                        <span className="egg-cred-val highlight">Retr0</span>
                      </div>
                      <div className="egg-cred-row">
                        <span className="egg-cred-key">Group:</span>
                        <span className="egg-cred-val">DedSec, San Francisco</span>
                      </div>
                      <div className="egg-cred-row">
                        <span className="egg-cred-key">Origin:</span>
                        <span className="egg-cred-val">Oakland, California</span>
                      </div>
                      <div className="egg-cred-row">
                        <span className="egg-cred-key">Role:</span>
                        <span className="egg-cred-val">Hacker</span>
                      </div>
                      <div className="egg-cred-row egg-cred-flagged">
                        <span className="egg-cred-key">Flagged by:</span>
                        <span className="egg-cred-val flagged">ctOS 2.0, Blume (false positive)</span>
                      </div>
                    </div>
                  </div>

                  {/* MOTIVE SECTION */}
                  <div className="egg-dossier-section">
                    <div className="egg-section-header">
                      <span className="egg-sec-glyph">#</span>
                      <h3 className="egg-section-title">MOTIVE</h3>
                    </div>
                    <div className="egg-motive-body">
                      <p>
                        Blume's ctOS 2.0 ran a predictive algorithm over the whole city. It marked
                        Marcus as a criminal for something he had not done, based on a prediction
                        and not on evidence. He had been profiled, not proven.
                      </p>
                      <p>
                        That label decided what came next. He joined DedSec to fight the system
                        that wrote it.
                      </p>
                      <p>
                        The goal is to take ctOS down, expose how Blume collects and sells personal
                        data, and give control of that data back to the people it watches. The
                        method is hacking, drones, and public stunts loud enough that nobody can
                        ignore the surveillance.
                      </p>
                    </div>
                  </div>

                  {/* TOOLKIT SECTION */}
                  <div className="egg-dossier-section">
                    <div className="egg-section-header">
                      <span className="egg-sec-glyph">#</span>
                      <h3 className="egg-section-title">TOOLKIT</h3>
                    </div>
                    <div className="egg-toolkit-tags">
                      <span className="egg-tool-tag">Phone hacking</span>
                      <span className="egg-tool-tag">RC Jumper</span>
                      <span className="egg-tool-tag">Quadcopter</span>
                      <span className="egg-tool-tag">Thunderball</span>
                      <span className="egg-tool-tag">Parkour</span>
                    </div>
                  </div>

                  {/* AFFILIATION SECTION */}
                  <div className="egg-dossier-section">
                    <div className="egg-section-header">
                      <span className="egg-sec-glyph">#</span>
                      <h3 className="egg-section-title">AFFILIATION</h3>
                    </div>
                    <div className="egg-affiliation-card">
                      <div className="egg-affil-header">
                        <div className="egg-affil-tagline">
                          <span className="egg-affil-name">DEDSEC</span>
                          <span className="egg-affil-cell">SAN FRANCISCO CELL</span>
                        </div>
                        <p className="egg-affil-desc">
                          DedSec is a hacktivist collective. The San Francisco cell is a small
                          crew of hackers, one node in a wider DedSec network, working against
                          corporate surveillance and the systems that profile ordinary people.
                        </p>
                      </div>

                      <div className="egg-affil-details">
                        <div className="egg-affil-item">
                          <h4 className="egg-item-label">CELL MEMBERS</h4>
                          <p className="egg-item-text">
                            Marcus Holloway (Retr0), Sitara Dhawan, Wrench, Josh Sauchak,
                            Horatio Carlin
                          </p>
                        </div>

                        <div className="egg-affil-item">
                          <h4 className="egg-item-label">TARGET</h4>
                          <p className="egg-item-text">
                            Blume and its ctOS 2.0 network, plus the tech companies that harvest
                            and sell user data.
                          </p>
                        </div>

                        <div className="egg-affil-item">
                          <h4 className="egg-item-label">METHOD</h4>
                          <p className="egg-item-text">
                            Hacking, drones, and public stunts. The pranks are deliberate. They
                            make serious problems easy to understand and hard to ignore.
                          </p>
                        </div>

                        <div className="egg-affil-item">
                          <h4 className="egg-item-label">SUPPORT</h4>
                          <p className="egg-item-text">
                            DedSec runs on public backing. The more ordinary people follow the
                            crew, the more tools and reach it has.
                          </p>
                        </div>

                        <div className="egg-affil-item egg-affil-belief">
                          <h4 className="egg-item-label">CORE BELIEF</h4>
                          <p className="egg-item-text">
                            People should own their data and know when they are being watched.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Iconic Bottom Subtitle exactly matching the screenshot */}
                  <div className="egg-cinematic-subtitle">
                    <p>With threats to personal freedom rising, many are stepping forward.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
