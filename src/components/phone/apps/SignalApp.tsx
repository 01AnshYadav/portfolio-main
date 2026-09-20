import React, { useState } from 'react';

interface SignalAppProps {
  onTakeDownCtos?: () => void;
}

export const SignalApp: React.FC<SignalAppProps> = ({ onTakeDownCtos }) => {
  // Mini-game state: 3 security nodes must be connected/bypassed
  const [nodes, setNodes] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);

  const toggleNode = (idx: number) => {
    const updated: [boolean, boolean, boolean] = [...nodes];
    updated[idx] = !updated[idx];
    setNodes(updated);
    if (updated[0] && updated[1] && updated[2]) {
      setTimeout(() => setUnlocked(true), 350);
    }
  };

  const handleTakeDown = () => {
    setBroadcastSent(true);
    if (onTakeDownCtos) {
      onTakeDownCtos();
    }
  };

  return (
    <div
      className="signal-app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {!unlocked ? (
        /* 1. Hack Mini-Game / Access Lock */
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5cqw',
            backgroundColor: 'rgba(10, 14, 18, 0.85)',
            border: '0.12cqw solid rgba(255, 69, 54, 0.4)',
            borderRadius: '1cqw',
            padding: '2cqw',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ff4536', fontSize: 'max(9px, 1.3cqw)', fontWeight: 'bold' }}>
              [SECURITY LOCKOUT: ENCRYPTED DEDSEC CHANNEL]
            </div>
            <div style={{ color: 'var(--dim)', fontSize: 'max(7px, 0.95cqw)', marginTop: '0.4cqw' }}>
              Align all three gateway relay nodes to bypass ctOS surveillance and access direct comms.
            </div>
          </div>

          {/* 3 Interactive Circuit Nodes */}
          <div style={{ display: 'flex', gap: '3cqw', alignItems: 'center' }}>
            {[
              { label: 'NODE ALPHA', desc: 'Port 443 Probe' },
              { label: 'NODE BETA', desc: 'KMS Handshake' },
              { label: 'NODE GAMMA', desc: 'VPN Tunnel' },
            ].map((node, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleNode(i)}
                style={{
                  width: '18cqw',
                  padding: '1.2cqw 0.8cqw',
                  backgroundColor: nodes[i] ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 69, 54, 0.1)',
                  border: '0.15cqw solid ' + (nodes[i] ? '#00ff66' : '#ff4536'),
                  borderRadius: '0.8cqw',
                  color: nodes[i] ? '#00ff66' : '#ff4536',
                  cursor: 'pointer',
                  fontFamily: 'var(--mono)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4cqw',
                  transition: 'all 0.2s ease',
                  boxShadow: nodes[i] ? '0 0 12px rgba(0, 255, 102, 0.3)' : 'none',
                }}
              >
                <span style={{ fontSize: 'max(7.5px, 1.05cqw)', fontWeight: 'bold' }}>{node.label}</span>
                <span style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--ink)' }}>{node.desc}</span>
                <span
                  style={{
                    fontSize: 'max(6px, 0.8cqw)',
                    marginTop: '0.3cqw',
                    color: nodes[i] ? '#00ff66' : '#ff4536',
                  }}
                >
                  [{nodes[i] ? 'CONNECTED' : 'LOCKED'}]
                </span>
              </button>
            ))}
          </div>

          <div style={{ fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--cyan-hi)', fontStyle: 'italic' }}>
            Click each node to establish the encrypted bypass route.
          </div>
        </div>
      ) : (
        /* 2. Access Granted Screen */
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(8, 14, 18, 0.9)',
            border: '0.15cqw solid #00ff66',
            borderRadius: '1cqw',
            padding: '1.5cqw 2cqw',
            boxShadow: '0 0 20px rgba(0, 255, 102, 0.2)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 255, 102, 0.25)', paddingBottom: '0.6cqw' }}>
            <span style={{ color: '#00ff66', fontWeight: 'bold', fontSize: 'max(9px, 1.3cqw)' }}>
              [ACCESS GRANTED // ENCRYPTED COMMS CHANNEL]
            </span>
            <span style={{ color: 'var(--cyan-hi)', fontSize: 'max(7px, 0.9cqw)' }}>
              CIPHER: AES-256-GCM
            </span>
          </div>

          {/* Contact Links with Clean Placeholders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2cqw', margin: '1cqw 0' }}>
            {/* LinkedIn Placeholder */}
            <div
              style={{
                backgroundColor: 'rgba(58, 174, 196, 0.08)',
                border: '0.12cqw solid rgba(58, 174, 196, 0.4)',
                borderRadius: '0.6cqw',
                padding: '0.8cqw 1.2cqw',
              }}
            >
              <div style={{ color: 'var(--cyan-hi)', fontSize: 'max(7px, 0.9cqw)', fontWeight: 600 }}>
                // LINKEDIN PROFILE
              </div>
              <div style={{ fontSize: 'max(7.5px, 1cqw)', color: '#ffffff', marginTop: '0.3cqw' }}>
                [LinkedIn Profile Placeholder]
              </div>
              <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)', marginTop: '0.2cqw' }}>
                (Link will be added in upcoming update)
              </div>
            </div>

            {/* GitHub Placeholder */}
            <div
              style={{
                backgroundColor: 'rgba(58, 174, 196, 0.08)',
                border: '0.12cqw solid rgba(58, 174, 196, 0.4)',
                borderRadius: '0.6cqw',
                padding: '0.8cqw 1.2cqw',
              }}
            >
              <div style={{ color: 'var(--cyan-hi)', fontSize: 'max(7px, 0.9cqw)', fontWeight: 600 }}>
                // GITHUB REPOSITORIES
              </div>
              <div style={{ fontSize: 'max(7.5px, 1cqw)', color: '#ffffff', marginTop: '0.3cqw' }}>
                https://github.com/01AnshYadav
              </div>
              <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)', marginTop: '0.2cqw' }}>
                Public Repos & Security Labs
              </div>
            </div>

            {/* Email Channel */}
            <div
              style={{
                backgroundColor: 'rgba(0, 255, 102, 0.06)',
                border: '0.12cqw solid rgba(0, 255, 102, 0.35)',
                borderRadius: '0.6cqw',
                padding: '0.8cqw 1.2cqw',
              }}
            >
              <div style={{ color: '#00ff66', fontSize: 'max(7px, 0.9cqw)', fontWeight: 600 }}>
                // ENCRYPTED DISPATCH EMAIL
              </div>
              <div style={{ fontSize: 'max(7.5px, 1cqw)', color: '#ffffff', marginTop: '0.3cqw' }}>
                [Direct Email Placeholder]
              </div>
              <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)', marginTop: '0.2cqw' }}>
                Official Inquiry & Hackathon Comms
              </div>
            </div>

            {/* PGP Public Key */}
            <div
              style={{
                backgroundColor: 'rgba(0, 255, 102, 0.06)',
                border: '0.12cqw solid rgba(0, 255, 102, 0.35)',
                borderRadius: '0.6cqw',
                padding: '0.8cqw 1.2cqw',
              }}
            >
              <div style={{ color: '#00ff66', fontSize: 'max(7px, 0.9cqw)', fontWeight: 600 }}>
                // PGP FINGERPRINT
              </div>
              <div style={{ fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--ink)', marginTop: '0.3cqw', letterSpacing: '0.05em' }}>
                4A9F 8B12 C034 DE56 991F 77BC 33A1 00EF
              </div>
              <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)', marginTop: '0.2cqw' }}>
                Subkey: RSA 4096 / Verified
              </div>
            </div>
          </div>

          {/* "TAKE DOWN ctOS" Action */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8cqw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--dim)' }}>
              OPERATIVE ACTION REQUIRED:
            </span>
            <button
              type="button"
              onClick={handleTakeDown}
              disabled={broadcastSent}
              style={{
                backgroundColor: broadcastSent ? 'rgba(0, 255, 102, 0.2)' : 'rgba(255, 69, 54, 0.2)',
                border: '0.15cqw solid ' + (broadcastSent ? '#00ff66' : '#ff4536'),
                color: broadcastSent ? '#00ff66' : '#ffffff',
                fontFamily: 'var(--mono)',
                fontSize: 'max(7.5px, 1.1cqw)',
                fontWeight: 'bold',
                padding: '0.5cqw 1.5cqw',
                borderRadius: '0.4cqw',
                cursor: broadcastSent ? 'default' : 'pointer',
                letterSpacing: '0.08em',
                transition: 'all 0.2s',
              }}
            >
              {broadcastSent ? '✓ ctOS OVERRIDE EXECUTED' : '⚡ [TAKE DOWN ctOS]'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
