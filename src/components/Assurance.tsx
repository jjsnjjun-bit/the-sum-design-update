import React from 'react';
import { ShieldCheck, Leaf, Truck, Wrench } from 'lucide-react';
import { WarrantyItem } from '../types';

interface AssuranceProps {
  warranties: WarrantyItem[];
}

export const Assurance: React.FC<AssuranceProps> = ({ warranties }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-[#B89B72]" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-[#4ADE80]" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-[#60A5FA]" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-[#F59E0B]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#B89B72]" />;
    }
  };

  return (
    <section id="craftsmanship" className="py-20 sm:py-28 bg-[#181614] text-white border-b border-[#2C2926] w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="text-center text-xs uppercase tracking-[0.28em] text-[#C7A97E] font-bold block mb-4 font-sans">
            SUM LIFETIME ASSURANCE
          </span>
          <h2 className="text-center font-serif-kr text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold leading-[1.48] sm:leading-[1.52] mb-6 text-[#F7F3EC] tracking-tight break-keep">
            가구를 넘어 일상의 풍경을 지키는<br />더 숨 디자인 4대 절대 신뢰 약속
          </h2>
          <p className="text-center text-sm sm:text-base text-[#A8A196] leading-relaxed font-light max-w-3xl mx-auto break-keep">
            20년간 현장에서 증명해 온 직영 공방의 자부심으로 타협 없는 품질과 서비스를 약속드립니다.
          </p>
        </div>

        {/* 4 Cards Grid across full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {warranties.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#211E1B] p-7 sm:p-8 rounded-2xl border border-[#35302A] flex flex-col justify-between hover:border-[#B89B72]/80 transition-all shadow-md group"
            >
              <div>
                {/* Icon & Code */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-[#2D2924] border border-[#403B33] group-hover:scale-105 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-[#8C8478] font-sans">
                    {item.code}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#F4EFE6] mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A1988C] leading-relaxed mb-6 font-light">
                  {item.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 border-t border-[#302B25] flex items-center gap-2 text-xs text-[#C7A97E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
                <span className="truncate font-medium">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
