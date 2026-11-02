// サーバー側で描く折れ線グラフ（SVG）。JavaScript不要で、メールのリンク先でもすぐ表示される。

type Series = { key: string; label: string; color: string; dashed?: boolean };
type Ref = { y: number; label?: string };

type Props = {
  rows: Record<string, any>[];
  xKey: string;
  xLabel: (v: string) => string;
  series: Series[];
  yFmt: (v: number) => string;
  tipFmt?: (v: number) => string;
  refs?: Ref[];
  ariaLabel: string;
};

function niceTicks(lo: number, hi: number, count: number) {
  const raw = (hi - lo) / Math.max(1, count);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((s) => s * mag).find((s) => s >= raw) || raw;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  return ticks;
}

const ok = (v: unknown): v is number => typeof v === 'number' && isFinite(v);

export default function LineChart({ rows, xKey, xLabel, series, yFmt, tipFmt, refs = [], ariaLabel }: Props) {
  const W = 640;
  const H = 280;
  const vals: number[] = [];
  series.forEach((s) => rows.forEach((r) => ok(r[s.key]) && vals.push(r[s.key])));
  refs.forEach((r) => vals.push(r.y));
  const lo0 = Math.min(...vals);
  const hi0 = Math.max(...vals);
  const pad = (hi0 - lo0) * 0.06 || 1;
  const ticks = niceTicks(lo0 - pad, hi0 + pad, 5);
  const lo = ticks[0];
  const hi = ticks[ticks.length - 1];
  const longest = Math.max(...ticks.map((t) => yFmt(t).length));
  const m = { l: 12 + longest * 9, r: 24, t: 12, b: 32 };
  const n = rows.length;
  const x = (i: number) => m.l + (n <= 1 ? 0 : (i / (n - 1)) * (W - m.l - m.r));
  const y = (v: number) => H - m.b - ((v - lo) / (hi - lo)) * (H - m.t - m.b);
  const step = Math.max(1, Math.ceil(n / 12));
  const fmtTip = tipFmt || yFmt;

  const path = (key: string) => {
    let d = '';
    let pen = false;
    rows.forEach((r, i) => {
      const v = r[key];
      if (ok(v)) {
        d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
        pen = true;
      } else pen = false;
    });
    return d;
  };

  return (
    <figure className="m-0">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mb-2 list-none p-0">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <svg width="18" height="6" aria-hidden="true">
              <line x1="0" y1="3" x2="18" y2="3" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dashed ? '4 3' : undefined} />
            </svg>
            {s.label}
          </li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={ariaLabel} className="block">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke="#E2E8F0" strokeWidth="1" />
            <text x={m.l - 6} y={y(t)} dy="0.32em" textAnchor="end" fontSize="15" fill="#64748B">
              {yFmt(t)}
            </text>
          </g>
        ))}
        {rows.map((r, i) =>
          i % step === 0 ? (
            <text key={i} x={x(i)} y={H - 9} textAnchor="middle" fontSize="15" fill="#64748B">
              {xLabel(r[xKey])}
            </text>
          ) : null,
        )}
        {refs.map((r) => (
          <g key={r.y}>
            <line x1={m.l} x2={W - m.r} y1={y(r.y)} y2={y(r.y)} stroke="#F09A26" strokeWidth="1.5" strokeDasharray="3 4" />
            {r.label && (
              <text x={W - m.r} y={y(r.y) - 6} textAnchor="end" fontSize="15" fill="#B45309">
                {r.label}
              </text>
            )}
          </g>
        ))}
        {series.map((s) => (
          <path
            key={s.key}
            d={path(s.key)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={s.dashed ? '6 5' : undefined}
          />
        ))}
        {series.map((s) =>
          rows.map((r, i) =>
            ok(r[s.key]) ? (
              <circle key={`${s.key}-${i}`} cx={x(i)} cy={y(r[s.key])} r="3" fill={s.color}>
                <title>{`${xLabel(r[xKey])} ${s.label}：${fmtTip(r[s.key])}`}</title>
              </circle>
            ) : null,
          ),
        )}
      </svg>
    </figure>
  );
}
