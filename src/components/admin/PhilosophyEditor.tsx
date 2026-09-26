import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Save,
  Trash2,
  Plus,
  RotateCcw,
  Sparkles,
  Compass,
  ShieldCheck,
  Ruler,
  Heart,
  Wrench,
  Check,
  ImageIcon,
  FileText,
  Layers,
} from 'lucide-react';
import { PhilosophyContent, PhilosophyFeature } from '../../types';
import { INITIAL_PHILOSOPHY } from '../../data/content';
import { ConfirmDialog } from './ConfirmDialog';
import { SUNKEN_LIVING_IMAGE } from '../../assets/images/sunken_living_base64';

interface PhilosophyEditorProps {
  content: PhilosophyContent;
  onSave: (updated: PhilosophyContent) => void;
  triggerFeedback: (msg: string) => void;
}

const PHILOSOPHY_IMAGE_PRESETS = [
  {
    title: '원목 스텝 & 썬큰 라운지 맞춤 인테리어 (신규)',
    url: SUNKEN_LIVING_IMAGE,
  },
  {
    title: '직영 공방 마스터 장인 & 주방 세라믹',
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: '원목 목공 장인 정밀 가공 현장',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: '불꽃과 열정의 수제 다이닝 키친',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: '원목 1:1 핸드크래프트 디테일 결구',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: '스위트 침실 월플렉스 & 조명',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: '대면형 아일랜드 & 세라믹 쿡탑',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  },
];

export const PhilosophyEditor: React.FC<PhilosophyEditorProps> = ({
  content,
  onSave,
  triggerFeedback,
}) => {
  const [formData, setFormData] = useState<PhilosophyContent>({ ...content });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerFeedback('이미지 파일(JPG, PNG, WebP 등)만 업로드 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({
          ...prev,
          image: event.target!.result as string,
        }));
        triggerFeedback(`'${file.name}' 브랜드 철학 대표 사진이 업로드되었습니다.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFeatureChange = (index: number, field: keyof PhilosophyFeature, value: any) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleAddFeature = () => {
    const newFeature: PhilosophyFeature = {
      id: `feat-${Date.now()}`,
      title: '새 핵심 가치 타이틀',
      description: '상세 가치 및 고객 혜택 설명 문구를 작성하세요.',
      iconName: 'sparkles',
    };
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }));
    triggerFeedback('새 브랜드 핵심 가치 카드가 추가되었습니다.');
  };

  const handleDeleteFeature = (id: string, title: string) => {
    if (formData.features.length <= 1) {
      triggerFeedback('브랜드 철학 소개를 위해 최소 1개 이상의 핵심 가치 카드가 유지되어야 합니다.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: '핵심 가치 카드 삭제',
      itemTitle: title || '선택한 가치 카드',
      message: '해당 브랜드 핵심 가치 카드를 삭제하시겠습니까? 홈페이지 브랜드 스토리 섹션에서 즉시 제외됩니다.',
      confirmLabel: '카드 삭제',
      variant: 'danger',
      onConfirm: () => {
        setFormData((prev) => ({
          ...prev,
          features: prev.features.filter((f) => f.id !== id),
        }));
        triggerFeedback(`'${title || '선택한'}' 가치 카드가 성공적으로 삭제되었습니다.`);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    triggerFeedback('브랜드 철학(Philosophy & Craftsmanship) 페이지 내용이 홈페이지에 즉시 반영되었습니다!');
  };

  const handleResetToDefault = () => {
    setConfirmDialog({
      isOpen: true,
      title: '브랜드 철학 기본값 초기화',
      message: '브랜드 철학 문구, 대표 사진, 4대 핵심 가치를 기본값으로 되돌리시겠습니까? 현재 작성 중인 내용이 덮어쓰여집니다.',
      confirmLabel: '기본값 복원',
      variant: 'warning',
      onConfirm: () => {
        setFormData({ ...INITIAL_PHILOSOPHY });
        onSave(INITIAL_PHILOSOPHY);
        triggerFeedback('브랜드 철학 내용이 기본값으로 초기화되었습니다.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89B72]" />
            <span className="text-xs font-bold text-[#8C6D45] uppercase tracking-wider font-mono">
              BRAND PHILOSOPHY &amp; CRAFTSMANSHIP CMS
            </span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18] mt-1">
            브랜드 철학 페이지 내용 및 사진 실시간 관리
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7266] mt-0.5">
            헤드라인 문구, 대표 장인/공방 사진 파일 업로드, 스토리텔링 문안, 4대 핵심 가치 카드를 직접 수정·추가·삭제할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl border border-[#D5CDC2] bg-white hover:bg-[#FAF6EE] text-xs font-semibold text-[#5A5145] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="기본값으로 되돌리기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 초기화</span>
          </button>
          <button
            type="submit"
            className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>수정 사항 즉시 반영하기</span>
          </button>
        </div>
      </div>

      {/* 1. 상단 섹션 타이틀 & 헤드라인 편집 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-5">
        <div className="pb-3 border-b border-[#EAE3D6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#B89B72]" />
            <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
              1. 상단 섹션 메인 헤드라인 &amp; 인트로 문구
            </h4>
          </div>
          <span className="text-xs text-[#8C6D45] font-semibold bg-[#FAF6EE] px-2.5 py-1 rounded">
            홈페이지 메인 상단 노출
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
              상단 영문 태그 (Eyebrow Tag)
            </label>
            <input
              type="text"
              required
              value={formData.eyebrowTag}
              onChange={(e) => setFormData({ ...formData, eyebrowTag: e.target.value })}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] font-mono tracking-wider focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
              메인 대형 헤드라인 (줄바꿈 지원) *
            </label>
            <textarea
              rows={2}
              required
              value={formData.mainHeadline}
              onChange={(e) => setFormData({ ...formData, mainHeadline: e.target.value })}
              className="w-full text-sm sm:text-base font-serif-kr font-bold p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72] leading-snug"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
            섹션 서브 설명 문구 *
          </label>
          <textarea
            rows={3}
            required
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72] leading-relaxed"
          />
        </div>
      </div>

      {/* 2. 대표 사진 직접 업로드 & 배지 정보 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6">
        <div className="pb-3 border-b border-[#EAE3D6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#B89B72]" />
            <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
              2. 브랜드 대표 사진 (직접 파일 업로드 및 이미지 변경)
            </h4>
          </div>
          <span className="text-xs text-[#8C6D45] font-semibold bg-[#FAF6EE] px-2.5 py-1 rounded">
            좌측 대형 비주얼 카드
          </span>
        </div>

        {/* Hidden File Input */}
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

        {/* Upload Zone */}
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
          onClick={() => fileInputRef.current?.click()}
          className={`p-7 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
            isDragging
              ? 'border-[#B89B72] bg-[#FAF6EE]'
              : 'border-[#D5CDC2] bg-[#FAF9F6] hover:border-[#B89B72]'
          }`}
        >
          <UploadCloud className="w-10 h-10 text-[#B89B72] mb-2" />
          <div className="text-sm font-bold text-[#1E1B18]">
            내 컴퓨터 / 스마트폰에서 사진 파일 직접 선택하기
          </div>
          <p className="text-xs text-[#7A7266] mt-1">
            클릭하여 사진을 고르거나, 작업 현장 사진 파일을 여기로 끌어다 놓으세요 (JPG, PNG, WebP)
          </p>
        </div>

        {/* Preset Selector */}
        <div>
          <span className="text-xs font-bold text-[#685F53] block mb-2">
            또는 고화질 공방 &amp; 키친 프리셋 사진에서 선택:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PHILOSOPHY_IMAGE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: preset.url }));
                  triggerFeedback(`'${preset.title}' 사진이 선택되었습니다.`);
                }}
                className="group relative rounded-xl overflow-hidden border border-[#D5CDC2] hover:border-[#B89B72] aspect-[16/10] text-left cursor-pointer transition-all"
              >
                <img
                  src={preset.url}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/45 flex items-end p-2">
                  <span className="text-[10px] text-white font-medium truncate">
                    {preset.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* URL Input & Live Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4]">
          <div className="md:col-span-4 relative aspect-[16/10] rounded-xl overflow-hidden border border-[#D5CDC2] shadow-xs bg-black">
            <img
              src={formData.image}
              alt="미리보기"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop';
              }}
            />
            <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/70 px-2 py-0.5 rounded">
              {formData.imageBadgeYear}
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                이미지 주소 (URL 직접 입력 가능)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-[#D5CDC2] bg-white font-mono focus:outline-none focus:border-[#B89B72]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3E3831] mb-1">
                  사진 오버레이 타이틀
                </label>
                <input
                  type="text"
                  value={formData.imageBadgeTitle}
                  onChange={(e) => setFormData({ ...formData, imageBadgeTitle: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#D5CDC2] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3831] mb-1">
                  사진 오버레이 서브설명
                </label>
                <input
                  type="text"
                  value={formData.imageBadgeSubtitle}
                  onChange={(e) => setFormData({ ...formData, imageBadgeSubtitle: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#D5CDC2] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3831] mb-1">
                  우측 골드 연혁 배지
                </label>
                <input
                  type="text"
                  value={formData.imageBadgeYear}
                  onChange={(e) => setFormData({ ...formData, imageBadgeYear: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-[#D5CDC2] bg-white font-bold text-[#8C6D45]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 우측 브랜드 스토리 및 본문 편집 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-5">
        <div className="pb-3 border-b border-[#EAE3D6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B89B72]" />
            <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
              3. 우측 브랜드 스토리텔링 및 본문 문구 편집
            </h4>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
            스토리 메인 타이틀 *
          </label>
          <input
            type="text"
            required
            value={formData.storyTitle}
            onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
            className="w-full text-sm sm:text-base font-serif-kr font-bold p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
              스토리 1문단 (가족의 온기 &amp; 삶의 공간) *
            </label>
            <textarea
              rows={4}
              required
              value={formData.paragraph1}
              onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
              스토리 2문단 (20년 정직한 공방 철학 &amp; Super E0 자재) *
            </label>
            <textarea
              rows={4}
              required
              value={formData.paragraph2}
              onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72] leading-relaxed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
            하단 CTA 상담 신청 버튼 문구 *
          </label>
          <input
            type="text"
            required
            value={formData.ctaButtonText}
            onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF9F6] focus:outline-none focus:border-[#B89B72]"
          />
        </div>
      </div>

      {/* 4. 4대 핵심 가치 카드 관리 (CRUD: 수정/삭제/추가) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-sm space-y-6">
        <div className="pb-3 border-b border-[#EAE3D6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B89B72]" />
            <div>
              <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#1E1B18]">
                4. 브랜드 핵심 가치 카드 관리 (수정 / 삭제 / 카드 추가)
              </h4>
              <p className="text-xs text-[#7A7266]">
                철학 섹션 우측 하단에 노출되는 맞춤 가구 차별화 포인트 카드입니다.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-[#FAF6EE] hover:bg-[#F2E7D5] text-[#8C6D45] border border-[#E3DACB] text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>새 가치 카드 추가</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formData.features.map((feat, index) => (
            <div
              key={feat.id}
              className="p-5 rounded-xl border border-[#E3DACB] bg-[#FAF8F5] space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#1E1B18] text-white font-mono">
                    CARD 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-semibold text-[#685F53]">아이콘:</label>
                    <select
                      value={feat.iconName || 'compass'}
                      onChange={(e) => handleFeatureChange(index, 'iconName', e.target.value)}
                      className="text-xs p-1 rounded border border-[#D5CDC2] bg-white font-medium"
                    >
                      <option value="compass">나침반 (1:1 설계)</option>
                      <option value="shield">방패 (평생 보증)</option>
                      <option value="sparkles">반짝임 (친환경 자재)</option>
                      <option value="ruler">줄자 (1mm 정밀)</option>
                      <option value="heart">하트 (가족 온기)</option>
                      <option value="wrench">렌치 (직영 제작)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteFeature(feat.id, feat.title)}
                  className="p-1 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  title="카드 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3831] mb-1">
                  카드 타이틀 *
                </label>
                <input
                  type="text"
                  required
                  value={feat.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                  className="w-full text-xs sm:text-sm font-bold p-2.5 rounded-lg border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3831] mb-1">
                  상세 설명 문구 *
                </label>
                <textarea
                  rows={2}
                  required
                  value={feat.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D5CDC2] bg-white focus:outline-none focus:border-[#B89B72] leading-snug"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="p-6 bg-white rounded-2xl border border-[#E5DFD4] shadow-sm flex items-center justify-between">
        <p className="text-xs text-[#7A7266]">
          저장 버튼을 누르면 홈페이지 메인 &apos;브랜드 스토리 &amp; 장인정신&apos; 섹션에 실시간으로 즉각 반영됩니다.
        </p>

        <button
          type="submit"
          className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-98"
        >
          <Save className="w-4 h-4" />
          <span>브랜드 철학 내용 및 사진 저장하기</span>
        </button>
      </div>

      {/* In-App Confirm Dialog */}
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
    </form>
  );
};
