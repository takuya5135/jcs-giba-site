import React from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/contact';
import { Lang, UI } from '@/tsushin/i18n';

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
  const u = UI[locale === 'zh' ? 'zh' : 'ja'];
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="h-1.5 w-full bg-[#F09A26]" />
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-sm font-bold text-[#0B2046]">
          {u.company}
        </Link>
        <Link href={`/${locale}/tsushin`} className="text-xs text-slate-500 hover:text-[#0B2046]">
          {u.backnumber}
        </Link>
      </div>
    </header>
  );
}

// href があるものは詳しいページへリンクする（文言は i18n.ts の UI.menu と同じ順）
const MENU: { href?: string; icon: string; wide?: boolean }[] = [
  { href: '#services', icon: '/images/tsushin/icon-jcs.jpg', wide: true },
  { href: '/kaitori', icon: '/images/tsushin/icon-kaitori.jpg' },
  { href: '/crescent', icon: '/images/tsushin/icon-jinzai.jpg' },
];

export function TsushinFooter({ locale, sources }: { locale: string; sources: string[] }) {
  const lang: Lang = locale === 'zh' ? 'zh' : 'ja';
  const u = UI[lang];
  return (
    <footer className="mt-16 border-t border-slate-200 pt-8">
      <p className="font-bold text-[#0B2046]">{u.footer.lead}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {MENU.map(({ href, wide, icon }, i) => {
          const { t, d } = u.menu[i];
          // 買い取り・クレセントのページは日本語のみ。トップページ（#services）は各言語にある
          const target = href && href.startsWith('/') ? `/ja${href}` : `/${locale}${href}`;
          const inner = (
            <div className="flex items-center gap-4">
              <img src={icon} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
              <div>
                <p className="font-bold text-sm text-[#0B2046]">
                  {t}
                  {href && <span className="ml-1 text-[#F09A26]">→</span>}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {d}
                  {lang === 'zh' && href?.startsWith('/') && <span className="text-slate-400">{u.footer.jaOnly}</span>}
                </p>
              </div>
            </div>
          );
          return href ? (
            <a
              key={t}
              href={target}
              target="_blank"
              rel="noopener"
              className={`block rounded-lg bg-white border border-slate-200 p-4 hover:border-[#F09A26] ${wide ? 'sm:col-span-2' : ''}`}
            >
              {inner}
            </a>
          ) : (
            <div key={t} className="rounded-lg bg-white border border-slate-200 p-4">
              {inner}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-700">
        {u.footer.ask}
        <br />
        {u.footer.mail}
        <a className="text-[#0B2046] underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-4 rounded-lg bg-slate-100 p-3 text-xs leading-relaxed text-slate-600">
        {u.footer.referral}
      </p>
      <p className="mt-4 text-xs text-slate-500">{u.footer.sign}</p>
      <p className="mt-6 text-xs font-bold text-slate-500">{u.footer.sources}</p>
      <ul className="mt-1 list-disc pl-5 text-xs leading-relaxed text-slate-500">
        {sources.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </footer>
  );
}
