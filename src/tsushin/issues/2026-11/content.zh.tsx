// ギバ通信 テスト号（2026年11月）本文・中国語（簡体字）版
// 日本語版 content.tsx と同じ構成。数字はすべて同じデータから計算する。
import LineChart from '@/components/tsushin/LineChart';
import TeitenTable from '@/components/tsushin/TeitenTable';
import TeishiTable, { TeishiRow } from '@/components/tsushin/TeishiTable';
import { Card, H3, P, Part } from '@/components/tsushin/parts';
import { ChickenRow, JarwRow, TeitenRow, chickenKpi, jarwSeason, jarwStock, pct1, signed, ym } from '@/tsushin/calc';
import { yenL } from '@/tsushin/i18n';
import chickenData from './chicken.json';
import jarwData from './jarw.json';
import teitenData from './teiten.json';
import teishiZhData from './teishi.zh.json';

const chicken = chickenData as ChickenRow[];
const jarw = jarwData as JarwRow[];
const teiten = teitenData as TeitenRow[];
const teishi = teishiZhData as TeishiRow[];
const teishiCount = (c: string, k: string) => teishi.filter((r) => r.分類 === c && r.区分 === k).length;
const yen = yenL('zh');

const TIGHT = 93; // 現場で「タイト」と感じる庫腹占有率の目安（畑さんの感覚）

export const sources = [
  '日本农林水产省《禽类市场行情信息》、日本财务省《贸易统计》',
  '日本冷藏仓库协会《主要12城市受托物品库容利用・分品类库存》',
  '日本农林水产省《肉类批发市场调查（日别）》（东京市场）',
  '日本农林水产省 动物检疫所《动检NEWS》（进口暂停・解除信息）',
  '日本银行《企业服务价格指数》、IMF初级产品价格・汇率（美国圣路易斯联储 FRED）',
];

const B = ({ children }: { children: React.ReactNode }) => <b className="text-[#0B2046]">{children}</b>;
// 商談で聞いた話（社名は伏せる）
const Voice = ({ who, children }: { who: string; children: React.ReactNode }) => (
  <figure className="my-6 rounded-r-xl border-l-4 border-[#F09A26] bg-white px-5 py-4">
    <figcaption className="text-xs font-bold text-[#F09A26]">商谈中听到的话｜{who}</figcaption>
    <blockquote className="m-0 mt-2 text-[15px] leading-[1.9] text-slate-700">{children}</blockquote>
  </figure>
);
const mlabel = (m: string) => `${m.slice(2, 4)}/${m.slice(5, 7)}`;
const STOCK_ZH: Record<string, string> = { 畜産物: '畜产品', 冷凍水産物: '冷冻水产品' };

export default function Content() {
  const k = chickenKpi(chicken);
  const season = jarwSeason(jarw);
  const aug = season.find((s) => s.label === '8月')!;
  const stock = jarwStock(jarw, '2025-08', '2026-08');

  return (
    <>
      <Part>畑的随笔</Part>
      <section className="sm:flex sm:items-start sm:gap-4">
        <img src="/images/tsushin/hata.png" alt="畑 拓也" width={88} height={88} className="h-16 w-16 shrink-0 rounded-full sm:mt-3 sm:h-[88px] sm:w-[88px]" />
        <div>
          <P>
            我有一位从中学时代就认识的朋友，经营着一家制造设备机器的公司。他们在新业务中开发了一款“热啤酒机”，并取得了专利。前些天，伊丹举办烟花大会时他们在现场摆摊，我便去试饮了一下。
          </P>
          <P>
            当天出售的是樱桃＆莓果和柠檬两种口味，我两种都尝了。加热之后，水果浓郁的香气更加突出，让人身心温暖，有一种被治愈的感觉。虽然有甜味，却一点也不黏腻，是适合成年人的奢华风味。
          </P>
          <P>
            酒精度数是5度，非常好入口。对于觉得“热红酒酒精度太高”、不太擅长喝酒的人，也很推荐这一杯。话说回来，白天喝酒的感觉真不错！
          </P>
          <P>
            附上热啤酒的链接（日文）供参考，有兴趣的朋友可以看看。
            <br />
            <a href="https://www.seiwa-ic.co.jp/hotbeer/" target="_blank" rel="noopener noreferrer" className="break-all text-[#0B2046] underline">
              https://www.seiwa-ic.co.jp/hotbeer/
            </a>
          </P>
          <figure className="my-6 max-w-[260px]">
            <img src="/images/tsushin/2026-11-hotbeer.jpg" alt="试饮热啤酒的畑" className="w-full rounded-xl" />
            <figcaption className="mt-2 text-xs text-slate-500">在伊丹试饮热啤酒</figcaption>
          </figure>
        </div>
      </section>

      <Part>本期主题</Part>
      <article>
        <h2 className="text-2xl sm:text-[28px] font-bold leading-snug text-[#0B2046]">行情的天花板，也许是由仓库决定的？</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          价格只是由供需平衡和生产成本决定的吗？追踪2025年到2026年的鸡肉价格走势，会发现另一个主角——冷库的“容量”。
        </p>

        <H3>鸡腿肉一缺，日本产鸡胸肉就涨</H3>
        <P>
          2025年，巴西的养鸡场发生禽流感，加上在价格上竞争不过其他国家，巴西产鸡腿肉的供需突然变得紧张。巴西产、泰国产的鸡腿肉难以买到后，被拿来替代的是日本产的鸡胸肉。东京的批发价在
          <B>{ym(k.munePeakMonth)}</B>涨到了<B>{yen(k.munePeak)}</B>（每公斤）。说实话，涨幅之大令人吃惊。
        </P>

        <H3>大家一起行动，每次都一起崩盘</H3>
        <P>价格一上涨，日本国内的生产者就增加养殖羽数，商社就囤积进口鸡肉库存。这不只是为了赚钱，也是出于不想断货的诚意。人人都想“趁现在”行动。结果每一次，价格都必然一起崩盘。</P>
        <Voice who="进口・日本产鸡肉大企业的销售负责人">
          今年夏天之前，有人来问我：“有没有巴西产去骨鸡腿肉和日本产鸡胸肉的销路？”当时已经有很多企业在抛售库存，其中甚至有亏本卖的。像我们这样的小公司，没有新插进去的余地。
          <br />
          我问：“会变成这样，大家其实都知道吧？”得到的回答却令人心酸：“就算知道，谁也停不下来。”
        </Voice>
        <P>
          2026年巴西也出现了禽流感。尽管如此，日本产鸡胸肉仍在持续下跌，<B>{ym(k.lastMonth)}</B>为<B>{yen(k.muneLast)}</B>
          。而进口货方面，巴西产为<B>{k.brazilSep != null ? yen(k.brazilSep) : '—'}</B>，泰国产为
          <B>{k.thaiSep != null ? yen(k.thaiSep) : '—'}</B>（均为2026年9月的进口单价），反而比日本产鸡胸肉还贵。
        </P>
        <Card
          title="进口鸡肉单价与日本产鸡肉批发价"
          note="日元/kg。进口为通关时的单价，日本产为东京批发价（中间价・不含税）的月平均。两者基准不同，请看走势而不是绝对水平。"
        >
          <LineChart
            rows={chicken}
            xKey="month"
            xLabel={mlabel}
            yFmt={(v) => v.toLocaleString('ja-JP')}
            tipFmt={yen}
            ariaLabel="进口鸡肉单价与日本产鸡肉批发价的走势"
            series={[
              { key: '国産もも', label: '日本产鸡腿肉', color: '#0B2046' },
              { key: '国産むね', label: '日本产鸡胸肉', color: '#F09A26' },
              { key: 'ブラジル産', label: '巴西产（进口）', color: '#2F7F8F' },
              { key: 'タイ産', label: '泰国产（进口）', color: '#B4533A' },
            ]}
          />
        </Card>

        <H3>保管，不是免费的</H3>
        <P>
          容易被忽视的，是放库存的地方。尤其是冷冻仓库不够用。库存囤得太多，已经签约的集装箱到了港口也没地方放。到了那一步，不管价格高低都只能出货。
        </P>
        <P>
          今年夏天，我也多次从其他企业那里听到：“已签约的货一批接一批地进来，不出库就放不进去，所以只能降价。”从营业冷库那边，还听到过这样的话。
        </P>
        <Voice who="营业冷库">
          我们仓库现在新的咨询一律谢绝。我们的货主当中也积压着没有去处的货物，在集装箱堆场每个集装箱付了100万日元滞箱费（集装箱超期使用费）的事，并不少见。
        </Voice>
        <P>这不只是鸡肉的问题。</P>
        <Voice who="经营中国产业务用冷冻食品的公司的销售负责人">
          业务用冷冻食品的库存有些滞销，库存天数变成了平时的两倍左右。往常这个数字过一段时间就会自然回落，所以本来打算观望。可是今年，冷库的空位不允许我们这样做。我们只好推出特价扩大销售，才勉强把库存量调整下来。
        </Voice>
        <P>降价的理由不是卖不掉，而是放不下。仓库的空位，正在逼着卖方降价。</P>
        <P>
          冷库每年6月最拥挤。这是为盂兰盆节和夏季需求做的备货，不必担心。要关注的是夏季出货结束之后。2026年8月的库容占用率（仓库的拥挤程度）为
          <B>{aug.y2026 != null ? pct1(aug.y2026) : '—'}</B>，比往年8月（<B>{pct1(aug.avg)}</B>）高出
          <B>{aug.y2026 != null ? signed(aug.y2026 - aug.avg, 1, '个百分点') : '—'}</B>，一直居高不下，超过了现场感觉“紧张”的<B>{TIGHT}%</B>
          。
        </P>
        <div>
          <Card title="库容占用率：2026年与往年" note="主要12城市。往年为2023〜2025年同月的平均。虚线为“紧张”的参考线。">
            <LineChart
              rows={season}
              xKey="label"
              xLabel={(v) => v}
              yFmt={(v) => `${v}%`}
              tipFmt={pct1}
              refs={[{ y: TIGHT, label: `紧张 ${TIGHT}%` }]}
              ariaLabel="库容占用率2026年与往年的比较"
              series={[
                { key: 'y2026', label: '2026年', color: '#0B2046' },
                { key: 'avg', label: '往年', color: '#94A3B8', dashed: true },
              ]}
            />
          </Card>
          <Card title="8月末库存的构成" note="主要12城市，单位：万吨。">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="py-1 text-left font-medium">类别</th>
                  <th className="py-1 text-right font-medium">2025年8月</th>
                  <th className="py-1 text-right font-medium">2026年8月</th>
                  <th className="py-1 text-right font-medium">增减</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((s) => (
                  <tr key={s.label} className="border-t border-slate-100">
                    <td className="py-2 text-slate-700">{STOCK_ZH[s.label] ?? s.label}</td>
                    <td className="py-2 text-right tabular-nums">{s.prev.toFixed(1)}</td>
                    <td className="py-2 text-right tabular-nums font-semibold text-[#0B2046]">{s.cur.toFixed(1)}</td>
                    <td className={`py-2 text-right tabular-nums ${s.diff > 0 ? 'text-red-600' : 'text-emerald-700'}`}>{signed(s.diff, 1, '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <H3>秋天，鲑鳟鱼要来了</H3>
        <P>
          看库存构成会发现，水产的位置比去年空，肉类却剩得很多。而秋天正是鲑鳟鱼的入库季节。为了腾出仓库，肉类库存可能会被挤出来。行情不只随供需变动，也随仓库的空位变动。
        </P>

        <H3>仓库的天花板，也由人决定</H3>
        <P>那么，放进有空位的仓库不就行了吗？事情也没那么简单。</P>
        <Voice who="港区的营业冷库">
          库容还有一些余量。但是负责出入库的人手不够，没办法积极接货。
        </Voice>
        <P>
          仓库的“空位”，不只由空间大小决定。如果搬运货物的人手不够，即使有空位也用不上。
        </P>
        <P>人手不足，不只是日本仓库的问题。</P>
        <Voice who="进口・日本产鸡肉大企业的销售负责人">
          在中国，加工烤鸡串的人手不够。因此，我们收到了烤鸡串涨价的要求。
        </Voice>
        <P>
          无论国内还是海外，人手不足都已成为重大问题。今后在商业上受到重视的，正如仓库容量问题所显示的那样，将会是生产现场和运输现场，以及在那里工作的人数。
        </P>
      </article>

      <Part>定点观测</Part>
      <section>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          每期列出同样的数字。上涨的标红，下跌的标绿（库容占用率为百分点差）。各项统计的发布时间不同，因此“月份”因项目而异。进口为通关时的单价，日本产牛肉・猪肉为胴体价格（含税），日本产鸡肉为批发价（不含税）。
        </p>
        <TeitenTable rows={teiten} lang="zh" />

        <h3 className="mt-10 mb-2 font-bold text-[#0B2046]">日本进口暂停・解除动态</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          根据日本农林水产省动物检疫所的通知（2026年8月25日〜10月30日）。日期为通知日期。
        </p>
        <p className="mb-2 text-sm font-bold text-[#0B2046]">
          畜肉 <span className="ml-2 text-xs font-normal text-slate-500">暂停 {teishiCount('畜肉', '停止')}件・解除 {teishiCount('畜肉', '解除')}件。“禽肉等”是指鸡、鸭、火鸡等家禽的肉及其制品。</span>
        </p>
        <TeishiTable rows={teishi.filter((r) => r.分類 === '畜肉')} lang="zh" />
      </section>
    </>
  );
}
