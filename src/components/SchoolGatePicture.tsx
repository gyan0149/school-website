import { useId } from "react";

// Splits a long school name into up to two balanced lines for the gate board.
function nameLines(name: string): string[] {
  if (name.length <= 26) return [name];
  const words = name.split(" ");
  let best = [name];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [a, b];
    }
  }
  return best;
}

const BOARD_TEXT_WIDTH = 300;

function BoardText({ text, y, size }: { text: string; y: number; size: number }) {
  const estimated = text.length * size * 0.58;
  return (
    <text
      x={320}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fontWeight={700}
      fill="#fde68a"
      fontFamily='"Noto Sans", system-ui, sans-serif'
      {...(estimated > BOARD_TEXT_WIDTH ? { textLength: BOARD_TEXT_WIDTH, lengthAdjust: "spacingAndGlyphs" } : {})}
    >
      {text}
    </text>
  );
}

// Demo illustration of a school building with the school's own name on the gate.
export function SchoolGatePicture({ name, place }: { name: string; place: string }) {
  const id = useId();
  const lines = nameLines(name);
  const windows = [180, 222, 264, 376, 418, 460];
  const size = lines.length === 1 ? 19 : 16;

  return (
    <svg viewBox="0 0 640 400" className="block h-auto w-full" role="img" aria-label={`Demo picture of ${name}`}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc3ea" />
          <stop offset="1" stopColor="#e6f4fb" />
        </linearGradient>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e7c8" />
          <stop offset="1" stopColor="#e9d3a6" />
        </linearGradient>
      </defs>

      {/* Sky, sun, hills */}
      <rect width="640" height="400" fill={`url(#${id}sky)`} />
      <circle cx="560" cy="62" r="28" fill="#fde68a" opacity="0.9" />
      <path d="M0 210 Q90 150 190 196 T400 186 T640 192 V300 H0Z" fill="#5f9d6b" />
      <path d="M0 236 Q120 196 260 228 T520 220 T640 226 V300 H0Z" fill="#3f7f50" />

      {/* Sal trees */}
      {[24, 70, 584, 618].map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y={i % 2 ? 228 : 222} width="6" height="40" fill="#5b3a1e" />
          <ellipse cx={x} cy={i % 2 ? 214 : 206} rx="24" ry="32" fill={i % 2 ? "#2f6b3f" : "#286036"} />
        </g>
      ))}

      {/* Building */}
      <rect x="140" y="122" width="360" height="148" fill={`url(#${id}wall)`} />
      <rect x="132" y="112" width="376" height="14" fill="#9a4b2a" />
      <rect x="140" y="194" width="360" height="6" fill="#d9bb84" />
      {windows.map((x) => (
        <g key={x}>
          <rect x={x} y="140" width="26" height="34" rx="2" fill="#4f7ea8" stroke="#fff" strokeWidth="2" />
          <rect x={x} y="212" width="26" height="34" rx="2" fill="#4f7ea8" stroke="#fff" strokeWidth="2" />
        </g>
      ))}
      <rect x="296" y="136" width="48" height="134" fill="#e2c592" />
      <rect x="306" y="214" width="28" height="56" rx="14" fill="#7a4a2a" />

      {/* Flag */}
      <rect x="520" y="62" width="3" height="208" fill="#9ca3af" />
      <rect x="523" y="64" width="42" height="9" fill="#ff9933" />
      <rect x="523" y="73" width="42" height="9" fill="#ffffff" />
      <rect x="523" y="82" width="42" height="9" fill="#138808" />
      <circle cx="544" cy="77.5" r="3" fill="none" stroke="#000080" strokeWidth="1" />

      {/* Ground and path */}
      <rect y="300" width="640" height="100" fill="#c9b48a" />
      <path d="M262 400 L292 318 H348 L378 400Z" fill="#a8916a" />

      {/* Boundary wall */}
      <rect y="270" width="640" height="48" fill="#f1e2c2" />
      <rect y="270" width="640" height="7" fill="#17633a" />
      <rect y="311" width="640" height="7" fill="#b4532a" />

      {/* Gate pillars and grill */}
      <rect x="150" y="214" width="34" height="114" fill="#efe0bd" stroke="#c9ad7a" strokeWidth="2" />
      <rect x="456" y="214" width="34" height="114" fill="#efe0bd" stroke="#c9ad7a" strokeWidth="2" />
      <rect x="144" y="206" width="46" height="12" fill="#b4532a" />
      <rect x="450" y="206" width="46" height="12" fill="#b4532a" />
      <rect x="184" y="270" width="272" height="58" fill="#c9b48a" />
      {Array.from({ length: 17 }, (_, i) => (
        <rect key={i} x={190 + i * 16} y="276" width="3" height="52" fill="#3f3f46" />
      ))}
      <rect x="184" y="282" width="272" height="3" fill="#3f3f46" />
      <rect x="184" y="318" width="272" height="3" fill="#3f3f46" />

      {/* Name board on top of the gate */}
      <path d="M144 202 L144 158 Q320 128 496 158 L496 202Z" fill="#17633a" stroke="#fbbf24" strokeWidth="3" />
      {lines.length === 1 ? (
        <BoardText text={lines[0]} y={186} size={size} />
      ) : (
        <>
          <BoardText text={lines[0]} y={174} size={size} />
          <BoardText text={lines[1]} y={195} size={size} />
        </>
      )}
      <rect x="236" y="204" width="168" height="16" rx="3" fill="#fbbf24" />
      <text x="320" y="216" textAnchor="middle" fontSize="10.5" fontWeight={600} fill="#0b3320" fontFamily='"Noto Sans", system-ui, sans-serif'>
        {place}
      </text>

      {/* Demo label */}
      <rect x="12" y="368" width="96" height="22" rx="11" fill="#0b3320" opacity="0.75" />
      <text x="60" y="383" textAnchor="middle" fontSize="11" fill="#fff" fontFamily='"Noto Sans", system-ui, sans-serif'>
        Demo picture
      </text>
    </svg>
  );
}
