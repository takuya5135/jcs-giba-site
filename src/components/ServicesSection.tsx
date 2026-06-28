"use client";
import React, { useState } from 'react';
import { Shield, BookOpen, Layers, ChevronDown } from 'lucide-react';

type Props = {
  dict: any;
  locale: string;
};

export default function ServicesSection({ dict, locale }: Props) {
  const [activeTab, setActiveTab] = useState<'domestic' | 'overseas' | 'retailer'>('domestic');
  // Mobile accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    domestic: true,
    overseas: false,
    retailer: false,
  });

  const toggleAccordion = (key: 'domestic' | 'overseas' | 'retailer') => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0: return <Layers className="h-6 w-6 text-[#F09A26]" />;
      case 1: return <BookOpen className="h-6 w-6 text-[#F09A26]" />;
      case 2: return <Shield className="h-6 w-6 text-[#F09A26]" />;
      default: return <Layers className="h-6 w-6 text-[#F09A26]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">
            {dict.services.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2046] mt-3">
            {dict.services.title}
          </h2>
          <div className="h-1 w-12 bg-[#F09A26] mx-auto mt-4 mb-6 rounded"></div>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {dict.services.desc}
          </p>
        </div>

        {/* サービス3つのカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {dict.services.items.map((service: any, index: number) => (
            <div 
              key={index} 
              className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                {getServiceIcon(index)}
              </div>
              <h3 className="text-lg font-bold text-[#0B2046] mb-3">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500 leading-loose">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 課題解決事例（PC: タブ切り替え, スマホ: アコーディオン） */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 md:p-12 shadow-sm">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-[#0B2046]">
              {dict.services.cases.title}
            </h3>
          </div>

          {/* PC表示用: タブナビゲーション */}
          <div className="hidden md:flex justify-center space-x-4 mb-12">
            {(Object.keys(dict.services.cases.tabs) as Array<'domestic' | 'overseas' | 'retailer'>).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tabKey
                    ? 'bg-[#0B2046] text-white shadow-md'
                    : 'bg-white text-[#0B2046] border border-slate-200 hover:border-slate-300'
                }`}
              >
                {dict.services.cases.tabs[tabKey]}
              </button>
            ))}
          </div>

          {/* PC表示用: タブコンテンツ */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeTab === 'domestic' && dict.services.cases.domesticItems.map((item: any, idx: number) => (
              <CaseCard key={idx} item={item} />
            ))}
            {activeTab === 'overseas' && dict.services.cases.overseasItems.map((item: any, idx: number) => (
              <CaseCard key={idx} item={item} />
            ))}
            {activeTab === 'retailer' && dict.services.cases.retailerItems.map((item: any, idx: number) => (
              <CaseCard key={idx} item={item} />
            ))}
          </div>

          {/* スマホ表示用: アコーディオン */}
          <div className="md:hidden space-y-4">
            {(Object.keys(dict.services.cases.tabs) as Array<'domestic' | 'overseas' | 'retailer'>).map((tabKey) => {
              const items = tabKey === 'domestic' 
                ? dict.services.cases.domesticItems 
                : tabKey === 'overseas' 
                  ? dict.services.cases.overseasItems 
                  : dict.services.cases.retailerItems;
              const isOpen = openAccordions[tabKey];

              return (
                <div key={tabKey} className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(tabKey)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-[#0B2046] bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span>{dict.services.cases.tabs[tabKey]}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 space-y-6 border-t border-slate-100 bg-white">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="space-y-3">
                          <div className="flex items-center space-x-2 font-bold text-xs text-[#0B2046]">
                            <span>{item.icon}</span>
                            <span>{item.heading}</span>
                          </div>
                          <ul className="space-y-2 pl-6 list-disc text-xs text-gray-500 leading-relaxed">
                            {item.points.map((pt: string, pIdx: number) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: any }) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{item.icon}</span>
        <h4 className="text-base font-bold text-[#0B2046]">{item.heading}</h4>
      </div>
      <ul className="space-y-3.5 pl-6 list-disc text-xs md:text-sm text-gray-500 leading-relaxed">
        {item.points.map((point: string, pIdx: number) => (
          <li key={pIdx}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
