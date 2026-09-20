import React, { useState, useEffect } from 'react';
import { OPERATIVE_PROFILE } from '../../../config';

export const WhoamiApp: React.FC = () => {
  const [glitchPhase, setGlitchPhase] = useState<'SCANNING' | 'CORRUPTING' | 'DEDSEC_OVERRIDE'>('SCANNING');
  const [activeFrequency, setActiveFrequency] = useState<number[]>([45, 78, 62, 90, 34, 85, 95, 60, 42, 88, 70, 50]);

  // Audio / frequency waveform animation effect
  useEffect(() => {
    const timer1 = setTimeout(() => setGlitchPhase('CORRUPTING'), 900);
    const timer2 = setTimeout(() => setGlitchPhase('DEDSEC_OVERRIDE'), 1800);

    const freqInterval = setInterval(() => {
      setActiveFrequency([
        Math.floor(25 + Math.random() * 70),
        Math.floor(30 + Math.random() * 65),
        Math.floor(40 + Math.random() * 55),
        Math.floor(50 + Math.random() * 45),
        Math.floor(20 + Math.random() * 75),
        Math.floor(60 + Math.random() * 38),
        Math.floor(35 + Math.random() * 60),
        Math.floor(70 + Math.random() * 28),
        Math.floor(45 + Math.random() * 50),
        Math.floor(30 + Math.random() * 68),
        Math.floor(55 + Math.random() * 40),
        Math.floor(38 + Math.random() * 58),
      ]);
    }, 180);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(freqInterval);
    };
  }, []);

  return (
    <div
      className="whoami-app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        color: '#e4edf2',
        fontFamily: 'var(--mono)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {/* 1. TOP ctOS 2.0 PROFILER HUD BANNER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor:
            glitchPhase === 'SCANNING'
              ? 'rgba(255, 56, 56, 0.14)'
              : glitchPhase === 'CORRUPTING'
              ? 'rgba(0, 229, 255, 0.14)'
              : 'rgba(0, 255, 102, 0.12)',
          borderLeft:
            '4px solid ' +
            (glitchPhase === 'SCANNING' ? '#ff3838' : glitchPhase === 'CORRUPTING' ? '#00e5ff' : '#00ff66'),
          borderBottom: '1px solid #202632',
          padding: '12px 20px',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              backgroundColor: glitchPhase === 'DEDSEC_OVERRIDE' ? '#00ff66' : '#ff4536',
              boxShadow: '0 0 10px ' + (glitchPhase === 'DEDSEC_OVERRIDE' ? '#00ff66' : '#ff4536'),
            }}
          />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: glitchPhase === 'DEDSEC_OVERRIDE' ? '#00ff66' : '#ffffff',
            }}
          >
            {glitchPhase === 'SCANNING' && '[ctOS 2.0 BIOMETRIC PROFILER // SCANNING TARGET IDENTITY]'}
            {glitchPhase === 'CORRUPTING' && '[SECURITY INTERRUPT: UNKNOWN CIPHER OVERRIDE IN PROGRESS...]'}
            {glitchPhase === 'DEDSEC_OVERRIDE' && '[ctOS PROFILER COMPROMISED // DEDSEC OPERATIVE PROFILE ACTIVE]'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '18px', fontSize: '11px', color: 'var(--dim)' }}>
          <span>NODE: SF-LUCKNOW-GW04</span>
          <span>CIPHER: AES-256-GCM</span>
          <span style={{ color: glitchPhase === 'DEDSEC_OVERRIDE' ? '#00ff66' : '#ff4536' }}>
            {glitchPhase === 'DEDSEC_OVERRIDE' ? 'DEFCON 1' : 'MONITORED'}
          </span>
        </div>
      </div>

      {/* 2. MAIN DOSSIER & PROFILER GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Biometric Wireframe Target Reticle */}
        <div
          style={{
            backgroundColor: 'rgba(8, 12, 16, 0.94)',
            border: '1px solid rgba(58, 174, 196, 0.4)',
            borderRadius: '4px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Target Scanner Box */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              backgroundColor: '#020406',
              border: '1px dashed rgba(58, 174, 196, 0.45)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Corner Target Brackets */}
            <div style={{ position: 'absolute', top: 8, left: 8, width: 14, height: 14, borderTop: '2px solid #00ff66', borderLeft: '2px solid #00ff66' }} />
            <div style={{ position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderTop: '2px solid #00ff66', borderRight: '2px solid #00ff66' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 8, width: 14, height: 14, borderBottom: '2px solid #00ff66', borderLeft: '2px solid #00ff66' }} />
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 14, height: 14, borderBottom: '2px solid #00ff66', borderRight: '2px solid #00ff66' }} />

            {/* Target Reticle Crosshair */}
            <div
              style={{
                position: 'absolute',
                inset: '20px',
                border: '1px solid rgba(58, 174, 196, 0.25)',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  width: '60%',
                  height: '60%',
                  border: '1px dashed rgba(0, 255, 102, 0.35)',
                  borderRadius: '50%',
                }}
              />
            </div>

            {/* ASCII / Monospace Skull Art */}
            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                lineHeight: '11px',
                color: glitchPhase === 'DEDSEC_OVERRIDE' ? '#00ff66' : '#ff4536',
                userSelect: 'none',
                textAlign: 'center',
                zIndex: 2,
                textShadow: glitchPhase === 'DEDSEC_OVERRIDE' ? '0 0 8px rgba(0, 255, 102, 0.7)' : 'none',
              }}
            >
{`     .---.
    /     \\
   | () () |
    \\  ^  /
     |||||
    '-----'`}
            </pre>

            {/* Scanning Laser Line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: '#00ff66',
                boxShadow: '0 0 12px #00ff66',
                animation: 'scannerLine 2.4s infinite ease-in-out',
                zIndex: 3,
              }}
            />

            {/* Overlay Status Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                backgroundColor: 'rgba(0,0,0,0.85)',
                padding: '4px 8px',
                border: '1px solid rgba(0, 255, 102, 0.3)',
                color: '#00ff66',
              }}
            >
              <span>BIOMETRIC LOCK: 99.4%</span>
              <span>LIVE</span>
            </div>
          </div>

          {/* Quick Telemetry Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span style={{ color: 'var(--dim)' }}>ctOS THREAT ASSESSMENT:</span>
              <span style={{ color: '#ff4536', fontWeight: 'bold' }}>EXTREME (CLASS 4)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span style={{ color: 'var(--dim)' }}>SURVEILLANCE TAP:</span>
              <span style={{ color: '#00ff66' }}>BYPASSED (OFF-GRID)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
              <span style={{ color: 'var(--dim)' }}>SYSTEM TAMPERING:</span>
              <span style={{ color: 'var(--cyan-hi)' }}>DETECTED // REWRITING</span>
            </div>
          </div>

          {/* Live Frequency / Signal Monitor */}
          <div>
            <div style={{ fontSize: '10px', color: 'var(--dim)', marginBottom: '6px', letterSpacing: '0.08em' }}>
              // LIVE TELEMETRY FREQUENCY (MHZ):
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '36px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px', border: '1px solid rgba(58,174,196,0.2)' }}>
              {activeFrequency.map((val, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${val}%`,
                    backgroundColor: idx % 2 === 0 ? '#00ff66' : 'var(--cyan-hi)',
                    transition: 'height 0.18s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Official ctOS Profile & DedSec Manifesto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Identity Dossier Table */}
          <div
            style={{
              backgroundColor: 'rgba(6, 10, 14, 0.92)',
              border: '1px solid rgba(58, 174, 196, 0.35)',
              borderRadius: '4px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid rgba(0, 255, 102, 0.3)',
                paddingBottom: '10px',
              }}
            >
              <div>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                  {OPERATIVE_PROFILE.alias}
                </span>
                <span style={{ marginLeft: '12px', fontSize: '13px', color: '#00ff66' }}>
                  // {OPERATIVE_PROFILE.dedsecHandle}
                </span>
              </div>
              <span
                style={{
                  backgroundColor: 'rgba(0, 255, 102, 0.12)',
                  border: '1.5px solid #00ff66',
                  color: '#00ff66',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '3px',
                  letterSpacing: '0.1em',
                }}
              >
                {OPERATIVE_PROFILE.status}
              </span>
            </div>

            {/* Structured ctOS Profiler Key-Value Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px', fontSize: '13px' }}>
              <div>
                <div style={{ color: 'var(--dim)', fontSize: '11px', marginBottom: '2px' }}>
                  OPERATIVE FOCUS & ROLE:
                </div>
                <div style={{ color: 'var(--cyan-hi)', fontWeight: 600 }}>{OPERATIVE_PROFILE.role}</div>
              </div>

              <div>
                <div style={{ color: 'var(--dim)', fontSize: '11px', marginBottom: '2px' }}>
                  ACADEMIC AFFILIATION:
                </div>
                <div style={{ color: '#ffffff' }}>{OPERATIVE_PROFILE.education}</div>
              </div>

              <div>
                <div style={{ color: 'var(--dim)', fontSize: '11px', marginBottom: '2px' }}>
                  BASE OF OPERATIONS:
                </div>
                <div style={{ color: '#ffffff' }}>{OPERATIVE_PROFILE.location}</div>
              </div>

              <div>
                <div style={{ color: 'var(--dim)', fontSize: '11px', marginBottom: '2px' }}>
                  SECURITY CLEARANCE / DEFCON:
                </div>
                <div style={{ color: '#ff4536', fontWeight: 600 }}>CLASS 4 // RESTRICTED TARGET</div>
              </div>
            </div>
          </div>

          {/* DEDSEC UNDERGROUND MANIFESTO CARD */}
          <div
            style={{
              backgroundColor: 'rgba(4, 7, 10, 0.94)',
              border: '1px solid rgba(0, 255, 102, 0.35)',
              borderRadius: '4px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#00ff66', letterSpacing: '0.14em', fontWeight: 700 }}>
                // DEDSEC OPERATIVE MANIFESTO
              </span>
              <span style={{ fontSize: '11px', color: 'var(--dim)' }}>
                PAYLOAD ID: 0xDEADBEEF
              </span>
            </div>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#edf5fa',
                margin: 0,
                borderLeft: '3px solid #00ff66',
                paddingLeft: '16px',
                fontStyle: 'italic',
              }}
            >
              "{OPERATIVE_PROFILE.bio}"
            </p>

            {/* Core Competencies Matrix */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--dim)', marginBottom: '8px', letterSpacing: '0.08em' }}>
                // VERIFIED OPERATIONAL ARSENAL:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {OPERATIVE_PROFILE.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(58, 174, 196, 0.1)',
                      border: '1px solid rgba(58, 174, 196, 0.4)',
                      padding: '6px 14px',
                      borderRadius: '3px',
                      fontSize: '12px',
                      color: 'var(--cyan-hi)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: '#00ff66' }}>▸</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Footprint */}
            <div
              style={{
                marginTop: '6px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: 'var(--dim)',
              }}
            >
              <span>PGP FINGERPRINT: 4A9F 8B12 C034 DE56 991F 77BC 33A1 00EF</span>
              <span style={{ color: '#00ff66' }}>[VERIFIED OPERATIVE]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
