// ギバ通信：言語ごとの表記（日本語 / 中国語簡体字 / 英語）
export type Lang = 'ja' | 'zh' | 'en';
export const LANGS: Lang[] = ['ja', 'zh', 'en'];
// 言語切り替えボタンの表記（その言語の版へ移るときに出す）
export const LANG_LINK: Record<Lang, string> = { ja: '日本語版 →', zh: '中文版 →', en: 'English →' };
export const isLang = (l: string): l is Lang => (LANGS as string[]).includes(l);

export const UI = {
  ja: {
    name: 'ギバ通信',
    company: '合同会社JCSギバ',
    backnumber: 'ギバ通信 バックナンバー',
    author: '畑 拓也',
    no: (n: number) => `第${n}号`,
    date: (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月${Number(d.slice(8, 10))}日`,
    month: (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月`,
    footer: {
      lead: 'こんな時は、まずJCSギバへ',
      ask: 'どんな小さな案件でも、声をかけてください。',
      mail: 'メール：',
      referral: 'ご紹介でお読みの方へ：ギバ通信の配信をご希望の方は、お気軽にご連絡ください。',
      sign: '合同会社JCSギバ　代表社員　畑 拓也',
      sources: '出典',
      jaOnly: '',
    },
    menu: [
      { t: '調達・販路の仲介とコンサルティング', d: '営業人員不足で販路拡大にお悩みの方、調達力強化のために仕入先拡大が課題の方をお手伝いいたします。原材料を軸にした売場企画のご提案も行います。' },
      { t: 'お悩み在庫の買い取り', d: '冷凍食品の過剰在庫・期限の近い品・B級品・端材を、価格を崩さず業務筋へ' },
      { t: '外国人材の受け入れ支援', d: '特定技能・育成就労、2027年の制度改正への備え。クレセント協同組合（仮称）設立準備室' },
    ],
  },
  zh: {
    name: 'Giba通讯',
    company: 'JCS Giba 合同会社',
    backnumber: 'Giba通讯 往期',
    author: '畑 拓也',
    no: (n: number) => `第${n}期`,
    date: (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月${Number(d.slice(8, 10))}日`,
    month: (d: string) => `${d.slice(0, 4)}年${Number(d.slice(5, 7))}月`,
    footer: {
      lead: '遇到这些情况，请先联系JCS Giba',
      ask: '再小的项目，也欢迎随时联系我们。',
      mail: '邮箱：',
      referral: '经朋友介绍阅读本刊的各位：如希望订阅Giba通讯，欢迎随时联系。',
      sign: 'JCS Giba 合同会社　代表　畑 拓也',
      sources: '资料来源',
      jaOnly: '（链接页面为日文）',
    },
    menu: [
      { t: '采购・销售渠道的中介与咨询', d: '为缺少销售人员、希望拓展销路的企业，以及希望扩大供应商、增强采购能力的企业提供帮助。也可提出以原材料为核心的卖场企划方案。' },
      { t: '库存难题收购', d: '冷冻食品的过剩库存、临期品、B级品、边角料，在不扰乱价格的前提下转售给业务渠道。' },
      { t: '外国人才引进支援', d: '特定技能・育成就劳，为2027年的制度改革做准备。新月协同组合（暂定名）筹备室' },
    ],
  },
  en: {
    name: 'Giba Tsushin',
    company: 'JCS Giba LLC',
    backnumber: 'Giba Tsushin Back Issues',
    author: 'Takuya Hata',
    no: (n: number) => `No. ${n}`,
    date: (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    month: (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    footer: {
      lead: 'When this happens, talk to JCS Giba first',
      ask: 'No matter how small the project, please feel free to contact us.',
      mail: 'Email: ',
      referral: 'If someone shared this with you: we are happy to add you to the Giba Tsushin mailing list. Just let us know.',
      sign: 'JCS Giba LLC　Representative　Takuya Hata',
      sources: 'Sources',
      jaOnly: ' (page in Japanese)',
    },
    menu: [
      { t: 'Sourcing & sales channel brokerage and consulting', d: 'We help companies that lack sales staff to expand their channels, and companies that want more suppliers to strengthen their sourcing. We also propose in-store promotions built around your ingredients.' },
      { t: 'Buying problem inventory', d: 'Excess frozen food stock, near-expiry items, B-grade goods and trimmings — resold to food-service channels without disrupting market prices.' },
      { t: 'Support for hiring overseas workers', d: 'Specified Skilled Worker and the new Employment for Skill Development system; preparing for the 2027 reform. Crescent Cooperative (tentative name) preparation office.' },
    ],
  },
};

// 金額：日本語は「589円」、中国語は「589日元」、英語は「¥589」
export const yenL = (lang: Lang) => (v: number) => {
  const n = Math.round(v).toLocaleString('ja-JP');
  return lang === 'en' ? `¥${n}` : `${n}${lang === 'zh' ? '日元' : '円'}`;
};
