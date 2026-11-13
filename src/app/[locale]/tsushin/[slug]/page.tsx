import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISSUES, getIssue } from '@/tsushin/issues';
import { CONTENTS } from '@/tsushin/contents';
import { Lang, UI, isLang } from '@/tsushin/i18n';
import { TsushinFooter, TsushinHeader } from '@/components/tsushin/parts';

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;

// 日本語の号はすべて。中国語は訳がある号だけ
export function generateStaticParams() {
  return ISSUES.flatMap((i) =>
    (Object.keys(CONTENTS[i.slug] ?? {}) as Lang[]).map((locale) => ({ locale, slug: i.slug })),
  );
}

// 号の表示用の見出し（中国語は zh の訳を使う）
function head(slug: string, lang: Lang) {
  const issue = getIssue(slug);
  if (!issue) return null;
  const u = UI[lang];
  const t = lang === 'zh' && issue.zh ? issue.zh : issue;
  const label = t.label ?? (lang === 'zh' ? issue.label : undefined) ?? u.no(issue.no);
  return { issue, label, title: t.title, dek: t.dek };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLang(params.locale)) return {};
  const h = head(params.slug, params.locale);
  if (!h) return {};
  const u = UI[params.locale];
  return {
    title: `${u.name} ${h.label}「${h.title}」 | ${u.company}`,
    description: h.dek,
    // 最新号は検索に載せない（次号の配信後に公開）
    robots: h.issue.public ? undefined : { index: false, follow: false },
  };
}

export default function IssuePage({ params }: Props) {
  if (!isLang(params.locale)) notFound();
  const lang = params.locale;
  const h = head(params.slug, lang);
  const content = CONTENTS[params.slug]?.[lang];
  if (!h || !content) notFound();
  const { Body, sources } = content;
  const u = UI[lang];
  const other = u.switchTo;
  const hasOther = !!CONTENTS[params.slug]?.[other.lang];

  return (
    <div className="min-h-screen bg-[#F8FAFC]" lang={lang === 'zh' ? 'zh-CN' : 'ja'}>
      <TsushinHeader locale={lang} />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-bold tracking-[0.25em] text-slate-500">GIBA TSUSHIN</p>
          {hasOther && (
            <Link href={`/${other.lang}/tsushin/${params.slug}`} className="shrink-0 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 hover:border-[#F09A26]">
              {other.label}
            </Link>
          )}
        </div>
        <h1 className="mt-2 text-3xl font-bold text-[#0B2046]">{u.name}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {h.label} ｜ {u.date(h.issue.date)} ｜ {u.author}
        </p>
        <Body />
        <TsushinFooter locale={lang} sources={sources} />
      </main>
    </div>
  );
}
