// ギバ通信の号の一覧。新しい号を上に追加する。
// public: false の号（最新号）は検索エンジンに載せず、バックナンバー一覧にも出さない。
// 次の号を配信したら、前の号を public: true にする。

export type Issue = {
  slug: string; // URL：/ja/tsushin/<slug>
  no: number; // 第何号
  date: string; // 配信日
  title: string; // 今号の一本
  dek: string; // 一覧に出す一文
  public: boolean;
};

export const ISSUES: Issue[] = [
  {
    slug: '2026-12',
    no: 1,
    date: '2026-12-16',
    title: '相場の天井は、倉庫が決める',
    dek: '2025年から2026年の国産むね肉の動きを追うと、冷蔵倉庫の「空き」というもうひとつの主役が見えてきます。',
    public: false,
  },
];

export const getIssue = (slug: string) => ISSUES.find((i) => i.slug === slug);
