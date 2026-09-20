import React, { useState, useEffect } from 'react';
import './CreditsModal.css';

interface CreditsModalProps {
  isDimmed?: boolean;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isDimmed = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalTheme, setModalTheme] = useState<'cinematic-white' | 'dark'>('cinematic-white');

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for custom event if any other HUD button triggers credits
  useEffect(() => {
    const handleOpenCredits = () => setIsOpen(true);
    window.addEventListener('DEDSEC_OPEN_CREDITS', handleOpenCredits);
    return () => window.removeEventListener('DEDSEC_OPEN_CREDITS', handleOpenCredits);
  }, []);

  return (
    <>
      {/* Small Credits Trigger Button on Main Page (Bottom-Right Corner) */}
      <button
        type="button"
        className={`ctos-credits-trigger ${isDimmed ? 'dimmed' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Project Credits & Attributions"
        title="View Project Credits & Attributions"
      >
        <span className="credits-glyph">[ 0xCR ]</span>
        <span className="credits-text">CREDITS</span>
      </button>

      {/* Credits Cinematic White Modal (Watch Dogs 2 Theme) */}
      {isOpen && (
        <div
          className="credits-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Project Credits & Attributions"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`credits-popup-dialog ${modalTheme}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vignette CRT overlay */}
            <div className="credits-cinematic-vignette" aria-hidden="true" />

            {/* Top Bar */}
            <div className="credits-popup-topbar">
              <div className="credits-topbar-meta">
                <span className="credits-topbar-tag">[ ★ PROJECT ATTRIBUTIONS ]</span>
                <span className="credits-topbar-crumb">ctOS 2.0 // REPOSITORY_CREDITS // INTEL</span>
              </div>
              <div className="credits-topbar-actions">
                <button
                  type="button"
                  className="credits-theme-toggle"
                  onClick={() => setModalTheme((prev) => (prev === 'cinematic-white' ? 'dark' : 'cinematic-white'))}
                  title="Toggle Theme"
                >
                  {modalTheme === 'cinematic-white' ? 'MODE: WHITE (ORIGINAL)' : 'MODE: DARK TERMINAL'}
                </button>
                <button
                  type="button"
                  className="credits-popup-close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close (ESC)"
                >
                  [ ✕ CLOSE ]
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="credits-modal-scroll-area">
              <div className="credits-cinematic-layout">
                {/* Left Crosshairs Gutter */}
                <div className="credits-crosshair-column" aria-hidden="true">
                  {Array.from({ length: 24 }).map((_, idx) => (
                    <span key={idx} className="credits-crosshair-glyph">+</span>
                  ))}
                </div>

                {/* Main Content Body */}
                <div className="credits-stream-content">
                  {/* Top execute prompt */}
                  <div className="credits-execute-prompt">
                    <div className="credits-prompt-line">
                      <span className="credits-prompt-q">execute?</span>
                    </div>
                    <div className="credits-prompt-response">
                      <span className="credits-prompt-ans">Y</span>
                    </div>
                  </div>

                  {/* Header Title Block */}
                  <div className="credits-header-card">
                    <div className="credits-header-meta">ctOS 2.0 REPOSITORY MANIFEST // UNENCRYPTED</div>
                    <h2 className="credits-main-title">CREDITS</h2>
                    <p className="credits-main-subtitle">
                      Visual, artistic, and intellectual property attributions for this portfolio.
                    </p>
                  </div>

                  {/* 1. THEME */}
                  <div className="credits-section-block">
                    <div className="credits-section-head">
                      <span className="credits-sec-num">[01]</span>
                      <h3 className="credits-sec-title">THEME</h3>
                    </div>
                    <div className="credits-sec-body">
                      <p>
                        Watch Dogs 2. Visual theme, DedSec, ctOS, and the character Marcus Holloway belong to Ubisoft.
                      </p>
                    </div>
                  </div>

                  {/* 2. DEVELOPER & PUBLISHER */}
                  <div className="credits-grid-row">
                    <div className="credits-section-block">
                      <div className="credits-section-head">
                        <span className="credits-sec-num">[02]</span>
                        <h3 className="credits-sec-title">DEVELOPER</h3>
                      </div>
                      <div className="credits-sec-body highlight">
                        Ubisoft Montreal
                      </div>
                    </div>

                    <div className="credits-section-block">
                      <div className="credits-section-head">
                        <span className="credits-sec-num">[03]</span>
                        <h3 className="credits-sec-title">PUBLISHER</h3>
                      </div>
                      <div className="credits-sec-body highlight">
                        Ubisoft
                      </div>
                    </div>
                  </div>

                  {/* 3. DESIGN ELEMENTS */}
                  <div className="credits-section-block">
                    <div className="credits-section-head">
                      <span className="credits-sec-num">[04]</span>
                      <h3 className="credits-sec-title">DESIGN ELEMENTS</h3>
                    </div>
                    <div className="credits-sec-body">
                      <p>
                        <a
                          href="https://www.instagram.com/magnus.atom/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="credits-link"
                        >
                          @[magnus.atom] on Instagram
                        </a>
                      </p>
                      <p>
                        <a
                          href="https://www.instagram.com/p/DZXb9eKkW5W/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="credits-link path-link"
                        >
                          https://www.instagram.com/p/DZXb9eKkW5W/ &gt;
                        </a>
                      </p>
                      <p style={{ marginTop: '12px' }}>
                        <a
                          href="https://www.instagram.com/nirizzhar?stkn=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="credits-link"
                        >
                          @[nirizzhar] on Instagram
                        </a>
                      </p>
                      <p>
                        <a
                          href="https://www.instagram.com/nirizzhar?stkn=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="credits-link path-link"
                        >
                          https://www.instagram.com/nirizzhar &gt;
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* 4. TYPEFACE */}
                  <div className="credits-section-block">
                    <div className="credits-section-head">
                      <span className="credits-sec-num">[05]</span>
                      <h3 className="credits-sec-title">TYPEFACE</h3>
                    </div>
                    <div className="credits-sec-body">
                      <p>
                        JetBrains Mono, by JetBrains. Licensed under the SIL Open Font License 1.1.
                      </p>
                    </div>
                  </div>

                  {/* 5. DISCLAIMER */}
                  <div className="credits-section-block credits-disclaimer-block">
                    <div className="credits-section-head">
                      <span className="credits-sec-num">[06]</span>
                      <h3 className="credits-sec-title">DISCLAIMER</h3>
                    </div>
                    <div className="credits-sec-body disclaimer-body">
                      <p>
                        This is an unofficial fan-made portfolio. It is not affiliated with,
                        endorsed by, or sponsored by Ubisoft. Watch Dogs is a trademark of
                        Ubisoft Entertainment. All game characters and imagery remain the
                        property of their owners.
                      </p>
                    </div>
                  </div>

                  {/* 6. BUILT BY */}
                  <div className="credits-section-block credits-author-block">
                    <div className="credits-section-head">
                      <span className="credits-sec-num">[07]</span>
                      <h3 className="credits-sec-title">BUILT BY</h3>
                    </div>
                    <div className="credits-author-content">
                      <span className="credits-author-name">Ansh Yadav</span>
                      <span className="credits-author-sub">University of Lucknow // BTech Year 01</span>
                    </div>
                  </div>

                  {/* Bottom Subtitle */}
                  <div className="credits-cinematic-subtitle">
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
