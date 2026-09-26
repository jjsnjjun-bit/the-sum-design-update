import React, { useState } from 'react';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Phone,
  Home,
  Layers,
  Sparkle,
  CalendarCheck,
  UserCheck,
  ChevronRight,
  Info,
  Clock,
  Palette,
  Wallet,
} from 'lucide-react';

import { EstimateInquiry } from '../../types';
import { EstimateCostVisualizer } from './EstimateCostVisualizer';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInquiry?: (inquiry: EstimateInquiry) => void;
}

interface StepInfo {
  step: number;
  label: string;
  sub: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const ESTIMATE_STEPS: StepInfo[] = [
  {
    step: 1,
    label: '공간 분석',
    sub: '주거형태 & 평형',
    tag: 'SPACE ANALYSIS',
    icon: Home,
    description: '라이프스타일과 동선에 최적화된 공간 평형대별 기본 골격을 분석합니다.',
  },
  {
    step: 2,
    label: '맞춤 가구',
    sub: '주방•침실•수납',
    tag: 'CUSTOM LAYOUT',
    icon: Layers,
    description: '대면형 싱크대, 비스포크장, 호텔식 침실 등 희망 가구 공간을 지정합니다.',
  },
  {
    step: 3,
    label: '자재 선별',
    sub: 'Super E0 & 세라믹',
    tag: 'ECO MATERIALS',
    icon: Sparkle,
    description: '이태리 포세린, 친환경 Super E0, 오스트리아 Blum 하드웨어 사양을 확정합니다.',
  },
  {
    step: 4,
    label: '일정/지역',
    sub: '시공일정 & 직배송',
    tag: 'TIMELINE & SITE',
    icon: CalendarCheck,
    description: '입주 및 인테리어 일정에 맞춘 공방 제작 계획과 현장 지역을 조율합니다.',
  },
  {
    step: 5,
    label: '1:1 매칭',
    sub: '전담 디자이너 3D 시안',
    tag: '1:1 CONSULTING',
    icon: UserCheck,
    description: '20년 장인 직영 공방의 수석 디자이너가 3D 공간 시안과 상세 견적서를 완성합니다.',
  },
];

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  onAddInquiry,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showInfographicGuide, setShowInfographicGuide] = useState<boolean>(false);

  // Form State
  const [housingType, setHousingType] = useState<string>('신축 아파트');
  const [housingSize, setHousingSize] = useState<string>('40평형대');
  const [style, setStyle] = useState<string>('모던 웜 미니멀 (Modern Warm Minimal)');
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([
    'ㄷ자형 대면형 싱크대',
  ]);
  const [materialChoice, setMaterialChoice] = useState<string>('Super E0 + 이태리 천연 세라믹');
  const [budget, setBudget] = useState<string>('2,500만 ~ 4,000만 원 (시그니처 권장)');
  const [timeframe, setTimeframe] = useState<string>('2~3개월 이내');
  const [location, setLocation] = useState<string>('서울 / 수도권');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredTimeSlots, setPreferredTimeSlots] = useState<string[]>([
    '오전 (10:00 ~ 12:00)',
  ]);
  const [quickTimePreset, setQuickTimePreset] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const toggleTimeSlot = (slot: string) => {
    if (preferredTimeSlots.includes(slot)) {
      if (preferredTimeSlots.length > 1) {
        setPreferredTimeSlots(preferredTimeSlots.filter((s) => s !== slot));
      }
    } else {
      setPreferredTimeSlots([...preferredTimeSlots, slot]);
    }
  };

  const toggleFurniture = (item: string) => {
    if (selectedFurniture.includes(item)) {
      if (selectedFurniture.length > 1) {
        setSelectedFurniture(selectedFurniture.filter((f) => f !== item));
      }
    } else {
      setSelectedFurniture([...selectedFurniture, item]);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (onAddInquiry) {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        onAddInquiry({
          id: `EST-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
          name: name ? `${name} 고객님` : '익명 고객님',
          phone: phone || '010-****-****',
          date: formattedDate,
          housing: housingType,
          size: housingSize,
          furniture: selectedFurniture,
          material: materialChoice,
          budget,
          style,
          timeframe,
          location,
          preferredTime: preferredTimeSlots,
          notes,
          status: '신규접수',
        });
      }
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E5DFD4] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#1E1B18] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold bg-[#36312B] text-[#D8B98C] px-2 py-0.5 rounded border border-[#484239]">
                OCAVBIZ 5-STEP ESTIMATE
              </span>
              <span className="text-xs text-[#A8A095]">20년 전통 직영 공방</span>
            </div>
            <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#F4EFE6]">
              더 숨 디자인 5단계 맞춤 견적 시스템
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#C4BCB3] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Step Visual Infographic Stepper */}
        {!isSubmitted && (
          <div className="bg-[#FAF7F2] border-b border-[#E8E2D7] px-4 sm:px-6 pt-4 pb-3">
            {/* Infographic Steps Header Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-[#8C6D45] bg-[#EFE8DC] px-2 py-0.5 rounded-sm">
                  <Sparkles className="w-3 h-3 text-[#B89B72]" /> 5-STEP BESPOKE INFOGRAPHIC
                </span>
                <span className="hidden sm:inline text-xs text-[#7A7165]">
                  오직 한 가족만을 위한 체계적인 5단계 맞춤 프로세스
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowInfographicGuide(!showInfographicGuide)}
                className="text-[11.5px] font-medium text-[#8C6D45] hover:text-[#5E472B] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showInfographicGuide ? '프로세스 안내 접기' : '5단계 전체 로드맵 보기'}</span>
              </button>
            </div>

            {/* Visual Step Pipeline Nodes */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-5 left-6 right-6 h-[2px] bg-[#E5DFD4] -z-0 hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-[#8C6D45] to-[#B89B72] transition-all duration-300"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>

              {/* 5 Steps Grid */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 relative z-10">
                {ESTIMATE_STEPS.map((s) => {
                  const Icon = s.icon;
                  const isCurrent = s.step === step;
                  const isCompleted = s.step < step;

                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setStep(s.step)}
                      className={`group flex flex-col items-center text-center transition-all cursor-pointer p-1 rounded-lg ${
                        isCurrent
                          ? 'bg-white shadow-xs sm:bg-transparent sm:shadow-none'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Step Circle with Icon */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isCurrent
                            ? 'bg-[#1E1B18] text-[#EAD8BD] ring-4 ring-[#E8DCB8] shadow-md scale-105'
                            : isCompleted
                            ? 'bg-[#8C6D45] text-white shadow-xs'
                            : 'bg-white border border-[#D5CDC2] text-[#8C8479]'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        )}
                      </div>

                      {/* Step Label */}
                      <div className="mt-1.5 leading-tight">
                        <div
                          className={`text-[10px] sm:text-[11px] font-bold ${
                            isCurrent
                              ? 'text-[#1E1B18]'
                              : isCompleted
                              ? 'text-[#8C6D45]'
                              : 'text-[#857C70]'
                          }`}
                        >
                          {s.step}단계
                        </div>
                        <div
                          className={`text-[11px] sm:text-xs font-semibold truncate max-w-[55px] sm:max-w-none ${
                            isCurrent ? 'text-[#8C6D45]' : 'text-[#443E38]'
                          }`}
                        >
                          {s.label}
                        </div>
                        <div className="hidden md:block text-[10px] text-[#91887D] truncate mt-0.5">
                          {s.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Step Description Card / Infographic Roadmap Detail */}
            <div className="mt-3 pt-2.5 border-t border-[#ECE5D8]">
              {showInfographicGuide ? (
                /* Expanded Infographic Roadmap */
                <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E5DFD4] shadow-xs animate-fade-in space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E1B18] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
                      더 숨 디자인 5단계 맞춤 견적 시스템 로드맵
                    </span>
                    <span className="text-[11px] text-[#8C6D45] font-medium">
                      단계별 버튼을 눌러 바로 이동할 수 있습니다
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-left">
                    {ESTIMATE_STEPS.map((item) => (
                      <div
                        key={item.step}
                        onClick={() => setStep(item.step)}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          item.step === step
                            ? 'border-[#B89B72] bg-[#FAF6EE] shadow-xs'
                            : 'border-[#EAE3D6] hover:border-[#CFC4B2] bg-[#FCFBF8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 text-[10.5px] font-bold">
                          <span
                            className={
                              item.step === step ? 'text-[#8C6D45]' : 'text-[#6D6459]'
                            }
                          >
                            STEP {item.step}. {item.label}
                          </span>
                          {item.step < step && (
                            <Check className="w-3 h-3 text-[#10B981]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#7A7165] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Compact Active Step Highlight */
                <div className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-1.5 border border-[#ECE5D8] text-xs text-[#5E574D]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B89B72] animate-pulse shrink-0" />
                    <span className="font-bold text-[#1E1B18]">
                      STEP {step}. {ESTIMATE_STEPS[step - 1].label}
                    </span>
                    <span className="hidden sm:inline text-[#7A7165]">
                      — {ESTIMATE_STEPS[step - 1].description}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#8C6D45] shrink-0 pl-2">
                    진행률 {(step / 5) * 100}%
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-[#242220]">
          {!isSubmitted ? (
            <>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2">
                      1. 주거 형태를 선택해 주세요
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        '신축 아파트',
                        '구축 리모델링 아파트',
                        '주상복합',
                        '단독 / 전원주택',
                        '타운하우스 / 빌라',
                        '상업 / 오피스 공간',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setHousingType(item)}
                          className={`p-3 text-xs rounded-md border text-left transition-all cursor-pointer ${
                            housingType === item
                              ? 'border-[#B89B72] bg-[#FAF6EE] text-[#1E1B18] font-bold shadow-xs ring-1 ring-[#B89B72]'
                              : 'border-[#E2DBD0] hover:border-[#C4B9AA] bg-white text-[#665F55]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item}</span>
                            {housingType === item && <Check className="w-3.5 h-3.5 text-[#B89B72]" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2">
                      2. 실평수를 선택해 주세요
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['20평형대', '30평형대', '40평형대', '50평형대 이상'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setHousingSize(size)}
                          className={`py-2.5 px-3 text-xs rounded-md border text-center transition-all cursor-pointer ${
                            housingSize === size
                              ? 'border-[#B89B72] bg-[#FAF6EE] text-[#1E1B18] font-bold'
                              : 'border-[#E2DBD0] hover:border-[#C4B9AA] text-[#665F55]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>3. 선호하시는 인테리어 디자인 스타일</span>
                      <span className="text-[11px] text-[#8C6D45] font-normal">비용 및 3D 컨셉 자동 연동</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        {
                          name: '모던 웜 미니멀 (Modern Warm Minimal)',
                          desc: '단정하고 간결한 선, 차분한 웜그레이와 질감 있는 포세린 세라믹',
                        },
                        {
                          name: '호텔 마스터 스위트 (Luxury Suite)',
                          desc: '딥 월넛과 은은한 간접 라인 조명, 묵직하고 프라이빗한 호텔 감성',
                        },
                        {
                          name: '내추럴 재패니즈 우드 (Natural Wood)',
                          desc: '천연 원목의 따뜻한 온기와 결, 편안하고 자연스러운 호흡',
                        },
                        {
                          name: '클래식 프렌치 앤틱 (Classic Chic)',
                          desc: '섬세한 프레임 몰딩과 앤틱 브라스 하드웨어의 우아한 품격',
                        },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setStyle(item.name)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            style === item.name
                              ? 'border-[#B89B72] bg-[#FAF6EE] shadow-xs ring-1 ring-[#B89B72]'
                              : 'border-[#E2DBD0] hover:border-[#C4B9AA] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E1B18]">{item.name}</span>
                            {style === item.name && <Check className="w-3.5 h-3.5 text-[#B89B72]" />}
                          </div>
                          <p className="text-[11px] text-[#7A7165] mt-1">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-1">
                    제작을 희망하시는 공간을 모두 선택해 주세요 (중복 가능)
                  </label>
                  <p className="text-xs text-[#7A7369] mb-3">
                    더 숨 디자인은 100% 직영 공방 맞춤으로 공간에 맞게 복합 설계가 가능합니다.
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        title: 'ㄷ자형 대면형 싱크대 & 조리대',
                        desc: '가족 소통형 아일랜드, 홈바, 와이드 세라믹 상판',
                      },
                      {
                        title: '통원목/세라믹 아일랜드 식탁 & 조리대',
                        desc: '북미산 최고급 원목, 매립 인덕션 및 콘센트',
                      },
                      {
                        title: '비스포크/키친핏 냉장고장 & 홈카페 팬트리',
                        desc: '1mm 단차 정밀 맞춤, 회전형 히든 포켓도어',
                      },
                      {
                        title: '침실 마스터 스위트 (붙박이장+헤드보드+화장대)',
                        desc: '호텔 스위트룸 일체형 벽면 패널 & 무드 라이팅',
                      },
                      {
                        title: '거실 서재형 월플렉스 & 슬라이딩 도어',
                        desc: 'TV 수납과 대형 책장, 헤펠레 무소음 슬라이딩',
                      },
                      {
                        title: '현관 신발장 & 드레스룸 시스템',
                        desc: '에어드레서 빌트인, 모듈형 수납 시스템',
                      },
                    ].map((item) => {
                      const isSelected = selectedFurniture.includes(item.title);
                      return (
                        <div
                          key={item.title}
                          onClick={() => toggleFurniture(item.title)}
                          className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#B89B72] bg-[#FAF6EE] shadow-2xs'
                              : 'border-[#E2DBD0] hover:border-[#C4B9AA] bg-white'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#1E1B18]">{item.title}</div>
                            <div className="text-[11px] text-[#787166] mt-0.5">{item.desc}</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ml-3 ${
                              isSelected
                                ? 'bg-[#B89B72] text-white'
                                : 'border border-[#C9C1B4] bg-[#F7F4EE]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-1">
                    선호하시는 자재 및 하드웨어 사양을 선택해 주세요
                  </label>
                  <p className="text-xs text-[#7A7369] mb-3">
                    모든 자재는 친환경 Super E0 최고등급 보드만을 원칙으로 합니다.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      {
                        title: 'Super E0 + 이태리 천연 세라믹',
                        sub: '최고급 내열/무스크래치 포세린 세라믹 상판 + 친환경 매트 도장 도어',
                      },
                      {
                        title: 'Super E0 + 북미산 통원목(화이트오크/월넛)',
                        sub: '자연 그대로의 온기, 수성 천연 오일 마감, 20년 목공 장인 결구',
                      },
                      {
                        title: 'Super E0 + 내지문 무광 PET 도어 & 인조대리석',
                        sub: '실용성과 모던한 미니멀리즘, 합리적인 프리미엄 구성',
                      },
                      {
                        title: '전문 디자이너 방문 추천 (현장 상담 시 결정)',
                        sub: '쇼룸 방문 또는 실측 시 자재 샘플을 직접 보며 맞춤 결정',
                      },
                    ].map((mat) => (
                      <div
                        key={mat.title}
                        onClick={() => setMaterialChoice(mat.title)}
                        className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                          materialChoice === mat.title
                            ? 'border-[#B89B72] bg-[#FAF6EE] shadow-2xs'
                            : 'border-[#E2DBD0] hover:border-[#C4B9AA] bg-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-[#1E1B18]">{mat.title}</div>
                          <div className="text-[11px] text-[#787166] mt-0.5">{mat.sub}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-3 ${
                            materialChoice === mat.title
                              ? 'border-4 border-[#B89B72] bg-white'
                              : 'border border-[#C9C1B4]'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#F5F2EB] rounded border border-[#E8E2D7] text-[11px] text-[#7A7165] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>기본 하드웨어는 오스트리아 Blum 정품 댐퍼 &amp; 서랍재가 기본 적용됩니다.</span>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2">
                      시공 희망 시기
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['1개월 이내 (긴급)', '2~3개월 이내', '3~6개월 이내', '입주 예정 (상담 먼저)'].map(
                        (time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setTimeframe(time)}
                            className={`p-2.5 text-xs rounded border text-center transition-all cursor-pointer ${
                              timeframe === time
                                ? 'border-[#B89B72] bg-[#FAF6EE] text-[#1E1B18] font-bold'
                                : 'border-[#E2DBD0] text-[#665F55]'
                            }`}
                          >
                            {time}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2">
                      시공 현장 지역
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['서울 전지역', '경기 / 인천', '지방 (전국 무료 직배송)'].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className={`p-2.5 text-xs rounded border text-center transition-all cursor-pointer ${
                            location === loc
                              ? 'border-[#B89B72] bg-[#FAF6EE] text-[#1E1B18] font-bold'
                              : 'border-[#E2DBD0] text-[#665F55]'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4E473F] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>희망 예산 범위</span>
                      <span className="text-[11px] text-[#8C6D45] font-normal">비용 게이지 &amp; 파이 차트 시뮬레이션 연동</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          val: '1,500만 ~ 2,500만 원 (실속형 맞춤)',
                          tag: '실속 구성',
                          desc: '친환경 E0 보드 + 무광 PET + Blum 댐퍼 기본 탑재',
                        },
                        {
                          val: '2,500만 ~ 4,000만 원 (시그니처 권장)',
                          tag: '인기 추천',
                          desc: '이태리 포세린 세라믹 + 대면형 아일랜드 복합 구성',
                        },
                        {
                          val: '4,000만 ~ 6,000만 원 (하이엔드 풀패키지)',
                          tag: '프리미엄',
                          desc: '통원목 & 세라믹 풀 빌트인 + 호텔 마스터 스위트',
                        },
                        {
                          val: '6,000만 원 이상 (펜트하우스 프리미엄)',
                          tag: '럭셔리',
                          desc: '전체 주거 공간 1:1 맞춤 + 수석 디자이너 직속 감리',
                        },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setBudget(item.val)}
                          className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                            budget === item.val
                              ? 'border-[#B89B72] bg-[#FAF6EE] shadow-xs ring-1 ring-[#B89B72]'
                              : 'border-[#E2DBD0] hover:border-[#C4B9AA] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-[#1E1B18]">{item.val}</span>
                            <span
                              className={`text-[9.5px] px-1.5 py-0.5 rounded font-semibold ${
                                budget === item.val
                                  ? 'bg-[#B89B72] text-white'
                                  : 'bg-[#ECE5D8] text-[#736A5E]'
                              }`}
                            >
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[#787166]">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6] text-xs text-[#7A7165]">
                    💡 더 숨 디자인은 전국 직영 시공팀이 직접 현장을 책임지며, 추가 배송비가 발생하지 않습니다.
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#EAE3D6] mb-4">
                    <h4 className="text-xs font-bold text-[#8C6D45] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>선택하신 맞춤 견적 요약</span>
                    </h4>
                    <div className="text-[11.5px] text-[#60594F] space-y-1">
                      <div>
                        • 주거 &amp; 스타일: <strong className="text-[#1E1B18]">{housingType} ({housingSize}) / {style}</strong>
                      </div>
                      <div>
                        • 맞춤 공간: <strong className="text-[#1E1B18]">{selectedFurniture.join(', ')}</strong>
                      </div>
                      <div>
                        • 자재 &amp; 예산: <strong className="text-[#1E1B18]">{materialChoice} / {budget}</strong>
                      </div>
                      <div>
                        • 일정/지역: <strong className="text-[#1E1B18]">{timeframe} / {location}</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                      고객님 성함 *
                    </label>
                    <input
                      type="text"
                      placeholder="예: 홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                      연락처 (휴대전화 번호) *
                    </label>
                    <input
                      type="tel"
                      placeholder="예: 010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72]"
                    />
                  </div>

                  {/* Consultation Time Preferences (Dropdown + Checkbox Group) */}
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8E2D7] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#4E473F] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B89B72]" />
                        <span>선호 상담 시간대 선택 (다중 선택 가능)</span>
                      </label>
                      <span className="text-[11px] text-[#8C6D45] font-medium">
                        {preferredTimeSlots.length}개 시간대 선택됨
                      </span>
                    </div>

                    {/* Quick Dropdown Selector */}
                    <div>
                      <label className="block text-[11px] text-[#7A7165] mb-1 font-medium">
                        빠른 시간대 프리셋 (드롭다운 메뉴)
                      </label>
                      <select
                        value={quickTimePreset}
                        onChange={(e) => {
                          const val = e.target.value;
                          setQuickTimePreset(val);
                          if (val === 'anytime') {
                            setPreferredTimeSlots([
                              '오전 (10:00 ~ 12:00)',
                              '점심 직후 (12:00 ~ 14:00)',
                              '오후 (14:00 ~ 18:00)',
                              '저녁 (18:00 ~ 20:00)',
                            ]);
                          } else if (val === 'daytime') {
                            setPreferredTimeSlots([
                              '오전 (10:00 ~ 12:00)',
                              '오후 (14:00 ~ 18:00)',
                            ]);
                          } else if (val === 'evening') {
                            setPreferredTimeSlots(['저녁 (18:00 ~ 20:00)']);
                          } else if (val === 'weekend') {
                            setPreferredTimeSlots(['주말/공휴일 선호']);
                          }
                        }}
                        className="w-full text-xs p-2 rounded-lg border border-[#D5CDC2] bg-white text-[#4A433A] focus:outline-none focus:border-[#B89B72] cursor-pointer"
                      >
                        <option value="">-- 선호하는 시간대 프리셋 선택 (선택사항) --</option>
                        <option value="anytime">언제나 가능 (전 시간대 편하신 시간에 통화)</option>
                        <option value="daytime">주간 업무시간 위주 (오전 10:00 ~ 18:00)</option>
                        <option value="evening">퇴근 후 저녁 집중 상담 (18:00 ~ 20:00)</option>
                        <option value="weekend">주말 / 공휴일 집중 상담 희망</option>
                      </select>
                    </div>

                    {/* Checkbox Group for granular slot selection */}
                    <div>
                      <div className="text-[11px] text-[#7A7165] mb-1.5 font-medium">
                        상세 시간대 체크박스 (직접 체크/해제)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {[
                          { id: 'morning', label: '오전 (10:00 ~ 12:00)', desc: '오전 일과 시작 시간' },
                          { id: 'lunch', label: '점심 직후 (12:00 ~ 14:00)', desc: '점심시간 여유 상담' },
                          { id: 'afternoon', label: '오후 (14:00 ~ 18:00)', desc: '가장 원활한 상담 시간' },
                          { id: 'evening', label: '저녁 (18:00 ~ 20:00)', desc: '퇴근 후 편안한 상담' },
                          { id: 'weekend', label: '주말/공휴일 선호', desc: '토/일 쇼룸 당직 디자이너 배정' },
                          { id: 'text-only', label: '유선 통화 전 카카오톡/문자 사전 시안 수신 희망', desc: '도면 먼저 확인' },
                        ].map((item) => {
                          const isChecked = preferredTimeSlots.includes(item.label);
                          return (
                            <label
                              key={item.id}
                              className={`flex items-start gap-2.5 p-2 rounded-lg border text-left cursor-pointer transition-all ${
                                isChecked
                                  ? 'border-[#B89B72] bg-white shadow-2xs text-[#1E1B18]'
                                  : 'border-[#E5DFD4] bg-[#FCFBF9] hover:bg-white text-[#685F54]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleTimeSlot(item.label)}
                                className="mt-0.5 accent-[#8C6D45] w-3.5 h-3.5 rounded cursor-pointer"
                              />
                              <div className="text-[11px] leading-tight">
                                <div className={`font-semibold ${isChecked ? 'text-[#8C6D45]' : 'text-[#3E3832]'}`}>
                                  {item.label}
                                </div>
                                <div className="text-[9.5px] text-[#8C8479] mt-0.5">{item.desc}</div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                      추가 문의 및 특이사항 (선택)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="기존 가구 철거 여부, 냉장고 모델명, 원하시는 분위기 등"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72] resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-[#91887D]">
                    * 작성해주신 정보는 1:1 맞춤 가구 견적 및 3D 공간 배치 상담 목적으로만 안전하게 사용됩니다.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Submission Complete View */
            <div className="py-2 text-center animate-fade-in space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#EBF8F2] text-[#10B981] flex items-center justify-center mb-2.5 shadow-xs">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18]">
                  5단계 맞춤 견적 상담 접수가 완료되었습니다
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645B] max-w-xl mx-auto leading-relaxed mt-1 break-keep">
                  더 숨 디자인 논현 쇼룸의 수석 공간 디자이너가 고객님의{' '}
                  <strong className="text-[#1E1B18]">{housingSize} {style}</strong> 맞춤 공간 계획을
                  검토한 후 <strong>24시간 이내(영업일 기준)</strong> 유선으로 상세 3D 시안을 안내해 드립니다.
                </p>
              </div>

              {/* Estimate Cost Visualizer Component: Gauge Bar & Donut/Pie Chart */}
              <EstimateCostVisualizer
                housingType={housingType}
                housingSize={housingSize}
                selectedFurniture={selectedFurniture}
                materialChoice={materialChoice}
                budget={budget}
                style={style}
                name={name}
                onConsultShowroom={resetForm}
                onClose={resetForm}
              />

              {/* Quick Contact & Process Milestone Footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto pt-1">
                <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#E8E2D7] text-xs space-y-1">
                  <div className="font-semibold text-[#8C6D45] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>빠른 상담 직통 안내</span>
                  </div>
                  <div className="text-[#60594F]">논현 쇼룸 대표번호: <strong>02-543-1999</strong></div>
                  <div className="text-[11.5px] text-[#8C6D45]">
                    • 선호 상담 시간: <strong>{preferredTimeSlots.join(', ')}</strong>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D7] text-xs space-y-1">
                  <div className="font-semibold text-[#1E1B18] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>20년 직영 공방 안심 보증</span>
                  </div>
                  <div className="text-[#60594F]">오스트리아 Blum 하드웨어 5년 무상 보증</div>
                  <div className="text-[11.5px] text-[#8C6D45]">
                    • 친환경 Super E0 보드 100% 원칙 적용
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isSubmitted && (
          <div className="bg-[#FAF7F2] p-4 border-t border-[#E8E2D7] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1 text-xs font-medium text-[#6B6358] hover:text-[#1E1B18] px-3 py-2 rounded cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={step === 5 && (!name || !phone)}
              className={`flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-sm transition-all cursor-pointer ${
                step === 5 && (!name || !phone)
                  ? 'bg-[#D6CEBF] text-white cursor-not-allowed'
                  : 'bg-[#B89B72] hover:bg-[#A3865D] text-white shadow-xs'
              }`}
            >
              <span>{step === 5 ? '5단계 견적 신청 완료' : '다음 단계'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
