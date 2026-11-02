// 輸入停止・解除の動き（日付の新しい順）
export type TeishiRow = { 分類: string; 日付: string; 国: string; 区分: '停止' | '解除'; 品目: string; 地域: string; 理由: string };

const md = (d: string) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;

export default function TeishiTable({ rows }: { rows: TeishiRow[] }) {
  const sorted = [...rows].sort((a, b) => (a.日付 < b.日付 ? 1 : -1));
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-3 py-2 text-left font-medium">日付</th>
            <th className="px-3 py-2 text-left font-medium">国</th>
            <th className="px-3 py-2 text-left font-medium">措置</th>
            <th className="px-3 py-2 text-left font-medium">対象地域</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              <td className="px-3 py-2 tabular-nums text-slate-500 whitespace-nowrap">{md(r.日付)}</td>
              <td className="px-3 py-2 font-semibold text-[#0B2046] whitespace-nowrap">{r.国}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                    r.区分 === '停止' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {r.区分}
                </span>
              </td>
              <td className="px-3 py-2 text-xs leading-relaxed text-slate-600">{r.地域}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
