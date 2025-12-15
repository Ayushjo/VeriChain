import React from 'react';

export const AnimatedLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rotating circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="283"
        strokeDashoffset="0"
        className="animate-rotate"
        style={{ transformOrigin: 'center' }}
      />

      {/* Inner pulsing hexagon */}
      <polygon
        points="50,15 73,28 73,54 50,67 27,54 27,28"
        fill="url(#gradient2)"
        className="animate-pulse-subtle"
      />

      {/* Center checkmark */}
      <path
        d="M 40 45 L 47 52 L 62 37"
        stroke="#A8DAFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8DAFF" />
          <stop offset="50%" stopColor="#FFB5D8" />
          <stop offset="100%" stopColor="#B5E7CF" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(168, 218, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(181, 231, 207, 0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
