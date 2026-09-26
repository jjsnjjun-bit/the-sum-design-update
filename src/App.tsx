import React, { useState } from 'react';
import { Phone, Lock, Sparkles, LayoutDashboard } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Portfolio } from './components/Portfolio';
import { Assurance } from './components/Assurance';
import { Showroom } from './components/Showroom';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Modals
import { EstimateModal } from './components/modals/EstimateModal';
import { ShowroomModal } from './components/modals/ShowroomModal';
import { PortfolioModal } from './components/modals/PortfolioModal';
import { AdminModal } from './components/modals/AdminModal';
import { LoginModal } from './components/modals/LoginModal';

// Data
import {
  COPY_VARIANTS,
  PORTFOLIO_ITEMS,
  WARRANTIES,
  TESTIMONIALS,
  INITIAL_INQUIRIES,
  INITIAL_BOOKINGS,
  INITIAL_NOTICES,
  INITIAL_SITE_CONFIG,
  INITIAL_PHILOSOPHY,
} from './data/content';
import {
  CopyVariant,
  PortfolioItem,
  EstimateInquiry,
  ShowroomBooking,
  Testimonial,
  SiteNotice,
  SiteConfig,
  PhilosophyContent,
} from './types';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Content States managed by CMS
  const [variants, setVariants] = useState<CopyVariant[]>(COPY_VARIANTS);
  const [currentVariantId, setCurrentVariantId] = useState<string>('story');
  const [philosophyContent, setPhilosophyContent] = useState<PhilosophyContent>(INITIAL_PHILOSOPHY);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [inquiries, setInquiries] = useState<EstimateInquiry[]>(INITIAL_INQUIRIES);
  const [bookings, setBookings] = useState<ShowroomBooking[]>(INITIAL_BOOKINGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [notices, setNotices] = useState<SiteNotice[]>(INITIAL_NOTICES);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  // Modal States
  const [isEstimateOpen, setIsEstimateOpen] = useState<boolean>(false);
  const [isShowroomOpen, setIsShowroomOpen] = useState<boolean>(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleUpdateVariant = (updated: CopyVariant) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v)),
    );
  };

  const handleOpenLoginOrAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  const handleAddNewInquiry = (newInquiry: EstimateInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleAddNewBooking = (newBooking: ShowroomBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#242220] flex flex-col font-sans selection:bg-[#B89B72] selection:text-white">
      {/* Top Admin Quick Bar when logged in */}
      {isAuthenticated && (
        <div className="bg-[#181614] text-[#D8B98C] text-xs px-6 py-2 border-b border-[#352F27] flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">오카브 비즈 CMS 활성화됨 (대표 관리자: 엄태준)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#E8D0B3] hover:text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>CMS 대시보드 열기</span>
            </button>
            <span className="text-[#4E4437]">|</span>
            <button
              onClick={handleLogout}
              className="text-[#F87171] hover:text-white transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}

      {/* Main Header with Top Bar */}
      <Header
        onOpenEstimate={() => setIsEstimateOpen(true)}
        onOpenShowroom={() => setIsShowroomOpen(true)}
        onOpenLogin={handleOpenLoginOrAdmin}
        isAuthenticated={isAuthenticated}
      />

      <main className="flex-1">
        {/* Hero Section with Interactive Copywriting Switcher */}
        <Hero
          variants={variants}
          currentVariantId={currentVariantId}
          onSelectVariant={(id) => setCurrentVariantId(id)}
          onOpenEstimate={() => setIsEstimateOpen(true)}
        />

        {/* Section 1: Philosophy & Craftsmanship */}
        <Philosophy
          content={philosophyContent}
          onOpenEstimate={() => setIsEstimateOpen(true)}
        />

        {/* Section 2: Curated Portfolio (더 숨 디자인 주력 시공 갤러리 - 직접 수정 반영) */}
        <Portfolio
          items={portfolioItems}
          onSelectItem={(item) => setSelectedPortfolioItem(item)}
        />

        {/* Section 3: Lifetime Assurance (4대 절대 신뢰 약속) */}
        <Assurance warranties={WARRANTIES} />

        {/* Section 4: Showroom Information (논현 쇼룸 안내) */}
        <Showroom onOpenShowroomModal={() => setIsShowroomOpen(true)} />

        {/* Section 5: Client Stories & Voices (고객 후기) */}
        <Testimonials
          testimonials={testimonials}
          onOpenEstimate={() => setIsEstimateOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLogin={handleOpenLoginOrAdmin} isAuthenticated={isAuthenticated} />

      {/* Floating Bottom-Right CTAs */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Admin Login / CMS Mode Floating Button */}
        <button
          onClick={handleOpenLoginOrAdmin}
          className="bg-[#24211D]/90 hover:bg-[#1A1816] text-[#D8B98C] hover:text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-[#443D34] flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs hover:scale-102"
          title={isAuthenticated ? '오카브 비즈 CMS 관리자 대시보드' : '관리자 로그인'}
        >
          <Lock className="w-3.5 h-3.5 text-[#B89B72]" />
          <span>{isAuthenticated ? 'CMS 통합 관리자' : '관리자 로그인'}</span>
        </button>

        {/* Floating Estimate Button */}
        <button
          onClick={() => setIsEstimateOpen(true)}
          className="bg-[#B89B72] hover:bg-[#A3865D] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-[#B89B72]/20"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>5단계 맞춤 견적 신청</span>
        </button>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccessLogin={handleLoginSuccess}
      />

      {/* Estimate Modal */}
      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
        onAddInquiry={handleAddNewInquiry}
      />

      {/* Showroom Modal */}
      <ShowroomModal
        isOpen={isShowroomOpen}
        onClose={() => setIsShowroomOpen(false)}
        onAddBooking={handleAddNewBooking}
      />

      {/* Portfolio Item Detail Modal */}
      <PortfolioModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onOpenEstimate={() => setIsEstimateOpen(true)}
      />

      {/* Full-Screen Admin CMS Suite */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLogout={handleLogout}
        variants={variants}
        currentVariantId={currentVariantId}
        onUpdateVariant={handleUpdateVariant}
        philosophyContent={philosophyContent}
        onUpdatePhilosophy={setPhilosophyContent}
        portfolioItems={portfolioItems}
        onUpdatePortfolio={setPortfolioItems}
        inquiries={inquiries}
        onUpdateInquiries={setInquiries}
        bookings={bookings}
        onUpdateBookings={setBookings}
        testimonials={testimonials}
        onUpdateTestimonials={setTestimonials}
        notices={notices}
        onUpdateNotices={setNotices}
        siteConfig={siteConfig}
        onUpdateSiteConfig={setSiteConfig}
      />
    </div>
  );
}
