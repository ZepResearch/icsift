// Illustrations for the credit band: flat, filled figures in the site's own palette (board greys, ink
// outlines, green as the one highlight). Each part animates in once the band is revealed; the finished
// drawing is the default state, so they are complete without script and under reduced motion.
// Animation hooks (see .herb-illus in herbarium.css): data-pop (scale in), data-rise (slide up),
// data-fade, data-draw (stroke draws in), data-spin (a quarter turn), data-twinkle. --d is the delay in ms.

const INK = "var(--ink)";
const SHEET = "var(--sheet)";
const MOUNT = "var(--mount)";
const SOFT = "var(--rule-soft)";
const GREEN = "var(--green)";
const TINT = "color-mix(in srgb, var(--green) 16%, var(--sheet))";

const line = { fill: "none", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

// A toothed ring: a thick dashed stroke reads as gear teeth.
function Gear({ cx, cy, r, stroke, d }) {
  return (
    <g data-spin style={{ "--d": d, "--o": `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={r * 0.42} strokeDasharray={`${r * 0.34} ${r * 0.3}`} />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke={stroke} strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={r * 0.3} fill="none" stroke={stroke} strokeWidth={1.6} />
    </g>
  );
}

function Star({ x, y, s = 6, d }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 ? s * 0.45 : s;
    return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
  }).join(" ");
  return <polygon points={pts} fill={SHEET} data-twinkle style={{ "--d": d, "--o": `${x}px ${y}px` }} />;
}

// Continuing professional development: a wheel in three parts. Work, the mechanism, the climb.
export function HoursFigure() {
  const c = 100;
  const r = 88;
  // Sector corners at 0°, 120° and 240°, clockwise from the top.
  const p0 = `${c} ${c - r}`;
  const p120 = `${c + r * 0.866} ${c + r * 0.5}`;
  const p240 = `${c - r * 0.866} ${c + r * 0.5}`;
  const arc = `A${r} ${r} 0 0 1`;

  return (
    <svg className="herb-illus h-auto w-full" viewBox="0 0 320 200" aria-hidden="true" focusable="false">
      {/* Three sectors, parted by the sheet. */}
      <g stroke={SHEET} strokeWidth="4" strokeLinejoin="round">
        <path d={`M${c} ${c} L${p240} ${arc} ${p0} Z`} fill={MOUNT} data-pop style={{ "--d": 0, "--o": "100px 100px" }} />
        <path d={`M${c} ${c} L${p0} ${arc} ${p120} Z`} fill={TINT} data-pop style={{ "--d": 120, "--o": "100px 100px" }} />
        <path d={`M${c} ${c} L${p120} ${arc} ${p240} Z`} fill={GREEN} data-pop style={{ "--d": 240, "--o": "100px 100px" }} />
      </g>

      {/* Work: a briefcase. */}
      <g stroke={INK} {...line} data-draw style={{ "--d": 500 }}>
        <rect x="36" y="66" width="40" height="28" rx="3" fill={SHEET} pathLength="1" />
        <path d="M49 66 V60 H63 V66" pathLength="1" />
        <path d="M36 77 H76" pathLength="1" />
        <rect x="52" y="74" width="8" height="6" rx="1" fill={SHEET} pathLength="1" />
      </g>

      {/* The mechanism: two gears, which turn a quarter when the band appears. */}
      <Gear cx={150} cy={82} r={16} stroke={INK} d={700} />
      <Gear cx={127} cy={58} r={9} stroke={INK} d={700} />

      {/* The climb: steps, a figure on the first one, stars above the last. */}
      <g fill={SHEET} stroke={SHEET} strokeWidth="1">
        <rect x="80" y="156" width="14" height="12" data-rise style={{ "--d": 900 }} />
        <rect x="94" y="148" width="14" height="20" data-rise style={{ "--d": 1000 }} />
        <rect x="108" y="140" width="14" height="28" data-rise style={{ "--d": 1100 }} />
      </g>
      <g stroke={SHEET} {...line} data-draw style={{ "--d": 1200 }}>
        <circle cx="87" cy="134" r="4" pathLength="1" />
        <path d="M87 138 V150 M87 142 L81 146 M87 142 L93 138 M87 150 L83 156 M87 150 L92 155" pathLength="1" />
      </g>
      <Star x={120} y={124} s={6} d={1500} />
      <Star x={131} y={132} s={4} d={1620} />
      <Star x={110} y={128} s={3.5} d={1740} />

      {/* The hub. */}
      <circle cx={c} cy={c} r="34" fill={INK} data-pop style={{ "--d": 360, "--o": "100px 100px" }} />
      <text
        x={c}
        y={c + 9}
        textAnchor="middle"
        fill={SHEET}
        fontFamily="var(--font-sheet), system-ui, sans-serif"
        fontSize="26"
        fontWeight="600"
        letterSpacing="0.02em"
        data-fade
        style={{ "--d": 600 }}
      >
        CPD
      </text>

      {/* Off to the right, the certificate: a sheet with a green seal. */}
      <g data-rise style={{ "--d": 1300 }}>
        <rect x="222" y="44" width="76" height="100" rx="2" fill={SHEET} stroke={INK} strokeWidth="1.6" />
        <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
          <path d="M234 62 H286 M234 74 H286 M234 86 H272 M234 98 H266" />
        </g>
        <circle cx="276" cy="120" r="11" fill={GREEN} data-pop style={{ "--d": 1700, "--o": "276px 120px" }} />
        <path d="M270 120 L274.5 124.5 L283 115" fill="none" stroke={SHEET} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" data-draw style={{ "--d": 1900 }} />
        <path d="M268 128 L262 150 M284 128 L290 150" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" pathLength="1" data-draw style={{ "--d": 1800 }} />
      </g>
    </svg>
  );
}

// Awards: the podium, a trophy, an idea, and the one at the top still working.
export function AwardFigure() {
  return (
    <svg className="herb-illus h-auto w-full" viewBox="0 0 320 200" aria-hidden="true" focusable="false">
      {/* Soft ground shapes behind everything. */}
      <g fill={SOFT} data-fade style={{ "--d": 0 }}>
        <ellipse cx="88" cy="112" rx="64" ry="46" />
        <ellipse cx="240" cy="92" rx="58" ry="52" />
      </g>

      {/* The podium: second, first, third. The lips are green. */}
      <g data-rise style={{ "--d": 200 }}>
        <rect x="62" y="122" width="62" height="68" fill={MOUNT} />
        <rect x="58" y="118" width="70" height="7" fill={GREEN} />
      </g>
      <g data-rise style={{ "--d": 360 }}>
        <rect x="124" y="92" width="72" height="98" fill={TINT} />
        <rect x="120" y="88" width="80" height="7" fill={GREEN} />
      </g>
      <g data-rise style={{ "--d": 520 }}>
        <rect x="196" y="138" width="62" height="52" fill={MOUNT} />
        <rect x="192" y="134" width="70" height="7" fill={GREEN} />
      </g>
      <g
        fill={INK}
        textAnchor="middle"
        fontFamily="var(--font-sheet), system-ui, sans-serif"
        fontWeight="500"
        letterSpacing="-0.03em"
      >
        <text x="93" y="170" fontSize="34" data-fade style={{ "--d": 700 }}>
          2
        </text>
        <text x="160" y="160" fontSize="40" data-fade style={{ "--d": 800 }}>
          1
        </text>
        <text x="227" y="178" fontSize="30" data-fade style={{ "--d": 900 }}>
          3
        </text>
      </g>

      {/* The trophy, on the left. */}
      <g data-rise style={{ "--d": 900 }}>
        <path d="M22 54 H70 V74 C70 92 58 104 46 104 C34 104 22 92 22 74 Z" fill={TINT} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M22 62 H12 C10 76 16 84 24 86 M70 62 H80 C82 76 76 84 68 86" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M42 104 H50 V112 H42 Z M32 112 H60 V118 H32 Z" fill={INK} />
        <Star x={46} y={76} s={9} d={1500} />
      </g>

      {/* The idea, on the right: a bulb that lights up green. */}
      <g data-rise style={{ "--d": 1050 }}>
        <circle cx="262" cy="70" r="26" fill={GREEN} opacity="0.18" data-twinkle style={{ "--d": 1700, "--o": "262px 70px" }} />
        <path d="M244 72 C244 60 252 52 262 52 C272 52 280 60 280 72 C280 80 274 84 272 90 H252 C250 84 244 80 244 72 Z" fill={SHEET} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M256 80 L260 70 L264 78 L268 70" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" data-draw style={{ "--d": 1600 }} />
        <rect x="252" y="90" width="20" height="5" fill={INK} />
        <rect x="254" y="97" width="16" height="4" fill={INK} />
      </g>

      {/* The one in first place, still at the laptop. */}
      <g data-rise style={{ "--d": 1250 }}>
        <circle cx="160" cy="40" r="8" fill={SHEET} stroke={INK} strokeWidth="1.6" />
        <path d="M148 52 H172 L174 76 H146 Z" fill={GREEN} />
        <path d="M146 76 C150 90 170 90 174 76" fill={INK} />
        <rect x="146" y="66" width="28" height="16" rx="1" fill={INK} />
        <rect x="149" y="69" width="22" height="10" fill={SOFT} />
      </g>
    </svg>
  );
}
