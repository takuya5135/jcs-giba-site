// ギバ通信 創刊号（2026年12月）本文
import LineChart from '@/components/tsushin/LineChart';
import TeitenTable from '@/components/tsushin/TeitenTable';
import TeishiTable, { TeishiRow } from '@/components/tsushin/TeishiTable';
import { Card, H3, P, Part, Todo } from '@/components/tsushin/parts';
import { ChickenRow, JarwRow, TeitenRow, chickenKpi, jarwSeason, jarwStock, pct1, signed, ym, yen } from '@/tsushin/calc';
import chickenData from './chicken.json';
import jarwData from './jarw.json';
import teitenData from './teiten.json';
import teishiData from './teishi.json';

const chicken = chickenData as ChickenRow[];
const jarw = jarwData as JarwRow[];
const teiten = teitenData as TeitenRow[];
const teishi = teishiData as TeishiRow[];
const teishiCount = (c: string, k: string) => teishi.filter((r) => r.分類 === c && r.区分 === k).length;

const TIGHT = 93; // 現場で「タイト」と感じる庫腹占有率の目安（畑さんの感覚）

export const sources = [
  '農林水産省「食鳥市況情報」、財務省「貿易統計」',
  '日本冷蔵倉庫協会「主要12都市受寄物庫腹利用・品目別在庫」',
  '農林水産省「食肉卸売市場調査（日別）」（東京市場）',
  '農林水産省 動物検疫所「動検NEWS」（輸入停止・解除情報）',
  '日本銀行「企業向けサービス価格指数」、IMF一次産品価格・為替（米セントルイス連銀 FRED）',
];

const B = ({ children }: { children: React.ReactNode }) => <b className="text-[#0B2046]">{children}</b>;
// 商談で聞いた話（社名は伏せる）
const Voice = ({ who, children }: { who: string; children: React.ReactNode }) => (
  <figure className="my-6 rounded-r-xl border-l-4 border-[#F09A26] bg-white px-5 py-4">
    <figcaption className="text-xs font-bold text-[#F09A26]">商談で聞いた話｜{who}</figcaption>
    <blockquote className="m-0 mt-2 text-[15px] leading-[1.9] text-slate-700">{children}</blockquote>
  </figure>
);
const mlabel = (m: string) => `${m.slice(2, 4)}/${m.slice(5, 7)}`;

export default function Content() {
  const k = chickenKpi(chicken);
  const season = jarwSeason(jarw);
  const aug = season.find((s) => s.label === '8月')!;
  const stock = jarwStock(jarw, '2025-08', '2026-08');

  return (
    <>
      <Part>今号の一本</Part>
      <article>
        <h2 className="text-2xl sm:text-[28px] font-bold leading-snug text-[#0B2046]">相場の天井は、倉庫が決める</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          鶏肉の値段は、需要と供給だけで動いているのでしょうか。2025年から2026年の国産むね肉の動きを追うと、もうひとつの主役が見えてきます。冷蔵倉庫の「空き」です。
        </p>

        <H3>輸入が止まると、国産が跳ねる</H3>
        <P>
          2025年、ブラジルの養鶏場で鳥インフルエンザが出て、日本への輸入が止まりました。ブラジル産やタイ産のもも肉が手に入りにくくなると、代わりに買われたのが国産のむね肉です。東京の卸値は、
          <B>{ym(k.munePeakMonth)}</B>に<B>{yen(k.munePeak)}</B>（1kgあたり）まで上がりました。正直、びっくりするほどの上がり方でした。
        </P>

        <H3>みんなが動くと、毎回一斉に崩れる</H3>
        <P>値段が上がれば、国内の生産者は羽数を増やし、商社は輸入チキンの在庫を積みます。誰もが「今のうちに」と動く。そして毎回、必ず一斉に値崩れします。</P>
        <Voice who="輸入・国産チキン大手の営業担当者">
          この夏の前、「ブラジル産のもも正肉と国産むねの売り先はないか」と相談を受けました。すでに多くのプレーヤーが在庫の放出に走っていて、中には赤字で売っているところもありました。私たちのような小さな会社が、新しく入り込む余地はありませんでした。
          <br />
          「こうなるのは、みんな分かってましたよね？」と聞くと、返ってきたのは「分かっていても、誰も止められないんです」という言葉でした。
        </Voice>
        <P>
          2026年もブラジルで鳥インフルエンザは出ました。それでも国産むねは下がり続け、<B>{ym(k.lastMonth)}</B>は<B>{yen(k.muneLast)}</B>
          です。一方、輸入物はブラジル産が<B>{k.brazilSep != null ? yen(k.brazilSep) : '—'}</B>、タイ産が
          <B>{k.thaiSep != null ? yen(k.thaiSep) : '—'}</B>（いずれも2026年9月の輸入単価）と、国産むねより高くなりました。
        </P>
        <Card
          title="輸入鶏肉の単価と、国産鶏肉の卸値"
          note="円/kg。輸入は通関時の単価、国産は東京の卸売価格（中値・税別）の月平均。基準が違うので、水準より向きを見てください。"
        >
          <LineChart
            rows={chicken}
            xKey="month"
            xLabel={mlabel}
            yFmt={(v) => v.toLocaleString('ja-JP')}
            tipFmt={yen}
            ariaLabel="輸入鶏肉の単価と国産鶏肉の卸値の推移"
            series={[
              { key: '国産もも', label: '国産もも', color: '#0B2046' },
              { key: '国産むね', label: '国産むね', color: '#F09A26' },
              { key: 'ブラジル産', label: 'ブラジル産（輸入）', color: '#2F7F8F' },
              { key: 'タイ産', label: 'タイ産（輸入）', color: '#B4533A' },
            ]}
          />
        </Card>

        <H3>保管は、タダではない</H3>
        <P>
          見落とされがちなのは、在庫を置く場所の話です。とくに冷凍は倉庫が足りません。在庫を抱えすぎると、すでに契約したコンテナが港に着いても入れる場所がない。そうなれば、値段に関係なく出すしかありません。
        </P>
        <P>
          この夏、ほかのプレーヤーからも「契約残が次々に入ってくるので、出庫しないと入らない。だから値引きしている」という話を何度も聞きました。営業冷蔵庫の方からは、こんな話も聞いています。
        </P>
        <Voice who="営業冷蔵庫">
          新規のお問い合わせはお断りしています。行き先のない荷物が溜まっていて、コンテナヤードで100万円のデマレージ（コンテナの超過留置料）を払った、という話も珍しくありません。
        </Voice>
        <P>鶏肉だけの話ではありません。</P>
        <Voice who="中国産の豚肉加工品を扱う会社の営業担当者">
          豚肉加工品の在庫が少し停滞して、在庫日数が通常の倍ほどになりました。いつもなら時間が経てば落ち着く数字なので、そのまま様子を見ます。ところが今年は、冷蔵庫の空きがそれを許してくれませんでした。特価を出して販売を広げ、なんとか在庫量を調整しました。
        </Voice>
        <P>値段を下げた理由は、売れないからではなく、置けないから。倉庫の空きが、売り手に値引きを迫っています。</P>
        <P>
          冷蔵倉庫は毎年6月がいちばん混みます。お盆や夏の需要に向けた積み増しなので、ここは心配いりません。見るべきは、夏の出荷が終わった後です。2026年8月の庫腹占有率（倉庫の埋まり具合）は
          <B>{aug.y2026 != null ? pct1(aug.y2026) : '—'}</B>で、例年の8月（<B>{pct1(aug.avg)}</B>）より
          <B>{aug.y2026 != null ? signed(aug.y2026 - aug.avg, 1, 'ポイント') : '—'}</B>高いままでした。現場で「タイト」と感じる<B>{TIGHT}%</B>
          を超えています。
        </P>
        <div>
          <Card title="庫腹占有率：2026年と例年" note="主要12都市。例年は2023〜2025年の同じ月の平均。点線は「タイト」の目安。">
            <LineChart
              rows={season}
              xKey="label"
              xLabel={(v) => v}
              yFmt={(v) => `${v}%`}
              tipFmt={pct1}
              refs={[{ y: TIGHT, label: `タイト ${TIGHT}%` }]}
              ariaLabel="庫腹占有率の2026年と例年の比較"
              series={[
                { key: 'y2026', label: '2026年', color: '#0B2046' },
                { key: 'avg', label: '例年', color: '#94A3B8', dashed: true },
              ]}
            />
          </Card>
          <Card title="8月末の在庫の中身" note="主要12都市、万トン。">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="py-1 text-left font-medium">区分</th>
                  <th className="py-1 text-right font-medium">2025年8月</th>
                  <th className="py-1 text-right font-medium">2026年8月</th>
                  <th className="py-1 text-right font-medium">増減</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((s) => (
                  <tr key={s.label} className="border-t border-slate-100">
                    <td className="py-2 text-slate-700">{s.label}</td>
                    <td className="py-2 text-right tabular-nums">{s.prev.toFixed(1)}</td>
                    <td className="py-2 text-right tabular-nums font-semibold text-[#0B2046]">{s.cur.toFixed(1)}</td>
                    <td className={`py-2 text-right tabular-nums ${s.diff > 0 ? 'text-red-600' : 'text-emerald-700'}`}>{signed(s.diff, 1, '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <H3>秋は、鮭鱒がやってくる</H3>
        <P>
          中身を見ると、水産の場所は前年より空いているのに、肉が多く残っています。そして秋は鮭鱒の入庫シーズン。倉庫を空けるために、肉の在庫が押し出されるかもしれません。相場は需要と供給だけでなく、倉庫の空きでも動きます。
        </P>

        <H3>倉庫の天井は、人でも決まる</H3>
        <P>では、空いている倉庫に入れればいいのか。そう簡単でもありません。</P>
        <Voice who="港湾地区の営業冷蔵庫">
          庫腹には多少の余裕があります。ただ、入出庫を行う人員が足りなくて、積極的に荷物を受けることができないんです。
        </Voice>
        <P>
          倉庫の「空き」は、棚の広さだけでは決まりません。荷物を出し入れする人の手が足りなければ、空いていても使えない。
        </P>
        <P>人手が足りないのは、日本の倉庫だけではありません。</P>
        <Voice who="輸入・国産チキン大手の営業担当者">
          中国では、焼き鳥を加工する人員が足りていません。そのため、焼き鳥の値上げ要請を受けています。
        </Voice>
        <P>
          国内でも海外でも、人手不足が大きな問題になっています。これから先、相場の天井を決めるのは、倉庫のキャパシティに加えて、作る現場と運ぶ現場、そこで働く人の数になっていきそうです。
        </P>
      </article>

      <Part>定点観測</Part>
      <section>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          毎号、同じ数字を並べます。上がったものを赤、下がったものを緑で表示しています（庫腹占有率はポイント差）。統計ごとに公表の時期が違うため、「月」は項目ごとに異なります。輸入は通関時の単価、国産の牛豚は枝肉価格（税込）、国産の鶏は卸値（税別）です。
        </p>
        <TeitenTable rows={teiten} />

        <h3 className="mt-10 mb-2 font-bold text-[#0B2046]">輸入停止・解除の動き</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          農林水産省 動物検疫所の通知（2026年8月25日〜10月30日）から。日付は通知の日です。
        </p>
        <p className="mb-2 text-sm font-bold text-[#0B2046]">
          畜肉 <span className="ml-2 text-xs font-normal text-slate-500">停止 {teishiCount('畜肉', '停止')}件・解除 {teishiCount('畜肉', '解除')}件。「家きん肉等」は、鶏・あひる・七面鳥など家きんの肉やその製品のことです。</span>
        </p>
        <TeishiTable rows={teishi.filter((r) => r.分類 === '畜肉')} />
      </section>

      <Part>畑のひとこと</Part>
      <section className="flex items-start gap-4">
        <img src="/images/tsushin/hata.png" alt="畑 拓也" width={88} height={88} className="mt-3 h-[88px] w-[88px] shrink-0 rounded-full" />
        <div>
          <P>
            <Todo>最近食べた・飲んだもの、行った場所、商談で聞いた話を、2〜3行で</Todo>
          </P>
        </div>
      </section>
    </>
  );
}
