// slug → 本文。新しい号を作ったらここに1行足す。
import Issue202612, { sources as sources202612 } from './issues/2026-12/content';

export const CONTENTS: Record<string, { Body: () => JSX.Element; sources: string[] }> = {
  '2026-12': { Body: Issue202612, sources: sources202612 },
};
