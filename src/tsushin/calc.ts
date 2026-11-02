// ギバ通信：誌面で使う数字の計算（ビルド時に実行）

export type ChickenRow = {
  month: string;
  国産もも: number | null;
  国産むね: number | null;
  ブラジル産: number | null;
  タイ産: number | null;
};

export type JarwRow = {
  month: string;
  庫腹占有率: number;
  畜産物在庫_t: number;
  冷凍水産物在庫_t: number;
};

export type TeitenRow = {
  分類: string;
  項目: string;
  単位: string;
  月: string;
  値: number;
  前月値: number | null;
  前年値: number | null;
  出典: string;
};

export const ym = (m: string) => `${m.slice(0, 4)}年${Number(m.slice(5, 7))}月`;
export const yen = (v: number) => `${Math.round(v).toLocaleString('ja-JP')}円`;
export const pct1 = (v: number) => `${v.toFixed(1)}%`;
export const signed = (v: number, digits: number, unit: string) =>
  `${v > 0 ? '+' : v < 0 ? '−' : '±'}${Math.abs(v).toFixed(digits)}${unit}`;

export function chickenKpi(rows: ChickenRow[]) {
  const mune = rows.filter((r) => r.国産むね != null);
  const peak = mune.reduce((a, b) => ((b.国産むね as number) > (a.国産むね as number) ? b : a));
  const last = mune[mune.length - 1];
  const sep = rows.find((r) => r.month === '2026-09');
  return {
    munePeakMonth: peak.month,
    munePeak: peak.国産むね as number,
    lastMonth: last.month,
    muneLast: last.国産むね as number,
    brazilSep: sep?.ブラジル産 ?? null,
    thaiSep: sep?.タイ産 ?? null,
  };
}

export type SeasonRow = { month: string; label: string; y2026: number | null; avg: number };

// 2026年の各月と、2023〜2025年の同じ月の平均
export function jarwSeason(rows: JarwRow[]): SeasonRow[] {
  const out: SeasonRow[] = [];
  for (let m = 1; m <= 12; m++) {
    const mm = String(m).padStart(2, '0');
    const past = rows.filter((r) => ['2023', '2024', '2025'].includes(r.month.slice(0, 4)) && r.month.slice(5, 7) === mm);
    if (!past.length) continue;
    const avg = past.reduce((s, r) => s + r.庫腹占有率, 0) / past.length;
    const cur = rows.find((r) => r.month === `2026-${mm}`);
    out.push({ month: `2026-${mm}`, label: `${m}月`, y2026: cur ? cur.庫腹占有率 : null, avg: Math.round(avg * 10) / 10 });
  }
  return out;
}

export function jarwStock(rows: JarwRow[], prev: string, cur: string) {
  const a = rows.find((r) => r.month === prev)!;
  const b = rows.find((r) => r.month === cur)!;
  const man = (t: number) => t / 10000;
  const line = (label: string, x: number, y: number) => ({ label, prev: man(x), cur: man(y), diff: man(y - x) });
  return [
    line('畜産物', a.畜産物在庫_t, b.畜産物在庫_t),
    line('冷凍水産物', a.冷凍水産物在庫_t, b.冷凍水産物在庫_t),
  ];
}

// 定点観測の前月比・前年比。占有率（%）はポイント差、それ以外は変化率。
export function teitenChange(r: TeitenRow) {
  const isPct = r.単位 === '%';
  const chg = (base: number | null) => {
    if (base == null || base === 0) return null;
    return isPct ? r.値 - base : (r.値 / base - 1) * 100;
  };
  return { isPct, mom: chg(r.前月値), yoy: chg(r.前年値) };
}
