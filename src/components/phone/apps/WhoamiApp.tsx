import React, { useState, useEffect } from 'react';
import { OPERATIVE_PROFILE } from '../../../config';

export const WhoamiApp: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState<boolean>(true);

  useEffect(() => {
    // Profiler glitch sequence: overrides ctOS after 1.1s
    const timer = setTimeout(() => {
      setGlitchActive(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="whoami-app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2cqw',
        height: '100%',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* 1. Header & Glitch Scan Banner */}
      <div
        style={{
          borderLeft: '0.4cqw solid ' + (glitchActive ? 'var(--red)' : '#00ff66'),
          backgroundColor: glitchActive ? 'rgba(255, 69, 54, 0.12)' : 'rgba(0, 255, 102, 0.08)',
          padding: '0.6cqw 1.2cqw',
          fontSize: 'max(8px, 1.1cqw)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          className={glitchActive ? 'dedsec-glitch-text' : ''}
          style={{
            color: glitchActive ? '#ff4536' : '#00ff66',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          {glitchActive
            ? '[ctOS PROFILER SCANNING: IDENTIFYING SUBJECT...]'
            : '[ctOS PROFILER ERROR: PROFILE CORRUPTED / OVERRIDDEN BY DEDSEC]'}
        </span>
        <span style={{ fontSize: 'max(7px, 0.9cqw)', color: 'var(--dim)' }}>
          {glitchActive ? 'LEVEL: LOW' : 'ENCRYPTION: 4096-BIT'}
        </span>
      </div>

      {/* 2. Profile Card Layout */}
      <div
        style={{
          display: 'flex',
          gap: '2.5cqw',
          backgroundColor: 'rgba(12, 16, 20, 0.85)',
          border: '0.15cqw solid rgba(58, 174, 196, 0.3)',
          borderRadius: '1.2cqw',
          padding: '1.4cqw',
        }}
      >
        {/* Avatar: Stylized Marcus Holloway / DedSec Cap & Visor Icon */}
        <div
          style={{
            width: '15cqw',
            height: '15cqw',
            borderRadius: '1cqw',
            border: '0.18cqw solid #00ff66',
            backgroundColor: '#040608',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 1.5cqw rgba(0, 255, 102, 0.25)',
            flexShrink: 0,
          }}
        >
          {/* Marcus Holloway Hat & Mask SVG silhouette */}
          <svg
            viewBox="0 0 64 64"
            style={{ width: '10cqw', height: '10cqw', fill: 'none' }}
          >
            {/* DedSec Cap Visor */}
            <path
              d="M14 26 C16 16, 48 16, 50 26 L56 30 L48 30 L46 26 L18 26 L16 30 L8 30 Z"
              fill="#182026"
              stroke="#00ff66"
              strokeWidth="2"
            />
            {/* Sunglasses / Cyber Visor */}
            <rect x="18" y="32" width="12" height="7" rx="2" fill="#00ff66" opacity="0.9" />
            <rect x="34" y="32" width="12" height="7" rx="2" fill="#00ff66" opacity="0.9" />
            <line x1="30" y1="35" x2="34" y2="35" stroke="#00ff66" strokeWidth="2" />
            {/* Mask & Bandana */}
            <polygon points="20,42 44,42 38,54 26,54" fill="#12171c" stroke="#3aaec4" strokeWidth="1.5" />
            <line x1="28" y1="46" x2="36" y2="46" stroke="#00ff66" strokeWidth="1" />
            <line x1="30" y1="50" x2="34" y2="50" stroke="#00ff66" strokeWidth="1" />
          </svg>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 255, 102, 0.18)',
              fontSize: 'max(6px, 0.8cqw)',
              textAlign: 'center',
              color: '#00ff66',
              letterSpacing: '0.1em',
              padding: '0.1cqw 0',
            }}
          >
            MARCUS.SYS
          </div>
        </div>

        {/* Operative Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqw', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'max(11px, 1.7cqw)', fontWeight: 'bold', color: '#ffffff' }}>
              {OPERATIVE_PROFILE.alias}
            </span>
            <span
              style={{
                backgroundColor: 'rgba(0, 255, 102, 0.15)',
                color: '#00ff66',
                border: '0.1cqw solid #00ff66',
                borderRadius: '0.3cqw',
                fontSize: 'max(7px, 0.95cqw)',
                padding: '0.1cqw 0.6cqw',
                letterSpacing: '0.08em',
              }}
            >
              {OPERATIVE_PROFILE.status}
            </span>
          </div>

          <div style={{ fontSize: 'max(8px, 1.15cqw)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--dim)' }}>ROLE: </span>
            <span style={{ color: 'var(--cyan-hi)' }}>{OPERATIVE_PROFILE.role}</span>
          </div>

          <div style={{ fontSize: 'max(8px, 1.1cqw)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--dim)' }}>EDUCATION: </span>
            <span>{OPERATIVE_PROFILE.education}</span>
          </div>

          <div style={{ fontSize: 'max(8px, 1.1cqw)', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--dim)' }}>LOCATION: </span>
            <span>{OPERATIVE_PROFILE.location}</span>
          </div>

          <div style={{ fontSize: 'max(7.5px, 0.95cqw)', color: '#ff4536', marginTop: '0.2cqw' }}>
            THREAT LEVEL: <span style={{ color: '#ffffff' }}>CRITICAL // TARGET OFF-GRID</span>
          </div>
        </div>
      </div>

      {/* 3. "Join the Crew" Bio Copy */}
      <div
        style={{
          backgroundColor: 'rgba(5, 8, 12, 0.8)',
          border: '0.12cqw solid rgba(0, 255, 102, 0.25)',
          borderRadius: '1cqw',
          padding: '1.2cqw',
          fontSize: 'max(8px, 1.15cqw)',
          lineHeight: '1.5',
          color: 'var(--ink)',
        }}
      >
        <div
          style={{
            fontSize: 'max(7px, 0.9cqw)',
            color: '#00ff66',
            letterSpacing: '0.12em',
            marginBottom: '0.5cqw',
            textTransform: 'uppercase',
          }}
        >
          // DEDSEC OPERATIVE MANIFESTO
        </div>
        <p style={{ fontStyle: 'italic', color: '#e6eff5' }}>
          "{OPERATIVE_PROFILE.bio}"
        </p>

        {/* Technical Focus Chips */}
        <div style={{ display: 'flex', gap: '0.6cqw', flexWrap: 'wrap', marginTop: '1cqw' }}>
          {OPERATIVE_PROFILE.skills.map((skill, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: 'rgba(58, 174, 196, 0.12)',
                border: '0.1cqw solid rgba(58, 174, 196, 0.4)',
                color: 'var(--cyan-hi)',
                fontSize: 'max(6.5px, 0.9cqw)',
                padding: '0.2cqw 0.8cqw',
                borderRadius: '0.3cqw',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
