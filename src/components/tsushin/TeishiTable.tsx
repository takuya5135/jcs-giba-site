// 輸入停止・解除の動き（日付の新しい順）
import { Lang } from '@/tsushin/i18n';
// 中国語版は国・品目・地域・理由を訳したJSON（teishi.zh.json）を渡す。区分は '停止'/'解除' のまま
const HEAD = { ja: ['日付', '国', '措置', '品目', '理由', '対象地域'], zh: ['日期', '国家', '措施', '品类', '原因', '对象地区'] };
const KUBUN = { ja: { 停止: '停止', 解除: '解除' }, zh: { 停止: '暂停', 解除: '解除' } };
export type TeishiRow = { 分類: string; 日付: string; 国: string; 区分: '停止' | '解除'; 品目: string; 地域: string; 理由: string };

const md = (d: string) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;

export default function TeishiTable({ rows, lang = 'ja' }: { rows: TeishiRow[]; lang?: Lang }) {
  const h = HEAD[lang];
  const sorted = [...rows].sort((a, b) => (a.日付 < b.日付 ? 1 : -1));
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[680px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-3 py-2 text-left font-medium">{h[0]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[1]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[2]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[3]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[4]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[5]}</th>
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
                  {KUBUN[lang][r.区分]}
                </span>
              </td>
              <td className="px-3 py-2 text-xs leading-relaxed text-slate-700 whitespace-nowrap">
                {r.品目.split(/[、，]/).map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </td>
              <td className="px-3 py-2 text-xs leading-relaxed text-slate-700 whitespace-nowrap">{r.理由}</td>
              <td className="px-3 py-2 text-xs leading-relaxed text-slate-600">{r.地域}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
