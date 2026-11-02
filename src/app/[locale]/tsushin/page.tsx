import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISSUES } from '@/tsushin/issues';
import { TsushinHeader } from '@/components/tsushin/parts';
import { CONTACT_EMAIL } from '@/lib/contact';

type Props = { params: { locale: string } };

export const metadata: Metadata = {
  title: 'ギバ通信 バックナンバー | 合同会社JCSギバ',
  description: '合同会社JCSギバが毎月お届けする「ギバ通信」のバックナンバーです。食肉・食品の相場と物流の数字を、現場の話と一緒に読み解きます。',
};

const jaDate = (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月`;

export default function TsushinIndex({ params }: Props) {
  if (params.locale !== 'ja') notFound();
  const list = ISSUES.filter((i) => i.public);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TsushinHeader locale={params.locale} />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <h1 className="text-3xl font-bold text-[#0B2046]">ギバ通信 バックナンバー</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          毎月16日ごろ、お取引先とギバフレンドの皆さまにお届けしています。最新号はメールでお届けし、次の号の配信後にこちらへ掲載します。
        </p>
        {list.length === 0 ? (
          <p className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            2026年12月に創刊しました。バックナンバーは次号の配信後から掲載します。
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {list.map((i) => (
              <li key={i.slug}>
                <Link href={`/${params.locale}/tsushin/${i.slug}`} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-[#F09A26]">
                  <p className="text-xs text-slate-500">
                    {i.label ?? `第${i.no}号`} ｜ {jaDate(i.date)}
                  </p>
                  <p className="mt-1 font-bold text-[#0B2046]">{i.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{i.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-10 text-xs text-slate-500">
          配信をご希望の方は <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までご連絡ください。
        </p>
      </main>
    </div>
  );
}
