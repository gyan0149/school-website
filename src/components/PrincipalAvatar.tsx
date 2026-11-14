import { useId } from "react";

// Illustrated sample portrait shown until the principal's real photo is added.
export function PrincipalAvatar({ className = "h-32 w-32" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" className={`rounded-full ${className}`} role="img" aria-label="Sample photo of the Principal">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7f2ea" />
          <stop offset="1" stopColor="#c9e2d2" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}clip)`}>
        <rect width="120" height="120" fill={`url(#${id}bg)`} />
        {/* Shoulders: navy top with a stole */}
        <path d="M14 120 C16 94 34 84 60 84 C86 84 104 94 106 120Z" fill="#1f3a5f" />
        <path d="M49 85 Q60 96 71 85 C67 84 63 84 60 84 C57 84 53 84 49 85Z" fill="#f8fafc" />
        <path d="M44 86 C40 98 40 110 42 120 H52 C50 108 50 96 53 86Z" fill="#f1e2c2" />
        <path d="M76 86 C80 98 80 110 78 120 H68 C70 108 70 96 67 86Z" fill="#f1e2c2" />
        <path d="M46 92 L50 92 M45 100 L50 100 M45 108 L50 108 M70 92 L74 92 M70 100 L75 100 M70 108 L75 108" stroke="#b4532a" strokeWidth="2" />
        {/* Neck and head */}
        <rect x="52" y="68" width="16" height="18" rx="6" fill="#b9825a" />
        <ellipse cx="60" cy="52" rx="20" ry="23" fill="#c68f63" />
        <ellipse cx="40.5" cy="54" rx="3.5" ry="5.5" fill="#b9825a" />
        <ellipse cx="79.5" cy="54" rx="3.5" ry="5.5" fill="#b9825a" />
        {/* Hair */}
        <path d="M37 60 C33 32 48 22 61 22 C76 22 87 32 83 60 C81 50 79 42 72 38 C66 35 54 35 48 38 C41 42 39 50 37 60Z" fill="#2b2b2b" />
        {/* Glasses and smile */}
        <rect x="45" y="48" width="12" height="9" rx="3" fill="none" stroke="#1f2937" strokeWidth="1.8" />
        <rect x="63" y="48" width="12" height="9" rx="3" fill="none" stroke="#1f2937" strokeWidth="1.8" />
        <path d="M57 52 H63" stroke="#1f2937" strokeWidth="1.6" />
        <path d="M52 65 Q60 71 68 65" fill="none" stroke="#7a3e22" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
