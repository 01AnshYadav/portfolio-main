import React, { useState } from 'react';

interface CertModule {
  id: string;
  name: string;
  issuer: string;
  status: string;
  year: string;
  cipher: string;
}

const CERT_MODULES: CertModule[] = [
  {
    id: 'AWS-CCP-9842',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    status: 'UNLOCKED // VERIFIED',
    year: '2025',
    cipher: 'SHA256:4FA912',
  },
  {
    id: 'SEC-PLUS-5519',
    name: 'CompTIA Security+ Modules',
    issuer: 'CompTIA Academy',
    status: 'UNLOCKED // VERIFIED',
    year: '2025',
    cipher: 'SHA256:7BC034',
  },
  {
    id: 'CISCO-NET-2204',
    name: 'Cisco Networking Fundamentals',
    issuer: 'Cisco Networking Academy',
    status: 'UNLOCKED // VERIFIED',
    year: '2024',
    cipher: 'SHA256:88DE56',
  },
  {
    id: 'LNX-SYS-7718',
    name: 'Linux System Hardening & Administration',
    issuer: 'DedSec Kernel Operations',
    status: 'UNLOCKED // VERIFIED',
    year: '2025',
    cipher: 'SHA256:991F77',
  },
];

interface SkillNode {
  category: string;
  level: string;
  status: string;
  tools: string[];
  description: string;
}

const SKILL_NODES: SkillNode[] = [
  {
    category: 'AWS',
    level: '92%',
    status: '[SYSTEM_OPTIMAL]',
    tools: ['KMS Envelope Encryption', 'IAM Least-Privilege', 'Lambda Serverless', 'VPC Isolation', 'S3 Secure Vaults'],
    description: 'Cloud security architecture, access control boundaries, cryptographic key vaults, and serverless defense APIs.',
  },
  {
    category: 'Linux',
    level: '95%',
    status: '[KERNEL_ACTIVE]',
    tools: ['Process Memory Forensics', 'Systemd Hardening', 'ProcFS Extraction', 'Bash Automation', 'Debian/Arch Kernel'],
    description: 'Kernel parameter hardening, live process memory triage, system auditing, and shell script automation.',
  },
  {
    category: 'Networking',
    level: '94%',
    status: '[LINK_ESTABLISHED]',
    tools: ['TCP/IP Protocol Stack', 'Wireshark Packet Analysis', 'ARP & DNS Inspection', 'Subnetting', 'Firewall Rules'],
    description: 'Low-level protocol inspection, packet capture analysis, network intrusion detection, and P2P synchronization.',
  },
  {
    category: 'Python',
    level: '90%',
    status: '[PAYLOAD_COMPILED]',
    tools: ['Socket Programming', 'Cryptographic Hashing', 'Automated Scanners', 'REST APIs', 'Exploit Prototyping'],
    description: 'Automated offensive/defensive scripting, custom protocol parsers, cryptographic hashing, and security testing.',
  },
];

export const LoadoutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CERTS' | 'SKILLS'>('CERTS');
  const [selectedSkill, setSelectedSkill] = useState<number>(0);

  return (
    <div
      className="loadout-app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        color: '#e6edf3',
        fontFamily: 'var(--mono)',
      }}
    >
      {/* Top Tab Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#141820',
          border: '1px solid #202632',
          padding: '8px 16px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('CERTS')}
            style={{
              background: activeTab === 'CERTS' ? '#0b0d10' : 'transparent',
              border: '1px solid ' + (activeTab === 'CERTS' ? '#00ff66' : '#202632'),
              color: activeTab === 'CERTS' ? '#00ff66' : 'var(--dim)',
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 14px',
              cursor: 'pointer',
            }}
          >
            [ UNLOCKED_SECURITY_MODULES ]
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SKILLS')}
            style={{
              background: activeTab === 'SKILLS' ? '#0b0d10' : 'transparent',
              border: '1px solid ' + (activeTab === 'SKILLS' ? '#00ff66' : '#202632'),
              color: activeTab === 'SKILLS' ? '#00ff66' : 'var(--dim)',
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 14px',
              cursor: 'pointer',
            }}
          >
            [ SKILL_NODES_MATRIX ]
          </button>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--dim)' }}>
          <span>STATUS: ALL 4 MODULES VERIFIED</span>
        </div>
      </div>

      {/* VIEW 1: UNLOCKED SECURITY MODULES (CERTIFICATIONS) */}
      {activeTab === 'CERTS' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {CERT_MODULES.map((cert) => (
            <div
              key={cert.id}
              style={{
                backgroundColor: '#141820',
                border: '1px solid #202632',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#00ff66', fontSize: '11px', fontWeight: 800 }}>[{cert.id}]</span>
                  <span
                    style={{
                      fontSize: '9.5px',
                      color: '#00ff66',
                      border: '1px solid #00ff66',
                      padding: '1px 6px',
                    }}
                  >
                    {cert.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '2px' }}>
                  ISSUER: {cert.issuer}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid #202632',
                  fontSize: '10px',
                  color: 'var(--dim)',
                }}
              >
                <span>CIPHER: {cert.cipher}</span>
                <span>YEAR: {cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: SKILL NODES (AWS, Linux, Networking, Python) */}
      {activeTab === 'SKILLS' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px' }}>
          {/* Left Node Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SKILL_NODES.map((node, idx) => {
              const isSelected = selectedSkill === idx;
              return (
                <button
                  key={node.category}
                  type="button"
                  onClick={() => setSelectedSkill(idx)}
                  style={{
                    backgroundColor: isSelected ? '#0b0d10' : '#141820',
                    border: '1px solid ' + (isSelected ? '#00ff66' : '#202632'),
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'inherit',
                    fontFamily: 'inherit',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ color: isSelected ? '#00ff66' : '#ffffff', fontSize: '14px', fontWeight: 700 }}>
                      {node.category}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dim)', marginTop: '2px' }}>
                      {node.status}
                    </div>
                  </div>
                  <span style={{ color: '#00e5ff', fontSize: '12px', fontWeight: 800 }}>
                    {node.level}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Selected Node Inspection Box */}
          <div
            style={{
              backgroundColor: '#141820',
              border: '1px solid #202632',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#00ff66' }}>
                // NODE: {SKILL_NODES[selectedSkill].category}
              </span>
              <span style={{ fontSize: '12px', color: '#00e5ff', fontWeight: 700 }}>
                EFFICIENCY: {SKILL_NODES[selectedSkill].level}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#d2dbe0', lineHeight: 1.5, margin: 0 }}>
              {SKILL_NODES[selectedSkill].description}
            </p>

            {/* Proficiency Meter */}
            <div style={{ width: '100%', height: '6px', background: '#0b0d10', border: '1px solid #202632' }}>
              <div
                style={{
                  width: SKILL_NODES[selectedSkill].level,
                  height: '100%',
                  backgroundColor: '#00ff66',
                }}
              />
            </div>

            {/* Equipped Tools */}
            <div style={{ marginTop: '6px' }}>
              <div style={{ fontSize: '11px', color: 'var(--dim)', marginBottom: '8px' }}>
                // EQUIPPED ARSENAL &amp; PROTOCOLS:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                {SKILL_NODES[selectedSkill].tools.map((tool, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#0b0d10',
                      border: '1px solid #202632',
                      padding: '8px 12px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: '#00ff66' }}>▸</span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
