import React from 'react';
import { Star, MessageSquareQuote, Sparkles, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onOpenEstimate: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  onOpenEstimate,
}) => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#ECE7DE] w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="text-center text-xs uppercase tracking-[0.28em] text-[#8C6D45] font-bold block mb-3.5 font-sans">
            CLIENT STORIES &amp; VOICES
          </span>
          <h2 className="text-center font-serif-kr text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-bold text-[#1E1B18] tracking-tight leading-[1.4] sm:leading-[1.44] mb-4 sm:mb-5 break-keep">
            공간이 바꾼 일상, 가족들의 생생한 후기
          </h2>
          <p className="text-center text-sm sm:text-base text-[#736B62] font-light max-w-2xl mx-auto leading-relaxed break-keep">
            가구를 넘어 가족의 라이프스타일을 함께 고민한 소중한 고객님들의 실제 이야기입니다.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid across full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5DFD4] shadow-sm flex flex-col justify-between hover:border-[#C7A97E] hover:shadow-lg transition-all"
            >
              <div>
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5 text-[#E5A83B]">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#A39B90] font-sans">{t.date}</span>
                </div>

                {/* Customer Details */}
                <div className="mb-5">
                  <h4 className="text-base sm:text-lg font-bold text-[#1E1B18]">{t.author}</h4>
                  <p className="text-xs sm:text-sm text-[#8A8175] mt-1">{t.location}</p>
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-[#4E4841] leading-relaxed mb-8 font-light">
                  {t.quote}
                </p>
              </div>

              {/* Brand Director Comment Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F8F5EE] border border-[#EBE4D8] text-xs sm:text-sm text-[#696053]">
                <div className="flex items-center gap-2 font-bold text-[#8C6D45] mb-1.5">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>브랜드 디렉터 코멘트</span>
                </div>
                <p className="leading-relaxed text-[#736B60]">{t.reply}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner matching screenshot */}
        <div className="bg-[#F0EBE1] border border-[#DDD4C5] rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="p-4 rounded-2xl bg-[#E5DDD0] text-[#7A6038] hidden sm:block">
              <Sparkles className="w-6 h-6 text-[#8C6D45]" />
            </div>
            <div>
              <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#1E1B18]">
                당신의 공간도 특별한 이야기로 채워보세요
              </h3>
              <p className="text-sm text-[#70685D] mt-1 font-light">
                전문 공간 디자이너의 1:1 라이프스타일 맞춤 상담은 언제나 열려있습니다.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEstimate}
            className="w-full md:w-auto bg-[#1E1B18] hover:bg-[#332E29] text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-98"
          >
            <span>5단계 견적 상담 접수하기</span>
            <ArrowRight className="w-5 h-5 text-[#B89B72]" />
          </button>
        </div>
      </div>
    </section>
  );
};
