import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONTACT_EMAIL } from '@/lib/contact';
import { Todo } from '@/components/tsushin/parts';

// お悩み在庫買い取り事業（株式会社フレックスとの連携）の紹介ページ。当面日本語のみ。

type Props = { params: { locale: string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'ja' }];
}

export const metadata: Metadata = {
  title: 'お悩み在庫の一括買い取り | 合同会社JCSギバ',
  description:
    '過剰在庫・季節品・ロットアウト・賞味期限期近品・製造端材・規格外品を一括で買い取り査定。お弁当屋さんなどの業務筋へ販売するため、特価の情報が漏れにくく、ブランド価値と市場価格を守れます。株式会社フレックスと連携。',
};

const ITEMS = [
  ['過剰在庫', '見込みより売れず、倉庫に残っている'],
  ['季節品', 'シーズンが終わり、来年まで持てない'],
  ['ロットアウト', '規格変更・終売で、行き場がなくなった'],
  ['賞味期限期近', '納品期限を過ぎ、通常ルートに出せない'],
  ['製造端材', 'カットや成形で出る端材・切り落とし'],
  ['規格外（B級品）', '形・サイズ・印字などで規格から外れた'],
];

const STEPS = [
  ['ご相談', 'メールで、品名・数量・賞味期限・保管場所と温度帯を教えてください。写真や規格書があれば添えてください。'],
  ['査定・お見積り', 'まとまった数量でも、一括で査定してお見積りします。'],
  ['お引き取り', 'フレックスの専用倉庫へ一括で納品いただきます。'],
  ['業務筋へ販売', 'お弁当屋さんなどの業務筋で、調理・加工されて消費されます。'],
];

const mailto = (() => {
  const subject = '【在庫買い取りのご相談】';
  const body = '会社名：\nお名前：\nお電話番号：\n\n品名：\n数量：\n賞味期限：\n保管場所・温度帯（冷凍／冷蔵／常温）：\nご希望の時期：\n\n※写真や規格書があれば添付してください。';
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();

const Section = ({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) => (
  <section className="mx-auto max-w-4xl px-5 py-14">
    <p className="text-xs font-bold tracking-[0.2em] text-[#F09A26]">{tag}</p>
    <h2 className="mt-2 text-2xl font-bold text-[#0B2046]">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const ContactButton = () => (
  <a
    href={mailto}
    className="inline-flex items-center justify-center rounded-full bg-[#F09A26] px-8 py-3.5 text-sm font-bold tracking-wider text-white shadow-md hover:bg-[#d6851f]"
  >
    メールで相談する
  </a>
);

export default function KaitoriPage({ params }: Props) {
  if (params.locale !== 'ja') notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="h-1.5 w-full bg-[#F09A26]" />
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href={`/${params.locale}`} className="text-sm font-bold text-[#0B2046]">
            合同会社JCSギバ
          </Link>
          <a href={mailto} className="text-xs font-bold text-[#F09A26]">
            ご相談はこちら
          </a>
        </div>
      </header>

      <main>
        {/* ヒーロー */}
        <section className="bg-[#0B2046] text-white">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
            <p className="text-xs font-bold tracking-[0.2em] text-[#F09A26]">お悩み在庫 一括買い取り</p>
            <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
              食品在庫のお悩み、
              <br />
              <span className="text-[#F09A26]">「一括買い取り」</span>で解決します。
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              ブランド価値と市場価格を守りながら、大切な商品を独自の業務筋ルートへつなぎます。
            </p>
            <div className="mt-8">
              <ContactButton />
            </div>
          </div>
        </section>

        {/* 対象 */}
        <Section tag="こんな在庫はありませんか" title="買い取りの対象">
          <div className="grid gap-3 sm:grid-cols-3">
            {ITEMS.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-[#0B2046]">{t}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            <Todo>対象の温度帯（冷凍のみ／冷蔵・常温も可）と、最低ロットの目安があれば</Todo>
          </p>
        </Section>

        {/* 強み */}
        <div className="border-y border-slate-200 bg-white">
          <Section tag="2つの強み" title="価格を崩さず、まとめて片付く">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F8FAFC] p-6">
                <p className="text-xs font-bold text-[#F09A26]">POINT 01</p>
                <p className="mt-2 text-lg font-bold text-[#0B2046]">一括で買い取り査定</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  まとまった数量の商品も、一括で買い取り査定します。倉庫の保管スペースの圧迫や管理コストといったお悩みを、スピーディーに解消します。
                </p>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-6">
                <p className="text-xs font-bold text-[#F09A26]">POINT 02</p>
                <p className="mt-2 text-lg font-bold text-[#0B2046]">30年以上かけて築いた販売ルート</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  販売先は、主にお弁当屋さんなどの業務筋です。一般の小売市場にそのまま出回らないため、特価の情報が漏れにくい販売先です。
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl border-l-4 border-[#F09A26] bg-amber-50 p-5">
              <p className="font-bold text-[#0B2046]">なぜ「特価の情報が漏れにくい」のか</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                業務筋に販売された商品は、最終消費者には調理・加工された形で届きます。一般の小売店やネット通販にそのまま並ばないため、既存の取引先や市場に特価の情報が広まるリスクを抑え、貴社のブランド価値と価格体系を守りながら在庫を消化できます。
              </p>
            </div>
          </Section>
        </div>

        {/* 流れ */}
        <Section tag="ご相談の流れ" title="メール1通から始められます">
          <ol className="grid gap-3 sm:grid-cols-4 list-none p-0">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold text-[#F09A26]">STEP {String(i + 1).padStart(2, '0')}</p>
                <p className="mt-1 font-bold text-[#0B2046]">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-slate-600">
            <Todo>お支払いの条件やスピード（「即日」など）を書くなら、ここに</Todo>
          </p>
        </Section>

        {/* 体制 */}
        <div className="border-y border-slate-200 bg-white">
          <Section tag="体制" title="株式会社フレックスと連携しています">
            <div className="grid gap-6 sm:grid-cols-[2fr_3fr]">
              <dl className="text-sm">
                {[
                  ['買い取り', '株式会社フレックス'],
                  ['本社', '愛媛県今治市'],
                  ['営業所', '香川県丸亀市'],
                  ['主な販売先', '香川・関西方面の弁当・惣菜製造業者'],
                  ['窓口', '関西支店長　畑 拓也（合同会社JCSギバ 代表社員）'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 border-b border-slate-100 py-2">
                    <dt className="w-24 shrink-0 text-slate-500">{k}</dt>
                    <dd className="text-[#0B2046]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm leading-relaxed text-slate-700">
                ご相談の窓口は、JCSギバ代表の畑が務めます。畑は大手コンビニチェーン本部で9年、食品専門商社で19年、業務用冷凍食品の商品開発・海外調達・営業に携わってきました。メーカー側の事情も、売り場側の事情もわかったうえで、無理のない出口を一緒に考えます。
              </p>
            </div>
          </Section>
        </div>

        {/* 問い合わせ */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#0B2046]">まずはお気軽にご相談ください</h2>
          <p className="mt-3 text-sm text-slate-600">「この量でも大丈夫？」「こんな品でも？」という段階でも構いません。</p>
          <div className="mt-8">
            <ContactButton />
          </div>
          <p className="mt-4 text-sm text-slate-600">
            メール：
            <a className="underline" href={mailto}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </main>

      <footer className="bg-[#0B2046] py-8 text-center text-xs text-slate-300">
        <Link href={`/${params.locale}`} className="hover:text-white">
          合同会社JCSギバ
        </Link>
        　｜　大阪市北区梅田
      </footer>
    </div>
  );
}
