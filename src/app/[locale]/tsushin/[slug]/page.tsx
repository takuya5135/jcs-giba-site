import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ISSUES, getIssue } from '@/tsushin/issues';
import { CONTENTS } from '@/tsushin/contents';
import { TsushinFooter, TsushinHeader } from '@/components/tsushin/parts';

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;

// ギバ通信は当面日本語のみ
export function generateStaticParams() {
  return ISSUES.map((i) => ({ locale: 'ja', slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getIssue(params.slug);
  if (!issue) return {};
  return {
    title: `ギバ通信 ${issue.label ?? `第${issue.no}号`}「${issue.title}」 | 合同会社JCSギバ`,
    description: issue.dek,
    // 最新号は検索に載せない（次号の配信後に公開）
    robots: issue.public ? undefined : { index: false, follow: false },
  };
}

const jaDate = (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月${Number(d.slice(8, 10))}日`;

export default function IssuePage({ params }: Props) {
  const issue = getIssue(params.slug);
  const content = CONTENTS[params.slug];
  if (params.locale !== 'ja' || !issue || !content) notFound();
  const { Body, sources } = content;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TsushinHeader locale={params.locale} />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <p className="text-xs font-bold tracking-[0.25em] text-slate-500">GIBA TSUSHIN</p>
        <h1 className="mt-2 text-3xl font-bold text-[#0B2046]">ギバ通信</h1>
        <div className="mt-4 flex items-center gap-3">
          <img src="/images/tsushin/hata.png" alt="畑 拓也" width={72} height={72} className="h-[72px] w-[72px] rounded-full" />
          <div>
            <p className="text-sm font-bold text-[#0B2046]">畑 拓也</p>
            <p className="text-xs text-slate-500">
              {issue.label ?? `第${issue.no}号`} ｜ {jaDate(issue.date)}
            </p>
          </div>
        </div>
        <Body />
        <TsushinFooter locale={params.locale} sources={sources} />
      </main>
    </div>
  );
}
