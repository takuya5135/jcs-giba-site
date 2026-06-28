"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
  dict: any;
  locale: string;
};

export default function ProfileSection({ dict, locale }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="profile" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 左側: プロフィール画像と基本情報 (4カラム分) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-6 bg-slate-200">
              <img 
                src="/images/profile.jpg" 
                alt={dict.profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-[#0B2046]">{dict.profile.name}</h3>
              <p className="text-sm font-semibold text-[#F09A26]">{dict.profile.role}</p>
            </div>
          </div>

          {/* 右側: 経歴・メッセージ (8カラム分) */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26] block">
              {dict.profile.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2046] leading-tight">
              {dict.profile.title}
            </h2>
            <div className="h-1 w-12 bg-[#F09A26] rounded"></div>
            
            <h4 className="text-base font-bold text-[#0B2046] leading-relaxed mt-4">
              {dict.profile.subtitle}
            </h4>

            {/* テキストコンテンツ：スマホでは一部折りたたみ、PCでは全表示 */}
            <div className="text-xs md:text-sm text-gray-500 leading-loose space-y-4">
              {/* 第1段落: 常に表示 */}
              <p>{dict.profile.p1}</p>

              {/* 第2・第3段落: スマホではアコーディオン、PCでは常に表示 */}
              <div className={`space-y-4 transition-all duration-500 ${isExpanded ? 'block opacity-100' : 'hidden md:block md:opacity-100'}`}>
                <p>{dict.profile.p2}</p>
                <p>{dict.profile.p3}</p>
              </div>

              {/* スマホ用「続きを読む」ボタン */}
              <div className="md:hidden pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center space-x-2 text-xs font-bold text-[#0B2046] hover:text-[#F09A26] transition-colors border border-slate-200 px-4 py-2.5 rounded-full bg-white shadow-sm"
                >
                  <span>{isExpanded ? (locale === 'ja' ? '経歴を折りたたむ' : 'Close Profile') : (locale === 'ja' ? '代表の詳しい経歴を読む' : 'Read Full Profile')}</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
