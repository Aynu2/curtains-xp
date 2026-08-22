import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

// 1. My Computer
export const IconMyComputer: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="mcScreenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#82C8FF" />
        <stop offset="50%" stopColor="#318CE7" />
        <stop offset="100%" stopColor="#1254A8" />
      </linearGradient>
      <linearGradient id="mcBezelGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5F7FA" />
        <stop offset="100%" stopColor="#BCC5D3" />
      </linearGradient>
      <linearGradient id="mcTowerGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="70%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <filter id="mcDropShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#mcDropShadow)">
      {/* PC Tower */}
      <rect x="25" y="10" width="16" height="26" rx="2" fill="url(#mcTowerGrad)" stroke="#475569" strokeWidth="1" />
      <rect x="28" y="13" width="10" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.5" />
      <rect x="28" y="18" width="10" height="2" rx="0.5" fill="#1E293B" />
      <circle cx="33" cy="27" r="1.5" fill="#38BDF8" />
      <circle cx="37" cy="27" r="1" fill="#4ADE80" />
      <rect x="28" y="31" width="10" height="2" rx="0.5" fill="#475569" />

      {/* Monitor Stand Base */}
      <ellipse cx="16" cy="37" rx="8" ry="2.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <path d="M14 31 H18 L19 36 H13 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.5" />

      {/* Monitor Frame */}
      <rect x="5" y="8" width="22" height="23" rx="2.5" fill="url(#mcBezelGrad)" stroke="#475569" strokeWidth="1" />
      {/* Screen */}
      <rect x="7.5" y="10.5" width="17" height="15" rx="1" fill="url(#mcScreenGrad)" stroke="#0F172A" strokeWidth="0.5" />
      {/* Screen Glare */}
      <path d="M8 11 L18 11 L11 25 L8 25 Z" fill="#FFFFFF" fillOpacity="0.25" />
      {/* Power LED */}
      <circle cx="16" cy="28.5" r="0.8" fill="#22C55E" />
    </g>
  </svg>
);

// 2. Control Panel
export const IconControlPanel: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="cpBoardGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#1E5BB5" />
      </linearGradient>
      <linearGradient id="cpClipGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="cpPencilGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF6B4A" />
        <stop offset="100%" stopColor="#C92A08" />
      </linearGradient>
      <filter id="cpShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#cpShadow)">
      {/* Board */}
      <rect x="8" y="7" width="26" height="34" rx="3" fill="url(#cpBoardGrad)" stroke="#103B7B" strokeWidth="1" />
      {/* Paper */}
      <rect x="11" y="12" width="20" height="26" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
      {/* Checkmark */}
      <path d="M15 24 L19 28 L27 18" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clip */}
      <rect x="16" y="5" width="10" height="5" rx="1.5" fill="url(#cpClipGrad)" stroke="#334155" strokeWidth="0.8" />
      <circle cx="21" cy="7.5" r="1.2" fill="#1E293B" />

      {/* Pencil */}
      <g transform="rotate(35 32 26)">
        <rect x="22" y="22" width="18" height="4" rx="1" fill="url(#cpPencilGrad)" stroke="#7C1A00" strokeWidth="0.6" />
        <path d="M22 22 L17 24 L22 26 Z" fill="#FDE047" stroke="#7C1A00" strokeWidth="0.6" />
        <path d="M17 24 L19 23 L19 25 Z" fill="#1E293B" />
        <rect x="36" y="22" width="4" height="4" rx="0.5" fill="#E2E8F0" stroke="#7C1A00" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
);

// 3. Folder
export const IconFolder: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9D462" />
        <stop offset="100%" stopColor="#E2A619" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF099" />
        <stop offset="60%" stopColor="#FCD24A" />
        <stop offset="100%" stopColor="#E8A917" />
      </linearGradient>
      <filter id="folderShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#folderShadow)">
      {/* Back tab */}
      <path
        d="M7 14 C7 12.5 8 11.5 9.5 11.5 H19 C20.5 11.5 22 13 23.5 14.5 L25 16 H38.5 C40 16 41 17 41 18.5 V33 C41 34.5 40 35.5 38.5 35.5 H9.5 C8 35.5 7 34.5 7 33 Z"
        fill="url(#folderBack)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      {/* Paper insert hint */}
      <rect x="11" y="14" width="26" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />
      {/* Front flap */}
      <path
        d="M6 18.5 C6 17 7.5 16 9 16 H39 C40.5 16 41.5 17 41.5 18.5 L39.5 36.5 C39.5 38 38 39 36.5 39 H8.5 C7 39 5.8 38 6 36.5 Z"
        fill="url(#folderFront)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      {/* Gloss reflection */}
      <path d="M7 17.5 H39.5 L38.5 22 H8 Z" fill="#FFFFFF" fillOpacity="0.3" />
    </g>
  </svg>
);

// 4. Network Places
export const IconNetworkPlaces: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="npGlobeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="npLandGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
      <filter id="npShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#npShadow)">
      {/* Globe Background */}
      <g transform="translate(4, 4)">
        <circle cx="16" cy="16" r="14" fill="url(#npGlobeGrad)" stroke="#1D4ED8" strokeWidth="1" />
        {/* Continents */}
        <path d="M10 8 C13 7, 18 10, 16 14 C14 18, 9 17, 8 13 Z" fill="url(#npLandGrad)" />
        <path d="M19 14 C23 12, 27 15, 26 19 C24 23, 19 22, 18 17 Z" fill="url(#npLandGrad)" />
        <path d="M12 21 C14 20, 18 22, 17 26 C15 29, 10 27, 11 23 Z" fill="url(#npLandGrad)" />
        {/* Latitude lines */}
        <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#93C5FD" strokeWidth="0.7" opacity="0.6" />
        <ellipse cx="16" cy="16" rx="6" ry="13" fill="none" stroke="#93C5FD" strokeWidth="0.7" opacity="0.6" />
      </g>

      {/* Monitor Foreground */}
      <g transform="translate(14, 12)">
        <ellipse cx="16" cy="27" rx="7" ry="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
        <path d="M14 22 H18 L19 26 H13 Z" fill="#CBD5E1" />
        <rect x="6" y="5" width="20" height="19" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
        <rect x="8" y="7" width="16" height="13" rx="1" fill="#38BDF8" stroke="#0F172A" strokeWidth="0.5" />
        <path d="M8.5 7.5 L17 7.5 L11 19.5 L8.5 19.5 Z" fill="#FFFFFF" fillOpacity="0.3" />
        <circle cx="16" cy="22" r="0.7" fill="#22C55E" />
      </g>
    </g>
  </svg>
);

// 5. Help (Blue Sphere with ?)
export const IconHelp: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <radialGradient id="helpSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#7CC2FF" />
        <stop offset="35%" stopColor="#2575FC" />
        <stop offset="75%" stopColor="#1045A1" />
        <stop offset="100%" stopColor="#082A6B" />
      </radialGradient>
      <filter id="helpShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#helpShadow)">
      <circle cx="24" cy="24" r="19" fill="url(#helpSphere)" stroke="#0E3880" strokeWidth="1.2" />
      <path
        d="M20 18 C20 15 22 13 25 13 C27.5 13 29.5 14.8 29.5 17.2 C29.5 19.5 28 21 25.8 22.5 C24.2 23.6 23.5 24.8 23.5 26.5 V27.5 M23.5 32 V34"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sphere gloss reflection */}
      <ellipse cx="20" cy="14" rx="7" ry="3.5" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 20 14)" />
    </g>
  </svg>
);

// 6. Window
export const IconWindow: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="winTitleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2575FC" />
        <stop offset="100%" stopColor="#0B4BB8" />
      </linearGradient>
      <filter id="winShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#winShadow)">
      <rect x="6" y="10" width="36" height="28" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="1.2" />
      {/* Title bar */}
      <path d="M6 12 C6 10.8 6.8 10 8 10 H40 C41.2 10 42 10.8 42 12 V18 H6 Z" fill="url(#winTitleGrad)" />
      {/* Window Controls */}
      <rect x="36" y="12" width="4" height="4" rx="0.5" fill="#EF4444" />
      <rect x="30" y="12" width="4" height="4" rx="0.5" fill="#3B82F6" />
      <rect x="24" y="12" width="4" height="4" rx="0.5" fill="#3B82F6" />
    </g>
  </svg>
);

// 7. Recycle Bin
export const IconRecycleBin: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="binBodyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D4EEFF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#87CEFA" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id="binRimGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#70B4FF" />
      </linearGradient>
      <filter id="binShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#binShadow)">
      {/* Outer translucent mesh/glass container */}
      <path
        d="M13 15 L17 40 C17.3 41.5 19 42.5 21 42.5 H27 C29 42.5 30.7 41.5 31 40 L35 15 Z"
        fill="url(#binBodyGrad)"
        stroke="#2563EB"
        strokeWidth="1"
      />
      {/* Top Rim */}
      <ellipse cx="24" cy="15" rx="12" ry="4" fill="url(#binRimGrad)" stroke="#1D4ED8" strokeWidth="1" />
      {/* Inner Rim Hole */}
      <ellipse cx="24" cy="15" rx="10" ry="2.8" fill="#1E40AF" fillOpacity="0.3" />

      {/* Green Recycle Symbol */}
      <g transform="translate(17, 21) scale(0.65)">
        <path
          d="M10 2 L13 6 H8 L10 2 Z M10 6 C16 6 19 10 19 15 M18 19 L22 16 L19 12 M19 16 C16 20 11 20 6 18 M2 14 L5 18 L2 21 M5 17 C2 12 5 7 9 6"
          stroke="#16A34A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </g>
  </svg>
);

// 8. Help Document
export const IconHelpDocument: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <filter id="docShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
      </filter>
      <linearGradient id="docSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#7CC2FF" />
        <stop offset="50%" stopColor="#2575FC" />
        <stop offset="100%" stopColor="#0B4BB8" />
      </linearGradient>
    </defs>
    <g filter="url(#docShadow)">
      {/* Document Sheet */}
      <path
        d="M10 7 C10 5.5 11.2 4.5 12.5 4.5 H28 L38 14.5 V40.5 C38 42 36.8 43 35.5 43 H12.5 C11.2 43 10 42 10 40.5 Z"
        fill="#FFFFFF"
        stroke="#94A3B8"
        strokeWidth="1"
      />
      {/* Corner Fold */}
      <path d="M28 4.5 V14.5 H38 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />

      {/* Blue ? Badge */}
      <circle cx="24" cy="27" r="9" fill="url(#docSphere)" stroke="#0E3880" strokeWidth="0.8" />
      <path
        d="M22 24 C22 22.5 23 21.5 24.5 21.5 C25.8 21.5 26.8 22.4 26.8 23.6 C26.8 24.8 26 25.5 25 26.2 C24.2 26.8 23.8 27.4 23.8 28.2 M23.8 30.8 V31.8"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// 9. Warning (Yellow Triangle)
export const IconWarning: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="warnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF159" />
        <stop offset="60%" stopColor="#F5B800" />
        <stop offset="100%" stopColor="#D98A00" />
      </linearGradient>
      <filter id="warnShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#warnShadow)">
      <path
        d="M24 6 C25.5 6 26.8 7 27.5 8.5 L43.5 37 C44.5 38.5 44 40.5 42.5 41.5 C41.8 42 41 42.5 40 42.5 H8 C6.2 42.5 4.8 41 4.8 39.2 C4.8 38.4 5.2 37.6 5.8 37 L21 8.5 C21.7 7 22.8 6 24 6 Z"
        fill="url(#warnGrad)"
        stroke="#B47300"
        strokeWidth="1.5"
      />
      {/* Inner Exclamation Mark */}
      <path d="M24 18 V28" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.2" fill="#111827" />
    </g>
  </svg>
);

// 10. My Documents
export const IconMyDocuments: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="docFolderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9D462" />
        <stop offset="100%" stopColor="#E2A619" />
      </linearGradient>
      <linearGradient id="docFolderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF099" />
        <stop offset="60%" stopColor="#FCD24A" />
        <stop offset="100%" stopColor="#E8A917" />
      </linearGradient>
      <filter id="docFolderShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#docFolderShadow)">
      {/* Back tab */}
      <path
        d="M6 15 C6 13.5 7 12.5 8.5 12.5 H18 C19.5 12.5 21 14 22.5 15.5 L24 17 H39.5 C41 17 42 18 42 19.5 V34 C42 35.5 41 36.5 39.5 36.5 H8.5 C7 36.5 6 35.5 6 34 Z"
        fill="url(#docFolderBack)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      {/* Paper 1 */}
      <rect
        x="13"
        y="8"
        width="18"
        height="22"
        rx="1"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="0.8"
        transform="rotate(-8 13 8)"
      />
      {/* Paper 2 */}
      <rect
        x="19"
        y="6"
        width="18"
        height="24"
        rx="1"
        fill="#F0F9FF"
        stroke="#93C5FD"
        strokeWidth="0.8"
        transform="rotate(6 19 6)"
      />
      {/* Front flap */}
      <path
        d="M5 19.5 C5 18 6.5 17 8 17 H40 C41.5 17 42.5 18 42.5 19.5 L40.5 37.5 C40.5 39 39 40 37.5 40 H7.5 C6 40 4.8 39 5 37.5 Z"
        fill="url(#docFolderFront)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      <path d="M6 18.5 H40.5 L39.5 23 H7 Z" fill="#FFFFFF" fillOpacity="0.3" />
    </g>
  </svg>
);

// 11. User Accounts
export const IconUserAccounts: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="userLeftSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0834B" />
        <stop offset="100%" stopColor="#A84C18" />
      </linearGradient>
      <linearGradient id="userRightSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD382" />
        <stop offset="100%" stopColor="#F5A623" />
      </linearGradient>
      <linearGradient id="userBlueShirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="userGreenShirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <filter id="userShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#userShadow)">
      {/* Left User (Brown hair, Blue shirt) */}
      <g transform="translate(4, 8)">
        <ellipse cx="12" cy="11" rx="6.5" ry="7.5" fill="url(#userLeftSkin)" />
        <path d="M5.5 11 C5.5 6.5 8 4 12 4 C16 4 18.5 6.5 18.5 11 C18.5 9 17 6.5 12 6.5 C7 6.5 5.5 9 5.5 11 Z" fill="#451A03" />
        <path d="M2 28 C2 21 6 18 12 18 C18 18 22 21 22 28 Z" fill="url(#userBlueShirt)" stroke="#1E40AF" strokeWidth="0.8" />
      </g>

      {/* Right User (Blonde/Orange, Green shirt) */}
      <g transform="translate(18, 6)">
        <ellipse cx="14" cy="11" rx="6.5" ry="7.5" fill="url(#userRightSkin)" />
        <path d="M7.5 10 C7.5 5.5 10 3 14 3 C18 3 20.5 5.5 20.5 10 C20.5 8 19 5.5 14 5.5 C9 5.5 7.5 8 7.5 10 Z" fill="#D97706" />
        <path d="M4 29 C4 22 8 19 14 19 C20 19 24 22 24 29 Z" fill="url(#userGreenShirt)" stroke="#166534" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
);

// 12. Information (Speech Bubble / Badge)
export const IconInformation: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <radialGradient id="infoGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="40%" stopColor="#38BDF8" />
        <stop offset="85%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </radialGradient>
      <filter id="infoShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#infoShadow)">
      {/* Speech Bubble Shape */}
      <path
        d="M24 7 C14 7 6 14.5 6 23.5 C6 28.5 8.5 33 13 36 L11 43 L20 39.5 C21.3 39.8 22.6 40 24 40 C34 40 42 32.5 42 23.5 C42 14.5 34 7 24 7 Z"
        fill="url(#infoGrad)"
        stroke="#0284C7"
        strokeWidth="1.2"
      />
      {/* Letter 'i' */}
      <circle cx="24" cy="16" r="2.2" fill="#0C4A6E" />
      <path d="M22 22 H24.5 V32 H26 M21.5 32 H26.5" stroke="#0C4A6E" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M14 13 C18 9 30 9 34 13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </g>
  </svg>
);

// 13. My Music
export const IconMyMusic: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="musicFolderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9D462" />
        <stop offset="100%" stopColor="#E2A619" />
      </linearGradient>
      <linearGradient id="musicFolderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF099" />
        <stop offset="60%" stopColor="#FCD24A" />
        <stop offset="100%" stopColor="#E8A917" />
      </linearGradient>
      <radialGradient id="cdGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#E0F2FE" />
        <stop offset="70%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#7DD3FC" />
      </radialGradient>
      <filter id="musicShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#musicShadow)">
      {/* Back tab */}
      <path
        d="M6 15 C6 13.5 7 12.5 8.5 12.5 H18 C19.5 12.5 21 14 22.5 15.5 L24 17 H39.5 C41 17 42 18 42 19.5 V34 C42 35.5 41 36.5 39.5 36.5 H8.5 C7 36.5 6 35.5 6 34 Z"
        fill="url(#musicFolderBack)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      {/* CD Disc */}
      <g transform="translate(14, 8)">
        <circle cx="12" cy="12" r="11" fill="url(#cdGrad)" stroke="#0284C7" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="1.5" fill="#0F172A" />
      </g>
      {/* Musical Note */}
      <path
        d="M32 9 V19 C32 20.5 30.5 22 28.5 22 C26.5 22 25 20.5 25 19 C25 17.5 26.5 16 28.5 16 C29.5 16 30.5 16.5 31 17 V11 L37 9.5 V14 M32 9 L37 7.5"
        fill="#1E3A8A"
        stroke="#1E3A8A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Front flap */}
      <path
        d="M5 19.5 C5 18 6.5 17 8 17 H40 C41.5 17 42.5 18 42.5 19.5 L40.5 37.5 C40.5 39 39 40 37.5 40 H7.5 C6 40 4.8 39 5 37.5 Z"
        fill="url(#musicFolderFront)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      <path d="M6 18.5 H40.5 L39.5 23 H7 Z" fill="#FFFFFF" fillOpacity="0.3" />
    </g>
  </svg>
);

// 14. Internet (Globe)
export const IconInternet: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <radialGradient id="globeSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="45%" stopColor="#2563EB" />
        <stop offset="85%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#0F172A" />
      </radialGradient>
      <linearGradient id="globeLand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <filter id="globeShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#globeShadow)">
      <circle cx="24" cy="24" r="19" fill="url(#globeSphere)" stroke="#1D4ED8" strokeWidth="1" />
      {/* Landmasses */}
      <path
        d="M13 14 C16 11 23 13 22 19 C21 24 16 26 12 21 C10 18 11 15 13 14 Z M26 15 C31 12 37 16 35 22 C33 27 28 26 27 20 Z M18 29 C21 27 26 30 25 35 C23 39 17 38 16 33 Z"
        fill="url(#globeLand)"
      />
      {/* Meridians / Parallels */}
      <ellipse cx="24" cy="24" rx="18" ry="7" fill="none" stroke="#93C5FD" strokeWidth="0.8" opacity="0.6" />
      <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="#93C5FD" strokeWidth="0.8" opacity="0.6" />
      {/* Atmosphere reflection */}
      <ellipse cx="19" cy="12" rx="9" ry="4" fill="#FFFFFF" fillOpacity="0.35" transform="rotate(-25 19 12)" />
    </g>
  </svg>
);

// 15. Critical (Red circle with X)
export const IconCritical: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <radialGradient id="critSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FF7A7A" />
        <stop offset="40%" stopColor="#EF4444" />
        <stop offset="85%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </radialGradient>
      <filter id="critShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#critShadow)">
      <circle cx="24" cy="24" r="19" fill="url(#critSphere)" stroke="#7F1D1D" strokeWidth="1.2" />
      {/* White 'X' */}
      <path
        d="M16 16 L32 32 M32 16 L16 32"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sphere gloss reflection */}
      <ellipse cx="19" cy="13" rx="7" ry="3" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 19 13)" />
    </g>
  </svg>
);

// 16. My Pictures
export const IconMyPictures: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="picFolderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9D462" />
        <stop offset="100%" stopColor="#E2A619" />
      </linearGradient>
      <linearGradient id="picFolderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF099" />
        <stop offset="60%" stopColor="#FCD24A" />
        <stop offset="100%" stopColor="#E8A917" />
      </linearGradient>
      <filter id="picShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#picShadow)">
      {/* Back tab */}
      <path
        d="M6 15 C6 13.5 7 12.5 8.5 12.5 H18 C19.5 12.5 21 14 22.5 15.5 L24 17 H39.5 C41 17 42 18 42 19.5 V34 C42 35.5 41 36.5 39.5 36.5 H8.5 C7 36.5 6 35.5 6 34 Z"
        fill="url(#picFolderBack)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      {/* Framed Picture */}
      <g transform="translate(15, 6) rotate(6)">
        <rect x="0" y="0" width="18" height="20" rx="1.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />
        <rect x="2" y="2" width="14" height="13" fill="#38BDF8" />
        {/* Sun and Mountains */}
        <circle cx="5" cy="5" r="1.8" fill="#FDE047" />
        <path d="M2 13 L6 8 L10 12 L13 9 L16 13 Z" fill="#22C55E" />
      </g>
      {/* Front flap */}
      <path
        d="M5 19.5 C5 18 6.5 17 8 17 H40 C41.5 17 42.5 18 42.5 19.5 L40.5 37.5 C40.5 39 39 40 37.5 40 H7.5 C6 40 4.8 39 5 37.5 Z"
        fill="url(#picFolderFront)"
        stroke="#B87D08"
        strokeWidth="1"
      />
      <path d="M6 18.5 H40.5 L39.5 23 H7 Z" fill="#FFFFFF" fillOpacity="0.3" />
    </g>
  </svg>
);

// 17. Network Group
export const IconNetworkGroup: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <filter id="ngShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#ngShadow)">
      {/* Connection Cables */}
      <path d="M24 16 V27 M14 36 H34 M14 36 V30 M34 36 V30" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="25" width="4" height="4" rx="1" fill="#F59E0B" stroke="#78350F" strokeWidth="0.6" />

      {/* Top Computer */}
      <g transform="translate(16, 5)">
        <rect x="2" y="0" width="12" height="10" rx="1" fill="#CBD5E1" stroke="#334155" strokeWidth="0.8" />
        <rect x="3.5" y="1.5" width="9" height="7" rx="0.5" fill="#38BDF8" />
        <path d="M6 10 H10 L11 12 H5 Z" fill="#94A3B8" />
      </g>

      {/* Bottom Left Computer */}
      <g transform="translate(6, 25)">
        <rect x="2" y="0" width="12" height="10" rx="1" fill="#CBD5E1" stroke="#334155" strokeWidth="0.8" />
        <rect x="3.5" y="1.5" width="9" height="7" rx="0.5" fill="#38BDF8" />
        <path d="M6 10 H10 L11 12 H5 Z" fill="#94A3B8" />
      </g>

      {/* Bottom Right Computer */}
      <g transform="translate(26, 25)">
        <rect x="2" y="0" width="12" height="10" rx="1" fill="#CBD5E1" stroke="#334155" strokeWidth="0.8" />
        <rect x="3.5" y="1.5" width="9" height="7" rx="0.5" fill="#38BDF8" />
        <path d="M6 10 H10 L11 12 H5 Z" fill="#94A3B8" />
      </g>
    </g>
  </svg>
);

// 18. Security (Golden Padlock)
export const IconSecurity: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="lockBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="50%" stopColor="#F5B800" />
        <stop offset="100%" stopColor="#C98200" />
      </linearGradient>
      <linearGradient id="lockShackle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
      <filter id="lockShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#lockShadow)">
      {/* Shackle */}
      <path
        d="M16 20 V14 C16 9.5 19.5 6 24 6 C28.5 6 32 9.5 32 14 V20"
        stroke="url(#lockShackle)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Padlock Body */}
      <rect x="11" y="19" width="26" height="22" rx="3.5" fill="url(#lockBody)" stroke="#925900" strokeWidth="1.2" />
      {/* Keyhole */}
      <circle cx="24" cy="28" r="2.5" fill="#451A03" />
      <path d="M23 29 L22.5 34 H25.5 L25 29 Z" fill="#451A03" />
      {/* Highlight */}
      <path d="M12 21 H36" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.5" />
    </g>
  </svg>
);

// Additional Iconic Windows XP Apps

// Notepad
export const IconNotepad: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="padCover" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <filter id="padShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#padShadow)">
      <rect x="10" y="8" width="28" height="34" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
      <path d="M10 10 C10 8.8 10.8 8 12 8 H36 C37.2 8 38 8.8 38 10 V14 H10 Z" fill="url(#padCover)" />
      {/* Spiral Bindings */}
      <circle cx="15" cy="11" r="1.5" fill="#E2E8F0" />
      <circle cx="21" cy="11" r="1.5" fill="#E2E8F0" />
      <circle cx="27" cy="11" r="1.5" fill="#E2E8F0" />
      <circle cx="33" cy="11" r="1.5" fill="#E2E8F0" />
      {/* Text Lines */}
      <line x1="15" y1="20" x2="33" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="25" x2="33" y2="25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="30" x2="28" y2="30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="35" x2="30" y2="35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pencil */}
      <g transform="rotate(30 35 30)">
        <rect x="28" y="24" width="14" height="3" fill="#FBBF24" stroke="#78350F" strokeWidth="0.5" />
        <path d="M28 24 L24 25.5 L28 27 Z" fill="#FDE68A" stroke="#78350F" strokeWidth="0.5" />
        <path d="M24 25.5 L25.5 25 L25.5 26 Z" fill="#1E293B" />
      </g>
    </g>
  </svg>
);

// Calculator
export const IconCalculator: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="calcBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
      <filter id="calcShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#calcShadow)">
      <rect x="10" y="6" width="28" height="36" rx="3" fill="url(#calcBody)" stroke="#64748B" strokeWidth="1.2" />
      {/* LCD Screen */}
      <rect x="14" y="10" width="20" height="7" rx="1" fill="#A7F3D0" stroke="#065F46" strokeWidth="0.8" />
      <text x="31" y="16" fontSize="6" fontWeight="bold" fontFamily="monospace" fill="#064E3B" textAnchor="end">888</text>
      {/* Keypad */}
      <rect x="14" y="20" width="5" height="4" rx="0.5" fill="#3B82F6" />
      <rect x="21" y="20" width="5" height="4" rx="0.5" fill="#3B82F6" />
      <rect x="28" y="20" width="6" height="4" rx="0.5" fill="#EF4444" />
      <rect x="14" y="26" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
      <rect x="21" y="26" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
      <rect x="28" y="26" width="6" height="4" rx="0.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.5" />
      <rect x="14" y="32" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
      <rect x="21" y="32" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
      <rect x="28" y="32" width="6" height="4" rx="0.5" fill="#F59E0B" />
    </g>
  </svg>
);

// Terminal / Command Prompt
export const IconTerminal: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <filter id="termShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#termShadow)">
      <rect x="6" y="8" width="36" height="30" rx="2" fill="#000000" stroke="#475569" strokeWidth="1.2" />
      <path d="M6 10 C6 8.8 6.8 8 8 8 H40 C41.2 8 42 8.8 42 10 V14 H6 Z" fill="#1E293B" />
      <text x="9" y="12.5" fontSize="4.5" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">C:\</text>
      <text x="10" y="23" fontSize="7" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">&gt;_</text>
    </g>
  </svg>
);

// Games
export const IconGames: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="padGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="gameShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#gameShadow)">
      <path
        d="M14 15 C8 15 6 22 7 31 C7.5 35 11 37 14 34 L19 29 H29 L34 34 C37 37 40.5 35 41 31 C42 22 40 15 34 15 H14 Z"
        fill="url(#padGrad)"
        stroke="#1E3A8A"
        strokeWidth="1.2"
      />
      {/* D-Pad */}
      <path d="M12 21 H16 M14 19 V23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
      {/* Action buttons */}
      <circle cx="31" cy="20" r="1.8" fill="#EF4444" />
      <circle cx="35" cy="22" r="1.8" fill="#F59E0B" />
      <circle cx="31" cy="24" r="1.8" fill="#10B981" />
      <circle cx="27" cy="22" r="1.8" fill="#3B82F6" />
    </g>
  </svg>
);

// Paint Pro
export const IconPaint: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="palGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="paintShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#paintShadow)">
      <path
        d="M24 8 C13 8 7 15 7 24 C7 33 13 40 22 40 C25 40 27 38 27 35 C27 33.5 26 32 26 30.5 C26 29 27.5 27.5 29 27.5 H33 C38 27.5 41 23 41 18 C41 12 34 8 24 8 Z"
        fill="url(#palGrad)"
        stroke="#92400E"
        strokeWidth="1.2"
      />
      {/* Thumbhole */}
      <ellipse cx="14" cy="28" rx="3.5" ry="4" fill="#FFFFFF" stroke="#92400E" strokeWidth="0.8" />
      {/* Paint Blobs */}
      <circle cx="16" cy="15" r="2.5" fill="#EF4444" />
      <circle cx="24" cy="13" r="2.5" fill="#3B82F6" />
      <circle cx="32" cy="15" r="2.5" fill="#10B981" />
      <circle cx="36" cy="22" r="2.5" fill="#F59E0B" />
      {/* Brush */}
      <g transform="rotate(35 34 26)">
        <rect x="25" y="24" width="16" height="3" rx="1" fill="#78350F" />
        <rect x="22" y="23.5" width="4" height="4" fill="#CBD5E1" />
        <path d="M22 23.5 L18 25.5 L22 27.5 Z" fill="#1E293B" />
      </g>
    </g>
  </svg>
);

// Media Player
export const IconMediaPlayer: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="mpRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF7A00" />
        <stop offset="100%" stopColor="#E03000" />
      </linearGradient>
      <radialGradient id="mpCenter" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#0F172A" />
      </radialGradient>
      <filter id="mpShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#mpShadow)">
      <circle cx="24" cy="24" r="19" fill="url(#mpRing)" stroke="#9A3412" strokeWidth="1" />
      <circle cx="24" cy="24" r="14" fill="url(#mpCenter)" stroke="#1E40AF" strokeWidth="0.8" />
      {/* Play Triangle */}
      <path d="M21 17 L30 24 L21 31 Z" fill="#FFFFFF" />
    </g>
  </svg>
);

// Email Client / Outlook
export const IconEmail: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="mailGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      <filter id="mailShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#mailShadow)">
      <rect x="6" y="12" width="36" height="24" rx="2" fill="url(#mailGrad)" stroke="#475569" strokeWidth="1.2" />
      <path d="M6 13 L24 27 L42 13" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 35 L19 23 M42 35 L29 23" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="34" cy="18" r="4" fill="#3B82F6" />
      <path d="M34 16 V20 M32 18 H36" stroke="#FFFFFF" strokeWidth="1" />
    </g>
  </svg>
);

// Search / Magnifying Glass
export const IconSearch: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
      <filter id="srchShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#srchShadow)">
      <circle cx="21" cy="21" r="12" fill="url(#lensGrad)" stroke="#1D4ED8" strokeWidth="2.5" />
      <ellipse cx="18" cy="16" rx="4" ry="2" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(-30 18 16)" />
      <path d="M30 30 L40 40" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Run...
export const IconRun: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <filter id="runShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#runShadow)">
      <rect x="7" y="10" width="34" height="26" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="1" />
      <rect x="7" y="10" width="34" height="6" fill="#1E40AF" />
      <rect x="11" y="24" width="20" height="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.8" />
      {/* Green run arrow */}
      <path d="M26 19 L37 26 L26 33 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
    </g>
  </svg>
);

// Log Off (Orange Key)
export const IconLogoff: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="logKey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <filter id="logShadow">
        <feDropShadow dx="1" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#logShadow)">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#D97706" />
      <circle cx="20" cy="24" r="7" fill="none" stroke="url(#logKey)" strokeWidth="3" />
      <path d="M26 24 H36 M32 24 V28 M35 24 V27" stroke="url(#logKey)" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Turn Off (Glossy Red Power Button)
export const IconTurnOff: React.FC<IconProps> = ({ size = 32, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <radialGradient id="shutGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FF7A7A" />
        <stop offset="45%" stopColor="#EF4444" />
        <stop offset="85%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </radialGradient>
      <filter id="shutShadow">
        <feDropShadow dx="1" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#shutShadow)">
      <circle cx="24" cy="24" r="18" fill="url(#shutGrad)" stroke="#7F1D1D" strokeWidth="1.2" />
      {/* Power Symbol */}
      <path
        d="M24 13 V23 M17 18 C14 20.5 13 25 15 29 C17 33 22 35 26 34 C30 33 34 29 33 24 C33 21 31 19 29 17.5"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy="13" rx="6" ry="2.5" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-20 20 13)" />
    </g>
  </svg>
);

// Windows XP Start Button Logo
export const IconXPLogo: React.FC<IconProps> = ({ size = 20, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`inline-block select-none ${className}`} style={style}>
    <defs>
      <linearGradient id="startRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#D92000" />
      </linearGradient>
      <linearGradient id="startGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7EDB1E" />
        <stop offset="100%" stopColor="#3B9600" />
      </linearGradient>
      <linearGradient id="startBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3EA6FF" />
        <stop offset="100%" stopColor="#0B4BB8" />
      </linearGradient>
      <linearGradient id="startYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFDE26" />
        <stop offset="100%" stopColor="#D98A00" />
      </linearGradient>
    </defs>
    <path d="M 12 10 C 24 4, 40 7, 48 9 C 46 25, 44 41, 43 55 C 32 52, 19 50, 10 57 C 11 41, 11.5 25, 12 10 Z" fill="url(#startRed)" />
    <path d="M 53 10 C 65 13, 82 9, 93 2 C 92 17, 90 33, 89 49 C 78 56, 64 53, 52 50 C 52.5 37, 52.8 23, 53 10 Z" fill="url(#startGreen)" />
    <path d="M 8 61 C 19 54, 34 57, 44 60 C 42 75, 40 91, 39 105 C 27 101, 15 98, 5 106 C 6 90, 7 75, 8 61 Z" fill="url(#startBlue)" />
    <path d="M 47 62 C 59 65, 76 62, 87 54 C 85 70, 84 86, 83 101 C 71 108, 56 105, 45 102 C 45.6 88, 46.2 75, 47 62 Z" fill="url(#startYellow)" />
  </svg>
);

// Map app IDs or string names to their respective icons
export const renderXPIcon = (iconNameOrApp: string, size = 32, className = ''): React.ReactNode => {
  switch (iconNameOrApp) {
    case 'my-computer':
    case 'system-info':
      return <IconMyComputer size={size} className={className} />;
    case 'network-places':
    case 'network':
      return <IconNetworkPlaces size={size} className={className} />;
    case 'recycle':
    case 'recycle-bin':
      return <IconRecycleBin size={size} className={className} />;
    case 'documents':
    case 'my-documents':
    case 'document-editor':
      return <IconMyDocuments size={size} className={className} />;
    case 'music':
    case 'my-music':
      return <IconMyMusic size={size} className={className} />;
    case 'pictures':
    case 'my-pictures':
    case 'photo-gallery':
      return <IconMyPictures size={size} className={className} />;
    case 'settings':
    case 'control-panel':
      return <IconControlPanel size={size} className={className} />;
    case 'help':
    case 'help-and-support':
      return <IconHelp size={size} className={className} />;
    case 'help-doc':
    case 'help-document':
      return <IconHelpDocument size={size} className={className} />;
    case 'user-accounts':
    case 'users':
      return <IconUserAccounts size={size} className={className} />;
    case 'browser':
    case 'internet':
    case 'internet-explorer':
      return <IconInternet size={size} className={className} />;
    case 'network-group':
    case 'connect-to':
      return <IconNetworkGroup size={size} className={className} />;
    case 'folder':
    case 'file-explorer':
      return <IconFolder size={size} className={className} />;
    case 'window':
    case 'app-store':
      return <IconWindow size={size} className={className} />;
    case 'warning':
      return <IconWarning size={size} className={className} />;
    case 'info':
    case 'information':
      return <IconInformation size={size} className={className} />;
    case 'critical':
      return <IconCritical size={size} className={className} />;
    case 'security':
    case 'backup-restore':
      return <IconSecurity size={size} className={className} />;
    case 'notepad':
    case 'code-editor':
      return <IconNotepad size={size} className={className} />;
    case 'calculator':
    case 'spreadsheet-pro':
      return <IconCalculator size={size} className={className} />;
    case 'terminal':
      return <IconTerminal size={size} className={className} />;
    case 'games':
      return <IconGames size={size} className={className} />;
    case 'paint-pro':
      return <IconPaint size={size} className={className} />;
    case 'media-player':
      return <IconMediaPlayer size={size} className={className} />;
    case 'email-client':
    case 'email':
      return <IconEmail size={size} className={className} />;
    case 'file-search':
    case 'search':
      return <IconSearch size={size} className={className} />;
    case 'run':
      return <IconRun size={size} className={className} />;
    case 'logoff':
      return <IconLogoff size={size} className={className} />;
    case 'turnoff':
    case 'shutdown':
      return <IconTurnOff size={size} className={className} />;
    default:
      return <IconFolder size={size} className={className} />;
  }
};
