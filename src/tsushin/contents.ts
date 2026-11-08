// slug → 本文。新しい号を作ったらここに1行足す。
import Extra202611, { sources as sourcesExtra202611 } from './issues/2026-11-extra/content';
import Issue202611, { sources as sources202611 } from './issues/2026-11/content';

export const CONTENTS: Record<string, { Body: () => JSX.Element; sources: string[] }> = {
  '2026-11-extra': { Body: Extra202611, sources: sourcesExtra202611 },
  '2026-11': { Body: Issue202611, sources: sources202611 },
};
