import React from 'react';
import Link from 'next/link';

type Props = {
  dict: any;
  locale: string;
};

export default function Footer({ dict, locale }: Props) {
  const footerLinks = [
    { href: "#mission", label: dict.nav.mission },
    { href: "#principles", label: dict.nav.principle },
    { href: "#profile", label: dict.nav.profile },
    { href: "#services", label: dict.nav.services },
    { href: "#why-us", label: dict.nav.whyUs },
    { href: "#flow", label: dict.nav.flow },
  ];

  return (
    <footer className="bg-[#0B2046] text-white py-16 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        {/* 左カラム: 企業理念・ロゴ */}
        <div className="flex flex-col space-y-4">
          <Link href={`/${locale}`} className="flex flex-col">
            <span className="text-2xl font-bold tracking-wider text-white">JCS Giba</span>
            <span className="text-xs text-gray-400 mt-1 font-medium">
              {locale === 'ja' ? '合同会社JCSギバ' : 'JCS Giba LLC'}
            </span>
          </Link>
          <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
            {dict.footer.desc}
          </p>
        </div>

        {/* 右側カラム群 */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* 会社概要テーブル */}
          <div>
            <h4 className="text-base font-bold mb-4 pb-2 border-b border-slate-700 text-gray-200">
              {dict.footer.profileTitle}
            </h4>
            <table className="w-full text-sm border-collapse text-gray-300">
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-2.5 font-semibold text-gray-400 w-1/3">{dict.footer.table.name}</td>
                  <td className="py-2.5">{dict.footer.table.nameVal}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2.5 font-semibold text-gray-400">{dict.footer.table.rep}</td>
                  <td className="py-2.5">{dict.footer.table.repVal}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2.5 font-semibold text-gray-400">{dict.footer.table.est}</td>
                  <td className="py-2.5">{dict.footer.table.estVal}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-gray-400">{dict.footer.table.loc}</td>
                  <td className="py-2.5">{dict.footer.table.locVal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-base font-bold mb-4 pb-2 border-b border-slate-700 text-gray-200">
              {dict.footer.linksTitle}
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-[#F09A26] transition-colors duration-300 block py-1">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
        <p>{dict.footer.copyright}</p>
        <p className="font-semibold tracking-widest text-[#F09A26]/80">{dict.footer.slogan}</p>
      </div>
    </footer>
  );
}
