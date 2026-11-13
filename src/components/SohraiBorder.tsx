import { useId } from "react";

// Decorative strip inspired by Jharkhand's Sohrai wall art.
export function SohraiBorder({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg className={`block h-3 w-full ${className}`} aria-hidden preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#8f3d1c" />
          <path d="M0 12 L6 2 L12 12 Z" fill="#f5e6c8" />
          <path d="M12 12 L18 2 L24 12 Z" fill="#fbbf24" />
          <circle cx="12" cy="3" r="1.4" fill="#f5e6c8" />
          <circle cx="6" cy="9" r="1" fill="#8f3d1c" />
          <circle cx="18" cy="9" r="1" fill="#8f3d1c" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
