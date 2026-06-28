import React from 'react';
import { getDictionary } from './dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSection from '@/components/ProfileSection';
import ServicesSection from '@/components/ServicesSection';
import { Lightbulb, Users, Compass, ChevronRight } from 'lucide-react';

type Props = {
  params: { locale: string };
};

export default async function Page({ params }: Props) {
  const dict = await getDictionary(params.locale);
  const { locale } = params;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 最上部の細いゴールドライン（情熱のアクセント） */}
      <div className="h-1.5 w-full bg-[#F09A26] fixed top-0 left-0 z-[60]"></div>

      {/* ヘッダー */}
      <Header dict={dict} locale={locale} />

      {/* メインコンテンツ */}
      <main className="pt-20">
        
        {/* --- Hero Section --- */}
        <section className="min-h-[80vh] flex items-center justify-center bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
            <span className="inline-block text-xs md:text-sm font-bold tracking-widest text-[#F09A26] uppercase mb-6 px-4 py-1.5 rounded-full bg-[#F09A26]/5 border border-[#F09A26]/10">
              {dict.hero.tag}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#0B2046] leading-[2.2] tracking-[0.1em] mb-8 max-w-4xl mx-auto">
              {dict.hero.title1}<br />
              <span className="text-[#F09A26]">{dict.hero.title2}</span>
              {dict.hero.title3}
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 max-w-2xl mx-auto leading-loose mb-12 px-2">
              {dict.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto w-full">
              <a 
                href="#services" 
                className="w-full sm:w-auto bg-[#F09A26] hover:bg-[#d6851f] text-white px-10 py-4 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-300 text-xs md:text-sm tracking-wider"
              >
                {dict.hero.btnServices}
              </a>
              <a 
                href={locale === 'ja'
                  ? "mailto:takuya.hata@jcs-giba.com?subject=お問い合わせ"
                  : "mailto:takuya.hata@jcs-giba.com?subject=Inquiry"}
                className="w-full sm:w-auto bg-white border-2 border-[#0B2046] text-[#0B2046] hover:bg-slate-50 px-10 py-3.5 rounded-full font-bold transition-all duration-300 text-xs md:text-sm tracking-wider"
              >
                {dict.hero.btnContact}
              </a>
            </div>
          </div>
        </section>

        {/* --- Mission Section --- */}
        <section id="mission" className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26] block">
              {dict.mission.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2046] leading-tight tracking-wide">
              {dict.mission.title.split('\n')[0]}<br />
              <span className="text-gradient">{dict.mission.title.split('\n')[1]}</span>
            </h2>
            <div className="h-1 w-12 bg-[#F09A26] mx-auto rounded"></div>
            
            <blockquote className="border-l-4 border-[#F09A26] pl-4 italic text-sm md:text-base text-gray-600 font-medium my-6 leading-relaxed max-w-2xl mx-auto text-left">
              &ldquo;{dict.mission.quote}&rdquo;
            </blockquote>
            <div className="text-xs md:text-sm text-gray-500 leading-loose text-left space-y-4 max-w-2xl mx-auto">
              <p>{dict.mission.p1}</p>
              <p>{dict.mission.p2}</p>
            </div>
          </div>
        </section>

        {/* --- Principle Section --- */}
        <section id="principles" className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">
                {dict.principles.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2046] mt-3">
                {dict.principles.title}
              </h2>
              <div className="h-1 w-12 bg-[#F09A26] mx-auto mt-4 mb-6 rounded"></div>
              <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                {dict.principles.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dict.principles.items.map((item: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0B2046] group-hover:bg-[#F09A26] transition-colors duration-300"></div>
                  <div className="text-5xl font-black text-slate-100 group-hover:text-[#F09A26]/10 transition-colors duration-300 mb-4 select-none">
                    {item.letter}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2046] mb-3">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-loose">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Profile Section --- */}
        <ProfileSection dict={dict} locale={locale} />

        {/* --- Services Section --- */}
        <ServicesSection dict={dict} locale={locale} />

        {/* --- Why Us Section --- */}
        <section id="why-us" className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md order-last lg:order-first bg-slate-100">
                <img 
                  src="/images/service.jpg" 
                  alt="Why Choose Us" 
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26] block">
                    {dict.whyUs.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2046] mt-3">
                    {dict.whyUs.title}
                  </h2>
                  <div className="h-1 w-12 bg-[#F09A26] mt-4 rounded"></div>
                </div>

                <div className="space-y-8">
                  {dict.whyUs.items.map((item: any, idx: number) => {
                    const getWhyIcon = (num: string) => {
                      switch (num) {
                        case '01': return <Users className="h-5 w-5 text-white" />;
                        case '02': return <Compass className="h-5 w-5 text-white" />;
                        case '03': return <Lightbulb className="h-5 w-5 text-white" />;
                        default: return <Lightbulb className="h-5 w-5 text-white" />;
                      }
                    };

                    return (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#0B2046] rounded-xl flex items-center justify-center shadow-sm">
                          {getWhyIcon(item.num)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#0B2046] mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Flow Section --- */}
        <section id="flow" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F09A26]">
                {dict.flow.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2046] mt-3">
                {dict.flow.title}
              </h2>
              <div className="h-1 w-12 bg-[#F09A26] mx-auto mt-4 mb-6 rounded"></div>
              <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                {dict.flow.desc}
              </p>
            </div>

            {/* タイムラインレイアウト（PC: 横並び, スマホ: 縦並び） */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
              {dict.flow.steps.map((step: any, idx: number) => (
                <div key={idx} className="relative bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl shadow-sm">
                  {/* PC用の矢印コネクタ */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-slate-300">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  )}
                  <span className="text-xs font-extrabold text-[#F09A26] tracking-wider block mb-2">
                    STEP {step.num}
                  </span>
                  <h3 className="text-base font-bold text-[#0B2046] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
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
            <a 
              href={locale === 'ja'
                ? "mailto:takuya.hata@jcs-giba.com?subject=【お問い合わせ】合同会社JCSギバ&body=会社名：%0D%0Aお名前：%0D%0Aお電話番号：%0D%0Aお問い合わせ内容："
                : "mailto:takuya.hata@jcs-giba.com?subject=[Inquiry] JCS Giba LLC&body=Company Name:%0D%0AName:%0D%0APhone Number:%0D%0ADetails of Inquiry:"}
              className="inline-block bg-[#F09A26] hover:bg-[#d6851f] text-white px-12 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
            >
              {dict.contact.btn}
            </a>
          </div>
        </section>

      </main>

      {/* フッター */}
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
