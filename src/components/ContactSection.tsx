"use client";

import React, { useState } from 'react';
import { getMailtoLink, CONTACT_EMAIL } from '@/lib/contact';
import { Copy, Check, Mail } from 'lucide-react';

type Props = {
  dict: any;
  locale: string;
};

export default function ContactSection({ dict, locale }: Props) {
  const [copied, setCopied] = useState(false);

  const mailtoUrl = getMailtoLink(locale);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const copyBtnLabel = locale === 'ja'
    ? (copied ? 'メールアドレスをコピーしました！' : 'メールアドレスをコピー')
    : locale === 'zh'
      ? (copied ? '已复制邮箱地址！' : '复制邮箱地址')
      : (copied ? 'Email Copied!' : 'Copy Email Address');

  return (
    <section id="contact" className="py-24 bg-[#0B2046] text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0B2046] to-[#0B2046] opacity-60"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26] mb-4 block">
          {dict.contact.tag}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          {dict.contact.title}
        </h2>
        <p className="text-xs md:text-sm text-gray-300 max-w-2xl mx-auto leading-loose mb-10">
          {dict.contact.desc}
        </p>

        {/* アクションエリア */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* メーラー起動ボタン */}
          <a 
            href={mailtoUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F09A26] hover:bg-[#d6851f] text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm tracking-wider"
          >
            <Mail className="w-4 h-4" />
            <span>{dict.contact.btn}</span>
          </a>

          {/* メールアドレスコピーボタン */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full font-bold transition-all duration-300 text-xs md:text-sm tracking-wider backdrop-blur-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
            <span className={copied ? "text-green-300" : ""}>{copyBtnLabel}</span>
          </button>
        </div>

        {/* メールアドレスの直接明示（補助表示） */}
        <div className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>Direct Email:</span>
          <a 
            href={mailtoUrl} 
            className="text-[#F09A26] hover:underline font-mono font-medium"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
