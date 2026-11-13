export function Logo({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="School logo">
      <circle cx="32" cy="32" r="30" fill="#17633a" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
      <path d="M18 40V26l14-7 14 7v14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 40v-9h16v9M32 31v9M16 43h32" stroke="#fff" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="24.5" r="2" fill="#fbbf24" />
    </svg>
  );
}
