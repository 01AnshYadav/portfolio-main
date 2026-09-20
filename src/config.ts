export interface Point2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3D {
  rx: number; // degrees
  ry: number; // degrees
  rz: number; // degrees
}

export interface PhoneScreenConfig {
  corners: [
    [number, number], // Top-Left
    [number, number], // Top-Right
    [number, number], // Bottom-Right
    [number, number]  // Bottom-Left
  ];
  aspectRatio: number; // width / height of the PNG object
}

/**
 * Landscape smartphone screen rectangle calibration matching ctos-map (1).html
 */
export const PHONE_SCREEN: PhoneScreenConfig = {
  corners: [
    [0.05, 0.06], // Top-Left [x, y]
    [0.95, 0.06], // Top-Right [x, y]
    [0.95, 0.94], // Bottom-Right [x, y]
    [0.05, 0.94], // Bottom-Left [x, y]
  ],
  aspectRatio: 2.2 / 1,
};

export const PNG_ASPECT = PHONE_SCREEN.aspectRatio;
export const PNG_PATH = '/hand-phone.png';

export const SCROLL_CONFIG = {
  entranceDistancePx: 300,
  containerHeightVh: 200,
  hudDimOpacity: 0.2,
  lerpFactor: 0.16,
};

export const ANIMATION_CONFIG = {
  durationEntranceMs: 1100,
  durationExitMs: 950,
  easingEntrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easingExit: 'cubic-bezier(0.7, 0, 0.84, 0)',

  arc: {
    startPosition: { x: -280, y: 820, z: -160 } as Vector3D,
    endPosition: { x: 0, y: 35, z: 0 } as Vector3D,
    startRotation: { rx: 28, ry: -20, rz: 34 } as Rotation3D,
    endRotation: { rx: 0, ry: 0, rz: 0 } as Rotation3D,
    startScale: 0.72,
    endScale: 1.0,

    overshoot: {
      positionDelta: { x: 10, y: -20, z: 8 },
      rotationDelta: { rx: -3, ry: 1.5, rz: -2.5 },
      scaleDelta: 0.02,
      atProgress: 0.82,
    },
    intermediateSteps: 10,
    motionBlurMaxPx: 2.0,
  },

  maxPhoneWidthPx: 860,
  viewportMarginPx: 24,
};

export const COLORS = {
  bg: '#000000',
  cyan: 'rgb(58, 174, 196)',
  cyanHi: 'rgb(99, 208, 228)',
  red: 'rgb(255, 69, 54)',
  green: '#00ff66',
  greenDim: 'rgba(0, 255, 102, 0.2)',
  ink: '#d5dde2',
  dim: '#8f9ba2',
  panelBg: 'rgba(0, 0, 0, 0.76)',
};

/**
 * Operative Profile Data
 */
export const OPERATIVE_PROFILE = {
  alias: '01AnshYadav',
  dedsecHandle: 'NullSec_Operative',
  status: 'UNPROFILED OPERATIVE',
  threatLevel: 'CRITICAL // TARGET OFF-GRID',
  education: 'Freshman Year, B.Tech — University of Lucknow',
  role: 'Cybersecurity & IT Systems Explorer',
  location: 'Lucknow, India / Remote',
  bio: 'ctOS classifies citizens into algorithms. I build systems that keep data where it belongs — in your hands. Currently in my freshman year of B.Tech at the University of Lucknow, focusing on cloud infrastructure, networking protocols, and system security.',
  skills: ['Cloud Security (AWS)', 'Network Protocols & Packet Analysis', 'Linux Kernel Hardening', 'Cryptographic Vaults', 'Bash & Python Automation'],
};

/**
 * Mission Briefings
 */
export interface Mission {
  id: string;
  title: string;
  category: string;
  objective: string;
  method: string;
  result: string;
  tags: string[];
  repoUrlPlaceholder: string;
}

export const MISSIONS_DATA: Mission[] = [
  {
    id: 'OP-01',
    title: 'AWS Password Manager',
    category: 'Cloud Security & Zero-Trust',
    objective: 'Architect a zero-knowledge cloud credential vault securing credentials against server-side and physical compromise.',
    method: 'AWS KMS envelope encryption, IAM least-privilege security policies, client-side cryptographic hashing, and serverless Lambda APIs.',
    result: 'Resilient production-grade credential manager with client-side decryption and automated key rotation.',
    tags: ['AWS KMS', 'Lambda', 'Zero-Trust', 'IAM', 'Python'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/aws-password-manager',
  },
  {
    id: 'OP-02',
    title: 'CyberSync',
    category: 'Network Protocol & P2P Transport',
    objective: 'Engineer real-time peer-to-peer data and state synchronization resilient across hostile, untrusted networks.',
    method: 'Low-latency WebSocket streaming, cryptographic packet validation, distributed state handshakes, and packet loss conflict resolution.',
    result: 'Low-overhead real-time state protocol with zero telemetry leakage and high fault tolerance.',
    tags: ['WebSockets', 'Cryptography', 'P2P', 'Networking'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/cybersync',
  },
  {
    id: 'OP-03',
    title: 'CareerMEMORY',
    category: 'Systems Forensic & Memory Analysis',
    objective: 'Develop an incident response forensic inspection utility to audit running process memory and detect anomalies.',
    method: 'Linux memory buffer inspection, /proc forensic extraction, signature pattern matching, and execution timeline reconstruction.',
    result: 'Lightweight standalone CLI forensics tool for rapid live process memory auditing.',
    tags: ['Linux Memory', 'Forensics', 'C/C++', 'Process Auditing'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/careermemory',
  },
  {
    id: 'OP-04',
    title: 'CTF & TryHackMe Writeups',
    category: 'Offensive Security Research',
    objective: 'Document penetration testing methodology, privilege escalation chains, and defense evasion vectors.',
    method: 'Comprehensive technical writeups detailing web exploits (SQLi, SSRF, IDOR), network pivoting, and binary reverse engineering.',
    result: 'Public security writeup repository serving as a structured knowledge base for security researchers.',
    tags: ['TryHackMe', 'CTF', 'Web Exploitation', 'Privilege Escalation'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/ctf-writeups',
  },
];

/**
 * Loadout Certifications & Skills
 */
export const LOADOUT_DATA = {
  certifications: [
    { name: 'AWS Certified Cloud Practitioner', id: 'AWS-CCP-9842', status: 'VERIFIED MODULE', issuer: 'Amazon Web Services', date: '2025' },
    { name: 'CompTIA Security+ Equivalent Modules', id: 'SEC-PLUS-5519', status: 'VERIFIED MODULE', issuer: 'CompTIA', date: '2025' },
    { name: 'Cisco Networking Fundamentals', id: 'CISCO-NET-2204', status: 'VERIFIED MODULE', issuer: 'Cisco Systems', date: '2024' },
    { name: 'Linux System Administration & Hardening', id: 'LNX-SYS-7718', status: 'VERIFIED MODULE', issuer: 'DedSec Kernel Ops', date: '2025' },
  ],
  skillNodes: [
    { name: 'Networking & Protocols', level: '94%', tools: ['TCP/IP', 'Wireshark', 'ARP', 'DNS', 'Subnetting', 'Firewall Rules'] },
    { name: 'Linux Systems & Kernel', level: '90%', tools: ['Ubuntu/Debian', 'Arch Linux', 'Bash', 'Systemd', 'ProcFS', 'Hardening'] },
    { name: 'AWS Cloud Security', level: '86%', tools: ['IAM Policies', 'KMS Encryption', 'Lambda', 'VPC Routing', 'S3 Vaults'] },
    { name: 'Offensive Security Tools', level: '88%', tools: ['Nmap', 'Burp Suite', 'Metasploit', 'Hashcat', 'John the Ripper'] },
    { name: 'Automation & Scripting', level: '92%', tools: ['Python3', 'Bash Scripting', 'Git/GitHub', 'Socket Programming'] },
  ],
};
