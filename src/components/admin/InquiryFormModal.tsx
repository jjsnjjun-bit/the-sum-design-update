import React, { useState, useEffect } from 'react';
import { X, Save, UserCheck, Layers, Trash2, AlertCircle } from 'lucide-react';
import { EstimateInquiry } from '../../types';

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (inquiry: EstimateInquiry) => void;
  onDelete?: (id: string, name: string) => void;
  editingInquiry?: EstimateInquiry | null;
}

const FURNITURE_OPTIONS = [
  'ㄷ자형 대면형 싱크대',
  '아일랜드 식탁 & 조리대',
  '키친핏 냉장고장 & 팬트리',
  '침실 맞춤 가구 세트 (호텔식 헤드보드/붙박이장)',
  '거실/서재 맞춤 수납 월플렉스',
  '현관 벤치 & 신발장',
];

const HOUSING_OPTIONS = [
  '신축 아파트',
  '구축 리모델링 아파트',
  '주상복합 / 타운하우스',
  '단독주택 / 빌라',
  '기타 상가 / 오피스',
];

const SIZE_OPTIONS = ['20평형대', '30평형대', '40평형대', '50평형대', '60평형 이상'];

const TIMEFRAME_OPTIONS = [
  '1개월 이내 (이사 일정 촉박)',
  '2~3개월 이내',
  '3~6개월 이내',
  '일정 미정 (사전 상담)',
];

const STATUS_OPTIONS: EstimateInquiry['status'][] = [
  '신규접수',
  '3D도면설계',
  '쇼룸방문예정',
  '계약완료',
  '상담완료',
];

export const InquiryFormModal: React.FC<InquiryFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingInquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [housing, setHousing] = useState('신축 아파트');
  const [size, setSize] = useState('40평형대');
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([FURNITURE_OPTIONS[0]]);
  const [material, setMaterial] = useState('Super E0 최고등급 + 이태리 천연 세라믹 상판');
  const [timeframe, setTimeframe] = useState('2~3개월 이내');
  const [location, setLocation] = useState('서울 서초구');
  const [preferredTime, setPreferredTime] = useState<string>('오전 (10:00 ~ 12:00)');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<EstimateInquiry['status']>('신규접수');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (editingInquiry) {
      setName(editingInquiry.name || '');
      setPhone(editingInquiry.phone || '');
      setHousing(editingInquiry.housing || '신축 아파트');
      setSize(editingInquiry.size || '40평형대');
      setSelectedFurniture(editingInquiry.furniture || [FURNITURE_OPTIONS[0]]);
      setMaterial(editingInquiry.material || 'Super E0 최고등급 + 이태리 천연 세라믹');
      setTimeframe(editingInquiry.timeframe || '2~3개월 이내');
      setLocation(editingInquiry.location || '서울 서초구');
      setPreferredTime(
        editingInquiry.preferredTime ? editingInquiry.preferredTime.join(', ') : '오전 (10:00 ~ 12:00)'
      );
      setNotes(editingInquiry.notes || '');
      setStatus(editingInquiry.status || '신규접수');
    } else {
      setName('');
      setPhone('');
      setHousing('신축 아파트');
      setSize('40평형대');
      setSelectedFurniture([FURNITURE_OPTIONS[0]]);
      setMaterial('Super E0 최고등급 + 이태리 천연 세라믹 상판');
      setTimeframe('2~3개월 이내');
      setLocation('서울 서초구 반포동');
      setPreferredTime('오전 (10:00 ~ 12:00)');
      setNotes('');
      setStatus('신규접수');
    }
  }, [editingInquiry, isOpen]);

  if (!isOpen) return null;

  const toggleFurniture = (item: string) => {
    if (selectedFurniture.includes(item)) {
      if (selectedFurniture.length === 1) return; // Keep at least one
      setSelectedFurniture(selectedFurniture.filter((f) => f !== item));
    } else {
      setSelectedFurniture([...selectedFurniture, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('고객명과 연락처는 필수 입력 항목입니다.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0',
    )}`;

    const inquiryData: EstimateInquiry = {
      id: editingInquiry ? editingInquiry.id : `EST-${Date.now().toString().slice(-6)}`,
      name,
      phone,
      date: editingInquiry ? editingInquiry.date : formattedDate,
      housing,
      size,
      furniture: selectedFurniture,
      material,
      timeframe,
      location,
      preferredTime: preferredTime.split(',').map((s) => s.trim()).filter(Boolean),
      notes,
      status,
    };

    onSave(inquiryData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DCD5C9] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#1E1B18] text-[#E4DDD3] px-6 py-4 flex items-center justify-between border-b border-[#352F27]">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-[#B89B72]" />
            <h3 className="font-serif-kr text-lg font-bold text-white">
              {editingInquiry ? '견적 신청 내용 직접 수정' : '새 맞춤 견적 신청 건 직접 작성 & 등록'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A69E92] hover:text-white hover:bg-[#2C2721] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                고객 성함 *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 김*은 고객님"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                연락처 (전화번호) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
          </div>

          {/* Row 2: Housing & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                주거 형태 *
              </label>
              <select
                value={housing}
                onChange={(e) => setHousing(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              >
                {HOUSING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                전용 평형대 *
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              >
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Furniture Multi-selection */}
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1.5">
              맞춤 가구 신청 품목 (복수 선택 가능) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D6]">
              {FURNITURE_OPTIONS.map((item) => {
                const checked = selectedFurniture.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#FAF6EE] text-[#8C6D45] border border-[#B89B72]/50 font-bold'
                        : 'text-[#685F53] hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFurniture(item)}
                      className="w-3.5 h-3.5 text-[#B89B72] rounded"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Row 3: Material & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                희망 자재 / 등급
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="예: Super E0 + 이태리 천연 세라믹"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                시공 희망 시기
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              >
                {TIMEFRAME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Location & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                시공 현장 지역
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 서울 서초구 반포동"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                진행 상태 *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] font-semibold text-[#8C6D45] focus:outline-none focus:border-[#B89B72]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              선호 상담 시간대 (쉼표로 구분하여 입력 가능)
            </label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="예: 오전 (10:00 ~ 12:00), 저녁 (18:00 ~ 20:00)"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              상세 요청사항 &amp; 상담 메모
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="고객 특별 요청사항이나 공방 디자이너 상담 메모를 작성하세요."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-3">
            {editingInquiry && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  const id = editingInquiry.id;
                  const nameVal = editingInquiry.name;
                  onClose();
                  onDelete(id, nameVal);
                }}
                className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>이 견적 삭제</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs font-semibold text-[#5A5145] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingInquiry ? '견적 수정사항 저장' : '견적 신청 등록 완료'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
