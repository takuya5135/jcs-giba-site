import React from 'react';

type Props = { dict: any; locale: string };

// トップページ：事業の入口。メイン事業（販路・仕入先の拡大）を大きく、ほかの2つをその下に並べる
export default function BusinessPillars({ dict }: Props) {
  const p = dict.pillars;
  const main = p.items.find((it: any) => it.main);
  const subs = p.items.filter((it: any) => !it.main);
  return (
    <section id="business" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">{p.tag}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2046] mt-3">{p.title}</h2>
          <div className="h-1 w-12 bg-[#F09A26] mx-auto mt-4 mb-6 rounded"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">{p.desc}</p>
        </div>

        {main && (
          <a
            href={main.href}
            className="group flex flex-col md:flex-row items-center gap-8 bg-[#0B2046] rounded-3xl p-8 md:p-12 text-center md:text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img src={main.icon} alt="" width={176} height={176} className="h-36 w-36 md:h-44 md:w-44 shrink-0 rounded-full ring-4 ring-[#F09A26]" />
            <div>
              <span className="inline-block rounded-full bg-[#F09A26] px-3 py-1 text-[11px] font-bold tracking-widest text-white">
                {p.mainLabel}
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-white">{main.title}</h3>
              <p className="mt-4 text-sm md:text-base text-slate-200 leading-loose">{main.desc}</p>
              <span className="mt-6 inline-block text-sm font-bold text-[#F09A26] group-hover:underline">{p.more} →</span>
            </div>
          </a>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {subs.map((it: any) => (
            <a
              key={it.title}
              href={it.href}
              className="group flex items-center gap-5 bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-[#F09A26]/60 hover:-translate-y-1"
            >
              <img src={it.icon} alt="" width={96} height={96} className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full" />
              <div>
                <h3 className="text-base md:text-lg font-bold text-[#0B2046]">{it.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{it.desc}</p>
                <span className="mt-3 inline-block text-xs font-bold text-[#F09A26] group-hover:underline">{p.more} →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
