import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Palette,
  CheckCircle2,
  PhoneCall,
  Sliders,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Info,
  Copy,
  Check,
} from 'lucide-react';

interface EstimateCostVisualizerProps {
  housingType: string;
  housingSize: string;
  selectedFurniture: string[];
  materialChoice: string;
  budget: string;
  style: string;
  name?: string;
  onConsultShowroom?: () => void;
  onClose?: () => void;
}

export const EstimateCostVisualizer: React.FC<EstimateCostVisualizerProps> = ({
  housingType,
  housingSize,
  selectedFurniture,
  materialChoice,
  budget,
  style,
  name,
  onConsultShowroom,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'gauge' | 'pie' | 'both'>('both');
  const [tier, setTier] = useState<'essential' | 'recommended' | 'luxury'>('recommended');
  const [selectedPieSegment, setSelectedPieSegment] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic cost calculation based on user selections
  const { minCost, avgCost, maxCost, breakdown, budgetFitText, budgetFitColor, matchPercent } =
    useMemo(() => {
      // Base calculation by furniture count & items
      let baseTotal = 0;

      selectedFurniture.forEach((item) => {
        if (item.includes('싱크대')) baseTotal += 1350;
        else if (item.includes('아일랜드')) baseTotal += 550;
        else if (item.includes('냉장고장')) baseTotal += 420;
        else if (item.includes('침실')) baseTotal += 780;
        else if (item.includes('거실') || item.includes('월플렉스')) baseTotal += 650;
        else if (item.includes('드레스룸') || item.includes('신발장')) baseTotal += 380;
        else baseTotal += 400;
      });

      if (baseTotal === 0) baseTotal = 1500;

      // Housing size multiplier
      let sizeMultiplier = 1.0;
      if (housingSize.includes('20평')) sizeMultiplier = 0.85;
      else if (housingSize.includes('30평')) sizeMultiplier = 1.0;
      else if (housingSize.includes('40평')) sizeMultiplier = 1.25;
      else if (housingSize.includes('50평')) sizeMultiplier = 1.5;

      // Material multiplier
      let materialMultiplier = 1.0;
      if (materialChoice.includes('이태리')) materialMultiplier = 1.25;
      else if (materialChoice.includes('통원목')) materialMultiplier = 1.2;
      else if (materialChoice.includes('무광 PET')) materialMultiplier = 0.95;
      else materialMultiplier = 1.05;

      // Tier modifier
      let tierMultiplier = 1.0;
      if (tier === 'essential') tierMultiplier = 0.85;
      else if (tier === 'recommended') tierMultiplier = 1.0;
      else if (tier === 'luxury') tierMultiplier = 1.28;

      const rawAvg = Math.round(baseTotal * sizeMultiplier * materialMultiplier * tierMultiplier);
      const rawMin = Math.round(rawAvg * 0.86);
      const rawMax = Math.round(rawAvg * 1.18);

      // Breakdown segments for Donut/Pie Chart
      const segments = [
        {
          id: 'woodCore',
          label: '친환경 E0 특수 목대 & 맞춤 가공비',
          percent: 36,
          amount: Math.round(rawAvg * 0.36),
          color: '#B89B72',
          sub: '포름알데히드 0.3mg/L 이하 최고급 보드 및 1mm 초정밀 CNC 가공',
        },
        {
          id: 'surfaceMaterial',
          label: '하이엔드 마감재 (포세린 세라믹/원목/도장)',
          percent: 30,
          amount: Math.round(rawAvg * 0.3),
          color: '#3F3932',
          sub: '이태리 프리미엄 천연 세라믹 상판 및 내지문 무광 특수 코팅',
        },
        {
          id: 'hardware',
          label: '오스트리아 Blum 정품 하드웨어 & 댐퍼',
          percent: 17,
          amount: Math.round(rawAvg * 0.17),
          color: '#D8B98C',
          sub: '20만 회 내구성 테스트 완료 무소음 소프트 클로징 힌지 & 서랍 레일',
        },
        {
          id: 'installation',
          label: '본사 직영 시공팀 정밀 실측/설치 & 평생 A/S',
          percent: 17,
          amount: Math.round(rawAvg * 0.17),
          color: '#736555',
          sub: '외주 없는 100% 직영 마스터 시공, 완벽 바닥 보양 및 정품 보증서 발급',
        },
      ];

      // Budget fit calculation
      let fitText = '예산 범위에 완벽하게 부합합니다';
      let fitColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      let match = 96;

      if (budget.includes('1,500만 ~ 2,500만')) {
        if (rawAvg > 2700) {
          fitText = '프리미엄 자재 포함 시 예산 상단에 근접하며 실속 옵션 조율 가능합니다';
          fitColor = 'text-amber-800 bg-amber-50 border-amber-200';
          match = 88;
        } else {
          fitText = '고객님의 희망 예산(1,500만~2,500만 원) 내에 최적 매칭됩니다';
          match = 95;
        }
      } else if (budget.includes('2,500만 ~ 4,000만')) {
        fitText = '고객님의 희망 예산(2,500만~4,000만 원)의 시그니처 프리미엄 구간에 이상적입니다';
        match = 98;
      } else if (budget.includes('4,000만 ~ 6,000만')) {
        fitText = '고객님의 넉넉한 예산으로 최고급 이태리 천연 세라믹과 풀옵션 빌트인이 가능합니다';
        match = 99;
      } else if (budget.includes('6,000만 원 이상')) {
        fitText = '하이엔드 펜트하우스급 전체 주거 공간 맞춤 라인업이 완벽히 지원됩니다';
        match = 100;
      }

      return {
        minCost: rawMin,
        avgCost: rawAvg,
        maxCost: rawMax,
        breakdown: segments,
        budgetFitText: fitText,
        budgetFitColor: fitColor,
        matchPercent: match,
      };
    }, [selectedFurniture, housingSize, materialChoice, tier, budget]);

  // Style info matching
  const styleInfo = useMemo(() => {
    if (style.includes('호텔') || style.includes('스위트')) {
      return {
        name: '호텔 마스터 스위트 (Luxury Suite)',
        desc: '딥 월넛과 은은한 간접 라인 조명, 묵직하고 프라이빗한 럭셔리 무드',
        colors: ['#23201C', '#4A4036', '#B89B72', '#D3C5B4'],
        recommendation: '벽면 일체형 헤드보드와 다크톤 매트 세라믹 아일랜드 조합을 추천합니다.',
      };
    } else if (style.includes('우드') || style.includes('재패니즈')) {
      return {
        name: '내추럴 재패니즈 우드 (Natural Wood)',
        desc: '북미산 화이트오크 원목의 따뜻한 나뭇결과 차분한 베이지 톤의 자연스러운 호흡',
        colors: ['#E6DEC8', '#BFA985', '#8C6D45', '#4A3B2C'],
        recommendation: '오일 피니시 통원목 상판과 무광 패브릭 질감 도어의 매칭을 추천합니다.',
      };
    } else if (style.includes('클래식') || style.includes('프렌치')) {
      return {
        name: '클래식 프렌치 & 앤틱 (Classic Chic)',
        desc: '섬세한 프레임 몰딩과 앤틱 브라스 하드웨어가 주는 품격과 우아함',
        colors: ['#EDE7DE', '#C2B6A6', '#877B6D', '#463F38'],
        recommendation: '우레탄 도장 도어와 빈티지 골드 손잡이, 대리석 비앙코 상판 구성을 추천합니다.',
      };
    } else {
      return {
        name: '모던 웜 미니멀 (Modern Warm Minimal)',
        desc: '단정하고 간결한 선과 절제된 미학, 따뜻한 웜그레이와 질감 있는 포세린의 조화',
        colors: ['#ECE7DE', '#D5CBC0', '#9E9486', '#3D3730'],
        recommendation: '핸들리스 무몰딩 마감과 일체형 아일랜드 세라믹 싱크대 구성을 추천합니다.',
      };
    }
  }, [style]);

  // Copy summary to clipboard
  const handleCopySummary = () => {
    const text = `[더 숨 디자인 맞춤 가구 예상 견적 리포트]
- 고객명: ${name ? `${name} 고객님` : '고객님'}
- 주거: ${housingType} (${housingSize})
- 맞춤 공간: ${selectedFurniture.join(', ')}
- 선호 스타일: ${styleInfo.name}
- 선택 자재: ${materialChoice}
- 희망 예산대: ${budget}
- AI 시뮬레이션 예상 비용: ${minCost.toLocaleString()}만 원 ~ ${maxCost.toLocaleString()}만 원 (추천가: 약 ${avgCost.toLocaleString()}만 원)
- 상담 문의: 더 숨 디자인 논현 쇼룸 (02-543-1999)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // SVG Pie Chart Geometry
  const renderPieSlices = () => {
    let cumulativePercent = 0;
    const radius = 64;
    const center = 80;

    return breakdown.map((seg, idx) => {
      const startAngle = (cumulativePercent / 100) * 2 * Math.PI - Math.PI / 2;
      cumulativePercent += seg.percent;
      const endAngle = (cumulativePercent / 100) * 2 * Math.PI - Math.PI / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const largeArc = seg.percent > 50 ? 1 : 0;
      const isSelected = selectedPieSegment === idx;

      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      return (
        <path
          key={seg.id}
          d={pathData}
          fill={seg.color}
          stroke="#FFFFFF"
          strokeWidth="2"
          className={`cursor-pointer transition-all duration-300 ${
            isSelected ? 'opacity-100 scale-105 filter drop-shadow-md' : 'opacity-90 hover:opacity-100'
          }`}
          onClick={() => setSelectedPieSegment(isSelected ? null : idx)}
        />
      );
    });
  };

  // Gauge bar calculation (percentage placement along 0~100)
  // We place min at ~20%, avg at ~55%, max at ~90%
  const gaugePercent = tier === 'essential' ? 35 : tier === 'recommended' ? 62 : 88;

  return (
    <div className="w-full bg-[#FCFAF6] rounded-2xl border border-[#E8E2D7] p-4 sm:p-6 shadow-sm animate-fade-in text-left">
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ECE5D8]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0EAE0] text-[#8C6D45] text-[11px] font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
            <span>AI 맞춤 가구 비용 &amp; 스타일 분석 리포트</span>
          </div>
          <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#1E1B18]">
            {name ? `${name} 고객님` : '고객님'}의 {housingSize} 맞춤 공간 예상 비용 범위
          </h3>
          <p className="text-xs text-[#7A7165] mt-0.5">
            선택하신 <strong>{selectedFurniture.length}개 맞춤 공간</strong>과{' '}
            <strong>{styleInfo.name}</strong>을 기반으로 정밀 산출되었습니다.
          </p>
        </div>

        {/* View Toggle (Gauge / Pie / Both) */}
        <div className="flex items-center bg-[#EDE7DD] p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('gauge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'gauge'
                ? 'bg-white text-[#1E1B18] shadow-xs'
                : 'text-[#6C6356] hover:text-[#1E1B18]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>게이지 바</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pie')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'pie'
                ? 'bg-white text-[#1E1B18] shadow-xs'
                : 'text-[#6C6356] hover:text-[#1E1B18]'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>파이 차트</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#6C6356] hover:text-[#1E1B18]'
            }`}
          >
            <span>전체 보기</span>
          </button>
        </div>
      </div>

      {/* Tier Switcher Pills (실속형 / 시그니처 권장 / 하이엔드 풀옵션) */}
      <div className="my-4 bg-white rounded-xl p-3 border border-[#EBE4D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#8C6D45]" />
          <span className="text-xs font-bold text-[#1E1B18]">옵션 티어 시뮬레이션:</span>
          <span className="text-xs text-[#7A7165]">클릭하여 사양별 비용을 즉시 비교해보세요</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 bg-[#FAF7F2] p-1 rounded-lg">
          {[
            { id: 'essential', label: '기본 실속형', badge: '-15%' },
            { id: 'recommended', label: '더숨 시그니처', badge: '베스트' },
            { id: 'luxury', label: '하이엔드 풀옵션', badge: '+28%' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTier(t.id as any)}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                tier === t.id
                  ? 'bg-[#B89B72] text-white shadow-xs'
                  : 'text-[#6B6154] hover:text-[#1E1B18] hover:bg-white/60'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-[9.5px] px-1 py-0.2 rounded font-normal ${
                  tier === t.id ? 'bg-white/20 text-white' : 'bg-[#ECE4D8] text-[#8C6D45]'
                }`}
              >
                {t.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualizer Area: Gauge & Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* Left Column: Gauge Bar & Cost Numbers (Visible if 'gauge' or 'both') */}
        {(activeTab === 'gauge' || activeTab === 'both') && (
          <div
            className={`bg-white rounded-xl p-5 border border-[#E8E2D7] shadow-2xs flex flex-col justify-between ${
              activeTab === 'gauge' ? 'lg:col-span-12' : 'lg:col-span-7'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8C6D45] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>예상 견적 범위 게이지 (VAT &amp; 직영시공 포함)</span>
                </span>
                <span className="text-[11px] font-medium text-[#7A7165]">
                  희망 예산: <strong className="text-[#1E1B18]">{budget}</strong>
                </span>
              </div>

              {/* Big Featured Average Price Box */}
              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#ECE5D8] mb-4 text-center">
                <div className="text-[11px] text-[#8C6D45] font-semibold tracking-wider uppercase mb-0.5">
                  더 숨 디자인 추천 표준 맞춤가
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#1E1B18] flex items-baseline justify-center gap-1.5">
                  <span>약 {avgCost.toLocaleString()}</span>
                  <span className="text-sm font-sans font-medium text-[#5E564C]">만 원</span>
                </div>
                <div className="text-xs text-[#7A7165] mt-1">
                  예상 범위: <strong className="text-[#1E1B18]">{minCost.toLocaleString()}만 원</strong> ~{' '}
                  <strong className="text-[#1E1B18]">{maxCost.toLocaleString()}만 원</strong>
                </div>
              </div>

              {/* Graphical Dynamic Gauge Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C8479]">
                  <span>실속 구성 ({minCost.toLocaleString()}만)</span>
                  <span className="text-[#8C6D45] font-bold">추천 중심가 ({avgCost.toLocaleString()}만)</span>
                  <span>풀스펙 최고 ({maxCost.toLocaleString()}만)</span>
                </div>

                {/* Progress bar tracks */}
                <div className="relative h-4 bg-[#EBE5DA] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#D8B98C] via-[#B89B72] to-[#8C6D45] rounded-full transition-all duration-500 relative"
                    style={{ width: `${gaugePercent}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/70 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Gauge Needle / Indicator Marker */}
                <div className="relative h-3">
                  <div
                    className="absolute -top-1 transition-all duration-500 transform -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${gaugePercent}%` }}
                  >
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-[#1E1B18]" />
                    <span className="text-[10px] font-bold text-[#1E1B18] whitespace-nowrap bg-[#EFE9DE] px-1.5 py-0.2 rounded mt-0.5">
                      현재 세팅 ({avgCost.toLocaleString()}만)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Fit & Guarantee Pill */}
            <div className={`mt-3 p-3 rounded-lg border text-xs flex items-center gap-2.5 ${budgetFitColor}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <div className="leading-snug">
                <span className="font-bold mr-1">[예산 적합도 {matchPercent}%]</span>
                <span>{budgetFitText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Donut/Pie Chart & Breakdown (Visible if 'pie' or 'both') */}
        {(activeTab === 'pie' || activeTab === 'both') && (
          <div
            className={`bg-white rounded-xl p-5 border border-[#E8E2D7] shadow-2xs flex flex-col justify-between ${
              activeTab === 'pie' ? 'lg:col-span-12' : 'lg:col-span-5'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#8C6D45] flex items-center gap-1.5">
                  <PieIcon className="w-3.5 h-3.5" />
                  <span>맞춤 가구 비용 구성 분석 (파이 차트)</span>
                </span>
                <span className="text-[10.5px] text-[#A39B90]">세그먼트 클릭 상세</span>
              </div>

              {/* Donut Chart SVG & Center Text */}
              <div className="flex items-center justify-center relative py-2">
                <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
                  {renderPieSlices()}
                  {/* Center Hollow for Donut */}
                  <circle cx="80" cy="80" r="44" fill="#FFFFFF" />
                </svg>

                {/* Center Donut Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] font-semibold text-[#8C6D45] uppercase tracking-wider">
                    TOTAL ESTIMATE
                  </span>
                  <span className="text-base font-bold text-[#1E1B18] font-serif-kr">
                    {avgCost.toLocaleString()}만
                  </span>
                  <span className="text-[9.5px] text-[#8C8479]">직영 시공 포함</span>
                </div>
              </div>

              {/* Selected Segment Highlight or Instruction */}
              <div className="mt-2 text-center text-xs">
                {selectedPieSegment !== null ? (
                  <div className="p-2 rounded bg-[#FAF6EE] border border-[#E8DCB8] text-[11.5px] text-[#1E1B18] animate-fade-in">
                    <span className="font-bold text-[#8C6D45]">
                      {breakdown[selectedPieSegment].label}:
                    </span>{' '}
                    약 {breakdown[selectedPieSegment].amount.toLocaleString()}만 원 (
                    {breakdown[selectedPieSegment].percent}%)
                    <div className="text-[10.5px] text-[#7A7165] mt-0.5">
                      {breakdown[selectedPieSegment].sub}
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] text-[#91887D]">
                    💡 차트 조각을 누르면 항목별 상세 내역을 볼 수 있습니다.
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="mt-4 space-y-1.5 pt-3 border-t border-[#ECE5D8]">
              {breakdown.map((seg, idx) => (
                <div
                  key={seg.id}
                  onClick={() => setSelectedPieSegment(selectedPieSegment === idx ? null : idx)}
                  className={`flex items-center justify-between p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    selectedPieSegment === idx
                      ? 'bg-[#F5F0E6] font-bold text-[#1E1B18]'
                      : 'hover:bg-[#F9F7F3] text-[#554E45]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="truncate text-[11.5px]">{seg.label}</span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-semibold text-[11px] text-[#1E1B18]">
                      {seg.percent}%
                    </span>
                    <span className="text-[10.5px] text-[#8A8175] ml-1.5">
                      약 {seg.amount.toLocaleString()}만
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Style & Material Match Recommendation Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E8E2D7] mb-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-[#8C6D45]" />
          <span className="text-xs font-bold text-[#1E1B18]">
            선호 스타일 매칭: <span className="text-[#8C6D45]">{styleInfo.name}</span>
          </span>
          <span className="text-[10.5px] bg-[#F2ECE2] text-[#8C6D45] px-2 py-0.5 rounded-full ml-auto font-medium">
            3D 디자인 컨셉 일치
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Style Description */}
          <div className="text-xs text-[#5D554A] leading-relaxed md:col-span-2">
            <p className="mb-1.5">{styleInfo.desc}</p>
            <p className="text-[11.5px] text-[#8C6D45] font-medium">
              💡 <strong>디자이너 조언:</strong> {styleInfo.recommendation}
            </p>
          </div>

          {/* Color Palette Swatches */}
          <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#EBE4D8] flex flex-col items-center justify-center">
            <div className="text-[10px] text-[#7A7165] font-semibold mb-1.5 uppercase tracking-wider">
              추천 톤앤매너 컬러 팔레트
            </div>
            <div className="flex items-center gap-2">
              {styleInfo.colors.map((c, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: c }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer: Copy Summary & Book Showroom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#ECE5D8]">
        <button
          type="button"
          onClick={handleCopySummary}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#D5CDC2] bg-white hover:bg-[#FAF7F2] text-xs font-medium text-[#4E473F] transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">견적 요약서 복사 완료!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8C6D45]" />
              <span>견적 분석 요약서 복사</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <a
            href="tel:02-543-1999"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#D5CDC2] bg-[#FAF7F2] hover:bg-[#F3EFE6] text-xs font-medium text-[#4E473F] transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#8C6D45]" />
            <span>02-543-1999 유선 문의</span>
          </a>

          {onConsultShowroom ? (
            <button
              type="button"
              onClick={onConsultShowroom}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>논현 쇼룸 1:1 방문 예약</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#1E1B18] hover:bg-[#36302A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>확인 및 닫기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
