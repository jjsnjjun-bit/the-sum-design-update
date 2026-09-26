import React from 'react';
import { MapPin, Clock, Phone, CalendarCheck, PhoneCall, Sparkles } from 'lucide-react';
import { SHOWROOM_BUILDING_IMAGE } from '../assets/images/showroom_building_base64';

interface ShowroomProps {
  onOpenShowroomModal: () => void;
}

export const Showroom: React.FC<ShowroomProps> = ({ onOpenShowroomModal }) => {
  return (
    <section id="showroom" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#ECE7DE] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Box with Photo as full Background - expanded width & height */}
        <div className="relative rounded-3xl overflow-hidden border border-[#3E3831] shadow-2xl min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] xl:min-h-[780px] flex flex-col bg-[#1A1714]">
          {/* Background Image inside this box */}
          <img
            src={SHOWROOM_BUILDING_IMAGE}
            alt="더 숨 디자인 논현 쇼룸 하우스 전경"
            className="absolute inset-0 w-full h-full object-cover object-[right_center] sm:object-[75%_center] lg:object-[82%_center]"
          />

          {/* Sophisticated dark gradient scrim for readability and warmth while subtly revealing the brick & glass showroom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#161311]/88 via-45% to-[#141210]/35 lg:to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/95 via-transparent to-black/30" />

          {/* Foreground Content - flex-1 with balanced vertical distribution */}
          <div className="relative z-10 flex-1 w-full p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between">
            <div className="max-w-4xl pt-2 sm:pt-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A2520]/85 backdrop-blur-md border border-[#52493E] text-[#E0C59E] text-xs font-bold tracking-wider uppercase mb-7 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A270] animate-pulse" />
                <span>1:1 프라이빗 사전 예약제 운영</span>
              </div>

              {/* Title - Refined, balanced font size with clean Korean word-wrap */}
              <h2 className="font-serif-kr text-2xl sm:text-[28px] lg:text-[34px] xl:text-[38px] font-semibold text-[#FDFBF7] leading-[1.35] mb-5 tracking-tight break-keep drop-shadow-sm">
                실제 맞춤 가구의 질감과 하드웨어를 직접 확인하세요
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-[17px] text-[#D4CCC0] leading-relaxed mb-9 sm:mb-11 font-light max-w-2xl break-keep drop-shadow-xs">
                ㄷ자형 대면형 싱크대, 천연 세라믹 상판의 매끈한 질감, 침실 스위트의 무소음
                소프트 댐핑 도어를 직접 체험할 수 있습니다. 전문 공간 디자이너가 고객님 현장에
                맞춰 즉시 3D 공간 배치 상담을 제공합니다.
              </p>

              {/* Info List */}
              <div className="space-y-4 text-sm sm:text-base text-[#EDE6DC]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#2E2822]/80 backdrop-blur-sm border border-[#4E4437] mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4 text-[#C5A270]" />
                  </div>
                  <span className="pt-0.5 font-medium">더 숨 디자인 하우스</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-lg bg-[#2E2822]/80 backdrop-blur-sm border border-[#4E4437] shrink-0">
                    <Clock className="w-4 h-4 text-[#C5A270]" />
                  </div>
                  <span>화-토 10:00 - 19:00 (사전 예약제 1:1 상담 운영, 일·월 휴무)</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-lg bg-[#2E2822]/80 backdrop-blur-sm border border-[#4E4437] shrink-0">
                    <Phone className="w-4 h-4 text-[#C5A270]" />
                  </div>
                  <span>방문 상담 예약 문의</span>
                </div>
              </div>
            </div>

            {/* Actions & Bottom Tag - pushed cleanly to bottom with mt-auto */}
            <div className="mt-12 lg:mt-16 pt-8 border-t border-[#443C32]/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenShowroomModal}
                  className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer active:scale-98"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>쇼룸 방문 &amp; 3D 견적 예약하기</span>
                </button>

                <a
                  href="tel:02-543-1999"
                  className="bg-[#1C1A18]/90 hover:bg-[#2A2622] text-[#E5DCD0] hover:text-white border border-[#52483C] text-sm sm:text-base font-medium px-7 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer backdrop-blur-md"
                >
                  <PhoneCall className="w-5 h-5 text-[#C5A270]" />
                  <span>전화 상담 연결</span>
                </a>
              </div>

              {/* Floating Glassmorphic Tag */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1F1B17]/85 backdrop-blur-md border border-[#4A4135] text-xs sm:text-sm text-[#D8CFBF]">
                <Sparkles className="w-4 h-4 text-[#C5A270] shrink-0" />
                <div>
                  <span className="font-bold text-[#F4EFE6] block">더 숨 디자인 하우스</span>
                  <span className="text-xs text-[#A89F92]">프리미엄 자재와 하드웨어로 완성된 1:1 맞춤 공간 플래그십</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
