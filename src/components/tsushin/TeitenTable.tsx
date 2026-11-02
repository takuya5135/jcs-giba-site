import { TeitenRow, teitenChange, signed, ym } from '@/tsushin/calc';

const Chg = ({ v, isPct }: { v: number | null; isPct: boolean }) => {
  if (v == null) return <span className="text-slate-400">—</span>;
  const cls = v > 0.05 ? 'text-red-600' : v < -0.05 ? 'text-emerald-700' : 'text-slate-500';
  return <span className={cls}>{signed(v, 1, isPct ? 'pt' : '%')}</span>;
};

const fmtVal = (r: TeitenRow) =>
  r.単位 === '%' || r.値 < 1000
    ? r.値.toLocaleString('ja-JP', { maximumFractionDigits: 1 })
    : Math.round(r.値).toLocaleString('ja-JP');

export default function TeitenTable({ rows }: { rows: TeitenRow[] }) {
  const groups: string[] = [];
  rows.forEach((r) => !groups.includes(r.分類) && groups.push(r.分類));
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-3 py-2 text-left font-medium">項目</th>
            <th className="px-3 py-2 text-right font-medium">最新</th>
            <th className="px-3 py-2 text-left font-medium">単位</th>
            <th className="px-3 py-2 text-left font-medium">月</th>
            <th className="px-3 py-2 text-right font-medium">前月比</th>
            <th className="px-3 py-2 text-right font-medium">前年比</th>
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g}>
            <tr className="bg-slate-50">
              <td colSpan={6} className="px-3 py-1.5 text-xs font-bold text-[#0B2046]">
                {g}
              </td>
            </tr>
            {rows
              .filter((r) => r.分類 === g)
              .map((r) => {
                const c = teitenChange(r);
                return (
                  <tr key={r.項目} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-700">{r.項目}</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums text-[#0B2046]">{fmtVal(r)}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{r.単位}</td>
                    <td className="px-3 py-2 text-xs text-slate-500 whitespace-nowrap">{ym(r.月)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      <Chg v={c.mom} isPct={c.isPct} />
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      <Chg v={c.yoy} isPct={c.isPct} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        ))}
      </table>
    </div>
  );
}
