import React from 'react';

type Props = { dict: any; locale: string };

// トップページ：3つの事業の入口（ギバ通信フッターと同じアイコン）
export default function BusinessPillars({ dict }: Props) {
  const p = dict.pillars;
  return (
    <section id="business" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">{p.tag}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2046] mt-3">{p.title}</h2>
          <div className="h-1 w-12 bg-[#F09A26] mx-auto mt-4 mb-6 rounded"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">{p.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {p.items.map((it: any) => (
            <a
              key={it.title}
              href={it.href}
              className="group flex flex-col items-center text-center bg-[#F8FAFC] border border-slate-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-[#F09A26]/60 hover:-translate-y-1"
            >
              <img src={it.icon} alt="" width={120} height={120} className="h-28 w-28 rounded-full" />
              <h3 className="mt-6 text-lg font-bold text-[#0B2046]">{it.title}</h3>
              <p className="mt-3 text-xs text-gray-500 leading-loose">{it.desc}</p>
              <span className="mt-auto pt-6 text-xs font-bold text-[#F09A26] group-hover:underline">{p.more} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
