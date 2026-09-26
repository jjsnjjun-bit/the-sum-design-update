import React from 'react';
import { X, CheckCircle, ArrowRight, Calendar, MapPin, Layers, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenEstimate: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  onClose,
  onOpenEstimate,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E5DFD4] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#1E1B18] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#B89B72] text-[#1E1B18] font-bold px-2 py-0.5 rounded uppercase">
              {item.categoryLabel}
            </span>
            <span className="text-xs text-[#C7BFB4]">{item.locationInfo}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#C4BCB3] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 text-[#242220]">
          {/* Main Photo */}
          <div className="relative rounded-lg overflow-hidden mb-6 bg-[#EBE5DB] aspect-[16/9]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {item.isBest && (
              <div className="absolute top-3 right-3 bg-[#B89B72] text-white font-bold text-xs px-3 py-1 rounded shadow-sm">
                BEST CASE
              </div>
            )}
          </div>

          {/* Title & Description */}
          <h2 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18] mb-2 leading-snug">
            {item.title}
          </h2>
          <p className="text-sm text-[#5C554B] leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Full Details Section */}
          {item.fullDetails && (
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-[#F8F5EE] rounded-lg border border-[#EAE3D6]">
                <h4 className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>공간 디자인 &amp; 제작 콘셉트</span>
                </h4>
                <p className="text-xs text-[#524B42] leading-relaxed">
                  {item.fullDetails.concept}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-lg border border-[#E5DFD4]">
                  <div className="text-[11px] font-bold text-[#7A7165] uppercase mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#B89B72]" />
                    <span>적용 프리미엄 자재</span>
                  </div>
                  <ul className="text-xs text-[#443E37] space-y-1">
                    {item.fullDetails.materials.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-[#E5DFD4]">
                  <div className="text-[11px] font-bold text-[#7A7165] uppercase mb-1.5 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#B89B72]" />
                    <span>구동 하드웨어 시스템</span>
                  </div>
                  <ul className="text-xs text-[#443E37] space-y-1">
                    {item.fullDetails.hardware.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-[#8C8479] mt-2 pt-2 border-t border-[#F0EBE0] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B89B72]" />
                    <span>제작 및 시공 소요: {item.fullDetails.period}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Specs Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EAE3D6]">
            {item.specs.map((spec, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#F7F4EE] text-[#5A5247] border border-[#E5DED0] px-3 py-1 rounded font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="bg-[#FAF7F2] p-4 border-t border-[#E8E2D7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#70685D] text-center sm:text-left">
            이 시공 사례와 유사한 우리 집 맞춤 공간 설계를 원하시나요?
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenEstimate();
            }}
            className="w-full sm:w-auto bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <span>이 스타일로 5단계 견적 신청하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
