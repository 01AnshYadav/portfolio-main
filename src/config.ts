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
  aspectRatio: 9 / 18.5,
};

export const PNG_ASPECT = PHONE_SCREEN.aspectRatio;
export const PNG_PATH = '/hand-phone.png';

export const WD2_STATS = {
  followersCurrent: 2320950,
  followersTarget: 2382000,
  level: 14,
  researchPoints: 8,
  bankBalance: 312623,
  weather: {
    temp: '52°F',
    location: 'San Francisco',
    condition: 'Partly Cloudy',
    today: '63°F',
    tomorrow: '63°F',
  },
};

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
/**
 * Operative Profile Data - Ansh Yadav
 */
export const OPERATIVE_PROFILE = {
  alias: '01AnshYadav',
  operativeName: 'Ansh Yadav',
  dedsecHandle: 'ANSH_YADAV',
  status: 'ACTIVE OPERATIVE',
  threatLevel: 'UNPROFILED // OFF-GRID',
  education: 'Freshman Year B.Tech, University of Lucknow',
  role: 'Cybersecurity & IT Systems Explorer',
  location: 'Lucknow, India / Remote',
  bio: "My obsession with tech started when I was a kid, always surrounded by computers and curious about what was happening behind the screen. What started as simple curiosity slowly turned into a passion for understanding how systems work under the hood. I started exploring cybersecurity and solving CTFs this year, breaking things safely just to understand how they work. Along the way, I began building real-world software and experimenting with networks, Linux, and web security. I'm still learning, still breaking things, and still building, one system at a time.",
  skills: ['Linux & System Security', 'Network Protocols & Analysis', 'Web Security & Exploitation', 'Python & Bash Automation', 'CTF Challenge Solving'],
  discord: 'anshshare',
  github: 'https://github.com/01AnshYadav',
  linkedin: 'https://www.linkedin.com/in/ansh-y-762689357/',
};

/**
 * Mission Briefings - Real Repositories
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
    title: 'Uni Manager',
    category: 'Full-Stack Campus Platform',
    objective: 'A single place that pulls the scattered parts of campus life together.',
    method: 'Unified hub aggregating announcements, study resources, campus events, timetable calendar, and student community updates.',
    result: 'Active university portal streamlining daily academic life and student collaboration.',
    tags: ['Announcements', 'Study resources', 'Events & calendar', 'Daily updates', 'Student community'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/uni-manager-',
  },
  {
    id: 'OP-02',
    title: 'Mailing Client',
    category: 'Network Automation & SMTP',
    objective: 'A Python script that sends emails with text messages and image attachments using Gmail SMTP server.',
    method: 'Automated SMTP handshakes, secure SSL/TLS connection authentication, MIME multipart payload encoding, and attachments processing.',
    result: 'Lightweight, dependable automated mailing tool for notifications and scheduled reports.',
    tags: ['Python', 'SMTP', 'Automation', 'MIME', 'Email Protocols'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/Mailing-client',
  },
  {
    id: 'OP-03',
    title: 'cyberTRACK',
    category: 'Security Telemetry & Aggregation',
    objective: 'A personal cybersecurity progress platform that brings activity from different security and development platforms into one place.',
    method: 'Unified dashboard pulling metrics and activity from TryHackMe, LeetCode, GitHub, and CTF platforms.',
    result: 'Centralized security tracking platform visualizing skill growth, solves, and active streaks.',
    tags: ['Dashboard', 'Aggregation', 'Security', 'Telemetry'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/cyberTRACK',
  },
  {
    id: 'OP-04',
    title: 'CTF Writeups',
    category: 'Offensive Security Research',
    objective: 'Notes and solutions from CTF solving sessions.',
    method: 'Detailed documentation of challenge analysis, exploit payloads, privilege escalation vectors, and reverse engineering solutions.',
    result: 'Curated knowledge base covering web exploitation, cryptography, network analysis, and binary analysis.',
    tags: ['CTF', 'Writeups', 'Exploitation', 'Web Security', 'Reverse Engineering'],
    repoUrlPlaceholder: 'https://github.com/01AnshYadav/ctf-writeups',
  },
];

/**
 * Loadout Certifications & Skills
 */
export const LOADOUT_DATA = {
  certifications: [
    {
      name: 'Fundamentals of Cybersecurity',
      id: 'd941228cb98dc576120ef399776724b6cf6a85636c1cd3c88eccd85a654ab0b2',
      status: 'VERIFIED [SYS_OK]',
      issuer: 'Proov (Registry: projectstudy.in)',
      date: 'Verified',
      verifyUrl: 'https://projectstudy.in/verify/d941228cb98dc576120ef399776724b6cf6a85636c1cd3c88eccd85a654ab0b2',
    },
  ],
  skillNodes: [
    { name: 'Cloud Security / Networking / CTF', level: '95%', tools: ['Linux', 'Web Security', 'Networks', 'CTF Labs', 'TCP/IP'] },
    { name: 'Active Practice Feeds', level: '90%', tools: ['TryHackMe (@ansh.yadav)', 'LeetCode (@Ansh00)', 'CTF Writeups'] },
    { name: 'Scripting & Automation', level: '92%', tools: ['Python', 'SMTP Automation', 'Bash Shell', 'Git / GitHub'] },
  ],
};
