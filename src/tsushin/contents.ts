// slug → 本文。新しい号を作ったらここに1行足す。
import Issue202611, { sources as sources202611 } from './issues/2026-11/content';

export const CONTENTS: Record<string, { Body: () => JSX.Element; sources: string[] }> = {
  '2026-11': { Body: Issue202611, sources: sources202611 },
};
