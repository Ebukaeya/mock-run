// WorldGlobe.jsx
// Orthographic globe — Africa centred at (0°N, 20°E).
// SVG math runs entirely in JS; no external assets needed.
// Props: light {bool} — lower opacity for light-themed pages.
import { useMemo } from "react";
import "./WorldGlobe.css";

const SZ = 700,
  R = 315,
  CX = SZ / 2,
  CY = SZ / 2,
  CLon = 20;
const BLUE = "#2563EB",
  TEAL = "#37B4C5";

function proj(latDeg, lonDeg) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = ((lonDeg - CLon) * Math.PI) / 180;
  return {
    x: CX + R * Math.cos(lat) * Math.sin(lon),
    y: CY - R * Math.sin(lat),
    vis: Math.cos(lat) * Math.cos(lon) > 0,
  };
}

const CITIES = [
  { n: "Lagos", lat: 6.5, lon: 3.4, ng: true },
  { n: "Abuja", lat: 9.1, lon: 7.5, ng: true },
  { n: "Enugu", lat: 6.5, lon: 7.5, ng: true },
  { n: "Port Harcourt", lat: 4.8, lon: 7.0, ng: true },
  { n: "Accra", lat: 5.6, lon: -0.2, ng: false },
  { n: "Nairobi", lat: -1.3, lon: 36.8, ng: false },
  { n: "London", lat: 51.5, lon: 0.1, ng: false },
  { n: "Cairo", lat: 30.0, lon: 31.2, ng: false },
  { n: "Dubai", lat: 25.2, lon: 55.3, ng: false },
  { n: "Joburg", lat: -26.2, lon: 28.0, ng: false },
  { n: "New York", lat: 40.7, lon: -74.0, ng: false },
];
const CONNS = [
  ["Lagos", "London"],
  ["Lagos", "Abuja"],
  ["Lagos", "Accra"],
  ["Lagos", "Nairobi"],
  ["Abuja", "Cairo"],
  ["Cairo", "Dubai"],
  ["London", "New York"],
  ["Nairobi", "Dubai"],
  ["Lagos", "Joburg"],
  ["Enugu", "Lagos"],
  ["Port Harcourt", "Lagos"],
];

export default function WorldGlobe({ light = false }) {
  const elems = useMemo(() => {
    const latLines = [];
    for (let lat = -75; lat < 90; lat += 15) {
      const lr = (lat * Math.PI) / 180;
      const yy = CY - R * Math.sin(lr);
      const rx = R * Math.cos(lr);
      if (rx > 2) latLines.push({ yy, rx, ry: rx * 0.28, eq: lat === 0 });
    }
    const lonLines = [];
    for (let lo = -80; lo < 90; lo += 20) {
      const rx = Math.abs(R * Math.sin((lo * Math.PI) / 180));
      if (rx > 2) lonLines.push(rx);
    }
    const cityMap = {};
    CITIES.forEach((c) => {
      cityMap[c.n] = { ...proj(c.lat, c.lon), ng: c.ng };
    });
    const arcs = [];
    CONNS.forEach(([a, b]) => {
      const pa = cityMap[a],
        pb = cityMap[b];
      if (!pa?.vis || !pb?.vis) return;
      const mx = (pa.x + pb.x) / 2,
        my = (pa.y + pb.y) / 2;
      const dx = mx - CX,
        dy = my - CY;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const s = Math.min((R * 0.18) / d, 0.5);
      arcs.push(`M${pa.x.toFixed(1)},${pa.y.toFixed(1)} Q${(mx + dx * s).toFixed(1)},${(my + dy * s).toFixed(1)} ${pb.x.toFixed(1)},${pb.y.toFixed(1)}`);
    });
    const dots = CITIES.map((c) => ({ ...cityMap[c.n] })).filter((p) => p.vis);
    return { latLines, lonLines, arcs, dots };
  }, []);

  return (
    <div className={`slpgl__root${light ? " slpgl__root--light" : ""}`} aria-hidden='true'>
      <svg width={SZ} height={SZ} viewBox={`0 0 ${SZ} ${SZ}`} xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <clipPath id='slpglClip'>
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
          <radialGradient id='slpglG1' cx='38%' cy='32%' r='60%'>
            <stop offset='0%' stopColor={BLUE} stopOpacity='0.22' />
            <stop offset='100%' stopColor={BLUE} stopOpacity='0' />
          </radialGradient>
          <radialGradient id='slpglG2' cx='60%' cy='65%' r='55%'>
            <stop offset='0%' stopColor={TEAL} stopOpacity='0.09' />
            <stop offset='100%' stopColor={TEAL} stopOpacity='0' />
          </radialGradient>
          <filter id='slpglGf'>
            <feGaussianBlur stdDeviation='2.5' result='b' />
            <feMerge>
              <feMergeNode in='b' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          <filter id='slpglGfb'>
            <feGaussianBlur stdDeviation='6' result='b' />
            <feMerge>
              <feMergeNode in='b' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
        <circle cx={CX} cy={CY} r={R} fill='url(#slpglG1)' />
        <circle cx={CX} cy={CY} r={R} fill='url(#slpglG2)' />
        <circle cx={CX} cy={CY} r={R} fill='none' stroke={BLUE} strokeWidth='0.6' strokeOpacity='0.3' />
        {elems.latLines.map(({ yy, rx, ry, eq }, i) => (
          <ellipse
            key={i}
            cx={CX}
            cy={+yy.toFixed(1)}
            rx={+rx.toFixed(1)}
            ry={+ry.toFixed(1)}
            fill='none'
            stroke={BLUE}
            strokeWidth={eq ? "0.85" : "0.5"}
            strokeOpacity={eq ? "0.32" : "0.13"}
            clipPath='url(#slpglClip)'
          />
        ))}
        {elems.lonLines.map((rx, i) => (
          <ellipse
            key={i}
            cx={CX}
            cy={CY}
            rx={+rx.toFixed(1)}
            ry={R}
            fill='none'
            stroke={BLUE}
            strokeWidth='0.5'
            strokeOpacity='0.11'
            clipPath='url(#slpglClip)'
          />
        ))}
        {elems.arcs.map((d, i) => (
          <path key={i} d={d} fill='none' stroke={TEAL} strokeWidth='0.9' strokeOpacity='0.45' strokeDasharray='4 3' />
        ))}
        {elems.dots.map(({ x, y, ng }, i) => {
          const c = ng ? TEAL : BLUE;
          return (
            <g key={i}>
              <circle cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={ng ? 11 : 7} fill={c} opacity='0.22' filter='url(#slpglGfb)' />
              <circle cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={ng ? 3 : 2} fill={c} opacity='0.55' filter='url(#slpglGf)' />
              <circle cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={ng ? 2 : 1.5} fill='#fff' opacity='0.92' />
              {ng && <circle cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={ng ? 9 : 5} fill='none' stroke={TEAL} strokeWidth='0.8' strokeOpacity='0.38' />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
