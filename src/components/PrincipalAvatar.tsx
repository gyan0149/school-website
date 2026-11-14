import { useId } from "react";

// Photo-style placeholder (studio backdrop + silhouette) until the principal's real photo is added.
export function PrincipalAvatar({ className = "h-32 w-32" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" className={`rounded-full ${className}`} role="img" aria-label="Principal's photo coming soon">
      <defs>
        <radialGradient id={`${id}bg`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#f4f5f6" />
          <stop offset="0.55" stopColor="#d9dde1" />
          <stop offset="1" stopColor="#aeb5bc" />
        </radialGradient>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b7480" />
          <stop offset="1" stopColor="#3f4650" />
        </linearGradient>
        <radialGradient id={`${id}head`} cx="0.42" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#7d8692" />
          <stop offset="1" stopColor="#4b535d" />
        </radialGradient>
        <clipPath id={`${id}clip`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}clip)`}>
        <rect width="120" height="120" fill={`url(#${id}bg)`} />
        <path d="M10 124 C11 96 31 82 60 82 C89 82 109 96 110 124Z" fill={`url(#${id}body)`} />
        <path d="M49 68 H71 V84 C65 89 55 89 49 84Z" fill="#4b535d" />
        <ellipse cx="60" cy="50" rx="22.5" ry="24" fill={`url(#${id}head)`} />
        <path d="M43 39 C47 31 55 28 62 29" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
