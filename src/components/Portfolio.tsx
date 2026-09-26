import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ items, onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'kitchen-c', label: 'ㄷ자형 대면형 싱크대' },
    { id: 'island-dining', label: '아일랜드 식탁 & 조리대' },
    { id: 'fridge-pantry', label: '냉장고장 & 팬트리' },
    { id: 'bedroom', label: '침실 맞춤 가구 세트 (일체형)' },
    { id: 'living-library', label: '거실/서재 맞춤 수납' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#F5F2EB] border-b border-[#ECE7DE] w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-[#8C6D45] font-bold block mb-3 font-sans">
              CURATED PORTFOLIO
            </span>
            <h2 className="font-serif-kr text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight">
              더 숨 디자인 주력 시공 갤러리
            </h2>
            <p className="text-sm sm:text-base text-[#736B62] mt-3 font-light">
              실제 4,200여 가정의 삶의 동선과 취향을 담아낸 1:1 맞춤 공간 아카이브입니다.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#7C6E5C] bg-[#ECE5D8] px-4 py-2 rounded-full self-start md:self-auto border border-[#DDD3C3]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>총 {filteredItems.length}개 현장 아카이브 전시 중</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E1B18] text-white shadow-md'
                    : 'bg-[#ECE5D8] text-[#60594F] hover:bg-[#E2D9CB] hover:text-[#242220]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio 3x2 Grid across full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5DFD4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-semibold bg-[#1A1816]/90 text-white backdrop-blur-xs px-3 py-1.5 rounded-lg">
                    {item.categoryLabel}
                  </span>
                  {item.isBest && (
                    <span className="text-[11px] font-bold tracking-wider uppercase bg-[#B89B72] text-[#1E1B18] px-2.5 py-1 rounded-lg shadow-sm">
                      BEST CASE
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs sm:text-[13px] font-medium text-[#8F877D] mb-2">
                    {item.locationInfo}
                  </div>
                  <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#1E1B18] group-hover:text-[#8C6D45] transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B645B] leading-relaxed mb-5 line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Specs Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2.5 py-1 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-4 border-t border-[#F0EBE0] flex items-center justify-between text-xs sm:text-sm text-[#8C6D45] font-bold group-hover:text-[#6D5331]">
                    <span>공간 디테일 및 견적 사양 보기</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
