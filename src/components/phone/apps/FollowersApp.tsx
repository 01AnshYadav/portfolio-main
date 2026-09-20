import React from 'react';

interface FollowersAppProps {
  followerCount: number;
  activityLogs: string[];
}

export const FollowersApp: React.FC<FollowersAppProps> = ({
  followerCount,
  activityLogs,
}) => {
  return (
    <div
      className="followers-app"
      style={{
        display: 'flex',
        gap: '2cqw',
        height: '100%',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Left: Giant Botnet Power Counter */}
      <div
        style={{
          width: '38cqw',
          backgroundColor: 'rgba(8, 12, 16, 0.9)',
          border: '0.15cqw solid #00ff66',
          borderRadius: '1cqw',
          padding: '1.4cqw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 2cqw rgba(0, 255, 102, 0.15)',
        }}
      >
        <div>
          <div style={{ fontSize: 'max(7px, 0.9cqw)', color: '#00ff66', letterSpacing: '0.12em' }}>
            // DEDSEC BOTNET POWER
          </div>
          <div
            style={{
              fontSize: 'max(18px, 3.2cqw)',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: '0.6cqw 0',
              fontFamily: 'var(--logo)',
              letterSpacing: '0.04em',
              textShadow: '0 0 12px rgba(0, 255, 102, 0.6)',
            }}
          >
            {followerCount.toLocaleString()}
          </div>
          <div style={{ fontSize: 'max(7px, 0.95cqw)', color: 'var(--cyan-hi)' }}>
            RECRUITED OPERATIVES ACROSS REGION
          </div>
        </div>

        {/* Live Network Bandwidth & Activity */}
        <div style={{ borderTop: '1px solid rgba(0, 255, 102, 0.2)', paddingTop: '0.8cqw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--dim)', marginBottom: '0.4cqw' }}>
            <span>GRID SYNCHRONIZATION</span>
            <span style={{ color: '#00ff66' }}>98.4%</span>
          </div>
          <div style={{ width: '100%', height: '0.5cqw', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '0.25cqw', overflow: 'hidden' }}>
            <div style={{ width: '98.4%', height: '100%', backgroundColor: '#00ff66' }} />
          </div>
        </div>

        <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)', fontStyle: 'italic' }}>
          Interact with missions, shell commands, or network pings to boost the botnet.
        </div>
      </div>

      {/* Right: Hacker Badges, CTF Scores & Activity Log */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1cqw',
          overflowY: 'auto',
        }}
      >
        {/* Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8cqw' }}>
          {/* TryHackMe Badge */}
          <div
            style={{
              backgroundColor: 'rgba(12, 16, 20, 0.85)',
              border: '0.1cqw solid rgba(58, 174, 196, 0.35)',
              borderRadius: '0.8cqw',
              padding: '0.8cqw',
            }}
          >
            <div style={{ fontSize: 'max(6px, 0.8cqw)', color: '#ff4536', fontWeight: 600 }}>
              TRYHACKME
            </div>
            <div style={{ fontSize: 'max(9px, 1.2cqw)', fontWeight: 'bold', color: '#ffffff', margin: '0.2cqw 0' }}>
              TOP 5% RANK
            </div>
            <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)' }}>
              45+ Labs & Rooms Cleared
            </div>
          </div>

          {/* HackTheBox Badge */}
          <div
            style={{
              backgroundColor: 'rgba(12, 16, 20, 0.85)',
              border: '0.1cqw solid rgba(58, 174, 196, 0.35)',
              borderRadius: '0.8cqw',
              padding: '0.8cqw',
            }}
          >
            <div style={{ fontSize: 'max(6px, 0.8cqw)', color: '#00ff66', fontWeight: 600 }}>
              HACK THE BOX
            </div>
            <div style={{ fontSize: 'max(9px, 1.2cqw)', fontWeight: 'bold', color: '#ffffff', margin: '0.2cqw 0' }}>
              PROVING GROUNDS
            </div>
            <div style={{ fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)' }}>
              PrivEsc & Active Directory
            </div>
          </div>
        </div>

        {/* Live Recruitment Feed */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(6, 10, 14, 0.85)',
            border: '0.1cqw solid rgba(58, 174, 196, 0.25)',
            borderRadius: '0.8cqw',
            padding: '1cqw',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--cyan-hi)', marginBottom: '0.5cqw' }}>
            // RECENT BOTNET TELEMETRY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cqw', overflowY: 'auto' }}>
            {activityLogs.slice(-5).map((log, i) => (
              <div
                key={i}
                style={{
                  fontSize: 'max(6px, 0.8cqw)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5cqw',
                }}
              >
                <span style={{ color: '#00ff66' }}>[+]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
