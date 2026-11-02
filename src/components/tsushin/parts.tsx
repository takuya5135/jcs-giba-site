import React from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/contact';

// 畑さんが書き込む場所の目印。仕上がったら中身を本文に置き換える。
export const Todo = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-amber-100 text-amber-900 px-1 rounded">［{children}］</span>
);

export const Part = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-14 mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#F09A26]">
    <span className="h-px w-8 bg-[#F09A26]" />
    {children}
  </p>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-10 mb-3 text-lg font-bold text-[#0B2046]">{children}</h3>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="my-4 leading-[1.95] text-[15.5px] text-slate-700">{children}</p>
);

export const Card = ({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) => (
  <div className="my-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
    <p className="font-bold text-sm text-[#0B2046]">{title}</p>
    {note && <p className="mt-1 mb-3 text-xs leading-relaxed text-slate-500">{note}</p>}
    {children}
  </div>
);

export function TsushinHeader({ locale }: { locale: string }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="h-1.5 w-full bg-[#F09A26]" />
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-sm font-bold text-[#0B2046]">
          合同会社JCSギバ
        </Link>
        <Link href={`/${locale}/tsushin`} className="text-xs text-slate-500 hover:text-[#0B2046]">
          ギバ通信 バックナンバー
        </Link>
      </div>
    </header>
  );
}

// href があるものは詳しいページへリンクする
const MENU: { t: string; d: string; href?: string; wide?: boolean }[] = [
  { t: 'お悩み在庫の買い取り', d: '冷凍食品の過剰在庫・期限の近い品・B級品・端材を、価格を崩さず業務筋へ', href: '/kaitori' },
  { t: '外国人材の受け入れ支援', d: '特定技能・育成就労、2027年の制度改正への備え' },
  {
    t: '調達・販路の仲介とコンサルティング',
    d: '海外・国内メーカーと流通をつなぐ。輸入停止時の代替調達、海外メーカーの日本参入、商品開発と販売戦略も',
    href: '#services',
    wide: true,
  },
];

export function TsushinFooter({ locale, sources }: { locale: string; sources: string[] }) {
  return (
    <footer className="mt-16 border-t border-slate-200 pt-8">
      <p className="font-bold text-[#0B2046]">こんな時は、まずJCSギバへ</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {MENU.map(({ t, d, href, wide }) => {
          const inner = (
            <>
              <p className="font-bold text-sm text-[#0B2046]">
                {t}
                {href && <span className="ml-1 text-[#F09A26]">→</span>}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{d}</p>
            </>
          );
          return href ? (
            <Link
              key={t}
              href={`/${locale}${href}`}
              className={`block rounded-lg bg-white border border-slate-200 p-4 hover:border-[#F09A26] ${wide ? 'sm:col-span-2' : ''}`}
            >
              {inner}
            </Link>
          ) : (
            <div key={t} className="rounded-lg bg-white border border-slate-200 p-4">
              {inner}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-700">
        どんな小さな案件でも、声をかけてください。
        <br />
        メール：
        <a className="text-[#0B2046] underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-4 rounded-lg bg-slate-100 p-3 text-xs leading-relaxed text-slate-600">
        ご紹介でお読みの方へ：ギバ通信の配信をご希望の方は、お気軽にご連絡ください。
      </p>
      <p className="mt-4 text-xs text-slate-500">合同会社JCSギバ　代表社員　畑 拓也</p>
      <p className="mt-6 text-xs font-bold text-slate-500">出典</p>
      <ul className="mt-1 list-disc pl-5 text-xs leading-relaxed text-slate-500">
        {sources.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </footer>
  );
}
