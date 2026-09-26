import React from 'react';
import { Phone, Calendar, Lock, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenEstimate: () => void;
  onOpenShowroom: () => void;
  onOpenLogin: () => void;
  isAuthenticated?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEstimate,
  onOpenShowroom,
  onOpenLogin,
  isAuthenticated = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E4DC] shadow-xs w-full">
      {/* Top Black Bar - Full Width matching screenshot */}
      <div className="bg-[#141210] text-[#D8D4CE] text-xs py-2 px-6 sm:px-10 lg:px-16 2xl:px-20 border-b border-[#2C2926] w-full">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-xs sm:text-[13px] tracking-tight text-[#BBB5AD]">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" /> 20년 전통 직영 공방
            </span>
            <span className="text-[#4E4A45]">•</span>
            <span>평생 무상 A/S</span>
            <span className="text-[#4E4A45]">•</span>
            <span>친환경 Super E0 자재 100%</span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-[13px]">
            <button
              onClick={onOpenShowroom}
              className="flex items-center gap-1.5 text-[#E5D2BA] hover:text-white transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B89B72]" />
              <span className="hover:underline underline-offset-2">논현 쇼룸 1:1 방문 예약제</span>
            </button>
            <span className="text-[#4A443D]">|</span>
            <a
              href="tel:02-543-1999"
              className="flex items-center gap-1 text-[#E5D2BA] hover:text-white transition-colors"
              title="전화 문의"
            >
              <Phone className="w-3 h-3 text-[#B89B72]" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav - Full Width matching screenshot */}
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand Logo with circle icon matching screenshot */}
        <a href="#" className="flex items-center gap-3.5 group">
          {/* Circle Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#201D1A] border border-[#3E3831] flex items-center justify-center text-[#D8B98C] shadow-sm group-hover:bg-[#2C2723] transition-all shrink-0">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M4 19h16v2H4zm1-4h14v2H5zm14-8c0-1.66-1.34-3-3-3H8C6.34 4 5 5.34 5 7v6h14V7zm-2 0v4H7V7c0-.55.45-1 1-1h8c.55 0 1 .45 1 1z" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif-kr text-xl sm:text-2xl font-bold tracking-tight text-[#1E1B18] group-hover:text-[#8C6D45] transition-colors">
                더 숨 디자인
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7A6345] font-semibold border border-[#E3DACB]">
                EST. 2005
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-[#7E7870] uppercase font-sans font-medium">
              THE SUM DESIGN • BESPOKE FURNITURE
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[14.5px] font-medium text-[#46403A]">
          <a
            href="#brand-story"
            className="hover:text-[#B89B72] transition-colors py-1 hover:border-b-2 border-[#B89B72]"
          >
            브랜드 스토리
          </a>
          <a
            href="#portfolio"
            className="hover:text-[#B89B72] transition-colors py-1 hover:border-b-2 border-[#B89B72]"
          >
            시공 갤러리
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[#B89B72] transition-colors py-1 hover:border-b-2 border-[#B89B72]"
          >
            장인정신 &amp; 보증
          </a>
          <a
            href="#reviews"
            className="hover:text-[#B89B72] transition-colors py-1 hover:border-b-2 border-[#B89B72]"
          >
            고객 스토리
          </a>
          <a
            href="#showroom"
            className="hover:text-[#B89B72] transition-colors py-1 hover:border-b-2 border-[#B89B72]"
          >
            쇼룸 안내
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenLogin}
            className={`text-[13px] flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer border ${
              isAuthenticated
                ? 'bg-[#1E1B18] text-[#E5D2BA] border-[#3E3831] hover:bg-[#2C2723]'
                : 'text-[#7A736B] hover:text-[#242220] hover:bg-[#F2EDE4] border-transparent hover:border-[#E2D8CA]'
            }`}
            title={isAuthenticated ? '오카브 비즈 CMS 관리자 모드로 전환' : '관리자 로그인'}
          >
            <Lock className={`w-3.5 h-3.5 ${isAuthenticated ? 'text-[#B89B72]' : 'text-[#A3998F]'}`} />
            <span className="font-medium">{isAuthenticated ? 'CMS 대시보드' : '로그인'}</span>
          </button>

          <button
            onClick={onOpenEstimate}
            className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-[13.5px] sm:text-[14.5px] font-semibold px-4 sm:px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 hover:shadow-md"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>5단계 맞춤 견적 문의</span>
          </button>
        </div>
      </div>
    </header>
  );
};
