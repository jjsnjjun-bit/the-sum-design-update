import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  MousePointerClick,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Smartphone,
  Monitor,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

type TimePeriod = '7d' | '30d' | 'monthly';

interface DataPoint {
  label: string;
  visitors: number;
  inquiries: number;
  rate: number;
}

const DATA_7D: DataPoint[] = [
  { label: '9/16 (월)', visitors: 1120, inquiries: 42, rate: 3.75 },
  { label: '9/17 (화)', visitors: 1250, inquiries: 51, rate: 4.08 },
  { label: '9/18 (수)', visitors: 1380, inquiries: 64, rate: 4.63 },
  { label: '9/19 (목)', visitors: 1490, inquiries: 72, rate: 4.83 },
  { label: '9/20 (금)', visitors: 1680, inquiries: 88, rate: 5.23 },
  { label: '9/21 (토)', visitors: 1950, inquiries: 104, rate: 5.33 },
  { label: '9/22 (오늘)', visitors: 1840, inquiries: 96, rate: 5.21 },
];

const DATA_30D: DataPoint[] = [
  { label: '1주차', visitors: 7800, inquiries: 320, rate: 4.1 },
  { label: '2주차', visitors: 8900, inquiries: 410, rate: 4.6 },
  { label: '3주차', visitors: 10200, inquiries: 520, rate: 5.1 },
  { label: '4주차 (현재)', visitors: 11800, inquiries: 640, rate: 5.4 },
];

const DATA_MONTHLY: DataPoint[] = [
  { label: '4월', visitors: 14200, inquiries: 520, rate: 3.66 },
  { label: '5월', visitors: 17500, inquiries: 710, rate: 4.05 },
  { label: '6월', visitors: 20100, inquiries: 890, rate: 4.42 },
  { label: '7월', visitors: 23400, inquiries: 1120, rate: 4.78 },
  { label: '8월', visitors: 27800, inquiries: 1380, rate: 4.96 },
  { label: '9월 (누적)', visitors: 31200, inquiries: 1680, rate: 5.38 },
];

export const SeoTrafficChart: React.FC = () => {
  const [period, setPeriod] = useState<TimePeriod>('7d');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentData = period === '7d' ? DATA_7D : period === '30d' ? DATA_30D : DATA_MONTHLY;

  // Chart dimensions & scaling
  const maxVisitors = Math.max(...currentData.map((d) => d.visitors)) * 1.15;
  const maxInquiries = Math.max(...currentData.map((d) => d.inquiries)) * 1.15;

  const width = 800;
  const height = 260;
  const paddingX = 50;
  const paddingY = 30;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  // Calculate coordinates
  const points = currentData.map((d, i) => {
    const x = paddingX + (i / (currentData.length - 1)) * chartW;
    const yVisitors = height - paddingY - (d.visitors / maxVisitors) * chartH;
    const yInquiries = height - paddingY - (d.inquiries / maxInquiries) * chartH;
    return { x, yVisitors, yInquiries, ...d };
  });

  // SVG Area path for visitors
  const areaPath = `
    M ${points[0].x} ${height - paddingY}
    ${points.map((p) => `L ${p.x} ${p.yVisitors}`).join(' ')}
    L ${points[points.length - 1].x} ${height - paddingY}
    Z
  `;

  // SVG Line path for visitors
  const linePathVisitors = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yVisitors}`).join(' ');

  // SVG Line path for inquiries
  const linePathInquiries = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yInquiries}`).join(' ');

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : points[points.length - 1];

  return (
    <div className="space-y-6">
      {/* Top Header & Period Selector */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
              REAL-TIME SEO &amp; TRAFFIC ANALYTICS
            </span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
            웹사이트 트래픽 &amp; 5단계 맞춤 견적 전환 통계
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7266] mt-0.5">
            검색 엔진 유입 현황과 5단계 견적 폼의 완료 전환율을 인터랙티브 그래프로 확인합니다.
          </p>
        </div>

        {/* Period Switcher Pills */}
        <div className="flex items-center bg-[#FAF6EE] p-1.5 rounded-xl border border-[#E3DACB] shrink-0 self-start md:self-auto">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === '7d'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#6E6457] hover:text-[#1E1B18]'
            }`}
          >
            최근 7일 추이
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === '30d'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#6E6457] hover:text-[#1E1B18]'
            }`}
          >
            최근 30일
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'monthly'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#6E6457] hover:text-[#1E1B18]'
            }`}
          >
            2026 월별 누적
          </button>
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#7A7266] mb-2">
            <span className="font-semibold">누적 순 방문자 (UV)</span>
            <Users className="w-4 h-4 text-[#B89B72]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#1E1B18]">
              {period === '7d' ? '10,710' : period === '30d' ? '38,700' : '134,200'}
              <span className="text-sm font-sans font-normal text-[#8A8174] ml-1">명</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>전주 대비 +24.6%</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#7A7266] mb-2">
            <span className="font-semibold">5단계 맞춤 견적 전환</span>
            <MousePointerClick className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#1E1B18]">
              {period === '7d' ? '517' : period === '30d' ? '1,890' : '6,300'}
              <span className="text-sm font-sans font-normal text-[#8A8174] ml-1">건 완료</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>전주 대비 +31.2%</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#7A7266] mb-2">
            <span className="font-semibold">평균 견적 전환율</span>
            <TrendingUp className="w-4 h-4 text-[#8C6D45]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#8C6D45]">
              5.21%
              <span className="text-xs font-sans font-normal text-[#8A8174] ml-1.5">(가구업계 1위)</span>
            </div>
            <p className="text-xs text-[#7A7266] mt-1.5">
              3D 시뮬레이션 기반 맞춤 신뢰도 효과
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#7A7266] mb-2">
            <span className="font-semibold">종합 SEO 건강도 점수</span>
            <Sparkles className="w-4 h-4 text-[#B89B72]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#10B981]">
              98 / 100
              <span className="text-xs font-sans font-normal text-[#8A8174] ml-1.5">최상위</span>
            </div>
            <p className="text-xs text-[#7A7266] mt-1.5">
              네이버 &amp; 구글 메타태그 완벽 연동
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive SVG Chart Canvas */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAE3D6]">
          {/* Chart Legends */}
          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B89B72]" />
              <span className="text-[#3E3831]">순 방문자 수 (Visitors)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-[#3E3831]">5단계 견적 전환 (Leads)</span>
            </div>
          </div>

          {/* Hover Status Box */}
          <div className="text-xs bg-[#FAF7F2] border border-[#E4DBCF] px-3.5 py-1.5 rounded-xl font-mono text-[#4A4237]">
            <span className="font-bold text-[#1E1B18] mr-2">[{activePoint.label}]</span>
            <span>방문자: </span>
            <strong className="text-[#B89B72]">{activePoint.visitors.toLocaleString()}명</strong>
            <span className="mx-1.5">•</span>
            <span>견적 접수: </span>
            <strong className="text-[#10B981]">{activePoint.inquiries.toLocaleString()}건</strong>
            <span className="mx-1.5">•</span>
            <span>전환율: </span>
            <strong className="text-[#8C6D45]">{activePoint.rate}%</strong>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="relative w-full overflow-hidden pt-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-56 sm:h-72 select-none"
          >
            <defs>
              {/* Visitor area gradient */}
              <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B89B72" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#B89B72" stopOpacity="0.02" />
              </linearGradient>
              {/* Inquiry area gradient */}
              <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingY + ratio * chartH;
              return (
                <line
                  key={i}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#EAE3D6"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Shaded Area for Visitors */}
            <path d={areaPath} fill="url(#visitorGradient)" />

            {/* Visitor Line */}
            <path
              d={linePathVisitors}
              fill="none"
              stroke="#B89B72"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inquiry Line */}
            <path
              d={linePathInquiries}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 0"
            />

            {/* Data points & Interactive Hover targets */}
            {points.map((p, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <g key={i}>
                  {/* Vertical guide line on hover */}
                  {isHovered && (
                    <line
                      x1={p.x}
                      y1={paddingY}
                      x2={p.x}
                      y2={height - paddingY}
                      stroke="#8C6D45"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Visitor circle */}
                  <circle
                    cx={p.x}
                    cy={p.yVisitors}
                    r={isHovered ? 6 : 4}
                    fill="#1E1B18"
                    stroke="#B89B72"
                    strokeWidth="2.5"
                    className="transition-all duration-150"
                  />

                  {/* Inquiry circle */}
                  <circle
                    cx={p.x}
                    cy={p.yInquiries}
                    r={isHovered ? 5 : 3.5}
                    fill="#FFFFFF"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    className="transition-all duration-150"
                  />

                  {/* X-axis label */}
                  <text
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isHovered ? '#1E1B18' : '#7A7266'}
                    fontWeight={isHovered ? 'bold' : 'normal'}
                  >
                    {p.label}
                  </text>

                  {/* Invisible wide hover hit-target */}
                  <rect
                    x={p.x - chartW / (currentData.length * 2)}
                    y={paddingY}
                    width={chartW / currentData.length}
                    height={chartH}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(i)}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <p className="text-[11px] text-[#8C8479] text-center pt-2">
          그래프 위의 점을 마우스로 올리거나 터치하면 해당 일자/월의 세부 방문자 수 및 견적 접수 건수가 표시됩니다.
        </p>
      </div>

      {/* Two-Column Grid: Funnel Analysis & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. 5단계 전환 퍼널 분석 */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
            <div>
              <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
                홈페이지 5단계 견적 유입 전환 퍼널
              </h4>
              <p className="text-xs text-[#7A7266] mt-0.5">
                방문자가 이탈 없이 5단계를 완주하는 단계별 유지율입니다.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-[#FAF6EE] text-[#8C6D45] font-bold">
              완료율 4.8%
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {[
              { step: '1단계', name: '사이트 메인 유입', pct: 100, count: '10,710명', barColor: 'bg-[#B89B72]' },
              { step: '2단계', name: '시공 갤러리 아카이브 탐색', pct: 68.4, count: '7,325명', barColor: 'bg-[#A88B64]' },
              { step: '3단계', name: '5단계 맞춤 견적 폼 진입', pct: 24.2, count: '2,591명', barColor: 'bg-[#987B56]' },
              { step: '4단계', name: '자재·도면 5단계 완료', pct: 5.2, count: '557건', barColor: 'bg-[#10B981]' },
              { step: '5단계', name: '쇼룸 1:1 방문 예약 확정', pct: 62.5, count: '348팀', barColor: 'bg-[#059669]' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E1B18] flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF6EE] text-[#8C6D45] font-mono">
                      {item.step}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <span className="font-semibold text-[#574E43]">
                    {item.count} <strong className="text-[#8C6D45]">({item.pct}%)</strong>
                  </span>
                </div>
                <div className="w-full bg-[#EFE8DD] h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.pct}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 유입 채널 & 디바이스 비율 */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
            <div>
              <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
                유입 경로 &amp; 디바이스 비율
              </h4>
              <p className="text-xs text-[#7A7266] mt-0.5">
                포털 검색엔진 및 SNS를 통한 고객 유입 분석입니다.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6E6457]">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-[#B89B72]" /> 모바일 74.2%
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-[#8A8174]" /> PC 25.8%
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {[
              { source: '네이버 검색 & 브랜드 블로그', pct: 46.2, change: '+12.4%', color: 'bg-[#03C75A]' },
              { source: '인스타그램 릴스 & 시공 피드', pct: 28.5, change: '+18.9%', color: 'bg-[#E1306C]' },
              { source: '입소문 & 기존 고객 추천', pct: 16.8, change: '+8.2%', color: 'bg-[#B89B72]' },
              { source: '구글 자연 검색 (Organic Search)', pct: 8.5, change: '+4.1%', color: 'bg-[#4285F4]' },
            ].map((src, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E1B18]">{src.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#10B981] font-semibold text-[11px]">{src.change}</span>
                    <strong className="text-[#3E3831]">{src.pct}%</strong>
                  </div>
                </div>
                <div className="w-full bg-[#EFE8DD] h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${src.pct}%` }}
                    className={`h-full rounded-full ${src.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Device bar breakdown */}
          <div className="pt-3 border-t border-[#EAE3D6]">
            <div className="text-xs font-bold text-[#574E43] mb-1.5 flex items-center justify-between">
              <span>디바이스 접속 분포</span>
              <span className="text-[11px] text-[#8C8479]">모바일 최적화 반응형 100% 대응</span>
            </div>
            <div className="w-full h-3 rounded-full flex overflow-hidden">
              <div style={{ width: '74.2%' }} className="bg-[#B89B72]" title="모바일 74.2%" />
              <div style={{ width: '25.8%' }} className="bg-[#443D34]" title="데스크톱 25.8%" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Search Keywords Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#8C6D45]" />
            <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
              네이버 &amp; 구글 최다 유입 검색 키워드 랭킹
            </h4>
          </div>
          <span className="text-xs text-[#10B981] font-bold">
            실시간 갱신 완료
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { rank: 1, keyword: 'ㄷ자형 대면형 싱크대', share: '38.2%', trend: '+2' },
            { rank: 2, keyword: '더 숨 디자인 맞춤가구', share: '26.4%', trend: '유지' },
            { rank: 3, keyword: '논현 쇼룸 맞춤 싱크대', share: '18.7%', trend: '+4' },
            { rank: 4, keyword: 'Super E0 친환경 침실세트', share: '16.7%', trend: 'NEW' },
          ].map((kw) => (
            <div
              key={kw.rank}
              className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EBE4D8] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#1E1B18] text-white text-xs font-bold font-mono flex items-center justify-center">
                  {kw.rank}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#1E1B18]">{kw.keyword}</div>
                  <div className="text-[10px] text-[#7A7266]">유입 점유율: {kw.share}</div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  kw.trend === 'NEW'
                    ? 'bg-[#D1FAE5] text-[#065F46]'
                    : kw.trend === '유지'
                    ? 'bg-[#E5E7EB] text-[#4B5563]'
                    : 'bg-[#FEF3C7] text-[#92400E]'
                }`}
              >
                {kw.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
