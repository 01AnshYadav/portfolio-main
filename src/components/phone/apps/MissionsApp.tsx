import React, { useState } from 'react';
import { MISSIONS_DATA, type Mission } from '../../../config';

interface MissionsAppProps {
  onFollowerBonus?: (amount: number, reason: string) => void;
}

export const MissionsApp: React.FC<MissionsAppProps> = ({ onFollowerBonus }) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(MISSIONS_DATA[0]);
  const [inspectedIds, setInspectedIds] = useState<Set<string>>(new Set([MISSIONS_DATA[0].id]));

  const handleSelect = (m: Mission) => {
    setSelectedMission(m);
    if (!inspectedIds.has(m.id)) {
      setInspectedIds(new Set([...inspectedIds, m.id]));
      if (onFollowerBonus) {
        onFollowerBonus(1250, `Decrypted dossier for ${m.title}`);
      }
    }
  };

  return (
    <div
      className="missions-app"
      style={{
        display: 'flex',
        gap: '1.8cqw',
        height: '100%',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Left List of Missions */}
      <div
        style={{
          width: '28cqw',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8cqw',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 'max(7px, 0.9cqw)',
            color: 'var(--dim)',
            letterSpacing: '0.1em',
            paddingBottom: '0.3cqw',
            borderBottom: '1px solid rgba(58, 174, 196, 0.2)',
          }}
        >
          // ACTIVE DEDSEC OPS
        </div>

        {MISSIONS_DATA.map((m) => {
          const isSelected = selectedMission?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m)}
              style={{
                background: isSelected ? 'rgba(0, 255, 102, 0.12)' : 'rgba(10, 15, 20, 0.75)',
                border: '0.12cqw solid ' + (isSelected ? '#00ff66' : 'rgba(58, 174, 196, 0.3)'),
                borderRadius: '0.6cqw',
                padding: '0.8cqw 1cqw',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3cqw',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'max(6px, 0.8cqw)', color: isSelected ? '#00ff66' : 'var(--cyan)' }}>
                  {m.id}
                </span>
                <span
                  style={{
                    width: '0.6cqw',
                    height: '0.6cqw',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#00ff66' : 'var(--cyan-hi)',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 'max(7.5px, 1.05cqw)',
                  fontWeight: 600,
                  color: isSelected ? '#ffffff' : 'var(--ink)',
                }}
              >
                {m.title}
              </div>
              <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)' }}>
                {m.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Detailed Mission Briefing Card */}
      {selectedMission && (
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(8, 12, 16, 0.88)',
            border: '0.15cqw solid rgba(58, 174, 196, 0.35)',
            borderRadius: '1cqw',
            padding: '1.2cqw 1.6cqw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8cqw' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 255, 102, 0.25)',
                paddingBottom: '0.6cqw',
              }}
            >
              <div>
                <span style={{ fontSize: 'max(10px, 1.5cqw)', fontWeight: 'bold', color: '#ffffff' }}>
                  {selectedMission.title}
                </span>
                <span style={{ marginLeft: '1cqw', fontSize: 'max(7px, 0.9cqw)', color: '#00ff66' }}>
                  [{selectedMission.id}]
                </span>
              </div>
              <span
                style={{
                  fontSize: 'max(6.5px, 0.85cqw)',
                  color: '#00ff66',
                  backgroundColor: 'rgba(0, 255, 102, 0.12)',
                  padding: '0.15cqw 0.6cqw',
                  borderRadius: '0.3cqw',
                  border: '0.1cqw solid #00ff66',
                }}
              >
                STATUS: DEPLOYED
              </span>
            </div>

            {/* Objective */}
            <div style={{ fontSize: 'max(7.5px, 1.05cqw)', lineHeight: 1.45 }}>
              <div style={{ color: 'var(--cyan-hi)', fontWeight: 600, fontSize: 'max(7px, 0.9cqw)' }}>
                // OBJECTIVE:
              </div>
              <div style={{ color: '#ffffff', marginTop: '0.2cqw' }}>{selectedMission.objective}</div>
            </div>

            {/* Method */}
            <div style={{ fontSize: 'max(7.5px, 1.05cqw)', lineHeight: 1.45 }}>
              <div style={{ color: '#00ff66', fontWeight: 600, fontSize: 'max(7px, 0.9cqw)' }}>
                // METHOD & ARCHITECTURE:
              </div>
              <div style={{ color: '#e0eaf0', marginTop: '0.2cqw' }}>{selectedMission.method}</div>
            </div>

            {/* Result */}
            <div style={{ fontSize: 'max(7.5px, 1.05cqw)', lineHeight: 1.45 }}>
              <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 'max(7px, 0.9cqw)' }}>
                // OPERATIONAL RESULT:
              </div>
              <div style={{ color: 'var(--dim)', marginTop: '0.2cqw' }}>{selectedMission.result}</div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5cqw', flexWrap: 'wrap', marginTop: '0.3cqw' }}>
              {selectedMission.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 'max(6px, 0.8cqw)',
                    backgroundColor: 'rgba(58, 174, 196, 0.12)',
                    color: 'var(--cyan)',
                    padding: '0.1cqw 0.5cqw',
                    borderRadius: '0.25cqw',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Action Button Placeholder */}
          <div
            style={{
              marginTop: '1cqw',
              paddingTop: '0.8cqw',
              borderTop: '1px solid rgba(213, 221, 226, 0.14)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)' }}>
              REPOSITORY ACCESS:
            </span>
            <button
              type="button"
              style={{
                backgroundColor: 'rgba(0, 255, 102, 0.1)',
                border: '0.12cqw solid #00ff66',
                color: '#00ff66',
                fontFamily: 'var(--mono)',
                fontSize: 'max(7px, 0.95cqw)',
                padding: '0.4cqw 1cqw',
                borderRadius: '0.4cqw',
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
              onClick={() => alert(`Repository URL placeholder: ${selectedMission.repoUrlPlaceholder} (You can provide actual link later)`)}
            >
              [VIEW GITHUB REPO]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
