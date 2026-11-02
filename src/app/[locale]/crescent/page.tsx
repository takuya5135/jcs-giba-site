import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONTACT_EMAIL } from '@/lib/contact';

// クレセント協同組合（仮称）設立準備室の紹介ページ。リーフレットの内容に沿う。当面日本語のみ。

type Props = { params: { locale: string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'ja' }];
}

export const metadata: Metadata = {
  title: 'クレセント協同組合（仮称）設立準備室 | 寄り添い、支える',
  description:
    '2027年春 設立予定。育成就労監理支援機関・特定技能登録支援機関として、人と企業に寄り添い、支え続ける組合を目指します。兵庫県西宮市。',
};

const BG = '#F4F3EF';
const serif = { fontFamily: '"Hiragino Mincho ProN","Yu Mincho","YuMincho","Noto Serif JP",serif' };

const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('【クレセント協同組合（仮称）へのお問い合わせ】')}&body=${encodeURIComponent(
  '会社名：\nお名前：\nお電話番号：\n\nお問い合わせ内容：\n',
)}`;

const PEOPLE = [
  {
    name: '山本 健一朗',
    role: '代表理事予定',
    img: '/images/crescent/yamamoto.jpg',
    text: '1975年生まれ。大手金融、人材サービス業界でキャリアを積んだ後に独立。「お悩み解決がビジネスの原理原則」、圧倒的当事者意識と執念をもって解決まで伴走します！',
  },
  {
    name: '畑 拓也',
    role: '理事予定',
    img: '/images/crescent/hata.jpg',
    text: '1975年生まれ。流通・食品業界で28年キャリアを積んだ後に独立。食品に関わる現場を見続けて「人手不足を制する者は、ビジネスを制す」との気づきを得て、この業界へ飛び込む事を決意しました。',
  },
];

export default function CrescentPage({ params }: Props) {
  if (params.locale !== 'ja') notFound();

  return (
    <div className="min-h-screen text-[#2B2B2B]" style={{ background: BG }}>
      <header className="border-b border-[#E3DFD5]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <p className="text-sm" style={serif}>
            クレセント協同組合（仮称）設立準備室
          </p>
          <a href={mailto} className="text-xs font-bold text-[#B9822E]">
            お問い合わせ
          </a>
        </div>
      </header>

      <main>
        {/* ヒーロー */}
        <section className="mx-auto max-w-4xl px-5 pt-14 text-center">
          <p className="text-base text-[#555]" style={serif}>
            2027年春 設立予定
          </p>
          <p className="mt-2 text-xl sm:text-2xl" style={serif}>
            クレセント協同組合（仮称）
            <br />
            設立準備室
          </p>
          <h1 className="mt-10 text-5xl tracking-wider sm:text-6xl" style={serif}>
            寄り添い、支える
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-loose sm:text-lg" style={serif}>
            すべての人が才能を開花させ、輝きを放ち続けられるように、
            <br className="hidden sm:inline" />
            人と企業に寄り添い、支え続ける組合を目指します。
          </p>
          <img src="/images/crescent/hand.jpg" alt="" className="mx-auto mt-6 w-full max-w-md mix-blend-multiply" />
        </section>

        {/* 何をする組合か */}
        <section className="mx-auto max-w-3xl px-5 py-14">
          <div className="rounded-2xl border border-[#E3DFD5] bg-white/60 p-6 sm:p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#B9822E]">ABOUT</p>
            <h2 className="mt-2 text-2xl" style={serif}>
              育成就労監理支援機関・特定技能登録支援機関
            </h2>
            <p className="mt-4 text-sm leading-loose text-[#444]">
              外国人材を受け入れる企業と、日本で働く人の両方に寄り添い、受け入れの準備から就労中の支援までを支えます。2027年に始まる育成就労制度への移行も、一緒に備えます。
            </p>
            <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
              <dt className="text-[#777]">名称</dt>
              <dd>クレセント協同組合（仮称）</dd>
              <dt className="text-[#777]">区分</dt>
              <dd>育成就労監理支援機関・特定技能登録支援機関</dd>
              <dt className="text-[#777]">所在地</dt>
              <dd>兵庫県西宮市</dd>
              <dt className="text-[#777]">設立時期</dt>
              <dd>2027年春予定</dd>
            </dl>
          </div>
        </section>

        {/* 人 */}
        <section className="mx-auto max-w-4xl px-5 pb-14">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-[#B9822E]">PEOPLE</p>
          <h2 className="mt-2 text-center text-2xl" style={serif}>
            設立メンバー
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PEOPLE.map((p) => (
              <div key={p.name} className="flex gap-4 rounded-2xl border border-[#E3DFD5] bg-white/60 p-5">
                <img src={p.img} alt={`${p.name}（イラスト）`} className="h-32 w-24 shrink-0 rounded-lg object-cover" />
                <div>
                  <p className="font-bold" style={serif}>
                    {p.name}
                    <span className="ml-2 text-xs font-normal text-[#777]">（{p.role}）</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#444]">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 問い合わせ */}
        <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
          <h2 className="text-2xl" style={serif}>
            まずはお気軽にご相談ください
          </h2>
          <p className="mt-3 text-sm text-[#555]">外国人材の受け入れを考え始めた段階でも構いません。</p>
          <a
            href={mailto}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#B9822E] px-8 py-3.5 text-sm font-bold tracking-wider text-white shadow-md hover:bg-[#9E6E25]"
          >
            メールで相談する
          </a>
          <p className="mt-4 text-sm text-[#555]">
            メール：
            <a className="underline" href={mailto}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-[#E3DFD5] py-8 text-center text-xs text-[#777]">
        クレセント協同組合（仮称）設立準備室 ｜ 兵庫県西宮市 ｜{' '}
        <Link href={`/${params.locale}`} className="underline">
          合同会社JCSギバ
        </Link>
      </footer>
    </div>
  );
}
