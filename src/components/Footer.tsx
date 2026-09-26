import React from 'react';
import { MapPin, Phone, Mail, Clock, Lock, ShieldCheck, Award, Truck } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  isAuthenticated?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin, isAuthenticated = false }) => {
  return (
    <footer className="bg-[#141210] text-[#A69E93] text-sm pt-20 pb-14 border-t border-[#292521] w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-14 mb-16">
          {/* Brand Info (5 cols) */}
          <div className="xl:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-serif-kr text-2xl font-bold text-white tracking-tight">
                더 숨 디자인
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#2A2621] text-[#C7A97E] font-semibold border border-[#3E3831]">
                EST. 2005
              </span>
            </div>
            <p className="text-xs tracking-[0.2em] text-[#787167] uppercase font-sans mb-5">
              THE SUM BESPOKE SPACE &amp; FURNITURE STUDIO
            </p>

            <p className="text-sm sm:text-base text-[#C2BAB0] font-light leading-relaxed mb-4">
              &ldquo;집은 단순한 공간이 아니라 삶이 펼쳐지는 이야기의 배경입니다.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#8C8479] leading-relaxed mb-8 font-light max-w-lg">
              20년 전통 직영 공방의 장인정신과 1:1 맞춤 라이프스타일 설계를 통해
              가족의 온기가 머무는 프리미엄 주거 공간을 창조합니다.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" /> SUPER E0 100% 보증
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">
                <Award className="w-4 h-4 text-[#B89B72]" /> 평생 무상 A/S
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">
                <Truck className="w-4 h-4 text-[#60A5FA]" /> 전국 무료 직배송
              </span>
            </div>
          </div>

          {/* Showroom & Customer Care (4 cols) */}
          <div className="xl:col-span-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E6DFD5] mb-5 font-sans">
              SHOWROOM &amp; CUSTOMER CARE
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#A69E92]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#B89B72] shrink-0" />
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B89B72] shrink-0" />
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#B89B72] shrink-0" />
                <a href="mailto:thesum1999@naver.com" className="hover:text-white transition-colors">
                  thesum1999@naver.com
                </a>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-5 h-5 text-[#B89B72] shrink-0 mt-0.5" />
                <span className="leading-snug text-[#948C81]">
                  운영 시간: 화-토 10:00 - 18:00 (사전 예약제 1:1 상담 운영, 일·월 휴무)
                </span>
              </div>
            </div>
          </div>

          {/* System & Links (3 cols) */}
          <div className="xl:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E6DFD5] mb-5 font-sans">
              OCAVBIZ SYSTEM
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#9B9387]">
              <li>
                <a href="#brand-story" className="hover:text-[#B89B72] transition-colors">
                  20년 브랜드 스토리
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#B89B72] transition-colors">
                  주력 시공 갤러리 (ㄷ자 싱크대/침실세트)
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#B89B72] transition-colors">
                  품질 보증 및 A/S 규정
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 text-xs sm:text-sm text-[#C7A97E] hover:text-[#E8D4BE] transition-colors cursor-pointer font-medium"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isAuthenticated ? 'CMS 대시보드 바로가기' : '로그인'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Business Registration */}
        <div className="pt-8 border-t border-[#23201C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#70695E]">
          <div>
            상호명: 더 숨 디자인 • 대표이사: 엄태준 • 사업자등록번호: 377-47-00415
          </div>
          <div>
            &copy; 2005-2026 THE SUM DESIGN. All Rights Reserved. Powered by OcavBiz CMS.
          </div>
        </div>
      </div>
    </footer>
  );
};
