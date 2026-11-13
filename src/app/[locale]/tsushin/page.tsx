import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISSUES } from '@/tsushin/issues';
import { TsushinHeader } from '@/components/tsushin/parts';
import { CONTACT_EMAIL } from '@/lib/contact';
import { UI, isLang } from '@/tsushin/i18n';

type Props = { params: { locale: string } };

export const metadata: Metadata = {
  title: 'ギバ通信 バックナンバー | 合同会社JCSギバ',
  description: '合同会社JCSギバが毎月お届けする「ギバ通信」のバックナンバーです。食肉・食品の相場と物流の数字を、現場の話と一緒に読み解きます。',
};

const TEXT = {
  ja: {
    h1: 'ギバ通信 バックナンバー',
    lead: '毎月16日ごろ、お取引先とギバフレンドの皆さまにお届けしています。最新号はメールでお届けし、次の号の配信後にこちらへ掲載します。',
    empty: '2026年12月に創刊しました。バックナンバーは次号の配信後から掲載します。',
    ask: ['配信をご希望の方は ', ' までご連絡ください。'],
  },
  zh: {
    h1: 'Giba通讯 往期',
    lead: '每月16日前后发送给合作伙伴和Giba朋友们。最新一期通过邮件发送，下一期发送后在此刊登。',
    empty: '本刊于2026年12月创刊。往期内容将在下一期发送后刊登。',
    ask: ['如希望订阅，请联系 ', '。'],
  },
};

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'zh' }];
}

export default function TsushinIndex({ params }: Props) {
  if (!isLang(params.locale)) notFound();
  const lang = params.locale;
  const u = UI[lang];
  const tx = TEXT[lang];
  const list = ISSUES.filter((i) => i.public && (lang === 'ja' || i.zh));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TsushinHeader locale={params.locale} />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <h1 className="text-3xl font-bold text-[#0B2046]">{tx.h1}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {tx.lead}
        </p>
        {list.length === 0 ? (
          <p className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            {tx.empty}
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {list.map((i) => (
              <li key={i.slug}>
                <Link href={`/${params.locale}/tsushin/${i.slug}`} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-[#F09A26]">
                  <p className="text-xs text-slate-500">
                    {(lang === 'zh' ? i.zh?.label : i.label) ?? u.no(i.no)} ｜ {u.month(i.date)}
                  </p>
                  <p className="mt-1 font-bold text-[#0B2046]">{lang === 'zh' ? i.zh?.title : i.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{lang === 'zh' ? i.zh?.dek : i.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-10 text-xs text-slate-500">
          {tx.ask[0]}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {tx.ask[1]}
        </p>
      </main>
    </div>
  );
}
