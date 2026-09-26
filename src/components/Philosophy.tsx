import React from 'react';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  Ruler,
  Heart,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { PhilosophyContent } from '../types';
import { INITIAL_PHILOSOPHY } from '../data/content';

interface PhilosophyProps {
  content?: PhilosophyContent;
  onOpenEstimate: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({
  content = INITIAL_PHILOSOPHY,
  onOpenEstimate,
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ruler':
        return <Ruler className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'compass':
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#ECE7DE] w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.28em] text-[#8C6D45] font-bold block mb-3 font-sans">
            {content.eyebrowTag}
          </span>
          <h2 className="font-serif-kr text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[40px] font-bold text-[#1E1B18] leading-[1.4] sm:leading-[1.42] mb-5 tracking-tight whitespace-pre-line break-keep">
            {content.mainHeadline}
          </h2>
          <p className="text-base sm:text-lg text-[#686158] leading-relaxed font-light max-w-3xl mx-auto whitespace-pre-line break-keep">
            {content.subtitle}
          </p>
        </div>

        {/* Two-Column Content Grid across full width */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Image Card */}
          <div className="xl:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5DFD4] bg-[#EEE8DE] group">
              <img
                src={content.image}
                alt={content.storyTitle}
                className="w-full h-[420px] sm:h-[540px] xl:h-[620px] object-cover transition-transform duration-700 group-hover:scale-102"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop';
                }}
              />

              {/* Overlay Bottom Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/80 to-transparent p-6 sm:p-8 text-white flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#EBD9C1] tracking-wide">
                    {content.imageBadgeTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D1C9BE] font-light mt-1">
                    {content.imageBadgeSubtitle}
                  </p>
                </div>
                <div className="bg-[#B89B72] text-[#1E1B18] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {content.imageBadgeYear}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Feature Grid */}
          <div className="xl:col-span-6 flex flex-col justify-center">
            <h3 className="font-serif-kr text-2xl sm:text-3xl font-bold text-[#1E1B18] mb-5 tracking-tight">
              {content.storyTitle}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#5C554D] leading-relaxed mb-10 font-light">
              <p className="whitespace-pre-line">{content.paragraph1}</p>
              <p className="whitespace-pre-line">{content.paragraph2}</p>
            </div>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {content.features.map((feat) => (
                <div
                  key={feat.id}
                  className="bg-white p-5 rounded-xl border border-[#E8E2D7] shadow-sm flex items-start gap-4 hover:border-[#B89B72] transition-colors"
                >
                  <div className="p-3 rounded-lg bg-[#F7F3EC] text-[#8C6D45] shrink-0 mt-0.5">
                    {getIcon(feat.iconName)}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#242220]">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#7C746B] mt-1 leading-snug">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={onOpenEstimate}
                className="w-full sm:w-auto bg-[#1E1B18] hover:bg-[#332E29] text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer group active:scale-98"
              >
                <span>{content.ctaButtonText}</span>
                <ArrowRight className="w-4 h-4 text-[#B89B72] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
