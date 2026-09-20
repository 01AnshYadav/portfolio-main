import React, { useState } from 'react';

interface MissionsAppProps {
  onFollowerBonus?: (amount: number, reason: string) => void;
}

interface OperationBriefing {
  id: string;
  opCode: string;
  title: string;
  category: string;
  objective: string;
  method: string;
  result: string;
  tags: string[];
  repoUrl: string;
}

const BRIEFINGS: OperationBriefing[] = [
  {
    id: 'op-aws',
    opCode: 'OP_01',
    title: 'AWS Password Manager',
    category: 'Cloud Infrastructure & Zero-Trust Security',
    objective: 'Engineer a zero-knowledge cloud credential vault securing secrets against server-side compromise and unauthorized physical extraction.',
    method: 'Implemented AWS KMS envelope encryption, IAM least-privilege security boundaries, client-side cryptographic key derivation (PBKDF2), and serverless AWS Lambda validation APIs.',
    result: 'Zero-exposure credential management pipeline with automated cryptographic key rotation and client-side encryption guarantees.',
    tags: ['AWS KMS', 'IAM', 'Lambda', 'Zero-Trust', 'Python'],
    repoUrl: 'https://github.com/01AnshYadav',
  },
  {
    id: 'op-sync',
    opCode: 'OP_02',
    title: 'CyberSync',
    category: 'Distributed Systems & Low-Latency Networking',
    objective: 'Construct a resilient peer-to-peer data transport layer for real-time state synchronization over hostile or untrusted networks.',
    method: 'Engineered custom low-latency WebSocket protocol pipelines, cryptographic packet integrity verification, distributed state vector clocks, and automated packet loss conflict resolution.',
    result: 'High-throughput P2P protocol delivering sub-15ms cross-node synchronization with zero telemetry leakage.',
    tags: ['WebSockets', 'Cryptography', 'P2P', 'Networking', 'Python'],
    repoUrl: 'https://github.com/01AnshYadav',
  },
  {
    id: 'op-mem',
    opCode: 'OP_03',
    title: 'CareerMEMORY',
    category: 'Memory Forensics & Incident Response Tooling',
    objective: 'Develop an automated incident response utility to audit active process memory, extract volatile artifacts, and detect code injection anomalies.',
    method: 'Analyzed Linux virtual memory buffers (/proc/$PID/mem and maps), implemented raw memory signature scanning, heap/stack structure parsing, and automated timeline reconstruction.',
    result: 'Lightweight standalone CLI forensics tool enabling instant live triage of hijacked or injected process spaces.',
    tags: ['Linux Memory', 'Forensics', 'C/C++', 'Process Auditing', 'Bash'],
    repoUrl: 'https://github.com/01AnshYadav',
  },
];

export const MissionsApp: React.FC<MissionsAppProps> = ({ onFollowerBonus }) => {
  const [expandedId, setExpandedId] = useState<string>(BRIEFINGS[0].id);
  const [readOps, setReadOps] = useState<Set<string>>(new Set([BRIEFINGS[0].id]));

  const toggleExpand = (id: string, title: string) => {
    setExpandedId(expandedId === id ? '' : id);
    if (!readOps.has(id)) {
      setReadOps(new Set([...readOps, id]));
      if (onFollowerBonus) {
        onFollowerBonus(2500, `Decrypted dossier: ${title}`);
      }
    }
  };

  return (
    <div
      className="missions-briefings-container"
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
          <span style={{ color: '#00ff66', fontWeight: 800 }}>[DEDSEC // OPERATIONS]</span>
          <span style={{ color: 'var(--dim)' }}>ACTIVE BRIEFS: 3 + CTF REPO</span>
        </div>
        <div style={{ color: '#00e5ff' }}>
          <span>EXPAND CARD TO DECRYPT (+2,500 FOLLOWERS)</span>
        </div>
      </div>

      {/* 3 Dedicated Project Cards (Objective, Method, Result) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {BRIEFINGS.map((op) => {
          const isExpanded = expandedId === op.id;
          return (
            <div
              key={op.id}
              className="mission-card"
              style={{
                backgroundColor: '#141820',
                border: '1px solid ' + (isExpanded ? '#00ff66' : '#202632'),
                transition: 'border-color 0.15s ease',
              }}
            >
              {/* Card Header Bar */}
              <button
                type="button"
                onClick={() => toggleExpand(op.id, op.title)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span
                    style={{
                      color: isExpanded ? '#00ff66' : 'var(--cyan)',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                    }}
                  >
                    [{op.opCode}]
                  </span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                      {op.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '2px' }}>
                      {op.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      color: isExpanded ? '#00ff66' : 'var(--dim)',
                      border: '1px solid ' + (isExpanded ? '#00ff66' : '#202632'),
                      padding: '2px 8px',
                    }}
                  >
                    {isExpanded ? '[- COLLAPSE]' : '[+ DECRYPT_BRIEF]'}
                  </span>
                </div>
              </button>

              {/* Card Expanded Content: Objective, Method, Result */}
              {isExpanded && (
                <div
                  style={{
                    padding: '0 18px 18px',
                    borderTop: '1px solid #202632',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ color: '#00e5ff', fontWeight: 700, fontSize: '11px', marginBottom: '2px' }}>
                      // OBJECTIVE:
                    </div>
                    <div style={{ color: '#e6edf3' }}>{op.objective}</div>
                  </div>

                  <div>
                    <div style={{ color: '#00ff66', fontWeight: 700, fontSize: '11px', marginBottom: '2px' }}>
                      // METHOD:
                    </div>
                    <div style={{ color: '#e6edf3' }}>{op.method}</div>
                  </div>

                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '11px', marginBottom: '2px' }}>
                      // RESULT:
                    </div>
                    <div style={{ color: 'var(--dim)' }}>{op.result}</div>
                  </div>

                  {/* Tags and Repo Link */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '8px',
                      borderTop: '1px solid #202632',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {op.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#0b0d10',
                            border: '1px solid #202632',
                            color: 'var(--dim)',
                            fontSize: '10px',
                            padding: '2px 6px',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={op.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#0b0d10',
                        border: '1px solid #00ff66',
                        color: '#00ff66',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 12px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>[ VIEW_GITHUB_REPOSITORY ]</span>
                      <span>&gt;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* DEDICATED CARD: CTF & TryHackMe Writeups Repo */}
        <div
          className="mission-card"
          style={{
            backgroundColor: '#141820',
            border: '1px solid #00e5ff',
            padding: '16px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00e5ff', fontWeight: 800, fontSize: '11px' }}>[REPO_ARCHIVE]</span>
              <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700 }}>
                CTF &amp; TryHackMe Writeups Repo
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--dim)', marginTop: '4px' }}>
              Offensive security walkthroughs, privilege escalation methodologies, and room writeups.
            </div>
          </div>

          <a
            href="https://github.com/01AnshYadav"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#0b0d10',
              border: '1px solid #00e5ff',
              color: '#00e5ff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '6px 16px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>[ ACCESS_CTF_WRITEUPS_ON_GITHUB ]</span>
            <span>&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
