import React, { useState } from 'react';

interface SignalAppProps {
  onTakeDownCtos?: () => void;
}

export const SignalApp: React.FC<SignalAppProps> = ({ onTakeDownCtos }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isBypassing, setIsBypassing] = useState<boolean>(false);
  const [takeDownExecuted, setTakeDownExecuted] = useState<boolean>(false);

  const handleBypass = () => {
    setIsBypassing(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsBypassing(false);
    }, 450);
  };

  const handleTakeDown = () => {
    setTakeDownExecuted(true);
    if (onTakeDownCtos) {
      onTakeDownCtos();
    }
  };

  return (
    <div
      className="signal-app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        color: '#e6edf3',
        fontFamily: 'var(--mono)',
      }}
    >
      {/* Top Protocol Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#141820',
          border: '1px solid #202632',
          padding: '10px 16px',
          fontSize: '11px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#00e5ff', fontWeight: 800 }}>[ENCRYPTED_COMMS // DISPATCH]</span>
          <span style={{ color: 'var(--dim)' }}>CIPHER: AES-256-GCM</span>
        </div>
        <div style={{ color: isUnlocked ? '#00ff66' : '#ff3838' }}>
          STATUS: {isUnlocked ? '[TUNNEL_ESTABLISHED]' : '[AIR_GAPPED_LOCKOUT]'}
        </div>
      </div>

      {!isUnlocked ? (
        /* 1. Encrypted Lockout State with Interactive Access Button */
        <div
          style={{
            backgroundColor: '#141820',
            border: '1px solid #202632',
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            textAlign: 'center',
            minHeight: '320px',
          }}
        >
          <div style={{ color: '#ff3838', fontSize: '13px', fontWeight: 800, letterSpacing: '0.08em' }}>
            [SECURITY ENCRYPTION: INCOMING TRANSMISSION AIR-GAPPED]
          </div>

          <p style={{ maxWidth: '520px', fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5, margin: 0 }}>
            Direct comms channels require cryptographic handshake to prevent ctOS automated metadata logging. Click to execute the zero-trace tunnel bypass.
          </p>

          <button
            type="button"
            onClick={handleBypass}
            disabled={isBypassing}
            style={{
              background: '#0b0d10',
              border: '1px solid ' + (isBypassing ? '#00e5ff' : '#00ff66'),
              color: isBypassing ? '#00e5ff' : '#00ff66',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              padding: '12px 28px',
              cursor: isBypassing ? 'wait' : 'pointer',
              transition: 'all 0.15s ease',
              marginTop: '8px',
            }}
          >
            {isBypassing ? '[ EXECUTING_HANDSHAKE... ]' : '[ INITIATE_BYPASS_HANDSHAKE ]'}
          </button>
        </div>
      ) : (
        /* 2. Unlocked Encrypted Contact View */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Contact Cards Grid: LinkedIn, GitHub, Email, PGP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* 1. LinkedIn */}
            <div
              style={{
                backgroundColor: '#141820',
                border: '1px solid #202632',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#00e5ff', fontSize: '11px', fontWeight: 700 }}>// LINKEDIN PROFILE</span>
                <span style={{ color: 'var(--dim)', fontSize: '9px' }}>[NET_VERIFIED]</span>
              </div>
              <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
                [LinkedIn Profile Placeholder]
              </div>
              <div style={{ fontSize: '10px', color: 'var(--dim)' }}>
                Direct networking &amp; professional connection link.
              </div>
            </div>

            {/* 2. GitHub */}
            <div
              style={{
                backgroundColor: '#141820',
                border: '1px solid #202632',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#00ff66', fontSize: '11px', fontWeight: 700 }}>// GITHUB REPOSITORIES</span>
                <span style={{ color: 'var(--dim)', fontSize: '9px' }}>[CODE_VAULT]</span>
              </div>
              <a
                href="https://github.com/01AnshYadav"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '13px', color: '#00ff66', fontWeight: 600, textDecoration: 'none' }}
              >
                https://github.com/01AnshYadav
              </a>
              <div style={{ fontSize: '10px', color: 'var(--dim)' }}>
                Public repositories, scripts, and CTF security writeups.
              </div>
            </div>

            {/* 3. Email */}
            <div
              style={{
                backgroundColor: '#141820',
                border: '1px solid #202632',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#00e5ff', fontSize: '11px', fontWeight: 700 }}>// ENCRYPTED EMAIL</span>
                <span style={{ color: 'var(--dim)', fontSize: '9px' }}>[DISPATCH_READY]</span>
              </div>
              <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
                [Direct Email Placeholder]
              </div>
              <div style={{ fontSize: '10px', color: 'var(--dim)' }}>
                Direct communication for hackathon inquiries.
              </div>
            </div>

            {/* 4. PGP Key */}
            <div
              style={{
                backgroundColor: '#141820',
                border: '1px solid #202632',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#00ff66', fontSize: '11px', fontWeight: 700 }}>// PGP FINGERPRINT</span>
                <span style={{ color: 'var(--dim)', fontSize: '9px' }}>[RSA_4096]</span>
              </div>
              <div style={{ fontSize: '11px', color: '#ffffff', letterSpacing: '0.06em' }}>
                4A9F 8B12 C034 DE56 991F 77BC 33A1 00EF
              </div>
              <div style={{ fontSize: '10px', color: 'var(--dim)' }}>
                Verified public key for encrypted payload verification.
              </div>
            </div>
          </div>

          {/* Action: Take Down ctOS */}
          <div
            style={{
              backgroundColor: '#141820',
              border: '1px solid #202632',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700 }}>
                DEDSEC MESH ACTION: ctOS 2.0 OVERRIDE
              </div>
              <div style={{ color: 'var(--dim)', fontSize: '11px', marginTop: '2px' }}>
                Broadcast zero-day payload across regional city nodes.
              </div>
            </div>

            <button
              type="button"
              onClick={handleTakeDown}
              disabled={takeDownExecuted}
              style={{
                background: '#0b0d10',
                border: '1px solid ' + (takeDownExecuted ? '#00ff66' : '#ff3838'),
                color: takeDownExecuted ? '#00ff66' : '#ffffff',
                fontFamily: 'inherit',
                fontSize: '12px',
                fontWeight: 800,
                padding: '8px 18px',
                cursor: takeDownExecuted ? 'default' : 'pointer',
              }}
            >
              {takeDownExecuted ? '[ OVERRIDE_EXECUTED ]' : '[ EXECUTE_ctOS_TAKEDOWN ]'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
