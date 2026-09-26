import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Award, Eye } from 'lucide-react';
import { CopyVariant } from '../types';

interface HeroProps {
  variants: CopyVariant[];
  currentVariantId: string;
  onSelectVariant: (id: string) => void;
  onOpenEstimate: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  variants,
  currentVariantId,
  onSelectVariant,
  onOpenEstimate,
}) => {
  const currentVariant =
    variants.find((v) => v.id === currentVariantId) || variants[0];

  return (
    <section className="relative bg-[#141210] text-white w-full overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')`,
        }}
      >
        {/* Gradients matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/95 via-[#12100E]/85 to-[#12100E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/60" />
      </div>

      {/* Main Hero Container - Full Width w-full without max-w restrictions */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 2xl:px-20 pt-8 sm:pt-10 pb-16 sm:pb-20 flex flex-col justify-between min-h-[760px] lg:min-h-[820px]">
        {/* Top Copy Variant Switcher Card matching screenshot */}
        <div className="w-full bg-[#181614]/85 backdrop-blur-md border border-[#3E3831] rounded-2xl p-4 sm:p-5 mb-10 sm:mb-14 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-[#E4DDD4]">
              <Eye className="w-4 h-4 text-[#B89B72]" />
              <span className="font-semibold text-xs sm:text-[13px] tracking-wide">
                [브랜드 디렉터 추천] 메인 첫 화면 카피라이팅 3가지 버전 실시간 전환
              </span>
            </div>
            <span className="text-[11.5px] text-[#A69E92]">
              * 클릭하여 3가지 카피라이팅 분위기를 즉시 비교해 보세요
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {variants.map((variant) => {
              const isActive = variant.id === currentVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelectVariant(variant.id)}
                  className={`p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#29231D]/90 border-[#B89B72] shadow-lg ring-1 ring-[#B89B72]/60'
                      : 'bg-[#181513]/70 border-[#38322B] hover:border-[#63594D] hover:bg-[#201D1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs sm:text-[13.5px] font-bold ${
                        isActive ? 'text-white' : 'text-[#DDD4C7]'
                      }`}
                    >
                      {variant.label}
                    </span>
                    {isActive && (
                      <span className="text-[9.5px] bg-[#B89B72] text-[#1E1B18] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] sm:text-xs text-[#A89E91] font-light">
                    {variant.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Middle Content */}
        <div className="w-full max-w-6xl mb-12 sm:mb-16">
          {/* Category Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#E6C9A2] text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
            <span>{currentVariant.tag}</span>
          </div>

          {/* Main Big Serif Headline - balanced two-line layout with clean font-size and break-keep */}
          <h1 className="font-serif-kr text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-bold leading-[1.32] tracking-tight text-white mb-6 whitespace-pre-line break-keep drop-shadow-md">
            {currentVariant.heroTitle}
          </h1>

          {/* Subtext */}
          <p className="text-[#D8D0C4] text-base sm:text-lg lg:text-[18px] leading-relaxed mb-10 max-w-3xl whitespace-pre-line font-light break-keep">
            {currentVariant.heroSub}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenEstimate}
              className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-base sm:text-lg font-semibold px-7 sm:px-9 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition-all cursor-pointer group active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{currentVariant.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="#portfolio"
              className="bg-white/10 hover:bg-white/20 text-[#EFEBE4] hover:text-white border border-white/25 text-base sm:text-lg font-medium px-7 sm:px-9 py-4 rounded-xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              주택 시공 사례 갤러리
            </a>
          </div>
        </div>

        {/* 3 Metric Badges across full width matching screenshot */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 pt-8 border-t border-white/15">
          {/* Badge 1 */}
          <div className="bg-[#1C1917]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3E3830] flex flex-col justify-between hover:border-[#B89B72]/60 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#C7A97E] font-semibold mb-2">
                <Award className="w-4 h-4 text-[#B89B72]" />
                <span>20년 직영 공방</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                4,200+ 가구의 이야기 축적
              </h4>
              <p className="text-xs sm:text-sm text-[#A8A095] leading-relaxed font-light">
                외주 하청 없는 100% 자체 직영 제작 시스템으로 1mm의 미세 오차 없이 완벽하게 밀착 시공합니다.
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="bg-[#1C1917]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3E3830] flex flex-col justify-between hover:border-[#6BCB77]/60 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#6BCB77] font-semibold mb-2">
                <ShieldCheck className="w-4 h-4 text-[#6BCB77]" />
                <span>SUPER E0 친환경 100%</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                아이와 반려동물이 안전한 자재
              </h4>
              <p className="text-xs sm:text-sm text-[#A8A095] leading-relaxed font-light">
                포름알데히드 방출량 0.3mg/L 이하의 최고등급 보드와 친환경 천연 오일로 새집증후군 없는 공간을 만듭니다.
              </p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="bg-[#1C1917]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3E3830] flex flex-col justify-between hover:border-[#E5B57A]/60 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#E5B57A] font-semibold mb-2">
                <HeartHandshake className="w-4 h-4 text-[#E5B57A]" />
                <span>평생 무상 케어</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                평생 무상 A/S &amp; 정기 점검
              </h4>
              <p className="text-xs sm:text-sm text-[#A8A095] leading-relaxed font-light">
                시공 후 1년, 3년 차 무상 방문 점검 서비스와 하드웨어(힌지·레일) 평생 품질 보증을 약속합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
