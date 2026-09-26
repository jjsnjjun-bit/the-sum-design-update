import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  BarChart3,
  Users,
  Calendar,
  Settings,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Save,
  LogOut,
  Eye,
  Star,
  Bell,
  Search,
  Check,
  ChevronRight,
  UploadCloud,
  FileText,
  AlertCircle,
  Clock,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  Compass,
} from 'lucide-react';
import {
  CopyVariant,
  PortfolioItem,
  EstimateInquiry,
  ShowroomBooking,
  Testimonial,
  SiteNotice,
  SiteConfig,
  PhilosophyContent,
} from '../../types';
import { SeoTrafficChart } from '../admin/SeoTrafficChart';
import { InquiryFormModal } from '../admin/InquiryFormModal';
import { BookingFormModal } from '../admin/BookingFormModal';
import { TestimonialFormModal, NoticeFormModal } from '../admin/ReviewAndNoticeModals';
import { PhilosophyEditor } from '../admin/PhilosophyEditor';
import { ConfirmDialog } from '../admin/ConfirmDialog';
import { KITCHEN_C_SHAPE_IMAGE } from '../../assets/images/kitchen_c_shape_base64';
import { WOOD_ISLAND_TABLE_IMAGE } from '../../assets/images/wood_island_table_base64';
import { BESPOKE_HOMEBAR_IMAGE } from '../../assets/images/bespoke_homebar_base64';
import { BEDROOM_WARDROBE_VANITY_IMAGE } from '../../assets/images/bedroom_wardrobe_vanity_base64';
import { LIVING_LIBRARY_STUDY_IMAGE } from '../../assets/images/living_library_study_base64';
import { ISLAND_COUNTER_KITCHEN_IMAGE } from '../../assets/images/island_counter_kitchen_base64';

export type AdminTabType =
  | 'overview'
  | 'copy'
  | 'philosophy'
  | 'portfolio'
  | 'leads'
  | 'showroom'
  | 'reviews'
  | 'settings';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  variants: CopyVariant[];
  currentVariantId: string;
  onUpdateVariant: (updated: CopyVariant) => void;
  philosophyContent: PhilosophyContent;
  onUpdatePhilosophy: (content: PhilosophyContent) => void;
  portfolioItems: PortfolioItem[];
  onUpdatePortfolio: (items: PortfolioItem[]) => void;
  inquiries: EstimateInquiry[];
  onUpdateInquiries: (inquiries: EstimateInquiry[]) => void;
  bookings: ShowroomBooking[];
  onUpdateBookings: (bookings: ShowroomBooking[]) => void;
  testimonials: Testimonial[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  notices: SiteNotice[];
  onUpdateNotices: (notices: SiteNotice[]) => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  variants,
  currentVariantId,
  onUpdateVariant,
  philosophyContent,
  onUpdatePhilosophy,
  portfolioItems,
  onUpdatePortfolio,
  inquiries,
  onUpdateInquiries,
  bookings,
  onUpdateBookings,
  testimonials,
  onUpdateTestimonials,
  notices,
  onUpdateNotices,
  siteConfig,
  onUpdateSiteConfig,
}) => {
  const [activeMenu, setActiveMenu] = useState<AdminTabType>('overview');

  // ================= 1. Overview Live Memo & Workshop State =================
  const [directorMemo, setDirectorMemo] = useState({
    title: '2026 직영 공방 가을 성수기 품질 관리 & 주문 가동 지침',
    author: '엄태준 대표',
    priority: '긴급 지시',
    date: '2026.09.22',
    content:
      '반포 래미안 원베일리 ㄷ자형 대면형 오픈키친 및 판교 운중동 화이트오크 통원목 식탁 3D 도면 검수가 완료되었습니다. Blum 정품 레그라박스 댐핑 레일 및 라미남 12T 포세린 상판 단차 1mm 이내 전수 검사 후 출고 일정 준수 바랍니다.',
  });
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoForm, setMemoForm] = useState({ ...directorMemo });

  // Overview Workshop KPIs
  const [workshopKPIs, setWorkshopKPIs] = useState({
    monthlyTarget: 150,
    factoryRate: 94.8,
    inspectionMemo: '20년 직영 공방 전수 1:1 품질 감리 및 대표 직접 검수',
  });
  const [isEditingKPIs, setIsEditingKPIs] = useState(false);
  const [kpiForm, setKpiForm] = useState({ ...workshopKPIs });

  // ================= 2. Copywriting Form State =================
  const currentVariant = variants.find((v) => v.id === currentVariantId) || variants[0];
  const [editTitle, setEditTitle] = useState<string>(currentVariant.heroTitle);
  const [editSub, setEditSub] = useState<string>(currentVariant.heroSub);
  const [editCta, setEditCta] = useState<string>(currentVariant.ctaText);

  useEffect(() => {
    setEditTitle(currentVariant.heroTitle);
    setEditSub(currentVariant.heroSub);
    setEditCta(currentVariant.ctaText);
  }, [currentVariant]);

  // ================= 3. Portfolio Form State =================
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState<boolean>(false);
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({
    category: 'kitchen-c',
    categoryLabel: 'ㄷ자형 대면형 싱크대',
    isBest: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    locationInfo: '신축 아파트 • 48평형 • 2026.09',
    title: '',
    description: '',
    specs: ['Super E0 친환경', '이태리 천연 세라믹 상판', 'Blum 정품 댐핑 하드웨어'],
  });
  const [portfolioFilter, setPortfolioFilter] = useState<string>('all');
  const [portfolioSearch, setPortfolioSearch] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset sample photography for quick pick
  const PORTFOLIO_PRESETS = [
    {
      title: 'ㄷ자형 대면형 오픈 키친',
      category: 'kitchen-c' as const,
      categoryLabel: 'ㄷ자형 대면형 싱크대',
      url: KITCHEN_C_SHAPE_IMAGE,
    },
    {
      title: '통원목 아일랜드 식탁 & 조리대',
      category: 'island-dining' as const,
      categoryLabel: '아일랜드 식탁 & 조리대',
      url: WOOD_ISLAND_TABLE_IMAGE,
    },
    {
      title: '비스포크 키친핏 냉장고장 & 팬트리',
      category: 'fridge-pantry' as const,
      categoryLabel: '냉장고장 & 팬트리',
      url: BESPOKE_HOMEBAR_IMAGE,
    },
    {
      title: '호텔 스위트 침실 맞춤 가구 세트',
      category: 'bedroom' as const,
      categoryLabel: '침실 맞춤 가구 세트',
      url: BEDROOM_WARDROBE_VANITY_IMAGE,
    },
    {
      title: '거실 서재형 라운드 데스크 & 윈도우 데이베드',
      category: 'living-library' as const,
      categoryLabel: '거실/서재 맞춤 수납',
      url: LIVING_LIBRARY_STUDY_IMAGE,
    },
    {
      title: '대면형 아일랜드 & 원목 다이닝 카운터 일체형',
      category: 'island-dining' as const,
      categoryLabel: '아일랜드 식탁',
      url: ISLAND_COUNTER_KITCHEN_IMAGE,
    },
  ];

  // ================= 4. Inquiries Modal State =================
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<EstimateInquiry | null>(null);

  // ================= 5. Bookings Modal State =================
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<ShowroomBooking | null>(null);

  // ================= 6. Reviews & Notices Modals =================
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<SiteNotice | null>(null);

  // ================= 7. SEO & Site Config State =================
  const [localSiteConfig, setLocalSiteConfig] = useState<SiteConfig>(siteConfig);

  // Feedback Notification Banner
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  const triggerFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // In-App Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    itemTitle?: string;
    message?: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    onConfirm: () => {},
  });

  if (!isOpen) return null;

  // ================= Handlers: Overview Memo & KPIs =================
  const handleSaveMemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectorMemo({ ...memoForm });
    setIsEditingMemo(false);
    triggerFeedback('공방 현장 운영 메모가 실시간 저장되었습니다.');
  };

  const handleClearMemo = () => {
    setConfirmDialog({
      isOpen: true,
      title: '운영 메모 초기화 확인',
      itemTitle: directorMemo.title,
      message: '공방 운영 메모 내용을 완전히 초기화하시겠습니까? 초기화 후 새로운 메모를 작성할 수 있습니다.',
      confirmLabel: '초기화 실행',
      variant: 'warning',
      onConfirm: () => {
        const cleared = {
          title: '새로운 현장 지시 및 운영 메모를 작성하세요',
          author: '엄태준 대표',
          priority: '일반',
          date: new Date().toISOString().split('T')[0],
          content: '',
        };
        setDirectorMemo(cleared);
        setMemoForm(cleared);
        triggerFeedback('운영 메모가 초기화되었습니다.');
      },
    });
  };

  const handleSaveKPIs = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkshopKPIs({ ...kpiForm });
    setIsEditingKPIs(false);
    triggerFeedback('직영 공방 가동률 및 월간 목표 수치가 반영되었습니다.');
  };

  // ================= Handlers: Copywriting =================
  const handleSaveCopy = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateVariant({
      ...currentVariant,
      heroTitle: editTitle,
      heroSub: editSub,
      ctaText: editCta,
    });
    triggerFeedback('메인 카피라이팅이 홈페이지에 즉시 반영되었습니다!');
  };

  // ================= Handlers: Portfolio =================
  const handleOpenAddPortfolio = () => {
    setEditingPortfolioItem(null);
    setPortfolioForm({
      category: 'kitchen-c',
      categoryLabel: 'ㄷ자형 대면형 싱크대',
      isBest: false,
      image: PORTFOLIO_PRESETS[0].url,
      locationInfo: '신축 아파트 • 48평형 • 2026.09',
      title: '',
      description: '',
      specs: ['Super E0 친환경 도장', '이태리 포세린 세라믹', 'Blum 정품 하드웨어'],
    });
    setIsAddingPortfolio(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioItem(item);
    setPortfolioForm({ ...item });
    setIsAddingPortfolio(true);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerFeedback('이미지 파일(JPG, PNG, WebP 등)만 업로드 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPortfolioForm((prev) => ({
          ...prev,
          image: event.target!.result as string,
        }));
        triggerFeedback(`'${file.name}' 사진 파일이 성공적으로 로드되었습니다.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.title?.trim() || !portfolioForm.image?.trim()) {
      triggerFeedback('시공 프로젝트 타이틀과 사진(이미지)은 필수 입력 항목입니다.');
      return;
    }

    if (editingPortfolioItem) {
      const updated = portfolioItems.map((item) =>
        item.id === editingPortfolioItem.id
          ? ({ ...item, ...portfolioForm } as PortfolioItem)
          : item,
      );
      onUpdatePortfolio(updated);
      triggerFeedback('시공 갤러리 사례가 성공적으로 수정되었습니다.');
    } else {
      const newItem: PortfolioItem = {
        id: `item-${Date.now()}`,
        category: (portfolioForm.category || 'kitchen-c') as any,
        categoryLabel: portfolioForm.categoryLabel || '맞춤 시공',
        isBest: portfolioForm.isBest ?? false,
        image: portfolioForm.image || '',
        locationInfo: portfolioForm.locationInfo || '신축 아파트 • 맞춤 시공',
        title: portfolioForm.title || '새 맞춤 시공 사례',
        description: portfolioForm.description || '',
        specs: portfolioForm.specs && portfolioForm.specs.length > 0
          ? portfolioForm.specs
          : ['Super E0 친환경'],
      };
      onUpdatePortfolio([newItem, ...portfolioItems]);
      triggerFeedback('새 시공 사례가 갤러리에 직접 등록되었습니다.');
    }

    setIsAddingPortfolio(false);
    setEditingPortfolioItem(null);
  };

  const handleDeletePortfolio = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: '시공 사례 영구 삭제',
      itemTitle: title,
      message: '해당 시공 사례를 갤러리 아카이브에서 완전히 삭제하시겠습니까? 홈페이지 포트폴리오 섹션과 관리자 목록에서 즉시 제거됩니다.',
      confirmLabel: '시공 사례 삭제',
      variant: 'danger',
      onConfirm: () => {
        onUpdatePortfolio(portfolioItems.filter((i) => i.id !== id));
        triggerFeedback(`'${title}' 시공 사례가 성공적으로 삭제되었습니다.`);
      },
    });
  };

  // ================= Handlers: Inquiries =================
  const handleSaveInquiry = (inquiry: EstimateInquiry) => {
    if (editingInquiry) {
      onUpdateInquiries(
        inquiries.map((inq) => (inq.id === inquiry.id ? inquiry : inq)),
      );
      triggerFeedback(`견적 신청 건(${inquiry.name})이 성공적으로 수정되었습니다.`);
    } else {
      onUpdateInquiries([inquiry, ...inquiries]);
      triggerFeedback(`새 견적 신청 건(${inquiry.name})이 직접 등록되었습니다.`);
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: EstimateInquiry['status']) => {
    onUpdateInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)),
    );
    triggerFeedback(`견적 진행상태가 '${newStatus}'(으)로 변경되었습니다.`);
  };

  const handleDeleteInquiry = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: '맞춤 견적 신청 데이터 삭제',
      itemTitle: `${name} 고객님 견적 건`,
      message: '해당 고객님의 5단계 맞춤 견적 신청 데이터를 완전히 삭제하시겠습니까?',
      confirmLabel: '견적 데이터 삭제',
      variant: 'danger',
      onConfirm: () => {
        onUpdateInquiries(inquiries.filter((inq) => inq.id !== id));
        triggerFeedback(`'${name}' 고객님의 견적 데이터가 삭제되었습니다.`);
      },
    });
  };

  // ================= Handlers: Bookings =================
  const handleSaveBooking = (booking: ShowroomBooking) => {
    if (editingBooking) {
      onUpdateBookings(
        bookings.map((b) => (b.id === booking.id ? booking : b)),
      );
      triggerFeedback(`쇼룸 예약(${booking.name})이 성공적으로 수정되었습니다.`);
    } else {
      onUpdateBookings([booking, ...bookings]);
      triggerFeedback(`새 쇼룸 예약(${booking.name})이 직접 등록되었습니다.`);
    }
  };

  const handleUpdateBookingStatus = (id: string, newStatus: ShowroomBooking['status']) => {
    onUpdateBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
    triggerFeedback(`쇼룸 예약상태가 '${newStatus}'(으)로 변경되었습니다.`);
  };

  const handleDeleteBooking = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: '쇼룸 1:1 방문 예약 일정 삭제',
      itemTitle: `${name} 고객님 예약`,
      message: '해당 고객님의 쇼룸 1:1 방문 예약 일정을 삭제하시겠습니까?',
      confirmLabel: '예약 일정 삭제',
      variant: 'danger',
      onConfirm: () => {
        onUpdateBookings(bookings.filter((b) => b.id !== id));
        triggerFeedback(`'${name}' 고객님의 쇼룸 예약 일정이 삭제되었습니다.`);
      },
    });
  };

  // ================= Handlers: Testimonials =================
  const handleSaveTestimonial = (testimonial: Testimonial) => {
    if (editingTestimonial) {
      onUpdateTestimonials(
        testimonials.map((t) => (t.id === testimonial.id ? testimonial : t)),
      );
      triggerFeedback('고객 후기가 수정되었습니다.');
    } else {
      onUpdateTestimonials([testimonial, ...testimonials]);
      triggerFeedback('새 고객 후기가 등록되었습니다.');
    }
  };

  const handleDeleteTestimonial = (id: string, author: string) => {
    setConfirmDialog({
      isOpen: true,
      title: '고객 리얼 후기 삭제',
      itemTitle: `${author} 고객 리뷰`,
      message: '해당 고객 후기를 홈페이지와 관리 목록에서 완전히 삭제하시겠습니까?',
      confirmLabel: '후기 삭제',
      variant: 'danger',
      onConfirm: () => {
        onUpdateTestimonials(testimonials.filter((t) => t.id !== id));
        triggerFeedback(`'${author}' 고객님의 후기가 삭제되었습니다.`);
      },
    });
  };

  // ================= Handlers: Notices =================
  const handleSaveNotice = (notice: SiteNotice) => {
    if (editingNotice) {
      onUpdateNotices(
        notices.map((n) => (n.id === notice.id ? notice : n)),
      );
      triggerFeedback('공지사항이 수정되었습니다.');
    } else {
      onUpdateNotices([notice, ...notices]);
      triggerFeedback('새 공지사항이 등록되었습니다.');
    }
  };

  const handleDeleteNotice = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: '공지사항 삭제',
      itemTitle: title,
      message: '해당 공지사항을 완전히 삭제하시겠습니까?',
      confirmLabel: '공지사항 삭제',
      variant: 'danger',
      onConfirm: () => {
        onUpdateNotices(notices.filter((n) => n.id !== id));
        triggerFeedback(`'${title}' 공지사항이 삭제되었습니다.`);
      },
    });
  };

  // ================= Handlers: Site Config =================
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(localSiteConfig);
    triggerFeedback('사이트 기본 정보 및 SEO 메타데이터가 저장되었습니다.');
  };

  const filteredPortfolio = portfolioItems
    .filter((item) => portfolioFilter === 'all' || item.category === portfolioFilter)
    .filter(
      (item) =>
        !portfolioSearch ||
        item.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
        item.locationInfo.toLowerCase().includes(portfolioSearch.toLowerCase()),
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-[1780px] h-[95vh] bg-[#141210] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#3E3831] overflow-hidden flex flex-col">
        {/* ================= 상단 통합 바 (Top Bar) ================= */}
        <div className="bg-[#1C1916] text-[#E4DDD3] px-6 py-3.5 border-b border-[#2C2721] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <div className="text-xs sm:text-sm font-semibold text-[#D8B98C] flex items-center gap-2">
              <span className="font-mono tracking-wider">THE SUM DESIGN • OCAVBIZ CMS</span>
              <span className="text-[#686055]">•</span>
              <span className="text-white font-serif-kr text-sm sm:text-base">
                통합 관리자 관제 센터
              </span>
            </div>
            {saveSuccessMsg && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-[#065F46] text-[#A7F3D0] border border-[#047857] px-3.5 py-1 rounded-full font-medium animate-fade-in shadow-xs">
                <Check className="w-3.5 h-3.5" />
                <span>{saveSuccessMsg}</span>
              </span>
            )}
          </div>

          {/* Right Action Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="bg-[#2B2620] hover:bg-[#3D362E] text-[#E5D2BA] hover:text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-[#443D34]"
              title="홈페이지 화면으로 이동"
            >
              <Eye className="w-4 h-4 text-[#B89B72]" />
              <span>사이트 뷰 전환</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-[#382622] hover:bg-[#4E2B25] text-[#FCA5A5] hover:text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-[#683028]"
              title="관리자 세션 로그아웃"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#2B2620] hover:bg-[#3D362E] text-[#B8AE9F] hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= 2-Column Split: Sidebar & Main Area ================= */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* ================= 좌측 사이드바 ================= */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 bg-[#181614] border-r border-[#2C2722] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Brand Profile Card */}
              <div className="p-4 rounded-xl bg-[#221F1B] border border-[#3A342C] mb-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#B89B72] text-[#1E1B18] font-serif-kr font-bold flex items-center justify-center text-lg shadow-sm">
                    숨
                  </div>
                  <div>
                    <h3 className="font-serif-kr font-bold text-white text-base leading-tight">
                      더 숨 디자인
                    </h3>
                    <p className="text-[11px] text-[#A69E92] font-mono">
                      The Sum Master Studio
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 border-t border-[#332D25] flex items-center justify-between text-xs text-[#C7A97E]">
                  <span className="font-semibold text-white">대표 관리자: 엄태준</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#352F27] text-[#E8D0B3] font-mono font-bold">
                    MASTER
                  </span>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#7A7266] uppercase tracking-wider px-3 mb-2 font-mono">
                  CONTENT &amp; DATA MANAGEMENT
                </div>

                {/* 1. 통합 대시보드 개요 */}
                <button
                  onClick={() => setActiveMenu('overview')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'overview'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4" />
                    <span>통합 대시보드 개요</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                {/* 2. 메인 카피라이팅 CMS */}
                <button
                  onClick={() => setActiveMenu('copy')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'copy'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4" />
                    <span>메인 카피라이팅 CMS</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'copy'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    3개 버전
                  </span>
                </button>

                {/* 2-1. 브랜드 철학 CMS (신규) */}
                <button
                  onClick={() => setActiveMenu('philosophy')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'philosophy'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4" />
                    <span>브랜드 철학 CMS</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'philosophy'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    글•사진•가치
                  </span>
                </button>

                {/* 3. 시공 갤러리 CMS */}
                <button
                  onClick={() => setActiveMenu('portfolio')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'portfolio'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-4 h-4" />
                    <span>시공 갤러리 아카이브 CMS</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'portfolio'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    {portfolioItems.length}건
                  </span>
                </button>

                {/* 4. 5단계 견적 관리 */}
                <button
                  onClick={() => setActiveMenu('leads')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'leads'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    <span>5단계 견적 유입 관리</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'leads'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    {inquiries.length}건
                  </span>
                </button>

                {/* 5. 쇼룸 방문 1:1 예약 갤러리 */}
                <button
                  onClick={() => setActiveMenu('showroom')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'showroom'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    <span>쇼룸 1:1 예약 갤러리</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'showroom'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    {bookings.length}건
                  </span>
                </button>

                {/* 6. 후기 및 공지 관리 */}
                <button
                  onClick={() => setActiveMenu('reviews')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'reviews'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4" />
                    <span>후기 및 공지사항 관리</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeMenu === 'reviews'
                        ? 'bg-[#1E1B18] text-white'
                        : 'bg-[#2E2822] text-[#D8B98C]'
                    }`}
                  >
                    {testimonials.length + notices.length}
                  </span>
                </button>

                {/* 7. 사이트 정보 & SEO */}
                <button
                  onClick={() => setActiveMenu('settings')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeMenu === 'settings'
                      ? 'bg-[#B89B72] text-[#1E1B18] shadow-md font-bold'
                      : 'text-[#C5BDB2] hover:bg-[#24201C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    <span>사이트 정보 &amp; SEO 분석</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            {/* Sidebar Bottom Status */}
            <div className="pt-6 border-t border-[#2C2722] mt-6">
              <div className="p-3.5 rounded-xl bg-[#201D19] border border-[#332D25] text-xs text-[#9E9588]">
                <div className="flex items-center justify-between mb-1.5 text-[#D8B98C] font-semibold">
                  <span>직영 공방 실시간 가동률</span>
                  <span>{workshopKPIs.factoryRate}%</span>
                </div>
                <div className="w-full bg-[#352F27] h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    style={{ width: `${Math.min(workshopKPIs.factoryRate, 100)}%` }}
                    className="bg-[#B89B72] h-full rounded-full transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#7A7266] truncate">
                  {workshopKPIs.inspectionMemo}
                </p>
              </div>
            </div>
          </aside>

          {/* ================= 우측 대시보드 메인 콘텐츠 ================= */}
          <main className="flex-1 bg-[#FBF9F5] flex flex-col overflow-hidden text-[#1E1B18]">
            {/* Top Interactive Breadcrumb Header */}
            <header className="px-8 py-5 bg-white border-b border-[#EAE3D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-xs">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8C6D45] font-bold font-mono">
                  {activeMenu === 'overview' && 'SYSTEM OVERVIEW & LIVE CONTROL'}
                  {activeMenu === 'copy' && 'LIVE COPYWRITING CMS'}
                  {activeMenu === 'philosophy' && 'BRAND PHILOSOPHY & CRAFTSMANSHIP CMS (FULL CRUD & PHOTO UPLOAD)'}
                  {activeMenu === 'portfolio' && 'PORTFOLIO ARCHIVE CMS (IMAGE UPLOAD & CRUD)'}
                  {activeMenu === 'leads' && '5-STEP ESTIMATE INQUIRIES MANAGEMENT (FULL CRUD)'}
                  {activeMenu === 'showroom' && '1:1 SHOWROOM RESERVATION GALLERY (FULL CRUD)'}
                  {activeMenu === 'reviews' && 'CLIENT REVIEWS & NOTICES CMS (FULL CRUD)'}
                  {activeMenu === 'settings' && 'SITE METADATA & SEO PERFORMANCE METRICS'}
                </div>
                <h2 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18] mt-0.5">
                  {activeMenu === 'overview' && '더 숨 디자인 통합 관제 대시보드 개요'}
                  {activeMenu === 'copy' && '메인 카피라이팅 CMS (A/B/C 버전 선택 및 문구 즉시 수정)'}
                  {activeMenu === 'philosophy' && '브랜드 철학 & 장인정신 CMS (글 직접 수정 / 사진 파일 업로드 / 핵심 가치 CRUD)'}
                  {activeMenu === 'portfolio' && '시공 갤러리 아카이브 CMS (사진 업로드 / 수정 / 삭제)'}
                  {activeMenu === 'leads' && '5단계 맞춤 견적 유입 관리 (직접 작성 / 수정 / 삭제)'}
                  {activeMenu === 'showroom' && '논현 쇼룸 1:1 방문 예약 갤러리 (직접 등록 / 수정 / 삭제)'}
                  {activeMenu === 'reviews' && '고객 리얼 후기 및 공지사항 관리 (직접 등록 / 수정 / 삭제)'}
                  {activeMenu === 'settings' && '사이트 정보 & SEO 분석 (트래픽 차트 & 메타데이터)'}
                </h2>
              </div>

              {/* Header Right Dynamic Actions */}
              <div className="flex items-center gap-2.5">
                {activeMenu === 'portfolio' && (
                  <button
                    onClick={handleOpenAddPortfolio}
                    className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 시공사진 등록</span>
                  </button>
                )}

                {activeMenu === 'leads' && (
                  <button
                    onClick={() => {
                      setEditingInquiry(null);
                      setIsInquiryModalOpen(true);
                    }}
                    className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 견적 건 직접 작성</span>
                  </button>
                )}

                {activeMenu === 'showroom' && (
                  <button
                    onClick={() => {
                      setEditingBooking(null);
                      setIsBookingModalOpen(true);
                    }}
                    className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 쇼룸 예약 등록</span>
                  </button>
                )}

                {activeMenu === 'reviews' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingNotice(null);
                        setIsNoticeModalOpen(true);
                      }}
                      className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 공지 등록</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsTestimonialModalOpen(true);
                      }}
                      className="bg-[#1E1B18] hover:bg-[#332E29] text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#B89B72]" />
                      <span>새 후기 등록</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="bg-[#1E1B18] hover:bg-[#332E29] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#B89B72]" />
                  <span>실시간 확인</span>
                </button>
              </div>
            </header>

            {/* Scrollable Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8">
              {/* ================= 1. 통합 대시보드 개요 (Overview) ================= */}
              {activeMenu === 'overview' && (
                <div className="space-y-8">
                  {/* Top Quick Actions Launchpad */}
                  <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFC9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif-kr text-base font-bold text-[#1E1B18] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#B89B72]" />
                        <span>관리자 원클릭 빠른 작성 &amp; 등록</span>
                      </h4>
                      <p className="text-xs text-[#7A7266] mt-0.5">
                        필요한 작업을 바로 선택해 즉시 작성, 업로드, 수정 및 삭제할 수 있습니다.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={handleOpenAddPortfolio}
                        className="bg-white hover:bg-[#FAF6EE] text-[#8C6D45] border border-[#D5CDC2] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <ImageIcon className="w-4 h-4 text-[#B89B72]" />
                        <span>시공 사진 등록</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingInquiry(null);
                          setIsInquiryModalOpen(true);
                        }}
                        className="bg-white hover:bg-[#FAF6EE] text-[#8C6D45] border border-[#D5CDC2] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Users className="w-4 h-4 text-[#10B981]" />
                        <span>견적 신청 작성</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingBooking(null);
                          setIsBookingModalOpen(true);
                        }}
                        className="bg-white hover:bg-[#FAF6EE] text-[#8C6D45] border border-[#D5CDC2] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Calendar className="w-4 h-4 text-[#3B82F6]" />
                        <span>쇼룸 예약 등록</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingNotice(null);
                          setIsNoticeModalOpen(true);
                        }}
                        className="bg-white hover:bg-[#FAF6EE] text-[#8C6D45] border border-[#D5CDC2] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Bell className="w-4 h-4 text-[#F59E0B]" />
                        <span>공지사항 등록</span>
                      </button>
                      <button
                        onClick={() => setActiveMenu('philosophy')}
                        className="bg-white hover:bg-[#FAF6EE] text-[#8C6D45] border border-[#D5CDC2] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Compass className="w-4 h-4 text-[#B89B72]" />
                        <span>브랜드 철학 수정</span>
                      </button>
                    </div>
                  </div>

                  {/* Metric Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
                          ESTIMATE INQUIRIES
                        </span>
                        <div className="p-2 rounded-lg bg-[#FAF6EE] text-[#8C6D45]">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold font-serif-kr text-[#1E1B18]">
                          {inquiries.length}
                          <span className="text-lg font-sans font-normal text-[#8A8174] ml-1">건</span>
                        </div>
                        <p className="text-xs text-[#10B981] font-semibold mt-2 flex items-center gap-1">
                          <span>↑ 24.2%</span>
                          <span className="text-[#8A8174] font-normal">
                            월간 목표 {workshopKPIs.monthlyTarget}건 대비 {Math.round((inquiries.length / workshopKPIs.monthlyTarget) * 100)}%
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
                          PORTFOLIO ARCHIVE
                        </span>
                        <div className="p-2 rounded-lg bg-[#FAF6EE] text-[#8C6D45]">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold font-serif-kr text-[#1E1B18]">
                          {portfolioItems.length}
                          <span className="text-lg font-sans font-normal text-[#8A8174] ml-1">개 현장</span>
                        </div>
                        <p className="text-xs text-[#8A8174] font-medium mt-2">
                          ㄷ자형 싱크대, 아일랜드, 침실 세트
                        </p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
                          SHOWROOM BOOKINGS
                        </span>
                        <div className="p-2 rounded-lg bg-[#FAF6EE] text-[#8C6D45]">
                          <Calendar className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold font-serif-kr text-[#1E1B18]">
                          {bookings.length}
                          <span className="text-lg font-sans font-normal text-[#8A8174] ml-1">팀 확정</span>
                        </div>
                        <p className="text-xs text-[#8A8174] font-medium mt-2">
                          논현 쇼룸 1-3F 전담 디자이너 1:1 배정
                        </p>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
                          DIRECTOR &amp; QUALITY
                        </span>
                        <div className="p-2 rounded-lg bg-[#FAF6EE] text-[#10B981]">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#1E1B18]">
                          엄태준 대표
                        </div>
                        <p className="text-xs text-[#8A8174] font-medium mt-2 truncate">
                          가동률 {workshopKPIs.factoryRate}% • 1:1 전수 감리
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ================= Editable Section: Director's Live Memo & Operational Directives ================= */}
                  <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE3D6]">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-[#B89B72]" />
                        <div>
                          <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18]">
                            공방 현장 운영 메모 &amp; 긴급 지시사항 (직접 작성/수정/삭제)
                          </h3>
                          <p className="text-xs text-[#7A7266]">
                            대표 관리자가 이 내용을 직접 쓰고, 지우고, 다시 올릴 수 있습니다.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isEditingMemo ? (
                          <>
                            <button
                              onClick={() => {
                                setMemoForm({ ...directorMemo });
                                setIsEditingMemo(true);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F2E7D5] text-[#8C6D45] border border-[#E3DACB] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>메모 직접 수정</span>
                            </button>
                            <button
                              onClick={handleClearMemo}
                              className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>지우기</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setIsEditingMemo(false)}
                            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
                          >
                            닫기
                          </button>
                        )}
                      </div>
                    </div>

                    {isEditingMemo ? (
                      <form onSubmit={handleSaveMemo} className="space-y-4 p-4 bg-[#FAF7F2] rounded-xl border border-[#E3DACB] animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-[#3E3831] mb-1">
                              메모 타이틀 *
                            </label>
                            <input
                              type="text"
                              required
                              value={memoForm.title}
                              onChange={(e) => setMemoForm({ ...memoForm, title: e.target.value })}
                              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#3E3831] mb-1">
                              우선순위 구분
                            </label>
                            <select
                              value={memoForm.priority}
                              onChange={(e) => setMemoForm({ ...memoForm, priority: e.target.value })}
                              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                            >
                              <option value="긴급 지시">긴급 지시</option>
                              <option value="품질 관리">품질 관리</option>
                              <option value="일반 공지">일반 공지</option>
                              <option value="납기 일정">납기 일정</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#3E3831] mb-1">
                            지시 상세 내용 *
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={memoForm.content}
                            onChange={(e) => setMemoForm({ ...memoForm, content: e.target.value })}
                            placeholder="공방 실시간 제작 현황, 시공 지시사항, 하드웨어 점검 메모를 작성하세요."
                            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72] leading-relaxed"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsEditingMemo(false)}
                            className="px-4 py-2 rounded-lg border border-[#D5CDC2] bg-white text-xs font-semibold text-[#5A5145]"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs font-bold px-5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>메모 내용 저장하기</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D6] space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B89B72] text-white">
                              {directorMemo.priority}
                            </span>
                            <h4 className="font-serif-kr text-base font-bold text-[#1E1B18]">
                              {directorMemo.title}
                            </h4>
                          </div>
                          <span className="text-xs text-[#8A8174] font-mono">
                            {directorMemo.date} • {directorMemo.author}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#4A4237] leading-relaxed whitespace-pre-line bg-white/70 p-3.5 rounded-lg border border-[#EBE3D7]">
                          {directorMemo.content || '(등록된 메모 내용이 없습니다. [메모 직접 수정]을 눌러 작성하세요.)'}
                        </p>
                      </div>
                    )}

                    {/* Operational KPI Direct Adjuster */}
                    <div className="pt-2">
                      {!isEditingKPIs ? (
                        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B6154] bg-[#FAF6EE] p-3 rounded-xl border border-[#EADFCF]">
                          <div className="flex items-center gap-4">
                            <span>
                              월간 목표: <strong>{workshopKPIs.monthlyTarget}건</strong>
                            </span>
                            <span>•</span>
                            <span>
                              실시간 가동률: <strong>{workshopKPIs.factoryRate}%</strong>
                            </span>
                            <span>•</span>
                            <span>{workshopKPIs.inspectionMemo}</span>
                          </div>
                          <button
                            onClick={() => {
                              setKpiForm({ ...workshopKPIs });
                              setIsEditingKPIs(true);
                            }}
                            className="text-xs font-bold text-[#8C6D45] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>목표치 &amp; 가동률 변경</span>
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSaveKPIs} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E3DACB] space-y-3 animate-fade-in">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <label className="block font-bold text-[#3E3831] mb-1">
                                월간 목표 수주 건수
                              </label>
                              <input
                                type="number"
                                value={kpiForm.monthlyTarget}
                                onChange={(e) => setKpiForm({ ...kpiForm, monthlyTarget: Number(e.target.value) })}
                                className="w-full p-2 rounded-lg border border-[#D5CDC2] bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-[#3E3831] mb-1">
                                실시간 공방 가동률 (%)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={kpiForm.factoryRate}
                                onChange={(e) => setKpiForm({ ...kpiForm, factoryRate: Number(e.target.value) })}
                                className="w-full p-2 rounded-lg border border-[#D5CDC2] bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-[#3E3831] mb-1">
                                책임자 품질 문구
                              </label>
                              <input
                                type="text"
                                value={kpiForm.inspectionMemo}
                                onChange={(e) => setKpiForm({ ...kpiForm, inspectionMemo: e.target.value })}
                                className="w-full p-2 rounded-lg border border-[#D5CDC2] bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setIsEditingKPIs(false)}
                              className="px-3 py-1.5 rounded-lg border border-[#D5CDC2] bg-white text-xs"
                            >
                              취소
                            </button>
                            <button
                              type="submit"
                              className="bg-[#B89B72] text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                            >
                              수치 저장
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Summary Tables with Direct Edit/Delete in Overview */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Recent Inquiries Quick Table */}
                    <div className="bg-white rounded-2xl border border-[#E5DFD4] shadow-sm overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-[#EAE3D6] flex items-center justify-between">
                        <div>
                          <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18]">
                            최근 5단계 견적 유입 내역
                          </h3>
                          <p className="text-xs text-[#7A7266] mt-0.5">
                            상태를 즉시 변경하거나 직접 수정/삭제할 수 있습니다.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingInquiry(null);
                              setIsInquiryModalOpen(true);
                            }}
                            className="text-xs font-bold text-[#8C6D45] bg-[#FAF6EE] border border-[#E3DACB] px-3 py-1 rounded-lg hover:bg-[#F2E7D5] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>견적 등록</span>
                          </button>
                          <button
                            onClick={() => setActiveMenu('leads')}
                            className="text-xs font-bold text-[#8C6D45] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>전체보기</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="divide-y divide-[#EAE3D6] p-2 flex-1">
                        {inquiries.slice(0, 4).map((inq) => (
                          <div
                            key={inq.id}
                            className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] rounded-xl transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#1E1B18]">{inq.name}</span>
                                <span className="text-xs text-[#8A8174] font-mono">{inq.phone}</span>
                              </div>
                              <p className="text-xs text-[#6B6358] mt-1">
                                {inq.housing} ({inq.size}) • {inq.furniture.join(', ')}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  handleUpdateInquiryStatus(inq.id, e.target.value as any)
                                }
                                className="text-xs px-2 py-1 rounded-lg border border-[#D5CDC2] bg-white font-semibold"
                              >
                                <option value="신규접수">신규접수</option>
                                <option value="3D도면설계">3D도면설계</option>
                                <option value="쇼룸방문예정">쇼룸방문예정</option>
                                <option value="계약완료">계약완료</option>
                                <option value="상담완료">상담완료</option>
                              </select>

                              <button
                                onClick={() => {
                                  setEditingInquiry(inq);
                                  setIsInquiryModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#8C6D45] border border-[#E3DACB] hover:bg-[#F2E7D5] cursor-pointer"
                                title="견적 내용 직접 수정"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
                                title="견적 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Showroom Bookings Quick Table */}
                    <div className="bg-white rounded-2xl border border-[#E5DFD4] shadow-sm overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-[#EAE3D6] flex items-center justify-between">
                        <div>
                          <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18]">
                            쇼룸 1:1 방문 예약 일정
                          </h3>
                          <p className="text-xs text-[#7A7266] mt-0.5">
                            논현 쇼룸 상담 일정을 직접 등록, 수정, 삭제합니다.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingBooking(null);
                              setIsBookingModalOpen(true);
                            }}
                            className="text-xs font-bold text-[#8C6D45] bg-[#FAF6EE] border border-[#E3DACB] px-3 py-1 rounded-lg hover:bg-[#F2E7D5] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>예약 등록</span>
                          </button>
                          <button
                            onClick={() => setActiveMenu('showroom')}
                            className="text-xs font-bold text-[#8C6D45] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>전체보기</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="divide-y divide-[#EAE3D6] p-2 flex-1">
                        {bookings.slice(0, 4).map((b) => (
                          <div
                            key={b.id}
                            className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] rounded-xl transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#1E1B18]">{b.name}</span>
                                <span className="text-xs font-bold text-[#8C6D45] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#EADFCF]">
                                  {b.date} {b.time}
                                </span>
                              </div>
                              <p className="text-xs text-[#6B6358] mt-1">
                                {b.consultType} ({b.guests}인)
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <select
                                value={b.status}
                                onChange={(e) =>
                                  handleUpdateBookingStatus(b.id, e.target.value as any)
                                }
                                className="text-xs px-2 py-1 rounded-lg border border-[#D5CDC2] bg-white font-semibold"
                              >
                                <option value="예약대기">예약대기</option>
                                <option value="예약확정">예약확정</option>
                                <option value="방문완료">방문완료</option>
                                <option value="취소">취소</option>
                              </select>

                              <button
                                onClick={() => {
                                  setEditingBooking(b);
                                  setIsBookingModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#8C6D45] border border-[#E3DACB] hover:bg-[#F2E7D5] cursor-pointer"
                                title="예약 수정"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteBooking(b.id, b.name)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
                                title="예약 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= 2. 메인 카피라이팅 CMS (Copywriting) ================= */}
              {activeMenu === 'copy' && (
                <div className="space-y-8">
                  {/* Current Active Variant Indicator */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm">
                    <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18] mb-2">
                      실시간 메인 화면 카피라이팅 선택
                    </h3>
                    <p className="text-xs sm:text-sm text-[#736B62] mb-5">
                      홈페이지 방문자에게 보여질 메인 헤드라인 3가지 버전 중 하나를 선택하거나 직접 문구를 수정하세요.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {variants.map((v) => {
                        const isSel = v.id === currentVariant.id;
                        return (
                          <div
                            key={v.id}
                            className={`p-5 rounded-xl border transition-all cursor-pointer ${
                              isSel
                                ? 'bg-[#FAF6EE] border-[#B89B72] ring-2 ring-[#B89B72]/40 shadow-sm'
                                : 'bg-[#FAF7F2] border-[#E8E2D7] hover:border-[#B89B72]'
                            }`}
                            onClick={() => {
                              onUpdateVariant(v);
                              setEditTitle(v.heroTitle);
                              setEditSub(v.heroSub);
                              setEditCta(v.ctaText);
                              triggerFeedback(`'${v.label}' 버전이 메인 화면에 적용되었습니다.`);
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm text-[#1E1B18]">{v.label}</span>
                              {isSel && (
                                <span className="text-[10px] font-bold bg-[#B89B72] text-white px-2 py-0.5 rounded-full font-mono">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#7A7165] font-light leading-relaxed">
                              {v.sub}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form to Edit Current Copy */}
                  <form
                    onSubmit={handleSaveCopy}
                    className="bg-white p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                      <div>
                        <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
                          현재 카피 상세 문구 편집: {currentVariant.label}
                        </h4>
                        <p className="text-xs text-[#7A7266] mt-0.5">
                          텍스트를 수정한 뒤 하단의 [수정 사항 메인 화면에 즉시 적용하기]를 누르면 홈페이지에 즉시 반영됩니다.
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded bg-[#F4EFE6] text-[#8C6D45] border border-[#E3DACB]">
                        태그: {currentVariant.tag}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#3E3831] mb-2">
                        메인 헤드라인 (대형 Serif 타이포그래피)
                      </label>
                      <textarea
                        rows={3}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-sm sm:text-base p-4 rounded-xl border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72] font-serif-kr bg-[#FAF9F6] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#3E3831] mb-2">
                        서브 설명 문구 (2~3줄)
                      </label>
                      <textarea
                        rows={4}
                        value={editSub}
                        onChange={(e) => setEditSub(e.target.value)}
                        className="w-full text-xs sm:text-sm p-4 rounded-xl border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72] bg-[#FAF9F6] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#3E3831] mb-2">
                        메인 CTA 버튼 문구
                      </label>
                      <input
                        type="text"
                        value={editCta}
                        onChange={(e) => setEditCta(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72] bg-[#FAF9F6]"
                      />
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <button
                        type="submit"
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-98 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>수정 사항 메인 화면에 즉시 적용하기</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= 2-1. 브랜드 철학 & 장인정신 CMS (Philosophy) ================= */}
              {activeMenu === 'philosophy' && (
                <div className="space-y-6">
                  <PhilosophyEditor
                    content={philosophyContent}
                    onSave={onUpdatePhilosophy}
                    triggerFeedback={triggerFeedback}
                  />
                </div>
              )}

              {/* ================= 3. 시공 갤러리 아카이브 CMS (Portfolio) ================= */}
              {activeMenu === 'portfolio' && (
                <div className="space-y-6">
                  {/* Top Bar with Filter & Search */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                        시공 갤러리 아카이브 CMS (사진 직접 업로드 / 등록 / 수정 / 삭제)
                      </h3>
                      <p className="text-xs text-[#7A7266] mt-0.5">
                        내 컴퓨터 사진 파일을 직접 업로드하거나 URL을 등록해 홈페이지 갤러리에 즉시 반영합니다.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 text-[#8C8479] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={portfolioSearch}
                          onChange={(e) => setPortfolioSearch(e.target.value)}
                          placeholder="시공사례 검색..."
                          className="pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D8D0C3] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
                        />
                      </div>

                      <button
                        onClick={handleOpenAddPortfolio}
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 시공사진 등록</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {[
                      { id: 'all', label: '전체' },
                      { id: 'kitchen-c', label: 'ㄷ자형 싱크대' },
                      { id: 'island-dining', label: '아일랜드 식탁' },
                      { id: 'fridge-pantry', label: '냉장고장 & 팬트리' },
                      { id: 'bedroom', label: '침실 맞춤 가구' },
                      { id: 'living-library', label: '거실/서재' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setPortfolioFilter(tab.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          portfolioFilter === tab.id
                            ? 'bg-[#1E1B18] text-white'
                            : 'bg-white text-[#6E6457] hover:bg-[#EFE8DC] border border-[#E3DACB]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Add / Edit Form Modal inside Portfolio CMS */}
                  {isAddingPortfolio && (
                    <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border-2 border-[#B89B72] shadow-xl space-y-6 animate-fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E3DACB]">
                        <h4 className="font-serif-kr text-lg font-bold text-[#1E1B18] flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-[#B89B72]" />
                          <span>{editingPortfolioItem ? '시공 사례 정보 및 사진 수정' : '새 맞춤 시공 사례 직접 등록'}</span>
                        </h4>
                        <button
                          onClick={() => {
                            setIsAddingPortfolio(false);
                            setEditingPortfolioItem(null);
                          }}
                          className="p-1 rounded-lg hover:bg-[#EAE1D3] text-[#7A7266]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSavePortfolio} className="space-y-5">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />

                        {/* Direct Image Upload Dropzone */}
                        <div>
                          <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
                            시공 현장 사진 등록 (직접 파일 업로드 또는 URL 입력) *
                          </label>

                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              if (e.dataTransfer.files?.[0]) {
                                handleFileUpload(e.dataTransfer.files[0]);
                              }
                            }}
                            className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                              isDragging
                                ? 'border-[#B89B72] bg-[#FAF6EE]'
                                : 'border-[#D5CDC2] bg-white hover:border-[#B89B72]'
                            }`}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <UploadCloud className="w-9 h-9 text-[#B89B72] mb-2" />
                            <div className="text-sm font-bold text-[#1E1B18]">
                              내 컴퓨터 / 스마트폰에서 사진 파일 선택하기
                            </div>
                            <p className="text-xs text-[#7A7266] mt-1">
                              여기를 클릭하거나 사진 파일을 드래그 앤 드롭하세요 (JPG, PNG, WebP)
                            </p>
                          </div>

                          {/* Quick Preset Selector */}
                          <div className="mt-3">
                            <span className="text-[11px] font-bold text-[#7A7266] block mb-1.5">
                              또는 고화질 맞춤 시공 샘플 프리셋 사진에서 선택:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                              {PORTFOLIO_PRESETS.map((preset, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setPortfolioForm((prev) => ({
                                      ...prev,
                                      image: preset.url,
                                      category: preset.category,
                                      categoryLabel: preset.categoryLabel,
                                      title: prev.title || preset.title,
                                    }));
                                    triggerFeedback(`'${preset.title}' 샘플 사진이 선택되었습니다.`);
                                  }}
                                  className="group relative rounded-lg overflow-hidden border border-[#D5CDC2] hover:border-[#B89B72] aspect-[16/10] text-left cursor-pointer transition-all"
                                >
                                  <img
                                    src={preset.url}
                                    alt={preset.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                                    <span className="text-[10px] text-white font-medium truncate">
                                      {preset.categoryLabel}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Image URL Manual Input */}
                          <div className="mt-3">
                            <label className="block text-[11px] font-bold text-[#685F53] mb-1">
                              이미지 링크 직접 입력 (URL)
                            </label>
                            <input
                              type="text"
                              value={portfolioForm.image || ''}
                              onChange={(e) =>
                                setPortfolioForm({ ...portfolioForm, image: e.target.value })
                              }
                              placeholder="https://..."
                              className="w-full text-xs p-2.5 rounded-xl border border-[#D5CDC2] bg-white font-mono"
                            />
                          </div>

                          {/* Live Image Preview Thumbnail */}
                          {portfolioForm.image && (
                            <div className="mt-3 flex items-center gap-4 p-3 bg-white rounded-xl border border-[#E3DACB]">
                              <img
                                src={portfolioForm.image}
                                alt="미리보기"
                                className="w-24 h-16 object-cover rounded-lg bg-gray-100 shadow-2xs"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop';
                                }}
                              />
                              <div className="text-xs">
                                <div className="font-bold text-[#1E1B18]">등록될 사진 미리보기</div>
                                <div className="text-[#7A7266] mt-0.5">
                                  홈페이지 시공 갤러리 메인 카드에 즉각 반영되어 노출됩니다.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Title & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#3E3831] mb-1">
                              시공 프로젝트 타이틀 *
                            </label>
                            <input
                              type="text"
                              required
                              value={portfolioForm.title || ''}
                              onChange={(e) =>
                                setPortfolioForm({ ...portfolioForm, title: e.target.value })
                              }
                              placeholder="예: 반포 원베일리 48평 ㄷ자형 대면형 오픈 키친"
                              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#3E3831] mb-1">
                              가구 카테고리 분류 *
                            </label>
                            <select
                              value={portfolioForm.category || 'kitchen-c'}
                              onChange={(e) => {
                                const cat = e.target.value as any;
                                const labels: Record<string, string> = {
                                  'kitchen-c': 'ㄷ자형 대면형 싱크대',
                                  'island-dining': '아일랜드 식탁 & 조리대',
                                  'fridge-pantry': '냉장고장 & 팬트리',
                                  bedroom: '침실 맞춤 가구 세트',
                                  'living-library': '거실/서재 맞춤 수납',
                                };
                                setPortfolioForm({
                                  ...portfolioForm,
                                  category: cat,
                                  categoryLabel: labels[cat] || '맞춤 가구',
                                });
                              }}
                              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                            >
                              <option value="kitchen-c">ㄷ자형 대면형 싱크대</option>
                              <option value="island-dining">아일랜드 식탁 & 조리대</option>
                              <option value="fridge-pantry">냉장고장 & 팬트리</option>
                              <option value="bedroom">침실 맞춤 가구 세트</option>
                              <option value="living-library">거실/서재 맞춤 수납</option>
                            </select>
                          </div>
                        </div>

                        {/* Location & Best */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#3E3831] mb-1">
                              현장 위치 &amp; 평형 정보
                            </label>
                            <input
                              type="text"
                              value={portfolioForm.locationInfo || ''}
                              onChange={(e) =>
                                setPortfolioForm({ ...portfolioForm, locationInfo: e.target.value })
                              }
                              placeholder="예: 신축 아파트 • 48평형 • 2026.09"
                              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                            />
                          </div>

                          <div className="flex items-center gap-3 pt-6">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#3E3831]">
                              <input
                                type="checkbox"
                                checked={portfolioForm.isBest ?? false}
                                onChange={(e) =>
                                  setPortfolioForm({ ...portfolioForm, isBest: e.target.checked })
                                }
                                className="w-4 h-4 text-[#B89B72] rounded"
                              />
                              <span>BEST CASE 대표 우수 시공 사례로 지정</span>
                            </label>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs font-bold text-[#3E3831] mb-1">
                            시공 설명 문구
                          </label>
                          <textarea
                            rows={3}
                            value={portfolioForm.description || ''}
                            onChange={(e) =>
                              setPortfolioForm({ ...portfolioForm, description: e.target.value })
                            }
                            placeholder="가구의 동선, 제작 공법, 수납 특징을 작성하세요."
                            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                          />
                        </div>

                        {/* Specs */}
                        <div>
                          <label className="block text-xs font-bold text-[#3E3831] mb-1">
                            주요 스펙 태그 (쉼표로 구분)
                          </label>
                          <input
                            type="text"
                            value={portfolioForm.specs?.join(', ') || ''}
                            onChange={(e) =>
                              setPortfolioForm({
                                ...portfolioForm,
                                specs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            placeholder="이태리 천연 세라믹, Super E0 샌드베이지, Blum 서랍재"
                            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-3 pt-3">
                          {editingPortfolioItem ? (
                            <button
                              type="button"
                              onClick={() => {
                                const targetId = editingPortfolioItem.id;
                                const targetTitle = editingPortfolioItem.title;
                                setIsAddingPortfolio(false);
                                setEditingPortfolioItem(null);
                                handleDeletePortfolio(targetId, targetTitle);
                              }}
                              className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>이 시공 사례 삭제</span>
                            </button>
                          ) : <div />}

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingPortfolio(false);
                                setEditingPortfolioItem(null);
                              }}
                              className="px-5 py-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs font-semibold text-[#574E43] hover:bg-[#F2ECE1] cursor-pointer"
                            >
                              취소
                            </button>
                            <button
                              type="submit"
                              className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              <span>{editingPortfolioItem ? '수정 내용 저장' : '시공 사례 등록 완료'}</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Portfolio Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPortfolio.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-[#E5DFD4] shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
                      >
                        {/* Image Preview */}
                        <div className="relative aspect-[16/10] bg-[#EAE3D6] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-[#181614]/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                            {item.categoryLabel}
                          </div>
                          {item.isBest && (
                            <div className="absolute top-3 right-3 bg-[#B89B72] text-[#1E1B18] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                              BEST
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="text-xs text-[#8C6D45] font-semibold mb-1">
                              {item.locationInfo}
                            </div>
                            <h4 className="font-serif-kr text-base font-bold text-[#1E1B18] line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#6B6358] mt-1.5 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {item.specs.map((spec, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-[#FAF6EE] text-[#7C6E5C] border border-[#EAE1D3] px-2 py-0.5 rounded"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>

                            {/* Card Control Buttons */}
                            <div className="pt-3 border-t border-[#EAE3D6] flex items-center justify-between">
                              <span className="text-[11px] text-[#A69E92] font-mono">{item.id}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenEditPortfolio(item)}
                                  className="p-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#F0E6D5] text-[#8C6D45] border border-[#E3DACB] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                                  title="문구 및 사진 수정"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>수정</span>
                                </button>
                                <button
                                  onClick={() => handleDeletePortfolio(item.id, item.title)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                                  title="시공 사례 삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= 4. 5단계 견적 관리 (Leads) ================= */}
              {activeMenu === 'leads' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                        5단계 맞춤 견적 유입 내역 관리 (직접 작성 / 수정 / 삭제)
                      </h3>
                      <p className="text-xs text-[#7A7266] mt-0.5">
                        홈페이지 5단계 폼으로 접수된 견적을 관리하고 새 견적서를 직접 작성할 수 있습니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF6EE] text-[#8C6D45] border border-[#E8DFC9]">
                        총 {inquiries.length}건 유입
                      </div>
                      <button
                        onClick={() => {
                          setEditingInquiry(null);
                          setIsInquiryModalOpen(true);
                        }}
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 견적 건 직접 작성</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inquiries.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4 flex flex-col justify-between hover:border-[#B89B72] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-xs font-mono text-[#8C6D45] font-bold">
                                {lead.id}
                              </span>
                              <h4 className="font-serif-kr text-lg font-bold text-[#1E1B18] mt-0.5">
                                {lead.name}
                              </h4>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                lead.status === '신규접수'
                                  ? 'bg-[#FEF3C7] text-[#92400E]'
                                  : lead.status === '3D도면설계'
                                  ? 'bg-[#DBEAFE] text-[#1E40AF]'
                                  : lead.status === '쇼룸방문예정'
                                  ? 'bg-[#EDE9FE] text-[#6B21A8]'
                                  : 'bg-[#D1FAE5] text-[#065F46]'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-[#524B43] bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE4D8] mb-3">
                            <div>
                              <strong>연락처:</strong> {lead.phone}
                            </div>
                            <div>
                              <strong>주거형태 &amp; 평형:</strong> {lead.housing} ({lead.size})
                            </div>
                            <div>
                              <strong>선택 자재:</strong> {lead.material}
                            </div>
                            <div>
                              <strong>희망 시공 시기:</strong> {lead.timeframe} ({lead.location})
                            </div>
                            {lead.preferredTime && lead.preferredTime.length > 0 && (
                              <div>
                                <strong>선호 상담 시간:</strong>{' '}
                                <span className="text-[#8C6D45] font-semibold">
                                  {lead.preferredTime.join(', ')}
                                </span>
                              </div>
                            )}
                            {lead.notes && (
                              <div className="pt-1 text-[#8C6D45]">
                                <strong>요청/상담 메모:</strong> {lead.notes}
                              </div>
                            )}
                            <div>
                              <strong>접수 일시:</strong> {lead.date}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-bold text-[#7A7266] mb-1.5">
                              신청 맞춤 가구 품목:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {lead.furniture.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-[#F4EFE6] text-[#6E6457] border border-[#E3DACB] px-2.5 py-1 rounded-md"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Status Change & Edit/Delete Controls */}
                        <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#7A7266] font-semibold">상태 변경:</span>
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateInquiryStatus(lead.id, e.target.value as any)
                              }
                              className="text-xs px-2.5 py-1 rounded-lg border border-[#D5CDC2] bg-[#FAF9F6] font-semibold"
                            >
                              <option value="신규접수">신규접수</option>
                              <option value="3D도면설계">3D도면설계</option>
                              <option value="쇼룸방문예정">쇼룸방문예정</option>
                              <option value="계약완료">계약완료</option>
                              <option value="상담완료">상담완료</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingInquiry(lead);
                                setIsInquiryModalOpen(true);
                              }}
                              className="p-1.5 text-xs text-[#8C6D45] bg-[#FAF6EE] hover:bg-[#F2E7D5] rounded-lg border border-[#E3DACB] flex items-center gap-1 cursor-pointer font-semibold"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>직접 수정</span>
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(lead.id, lead.name)}
                              className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>삭제</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= 5. 쇼룸 방문 1:1 예약 갤러리 (Showroom) ================= */}
              {activeMenu === 'showroom' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                        쇼룸 방문 1:1 예약 갤러리 &amp; 일정 관리 (직접 등록 / 수정 / 삭제)
                      </h3>
                      <p className="text-xs text-[#7A7266] mt-0.5">
                        논현로 142길 더 숨 디자인 하우스에서 진행되는 1:1 공간 상담 일정을 관리합니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF6EE] text-[#8C6D45] border border-[#E8DFC9]">
                        총 {bookings.length}건 예약
                      </div>
                      <button
                        onClick={() => {
                          setEditingBooking(null);
                          setIsBookingModalOpen(true);
                        }}
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 쇼룸 예약 등록</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#B89B72] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono font-bold text-[#8C6D45]">{b.id}</span>
                            <span
                              className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                                b.status === '예약확정'
                                  ? 'bg-[#D1FAE5] text-[#065F46]'
                                  : b.status === '방문완료'
                                  ? 'bg-[#E0E7FF] text-[#3730A3]'
                                  : 'bg-[#FEF3C7] text-[#92400E]'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>

                          <h4 className="font-serif-kr text-lg font-bold text-[#1E1B18]">
                            {b.name}
                          </h4>

                          <div className="space-y-1.5 mt-3 text-xs bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE3D6] text-[#524B43]">
                            <div>
                              <strong>방문 일시:</strong>{' '}
                              <span className="text-[#8C6D45] font-bold">
                                {b.date} ({b.time})
                              </span>
                            </div>
                            <div>
                              <strong>연락처:</strong> {b.phone}
                            </div>
                            <div>
                              <strong>상담 유형:</strong> {b.consultType}
                            </div>
                            <div>
                              <strong>동반 인원:</strong> {b.guests}명
                            </div>
                            {b.notes && (
                              <div className="pt-1 text-[#8C6D45]">
                                <strong>요청/메모:</strong> {b.notes}
                              </div>
                            )}
                            <div className="text-[11px] text-[#8A8174]">
                              신청일: {b.createdAt}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#EAE3D6] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#7A7266] font-semibold">상태:</span>
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleUpdateBookingStatus(b.id, e.target.value as any)
                              }
                              className="text-xs px-2.5 py-1 rounded-lg border border-[#D5CDC2] bg-[#FAF9F6] font-semibold"
                            >
                              <option value="예약대기">예약대기</option>
                              <option value="예약확정">예약확정</option>
                              <option value="방문완료">방문완료</option>
                              <option value="취소">취소</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingBooking(b);
                                setIsBookingModalOpen(true);
                              }}
                              className="p-1.5 text-xs text-[#8C6D45] bg-[#FAF6EE] hover:bg-[#F2E7D5] rounded-lg border border-[#E3DACB] flex items-center gap-1 cursor-pointer font-semibold"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>직접 수정</span>
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(b.id, b.name)}
                              className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>삭제</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= 6. 후기 및 공지사항 관리 (Reviews & Notices) ================= */}
              {activeMenu === 'reviews' && (
                <div className="space-y-8">
                  {/* Notice Management Section */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                      <div>
                        <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                          공지사항 및 공방 일정 관리 (직접 등록 / 수정 / 삭제)
                        </h3>
                        <p className="text-xs text-[#7A7266] mt-0.5">
                          제작 일정, 쇼룸 안내, 친환경 성적서 소식을 직접 등록/수정/삭제합니다.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotice(null);
                          setIsNoticeModalOpen(true);
                        }}
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 공지 등록</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {notices.map((n) => (
                        <div
                          key={n.id}
                          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D6] flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF6EE] text-[#8C6D45] border border-[#EADFCF]">
                                {n.category}
                              </span>
                              {n.isImportant && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                                  중요공지
                                </span>
                              )}
                              <span className="text-xs text-[#8A8174] font-mono">{n.date}</span>
                            </div>
                            <h4 className="font-bold text-sm text-[#1E1B18]">{n.title}</h4>
                            <p className="text-xs text-[#6B6358] mt-1 leading-relaxed">
                              {n.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                setEditingNotice(n);
                                setIsNoticeModalOpen(true);
                              }}
                              className="p-1.5 text-xs text-[#8C6D45] bg-white hover:bg-[#FAF6EE] rounded-lg border border-[#E3DACB] flex items-center gap-1 cursor-pointer font-semibold"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>수정</span>
                            </button>
                            <button
                              onClick={() => handleDeleteNotice(n.id, n.title)}
                              className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>삭제</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial List (View & Add/Edit/Delete) */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                      <div>
                        <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                          고객 리얼 후기 관리 (총 {testimonials.length}건 • 직접 등록/수정/삭제)
                        </h3>
                        <p className="text-xs text-[#7A7266] mt-0.5">
                          홈페이지 고객 후기 섹션에 노출되는 리뷰를 관리자가 직접 등록, 수정 및 삭제할 수 있습니다.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingTestimonial(null);
                          setIsTestimonialModalOpen(true);
                        }}
                        className="bg-[#1E1B18] hover:bg-[#332E29] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#B89B72]" />
                        <span>새 고객 후기 등록</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.map((t) => (
                        <div
                          key={t.id}
                          className="p-5 rounded-2xl border border-[#EAE3D6] bg-[#FAF8F5] flex flex-col justify-between space-y-4 hover:border-[#B89B72] transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center text-[#E5A83B]">
                                {Array.from({ length: t.stars }).map((_, idx) => (
                                  <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                                ))}
                              </div>
                              <span className="text-[11px] text-[#A69E92] font-mono">{t.date}</span>
                            </div>

                            <h4 className="font-bold text-sm text-[#1E1B18]">{t.author}</h4>
                            <p className="text-[11px] text-[#8C6D45] mb-2">{t.location}</p>
                            <p className="text-xs text-[#4E4841] leading-relaxed font-light">
                              {t.quote}
                            </p>
                          </div>

                          <div>
                            <div className="pt-3 border-t border-[#E5DFD4] text-[11px] text-[#7A7165] mb-3">
                              <strong>공방 피드백:</strong> {t.reply}
                            </div>

                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingTestimonial(t);
                                  setIsTestimonialModalOpen(true);
                                }}
                                className="p-1.5 text-xs text-[#8C6D45] bg-white hover:bg-[#FAF6EE] rounded-lg border border-[#E3DACB] flex items-center gap-1 cursor-pointer font-semibold"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>수정</span>
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(t.id, t.author)}
                                className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>삭제</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= 7. 사이트 정보 & SEO 분석 (Settings & Charts) ================= */}
              {activeMenu === 'settings' && (
                <div className="space-y-8">
                  {/* Upgraded Executive SEO Traffic Chart Suite */}
                  <SeoTrafficChart />

                  {/* Metadata and Business Info Edit Form */}
                  <form
                    onSubmit={handleSaveSiteConfig}
                    className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6"
                  >
                    <div>
                      <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                        사이트 기본 정보 및 검색엔진 SEO 메타데이터 직접 수정
                      </h3>
                      <p className="text-xs text-[#7A7266] mt-0.5">
                        홈페이지 상하단 및 검색엔진, 사업자 정보에 실시간 반영됩니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                      <div>
                        <label className="block font-bold text-[#3E3831] mb-1">
                          대표 관리자명 *
                        </label>
                        <input
                          type="text"
                          value={localSiteConfig.representative}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              representative: e.target.value,
                            })
                          }
                          required
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#3E3831] mb-1">
                          대표 상담 전화번호 *
                        </label>
                        <input
                          type="text"
                          value={localSiteConfig.phone}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              phone: e.target.value,
                            })
                          }
                          required
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-bold text-[#3E3831] mb-1">
                          쇼룸 및 본사 도로명 주소 *
                        </label>
                        <input
                          type="text"
                          value={localSiteConfig.address}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              address: e.target.value,
                            })
                          }
                          required
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-bold text-[#3E3831] mb-1">
                          SEO 사이트 타이틀 (&lt;title&gt;) *
                        </label>
                        <input
                          type="text"
                          value={localSiteConfig.siteTitle}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              siteTitle: e.target.value,
                            })
                          }
                          required
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-bold text-[#3E3831] mb-1">
                          SEO 메타 디스크립션 (&lt;meta description&gt;) *
                        </label>
                        <textarea
                          rows={3}
                          value={localSiteConfig.metaDescription}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              metaDescription: e.target.value,
                            })
                          }
                          required
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72] leading-relaxed"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-bold text-[#3E3831] mb-1">
                          검색 키워드 (Keywords, 쉼표 구분)
                        </label>
                        <input
                          type="text"
                          value={localSiteConfig.keywords}
                          onChange={(e) =>
                            setLocalSiteConfig({
                              ...localSiteConfig,
                              keywords: e.target.value,
                            })
                          }
                          className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:border-[#B89B72]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <button
                        type="submit"
                        className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>사이트 정보 및 SEO 저장하기</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Child CRUD Modals */}
      <InquiryFormModal
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setEditingInquiry(null);
        }}
        onSave={handleSaveInquiry}
        onDelete={handleDeleteInquiry}
        editingInquiry={editingInquiry}
      />

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSaveBooking}
        onDelete={handleDeleteBooking}
        editingBooking={editingBooking}
      />

      <TestimonialFormModal
        isOpen={isTestimonialModalOpen}
        onClose={() => {
          setIsTestimonialModalOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={handleSaveTestimonial}
        onDelete={handleDeleteTestimonial}
        editingItem={editingTestimonial}
      />

      <NoticeFormModal
        isOpen={isNoticeModalOpen}
        onClose={() => {
          setIsNoticeModalOpen(false);
          setEditingNotice(null);
        }}
        onSave={handleSaveNotice}
        onDelete={handleDeleteNotice}
        editingNotice={editingNotice}
      />

      {/* Universal In-App Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        itemTitle={confirmDialog.itemTitle}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
