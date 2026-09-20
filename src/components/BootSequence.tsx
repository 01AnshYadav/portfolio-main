import React, { useState, useEffect, useRef } from 'react';
import './BootSequence.css';

interface BootSequenceProps {
  onComplete: () => void;
}

const CODE_LINES = [
  '##############################################',
  '$script:Headers = @()',
  '# add any additional requests created with format $JobNameBase_[rand]',
  '$JobNameBase = "Debug32"',
  '# the currently imported script held in memory',
  '$script:ImportedScript = ""',
  "# calculate the diff between the servers epoch and the agent's",
  '$script:EpochDiff = $Epoch - [math]::abs([Math]::Floor([decimal](Get-Date(Get-Date).ToUniversalTime()-uformat "%s")))',
  '# Command Helpers',
  '##############################################',
  '# set the delay/jitter',
  'Function Set-Delay {',
  '  param([int]$d, [double]$j=0.0)',
  '  $script:AgentDelay = $d',
  '  $script:AgentJitter = $j',
  '  "agent interval set to $script:AgentDelay seconds with a jitter of $script:AgentJitter"',
  '}',
  '# get the delay/jitter',
  'Function Get-Delay {',
  '  "agent interval delay interval: $script:AgentDelay seconds with a jitter of $script:AgentJitter"',
  '}',
  '# set the killdate for the agent',
  'Function Set-Killdate {',
  '  param([string]$date)',
  '  $script:KillDate = $date',
  '  "agent killdate set to $script:KillDate"',
  '}',
  '# set the working hours for the agent',
  'Function Set-WorkingHours {',
  '  param([string]$hours)',
  '  $script:WorkingHours = $hours',
  '  "agent working hours set to $script:WorkingHours"',
  '}',
  '# Environment: Machine: IPAddress: 10.0.4.12',
  'else {',
  '  # otherwise check the groups',
  '  $str += \' \' + ($whoami /groups) -join \' \' + ".Contains(\"High Mandatory Level\")";',
  '}',
  '$n = [System.Diagnostics.Process]::GetCurrentProcess();',
  '$str += \' \' + $n.ProcessName + \' \' + $n.Id;',
  '$str += \' \' + $PSVersionTable.PSVersion.Major',
  'add additional callback servers',
  'usr/thishere/thatthere/test_773.cgi',
  'Foreach ($backup in $BackupServers) {',
  '  $Servers = $Servers + $backup',
  '}',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  // Phase:
  // 0: Initial "execute?" prompt
  // 1: "Y" answered, code cascading down
  // 2: Window pop-up overlay (usr/thishere/thatthere/test_773.cgi)
  // 3: Heavy black redaction marker bars strike across lines
  // 4: Complete / Ready to enter ctOS
  const [phase, setPhase] = useState<number>(0);
  const [visibleCodeCount, setVisibleCodeCount] = useState<number>(0);
  const [typedY, setTypedY] = useState<boolean>(false);
  const completedRef = useRef<boolean>(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // Keyboard navigation: Pressing Y, Enter, Space, or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      } else if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter') {
        if (phase === 0) {
          setTypedY(true);
          setPhase(1);
        } else if (phase >= 3) {
          handleFinish();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  // Timeline progression
  useEffect(() => {
    // Auto-trigger Y if visitor doesn't type it after 1.2s
    const t0 = setTimeout(() => {
      setTypedY(true);
      setPhase((prev) => (prev === 0 ? 1 : prev));
    }, 1200);

    return () => clearTimeout(t0);
  }, []);

  // Code line streaming in phase >= 1
  useEffect(() => {
    if (phase >= 1 && visibleCodeCount < CODE_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleCodeCount((prev) => Math.min(CODE_LINES.length, prev + 2));
      }, 45);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleCodeCount]);

  // Transition to window pop-up (phase 2)
  useEffect(() => {
    if (phase === 1 && visibleCodeCount >= 14) {
      const tWindow = setTimeout(() => setPhase(2), 200);
      return () => clearTimeout(tWindow);
    }
  }, [phase, visibleCodeCount]);

  // Transition to redaction bars (phase 3)
  useEffect(() => {
    if (phase === 2) {
      const tRedact = setTimeout(() => setPhase(3), 1100);
      return () => clearTimeout(tRedact);
    }
  }, [phase]);

  // Phase 4 auto-complete after cinematic sequence
  useEffect(() => {
    if (phase === 3) {
      const tFinal = setTimeout(() => {
        setPhase(4);
      }, 1600);
      return () => clearTimeout(tFinal);
    }
  }, [phase]);

  return (
    <div
      className="watchdogs-cinematic-overlay"
      role="dialog"
      aria-label="ctOS Intro Sequence"
    >
      {/* Subtle CRT grain and vignette texture */}
      <div className="cinematic-vignette" />

      {/* Clean Top-Right Skip Button */}
      <button
        type="button"
        className="cinematic-skip-btn"
        onClick={handleFinish}
        title="Skip intro to Network Map"
      >
        [ SKIP ]
      </button>

      {/* Main Content Area */}
      <div className="cinematic-stage">
        {/* Left Vertical Crosshairs Column */}
        <div className="crosshair-gutter" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="cross-item">
              +
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Stream Column */}
        <div className="stream-column">
          {/* Top spacer crosses */}
          <div className="stream-cross">+</div>
          <div className="stream-cross">+</div>

          {/* The Iconic "execute?" Prompt */}
          <div className="prompt-block">
            <div className="prompt-title">execute?</div>
            {typedY && <div className="prompt-response">Y</div>}
          </div>

          {/* Cascading Script Code */}
          {phase >= 1 && (
            <div className="code-waterfall">
              {CODE_LINES.slice(0, visibleCodeCount).map((line, idx) => {
                const isRedacted =
                  phase >= 3 &&
                  (idx === 1 ||
                    idx === 3 ||
                    idx === 7 ||
                    idx === 12 ||
                    idx === 15 ||
                    idx === 24 ||
                    idx === 31 ||
                    idx === 35 ||
                    idx === 39);

                return (
                  <div key={idx} className="code-line-row">
                    <span className="code-cross">+</span>
                    <span className={`code-text ${isRedacted ? 'redacted' : ''}`}>
                      {line}
                      {isRedacted && <span className="redaction-bar" aria-hidden="true" />}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Phase 2 & 3: Floating Wireframe Window (usr/thishere/thatthere/test_773.cgi) */}
        {phase >= 2 && (
          <div className={`wireframe-window ${phase >= 3 ? 'window-redacted' : ''}`}>
            <div className="wireframe-titlebar">
              <span className="wireframe-title">usr/thishere/thatthere/test_773.cgi</span>
              <div className="wireframe-controls">
                <span className="wireframe-close-box">&#9747;</span>
              </div>
            </div>

            <div className="wireframe-body">
              <div className="wireframe-line"># get the delay/jitter</div>
              <div className="wireframe-line">Function Get-Delay &#123;</div>
              <div className="wireframe-line indent">
                "agent interval delay interval: $script:AgentDelay seconds"
              </div>
              <div className="wireframe-line">&#125;</div>
              <div className="wireframe-line"># set the killdate for the agent</div>
              <div className="wireframe-line">Function Set-Killdate &#123;</div>
              <div className="wireframe-line indent">param([string]$date)</div>
              <div className="wireframe-line indent">$script:KillDate = $date</div>
              <div className="wireframe-line indent">"agent killdate set to $script:KillDate"</div>
              <div className="wireframe-line">&#125;</div>

              {phase >= 3 && (
                <>
                  <div className="redaction-stamp">CLASSIFIED // 4506-1</div>
                  <div className="wireframe-redaction-heavy top" />
                  <div className="wireframe-redaction-heavy mid" />
                  <div className="wireframe-redaction-heavy bot" />
                </>
              )}
            </div>
          </div>
        )}

        {/* Scattered Background HUD Crosses (Right Margin) */}
        <div className="scatter-crosses" aria-hidden="true">
          <span style={{ top: '15%', right: '22%' }}>+</span>
          <span style={{ top: '35%', right: '12%' }}>+</span>
          <span style={{ top: '48%', right: '28%' }}>+</span>
          <span style={{ top: '65%', right: '18%' }}>+</span>
          <span style={{ top: '80%', right: '25%' }}>+</span>
        </div>
      </div>

      {/* Bottom Subtitle / Manifesto Text */}
      <footer className="cinematic-footer">
        <p className="manifesto-subtitle">
          {phase < 3
            ? 'With threats to personal freedom rising, many are stepping forward.'
            : 'Whistleblowers, Activists and Hackers have drawn their battle lines.'}
        </p>

        {/* Climax Button: Appears on Phase 4 */}
        {phase >= 4 && (
          <div className="enter-hub-bar">
            <button
              type="button"
              className="enter-city-btn"
              onClick={handleFinish}
              autoFocus
            >
              <span>[ ACCESS ctOS NETWORK MAP ]</span>
              <span className="enter-arrow">&gt;</span>
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
