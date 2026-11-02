import React from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';

type Props = { dict: any; locale: string };

// トップページ：ギバ通信の紹介と申し込み
export default function TsushinSection({ dict }: Props) {
  const t = dict.tsushin;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
  return (
    <section id="tsushin" className="py-20 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 items-center">
        <div className="flex justify-center">
          <img src="/images/tsushin/hata.png" alt="" width={200} height={200} className="h-40 w-40 md:h-48 md:w-48 rounded-full shadow-sm" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">{t.tag}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2046] mt-3">{t.title}</h2>
          <div className="h-1 w-12 bg-[#F09A26] mt-4 mb-6 rounded"></div>
          <p className="text-sm text-gray-600 leading-loose">{t.desc}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
            {t.points.map((x: string) => (
              <li key={x} className="flex gap-2">
                <span className="text-[#F09A26]">●</span>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={mailto}
              className="inline-flex justify-center bg-[#F09A26] hover:bg-[#d6851f] text-white px-8 py-3 rounded-full font-bold shadow-sm text-xs md:text-sm tracking-wider"
            >
              {t.btnSubscribe}
            </a>
            <a
              href="/ja/tsushin"
              className="inline-flex justify-center bg-white border-2 border-[#0B2046] text-[#0B2046] hover:bg-slate-50 px-8 py-2.5 rounded-full font-bold text-xs md:text-sm tracking-wider"
            >
              {t.btnBack}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
