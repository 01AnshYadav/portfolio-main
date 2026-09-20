import React, { useState, useRef, useEffect } from 'react';
import { OPERATIVE_PROFILE, MISSIONS_DATA, LOADOUT_DATA } from '../../../config';

interface HistoryEntry {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'sysinfo',
      output: 'DedSec Interactive Shell v2.4 // Type "help" for available commands.',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div>
            <div>AVAILABLE COMMANDS:</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>cat resume.txt</b> - Display full formal resume</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>whoami</b>         - Operative identity and bio</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>missions</b>       - List all active project repos</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>certs</b>          - List verified security modules</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>download</b>       - Download formal Resume PDF</div>
            <div>  ▸ <b style={{ color: '#00ff66' }}>clear</b>          - Clear shell screen</div>
          </div>
        );
        break;

      case 'cat resume.txt':
      case 'resume':
        output = (
          <div style={{ lineHeight: 1.45 }}>
            <div style={{ color: '#00ff66', fontWeight: 'bold' }}>=============================================</div>
            <div style={{ color: '#ffffff', fontWeight: 'bold' }}>ANSH YADAV // CYBERSECURITY & IT SYSTEMS EXPLORER</div>
            <div style={{ color: 'var(--cyan-hi)' }}>B.Tech Computer Science (Freshman) - University of Lucknow</div>
            <div style={{ color: 'var(--dim)' }}>Location: Lucknow, India / Remote | GitHub: @01AnshYadav</div>
            <div style={{ color: '#00ff66', fontWeight: 'bold' }}>=============================================</div>
            <div style={{ marginTop: '0.4cqw' }}>
              <b>[CORE COMPETENCIES]:</b> Cloud Security (AWS KMS, IAM), Linux System Hardening, Network Protocols (TCP/IP, Wireshark), Python & Bash Automation.
            </div>
            <div style={{ marginTop: '0.4cqw' }}>
              <b>[FEATURED PROJECTS]:</b>
              <div>• Uni Manager (Full-Stack Campus Platform)</div>
              <div>• Mailing Client (Network Automation & SMTP)</div>
              <div>• cyberTRACK (Security Telemetry & Aggregation)</div>
              <div>• CTF Writeups (Offensive Security Research)</div>
            </div>
            <div style={{ marginTop: '0.4cqw', color: '#00ff66' }}>
              [TIP: Type "download" or click the button above to get formal archive]
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = `${OPERATIVE_PROFILE.operativeName} (@${OPERATIVE_PROFILE.alias}) - ${OPERATIVE_PROFILE.role} (${OPERATIVE_PROFILE.education})`;
        break;

      case 'missions':
      case 'projects':
        output = (
          <div>
            {MISSIONS_DATA.map((m) => (
              <div key={m.id}>
                <b style={{ color: '#00ff66' }}>[{m.id}] {m.title}</b>: {m.category}
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        output = (
          <div>
            {LOADOUT_DATA.certifications.map((c, i) => (
              <div key={i}>
                • {c.name} ({c.issuer}) - [{c.status}]
              </div>
            ))}
          </div>
        );
        break;

      case 'download':
        output = (
          <div style={{ color: '#00ff66' }}>
            [SIMULATION]: Initiating resume payload transfer... (Download ready)
          </div>
        );
        triggerDownload();
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = `Command not recognized: "${trimmed}". Type "help" for command list.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setInput('');
  };

  const triggerDownload = () => {
    // Generate and download formal plain-text resume file
    const content = `ANSH YADAV - CYBERSECURITY & IT SYSTEMS EXPLORER
University of Lucknow - B.Tech (Freshman Year)
GitHub: https://github.com/01AnshYadav
LinkedIn: https://www.linkedin.com/in/ansh-y-762689357/
Discord: anshshare

PROFILE:
${OPERATIVE_PROFILE.bio}

PROJECTS:
1. Uni Manager - Full-Stack Campus Platform (https://github.com/01AnshYadav/uni-manager-)
2. Mailing Client - Network Automation & SMTP (https://github.com/01AnshYadav/Mailing-client)
3. cyberTRACK - Security Telemetry & Aggregation (https://github.com/01AnshYadav/cyberTRACK)
4. CTF Writeups - Offensive Security Research (https://github.com/01AnshYadav/ctf-writeups)

CREDENTIALS:
- Fundamentals of Cybersecurity (Proov / projectstudy.in)
  Checksum: d941228cb98dc576120ef399776724b6cf6a85636c1cd3c88eccd85a654ab0b2
  Verify: https://projectstudy.in/verify/d941228cb98dc576120ef399776724b6cf6a85636c1cd3c88eccd85a654ab0b2

ACTIVE FEEDS:
- TryHackMe: https://tryhackme.com/p/ansh.yadav
- LeetCode: https://leetcode.com/u/Ansh00/
- GitHub: https://github.com/01AnshYadav`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ansh_Yadav_Portfolio_Archive.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div
      className="terminal-app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#040608',
        border: '0.12cqw solid rgba(0, 255, 102, 0.3)',
        borderRadius: '0.8cqw',
        padding: '1cqw 1.4cqw',
        fontSize: 'max(7.5px, 1.05cqw)',
        color: '#d0dfde',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Top Bar with Quick Action Tags and PDF Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 255, 102, 0.2)',
          paddingBottom: '0.6cqw',
          marginBottom: '0.8cqw',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5cqw', flexWrap: 'wrap' }}>
          {['help', 'cat resume.txt', 'missions', 'certs', 'download'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              style={{
                background: 'rgba(58, 174, 196, 0.1)',
                border: '1px solid rgba(58, 174, 196, 0.35)',
                color: 'var(--cyan-hi)',
                fontFamily: 'var(--mono)',
                fontSize: 'max(6px, 0.8cqw)',
                padding: '0.15cqw 0.5cqw',
                borderRadius: '0.2cqw',
                cursor: 'pointer',
              }}
            >
              ${cmd}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={triggerDownload}
          style={{
            background: 'rgba(0, 255, 102, 0.15)',
            border: '1px solid #00ff66',
            color: '#00ff66',
            fontFamily: 'var(--mono)',
            fontSize: 'max(6.5px, 0.85cqw)',
            padding: '0.2cqw 0.8cqw',
            borderRadius: '0.3cqw',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4cqw',
          }}
        >
          <span>⬇</span> [DOWNLOAD RESUME]
        </button>
      </div>

      {/* Terminal History Log */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6cqw',
        }}
      >
        {history.map((entry, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2cqw' }}>
            <div style={{ color: 'var(--cyan-hi)' }}>
              <span style={{ color: '#00ff66' }}>guest@dedsec-box:~$</span> {entry.command}
            </div>
            <div style={{ color: '#e6eff5', paddingLeft: '1cqw' }}>{entry.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Prompt */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '0.6cqw', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4cqw' }}>
        <span style={{ color: '#00ff66', marginRight: '0.5cqw' }}>guest@dedsec-box:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help', 'cat resume.txt' or 'download'..."
          autoFocus
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontFamily: 'var(--mono)',
            fontSize: 'max(7.5px, 1.05cqw)',
          }}
        />
      </form>
    </div>
  );
};
