// slug → 言語 → 本文。新しい号を作ったらここに足す。訳がない言語は省く。
import type { Lang } from './i18n';
import Extra202611, { sources as sourcesExtra202611 } from './issues/2026-11-extra/content';
import Issue202611, { sources as sources202611 } from './issues/2026-11/content';
import Issue202611Zh, { sources as sources202611Zh } from './issues/2026-11/content.zh';
import Issue202611En, { sources as sources202611En } from './issues/2026-11/content.en';

type Body = { Body: () => JSX.Element; sources: string[] };

export const CONTENTS: Record<string, Partial<Record<Lang, Body>>> = {
  '2026-11-extra': { ja: { Body: Extra202611, sources: sourcesExtra202611 } },
  '2026-11': {
    ja: { Body: Issue202611, sources: sources202611 },
    zh: { Body: Issue202611Zh, sources: sources202611Zh },
    en: { Body: Issue202611En, sources: sources202611En },
  },
};
