import React, { useState } from 'react';
import { LOADOUT_DATA } from '../../../config';

export const LoadoutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CERTS' | 'SKILLS'>('SKILLS');
  const [selectedSkill, setSelectedSkill] = useState<number>(0);

  return (
    <div
      className="loadout-app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1cqw',
        height: '100%',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Tab Switcher */}
      <div
        style={{
          display: 'flex',
          gap: '1cqw',
          borderBottom: '1px solid rgba(58, 174, 196, 0.2)',
          paddingBottom: '0.5cqw',
        }}
      >
        <button
          onClick={() => setActiveTab('SKILLS')}
          style={{
            background: activeTab === 'SKILLS' ? 'rgba(0, 255, 102, 0.15)' : 'none',
            border: '0.12cqw solid ' + (activeTab === 'SKILLS' ? '#00ff66' : 'rgba(213, 221, 226, 0.2)'),
            color: activeTab === 'SKILLS' ? '#00ff66' : 'var(--dim)',
            fontFamily: 'var(--mono)',
            fontSize: 'max(7.5px, 1cqw)',
            padding: '0.3cqw 1cqw',
            borderRadius: '0.3cqw',
            cursor: 'pointer',
          }}
        >
          // SKILL TREE MATRIX
        </button>
        <button
          onClick={() => setActiveTab('CERTS')}
          style={{
            background: activeTab === 'CERTS' ? 'rgba(0, 255, 102, 0.15)' : 'none',
            border: '0.12cqw solid ' + (activeTab === 'CERTS' ? '#00ff66' : 'rgba(213, 221, 226, 0.2)'),
            color: activeTab === 'CERTS' ? '#00ff66' : 'var(--dim)',
            fontFamily: 'var(--mono)',
            fontSize: 'max(7.5px, 1cqw)',
            padding: '0.3cqw 1cqw',
            borderRadius: '0.3cqw',
            cursor: 'pointer',
          }}
        >
          // ctOS SECURITY MODULES
        </button>
      </div>

      {/* Tab 1: Interactive Skill Tree Matrix */}
      {activeTab === 'SKILLS' && (
        <div style={{ display: 'flex', gap: '2cqw', flex: 1, overflow: 'hidden' }}>
          {/* Skill Nodes Selector */}
          <div
            style={{
              width: '32cqw',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7cqw',
              overflowY: 'auto',
            }}
          >
            {LOADOUT_DATA.skillNodes.map((s, idx) => {
              const isSelected = selectedSkill === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSkill(idx)}
                  style={{
                    background: isSelected ? 'rgba(0, 255, 102, 0.12)' : 'rgba(10, 15, 20, 0.8)',
                    border: '0.12cqw solid ' + (isSelected ? '#00ff66' : 'rgba(58, 174, 196, 0.3)'),
                    borderRadius: '0.6cqw',
                    padding: '0.7cqw 1cqw',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 'max(7px, 0.95cqw)', color: isSelected ? '#ffffff' : 'var(--ink)' }}>
                    {s.name}
                  </span>
                  <span style={{ fontSize: 'max(6.5px, 0.85cqw)', color: '#00ff66' }}>
                    {s.level}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill Breakdown & Loadout Arsenal */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(10, 14, 18, 0.85)',
              border: '0.12cqw solid rgba(58, 174, 196, 0.35)',
              borderRadius: '0.8cqw',
              padding: '1.2cqw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1cqw',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'max(9px, 1.3cqw)', fontWeight: 'bold', color: '#00ff66' }}>
                {LOADOUT_DATA.skillNodes[selectedSkill].name}
              </span>
              <span style={{ fontSize: 'max(7px, 0.9cqw)', color: 'var(--cyan-hi)' }}>
                PROFICIENCY: {LOADOUT_DATA.skillNodes[selectedSkill].level}
              </span>
            </div>

            {/* Proficiency progress bar */}
            <div
              style={{
                width: '100%',
                height: '0.8cqw',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '0.4cqw',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: LOADOUT_DATA.skillNodes[selectedSkill].level,
                  height: '100%',
                  backgroundColor: '#00ff66',
                  boxShadow: '0 0 8px #00ff66',
                }}
              />
            </div>

            {/* Tools & Weaponry Loadout */}
            <div style={{ marginTop: '0.5cqw' }}>
              <div style={{ fontSize: 'max(6.5px, 0.85cqw)', color: 'var(--dim)', marginBottom: '0.6cqw' }}>
                // EQUIPPED ARSENAL & PROTOCOLS:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6cqw' }}>
                {LOADOUT_DATA.skillNodes[selectedSkill].tools.map((tool, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'rgba(58, 174, 196, 0.08)',
                      border: '0.1cqw solid rgba(58, 174, 196, 0.3)',
                      padding: '0.5cqw 0.8cqw',
                      borderRadius: '0.4cqw',
                      fontSize: 'max(6.5px, 0.9cqw)',
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5cqw',
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

      {/* Tab 2: Certifications / ctOS Security Modules */}
      {activeTab === 'CERTS' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1cqw',
            overflowY: 'auto',
          }}
        >
          {LOADOUT_DATA.certifications.map((c, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(8, 12, 16, 0.85)',
                border: '0.12cqw solid rgba(0, 255, 102, 0.3)',
                borderRadius: '0.8cqw',
                padding: '1cqw 1.2cqw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.4cqw',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'max(6px, 0.8cqw)', color: '#00ff66' }}>{c.id}</span>
                <span
                  style={{
                    fontSize: 'max(5.5px, 0.75cqw)',
                    backgroundColor: 'rgba(0, 255, 102, 0.15)',
                    color: '#00ff66',
                    padding: '0.1cqw 0.5cqw',
                    borderRadius: '0.2cqw',
                  }}
                >
                  {c.status}
                </span>
              </div>
              <div style={{ fontSize: 'max(7.5px, 1.05cqw)', fontWeight: 'bold', color: '#ffffff' }}>
                {c.name}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'max(6px, 0.8cqw)', color: 'var(--dim)' }}>
                <span>ISSUER: {c.issuer}</span>
                <span>YEAR: {c.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
