// ギバ通信 号外（2026年11月）海外人材を雇用・検討中の事業者さま向け
// 元資料：畑「海外人材受入れ・定着戦略レポート」（2026-11-08）を要約・図解
import { Card, H3, P, Part } from '@/components/tsushin/parts';

export const sources = [
  'アジア太平洋研究所（APIR）「人口減少下における活力ある関西を目指して～2050年を見据えて～」研究会報告書（2025年度）、および同推計の報道（2026年10月）',
  '出入国在留管理庁「特定技能1号の受入れ見込数及び在留者数について」（2026年7月末時点）、「特定技能『外食業分野』における受入れ上限の運用について」（2026年3月27日）',
  '厚生労働省「外国人労働者の労働災害発生状況」（2024年）',
  '神林龍（武蔵大学）「ワークエンゲージメントは高い しかし低下する」JP-MIRAIセミナー資料（2025年10月20日）',
];

const B = ({ children }: { children: React.ReactNode }) => <b className="text-[#0B2046]">{children}</b>;
const NAVY = '#0B2046';
const ORANGE = '#F09A26';

// 現場で聞いた話（社名は伏せる）
const Voice = ({ who, children }: { who: string; children: React.ReactNode }) => (
  <figure className="my-6 rounded-r-xl border-l-4 border-[#F09A26] bg-white px-5 py-4">
    <figcaption className="text-xs font-bold text-[#F09A26]">現場で聞いた話｜{who}</figcaption>
    <blockquote className="m-0 mt-2 text-[15px] leading-[1.9] text-slate-700">{children}</blockquote>
  </figure>
);

// ① 関西の働き手：需要と供給（2025→2050）
function GapChart() {
  const rows = [
    { y: '2025年', need: 1073, have: 1104 },
    { y: '2050年', need: 1213, have: 877 },
  ];
  const max = 1300;
  const w = (v: number) => `${(v / max) * 100}%`;
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.y}>
          <p className="mb-1 text-sm font-bold text-[#0B2046]">{r.y}</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-slate-500">必要な人</span>
              <div className="h-5 flex-1 rounded bg-slate-100">
                <div className="h-5 rounded bg-slate-400" style={{ width: w(r.need) }} />
              </div>
              <span className="w-16 shrink-0 text-right text-xs tabular-nums text-slate-600">{r.need.toLocaleString()}万人</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-slate-500">働く人</span>
              <div className="h-5 flex-1 rounded bg-slate-100">
                <div className="h-5 rounded" style={{ width: w(r.have), background: NAVY }} />
              </div>
              <span className="w-16 shrink-0 text-right text-xs tabular-nums text-slate-600">{r.have.toLocaleString()}万人</span>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg bg-[#FFF4E5] px-4 py-3 text-center">
        <p className="text-xs text-slate-600">2050年に足りなくなる働き手（関西）</p>
        <p className="text-3xl font-bold tabular-nums" style={{ color: ORANGE }}>
          336<span className="ml-1 text-base">万人</span>
        </p>
      </div>
    </div>
  );
}

// ② 特定技能1号 分野別の「埋まり具合」（2026年7月末）
const FILL = [
  { f: '外食業', r: 98.6, note: '新規の受け入れを停止中' },
  { f: '飲食料品製造業', r: 76.3, note: '残り約3.2万人。今のペースで2年足らず' },
  { f: '建設', r: 68.9 },
  { f: '介護', r: 64.2 },
  { f: '農業', r: 61.3 },
  { f: 'ビルクリーニング', r: 32.7 },
  { f: '工業製品製造業', r: 31.6 },
  { f: '自動車運送業', r: 3.2, note: '立ち上がったばかり' },
];
function FillChart() {
  const color = (r: number) => (r >= 90 ? '#DC2626' : r >= 70 ? ORANGE : '#94A3B8');
  return (
    <div className="space-y-2.5">
      {FILL.map(({ f, r, note }) => (
        <div key={f}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-bold text-[#0B2046]">{f}</span>
            <span className="tabular-nums font-bold" style={{ color: color(r) }}>
              {r.toFixed(1)}%
            </span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full" style={{ width: `${r}%`, background: color(r) }} />
          </div>
          {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
        </div>
      ))}
    </div>
  );
}

// ③ ワーク・エンゲージメントの下がり方（来日時を0として）
function EngageChart() {
  const W = 600;
  const H = 280;
  const L = 64;
  const R = 20;
  const T = 40;
  const Bm = 48;
  const x = (yr: number) => L + (yr / 5) * (W - L - R);
  const y = (d: number) => T + (-d / 2.2) * (H - T - Bm);
  const pts = [0, 1, 2, 3, 4, 5].map((yr) => [x(yr), y(-0.4 * yr)]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="ワーク・エンゲージメントは1年に約0.4ポイントずつ下がり、4〜5年で日本人並みになる">
      {[0, -1.0, -2.0].map((d) => (
        <g key={d}>
          <line x1={L} x2={W - R} y1={y(d)} y2={y(d)} stroke="#E2E8F0" />
          <text x={L - 8} y={y(d) + 4} fontSize="20" textAnchor="end" fill="#64748B">
            {d === 0 ? '0' : d.toFixed(1)}
          </text>
        </g>
      ))}
      <rect x={x(4)} y={T} width={x(5) - x(4)} height={H - T - Bm + 6} fill="#FFF4E5" />
      <text x={(x(4) + x(5)) / 2} y={T - 14} fontSize="20" textAnchor="middle" fill={ORANGE} fontWeight="bold">
        日本人並みに
      </text>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={NAVY} strokeWidth="3" />
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={i === 1 || i === 3 ? 5 : 3.5} fill={i === 1 || i === 3 ? ORANGE : NAVY} />
      ))}
      <text x={x(1) + 8} y={y(-0.4) - 8} fontSize="20" fill={NAVY}>1年目 −0.4</text>
      <text x={x(3) + 8} y={y(-1.2) - 8} fontSize="20" fill={NAVY}>3年目 −1.2</text>
      {[0, 1, 2, 3, 4, 5].map((yr) => (
        <text key={yr} x={x(yr)} y={H - Bm + 30} fontSize="20" textAnchor="middle" fill="#64748B">
          {yr === 0 ? '来日' : `${yr}年`}
        </text>
      ))}
    </svg>
  );
}

const CAUSES = [
  { n: '1', t: '給料・労働時間', d: '十分な給与や、約束した労働時間が確保されない' },
  { n: '2', t: '仕事の中身', d: '仕事に興味が持てない。自分の力が生かされている実感がない' },
  { n: '3', t: '職場の人', d: '教えてくれるベテランがいなくなった。頑張っても昇進できそうにない' },
  { n: '4', t: '日本語', d: '日本語を伸ばす動機づけ（検定の合格など）がない' },
];

// ④ 労災の起きやすさ（死傷年千人率、2024年）
const RISK = [
  { k: '技能実習', v: 3.98 },
  { k: '特定技能', v: 3.91 },
  { k: '身分に基づく在留資格', v: 3.63 },
  { k: '外国人労働者 全体', v: 2.71 },
  { k: 'すべての労働者', v: 2.3, base: true },
];
function RiskChart() {
  return (
    <div className="space-y-2.5">
      {RISK.map(({ k, v, base }) => (
        <div key={k} className="flex items-center gap-2">
          <span className="w-36 shrink-0 text-xs text-slate-600 sm:w-44">{k}</span>
          <div className="h-5 flex-1 rounded bg-slate-100">
            <div className="h-5 rounded" style={{ width: `${(v / 4.5) * 100}%`, background: base ? '#94A3B8' : ORANGE }} />
          </div>
          <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-[#0B2046]">{v.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

const CHECK = [
  { t: '約束どおりの条件', d: '採用時に伝えた仕事・給料・労働時間を、そのとおりに守っている。昇給の道すじを見せている' },
  { t: '任せる仕事', d: '補助作業だけでなく、改善や安全の役割を少しずつ任せている' },
  { t: '教える人', d: '相談できる日本人の先輩がいる。その先輩が辞めたときの次の担当も決めている' },
  { t: '日本語', d: '日本語の検定に合格したら、手当や受験料補助などで報いている' },
  { t: '安全', d: '安全の教え方を、写真・図・動画・母国語で「伝わったか」まで確かめている' },
];

export default function Content() {
  return (
    <>
      <Part>畑のつぶやき</Part>
      <section className="sm:flex sm:items-start sm:gap-4">
        <img src="/images/tsushin/hata.png" alt="畑 拓也" width={88} height={88} className="h-16 w-16 shrink-0 rounded-full sm:mt-3 sm:h-[88px] sm:w-[88px]" />
        <div>
          <P>
            いつものギバ通信とは別に、号外をお届けします。今回は、海外人材を雇っている方、これから考えている方だけにお送りしています。
          </P>
          <P>
            先日、大阪で飲食店を何店舗か経営されている社長さんの、社内の定例ミーティングに同席させていただきました。ミャンマーから来たスタッフが2人働いています。社長さんは、言葉の壁や考え方の違いでの苦労をひとしきり話されたあと、こう言いました。
          </P>
          <P>
            <B>「でも、おおかたの日本人よりも遥かに頼りになるというのが正直な気持ち。あの2人がシフトに入っている時は安心できる」</B>
          </P>
          <P>
            この一言に、今回お伝えしたいことがほとんど詰まっている気がします。
          </P>
        </div>
      </section>

      <Part>今号の一本</Part>
      <article>
        <h2 className="text-2xl sm:text-[28px] font-bold leading-snug text-[#0B2046]">
          海外人材は「やるか、やらないか」から
          <br className="hidden sm:block" />
          「取るか、取られるか」へ
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          受け入れの枠は、分野によってはもう満員です。これからは「新しく呼ぶ」より「来てくれた人に長くいてもらう」ほうが、ずっと大事になりそうです。数字で見てみます。
        </p>

        <H3>2050年、関西で336万人が足りなくなる</H3>
        <P>
          アジア太平洋研究所（APIR）の推計では、今の流れが続くと、関西の働き手は2029年ごろから足りなくなり始め、<B>2050年には336万人</B>不足します。働く人が減る一方で、高齢化で介護や医療の仕事は増えるからです。
        </P>
        <Card title="関西の働き手：必要な人数と働く人の数" note="APIRの推計（2026年10月の報道による）。単位は万人。">
          <GapChart />
        </Card>
        <P>
          同じ推計は、賃上げや生産性の向上を見込んでも不足は解消しきれず、外国人の受け入れを増やすだけでも埋めきれない、としています。海外人材は「大きな助け」ですが、「それだけで解決する」ものではない、ということです。
        </P>

        <H3>受け入れの枠は、分野によってはもう満員</H3>
        <P>
          特定技能1号には、分野ごとに「ここまで」という受け入れの上限があります。上限を超えそうになると、海外からの新しい受け入れが止まる仕組みです。実際に<B>外食業は2026年4月13日から、海外からの新規の受け入れが止まりました</B>。
        </P>
        <Card title="特定技能1号　分野ごとの埋まり具合" note="2026年7月末の在留者数 ÷ 2029年3月末までの受け入れ見込数。出入国在留管理庁の公表資料から。">
          <FillChart />
        </Card>
        <P>
          次に気になるのが、<B>飲食料品製造業（76.3%）</B>です。残りの枠は約3.2万人。ここ1年の増え方が続くと、2年足らずで埋まる計算です。医療・福祉施設の給食が外食業からこちらへ移ってきたこともあり、枠の減り方は速くなっています。一方で、物流倉庫や自動車運送業はまだ始まったばかりで、枠に余裕があります。
        </P>

        <H3>海外から呼べないなら、国内で取り合いになる</H3>
        <P>
          海外から新しく呼べなくなると、すでに日本にいる人の取り合いが始まります。特定技能の人は、同じ分野の中なら転職ができます。給料の引き上げ合戦や紹介手数料で、採用コストは上がっていくかもしれません。
        </P>
        <P>
          ここで、関西の事業者さんには一つ強みがあります。働く人は、地方より都市を選びやすい。<B>関西の都市圏にあるという立地は、それだけで選ばれる理由になります</B>。あとは、来てくれた人が「ここで長く働きたい」と思えるかどうかです。
        </P>

        <H3>来日したてが、いちばん熱い</H3>
        <P>
          武蔵大学の神林龍教授が、技能実習生・特定技能の人を同じ人で追いかけた調査（398人）があります。仕事への「活力・熱意・没頭」を測るワーク・エンゲージメントは、<B>来日したてがいちばん高く、日本人よりずっと高い</B>。ところが、平均すると<B>1年に約0.4ポイントずつ下がり、4〜5年で日本人並み</B>になってしまうそうです。
        </P>
        <Card title="ワーク・エンゲージメントの下がり方" note="来日時を0とした目安（0〜6点の尺度）。神林教授の分析（年−0.4ポイント）をもとに作図。上がる人もいれば、下がる人もいます。">
          <EngageChart />
        </Card>
        <P>下がった人には、共通する理由がありました。</P>
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {CAUSES.map((c) => (
            <div key={c.n} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: NAVY }}>
                {c.n}
              </span>
              <div>
                <p className="text-sm font-bold text-[#0B2046]">{c.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
        <P>
          逆に言えば、この4つに手を打てば、高いやる気を保てるということです。エンゲージメントが高い人ほど仕事に満足し、「同じ会社で働き続けたい」と考える傾向も確かめられています。神林教授は、<B>問題は制度の作りよりも、人事管理、つまり経営の側にある</B>と結んでいます。冒頭の社長さんの「あの2人なら安心」は、まさにこの状態なのだと思います。
        </P>

        <H3>安全は、定着の土台</H3>
        <P>
          もう一つ、見過ごせない数字があります。2024年に仕事中のけがや事故で亡くなったり、4日以上休んだりした外国人労働者は<B>6,244人</B>。初めて6,000人を超え、亡くなった方は39人でした。
        </P>
        <Card title="労働災害の起きやすさ（2024年）" note="働く人1,000人あたりの死傷者数（死傷年千人率）。厚生労働省の集計から。">
          <RiskChart />
        </Card>
        <P>
          技能実習や特定技能の人は、全体の平均より7割ほど高くなっています。厚生労働省は、安全教育が足りないことや、言葉が伝わっていないことが背景にあるとみています。フォークリフトや機械を使う現場では、マニュアルを渡すだけでなく、写真や動画、母国語で「伝わったか」まで確かめることが、人を守り、長くいてもらうことにつながります。
        </P>

        <H3>まずは5つ、点検してみませんか</H3>
        <div className="my-6 rounded-xl border-2 border-[#F09A26] bg-white p-5">
          <p className="font-bold text-[#0B2046]">「長くいてもらえる職場」チェック</p>
          <ul className="mt-3 space-y-3">
            {CHECK.map((c) => (
              <li key={c.t} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#F09A26]" />
                <p className="text-sm leading-relaxed text-slate-700">
                  <b className="text-[#0B2046]">{c.t}：</b>
                  {c.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <P>
          海外人材は「やるか、やらないか」を迷う段階を過ぎ、「取るか、取られるか」の段階に入ったように思います。取る力は立地と条件で、取られない力は職場づくりで決まります。冒頭の社長さんのように、苦労しながらも「あの人たちがいると安心」と言える職場が、これから一番強いのかもしれません。
        </P>
        <p className="mt-8 rounded-lg bg-slate-100 p-4 text-sm leading-relaxed text-slate-700">
          JCSギバでは仲間とともに、2027年春の設立に向けて「クレセント協同組合（仮称）」を兵庫県西宮市で準備しています。受け入れから定着まで、関西の事業者さんと一緒に考える場にしたいと思っています。
          <a href="/ja/crescent" target="_blank" rel="noopener" className="ml-1 text-[#0B2046] underline">
            設立準備室のページ →
          </a>
        </p>
      </article>
    </>
  );
}
