import React, { useState, useEffect } from 'react';
import './BootSequence.css';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Stage timings for fast typing ctOS sequence
    const t1 = setTimeout(() => setStep(1), 400);  // ctOS system profile scan lines
    const t2 = setTimeout(() => setStep(2), 1100); // initial wrong profile displayed
    const t3 = setTimeout(() => setStep(3), 2000); // red strike-through & error override banner
    const t4 = setTimeout(() => setStep(4), 2800); // DedSec green override text & execute button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="boot-terminal-overlay" role="dialog" aria-label="DedSec Boot Sequence">
      {/* Background CRT Scanlines */}
      <div className="boot-scanlines" />

      {/* Prominent Corner Skip Button */}
      <button
        type="button"
        className="boot-skip-btn"
        onClick={onComplete}
        title="Skip Boot Sequence"
      >
        [ SKIP ]
      </button>

      {/* Terminal Container */}
      <div className="boot-terminal-box">
        {/* Terminal Header */}
        <div className="boot-header-bar">
          <div className="boot-header-title">
            <span className="dot-indicator" />
            <span>ctOS 2.0 // SYSTEM BOOT & PROFILER INTERCEPT</span>
          </div>
          <div className="boot-sys-id">[PORT: 443 // RAW_TTY]</div>
        </div>

        {/* Boot Terminal Log Output */}
        <div className="boot-log-stream">
          <div className="log-line text-dim">&gt; Initializing ctOS subsystem kernel v11.4.0...</div>
          <div className="log-line text-dim">&gt; Connecting to municipal telemetry node [SAN_FRANCISCO_BAY_RELAY]...</div>

          {step >= 1 && (
            <>
              <div className="log-line text-cyan">&gt; SCANNING TARGET CITIZEN BIOMETRICS... OK</div>
              <div className="log-line text-cyan">&gt; MATCH FOUND: CITIZEN_DATABASE_SECTOR_09</div>
            </>
          )}

          {/* INITIAL WRONG PROFILE SUMMARY */}
          {step >= 2 && (
            <div className={`wrong-profile-card ${step >= 3 ? 'struck-out' : ''}`}>
              <div className="profile-label">[ctOS PROFILED CITIZEN RECORD: #4092-A]</div>
              <div className="profile-row">NAME: J. DOE // CIVILIAN REGISTRY</div>
              <div className="profile-row">OCCUPATION: STANDARD CITIZEN // LEVEL 1 COMPLIANT</div>
              <div className="profile-row">STATUS: MONITORED // RECORD VERIFIED</div>
              <div className="profile-row">THREAT ASSESSMENT: NONE (0.01%)</div>
              {step >= 3 && <div className="red-strike-bar" />}
            </div>
          )}

          {/* GLITCHED ERROR OVERRIDE BANNER */}
          {step >= 3 && (
            <div className="glitch-error-banner">
              <span className="error-bracket">[! ALERT]</span>
              <span className="error-text">[ctOS PROFILER ERROR: PROFILE CORRUPTED / OVERRIDDEN BY DEDSEC]</span>
            </div>
          )}

          {/* DEDSEC GREEN REPLACEMENT TEXT */}
          {step >= 4 && (
            <div className="dedsec-override-card">
              <div className="dedsec-banner-head">[DEDSEC INJECTION SUCCESSFUL // ROOT AUTHORIZED]</div>
              <div className="dedsec-field-group">
                <div className="dedsec-field">
                  <span className="field-key">Operative:</span>{' '}
                  <span className="field-val">Marcus Holloway</span>
                  <span className="field-handle"> [01AnshYadav]</span>
                </div>
                <div className="dedsec-field">
                  <span className="field-key">Edu:</span>{' '}
                  <span className="field-val">Freshman Year B.Tech, University of Lucknow</span>
                </div>
                <div className="dedsec-field">
                  <span className="field-key">Focus:</span>{' '}
                  <span className="field-val">Cloud Infrastructure, AWS & CTFs</span>
                </div>
                <div className="dedsec-field">
                  <span className="field-key">Status:</span>{' '}
                  <span className="field-alert">CRITICAL // TARGET OFF-GRID</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: EXECUTE_DEDSEC_OS */}
        {step >= 4 && (
          <div className="boot-action-bar">
            <button
              type="button"
              className="execute-os-btn"
              onClick={onComplete}
              autoFocus
            >
              <span className="reticle-glyph">⌖</span>
              <span>[ EXECUTE_DEDSEC_OS ]</span>
              <span className="reticle-glyph">⌖</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
