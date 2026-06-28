import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const isJa = params.locale === 'ja';
  
  return {
    title: isJa 
      ? "合同会社JCSギバ | 情熱と知性で道を切り拓き、誠意あるGIVERとして豊かな社会を共創する"
      : "JCS Giba LLC | Blazing trails with passion and intelligence, co-creating a prosperous society as a sincere GIVER",
    description: isJa
      ? "合同会社JCSギバの公式コーポレートサイトです。情熱(Passion)・知性(Intelligence)・誠意(Sincerity)を指針に、食品流通におけるマッチング・仲介、コンサルティング、営業・調達活動を包括的に支援します。"
      : "Official corporate website of JCS Giba LLC. Guided by Passion, Intelligence, and Sincerity, we comprehensively support matching/brokerage, consulting, and sales/procurement activities in food distribution.",
    keywords: ["JCSギバ", "合同会社JCSギバ", "食品流通", "マッチング", "冷凍食品商社", "食品コンサルティング", "調達支援", "畑拓也", "GIVER", "JCS Giba", "JCS Giba LLC"],
  };
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
