// ギバ通信 テスト号（2026年11月）本文・英語版
// 日本語版 content.tsx と同じ構成。数字はすべて同じデータから計算する。
import LineChart from '@/components/tsushin/LineChart';
import TeitenTable from '@/components/tsushin/TeitenTable';
import TeishiTable, { TeishiRow } from '@/components/tsushin/TeishiTable';
import { Card, H3, P, Part } from '@/components/tsushin/parts';
import { ChickenRow, JarwRow, TeitenRow, chickenKpi, jarwSeason, jarwStock, pct1, signed, ymEn } from '@/tsushin/calc';
import { yenL } from '@/tsushin/i18n';
import chickenData from './chicken.json';
import jarwData from './jarw.json';
import teitenData from './teiten.json';
import teishiEnData from './teishi.en.json';

const chicken = chickenData as ChickenRow[];
const jarw = jarwData as JarwRow[];
const teiten = teitenData as TeitenRow[];
const teishi = teishiEnData as TeishiRow[];
const teishiCount = (c: string, k: string) => teishi.filter((r) => r.分類 === c && r.区分 === k).length;
const yen = yenL('en');

const TIGHT = 93; // 現場で「タイト」と感じる庫腹占有率の目安（畑さんの感覚）

export const sources = [
  'Ministry of Agriculture, Forestry and Fisheries of Japan (MAFF), Poultry Market Information; Ministry of Finance, Trade Statistics',
  'Japan Association of Refrigerated Warehouses, storage occupancy and inventory by product in 12 major cities',
  'MAFF, Meat Wholesale Market Survey (daily), Tokyo market',
  'MAFF Animal Quarantine Service, Douken NEWS (import suspensions and lifts)',
  'Bank of Japan, Services Producer Price Index; IMF primary commodity prices and exchange rates (Federal Reserve Bank of St. Louis, FRED)',
];

const B = ({ children }: { children: React.ReactNode }) => <b className="text-[#0B2046]">{children}</b>;
// 商談で聞いた話（社名は伏せる）
const Voice = ({ who, children }: { who: string; children: React.ReactNode }) => (
  <figure className="my-6 rounded-r-xl border-l-4 border-[#F09A26] bg-white px-5 py-4">
    <figcaption className="text-xs font-bold text-[#F09A26]">Heard in a business meeting｜{who}</figcaption>
    <blockquote className="m-0 mt-2 text-[15px] leading-[1.9] text-slate-700">{children}</blockquote>
  </figure>
);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const mlabel = (m: string) => `${MON[Number(m.slice(5, 7)) - 1]} ${m.slice(2, 4)}`;
const STOCK_EN: Record<string, string> = { 畜産物: 'Meat and livestock products', 冷凍水産物: 'Frozen seafood' };
const SEASON_EN: Record<string, string> = Object.fromEntries(MON.map((m, i) => [`${i + 1}月`, m]));

export default function Content() {
  const k = chickenKpi(chicken);
  const season = jarwSeason(jarw);
  const aug = season.find((s) => s.label === '8月')!;
  const stock = jarwStock(jarw, '2025-08', '2026-08');

  return (
    <>
      <Part>FROM HATA</Part>
      <section className="sm:flex sm:items-start sm:gap-4">
        <img src="/images/tsushin/hata.png" alt="Takuya Hata" width={88} height={88} className="h-16 w-16 shrink-0 rounded-full sm:mt-3 sm:h-[88px] sm:w-[88px]" />
        <div>
          <P>
            A friend of mine since junior high school runs a company that manufactures equipment. As a new business, they have developed a “hot beer server” and obtained a patent for it. The other day they had a stall at the Itami fireworks festival, so I went to try it.
          </P>
          <P>
            They were serving two flavors that day, Cherry & Berry and Lemon, and I had both. Warming the beer brings out the rich aroma of the fruit; it warmed me body and soul and was genuinely relaxing. It is sweet but not sticky — a luxurious, grown-up taste.
          </P>
          <P>
            At 5% alcohol it is very easy to drink. I would recommend it to anyone who finds mulled wine too strong and does not drink much. And I must say, a drink in the middle of the day feels great!
          </P>
          <P>
            Here is a link to the hot beer (in Japanese) in case you are interested.
            <br />
            <a href="https://www.seiwa-ic.co.jp/hotbeer/" target="_blank" rel="noopener noreferrer" className="break-all text-[#0B2046] underline">
              https://www.seiwa-ic.co.jp/hotbeer/
            </a>
          </P>
          <figure className="my-6 max-w-[260px]">
            <img src="/images/tsushin/2026-11-hotbeer.jpg" alt="Hata trying hot beer" className="w-full rounded-xl" />
            <figcaption className="mt-2 text-xs text-slate-500">Trying hot beer in Itami</figcaption>
          </figure>
        </div>
      </section>

      <Part>THIS MONTH’S STORY</Part>
      <article>
        <h2 className="text-2xl sm:text-[28px] font-bold leading-snug text-[#0B2046]">Could warehouses be setting the price ceiling?</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Are prices moved only by supply, demand and production costs? Follow chicken prices from 2025 to 2026 and another key player comes into view: cold storage capacity.
        </p>

        <H3>When thigh meat runs short, Japanese breast meat jumps</H3>
        <P>
          In 2025, avian influenza on Brazilian farms, together with Japan being outbid by other countries, suddenly tightened the supply of Brazilian thigh meat. When Brazilian and Thai thigh meat became hard to get, buyers turned to Japanese breast meat instead. The wholesale price in Tokyo rose to <B>{yen(k.munePeak)}</B> per kg in <B>{ymEn(k.munePeakMonth)}</B>. Honestly, the size of that jump surprised me.
        </P>

        <H3>When everyone moves at once, prices collapse at once</H3>
        <P>
          When prices rise, Japanese producers raise more birds and trading companies build up imported stock. It is not only about profit; it also comes from a sincere wish to avoid running out. Everyone moves “while they still can.” And every time, prices end up collapsing all together.
        </P>
        <Voice who="Sales manager, major importer and producer of chicken">
          Before this summer, I was asked whether I knew any buyers for Brazilian boneless thigh and Japanese breast meat. Many players were already dumping stock, some of them at a loss. There was no room for a small company like ours to get in.
          <br />
          When I asked, “Everyone saw this coming, didn’t they?” the sad reply was: “Even if you know, nobody can stop it.”
        </Voice>
        <P>
          Avian influenza appeared in Brazil again in 2026. Even so, Japanese breast meat kept falling, to <B>{yen(k.muneLast)}</B> in <B>{ymEn(k.lastMonth)}</B>. Meanwhile, imported Brazilian meat was <B>{k.brazilSep != null ? yen(k.brazilSep) : '—'}</B> and Thai meat <B>{k.thaiSep != null ? yen(k.thaiSep) : '—'}</B> (import unit prices, September 2026) — now more expensive than Japanese breast meat.
        </P>
        <Card
          title="Imported chicken unit prices vs. Japanese wholesale prices"
          note="JPY/kg. Imports are unit prices at customs clearance; Japanese prices are monthly averages of Tokyo wholesale prices (mid price, excl. tax). The bases differ, so look at the direction rather than the level."
        >
          <LineChart
            rows={chicken}
            xKey="month"
            xLabel={mlabel}
            yFmt={(v) => v.toLocaleString('en-US')}
            tipFmt={yen}
            ariaLabel="Imported chicken unit prices and Japanese wholesale chicken prices over time"
            series={[
              { key: '国産もも', label: 'Japan: thigh', color: '#0B2046' },
              { key: '国産むね', label: 'Japan: breast', color: '#F09A26' },
              { key: 'ブラジル産', label: 'Brazil (import)', color: '#2F7F8F' },
              { key: 'タイ産', label: 'Thailand (import)', color: '#B4533A' },
            ]}
          />
        </Card>

        <H3>Storage is not free</H3>
        <P>
          What tends to be overlooked is where the stock is kept. Frozen storage in particular is in short supply. If you hold too much stock, there is nowhere to put containers you have already contracted for when they arrive at the port. At that point, you have to sell regardless of price.
        </P>
        <P>
          This summer, I heard again and again from other players: “Contracted cargo keeps arriving, and nothing can come in unless something goes out — so we are discounting.” I also heard this from a commercial cold storage operator.
        </P>
        <Voice who="Commercial cold storage operator">
          Our warehouse is turning down all new inquiries. Some of our own customers have cargo with nowhere to go, and it is not unusual to hear of someone paying ¥1 million per container in demurrage (charges for keeping a container too long) at the container yard.
        </Voice>
        <P>This is not just a chicken story.</P>
        <Voice who="Sales manager, company handling Chinese frozen food for food service">
          Our food-service frozen food stock slowed down a little, and days of inventory doubled. Normally that number settles down with time, so we planned to wait and see. This year, though, the lack of cold storage space would not let us. We ran special prices to widen sales and only just managed to bring stock levels down.
        </Voice>
        <P>The reason for cutting prices was not that goods would not sell, but that there was nowhere to put them. Warehouse space is now forcing sellers to discount.</P>
        <P>
          Cold storage is busiest every June. That is stock built up for the Obon holidays and summer demand, so it is nothing to worry about. What matters is after the summer shipments. In August 2026, storage occupancy (how full the warehouses are) stayed at <B>{aug.y2026 != null ? pct1(aug.y2026) : '—'}</B>,{' '}
          <B>{aug.y2026 != null ? signed(aug.y2026 - aug.avg, 1, ' points') : '—'}</B> above a normal August (<B>{pct1(aug.avg)}</B>) — above the <B>{TIGHT}%</B> level where people on the ground start to call it “tight.”
        </P>
        <div>
          <Card title="Storage occupancy: 2026 vs. a normal year" note="12 major cities. Normal year = average of the same month in 2023–2025. The dashed line marks “tight.”">
            <LineChart
              rows={season.map((s) => ({ ...s, label: SEASON_EN[s.label] ?? s.label }))}
              xKey="label"
              xLabel={(v) => v}
              yFmt={(v) => `${v}%`}
              tipFmt={pct1}
              refs={[{ y: TIGHT, label: `Tight ${TIGHT}%` }]}
              ariaLabel="Storage occupancy in 2026 compared with a normal year"
              series={[
                { key: 'y2026', label: '2026', color: '#0B2046' },
                { key: 'avg', label: 'Normal year', color: '#94A3B8', dashed: true },
              ]}
            />
          </Card>
          <Card title="What was in storage at the end of August" note="12 major cities, in 10,000 tonnes.">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="py-1 text-left font-medium">Category</th>
                  <th className="py-1 text-right font-medium">Aug 2025</th>
                  <th className="py-1 text-right font-medium">Aug 2026</th>
                  <th className="py-1 text-right font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((s) => (
                  <tr key={s.label} className="border-t border-slate-100">
                    <td className="py-2 text-slate-700">{STOCK_EN[s.label] ?? s.label}</td>
                    <td className="py-2 text-right tabular-nums">{s.prev.toFixed(1)}</td>
                    <td className="py-2 text-right tabular-nums font-semibold text-[#0B2046]">{s.cur.toFixed(1)}</td>
                    <td className={`py-2 text-right tabular-nums ${s.diff > 0 ? 'text-red-600' : 'text-emerald-700'}`}>{signed(s.diff, 1, '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <H3>Autumn brings the salmon</H3>
        <P>
          Looking inside the warehouses, there is more room for seafood than last year, but a lot of meat is left over. Autumn is the season when salmon and trout come into storage. To make room, meat stocks may get pushed out. Prices move not only with supply and demand, but also with warehouse space.
        </P>

        <H3>People set the warehouse ceiling, too</H3>
        <P>So why not just use a warehouse that has space? It is not that simple.</P>
        <Voice who="Commercial cold storage operator in a port area">
          We do have some spare capacity. But we do not have enough staff to move cargo in and out, so we cannot actively take on more.
        </Voice>
        <P>Warehouse “space” is not decided by floor area alone. If there are not enough hands to move the cargo, empty space cannot be used.</P>
        <P>The labor shortage is not limited to Japanese warehouses.</P>
        <Voice who="Sales manager, major importer and producer of chicken">
          In China, there are not enough workers to process yakitori. Because of that, we have been asked to accept higher yakitori prices.
        </Voice>
        <P>
          In Japan and overseas, labor shortages have become a major problem. As the warehouse capacity issue shows, what will matter more and more in business is the places where things are made and moved — and the number of people working there.
        </P>
      </article>

      <Part>KEY FIGURES</Part>
      <section>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          The same figures in every issue. Rises are shown in red and falls in green (storage occupancy changes are in percentage points). Each statistic is published on a different schedule, so the “month” differs by item. Imports are unit prices at customs clearance; Japanese beef and pork are carcass prices (incl. tax); Japanese chicken is wholesale (excl. tax).
        </p>
        <TeitenTable rows={teiten} lang="en" />

        <h3 className="mt-10 mb-2 font-bold text-[#0B2046]">Japan’s import suspensions and lifts</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          From notices of the MAFF Animal Quarantine Service (Aug 25 – Oct 30, 2026). Dates are notice dates.
        </p>
        <p className="mb-2 text-sm font-bold text-[#0B2046]">
          Meat{' '}
          <span className="ml-2 text-xs font-normal text-slate-500">
            {teishiCount('畜肉', '停止')} suspended, {teishiCount('畜肉', '解除')} lifted. “Poultry meat, etc.” covers meat and products of chicken, duck, turkey and other poultry.
          </span>
        </p>
        <TeishiTable rows={teishi.filter((r) => r.分類 === '畜肉')} lang="en" />
      </section>
    </>
  );
}
