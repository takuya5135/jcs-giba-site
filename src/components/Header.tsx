"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type Props = {
  dict: any;
  locale: string;
};

export default function Header({ dict, locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const navLinks = [
    { href: "#mission", label: dict.nav.mission },
    { href: "#principles", label: dict.nav.principle },
    { href: "#profile", label: dict.nav.profile },
    { href: "#services", label: dict.nav.services },
    { href: "#why-us", label: dict.nav.whyUs },
    { href: "#flow", label: dict.nav.flow },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* ロゴ */}
        <Link href={`/${locale}`} className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt={locale === 'ja' ? '合同会社JCSギバ' : 'JCS Giba LLC'} 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-[#0B2046] hover:text-[#F09A26] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* 言語切り替え */}
          <div className="flex items-center space-x-2 text-xs font-bold border-l border-slate-200 pl-6">
            <button
              onClick={() => handleLanguageChange('ja')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'ja' ? 'text-[#F09A26] bg-[#0B2046]/5' : 'text-gray-400 hover:text-[#0B2046]'}`}
            >
              JA
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-[#F09A26] bg-[#0B2046]/5' : 'text-gray-400 hover:text-[#0B2046]'}`}
            >
              EN
            </button>
          </div>

          {/* コンタクトボタン */}
          <a
            href={locale === 'ja' 
              ? "mailto:takuya.hata@jcs-giba.com?subject=お問い合わせ&body=会社名：%0D%0Aお名前：%0D%0Aお問い合わせ内容："
              : "mailto:takuya.hata@jcs-giba.com?subject=Inquiry&body=Company Name:%0D%0AName:%0D%0ADetails of Inquiry:"}
            className="bg-[#0B2046] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#F09A26] hover:shadow-md transition-all duration-300"
          >
            CONTACT
          </a>
        </nav>

        {/* スマホ用トグルボタン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#0B2046] focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* スマホ用メニュー */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 py-6 px-6 shadow-inner">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-[#0B2046] hover:text-[#F09A26] transition-colors py-2 border-b border-slate-50"
              >
                {link.label}
              </a>
            ))}

            {/* 言語切り替え */}
            <div className="flex items-center space-x-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-gray-400">LANGUAGE:</span>
              <button
                onClick={() => { handleLanguageChange('ja'); setIsOpen(false); }}
                className={`text-sm font-bold px-3 py-1 rounded ${locale === 'ja' ? 'text-[#F09A26] bg-[#0B2046]/5' : 'text-gray-500'}`}
              >
                日本語 (JA)
              </button>
              <button
                onClick={() => { handleLanguageChange('en'); setIsOpen(false); }}
                className={`text-sm font-bold px-3 py-1 rounded ${locale === 'en' ? 'text-[#F09A26] bg-[#0B2046]/5' : 'text-gray-500'}`}
              >
                English (EN)
              </button>
            </div>

            {/* コンタクトボタン */}
            <a
              href={locale === 'ja'
                ? "mailto:takuya.hata@jcs-giba.com?subject=お問い合わせ&body=会社名：%0D%0Aお名前：%0D%0Aお問い合わせ内容："
                : "mailto:takuya.hata@jcs-giba.com?subject=Inquiry&body=Company Name:%0D%0AName:%0D%0ADetails of Inquiry:"}
              onClick={() => setIsOpen(false)}
              className="bg-[#0B2046] text-white text-center py-3 rounded-full text-sm font-bold hover:bg-[#F09A26] transition-all duration-300 mt-2 block"
            >
              CONTACT
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
