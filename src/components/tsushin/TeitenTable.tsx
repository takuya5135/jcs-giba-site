import { TeitenRow, teitenChange, signed, ym } from '@/tsushin/calc';
import { Lang } from '@/tsushin/i18n';

// 中国語表示用の訳（項目名・分類・単位）
const ZH: Record<string, string> = {
  '為替・物流・飼料': '汇率・物流・饲料',
  '円/ドル': '日元/美元',
  '冷蔵倉庫の庫腹占有率': '冷库库容占用率',
  '輸入の海上運賃（指数）': '进口海运费（指数）',
  'とうもろこし（国際価格）': '玉米（国际价格）',
  '大豆ミール（国際価格）': '豆粕（国际价格）',
  鶏肉: '鸡肉',
  '輸入：ブラジル産': '进口：巴西产',
  '輸入：タイ産': '进口：泰国产',
  '国産：もも（卸・東京）': '日本产：鸡腿肉（批发・东京）',
  '国産：むね（卸・東京）': '日本产：鸡胸肉（批发・东京）',
  鶏肉調製品: '鸡肉调制品',
  '輸入：タイ産（単価）': '进口：泰国产（单价）',
  '輸入：タイ産（数量）': '进口：泰国产（数量）',
  '輸入：中国産（単価）': '进口：中国产（单价）',
  '輸入：中国産（数量）': '进口：中国产（数量）',
  牛肉: '牛肉',
  '輸入：豪州産・冷凍': '进口：澳大利亚产・冷冻',
  '輸入：米国産・冷蔵': '进口：美国产・冷藏',
  '国産：和牛去勢A4（枝肉・東京）': '日本产：和牛阉牛A4（胴体・东京）',
  '国産：乳・交雑去勢B3・B2（枝肉・東京）': '日本产：乳用・杂交阉牛B3・B2（胴体・东京）',
  豚肉: '猪肉',
  '輸入：デンマーク産・冷凍': '进口：丹麦产・冷冻',
  '国産：枝肉 上（東京）': '日本产：胴体 上等（东京）',
  円: '日元',
  '円/トン': '日元/吨',
  '円/kg': '日元/kg',
  トン: '吨',
  '2020年=100': '2020年=100',
};
const HEAD = {
  ja: ['項目', '最新', '単位', '月', '前月比', '前年比'],
  zh: ['项目', '最新', '单位', '月份', '环比', '同比'],
};

const Chg = ({ v, isPct }: { v: number | null; isPct: boolean }) => {
  if (v == null) return <span className="text-slate-400">—</span>;
  const cls = v > 0.05 ? 'text-red-600' : v < -0.05 ? 'text-emerald-700' : 'text-slate-500';
  return <span className={cls}>{signed(v, 1, isPct ? 'pt' : '%')}</span>;
};

const fmtVal = (r: TeitenRow) =>
  r.単位 === '%' || r.値 < 1000
    ? r.値.toLocaleString('ja-JP', { maximumFractionDigits: 1 })
    : Math.round(r.値).toLocaleString('ja-JP');

export default function TeitenTable({ rows, lang = 'ja' }: { rows: TeitenRow[]; lang?: Lang }) {
  const t = (v: string) => (lang === 'zh' ? ZH[v] ?? v : v);
  const h = HEAD[lang];
  const groups: string[] = [];
  rows.forEach((r) => !groups.includes(r.分類) && groups.push(r.分類));
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-3 py-2 text-left font-medium">{h[0]}</th>
            <th className="px-3 py-2 text-right font-medium">{h[1]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[2]}</th>
            <th className="px-3 py-2 text-left font-medium">{h[3]}</th>
            <th className="px-3 py-2 text-right font-medium">{h[4]}</th>
            <th className="px-3 py-2 text-right font-medium">{h[5]}</th>
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g}>
            <tr className="bg-slate-50">
              <td colSpan={6} className="px-3 py-1.5 text-xs font-bold text-[#0B2046]">
                {t(g)}
              </td>
            </tr>
            {rows
              .filter((r) => r.分類 === g)
              .map((r) => {
                const c = teitenChange(r);
                return (
                  <tr key={r.項目} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-700">{t(r.項目)}</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums text-[#0B2046]">{fmtVal(r)}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{t(r.単位)}</td>
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
